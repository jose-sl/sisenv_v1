import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShippingService } from '../../services/shipping.service';
import { ModalService } from '../../services/modal/modal.service';
import { PackageService } from '../../services/package.service';
import { PlaceService } from '../../services/place.service';
import { TransportService } from '../../services/transport.service';
import { UserService } from '../../services/user.service';
import { RegistryService } from '../../services/registry.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit  {
    shippings = [];
    packages = [];
    packagesSelect = [];
    places = [];
    transports = [];
    users = [];
    usersSelect = [];
    query: any = {};
    shipping: any;
    modalAction: string;
    userLogin: any;

    constructor(
        private shippingService: ShippingService, private modalService: ModalService, private router: Router,
        private packageService: PackageService, private placeService: PlaceService, private transportService: TransportService,
        private userService: UserService, private registryService: RegistryService, private authService: AuthService
    ){
    }

    initShipping(){
        this.shipping = {
            packageId: '',
            placeOriginId: '',
            placeDestinyId: '',
            transportId: '',
            pilotId: '',
        };
    }

    ngOnInit() {
        this.userLogin = this.authService.getUserLogin()
        if(this.userLogin == null) {
            this.authService.loginRedirect();
        }
        this.initShipping();
        if(this.userLogin.rol === 'Piloto') {
            this.loadAllShippings({pilotId: this.userLogin._id, status: '["En Espera", "En Ruta"]'});
        }else{
            this.loadAllShippings({});
        }        
        this.loadServices({});
    }

    loadAllShippings(query) {
        this.shippingService.getAll(query).toPromise().then((resp: any) => {
          this.shippings = resp;
        })
    }

    loadServices(query) {
        this.packageService.getAll(query).toPromise().then((resp: any) =>{
            this.packages = resp;
        })

        this.placeService.getAll().toPromise().then((resp: any) =>{
            this.places = resp;
        })

        this.transportService.getAll().toPromise().then((resp: any) =>{
            this.transports = resp;
        })

        this.userService.getAll(query).toPromise().then((resp: any) =>{
            this.users = resp;
        })
    }

    loadDropdownSelects(){
        this.packagesSelect = [];
        this.usersSelect = [];
        for (const packageSelect of this.packages) {
            if(packageSelect.status === 'Pendiente' || packageSelect.status === 'No Entregado'){
                this.packagesSelect.push(packageSelect);
            }
        }

        for (const userSelect of this.users) {
            if(userSelect.rol === 'Piloto' && userSelect.status === 'Disponible'){
                this.usersSelect.push(userSelect);
            }
        }
    }

    newFormDetail(action, modal_id){
        this.loadDropdownSelects();
        this.initShipping();
        this.modalAction = action;
        this.modalService.open(modal_id);
    }

    openFormDetail(action, row, modal_id){
        this.shipping = Object.assign({}, row);
        this.modalAction = action;
        this.modalService.open(modal_id);
    }

    aceptFormDetail(row, modal_id, packageStatus: string, shippingStatus: string){
        this.modalService.close(modal_id);
        console.log(row);
        if (this.modalAction === 'Nuevo Envío') {
            row.status = shippingStatus;
            this.shippingService.create(row).toPromise();
            let pckg: any = this.getObjectById(row.packageId, this.packages);
            pckg.status = packageStatus;
            this.packageService.update(pckg._id, pckg).toPromise();
            this.reloadComponent();
        }else{
            if (this.modalAction === 'Editar Envío') {
                this.shippingService.update(row._id, row).toPromise();
                this.reloadComponent();
            }else{
                if (this.modalAction === 'Eliminar Envío') {
                    this.shippingService.delete(row._id).toPromise();
                    let pckg: any = this.getObjectById(row.packageId, this.packages);
                    pckg.status = 'Pendiente';
                    this.packageService.update(pckg._id, pckg).toPromise();
                    this.reloadComponent();                    
                }
            }
        }
        if (this.modalAction !== 'Ver Envío') {
            let packageLog : any = this.getObjectById(row.packageId, this.packages);
            let pilotLog : any = this.getObjectById(row.pilotId, this.users);
            this.generateRegistry(this.userLogin.name, this.modalAction + ' - Paquete: ' + packageLog.name + ' Piloto: ' + pilotLog.name);
        }
    }

    shippingState(userStatus: string, shippingStatus: string){

        // if(shippingStatus === 'Finalizado'){
        //     this.packageService.getAll({}).toPromise().then((resp: any) =>{
        //         this.packages = resp;
        //     })
        // }
        let user: any = this.getObjectById(this.userLogin._id, this.users);
        user.status = userStatus;
        this.userService.update(user._id, user).toPromise();
        for (const shipping of this.shippings) {
            shipping.status = shippingStatus;
            this.shippingService.update(shipping._id, shipping).toPromise();
            if(shippingStatus === 'Finalizado'){
                let pckg: any = this.getObjectById(shipping.packageId, this.packages);
                console.log('updating package....');
                console.log(pckg);
                pckg.status = 'Entregado';
                this.packageService.update(pckg._id, pckg).toPromise();
            }
        }        
        this.authService.updateUserStatus(userStatus);
        this.reloadComponent();
    }

    shippingReturned(row, packageStatus: string, shippingStatus:string){
        row.status = shippingStatus;
        this.shippingService.update(row._id, row).toPromise();
        let pckg: any = this.getObjectById(row.packageId, this.packages);
        pckg.status = packageStatus;
        this.packageService.update(pckg._id, pckg).toPromise();
        this.reloadComponent();
    }

    getObjectById(id: string, objectList: any){
        return objectList.filter((object) => {
            return object["_id"] == id
        })[0];
    }

    reloadComponent(){
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/views/shipping']);
        });
    }

    generateRegistry(user: string, action: string){
        let registry : any = {
            user: user,
            module: 'Programación de Envíos',
            action: action
        };
        this.registryService.create(registry).toPromise();
    }

    closeFormDetail(modal_id){
        this.modalService.close(modal_id);
    }
}

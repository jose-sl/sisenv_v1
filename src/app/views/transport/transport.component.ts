import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportService } from '../../services/transport.service';
import { ModalService } from '../../services/modal/modal.service';
import { RegistryService } from '../../services/registry.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit  {
    transports = [];
    query: any = {};
    transport: any;
    modalAction: string;
    userLogin: any;

    constructor(
        private transportService: TransportService, private modalService: ModalService, private router: Router, 
        private registryService: RegistryService, private authService: AuthService
    ){
    }

    initTransport(){
        this.transport = {
            type: '',
            number_ident: '',
            max_weight: ''
        };
    }

    ngOnInit() {
        this.userLogin = this.authService.getUserLogin()
        if(this.userLogin == null) {
            this.authService.loginRedirect();
        }
        this.initTransport();
        this.loadAllTransports();
    }

    loadAllTransports() {
        this.transportService.getAll().toPromise().then((resp: any) => {
          this.transports = resp;
        })
    }

    newFormDetail(action, modal_id){
        this.initTransport();
        this.modalAction = action;
        this.modalService.open(modal_id);
    }

    openFormDetail(action, row, modal_id){
        this.transport = Object.assign({}, row);
        this.modalAction = action;
        this.modalService.open(modal_id);
    }

    aceptFormDetail(row, modal_id){
        this.modalService.close(modal_id);
        console.log(row);
        if (this.modalAction === 'Nuevo Transporte') {
            this.transportService.create(row).toPromise();
            this.reloadComponent();
        }else{
            if (this.modalAction === 'Editar Transporte') {
                this.transportService.update(row._id, row).toPromise();
                this.reloadComponent();
            }else{
                if (this.modalAction === 'Eliminar Transporte') {
                    this.transportService.delete(row._id).toPromise();
                    this.reloadComponent();                    
                }
            }
        }

        if (this.modalAction !== 'Ver Transporte') {
            this.generateRegistry(this.userLogin.name, this.modalAction + ' - Transporte: ' + row.number_ident);
        }
    }

    reloadComponent(){
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/views/transport']);
        });
    }

    generateRegistry(user: string, action: string){
        let registry : any = {
            user: user,
            module: 'Transportes',
            action: action
        };
        this.registryService.create(registry).toPromise();
    }

    closeFormDetail(modal_id){
        this.modalService.close(modal_id);
    }
}

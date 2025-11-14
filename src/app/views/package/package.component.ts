import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { ModalService } from '../../services/modal/modal.service';
import { RegistryService } from '../../services/registry.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit  {
    packages = [];
    query: any = {};
    package: any;
    modalAction: string;
    userLogin: any;

    constructor(
        private packageService: PackageService, private modalService: ModalService, private router: Router, 
        private registryService: RegistryService, private authService: AuthService
    ){
    }

    initPackage(){
        this.package = {
            name: '',
            weight: ''
        };
    }

    ngOnInit() {
        this.userLogin = this.authService.getUserLogin()
        if(this.userLogin == null) {
            this.authService.loginRedirect();
        }
        this.initPackage();
        this.loadAllPackages({});
    }

    loadAllPackages(query) {
        this.packageService.getAll(query).toPromise().then((resp: any) => {
          this.packages = resp;
        })
    }

    newFormDetail(action, modal_id){
        this.initPackage();
        this.modalAction = action;
        this.modalService.open(modal_id);
    }

    openFormDetail(action, row, modal_id){
        this.package = Object.assign({}, row);
        this.modalAction = action;
        this.modalService.open(modal_id);
    }

    aceptFormDetail(row, modal_id, packageStatus: string){
        this.modalService.close(modal_id);
        console.log(row);
        if (this.modalAction === 'Nuevo Paquete') {
            row.status = packageStatus;
            this.packageService.create(row).toPromise();
            this.reloadComponent();
        }else{
            if (this.modalAction === 'Editar Paquete') {
                this.packageService.update(row._id, row).toPromise();
                this.reloadComponent();
            }else{
                if (this.modalAction === 'Eliminar Paquete') {
                    this.packageService.delete(row._id).toPromise();
                    this.reloadComponent();                    
                }
            }
        }

        if (this.modalAction !== 'Ver Paquete') {
            this.generateRegistry(this.userLogin.name, this.modalAction + ' - Paquete: ' + row.name);
        }
    }

    reloadComponent(){
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/views/package']);
        });
    }

    generateRegistry(user: string, action: string){
        let registry : any = {
            user: user,
            module: 'Paquetes',
            action: action
        };
        this.registryService.create(registry).toPromise();
    }

    closeFormDetail(modal_id){
        this.modalService.close(modal_id);
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ModalService } from '../../services/modal/modal.service';
import { RegistryService } from '../../services/registry.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit  {
    users = [];
    query: any = {};
    user: any;
    modalAction: string;
    userLogin: any;

    constructor(
        private userService: UserService, private modalService: ModalService, private router: Router, 
        private registryService: RegistryService, private authService: AuthService
    ){
    }

    initUser(){
        this.user = {
            name: '',
            age: '',
            status: '',
            rol: '',
            nic: '',
            pass: ''
        };
    }

    ngOnInit() {
        this.userLogin = this.authService.getUserLogin()
        if(this.userLogin == null) {
            this.authService.loginRedirect();
        }
        this.initUser();
        this.loadAllUsers({});
    }

    loadAllUsers(query) {
        this.userService.getAll(query).toPromise().then((resp: any) => {
          this.users = resp;
        })
    }

    newFormDetail(action, modal_id){
        this.initUser();
        this.modalAction = action;
        this.modalService.open(modal_id);
    }

    openFormDetail(action, row, modal_id){
        this.user = Object.assign({}, row);
        this.modalAction = action;
        this.modalService.open(modal_id);
    }

    aceptFormDetail(row, modal_id, userStatus: string){
        this.modalService.close(modal_id);
        console.log(row);
        if (this.modalAction === 'Nuevo Usuario') {
            row.status = userStatus;
            this.userService.create(row).toPromise();
            this.reloadComponent();
        }else{
            if (this.modalAction === 'Editar Usuario') {
                this.userService.update(row._id, row).toPromise();
                this.reloadComponent();
            }else{
                if (this.modalAction === 'Eliminar Usuario') {
                    this.userService.delete(row._id).toPromise();
                    this.reloadComponent();                    
                }
            }
        }

        if (this.modalAction !== 'Ver Usuario') {
            this.generateRegistry(this.userLogin.name, this.modalAction + ' - Usuario: ' + row.name);
        }
    }

    reloadComponent(){
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/views/user']);
        });
    }

    generateRegistry(user: string, action: string){
        let registry : any = {
            user: user,
            module: 'Usuarios',
            action: action
        };
        this.registryService.create(registry).toPromise();
    }

    closeFormDetail(modal_id){
        this.modalService.close(modal_id);
    }
}

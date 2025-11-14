import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { ModalService } from '../../services/modal/modal.service';
import { RegistryService } from '../../services/registry.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit  {
    places = [];
    query: any = {};
    place: any;
    modalAction: string;
    userLogin: any;

    constructor(
        private placeService: PlaceService, private modalService: ModalService, private router: Router, 
        private registryService: RegistryService, private authService: AuthService
    ){
    }

    initPlace(){
        this.place = {
            name: '',
            address: ''
        };
    }

    ngOnInit() {
        this.userLogin = this.authService.getUserLogin()
        if(this.userLogin == null) {
            this.authService.loginRedirect();
        }
        this.initPlace();
        this.loadAllPlaces();
    }

    loadAllPlaces() {
        this.placeService.getAll().toPromise().then((resp: any) => {
          this.places = resp;
        })
    }

    newFormDetail(action, modal_id){
        this.initPlace();
        this.modalAction = action;
        this.modalService.open(modal_id);
    }

    openFormDetail(action, row, modal_id){
        this.place = Object.assign({}, row);
        this.modalAction = action;
        this.modalService.open(modal_id);
    }

    aceptFormDetail(row, modal_id){
        this.modalService.close(modal_id);
        console.log(row);
        if (this.modalAction === 'Nuevo Lugar') {
            this.placeService.create(row).toPromise();
            this.reloadComponent();
        }else{
            if (this.modalAction === 'Editar Lugar') {
                this.placeService.update(row._id, row).toPromise();
                this.reloadComponent();
            }else{
                if (this.modalAction === 'Eliminar Lugar') {
                    this.placeService.delete(row._id).toPromise();
                    this.reloadComponent();                    
                }
            }
        }

        if (this.modalAction !== 'Ver Lugar') {
            this.generateRegistry(this.userLogin.name, this.modalAction + ' - Lugar: ' + row.name);
        }
    }

    reloadComponent(){
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/views/place']);
        });
    }

    generateRegistry(user: string, action: string){
        let registry : any = {
            user: user,
            module: 'Lugares',
            action: action
        };
        this.registryService.create(registry).toPromise();
    }

    closeFormDetail(modal_id){
        this.modalService.close(modal_id);
    }
}

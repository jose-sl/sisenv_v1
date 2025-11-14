import { Component, OnInit } from '@angular/core';
import { RegistryService } from '../../services/registry.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit  {
    registries = [];
    query: any = {};
    registry: any;
    modalAction: string;

    constructor(
        private registryService: RegistryService, private authService: AuthService
    ){
    }

    initRegistry(){
        this.registry = {
            user: '',
            module: '',
            action: ''
        };
    }

    ngOnInit() {
        if(this.authService.getUserLogin() == null) {
            this.authService.loginRedirect();
        }
        this.initRegistry();
        this.loadAllRegistries();
    }

    loadAllRegistries() {
        this.registryService.getAll().toPromise().then((resp: any) => {
          this.registries = resp;
        })
    }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

    private modals: any[] = [];

    add(modal: any){
        this.modals.push(modal);
    }

    open(id){
        let modal: any;
        modal = this.modals.filter(x => x.id === id)[0];
        modal.open();
    }

    close(id){
        let modal: any;
        modal = this.modals.filter(x => x.id === id)[0];
        modal.close();
    }

    remove(id){
        this.modals = this.modals.filter(x => x.id !== id);
    }

}
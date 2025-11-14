import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    constructor( private router: Router ){
    }

    public userLogin(user: any){

        localStorage.setItem('userLogin', JSON.stringify({_id: user._id, name: user.name, rol: user.rol, nic: user.nic, status: user.status}));
    }

    public getUserLogin(){
        return JSON.parse(localStorage.getItem('userLogin'));
    }

    public updateUserStatus(status: string){
        let userLogin: any = JSON.parse(localStorage.getItem('userLogin'));
        userLogin.status = status;
        this.userLogin(userLogin);

    }

    public logOut(){
        localStorage.removeItem('userLogin');
    }

    public loginRedirect() {
        this.router.navigate(['/login']);
    }
} 
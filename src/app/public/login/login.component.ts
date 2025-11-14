import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userNic: string;
    password: string;
    errorState: boolean;
    errorMessage: string;
    user: any;
    
    constructor( private router: Router, private userService: UserService, private authService: AuthService ) {
    }

    ngOnInit() {
        this.authService.logOut();
        this.userNic = '';
        this.password = '';
        this.errorState = false;
        this.errorMessage = '';
    }

    login() {
        try {
            if (this.userNic !== '') {
                this.userService.getUserByNic(this.userNic).toPromise().then((resp: any) => {
                    if (resp !== null && resp.pass === this.password){
                        this.authService.userLogin(resp);
                        this.homeRedirect();
                    }else{
                        this.errorState = true;
                        this.errorMessage = 'Usuario y/o contraseña incorrecta';
                    }
                })  
            }else{
                this.errorState = true;
                this.errorMessage = 'Ingrese un usuario';
            }      
            
        } catch (error) {
            this.errorState = true;
            this.errorMessage = 'Porfavor intente más tarde';
            console.log(error);
        };
    }

    public homeRedirect() {
        this.router.navigate(['/views/shipping']);
    }
}

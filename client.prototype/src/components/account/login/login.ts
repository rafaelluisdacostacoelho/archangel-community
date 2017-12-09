import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, ROUTER_DIRECTIVES } from '@angular/router';
import { Validators, FormBuilder, ControlGroup, NgForm, FORM_DIRECTIVES } from '@angular/common';
import { Response, Http, HTTP_PROVIDERS } from '@angular/http';

import { LoginViewModel } from '../../../models/account/login.viewmodel';
import { AccountService } from '../../../services/account.service';

@Component({
    moduleId: module.id,
    selector: 'archangel-login',
    providers: [AccountService, HTTP_PROVIDERS, ROUTER_DIRECTIVES],
    // directives: [RouterLink, FORM_DIRECTIVES, MATERIAL_DIRECTIVES],
    directives: [RouterLink, FORM_DIRECTIVES],
    templateUrl: 'login.html',
    styleUrls: ['login.css'],
    // TODO: Change to native in the future
    encapsulation: ViewEncapsulation.None
})
export class Login {

    public loginControlGroup: ControlGroup;
    public errorMessage: string;

    public loginViewModel: LoginViewModel = new LoginViewModel();

    constructor(
        private _accountService: AccountService,
        private _router: Router,
        private _http: Http,
        private _formBuilder: FormBuilder
    ) {
        this.loginControlGroup = _formBuilder.group({
            'UserName': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(10)
            ])], 
            'Email': ['', Validators.compose([
                Validators.pattern('^.+@.+\..+$'),
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(100)
            ])],
            'Password': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(10)
            ])]
        });
    }

    login() {
        this._accountService
            .login(this.loginViewModel)
            .subscribe((response: Response) => {
                localStorage.setItem('jwt', response.json().id_token);
                this._router.navigate(['Home']);
            }, error => {
                this.errorMessage = error
            });
    }

    redirectToRegister() {
        this._router.navigate(['Register']);
    }

    redirectToForgotPassword() {
        this._router.navigate(['ForgotPassword']);
    }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/operator/map';
import { ApplicationSettings } from '../utilities/application-settings';
import { IRegisterViewModel } from '../models/account/register.viewmodel';
import { LoginViewModel } from '../models/account/login.viewmodel';

@Injectable()
export class AccountService {

    constructor(private _http: Http) { }

    register(registerViewModel: IRegisterViewModel) {
        return this._http
            .post(ApplicationSettings.API_URI + '/Account/Register', JSON.stringify(registerViewModel), ApplicationSettings.OPTIONS);
            // .map((response: Response) => response.json())
            // .catch(this.handleError);
    }

    login(loginViewModel: LoginViewModel) {
        return this._http
            .post(ApplicationSettings.API_URI + '/Account/Login', JSON.stringify(loginViewModel), ApplicationSettings.OPTIONS);
            // .map((response: Response) => response.json())
            // .catch(this.handleError);
    }

    forgotYourPassword(email) { }

    changePassword(oldPassword, newPassword) { }

    loginWithFacebook() { }

    loginWithGooglePlus() { }

    loginWithLinkedIn() { }
    /*
    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
    */
}

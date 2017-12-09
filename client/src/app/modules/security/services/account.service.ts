import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { SignInModel } from '../models/sign-in.model';
import { SignUpModel } from '../models/sign-up.model';

@Injectable()
export class AccountService {
  static signed: EventEmitter<boolean> = new EventEmitter<boolean>();
  static redirectUrl = './sign-in';

  static isSignedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  constructor(private http: Http) { }

  signInAsync(model: SignInModel): Promise<Response> {
    return this.http
      .post('api/web/accounts/sign-in', JSON.stringify(model))
      .toPromise()
      .then((response: Response) => {
        AccountService.signed.emit(true);
        return Promise.resolve(response);
      })
      .catch((reason: Error) => {
        return Promise.reject(reason.message);
      });
  }

  signUpAsync(model: SignUpModel): Promise<Response> {
    return this.http
      .post('api/web/accounts/sign-up', JSON.stringify(model))
      .toPromise()
      .then((response: Response) => {
        return Promise.resolve(response);
      })
      .catch((reason: Error) => {
        return Promise.reject(reason.message);
      });
  }

  signOut(): Promise<Response> {
    return this.http
      .post('api/web/account/sign-out', {})
      .toPromise()
      .then((response: Response) => {
        AccountService.signed.emit(false);
        return Promise.resolve(response);
      })
      .catch((reason: Error) => {
        return Promise.reject(reason.message);
      });
  }
}

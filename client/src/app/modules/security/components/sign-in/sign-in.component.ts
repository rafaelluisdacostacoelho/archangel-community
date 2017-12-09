import { Component, ViewEncapsulation, HostBinding, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { routerTransition } from '../../../../router.animations';
import { SignInModel } from '../../models/sign-in.model';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    providers: [AccountService],
    animations: [routerTransition()]
})
export class SignInComponent {
    @HostBinding('@routerTransition') routerTransition;
    @Input() model: SignInModel = new SignInModel('kevin.mitnick', 'shimomura');

    loading = false;
    submitted = false;

    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    signIn(event: Event) {
        event.preventDefault();
        return this.accountService.signInAsync(this.model)
            .then((response: Response) => {
                const user = response.json();
                if (user && user.token) {

                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('token', user.token);

                    AccountService.signed.emit(true);

                    this.router.navigate(['/home']);
                }
            });
    }
}

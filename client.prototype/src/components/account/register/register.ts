import { Component, ContentChildren } from "@angular/core";
import { Router } from "@angular/router";
import { Validators, FormBuilder, ControlGroup, NgForm, FORM_DIRECTIVES } from "@angular/common";
import { Response } from "@angular/http";
// import { MATERIAL_DIRECTIVES } from "ng2-material/all";
import { RegisterViewModel, RegisterViewModelControlGroup } from "../../../models/account/register.viewmodel";
import { AccountService } from "../../../services/account.service";

@Component({
    moduleId: module.id,
    selector: "register",
    providers: [RegisterViewModel, RegisterViewModelControlGroup, AccountService],
    // directives: [MATERIAL_DIRECTIVES],
    directives: [FORM_DIRECTIVES],
    templateUrl: "register.html",
    styleUrls: ["register.css"]
})
export class Register {
    public errorMessage: string;

    constructor
    (
        public register: RegisterViewModel,
        public controlGroup: RegisterViewModelControlGroup,
        private _accountService: AccountService,
        private _router: Router
    ) { }
    
    submit() {
        this._accountService
            .register(this.register)
            .subscribe(response => {
                this._router.navigate(["RegisterConfirmation"]);
            }, error => {
                this.errorMessage = error
            });
    }

    redirectToLogin() {
        this._router.navigate(["Login"]);
    }
}
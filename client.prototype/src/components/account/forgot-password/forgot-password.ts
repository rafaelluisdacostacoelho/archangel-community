import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Validators, FormBuilder, ControlGroup, NgForm, FORM_DIRECTIVES } from "@angular/common";
// import { MATERIAL_DIRECTIVES } from "ng2-material/all";
import { ForgotPasswordViewModel } from "../../../models/account/forgot-password.viewmodel";
import { AccountService } from "../../../services/account.service";

@Component({
    moduleId: module.id,
    selector: "forgot-password",
    providers: [AccountService, ForgotPasswordViewModel],
    // directives: [FORM_DIRECTIVES],
    directives: [FORM_DIRECTIVES],
    templateUrl: "forgot-password.html"
})
export class ForgotPassword {
    constructor(
        public forgotPasswordViewModel: ForgotPasswordViewModel,
        private _router: Router
    ) { }

    forgotPassword() { }

    redirectToLogin() {
        this._router.navigate(["Login"]);
    }
}
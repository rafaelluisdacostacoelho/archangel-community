import { Component } from "@angular/core";
import { Router, RouterLink, ROUTER_DIRECTIVES } from "@angular/router";
// import { Media, MATERIAL_DIRECTIVES } from "ng2-material/all";

@Component({
    moduleId: module.id,
    selector: "register-confirmation",
    providers: [ROUTER_DIRECTIVES],
    // directives: [RouterLink, MATERIAL_DIRECTIVES],
    directives: [RouterLink],
    templateUrl: "register-confirmation.html"
})
export class RegisterConfirmation {
    constructor(private _router: Router) { }

    redirectToLogin() {
        this._router.navigate(["login"]);
    }
}
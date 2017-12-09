import { Component } from "@angular/core";
import { ARCHANGEL_COUNTDOWN_DIRECTIVES } from "../countdown/countdown";

@Component({
    moduleId: module.id,
    selector: "home",
    directives: [ARCHANGEL_COUNTDOWN_DIRECTIVES],
    templateUrl: "home.html",
    styleUrls: ["home.css"]
})
export class Home { }
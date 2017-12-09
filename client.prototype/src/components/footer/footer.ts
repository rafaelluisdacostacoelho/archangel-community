import { Component, ViewEncapsulation } from "@angular/core";
import { MdButton } from "@angular2-material/button";
import { MdInput } from "@angular2-material/input";

@Component({
    moduleId: module.id,
    selector: "archangel-footer",
    templateUrl: "footer.html",
    styleUrls: ["footer.css"],
    directives: [MdInput, MdButton],
    // TODO: Change to native in the future 
    encapsulation: ViewEncapsulation.None
})
export class ArchangelFooter { }

export const ARCHANGEL_FOOTER_DIRECTIVES: any = [ArchangelFooter];
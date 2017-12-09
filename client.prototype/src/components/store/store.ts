import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdButton } from '@angular2-material/button';

@Component({
    moduleId: module.id,
    selector: 'archangel-store',
    directives: [MdButton],
    templateUrl: 'store.html',
    styleUrls: ['store.css']
})
export class Store { }
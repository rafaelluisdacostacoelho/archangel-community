import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { ARCHANGEL_TOOLBAR_DIRECTIVES } from './components/toolbar/toolbar';
import { ARCHANGEL_FOOTER_DIRECTIVES } from './components/footer/footer';

import { Home } from './components/home/home';
import { Store } from './components/store/store';

import { Ping } from './ping.component';
import { Auth } from './auth.service';

@Component({
    moduleId: module.id,
    //providers: [Auth],
    selector: 'archangel-application',
    directives: [ROUTER_DIRECTIVES, ARCHANGEL_TOOLBAR_DIRECTIVES, ARCHANGEL_FOOTER_DIRECTIVES],
    templateUrl: 'application.html',
    styleUrls: ['application.css'],
    providers: [HTTP_PROVIDERS]
})
export class ArchangelApplication {
    //constructor(private auth: Auth) { }
}

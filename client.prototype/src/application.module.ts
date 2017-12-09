import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MdButtonModule } from '@angular2-material/button';
import { MdInputModule } from '@angular2-material/input';
import { MdCheckboxModule } from '@angular2-material/checkbox';

import { ArchangelApplication }  from './application';
import { routing } from './application.routing';

@NgModule({
    imports: [
        BrowserModule,
        // Forms
        FormsModule,
        // Material Design
        MdButtonModule,
        MdInputModule,
        MdCheckboxModule,
        // Router
        routing
    ],
    declarations: [ArchangelApplication],
    bootstrap: [ArchangelApplication],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: '/',
        }]
})
export class ArchangelModule { }
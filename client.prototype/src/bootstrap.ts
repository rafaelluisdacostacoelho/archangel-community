import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ArchangelModule } from './application.module';

//import { PLATFORM_DIRECTIVES, provide } from '@angular/core';

//import { HTTP_PROVIDERS, XHRBackend } from '@angular/http';
//import { LocationStrategy, HashLocationStrategy } from '@angular/common';
//import { APP_ROUTER_PROVIDERS } from './application.routes';

//import { provideForms } from '@angular/forms';

//import { InMemoryBackendService } from 'angular2-in-memory-web-api';
//import { AUTH_PROVIDERS } from 'angular2-jwt';


//import { AuthGuard } from './auth.service';

//import { FlexDirective, LayoutDirective }  from './directives/layout/index';
/*
bootstrap(ArchangelApplication, [
    ROUTER_DIRECTIVES,
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    provideForms(),
    provide(XHRBackend, {
        useClass: InMemoryBackendService
    }),
    AuthGuard,
    AUTH_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(PLATFORM_DIRECTIVES, { useValue: FlexDirective, multi: true }),
    provide(PLATFORM_DIRECTIVES, { useValue: LayoutDirective, multi: true })
]);
*/
platformBrowserDynamic().bootstrapModule(ArchangelModule);
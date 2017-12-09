import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AccountMockController, SecurityDatabaseMockController, UserMockController } from './modules/security/mock-backend/mock-controllers';

import { HttpService } from './modules/security/services/http.service';

export let BackendMockProvider = {
    provide: Http,
    deps: [MockBackend, BaseRequestOptions],
    useFactory: factory
};

export function factory(backend: MockBackend, options: BaseRequestOptions) {
    new SecurityDatabaseMockController(backend, options);
    new AccountMockController(backend, options);
    new UserMockController(backend, options);

    return new Http(backend, options);
};

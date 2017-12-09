import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Md5 } from 'ts-md5/dist/md5';

import { SecurityMockDatabase } from '../security.mock-database';

import { UserModel, IUserModel } from '../../models/user.model';

import { HttpService } from '../../services/http.service';

export class UserMockController {
    public readonly route = 'api/web/accounts';
    public readonly routeMatch = '/\/api\/web\/account\//';

    constructor(backend: MockBackend, options: BaseRequestOptions) {

        backend.connections.subscribe((connection: MockConnection) => {
            setTimeout(() => {
                switch (connection.request.method) {
                    case RequestMethod.Post:
                        // api/web/users
                        // if (connection.request.url.endsWith('/api/users')) { this.postUser(connection); }

                        break;
                    case RequestMethod.Get:

                        // api/web/users
                        // if (connection.request.url.endsWith(`${this.route}/users`)) { api.getUsers(connection); }

                        // api/web/users/{id:number}
                        // if (connection.request.url.match(/\/api\/users\/\d+$/)) { api.getUser(connection); }

                        break;
                    case RequestMethod.Delete:

                        // api/web/users/{id:number}
                        // if (connection.request.url.match(/\/api\/users\/\d+$/)) { this.deleteUser(connection); }

                        break;
                }
            }, 500);
        });
    }

    // public getUsers(connection: MockConnection) {
    //     if (connection.request.headers.get('Authorization') === 'Bearer token') {
    //         let users = JSON.parse(localStorage.getItem(this.userTable));
    //         connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
    //     } else {
    //         // return 401 not authorised if token is null or invalid
    //         connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
    //     }
    // }

    // public getUser(connection: MockConnection) {
    //     // check for fake auth token in header and return user if valid, this security is
    //     // implemented server side in a real application
    //     if (connection.request.headers.get('Authorization') === 'Bearer token') {
    //         let users = JSON.parse(localStorage.getItem(this.userTable));

    //         // find user by id in users array
    //         let urlParts = connection.request.url.split('/');
    //         let id = parseInt(urlParts[urlParts.length - 1], 10);
    //         let matchedUsers = users.filter(user => { return user.id === id; });
    //         let user = matchedUsers.length ? matchedUsers[0] : null;

    //         // respond 200 OK with user
    //         connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
    //     } else {
    //         // return 401 not authorised if token is null or invalid
    //         connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
    //     }
    // }

    // public postUser(connection: MockConnection) {
    //     let users = JSON.parse(localStorage.getItem(this.userTable));

    //     // get new user object from post body
    //     let newUser = JSON.parse(connection.request.getBody());

    //     // validation
    //     let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
    //     if (duplicateUser) {
    //         return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
    //     }

    //     // save new user
    //     newUser.id = users.length + 1;
    //     users.push(newUser);
    //     localStorage.setItem(this.userTable, JSON.stringify(users));

    //     // respond 200 OK
    //     connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
    // }

    // public deleteUser(connection: MockConnection) {
    //     /* check for fake auth token in header and return user if valid, this security is implemented
    //     * server side in a real application
    //     */
    //     if (connection.request.headers.get('Authorization') === 'Bearer token') {
    //         let users = JSON.parse(localStorage.getItem(this.userTable));

    //         // find user by id in users array
    //         let urlParts = connection.request.url.split('/');
    //         let id = parseInt(urlParts[urlParts.length - 1], 10);
    //         for (let i = 0; i < users.length; i++) {
    //             let user = users[i];
    //             if (user.id === id) {
    //                 // delete user
    //                 users.splice(i, 1);
    //                 localStorage.setItem(this.userTable, JSON.stringify(users));
    //                 break;
    //             }
    //         }

    //         // respond 200 OK
    //         connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
    //     } else {
    //         // return 401 not authorised if token is null or invalid
    //         connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
    //     }
    // }
}

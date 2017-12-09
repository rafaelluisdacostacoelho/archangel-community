import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Md5 } from 'ts-md5/dist/md5';

import { SecurityMockDatabase } from '../security.mock-database';

import { UserModel, IUserModel } from '../../models/user.model';

import { HttpService } from '../../services/http.service';

export class AccountMockController {
    public readonly route = 'api/web/accounts';
    public readonly routeMatch = '/\/api\/web\/accounts\//';

    constructor(backend: MockBackend, options: BaseRequestOptions) {
        backend.connections.subscribe((connection: MockConnection) => {
            setTimeout(() => {
                switch (connection.request.method) {
                    case RequestMethod.Post:

                        // api/web/account/sign-in
                        if (connection.request.url.endsWith(`${this.route}/sign-in`)) { this.signIn(connection); }

                        // api/web/account/sign-out
                        if (connection.request.url.endsWith(`${this.route}/sign-out`)) { this.signOut(connection); }

                        // api/web/account/sign-up
                        if (connection.request.url.endsWith(`${this.route}/sign-up`)) { this.signUp(connection); }

                        break;
                }
            });
        });
    }

    private signIn(connection: MockConnection) {
        const params = JSON.parse(connection.request.getBody()) as IUserModel;
        // Find any user that matches login credentials
        const table = SecurityMockDatabase.users.where('username').equals(params.username).and(f => f.password === params.password);

        table
            .count()
            .then(quantity => {
                if (quantity === 1) {
                    table.first().then(user => {
                        // Creating the token
                        const token = Md5.hashAsciiStr(user.username);

                        // Authenticate the user on database.
                        SecurityMockDatabase.users.update(user.id, { token: token });

                        const options = new ResponseOptions({
                            status: 200,
                            body: {
                                id: user.id,
                                username: user.username,
                                firstname: user.firstname,
                                middlename: user.middlename,
                                lastname: user.lastname,
                                token: token
                            }
                        });

                        connection.mockRespond(new Response(options));

                    });
                } else if (quantity > 1) {
                    connection.mockError(new Error('A failure has occurred, please contact support and report it.'));
                } else {
                    connection.mockError(new Error('Username or password is incorrect'));
                }
            })
            .catch(reason => {
                connection.mockError(new Error(reason.message));
            });
    }

    private signUp(connection: MockConnection) {
        const user = JSON.parse(connection.request.getBody()) as IUserModel;

        if (!user.firstname.trim()) {
            connection.mockError(new Error('The first name is required.'));
        }
        if (!user.username.trim()) {
            connection.mockError(new Error('The user name is required.'));
        }
        if (!user.password.trim()) {
            connection.mockError(new Error('The password is required.'));
        }
        if (!user.birth) {
            connection.mockError(new Error('The birth date is required.'));
        }

        SecurityMockDatabase.users
            .add(user)
            .then(value => {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
            })
            .catch(response => {
                connection.mockError(new Error(''));
            });
    }

    private signOut(connection: MockConnection) {
        const key = <number>JSON.parse(connection.request.getBody());

        SecurityMockDatabase
            .users
            .update(key, { token: null })
            .then(value => {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
            })
            .catch(reason => {
                connection.mockError(new Error(reason.message));
            });
    }
}

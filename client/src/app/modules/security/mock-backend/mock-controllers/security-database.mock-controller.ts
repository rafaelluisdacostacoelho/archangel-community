import { BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { SecurityMockDatabase } from '../security.mock-database';
import { UserSeed } from '../mock-seed/user.user-seed';

export class SecurityDatabaseMockController {
    public readonly route = 'api/web/db';
    public readonly routeMatch = '/\/api\/web\/db\//';

    constructor(backend: MockBackend, options: BaseRequestOptions) {
        backend.connections.subscribe((connection: MockConnection) => {
            setTimeout(() => {
                switch (connection.request.method) {
                    case RequestMethod.Post:

                        // api/web/db/seed
                        if (connection.request.url.endsWith(`${this.route}/seed`)) { this.seed(connection); }

                        break;
                    case RequestMethod.Delete:

                        // api/web/db/destroy
                        if (connection.request.url.endsWith(`${this.route}/destroy`)) { this.destroy(connection); }

                        // api/web/db/clear
                        if (connection.request.url.endsWith(`${this.route}/clear`)) { this.clear(connection); }

                        break;
                }
            });
        });
    }

    private destroy(connection: MockConnection) {
        SecurityMockDatabase.delete()
            .then(() => {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: 'Database successfully deleted' })));
            }).catch((err) => {
                connection.mockRespond(new Response(new ResponseOptions({ status: 400, body: 'Could not delete database' })));
            });
    }

    private clear(connection: MockConnection) {
        SecurityMockDatabase.users.clear()
            .then(() => {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: 'Database successfully deleted' })));
            }).catch((err) => {
                connection.mockRespond(new Response(new ResponseOptions({ status: 400, body: 'Could not delete database' })));
            });
    }

    private seed(connection: MockConnection) {
        const options = new ResponseOptions({ status: 200 });

        SecurityMockDatabase
            .transaction('rw', SecurityMockDatabase.users, () => {
                UserSeed.forEach(user => {
                    SecurityMockDatabase.users.where('username').equals(user.username).count()
                        .then(count => {
                            if (count === 0) {
                                SecurityMockDatabase.users.add(user);
                            }
                        });
                });
            })
            .catch(exception => {
                options.status = 400;
                options.body = exception.stack || exception;
            });

        connection.mockRespond(new Response(options));
    }
}

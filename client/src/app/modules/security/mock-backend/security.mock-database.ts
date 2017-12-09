import Dexie from 'dexie';

import { IUserModel } from '../models/user.model';

class SecurityMockDatabaseSingleton extends Dexie {
    private static _instance: SecurityMockDatabaseSingleton = null;

    users: Dexie.Table<IUserModel, number>;

    constructor() {
        super('Security');

        this.version(1).stores({
            users: '++id,username,password,firstname,middlename,lastname,birth,token'
        });
        SecurityMockDatabaseSingleton._instance = this;
    }

    static get instance(): SecurityMockDatabaseSingleton {
        if (SecurityMockDatabaseSingleton._instance === null) {
            SecurityMockDatabaseSingleton._instance = new SecurityMockDatabaseSingleton();
        }
        return SecurityMockDatabaseSingleton._instance;
    }
}

export let SecurityMockDatabase = SecurityMockDatabaseSingleton.instance;

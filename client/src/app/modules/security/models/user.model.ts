export interface IUserModel {
    id: number;
    username: string;
    password: string;
    firstname: string;
    middlename: string;
    lastname: string;
    birth: Date;
    token: string;
}

export class UserModel implements IUserModel {
    public id: number;
    public username: string;
    public password: string;
    public firstname: string;
    public middlename: string;
    public lastname: string;
    public birth: Date;
    public token: string;
    constructor(
        id?: number,
        username?: string,
        password?: string,
        firstname?: string,
        middlename?: string,
        lastname?: string,
        birth?: Date,
        token?: string
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
        this.birth = birth;
        this.token = token;
    }
}

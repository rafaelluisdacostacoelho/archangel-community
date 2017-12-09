import { Control, ControlGroup, Validators } from '@angular/common';
// import { UserNameValidators } from '../../Utilities/Validators/Directives/UserNameValidators';
// import { PasswordValidators } from '../../Utilities/Validators/Directives/PasswordValidators';

export interface IRegisterViewModel {
    userName: string;
    fullName: string;
    birth: Date;
    email: string;
    password: string;
    confirmPassword: string;
    accept: boolean;
}

export class RegisterViewModel implements IRegisterViewModel {
    public userName: string;
    public fullName: string;
    public birth: Date;
    public email: string;
    public password: string;
    public confirmPassword: string;
    public accept: boolean;
}

export class RegisterViewModelControlGroup extends ControlGroup {
    private _userNameControl: Control;
    private _fullNameControl: Control;
    private _birthControl: Control;
    private _emailControl: Control;
    private _passwordControl: Control;
    private _confirmPasswordControl: Control;

    get userNameControl(): Control {
        this._userNameControl = new Control('', Validators.compose([
            // UserNameValidators.startsWithNumber, // TODO: error on charAt
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50)
        ]));

        return this._userNameControl;
    }

    get fullNameControl(): Control {
        this._fullNameControl = new Control('', Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50)
        ]));
        return this._fullNameControl;
    }
    get birthControl(): Control {
        this._birthControl = new Control('', Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50)
        ]));
        return this._birthControl;
    }

    get emailControl(): Control {
        this._emailControl = new Control('', Validators.compose([
            Validators.pattern('^.+@.+\..+$'),
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100)
        ]));
        return this._emailControl;
    }

    get passwordControl(): Control {
        this._passwordControl = new Control('', Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(16)
        ]));
        return this._passwordControl;
    }

    get confirmPasswordControl(): Control {
        this._confirmPasswordControl = new Control('', Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(16)
            // PasswordValidators.matchingPasswords('password', 'confirmPassword')
        ]));

        return this._confirmPasswordControl;
    }

    constructor() {
        super({});

        super.addControl('userName', this.userNameControl);
        super.addControl('fullName', this.fullNameControl);
        super.addControl('birth', this.birthControl);
        super.addControl('email', this.emailControl);
        super.addControl('password', this.passwordControl);
        super.addControl('confirmPassword', this.confirmPasswordControl);
    }
}

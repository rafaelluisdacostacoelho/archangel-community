import { Control, ControlGroup, Validators } from '@angular/common';
// import { EmailValidators } from '../../Utilities/Validators/Directives/EmailValidators';

export class ForgotPasswordViewModel {
    public email: string;

    private _controlGroup: ControlGroup;

    private _emailControl: Control;

    get emailControl(): Control {
        if (!this._emailControl) {
            this._emailControl = new Control('', Validators.compose([
                // EmailValidators.verify, //TODO: error on match
                Validators.required
            ]));
        }
        return this._emailControl;
    }

    get controlGroup(): ControlGroup {
        if (!this._controlGroup) {
            this._controlGroup = new ControlGroup({
                'email': this._emailControl
            });
        }
        return this._controlGroup;
    }

    constructor() {

    }
}

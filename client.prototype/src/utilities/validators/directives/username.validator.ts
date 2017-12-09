// Promise Version
import { Directive } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Control } from '@angular/common';
// import { CONST_EXPR } from '@angular/src/facade/lang';
// import { Validator } from '@angular/src/common/forms/directives/validators';
import { IValidationResult } from '../validation-result.interface';
import { IValidator } from '../validator.interface';
// import { ValidatorFn } from 'angular2/src/common/forms/directives/validators';

// const USER_NAME_VALIDATOR = CONST_EXPR(new Provider(NG_VALIDATORS, { useExisting: forwardRef(() => UserNameValidators), multi: true }));

@Directive({
    selector: '[username][ngControl],[username][ngFormControl],[username][ngModel]'
    // providers: [USER_NAME_VALIDATOR]
})
export class UserNameValidators implements IValidator {
    
    static startsWithNumber(control: Control): IValidationResult {
        if (control.value !== '' && !isNaN(control.value.charAt(0))) {
            return { 'startsWithNumber': true };
        }
        return null;
    }

    // TODO: Passar a promessa de consulta da disponibilidade do nome de usuário
    userNameTaken(control: Control): Promise<IValidationResult> {

        let q = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'David') {
                    resolve({ 'userNameTaken': true });
                } else {
                    resolve(null);
                }
            }, 1000);
        });

        return q;
    }

    getValidationErrorMessage(code: string): string {
        let messages = {
            'invalidEmailAddress': 'Invalid email address'
        };
        return messages[code];
    }
}

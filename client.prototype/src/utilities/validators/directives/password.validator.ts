import { Control, ControlGroup } from '@angular/common';
import { IValidationResult } from '../validation-result.interface';
import { IValidator } from '../validator.interface';

export class PasswordValidators implements IValidator {
    static verify(control: Control): IValidationResult {
        // {6,100}      - Assert password is between 6 and 100 characters
        // (?=.*[0-9])  - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        }
        return { 'invalidPassword': true };
    }

    // Check if control is equal to the password control
    static confirm(control: Control, controlGroup: ControlGroup) {
        return { isEqual: control.value === controlGroup.controls['password1'].value };
    }

    // Control group validators
    static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (controlGroup: ControlGroup): { [key: string]: any } => {
            let password = controlGroup.controls[passwordKey];
            let confirmPassword = controlGroup.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }

    getValidationErrorMessage(code: string): string {
        let messages = {
            'invalidEmailAddress': 'Invalid email address'
        };
        return messages[code];
    }
}

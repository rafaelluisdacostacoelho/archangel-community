import { Control } from '@angular/common';
import { IValidationResult } from '../validation-result.interface';
import { IValidator } from '../validator.interface';

export class EmailValidators implements IValidator {
    static verify(control: Control): IValidationResult {
        // RFC 2822 compliant regex

        let email = new RegExp([
            '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&',
            '\'*+/=?^_`{|}~-]+)\*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9]',
            ')?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'
        ].join(), 'g');

        if (control.value.match(email)) {
            return null;
        }
        return { 'invalidEmailAddress': true };
    }

    getValidationErrorMessage(code: string): string {
        let messages = {
            'invalidEmailAddress': 'Invalid email address'
        };
        return messages[code];
    }
}

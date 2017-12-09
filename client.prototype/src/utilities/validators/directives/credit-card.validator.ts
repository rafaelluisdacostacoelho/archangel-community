import { Control } from '@angular/common';
import { IValidationResult } from '../validation-result.interface';
import { IValidator } from '../validator.interface';

export class CreditCardValidators implements IValidator {
    static isValid(control: Control): IValidationResult {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        let creditCard = new RegExp([
            '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?',
            ':011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0',
            '[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$'
        ].join(), 'g');

        if (control.value.match(creditCard)) {
            return null;
        }
        return { 'invalidCreditCard': true };
    }

    getValidationErrorMessage(code: string): string {
        let messages = {
            'invalidEmailAddress': 'Invalid email address'
        };
        return messages[code];
    }
}

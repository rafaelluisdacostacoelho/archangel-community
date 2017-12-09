// import { IValidationResult } from './IValidationResult';
// import * as common from '@angular/common';

export interface IValidator {
    getValidationErrorMessage(code: string): string;
}

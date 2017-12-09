// import { AbstractControl } from '@angular/common';
// import { ValidatorFn } from '@angular/src/common/forms/directives/validators'; // não existe ainda nesta versão do angular

class ValidatorFn { } // remover após atualizar o angular e implementar os padrões de projeto mais atuais

export class SpecializedValidators {
    static userName(minLength: number, maxLength: number): ValidatorFn {
        return null;
    }

    static email(): ValidatorFn {
        return null;
    }

    static creditCardNumber(): ValidatorFn {
        return null;
    }

    static password(): ValidatorFn {
        return null;
    }
}

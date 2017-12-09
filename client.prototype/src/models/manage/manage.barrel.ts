import { AddPhoneNumberViewModel } from './add-phone-number.viewmodel';
import { ChangePasswordViewModel } from './change-password.viewmodel';
import { ConfigureTwoFactorViewModel } from './configure-two-factor.viewmodel';
import { FactorViewModel } from './factor.viewmodel';
import { IndexViewModel } from './index.viewmodel';
import { ManageLoginsViewModel } from './manage-logins.viewmodel';
import { RemoveLoginViewModel } from './remove-login.viewmodel';
import { SetPasswordViewModel } from './set-password.viewmodel';
import { VerifyPhoneNumberViewModel } from './verify-phone-number.viewmodel';

export * from './add-phone-number.viewmodel';
export * from './change-password.viewmodel';
export * from './configure-two-factor.viewmodel';
export * from './factor.viewmodel';
export * from './index.viewmodel';
export * from './manage-logins.viewmodel';
export * from './remove-login.viewmodel';
export * from './set-password.viewmodel';
export * from './verify-phone-number.viewmodel';

export const MANAGE_BARREL: any[] = [
    AddPhoneNumberViewModel,
    ChangePasswordViewModel,
    ConfigureTwoFactorViewModel,
    FactorViewModel,
    IndexViewModel,
    ManageLoginsViewModel,
    RemoveLoginViewModel,
    SetPasswordViewModel,
    VerifyPhoneNumberViewModel
];

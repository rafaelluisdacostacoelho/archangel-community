import { ExternalLoginConfirmationViewModel } from './external-sign-in-confirmation.viewmodel';
import { ForgotPasswordViewModel } from './forgot-password.viewmodel';
import { LoginViewModel } from './login.viewmodel';
import { ResetPasswordViewModel } from './reset-password.viewmodel';
import { SendCodeViewModel } from './send-code.viewmodel';
import { VerifyCodeViewModel } from './verify-code.viewmodel';

export * from './external-sign-in-confirmation.viewmodel';
export * from './forgot-password.viewmodel';
export * from './login.viewmodel';
export * from './reset-password.viewmodel';
export * from './send-code.viewmodel';
export * from './verify-code.viewmodel';

export const ACCOUNT_BARREL: any[] = [
    ExternalLoginConfirmationViewModel,
    ForgotPasswordViewModel,
    LoginViewModel,
    ResetPasswordViewModel,
    SendCodeViewModel,
    VerifyCodeViewModel
];

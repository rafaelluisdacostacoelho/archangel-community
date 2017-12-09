import { Routes, RouterModule } from '@angular/router';

import { Home } from './components/home/home';
import { Store } from './components/store/store';
import { Profile } from './components/profile/profile';
import { Login } from './components/account/login/login';
import { Register } from './components/account/register/register';
import { ForgotPassword } from './components/account/forgot-password/forgot-password';
import { RegisterConfirmation } from './components/account/register-confirmation/register-confirmation';
import { NoContent } from './components/no-content/no-content';

const archangelRoutes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'store', component: Store, },
    { path: 'profile', component: Profile },
    { path: 'account/login', component: Login },
    { path: 'account/register', component: Register },
    { path: 'account/forgot-password', component: ForgotPassword },
    { path: 'account/register-confirmation', component: RegisterConfirmation },
    { path: '**', component: NoContent }
];

export const archangelRoutingProviders:any = [ ];
export const routing = RouterModule.forRoot(archangelRoutes);

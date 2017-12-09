import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

import { SecurityRoutingModule } from './security-routing.module';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { SignOutDirective } from './directives/sign-out';
import { EmailSentComponent } from './components/email-sent/email-sent.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SecurityRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [SignOutDirective],
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    SignOutDirective,
    EmailSentComponent
  ]
})
export class SecurityModule { }

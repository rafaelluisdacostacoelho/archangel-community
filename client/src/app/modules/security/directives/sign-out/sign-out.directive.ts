import { Directive, HostListener } from '@angular/core';

import { AccountService } from '../../services/account.service';

@Directive({
  selector: '[appSignOut]'
})
export class SignOutDirective {
  @HostListener('click', ['$event']) onClick(event: Event) {
    AccountService.signed.emit(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}

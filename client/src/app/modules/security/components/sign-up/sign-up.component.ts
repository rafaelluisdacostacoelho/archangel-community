import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input
} from '@angular/core';

import { AccountService } from '../../services/account.service';

import { SignUpModel } from '../../models/sign-up.model';
import { routerTransition } from '../../../../router.animations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [AccountService],
  animations: [routerTransition()]
})
export class SignUpComponent {
  @HostBinding('@routerTransition') routerTransition;

  @Input() model: SignUpModel = new SignUpModel('', '', '', '');

  constructor(private accountService: AccountService) { }

  signUp(event: Event) {
    event.preventDefault();
    this.accountService.signUpAsync(this.model);
  }
}

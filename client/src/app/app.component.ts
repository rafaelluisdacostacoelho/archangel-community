import {
  Component,
  ViewChild,
  ViewContainerRef,
  HostBinding,
  AfterContentInit,
  isDevMode
} from '@angular/core';
import { MdMenuTrigger } from '@angular/material';
import { MdSnackBar } from '@angular/material';

import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { AccountService } from './modules/security/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  viewProviders: [NavigationBarComponent]
})
export class AppComponent implements AfterContentInit {
  @ViewChild(NavigationBarComponent, { read: ViewContainerRef }) navigationBar: ViewContainerRef;

  public height: number;
  public isSignedIn: boolean = AccountService.isSignedIn();
  public isDevMode: boolean = isDevMode();

  ngAfterContentInit() {
    this.height = this.navigationBar.element.nativeElement.offsetHeight;

    AccountService.signed.subscribe((isSignedIn) => this.isSignedIn = isSignedIn);
  }
}

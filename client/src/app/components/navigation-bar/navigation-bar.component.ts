import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  HostListener,
  ViewEncapsulation
} from '@angular/core';

import { WindowRef } from '../../services/window.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  providers: [WindowRef]
})
export class NavigationBarComponent {
  private _scrolled = false;

  @HostBinding('class.collapsed') @Input() collapsed = false;
  @HostBinding('class.primary-color') get primaryColor(): boolean { return !this.collapsed; };
  @HostBinding('class.secondary-color') get secondaryColor(): boolean { return this.collapsed; }

  @HostListener('window:scroll') scroll() {
    if (this.windowRef.nativeWindow.pageYOffset > 100) {
      if (!this.scrolled) {
        this._transitionInto();
      }
    } else {
      if (this.scrolled) {
        this._transitionStart();
      }
    }
  }

  constructor(private windowRef: WindowRef) { }

  get scrolled(): boolean {
    return this._scrolled;
  }

  @Input() set scrolled(scrolled: boolean) {
    this._scrolled = scrolled;
  }

  private _transitionStart() {
    this.scrolled = false;
    this.collapsed = false;
  }

  private _transitionInto() {
    this.scrolled = true;
    this.collapsed = true;
  };
}

import { Component, Input, ChangeDetectorRef, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ToasterConfig } from './toaster-config';
import { ToasterService, IClearWrapper } from './toaster.service';
import { Toast } from './toast/toast';

@Component({
  selector: 'app-toaster-container',
  template: `
  <div id="toast-container" [ngClass]="[toasterConfig.positionClass, toasterConfig.animationClass]" class="ng-animate">
    <div *ngFor="let toast of toasts" [ngClass]="toasterConfig.typeClasses[toast.type]">
      <app-toast class="toast"
        [toast]="toast"
        [iconClass]="toasterConfig.iconClasses[toast.type]"
        [ngClass]="toasterConfig.typeClasses[toast.type]"
        (click)="click(toast)"
        (clickEvent)="childClick($event)"
        (mouseover)="stopTimer(toast)"
        (mouseout)="restartTimer(toast)">
      </app-toast>
    </div>
  </div>
  `,
  encapsulation: ViewEncapsulation.Emulated
})
export class ToasterContainerComponent implements OnInit, OnDestroy {
  private addToastSubscriber: any;
  private clearToastsSubscriber: any;
  private toasterService: ToasterService;

  @Input() toasterConfig: ToasterConfig;

  public toasts: Toast[] = [];

  constructor(toasterService: ToasterService, private ref: ChangeDetectorRef) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.registerSubscribers();
    if (this.toasterConfig === null || typeof this.toasterConfig === 'undefined') {
      this.toasterConfig = new ToasterConfig();
    }
  }

  click(toast: Toast, isCloseButton?: boolean) {
    if (this.toasterConfig.tapToDismiss || (toast.showCloseButton && isCloseButton)) {
      let removeToast = true;
      if (toast.clickHandler) {
        if (typeof toast.clickHandler === 'function') {
          removeToast = toast.clickHandler(toast, isCloseButton);
        } else {
          console.log('The toast click handler is not a callable function.');
          return false;
        }
      }

      if (removeToast) {
        this.removeToast(toast);
      }
    }
  }

  childClick($event: any) {
    this.click($event.value.toast, $event.value.isCloseButton);
  }

  stopTimer(toast: Toast) {
    if (this.toasterConfig.mouseoverTimerStop) {
      if (toast.timeoutId) {
        window.clearTimeout(toast.timeoutId);
        toast.timeoutId = null;
      }
    }
  }

  restartTimer(toast: Toast) {
    if (this.toasterConfig.mouseoverTimerStop) {
      if (!toast.timeoutId) {
        this.configureTimer(toast);
      }
    } else if (toast.timeoutId === null) {
      this.removeToast(toast);
    }
  }


  private registerSubscribers() {
    this.addToastSubscriber = this.toasterService.addToast.subscribe((toast: Toast) => {
      this.addToast(toast);
    });

    this.clearToastsSubscriber = this.toasterService.clearToasts.subscribe((clearWrapper: IClearWrapper) => {
      this.clearToasts(clearWrapper);
    });
  }

  private addToast(toast: Toast) {
    toast.toasterConfig = this.toasterConfig;

    if (toast.toastContainerId && this.toasterConfig.toastContainerId
      && toast.toastContainerId !== this.toasterConfig.toastContainerId) { return; }

    if (!toast.type) {
      toast.type = this.toasterConfig.defaultTypeClass;
    }

    if (this.toasterConfig.preventDuplicates && this.toasts.length > 0) {
      if (toast.toastId && this.toasts.some(t => t.toastId === toast.toastId)) {
        return;
      } else if (this.toasts.some(t => t.body === toast.body)) {
        return;
      }
    }

    if (toast.showCloseButton === null || typeof toast.showCloseButton === 'undefined') {
      if (typeof this.toasterConfig.showCloseButton === 'object') {
        toast.showCloseButton = this.toasterConfig.showCloseButton[toast.type];
      } else if (typeof this.toasterConfig.showCloseButton === 'boolean') {
        toast.showCloseButton = <boolean>this.toasterConfig.showCloseButton;
      }
    }

    if (toast.showCloseButton) {
      toast.closeHtml = toast.closeHtml || this.toasterConfig.closeHtml;
    }

    toast.bodyOutputType = toast.bodyOutputType || this.toasterConfig.bodyOutputType;

    this.configureTimer(toast);

    if (this.toasterConfig.newestOnTop) {
      this.toasts.unshift(toast);
      if (this.isLimitExceeded()) {
        this.toasts.pop();
      }
    } else {
      this.toasts.push(toast);
      if (this.isLimitExceeded()) {
        this.toasts.shift();
      }
    }

    if (toast.onShowCallback) {
      toast.onShowCallback(toast);
    }
  }

  private configureTimer(toast: Toast) {
    let timeout = (typeof toast.timeout === 'number')
      ? toast.timeout : this.toasterConfig.timeout;

    if (typeof timeout === 'object') { timeout = timeout[toast.type]; }
    if (timeout > 0) {
      toast.timeoutId = window.setTimeout(() => {
        this.ref.markForCheck();
        this.removeToast(toast);
      }, timeout);
    }
  }

  private isLimitExceeded() {
    return this.toasterConfig.limit && this.toasts.length > this.toasterConfig.limit;
  }

  private removeToast(toast: Toast) {
    const index = this.toasts.indexOf(toast);
    if (index < 0) { return; }

    this.toasts.splice(index, 1);
    if (toast.timeoutId) {
      window.clearTimeout(toast.timeoutId);
      toast.timeoutId = null;
    }
    if (toast.onHideCallback) { toast.onHideCallback(toast); }
    this.toasterService._removeToastSubject.next({ toastId: toast.toastId, toastContainerId: toast.toastContainerId });
  }

  private removeAllToasts() {
    for (let i = this.toasts.length - 1; i >= 0; i--) {
      this.removeToast(this.toasts[i]);
    }
  }

  private clearToasts(clearWrapper: IClearWrapper) {
    const toastId = clearWrapper.toastId;
    const toastContainerId = clearWrapper.toastContainerId;

    if (toastContainerId === null || typeof toastContainerId === 'undefined') {
      this.clearToastsAction(toastId);
    } else if (toastContainerId === this.toasterConfig.toastContainerId) {
      this.clearToastsAction(toastId);
    }
  }

  private clearToastsAction(toastId?: string) {
    if (toastId) {
      this.removeToast(this.toasts.filter(t => t.toastId === toastId)[0]);
    } else {
      this.removeAllToasts();
    }
  }

  ngOnDestroy() {
    if (this.addToastSubscriber) { this.addToastSubscriber.unsubscribe(); }
    if (this.clearToastsSubscriber) { this.clearToastsSubscriber.unsubscribe(); }
  }
}

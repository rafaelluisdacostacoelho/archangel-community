import { Component, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing/component_fixture';

import { Toast, IClickHandler } from './toast/toast';
import { ToasterService } from './toaster.service';
import { ToasterContainerComponent } from './toaster-container.component';
import { ToasterConfig } from './toaster-config';
import { BodyOutputType } from './body-output-type';
import { ToasterModule } from './toaster.module';
import { BrowserModule } from '@angular/platform-browser';

// Mock component for bootstrapping <toaster-container></toaster-container>
@Component({
  selector: 'app-test-component',
  template: '<toaster-container [toasterConfig]="toasterConfig"></toaster-container>',
})
export class TestComponent {
  toasterService: ToasterService;

  public toasterConfig: ToasterConfig = new ToasterConfig({
    showCloseButton: true,
    tapToDismiss: false,
    timeout: 0,
    toastContainerId: 1
  });
  public toasterConfig2: ToasterConfig = new ToasterConfig({
    showCloseButton: true,
    tapToDismiss: false,
    timeout: 0,
    toastContainerId: 2
  });

  constructor(toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

}

@NgModule({
  imports: [ToasterModule],
  declarations: [TestComponent]
})
export class TestComponentModule { }


// Mock component for testing bodyOutputType Component rendering
@Component({
  selector: 'app-test-dynamic-component',
  template: `<div>loaded via component</div>`
})
export class TestDynamicComponent { }
@NgModule({
  bootstrap: [TestDynamicComponent],
  declarations: [TestDynamicComponent]
})
export class TestDynamicComponentModule { }

@Component({
  selector: 'app-bound-dynamic-component',
  template: '<div>{{someValue}} loaded via component<button (click)="clickHandler()" id="click"></button></div>'
})
export class TestBoundDynamicComponent {
  someValue = 'Some value';
  public toast: Toast = null;

  clickHandler() {
    this.toast.title = 'updated title';
  }
}

@NgModule({
  bootstrap: [TestBoundDynamicComponent],
  declarations: [TestBoundDynamicComponent]
})
export class TestBoundDynamicComponentModule { }

describe('ToasterContainerComponent with sync ToasterService', () => {
  let toasterService: ToasterService;
  let toasterContainer: ToasterContainerComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ToasterModule, BrowserModule]
    });

    fixture = TestBed.createComponent<TestComponent>(TestComponent);
    toasterContainer = fixture.debugElement.children[0].componentInstance;
    toasterService = fixture.componentInstance.toasterService;
    return fixture;
  });


  it('should pop toast synchronously', () => {
    toasterContainer.ngOnInit();
    toasterService.pop('success', 'test', 'test');

    expect(toasterContainer.toasts.length).toBe(1);
  });

  it('should pop toast asynchronously', () => {
    // create test-specific fixture to protect against
    // container being overwritten by other tests since this
    // test now executes fully asynchronously
    const internalFixture = TestBed.createComponent<TestComponent>(TestComponent);
    const internalToasterContainer = fixture.debugElement.children[0].componentInstance;
    const internalToasterService = fixture.componentInstance.toasterService;

    internalFixture.detectChanges();

    internalFixture.whenStable().then(() => {
      internalToasterContainer.ngOnInit();

      internalToasterService.popAsync('success', 'test', 'test')
        .subscribe(toast => {
          expect(toast).toBeDefined();
          expect(toast.type).toBe('success');
          expect(internalToasterContainer.toasts.length).toBe(1);
          expect(toast.toastId).toBe(internalToasterContainer.toasts[0].toastId);
        });
    });
  });

  it('should pop toast asynchronously multiple times', () => {
    // create test-specific fixture to protect against
    // container being overwritten by other tests since this
    // test now executes fully asynchronously
    const internalFixture = TestBed.createComponent<TestComponent>(TestComponent);
    const internalToasterContainer = fixture.debugElement.children[0].componentInstance;
    const internalToasterService = fixture.componentInstance.toasterService;

    internalFixture.detectChanges();

    internalFixture.whenStable().then(() => {
      internalToasterContainer.ngOnInit();

      internalToasterService.popAsync('success', 'test', 'test');
      internalToasterService.popAsync('success', 'test', 'test');
      internalToasterService.popAsync('success', 'test', 'test')
        .subscribe(toast => {
          expect(toast).toBeDefined();
          expect(toast.type).toBe('success');

          let locatedToast;
          for (let i = 0; i < internalToasterContainer.toasts.length; i++) {
            if (internalToasterContainer.toasts[i].toastId === toast.toastId) {
              locatedToast = internalToasterContainer.toasts[i];
              break;
            }
          }

          expect(locatedToast).toBeDefined();
        });
    });
  });

  it('should retrieve toast instance from pop observer', () => {
    toasterContainer.ngOnInit();
    let toast: Toast = {
      type: 'success',
      title: 'observer toast'
    };

    expect(toasterContainer.toasts.length).toBe(0);

    toast = toasterService.pop(toast);

    expect(toast).toBeDefined();
    expect(toast.type).toBe(toast.type);
    expect(toast.title).toBe(toast.title);
    expect(toast.toastId).toBe(toasterContainer.toasts[0].toastId);
  });

  it('should clear toast synchronously', () => {
    toasterContainer.ngOnInit();

    toasterService.pop('success', 'test', 'test');
    expect(toasterContainer.toasts.length).toBe(1);

    toasterService.clear();
    expect(toasterContainer.toasts.length).toBe(0);
  });

  it('should throw exception if toast is popped without any subscribers being registered', () => {
    let hasError = false;

    try {
      toasterService.pop('success', 'test', 'test');
    } catch (e) {
      hasError = true;
      expect(e.message).toBe('No Toaster Containers have been initialized to receive toasts.');
    }

    expect(toasterContainer.toasts.length).toBe(0);
    expect(hasError).toBe(true);
  });

  it('should remove subscribers when ngOnDestroy is called', () => {
    toasterContainer.ngOnInit();

    toasterService.pop('success', 'test', 'test');
    expect(toasterContainer.toasts.length).toBe(1);

    toasterContainer.ngOnDestroy();

    toasterService.pop('success', 'test 2', 'test 2');
    toasterService.clear();
    expect(toasterContainer.toasts.length).toBe(1);
  });

  it('will not attempt to remove subscribers when ngOnDestroy is called if ngOnInit is not called', () => {
    spyOn(toasterContainer, 'ngOnInit').and.callThrough();
    spyOn(toasterContainer, 'ngOnDestroy').and.callThrough();
    expect(toasterContainer.ngOnInit).not.toHaveBeenCalled();

    toasterContainer.ngOnDestroy();

    expect(toasterContainer.ngOnDestroy).toHaveBeenCalled();
  });

  it('stopTimer should clear timer if mouseOverTimerStop is true', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ mouseoverTimerStop: true, timeout: 100 });
    toasterContainer.ngOnInit();

    toasterService.pop('success', 'test', 'test');
    const toast = toasterContainer.toasts[0];

    expect(toasterContainer.toasterConfig.mouseoverTimerStop).toBe(true);
    expect(toast).toBeDefined();
    expect(toast.timeoutId).toBeDefined();

    toasterContainer.stopTimer(toast);
    expect(toast.timeoutId).toBeNull();
  });

  it('stopTimer should not clear timer if mouseOverTimerStop is false', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ timeout: 100 });
    toasterContainer.ngOnInit();

    toasterService.pop('success', 'test', 'test');
    const toast = toasterContainer.toasts[0];

    expect(toasterContainer.toasterConfig.mouseoverTimerStop).toBe(false);
    expect(toast).toBeDefined();
    expect(toast.timeoutId).toBeDefined();

    toasterContainer.stopTimer(toast);
    expect(toast.timeoutId).toBeDefined();
  });

  it('stopTimer should not clear timer if mouseOverTimerStop is true and timeout is 0', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ mouseoverTimerStop: true, timeout: 0 });
    toasterContainer.ngOnInit();

    toasterService.pop('success', 'test', 'test');
    const toast = toasterContainer.toasts[0];

    expect(toasterContainer.toasterConfig.mouseoverTimerStop).toBe(true);
    expect(toast).toBeDefined();
    expect(toast.timeout).toBeUndefined();
    expect(toast.timeoutId).toBeUndefined();

    toasterContainer.stopTimer(toast);
    expect(toast.timeoutId).toBeUndefined();
  });

  it('restartTimer should restart timer if mouseOverTimerStop is true', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ mouseoverTimerStop: true, timeout: 100 });
    toasterContainer.ngOnInit();

    toasterService.pop('success', 'test', 'test');
    const toast = toasterContainer.toasts[0];

    expect(toasterContainer.toasterConfig.mouseoverTimerStop).toBe(true);
    expect(toast).toBeDefined();
    expect(toast.timeoutId).toBeDefined();

    toasterContainer.restartTimer(toast);
    expect(toast.timeoutId).toBeDefined();
  });

  it('restartTimer should not restart timer if mouseOverTimerStop is true and timeoutId is undefined', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ mouseoverTimerStop: true, timeout: 0 });
    toasterContainer.ngOnInit();

    toasterService.pop('success', 'test', 'test');
    const toast = toasterContainer.toasts[0];

    expect(toasterContainer.toasterConfig.mouseoverTimerStop).toBe(true);
    expect(toast).toBeDefined();
    expect(toast.timeoutId).toBeUndefined();

    toasterContainer.restartTimer(toast);
    expect(toast.timeoutId).toBeUndefined();
  });

  it('restartTimer should not restart timer if mouseOverTimerStop is false', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ timeout: 1 });
    toasterContainer.ngOnInit();

    toasterService.pop('success', 'test', 'test');
    const toast = toasterContainer.toasts[0];

    expect(toasterContainer.toasterConfig.mouseoverTimerStop).toBe(false);
    expect(toast).toBeDefined();
    expect(toast.timeoutId).toBeDefined();

    toasterContainer.restartTimer(toast);

    setTimeout(() => {
      expect(toast.timeoutId).toBeNull();
    }, 2);
  });

  it('restartTimer should remove toast if mouseOverTimerStop is false and timeoutId is null', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ timeout: 0 });
    toasterContainer.ngOnInit();

    toasterService.pop('success', 'test', 'test');
    const toast = toasterContainer.toasts[0];

    expect(toasterContainer.toasterConfig.mouseoverTimerStop).toBe(false);
    expect(toast).toBeDefined();
    expect(toast.timeoutId).toBeUndefined();

    toast.timeoutId = null;
    toasterContainer.restartTimer(toast);
    expect(toasterContainer.toasts.length).toBe(0);
  });

  it('addToast should not add toast if toasterContainerId is provided and it does not match', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ toastContainerId: 2 });
    const toast: Toast = { type: 'success', toastContainerId: 1 };
    toasterContainer.ngOnInit();

    toasterService.pop(toast);

    expect(toasterContainer.toasts.length).toBe(0);
  });

  it('addToast should use defaultTypeClass if type is empty string', () => {
    toasterContainer.ngOnInit();

    toasterService.pop('', '', '');

    expect(toasterContainer.toasterConfig.defaultTypeClass).toBe('toast-info');
    expect(toasterContainer.toasts.length).toBe(1);
    expect(toasterContainer.toasts[0].type).toBe('toast-info');
  });

  it('addToast should not add toast if preventDuplicates and the same toastId exists', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ preventDuplicates: true });
    toasterContainer.ngOnInit();
    const toast: Toast = { type: 'info' };
    toasterService.pop(toast);

    expect(toasterContainer.toasts.length).toBe(1);
    toasterService.pop(toast);
    expect(toasterContainer.toasts.length).toBe(1);
  });

  it('addToast should not add toast if preventDuplicates and toastId does not exist and the same body exists', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ preventDuplicates: true });
    toasterContainer.ngOnInit();
    const toast: Toast = { type: 'info', body: 'test' };
    const toast2: Toast = { type: 'info', body: 'test2' };
    const toast3: Toast = { type: 'info', body: 'test2' };
    toasterService.pop(toast);

    expect(toasterContainer.toasts.length).toBe(1);
    toasterService.pop(toast2);
    expect(toasterContainer.toasts.length).toBe(2);
    toasterService.pop(toast3);
    expect(toasterContainer.toasts.length).toBe(2);
  });

  it('addToast uses toast.showCloseButton if defined', () => {
    toasterContainer.ngOnInit();
    const toast: Toast = { type: 'info', showCloseButton: true };

    toasterService.pop(toast);

    fixture.detectChanges();

    expect(toasterContainer.toasts[0].showCloseButton).toBe(true);
  });

  it('addToast uses toasterConfig.showCloseButton object if defined and toast.showCloseButton is undefined', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ showCloseButton: { 'info': true } });

    toasterContainer.ngOnInit();
    const toast: Toast = { type: 'info' };
    const toast2: Toast = { type: 'success' };

    toasterService.pop(toast);
    toasterService.pop(toast2);

    const infoToast = toasterContainer.toasts.filter(t => t.type === 'info')[0];
    const successToast = toasterContainer.toasts.filter(t => t.type === 'success')[0];

    expect(infoToast.showCloseButton).toBe(true);
    expect(successToast.showCloseButton).toBeUndefined();
  });

  it('addToast uses toast.showCloseButton if defined', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ showCloseButton: '' });
    toasterContainer.ngOnInit();
    const toast: Toast = { type: 'info' };

    toasterService.pop(toast);
    expect(toasterContainer.toasts[0].showCloseButton).toBeUndefined();
  });

  it('addToast removes toast from bottom if toasterConfig.newestOnTop and limit exceeded', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ limit: 2 });
    toasterContainer.ngOnInit();

    expect(toasterContainer.toasterConfig.newestOnTop).toBe(true);
    expect(toasterContainer.toasterConfig.limit).toBe(2);

    const toast1: Toast = { type: 'info', title: '1', body: '1' };
    const toast2: Toast = { type: 'info', title: '2', body: '2' };
    const toast3: Toast = { type: 'info', title: '3', body: '3' };
    const toast4: Toast = { type: 'info', title: '4', body: '4' };

    toasterService.pop(toast1);
    toasterService.pop(toast2);
    toasterService.pop(toast3);
    toasterService.pop(toast4);
    expect(toasterContainer.toasts.length).toBe(2);
    expect(toasterContainer.toasts[0].title).toBe('4');
    expect(toasterContainer.toasts[0]).toBe(toast4);
  });

  it('addToast will not populate safeCloseHtml if closeHtml is null', () => {
    toasterContainer.toasterConfig = new ToasterConfig();
    toasterContainer.toasterConfig.closeHtml = null;
    toasterContainer.ngOnInit();

    const toast: Toast = { type: 'info', title: '1', body: '1', showCloseButton: true };

    toasterService.pop(toast);
    fixture.detectChanges();

    const closeButtonElemet = fixture.nativeElement.querySelector('.toast-close-button');
    expect(closeButtonElemet.innerHTML).toBe('');
  });

  it('addToast will populate safeCloseHtml with default html', () => {
    toasterContainer.toasterConfig = new ToasterConfig();
    toasterContainer.ngOnInit();

    const toast: Toast = { type: 'info', title: '1', body: '1', showCloseButton: true };
    toasterService.pop(toast);

    fixture.detectChanges();

    const closeButtonElement = fixture.nativeElement.querySelector('.toast-close-button');
    expect(closeButtonElement.innerHTML).toBe('<button class="toast-close-button" type="button">×</button>');
  });

  it('addToast removes toast from top if !toasterConfig.newestOnTop and limit exceeded', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ newestOnTop: false, limit: 2 });
    toasterContainer.ngOnInit();

    expect(toasterContainer.toasterConfig.newestOnTop).toBe(false);
    expect(toasterContainer.toasterConfig.limit).toBe(2);

    const toast1: Toast = { type: 'info', title: '1', body: '1' };
    const toast2: Toast = { type: 'info', title: '2', body: '2' };
    const toast3: Toast = { type: 'info', title: '3', body: '3' };
    const toast4: Toast = { type: 'info', title: '4', body: '4' };

    toasterService.pop(toast1);
    toasterService.pop(toast2);
    toasterService.pop(toast3);
    toasterService.pop(toast4);
    expect(toasterContainer.toasts.length).toBe(2);
    expect(toasterContainer.toasts[0].title).toBe('3');
    expect(toasterContainer.toasts[0]).toBe(toast3);
  });

  it('addToast calls onShowCallback if it exists', () => {
    toasterContainer.ngOnInit();

    const toast: Toast = { type: 'info', title: 'default', onShowCallback: (toaster) => toaster.title = 'updated' };
    toasterService.pop(toast);

    expect(toasterContainer.toasts[0].title).toBe('updated');
  });

  it('addToast registers timeout callback if timeout is greater than 0', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ timeout: 1 });
    toasterContainer.ngOnInit();
    const toast = toasterService.pop('success');

    expect(toast.timeoutId).toBeDefined();
    expect(toasterContainer.toasts.length).toBe(1);

    setTimeout(() => {
      expect(toasterContainer.toasts.length).toBe(0);
      expect(toast.timeoutId).toBeNull();
    }, 2);
  });

  it('addToast will not register timeout callback if toast.timeout is 0', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ timeout: 1 });
    toasterContainer.ngOnInit();

    const toast: Toast = { type: 'success', timeout: 0 };
    const poppedToast = toasterService.pop(toast);

    expect(poppedToast.timeoutId).toBeUndefined();
  });

  it('addToast will fallback to toasterConfig timeout value if toast.timeout is undefined', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ timeout: 1 });
    toasterContainer.ngOnInit();

    const toast: Toast = { type: 'success' };
    const poppedToast = toasterService.pop(toast);

    expect(poppedToast.timeoutId).toBeDefined();
    expect((<any>(poppedToast.timeoutId)).data.delay).toBe(1);
  });

  it('addToast will not register timeout if toast.timeout is undefined and toasterConfig.timeout is 0', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ timeout: 0 });
    toasterContainer.ngOnInit();

    const toast: Toast = { type: 'success' };
    const poppedToast = toasterService.pop(toast);

    expect(poppedToast.timeoutId).toBeUndefined();
  });

  it('addToast uses toasterConfig.timeout object if defined and type exists', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ timeout: { 'info': 10 } });

    toasterContainer.ngOnInit();
    const toast1: Toast = { type: 'info' };
    const toast2: Toast = { type: 'success' };

    toasterService.pop(toast1);
    toasterService.pop(toast2);

    const infoToast = toasterContainer.toasts.filter(t => t.type === 'info')[0];
    const successToast = toasterContainer.toasts.filter(t => t.type === 'success')[0];

    expect(infoToast.timeoutId).toBeDefined();
    expect(successToast.timeoutId).toBeUndefined();
  });

  it('removeToast will not remove the toast if it is not found in the toasters array', () => {
    toasterContainer.ngOnInit();
    const toast: Toast = { type: 'info' };

    toasterService.pop(toast);

    expect(toasterContainer.toasts.length).toBe(1);

    toasterService.clear('faketoastid');
    expect(toasterContainer.toasts.length).toBe(1);
  });

  it('removeToast calls onHideCallback if it exists', () => {
    toasterContainer.ngOnInit();

    let status = 'not updated';
    const internalToast: Toast = { type: 'info', title: 'default', onHideCallback: (toast) => status = 'updated' };
    toasterService.pop(internalToast);
    toasterService.clear(internalToast.toastId);

    expect(status).toBe('updated');
  });

  it('removeToast notifies the removeToast subscribers', (done) => {
    toasterContainer.ngOnInit();

    const toast: Toast = { type: 'info', title: 'default' };
    toasterService.pop(toast);

    toasterService.removeToast.subscribe(t => {
      expect(t.toastId).toEqual(toast.toastId);
      expect(t.toastContainerId).toEqual(toast.toastContainerId);
      done();
    });

    toasterService.clear(toast.toastId);
  });

  it('clearToasts will clear toasts from all containers if toastContainerId is undefined', () => {
    toasterContainer.ngOnInit();

    const toast: Toast = { type: 'info' };
    toasterService.pop(toast);

    expect(toasterContainer.toasts.length).toBe(1);

    toasterService.clear(null, undefined);
    expect(toasterContainer.toasts.length).toBe(0);
  });

  it('clearToasts will clear toasts from specified container if toastContainerId is number', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ toastContainerId: 1 });
    toasterContainer.ngOnInit();

    const toast: Toast = { type: 'info', toastContainerId: 1 };
    toasterService.pop(toast);

    expect(toasterContainer.toasts.length).toBe(1);

    toasterService.clear(null, 1);
    expect(toasterContainer.toasts.length).toBe(0);
  });

  it('clearToasts will not clear toasts from specified container if toastContainerId does not match', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ toastContainerId: 1 });
    toasterContainer.ngOnInit();

    const toast: Toast = { type: 'info', toastContainerId: 1 };
    toasterService.pop(toast);

    expect(toasterContainer.toasts.length).toBe(1);

    toasterService.clear(null, 2);
    expect(toasterContainer.toasts.length).toBe(1);
  });

  it('createGuid should create unique Guids', () => {
    toasterContainer.toasterConfig = new ToasterConfig({ toastContainerId: 1 });
    toasterContainer.ngOnInit();

    let toastIds = [];

    for (let i = 0; i < 10000; i++) {
      const toast = toasterService.pop('success', 'toast');
      toastIds.push(toast.toastId);
      toasterService.clear();
    }

    let valuesSoFar = Object.create(null);
    let dupFound = false;
    for (let i = 0; i < toastIds.length; ++i) {
      const value = toastIds[i];
      if (value in valuesSoFar) {
        dupFound = true;
        break;
      }
      valuesSoFar[value] = true;
    }

    expect(dupFound).toBe(false);

    toastIds = null;
    valuesSoFar = null;
  });
});


describe('ToasterContainerComponent when included as a component', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ToasterModule, TestDynamicComponentModule]
    });

    fixture = TestBed.createComponent<TestComponent>(TestComponent);
  });

  it('should use the bound toasterConfig object if provided', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeDefined();

    const container = fixture.debugElement.children[0].componentInstance;

    expect(container).toBeDefined();
    expect(container.toasterConfig).toBeDefined();
    expect(container.toasterConfig.showCloseButton).toBe(true);
    expect(container.toasterConfig.tapToDismiss).toBe(false);
    expect(container.toasterConfig.timeout).toBe(0);
  });

  it('should invoke the click event when a toast is clicked but not remove toast if !tapToDismiss', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.children[0].componentInstance;
    expect(container.toasterConfig.tapToDismiss).toBe(false);

    fixture.componentInstance.toasterService.pop('success', 'test', 'test');
    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);

    const toast = fixture.nativeElement.querySelector('div.toast');

    toast.click();
    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);
  });

  it('should invoke the click event when a toast is clicked and remove toast if tapToDismiss', () => {
    fixture.componentInstance.toasterConfig.tapToDismiss = true;
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeDefined();
    const container = fixture.debugElement.children[0].componentInstance;

    expect(container.toasterConfig.tapToDismiss).toBe(true);

    fixture.componentInstance.toasterService.pop('success', 'test', 'test');

    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);

    const toast = fixture.nativeElement.querySelector('div.toast');

    toast.click();
    fixture.detectChanges();
    expect(container.toasts.length).toBe(0);
  });

  it('should invoke the click event when the close button is clicked even if !tapToDismiss', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.children[0].componentInstance;

    expect(container.toasterConfig.tapToDismiss).toBe(false);

    fixture.componentInstance.toasterService.pop('success', 'test', 'test');

    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);

    const toastButton = fixture.nativeElement.querySelector('.toast-close-button');

    toastButton.click();
    fixture.detectChanges();

    expect(container.toasts.length).toBe(0);
  });

  it('should remove toast if clickHandler evaluates to true', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.children[0].componentInstance;
    const toast: Toast = {
      type: 'success', clickHandler: () => {
        return true;
      }
    };

    fixture.componentInstance.toasterService.pop(toast);
    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);

    const toastButton = fixture.nativeElement.querySelector('.toast-close-button');

    toastButton.click();
    fixture.detectChanges();

    expect(container.toasts.length).toBe(0);
  });

  it('should not remove toast if clickHandler evaluates to false', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.children[0].componentInstance;
    const toast: Toast = {
      type: 'success', clickHandler: () => {
        return false;
      }
    };

    fixture.componentInstance.toasterService.pop(toast);
    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);

    const toastButton = fixture.nativeElement.querySelector('.toast-close-button');

    toastButton.click();
    fixture.detectChanges();
    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);
  });

  it('should log error if clickHandler is not a function and not remove toast', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.children[0].componentInstance;
    const clickHandler = <IClickHandler>{};
    const toast = { type: 'success', clickHandler: clickHandler };

    fixture.componentInstance.toasterService.pop(toast);
    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);

    const toastButton = fixture.nativeElement.querySelector('.toast-close-button');
    toastButton.click();

    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);
  });

  it('addToast should render component if it exists', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.children[0].componentInstance;
    const toast: Toast = {
      type: 'success',
      title: 'Yay',
      body: TestDynamicComponent,
      bodyOutputType: BodyOutputType.Component
    };

    fixture.componentInstance.toasterService.pop(toast);
    fixture.detectChanges();

    expect(container.toasts.length).toBe(1);

    const renderedToast = fixture.nativeElement.querySelector('test-dynamic-component');
    expect(renderedToast.innerHTML).toBe('<div>loaded via component</div>');
  });


  it('addToast should render module if it exists', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.children[0].componentInstance;
    const toast: Toast = {
      type: 'success',
      title: 'Yay',
      body: TestDynamicComponent,
      bodyOutputType: BodyOutputType.Component
    };

    fixture.componentInstance.toasterService.pop(toast);
    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);

    const renderedToast = fixture.nativeElement.querySelector('test-dynamic-component');
    expect(renderedToast.innerHTML).toBe('<div>loaded via component</div>');
  });

  it('addToast should render html passed in toast.body if bodyOutputType is TrustedHtml', () => {
    const textContent = 'here is test text';
    const htmlContent = '<h4>' + textContent + '</h4>';

    fixture.detectChanges();
    const container = fixture.debugElement.children[0].componentInstance;
    const toast: Toast = {
      type: 'success',
      title: 'Yay',
      body: htmlContent,
      bodyOutputType: BodyOutputType.TrustedHtml
    };

    fixture.componentInstance.toasterService.pop(toast);
    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);

    const renderedToast = fixture.nativeElement.querySelector('.toast-message');
    const innerBody = renderedToast.querySelector('div');
    expect(innerBody.innerHTML).toBe(htmlContent);
    expect(innerBody.textContent).toBe(textContent);
    expect(innerBody.innerHTML).not.toBe(innerBody.textContent);
  });

  it('addToast will not render html if bodyOutputType is TrustedHtml and body is null', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.children[0].componentInstance;
    const toast: Toast = {
      type: 'success',
      title: 'Yay',
      body: null,
      bodyOutputType: BodyOutputType.TrustedHtml
    };

    fixture.componentInstance.toasterService.pop(toast);
    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);

    const renderedToast = fixture.nativeElement.querySelector('.toast-message');
    const innerBody = renderedToast.querySelector('div');
    expect(innerBody.innerHTML).toBe('');
  });

  it('addToast will render encoded text instead of html if bodyOutputType is Default', () => {
    const textContent = 'here is test text';
    const htmlContent = '<h4>' + textContent + '</h4>';
    const encodedString = '&lt;h4&gt;here is test text&lt;/h4&gt;';

    fixture.detectChanges();
    const container = fixture.debugElement.children[0].componentInstance;
    const toast: Toast = {
      type: 'success',
      title: 'Yay',
      body: htmlContent,
      bodyOutputType: BodyOutputType.Default
    };

    fixture.componentInstance.toasterService.pop(toast);
    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);

    const renderedToast = fixture.nativeElement.querySelector('.toast-message');
    const innerBody = renderedToast.querySelector('div');
    expect(innerBody.innerHTML).toBe(encodedString);
    expect(innerBody.textContent).toBe(htmlContent);
  });
});

describe('Multiple ToasterContainerComponent components', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ToasterModule, TestDynamicComponentModule]
    });
    TestBed.overrideComponent(TestComponent,
      {
        set: {
          template: `<toaster-container [toasterConfig]="toasterConfig"></toaster-container>
                    <toaster-container [toasterConfig]="toasterConfig2"></toaster-container>`
        }
      }
    );

    fixture = TestBed.createComponent<TestComponent>(TestComponent);
  });

  it('should create multiple container instances', () => {
    fixture.componentInstance.toasterConfig.toastContainerId = 1;
    fixture.componentInstance.toasterConfig2.toastContainerId = 2;
    fixture.detectChanges();

    expect(fixture).toBeDefined();
    expect(fixture.componentInstance.toasterConfig).toBeDefined();
    expect(fixture.componentInstance.toasterConfig2).toBeDefined();
  });

  it('should only receive toasts targeted for that container', () => {
    fixture.componentInstance.toasterConfig.toastContainerId = 1;
    fixture.componentInstance.toasterConfig2.toastContainerId = 2;
    fixture.detectChanges();

    const toast1: Toast = {
      type: 'success',
      title: 'fixture 1',
      toastContainerId: 1
    };

    const toast2: Toast = {
      type: 'success',
      title: 'fixture 2',
      toastContainerId: 2
    };

    fixture.componentInstance.toasterService.pop(toast1);
    fixture.componentInstance.toasterService.pop(toast2);

    fixture.detectChanges();

    const container1 = fixture.debugElement.children[0].componentInstance;
    const container2 = fixture.debugElement.children[1].componentInstance;

    expect(container1.toasts.length).toBe(1);
    expect(container2.toasts.length).toBe(1);
    expect(container1.toasts[0].title).toBe('fixture 1');
    expect(container2.toasts[0].title).toBe('fixture 2');
  });
});

describe('ToasterContainerComponent when included as a component with bindings', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ToasterModule, TestBoundDynamicComponentModule]
    });

    fixture = TestBed.createComponent<TestComponent>(TestComponent);
  });

  it('should use the bound toasterConfig object if provided', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeDefined();

    const container = fixture.debugElement.children[0].componentInstance;

    expect(container).toBeDefined();
    expect(container.toasterConfig).toBeDefined();
    expect(container.toasterConfig.showCloseButton).toBe(true);
    expect(container.toasterConfig.tapToDismiss).toBe(false);
    expect(container.toasterConfig.timeout).toBe(0);
  });


  it('should render the dynamic bound content', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.children[0].componentInstance;
    const toast: Toast = {
      type: 'success',
      title: 'Yay',
      body: TestBoundDynamicComponent,
      bodyOutputType: BodyOutputType.Component
    };

    fixture.componentInstance.toasterService.pop(toast);
    fixture.detectChanges();
    expect(container.toasts.length).toBe(1);

    const renderedToast = fixture.nativeElement.querySelector('bound-dynamic-component');
    expect(renderedToast.innerHTML).toBe('<div>Some value loaded via component<button id="click"></button></div>');
  });

  it('should propagate the toast instance to the component', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.children[0].componentInstance;
    const toast: Toast = {
      type: 'success',
      title: 'test',
      body: TestBoundDynamicComponent,
      bodyOutputType: BodyOutputType.Component
    };

    const toastInstance = fixture.componentInstance.toasterService.pop(toast);
    fixture.detectChanges();

    expect(container.toasts.length).toBe(1);
    expect(toastInstance.title).toBe('test');

    const clickButton = fixture.nativeElement.querySelector('#click');
    clickButton.click();

    fixture.detectChanges();

    expect(toastInstance.title).toBe('updated title');
  });
});

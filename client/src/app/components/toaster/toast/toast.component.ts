import {
  Component,
  ComponentFactoryResolver,
  ChangeDetectorRef,
  Input,
  ViewChild,
  ViewContainerRef,
  OnInit,
  Output,
  AfterViewInit,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Toast } from './toast';

import { BodyOutputType } from '../body-output-type';

@Component({
  selector: 'app-toast',
  template: `
    <i class="toaster-icon" [ngClass]="iconClass"></i>
    <div class="toast-content">
      <div [ngClass]="toast.toasterConfig.titleClass">{{toast.title}}</div>
      <div [ngClass]="toast.toasterConfig.messageClass" [ngSwitch]="toast.bodyOutputType">
        <div *ngSwitchCase="bodyOutputType.Component" #componentBody></div>
        <div *ngSwitchCase="bodyOutputType.TrustedHtml" [innerHTML]="toast.body"></div>
        <div *ngSwitchCase="bodyOutputType.Default">{{toast.body}}</div>
      </div>
    </div>
    <div class="toast-close-button" *ngIf="toast.showCloseButton" (click)="click($event, toast)" [innerHTML]="safeCloseHtml"></div>
  `,
  encapsulation: ViewEncapsulation.Emulated
})
export class ToastComponent implements OnInit, AfterViewInit {
  @Input() toast: Toast;
  @Input() iconClass: string;
  @ViewChild('componentBody', { read: ViewContainerRef }) componentBody: ViewContainerRef;

  safeCloseHtml: SafeHtml;

  public bodyOutputType = BodyOutputType;

  @Output()
  clickEvent = new EventEmitter();

  constructor(
    private sanitizer: DomSanitizer,
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.toast.closeHtml) {
      this.safeCloseHtml = this.sanitizer.bypassSecurityTrustHtml(this.toast.closeHtml);
    }
  }

  ngAfterViewInit() {
    if (this.toast.bodyOutputType === this.bodyOutputType.Component) {
      const component = this.componentFactoryResolver.resolveComponentFactory(this.toast.body);
      const componentInstance: any = this.componentBody.createComponent(component, null, this.componentBody.injector);
      componentInstance.instance.toast = this.toast;
      this.changeDetectorRef.detectChanges();
    }
  }

  click(event: MouseEvent, toast: Toast) {
    event.stopPropagation();
    this.clickEvent.emit({
      value: { toast: toast, isCloseButton: true }
    });
  }
}

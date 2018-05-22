import {Component, Input,Output, ViewChild, ComponentResolver, ViewContainerRef, EventEmitter}
from '@angular/core';
import {DomSanitizationService, SafeHtml} from '@angular/platform-browser'


import {Toast, ClickHandler} from './toast';
import {BodyOutputType} from './bodyOutputType';


@Component({
    selector: '[toastComp]',
    template: ` 
         <i class="toaster-icon" [ngClass]="iconClass"></i> 
         <div class="toast-content"> 
             <div [ngClass]="toast.toasterConfig.titleClass">{{toast.title}}</div> 
             <div [ngClass]="toast.toasterConfig.messageClass" [ngSwitch]="toast.bodyOutputType"> 
                 <div *ngSwitchCase="bodyOutputType.Component" #componentBody></div> 
                 <div *ngSwitchCase="bodyOutputType.TrustedHtml" [innerHTML]="toast.body"></div> 
                 <div *ngSwitchCase="bodyOutputType.Default">{{toast.body}}</div> 
             </div>   
         <div style="width:100%"  *ngIf="toast.showOkButton">      
             <div   class="toast-ok-button"  *ngIf="toast.showOkButton" (click)="okButtonClick($event, toast)" 
                 [innerHTML]="safeOkHtml"> 
             </div> 
               <div class="toast-no-button"  *ngIf="toast.showNoButton" (click)="closeButtonClick($event, toast)" 
                 [innerHTML]="safeCloseHtml"> 
             </div>
         </div>
         </div><div class="toast-close-button" *ngIf="toast.showCloseButton" (click)="click($event, toast)" 
             [innerHTML]="safeCloseHtml"> 
         </div>`,
    outputs: ['closeClickEvent', 'okClickEvent', 'clickEvent']
})


export class ToastComponent {


    @Input() toast: Toast;
    @Input() iconClass: string;
    @ViewChild('componentBody', { read: ViewContainerRef }) componentBody: ViewContainerRef;


    safeCloseHtml: SafeHtml;
    safeOkHtml: SafeHtml;

    private bodyOutputType = BodyOutputType;
    public closeClickEvent = new EventEmitter();
    public okClickEvent = new EventEmitter();
    public clickEvent = new EventEmitter();

    constructor(
        private resolver: ComponentResolver,
        private sanitizer: DomSanitizationService
    ) { }


    ngOnInit() {
        if (this.toast.bodyOutputType === this.bodyOutputType.Component) {
            this.resolver.resolveComponent(this.toast.body).then(factory => {
                this.componentBody.createComponent(factory, 0, this.componentBody.injector);

            });

        }


        if (this.toast.closeHtml) {
            this.safeCloseHtml = this.sanitizer.bypassSecurityTrustHtml(this.toast.closeHtml);

        }
        if (this.toast.OkHtml) {
            this.safeOkHtml = this.sanitizer.bypassSecurityTrustHtml(this.toast.OkHtml);

        }
    }


    closeButtonClick(event, toast: Toast) {
        event.stopPropagation();
        this.closeClickEvent.emit({
            value: { toast: toast, isCloseButton: true }
        });
    }
    okButtonClick(event, toast: Toast) {
        
        event.stopPropagation();
        this.okClickEvent.emit({
            value: { toast: toast, isCloseButton: true }
        });
    }

    click(event, toast: Toast) {
        event.stopPropagation();
        this.clickEvent.emit({
            value: { toast: toast, isCloseButton: true }
        });
    }
} 

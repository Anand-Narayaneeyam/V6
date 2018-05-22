

import { Injectable, Component, Renderer, EventEmitter} from '@angular/core';
import {BodyOutputType, Toast, ToasterConfig, ToasterService, ToasterContainerComponent}   from '../../ExternalLibraries/Notification/angular2-toaster';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {Observer} from 'rxjs/Observer';
import {GetToasterSettings} from './notify.getsettings.service';
@Injectable()
export class NotificationService {
    protected toasterService: ToasterService;
    protected getToasterSettings: GetToasterSettings;
    messageText: string;
    messageType: string;
    options;
    constructor(toasterService: ToasterService, getToasterSettings: GetToasterSettings) {
        this.getToasterSettings = getToasterSettings;
        this.toasterService = toasterService;
    }
   
    ShowToaster(messagetext: string, messageType: NotificationType, position?: string, timeout?: number) {
              this.options = {
                  title: this.getToasterSettings.title.name,
                  showClose: true,
                  timeout: timeout == null ? 5000 : timeout,
                  tapToDismiss: true,
                  theme: this.getToasterSettings.themes[1].code,
                  type: this.getToasterSettings.types[messageType-1].code,
                  positionClass: position ==null  ? 'toast-top-right' : 'toast-top-left',
                  showCloseButton: true,
                  showNoButton: false,
                  showOkButton: false,
                  newestOnTop: true,
                  autoDismiss: true,
                  body: messagetext,
                  toastContainerId: Guid.newGuid(),
                  toastId: Guid.newGuid()

                };           
              this.toasterService.popAsync(this.options);

              var ActiveElement: any = document.activeElement,
                  currentTimeout: any = timeout == null ? 5000 : timeout;

        setTimeout(function () {
            var RootClass: any = document.getElementsByClassName("toast-message");
            if (RootClass && RootClass.length > 0) {
                RootClass[0].title = messagetext;
                RootClass[0].setAttribute('aria-label', messagetext);
                RootClass[0].tabIndex = 0;
                if (window["GlobalFocusVariable"]) {
                    ActiveElement = window["GlobalFocusVariable"];
                    window["GlobalFocusVariable"] = null;
                }
                else
                    ActiveElement = document.activeElement;
                RootClass[0].focus();
                RootClass[0].addEventListener('focusout', function (event) {
                    ActiveElement.focus();
                    window["GlobalFocusVariable"] = null;
                });                
            }
        }, (currentTimeout / 4));

        setTimeout(function () {
            if (document.activeElement == null) {           
                ActiveElement.focus();
                window["GlobalFocusVariable"] = null;
            }
        }, ((6*currentTimeout) / 5));
    }

 ClearAllToasts( ){     
       this.toasterService.clear();

    }
}
class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}


export enum NotificationType {
    Default = 1,    
    Info = 2,
    Success = 3,
    Wait = 4,
    Error = 5,
    Warning = 6
}
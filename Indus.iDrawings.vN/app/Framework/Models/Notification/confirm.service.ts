import { Injectable, Component, Renderer, EventEmitter} from '@angular/core';
import {BodyOutputType, Toast, ToasterConfig, ConfirmToasterService, ToasterContainerComponent}   from '../../ExternalLibraries/Notification/angular2-toaster';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {Observer} from 'rxjs/Observer';
import {GetToasterSettings} from './notify.getsettings.service';
@Injectable()
export class ConfirmationService {
    protected confirmToasterService: ConfirmToasterService;
    protected getToasterSettings: GetToasterSettings;   
    options;
    constructor(confirmToasterService: ConfirmToasterService, getToasterSettings: GetToasterSettings) {
        this.getToasterSettings = getToasterSettings;
        this.confirmToasterService = confirmToasterService;
      
    }
    ShowPrompt(messagetext: string, okButtonText) {
        
        this.options = {
            title: this.getToasterSettings.title.name,            
            timeout: 0,
            expandedTimeout: 0,
            tapToDismiss: false,
            theme: this.getToasterSettings.themes[1].code,
            type: 'info',
            position: this.getToasterSettings.position[0].code,
            showCloseButton: false,           
            showNoButton: true,
            showOkButton: true,
            newestOnTop: false,
            autoDismiss: false,
            body: messagetext,
            toastContainerId: Date.now(),                  
            closeHtml: '<button class="buttons-toast" >No</button> ',   
            OkHtml: '<button class="buttons-toast" >' + okButtonText+'</button> '   
           
           
          //  bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.confirmToasterService.popAsync(this.options);
    }
    
   
}
export enum NotificationType {
    Default = 1,
    Success = 2,
    Info = 3,
    Wait = 4,
    Error = 5,
    Warning = 6
}
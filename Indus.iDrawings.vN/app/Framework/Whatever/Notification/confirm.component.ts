import { Injectable, Component, Output, EventEmitter} from '@angular/core';
import { ConfirmContainerComponent}   from '../../ExternalLibraries/Notification/angular2-toaster';
import {ConfirmationService} from '../../Models/Notification/confirm.service';
@Component({
    selector: 'confirmation',
    directives: [ConfirmContainerComponent],
    providers: [ConfirmationService],
    styleUrls: ['app/Framework/Views/Notification/toaster.css'],
    template: `
        <confirm-container (onConfirmAction)="okConfirm($event)"></confirm-container>`
  
})
export class ConfirmationComponent {

    @Output() onConfirm = new EventEmitter();
    constructor(private confirmationService: ConfirmationService) {
        this.confirmationService = confirmationService;
    }
    okConfirm(e) {  
                 
        this.onConfirm.emit(e);
    }


}
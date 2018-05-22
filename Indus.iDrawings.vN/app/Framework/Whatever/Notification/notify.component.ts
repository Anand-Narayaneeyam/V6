import { Injectable, Component, Output, EventEmitter } from '@angular/core';
import { ToasterContainerComponent}   from '../../ExternalLibraries/Notification/angular2-toaster';
import {NotificationService} from '../../Models/Notification/notify.service';
@Component({
    selector: 'notification',
    directives: [ToasterContainerComponent],
    providers: [NotificationService],
    styleUrls: ['app/Framework/Views/Notification/toaster.css'],
    template: `
        <toaster-container ></toaster-container>`,

})
export class Notification {
    constructor(private notificationService: NotificationService) {
        this.notificationService = notificationService;
    }
}
import {Component } from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'division-access',
    templateUrl: './app/Views/Administration/AccessTemplates/divisionaccess.component.html',
    directives: [Notification, ListBoxComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ["selectedIds"]
})

export class DivisionAccessComponent {

    accessDivisionsList: IField[];
    errorMessage: string;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {
        var contextObj = this;
        this.administrationService.getDivisionAccessData().subscribe(function (result) {
            contextObj.accessDivisionsList = (result["Data"]);
        });
       
    }

    updateDivisionAccess() {
        console.log(this.accessDivisionsList);
        this.administrationService.updateDivisionAccess(this.accessDivisionsList);
        this.notificationService.ShowToaster("Division Access has been updated",3);
    }
}
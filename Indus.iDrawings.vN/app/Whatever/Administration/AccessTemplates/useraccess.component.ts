import {Component } from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
//import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
//import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';

@Component({
    selector: 'template-user-access',
    templateUrl: './app/Views/Administration/AccessTemplates/useraccess.component.html',
    directives: [Notification, ListBoxComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ["selectedIds","userRole"]
})

export class TemplateUserAccessComponent {

    userList: IField[];
    errorMessage: string;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {
        this.administrationService.getTemplateUserAccess().subscribe(
            fieldDetails => this.userList = fieldDetails["data"],
            error => this.errorMessage = error);
    }

    updateUserAccessData() {
       // this.confirmationService.ShowPrompt("Access Privilege already set for the selected User(s) will be lost. Do you want to continue?", "Yes");      
        this.administrationService.updateTemplateUserAccess(this.userList);
        this.notificationService.ShowToaster("Access Template updated for the selected Users", 3);
    }
    //okDelete(event: any) {
    //    this.administrationService.updateTemplateUserAccess(this.userList);
    //    this.notificationService.ShowToaster("Access Template updated for the selected Users", 3);
    //}
}

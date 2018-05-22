import {Component} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'module-access',
    templateUrl: './app/Views/Administration/AccessTemplates/moduleaccess.component.html',
    directives: [Notification, ListBoxComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ["selectedIds"]
})

export class ModuleAccessComponent {

    accessModulesList: IField[];
    errorMessage: string;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {
        this.administrationService.getModuleAccessData().subscribe(
            fieldDetails => this.accessModulesList = fieldDetails["data"],
            error => this.errorMessage = error);
    }

    updateModuleAccess() {
        console.log(this.accessModulesList);
        this.administrationService.updateModuleAccess(this.accessModulesList);
        this.notificationService.ShowToaster("Module Access privilege has been updated", 3);
    }
}
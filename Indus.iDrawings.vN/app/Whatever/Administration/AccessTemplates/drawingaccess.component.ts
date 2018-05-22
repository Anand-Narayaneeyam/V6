import {Component} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'drawing-access',
    templateUrl: './app/Views/Administration/AccessTemplates/drawingaccess.component.html',
    directives: [Notification, CustomCheckBoxComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ["selectedIds"]
})

export class DrawingAccessComponent {

    errorMessage: string;

    drawingAccess =
    {
        "FieldId": 1,
        "FieldName": "DWG Access",
        "FieldType": 6,
        "FieldValue": "",
        "IsMandatory": false,
        "IsHiddenLabel": false,
        "IsVisible": true,
        "IsDisabled": true,
        "ReadOnlyMode": false
    }

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {
    }

    updateDrawingAccess() {
        console.log(this.drawingAccess.FieldValue);
        this.administrationService.updateDrawingAccess(this.drawingAccess.FieldValue);

        this.notificationService.ShowToaster("DWG Access has been updated", 3);
    }
}
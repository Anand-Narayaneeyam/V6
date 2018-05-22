import {Component, Output, EventEmitter, Input} from '@angular/core';
import {RealPropertyService} from '../../../Models/RealProperty/realproperty.service'
import { AdministrationService } from '../../../Models/Administration/administration.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'

@Component({
    selector: 'client-add-edit',
    templateUrl: 'app/Views/Administration/General Settings/client-addedit-component.html',
    providers: [RealPropertyService, NotificationService, AdministrationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'moduleId'],
})

export class ClientAddEditComponent {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();
    moduleId: string = "";

    constructor(private realpropertyservice: RealPropertyService, private _notificationService: NotificationService, private administrationService: AdministrationService) { }

    onSubmitData(event) {

        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    }

    postSubmit(strsubmitField: string, target: number) {

        var contextObj = this;
        var tempData = JSON.parse(strsubmitField);
        tempData.find(function (el) {
            if (el.ReportFieldId == 8350 && el.Value == "-1")
                el.Value = null;
        })
        tempData.push({
            ReportFieldId: 271,
            Value: this.moduleId
        });
        contextObj.administrationService.AddUpdateClient(JSON.stringify(tempData), this.selectedId, target).subscribe(function (resultData) {
            
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Client details added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Client details updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Client already exists", 5);
                    } else if (resultData["Data"].ServerId == -5) {
                        contextObj._notificationService.ShowToaster("Email Domain not added in iDrawings", 5);
                    }
                    break;
            }


        });

    }
}
import {Component, Output, EventEmitter, Input, AfterViewInit} from '@angular/core';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'

@Component({
    selector: 'usergroup-add-edit',
    templateUrl: 'app/Views/Administration/User Groups/user-groups-add-edit.component.html',
    providers: [AdministrationService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
})

export class UserGroupAddEditComponent {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private administrationService: AdministrationService, private _notificationService: NotificationService) { }

    ngAfterViewInit() {
        var contextObj = this;
        contextObj.administrationService.CheckIsSiteLevelUser().subscribe(function (result) {
            if (result == 1) {
                var site = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.ReportFieldId === 8340;

                });
                site.IsMandatory = true;
            }
        });
    }

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
        var fielddata = JSON.parse(strsubmitField);
        fielddata.push({
            ReportFieldId: 2831,
            Value: "0"
        });
        fielddata.push({
            ReportFieldId: 6235,
            Value: "1"
        });
        strsubmitField = JSON.stringify(fielddata);
        contextObj.administrationService.AddUpdateUserGroup(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("User Group added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("User Group updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("User Group already exists", 5);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Unknown problem", 1);
                    }
                    break;
            }
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
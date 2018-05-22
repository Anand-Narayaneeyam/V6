import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'attachment-add-edit',
    templateUrl: './app/Views/Common/Attachments/attachments-addedit.component.html',
    providers: [AdministrationService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'attachmentCategoryId', 'customerAttachmentCategoryId', 'baseEnityIdSample', 'leaseRenewalCount'],
})

export class AttachmentAddEditComponent implements OnInit {
    dataKey: string = "AttachmentId";
    selectedId: number;
    attachmentCategoryId: string;
    customerAttachmentCategoryId: string;
    baseEnityIdSample: string
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();
    fileData: string;
    leaseRenewalCount: number;
    messageLabel: string = "";

    ngOnInit(): void {

    }
    constructor(private administrationService: AdministrationService, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) { }

    onSubmitData(event) {

        this.fileData = event["filedata"];
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

        //if (Number(contextObj.attachmentCategoryId) != 18)
        //    contextObj.messageLabel = "Attachment";
        if (Number(contextObj.attachmentCategoryId) == 18)
            contextObj.messageLabel = "Document";
        else if (Number(contextObj.attachmentCategoryId) == 12)
            contextObj.messageLabel = "Invoice";
        else
            contextObj.messageLabel = "Attachment";

        var temp: any[] = JSON.parse(strsubmitField);
        var newTemp: any[] = [];

        for (let i = 0; i < temp.length; i++) {
            if (i != 2) {
                newTemp.push(temp[i]);
            }
        }


        newTemp.push({
            ReportFieldId: 52,
            Value: "11"
        });
        newTemp.push({
            ReportFieldId: 51,
            Value: contextObj.attachmentCategoryId.toString()
        });
        if (contextObj.fileData != undefined) {
            newTemp.push({
                ReportFieldId: 54,
                Value: JSON.parse(contextObj.fileData).FileSize
            });
        }
        else {
            newTemp.push({
                ReportFieldId: 54,
                Value: ""
            });
        }

        for (let i = 0; i < newTemp.length; i++) {
            if (newTemp[i].ReportFieldId == 53 && newTemp[i].Value == null) {
                newTemp[i].Value = "";

                if (contextObj.fileData != undefined) {
                    var fileDataTemp = JSON.parse(contextObj.fileData);
                    fileDataTemp["FileData"] = "";
                    fileDataTemp["FileSize"] = "";
                    //contextObj.fileData = JSON.stringify(fileDataTemp);
                    contextObj.fileData = undefined;
                }
            }
        }

        newTemp.push({
            ReportFieldId: 5741,
            Value: contextObj.baseEnityIdSample
        });
        newTemp.push({
            ReportFieldId: 5742,
            Value: contextObj.leaseRenewalCount
        });

        if (target == 1) {
            this.administrationService.postSubmitAddtAttachmentList(JSON.stringify(newTemp), contextObj.fileData, contextObj.attachmentCategoryId.toString(), contextObj.baseEnityIdSample.toString()).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj._notificationService.ShowToaster(contextObj.messageLabel + " uploaded", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                }
                else if (resultData["Data"].Message == "Invalid File") {
                    contextObj._notificationService.ShowToaster("Select a valid File", 2);
                }
                else {
                    contextObj._notificationService.ShowToaster(contextObj.messageLabel + " already exists", 5);

                }

            });
        }
        else {
            var oldFilName = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 53 })

            if (contextObj.fileData != undefined) {
                var fileDataTemp = JSON.parse(contextObj.fileData);
                fileDataTemp["OldCustAtchmtCategoryId"] = contextObj.customerAttachmentCategoryId;
                fileDataTemp["OldFileName"] = oldFilName.FieldValue;
                contextObj.fileData = JSON.stringify(fileDataTemp);
            }

            this.administrationService.postSubmitEditAttachmentList(JSON.stringify(newTemp), this.fileData, this.selectedId[0], this.attachmentCategoryId.toString(), contextObj.customerAttachmentCategoryId, this.baseEnityIdSample.toString(), oldFilName.FieldValue).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {

                    contextObj._notificationService.ShowToaster(contextObj.messageLabel + " updated", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });

                }
                else if (resultData["Data"].Message == "Object Class Attachment") {
                    contextObj._notificationService.ShowToaster("Asset Class Attachment cannot be edited", 5);

                }
                else if (resultData["Data"].Message == "Invalid File") {
                    contextObj._notificationService.ShowToaster("Select a valid File", 2);
                }
                else {
                    contextObj._notificationService.ShowToaster(contextObj.messageLabel + " already exists", 5);
                }
            });
        }
    }

    onFileUpload(event) {

        var contextObj = this;

    }
}
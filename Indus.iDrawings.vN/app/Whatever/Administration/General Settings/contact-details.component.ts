import { Component, OnInit} from '@angular/core';
import {AdministrationService} from '../../../Models/Administration/administration.service'
import { NgForm} from '@angular/forms';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models/Interface/IField'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'contact-details',
    templateUrl: './app/Views/Administration/General Settings/contact-details.component.html',
    directives: [FieldComponent, Notification],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions]
})

export class ContactDetailsComponent implements OnInit {

    public contactDetailsLogoFields: IField[];
    public errorMessage: string;
    success = "";
    btnName: string = "Save Changes";
    fileName: string = "";
    strAllowedExtensions: any;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngOnInit() {
        var contextObj = this;
        this.strAllowedExtensions = [".jpeg", ".jpg", ".bmp",".gif"];
        this.administrationService.getContactDetailsFields().subscribe(function (resultData1) {
            if (contextObj.getData.checkForUnhandledErrors(resultData1)) {
                if (resultData1["Data"] == "[]") {
                    resultData1["Data"] = null;
                }
                var filterData = resultData1["Data"].filter(function (el) {
                    if (el.ReportFieldId == 107)
                        return true;
                    else
                        return false;
                });
                contextObj.contactDetailsLogoFields = resultData1["Data"].filter(function (el) {
                    if (el.ReportFieldId == 106) {
                        if (filterData[0].FieldValue == null) {
                            el.FieldValue = "-1";
                        }
                        else {

                        }
                    }
                    if (el.ReportFieldId == 107 && filterData[0].FieldValue == null) {
                        el.IsEnable = false;
                    }
                    return true;
                });
                contextObj.contactDetailsLogoFields = resultData1["Data"];
            }
        });

    }

    fieldChange(value: any)
    {

    }

    onSubmitData(event) {
        var contextObj = this;
        var status = false;
        let test = this.getData.getFieldValuesAsReportFieldArray(this.contactDetailsLogoFields);
        var emailObj = this.contactDetailsLogoFields.find(function (item) {
            return item.ReportFieldId === 104
        });
        if (emailObj.FieldValue == null || emailObj.FieldValue == "") {
            status = true;
        }
        else {
            this.administrationService.checkMailDomain(emailObj.FieldValue).subscribe(function (result) {
                if (contextObj.getData.checkForUnhandledErrors(result)) {
                    if (result["Data"]) {
                        status = true;
                        if (event["filedata"] != undefined && status == true) {
                            if (event["filedata"].length > 0) {
                                contextObj.editFileDetails(event["fieldobject"], event["filedata"]);
                                if (contextObj.fileName.length > 100) {
                                    contextObj.notificationService.ShowToaster("Maximum length of 100 characters reached for file name", 5);
                                }
                                else {
                                    contextObj.administrationService.postSubmitContactDetailsFields(JSON.stringify(contextObj.editFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], "").subscribe(function (resultData) {
                                        if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                                        contextObj.success = resultData["Data"].Message;
                                            if (contextObj.success == "Success") {
                                                contextObj.notificationService.ShowToaster("Customer Contact Details and Logo updated", 3);
                                            }
                                            else if (contextObj.success == "Invalid File") {
                                                contextObj.notificationService.ShowToaster("Select a valid image", 2);
                                            }
                                            else {
                                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                        else {
                            contextObj.administrationService.postSubmitContactDetailsFields(JSON.stringify(contextObj.editFileDetails(event["fieldobject"], "")), event["filedata"], "").subscribe(function (resultData) {
                                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                                contextObj.success = resultData["Data"].Message;
                                    if (contextObj.success == "Success") {
                                        contextObj.notificationService.ShowToaster("Customer Contact Details and Logo updated", 3);
                                    }
                                    else if (contextObj.success == "Invalid File") {
                                        contextObj.notificationService.ShowToaster("Select a valid image", 2);
                                    }
                                    else {
                                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                    }
                                }
                            });
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Enter a valid Email address", 5);
                    }
                }
            })
        }
        if (event["filedata"] != undefined && status == true) {
            if (event["filedata"].length > 0) {
                this.editFileDetails(event["fieldobject"], event["filedata"]);
                if (this.fileName.length > 100) {
                    contextObj.notificationService.ShowToaster("Maximum length of 100 characters reached for file name", 5);
                }
                else {
                    this.administrationService.postSubmitContactDetailsFields(JSON.stringify(this.editFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], "").subscribe(function (resultData) {
                        if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                            contextObj.success = resultData["Data"].Message;
                            if (contextObj.success == "Success") {
                                contextObj.notificationService.ShowToaster("Customer Contact Details and Logo updated", 3);
                            }
                            else if (contextObj.success == "Invalid File") {
                                contextObj.notificationService.ShowToaster("Select a valid image", 2);
                            }
                            else{
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            }
                        }
                    });
                }
            }
        }

    }

    editFileDetails(fieldobject: any, filedata: any) {
        var jsonobject = JSON.parse(fieldobject);
        if (filedata != "") {
            var fileobject = JSON.parse(filedata);
        }
        if (jsonobject && filedata!="") {

            for (let i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 107) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                    this.fileName = fileobject.FileName;
                }
            }
        }
        return jsonobject;
    }

}
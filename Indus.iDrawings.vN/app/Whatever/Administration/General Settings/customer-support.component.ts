import { Component, OnInit,Input} from '@angular/core';
import {AdministrationService} from '../../../Models/Administration/administration.service'
import { NgForm} from '@angular/forms';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {  HTTP_PROVIDERS } from '@angular/http';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models/Interface/IField'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'customer-support',
    templateUrl: './app/Views/Administration/General Settings/customer-support.component.html',
    directives: [FieldComponent, Notification],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions]
})

export class CustomerSupportComponent implements OnInit {
    @Input() isMailDomain: boolean; 
    public customerSupportFields: IField[];
    public errorMessage: string;
    btnName: string = "Save Changes";
    status = "1";
    success = "";
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngOnInit() {
        var contextObj = this;
        contextObj.isMailDomain == undefined ? true : contextObj.isMailDomain;
        this.administrationService.getCustomerSupportFields(0).subscribe(function (resultData) {
            contextObj.customerSupportFields = resultData["Data"];
        });
    }

    onSubmitData() {
        var contextObj = this; 
        let test = this.getData.getFieldValuesAsReportFieldArray(this.customerSupportFields);
        var emailObj = [];
        var count = 0;
        this.customerSupportFields.find(function (item) {
            if (item.ReportFieldId == 44 || item.ReportFieldId == 47) {
                emailObj.push(item.FieldValue);
                return false;
            }
            else
                return false;
        });
        if (contextObj.isMailDomain == true) {
            contextObj.administrationService.checkMailDomain(emailObj[0]).subscribe(function (result) {
                // if (contextObj.getData.checkForUnhandledErrors(result)) {
                if (result["Data"]) {

                    contextObj.administrationService.checkMailDomain(emailObj[1]).subscribe(function (result) {
                        if (result["Data"]) {
                            contextObj.administrationService.customerSupportpostSubmit(test).subscribe(function (resultData) {
                                contextObj.success = resultData["Data"].Message;
                                if (contextObj.success == "Success") {
                                    contextObj.notificationService.ShowToaster("Customer Support details updated", 3);
                                }
                                else {
                                    contextObj.notificationService.ShowToaster("Customer Support details update Failed", 5);
                                }
                            });
                        }
                        else {
                            contextObj.notificationService.ShowToaster("Support Email Domain is not added in iDrawings", 2);
                        }
                    });

                }
                else {
                    contextObj.notificationService.ShowToaster("Sender Email Domain is not added in iDrawings", 2);
                }
            });
        } else {
            contextObj.administrationService.customerSupportpostSubmit(test).subscribe(function (resultData) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    contextObj.notificationService.ShowToaster("Customer Support details updated", 3);
                }
                else {
                    contextObj.notificationService.ShowToaster("Customer Support details update Failed", 5);
                }
            });
        }
    }
    private setFormInvalid(rptFieldId) {
        this.customerSupportFields.find(function (item) {
            if (item.ReportFieldId == rptFieldId) {
                item.HasValidationError = true;
                item.IsLocallyValidated = true;
                return true;
            } else
                return false;
        });
    }
}
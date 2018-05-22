import { Component, OnInit,Input} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NgForm } from '@angular/forms';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { HTTP_PROVIDERS} from '@angular/http';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldgeneration.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import {DrawingService } from '../../../framework/models/drawings/drawing.service';


@Component({
    selector: 'drawing-layer-names',
    templateUrl: './app/Views/Administration/Drawing Settings/drawing-layer-names.html',
    directives: [FieldComponent, Notification],
    providers: [HTTP_PROVIDERS, AdministrationService, DrawingService, NotificationService, GeneralFunctions]
})

export class DrawingLayerNamesComponent implements OnInit {
    public fieldDetails: IField[];
    public errorMessage: string;
    g_IsNetCustomer: boolean;
    btnName: string = "Save Changes";
    success = "";
    savedValues = [];
    fieldLabel = "";

    constructor(private administrationService: AdministrationService, private dwgServices: DrawingService, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngOnInit() {
        var contextObj = this;
        contextObj.dwgServices.getCustomerSettings().subscribe
            (resultData => {
                for (let i = 0; i < resultData["Data"].length; i++) {
                    switch (resultData["Data"][i]["Id"]) {
                        case 31:
                            contextObj.g_IsNetCustomer =  resultData["Data"][i]["FeatureLookupId"] == "1" ? false : true;
                            break;
                    }
                }
            });
        this.administrationService.getDrawingLayerNames().subscribe(function (resultData) {
            contextObj.fieldDetails = resultData["Data"];
            for (var value of contextObj.fieldDetails) {
                if (value.FieldValue != "" && value.FieldValue != null) {
                    contextObj.savedValues.push(value.FieldValue);
                }
            }
            if (contextObj.g_IsNetCustomer) {
                for (var value of contextObj.fieldDetails) {
                    if (value.ReportFieldId == 623) {
                        value.IsMandatory = false;
                        value.IsVisible = false;
                    }
                    if (value.ReportFieldId == 624) {
                        value.IsMandatory = false;
                        value.IsVisible = false;
                    }
                }
            }
        });
    }
    onSubmitData() {
        let test = this.getData.getFieldValuesAsReportFieldArray(this.fieldDetails);
        var contextObj = this;
        contextObj.fieldLabel = "";
        this.administrationService.postSubmit(test).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"].Message;
                console.log(contextObj.success);
                if (contextObj.success == "Success") {
                    contextObj.notificationService.ShowToaster("iDrawings Layer Names updated", 3);
                }
                else {
                    if (contextObj.savedValues.length > 0) {
                        for (var i = 0; i < contextObj.fieldDetails.length; i++) {
                            for (var j = 0; j < contextObj.savedValues.length; j++) {
                                if (contextObj.fieldDetails[i].FieldValue == contextObj.savedValues[j] && i != j) {
                                    contextObj.fieldLabel = contextObj.fieldDetails[j].FieldLabel;
                                }
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < contextObj.savedValues.length; i++) {
                            for (var j = 0; j < contextObj.savedValues.length; j++) {
                                if (contextObj.savedValues[i] == contextObj.savedValues[j] && i != j) {
                                    contextObj.fieldLabel = contextObj.fieldDetails[j].FieldLabel;
                                }
                            }
                        }
                    }
                    contextObj.notificationService.ShowToaster(contextObj.fieldLabel + " already exists", 5);
                }
            }
        });


    }
}
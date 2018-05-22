import {Component, Output, EventEmitter, Input,ViewEncapsulation} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service';

@Component({
    selector: 'agreementclause-addedit',
    templateUrl: 'app/Views/RealProperty/GeneralSettings/agreementclause-addedit.html',
    directives: [FieldComponent, Notification],
    providers: [RealPropertyService, NotificationService],
    inputs: ['selectedId', 'action', 'fieldDetailsAddEdit', 'btnName'],
    encapsulation: ViewEncapsulation.None
})

export class AgreementClauseAddEditComponent {
    success: any;
    dataKey: string = "Id";
    moduleId: any;
    selectedId: number;
    IsServiceClause: boolean = false;
    isPayable: boolean = false;
    @Input() action: string;
    @Output() submitSuccess = new EventEmitter();

    constructor(private realPropertyService: RealPropertyService, private notificationService: NotificationService) {
    }

    onSubmitData(event) {
        var contextObj = this;
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    }

    checkBoxChange(event: any) {
        var contextObj = this;
        if (event.chkBoxObject.fieldId == 899) {
            contextObj.IsServiceClause = event.chkBoxObject.IsChecked;
        }
        if (event.chkBoxObject.fieldId == 900) {
            contextObj.isPayable = event.chkBoxObject.IsChecked;
        }
    }

    postSubmit(contextObj, pageDetails: string, target: number) {
        this.realPropertyService.postSubmitAddEditAgreementClauses(pageDetails, this.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 1:
                    if (target == 1) {
                        contextObj.notificationService.ShowToaster("Agreement Clause added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Agreement Clause updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Agreement Clause already exists", 5);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Action Failure", 5);
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
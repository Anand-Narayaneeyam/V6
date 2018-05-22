import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'additional-charge-rates-add-edit',
    templateUrl: './app/Views/RealProperty/GeneralSettings/additional-charge-rates-addedit.component.html',
    providers: [RealPropertyService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'selectedAdditionalChargeId', 'totalItems', 'fromToCheckFlag'],
})

export class AdditionalChargeRatesAddEditComponent implements OnInit {
    dataKey: string = "Financial Head Id";
    selectedId: number;
    selectedAdditionalChargeId: string;
    retItem: IField;
    totalItems: number;
    fromToCheckFlag: boolean = false;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();


    ngOnInit(): void {

    }
    constructor(private realPropertyService: RealPropertyService, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) { }

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
        
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj = JSON.parse(strsubmitField);
        var financialHeadId = fieldobj.find(function (item) { return item.ReportFieldId === 5705 })
        financialHeadId.Value = this.selectedAdditionalChargeId;


        var isFlatRate = fieldobj.find(function (item) { return item.ReportFieldId === 5706 })
        var amountFrom = fieldobj.find(function (item) { return item.ReportFieldId === 5709 })
        var amountTo = fieldobj.find(function (item) { return item.ReportFieldId === 5710 })
        var rate = fieldobj.find(function (item) { return item.ReportFieldId === 5708 })

        if (Number(amountFrom.Value) > 0) {
            if (this.fromToCheckFlag == false) {
                if (Number(amountFrom.Value) >= Number(amountTo.Value)) {
                    contextObj._notificationService.ShowToaster("Amount To must be greater than Amount From", 5);
                    return;
                } 
            }
            if (this.fromToCheckFlag == true) {
                if (amountTo.Value != null && amountTo.Value != undefined && amountTo.Value != "") {
                    if (Number(amountFrom.Value) >= Number(amountTo.Value)) {
                        contextObj._notificationService.ShowToaster("Amount To should be greater than Amount From", 5);
                        return;
                    } 
                }
            }
            if (Number(amountFrom.Value) >= Number(amountTo.Value) && this.fromToCheckFlag == false) {
                contextObj._notificationService.ShowToaster("Amount To should be greater than Amount From", 5);
                    return;
            }                     
            else if (Number(rate.Value) == 0) {
                contextObj._notificationService.ShowToaster("Rate should be greater than zero", 5);
                return;
            }

            else if (isFlatRate.Value.toString() == "true") {
                if (Number(amountTo.Value) < Number(rate.Value) && amountTo.Value != "" && amountTo.Value != null && amountTo.Value != undefined) {
                    contextObj._notificationService.ShowToaster("Rate should be less than or equal to Amount To", 5);
                    return;
                }
            }
            else if (isFlatRate.Value.toString() == "false") {
                if (Number(rate.Value) > 100) {
                    contextObj._notificationService.ShowToaster("Rate should be less than or equal to 100", 5);
                    return;
                }
            }
            
        }
        else {
            contextObj._notificationService.ShowToaster("Amount From should be greater than 0", 5);
            return;
        }


        

        contextObj.realPropertyService.AddUpdateAdditionalChargeRates(JSON.stringify(fieldobj), this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Additional Charge Rate added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Additional Charge Rate updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Additional Charge Rates already exists", 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj._notificationService.ShowToaster("Additional Charge Rates already exists", 5);
                    }
                    break;
            }
        });
    }

    chkChangeevent(event: any) {
        
        var isFlatRate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 5706 })
        var rate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 5708 })
        if (isFlatRate.FieldValue == "false") {
            rate.MaxLength = 5;
            rate.FieldLabel = "Rate (%)";
        }
        else if (isFlatRate.FieldValue == "true") {
            rate.MaxLength = 14;
            rate.FieldLabel = "Rate";
        }

        setTimeout(function () {
            var el = <HTMLElement>document.getElementById("911"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/

            if (el != null && el != undefined) {
                el.focus();
                el.blur();
            }
        }, 20);

    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
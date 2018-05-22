import { Component, Output, OnInit, ElementRef, SimpleChange, OnChanges, Renderer, EventEmitter, Input,ViewEncapsulation } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models//Interface/IField';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service';

@Component({
    selector: 'additionalcharge-addedit',
    templateUrl: './app/Views/RealProperty/GeneralSettings/additional-charge-addedit.component.html',
    directives: [FieldComponent, Notification],
    providers: [RealPropertyService, NotificationService],
    inputs: ['selectedId', 'action', 'AdditionalChargeAddEdit', 'btnName', 'messages'],
    encapsulation: ViewEncapsulation.None
})

export class AdditinalchargeAddEdit implements OnInit {
    success: any;
    public AdditionalChargeAddEdit: IField[];
    objectCategoryId: number;
    btnName: string = "Add";
    dataKey: string = "Id";
    selectedId: number;
    tempdata: any[];
    addEdit: string;
    CategoryId: string;
    @Input() action: string;
    @Output() submitSuccess = new EventEmitter();
    hasFieldValue: boolean = false;
    isinUse: boolean = false;

    constructor(private RealPropertyService: RealPropertyService, private _notificationService: NotificationService, private _renderer: Renderer, private el: ElementRef) {
    }

    ngOnInit() {
        if (this.addEdit == "add") {
            this.btnName = "Save";
        }
        else if (this.addEdit == "edit") {
            this.btnName = "Save Changes";
        }
    }
    fieldChange(event) {
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
    postSubmit(contextObj, pageDetails: string, target: number) {        
        let fieldDetails = pageDetails;
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(fieldDetails);
        if (arr[2].Value == "NaN")
            arr[2].Value = "0";
        var NewfieldDetails = JSON.stringify(arr);
        if (contextObj.action =="edit") {
            this.RealPropertyService.postEditAdditionalChargesDetails(NewfieldDetails, contextObj.selectedId).subscribe(function (resultData) {
                //if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj._notificationService.ShowToaster("Additional Charge updated", 3);
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });                        
                        //contextObj.getAdditionalCharges();
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Additional Charge Name already exists", 5);                        
                    }
                    //contextObj.changeEnableMenu();
                //}

            })
        } else {
            this.RealPropertyService.postAddAdditionalChargesDetails(NewfieldDetails).subscribe(function (resultData) {
                //if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj._notificationService.ShowToaster("Additional Charge added", 3);
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });                        
                        //contextObj.getAdditionalCharges();
                    }
                    else {
                        //contextObj.additionalchargesSource.splice(contextObj.additionalchargesSource.length - 1, 1);
                        contextObj._notificationService.ShowToaster("Additional Charge Name already exists", 5);                       
                    }
                    //contextObj.changeEnableMenu();
                //}
            });
        }
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
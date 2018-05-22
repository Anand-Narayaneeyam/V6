/// <reference path="../../../framework/whatever/slide/slide.component.ts" />
import { Component, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service';
import { IField } from '../../../framework/models/interface/ifield';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions } from '../../../Models/Common/General';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'cancellation-clauses',
    templateUrl: './app/Views/RealProperty/Lease/cancellation-clauses.html',
    directives: [GridComponent, SubMenu, StringTextBoxComponent, SlideComponent],
    providers: [HTTP_PROVIDERS, RealPropertyService, NotificationService, GeneralFunctions, ValidateService, AdministrationService],
    inputs: ['leaseId', 'leaseRenewalCount', 'leaseStatus'],
    encapsulation: ViewEncapsulation.None
})

export class CancellataionClausesComponent implements OnInit {
    leaseId: number;
    leaseRenewalCount: number = 0;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    fieldObject: IField[];
    txtBxCancellationClauses: IField[];
    itemsSource: any[];
    @Output() submitSuccess = new EventEmitter();
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "", selectedIds: [], allowAdd: false };
    leaseStatus: any = "Active";
    enableMenu = [];
    menuData = [
        {
            "id": 0,
            "title": "Save",
            "image": "Save",
            "path": "Save",
            "subMenu": null,
            "privilegeId": 10053
        }       
    ];
    txtItemSource: IField;
    cost: any;
    CostDetails: any;
    Alignment: any = "horizontal";

    constructor(private realPropertyService: RealPropertyService, private notificationService: NotificationService,private _validateService: ValidateService, private administrationServices: AdministrationService, private generFun: GeneralFunctions ) {
    }

    ngOnInit() {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2280, contextObj.administrationServices, contextObj.menuData.length);

        if (this.leaseStatus == "Active" || this.leaseStatus == "Draft") {
            this.enableMenu = [0];
        }
        else {
            this.enableMenu = [];
        }
        var event =[6]
        this.realPropertyService.getCancellationClausesFields().subscribe(function (resultData) {          
            contextObj.fieldObject = resultData["Data"];    
            contextObj.txtItemSource = resultData["Data"].find(function (el) { return el.ReportFieldId === 7387; });
            contextObj.txtItemSource.IsHiddenLabel = true;   
            contextObj.txtBxCancellationClauses = resultData["Data"].find(function (el) { return el.ReportFieldId === 5748; });            
            contextObj.txtBxCancellationClauses["FieldLabel"] = "Cancellation Clause";
        });
        this.loadData();
    }

    public loadData() {
        var contextObj = this;
        this.realPropertyService.getCancellationClauses(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.leaseId, contextObj.leaseRenewalCount).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.realPropertyService.getCancellationCost(contextObj.leaseId[0]).subscribe(function (result) {
                    var temp = JSON.parse(result["Data"]["FieldBinderData"]);
                    contextObj.CostDetails = temp[0]["Cost"];
                    if (contextObj.CostDetails != null || contextObj.CostDetails != "") {
                        contextObj.txtItemSource.FieldValue = contextObj.CostDetails;
                    }
                });

            } else {
                contextObj.enableMenu = [];
                contextObj.txtItemSource.IsEnabled = false;
                contextObj.notificationService.ShowToaster("No Cancellation Clauses exist", 2);
            }
        });
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.loadData();
    }

    updateCalcellationClauses(event: any) {
        if (this.fieldObject[6].HasValidationError == false)
        {
            var contextObj = this;
            var arrayList = new Array<ReportFieldArray>();
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    arrayList.push({
                        ReportFieldId: 7384,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            arrayList.push({
                ReportFieldId: 7382,
                Value: contextObj.leaseId.toString()
            });
            arrayList.push({
                ReportFieldId: 7383,
                Value: contextObj.leaseRenewalCount.toString()
            });
            this.realPropertyService.postSubmitCancellationClauses(JSON.stringify(arrayList), contextObj.leaseId).subscribe(function (resultData) {
                if (resultData["Data"].StatusId > 0) {

                    if (contextObj.CostDetails != null && contextObj.CostDetails != "" && contextObj.CostDetails != undefined) {
                        if (contextObj.CostDetails != contextObj.cost) {
                           
                        }
                        else {
                            contextObj.cost = contextObj.CostDetails;
                        }
                    }

                    if (contextObj.cost != "" && contextObj.cost != undefined) {
                        contextObj.realPropertyService.LeaseCancellationCost(contextObj.cost, contextObj.leaseId[0]).subscribe(function (result) {
                        });
                    }
                    contextObj.notificationService.ShowToaster("Cancellation Clauses updated", 3);
                    contextObj.submitSuccess.emit({ status: "success" });
                }
            });
        }   

    }
    txtBoxChange(event) {
        //if (event.fieldObject.FieldValue != null && event.fieldObject.FieldValue != undefined) {
            event.fieldObject.IsLocallyValidated = false;
            this.initiateValidation(event.fieldObject);
            this.cost = event.fieldObject.FieldValue;
        //}

    }

    public initiateValidation(fieldObject: IField) {
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
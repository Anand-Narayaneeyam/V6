import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service';
import { IField } from '../../../framework/models/interface/ifield';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions } from '../../../Models/Common/General';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';

@Component({
    selector: 'lease-agreementclauses',
    templateUrl: './app/Views/RealProperty/GeneralSettings/lease-agreementclauses.html',
    directives: [GridComponent, SubMenu],
    providers: [HTTP_PROVIDERS, RealPropertyService, NotificationService, GeneralFunctions],
    inputs: ['leaseId', 'leaseRenewalCount']
})

export class LeaseAgreementClausesComponent implements OnInit {
    leaseId: any;
    leaseRenewalCount: any;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    fieldObject: IField[];
    itemsSource: any[];
    @Output() submitSuccess = new EventEmitter();
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "", selectedIds: [], allowAdd: false };
    enableMenu = [];
    menuData = [
        {
            "id": 0,
            "title": "Save",
            "image": "Save",
            "path": "Save",
            "subMenu": null
        }

    ];
    constructor(private realPropertyService: RealPropertyService, private notificationService: NotificationService, private getData: GeneralFunctions) {
    }

    ngOnInit() {
        this.enableMenu = [0];
        var contextObj = this;
        this.realPropertyService.getLeaseAgreementClausesFields().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        }); 
        this.loadData();    
    }  

    public loadData() {
        var contextObj = this;
        this.realPropertyService.getLeaseAgreementClauses(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.leaseId, this.leaseRenewalCount).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            } else {
                contextObj.notificationService.ShowToaster("No Agreement Clauses exist", 2);
            }
        });   
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.loadData();  
    }

    updateLeaseAgreementClauses(event: any) {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        for (let i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                arrayList.push({
                    ReportFieldId: 5747,
                    Value: contextObj.itemsSource[i].Id.toString()
                });
                arrayList.push({
                    ReportFieldId: 7359,
                    Value: contextObj.itemsSource[i].LeaseCustomerTypeId.toString()
                });
            }
        }
        arrayList.push({
            ReportFieldId: 5726,
            Value: contextObj.leaseId.toString()
        });
        arrayList.push({
            ReportFieldId: 5727,
            Value: contextObj.leaseRenewalCount.toString()
        });       
        this.realPropertyService.postSubmitLeaseAgreementClauses(JSON.stringify(arrayList), contextObj.leaseId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                contextObj.notificationService.ShowToaster("Agreement Clause(s) updated", 3);
                contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
            }
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
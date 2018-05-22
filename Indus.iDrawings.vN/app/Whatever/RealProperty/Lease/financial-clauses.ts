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
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'financial-clauses',
    templateUrl: './app/Views/RealProperty/Lease/financial-clauses.html',
    directives: [GridComponent, SubMenu, SlideComponent],
    providers: [HTTP_PROVIDERS, RealPropertyService, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['leaseId', 'leaseRenewalCount', 'leaseTypeId','financialClauseIds','action']
})

export class FinancialClausesComponent implements OnInit {
    leaseId: any;
    leaseRenewalCount: any;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    fieldObject: IField[];
    txtBxCancellationClauses: IField[];
    itemsSource: any[];
    @Output() selFinanceClauses = new EventEmitter();
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "", selectedIds: [], allowAdd: false, allowEdit: true };
    enableMenu = [];
    menuData = [
        {
            "id": 0,
            "title": "Save",
            "image": "Save",
            "path": "Save",
            "subMenu": null,
            "privilegeId": 10035
        }

    ];
    leaseTypeId: number;
    financialClauseIds: any[];
    action: any;
    constructor(private realPropertyService: RealPropertyService, private notificationService: NotificationService, private administrationServices: AdministrationService, private generFun: GeneralFunctions 
) {
    }

    ngOnInit() {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2282, contextObj.administrationServices, contextObj.menuData.length);

        this.enableMenu = [0];
        if (this.action == "add") {
            this.leaseId = 0;
        }
        else {
            this.leaseId = this.leaseId[0];
        }

        this.realPropertyService.getFinancialClausesFields().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
        this.loadData();
    }

    public loadData() {
        var tempId: any[] = [];
        if (this.financialClauseIds.length != 0) {
            for (let i = 0; i < this.financialClauseIds.length; i++) {
                tempId.push(parseInt(this.financialClauseIds[i].Value));
            }            
        }
        var array = new Array<ReportFieldArray>();
        if (this.leaseTypeId == 4) {
            
            array.push({
                ReportFieldId: 6167,
                Value: "4"
            });
            array.push({
                ReportFieldId: 6167,
                Value: "1"
            });
        }
        else if (this.leaseTypeId == 5){          
            array.push({
                ReportFieldId: 6167,
                Value: "5"
            });

        }
        else if (this.leaseTypeId == 1) {
            array.push({
                ReportFieldId: 6167,
                Value: "1"
            });
        }
        array.push({
            ReportFieldId: 6163,
            Value: this.leaseId
        });

        array.push({
            ReportFieldId: 6164,
            Value: this.leaseRenewalCount
        });

        var contextObj = this;
        this.realPropertyService.getFinancialClauses(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir,JSON.stringify(array)).subscribe(function (resultData) {
            var temp = JSON.parse(resultData["Data"].FieldBinderData);
            for (let i = 0; i < temp.length; i++) {
                var index = tempId.indexOf(temp[i].Id);
                if (index != -1) {
                    temp[i]["Select All"] = 1;
                } else if (contextObj.action == "edit" && tempId.length != 0) {
                    temp[i]["Select All"] = 0;
                }
            }
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {               
                contextObj.itemsSource = temp;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            } else {
                contextObj.notificationService.ShowToaster("No Financial Clauses exist", 2);
            }
        });
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.loadData();
    }

    okFinancialClauses(event: any) {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        let i = 0;
        for (i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                arrayList.push({
                    ReportFieldId: 7384,
                    Value: contextObj.itemsSource[i].Id.toString()
                });
            }     
        }

        if (i == contextObj.itemsSource.length) {
            if (arrayList.length != 0) {
                contextObj.selFinanceClauses.emit({ returnData: arrayList });
            }
            else {
                contextObj.notificationService.ShowToaster("Select Financial Clause(s)", 2);
            }
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
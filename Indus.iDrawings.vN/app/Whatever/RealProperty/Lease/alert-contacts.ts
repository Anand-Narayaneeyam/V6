import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service';
import { IField } from '../../../framework/models/interface/ifield';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions } from '../../../Models/Common/General';
import { LabelComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';

@Component({
    selector: 'alert-contacts',
    templateUrl: './app/Views/RealProperty/Lease/alert-contacts.html',
    directives: [GridComponent, LabelComponent, SubMenu],
    providers: [HTTP_PROVIDERS, RealPropertyService, NotificationService, GeneralFunctions],
    inputs: ['selectedId', 'leaseIdentifier']
})

export class AlertContactsComponent implements OnInit {
    selectedId: any;
    leaseIdentifier: any;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    fieldObject: IField[];
    fieldLeaseIdentifier: IField[];
    itemsSource: any[];
    @Output() submitSuccess = new EventEmitter();
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "", selectedIds: [], allowAdd: false };

    menuData = [
        {
            "id": 0,
            "title": "Save",
            "image": "Save",
            "path": "Save",
            "submenu": null
        }
    ];
    enableMenu = [0];
    constructor(private realPropertyService: RealPropertyService, private notificationService: NotificationService, private getData: GeneralFunctions) {
    }

    ngOnInit() {
        var contextObj = this;
        this.realPropertyService.getContactsForAlertFields().subscribe(function (resultData) {
            contextObj.fieldLeaseIdentifier = resultData["Data"].find(function (el) { return el.ReportFieldId === 5770; });
            contextObj.fieldLeaseIdentifier["FieldValue"] = contextObj.leaseIdentifier;
            var removeArr = [5770];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            })
        });
        this.loadData();
    }

    public loadData() {
        var contextObj = this;
        this.realPropertyService.getContactsForAlert(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            } else {
                contextObj.notificationService.ShowToaster("No Contacts exist for the selected Lease", 2);
            }
        });
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.loadData();
    }

    updateContactsForAlert(event: any) {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        for (let i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                //hasSelectedIds = true;
                arrayList.push({
                    ReportFieldId: 5753,
                    Value: contextObj.itemsSource[i].Id.toString()
                });
            }
        }
        arrayList.push({
            ReportFieldId: 5751,
            Value: contextObj.selectedId.toString()
        });
        this.realPropertyService.postSubmitContactsForAlert(JSON.stringify(arrayList), contextObj.selectedId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                contextObj.notificationService.ShowToaster("Point of Contacts for sending Alert updated", 3);
                contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
            }
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
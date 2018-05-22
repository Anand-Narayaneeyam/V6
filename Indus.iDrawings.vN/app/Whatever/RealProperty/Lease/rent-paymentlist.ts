import { Component, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { LabelComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import { GeneralFunctions } from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'rent-payment',
    templateUrl: './app/Views/RealProperty/Lease/rent-paymentlist.html',
    directives: [SplitViewComponent, SubMenu, GridComponent, PagingComponent, FieldComponent, Notification, LabelComponent],
    providers: [RealPropertyService, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['leaseId', 'leaseIdentifier', 'leaseRenewalCount']
})

export class RentPaymentComponent implements OnChanges {
    pageTitle: string;
    leaseId: number;
    leaseIdentifier: any;
    leaseRenewalCount: any;
    fieldLeaseIdentifier: IField[];
    fieldRenewalCount: IField[];
    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    itemsSource: any[];
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    action: string;
    btnName: string;
    target: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: "" };
    workflowData: number;
    success = "";
    isChanged: boolean;
    menuData = [
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 10051
        }
    ];
    gridcount = 8;
    types = false;
    enableMenu = [];
    @Output() outcomeCount = new EventEmitter();
    refreshgrid;
    constructor(private realPropertyService: RealPropertyService, private notificationService: NotificationService, private administrationServices: AdministrationService, private generFun: GeneralFunctions ) {
    }

    ngOnInit() {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2280, contextObj.administrationServices, contextObj.menuData.length);

        contextObj.loadData();
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    }

    loadData() {
        var contextObj = this;
        contextObj.realPropertyService.getRentInformationFields().subscribe(function (resultData) {
            contextObj.fieldLeaseIdentifier = resultData["Data"].find(function (el) { return el.ReportFieldId === 5770; });
            contextObj.fieldRenewalCount = resultData["Data"].find(function (el) { return el.ReportFieldId === 7866; });
            contextObj.fieldLeaseIdentifier["FieldValue"] = contextObj.leaseIdentifier;
            contextObj.fieldRenewalCount["FieldValue"] = contextObj.leaseRenewalCount;
            var removeArr = [5770, 7866];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            })
            contextObj.realPropertyService.getRentInformation(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.leaseId, contextObj.leaseRenewalCount).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.gridcount = contextObj.totalItems;
                contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
                if (contextObj.gridcount > 0) {
                    contextObj.enableMenu = [1];
                } else {
                    contextObj.notificationService.ShowToaster("No Rent Payments exist", 2);
                }
            });
        })
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                contextObj.target = 1;
                this.editClick();
                break;         
        }
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.realPropertyService.getRentInformation(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.leaseId, this.leaseRenewalCount).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.realPropertyService.getRentInformation(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.leaseId, this.leaseRenewalCount).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.realPropertyService.updateRentPayment(this.leaseId, this.leaseRenewalCount, this.inputItems.rowData["Payment No"]).subscribe(function (resultData) {
     
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1768:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "Lease Payment Number";
                            break;
                        case 1858:
                            contextObj.fieldDetailsAddEdit[i]["ReadOnlyMode"] = true;
                            break;
                    }
                }
                
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }    

    onSubmit(event: any) {
        var statusID = 44;     

        var paidamount;
        var data = JSON.parse(event["fieldobject"]);
        var d1: any;
        var d2: any;

        data.find(function (item) {
            switch (item.ReportFieldId) {
                case 7865:
                    d1 = item;
                    break;
                case 7869:
                    d2 = item;
                    break;
                case 7872:
                    paidamount = item.Value;
                    break;
            }
        });
        var index;
        index = data.indexOf(d1);
        if (index > -1) {
            data.splice(index, 1);
        }
        index = data.indexOf(d2);
        if (index > -1) {
            data.splice(index, 1);
        }

        if (parseInt(paidamount) > 0) {
            statusID = 42;
        }
        data.push({
            ReportFieldId: 7865,
            Value: this.leaseId.toString()
        });
        data.push({
            ReportFieldId: 7869,
            Value: statusID.toString()
        }); 
        
        this.refreshgrid = [];
        var contextObj = this;
        contextObj.realPropertyService.updateRentPaymentSubmit(JSON.stringify(data)).subscribe(function (resultData) {

            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var tempData = JSON.parse(resultData["Data"]["Data"]);
                    var tempStatusId = tempData[0]["StatusId"];
                    if (tempStatusId == 44) {
                        tempData[0]["Status"] ="Past Due";
                    }
                    var tempDataString = JSON.stringify(tempData);
                    contextObj.notificationService.ShowToaster("Rent Payment updated", 3);
                    var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", { returnData: tempDataString }, contextObj.inputItems.selectedIds, "Payment No", contextObj.totalItems);
                    
                    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;    
           }

        });
    }    
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}





import { Component, OnInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service';
import { AdditionalChargeRatesAddEditComponent } from './additional-charge-rates-addedit.component';

@Component({
    selector: 'additional-charge-rates',
    templateUrl: './app/Views/RealProperty/GeneralSettings/additional-charge-rates.component.html',
    directives: [FieldComponent, DropDownListComponent, SubMenu, PagingComponent, Notification, SlideComponent, GridComponent, SplitViewComponent, AdditionalChargeRatesAddEditComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, RealPropertyService],
})

export class AdditionalChargeRates implements OnInit {
    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    ddlAdditionalCharge: IField;
    itemsSource: any[];
    inputItems: IGrid = {
        dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    enableMenu = [];
    selectedAdditionalChargeId: number = 0;
    ddlChangeFlag: number;
    types: boolean = true;
    fromToCheckFlag: boolean = false;
    message = "Are you sure you want to delete the selected Additional Charge Rate?";
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit"
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        },
    ];


    position = "top-right";
    showSlide = false;
    slidewidth = 280;
    pageTitle: string;
    cardButtonPrivilege = [false, false];
    refreshgrid;
    constructor(private notificationService: NotificationService, private AdministrationService: AdministrationService, private getData: GeneralFunctions, private realPropertyService: RealPropertyService, private generFun: GeneralFunctions) {

    }
    ngOnInit(): void {
        var contextObj = this;

        this.realPropertyService.getAdditionalChargeRatesDataField().subscribe(function (resultData) {
            var updatedData = new Array();/*To notify the watcher about the change*/
            contextObj.ddlAdditionalCharge = resultData["Data"].splice(0, 1)[0];
            updatedData = updatedData.concat(resultData["Data"]);
            contextObj.fieldObject = updatedData;
            contextObj.enableMenu = [];
        })

    }

    onChnageAdditionalCharge(event: any) {
        this.ddlChangeFlag = Number(event);
        var contextObj = this;
        if (Number(event) != -1) {
            this.selectedAdditionalChargeId = Number(event);
            this.getAddlDataFieldCategory(event);
        }
        else if (Number(event) < 0 && Number(event) == -1)
        {
            this.enableMenu = [];
            contextObj.itemsSource = [];
            this.selectedAdditionalChargeId = 0;
        }
        else {
            this.enableMenu = [];
            contextObj.itemsSource = [];
            this.selectedAdditionalChargeId = 0;
        }
    }

    getAddlDataFieldCategory(event: any) {
        var contextObj = this;
        console.log("Data Field", event);
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 5705,
            Value: event
        })
        this.realPropertyService.getAdditionalChargeRatesFieldData(fieldobj, 0, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            //contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [1];
                contextObj.notificationService.ShowToaster("No Additional Charge Rates exist", 2);
            } else {
                contextObj.enableMenu = [1, 2, 3];
            }
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    }
    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.getAddlDataFieldCategory(this.selectedAdditionalChargeId);
    };
    public onSort(objGrid: any) {
        this.getAddlDataFieldCategory(this.selectedAdditionalChargeId);
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                if (this.totalItems > 0) {
                    contextObj.realPropertyService.getAdditionalChargeTORateHighValueFuctn(Number(contextObj.selectedAdditionalChargeId)).subscribe(function (result) {
                        
                        var fromDateMaxValue: number = JSON.parse(result.Data.FieldBinderData)[0].MaxOfEndValue;
                        if (fromDateMaxValue == 0)
                        {
                            contextObj.notificationService.ShowToaster("The Amount To of previous Additional Charge Rate is not entered", 2);
                            return;
                        }
                        else {
                          //  var totalItemsData = JSON.parse(contextObj.itemsSource);
                            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                                
                                if (contextObj.itemsSource[i]["Amount To"] != null && contextObj.itemsSource[i]["Amount To"] != undefined && contextObj.itemsSource[i]["Amount To"] != "") {                                   
                                    contextObj.fromToCheckFlag = true;
                                }
                                else {                                    
                                    contextObj.notificationService.ShowToaster("The Amount To of previous Additional Charge Rate is not entered", 2);
                                    return;
                                }
                            }

                            //contextObj.totalItems
                            contextObj.addClick();
                            //contextObj.fromToCheckFlag = false;
                        }
                    });
                }
                else {
                    contextObj.fromToCheckFlag = true;
                    this.addClick();                   
                }
                break;
            case 2:
                contextObj.fromToCheckFlag = true;
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
        }
    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Additional Charge Rates";
        var fromDateMaxValue: number;
        this.realPropertyService.loadAdditionalChargeRatesAddEdit("", 0, 1).subscribe(function (resultData) {
            
            var ddlId = contextObj.ddlAdditionalCharge.FieldValue;
            var additionalChargeDllValue;
            for (let i = 0; i < contextObj.ddlAdditionalCharge.LookupDetails.LookupValues.length; i++) {
                if (contextObj.ddlAdditionalCharge.LookupDetails.LookupValues[i].Id == Number(ddlId))
                    additionalChargeDllValue = contextObj.ddlAdditionalCharge.LookupDetails.LookupValues[i].Value
            }
            var additionalCharge = resultData["Data"].find(function (item) { return item.ReportFieldId === 5713 })
            additionalCharge.FieldValue = additionalChargeDllValue;

            var rate = resultData["Data"].find(function (item) { return item.ReportFieldId === 5708 })
            rate.MaxLength = 5;
            rate.FieldLabel = "Rate (%)";

            contextObj.realPropertyService.getAdditionalChargeTORateHighValueFuctn(Number(ddlId)).subscribe(function (result) {
                
                fromDateMaxValue = JSON.parse(result.Data.FieldBinderData)[0].MaxOfEndValue;
                var amountFrom = resultData["Data"].find(function (item) { return item.ReportFieldId === 5709 })
                if (fromDateMaxValue > 0) {
                    amountFrom.FieldValue = fromDateMaxValue + 1;
                    amountFrom.IsEnabled = false;
                    amountFrom.IsLocallyValidated = true;
                    amountFrom.HasValidationError = false;
                }
            });
           
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Additional Charge Rates";
        var contextObj = this;
        
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 5705,
            Value: this.selectedAdditionalChargeId.toString()
        })
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.realPropertyService.loadAdditionalChargeRatesAddEdit(fieldobj,this.inputItems.selectedIds[0], 2).subscribe(function (result) {            
                if (result["Data"][2].FieldValue == "Yes")
                    result["Data"][2].FieldValue = true;
                else if (result["Data"][2].FieldValue == "No")
                    result["Data"][2].FieldValue = false;

                var isFlatRate = result["Data"].find(function (item) { return item.ReportFieldId === 5706 })
                var rate = result["Data"].find(function (item) { return item.ReportFieldId === 5708 })
                if (isFlatRate.FieldValue == false) {
                    rate.MaxLength = 5;
                    rate.FieldLabel = "Rate (%)";
                }
                if (isFlatRate.FieldValue == true) {
                    rate.MaxLength = 14;
                    rate.FieldLabel = "Rate";
                }

                var amountFrom = result["Data"].find(function (item) { return item.ReportFieldId === 5709 })
                amountFrom.IsEnabled = false;
                amountFrom.IsLocallyValidated = true;
                amountFrom.HasValidationError = false;

                var amountTo = result["Data"].find(function (item) { return item.ReportFieldId === 5710 })
                if (amountTo.FieldValue != "") {
                    amountTo.IsEnabled = false;
                    amountTo.IsLocallyValidated = true;
                    amountTo.HasValidationError = false;
                }

                contextObj.fieldDetailsAdd1 = result["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public deleteClick() {

        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Additional Charge Rate to delete", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    }


    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];

        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            
            if (contextObj.totalItems > 0)
                contextObj.enableMenu = [1, 2, 3];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        
    }

    public deleteAdditionalChargeRates() {

        var contextObj = this;
        contextObj.realPropertyService.postAdditionalChargeRatesDelete(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                contextObj.notificationService.ShowToaster("Selected  Additional Charge Rate deleted", 3);
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                    contextObj.notificationService.ShowToaster("No Additional Charge Rates exist", 2);
                }
                
            }
            
            else {
                contextObj.notificationService.ShowToaster("Selected Additional Charge Rate delete Failed", 5);
            }
        });
    }

    public inlineDelete(event: any) {
        this.deleteAdditionalChargeRates();
    }
    //slide events/////


    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteAdditionalChargeRates();
        
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

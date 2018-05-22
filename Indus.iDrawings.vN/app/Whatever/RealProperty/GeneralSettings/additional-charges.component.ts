import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import {CardComponent} from  '../../../Framework/Whatever/Card/card.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { AdditinalchargeAddEdit } from './additional-charge-addedit.component';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'additionalcharges',
    templateUrl: './app/Views/RealProperty/GeneralSettings/additional-charges.component.html',
    directives: [ListComponent, FieldComponent, CardComponent, Notification, SubMenu, PagingComponent, Sorting, SlideComponent, GridComponent, AdditinalchargeAddEdit, SplitViewComponent],
    providers: [HTTP_PROVIDERS, RealPropertyService, NotificationService, ConfirmationService, GeneralFunctions],
    encapsulation: ViewEncapsulation.None

})

export class Additionalcharges implements OnInit {

    public totalItems: number = 0;
    returnData: any;
    types = false;
    menuClickValue: any;
    pageIndex: number = 0;
    public itemsPerPage: number = 30;
    success = "";
    action: string;
    messages: any[];
    AdditionalChargeAddEdit: IField[];
    btnName: string;
    public fieldDetails: IField[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', selectioMode: 'single', sortDir: 'ASC' };
    public errorMessage: string;
    additionalchargesSource: any[];
    submitSuccess: any[] = [];
    private fields: IField[];
    refreshgrid;
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
           
        },
    ];
    gridcount = 0;
    position = "top-right";
    pageTitle: string;
    showSlide = false;
    slidewidth = 250;
    enableMenu = [];
    selIds = new Array();
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    constructor(private RealPropertyService: RealPropertyService, private notificationService: NotificationService, private getData: GeneralFunctions, private generFun: GeneralFunctions) { }

    ngOnInit(): void {
        var contextObj = this;        
        this.RealPropertyService.getAdditionalChargesFields().subscribe(function (resultData) {   
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.fields = resultData["Data"];
                contextObj.getAdditionalCharges();
            }
        });
    }

    public changeEnableMenu() {
        var contextObj = this;
        contextObj.enableMenu = [1];
        if (contextObj.totalItems == 0) {
            contextObj.notificationService.ShowToaster("No Additional Charges exist", 2);
        }
    }

    public getAdditionalCharges() {
        var contextObj = this;
        this.RealPropertyService.getAdditionalChargesData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) { 
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"] == "") {
                    resultData["Data"] = null;
                } else {
                    contextObj.additionalchargesSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                }
                contextObj.changeEnableMenu();
            }
        });
    }


    onCardSubmit(event: any) {
        var contextObj = this;        
        let fieldDetails = event.fieldObject;     
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(fieldDetails);
        if (arr[2].Value == "NaN")
            arr[2].Value = "0";
        var NewfieldDetails = JSON.stringify(arr);
        if (event["dataKeyValue"]) {
            this.RealPropertyService.postEditAdditionalChargesDetails(NewfieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.notificationService.ShowToaster("Additional Charge updated", 3);
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                        contextObj.getAdditionalCharges();
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Additional Charge Name already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "945" });                        
                    }
                    contextObj.changeEnableMenu();
                }

            })
        } else {            
            this.RealPropertyService.postAddAdditionalChargesDetails(NewfieldDetails).subscribe(function (resultData) {   
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.notificationService.ShowToaster("Additional Charge added", 3);
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                        contextObj.getAdditionalCharges();
                    }
                    else {
                        //contextObj.additionalchargesSource.splice(contextObj.additionalchargesSource.length - 1, 1);
                        contextObj.notificationService.ShowToaster("Additional Charge Name already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "945" });
                    }
                    contextObj.changeEnableMenu();
                }
            });
        }
    }
    OnSuccessfulSubmit(event: any) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        let retUpdatedSrc;
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(this.additionalchargesSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.additionalchargesSource = retUpdatedSrc["itemSrc"];
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.generFun.updateDataSource(this.additionalchargesSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            if (retUpdatedSrc["itemSrc"]["0"]["Validated"] == "True")
                contextObj.enableMenu = [ 1, 2, 3]
            else
                contextObj.enableMenu = [0, 1, 2]
        }
        //this.itemsSource = retUpdatedSrc["itemSrc"];
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.getAdditionalCharges();
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    public onCardCancel(event: any) {
        this.changeEnableMenu();
    }

    public onSubMenuChange(event: any, Id: any) {
        this.menuClickValue = event.value;
        if (event.value == 1) // Add
        {
            this.pageTitle = "New Additional Charge";
            this.onMenuAddClick();
        }
        if (event.value == 2) // Edit
        {
            this.pageTitle = "Edit Additional Charge";
            this.onMenuEditclick();;
        }
        else if (event.value == 3) // Delete
        {
            this.onMenuDeleteClick();
        }
    }

    onDelete(e: Event) {
        this.onMenuDeleteClick();
    }

    public onMenuAddClick() {
        this.action = "add";
        this.btnName = "Save";
        var contextObj = this;
        this.RealPropertyService.loadAdditionalChargeAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.AdditionalChargeAddEdit = (resultData["Data"]);
            contextObj.AdditionalChargeAddEdit[4].IsVisible = false;                
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    public onMenuEditclick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        this.RealPropertyService.loadAdditionalChargeAddEdit(contextObj.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
            contextObj.AdditionalChargeAddEdit = (resultData["Data"]);
            contextObj.AdditionalChargeAddEdit[4].IsVisible = false;  
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    

    public onMenuDeleteClick() {
        var contextObj = this;
        var Isinuse;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            this.RealPropertyService.isAdditionalChargeInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                Isinuse = resultData["Data"];
                if (Isinuse == 0)
                    contextObj.showSlide = !contextObj.showSlide;
                else
                    contextObj.notificationService.ShowToaster("Selected Additional Charge is in use, cannot be deleted", 5);
            });
            //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Catering Item?", "Yes");           
        }
    }

    okDelete(event: Event) {
        this.deleteCatering();
        this.showSlide = !this.showSlide;
    }
    deleteCatering() {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.RealPropertyService.postDeleteAdditionalChargesDetails(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.additionalchargesSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.additionalchargesSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    //contextObj.totalItems = contextObj.totalItems - 1;
                    //for (var count = 0; count < contextObj.selIds.length; count++) {
                    //    var index = contextObj.additionalchargesSource.indexOf(contextObj.additionalchargesSource.filter(x => x["Id"] == contextObj.selIds[count])[0]);
                    //    if (index > -1)
                    //        contextObj.additionalchargesSource.splice(index, 1);
                    //}
                    contextObj.notificationService.ShowToaster("Selected Additional Charge deleted", 3);
                    //contextObj.totalItems = contextObj.totalItems - 1;
                    if (contextObj.totalItems == 0) {
                        contextObj.enableMenu = [1];
                    }
                } else {
                    contextObj.notificationService.ShowToaster("Selected Additional Charge is in use, cannot be deleted", 5);
                }
            }
        });
        //}
    }


    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    public onSorting(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.selectedField;
        this.inputItems.sortDir = objGrid.sortDirection;
        contextObj.getAdditionalCharges();
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getAdditionalCharges();
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
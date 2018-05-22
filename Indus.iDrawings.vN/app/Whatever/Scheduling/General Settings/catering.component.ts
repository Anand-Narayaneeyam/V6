import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import {CardComponent} from  '../../../Framework/Whatever/Card/card.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { CateringAssignWorkTypeComponent } from './catering-assignworktype.component'
import {CateringAddEditComponent} from './catering-add-edit.component';


@Component({
    selector: 'catering',
    templateUrl: './app/Views/Scheduling/General Settings/catering.component.html',
    directives: [ListComponent, FieldComponent, CardComponent, Notification, SubMenu, PagingComponent, Sorting, SlideComponent, SplitViewComponent, CateringAssignWorkTypeComponent, GridComponent, CateringAddEditComponent],
    providers: [HTTP_PROVIDERS, SchedulingService, NotificationService, ConfirmationService, GeneralFunctions]

})

export class CateringComponent implements OnInit {

    public totalItems: number = 0;
    returnData: any;
    types = true;
    pageIndex: number = 0;
    public itemsPerPage: number = 30;
    success = "";
    public fieldDetails: IField[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Catering Item]', sortDir: 'ASC', selectioMode:"single" };
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 50 };
    action: string;
    btnName: string;
    fieldDetailsAdd: IField[];
    fieldDetailsAdd1: IField[] = [];
    public errorMessage: string;
    cateringSource: any[];
    private fields: IField[];
    sortFields: IField[];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add"
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
            "path": "Delete"
        },
        {
            "id": 4,
            "title": "Assign Work Type",
            "image": "Assign Work Type",
            "path": "Assign Work Type"
        }
    ];
    gridcount = 0;
    position = "top-right";
    showSlide = false;
    slidewidth = 250;   
    enableMenu = [];
    selIds = new Array();
    isApprovalProcessSubscribed: boolean = false;
    pageTitle: string = "";
    menuclick: any;
    refreshgrid;
    constructor(private schedulingService: SchedulingService, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngOnInit(): void {       
        var contextObj = this;

        contextObj.schedulingService.checkSubscribedFeature('201').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0) return;

            contextObj.isApprovalProcessSubscribed = result["Data"][0]["IsSubscribed"];
        });
        this.schedulingService.getCateringFields().subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.fields = resultData["Data"];
                contextObj.getCatering();
            }
        });
    }

    public changeEnableMenu() {
        var contextObj = this;
        contextObj.enableMenu = contextObj.isApprovalProcessSubscribed ? [1,2,3,4] : [1,2,3];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Catering Item exists", 5);
        }
    }

    public getCatering() {             
        var contextObj = this;
        this.schedulingService.getCateringData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"] == "") {
                    resultData["Data"] = null;
                } else {
                    contextObj.cateringSource = JSON.parse(resultData["Data"].FieldBinderData);
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

        if (event["dataKeyValue"]) {
            this.schedulingService.postEditCateringDetails(fieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.notificationService.ShowToaster("Catering Item updated", 3);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Catering Item already exists", 5);
                        contextObj.getCatering();
                    }
                    contextObj.changeEnableMenu();
                }

            })
        } else {
            this.schedulingService.postAddCateringDetails(fieldDetails).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;

                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.notificationService.ShowToaster("Catering Item added", 3);
                        contextObj.types = false;
                        contextObj.cateringSource[contextObj.cateringSource.length - 1].Id = resultData["Data"].ServerId;
                        contextObj.totalItems = contextObj.totalItems + 1;
                    }
                    else {
                        //contextObj.cateringSource.splice(contextObj.cateringSource.length - 1, 1);
                        if (resultData["Data"].ServerId == 0) {
                            contextObj.notificationService.ShowToaster("Enter Catering Item", 5);
                        } else {
                            contextObj.notificationService.ShowToaster("Catering Item already exists", 5);
                        }
                    }
                    contextObj.changeEnableMenu();
                }
            });
        }
    }

    public onCardCancel(event: any) {
        this.changeEnableMenu();
    }

    public onSubMenuChange(event: any, Id: any) {
        this.menuclick = event.value;
        if (event.value == 1) // Add
        {
            this.onMenuAddClick();
        }
        else if (event.value == 2) // Edit
        {
            this.onMenuEditClick();
        }
        else if (event.value == 3) // Delete
        {
            this.onMenuDeleteClick();
        }
        else if (event.value == 4)//Assign work type
        {
            this.onMenuAssignWorkTypeClick();
        }       
    }

    public onMenuAssignWorkTypeClick() {
        this.action = "assign";
        this.btnName = "Save Changes";
        this.pageTitle = "Work Type"
        var contextObj = this;
        contextObj.schedulingService.loadAssignWorkTypeEdit().subscribe(function (result) {         
                contextObj.fieldDetailsAdd = result["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
        
    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.cateringSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.cateringSource = retUpdatedSrc["itemSrc"];
            this.enableMenu = [1, 2, 3];
        } else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.cateringSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    onDelete(e: Event) {
        this.onMenuDeleteClick();
    }

    public onMenuAddClick() {       
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Catering";
        var contextObj = this;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.schedulingService.getCateringAddLoad().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.fieldDetailsAdd1[2].MaxLength = 14;
            contextObj.schedulingService.loadAssignWorkTypeEdit().subscribe(function (result) {               
                    contextObj.fieldDetailsAdd = result["Data"];
                    if (contextObj.fieldDetailsAdd[1].FieldValue != "") {
                        contextObj.fieldDetailsAdd1[4].IsVisible = true;
                        contextObj.fieldDetailsAdd1[4].FieldValue = contextObj.fieldDetailsAdd[1].FieldValue
                    }
                    else {
                        contextObj.fieldDetailsAdd1[4].IsVisible = false;
                    }
            });
            //var workTypeField = contextObj.fields.find(function (item) { return item.ReportFieldId === 8755 });
            //workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
        });
    }

    public onMenuEditClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Catering";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.schedulingService.getCateringEditLoad(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAdd1 = resultData["Data"];
                contextObj.fieldDetailsAdd1[2].MaxLength = 14;
                contextObj.schedulingService.loadAssignWorkTypeEdit().subscribe(function (result) {                   
                        contextObj.fieldDetailsAdd = result["Data"];
                        if (contextObj.fieldDetailsAdd[1].FieldValue != "") {
                            contextObj.fieldDetailsAdd1[4].IsVisible = true;
                            contextObj.fieldDetailsAdd1[4].FieldValue = contextObj.fieldDetailsAdd[1].FieldValue
                        }
                        else {
                            contextObj.fieldDetailsAdd1[4].IsVisible = false;
                        }
                });

                //var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8755 });
                //workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;                
            });
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
    }

    public onMenuDeleteClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Catering Item", 2);
        }
        else {
            var isInUse = this.inputItems.rowData["IsInUse"];
            if (isInUse == 1)
                this.notificationService.ShowToaster("Selected Catering Item in use, cannot be deleted", 5);
            else
                this.showSlide = !this.showSlide;
        }
    }

    okDelete(event: Event) {
        this.deleteCatering();
        this.showSlide = !this.showSlide;
    }
    deleteCatering() {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.schedulingService.postDeleteCateringDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.cateringSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.cateringSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Catering Item deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Catering Item in use, cannot be deleted", 5);
                        }
                        break;
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
    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getCatering();
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getCatering();
    }
}
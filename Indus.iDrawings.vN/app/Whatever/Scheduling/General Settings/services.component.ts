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
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ServicesAddEditComponent } from './services-add-edit.component';

@Component({
    selector: 'services',
    templateUrl: './app/Views/Scheduling/General Settings/services.component.html',
    directives: [ListComponent, FieldComponent, CardComponent, Notification, SubMenu, PagingComponent, Sorting, SlideComponent, GridComponent, SplitViewComponent, ServicesAddEditComponent],
    providers: [HTTP_PROVIDERS, SchedulingService, NotificationService, ConfirmationService, GeneralFunctions]

})

export class ServiceComponent implements OnInit {

    public totalItems: number = 0;
    returnData: any;
    types = false;
    pageIndex: number = 0;
    public itemsPerPage: number = 30;
    success = "";
    public fieldDetails: IField[];
    fieldDetailsAdd1: IField[] = [];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: 'Service', sortDir: 'ASC', selectioMode:"single" };
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    public errorMessage: string;
    serviceSource: any[];
    private fields: IField[];
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
        }
    ];
    gridcount = 0;
    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    enableMenu = [];
    selIds = new Array();
    isApprovalProcessSubscribed: boolean = false;
    action: string;
    btnName: string;
    pageTitle: string;
    refreshgrid;
    constructor(private schedulingService: SchedulingService, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngOnInit(): void {
        var contextObj = this;

        contextObj.schedulingService.checkSubscribedFeature('201').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0) return;

            contextObj.isApprovalProcessSubscribed = result["Data"][0]["IsSubscribed"];
            contextObj.schedulingService.getServicesFields().subscribe(function (resultData) {
                contextObj.fields = resultData["Data"];
                //var workTypeField = contextObj.fields.find(function (item) { return item.ReportFieldId === 8650 });
                //workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
            });
        });
        contextObj.getServices();
    }

    public changeEnableMenu() {
        var contextObj = this;
        contextObj.enableMenu = [1, 2, 3];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Services added", 5);
        }
    }
    
    public getServices() {
        var contextObj = this;
        this.schedulingService.getServicesData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            } else {
                contextObj.serviceSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            }
            contextObj.changeEnableMenu();
        });
    }


    onCardSubmit(event: any) {
        var contextObj = this;
        let fieldDetails = event.fieldObject;

        if (event["dataKeyValue"]) {
            this.schedulingService.postEditServiceDetails(fieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    contextObj.notificationService.ShowToaster("Service updated", 3);
                }
                else if (contextObj.success == "Already Exists") {
                    contextObj.notificationService.ShowToaster("Service already exists", 5);
                    contextObj.getServices();
                }
                else {
                    contextObj.notificationService.ShowToaster("Enter Service", 5);
                    contextObj.getServices();
                }
                contextObj.changeEnableMenu();

            })
        } else {
            this.schedulingService.postAddServiceDetails(fieldDetails).subscribe(function (resultData) {
                contextObj.success = resultData["Data"].Message;

                if (contextObj.success == "Success") {
                    contextObj.totalItems = contextObj.totalItems + 1;
                    contextObj.notificationService.ShowToaster("Service added", 3);
                    contextObj.types = false;
                    contextObj.serviceSource[contextObj.serviceSource.length - 1].Id = resultData["Data"].ServerId;
                    contextObj.totalItems = contextObj.totalItems + 1;
                }
                else if (contextObj.success == "Already Exists") {
                    contextObj.serviceSource.splice(contextObj.serviceSource.length - 1, 1);
                    contextObj.notificationService.ShowToaster("Service already exists", 5);
                }
                else {
                    contextObj.serviceSource.splice(contextObj.serviceSource.length - 1, 1);
                    contextObj.notificationService.ShowToaster("Enter Service", 5);
                }
                contextObj.changeEnableMenu();
            });
        }
    }

    public onCardCancel(event: any) {
        this.changeEnableMenu();
    }

    public onSubMenuChange(event: any, Id: any) {
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
    }

    onDelete(e: Event) {
        this.onMenuDeleteClick();
    }

    public onMenuAddClick() {
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Service";
        var contextObj = this;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.schedulingService.getServiceAddLoad().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8650 });
            workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
        });
    }

    public onMenuEditClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Service";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.schedulingService.getServiceEditLoad(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAdd1 = resultData["Data"];
                var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8650 });
                workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public onMenuDeleteClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Service", 2);
        }
        else {
            var isInUse = this.inputItems.rowData["IsInUse"];
            if (isInUse == 1)
                this.notificationService.ShowToaster("Selected Service in use, cannot be deleted", 5);
            else
                this.showSlide = !this.showSlide;
        }
    }

    okDelete(event: Event) {
        this.deleteService();
        this.showSlide = !this.showSlide;
    }
    deleteService() {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.schedulingService.postDeleteServiceDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.serviceSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.serviceSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Service deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Service in use, cannot be deleted", 5);
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
        contextObj.getServices();
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getServices();
    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.serviceSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.serviceSource = retUpdatedSrc["itemSrc"];
            this.enableMenu = [1, 2, 3];
        } else {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.serviceSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }
}
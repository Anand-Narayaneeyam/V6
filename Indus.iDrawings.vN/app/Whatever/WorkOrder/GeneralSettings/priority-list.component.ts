import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
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
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import { PriorityAddEditComponent } from './priority-add-edit.component';

@Component({
    selector: 'priority-list',
    templateUrl: './app/Views/WorkOrder/GeneralSettings/priority-list.component.html',
    directives: [ListComponent, FieldComponent, GridComponent, CardComponent, Notification, SubMenu, PagingComponent, Sorting, SlideComponent, SplitViewComponent, PriorityAddEditComponent],
    providers: [HTTP_PROVIDERS, WorkOrdereService, NotificationService, ConfirmationService, GeneralFunctions, AdministrationService]

})

export class PriorityListComponent implements OnInit {

    public totalItems: number = 0;
    returnData: any;
    types = false;
    pageIndex: number = 0;
    public itemsPerPage: number = 30;
    success = "";
    public fieldDetails: IField[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Priority Number]', sortDir: 'ASC', selectioMode: "single" };
    public errorMessage: string;
    prioritySource: any[];
    private fields: IField[];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "privilegeId": 3273
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "privilegeId": 3274
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "privilegeId": 3275
        }
    ];
    gridcount = 0;
    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    enableMenu = [];
    selIds = new Array();
    cardButtonPrivilege = [false, false];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    action: string;
    btnName: string;
    pageTitle: string;
    fieldDetailsAdd1: IField[];
    menuClickValue: any;
    refreshgrid;
    constructor(private workOrderService: WorkOrdereService, private AdministrationService: AdministrationService, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngOnInit(): void {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.getData.GetPrivilegesOfPage(contextObj.menuData, callBack, 704, contextObj.AdministrationService, contextObj.menuData.length);
        this.workOrderService.getPriorityFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            contextObj.getPriority();
        });
    }

    public changeEnableMenu() {
        var contextObj = this;        
        if (contextObj.totalItems < 1) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Priority added", 2);
        }
        else {
            contextObj.enableMenu = [1,2,3];
        }
    }

    public getPriority() {
        var contextObj = this;
        this.workOrderService.getPriorityData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            } else {
                contextObj.prioritySource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            }
            contextObj.changeEnableMenu();
        });       
    }


    //onCardSubmit(event: any) {
    //    var contextObj = this;
    //    let fieldDetails = event.fieldObject;

    //    if (event["dataKeyValue"]) {
    //        this.workOrderService.postEditPriorityDetails(fieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
    //            contextObj.success = resultData["Data"].Message;
    //            if (contextObj.success == "Success") {
    //                contextObj.notificationService.ShowToaster("Priority updated", 3);
    //            }
    //            else if (contextObj.success == "Already Exists") {
    //                contextObj.notificationService.ShowToaster("Priority Name already exists", 5);
    //                contextObj.getPriority();
    //            }
    //            else {
    //                contextObj.notificationService.ShowToaster("Enter Priority", 5);
    //                contextObj.getPriority();
    //            }
    //            contextObj.changeEnableMenu();

    //        })
    //    } else {
    //        this.workOrderService.postAddPriorityDetails(fieldDetails).subscribe(function (resultData) {
    //            contextObj.success = resultData["Data"].Message;

    //            if (contextObj.success == "Success") {
    //                contextObj.totalItems = contextObj.totalItems + 1;
    //                contextObj.notificationService.ShowToaster("Priority added", 3);
    //                contextObj.types = false;
    //                contextObj.prioritySource[contextObj.prioritySource.length - 1].Id = resultData["Data"].ServerId;
    //                contextObj.totalItems = contextObj.totalItems + 1;
    //            }
    //            else if (contextObj.success == "Already Exists") {
    //                contextObj.prioritySource.splice(contextObj.prioritySource.length - 1, 1);
    //                contextObj.notificationService.ShowToaster("Priority Name already exists", 5);
    //            }
    //            else {
    //                contextObj.prioritySource.splice(contextObj.prioritySource.length - 1, 1);
    //                contextObj.notificationService.ShowToaster("Enter Priority", 5);
    //            }
    //            contextObj.changeEnableMenu();
    //        });
    //    }
    //}

    public onCardCancel(event: any) {
        this.changeEnableMenu();
    }

    public onSubMenuChange(event: any, Id: any) {
        this.menuClickValue = event.value;
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
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Priority";
        this.workOrderService.loadPriorityAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.fieldDetailsAdd1[2].IsVisible = false;
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public onMenuEditClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Priority";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Priority", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrderService.loadPriorityAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.fieldDetailsAdd1[2].IsVisible = true;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    }

    public onMenuDeleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Priority", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            this.workOrderService.checkItemIdIsInUse(this.inputItems.selectedIds[0], 5).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Priority in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    }

    okDelete(event: Event) {
        this.deletePriotity();
        this.showSlide = !this.showSlide;
    }
    deletePriotity() {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.workOrderService.postDeletePriorityDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            //contextObj.success = resultData["Data"].Message;
            //if (contextObj.success == "Success") {
            //    contextObj.totalItems = contextObj.totalItems - 1;
            //    for (var count = 0; count < contextObj.selIds.length; count++) {
            //        var index = contextObj.prioritySource.indexOf(contextObj.prioritySource.filter(x => x["Id"] == contextObj.selIds[count])[0]);
            //        if (index > -1)
            //            contextObj.prioritySource.splice(index, 1);
            //    }
            //    contextObj.notificationService.ShowToaster("Selected priority deleted", 3);
            //    contextObj.totalItems = contextObj.totalItems - 1;
            //    if (contextObj.totalItems == 0) {
            //        contextObj.enableMenu = [1];
            //    }
            //    contextObj.selIds = [];
            //} else {
            //    contextObj.notificationService.ShowToaster("Selected priority is in use, cannot be deleted", 5);
            //}
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.prioritySource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.prioritySource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Priority deleted", 3);
                contextObj.getPriority();
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Priority in use, cannot be deleted", 5);
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
        contextObj.getPriority();
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getPriority();
    }
    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.prioritySource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.prioritySource = retUpdatedSrc["itemSrc"];
        } else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.prioritySource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        } else {
            let retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.prioritySource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.totalItems = retUpdatedSrc["itemCount"];
            contextObj.prioritySource = retUpdatedSrc["itemSrc"];
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
       // contextObj.prioritySource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = false;
    }
}
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
import { PartsAECListComponent} from './parts-AEC-list.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import { PartAddEditComponent } from './parts-add-edit.component';



@Component({
    selector: 'parts-list',
    templateUrl: './app/Views/WorkOrder/GeneralSettings/parts-list.component.html',
    directives: [ListComponent, FieldComponent, CardComponent, GridComponent, Notification, SubMenu, PagingComponent, Sorting, SlideComponent, SplitViewComponent, PartsAECListComponent, PartAddEditComponent],
    providers: [HTTP_PROVIDERS, WorkOrdereService, NotificationService, ConfirmationService, GeneralFunctions, AdministrationService]

})

export class PartsListComponent implements OnInit {

    public totalItems: number = 0;
    returnData: any;
    types = false;
    pageIndex: number = 0;
    public itemsPerPage: number = 30;
    success = "";
    public fieldDetails: IField[];
    inputItems: IGrid = { dataKey: "Id", selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Part Name]', sortDir: 'ASC', selectioMode:"single" };
    public errorMessage: string;
    partsSource: any[];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    private fields: IField[];
    fieldAEC: IField[];
    fieldDetailsAEC: IField[];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "privilegeId": 3243
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "privilegeId": 3244
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "privilegeId": 3245
        },
        {
            "id": 4,
            "title": "Associated Equipment Classes",
            "image": "Associated Equipment Classes",
            "path": "Associated Equipment Classes",
            "privilegeId": null
        }
    ];
    gridcount = 0;
    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    enableMenu = [];
    selIds = new Array();
    menuClickValue: any;
    action: string;
    cardButtonPrivilege = [false, false];
    partName: string;
    btnName: string;
    pageTitle: string;
    fieldDetailsAdd1: IField[];
    showSlideAdd = false;
    target: number;
    refreshgrid;
    constructor(private workOrderService: WorkOrdereService, private AdministrationService: AdministrationService, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngOnInit(): void {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.getData.GetPrivilegesOfPage(contextObj.menuData, callBack, 735, contextObj.AdministrationService, contextObj.menuData.length);
        this.workOrderService.getPartsFields().subscribe(function (resultData) {
            for (var i = 0; i < resultData["Data"].length; i++) {
                if (resultData.Data[i].FieldLabel.length > 13)
                    resultData.Data[i]["Width"] = 200;
                if (resultData.Data[i].FieldLabel.length > 26)
                    resultData.Data[i]["Width"] = 250;
            }
            contextObj.fields = resultData["Data"];
            contextObj.getParts();
        });
    }

    public changeEnableMenu() {
        var contextObj = this;
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Parts exist", 2);
        }
        else {
            contextObj.enableMenu = [1,2,3,4];
        }
    }

    public getParts() {
        var contextObj = this;
        this.workOrderService.getPartsData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            } else {
                contextObj.partsSource = JSON.parse(resultData["Data"].FieldBinderData);
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
    //        this.workOrderService.postEditPartsDetails(fieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
    //            contextObj.success = resultData["Data"].Message;
    //            if (contextObj.success == "Success") {
    //                contextObj.notificationService.ShowToaster("Part updated", 3);
    //                contextObj.getParts();
    //            }
    //            else if (contextObj.success == "Already Exists") {
    //                contextObj.notificationService.ShowToaster("Part already exists", 5);
    //                contextObj.getParts();
    //            }
    //            else {
    //                contextObj.notificationService.ShowToaster("Enter Part", 5);
    //                contextObj.getParts();
    //            }
    //            contextObj.changeEnableMenu();

    //        })
    //    } else {
    //        this.workOrderService.postAddPartsDetails(fieldDetails).subscribe(function (resultData) {
    //            contextObj.success = resultData["Data"].Message;

    //            if (contextObj.success == "Success") {
    //                contextObj.totalItems = contextObj.totalItems + 1;
    //                contextObj.notificationService.ShowToaster("Part added", 3);
    //                contextObj.types = false;
    //                contextObj.partsSource[contextObj.partsSource.length - 1].Id = resultData["Data"].ServerId;
    //                contextObj.totalItems = contextObj.totalItems + 1;
    //                contextObj.getParts();
    //            }
    //            else if (contextObj.success == "Already Exists") {
    //                contextObj.partsSource.splice(contextObj.partsSource.length - 1, 1);
    //                contextObj.notificationService.ShowToaster("Part already exists", 5);
    //            }
    //            else {
    //                contextObj.partsSource.splice(contextObj.partsSource.length - 1, 1);
    //                contextObj.notificationService.ShowToaster("Enter Part", 5);
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
        else if (event.value == 2) // Delete
        {
            this.onMenuEditClick();
        }
        else if (event.value == 3) // Delete
        {
            this.onMenuDeleteClick();
        }
        else if (event.value == 4) // Associated Equipment Classes
        {
            this.onMenuAECClick(1);
        }
    }

    public onMenuAECClick(target) {
        this.showSlideAdd = false;
        this.menuClickValue = 4;
        this.target = target;
        //if (this.target == 2) {
        //    this.inputItems.selectedIds[0] = this.partsSource[0]["Id"];
        //}
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            for (var i = 0; i <= this.partsSource.length; i++) {
                if (this.partsSource[i]["Id"] == this.inputItems.selectedIds[0]) {
                    this.partName = this.partsSource[i]["Part Name"];
                    break;
                }
            }
            this.pageTitle = "Associated Equipment Classes";
            this.action = "AEC";
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
        else {
            this.notificationService.ShowToaster("Select a Part", 2);
        }

        
    }

    onDelete(e: Event) {
        this.onMenuDeleteClick();
    }

    public onMenuAddClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Part";
        this.workOrderService.loadPartAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public onMenuEditClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Part";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrderService.loadPartAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    }

    public onMenuDeleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Service?", "Yes");
            this.workOrderService.checkItemIdIsInUse(this.inputItems.selectedIds[0],4).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Part in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    }

    okDelete(event: Event) {
        this.deleteParts();
        this.showSlide = !this.showSlide;
    }
    deleteParts() {
        var contextObj = this;
        this.workOrderService.postDeletePartsDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.partsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.partsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Part deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Part in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }

    cancelClick(event: Event) {
        this.showSlide = false;
        this.showSlideAdd = false;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
        this.showSlideAdd = value.value;
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getParts();
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getParts();
    }

    submitReturn(event: any) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.partsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.partsSource = retUpdatedSrc["itemSrc"];
            contextObj.showSlideAdd = true;
        } else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.partsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        } else {
            let retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.partsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.totalItems = retUpdatedSrc["itemCount"];
            contextObj.partsSource = retUpdatedSrc["itemSrc"];
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
       // contextObj.partsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = false;
    }

    okAddEquip(event) {
        this.onMenuAECClick(2);
    }
}
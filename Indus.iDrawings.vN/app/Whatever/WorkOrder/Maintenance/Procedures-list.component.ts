import { Component, OnInit, AfterViewInit,AfterViewChecked } from '@angular/core';
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
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {ProceduresAECListComponent} from './Procedures-AEC-List.component';
import {JobStepsListComponent} from './Procedures-JobSteps-List.component';
import {SafetyStepsListComponent} from './Procedures-SafetySteps-List.component';
import {AttachmentsComponent} from '../../Common/Attachments/attachments.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { ProceduresAddEditComponent } from './Procedures-AddEdit.component';


@Component({
    selector: 'Procedures-list',
    templateUrl: './app/Views/WorkOrder/Maintenance/Procedures-list.component.html',
    directives: [ListComponent, FieldComponent, GridComponent, CardComponent, Notification, SubMenu, PagingComponent, Sorting, SlideComponent, SplitViewComponent, ProceduresAECListComponent, JobStepsListComponent, SafetyStepsListComponent, AttachmentsComponent, ProceduresAddEditComponent],
    providers: [HTTP_PROVIDERS, WorkOrdereService, NotificationService, ConfirmationService, GeneralFunctions, AdministrationService]

})

export class ProceduresListComponent implements AfterViewInit, AfterViewChecked {

    public totalItems: number = 0;
    returnData: any;
    types = true;
    pageIndex: number = 0;
    public itemsPerPage: number = 30;
    success = "";
    public fieldDetails: IField[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Procedure]', sortDir: 'ASC', selectioMode: "single" };
    public errorMessage: string;
    ProceduresSource: any[];
    fields: IField[];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    cardButtonPrivilege = [false, false];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "privilegeId": 3348
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "privilegeId": 3349
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "privilegeId": 3350
        },
        {
            "id": 5,
            "title": "Associated Equipment Classes",
            "image": "Associated Equipment Classes",
            "path": "Associated Equipment Classes",
            "privilegeId": 3348
        },
        {
            "id": 4,
            "title": "Job Steps",
            "image": "Job Steps",
            "path": "Job Steps",
            "privilegeId": 3348
        },
        {
            "id": 6,
            "title": "Safety Steps",
            "image": "Safety Steps",
            "path": "Safety Steps",
            "privilegeId": 3348
        },
        {
            "id": 7,
            "title": "Attachment",
            "image": "Attachment",
            "path": "Attachment",
            "privilegeId": 3348
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
    procName: string;
    showgridupdate: boolean;
    btnName: string;
    pageTitle: string;
    fieldDetailsAdd1: IField[];
    showSlideAdd = false;
    target: number;
    refreshgrid;
    constructor(private administrationServices: AdministrationService,private workOrderService: WorkOrdereService, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngAfterViewInit() {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.getData.GetPrivilegesOfPage(contextObj.menuData, callBack, 2543, contextObj.administrationServices, contextObj.menuData.length);
        this.workOrderService.getProceduresFields().subscribe(function (resultData) {
            for (var i = 0; i < resultData["Data"].length; i++) {
                if (resultData.Data[i].FieldLabel.length > 13)
                    resultData.Data[i]["Width"] = 200;
                if (resultData.Data[i].FieldLabel.length > 26)
                    resultData.Data[i]["Width"] = 250;
            }
            contextObj.fields = resultData["Data"];
            contextObj.getProcedures();
        });

        //form id : 263***** PageId :2543
        
    }

    public changeEnableMenu() {
        var contextObj = this;
        contextObj.types = true;
        contextObj.enableMenu = [1, 2, 3, 4, 6, 7, 5];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Procedures exist", 2);
        }
        else {
            contextObj.enableMenu = [1, 2, 3, 4, 6, 7, 5];
        }
    }

    public getProcedures() {
        var contextObj = this;
        this.showgridupdate = true;
        this.workOrderService.getProceduresData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            } else {
                contextObj.ProceduresSource = JSON.parse(resultData["Data"].FieldBinderData);
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
            this.workOrderService.postEditProceduresDetails(fieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    contextObj.notificationService.ShowToaster("Procedure updated", 3);
                }
                else if (contextObj.success == "Already Exists") {
                    contextObj.notificationService.ShowToaster("Procedure already exists", 5);
                    contextObj.getProcedures();
                }
                else {
                    contextObj.notificationService.ShowToaster("Enter Procedure", 5);
                    contextObj.getProcedures();
                }
                contextObj.changeEnableMenu();

            })
        } else {
            this.workOrderService.postAddProceduresDetails(fieldDetails).subscribe(function (resultData) {
                contextObj.success = resultData["Data"].Message;

                if (contextObj.success == "Success") {
                    contextObj.totalItems = contextObj.totalItems + 1;
                    contextObj.notificationService.ShowToaster("Procedure added", 3);
                    contextObj.ProceduresSource[contextObj.ProceduresSource.length - 1].Id = resultData["Data"].ServerId;
                    contextObj.totalItems = contextObj.totalItems + 1;
                    contextObj.getProcedures();
                }
                else if (contextObj.success == "Already Exists") {
                    contextObj.ProceduresSource.splice(contextObj.ProceduresSource.length - 1, 1);
                    contextObj.notificationService.ShowToaster("Procedure already exists", 5);
                }
                else {
                    contextObj.ProceduresSource.splice(contextObj.ProceduresSource.length - 1, 1);
                    contextObj.notificationService.ShowToaster("Enter Procedure", 5);
                }
                contextObj.changeEnableMenu();
            });
        }
    }

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
        else if (event.value == 4) // JobSteps
        {
            this.onMenuJobStepsClick();
        }
        else if (event.value == 5) // AssociatedEquipmentClassesList
        {
            this.onMenuEquipmentClick(1);
        }
        else if (event.value == 6) // SafetySteps
        {
            this.onMenuSafetyStepsClick();
        }
        else if (event.value == 7) // Attachment
        {
            this.onMenuAttachmentClick();
        }
    }

    public onMenuAttachmentClick() {
       // *ngIf="splitviewInput.showSecondaryView
        this.pageTitle = "Attachments";
        this.action = "";
        this.splitviewInput.showSecondaryView = false;

        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            //this.inputItems.selectedIds = this.inputItems.selectedIds[0];
            this.action = "Attachment";
            this.splitviewInput.showSecondaryView = true;
        } else {
            this.notificationService.ShowToaster("Select a Procedure", 2);
        }
    }

    public onMenuSafetyStepsClick() {
        this.pageTitle = "Safety Steps";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            for (var i = 0; i <= this.ProceduresSource.length; i++) {
                if (this.ProceduresSource[i]["Id"] == this.inputItems.selectedIds[0]) {
                    this.procName = this.ProceduresSource[i]["Procedure"];
                    break;
                }
            }
            //this.inputItems.selectedIds = this.inputItems.selectedIds[0];
            this.action = "SafetyStep";
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        } else {
            this.notificationService.ShowToaster("Select a Procedure", 2);
        }
    }

    public onMenuJobStepsClick() {
        this.pageTitle = "Job Steps";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            for (var i = 0; i <= this.ProceduresSource.length; i++) {
                if (this.ProceduresSource[i]["Id"] == this.inputItems.selectedIds[0]) {
                    this.procName = this.ProceduresSource[i]["Procedure"];
                    break;
                }
            }
            //this.inputItems.selectedIds = this.inputItems.selectedIds[0];
            this.action = "JobStep";
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        } else {
            this.notificationService.ShowToaster("Select a Procedure", 2);
        }
    }

    public onMenuEquipmentClick(target) {
        this.showSlideAdd = false;
        this.menuClickValue = 5;
        this.target = target;
        this.action = "";
        this.pageTitle = "Associated Equipment Classes";
        this.splitviewInput.showSecondaryView = false;
        //if (this.target == 2) {
        //    this.inputItems.selectedIds[0] = this.ProceduresSource[0]["Id"];
        //}
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            for (var i = 0; i <= this.ProceduresSource.length; i++)
            {
                if (this.ProceduresSource[i]["Id"] == this.inputItems.selectedIds[0])
                {
                    this.procName = this.ProceduresSource[i]["Procedure"];
                    break;
                }
            }
            //this.inputItems.selectedIds = this.inputItems.selectedIds[0];
            this.action = "Equipment";
            this.splitviewInput.showSecondaryView = true;
        }
        else {
            this.notificationService.ShowToaster("Select a Procedure", 2);
        }
    }

    onDelete(e: Event) {
        this.onMenuDeleteClick();
    }

    public onMenuAddClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Procedure";
        this.workOrderService.loadProceduresAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public onMenuEditClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Procedure";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrderService.loadProceduresAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
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
            this.workOrderService.checkProcedureInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
                if (returnCheck["Data"] == 1)
                    contextObj.notificationService.ShowToaster("Selected Procedure in use, cannot be deleted", 5);
                else
                    contextObj.showSlide = !contextObj.showSlide;
            });
            //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Service?", "Yes");
            //this.showSlide = !this.showSlide;
        }
    }

    okDelete(event: Event) {
        this.deleteProcedures();
        this.showSlide = !this.showSlide;
    }
    deleteProcedures() {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.workOrderService.postDeleteProceduresDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            //contextObj.success = resultData["Data"].Message;
            //if (contextObj.success == "Success") {
            //    contextObj.totalItems = contextObj.totalItems - 1;
            //    for (var count = 0; count < contextObj.selIds.length; count++) {
            //        var index = contextObj.ProceduresSource.indexOf(contextObj.ProceduresSource.filter(x => x["Id"] == contextObj.selIds[count])[0]);
            //        if (index > -1)
            //            contextObj.ProceduresSource.splice(index, 1);
            //    }
            //    contextObj.notificationService.ShowToaster("Selected Procedure deleted", 3);
            //    contextObj.totalItems = contextObj.totalItems - 1;
            //    if (contextObj.totalItems == 0) {
            //        contextObj.enableMenu = [1];
            //    }
            //    contextObj.selIds = [];
            //} else {
            //    contextObj.notificationService.ShowToaster("Selected Procedure is in use, cannot be deleted", 5);
            //}
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.ProceduresSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.ProceduresSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Procedure deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Procedure in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
        //}
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
        contextObj.getProcedures();
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.inputItems.sortCol = "[Procedure]";
        this.pageIndex = event.pageEvent.page;
        contextObj.getProcedures();
    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.ProceduresSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.ProceduresSource = retUpdatedSrc["itemSrc"];
            contextObj.changeEnableMenu();
            contextObj.showSlideAdd = true;

        } else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.ProceduresSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            //contextObj.ProceduresSource = retUpdatedSrc["itemSrc"];
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        } 

        if (this.action == "add" || this.action == "edit") {
            contextObj.splitviewInput.showSecondaryView = false;
        }
        contextObj.showgridupdate = false;
    }
    ngAfterViewChecked() {
        if (this.showgridupdate == false && this.splitviewInput.showSecondaryView == false && !(this.action == "add" || this.action == "edit")) {
            this.getProcedures();
        }
    }
    okAddEquip(event) {
        this.onMenuEquipmentClick(2);
    }
}
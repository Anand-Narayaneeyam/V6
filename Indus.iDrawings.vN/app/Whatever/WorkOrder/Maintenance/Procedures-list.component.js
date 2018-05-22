var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var Procedures_AEC_List_component_1 = require('./Procedures-AEC-List.component');
var Procedures_JobSteps_List_component_1 = require('./Procedures-JobSteps-List.component');
var Procedures_SafetySteps_List_component_1 = require('./Procedures-SafetySteps-List.component');
var attachments_component_1 = require('../../Common/Attachments/attachments.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var Procedures_AddEdit_component_1 = require('./Procedures-AddEdit.component');
var ProceduresListComponent = (function () {
    function ProceduresListComponent(administrationServices, workOrderService, notificationService, getData) {
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.totalItems = 0;
        this.types = true;
        this.pageIndex = 0;
        this.itemsPerPage = 30;
        this.success = "";
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Procedure]', sortDir: 'ASC', selectioMode: "single" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.cardButtonPrivilege = [false, false];
        this.menuData = [
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
        this.gridcount = 0;
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.enableMenu = [];
        this.selIds = new Array();
        this.showSlideAdd = false;
    }
    ProceduresListComponent.prototype.ngAfterViewInit = function () {
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
    };
    ProceduresListComponent.prototype.changeEnableMenu = function () {
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
    };
    ProceduresListComponent.prototype.getProcedures = function () {
        var contextObj = this;
        this.showgridupdate = true;
        this.workOrderService.getProceduresData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            }
            else {
                contextObj.ProceduresSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            }
            contextObj.changeEnableMenu();
        });
    };
    ProceduresListComponent.prototype.onCardSubmit = function (event) {
        var contextObj = this;
        var fieldDetails = event.fieldObject;
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
            });
        }
        else {
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
    };
    ProceduresListComponent.prototype.onCardCancel = function (event) {
        this.changeEnableMenu();
    };
    ProceduresListComponent.prototype.onSubMenuChange = function (event, Id) {
        this.menuClickValue = event.value;
        if (event.value == 1) {
            this.onMenuAddClick();
        }
        else if (event.value == 2) {
            this.onMenuEditClick();
        }
        else if (event.value == 3) {
            this.onMenuDeleteClick();
        }
        else if (event.value == 4) {
            this.onMenuJobStepsClick();
        }
        else if (event.value == 5) {
            this.onMenuEquipmentClick(1);
        }
        else if (event.value == 6) {
            this.onMenuSafetyStepsClick();
        }
        else if (event.value == 7) {
            this.onMenuAttachmentClick();
        }
    };
    ProceduresListComponent.prototype.onMenuAttachmentClick = function () {
        // *ngIf="splitviewInput.showSecondaryView
        this.pageTitle = "Attachments";
        this.action = "";
        this.splitviewInput.showSecondaryView = false;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            //this.inputItems.selectedIds = this.inputItems.selectedIds[0];
            this.action = "Attachment";
            this.splitviewInput.showSecondaryView = true;
        }
        else {
            this.notificationService.ShowToaster("Select a Procedure", 2);
        }
    };
    ProceduresListComponent.prototype.onMenuSafetyStepsClick = function () {
        this.pageTitle = "Safety Steps";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            for (var i = 0; i <= this.ProceduresSource.length; i++) {
                if (this.ProceduresSource[i]["Id"] == this.inputItems.selectedIds[0]) {
                    this.procName = this.ProceduresSource[i]["Procedure"];
                    break;
                }
            }
            //this.inputItems.selectedIds = this.inputItems.selectedIds[0];
            this.action = "SafetyStep";
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
        else {
            this.notificationService.ShowToaster("Select a Procedure", 2);
        }
    };
    ProceduresListComponent.prototype.onMenuJobStepsClick = function () {
        this.pageTitle = "Job Steps";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            for (var i = 0; i <= this.ProceduresSource.length; i++) {
                if (this.ProceduresSource[i]["Id"] == this.inputItems.selectedIds[0]) {
                    this.procName = this.ProceduresSource[i]["Procedure"];
                    break;
                }
            }
            //this.inputItems.selectedIds = this.inputItems.selectedIds[0];
            this.action = "JobStep";
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
        else {
            this.notificationService.ShowToaster("Select a Procedure", 2);
        }
    };
    ProceduresListComponent.prototype.onMenuEquipmentClick = function (target) {
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
        }
        else if (this.inputItems.selectedIds.length == 1) {
            for (var i = 0; i <= this.ProceduresSource.length; i++) {
                if (this.ProceduresSource[i]["Id"] == this.inputItems.selectedIds[0]) {
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
    };
    ProceduresListComponent.prototype.onDelete = function (e) {
        this.onMenuDeleteClick();
    };
    ProceduresListComponent.prototype.onMenuAddClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Procedure";
        this.workOrderService.loadProceduresAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    ProceduresListComponent.prototype.onMenuEditClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Procedure";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrderService.loadProceduresAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    ProceduresListComponent.prototype.onMenuDeleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            this.workOrderService.checkProcedureInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
                if (returnCheck["Data"] == 1)
                    contextObj.notificationService.ShowToaster("Selected Procedure in use, cannot be deleted", 5);
                else
                    contextObj.showSlide = !contextObj.showSlide;
            });
        }
    };
    ProceduresListComponent.prototype.okDelete = function (event) {
        this.deleteProcedures();
        this.showSlide = !this.showSlide;
    };
    ProceduresListComponent.prototype.deleteProcedures = function () {
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
                var retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.ProceduresSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.ProceduresSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Procedure deleted", 3);
            }
            else {
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
    };
    ProceduresListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
        this.showSlideAdd = false;
    };
    ProceduresListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
        this.showSlideAdd = value.value;
    };
    ProceduresListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getProcedures();
    };
    ProceduresListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.inputItems.sortCol = "[Procedure]";
        this.pageIndex = event.pageEvent.page;
        contextObj.getProcedures();
    };
    ProceduresListComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.ProceduresSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.ProceduresSource = retUpdatedSrc["itemSrc"];
            contextObj.changeEnableMenu();
            contextObj.showSlideAdd = true;
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.ProceduresSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            //contextObj.ProceduresSource = retUpdatedSrc["itemSrc"];
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        if (this.action == "add" || this.action == "edit") {
            contextObj.splitviewInput.showSecondaryView = false;
        }
        contextObj.showgridupdate = false;
    };
    ProceduresListComponent.prototype.ngAfterViewChecked = function () {
        if (this.showgridupdate == false && this.splitviewInput.showSecondaryView == false && !(this.action == "add" || this.action == "edit")) {
            this.getProcedures();
        }
    };
    ProceduresListComponent.prototype.okAddEquip = function (event) {
        this.onMenuEquipmentClick(2);
    };
    ProceduresListComponent = __decorate([
        core_1.Component({
            selector: 'Procedures-list',
            templateUrl: './app/Views/WorkOrder/Maintenance/Procedures-list.component.html',
            directives: [list_component_1.ListComponent, field_component_1.FieldComponent, grid_component_1.GridComponent, card_component_1.CardComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, Procedures_AEC_List_component_1.ProceduresAECListComponent, Procedures_JobSteps_List_component_1.JobStepsListComponent, Procedures_SafetySteps_List_component_1.SafetyStepsListComponent, attachments_component_1.AttachmentsComponent, Procedures_AddEdit_component_1.ProceduresAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ProceduresListComponent);
    return ProceduresListComponent;
}());
exports.ProceduresListComponent = ProceduresListComponent;
//# sourceMappingURL=Procedures-list.component.js.map
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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var Procedures_JobSteps_List_component_1 = require('./Procedures-JobSteps-List.component');
var Procedures_SafetySteps_List_component_1 = require('./Procedures-SafetySteps-List.component');
var PMProceduresListComponent = (function () {
    function PMProceduresListComponent(administrationServices, workOrderService, notificationService, generFun) {
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "ProcedureId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.target = 0;
        this.enableMenu = [0];
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "subMenu": null,
                "privilegeId": 6163
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "subMenu": null,
                "privilegeId": 6164
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "subMenu": null,
                "privilegeId": 6165
            },
            {
                "id": 3,
                "title": "Job Steps",
                "image": "Job Steps",
                "path": "Job Steps",
                "subMenu": null,
                "privilegeId": 6166
            },
            {
                "id": 4,
                "title": "Safety Steps",
                "image": "Safety Steps",
                "path": "Safety Steps",
                "subMenu": null,
                "privilegeId": 6167
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.pmScheduleRowUpdate = new core_1.EventEmitter();
        this.showDeleteConfirm = false;
    }
    PMProceduresListComponent.prototype.ngAfterViewInit = function () {
        if (this.pagetarget == 2) {
            this.menuData = [
                {
                    "id": 0,
                    "title": "Add",
                    "image": "Add",
                    "path": "Add",
                    "subMenu": null,
                    "privilegeId": 6145
                },
                {
                    "id": 1,
                    "title": "Edit",
                    "image": "Edit",
                    "path": "Edit",
                    "subMenu": null,
                    "privilegeId": 6146
                },
                {
                    "id": 2,
                    "title": "Delete",
                    "image": "Delete",
                    "path": "Delete",
                    "subMenu": null,
                    "privilegeId": 6147
                },
                {
                    "id": 3,
                    "title": "Job Steps",
                    "image": "Job Steps",
                    "path": "Job Steps",
                    "subMenu": null,
                    "privilegeId": 6148
                },
                {
                    "id": 4,
                    "title": "Safety Steps",
                    "image": "Safety Steps",
                    "path": "Safety Steps",
                    "subMenu": null,
                    "privilegeId": 6149
                }
            ];
        }
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2541, contextObj.administrationServices, contextObj.menuData.length);
        if (this.pagetarget == 1) {
            var contextObj = this;
            this.workOrderService.getPMProcedureListFields().subscribe(function (resultData) {
                contextObj.equipmentCategory = resultData["Data"].find(function (el) { return el.ReportFieldId === 4491; });
                contextObj.equipmentClass = resultData["Data"].find(function (el) { return el.ReportFieldId === 647; });
                contextObj.equipmentCategory["FieldValue"] = contextObj.equipmentCategoryName;
                contextObj.equipmentClass["FieldValue"] = contextObj.equipmentClassName;
                contextObj.fieldObject = resultData["Data"];
            });
            this.LoadGrid();
        }
        else if (this.pagetarget == 2) {
            var contextObj = this;
            this.workOrderService.getMasterPMProcedureListFields().subscribe(function (resultData) {
                contextObj.equipmentCategory = resultData["Data"].find(function (el) { return el.ReportFieldId === 4491; });
                contextObj.equipmentClass = resultData["Data"].find(function (el) { return el.ReportFieldId === 647; });
                contextObj.equipmentCategory["FieldValue"] = contextObj.equipmentCategoryName;
                contextObj.equipmentClass["FieldValue"] = contextObj.equipmentClassName;
                contextObj.fieldObject = resultData["Data"];
            });
            this.LoadGridMaster();
        }
    };
    PMProceduresListComponent.prototype.LoadGrid = function () {
        var contextObj = this;
        this.workOrderService.getPMProcedureListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.pmId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 1, 2, 3, 4];
            }
            else {
                contextObj.notificationService.ShowToaster("No Procedures exist", 2);
                contextObj.enableMenu = [0];
                contextObj.itemsSource = [];
            }
            contextObj.toUpdatePMRowData(resultData);
        });
    };
    PMProceduresListComponent.prototype.toUpdatePMRowData = function (data) {
        var contextObj = this;
        var jsonData = JSON.parse(data["Data"].FieldBinderData);
        var sequenceNumber = "";
        for (var i = 0; i < jsonData.length; i++) {
            sequenceNumber += jsonData[i]["Sequence"] + ',';
        }
        sequenceNumber = sequenceNumber.slice(0, -1);
        contextObj.pmScheduleRowUpdate.emit({
            pmId: contextObj.pmId,
            procedureCount: contextObj.totalItems,
            sequenceNumber: sequenceNumber
        });
    };
    PMProceduresListComponent.prototype.LoadGridMaster = function () {
        var contextObj = this;
        this.workOrderService.getMasterPMProcedureListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.pmId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 1, 2, 3, 4];
            }
            else {
                contextObj.notificationService.ShowToaster("No Procedures exist", 2);
                contextObj.enableMenu = [0];
                contextObj.itemsSource = [];
            }
        });
    };
    PMProceduresListComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.target = 1;
                this.addClick();
                break;
            case 1:
                contextObj.target = 1;
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
            case 3:
                contextObj.target = 2;
                this.jobStepsClick();
                break;
            case 4:
                contextObj.target = 3;
                this.safetyStepsClick();
                break;
        }
    };
    PMProceduresListComponent.prototype.pageChanged = function (event) {
        if (this.pagetarget == 1) {
            var contextObj = this;
            this.pageIndex = event.pageEvent.page;
            this.workOrderService.getPMProcedureListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.pmId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });
        }
        else if (this.pagetarget == 2) {
            var contextObj = this;
            this.pageIndex = event.pageEvent.page;
            this.workOrderService.getMasterPMProcedureListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.pmId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });
        }
    };
    PMProceduresListComponent.prototype.onSort = function (objGrid) {
        if (this.pagetarget == 1) {
            var contextObj = this;
            this.workOrderService.getPMProcedureListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.pmId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });
        }
        else if (this.pagetarget == 2) {
            var contextObj = this;
            this.workOrderService.getMasterPMProcedureListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.pmId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            });
        }
    };
    PMProceduresListComponent.prototype.addClick = function () {
        this.action = "add";
        this.pageTitle = "New Procedure";
        this.btnName = "Save";
        var contextObj = this;
        if (this.pagetarget == 1) {
            this.workOrderService.getPMProcedureListDataAdd(contextObj.equipmentClassIdfor, 1, 0).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
        else if (this.pagetarget == 2) {
            this.workOrderService.getMasterPMProcedureListDataAdd(contextObj.equipmentClassIdfor, 1, 0).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    PMProceduresListComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Procedure";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                if (this.pagetarget == 1) {
                    this.workOrderService.getPMProcedureListDataEdit(contextObj.equipmentClassIdfor, contextObj.pmId, 2, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                        contextObj.fieldDetailsAddEdit = resultData["Data"];
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
                else if (this.pagetarget == 2) {
                    this.workOrderService.getMasterPMProcedureListDataEdit(contextObj.equipmentClassIdfor, contextObj.pmId, 2, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                        contextObj.fieldDetailsAddEdit = resultData["Data"];
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
            }
        }
    };
    PMProceduresListComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    PMProceduresListComponent.prototype.deleteProcedure = function () {
        var contextObj = this;
        if (this.pagetarget == 1) {
            contextObj.workOrderService.CheckPMsProceduresInUse(contextObj.inputItems.rowData["PMId"]).subscribe(function (resultData) {
                if (resultData["Data"] == 0) {
                    contextObj.workOrderService.deletePMsProcedures(contextObj.inputItems.rowData["ProcedureId"], contextObj.inputItems.rowData["PMId"]).subscribe(function (resultData) {
                        switch (resultData["Data"].StatusId) {
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                            case 1:
                                if (resultData["Data"].ServerId == 0) {
                                    contextObj.notificationService.ShowToaster("Selected Procedure deleted", 3);
                                    contextObj.LoadGrid();
                                }
                        }
                    });
                }
                else {
                    contextObj.notificationService.ShowToaster("Selected Procedure in use, cannot be deleted", 5);
                }
            });
        }
        else if (this.pagetarget == 2) {
            contextObj.workOrderService.CheckMasterPMsProceduresInUse(contextObj.inputItems.rowData["PMTemplateId"]).subscribe(function (resultData) {
                if (resultData["Data"] == 0) {
                    contextObj.workOrderService.deleteMasterPMsProcedures(contextObj.inputItems.rowData["ProcedureId"], contextObj.inputItems.rowData["PMTemplateId"]).subscribe(function (resultData) {
                        switch (resultData["Data"].StatusId) {
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                            case 1:
                                if (resultData["Data"].ServerId == 0) {
                                    contextObj.notificationService.ShowToaster("Selected Procedure deleted", 3);
                                    contextObj.LoadGridMaster();
                                }
                        }
                    });
                }
                else {
                    contextObj.DeleteConfirm();
                }
            });
        }
    };
    PMProceduresListComponent.prototype.DeleteConfirm = function () {
        this.showDeleteConfirm = !this.showDeleteConfirm;
    };
    PMProceduresListComponent.prototype.okDelete = function (event) {
        this.deleteProcedure();
        this.showSlide = !this.showSlide;
    };
    PMProceduresListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    PMProceduresListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    PMProceduresListComponent.prototype.okDeleteConfirm = function (event) {
        this.DeleteConfirmProcedure();
        this.showDeleteConfirm = !this.showDeleteConfirm;
    };
    PMProceduresListComponent.prototype.cancelDeleteConfirm = function (event) {
        this.showDeleteConfirm = !this.showDeleteConfirm;
    };
    PMProceduresListComponent.prototype.closeDeleteConfirm = function (value) {
        this.showDeleteConfirm = value.value;
    };
    PMProceduresListComponent.prototype.DeleteConfirmProcedure = function () {
        var contextObj = this;
        contextObj.workOrderService.deleteMasterPMsProcedures(contextObj.inputItems.rowData["ProcedureId"], contextObj.inputItems.rowData["PMTemplateId"]).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (resultData["Data"].ServerId == 0) {
                        contextObj.notificationService.ShowToaster("Selected Procedure deleted", 3);
                        contextObj.LoadGridMaster();
                    }
            }
        });
    };
    PMProceduresListComponent.prototype.jobStepsClick = function () {
        var contextObj = this;
        this.pageTitle = "Job Steps";
        this.procName = contextObj.inputItems.rowData["Procedure"];
        this.selectedId = contextObj.inputItems.rowData["ProcedureId"];
        this.workOrderService.getJobStepsData(0, '[Job Step]', 'ASC', this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"]["DataCount"] == 0) {
                contextObj.notificationService.ShowToaster("No Job Steps exist", 2);
            }
            else {
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            }
        });
    };
    PMProceduresListComponent.prototype.safetyStepsClick = function () {
        var contextObj = this;
        this.pageTitle = "Safety Steps";
        this.procName = contextObj.inputItems.rowData["Procedure"];
        this.selectedId = contextObj.inputItems.rowData["ProcedureId"];
        this.workOrderService.getSafetyStepsData(0, '[Safety Step]', 'ASC', this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"]["DataCount"] == 0) {
                contextObj.notificationService.ShowToaster("No Safety Steps exist", 2);
            }
            else {
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            }
        });
    };
    PMProceduresListComponent.prototype.onSubmit = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], "add");
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], "edit");
                break;
        }
    };
    PMProceduresListComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var arr = new Array();
        arr = JSON.parse(strsubmitField);
        if (this.pagetarget == 1) {
            arr.push({ ReportFieldId: 5593, Value: contextObj.pmId.toString() });
            if (target == "add") {
                contextObj.workOrderService.PMProcedureAddSubmit(JSON.stringify(arr), target, 0).subscribe(function (resultData) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            if (target == "add") {
                                contextObj.notificationService.ShowToaster("Procedure added", 3);
                                contextObj.LoadGrid();
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            }
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Procedure already exists", 5);
                            }
                            else if (resultData["Data"].ServerId == -2) {
                                contextObj.notificationService.ShowToaster("Procedure with this sequence already exists", 5);
                            }
                    }
                });
            }
            else if (target == "edit") {
                contextObj.workOrderService.PMProcedureAddSubmit(JSON.stringify(arr), target, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            if (target == "edit") {
                                contextObj.notificationService.ShowToaster("Procedure details updated", 3);
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                contextObj.LoadGrid();
                            }
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Procedure already exists", 5);
                            }
                            else if (resultData["Data"].ServerId == -2) {
                                contextObj.notificationService.ShowToaster("Procedure with this sequence already exists", 5);
                            }
                    }
                });
            }
        }
        else if (this.pagetarget == 2) {
            arr.push({ ReportFieldId: 5600, Value: contextObj.pmId.toString() });
            if (target == "add") {
                contextObj.workOrderService.MasterPMProcedureAddSubmit(JSON.stringify(arr), target, 0).subscribe(function (resultData) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            if (target == "add") {
                                contextObj.notificationService.ShowToaster("Procedure added", 3);
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                contextObj.LoadGridMaster();
                            }
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Procedure already exists", 5);
                            }
                            else if (resultData["Data"].ServerId == -2) {
                                contextObj.notificationService.ShowToaster("Procedure with this sequence already exists", 5);
                            }
                    }
                });
            }
            else if (target == "edit") {
                contextObj.workOrderService.MasterPMProcedureAddSubmit(JSON.stringify(arr), target, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            if (target == "edit") {
                                contextObj.notificationService.ShowToaster("Procedure details updated", 3);
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                contextObj.LoadGridMaster();
                            }
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Procedure already exists", 5);
                            }
                            else if (resultData["Data"].ServerId == -2) {
                                contextObj.notificationService.ShowToaster("Procedure already exists", 5);
                            }
                            else if (resultData["Data"].ServerId == -3) {
                                contextObj.notificationService.ShowToaster("Procedure with this sequence already exists", 5);
                            }
                    }
                });
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PMProceduresListComponent.prototype, "pmScheduleRowUpdate", void 0);
    PMProceduresListComponent = __decorate([
        core_1.Component({
            selector: 'pmProcedures-list',
            templateUrl: './app/Views/WorkOrder/Maintenance/PM-Procedures-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, labelcomponent_component_1.LabelComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, Procedures_JobSteps_List_component_1.JobStepsListComponent, Procedures_SafetySteps_List_component_1.SafetyStepsListComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['equipmentCategoryName', 'equipmentClassName', 'pmId', 'equipmentClassIdfor', 'pagetarget']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], PMProceduresListComponent);
    return PMProceduresListComponent;
}());
exports.PMProceduresListComponent = PMProceduresListComponent;
//# sourceMappingURL=PM-Procedures-list.component.js.map
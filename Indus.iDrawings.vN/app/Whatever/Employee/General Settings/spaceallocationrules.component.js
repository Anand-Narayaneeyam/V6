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
var employee_services_1 = require('../../../Models/Employee/employee.services');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var fieldorder_component_1 = require('../../Common/additional data fields/fieldorder.component');
var ng2_dnd_1 = require('../../../framework/externallibraries/dnd/ng2-dnd');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var spaceallocationrule_add_edit_component_1 = require('./spaceallocationrule-add-edit.component');
var SpaceAllocationRules = (function () {
    function SpaceAllocationRules(employeeService, notificationService, confirmationService, getData, generFun) {
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.getData = getData;
        this.generFun = generFun;
        this.dragEnable = true;
        this.totalItems = 0;
        this.types = true;
        this.pageIndex = 0;
        this.itemsPerPage = 30;
        this.success = "";
        this.inputItems = { dataKey: "GradeId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: "Id", sortDir: "ASC", selectioMode: "single" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.submitSuccess = [];
        this.menuData = [
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
        this.gridcount = 0;
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.enableMenu = [];
        this.selIds = new Array();
        this.fieldOrderObj = new Array();
    }
    SpaceAllocationRules.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.moduleId = -1;
        contextObj.QueryCategryId = -1;
        this.employeeService.getspaceAllocationRuleFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            for (var i = 0; i < resultData["Data"].length; i++) {
                resultData.Data[i]["Width"] = 100;
            }
            contextObj.getSpaceAllocationRule();
        });
    };
    SpaceAllocationRules.prototype.getSpaceAllocationRule = function () {
        var contextObj = this;
        this.employeeService.getSpaceAllocationRuleData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"] == "") {
                    resultData["Data"] = null;
                }
                else {
                    contextObj.SpaceTypeSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    for (var i = 0; i < contextObj.SpaceTypeSource.length; i++) {
                        contextObj.fieldOrderObj.push({
                            Id: contextObj.SpaceTypeSource[i].Id,
                            Value: contextObj.SpaceTypeSource[i].Grade,
                            OldPositionNo: contextObj.SpaceTypeSource[i]["Space Type"],
                            NewPositionNo: null
                        });
                    }
                }
                contextObj.changeEnableMenu();
            }
        });
    };
    SpaceAllocationRules.prototype.changeEnableMenu = function () {
        var contextObj = this;
        contextObj.enableMenu = [1, 2, 3];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Space Allocation Rule exist", 2);
        }
    };
    SpaceAllocationRules.prototype.onSubMenuChange = function (event, Id) {
        this.menuEventValue = 0;
        if (event.value == 1) {
            this.IsAdd = true;
            this.onMenuAddClick();
        }
        else if (event.value == 2) {
            this.IsAdd = false;
            this.onMenuEditClick();
        }
        else if (event.value == 3) {
            this.onMenuDeleteClick();
        }
    };
    SpaceAllocationRules.prototype.onDelete = function (e) {
        this.onMenuDeleteClick();
    };
    SpaceAllocationRules.prototype.onMenuAddClick = function () {
        this.action = "add";
        this.pageTitle = "New Space Allocation Rule";
        this.menuEventValue = 1;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    SpaceAllocationRules.prototype.onMenuEditClick = function () {
        this.action = "edit";
        this.pageTitle = "Edit Space Allocation Rule";
        this.menuEventValue = 2;
        this.inputItems.rowData = this.inputItems.rowData;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    SpaceAllocationRules.prototype.onMenuDeleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Space Allocation Rule", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            contextObj.message = "Are you sure you want to delete the selected Space Allocation Rule?";
            contextObj.showSlide = !contextObj.showSlide;
        }
    };
    SpaceAllocationRules.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    SpaceAllocationRules.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getSpaceAllocationRule();
    };
    SpaceAllocationRules.prototype.okDelete = function (event) {
        this.deleteSpaceType();
        this.showSlide = !this.showSlide;
    };
    SpaceAllocationRules.prototype.submitReturn = function (event) {
        debugger;
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        var reportfieldIdArray = new Array();
        if (contextObj.action == "add") {
            reportfieldIdArray.push({
                ReportFieldId: 5091,
                Value: event["Grade"],
            });
            this.employeeService.getSpaceAllocationRuleDetails(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, event["Space"], reportfieldIdArray).subscribe(function (resultData) {
                retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.SpaceTypeSource, "add", { returnData: resultData["Data"].FieldBinderData }, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                contextObj.SpaceTypeSource = retUpdatedSrc["itemSrc"];
                contextObj.changeEnableMenu();
            });
        }
        else if (contextObj.action == "edit") {
            reportfieldIdArray.push({
                ReportFieldId: 5091,
                Value: this.inputItems.rowData["GradeId"],
            });
            this.employeeService.getSpaceAllocationRuleDetails(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, event["FieldValue"], reportfieldIdArray).subscribe(function (resultData) {
                retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.SpaceTypeSource, "edit", { returnData: resultData["Data"].FieldBinderData }, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            });
        }
        contextObj.splitviewInput.showSecondaryView = false;
        contextObj.menuEventValue = 0;
    };
    SpaceAllocationRules.prototype.deleteSpaceType = function () {
        var contextObj = this;
        var reportfieldIdArray = new Array();
        reportfieldIdArray.push({
            ReportFieldId: 5091,
            Value: this.inputItems.rowData["GradeId"],
        });
        //if (event.returnOk == true) {
        this.employeeService.postDeleteSpaceAllocation(reportfieldIdArray, this.inputItems.rowData["SpaceAllocationRuleId"]).subscribe(function (resultData) {
            debugger;
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["StatusId"] == 1) {
                    var retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.SpaceTypeSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.SpaceTypeSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [1];
                    }
                    contextObj.getSpaceAllocationRule();
                    contextObj.notificationService.ShowToaster("Selected Space Allocation Rule deleted", 3);
                }
                else {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Selected Space Allocation Rule in use, cannot be deleted", 5);
                            }
                            break;
                    }
                }
            }
        });
        //}
    };
    SpaceAllocationRules = __decorate([
        core_1.Component({
            selector: 'space-allocation-rule',
            templateUrl: 'app/Views/Employee/General Settings/spaceallocationrules.component.html',
            directives: [list_component_1.ListComponent, field_component_1.FieldComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, spaceallocationrule_add_edit_component_1.spaceallocationruleaddeditComponent, slide_component_1.SlideComponent, fieldorder_component_1.FieldOrderComponent, ng2_dnd_1.DND_DIRECTIVES, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent],
            providers: [http_1.HTTP_PROVIDERS, employee_services_1.EmployeeService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, ng2_dnd_1.DND_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, General_1.GeneralFunctions])
    ], SpaceAllocationRules);
    return SpaceAllocationRules;
}());
exports.SpaceAllocationRules = SpaceAllocationRules;
//# sourceMappingURL=spaceallocationrules.component.js.map
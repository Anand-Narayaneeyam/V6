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
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var employee_services_1 = require('../../../../Models/Employee/employee.services');
var labelcomponent_component_1 = require('../../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var General_1 = require('../../../../Models/Common/General');
var assign_location_1 = require('./assign-location');
var employeeresourcelist_1 = require('../../Data/employeeresourcelist');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var StackPlanDetailsComponent = (function () {
    function StackPlanDetailsComponent(employeeService, notificationService, generFun) {
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.success = "";
        this.position = "top-right";
        this.showSlide = false;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.target = 0;
        this.gridcount = 1;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.menuData = [
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "subMenu": null
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "subMenu": null
            },
            /* {
                 "id": 3,
                 "title": "Show Resources",
                 "image": "Show Resources",
                 "path": "Show Resources",
                 "subMenu": null
             },*/
            {
                "id": 5,
                "title": "Assign Location",
                "image": "Assign Locations",
                "path": "Assign Location",
                "subMenu": null
            }
        ];
    }
    StackPlanDetailsComponent.prototype.ngOnChanges = function (changes) {
        this.enableMenu = [];
        this.fieldStatus = changes["stackPlanRowData"]["currentValue"]["Status"];
        this.floorId = changes["stackPlanRowData"]["currentValue"]["ScheduledFloorId"];
        var contextObj = this;
        if (changes["selectedId"] && changes["selectedId"]["currentValue"] != changes["selectedId"]["previousValue"]) {
            contextObj.employeeService.getStackPlanDetailsFields().subscribe(function (resultData) {
                contextObj.fieldProjectName = resultData["Data"].find(function (el) { return el.ReportFieldId === 895; });
                contextObj.fieldDateRequested = resultData["Data"].find(function (el) { return el.ReportFieldId === 897; });
                contextObj.fieldDateToComplete = resultData["Data"].find(function (el) { return el.ReportFieldId === 898; });
                if (changes["stackPlanRowData"]["currentValue"]) {
                    contextObj.fieldProjectName["FieldValue"] = changes["stackPlanRowData"]["currentValue"]["Project Name"];
                    contextObj.fieldDateRequested["FieldValue"] = changes["stackPlanRowData"]["currentValue"]["Date Requested"];
                    contextObj.fieldDateToComplete["FieldValue"] = changes["stackPlanRowData"]["currentValue"]["Date to Complete"];
                    contextObj.dateRequested = contextObj.fieldDateRequested["FieldValue"];
                    contextObj.dateToComplete = contextObj.fieldDateToComplete["FieldValue"];
                }
                var removeArr = [895, 897, 898];
                contextObj.fieldObject = resultData["Data"].filter(function (item) {
                    return removeArr.indexOf(item.ReportFieldId) == -1;
                });
            });
            if (contextObj.fieldStatus == "Approved")
                contextObj.enableMenu = [1, 2, 3, 4, 5, 6];
            else
                contextObj.enableMenu = [3];
            contextObj.projectId = changes["selectedId"]["currentValue"];
            contextObj.getstackPlanDetailsList();
        }
    };
    StackPlanDetailsComponent.prototype.getstackPlanDetailsList = function () {
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 885,
            Value: contextObj.projectId
        }, {
            ReportFieldId: 884,
            Value: null
        });
        contextObj.employeeService.getStackPlanDetailsListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, fieldobj).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
            if (contextObj.totalItems < 1) {
                contextObj.notificationService.ShowToaster("No data exists", 2);
                contextObj.enableMenu = [];
            }
        });
    };
    StackPlanDetailsComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.target = 1;
                this.editClick();
                break;
            case 2:
                this.target = 2;
                this.deleteClick();
                break;
            case 3:
                this.target = 3;
                this.showResourceClick();
                break;
            case 5:
                this.target = 5;
                this.assignLocation();
                break;
        }
    };
    StackPlanDetailsComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Move Details";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.rowData["Move Status"] == "Planned" || this.inputItems.rowData["Move Status"] == "Moved") {
            contextObj.notificationService.ShowToaster("Cannot edit Planned or Moved Employees", 2);
        }
        else {
            var drawingId = contextObj.inputItems.rowData["ScheduledDrawingId"];
            var fieldObj = new Array();
            fieldObj.push({
                FieldId: 221,
                ReportFieldId: 5090,
                Value: "0"
            });
            fieldObj.push({
                FieldId: 222,
                ReportFieldId: 5090,
                Value: "0"
            });
            fieldObj.push({
                FieldId: 223,
                ReportFieldId: 5090,
                Value: "0"
            });
            fieldObj.push({
                FieldId: 1569,
                ReportFieldId: 5090,
                Value: "0"
            });
            fieldObj.push({
                FieldId: 1569,
                ReportFieldId: 3059,
                Value: drawingId
            });
            this.employeeService.editMoveDetails(fieldObj, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAssign = resultData["Data"];
                for (var i = 0; i < contextObj.fieldDetailsAssign.length; i++) {
                    if (contextObj.fieldDetailsAssign[i].ReportFieldId == 895) {
                        contextObj.fieldDetailsAssign[i]["FieldValue"] = contextObj.fieldProjectName["FieldValue"];
                    }
                    else if (contextObj.fieldDetailsAssign[i].ReportFieldId == 897) {
                        contextObj.fieldDetailsAssign[i]["FieldValue"] = contextObj.fieldDateRequested["FieldValue"];
                    }
                    else if (contextObj.fieldDetailsAssign[i].ReportFieldId == 898) {
                        contextObj.fieldDetailsAssign[i]["FieldValue"] = contextObj.fieldDateToComplete["FieldValue"];
                    }
                    if (contextObj.inputItems.rowData["To Floor"] != "") {
                        if (contextObj.fieldDetailsAssign[i].ReportFieldId == 523) {
                            contextObj.fieldDetailsAssign[i]["FieldValue"] = drawingId;
                            contextObj.fieldDetailsAssign[i]["IsEnabled"] = false;
                        }
                        if (contextObj.fieldDetailsAssign[i].ReportFieldId == 489) {
                            contextObj.fieldDetailsAssign[i]["IsEnabled"] = false;
                        }
                        if (contextObj.fieldDetailsAssign[i].ReportFieldId == 473) {
                            contextObj.fieldDetailsAssign[i]["IsEnabled"] = false;
                        }
                    }
                }
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    StackPlanDetailsComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    StackPlanDetailsComponent.prototype.deleteMoveProjectDetails = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds[0] != null) {
            this.employeeService.deleteMoveProjectDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"].StatusId > 0) {
                    var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [];
                    }
                    contextObj.notificationService.ShowToaster("Selected Employee is deleted from the Move Project", 3);
                }
                else {
                    contextObj.notificationService.ShowToaster("Delete failed", 5);
                }
            });
        }
    };
    StackPlanDetailsComponent.prototype.inlineDelete = function (event) {
        this.deleteMoveProjectDetails();
    };
    StackPlanDetailsComponent.prototype.okDelete = function (event) {
        this.deleteMoveProjectDetails();
        this.showSlide = !this.showSlide;
    };
    StackPlanDetailsComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    StackPlanDetailsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    StackPlanDetailsComponent.prototype.showResourceClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select an Employee", 2);
        }
        else {
            this.splitviewInput.showSecondaryView = true;
        }
    };
    StackPlanDetailsComponent.prototype.assignLocation = function () {
        this.action = "assign";
        this.btnName = "Assign";
        this.pageTitle = "Assign Location";
        var contextObj = this;
        var isAssigned = 0;
        var drawingId = "";
        if (this.inputItems.selectedIds.length > 1) {
            for (var i = 0; i < this.inputItems.selectedIds.length; i++) {
                if (this.inputItems.rowData[i]["Move Status"] == "Assigned")
                    isAssigned = isAssigned + 1;
                if (i > 0) {
                    if (contextObj.inputItems.rowData[i]["ScheduledDrawingId"] != contextObj.inputItems.rowData[i - 1]["ScheduledDrawingId"]) {
                        contextObj.notificationService.ShowToaster("Only Employees scheduled to same floor can be assigned a location", 2);
                        return false;
                    }
                }
            }
            if (isAssigned > 0) {
                contextObj.notificationService.ShowToaster("One or more selected Employee(s) are already assigned or moved", 2);
                return false;
            }
            drawingId = contextObj.inputItems.rowData[0]["ScheduledDrawingId"];
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.rowData["Move Status"] == "Assigned") {
                contextObj.notificationService.ShowToaster("Selected Employee is already assigned", 2);
                return false;
            }
            drawingId = contextObj.inputItems.rowData["ScheduledDrawingId"];
        }
        var fieldObj = new Array();
        fieldObj.push({
            FieldId: 221,
            ReportFieldId: 5090,
            Value: "0"
        });
        fieldObj.push({
            FieldId: 222,
            ReportFieldId: 5090,
            Value: "0"
        });
        fieldObj.push({
            FieldId: 223,
            ReportFieldId: 5090,
            Value: "0"
        });
        fieldObj.push({
            FieldId: 1569,
            ReportFieldId: 5090,
            Value: "0"
        });
        fieldObj.push({
            FieldId: 1569,
            ReportFieldId: 3059,
            Value: drawingId
        });
        this.employeeService.loadAssignLocation(fieldObj, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            contextObj.fieldDetailsAssign = resultData["Data"];
            for (var i_1 = 0; i_1 < contextObj.fieldDetailsAssign.length; i_1++) {
                if (contextObj.fieldDetailsAssign[i_1].ReportFieldId == 3011) {
                    contextObj.fieldDetailsAssign[i_1]["IsVisible"] = false;
                }
                else if (contextObj.fieldDetailsAssign[i_1].ReportFieldId == 895) {
                    contextObj.fieldDetailsAssign[i_1]["FieldValue"] = contextObj.fieldProjectName["FieldValue"];
                }
                else if (contextObj.fieldDetailsAssign[i_1].ReportFieldId == 897) {
                    contextObj.fieldDetailsAssign[i_1]["FieldValue"] = contextObj.fieldDateRequested["FieldValue"];
                }
                else if (contextObj.fieldDetailsAssign[i_1].ReportFieldId == 898) {
                    contextObj.fieldDetailsAssign[i_1]["FieldValue"] = contextObj.fieldDateToComplete["FieldValue"];
                }
                if (contextObj.inputItems.rowData["To Floor"] != "") {
                    if (contextObj.fieldDetailsAssign[i_1].ReportFieldId == 523) {
                        contextObj.fieldDetailsAssign[i_1]["FieldValue"] = drawingId;
                        contextObj.fieldDetailsAssign[i_1]["IsEnabled"] = false;
                    }
                    if (contextObj.fieldDetailsAssign[i_1].ReportFieldId == 489) {
                        contextObj.fieldDetailsAssign[i_1]["IsEnabled"] = false;
                    }
                    if (contextObj.fieldDetailsAssign[i_1].ReportFieldId == 473) {
                        contextObj.fieldDetailsAssign[i_1]["IsEnabled"] = false;
                    }
                }
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    StackPlanDetailsComponent.prototype.OnSuccessfulSubmit = function (event) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "assign") {
                if (this.inputItems.selectedIds.length > 1) {
                    contextObj.getstackPlanDetailsList();
                }
                else {
                    retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                    this.itemsSource = retUpdatedSrc["itemSrc"];
                }
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                //this.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            }
            this.splitviewInput.showSecondaryView = false;
        }
    };
    StackPlanDetailsComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 885,
            Value: contextObj.projectId
        }, {
            ReportFieldId: 884,
            Value: null
        });
        contextObj.employeeService.getStackPlanDetailsListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, fieldobj).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
        });
    };
    StackPlanDetailsComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 885,
            Value: contextObj.projectId
        }, {
            ReportFieldId: 884,
            Value: null
        });
        contextObj.employeeService.getStackPlanDetailsListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, fieldobj).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
        });
    };
    StackPlanDetailsComponent = __decorate([
        core_1.Component({
            selector: 'stackplan-details',
            templateUrl: './app/Views/Employee/Tools/SpacePlanning/stackplan-details.html',
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, labelcomponent_component_1.LabelComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, assign_location_1.AssignLocationComponent,
                employeeresourcelist_1.EmployeeResourceListComponent, slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, employee_services_1.EmployeeService],
            inputs: ["selectedId", "stackPlanRowData"]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], StackPlanDetailsComponent);
    return StackPlanDetailsComponent;
}());
exports.StackPlanDetailsComponent = StackPlanDetailsComponent;
//# sourceMappingURL=stackplan-details.js.map
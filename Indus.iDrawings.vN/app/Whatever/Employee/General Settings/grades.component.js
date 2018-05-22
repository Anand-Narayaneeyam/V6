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
var grades_add_edit_component_1 = require('./grades-add-edit.component');
var GradesComponent = (function () {
    function GradesComponent(employeeService, notificationService, confirmationService, getData) {
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.getData = getData;
        this.dragEnable = true;
        this.totalItems = 0;
        this.types = true;
        this.pageIndex = 0;
        this.itemsPerPage = 30;
        this.success = "";
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: "[Rank Number]", sortDir: "ASC", selectioMode: "single" };
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
    GradesComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.employeeService.getGradeFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            for (var i = 0; i < resultData["Data"].length; i++) {
                resultData.Data[i]["Width"] = 100;
            }
            contextObj.getGrades();
        });
    };
    GradesComponent.prototype.changeEnableMenu = function () {
        var contextObj = this;
        contextObj.enableMenu = [1, 2, 3];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Grades exist", 2);
        }
    };
    GradesComponent.prototype.getGrades = function () {
        var contextObj = this;
        this.employeeService.getGradeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"] == "") {
                    resultData["Data"] = null;
                }
                else {
                    contextObj.GradeSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    for (var i = 0; i < contextObj.GradeSource.length; i++) {
                        contextObj.fieldOrderObj.push({
                            Id: contextObj.GradeSource[i].Id,
                            Value: contextObj.GradeSource[i].Grade,
                            OldPositionNo: contextObj.GradeSource[i]["Rank Number"],
                            NewPositionNo: null
                        });
                    }
                }
                contextObj.changeEnableMenu();
            }
        });
    };
    GradesComponent.prototype.onCardSubmit = function (event) {
        var contextObj = this;
        var fieldDetails = event.fieldObject;
        if (event["dataKeyValue"]) {
            this.employeeService.postEditGradeDetails(fieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.notificationService.ShowToaster("Grade updated", 3);
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Grade already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "1012" });
                    }
                    contextObj.changeEnableMenu();
                }
            });
        }
        else {
            this.employeeService.postAddGradeDetails(fieldDetails).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.notificationService.ShowToaster("Grade added", 3);
                        contextObj.types = false;
                        contextObj.GradeSource[contextObj.GradeSource.length - 1].Id = resultData["Data"].ServerId;
                        contextObj.GradeSource[contextObj.GradeSource.length - 1] = eval(resultData["Data"].Data)[0];
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                    }
                    else {
                        //contextObj.GradeSource.splice(contextObj.GradeSource.length - 1, 1);
                        contextObj.notificationService.ShowToaster("Grade already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "1012" });
                    }
                    contextObj.changeEnableMenu();
                }
            });
        }
    };
    GradesComponent.prototype.onCardCancel = function (event) {
        this.changeEnableMenu();
    };
    GradesComponent.prototype.onSubMenuChange = function (event, Id) {
        this.menuEventValue = event.value;
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
            this.FieldorderClick();
            this.pageTitle = "Rank Order";
        }
    };
    GradesComponent.prototype.onDelete = function (e) {
        this.onMenuDeleteClick();
    };
    GradesComponent.prototype.onMenuAddClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Grade";
        this.employeeService.loadGradeAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.fieldDetailsAdd1[2].IsVisible = false;
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    GradesComponent.prototype.onMenuEditClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Grade";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Grade", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.employeeService.loadGradeAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    GradesComponent.prototype.FieldorderClick = function () {
        //this.GradeSource = this.getData.updateTotalItems(this.totalItems, this.action);
        //this.types = true;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.enableMenu = [1, 2, 3];
    };
    GradesComponent.prototype.onMenuDeleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Grade", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            //var dbObject = new Array<ReportFieldArray>();
            //dbObject.push({ ReportFieldId: 173, Value: "732" })
            //this.employeeService.CheckIsEntityReferenceFound(dbObject, this.selIds[0]).subscribe(function (resultData) {
            this.employeeService.IsGradeInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 0) {
                    contextObj.message = "Are you sure you want to delete the selected Empolyee Grade?";
                    contextObj.showSlide = !contextObj.showSlide;
                }
                else {
                    contextObj.notificationService.ShowToaster("Selected Grade in use, cannot be deleted", 5);
                }
            });
        }
    };
    GradesComponent.prototype.okDelete = function (event) {
        this.deleteGrade();
        this.showSlide = !this.showSlide;
    };
    GradesComponent.prototype.deleteGrade = function () {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.employeeService.postDeleteGradeDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["StatusId"] == 1) {
                    var retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.GradeSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.GradeSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [1];
                    }
                    contextObj.getGrades();
                    contextObj.notificationService.ShowToaster("Selected Grade deleted", 3);
                }
                else {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Selected Grade in use, cannot be deleted", 5);
                            }
                            break;
                    }
                }
            }
        });
        //}
    };
    GradesComponent.prototype.cancelClick = function (event) {
        //this.selIds = [];
        this.showSlide = !this.showSlide;
    };
    GradesComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    GradesComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getGrades();
    };
    GradesComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getGrades();
    };
    GradesComponent.prototype.rankdorderUpdate = function (event) {
        console.log(event);
    };
    GradesComponent.prototype.updateFieldOrder = function (event, fieldOrderObj) {
        var contextObj = this;
        var strField = "";
        var count = 0;
        var submitArray = new Array();
        if (fieldOrderObj != undefined) {
            for (var i = 0; i < fieldOrderObj.length; i++) {
                fieldOrderObj[i].NewPositionNo = i;
                submitArray.push({
                    ReportFieldId: 5089,
                    ApplicationFieldId: fieldOrderObj[i].Id,
                    ApplicationFormId: 184,
                    PositionNo: i
                });
            }
            console.log("out", submitArray);
            this.employeeService.postUpdateEmployeeRankOrder(JSON.stringify(submitArray)).subscribe(function (resultData) {
                debugger;
                if (resultData["Data"].StatusId == 1) {
                    contextObj.notificationService.ShowToaster("Rank Order updated", 3);
                    contextObj.employeeService.getGradeData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                        if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                            if (resultData["Data"] == "") {
                                resultData["Data"] = null;
                            }
                            else {
                                contextObj.GradeSource = JSON.parse(resultData["Data"].FieldBinderData);
                                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                            }
                            contextObj.changeEnableMenu();
                        }
                    });
                }
            });
        }
    };
    GradesComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.GradeSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.GradeSource = retUpdatedSrc["itemSrc"];
            contextObj.changeEnableMenu();
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.GradeSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            //contextObj.ProceduresSource = retUpdatedSrc["itemSrc"];
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = false;
    };
    GradesComponent = __decorate([
        core_1.Component({
            selector: 'grades',
            templateUrl: 'app/Views/Employee/General Settings/grades.component.html',
            directives: [list_component_1.ListComponent, field_component_1.FieldComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, slide_component_1.SlideComponent, fieldorder_component_1.FieldOrderComponent, ng2_dnd_1.DND_DIRECTIVES, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, grades_add_edit_component_1.GradesAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, employee_services_1.EmployeeService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, ng2_dnd_1.DND_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions])
    ], GradesComponent);
    return GradesComponent;
}());
exports.GradesComponent = GradesComponent;
//# sourceMappingURL=grades.component.js.map
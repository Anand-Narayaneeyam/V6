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
var employee_services_1 = require('../../../Models/Employee/employee.services');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var http_1 = require('@angular/http');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var jobtitle_add_edit_component_1 = require('./jobtitle-add-edit.component');
var JobTitleComponent = (function () {
    function JobTitleComponent(employeeService, administrationService, notificationService, confirmationService, generFunctions) {
        this.employeeService = employeeService;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.generFunctions = generFunctions;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Job Title]', sortDir: 'ASC', selectioMode: "single" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 1528
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 1529
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 1530
            }
        ];
        this.gridcount = 0;
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.enableMenu = [];
        this.selIds = new Array();
        this.totalItems = 0;
        this.itemsPerPage = 10;
        this.success = "";
        this.types = true;
        this.pageIndex = 0;
        this.submitSuccess = [];
    }
    JobTitleComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.employeeService.getJobTitleFields().subscribe(function (list) {
            if (contextObj.generFunctions.checkForUnhandledErrors(list)) {
                for (var i = 0; i < list["Data"].length; i++) {
                    list.Data[i]["Width"] = 200;
                }
                contextObj.fields = (list["Data"]);
                contextObj.getJobTitle();
            }
        });
        var callBack = function (data) {
            this.menuData = data;
        };
        this.generFunctions.GetPrivilegesOfPage(this.menuData, callBack, 310, this.administrationService, this.menuData.length);
    };
    JobTitleComponent.prototype.getJobTitle = function () {
        var contextObj = this;
        this.employeeService.getJobTitleData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            if (contextObj.generFunctions.checkForUnhandledErrors(resultData)) {
                contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.changeEnableMenu();
            }
        });
    };
    JobTitleComponent.prototype.changeEnableMenu = function () {
        var contextObj = this;
        contextObj.enableMenu = [0, 1, 2];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [0];
            contextObj.notificationService.ShowToaster("No Job Titles exist", 2);
        }
    };
    JobTitleComponent.prototype.onSubMenuChange = function (event) {
        if (event.value == 0) {
            this.addClick();
        }
        else if (event.value == 1) {
            this.editClick();
        }
        else if (event.value == 2) {
            this.deleteClick();
        }
    };
    JobTitleComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getJobTitle();
    };
    JobTitleComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.getJobTitle();
    };
    JobTitleComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Job Title";
        this.employeeService.loadJobTitleAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    JobTitleComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Job Title";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.employeeService.loadJobTitleAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    JobTitleComponent.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 1) {
            //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Job Title?", "Yes");
            var dbObject = new Array();
            dbObject.push({ ReportFieldId: 173, Value: "37" });
            this.employeeService.CheckIsEntityReferenceFound(dbObject, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == false) {
                    contextObj.message = "Are you sure you want to delete the selected Employee Job Title?";
                    contextObj.showSlide = !contextObj.showSlide;
                }
                else {
                    contextObj.message = "Selected Job Title is in use. Are you sure you want to delete the selected Employee Job Title?";
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
        else if (this.inputItems.selectedIds.length > 0) {
            this.notificationService.ShowToaster("This operation is performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Job Title", 2);
        }
    };
    JobTitleComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.employeeService.deleteJobTitle(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (contextObj.generFunctions.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["StatusId"] == 1) {
                    var retUpdatedSrc = contextObj.generFunctions.updateDataSource(contextObj.sourceData, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.sourceData = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [0];
                    }
                    contextObj.notificationService.ShowToaster("Selected Job Title deleted", 3);
                }
                else {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Selected Job Title in use, cannot be deleted", 5);
                            }
                            break;
                    }
                }
            }
        });
        //}
        this.showSlide = !this.showSlide;
    };
    JobTitleComponent.prototype.onDelete = function (e) {
        this.deleteClick();
    };
    JobTitleComponent.prototype.onCancel = function (e) {
        this.enableMenu = [0, 2];
    };
    JobTitleComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    JobTitleComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    JobTitleComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFunctions.updateDataSource(contextObj.sourceData, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.sourceData = retUpdatedSrc["itemSrc"];
            contextObj.changeEnableMenu();
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.generFunctions.updateDataSource(contextObj.sourceData, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            //contextObj.ProceduresSource = retUpdatedSrc["itemSrc"];
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = false;
    };
    JobTitleComponent = __decorate([
        core_1.Component({
            selector: 'jobtitle',
            templateUrl: './app/Views/Employee/General Settings/jobtitle.component.html',
            directives: [submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, jobtitle_add_edit_component_1.JobTitleAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, employee_services_1.EmployeeService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions])
    ], JobTitleComponent);
    return JobTitleComponent;
}());
exports.JobTitleComponent = JobTitleComponent;
//# sourceMappingURL=jobtitle.component.js.map
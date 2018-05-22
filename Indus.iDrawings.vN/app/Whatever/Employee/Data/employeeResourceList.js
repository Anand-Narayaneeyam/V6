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
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var new_employee_resources_1 = require('./new-employee_resources');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var EmployeeResourceListComponent = (function () {
    function EmployeeResourceListComponent(administrationService, employeeService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.showSlide = false;
        this.position = "top-right";
        this.selectedTab = 0;
        this.newResourceTab = false;
        this.pageIndex = 0;
        this.blnShowSort = true;
        this.sortCol = "[Resource Type]";
        this.sortDir = "ASC";
        this.success = "";
        this.isDeleteVisible = false;
        this.selIds = new Array();
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 1829
            },
            {
                "id": 1,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 1831
            }
        ];
        this.gridcount = 8;
        this.enableMenu = [0, 1];
        this.employeeResourceCount = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC', selectioMode: "single" };
    }
    EmployeeResourceListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        if (this.target == 4) {
            this.blnShowSort = false;
            this.isDeleteVisible = true;
        }
        else {
            this.blnShowSort = true;
            this.isDeleteVisible = false;
        }
        if (contextObj.EmployeeData) {
            this.assigned = contextObj.EmployeeData["Assigned?"];
        }
        this.loadData();
    };
    EmployeeResourceListComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes["selectedId"] && changes["selectedId"]["currentValue"] != changes["selectedId"]["previousValue"]) {
        }
    };
    EmployeeResourceListComponent.prototype.loadData = function () {
        var contextObj = this;
        this.employeeService.getEmployeeResourceColumnData().subscribe(function (resultData) {
            contextObj.fieldEmployeeCode = resultData["Data"].find(function (el) { return el.ReportFieldId === 871; });
            contextObj.fieldEmployeeName = resultData["Data"].find(function (el) { return el.ReportFieldId === 3011; });
            if (contextObj.EmployeeData) {
                contextObj.fieldEmployeeName["FieldValue"] = contextObj.EmployeeData["Employee Name"];
                contextObj.fieldEmployeeCode["FieldValue"] = contextObj.EmployeeData["Employee Code"];
                contextObj.assigned = contextObj.EmployeeData["Assigned?"];
            }
            var removeArr = [871, 3011, 7891];
            contextObj.fields = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
        });
        this.employeeService.getEmployeeResourceData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.gridcount == 0) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Resources added", 2);
                contextObj.blnShowSort = false;
            }
            else {
                contextObj.enableMenu = [0, 1];
            }
            if (contextObj.assigned == "No") {
                contextObj.employeeService.getSessionData().subscribe(function (data) {
                    var retData = data["Data"];
                    if (retData["UserRoleId"] == 4) {
                        contextObj.enableMenu = [];
                    }
                    else if (retData["UserRoleId"] == 7) {
                        contextObj.checkEditPrivilageExist(contextObj.gridcount);
                    }
                });
            }
            else if (contextObj.assigned == "Yes") {
                contextObj.checkEditPrivilageExist(contextObj.gridcount);
            }
        });
    };
    EmployeeResourceListComponent.prototype.getSelectedTab = function (event) {
        this.deleteIndex = 0;
        var contextObj = this;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
    };
    EmployeeResourceListComponent.prototype.onTabClose = function (event) {
        this.newResourceTab = false;
        this.selectedTab = event[0];
    };
    EmployeeResourceListComponent.prototype.loadTabContent = function () {
        var contextObj = this;
        this.localselection = 1;
        contextObj.newResourceTab = true;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 100);
    };
    EmployeeResourceListComponent.prototype.checkEditPrivilageExist = function (gridcount) {
        var contextObj = this;
        var empId = this.EmployeeData["Id"];
        if (empId != undefined) {
            this.employeeService.checkEditPrivilageExist(empId).subscribe(function (resultData) {
                if (resultData["Data"].ServerId == 0) {
                    contextObj.enableMenu = [];
                }
                else {
                    if (gridcount > 0)
                        contextObj.enableMenu = [0, 1];
                    else
                        contextObj.enableMenu = [0];
                }
            });
        }
    };
    EmployeeResourceListComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                this.loadTabContent();
                break;
            case 1:
                this.deleteResources(this.inputItems.selectedIds);
                break;
        }
    };
    EmployeeResourceListComponent.prototype.onSort = function (event) {
        var contextObj = this;
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.employeeService.sortEmployeeResource(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [0, 1];
            }
        });
    };
    EmployeeResourceListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.employeeService.sortEmployeeResource(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [0, 1];
            }
        });
    };
    ;
    EmployeeResourceListComponent.prototype.deleteResources = function (resourceIds) {
        if (resourceIds.length > 0) {
            this.showSlide = !this.showSlide;
        }
        else {
            this.notificationService.ShowToaster("Select Resource(s)", 2);
        }
    };
    EmployeeResourceListComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        var arrayList = new Array();
        for (var i = 0; i < contextObj.inputItems.selectedIds.length; i++) {
            arrayList.push({
                ReportFieldId: 865,
                Value: this.inputItems.selectedIds[i].toString()
            });
        }
        this.showSlide = !this.showSlide;
        this.employeeService.postResourcesDelete(JSON.stringify(arrayList), this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == "1") {
                contextObj.notificationService.ShowToaster("Selected Resource(s) deleted", 3);
                contextObj.employeeService.getEmployeeResourceData(contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir, contextObj.selectedId).subscribe(function (resultData) {
                    contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.gridcount = contextObj.totalItems;
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    if (contextObj.gridcount == 0) {
                        contextObj.notificationService.ShowToaster("No Resources added", 2);
                        contextObj.enableMenu = [0];
                        contextObj.blnShowSort = false;
                    }
                    contextObj.toUpdateEmployeeRowData(resultData);
                });
            }
        });
    };
    EmployeeResourceListComponent.prototype.onDelete = function (e) {
        this.deleteResources(this.inputItems.selectedIds);
    };
    EmployeeResourceListComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    EmployeeResourceListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    EmployeeResourceListComponent.prototype.submitSuccess = function (event) {
        var contextObj = this;
        if (event["status"] == "success") {
            this.employeeService.getEmployeeResourceData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.gridcount = contextObj.totalItems;
                    contextObj.enableMenu = [0, 1];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Resources added", 2);
                    contextObj.enableMenu = [0];
                }
                contextObj.selectedTab = 0;
                contextObj.deleteIndex = contextObj.deleteIndex + 1;
                contextObj.newResourceTab = false;
                contextObj.toUpdateEmployeeRowData(resultData);
            });
        }
    };
    EmployeeResourceListComponent.prototype.toUpdateEmployeeRowData = function (data) {
        var contextObj = this;
        var jsonData = JSON.parse(data["Data"].FieldBinderData);
        contextObj.employeeResourceCount.emit({
            employeeId: contextObj.selectedId,
            resourceCount: contextObj.totalItems
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EmployeeResourceListComponent.prototype, "employeeResourceCount", void 0);
    EmployeeResourceListComponent = __decorate([
        core_1.Component({
            selector: 'employeeResourceList',
            templateUrl: 'app/Views/Employee/Data/employeeResourceList.html',
            directives: [slide_component_1.SlideComponent, submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, field_component_1.FieldComponent, list_component_1.ListComponent, card_component_1.CardComponent, notify_component_1.Notification, labelcomponent_component_1.LabelComponent, search_component_1.searchBox, tabs_component_1.TabsComponent, tab_component_1.TabComponent, new_employee_resources_1.NewResourcesComponent, grid_component_1.GridComponent],
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['selectedId', 'EmployeeData', 'target', 'filterResourceChkbx'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], EmployeeResourceListComponent);
    return EmployeeResourceListComponent;
}());
exports.EmployeeResourceListComponent = EmployeeResourceListComponent;
//# sourceMappingURL=employeeResourceList.js.map
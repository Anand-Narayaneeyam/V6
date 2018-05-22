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
var employee_services_1 = require('../../../Models/Employee/employee.services');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var checkboxcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var General_1 = require('../../../Models/Common/General');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var NewResourcesComponent = (function () {
    function NewResourcesComponent(employeeService, notificationService, getData) {
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.isSubscribed = true;
        this.isFilterLocation = false;
        this.isDdlResourceTypeLoaded = false;
        this.submitSuccess = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false };
    }
    NewResourcesComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.alignContent = "horizontal";
        this.employeeService.getEmployeeNewResourceColumnData().subscribe(function (resultData) {
            contextObj.filterByEmployeeLocation = resultData["Data"].find(function (el) { return el.ReportFieldId === 7413; });
            //if (contextObj.assigned == "Yes") {
            //    contextObj.filterByEmployeeLocation["FieldValue"] = true;
            //} else {
            //    contextObj.filterByEmployeeLocation["FieldValue"] = false;
            //}
            contextObj.employeeService.customerSubscribedFeatures("195").subscribe(function (customerSettingsData) {
                if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                    if (contextObj.assigned == "Yes") {
                        contextObj.filterByEmployeeLocation["FieldValue"] = true;
                        contextObj.filterByEmployeeLocation["IsVisible"] = false;
                        contextObj.isSubscribed = false;
                    }
                }
                else {
                    if (contextObj.assigned == "Yes") {
                        contextObj.filterByEmployeeLocation["FieldValue"] = true;
                    }
                    else {
                        contextObj.filterByEmployeeLocation["FieldValue"] = false;
                    }
                }
            });
            contextObj.ddlResourceCategory = resultData["Data"].find(function (el) { return el.ReportFieldId === 283; });
            contextObj.ddlResourceType = resultData["Data"].find(function (el) { return el.ReportFieldId === 647; });
            var removeArr = [7413, 283, 647];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
        });
    };
    NewResourcesComponent.prototype.onChangeResourceCategory = function (event) {
        this.objectCategoryId = event;
        var contextObj = this;
        if (this.objectCategoryId > -1) {
            if ((this.filterByEmployeeLocation.FieldValue == true) && (this.filterResourceChkbx == true)) {
                this.employeeService.getResourceTypeFilterByEmployeeLocation(this.objectCategoryId, this.employeeId).subscribe(function (resultData) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        if (contextObj.ddlResourceType["FieldId"] == 775) {
                            contextObj.ddlResourceType["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                            contextObj.ddlResourceType["FieldValue"] = "-1";
                        }
                    }
                    else {
                        if (contextObj.ddlResourceType["FieldId"] == 775) {
                            contextObj.ddlResourceType["LookupDetails"]["LookupValues"] = null;
                            contextObj.ddlResourceType["FieldValue"] = "-1";
                            contextObj.notificationService.ShowToaster("No Resource Types exist", 2);
                        }
                    }
                });
                this.isDdlResourceTypeLoaded = true;
            }
            else {
                this.employeeService.getResourceType(this.objectCategoryId, this.target).subscribe(function (resultData) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        if (contextObj.ddlResourceType["FieldId"] == 775) {
                            contextObj.ddlResourceType["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                            contextObj.ddlResourceType["FieldValue"] = "-1";
                        }
                        else {
                            if (contextObj.ddlResourceType["FieldId"] == 775) {
                                contextObj.ddlResourceType["LookupDetails"]["LookupValues"] = null;
                                contextObj.ddlResourceType["FieldValue"] = "-1";
                                contextObj.notificationService.ShowToaster("No Resource Types exist", 2);
                            }
                        }
                    }
                });
                this.isDdlResourceTypeLoaded = true;
            }
        }
        else {
            this.ddlResourceType["FieldValue"] = "-1";
            this.ddlResourceType["LookupDetails"]["LookupValues"] = [];
            this.itemsSource = [];
        }
    };
    NewResourcesComponent.prototype.onChangeResourceType = function (event) {
        this.resourceTypeId = event;
        var contextObj = this;
        if (this.resourceTypeId > -1) {
            this.onDataLoad();
        }
        else {
            this.itemsSource = [];
        }
    };
    NewResourcesComponent.prototype.filterByEmployeeLocationChange = function (event) {
        var contextObj = this;
        contextObj.isFilterLocation = event.IsChecked;
    };
    NewResourcesComponent.prototype.onDataLoad = function () {
        var contextObj = this;
        if (this.isDdlResourceTypeLoaded == true) {
            if (this.filterByEmployeeLocation.FieldValue == true) {
                this.employeeService.getEmployeeNewResourceByLocationData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, contextObj.resourceTypeId, contextObj.employeeId).subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.totalItems > 0) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("No data exists", 2);
                        contextObj.itemsSource = null;
                    }
                });
            }
            else {
                this.employeeService.getEmployeeNewResourceData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.target, contextObj.objectCategoryId, contextObj.resourceTypeId, contextObj.employeeId).subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.totalItems > 0) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("No data exists", 2);
                        contextObj.itemsSource = null;
                    }
                });
            }
        }
    };
    NewResourcesComponent.prototype.onSort = function (objGrid) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.onDataLoad();
    };
    NewResourcesComponent.prototype.insertEmployeeResourcesList = function (event) {
        var contextObj = this;
        var hasSelectedIds = false;
        var arrayList = new Array();
        if (this.filterByEmployeeLocation.FieldValue == true) {
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 865,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            if (hasSelectedIds == true) {
                this.employeeService.postSubmitActionEmployeeRsource(JSON.stringify(arrayList), contextObj.employeeId).subscribe(function (resultData) {
                    if (resultData["Data"].StatusId > 0) {
                        contextObj.notificationService.ShowToaster("Resource added", 3);
                        contextObj.submitSuccess.emit({ status: "success" });
                    }
                });
            }
            else {
                contextObj.notificationService.ShowToaster("Select a Resource", 2);
            }
        }
        else {
            hasSelectedIds = false;
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 865,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            if (hasSelectedIds == true) {
                this.employeeService.postSubmitActionEmployeeRsource(JSON.stringify(arrayList), contextObj.employeeId).subscribe(function (resultData) {
                    if (resultData["Data"].StatusId > 0) {
                        contextObj.notificationService.ShowToaster("Resource added", 3);
                        contextObj.submitSuccess.emit({ status: "success" });
                    }
                });
            }
            else {
                contextObj.notificationService.ShowToaster("Select a Resource", 2);
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NewResourcesComponent.prototype, "submitSuccess", void 0);
    NewResourcesComponent = __decorate([
        core_1.Component({
            selector: 'new-employee_resources',
            templateUrl: 'app/Views/Employee/Data/new-employee_resources.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, dropdownlistcomponent_component_1.DropDownListComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, paging_component_1.PagingComponent],
            providers: [http_1.HTTP_PROVIDERS, employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['target', 'employeeId', 'filterResourceChkbx', 'assigned']
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], NewResourcesComponent);
    return NewResourcesComponent;
}());
exports.NewResourcesComponent = NewResourcesComponent;
//# sourceMappingURL=new-employee_resources.js.map
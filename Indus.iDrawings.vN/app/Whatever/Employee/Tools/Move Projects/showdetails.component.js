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
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var employee_services_1 = require('../../../../Models/Employee/employee.services');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var ShowDetailsComponent = (function () {
    function ShowDetailsComponent(employeeService, _notificationService) {
        this.employeeService = employeeService;
        this._notificationService = _notificationService;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '[Id]', selectioMode: "single" };
        this.blnPlanned = false;
        this.blnMoved = false;
        this.blnAssigned = false;
        this.blnDeleted = false;
        this.blnAssignedSpaceIdNull = false;
        this.showDetailsMenuTotalItems = 8;
    }
    ShowDetailsComponent.prototype.updateshowDetailsMenu = function (event) {
        var contextObj = this;
        if (this.validation(event.value)) {
            if (event.value == 1) {
                //var value = "";
                var fieldobj = new Array();
                fieldobj.push({ ReportFieldId: 885, Value: this.projectId.toString() });
                for (var i = 0; i < this.inputItems.selectedIds.length; i++) {
                    // value = value + this.inputItems.selectedIds[i] + ",";
                    fieldobj.push({ ReportFieldId: 884, Value: this.inputItems.selectedIds[i] });
                }
                //value = value.substring(0, value.length - 1);
                // fieldobj.push({ ReportFieldId: 884, Value: value })
                this.employeeService.executeEmployee(fieldobj, this.inputItems.selectedIds).subscribe(function (resultData) {
                    if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["Data"]);
                        if (contextObj.inputItems.selectedIds.length == 1)
                            contextObj._notificationService.ShowToaster("Selected Employee is moved", 3);
                        else
                            contextObj._notificationService.ShowToaster("Selected Employees are moved", 3);
                    }
                    else if (resultData["Data"]["StatusId"] == 3)
                        if (contextObj.inputItems.selectedIds.length == 1)
                            contextObj._notificationService.ShowToaster("Scenario is already created for the selected Employee", 2);
                        else
                            contextObj._notificationService.ShowToaster("Scenario is already created for some of the selected Employees", 2);
                });
            }
            else if (event.value == 2) {
                var fieldobj = new Array();
                fieldobj.push({ ReportFieldId: 885, Value: this.projectId.toString() });
                for (var i = 0; i < this.itemsSource.length; i++) {
                    // value = value + this.inputItems.selectedIds[i] + ",";
                    fieldobj.push({ ReportFieldId: 884, Value: this.itemsSource[i].Id });
                }
                //value = value.substring(0, value.length - 1);
                // fieldobj.push({ ReportFieldId: 884, Value: value })
                this.employeeService.executeEmployee(fieldobj, this.inputItems.selectedIds).subscribe(function (resultData) {
                    if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["Data"]);
                        if (contextObj.itemsSource.length == 1)
                            contextObj._notificationService.ShowToaster("Selected Employee is moved", 3);
                        else
                            contextObj._notificationService.ShowToaster("Selected Employees are moved", 3);
                    }
                    else if (resultData["Data"]["StatusId"] == 3)
                        if (contextObj.inputItems.selectedIds.length == 1)
                            contextObj._notificationService.ShowToaster("Scenario is already created for the selected Employee", 2);
                        else
                            contextObj._notificationService.ShowToaster("Scenario is already created for some of the selected Employees", 2);
                });
            }
        }
    };
    ShowDetailsComponent.prototype.validation = function (menu) {
        var selection;
        var status = true;
        switch (menu) {
            case 1:
                if (this.inputItems.selectedIds.length > 0) {
                    this.setStatusOfSelectedRow(this.inputItems.rowData.MoveProjectDetailsStatusId);
                }
                break;
            case 2:
                selection = this.itemsSource.length;
                break;
        }
        for (var i = 0; i < selection; i++) {
            var moveprojectdetailStatusId = this.itemsSource[i].MoveProjectDetailsStatusId;
            this.setStatusOfSelectedRow(moveprojectdetailStatusId);
            var assignedSpaceId = this.itemsSource[i].AssignedSpaceId;
            if (assignedSpaceId == null)
                this.blnAssigned = true;
        }
        if (this.blnDeleted == true) {
            if (selection > 1)
                this._notificationService.ShowToaster("One or more selected employee(s) are deleted from the selected Move Project", 2);
            else if (selection == 1)
                this._notificationService.ShowToaster("Selected Employee is deleted from the selected Move Project", 2);
            status = false;
        }
        else if ((this.blnAssigned == false || this.blnPlanned == true) && this.blnMoved == false) {
            if (selection > 1)
                this._notificationService.ShowToaster("Some of the Employees are not assigned a Space", 2);
            else if (selection == 1)
                this._notificationService.ShowToaster("Selected Employee is not  assigned a Space", 2);
            status = false;
        }
        else if (this.blnMoved == true) {
            if (selection > 1)
                this._notificationService.ShowToaster("Some of the Employees are already moved", 2);
            else if (selection == 1)
                this._notificationService.ShowToaster("Selected Employee is already moved", 2);
            status = false;
        }
        else
            status = true;
        return status;
    };
    ShowDetailsComponent.prototype.setStatusOfSelectedRow = function (moveprojectdetailStatusId) {
        switch (moveprojectdetailStatusId) {
            case 9:
                this.blnAssigned = true;
                break;
            case 12:
                this.blnPlanned = true;
                break;
            case 13:
                this.blnMoved = true;
                break;
            case 4:
                this.blnDeleted = true;
                break;
        }
    };
    ShowDetailsComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.loadData();
    };
    ShowDetailsComponent.prototype.onSort = function (event) {
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.loadData();
    };
    ShowDetailsComponent.prototype.ngOnChanges = function (changes) {
        if (changes["projectId"] && changes["projectId"] && changes["projectId"]["currentValue"] != changes["projectId"]["previousValue"])
            this.loadData();
    };
    ShowDetailsComponent.prototype.loadData = function () {
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 885,
            Value: this.projectId.toString()
        }, {
            ReportFieldId: 884,
            Value: null
        });
        var contextObj = this;
        this.employeeService.getShowDetailsReadOnlyData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, fieldobj).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            //for (let i = 0; i < contextObj.itemsSource.length; i++) {
            //    if (contextObj.itemsSource[i].StatusId == 30)
            //        contextObj.itemsSource[i].Status = "Approved";
            //}
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableshowDetailsMenu = [];
                contextObj.itemsSource = null;
                contextObj._notificationService.ShowToaster("No Employee Move Details added to this Move Project", 2);
            }
            else {
                if (contextObj.MoveProjectStatus == "Approved")
                    contextObj.enableshowDetailsMenu = [0, 1];
                else
                    contextObj.enableshowDetailsMenu = [0];
            }
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    ShowDetailsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        if (contextObj.MoveProjectStatus == "Work Order Generated") {
            this.showDetailsMenu = [];
        }
        else {
            this.showDetailsMenu = [
                //    {
                //    "id": 0,
                //    "title": "Show Resources",
                //    "image": "",
                //    "path": "",
                //    "submenu": null
                //},
                {
                    "id": 1,
                    "title": "Execute",
                    "image": "Execute",
                    "path": "Execute",
                    "submenu": null
                }
            ];
        }
        this.employeeService.getShowDetailsReadOnlyField().subscribe(function (resultData) {
            var filtereddata = resultData["Data"].filter(function (item) { return (item.FieldId != 2997); });
            filtereddata = filtereddata.filter(function (item) { return (item.FieldId != 2998); });
            contextObj.fieldObject = filtereddata;
        });
        //this.loadData();
    };
    ShowDetailsComponent = __decorate([
        core_1.Component({
            selector: 'show-details',
            templateUrl: './app/Views/Employee/Tools/Move Projects/showDetails.component.html',
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, submenu_component_1.SubMenu, notify_component_1.Notification],
            providers: [notify_service_1.NotificationService, employee_services_1.EmployeeService],
            inputs: ['projectId', 'MoveProjectStatus']
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService])
    ], ShowDetailsComponent);
    return ShowDetailsComponent;
}());
exports.ShowDetailsComponent = ShowDetailsComponent;
//# sourceMappingURL=showdetails.component.js.map
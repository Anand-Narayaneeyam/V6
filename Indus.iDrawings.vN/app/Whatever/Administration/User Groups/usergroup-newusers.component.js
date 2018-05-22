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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var checkboxcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var General_1 = require('../../../Models/Common/General');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var UserGroupNewUserComponent = (function () {
    function UserGroupNewUserComponent(administrationService, notificationService, getData) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.isFilterLocation = false;
        this.isDdlEquipmentTypeLoaded = false;
        this.equipmentIds = new Array();
        this.resourceWithFilterIds = new Array();
        this.submitSuccess = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "ASC", selectedIds: [], allowAdd: false };
    }
    UserGroupNewUserComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.administrationService.getUserGroupNewUserFields().subscribe(function (resultData) {
            if (contextObj.UserCategoryId == 1) {
                resultData["Data"][2].FieldLabel = "User Name";
                contextObj.inputItems.sortCol = "[User Name]";
            }
            if (contextObj.UserCategoryId == 2) {
                resultData["Data"][2].FieldLabel = "Employee Name";
                resultData["Data"][3].FieldLabel = "Employee Code";
                contextObj.inputItems.sortCol = "[Employee Name]";
            }
            if (contextObj.UserCategoryId == 3) {
                resultData["Data"][2].FieldLabel = "Technician Name";
                resultData["Data"][3].FieldLabel = "Trade";
                contextObj.inputItems.sortCol = "[Technician Name]";
            }
            if (contextObj.UserCategoryId == 4) {
                resultData["Data"][2].FieldLabel = "Contractor Name";
                resultData["Data"][3].FieldLabel = "Trade";
                contextObj.inputItems.sortCol = "[Contractor Name]";
            }
            contextObj.fieldObject = resultData["Data"];
            contextObj.getUserGroupNewUserData();
        });
    };
    UserGroupNewUserComponent.prototype.getUserGroupNewUserData = function () {
        var contextObj = this;
        this.administrationService.getUserGroupNewUserData(this.UserCategoryId, this.UserGroupId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0)
                switch (contextObj.UserCategoryId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("No iDrawings Users exist", 2);
                        break;
                    case 2:
                        contextObj.notificationService.ShowToaster("No Employees exist", 2);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("No Technicians exist", 2);
                        break;
                    case 4:
                        contextObj.notificationService.ShowToaster("No Contractors exist", 2);
                        break;
                }
        });
    };
    UserGroupNewUserComponent.prototype.insertUserList = function (event) {
        var contextObj = this;
        var selectedRowIds = "";
        var arrayList = new Array();
        if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
            switch (contextObj.UserCategoryId) {
                case 1:
                    contextObj.notificationService.ShowToaster("No iDrawings Users exist", 2);
                    break;
                case 2:
                    contextObj.notificationService.ShowToaster("No Employees exist", 2);
                    break;
                case 3:
                    contextObj.notificationService.ShowToaster("No Technicians exist", 2);
                    break;
                case 4:
                    contextObj.notificationService.ShowToaster("No Contractors exist", 2);
                    break;
            }
            return;
        }
        else {
            var hasSelectedIds = false;
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 2806,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            if (hasSelectedIds == true) {
                arrayList.push({
                    ReportFieldId: 406,
                    Value: this.UserCategoryId.toString()
                });
                arrayList.push({
                    ReportFieldId: 2807,
                    Value: this.UserGroupId.toString()
                });
                var test = JSON.stringify(arrayList);
                this.administrationService.UpdateUserGroupUsers(JSON.stringify(arrayList)).subscribe(function (resultData) {
                    if (resultData["Data"].StatusId > 0) {
                        switch (contextObj.UserCategoryId) {
                            case 1:
                                contextObj.notificationService.ShowToaster("iDrawings User(s) added to the selected User Group", 3);
                                break;
                            case 2:
                                contextObj.notificationService.ShowToaster("Employee(s) added to the selected User Group", 3);
                                break;
                            case 3:
                                contextObj.notificationService.ShowToaster("Technician(s) added to the selected User Group", 3);
                                break;
                            case 4:
                                contextObj.notificationService.ShowToaster("Contractor(s) added to the selected User Group", 3);
                                break;
                        }
                        contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                    }
                });
            }
            else {
                switch (contextObj.UserCategoryId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("Select an iDrawings User", 2);
                        break;
                    case 2:
                        contextObj.notificationService.ShowToaster("Select an Employee", 2);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Select a Technician", 2);
                        break;
                    case 4:
                        contextObj.notificationService.ShowToaster("Select a Contractor", 2);
                        break;
                }
            }
        }
    };
    UserGroupNewUserComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getUserGroupNewUserData();
    };
    UserGroupNewUserComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.getUserGroupNewUserData();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserGroupNewUserComponent.prototype, "submitSuccess", void 0);
    UserGroupNewUserComponent = __decorate([
        core_1.Component({
            selector: 'usergroup-newusers',
            templateUrl: 'app/Views/Administration/User Groups/usergroup-newusers.component.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, checkboxcomponent_component_1.CustomCheckBoxComponent, paging_component_1.PagingComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['UserCategoryId', 'UserGroupId']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], UserGroupNewUserComponent);
    return UserGroupNewUserComponent;
}());
exports.UserGroupNewUserComponent = UserGroupNewUserComponent;
//# sourceMappingURL=usergroup-newusers.component.js.map
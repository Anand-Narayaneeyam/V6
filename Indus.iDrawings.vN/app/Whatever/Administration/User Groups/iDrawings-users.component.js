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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var usergroup_newusers_component_1 = require('./usergroup-newusers.component');
var iDrawingsUsersComponent = (function () {
    function iDrawingsUsersComponent(administrationService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC', selectioMode: "single" };
        this.pageIndex = 0;
        this.selectedTab = 0;
        this.newUserTab = false;
        this.deleteIndex = 0;
        this.types = true;
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        this.enableMenu = [0, 1];
        this.position = "top-right";
        this.showSlide = false;
    }
    iDrawingsUsersComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        this.administrationService.getiDrawingsUsersFields().subscribe(function (resultData) {
            if (contextObj.UserCategoryId == 1) {
                resultData["Data"][1].FieldLabel = "User Name";
                contextObj.tabTitle = "iDrawings Users";
                contextObj.selectTabTitle = "Select iDrawings Users";
                contextObj.inputItems.sortCol = "[User Name]";
                contextObj.countTitle = "iDrawings User(s)";
            }
            if (contextObj.UserCategoryId == 2) {
                resultData["Data"][1].FieldLabel = "Employee Name";
                resultData["Data"][2].FieldLabel = "Employee Code";
                contextObj.tabTitle = "Employees";
                contextObj.selectTabTitle = "Select Employees";
                contextObj.inputItems.sortCol = "[Employee Name]";
                contextObj.countTitle = "Employee(s)";
            }
            if (contextObj.UserCategoryId == 3) {
                resultData["Data"][1].FieldLabel = "Technician Name";
                resultData["Data"][2].FieldLabel = "Trade";
                contextObj.tabTitle = "Technicians";
                contextObj.selectTabTitle = "Select Technicians";
                contextObj.inputItems.sortCol = "[Technician Name]";
                contextObj.countTitle = "Technician(s)";
            }
            if (contextObj.UserCategoryId == 4) {
                resultData["Data"][1].FieldLabel = "Contractor Name";
                resultData["Data"][2].FieldLabel = "Trade";
                contextObj.tabTitle = "Contractors";
                contextObj.selectTabTitle = "Select Contractors";
                contextObj.inputItems.sortCol = "[Contractor Name]";
                contextObj.countTitle = "Contractor(s)";
            }
            contextObj.fields = resultData["Data"];
            contextObj.getUserList();
        });
    };
    iDrawingsUsersComponent.prototype.getUserList = function () {
        var contextObj = this;
        if (this.SiteId == null)
            this.SiteId = 0;
        this.administrationService.getiDrawingsUsersData(this.selectedIds, this.UserCategoryId, this.SiteId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            if (contextObj.totalItems == 0) {
                switch (contextObj.UserCategoryId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("No iDrawings Users added to the selected User Group", 2);
                        break;
                    case 2:
                        contextObj.notificationService.ShowToaster("No Employees added to the selected User Group", 2);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("No Technicians added to the selected User Group", 2);
                        break;
                    case 4:
                        contextObj.notificationService.ShowToaster("No Contractors added to the selected User Group", 2);
                        break;
                }
                contextObj.enableMenu = [0];
            }
            else {
                contextObj.enableMenu = [0, 1];
            }
        });
    };
    iDrawingsUsersComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
        var contextObj = this;
        if (this.selectedTab == 0) {
            if (event[2].children[0].children[1]) {
                event[2].children[0].children[1].style.visibility = "hidden";
                event[2].children[0].children[1].children[1].style.visibility = "hidden";
            }
        }
        else {
            if (event[2].children[0].children[1]) {
                event[2].children[0].children[1].style.visibility = "visible";
                event[2].children[0].children[1].children[1].style.visibility = "visible";
            }
        }
    };
    iDrawingsUsersComponent.prototype.onTabClose = function (event) {
        this.newUserTab = false;
        this.selectedTab = event[0];
    };
    iDrawingsUsersComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.localselection = 1;
                contextObj.newUserTab = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);
                break;
            case 1:
                this.deleteUsers(this.inputItems.selectedIds);
                break;
        }
    };
    iDrawingsUsersComponent.prototype.deleteUsers = function (userIds) {
        if (userIds.length == 1) {
            this.showSlide = !this.showSlide;
            switch (this.UserCategoryId) {
                case 1:
                    this.deleteMsg = "Are you sure you want to delete the selected iDrawings User from the User Group?";
                    break;
                case 2:
                    this.deleteMsg = "Are you sure you want to delete the selected Employee from the User Group?";
                    break;
                case 3:
                    this.deleteMsg = "Are you sure you want to delete the selected Technician from the User Group?";
                    break;
                case 4:
                    this.deleteMsg = "Are you sure you want to delete the selected Contractor from the User Group?";
                    break;
            }
        }
        else if (userIds.length < 1) {
            switch (this.UserCategoryId) {
                case 1:
                    this.notificationService.ShowToaster("Select a User", 2);
                    break;
                case 2:
                    this.notificationService.ShowToaster("Select an Employee", 2);
                    break;
                case 3:
                    this.notificationService.ShowToaster("Select a Technician", 2);
                    break;
                case 4:
                    this.notificationService.ShowToaster("Select a Contractor", 2);
                    break;
            }
        }
        else {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
    };
    iDrawingsUsersComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 406,
            Value: this.UserCategoryId.toString()
        });
        fieldobj.push({
            ReportFieldId: 2807,
            Value: this.selectedIds.toString()
        });
        for (var c = 0; c < this.inputItems.selectedIds.length; c++) {
            fieldobj.push({
                ReportFieldId: 443,
                Value: this.inputItems.selectedIds[c].toString()
            });
        }
        this.showSlide = !this.showSlide;
        var test = JSON.stringify(fieldobj);
        this.administrationService.DeleteUserGroupUsers(JSON.stringify(fieldobj)).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                }
                switch (contextObj.UserCategoryId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("iDrawings User deleted from the selected User Group", 3);
                        break;
                    case 2:
                        contextObj.notificationService.ShowToaster("Employee deleted from the selected User Group", 3);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Technician deleted from the selected User Group", 3);
                        break;
                    case 4:
                        contextObj.notificationService.ShowToaster("Contractor deleted from the selected User Group", 3);
                        break;
                }
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected User(s) in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    iDrawingsUsersComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    iDrawingsUsersComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    iDrawingsUsersComponent.prototype.submitSuccess = function (event) {
        var contextObj = this;
        if (event["status"] == "success") {
            contextObj.getUserList();
            contextObj.selectedTab = 0;
            contextObj.deleteIndex = contextObj.deleteIndex + 1;
            contextObj.newUserTab = false;
        }
    };
    iDrawingsUsersComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getUserList();
    };
    iDrawingsUsersComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.getUserList();
    };
    iDrawingsUsersComponent.prototype.updateiDrawingsUsers = function () {
        this.administrationService.updateiDrawingsUsers(this.itemsSource);
        this.notificationService.ShowToaster("iDrawings User(s) added to the selected User Group", 3);
    };
    iDrawingsUsersComponent = __decorate([
        core_1.Component({
            selector: 'iDrawings-users',
            templateUrl: './app/Views/Administration/User Groups/iDrawings-users.component.html',
            directives: [notify_component_1.Notification, grid_component_1.GridComponent, submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, slide_component_1.SlideComponent, usergroup_newusers_component_1.UserGroupNewUserComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ["selectedIds", "UserCategoryId", "SiteId", "UserGroupName"],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], iDrawingsUsersComponent);
    return iDrawingsUsersComponent;
}());
exports.iDrawingsUsersComponent = iDrawingsUsersComponent;
//# sourceMappingURL=iDrawings-users.component.js.map
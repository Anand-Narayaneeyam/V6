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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var iDrawings_users_component_1 = require('./iDrawings-users.component');
var employees_users_component_1 = require('./employees-users.component');
var technicians_users_component_1 = require('./technicians-users.component');
var contractors_users_component_1 = require('./contractors-users.component');
var logbook_component_1 = require('../../Common/LogBook/logbook.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var user_groups_add_edit_component_1 = require('./user-groups-add-edit.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var UserGroupsComponent = (function () {
    function UserGroupsComponent(administrationService, notificationService, confirmationService, genFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.genFun = genFun;
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
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            },
            {
                "id": 3,
                "title": "Users",
                "image": "Users",
                "path": "Users",
                "subMenu": [
                    {
                        "id": 4,
                        "title": "iDrawings Users",
                        "image": "iDrawings Users",
                        "path": "iDrawings Users",
                        "subMenu": null
                    } //,
                ]
            }
        ];
        this.gridcount = 8;
        this.enableMenu = [0, 2, 3];
        this.selIds = new Array();
        this.totalItems = 30;
        this.itemsPerPage = 10;
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.UserCategory = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.inputItems = { dataKey: "Id", selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC', selectioMode: "single" };
        this.types = true;
    }
    UserGroupsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.administrationService.getUserGroupsFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            contextObj.getUserGroup();
            contextObj.administrationService.CheckIsSiteLevelAdmin(1).subscribe(function (result) {
                contextObj.isSiteAdmin = result == 1 ? true : false;
            });
        });
        this.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
            var accesibleModules = resultData["Data"];
            if (contextObj.menuData[3]["subMenu"] != null) {
                var menu1 = new Array();
                menu1 = contextObj.menuData[3]["subMenu"];
                for (var c = 0; c < accesibleModules.length; c++) {
                    if (accesibleModules[c].ModuleId == 5) {
                        menu1.push({
                            id: 5,
                            title: "Employees",
                            image: "Employees",
                            path: "Employees",
                            subMenu: null
                        });
                    }
                    if (accesibleModules[c].ModuleId == 9) {
                        menu1.push({
                            id: 6,
                            title: "Technicians",
                            image: "Technicians",
                            path: "Technicians",
                            subMenu: null
                        });
                        menu1.push({
                            id: 7,
                            title: "Contractors",
                            image: "Contractors",
                            path: "Contractors",
                            subMenu: null
                        });
                    }
                }
            }
        });
    };
    UserGroupsComponent.prototype.getUserGroup = function () {
        var contextObj = this;
        this.administrationService.getUserGroupsData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            contextObj.changeEnableMenu();
        });
    };
    UserGroupsComponent.prototype.changeEnableMenu = function () {
        var contextObj = this;
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [0];
            contextObj.notificationService.ShowToaster("No User Groups exist", 2);
        }
        else {
            contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7];
        }
    };
    UserGroupsComponent.prototype.onCardSubmit = function (event) {
        console.log("selectedids", this.selIds);
        if (event["dataKeyValue"]) {
            this.notificationService.ShowToaster("User Group updated", 3);
        }
        else {
            this.notificationService.ShowToaster("User Group added", 3);
        }
    };
    UserGroupsComponent.prototype.onSubMenuChange = function (event) {
        if (event.value == 0) {
            this.addClick();
        }
        else if (event.value == 1) {
            this.editClick();
        }
        else if (event.value == 2) {
            this.deleteClick();
        }
        else if (event.value == 4) {
            this.iDrawingsuserClick();
        }
        else if (event.value == 5) {
            this.employeeClick();
        }
        else if (event.value == 6) {
            this.technicianClick();
        }
        else if (event.value == 7) {
            this.contractorClick();
        }
    };
    UserGroupsComponent.prototype.onSort = function (event) {
        var contextObj = this;
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        contextObj.getUserGroup();
    };
    UserGroupsComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getUserGroup();
    };
    UserGroupsComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New User Group";
        this.administrationService.loadUserGroupAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            if (contextObj.isSiteAdmin == true) {
                contextObj.fieldDetailsAdd1[3].IsMandatory = true;
                if (contextObj.fieldDetailsAdd1[3]
                    && contextObj.fieldDetailsAdd1[3].LookupDetails
                    && contextObj.fieldDetailsAdd1[3].LookupDetails.LookupValues
                    && contextObj.fieldDetailsAdd1[3].LookupDetails.LookupValues.length == 1) {
                    contextObj.fieldDetailsAdd1[3].IsEnabled = false;
                }
            }
        });
    };
    UserGroupsComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit User Group";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.administrationService.loadUserGroupAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    if (contextObj.isSiteAdmin == true) {
                        contextObj.fieldDetailsAdd1[3].IsMandatory = true;
                        if (contextObj.fieldDetailsAdd1[3]
                            && contextObj.fieldDetailsAdd1[3].LookupDetails
                            && contextObj.fieldDetailsAdd1[3].LookupDetails.LookupValues
                            && contextObj.fieldDetailsAdd1[3].LookupDetails.LookupValues.length == 1) {
                            contextObj.fieldDetailsAdd1[3].IsEnabled = false;
                        }
                    }
                });
            }
        }
    };
    UserGroupsComponent.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Service?", "Yes");
            this.administrationService.checkUserGroupInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.deleteMessage = "Selected User Group is in use. Are you sure you want to delete the selected User Group?";
                    contextObj.showSlide = !contextObj.showSlide;
                }
                else {
                    contextObj.deleteMessage = "Are you sure you want to delete the selected User Group?";
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    };
    UserGroupsComponent.prototype.iDrawingsuserClick = function () {
        this.pageTitle = "iDrawings Users";
        this.UserCategory = 1;
        this.action = "User";
        this.SiteId = this.inputItems.rowData["SiteId"];
        this.UserGroupName = this.inputItems.rowData["User Group Name"];
        this.splitviewInput.showSecondaryView = true;
    };
    UserGroupsComponent.prototype.employeeClick = function () {
        this.pageTitle = "Employees";
        this.UserCategory = 2;
        this.action = "User";
        this.SiteId = this.inputItems.rowData["SiteId"];
        this.UserGroupName = this.inputItems.rowData["User Group Name"];
        this.splitviewInput.showSecondaryView = true;
    };
    UserGroupsComponent.prototype.technicianClick = function () {
        this.pageTitle = "Technicians";
        this.UserCategory = 3;
        this.action = "User";
        this.SiteId = this.inputItems.rowData["SiteId"];
        this.UserGroupName = this.inputItems.rowData["User Group Name"];
        this.splitviewInput.showSecondaryView = true;
    };
    UserGroupsComponent.prototype.contractorClick = function () {
        this.pageTitle = "Contractors";
        this.UserCategory = 4;
        this.action = "User";
        this.SiteId = this.inputItems.rowData["SiteId"];
        this.UserGroupName = this.inputItems.rowData["User Group Name"];
        this.splitviewInput.showSecondaryView = true;
    };
    UserGroupsComponent.prototype.okDelete = function (event) {
        this.deleteUserGroup();
        this.showSlide = !this.showSlide;
    };
    UserGroupsComponent.prototype.deleteUserGroup = function () {
        var contextObj = this;
        this.administrationService.DeleteUserGroup(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.genFun.updateDataSource(contextObj.sourceData, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.sourceData = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected User Group deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected User Group in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    UserGroupsComponent.prototype.onDelete = function (e) {
        this.deleteClick();
    };
    UserGroupsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = false;
    };
    UserGroupsComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.genFun.updateDataSource(contextObj.sourceData, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.sourceData = retUpdatedSrc["itemSrc"];
            contextObj.changeEnableMenu();
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.genFun.updateDataSource(contextObj.sourceData, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = false;
    };
    UserGroupsComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    UserGroupsComponent = __decorate([
        core_1.Component({
            selector: 'user-groups',
            templateUrl: './app/Views/Administration/User Groups/user-groups.component.html',
            directives: [logbook_component_1.LogbookComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, sort_component_1.Sorting, list_component_1.ListComponent, card_component_1.CardComponent, field_component_1.FieldComponent, notify_component_1.Notification, confirm_component_1.ConfirmationComponent, paging_component_1.PagingComponent, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, section_component_1.SectionComponent, iDrawings_users_component_1.iDrawingsUsersComponent, employees_users_component_1.EmployeeUsersComponent, technicians_users_component_1.TechniciansUsersComponent, contractors_users_component_1.ContractorsUsersComponent, user_groups_add_edit_component_1.UserGroupAddEditComponent, slide_component_1.SlideComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions])
    ], UserGroupsComponent);
    return UserGroupsComponent;
}());
exports.UserGroupsComponent = UserGroupsComponent;
//# sourceMappingURL=user-groups.component.js.map
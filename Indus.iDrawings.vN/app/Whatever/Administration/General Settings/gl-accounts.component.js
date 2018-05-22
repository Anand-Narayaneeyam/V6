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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var GLAccountsComponent = (function () {
    function GLAccountsComponent(administrationServices, notificationService, generFun) {
        this.administrationServices = administrationServices;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
        this.target = 0;
        this.enableMenu = [0];
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "subMenu": null,
                "privilegeId": 3263
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "subMenu": null,
                "privilegeId": 3264
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "subMenu": null,
                "privilegeId": 3265
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    GLAccountsComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 736, contextObj.administrationServices, contextObj.menuData.length);
        var contextObj = this;
        this.administrationServices.getGLAccountsListFields().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
        this.LoadGrid();
    };
    GLAccountsComponent.prototype.LoadGrid = function () {
        var contextObj = this;
        this.administrationServices.getGLAccountsListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, 0).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 1, 2,];
            }
            else {
                contextObj.notificationService.ShowToaster("No GL Accounts exist", 2);
                contextObj.enableMenu = [0];
                contextObj.itemsSource = [];
            }
        });
    };
    GLAccountsComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.target = 1;
                this.addClick();
                break;
            case 1:
                contextObj.target = 1;
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
        }
    };
    GLAccountsComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.administrationServices.getGLAccountsListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, 0).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
        });
    };
    GLAccountsComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.administrationServices.getGLAccountsListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, 0).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
        });
    };
    GLAccountsComponent.prototype.addClick = function () {
        this.action = "add";
        this.pageTitle = "New GL Account";
        this.btnName = "Save";
        var contextObj = this;
        this.administrationServices.getGLAccountsAddEdit(1, 0).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    GLAccountsComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit GL Account";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.administrationServices.getGLAccountsAddEdit(2, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    contextObj.fieldDetailsAddEdit = resultData["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    GLAccountsComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    GLAccountsComponent.prototype.deleteProcedure = function () {
        var contextObj = this;
        contextObj.administrationServices.GLAccountsdelete(contextObj.inputItems.rowData["Id"]).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (resultData["Data"].ServerId == 0) {
                        contextObj.notificationService.ShowToaster("Selected GL Account deleted", 3);
                        contextObj.LoadGrid();
                    }
            }
        });
    };
    GLAccountsComponent.prototype.okDelete = function (event) {
        this.deleteProcedure();
        this.showSlide = !this.showSlide;
    };
    GLAccountsComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    GLAccountsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    GLAccountsComponent.prototype.onSubmit = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], "add");
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], "edit");
                break;
        }
    };
    GLAccountsComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var arr = new Array();
        arr = JSON.parse(strsubmitField);
        if (target == "add") {
            contextObj.administrationServices.GLAccountsSubmit(JSON.stringify(arr), target, 0).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == "add") {
                            contextObj.notificationService.ShowToaster("GL Account added", 3);
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            contextObj.LoadGrid();
                        }
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("GL Account code already exists", 5);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            contextObj.notificationService.ShowToaster("GL Account name already exists", 5);
                        }
                }
            });
        }
        else if (target == "edit") {
            contextObj.administrationServices.GLAccountsSubmit(JSON.stringify(arr), target, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == "edit") {
                            contextObj.notificationService.ShowToaster("GL Account details updated", 3);
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            contextObj.LoadGrid();
                        }
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("GL Account code already exists", 5);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            contextObj.notificationService.ShowToaster("GL Account name already exists", 5);
                        }
                }
            });
        }
    };
    GLAccountsComponent = __decorate([
        core_1.Component({
            selector: 'gl-accounts',
            templateUrl: './app/Views/Administration/General Settings/gl-accounts.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, labelcomponent_component_1.LabelComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], GLAccountsComponent);
    return GLAccountsComponent;
}());
exports.GLAccountsComponent = GLAccountsComponent;
//# sourceMappingURL=gl-accounts.component.js.map
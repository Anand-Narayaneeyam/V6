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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var customer_addedit_1 = require('./customer-addedit');
var assign_drawingcategories_1 = require('./assign-drawingcategories');
var allowed_file_types_1 = require('./allowed-file-types');
var user_licensing_setup_1 = require('./user-licensing-setup');
var CustomerListComponent = (function () {
    function CustomerListComponent(administrationService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.pagePath = "Administration / Customers";
        this.inputItems = { dataKey: "CustomerId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.enableMenu = [];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 3223
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 3224
            },
            {
                "id": 3,
                "title": "Setup",
                "image": "Settings",
                "path": "Settings",
                "subMenu": [
                    {
                        "id": 4,
                        "title": "Drawing Categories",
                        "image": "Drawing Categories",
                        "path": "Drawing Categories",
                        "subMenu": null,
                        "privilegeId": null
                    },
                    {
                        "id": 5,
                        "title": "Allowed File Types",
                        "image": "Allowed File Types",
                        "path": "Allowed File Types",
                        "subMenu": null,
                        "privilegeId": null
                    },
                    {
                        "id": 6,
                        "title": "User Licensing Setup",
                        "image": "User Licensing Setup",
                        "path": "User Licensing Setup",
                        "subMenu": null,
                        "privilegeId": 996
                    }
                ]
            },
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    CustomerListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.administrationService.getCustomerListFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad();
        });
    };
    CustomerListComponent.prototype.dataLoad = function () {
        var contextObj = this;
        contextObj.administrationService.getCustomerData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Customers exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    };
    CustomerListComponent.prototype.onSubMenuChange = function (event) {
        this.action = "";
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 4:
                this.action = "";
                this.assignDwgCategoryClick();
                break;
            case 5:
                this.fileTypesClick();
                break;
            case 6:
                this.action = "";
                this.licenseSetupClick();
                break;
        }
    };
    CustomerListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    ;
    CustomerListComponent.prototype.onSort = function (objGrid) {
        this.dataLoad();
    };
    CustomerListComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Customer";
        this.administrationService.loadCustomerAddEditFields(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetails = resultData["Data"];
            for (var i = 0; i < contextObj.fieldDetails.length; i++) {
                if (contextObj.fieldDetails[i].ReportFieldId == 113) {
                    contextObj.fieldDetails[i].FieldLabel = "Organization Name";
                }
                else if (contextObj.fieldDetails[i].ReportFieldId == 114) {
                    contextObj.fieldDetails[i].FieldLabel = "Folder Name";
                }
                else if (contextObj.fieldDetails[i].ReportFieldId == 116) {
                    contextObj.fieldDetails[i].FieldLabel = "Account Expiry Date";
                    var d = new Date();
                    d.setFullYear(d.getFullYear() + 1);
                    contextObj.fieldDetails[i].FieldValue = d.toDateString();
                }
                else if (contextObj.fieldDetails[i].ReportFieldId == 119) {
                    contextObj.fieldDetails[i].FieldLabel = "Max. Sites";
                }
                else if (contextObj.fieldDetails[i].ReportFieldId == 120) {
                    contextObj.fieldDetails[i].FieldLabel = "Max. Buildings per Site";
                }
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    CustomerListComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Customer";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Customer", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.administrationService.loadCustomerAddEditFields(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetails = result["Data"];
                    for (var i = 0; i < contextObj.fieldDetails.length; i++) {
                        if (contextObj.fieldDetails[i].ReportFieldId == 113) {
                            contextObj.fieldDetails[i].FieldLabel = "Organization Name";
                        }
                        else if (contextObj.fieldDetails[i].ReportFieldId == 114) {
                            contextObj.fieldDetails[i].FieldLabel = "Folder Name";
                            contextObj.fieldDetails[i].IsEnabled = false;
                        }
                        else if (contextObj.fieldDetails[i].ReportFieldId == 116) {
                            contextObj.fieldDetails[i].FieldLabel = "Account Expiry Date";
                        }
                        else if (contextObj.fieldDetails[i].ReportFieldId == 119) {
                            contextObj.fieldDetails[i].FieldLabel = "Max. Sites";
                        }
                        else if (contextObj.fieldDetails[i].ReportFieldId == 120) {
                            contextObj.fieldDetails[i].FieldLabel = "Max. Buildings per Site";
                        }
                    }
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    CustomerListComponent.prototype.assignDwgCategoryClick = function () {
        this.action = "assigndwgcategory";
        this.btnName = "Save Changes";
        this.pageTitle = "Assign Drawing Category";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Customer", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            this.administrationService.getAssignDrawingCategoryFields().subscribe(function (result) {
                contextObj.fieldDetails = result["Data"];
                for (var i = 0; i < contextObj.fieldDetails.length; i++) {
                    if (contextObj.fieldDetails[i].ReportFieldId == 112) {
                        contextObj.ddlOrgName = contextObj.fieldDetails[i];
                        contextObj.ddlOrgName.FieldLabel = "Organization Name";
                        contextObj.ddlOrgName.FieldValue = contextObj.inputItems.selectedIds[0].toString();
                        contextObj.ddlOrgName.IsEnabled = false;
                        contextObj.ddlOrgName.IsMandatory = false;
                    }
                    if (contextObj.fieldDetails[i].ReportFieldId == 271) {
                        contextObj.ddlModule = contextObj.fieldDetails[i];
                    }
                }
                var removeArr = [112, 271];
                contextObj.fieldDetails = contextObj.fieldDetails.filter(function (item) {
                    return removeArr.indexOf(item.ReportFieldId) == -1;
                });
                if (contextObj.ddlModule.LookupDetails.LookupValues == "") {
                    contextObj.notificationService.ShowToaster("No Modules exist", 2);
                }
                else
                    contextObj.ddlModule.FieldValue = -1;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    CustomerListComponent.prototype.fileTypesClick = function () {
        this.action = "allowedfiletypes";
        this.btnName = "Save Changes";
        this.pageTitle = "Allowed File Types";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Customer", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
    };
    CustomerListComponent.prototype.licenseSetupClick = function () {
        this.action = "licensesetup";
        this.btnName = "Save Changes";
        this.pageTitle = "User Licensing Setup";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Customer", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
    };
    CustomerListComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    CustomerListComponent = __decorate([
        core_1.Component({
            selector: 'customer-list',
            templateUrl: './app/Views/Administration/Customers/customers.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, page_component_1.PageComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification,
                customer_addedit_1.CustomerAddEditComponent, assign_drawingcategories_1.AssignDrawingCategoryComponent, allowed_file_types_1.AllowedFileTypesComponent, user_licensing_setup_1.UserLicencingSetupComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], CustomerListComponent);
    return CustomerListComponent;
}());
exports.CustomerListComponent = CustomerListComponent;
//# sourceMappingURL=customers.component.js.map
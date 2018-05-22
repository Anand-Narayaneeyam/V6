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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
//importing addedit component
var contractors_addedit_component_1 = require('./contractors-addedit.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var ContractorsListComponent = (function () {
    function ContractorsListComponent(workOrdereService, AdministrationService, notificationService, generFun) {
        this.workOrdereService = workOrdereService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Contractor Name]", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
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
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 3225
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.isSiteAdmin = false;
    }
    ContractorsListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.workOrdereService.getContractorsField().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
        contextObj.AdministrationService.CheckIsSiteLevelAdmin(9).subscribe(function (result) {
            contextObj.isSiteAdmin = result == 1 ? true : false;
        });
    };
    ContractorsListComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.workOrdereService.getContractorsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Contractors exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 735, contextObj.AdministrationService, contextObj.menuData.length);
    };
    ContractorsListComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
        }
    };
    ContractorsListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ;
    ContractorsListComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    ContractorsListComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Contractor";
        this.workOrdereService.loadContractorsAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            if (contextObj.isSiteAdmin) {
                contextObj.fieldDetailsAdd1.find(function (el) {
                    if (el.FieldId == 1033) {
                        el.IsMandatory = true;
                        return true;
                    }
                    else
                        return false;
                });
            }
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    ContractorsListComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Contractor";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Contractor", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrdereService.loadContractorsAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    if (contextObj.isSiteAdmin) {
                        contextObj.fieldDetailsAdd1.find(function (el) {
                            if (el.FieldId == 1033) {
                                el.IsMandatory = true;
                                return true;
                            }
                            else
                                return false;
                        });
                    }
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    ContractorsListComponent.prototype.deleteClick = function () {
        var contextObj = this;
        debugger;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Contractor", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            this.workOrdereService.checkContractorIsInUse(this.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
                if (returnCheck["Data"] == -1)
                    contextObj.notificationService.ShowToaster("Selected Contractor in use, cannot be deleted", 5);
                else
                    contextObj.showSlide = !contextObj.showSlide;
            });
        }
    };
    ContractorsListComponent.prototype.inlineAdd = function (event) {
        var contextObj = this;
        var contextObj = this;
        contextObj.workOrdereService.InlineAddUpdateContractors(event, contextObj.inputItems.selectedIds[0], 1).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Contractor added", 3);
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Contractor already exists", 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj.notificationService.ShowToaster("Invalid Email Domain", 5);
                    }
                    break;
            }
        });
    };
    ContractorsListComponent.prototype.inlineEdit = function (event) {
        var contextObj = this;
        contextObj.workOrdereService.InlineAddUpdateContractors(event, contextObj.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Contractor details updated", 3);
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Contractor already exists", 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj.notificationService.ShowToaster("Invalid Email Domain", 5);
                    }
                    break;
            }
        });
    };
    ContractorsListComponent.prototype.inlineDelete = function (event) {
        this.deleteContacts();
    };
    ContractorsListComponent.prototype.submitReturn = function (event) {
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
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ContractorsListComponent.prototype.deleteContacts = function () {
        var contextObj = this;
        contextObj.workOrdereService.deleteContractors(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Contractor deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Contractor in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    //slide events/////
    ContractorsListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteContacts();
    };
    ContractorsListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ContractorsListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ContractorsListComponent = __decorate([
        core_1.Component({
            selector: 'contractors-list',
            templateUrl: './app/Views/WorkOrder/GeneralSettings/contractors-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, contractors_addedit_component_1.ContractorsAddEditComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ContractorsListComponent);
    return ContractorsListComponent;
}());
exports.ContractorsListComponent = ContractorsListComponent;
//# sourceMappingURL=contractors-list.component.js.map
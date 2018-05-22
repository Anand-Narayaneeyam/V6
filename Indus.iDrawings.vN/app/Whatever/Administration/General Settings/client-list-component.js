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
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
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
var client_addedit_component_1 = require('./client-addedit-component');
var ClientsListComponent = (function () {
    function ClientsListComponent(realPropertyService, notificationService, generFun, administrationService) {
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.pageTitle = "New Client";
        this.enableMenu = [];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    ClientsListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.administrationService.getClientColumns().subscribe(function (result) {
            result["Data"].find(function (item) {
                if (item.FieldId == 880) {
                    item.FieldLabel = "Client";
                }
            });
            result["Data"].find(function (item) {
                if (item.FieldId == 3003) {
                    item.IsEnabled = false;
                    item.IsVisible = false;
                }
            });
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
    };
    ClientsListComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.administrationService.getClienttData("0", "0", contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Clients exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    };
    ClientsListComponent.prototype.onSubMenuChange = function (event) {
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
    ClientsListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ;
    ClientsListComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    ClientsListComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Client";
        this.administrationService.loadClientAddEdit(0, 1, "0").subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (item.FieldId == 880) {
                    item.FieldLabel = "Client Name";
                    return item;
                }
            });
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    ClientsListComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Client";
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Client", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.administrationService.loadClientAddEdit(this.inputItems.selectedIds[0], 2, "0").subscribe(function (result) {
                result["Data"].find(function (item) {
                    if (item.FieldId == 880) {
                        item.FieldLabel = "Client Name";
                        return item;
                    }
                });
                contextObj.fieldDetailsAdd1 = result["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    ClientsListComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Client", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            var contextObj = this;
            var reportFieldIdArray = [{ ReportFieldId: 173, Value: 769 }];
            contextObj.realPropertyService.isClientInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Client in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    };
    ClientsListComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ClientsListComponent.prototype.deleteClient = function () {
        var contextObj = this;
        contextObj.administrationService.deleteClient(contextObj.inputItems.selectedIds[0], "0").subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Client deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Client in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    //slide events/////
    ClientsListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteClient();
    };
    ClientsListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ClientsListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ClientsListComponent = __decorate([
        core_1.Component({
            selector: 'client-list',
            templateUrl: './app/Views/Administration/General Settings/client-list-component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, client_addedit_component_1.ClientAddEditComponent],
            providers: [realproperty_service_1.RealPropertyService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], ClientsListComponent);
    return ClientsListComponent;
}());
exports.ClientsListComponent = ClientsListComponent;
//# sourceMappingURL=client-list-component.js.map
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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
//importing addedit component
var technicians_addedit_component_1 = require('./technicians-addedit.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var TechniciansListComponent = (function () {
    function TechniciansListComponent(notificationService, AdministrationService, generFun, workOrdereService) {
        this.notificationService = notificationService;
        this.AdministrationService = AdministrationService;
        this.generFun = generFun;
        this.workOrdereService = workOrdereService;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.enableMenu = [];
        this.message = "Are you sure you want to delete the selected Technician?";
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": 3213
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": 3214
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": 3215
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.isSiteAdmin = false;
    }
    TechniciansListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        var contextObj = this;
        var rptField = [4148, 5386, 8338];
        var count = rptField.length;
        contextObj.AdministrationService.CheckIsSiteLevelAdmin(9).subscribe(function (result) {
            contextObj.isSiteAdmin = result == 1 ? true : false;
        });
        this.workOrdereService.getTechniciansColumns().subscribe(function (result) {
            result["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    item.Width = "*";
                    count--;
                    if (count == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            });
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
    };
    TechniciansListComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.workOrdereService.getTechniciansData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Technicians exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 701, contextObj.AdministrationService, contextObj.menuData.length);
    };
    TechniciansListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ;
    TechniciansListComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    TechniciansListComponent.prototype.onSubMenuChange = function (event) {
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
    TechniciansListComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Technician";
        this.workOrdereService.loadTechnicianAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            if (contextObj.isSiteAdmin) {
                contextObj.fieldDetailsAdd1.find(function (el) {
                    if (el.FieldId == 1068) {
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
    TechniciansListComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Technician";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Technician", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.workOrdereService.loadTechnicianAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
                if (contextObj.isSiteAdmin) {
                    contextObj.fieldDetailsAdd1.find(function (el) {
                        if (el.FieldId == 1068) {
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
    };
    TechniciansListComponent.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Technician", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.workOrdereService.checkTechniciansIsInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Technician in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    };
    TechniciansListComponent.prototype.deleteTechnicians = function () {
        var contextObj = this;
        contextObj.workOrdereService.deleteTechnicians(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Technician deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Selected Technicians in use, cannot be deleted", 5);
                        break;
                }
            }
        });
    };
    TechniciansListComponent.prototype.inlineDelete = function (event) {
        this.deleteTechnicians();
    };
    TechniciansListComponent.prototype.submitReturn = function (event) {
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
    //slide events/////
    TechniciansListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteTechnicians();
    };
    TechniciansListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    TechniciansListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    TechniciansListComponent = __decorate([
        core_1.Component({
            selector: 'technicians-list',
            templateUrl: './app/Views/WorkOrder/GeneralSettings/technicians-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, technicians_addedit_component_1.TechniciansAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, workorder_service_1.WorkOrdereService, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions, workorder_service_1.WorkOrdereService])
    ], TechniciansListComponent);
    return TechniciansListComponent;
}());
exports.TechniciansListComponent = TechniciansListComponent;
//# sourceMappingURL=technicians-list.component.js.map
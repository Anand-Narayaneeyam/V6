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
var workorder_service_1 = require('../../../../Models/WorkOrder/workorder.service');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../../Models/Common/General');
var administration_service_1 = require('../../../../Models/Administration/administration.service');
var chargeback_addedit_1 = require('./chargeback-addedit');
var ChargebackListComponent = (function () {
    function ChargebackListComponent(workOrdereService, AdministrationService, notificationService, generFun) {
        this.workOrdereService = workOrdereService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "ChargeBackId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
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
                "privilegeId": 3496
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 3496
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 3497
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    ChargebackListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.workOrdereService.getChargebackListFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad();
        });
    };
    ChargebackListComponent.prototype.dataLoad = function () {
        var contextObj = this;
        this.workOrdereService.getCustomerSubscribedFeatures("74").subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"] == true) {
                if (result["Data"][0]["FeatureLookupId"] == "17") {
                    contextObj.chargeBackType = 0;
                }
                else if (result["Data"][0]["FeatureLookupId"] == "18") {
                    contextObj.chargeBackType = 1;
                }
            }
            contextObj.reportfieldIdValues = new Array();
            contextObj.reportfieldIdValues.push({ ReportFieldId: 1424, Value: contextObj.workOrderId.toString() });
            contextObj.reportfieldIdValues.push({ ReportFieldId: 1425, Value: contextObj.chargeBackType.toString() });
            contextObj.workOrdereService.getChargebackData(JSON.stringify(contextObj.reportfieldIdValues), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                contextObj.totalItems = result["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                else {
                    contextObj.notificationService.ShowToaster("No Chargebacks exist", 2);
                    contextObj.enableMenu = [1];
                }
            });
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 731, contextObj.AdministrationService, contextObj.menuData.length);
    };
    ChargebackListComponent.prototype.onSubMenuChange = function (event) {
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
    ChargebackListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    ;
    ChargebackListComponent.prototype.onSort = function (objGrid) {
        this.dataLoad();
    };
    ChargebackListComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Chargeback";
        this.workOrdereService.getWorkorderDetails(this.workOrderId).subscribe(function (resultData) {
            contextObj.remainingChargebackPer = (JSON.parse(resultData))[0]["Remaining ChargeBack Percentage"];
            if (contextObj.remainingChargebackPer == 0)
                contextObj.notificationService.ShowToaster("Total Chargeback is already 100 percent, new Chargeback cannot be added ", 2);
            else {
                contextObj.workOrdereService.loadChargebackAddEditFields("", 0, 1).subscribe(function (result) {
                    result["Data"].find(function (item) {
                        if (item.ReportFieldId == 1426) {
                            item.FieldValue = contextObj.remainingChargebackPer;
                        }
                        else
                            return false;
                    });
                    contextObj.loadChargebackLookups(contextObj, result["Data"]);
                });
            }
        });
    };
    ChargebackListComponent.prototype.loadChargebackLookups = function (contextObj, data) {
        contextObj.workOrdereService.loadChargebackLookups(contextObj.chargeBackType).subscribe(function (resultData) {
            data.find(function (item) {
                if (item.ReportFieldId == 1427) {
                    item.LookupDetails.LookupValues = JSON.parse(resultData);
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
                else
                    return false;
            });
        });
        contextObj.fieldDetailsAddEdit = data;
    };
    ChargebackListComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Chargeback";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Chargeback", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrdereService.loadChargebackAddEditFields(JSON.stringify(contextObj.reportfieldIdValues), this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.loadChargebackLookups(contextObj, result["Data"]);
                });
            }
        }
    };
    ChargebackListComponent.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Chargeback", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            contextObj.showSlide = !contextObj.showSlide;
        }
    };
    ChargebackListComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["ChargeBackId"] == contextObj.inputItems.selectedIds[0]) {
                    contextObj.itemsSource[i] = JSON.parse(event["returnData"])[0];
                }
            }
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ChargebackListComponent.prototype.deleteChargeback = function () {
        var contextObj = this;
        contextObj.workOrdereService.deleteChargeback(JSON.stringify(contextObj.reportfieldIdValues), contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Chargeback deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Chargeback in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    ChargebackListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteChargeback();
    };
    ChargebackListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ChargebackListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ChargebackListComponent = __decorate([
        core_1.Component({
            selector: 'chargeback-list',
            templateUrl: './app/Views/WorkOrder/Review/Manage Chargeback/chargeback-list.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, chargeback_addedit_1.ChargebackAddEditComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ["workOrderId"]
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ChargebackListComponent);
    return ChargebackListComponent;
}());
exports.ChargebackListComponent = ChargebackListComponent;
//# sourceMappingURL=chargeback-list.js.map
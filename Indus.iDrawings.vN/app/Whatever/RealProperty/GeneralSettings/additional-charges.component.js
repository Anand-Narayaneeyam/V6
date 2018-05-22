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
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var additional_charge_addedit_component_1 = require('./additional-charge-addedit.component');
var General_1 = require('../../../Models/Common/General');
var Additionalcharges = (function () {
    function Additionalcharges(RealPropertyService, notificationService, getData, generFun) {
        this.RealPropertyService = RealPropertyService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.generFun = generFun;
        this.totalItems = 0;
        this.types = false;
        this.pageIndex = 0;
        this.itemsPerPage = 30;
        this.success = "";
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', selectioMode: 'single', sortDir: 'ASC' };
        this.submitSuccess = [];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
            },
        ];
        this.gridcount = 0;
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.enableMenu = [];
        this.selIds = new Array();
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    }
    Additionalcharges.prototype.ngOnInit = function () {
        var contextObj = this;
        this.RealPropertyService.getAdditionalChargesFields().subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.fields = resultData["Data"];
                contextObj.getAdditionalCharges();
            }
        });
    };
    Additionalcharges.prototype.changeEnableMenu = function () {
        var contextObj = this;
        contextObj.enableMenu = [1];
        if (contextObj.totalItems == 0) {
            contextObj.notificationService.ShowToaster("No Additional Charges exist", 2);
        }
    };
    Additionalcharges.prototype.getAdditionalCharges = function () {
        var contextObj = this;
        this.RealPropertyService.getAdditionalChargesData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"] == "") {
                    resultData["Data"] = null;
                }
                else {
                    contextObj.additionalchargesSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                }
                contextObj.changeEnableMenu();
            }
        });
    };
    Additionalcharges.prototype.onCardSubmit = function (event) {
        var contextObj = this;
        var fieldDetails = event.fieldObject;
        var arr = new Array();
        arr = JSON.parse(fieldDetails);
        if (arr[2].Value == "NaN")
            arr[2].Value = "0";
        var NewfieldDetails = JSON.stringify(arr);
        if (event["dataKeyValue"]) {
            this.RealPropertyService.postEditAdditionalChargesDetails(NewfieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.notificationService.ShowToaster("Additional Charge updated", 3);
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                        contextObj.getAdditionalCharges();
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Additional Charge Name already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "945" });
                    }
                    contextObj.changeEnableMenu();
                }
            });
        }
        else {
            this.RealPropertyService.postAddAdditionalChargesDetails(NewfieldDetails).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.notificationService.ShowToaster("Additional Charge added", 3);
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                        contextObj.getAdditionalCharges();
                    }
                    else {
                        //contextObj.additionalchargesSource.splice(contextObj.additionalchargesSource.length - 1, 1);
                        contextObj.notificationService.ShowToaster("Additional Charge Name already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "945" });
                    }
                    contextObj.changeEnableMenu();
                }
            });
        }
    };
    Additionalcharges.prototype.OnSuccessfulSubmit = function (event) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        var retUpdatedSrc;
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(this.additionalchargesSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.additionalchargesSource = retUpdatedSrc["itemSrc"];
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.generFun.updateDataSource(this.additionalchargesSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            if (retUpdatedSrc["itemSrc"]["0"]["Validated"] == "True")
                contextObj.enableMenu = [1, 2, 3];
            else
                contextObj.enableMenu = [0, 1, 2];
        }
        //this.itemsSource = retUpdatedSrc["itemSrc"];
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.getAdditionalCharges();
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    Additionalcharges.prototype.onCardCancel = function (event) {
        this.changeEnableMenu();
    };
    Additionalcharges.prototype.onSubMenuChange = function (event, Id) {
        this.menuClickValue = event.value;
        if (event.value == 1) {
            this.pageTitle = "New Additional Charge";
            this.onMenuAddClick();
        }
        if (event.value == 2) {
            this.pageTitle = "Edit Additional Charge";
            this.onMenuEditclick();
            ;
        }
        else if (event.value == 3) {
            this.onMenuDeleteClick();
        }
    };
    Additionalcharges.prototype.onDelete = function (e) {
        this.onMenuDeleteClick();
    };
    Additionalcharges.prototype.onMenuAddClick = function () {
        this.action = "add";
        this.btnName = "Save";
        var contextObj = this;
        this.RealPropertyService.loadAdditionalChargeAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.AdditionalChargeAddEdit = (resultData["Data"]);
            contextObj.AdditionalChargeAddEdit[4].IsVisible = false;
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    Additionalcharges.prototype.onMenuEditclick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        this.RealPropertyService.loadAdditionalChargeAddEdit(contextObj.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
            contextObj.AdditionalChargeAddEdit = (resultData["Data"]);
            contextObj.AdditionalChargeAddEdit[4].IsVisible = false;
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    Additionalcharges.prototype.onMenuDeleteClick = function () {
        var contextObj = this;
        var Isinuse;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            this.RealPropertyService.isAdditionalChargeInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                Isinuse = resultData["Data"];
                if (Isinuse == 0)
                    contextObj.showSlide = !contextObj.showSlide;
                else
                    contextObj.notificationService.ShowToaster("Selected Additional Charge is in use, cannot be deleted", 5);
            });
        }
    };
    Additionalcharges.prototype.okDelete = function (event) {
        this.deleteCatering();
        this.showSlide = !this.showSlide;
    };
    Additionalcharges.prototype.deleteCatering = function () {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.RealPropertyService.postDeleteAdditionalChargesDetails(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.additionalchargesSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.additionalchargesSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    //contextObj.totalItems = contextObj.totalItems - 1;
                    //for (var count = 0; count < contextObj.selIds.length; count++) {
                    //    var index = contextObj.additionalchargesSource.indexOf(contextObj.additionalchargesSource.filter(x => x["Id"] == contextObj.selIds[count])[0]);
                    //    if (index > -1)
                    //        contextObj.additionalchargesSource.splice(index, 1);
                    //}
                    contextObj.notificationService.ShowToaster("Selected Additional Charge deleted", 3);
                    //contextObj.totalItems = contextObj.totalItems - 1;
                    if (contextObj.totalItems == 0) {
                        contextObj.enableMenu = [1];
                    }
                }
                else {
                    contextObj.notificationService.ShowToaster("Selected Additional Charge is in use, cannot be deleted", 5);
                }
            }
        });
        //}
    };
    Additionalcharges.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    Additionalcharges.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    Additionalcharges.prototype.onSorting = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.selectedField;
        this.inputItems.sortDir = objGrid.sortDirection;
        contextObj.getAdditionalCharges();
    };
    Additionalcharges.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getAdditionalCharges();
    };
    Additionalcharges = __decorate([
        core_1.Component({
            selector: 'additionalcharges',
            templateUrl: './app/Views/RealProperty/GeneralSettings/additional-charges.component.html',
            directives: [list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, slide_component_1.SlideComponent, grid_component_1.GridComponent, additional_charge_addedit_component_1.AdditinalchargeAddEdit, split_view_component_1.SplitViewComponent],
            providers: [http_1.HTTP_PROVIDERS, realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions, General_1.GeneralFunctions])
    ], Additionalcharges);
    return Additionalcharges;
}());
exports.Additionalcharges = Additionalcharges;
//# sourceMappingURL=additional-charges.component.js.map
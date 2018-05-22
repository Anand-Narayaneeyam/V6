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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var additional_charge_rates_addedit_component_1 = require('./additional-charge-rates-addedit.component');
var AdditionalChargeRates = (function () {
    function AdditionalChargeRates(notificationService, AdministrationService, getData, realPropertyService, generFun) {
        this.notificationService = notificationService;
        this.AdministrationService = AdministrationService;
        this.getData = getData;
        this.realPropertyService = realPropertyService;
        this.generFun = generFun;
        this.inputItems = {
            dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.enableMenu = [];
        this.selectedAdditionalChargeId = 0;
        this.types = true;
        this.fromToCheckFlag = false;
        this.message = "Are you sure you want to delete the selected Additional Charge Rate?";
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
                "path": "Edit"
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            },
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 280;
        this.cardButtonPrivilege = [false, false];
    }
    AdditionalChargeRates.prototype.ngOnInit = function () {
        var contextObj = this;
        this.realPropertyService.getAdditionalChargeRatesDataField().subscribe(function (resultData) {
            var updatedData = new Array(); /*To notify the watcher about the change*/
            contextObj.ddlAdditionalCharge = resultData["Data"].splice(0, 1)[0];
            updatedData = updatedData.concat(resultData["Data"]);
            contextObj.fieldObject = updatedData;
            contextObj.enableMenu = [];
        });
    };
    AdditionalChargeRates.prototype.onChnageAdditionalCharge = function (event) {
        this.ddlChangeFlag = Number(event);
        var contextObj = this;
        if (Number(event) != -1) {
            this.selectedAdditionalChargeId = Number(event);
            this.getAddlDataFieldCategory(event);
        }
        else if (Number(event) < 0 && Number(event) == -1) {
            this.enableMenu = [];
            contextObj.itemsSource = [];
            this.selectedAdditionalChargeId = 0;
        }
        else {
            this.enableMenu = [];
            contextObj.itemsSource = [];
            this.selectedAdditionalChargeId = 0;
        }
    };
    AdditionalChargeRates.prototype.getAddlDataFieldCategory = function (event) {
        var contextObj = this;
        console.log("Data Field", event);
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 5705,
            Value: event
        });
        this.realPropertyService.getAdditionalChargeRatesFieldData(fieldobj, 0, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            //contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [1];
                contextObj.notificationService.ShowToaster("No Additional Charge Rates exist", 2);
            }
            else {
                contextObj.enableMenu = [1, 2, 3];
            }
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    AdditionalChargeRates.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.getAddlDataFieldCategory(this.selectedAdditionalChargeId);
    };
    ;
    AdditionalChargeRates.prototype.onSort = function (objGrid) {
        this.getAddlDataFieldCategory(this.selectedAdditionalChargeId);
    };
    AdditionalChargeRates.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                if (this.totalItems > 0) {
                    contextObj.realPropertyService.getAdditionalChargeTORateHighValueFuctn(Number(contextObj.selectedAdditionalChargeId)).subscribe(function (result) {
                        var fromDateMaxValue = JSON.parse(result.Data.FieldBinderData)[0].MaxOfEndValue;
                        if (fromDateMaxValue == 0) {
                            contextObj.notificationService.ShowToaster("The Amount To of previous Additional Charge Rate is not entered", 2);
                            return;
                        }
                        else {
                            //  var totalItemsData = JSON.parse(contextObj.itemsSource);
                            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                                if (contextObj.itemsSource[i]["Amount To"] != null && contextObj.itemsSource[i]["Amount To"] != undefined && contextObj.itemsSource[i]["Amount To"] != "") {
                                    contextObj.fromToCheckFlag = true;
                                }
                                else {
                                    contextObj.notificationService.ShowToaster("The Amount To of previous Additional Charge Rate is not entered", 2);
                                    return;
                                }
                            }
                            //contextObj.totalItems
                            contextObj.addClick();
                        }
                    });
                }
                else {
                    contextObj.fromToCheckFlag = true;
                    this.addClick();
                }
                break;
            case 2:
                contextObj.fromToCheckFlag = true;
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
        }
    };
    AdditionalChargeRates.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Additional Charge Rates";
        var fromDateMaxValue;
        this.realPropertyService.loadAdditionalChargeRatesAddEdit("", 0, 1).subscribe(function (resultData) {
            var ddlId = contextObj.ddlAdditionalCharge.FieldValue;
            var additionalChargeDllValue;
            for (var i = 0; i < contextObj.ddlAdditionalCharge.LookupDetails.LookupValues.length; i++) {
                if (contextObj.ddlAdditionalCharge.LookupDetails.LookupValues[i].Id == Number(ddlId))
                    additionalChargeDllValue = contextObj.ddlAdditionalCharge.LookupDetails.LookupValues[i].Value;
            }
            var additionalCharge = resultData["Data"].find(function (item) { return item.ReportFieldId === 5713; });
            additionalCharge.FieldValue = additionalChargeDllValue;
            var rate = resultData["Data"].find(function (item) { return item.ReportFieldId === 5708; });
            rate.MaxLength = 5;
            rate.FieldLabel = "Rate (%)";
            contextObj.realPropertyService.getAdditionalChargeTORateHighValueFuctn(Number(ddlId)).subscribe(function (result) {
                fromDateMaxValue = JSON.parse(result.Data.FieldBinderData)[0].MaxOfEndValue;
                var amountFrom = resultData["Data"].find(function (item) { return item.ReportFieldId === 5709; });
                if (fromDateMaxValue > 0) {
                    amountFrom.FieldValue = fromDateMaxValue + 1;
                    amountFrom.IsEnabled = false;
                    amountFrom.IsLocallyValidated = true;
                    amountFrom.HasValidationError = false;
                }
            });
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    AdditionalChargeRates.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Additional Charge Rates";
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 5705,
            Value: this.selectedAdditionalChargeId.toString()
        });
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.realPropertyService.loadAdditionalChargeRatesAddEdit(fieldobj, this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                if (result["Data"][2].FieldValue == "Yes")
                    result["Data"][2].FieldValue = true;
                else if (result["Data"][2].FieldValue == "No")
                    result["Data"][2].FieldValue = false;
                var isFlatRate = result["Data"].find(function (item) { return item.ReportFieldId === 5706; });
                var rate = result["Data"].find(function (item) { return item.ReportFieldId === 5708; });
                if (isFlatRate.FieldValue == false) {
                    rate.MaxLength = 5;
                    rate.FieldLabel = "Rate (%)";
                }
                if (isFlatRate.FieldValue == true) {
                    rate.MaxLength = 14;
                    rate.FieldLabel = "Rate";
                }
                var amountFrom = result["Data"].find(function (item) { return item.ReportFieldId === 5709; });
                amountFrom.IsEnabled = false;
                amountFrom.IsLocallyValidated = true;
                amountFrom.HasValidationError = false;
                var amountTo = result["Data"].find(function (item) { return item.ReportFieldId === 5710; });
                if (amountTo.FieldValue != "") {
                    amountTo.IsEnabled = false;
                    amountTo.IsLocallyValidated = true;
                    amountTo.HasValidationError = false;
                }
                contextObj.fieldDetailsAdd1 = result["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    AdditionalChargeRates.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Additional Charge Rate to delete", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    AdditionalChargeRates.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            if (contextObj.totalItems > 0)
                contextObj.enableMenu = [1, 2, 3];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    AdditionalChargeRates.prototype.deleteAdditionalChargeRates = function () {
        var contextObj = this;
        contextObj.realPropertyService.postAdditionalChargeRatesDelete(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                contextObj.notificationService.ShowToaster("Selected  Additional Charge Rate deleted", 3);
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                    contextObj.notificationService.ShowToaster("No Additional Charge Rates exist", 2);
                }
            }
            else {
                contextObj.notificationService.ShowToaster("Selected Additional Charge Rate delete Failed", 5);
            }
        });
    };
    AdditionalChargeRates.prototype.inlineDelete = function (event) {
        this.deleteAdditionalChargeRates();
    };
    //slide events/////
    AdditionalChargeRates.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteAdditionalChargeRates();
    };
    AdditionalChargeRates.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    AdditionalChargeRates.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    AdditionalChargeRates = __decorate([
        core_1.Component({
            selector: 'additional-charge-rates',
            templateUrl: './app/Views/RealProperty/GeneralSettings/additional-charge-rates.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, dropdownlistcomponent_component_1.DropDownListComponent, submenu_component_1.SubMenu, paging_component_1.PagingComponent, notify_component_1.Notification, slide_component_1.SlideComponent, grid_component_1.GridComponent, split_view_component_1.SplitViewComponent, additional_charge_rates_addedit_component_1.AdditionalChargeRatesAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, realproperty_service_1.RealPropertyService],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions, realproperty_service_1.RealPropertyService, General_1.GeneralFunctions])
    ], AdditionalChargeRates);
    return AdditionalChargeRates;
}());
exports.AdditionalChargeRates = AdditionalChargeRates;
//# sourceMappingURL=additional-charge-rates.component.js.map
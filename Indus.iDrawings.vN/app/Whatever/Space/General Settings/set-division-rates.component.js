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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var General_1 = require('../../../Models/Common/General');
var space_service_1 = require('../../../models/space/space.service');
var SetDivisionRatesComponent = (function () {
    function SetDivisionRatesComponent(spaceService, notificationService, generFun) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.blnDdlHasLookup = false;
        this.itemsSource = null;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [0], allowAdd: false, allowEdit: true };
    }
    SetDivisionRatesComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.spaceService.getDivisionRatesFields().subscribe(function (resultData) {
            console.log("resultData", resultData);
            contextObj.fieldObject = resultData["Data"];
            var orgL1Field = contextObj.fieldObject.find(function (el) { return el.ReportFieldId == 290; });
            if (contextObj.inputItems.groupBy.length == 0) {
                contextObj.inputItems.groupBy.push(orgL1Field.FieldLabel);
            }
        });
        this.spaceService.getDivisionRatesforCostCategoryRates(this.FilteredIds).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Cost Category Rate exists", 2);
            }
        });
    };
    SetDivisionRatesComponent.prototype.onCellBeginEdit = function (event) {
        // debugger
        var contextObj = this;
        var rowIndex = event.rowData;
        var ddlField = contextObj.fieldObject.find(function (el) { return el.ReportFieldId == 743; });
        var rowData = contextObj.inputItems.rowData;
        ddlField.IsEnabled = false;
        ddlField.LookupDetails.LookupValues = [];
        contextObj.selRateCodeObj = [];
        ddlField.IsEnabled = true;
        var fieldArray = contextObj.inputItems.rowData;
        if (fieldArray != undefined) {
            var rptFielDArray = new Array();
            rptFielDArray.push({
                ReportFieldId: 742,
                Value: fieldArray.CostCategoryId
            });
            this.spaceService.getDdlDivisionRates(JSON.stringify(rptFielDArray)).subscribe(function (resultData) {
                if (resultData["Data"] != undefined) {
                    if (resultData["Data"].LookupValues != undefined) {
                        if (resultData["Data"].LookupValues.length > 0) {
                            for (var i = 0; i < resultData["Data"].LookupValues.length; i++) {
                                if (ddlField.LookupDetails.LookupValues.indexOf(resultData["Data"].LookupValues[i].Id) == -1) {
                                    ddlField.LookupDetails.LookupValues.push({
                                        Id: resultData["Data"].LookupValues[i].Id,
                                        Value: resultData["Data"].LookupValues[i].Value,
                                        IsDisabled: resultData["Data"].LookupValues[i].IsChecked
                                    });
                                    contextObj.blnDdlHasLookup = true;
                                }
                            }
                        }
                        else {
                            contextObj.blnDdlHasLookup = false;
                        }
                    }
                }
            });
        }
    };
    SetDivisionRatesComponent.prototype.onCellEndEdit = function (event) {
        // debugger
        var context = this;
        if (this.selRateCodeObj) {
            if (context.blnDdlHasLookup == true) {
                this.itemsSource.find(function (el) {
                    if ((el.Id == context.inputItems.selectedIds[0]) && (el.CostCategoryId == context.inputItems.rowData["CostCategoryId"])) {
                        el["Rate Code (Rate)"] = context.selRateCodeObj.Value;
                        el["RateCodeId"] = context.selRateCodeObj.Id;
                        return true;
                    }
                    else
                        return false;
                });
            }
        }
    };
    SetDivisionRatesComponent.prototype.ddlValChangeFrmGrid = function (event) {
        //debugger
        var context = this;
        if (context.blnDdlHasLookup == true) {
            if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue != "-1") {
                context.selRateCodeObj = event.ddlRelationShipEvent.ChildFieldObject.LookupDetails.LookupValues.find(function (el) {
                    return (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == el.Id.toString());
                });
            }
            else {
                context.selRateCodeObj = [];
            }
        }
    };
    SetDivisionRatesComponent.prototype.updateDivisionRates = function (event) {
        var contextObj = this;
        var arrayList = new Array();
        var OrgUnitIds = new Array();
        var CostCategoryRateIdArray;
        var count = 0;
        for (var i = 0; i < contextObj.itemsSource.length; i++) {
            if (OrgUnitIds.indexOf(contextObj.itemsSource[i].Id) == -1)
                OrgUnitIds.push(contextObj.itemsSource[i].Id);
        }
        for (var j = 0; j < OrgUnitIds.length; j++) {
            var rateCodeArray = [];
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i].Id == OrgUnitIds[j] && contextObj.itemsSource[i].RateCodeId != null && contextObj.itemsSource[i].RateCodeId != undefined) {
                    rateCodeArray.push(contextObj.itemsSource[i].RateCodeId);
                }
            }
            arrayList.push({
                OrgUnitId: OrgUnitIds[j],
                CostCategoryRateId: rateCodeArray
            });
        }
        for (var i = 0; i < arrayList.length; i++) {
            if (arrayList[i].CostCategoryRateId == []) {
                arrayList.splice(i, 1);
            }
        }
        this.spaceService.updateDivisionRates(JSON.stringify(arrayList)).subscribe(function (resultData) {
            //debugger
            if (resultData["Data"].StatusId == 1) {
                contextObj.notificationService.ShowToaster("Cost Category Rates for Organizational Units updated", 3);
            }
            else {
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SetDivisionRatesComponent.prototype, "FilteredIds", void 0);
    SetDivisionRatesComponent = __decorate([
        core_1.Component({
            selector: 'set-division-rates',
            templateUrl: 'app/Views/Space/General Settings/set-division-rates.component.html',
            directives: [grid_component_1.GridComponent],
            providers: [http_1.HTTP_PROVIDERS, space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], SetDivisionRatesComponent);
    return SetDivisionRatesComponent;
}());
exports.SetDivisionRatesComponent = SetDivisionRatesComponent;
//# sourceMappingURL=set-division-rates.component.js.map
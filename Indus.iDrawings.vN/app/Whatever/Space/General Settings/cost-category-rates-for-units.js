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
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var General_1 = require('../../../Models/Common/General');
var space_service_1 = require('../../../models/space/space.service');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var set_division_rates_component_1 = require('./set-division-rates.component');
var CostCategoryRateUnits = (function () {
    function CostCategoryRateUnits(spaceService, notificationService, generFun) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.strReportFields = "";
        this.strLevel1OrgUnitName = "";
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.selectedTab = 0;
        this.isDivisionLoaded = false;
        this.isTabOpen = false;
        this.itemsSource = null;
        this.isGridEnableFlag = false;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: true };
    }
    CostCategoryRateUnits.prototype.ngOnInit = function () {
        var contextObj = this;
        //contextObj.isTabOpen = true;
        this.spaceService.isStructureOrganization().subscribe(function (resultData) {
            if (resultData["Data"] == 0) {
                contextObj.isGridEnableFlag = true;
                contextObj.notificationService.ShowToaster("No Organizational Structure defined", 2);
            }
            else if (resultData["Data"] == 1) {
                contextObj.spaceService.getCostCategoryRatesColumns().subscribe(function (resultData) {
                    console.log("resultData", resultData);
                    contextObj.fieldObject = resultData["Data"];
                    var level1FldObj = contextObj.fieldObject.find(function (el) { return el.ReportFieldId == 290; });
                    contextObj.strLevel1OrgUnitName = level1FldObj.FieldLabel;
                    for (var j = 0; j < contextObj.fieldObject.length; j++) {
                        if (contextObj.fieldObject[j].ReportFieldId == 290) {
                            contextObj.fieldObject[j].IsEnabled = false;
                        }
                    }
                });
                contextObj.spaceService.getCostCategoryRatesData().subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.totalItems > 0) {
                        if (JSON.parse(resultData["Data"].FieldBinderData)[0]["Column1"]) {
                            if (JSON.parse(resultData["Data"].FieldBinderData)[0]["Column1"] == -2) {
                                contextObj.notificationService.ShowToaster("No Organizational Structure defined", 2);
                            }
                            else if (JSON.parse(resultData["Data"].FieldBinderData)[0]["Column1"] == -3) {
                                contextObj.notificationService.ShowToaster("No Organizational Units exist", 2);
                            }
                        }
                        else {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        }
                    }
                    else {
                    }
                });
            }
        });
    };
    CostCategoryRateUnits.prototype.updateCostCategoryRates = function (event) {
        var contextObj = this;
        var vowels = ['A', 'E', 'I', 'O', 'U'];
        var hasSelectedIds = false;
        var arrayList = new Array();
        if (contextObj.totalItems > 0) {
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 286,
                        Value: contextObj.itemsSource[i].ID.toString()
                    });
                }
            }
            if (hasSelectedIds == true) {
                var contextObj = this;
                this.strReportFields = JSON.stringify(arrayList);
                this.localselection = 1;
                contextObj.isTabOpen = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 100);
                setTimeout(function () {
                    contextObj.isDivisionLoaded = true;
                }, 100);
            }
            else {
                var index = vowels.indexOf(contextObj.strLevel1OrgUnitName[0].toUpperCase());
                if (index > -1)
                    contextObj.notificationService.ShowToaster("Select an " + contextObj.strLevel1OrgUnitName + " ", 2);
                else
                    contextObj.notificationService.ShowToaster("Select a " + contextObj.strLevel1OrgUnitName + " ", 2);
            }
        }
    };
    CostCategoryRateUnits.prototype.getSelectedTab = function (event) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
    };
    CostCategoryRateUnits.prototype.onTabClose = function (event) {
        var contextObj = this;
        this.isTabOpen = false;
        this.selectedTab = event[0];
    };
    CostCategoryRateUnits = __decorate([
        core_1.Component({
            selector: 'cost-category-rates-for-units',
            templateUrl: 'app/Views/Space/General Settings/cost-category-rates-for-units.html',
            directives: [grid_component_1.GridComponent, split_view_component_1.SplitViewComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, set_division_rates_component_1.SetDivisionRatesComponent],
            providers: [http_1.HTTP_PROVIDERS, space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], CostCategoryRateUnits);
    return CostCategoryRateUnits;
}());
exports.CostCategoryRateUnits = CostCategoryRateUnits;
//# sourceMappingURL=cost-category-rates-for-units.js.map
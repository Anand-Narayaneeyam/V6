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
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var userdrawingsaccess_component_1 = require('../../Common/DrawingDetails/userdrawingsaccess.component');
var space_functions_component_1 = require('./space-functions.component');
var spacestandard_component_1 = require('./spacestandard.component');
var distributionmapsettings_component_1 = require('../../Common/DistributionMapSettings/distributionmapsettings.component');
var customreport_grid_component_1 = require('../../Common/Custom Reports/customreport-grid.component');
var mandatory_layer_component_1 = require('./mandatory-layer.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var area_options_component_1 = require('./area-options.component');
var additional_datafields_component_1 = require('../../Common/Additional Data Fields/additional-datafields.component');
var drawingmanagement_component_1 = require('../../Common/DrawingManagement/drawingmanagement.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var Cost_Categories_component_1 = require('./Cost-Categories.component');
var cost_category_rates_for_units_1 = require('./cost-category-rates-for-units');
var color_preference_component_1 = require('../../Common/ColorPreference/color-preference-component');
var default_display_layer_component_1 = require('../../Common/DefaultDisplayLayer/default-display-layer-component');
var SpaceGeneralSettingsComponent = (function () {
    function SpaceGeneralSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pagePath = "Settings / Space / General Settings ";
        this.pageTitle = "General Settings";
        this.showSpaceStandared = false;
        this.showCustomRptSection = false;
        this.showCostCategory = false;
        this.showSpaceFunction = false;
        this.isSiteAdmin = false;
        this.spaceFunText = "Space Function";
        this.sectionExpansionStatus = [{ "title": "Drawing Management", "isExpanded": false },
            { "title": "Area Options", "isExpanded": false },
            { "title": "Space Function", "isExpanded": false },
            { "title": "Space Standards", "isExpanded": false },
            //{ "title": "Mandatory Layers", "isExpanded": false },
            { "title": "Cost Categories", "isExpanded": false },
            { "title": "Cost Category Rates for Units", "isExpanded": false },
            { "title": "Additional Data Fields", "isExpanded": false },
            { "title": "Distribution Map Settings", "isExpanded": false },
            { "title": "Color Preferences", "isExpanded": false },
            { "title": "Custom Reports", "isExpanded": false },
            { "title": "Default Display Layers", "isExpanded": false }
        ];
    }
    SpaceGeneralSettingsComponent.prototype.ngOnInit = function () {
        var context = this;
        var index = 0;
        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            context.userRoleId = retData["UserRoleId"];
        });
        this.administrationService.getSpaceFunctionCustomizedName().subscribe(function (resultData) {
            if (resultData.Data != undefined) {
                context.sectionExpansionStatus[2].title = resultData.Data;
                if (resultData.Data == "Space Functions") {
                    context.spaceFunText = "Space Function";
                }
                else {
                    context.spaceFunText = resultData.Data;
                }
            }
        });
        this.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
            resultData["Data"].filter(function (item) {
                if (item.ModuleName == "Employees" || item.ModuleName == "Scheduling") {
                    context.showSpaceStandared = true;
                }
            });
        });
        this.administrationService.getCustomerSubscribedFeatures("28,5").subscribe(function (result) {
            if (result["Data"][0].IsSubscribed == true) {
                context.showCustomRptSection = true;
            }
            else {
                context.showCustomRptSection = false;
            }
            if (result["Data"][1].IsSubscribed == true) {
                context.showSpaceFunction = true;
            }
            else {
                context.showSpaceFunction = false;
            }
        });
        console.log(context.showSpaceStandared);
        context.administrationService.CheckIsSiteLevelAdmin(3).subscribe(function (result) {
            context.isSiteAdmin = result == 1 ? true : false;
        });
        this.administrationService.getCustomerSubscribedFeatures("6").subscribe(function (result) {
            if (result["Data"][0].IsSubscribed == true) {
                context.showCostCategory = true;
            }
            else {
                context.showCostCategory = false;
            }
        });
    };
    SpaceGeneralSettingsComponent.prototype.onSectionExpandChange = function (obj) {
        for (var i = 0; i < this.sectionExpansionStatus.length; i++) {
            if (this.sectionExpansionStatus[i].title !== obj[1].title) {
                this.sectionExpansionStatus[i].isExpanded = false;
            }
            else {
                this.sectionExpansionStatus[i].isExpanded = true;
            }
        }
        var updatedData = new Array(); /*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.sectionExpansionStatus);
        this.sectionExpansionStatus = updatedData;
        console.log("onSectionExpandChange", this.sectionExpansionStatus);
    };
    ;
    SpaceGeneralSettingsComponent = __decorate([
        core_1.Component({
            selector: 'space-general-settings',
            templateUrl: './app/Views/Space/General Settings/general-settings.component.html',
            directives: [section_component_1.SectionComponent, userdrawingsaccess_component_1.UserDrawingsAccessComponent, space_functions_component_1.SpaceFunctionsComponent, spacestandard_component_1.SpaceStandardComponent,
                area_options_component_1.AreaOptionsComponent, page_component_1.PageComponent, mandatory_layer_component_1.MandatoryLayerComponent, additional_datafields_component_1.AdditionalDataFieldsComponent, distributionmapsettings_component_1.DistributionMapSettingsComponent, drawingmanagement_component_1.DrawingManagementComponent, customreport_grid_component_1.CustomReportGridComponent, Cost_Categories_component_1.CostCategories, cost_category_rates_for_units_1.CostCategoryRateUnits, color_preference_component_1.ColorPreferenceComponent, default_display_layer_component_1.DefaultDisplayLayerComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], SpaceGeneralSettingsComponent);
    return SpaceGeneralSettingsComponent;
}());
exports.SpaceGeneralSettingsComponent = SpaceGeneralSettingsComponent;
//# sourceMappingURL=general-settings.component.js.map
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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var drawingmanagement_component_1 = require('../../Common/DrawingManagement/drawingmanagement.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var space_drivers_component_1 = require('../../CAI/General Settings/space-drivers.component');
var distributionmapsettings_component_1 = require('../../Common/DistributionMapSettings/distributionmapsettings.component');
var default_display_layer_component_1 = require('../../Common/DefaultDisplayLayer/default-display-layer-component');
var customreport_grid_component_1 = require('../../Common/Custom Reports/customreport-grid.component');
var CAIGeneralSettingsComponent = (function () {
    function CAIGeneralSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pagePath = "Settings / CAI / General Settings";
        this.pageTitle = "General Settings";
        this.isSiteAdmin = false;
        this.sectionExpansionStatus = [{ "title": "Drawing Management", "isExpanded": false },
            { "title": "CAI Space Drivers", "isExpanded": false },
            { "title": "Distribution Map Settings", "isExpanded": false },
            { "title": "Default Display Layers", "isExpanded": false },
            { "title": "Custom Reports", "isExpanded": false }];
    }
    CAIGeneralSettingsComponent.prototype.onSectionExpandChange = function (obj) {
        debugger;
        for (var i = 0; i < this.sectionExpansionStatus.length; i++) {
            if (this.sectionExpansionStatus[i].title !== obj[1].title) {
                this.sectionExpansionStatus[i].isExpanded = false;
            }
            else {
                this.sectionExpansionStatus[i].isExpanded = true;
            }
        }
        debugger;
        var updatedData = new Array(); /*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.sectionExpansionStatus);
        this.sectionExpansionStatus = updatedData;
    };
    ;
    CAIGeneralSettingsComponent.prototype.ngOnInit = function () {
        var context = this;
        this.administrationService.getSessionData().subscribe(function (data) {
            debugger;
            var retData = data["Data"];
            context.userRoleId = retData["UserRoleId"];
        });
        context.administrationService.CheckIsSiteLevelAdmin(12).subscribe(function (result) {
            debugger;
            context.isSiteAdmin = result == 1 ? true : false;
        });
    };
    CAIGeneralSettingsComponent = __decorate([
        core_1.Component({
            selector: 'general-settings',
            templateUrl: './app/Views/CAI/General Settings/general-settings.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, drawingmanagement_component_1.DrawingManagementComponent, space_drivers_component_1.SpaceDrivers, distributionmapsettings_component_1.DistributionMapSettingsComponent, default_display_layer_component_1.DefaultDisplayLayerComponent, customreport_grid_component_1.CustomReportGridComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], CAIGeneralSettingsComponent);
    return CAIGeneralSettingsComponent;
}());
exports.CAIGeneralSettingsComponent = CAIGeneralSettingsComponent;
//# sourceMappingURL=general-settings.component.js.map
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
var objectclasses_component_1 = require('../general settings/objectclasses.component');
var drawingmanagement_component_1 = require('../../Common/DrawingManagement/drawingmanagement.component');
var attributes_component_1 = require('../general settings/attributes.component');
var class_attributes_component_1 = require('../general settings/class-attributes.component');
var customreport_grid_component_1 = require('../../Common/Custom Reports/customreport-grid.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var connection_relationship_component_1 = require('../../Objects/Connectivity/connection-relationship.component');
var Listdeficiencycategories_1 = require('../../Objects/Deficiency/Listdeficiencycategories');
var deficiencies_list_1 = require('../../Objects/Deficiency/deficiencies-list');
var connectivity_rules_component_1 = require('../../Objects/Connectivity/connectivity-rules.component');
var color_preference_component_1 = require('../../Common/ColorPreference/color-preference-component');
var default_display_layer_component_1 = require('../../Common/DefaultDisplayLayer/default-display-layer-component');
var createsymbol_component_1 = require('../../../Framework/Whatever/CreateSymbol/createsymbol.component');
var TelecomGeneralSettingsComponent = (function () {
    function TelecomGeneralSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pagePath = "Settings / Telecom / General Settings ";
        this.pageTitle = "General Settings";
        this.showCustomRptSection = false;
        this.showSymbolSection = false;
        this.isSiteAdmin = false;
        this.sectionExpansionStatus = [{ "title": "Drawing Management", "isExpanded": false },
            { "title": "Object Classes", "isExpanded": false },
            { "title": "Common Attributes", "isExpanded": false },
            { "title": "Class Attributes", "isExpanded": false },
            { "title": "Object Class Symbol", "isExpanded": false },
            { "title": "Connection Relationships", "isExpanded": false },
            { "title": "Connectivity Rules", "isExpanded": false },
            { "title": "Deficiency Categories", "isExpanded": false },
            { "title": "Deficiencies", "isExpanded": false },
            { "title": "Color Preferences", "isExpanded": false },
            { "title": "Default Display Layers", "isExpanded": false },
            { "title": "Custom Reports", "isExpanded": false }];
    }
    TelecomGeneralSettingsComponent.prototype.ngOnInit = function () {
        var context = this;
        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            context.userRoleId = retData["UserRoleId"];
        });
        context.administrationService.getCustomerSubscribedFeatures("48,28").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            for (var i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 48:
                        context.showSymbolSection = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 28:
                        context.showCustomRptSection = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }
        });
        context.administrationService.CheckIsSiteLevelAdmin(5).subscribe(function (result) {
            context.isSiteAdmin = result == 1 ? true : false;
        });
    };
    TelecomGeneralSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
    };
    ;
    TelecomGeneralSettingsComponent = __decorate([
        core_1.Component({
            selector: 'telecom-general-settings',
            templateUrl: './app/Views/Objects/Telecom/general-settings.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent,
                objectclasses_component_1.ObjectClassesComponent,
                drawingmanagement_component_1.DrawingManagementComponent,
                attributes_component_1.AttributesComponent,
                class_attributes_component_1.ClassAttributesComponent,
                customreport_grid_component_1.CustomReportGridComponent,
                connection_relationship_component_1.ConnectionRelationships,
                connectivity_rules_component_1.ConnectivityRules,
                Listdeficiencycategories_1.ListDeficiencyCategoriesComponent,
                deficiencies_list_1.ListDeficiencyComponent,
                color_preference_component_1.ColorPreferenceComponent,
                default_display_layer_component_1.DefaultDisplayLayerComponent,
                createsymbol_component_1.CreateSymbolComponent
            ]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], TelecomGeneralSettingsComponent);
    return TelecomGeneralSettingsComponent;
}());
exports.TelecomGeneralSettingsComponent = TelecomGeneralSettingsComponent;
//# sourceMappingURL=general-settings.component.js.map
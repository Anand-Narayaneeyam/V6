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
var objectclasses_component_1 = require('./objectclasses.component');
var drawingmanagement_component_1 = require('../../Common/DrawingManagement/drawingmanagement.component');
var attributes_component_1 = require('./attributes.component');
var class_attributes_component_1 = require('./class-attributes.component');
var customreport_grid_component_1 = require('../../Common/Custom Reports/customreport-grid.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var ObjectsGeneralSettingsComponent = (function () {
    function ObjectsGeneralSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pagePath = "Settings / Assets / General Settings ";
        this.pageTitle = "General Settings";
        this.showCustomRptSection = false;
        this.sectionExpansionStatus = [{ "title": "Drawing Management", "isExpanded": false },
            { "title": "Asset Classes", "isExpanded": false },
            { "title": "Common Attributes", "isExpanded": false },
            { "title": "Class Attributes", "isExpanded": false }, { "title": "Custom Reports", "isExpanded": false }];
    }
    ObjectsGeneralSettingsComponent.prototype.ngOnInit = function () {
        var context = this;
        this.administrationService.getCustomerSubscribedFeatures("28").subscribe(function (result) {
            if (result["Data"][0].IsSubscribed == true) {
                context.showCustomRptSection = true;
            }
            else {
                context.showCustomRptSection = false;
            }
        });
    };
    ObjectsGeneralSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
    ObjectsGeneralSettingsComponent = __decorate([
        core_1.Component({
            selector: 'general-settings',
            templateUrl: './app/Views/Objects/General Settings/general-settings.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, objectclasses_component_1.ObjectClassesComponent, drawingmanagement_component_1.DrawingManagementComponent, attributes_component_1.AttributesComponent, class_attributes_component_1.ClassAttributesComponent, customreport_grid_component_1.CustomReportGridComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], ObjectsGeneralSettingsComponent);
    return ObjectsGeneralSettingsComponent;
}());
exports.ObjectsGeneralSettingsComponent = ObjectsGeneralSettingsComponent;
//# sourceMappingURL=general-settings.component.js.map
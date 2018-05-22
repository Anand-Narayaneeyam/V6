var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="projecttypelist.component.ts" />
var core_1 = require('@angular/core');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var projecttypelist_component_1 = require('./projecttypelist.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var additional_datafields_component_1 = require('../../common/additional data fields/additional-datafields.component');
var customreport_grid_component_1 = require('../../Common/Custom Reports/customreport-grid.component');
var ProjectsGeneralSettingsComponent = (function () {
    function ProjectsGeneralSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pageTitle = "General Settings";
        this.showCustomRptSection = false;
        this.isSiteAdmin = false;
        this.sectionExpansionStatus = [{ "title": "Project Types", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "Custom Reports", "isExpanded": false }
        ];
    }
    ProjectsGeneralSettingsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.pagePath = "Settings / Projects / General Settings";
        this.administrationService.CheckIsSiteLevelAdmin(0).subscribe(function (result) {
            contextObj.isSiteAdmin = result == 1 ? true : false;
        });
        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.userRoleId = retData["UserRoleId"];
        });
        contextObj.administrationService.getCustomerSubscribedFeatures("28").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            for (var i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 28:
                        contextObj.showCustomRptSection = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }
        });
    };
    ProjectsGeneralSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
    ProjectsGeneralSettingsComponent = __decorate([
        core_1.Component({
            selector: 'projects-general-settings',
            templateUrl: './app/Views/Projects/GeneralSettings/generalSettings.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, projecttypelist_component_1.ProjectTypeListComponent, additional_datafields_component_1.AdditionalDataFieldsComponent, customreport_grid_component_1.CustomReportGridComponent],
            providers: [administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], ProjectsGeneralSettingsComponent);
    return ProjectsGeneralSettingsComponent;
}());
exports.ProjectsGeneralSettingsComponent = ProjectsGeneralSettingsComponent;
//# sourceMappingURL=generalSettings.component.js.map
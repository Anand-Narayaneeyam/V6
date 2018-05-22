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
var treeviewfields_component_1 = require('./treeviewfields.component');
var additional_datafields_component_1 = require('../../Common/Additional Data Fields/additional-datafields.component');
var Document_Categories_component_1 = require('./Document-Categories.component');
var optionalFields_1 = require('./optionalFields');
var customreport_grid_component_1 = require('../../Common/Custom Reports/customreport-grid.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var numberformat_component_1 = require('../../common/number format/numberformat.component');
var DocumentGeneralSettingsComponent = (function () {
    function DocumentGeneralSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pagePath = "Settings / Documents / General Settings";
        this.pageTitle = "General Settings";
        this.isDownloadFormat = false;
        this.sectionExpansionStatus = [{ "title": "Document Categories", "isExpanded": false },
            { "title": "Optional Fields", "isExpanded": false },
            { "title": "Tree View Fields", "isExpanded": false },
            { "title": "Additional Data Fields", "isExpanded": false },
            { "title": "Document Download Format", "isExpanded": false },
            { "title": "Custom Reports", "isExpanded": false }];
    }
    DocumentGeneralSettingsComponent.prototype.ngOnInit = function () {
        var Contextobj = this;
        this.administrationService.getSessionData().subscribe(function (data) {
            debugger;
            var retData = data["Data"];
            Contextobj.userRoleId = retData["UserRoleId"];
        });
        Contextobj.administrationService.getCustomerSubscribedFeatures("191").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            Contextobj.isDownloadFormat = customerFeatureobj[0]["IsSubscribed"];
        });
    };
    DocumentGeneralSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
    DocumentGeneralSettingsComponent = __decorate([
        core_1.Component({
            selector: 'documentGeneralSettings',
            templateUrl: './app/Views/Documents/General Settings/general-settings.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, treeviewfields_component_1.TreeViewFieldsComponent, Document_Categories_component_1.DocumentCategory, optionalFields_1.OptionalFieldsComponent,
                additional_datafields_component_1.AdditionalDataFieldsComponent, customreport_grid_component_1.CustomReportGridComponent, numberformat_component_1.NumberFormat]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], DocumentGeneralSettingsComponent);
    return DocumentGeneralSettingsComponent;
}());
exports.DocumentGeneralSettingsComponent = DocumentGeneralSettingsComponent;
//# sourceMappingURL=general-settings.component.js.map
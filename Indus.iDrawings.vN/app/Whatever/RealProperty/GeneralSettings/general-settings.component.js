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
var landloards_tenants_list_component_1 = require('./landloards-tenants-list.component');
var contacts_list_component_1 = require('./contacts-list.component');
var additional_datafields_component_1 = require('../../Common/Additional Data Fields/additional-datafields.component');
var additional_charge_rates_component_1 = require('./additional-charge-rates.component');
var agreement_clauses_1 = require('./agreement-clauses');
var additional_charges_component_1 = require('./additional-charges.component');
var customreport_grid_component_1 = require('../../Common/Custom Reports/customreport-grid.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var RealPropertyGeneralSettingsComponent = (function () {
    function RealPropertyGeneralSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pageTitle = "General Settings";
        this.pagePath = "Settings / Real Property / General Settings";
        this.showCustomRptSection = false;
        this.sectionExpansionStatus = [{ "title": "Landlords", "isExpanded": false },
            { "title": "Tenants", "isExpanded": false },
            { "title": "Contacts", "isExpanded": false },
            { "title": "Additional Data Fields", "isExpanded": false },
            { "title": "Additional  Charges", "isExpanded": false },
            { "title": "Additional Charge Rates", "isExpanded": false },
            { "title": "Agreement Clauses", "isExpanded": false },
            { "title": "Custom Reports", "isExpanded": false }];
    }
    RealPropertyGeneralSettingsComponent.prototype.ngOnInit = function () {
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
    RealPropertyGeneralSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
    RealPropertyGeneralSettingsComponent = __decorate([
        core_1.Component({
            selector: 'general-settings',
            templateUrl: './app/Views/RealProperty/GeneralSettings/general-settings.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, landloards_tenants_list_component_1.LandlordsComponent, additional_datafields_component_1.AdditionalDataFieldsComponent, additional_charge_rates_component_1.AdditionalChargeRates, agreement_clauses_1.AgreementClausesComponent, contacts_list_component_1.ContactsListComponent, additional_charges_component_1.Additionalcharges, customreport_grid_component_1.CustomReportGridComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], RealPropertyGeneralSettingsComponent);
    return RealPropertyGeneralSettingsComponent;
}());
exports.RealPropertyGeneralSettingsComponent = RealPropertyGeneralSettingsComponent;
//# sourceMappingURL=general-settings.component.js.map
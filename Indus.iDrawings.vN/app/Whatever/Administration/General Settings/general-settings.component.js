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
var password_policy_component_1 = require('./password-policy.component');
var customer_support_component_1 = require('./customer-support.component');
var organizational_structure_component_1 = require('./organizational-structure.component');
var attachment_categories_component_1 = require('./attachment-categories.component');
var mail_domain_component_1 = require('./mail-domain.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var contact_details_component_1 = require('./contact-details.component');
var organizational_units_component_1 = require('./organizational-units.component');
var report_setup_component_1 = require('./report-setup.component');
var additional_datafields_component_1 = require('../../common/additional data fields/additional-datafields.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var gl_accounts_component_1 = require('./gl-accounts.component');
var user_groups_component_1 = require('./../User Groups/user-groups.component');
var scheduled_report_component_1 = require('./scheduled-report-component');
var manage_reports_component_1 = require('./manage-reports-component');
var messagetemplates_component_1 = require('./messagetemplates.component');
var dynamicCalendar_component_1 = require('./dynamicCalendar.component');
var building_condition_component_1 = require('./building-condition.component');
var seasons_component_1 = require('./seasons.component');
var contacts_list_component_1 = require('../../RealProperty/GeneralSettings/contacts-list.component');
var client_list_component_1 = require('./client-list-component');
var numberformat_component_1 = require('../../common/number format/numberformat.component');
var GeneralSettingsComponent = (function () {
    function GeneralSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pageTitle = "General Settings";
        this.isAdmin = false;
        this.enableGLAccount = false;
        this.isSiteAdmin = false;
        this.isMailDomain = false;
        this.isScheduleReport = false;
        this.isRealPropModEnabled = false;
        this.sectionExpansionStatus = [{ "title": "Password Policy", "isExpanded": false }, { "title": "Customer Support", "isExpanded": false }, { "title": "Organizational Structure", "isExpanded": false }, { "title": "Attachment Categories", "isExpanded": false }, { "title": "Mail Domains", "isExpanded": false },
            { "title": "Report Setup", "isExpanded": false }, { "title": "Contact Details & Logo", "isExpanded": false }, { "title": "Organizational Units", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "GL Accounts", "isExpanded": false }, { "title": "User Groups", "isExpanded": false },
            { "title": "Scheduled Reports", "isExpanded": false }, { "title": "Manage Scheduled Reports", "isExpanded": false }, { "title": "Message Templates", "isExpanded": false },
            { "title": "Seasons", "isExpanded": false },
            { "title": "Building Conditions", "isExpanded": false }, { "title": "Calendars", "isExpanded": false },
            { "title": "Clients", "isExpanded": false }, { "title": "Contacts", "isExpanded": false },
            { "title": "Prefix", "isExpanded": false }
        ];
    }
    GeneralSettingsComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.pagePath = "Settings / Administration / General Settings";
        objContext.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            if (UserRoleId <= 2) {
                objContext.isAdmin = true;
            }
        });
        objContext.administrationService.getCustomerSubscribedFeaturesGL("74").subscribe(function (rt) {
            if (rt.Data[0]["IsSubscribed"] == true && rt.Data[0]["FeatureLookupId"] == "18" && rt.Data[0]["Id"] == 74) {
                objContext.enableGLAccount = true;
            }
        });
        objContext.administrationService.getCustomerSubscribedFeatures("214").subscribe(function (rt) {
            if (rt.Data[0]["IsSubscribed"] == true && rt.Data[0]["Id"] == 214) {
                objContext.isMailDomain = true;
            }
        });
        objContext.administrationService.CheckIsSiteLevelAdmin(0).subscribe(function (result) {
            objContext.isSiteAdmin = result == 1 ? true : false;
        });
        objContext.administrationService.getCustomerSubscribedFeatures("205").subscribe(function (rt) {
            if (rt.Data[0]["IsSubscribed"] == true && rt.Data[0]["Id"] == 205) {
                objContext.isScheduleReport = true;
            }
        });
        objContext.IsRealPropertyEnabled();
    };
    GeneralSettingsComponent.prototype.IsRealPropertyEnabled = function () {
        var context = this;
        context.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
            var modCheck = resultData.Data.find(function (item) {
                return item.ModuleId == 30;
            });
            if (modCheck != undefined) {
                if (modCheck.ModuleId == 30) {
                    context.isRealPropModEnabled = true;
                }
                else {
                    context.isRealPropModEnabled = true;
                }
            }
        });
    };
    GeneralSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
    GeneralSettingsComponent = __decorate([
        core_1.Component({
            selector: 'general-settings',
            templateUrl: './app/Views/Administration/General Settings/general-settings.component.html',
            directives: [section_component_1.SectionComponent, additional_datafields_component_1.AdditionalDataFieldsComponent, page_component_1.PageComponent, password_policy_component_1.PasswordPolicyComponent, customer_support_component_1.CustomerSupportComponent, organizational_structure_component_1.OrganizationalStructureComponent,
                attachment_categories_component_1.AttachmentCategoryComponent, mail_domain_component_1.MailDomainComponent, contact_details_component_1.ContactDetailsComponent, organizational_units_component_1.OrganizationalUnitsComponent, report_setup_component_1.ReportSetupComponent, gl_accounts_component_1.GLAccountsComponent,
                user_groups_component_1.UserGroupsComponent, scheduled_report_component_1.ScheduledReportComponent, manage_reports_component_1.ManageReportsComponent, messagetemplates_component_1.MessageTemplatesComponent, building_condition_component_1.BuildingConditionComponent, dynamicCalendar_component_1.DynamicCalendarComponent, seasons_component_1.SeasonsComponent,
                contacts_list_component_1.ContactsListComponent, client_list_component_1.ClientsListComponent, numberformat_component_1.NumberFormat]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], GeneralSettingsComponent);
    return GeneralSettingsComponent;
}());
exports.GeneralSettingsComponent = GeneralSettingsComponent;
//# sourceMappingURL=general-settings.component.js.map
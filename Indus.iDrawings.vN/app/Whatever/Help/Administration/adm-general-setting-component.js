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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var GeneralSettingsHelpComponent = (function () {
    function GeneralSettingsHelpComponent(administrationService) {
        this.administrationService = administrationService;
        this.pageTitle = "General Settings-Help";
        this.isAdmin = false;
        this.enableGLAccount = false;
        this.sectionExpansionStatus = [{ "title": "Password Policy", "isExpanded": false }, { "title": "Customer Support", "isExpanded": false }, { "title": "Organizational Structure", "isExpanded": false }, { "title": "Attachment Categories", "isExpanded": false }, { "title": "Mail Domains", "isExpanded": false },
            { "title": "Report Setup", "isExpanded": false }, { "title": "Contact Details & Logo", "isExpanded": false }, { "title": "Organizational Units", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "GL Accounts", "isExpanded": false }, { "title": "User Groups", "isExpanded": false }];
    }
    GeneralSettingsHelpComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.pagePath = "Help / Administration / General Settings";
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
    };
    GeneralSettingsHelpComponent.prototype.onSectionExpandChange = function (obj) {
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
    GeneralSettingsHelpComponent = __decorate([
        core_1.Component({
            selector: 'general-settings',
            templateUrl: './app/Views/Help/Administration/adm-general-setting-component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], GeneralSettingsHelpComponent);
    return GeneralSettingsHelpComponent;
}());
exports.GeneralSettingsHelpComponent = GeneralSettingsHelpComponent;
//# sourceMappingURL=adm-general-setting-component.js.map
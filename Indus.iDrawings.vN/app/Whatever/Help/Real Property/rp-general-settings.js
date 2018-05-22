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
var RealPropertyGeneralSettingsHelpComponent = (function () {
    function RealPropertyGeneralSettingsHelpComponent() {
        this.pageTitle = "General Settings";
        this.sectionExpansionStatus = [{ "title": "Landlords", "isExpanded": false }, { "title": "Tenants", "isExpanded": false }, { "title": "Contacts", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "Additional Charges", "isExpanded": false }, { "title": "Additional Charge Rates", "isExpanded": false }, { "title": "Agreement Clauses", "isExpanded": false }, { "title": "Custom Reports", "isExpanded": false }];
    }
    RealPropertyGeneralSettingsHelpComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.pagePath = "Help / Real Property / General Settings";
    };
    RealPropertyGeneralSettingsHelpComponent.prototype.onSectionExpandChange = function (obj) {
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
    RealPropertyGeneralSettingsHelpComponent = __decorate([
        core_1.Component({
            selector: 'realProperty-generalSettings-Help',
            templateUrl: './app/Views/Help/Real Property/rp-general-settings.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], RealPropertyGeneralSettingsHelpComponent);
    return RealPropertyGeneralSettingsHelpComponent;
}());
exports.RealPropertyGeneralSettingsHelpComponent = RealPropertyGeneralSettingsHelpComponent;
//# sourceMappingURL=rp-general-settings.js.map
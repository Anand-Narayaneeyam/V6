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
var WorkOrderHelpGeneralSettingsComponent = (function () {
    function WorkOrderHelpGeneralSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pageTitle = "General Settings";
        this.pagePath = "Help / Work Order / General Settings";
        this.isMAdmin = false;
        this.sectionExpansionStatus = [{ "title": "Trades", "isExpanded": false }, { "title": "Technicians", "isExpanded": false }, { "title": "Contractors", "isExpanded": false }, { "title": "Manufacturers", "isExpanded": false }, { "title": "Parts", "isExpanded": false }, { "title": "Tools", "isExpanded": false }, { "title": "Priorities", "isExpanded": false }, { "title": "Reasons for Hold", "isExpanded": false }];
    }
    WorkOrderHelpGeneralSettingsComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            if (UserRoleId >= 4) {
                objContext.isMAdmin = true;
            }
        });
    };
    WorkOrderHelpGeneralSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
    WorkOrderHelpGeneralSettingsComponent = __decorate([
        core_1.Component({
            selector: 'general-settings',
            templateUrl: './app/Views/Help/WorkOrder/general-setting-component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], WorkOrderHelpGeneralSettingsComponent);
    return WorkOrderHelpGeneralSettingsComponent;
}());
exports.WorkOrderHelpGeneralSettingsComponent = WorkOrderHelpGeneralSettingsComponent;
//# sourceMappingURL=general-setting-component.js.map
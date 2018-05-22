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
var customer_space_settings_component_1 = require('./customer-space-settings.component');
var customer_common_settings_component_1 = require('./customer-common-settings.component');
var customer_object_settings_component_1 = require('./customer-object-settings.component');
var customer_Scheduling_settings_component_1 = require('./customer-Scheduling-settings.component');
var customer_employee_settings_component_1 = require('./customer-employee-settings.component');
var customer_workorder_settings_component_1 = require('./customer-workorder-settings.component');
var customer_document_settings_component_1 = require('./customer-document-settings.component');
var CustomerSettingsMainComponent = (function () {
    function CustomerSettingsMainComponent() {
        this.sectionExpansionStatus = [{ "title": "Administration", "isExpanded": false },
            { "title": "As Builts", "isExpanded": false },
            { "title": "Projects", "isExpanded": false },
            { "title": "Space", "isExpanded": false },
            { "title": "Documents", "isExpanded": false },
            { "title": "Scheduling", "isExpanded": false },
            { "title": "Employees", "isExpanded": false },
            { "title": "Telecom", "isExpanded": false },
            { "title": "Assets", "isExpanded": false },
            { "title": "Furniture", "isExpanded": false },
            { "title": "Work Order", "isExpanded": false },
            { "title": "Executive Summary", "isExpanded": false },
            { "title": "CAI Space Driver", "isExpanded": false },
            { "title": "Conditions", "isExpanded": false },
            { "title": "Electrical", "isExpanded": false },
            { "title": "Fire and Safety", "isExpanded": false },
            { "title": "Mechanical", "isExpanded": false },
            { "title": "Plumbing", "isExpanded": false },
            { "title": "Medical Gas", "isExpanded": false },
            { "title": "Security Assets", "isExpanded": false },
            { "title": "Real Property Management", "isExpanded": false }];
    }
    // constructor(private administrationService: AdministrationService) {}
    CustomerSettingsMainComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.pagePath = "Settings / Administration /  Customer Settings";
    };
    CustomerSettingsMainComponent.prototype.onSectionExpandChange = function (obj) {
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
    CustomerSettingsMainComponent = __decorate([
        core_1.Component({
            selector: 'customer-settings-main',
            templateUrl: 'app/Views/Administration/CustomerSettings/customer-settings-main.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, customer_space_settings_component_1.CustomerSpaceSettingsComponent, customer_common_settings_component_1.CustomerCommonSettingsComponent,
                customer_object_settings_component_1.CustomerObjectSettingsComponent, customer_Scheduling_settings_component_1.CustomerSchedulingSettingsComponent, customer_employee_settings_component_1.CustomerEmployeeSettingsComponent,
                customer_workorder_settings_component_1.CustomerWorkorderSettingsComponent, customer_document_settings_component_1.CustomerDocumentSettingsComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], CustomerSettingsMainComponent);
    return CustomerSettingsMainComponent;
}());
exports.CustomerSettingsMainComponent = CustomerSettingsMainComponent;
//# sourceMappingURL=customer-settings-main.component.js.map
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
var setworkflow_editablefields_1 = require('./setworkflow-editablefields');
var setworkflow_permissions_1 = require('./setworkflow-permissions');
var WorkflowSettingsComponent = (function () {
    function WorkflowSettingsComponent() {
        this.pageTitle = "General Settings";
        this.pagePath = "Settings / Work Order / General Settings";
        this.sectionExpansionStatus = [{ "title": "Editable Fields", "isExpanded": false }, { "title": "Permissions", "isExpanded": false }];
        this.isGeneral = false;
    }
    WorkflowSettingsComponent.prototype.onSectionExpandChange = function (obj) {
        console.log("Workflow ActionPointId", this.selectedId);
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
    WorkflowSettingsComponent = __decorate([
        core_1.Component({
            selector: 'workflow-settings',
            templateUrl: './app/Views/Common/Set Workflow/workflow-settings.html',
            directives: [section_component_1.SectionComponent, setworkflow_editablefields_1.SetWorkflowEditableFieldsComponent, setworkflow_permissions_1.SetWorkflowPerissionsComponent],
            inputs: ['selectedId', 'worktype', 'isGeneral']
        }), 
        __metadata('design:paramtypes', [])
    ], WorkflowSettingsComponent);
    return WorkflowSettingsComponent;
}());
exports.WorkflowSettingsComponent = WorkflowSettingsComponent;
//# sourceMappingURL=workflow-settings.js.map
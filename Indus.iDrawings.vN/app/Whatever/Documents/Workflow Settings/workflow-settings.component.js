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
var define_worktypeList_1 = require('../../Common/Define Work Type/define-worktypeList');
var setworkflow_main_component_1 = require('../../common/set workflow/setworkflow-main.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var DocumentsWorkflowSettingsComponent = (function () {
    function DocumentsWorkflowSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pageTitle = "Workflow Settings";
        this.pagePath = "Settings / Documents / Workflow Settings";
        this.isSiteAdmin = true;
        // isMAdmin: boolean = false;
        this.sectionExpansionStatus = [{ "title": "Define Work Types", "isExpanded": false }, { "title": "Set Workflow", "isExpanded": false }];
    }
    DocumentsWorkflowSettingsComponent.prototype.ngOnInit = function () {
        debugger;
        var objContext = this;
        objContext.administrationService.CheckIsSiteLevelAdmin(4).subscribe(function (result) {
            objContext.isSiteAdmin = result == 1 ? true : false;
        });
    };
    DocumentsWorkflowSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
    DocumentsWorkflowSettingsComponent = __decorate([
        core_1.Component({
            selector: 'documents-workflowsettings',
            templateUrl: './app/Views/Documents/Workflow Settings/workflow-settings.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, define_worktypeList_1.DefineWorkTypeComponent, setworkflow_main_component_1.SetWorkflowMainComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], DocumentsWorkflowSettingsComponent);
    return DocumentsWorkflowSettingsComponent;
}());
exports.DocumentsWorkflowSettingsComponent = DocumentsWorkflowSettingsComponent;
//# sourceMappingURL=workflow-settings.component.js.map
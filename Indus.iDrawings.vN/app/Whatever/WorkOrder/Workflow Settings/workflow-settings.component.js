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
var additional_datafields_component_1 = require('../Additional Data Fields/additional-datafields.component');
var setworkflow_main_component_1 = require('../../common/set workflow/setworkflow-main.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var set_workflowtype_spacefields_1 = require('./set-workflowtype-spacefields');
var assignworktype_tosite_component_1 = require('./assignworktype-tosite.component');
var WorkflowSettingsComponent = (function () {
    function WorkflowSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pageTitle = "Workflow Settings";
        this.pagePath = "Settings / Work Order / Workflow Settings";
        this.isMAdmin = false;
        this.isSiteAdmin = true;
        this.isWorkflowWithSiteEnabled = false;
        this.isSpaceEnabled = false;
        this.sectionExpansionStatus = [{ "title": "Define Work Types", "isExpanded": false }, { "title": "Assign Work Types to Site", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "Set Work Type Space Fields", "isExpanded": false }, { "title": "Set Workflow", "isExpanded": false }];
    }
    WorkflowSettingsComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            objContext.userRoleId = retData["UserRoleId"];
        });
        objContext.administrationService.CheckIsSiteLevelAdmin(9).subscribe(function (result) {
            objContext.isSiteAdmin = result == 1 ? true : false;
        });
        objContext.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            if (UserRoleId >= 4) {
                objContext.isMAdmin = true;
            }
        });
        objContext.administrationService.getCustomerSubscribedFeatures("255").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            if (customerFeatureobj)
                objContext.isWorkflowWithSiteEnabled = customerFeatureobj[0]["IsSubscribed"];
        });
        objContext.administrationService.getAccessibleModuleForUser().subscribe(function (Data) {
            debugger;
            var accesibleModules = Data["Data"];
            var SpaceEnabled = [];
            SpaceEnabled = accesibleModules.filter(function (item) { return item.ModuleId === 3; });
            if (SpaceEnabled.length != 0) {
                objContext.isSpaceEnabled = true;
            }
        });
    };
    WorkflowSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
            templateUrl: './app/Views/WorkOrder/Workflow Settings/workflow-settings.component.html',
            directives: [section_component_1.SectionComponent, set_workflowtype_spacefields_1.SetWorktypeSpacefield, page_component_1.PageComponent, define_worktypeList_1.DefineWorkTypeComponent, additional_datafields_component_1.WorkOrderAdditionalDataFieldsComponent, setworkflow_main_component_1.SetWorkflowMainComponent, assignworktype_tosite_component_1.AssignWorkTypeToSite]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], WorkflowSettingsComponent);
    return WorkflowSettingsComponent;
}());
exports.WorkflowSettingsComponent = WorkflowSettingsComponent;
//# sourceMappingURL=workflow-settings.component.js.map
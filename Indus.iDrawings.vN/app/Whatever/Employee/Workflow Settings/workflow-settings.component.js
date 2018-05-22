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
var define_worktypeList_1 = require('../../Common/Define Work Type/define-worktypeList');
var setworkflow_component_1 = require('../../Common/Set Workflow/setworkflow.component');
var EmployeeWorkflowSettingsComponent = (function () {
    function EmployeeWorkflowSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pagePath = "Settings / Employees / Workflow Settings";
        this.pageTitle = "Workflow Settings";
        this.isAdmin = false;
        this.isSiteAdmin = true;
        this.isSpacePlanEnabled = false;
        this.isEmployeeMoveEnabled = false;
        this.isEmployeeAssignEnabled = false;
        this.showCustomRptSection = false;
        this.sectionExpansionStatus = [{ "title": "Define Work Types", "isExpanded": false }, { "title": "Set Workflow", "isExpanded": false }];
    }
    EmployeeWorkflowSettingsComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.administrationService.getCustomerSubscribedFeatures("47,28,190, 192").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            for (var i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 47:
                        objContext.isSpacePlanEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 28:
                        objContext.showCustomRptSection = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 190:
                        objContext.isEmployeeMoveEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 192:
                        objContext.isEmployeeAssignEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }
        });
        objContext.administrationService.CheckIsSiteLevelAdmin(5).subscribe(function (result) {
            objContext.isSiteAdmin = result == 1 ? true : false;
        });
    };
    EmployeeWorkflowSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
    EmployeeWorkflowSettingsComponent = __decorate([
        core_1.Component({
            selector: 'employee-workflowsettings',
            templateUrl: './app/Views/Employee/Workflow Settings/workflow-settings.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, define_worktypeList_1.DefineWorkTypeComponent, setworkflow_component_1.SetWorkflowComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], EmployeeWorkflowSettingsComponent);
    return EmployeeWorkflowSettingsComponent;
}());
exports.EmployeeWorkflowSettingsComponent = EmployeeWorkflowSettingsComponent;
//# sourceMappingURL=workflow-settings.component.js.map
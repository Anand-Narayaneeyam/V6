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
var userdrawingsaccess_component_1 = require('../../Common/DrawingDetails/userdrawingsaccess.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var optionalfields_component_1 = require('./optionalfields.component');
var additional_datafields_component_1 = require('../../Common/Additional Data Fields/additional-datafields.component');
var jobtitle_component_1 = require('./jobtitle.component');
var grades_component_1 = require('./grades.component');
var employee_to_workOrderUser_1 = require('./employee-to-workOrderUser');
var drawingmanagement_component_1 = require('../../Common/DrawingManagement/drawingmanagement.component');
var customreport_grid_component_1 = require('../../Common/Custom Reports/customreport-grid.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var color_preference_component_1 = require('../../Common/ColorPreference/color-preference-component');
var default_display_layer_component_1 = require('../../Common/DefaultDisplayLayer/default-display-layer-component');
var spaceTypes_1 = require('./spaceTypes');
var spaceallocationrules_component_1 = require('./spaceallocationrules.component');
//import { DefineWorkTypeComponent } from '../../Common/Define Work Type/define-worktypeList';
//import { SetWorkflowComponent } from '../../Common/Set Workflow/setworkflow.component';
var EmpGeneralSettingsComponent = (function () {
    function EmpGeneralSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pagePath = "Settings / Employees / General Settings";
        this.pageTitle = "General Settings";
        this.isAdmin = false;
        this.isSpacePlanEnabled = false;
        this.isSpaceAllocationRule = false;
        this.showCustomRptSection = false;
        this.showEmployeeToWOUser = false;
        this.isWOUserEnabled = false;
        this.isSiteAdmin = false;
        this.sectionExpansionStatus = [{ "title": "Drawing Management", "isExpanded": false },
            { "title": "Job Titles", "isExpanded": false },
            { "title": "Grades", "isExpanded": false },
            { "title": "Additional Data Fields (Employee)", "isExpanded": false },
            { "title": "Additional Data Fields (Move Projects)", "isExpanded": false },
            { "title": "Employee to Work Order User", "isExpanded": false },
            { "title": "Custom Reports", "isExpanded": false },
            { "title": "Color Preferences", "isExpanded": false }, { "title": "Default Display Layers", "isExpanded": false },
            { "title": "Space Type", "isExpanded": false },
            { "title": "Space Allocation Rules", "isExpanded": false },
            { "title": "Optional Fields", "isExpanded": false }];
    }
    EmpGeneralSettingsComponent.prototype.ngOnInit = function () {
        var objContext = this;
        debugger;
        // objContext.administrationService.getSessionData().subscribe(function (data) {
        //    var retData = data["Data"];
        //    var UserRoleId = retData["UserRoleId"];
        //    if (UserRoleId <= 2) {
        //        objContext.isAdmin = true;
        //    }
        //});
        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            objContext.userRoleId = retData["UserRoleId"];
        });
        objContext.administrationService.getCustomerSubscribedFeatures("47,28,122,101").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            for (var i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 47:
                        objContext.isSpacePlanEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 28:
                        objContext.showCustomRptSection = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 122:
                        objContext.showEmployeeToWOUser = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 101:
                        objContext.isWOUserEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 15:
                        objContext.isSpaceAllocationRule = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }
        });
        objContext.administrationService.CheckIsSiteLevelAdmin(5).subscribe(function (result) {
            objContext.isSiteAdmin = result == 1 ? true : false;
            //var customerFeatureobj = rt["Data"];
            //for (let i = 0; i < customerFeatureobj.length; i++) {
            //    switch (customerFeatureobj[i]["Id"]) {
            //        case 47:
            //            objContext.isSpacePlanEnabled = customerFeatureobj[i]["IsSubscribed"];
            //            break;
            //        case 28:
            //            objContext.showCustomRptSection = customerFeatureobj[i]["IsSubscribed"];
            //            break;
            //    }
            //}
        });
    };
    EmpGeneralSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
    EmpGeneralSettingsComponent = __decorate([
        core_1.Component({
            selector: 'empGeneralSettings',
            templateUrl: './app/Views/Employee/General Settings/general-settings.component.html',
            directives: [section_component_1.SectionComponent, drawingmanagement_component_1.DrawingManagementComponent, userdrawingsaccess_component_1.UserDrawingsAccessComponent, page_component_1.PageComponent, optionalfields_component_1.OptionalFieldComponent,
                additional_datafields_component_1.AdditionalDataFieldsComponent, jobtitle_component_1.JobTitleComponent, spaceallocationrules_component_1.SpaceAllocationRules,
                grades_component_1.GradesComponent, customreport_grid_component_1.CustomReportGridComponent, color_preference_component_1.ColorPreferenceComponent, default_display_layer_component_1.DefaultDisplayLayerComponent, spaceTypes_1.spacetypesComponent, employee_to_workOrderUser_1.EmployeeToWorkOrderUserComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], EmpGeneralSettingsComponent);
    return EmpGeneralSettingsComponent;
}());
exports.EmpGeneralSettingsComponent = EmpGeneralSettingsComponent;
//# sourceMappingURL=general-settings.component.js.map
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
var amenities_component_1 = require('./amenities.component');
var catering_component_1 = require('./catering.component');
var services_component_1 = require('./services.component');
var define_worktypeList_1 = require('../../Common/Define Work Type/define-worktypeList');
var drawingmanagement_component_1 = require('../../Common/DrawingManagement/drawingmanagement.component');
var setworkflow_component_1 = require('../../Common/Set Workflow/setworkflow.component');
var resources_1 = require('./resources');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var equipmenttype_component_1 = require('./equipmenttype.component');
var equipmentquantities_component_1 = require('./equipmentquantities.component');
var UserRoleBasedSettings_component_1 = require('./UserRoleBasedSettings.component');
var numberformat_component_1 = require('../../common/number format/numberformat.component');
var SchedulingGeneralSettingsComponent = (function () {
    function SchedulingGeneralSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pagePath = "Settings / Scheduling / General Settings";
        this.pageTitle = "General Settings";
        this.isSiteAdmin = false;
        this.isroomresv = false;
        this.isseatresv = false;
        this.iseqpresv = false;
        this.iscatering = false;
        this.isamenities = false;
        this.isservice = false;
        this.sectionExpansionStatus = [{ "title": "Floor Plan Management", "isExpanded": false }, { "title": "Amenities", "isExpanded": false }, { "title": "Services", "isExpanded": false }, { "title": "Catering", "isExpanded": false }, { "title": "Resources", "isExpanded": false }, { "title": "Define Work Types", "isExpanded": false }, { "title": "Set Workflow", "isExpanded": false }, { "title": "Equipment Types", "isExpanded": false }, { "title": "Equipment Quantity", "isExpanded": false }, { "title": "User Role based Settings", "isExpanded": false }, { "title": "Number Prefix", "isExpanded": false }];
    }
    SchedulingGeneralSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
    SchedulingGeneralSettingsComponent.prototype.ngOnInit = function () {
        var context = this;
        context.administrationService.CheckIsSiteLevelAdmin(5).subscribe(function (result) {
            context.isSiteAdmin = result == 1 ? true : false;
        });
        context.administrationService.getCustomerSubscribedFeatures("256,186,187,281,282,283,276").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"]; //281,282,283
            for (var i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 256:
                        context.iseqpresv = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 186:
                        context.isroomresv = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 187:
                        context.isseatresv = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 281:
                        context.iscatering = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 282:
                        context.isamenities = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 283:
                        context.isservice = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 276:
                        if (customerFeatureobj[i]["Value"] == "")
                            context.Drawinglabel = "Drawing Management";
                        else
                            context.Drawinglabel = customerFeatureobj[i]["Value"] + " Management";
                        break;
                }
            }
        });
    };
    SchedulingGeneralSettingsComponent = __decorate([
        core_1.Component({
            selector: 'general-settings',
            templateUrl: './app/Views/Scheduling/General Settings/general-settings.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, equipmentquantities_component_1.EquipmentQuantityComponent, amenities_component_1.AmenityComponent, equipmenttype_component_1.EquipmentTypeComponent, drawingmanagement_component_1.DrawingManagementComponent, resources_1.ResourceScheduling, services_component_1.ServiceComponent, catering_component_1.CateringComponent, define_worktypeList_1.DefineWorkTypeComponent, setworkflow_component_1.SetWorkflowComponent, UserRoleBasedSettings_component_1.UserRoleBasedSettingsComponent, numberformat_component_1.NumberFormat]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], SchedulingGeneralSettingsComponent);
    return SchedulingGeneralSettingsComponent;
}());
exports.SchedulingGeneralSettingsComponent = SchedulingGeneralSettingsComponent;
//# sourceMappingURL=general-settings.component.js.map
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
var trades_component_1 = require('./trades.component');
var contractors_list_component_1 = require('./contractors-list.component');
var technicians_list_component_1 = require('./technicians-list.component');
var manufacturers_list_component_1 = require('./manufacturers-list.component');
//import { SetWorkflowComponent } from '../../Common/Set Workflow/setworkflow.component';
//import { SetWorkflowMainComponent} from '../../common/set workflow/setworkflow-main.component';
var parts_list_component_1 = require('./parts-list.component');
//import { DefineWorkTypeComponent } from '../../Common/Define Work Type/define-worktypeList';
var tools_list_component_1 = require('./tools-list.component');
var priority_list_component_1 = require('./priority-list.component');
//import { WorkOrderAdditionalDataFieldsComponent } from '../Additional Data Fields/additional-datafields.component';
var holdReason_list_component_1 = require('./holdReason-list.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var workflow_component_1 = require('../../WorkOrder/Workflow/workflow.component');
var Listdeficiencycategories_1 = require('../../Objects/Deficiency/Listdeficiencycategories');
var deficiencies_list_1 = require('../../Objects/Deficiency/deficiencies-list');
var objectclasses_component_1 = require('../../objects/general settings/objectclasses.component');
var attributes_component_1 = require('../../objects/general settings/attributes.component');
var class_attributes_component_1 = require('../../objects/general settings/class-attributes.component');
var objectdata_list_component_1 = require('../../objects/data/objectdata-list.component');
//import { AdditionalCharges} from './additional-charges.component';
var numberformat_component_1 = require('../../common/number format/numberformat.component');
var WorkOrderGeneralSettingsComponent = (function () {
    function WorkOrderGeneralSettingsComponent(administrationService) {
        this.administrationService = administrationService;
        this.pageTitle = "General Settings";
        this.pagePath = "Settings / Work Order / General Settings";
        this.isMAdmin = false;
        this.isObject = false;
        this.isSiteAdmin = false;
        //sectionExpansionStatus = [{ "title": "Trades", "isExpanded": false }, { "title": "Technicians", "isExpanded": false }, { "title": "Contractors", "isExpanded": false }, { "title": "Manufacturers", "isExpanded": false }, { "title": "Parts", "isExpanded": false }, { "title": "Tools", "isExpanded": false }, { "title": "Priorities", "isExpanded": false }, { "title": "Reasons for Hold", "isExpanded": false }, { "title": "Define Work Types", "isExpanded": false }, { "title": "Set Workflow", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "Show Workflow", "isExpanded": false } ];
        this.sectionExpansionStatus = [{ "title": "Trades", "isExpanded": false },
            { "title": "Technicians", "isExpanded": false },
            { "title": "Contractors", "isExpanded": false },
            { "title": "Manufacturers", "isExpanded": false },
            { "title": "Parts", "isExpanded": false },
            { "title": "Tools", "isExpanded": false },
            { "title": "Priorities", "isExpanded": false },
            { "title": "Reasons for Hold", "isExpanded": false },
            { "title": "Asset Classes", "isExpanded": false },
            { "title": "Asset Common Attributes", "isExpanded": false },
            { "title": "Asset Class Attributes", "isExpanded": false },
            { "title": "Assets", "isExpanded": false },
            { "title": "Deficiency Categories", "isExpanded": false },
            { "title": "Deficiencies", "isExpanded": false },
            { "title": "Number Prefix", "isExpanded": false }];
    }
    WorkOrderGeneralSettingsComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            if (UserRoleId >= 4) {
                objContext.isMAdmin = true;
            }
        });
        objContext.administrationService.getAccessibleModuleForUser().subscribe(function (data) {
            data["Data"].filter(function (el) {
                if (el.ModuleId == 7 || el.ModuleId == 8 || el.ModuleId == 6
                    || el.ModuleId == 17 || el.ModuleId == 18 || el.ModuleId == 25
                    || el.ModuleId == 26 || el.ModuleId == 27 || el.ModuleId == 24) {
                    objContext.isObject = true;
                    return true;
                }
                else
                    return false;
            });
        });
        objContext.administrationService.CheckIsSiteLevelAdmin(5).subscribe(function (result) {
            objContext.isSiteAdmin = result == 1 ? true : false;
        });
    };
    WorkOrderGeneralSettingsComponent.prototype.onSectionExpandChange = function (obj) {
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
    WorkOrderGeneralSettingsComponent = __decorate([
        core_1.Component({
            selector: 'general-settings',
            templateUrl: './app/Views/WorkOrder/GeneralSettings/general-settings.component.html',
            directives: [section_component_1.SectionComponent, Listdeficiencycategories_1.ListDeficiencyCategoriesComponent, deficiencies_list_1.ListDeficiencyComponent, page_component_1.PageComponent, trades_component_1.Trades, contractors_list_component_1.ContractorsListComponent, technicians_list_component_1.TechniciansListComponent, manufacturers_list_component_1.ManufacturersListComponent, parts_list_component_1.PartsListComponent, tools_list_component_1.ToolsListComponent, priority_list_component_1.PriorityListComponent, holdReason_list_component_1.HoldReasonListComponent, workflow_component_1.WorkflowComponent, objectclasses_component_1.ObjectClassesComponent, attributes_component_1.AttributesComponent, class_attributes_component_1.ClassAttributesComponent, objectdata_list_component_1.ObjectDataListComponent, numberformat_component_1.NumberFormat]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], WorkOrderGeneralSettingsComponent);
    return WorkOrderGeneralSettingsComponent;
}());
exports.WorkOrderGeneralSettingsComponent = WorkOrderGeneralSettingsComponent;
//# sourceMappingURL=general-settings.component.js.map
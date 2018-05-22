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
var Master_PM_Schedules_list_component_1 = require('./Master-PM-Schedules-list.component');
var pmschedule_types_1 = require('./pmschedule-types');
var Routes_list_component_1 = require('./Routes-list.component');
var Procedures_list_component_1 = require('./Procedures-list.component');
var customreport_grid_component_1 = require('../../Common/Custom Reports/customreport-grid.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var assign_equipment_calendar_component_1 = require('./assign-equipment-calendar.component');
var MaintenanceComponent = (function () {
    //sectionExpansionStatus = [{ "title": "Procedures", "isExpanded": false }, { "title": "Routes", "isExpanded": false }, { "title": "PM Schedules", "isExpanded": false }, { "title": "Generate Work Orders", "isExpanded": false }];
    function MaintenanceComponent(administrationService) {
        this.administrationService = administrationService;
        this.pageTitle = "General Settings";
        this.pagePath = "Settings / Work Order / PM Settings";
        this.showCustomRptSection = false;
        this.sectionExpansionStatus = [{ "title": "Procedures", "isExpanded": false },
            { "title": "Routes", "isExpanded": false },
            { "title": "Assign Equipment Calendar", "isExpanded": false },
            { "title": "Master PM Schedules", "isExpanded": false },
            { "title": "PM Schedules", "isExpanded": false },
            { "title": "Custom Reports", "isExpanded": false }];
    }
    MaintenanceComponent.prototype.ngOnInit = function () {
        var context = this;
        this.administrationService.getCustomerSubscribedFeatures("28").subscribe(function (result) {
            if (result["Data"][0].IsSubscribed == true) {
                context.showCustomRptSection = true;
            }
            else {
                context.showCustomRptSection = false;
            }
        });
    };
    MaintenanceComponent.prototype.onSectionExpandChange = function (obj) {
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
    MaintenanceComponent = __decorate([
        core_1.Component({
            selector: 'general-settings',
            templateUrl: './app/Views/WorkOrder/Maintenance/maintenance.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent,
                Master_PM_Schedules_list_component_1.MasterPMSchedulesListComponent,
                pmschedule_types_1.PMScheduleTypesComponent, Routes_list_component_1.RoutesListComponent,
                Procedures_list_component_1.ProceduresListComponent, customreport_grid_component_1.CustomReportGridComponent,
                assign_equipment_calendar_component_1.AssignEquipmentCalendar]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService])
    ], MaintenanceComponent);
    return MaintenanceComponent;
}());
exports.MaintenanceComponent = MaintenanceComponent;
//# sourceMappingURL=maintenance.component.js.map
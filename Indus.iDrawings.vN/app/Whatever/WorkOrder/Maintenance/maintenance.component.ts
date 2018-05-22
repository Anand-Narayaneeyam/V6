import { Component } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { MasterPMSchedulesListComponent } from './Master-PM-Schedules-list.component';
import { PMScheduleTypesComponent } from './pmschedule-types';
import { RoutesListComponent } from './Routes-list.component';
import { ProceduresListComponent } from './Procedures-list.component';
import { CustomReportGridComponent} from '../../Common/Custom Reports/customreport-grid.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { AssignEquipmentCalendar } from './assign-equipment-calendar.component';

@Component({
    selector: 'general-settings',
    templateUrl: './app/Views/WorkOrder/Maintenance/maintenance.component.html',
    directives: [SectionComponent, PageComponent,
        MasterPMSchedulesListComponent,
        PMScheduleTypesComponent, RoutesListComponent,
        ProceduresListComponent, CustomReportGridComponent,
        AssignEquipmentCalendar]
})

export class MaintenanceComponent {
    pageTitle: string = "General Settings";
    pagePath = "Settings / Work Order / PM Settings";
    showCustomRptSection: boolean = false;
    sectionExpansionStatus =
       [{ "title": "Procedures", "isExpanded": false },
        { "title": "Routes", "isExpanded": false },
        { "title": "Assign Equipment Calendar", "isExpanded": false },
        { "title": "Master PM Schedules", "isExpanded": false },
        { "title": "PM Schedules", "isExpanded": false },
        { "title": "Custom Reports", "isExpanded": false }];
    //sectionExpansionStatus = [{ "title": "Procedures", "isExpanded": false }, { "title": "Routes", "isExpanded": false }, { "title": "PM Schedules", "isExpanded": false }, { "title": "Generate Work Orders", "isExpanded": false }];
    constructor(private administrationService: AdministrationService) {

    }

    ngOnInit(): void {
        var context = this;
        this.administrationService.getCustomerSubscribedFeatures("28").subscribe(function (result) {
            if (result["Data"][0].IsSubscribed == true) {
                context.showCustomRptSection = true;
            } else { context.showCustomRptSection = false; }
        });
    }

    onSectionExpandChange(obj) {
        for (var i = 0; i < this.sectionExpansionStatus.length; i++) {
            if (this.sectionExpansionStatus[i].title !== obj[1].title) {
                this.sectionExpansionStatus[i].isExpanded = false;
            } else {
                this.sectionExpansionStatus[i].isExpanded = true;
            }
        }
        var updatedData = new Array();/*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.sectionExpansionStatus);
        this.sectionExpansionStatus = updatedData;
    };
}
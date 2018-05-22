import { Component, OnInit, SimpleChange, OnChanges } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'workOrder-PMSettings-Help',
    templateUrl: './app/Views/Help/WorkOrder/workorder-PMSettings.html',
    directives: [SectionComponent, PageComponent]
})

export class WorkOrderPMSettingsHelpComponent implements OnInit {
    pageTitle: string = "PM Settings";
    pagePath: string;
    sectionExpansionStatus = [{ "title": "Procedures", "isExpanded": false }, { "title": "Routes", "isExpanded": false }, { "title": "Master PM Schedules", "isExpanded": false }, { "title": "PM Schedules", "isExpanded": false }];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Work Order / PM Settings";
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

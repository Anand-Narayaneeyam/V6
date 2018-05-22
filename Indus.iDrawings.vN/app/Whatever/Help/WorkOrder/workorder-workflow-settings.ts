import { Component, OnInit, SimpleChange, OnChanges } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'workOrder-workflowSettings-Help',
    templateUrl: './app/Views/Help/WorkOrder/workorder-workflow-settings.html',
    directives: [SectionComponent, PageComponent]
})

export class WorkOrderWorkflowSettingsHelpComponent implements OnInit {
    pageTitle: string = "Workflow Settings";
    pagePath: string;
    sectionExpansionStatus = [{ "title": "Define Work Types", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "Set Workflow", "isExpanded": false }];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Work Order / Workflow Settings";
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

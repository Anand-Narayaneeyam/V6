import { Component, OnInit, SimpleChange, OnChanges } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'workOrder-PMWorkOrder-Help',
    templateUrl: './app/Views/Help/WorkOrder/workorder-PMWorkOrder.html',
    directives: [SectionComponent, PageComponent]
})

export class WorkOrderPMWorkOrderHelpComponent implements OnInit {
    pageTitle: string = "PM Work Order";
    pagePath: string;
    sectionExpansionStatus = [{ "title": "Generate PM WOs", "isExpanded": false }, { "title": "PM WOs Generated", "isExpanded": false }];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Work Order / PM Work Order";
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

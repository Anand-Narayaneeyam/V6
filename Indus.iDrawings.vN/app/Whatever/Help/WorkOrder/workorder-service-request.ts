import { Component, OnInit, SimpleChange, OnChanges } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'workOrder-ServiceRequest-Help',
    templateUrl: './app/Views/Help/WorkOrder/workorder-service-request.html',
    directives: [SectionComponent, PageComponent]
})

export class WorkOrderServiceRequestHelpComponent implements OnInit {
    pageTitle: string = "Service Request";
    pagePath: string;
    sectionExpansionStatus = [{ "title": "Create Request", "isExpanded": false }, { "title": "My Requests", "isExpanded": false }];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Work Order / Service Request";
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

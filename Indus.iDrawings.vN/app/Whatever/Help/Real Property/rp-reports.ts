import { Component, OnInit, SimpleChange, OnChanges } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'realProperty-Reports-Help',
    templateUrl: './app/Views/Help/Real Property/rp-reports.html',
    directives: [SectionComponent, PageComponent]
})

export class RealPropertyReportsHelpComponent implements OnInit {
    pageTitle: string = "Reports";
    pagePath: string;
    sectionExpansionStatus = [{ "title": "Reports", "isExpanded": false }];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Real Property / Reports";
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

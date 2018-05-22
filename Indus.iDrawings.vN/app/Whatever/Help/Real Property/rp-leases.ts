import { Component, OnInit, SimpleChange, OnChanges } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'realProperty-Leases-Help',
    templateUrl: './app/Views/Help/Real Property/rp-leases.html',
    directives: [SectionComponent, PageComponent]
})

export class RealPropertyLeasesHelpComponent implements OnInit {
    pageTitle: string = "Leases";
    pagePath: string;
    sectionExpansionStatus = [{ "title": "Leases", "isExpanded": false }];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Real Property / Leases";
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

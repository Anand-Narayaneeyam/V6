import { Component, OnInit, SimpleChange, OnChanges } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'realProperty-generalSettings-Help',
    templateUrl: './app/Views/Help/Real Property/rp-general-settings.html',
    directives: [SectionComponent, PageComponent]
})

export class RealPropertyGeneralSettingsHelpComponent implements OnInit {
    pageTitle: string = "General Settings";
    pagePath: string;
    sectionExpansionStatus = [{ "title": "Landlords", "isExpanded": false }, { "title": "Tenants", "isExpanded": false }, { "title": "Contacts", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "Additional Charges", "isExpanded": false }, { "title": "Additional Charge Rates", "isExpanded": false }, { "title": "Agreement Clauses", "isExpanded": false }, { "title": "Custom Reports", "isExpanded": false }];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Real Property / General Settings";
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

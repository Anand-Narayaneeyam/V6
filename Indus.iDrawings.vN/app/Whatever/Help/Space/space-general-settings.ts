import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'spaceReports-Help',
    templateUrl: './app/Views/Help/Space/space-general-settings.html',
    directives: [SectionComponent, PageComponent]

})
export class SpacesGeneralSettingsHelpComponent implements OnInit {

    pageTitle: string = "General Settings";
    pagePath: string;
    isAdmin: boolean = false;
    enableGLAccount: boolean = false;
    sectionExpansionStatus = [{ "title": "Drawing Management", "isExpanded": false },
        { "title": "Area Options", "isExpanded": false },
        { "title": "Space Standards", "isExpanded": false },
        { "title": "Cost Categories", "isExpanded": false },
        { "title": "Cost Category Rates for Units", "isExpanded": false },
        { "title": "Additional Data Fields", "isExpanded": false },
        { "title": "Distribution Map Settings", "isExpanded": false },
        { "title": "Custom Reports", "isExpanded": false },
    ];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Space / General Settings";

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
        console.log("onSectionExpandChange", this.sectionExpansionStatus);
    };

}
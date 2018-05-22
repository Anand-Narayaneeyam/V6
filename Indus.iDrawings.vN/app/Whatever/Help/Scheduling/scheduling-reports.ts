import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'schedulingReports-Help',
    templateUrl: './app/Views/Help/Scheduling/scheduling-reports.html',
    directives: [SectionComponent, PageComponent]

})
export class SchedulingReportsHelpComponent implements OnInit {

    pageTitle: string = "Reports";
    pagePath: string;
    isAdmin: boolean = false;
    enableGLAccount: boolean = false;
    sectionExpansionStatus = [{ "title": "Team Room Reservation Details", "isExpanded": false }, { "title": "Team Room Reservation Details by User", "isExpanded": false }, { "title": "Team Room Reservation Summary Details", "isExpanded": false }, { "title": "Workspace Reservation Details", "isExpanded": false }, { "title": "User Reservation Details", "isExpanded": false }, { "title": "Cancelled Reservation Details", "isExpanded": false }];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Scheduling / Reports";

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

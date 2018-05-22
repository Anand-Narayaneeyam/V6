import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'Employee-SpacePlanning-Help',
    templateUrl: './app/Views/Help/Employee/employee-space-planning.html',
    directives: [SectionComponent, PageComponent]

})
export class EmployeeSpacePlanningHelpComponent implements OnInit {

    pageTitle: string = "Space Planning";
    pagePath: string;
    isAdmin: boolean = false;
    enableGLAccount: boolean = false;
    sectionExpansionStatus = [{ "title": "Space Planning Projects", "isExpanded": false },
        { "title": "Approved Stack Plans", "isExpanded": false },
        { "title": "Scenarios", "isExpanded": false },
        { "title": "Move Projects", "isExpanded": false },
        { "title": "Move Project Work Orders", "isExpanded": false }];

    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Employees / Space Planning";

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

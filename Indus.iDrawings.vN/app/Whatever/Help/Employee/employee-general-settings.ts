import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'Employee-Generalsettings-Help',
    templateUrl: './app/Views/Help/Employee/employee-general-settings.html',
    directives: [SectionComponent, PageComponent]

})
export class EmployeeGeneralSettingsHelpComponent implements OnInit {

    pageTitle: string = "General Settings";
    pagePath: string;
    isAdmin: boolean = false;
    enableGLAccount: boolean = false;
    sectionExpansionStatus = [{ "title": "Drawing Management", "isExpanded": false },
        { "title": "Job Titles", "isExpanded": false },
        { "title": "Grades", "isExpanded": false },
        { "title": "Additional Data Fields - Employees", "isExpanded": false },
        { "title": "Additional Data Fields - Move Projects", "isExpanded": false },
        { "title": "Custom Reports", "isExpanded": false }];

    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Employees / General Settings";

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

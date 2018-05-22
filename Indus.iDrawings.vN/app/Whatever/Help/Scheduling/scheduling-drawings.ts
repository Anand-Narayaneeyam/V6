import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'schedulingDrawings-Help',
    templateUrl: './app/Views/Help/Scheduling/scheduling-drawings.html',
    directives: [SectionComponent, PageComponent]

})
export class SchedulingDrawingsHelpComponent implements OnInit {

    pageTitle: string = "Drawings";
    pagePath: string;
    isAdmin: boolean = false;
    enableGLAccount: boolean = false;
    sectionExpansionStatus = [{ "title": "Drawings", "isExpanded": false }];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Scheduling / Drawings";

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

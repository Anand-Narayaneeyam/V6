import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'spaceTrendAnalysis-Help',
    templateUrl: './app/Views/Help/Space/space-trendAnalysis.html',
    directives: [SectionComponent, PageComponent]

})
export class SpacesTrendAnalysisHelpComponent implements OnInit {

    pageTitle: string = "Trend Analysis";
    pagePath: string;
    isAdmin: boolean = false;
    enableGLAccount: boolean = false;
    sectionExpansionStatus = [{ "title": "Trend Analysis", "isExpanded": false }];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Space / Trend Analysis";

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

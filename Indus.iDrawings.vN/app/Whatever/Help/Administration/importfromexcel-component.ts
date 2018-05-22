import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'import-from-Excel-Help',
    templateUrl: './app/Views/Help/Administration/importfromexcel-component.html',
    directives: [SectionComponent, PageComponent]

})
export class ImportfromExcelsHelpComponent implements OnInit {

    pageTitle: string = "Import from Excel";
    pagePath: string;
    isAdmin: boolean = false;
    enableGLAccount: boolean = false;
    sectionExpansionStatus = [{ "title": "Import from Excel - Space Data", "isExpanded": false }, { "title": "Import from Excel - Employee Data", "isExpanded": false }, { "title": "Import from Excel - Asset Data", "isExpanded": false }, { "title": "Import from Excel - Furniture Data", "isExpanded": false }];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Administration / Import from Excel";
   
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
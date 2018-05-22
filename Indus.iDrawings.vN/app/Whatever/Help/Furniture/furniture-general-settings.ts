import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'Furniture-Generalsettings-Help',
    templateUrl: './app/Views/Help/Furniture/furniture-general-settings.html',
    directives: [SectionComponent, PageComponent]

})
export class FurnitureGeneralSettingsHelpComponent implements OnInit {

    pageTitle: string = "General Settings";
    pagePath: string;
    isAdmin: boolean = false;
    enableGLAccount: boolean = false;
    sectionExpansionStatus = [{ "title": "Drawing Management", "isExpanded": false },
        { "title": "Furniture Classes", "isExpanded": false },
        { "title": "Common Attributes", "isExpanded": false },
        { "title": "Class Attributes", "isExpanded": false },
        { "title": "Custom Reports", "isExpanded": false }];

    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Furniture / General Settings";

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
﻿import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'Assets-Data-Help',
    templateUrl: './app/Views/Help/Assets/assets-data.html',
    directives: [SectionComponent, PageComponent]

})
export class AssetsDataHelpComponent implements OnInit {

    pageTitle: string = "Data";
    pagePath: string;
    isAdmin: boolean = false;
    enableGLAccount: boolean = false;
    sectionExpansionStatus = [{ "title": "All", "isExpanded": false }, { "title": "Operational", "isExpanded": false }, { "title": "Warehoused", "isExpanded": false }];
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Assets / Data";

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
import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { DashBoardConfigurationComponent } from '../../../Whatever/ExecutiveSummary/GeneralSettings/dashboardconfiguration.component';

@Component({
    selector: 'general-settings',
    templateUrl: './app/Views/ExecutiveSummary/GeneralSettings/generalsettings.component.html',
    directives: [SectionComponent, PageComponent, DashBoardConfigurationComponent]
})

export class EXSummaryGeneralSettingsComponent implements OnInit {
    pageTitle: string = "General Settings";
    pagePath: string;
    sectionExpansionStatus = [{ "title": "Dashboard Configuration", "isExpanded": false }];

    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Settings / Executive Summary / General Settings";
        if (objContext.sectionExpansionStatus.length == 1)
        {
            this.sectionExpansionStatus[0].isExpanded = true;
        }
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
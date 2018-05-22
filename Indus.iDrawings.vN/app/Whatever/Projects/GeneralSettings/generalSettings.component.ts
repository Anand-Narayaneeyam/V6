/// <reference path="projecttypelist.component.ts" />
import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {ProjectTypeListComponent} from './projecttypelist.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {AdditionalDataFieldsComponent} from '../../common/additional data fields/additional-datafields.component'
import { CustomReportGridComponent} from '../../Common/Custom Reports/customreport-grid.component';


@Component({
    selector: 'projects-general-settings',
    templateUrl: './app/Views/Projects/GeneralSettings/generalSettings.component.html',
    directives: [SectionComponent, PageComponent, ProjectTypeListComponent, AdditionalDataFieldsComponent, CustomReportGridComponent],
    providers: [AdministrationService]
})


export class ProjectsGeneralSettingsComponent {
    pageTitle: string = "General Settings";
    showCustomRptSection: boolean = false;
    pagePath: string;
    isSiteAdmin: boolean = false; 
    userRoleId: any
    sectionExpansionStatus = [{ "title": "Project Types", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "Custom Reports", "isExpanded": false }
    ];

    constructor(private administrationService: AdministrationService) {
    }

    ngOnInit() {
        var contextObj = this;
        this.pagePath = "Settings / Projects / General Settings";
        this.administrationService.CheckIsSiteLevelAdmin(0).subscribe(function (result) {
            contextObj.isSiteAdmin = result == 1 ? true : false;
        });
        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.userRoleId = retData["UserRoleId"];
        });

        contextObj.administrationService.getCustomerSubscribedFeatures("28").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            for (let i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {                   
                    case 28:
                        contextObj.showCustomRptSection = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }
        });
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
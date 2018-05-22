import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'general-settings',
    templateUrl: './app/Views/Help/Administration/adm-general-setting-component.html',
    directives: [SectionComponent, PageComponent]

})
export class GeneralSettingsHelpComponent implements OnInit {

    pageTitle: string = "General Settings-Help";
    pagePath: string;
    isAdmin: boolean = false;
    enableGLAccount: boolean = false;
    sectionExpansionStatus = [{ "title": "Password Policy", "isExpanded": false }, { "title": "Customer Support", "isExpanded": false }, { "title": "Organizational Structure", "isExpanded": false }, { "title": "Attachment Categories", "isExpanded": false }, { "title": "Mail Domains", "isExpanded": false },
        { "title": "Report Setup", "isExpanded": false }, { "title": "Contact Details & Logo", "isExpanded": false }, { "title": "Organizational Units", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "GL Accounts", "isExpanded": false }, { "title": "User Groups", "isExpanded": false }];
    constructor(private administrationService: AdministrationService) {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Administration / General Settings";
        objContext.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            if (UserRoleId <= 2) {
                objContext.isAdmin = true;
            }
        });

        objContext.administrationService.getCustomerSubscribedFeaturesGL("74").subscribe(function (rt) {
            if (rt.Data[0]["IsSubscribed"] == true && rt.Data[0]["FeatureLookupId"] == "18" && rt.Data[0]["Id"] == 74) {
                objContext.enableGLAccount = true;
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
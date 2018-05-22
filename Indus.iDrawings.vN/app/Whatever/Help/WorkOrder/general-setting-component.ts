import { Component, OnInit, SimpleChange, OnChanges } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';


@Component({
    selector: 'general-settings',
    templateUrl: './app/Views/Help/WorkOrder/general-setting-component.html',
    directives: [SectionComponent, PageComponent]
})

export class WorkOrderHelpGeneralSettingsComponent implements OnInit {
    pageTitle: string = "General Settings";
    pagePath = "Help / Work Order / General Settings";
    isMAdmin: boolean = false;
    sectionExpansionStatus = [{ "title": "Trades", "isExpanded": false }, { "title": "Technicians", "isExpanded": false }, { "title": "Contractors", "isExpanded": false }, { "title": "Manufacturers", "isExpanded": false }, { "title": "Parts", "isExpanded": false }, { "title": "Tools", "isExpanded": false }, { "title": "Priorities", "isExpanded": false }, { "title": "Reasons for Hold", "isExpanded": false }];
    constructor(private administrationService: AdministrationService) {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            if (UserRoleId >= 4) {
                objContext.isMAdmin = true;
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
    };
}

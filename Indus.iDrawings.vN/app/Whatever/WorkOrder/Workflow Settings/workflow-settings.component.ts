import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { DefineWorkTypeComponent } from '../../Common/Define Work Type/define-worktypeList';
import { WorkOrderAdditionalDataFieldsComponent } from '../Additional Data Fields/additional-datafields.component';
import { SetWorkflowMainComponent} from '../../common/set workflow/setworkflow-main.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {SetWorktypeSpacefield}from './set-workflowtype-spacefields'
import {AssignWorkTypeToSite} from './assignworktype-tosite.component'

@Component({
    selector: 'workflow-settings',
    templateUrl: './app/Views/WorkOrder/Workflow Settings/workflow-settings.component.html',
    directives: [SectionComponent, SetWorktypeSpacefield, PageComponent, DefineWorkTypeComponent, WorkOrderAdditionalDataFieldsComponent, SetWorkflowMainComponent, AssignWorkTypeToSite]
})

export class WorkflowSettingsComponent implements OnInit {
    pageTitle: string = "Workflow Settings";
    pagePath = "Settings / Work Order / Workflow Settings";
    isMAdmin: boolean = false;
    isSiteAdmin: boolean = true;
    isWorkflowWithSiteEnabled: boolean = false;
    userRoleId: any;
    isSpaceEnabled: boolean = false;
    sectionExpansionStatus = [{ "title": "Define Work Types", "isExpanded": false }, { "title": "Assign Work Types to Site", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "Set Work Type Space Fields", "isExpanded": false }, { "title": "Set Workflow", "isExpanded": false }];
    constructor(private administrationService: AdministrationService) {

    }
    ngOnInit(): void {
        var objContext = this
        objContext.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            objContext.userRoleId = retData["UserRoleId"];
        });
        objContext.administrationService.CheckIsSiteLevelAdmin(9).subscribe(function (result) {
            objContext.isSiteAdmin = result == 1 ? true : false;
        });
        objContext.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            if (UserRoleId >= 4) {
                objContext.isMAdmin = true;
            }
        });
        objContext.administrationService.getCustomerSubscribedFeatures("255").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            if (customerFeatureobj)
                objContext.isWorkflowWithSiteEnabled = customerFeatureobj[0]["IsSubscribed"];
        });
        objContext.administrationService.getAccessibleModuleForUser().subscribe(function (Data) {
            debugger
            var accesibleModules = Data["Data"];
            var SpaceEnabled = [];
            SpaceEnabled = accesibleModules.filter(function (item) { return item.ModuleId === 3 });
            if (SpaceEnabled.length != 0) {
                objContext.isSpaceEnabled = true;
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

import { Component, OnInit } from '@angular/core';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { DefineWorkTypeComponent } from '../../Common/Define Work Type/define-worktypeList';
import { SetWorkflowComponent } from '../../Common/Set Workflow/setworkflow.component';

@Component({
    selector: 'employee-workflowsettings',
    templateUrl: './app/Views/Employee/Workflow Settings/workflow-settings.component.html',
    directives: [SectionComponent, PageComponent, DefineWorkTypeComponent, SetWorkflowComponent]
})

export class EmployeeWorkflowSettingsComponent {
    pagePath = "Settings / Employees / Workflow Settings";
    pageTitle: string = "Workflow Settings";
    isAdmin: boolean = false;
    isSiteAdmin: boolean = true;
    isSpacePlanEnabled: boolean = false;
    isEmployeeMoveEnabled: boolean = false;
    isEmployeeAssignEnabled: boolean = false;
    showCustomRptSection: boolean = false;
    sectionExpansionStatus = [{ "title": "Define Work Types", "isExpanded": false }, { "title": "Set Workflow", "isExpanded": false }];

    constructor(private administrationService: AdministrationService) {

    }
    ngOnInit(): void {
        var objContext = this;

        objContext.administrationService.getCustomerSubscribedFeatures("47,28,190, 192").subscribe(function (rt) {

            var customerFeatureobj = rt["Data"];
            for (let i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 47:
                        objContext.isSpacePlanEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 28:
                        objContext.showCustomRptSection = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 190:
                        objContext.isEmployeeMoveEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 192:
                        objContext.isEmployeeAssignEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }

        });
        objContext.administrationService.CheckIsSiteLevelAdmin(5).subscribe(function (result) {
            objContext.isSiteAdmin = result == 1 ? true : false;
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
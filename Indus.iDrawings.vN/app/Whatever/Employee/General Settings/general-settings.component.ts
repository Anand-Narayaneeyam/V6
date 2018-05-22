
import {Component, OnInit} from '@angular/core';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { UserDrawingsAccessComponent } from '../../Common/DrawingDetails/userdrawingsaccess.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { OptionalFieldComponent } from './optionalfields.component';
import { AdditionalDataFieldsComponent } from '../../Common/Additional Data Fields/additional-datafields.component';
import { JobTitleComponent } from './jobtitle.component';
import { GradesComponent } from './grades.component';
import { EmployeeToWorkOrderUserComponent } from './employee-to-workOrderUser';
import {DrawingManagementComponent } from '../../Common/DrawingManagement/drawingmanagement.component';
import { CustomReportGridComponent} from '../../Common/Custom Reports/customreport-grid.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { ColorPreferenceComponent } from '../../Common/ColorPreference/color-preference-component';
import { DefaultDisplayLayerComponent } from '../../Common/DefaultDisplayLayer/default-display-layer-component';
import { spacetypesComponent } from './spaceTypes';
import { SpaceAllocationRules } from './spaceallocationrules.component';


//import { DefineWorkTypeComponent } from '../../Common/Define Work Type/define-worktypeList';
//import { SetWorkflowComponent } from '../../Common/Set Workflow/setworkflow.component';

@Component({
    selector: 'empGeneralSettings',
    templateUrl: './app/Views/Employee/General Settings/general-settings.component.html',
    directives: [SectionComponent, DrawingManagementComponent, UserDrawingsAccessComponent, PageComponent, OptionalFieldComponent,
        AdditionalDataFieldsComponent, JobTitleComponent, SpaceAllocationRules,
        GradesComponent, CustomReportGridComponent, ColorPreferenceComponent, DefaultDisplayLayerComponent, spacetypesComponent, EmployeeToWorkOrderUserComponent]
})

export class EmpGeneralSettingsComponent {
    pagePath = "Settings / Employees / General Settings";
    pageTitle: string = "General Settings";
    isAdmin: boolean = false;
    isSpacePlanEnabled: boolean = false;
    isSpaceAllocationRule: boolean = false;
    showCustomRptSection: boolean = false;
    showEmployeeToWOUser: boolean = false;
    isWOUserEnabled: boolean = false;
    isSiteAdmin: boolean = false;
    userRoleId: any;

    sectionExpansionStatus = [{ "title": "Drawing Management", "isExpanded": false },
        { "title": "Job Titles", "isExpanded": false },
        { "title": "Grades", "isExpanded": false },
        { "title": "Additional Data Fields (Employee)", "isExpanded": false },
        { "title": "Additional Data Fields (Move Projects)", "isExpanded": false },
        { "title": "Employee to Work Order User", "isExpanded": false },
        { "title": "Custom Reports", "isExpanded": false },
        { "title": "Color Preferences", "isExpanded": false }, { "title": "Default Display Layers", "isExpanded": false },
        { "title": "Space Type", "isExpanded": false },
        { "title": "Space Allocation Rules", "isExpanded": false },
        { "title": "Optional Fields", "isExpanded": false }];

   
    constructor(private administrationService: AdministrationService) {

    }
    ngOnInit(): void {
        var objContext = this;
        debugger
       // objContext.administrationService.getSessionData().subscribe(function (data) {
        //    var retData = data["Data"];
        //    var UserRoleId = retData["UserRoleId"];
        //    if (UserRoleId <= 2) {
        //        objContext.isAdmin = true;
        //    }
        //});
        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            objContext.userRoleId = retData["UserRoleId"];
        });

        objContext.administrationService.getCustomerSubscribedFeatures("47,28,122,101").subscribe(function (rt) {
          
            var customerFeatureobj = rt["Data"];
            for (let i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 47:                     
                        objContext.isSpacePlanEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 28:
                        objContext.showCustomRptSection = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 122:
                        objContext.showEmployeeToWOUser = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 101:
                        objContext.isWOUserEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 15:
                        objContext.isSpaceAllocationRule = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }

        });


        objContext.administrationService.CheckIsSiteLevelAdmin(5).subscribe(function (result) {
            objContext.isSiteAdmin = result == 1 ? true : false;
            //var customerFeatureobj = rt["Data"];
            //for (let i = 0; i < customerFeatureobj.length; i++) {
            //    switch (customerFeatureobj[i]["Id"]) {
            //        case 47:

            //            objContext.isSpacePlanEnabled = customerFeatureobj[i]["IsSubscribed"];
            //            break;
            //        case 28:
            //            objContext.showCustomRptSection = customerFeatureobj[i]["IsSubscribed"];
            //            break;
            //    }
            //}

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
import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {PasswordPolicyComponent} from './password-policy.component';
import {CustomerSupportComponent} from './customer-support.component';
import {OrganizationalStructureComponent} from './organizational-structure.component';
import {AttachmentCategoryComponent} from './attachment-categories.component';
import {MailDomainComponent} from './mail-domain.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {ContactDetailsComponent} from './contact-details.component';
import {OrganizationalUnitsComponent} from './organizational-units.component';
import {ReportSetupComponent} from './report-setup.component';
import {AdditionalDataFieldsComponent} from '../../common/additional data fields/additional-datafields.component'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {GLAccountsComponent} from './gl-accounts.component';
import {UserGroupsComponent} from './../User Groups/user-groups.component';
import {ScheduledReportComponent} from './scheduled-report-component';
import {ManageReportsComponent} from './manage-reports-component';
import {MessageTemplatesComponent} from './messagetemplates.component';
import {DynamicCalendarComponent} from './dynamicCalendar.component';
import { BuildingConditionComponent } from './building-condition.component';
import { SeasonsComponent} from './seasons.component';
import { ContactsListComponent } from '../../RealProperty/GeneralSettings/contacts-list.component';
import { ClientsListComponent } from './client-list-component';
import { NumberFormat} from '../../common/number format/numberformat.component';

@Component({
    selector: 'general-settings',
    templateUrl: './app/Views/Administration/General Settings/general-settings.component.html',
    directives: [SectionComponent, AdditionalDataFieldsComponent, PageComponent, PasswordPolicyComponent, CustomerSupportComponent, OrganizationalStructureComponent,
        AttachmentCategoryComponent, MailDomainComponent, ContactDetailsComponent, OrganizationalUnitsComponent, ReportSetupComponent, GLAccountsComponent,
        UserGroupsComponent, ScheduledReportComponent, ManageReportsComponent, MessageTemplatesComponent, BuildingConditionComponent, DynamicCalendarComponent, SeasonsComponent,
        ContactsListComponent, ClientsListComponent, NumberFormat]
 
})
export class GeneralSettingsComponent implements OnInit{

    pageTitle: string = "General Settings";
    pagePath: string;
    isAdmin:boolean= false;
    enableGLAccount: boolean = false;
    isSiteAdmin: boolean = false; 
    isMailDomain: boolean = false;
    isScheduleReport: boolean = false;
    isRealPropModEnabled: boolean = false;
    sectionExpansionStatus = [{ "title": "Password Policy", "isExpanded": false }, { "title": "Customer Support", "isExpanded": false }, { "title": "Organizational Structure", "isExpanded": false }, { "title": "Attachment Categories", "isExpanded": false }, { "title": "Mail Domains", "isExpanded": false },
        { "title": "Report Setup", "isExpanded": false }, { "title": "Contact Details & Logo", "isExpanded": false }, { "title": "Organizational Units", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "GL Accounts", "isExpanded": false }, { "title": "User Groups", "isExpanded": false },
        { "title": "Scheduled Reports", "isExpanded": false }, { "title": "Manage Scheduled Reports", "isExpanded": false }, { "title": "Message Templates", "isExpanded": false },
        { "title": "Seasons", "isExpanded": false },
        { "title": "Building Conditions", "isExpanded": false }, { "title": "Calendars", "isExpanded": false },
        { "title": "Clients", "isExpanded": false }, { "title": "Contacts", "isExpanded": false },
        { "title": "Prefix", "isExpanded": false }
    ];
    constructor(private administrationService: AdministrationService) {
      
    }
    ngOnInit(): void {


        var objContext = this;

        objContext.pagePath = "Settings / Administration / General Settings";
        objContext.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];         
            var UserRoleId = retData["UserRoleId"];
            if (UserRoleId <= 2)
            {
                objContext.isAdmin = true;
            }
        });

        objContext.administrationService.getCustomerSubscribedFeaturesGL("74").subscribe(function (rt) {
            if (rt.Data[0]["IsSubscribed"] == true && rt.Data[0]["FeatureLookupId"] == "18" && rt.Data[0]["Id"] == 74)
            {
                objContext.enableGLAccount = true;
            }                
        });  

        objContext.administrationService.getCustomerSubscribedFeatures("214").subscribe(function (rt) {
            if (rt.Data[0]["IsSubscribed"] == true && rt.Data[0]["Id"] == 214) {
                objContext.isMailDomain = true;
            }
        });  

        objContext.administrationService.CheckIsSiteLevelAdmin(0).subscribe(function (result) {
            objContext.isSiteAdmin = result == 1 ? true : false;

        });
        objContext.administrationService.getCustomerSubscribedFeatures("205").subscribe(function (rt) {
            if (rt.Data[0]["IsSubscribed"] == true && rt.Data[0]["Id"] == 205) {
                objContext.isScheduleReport = true;
            }
        }); 

        objContext.IsRealPropertyEnabled();
    }

    IsRealPropertyEnabled() {
        var context = this;
        context.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
            var modCheck = resultData.Data.find(function (item) {
                return item.ModuleId == 30;
            });
            if (modCheck != undefined) {
                if (modCheck.ModuleId == 30) { context.isRealPropModEnabled = true; }
                else { context.isRealPropModEnabled = true; }
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
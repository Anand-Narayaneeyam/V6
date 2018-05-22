import { Component, OnInit } from '@angular/core';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { CustomerSpaceSettingsComponent } from './customer-space-settings.component';
import {CustomerCommonSettingsComponent} from './customer-common-settings.component';
import {CustomerObjectSettingsComponent} from './customer-object-settings.component';
import {CustomerSchedulingSettingsComponent} from './customer-Scheduling-settings.component';
import {CustomerEmployeeSettingsComponent} from './customer-employee-settings.component';
import {CustomerWorkorderSettingsComponent} from './customer-workorder-settings.component';
import {CustomerDocumentSettingsComponent} from './customer-document-settings.component';
@Component({
    selector: 'customer-settings-main',
    templateUrl: 'app/Views/Administration/CustomerSettings/customer-settings-main.component.html',
    directives: [SectionComponent, PageComponent, CustomerSpaceSettingsComponent, CustomerCommonSettingsComponent,
        CustomerObjectSettingsComponent, CustomerSchedulingSettingsComponent, CustomerEmployeeSettingsComponent,
        CustomerWorkorderSettingsComponent, CustomerDocumentSettingsComponent]    
})
export class CustomerSettingsMainComponent implements OnInit {
    
    //pageTitle: string = "General Settings";
    pagePath: string;
    sectionExpansionStatus = [{ "title": "Administration", "isExpanded": false }, 
        { "title": "As Builts", "isExpanded": false },
        { "title": "Projects", "isExpanded": false },
        { "title": "Space", "isExpanded": false },
        { "title": "Documents", "isExpanded": false },
        { "title": "Scheduling", "isExpanded": false },
        { "title": "Employees", "isExpanded": false },
        { "title": "Telecom", "isExpanded": false },        
        { "title": "Assets", "isExpanded": false },
        { "title": "Furniture", "isExpanded": false },
        { "title": "Work Order", "isExpanded": false },
        { "title": "Executive Summary", "isExpanded": false },
        { "title": "CAI Space Driver", "isExpanded": false },
        { "title": "Conditions", "isExpanded": false },
        { "title": "Electrical", "isExpanded": false },
        { "title": "Fire and Safety", "isExpanded": false }, 
        { "title": "Mechanical", "isExpanded": false },   
        { "title": "Plumbing", "isExpanded": false },
        { "title": "Medical Gas", "isExpanded": false },
        { "title": "Security Assets", "isExpanded": false },                
        { "title": "Real Property Management", "isExpanded": false }];

    // constructor(private administrationService: AdministrationService) {}

    ngOnInit() {
        var objContext = this;
         objContext.pagePath = "Settings / Administration /  Customer Settings";
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

    }

}
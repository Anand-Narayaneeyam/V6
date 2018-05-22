import { Component } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { LandlordsComponent } from './landloards-tenants-list.component';
import { ContactsListComponent } from './contacts-list.component';
import { AdditionalDataFieldsComponent } from '../../Common/Additional Data Fields/additional-datafields.component';
import { AdditionalChargeRates} from './additional-charge-rates.component';
import { AgreementClausesComponent } from './agreement-clauses';
import { Additionalcharges} from './additional-charges.component';
import { CustomReportGridComponent} from '../../Common/Custom Reports/customreport-grid.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'general-settings',
    templateUrl: './app/Views/RealProperty/GeneralSettings/general-settings.component.html',
    directives: [SectionComponent, PageComponent, LandlordsComponent, AdditionalDataFieldsComponent, AdditionalChargeRates, AgreementClausesComponent, ContactsListComponent, Additionalcharges, CustomReportGridComponent]
})

export class RealPropertyGeneralSettingsComponent
{    
    pageTitle: string = "General Settings";
    pagePath: string = "Settings / Real Property / General Settings";
    showCustomRptSection: boolean = false;
    sectionExpansionStatus = [{ "title": "Landlords", "isExpanded": false },
        { "title": "Tenants", "isExpanded": false },
        { "title": "Contacts", "isExpanded": false },
        { "title": "Additional Data Fields", "isExpanded": false },
        { "title": "Additional  Charges", "isExpanded": false },
        { "title": "Additional Charge Rates", "isExpanded": false },
        { "title": "Agreement Clauses", "isExpanded": false },
        { "title": "Custom Reports", "isExpanded": false }];



    constructor(private administrationService: AdministrationService) {

    }
    ngOnInit(): void {
        var context = this;
        this.administrationService.getCustomerSubscribedFeatures("28").subscribe(function (result) {
            if (result["Data"][0].IsSubscribed == true) {
                context.showCustomRptSection = true;
            } else { context.showCustomRptSection = false; }
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
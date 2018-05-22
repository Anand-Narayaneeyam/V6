﻿import { Component } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { ObjectClassesComponent } from '../general settings/objectclasses.component';
import { DrawingManagementComponent } from '../../Common/DrawingManagement/drawingmanagement.component';
import { AttributesComponent } from '../general settings/attributes.component';
import { ClassAttributesComponent } from '../general settings/class-attributes.component';
import { CustomReportGridComponent} from '../../Common/Custom Reports/customreport-grid.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { ConnectionRelationships } from '../Connectivity/connection-relationship.component';
import { ListDeficiencyCategoriesComponent } from '../../Objects/Deficiency/Listdeficiencycategories';
import { ListDeficiencyComponent } from '../../Objects/Deficiency/deficiencies-list';
import { ConnectivityRules } from '../Connectivity/connectivity-rules.component';
import { ColorPreferenceComponent } from '../../Common/ColorPreference/color-preference-component';
import { DefaultDisplayLayerComponent } from '../../Common/DefaultDisplayLayer/default-display-layer-component';
import { CreateSymbolComponent  } from '../../../Framework/Whatever/CreateSymbol/createsymbol.component';

@Component({
    selector: 'securityassets-general-settings',
    templateUrl: './app/Views/Objects/Security Assets/general-settings.component.html',
    directives: [SectionComponent, PageComponent,
        ObjectClassesComponent, DrawingManagementComponent,
        AttributesComponent,
        ClassAttributesComponent,
        CustomReportGridComponent,
        ConnectionRelationships, ListDeficiencyCategoriesComponent,
        ListDeficiencyComponent, ConnectivityRules, ColorPreferenceComponent,
        DefaultDisplayLayerComponent,
        CreateSymbolComponent]
})

export class SecurityAssetsGeneralSettingsComponent {
    pagePath = "Settings / Security Assets / General Settings "
    pageTitle: string = "General Settings";
    showCustomRptSection: boolean = false;
    showSymbolSection: boolean = false;
    isSiteAdmin: boolean = false;
    userRoleId: any;
    sectionExpansionStatus = [{ "title": "Drawing Management", "isExpanded": false },
        { "title": "Equipment Types", "isExpanded": false },
        { "title": "Common Attributes", "isExpanded": false },
        { "title": "Equipment Type Attributes", "isExpanded": false },
        { "title": "Equipment Type Symbol", "isExpanded": false },
        { "title": "Connection Relationships", "isExpanded": false },
        { "title": "Connectivity Rules", "isExpanded": false },
        { "title": "Deficiency Categories", "isExpanded": false },
        { "title": "Deficiencies", "isExpanded": false },
        { "title": "Color Preferences", "isExpanded": false },
        { "title": "Default Display Layers", "isExpanded": false },
        { "title": "Custom Reports", "isExpanded": false }];


    constructor(private administrationService: AdministrationService) {

    }
    ngOnInit(): void {
        var context = this;

        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            context.userRoleId = retData["UserRoleId"];
        });

        context.administrationService.getCustomerSubscribedFeatures("223,28").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            for (let i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 223:
                        context.showSymbolSection = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 28:
                        context.showCustomRptSection = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }
        });

        context.administrationService.CheckIsSiteLevelAdmin(5).subscribe(function (result) {
            context.isSiteAdmin = result == 1 ? true : false;
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
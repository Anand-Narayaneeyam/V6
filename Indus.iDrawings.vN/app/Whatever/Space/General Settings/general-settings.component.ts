import { Component,OnInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { UserDrawingsAccessComponent } from '../../Common/DrawingDetails/userdrawingsaccess.component';
import { SpaceFunctionsComponent } from './space-functions.component';
import { SpaceStandardComponent } from './spacestandard.component';
import { DistributionMapSettingsComponent} from '../../Common/DistributionMapSettings/distributionmapsettings.component';
import { CustomReportGridComponent} from '../../Common/Custom Reports/customreport-grid.component';
import { MandatoryLayerComponent } from './mandatory-layer.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { AreaOptionsComponent } from './area-options.component';
import { AdditionalDataFieldsComponent } from '../../Common/Additional Data Fields/additional-datafields.component';
import { DrawingManagementComponent } from '../../Common/DrawingManagement/drawingmanagement.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { CostCategories} from './Cost-Categories.component';
import { CostCategoryRateUnits } from './cost-category-rates-for-units';
import { ColorPreferenceComponent } from '../../Common/ColorPreference/color-preference-component';
import { DefaultDisplayLayerComponent } from '../../Common/DefaultDisplayLayer/default-display-layer-component';



@Component({
    selector: 'space-general-settings',
    templateUrl: './app/Views/Space/General Settings/general-settings.component.html',
    directives: [SectionComponent, UserDrawingsAccessComponent, SpaceFunctionsComponent, SpaceStandardComponent,
        AreaOptionsComponent, PageComponent, MandatoryLayerComponent, AdditionalDataFieldsComponent, DistributionMapSettingsComponent, DrawingManagementComponent, CustomReportGridComponent, CostCategories, CostCategoryRateUnits, ColorPreferenceComponent, DefaultDisplayLayerComponent]
})

export class SpaceGeneralSettingsComponent {
    pagePath ="Settings / Space / General Settings "
    pageTitle: string = "General Settings";
    showSpaceStandared = false;
    showCustomRptSection: boolean = false;
    showCostCategory: boolean = false;
    showSpaceFunction: boolean = false;
    isSiteAdmin: boolean = false;
    userRoleId: any;
    spaceFunText = "Space Function";
    sectionExpansionStatus = [{ "title": "Drawing Management", "isExpanded": false },
                                { "title": "Area Options", "isExpanded": false },
                                { "title":"Space Function", "isExpanded": false },
                                { "title": "Space Standards", "isExpanded": false },
                              //{ "title": "Mandatory Layers", "isExpanded": false },
                                { "title": "Cost Categories", "isExpanded": false },
                                { "title": "Cost Category Rates for Units", "isExpanded": false },
                                { "title": "Additional Data Fields", "isExpanded": false },
                                { "title": "Distribution Map Settings", "isExpanded": false },
                                { "title": "Color Preferences", "isExpanded": false },
                                { "title": "Custom Reports", "isExpanded": false },
                                { "title": "Default Display Layers", "isExpanded": false }                              
                             ];

    constructor(private administrationService: AdministrationService) {

    }
    ngOnInit() {
        var context = this;
        var index = 0;

        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            context.userRoleId = retData["UserRoleId"];
        });
      
        this.administrationService.getSpaceFunctionCustomizedName().subscribe(function (resultData) {          
            if (resultData.Data != undefined) {
                context.sectionExpansionStatus[2].title = resultData.Data;
                if (resultData.Data == "Space Functions") {
                    context.spaceFunText = "Space Function";
                } else {
                    context.spaceFunText = resultData.Data;
                }                             
            } 
        });
        this.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
          
            resultData["Data"].filter(function (item){
                if (item.ModuleName == "Employees" || item.ModuleName == "Scheduling") {
                    context.showSpaceStandared = true;
                 
                }
            });
           
         
        });
        this.administrationService.getCustomerSubscribedFeatures("28,5").subscribe(function (result) {
            if (result["Data"][0].IsSubscribed == true) {
                context.showCustomRptSection = true;
            } else { context.showCustomRptSection = false; }
            if (result["Data"][1].IsSubscribed == true) {
                context.showSpaceFunction = true;
            } else { context.showSpaceFunction = false; }
        });
        console.log(context.showSpaceStandared);

        context.administrationService.CheckIsSiteLevelAdmin(3).subscribe(function (result) {
            context.isSiteAdmin = result == 1 ? true : false;
        });
        this.administrationService.getCustomerSubscribedFeatures("6").subscribe(function (result) {
            
            if (result["Data"][0].IsSubscribed == true) {
                context.showCostCategory = true;
            } else
            {
                context.showCostCategory = false;
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
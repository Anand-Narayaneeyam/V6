import { Component, OnInit } from '@angular/core';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { DrawingManagementComponent } from '../../Common/DrawingManagement/drawingmanagement.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { SpaceDrivers } from '../../CAI/General Settings/space-drivers.component';
import { DistributionMapSettingsComponent} from '../../Common/DistributionMapSettings/distributionmapsettings.component';
import { DefaultDisplayLayerComponent } from '../../Common/DefaultDisplayLayer/default-display-layer-component';
import { CustomReportGridComponent} from '../../Common/Custom Reports/customreport-grid.component';

@Component({
    selector: 'general-settings',
    templateUrl: './app/Views/CAI/General Settings/general-settings.component.html',
    directives: [SectionComponent, PageComponent, DrawingManagementComponent, SpaceDrivers, DistributionMapSettingsComponent, DefaultDisplayLayerComponent, CustomReportGridComponent ]
})

export class CAIGeneralSettingsComponent {
    pagePath = "Settings / CAI / General Settings"
    pageTitle: string = "General Settings";
    isSiteAdmin: boolean = false;
    userRoleId: any;

    sectionExpansionStatus = [{ "title": "Drawing Management", "isExpanded": false },
        { "title": "CAI Space Drivers", "isExpanded": false },
        { "title": "Distribution Map Settings", "isExpanded": false },
        { "title": "Default Display Layers", "isExpanded": false },
        { "title": "Custom Reports", "isExpanded": false }];

    constructor(private administrationService: AdministrationService) {

    }

    onSectionExpandChange(obj) {
        debugger;
        for (var i = 0; i < this.sectionExpansionStatus.length; i++) {
            if (this.sectionExpansionStatus[i].title !== obj[1].title) {
                this.sectionExpansionStatus[i].isExpanded = false;
            } else {
                this.sectionExpansionStatus[i].isExpanded = true;
            }
        }
        debugger;
        var updatedData = new Array();/*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.sectionExpansionStatus);
        this.sectionExpansionStatus = updatedData;
    };
    ngOnInit() {
        var context = this;
        this.administrationService.getSessionData().subscribe(function (data) {
            debugger;
            var retData = data["Data"];
            context.userRoleId = retData["UserRoleId"];
        });

        context.administrationService.CheckIsSiteLevelAdmin(12).subscribe(function (result) {
            debugger;
            context.isSiteAdmin = result == 1 ? true : false;
        });
    }
}
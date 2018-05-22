import {Component, OnInit} from '@angular/core';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {TreeViewFieldsComponent} from './treeviewfields.component';
import { AdditionalDataFieldsComponent } from '../../Common/Additional Data Fields/additional-datafields.component';
import { DocumentCategory } from './Document-Categories.component';
import { OptionalFieldsComponent} from './optionalFields';
import { CustomReportGridComponent} from '../../Common/Custom Reports/customreport-grid.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { NumberFormat} from '../../common/number format/numberformat.component';
@Component({
    selector: 'documentGeneralSettings',
    templateUrl: './app/Views/Documents/General Settings/general-settings.component.html',
    directives: [SectionComponent, PageComponent, TreeViewFieldsComponent, DocumentCategory, OptionalFieldsComponent,
        AdditionalDataFieldsComponent, CustomReportGridComponent, NumberFormat]
})

export class DocumentGeneralSettingsComponent {
    pagePath = "Settings / Documents / General Settings";
    pageTitle: string = "General Settings";
    isDownloadFormat: boolean = false;
    sectionExpansionStatus = [{ "title": "Document Categories", "isExpanded": false },
        { "title": "Optional Fields", "isExpanded": false },
        { "title": "Tree View Fields", "isExpanded": false },
        { "title": "Additional Data Fields", "isExpanded": false },
        { "title": "Document Download Format", "isExpanded": false },
        { "title": "Custom Reports", "isExpanded": false }];
    userRoleId: any;
    constructor(private administrationService: AdministrationService) {

    }

    ngOnInit(): void {
        var Contextobj = this;
        this.administrationService.getSessionData().subscribe(function (data) {
            debugger;
            var retData = data["Data"];
            Contextobj.userRoleId = retData["UserRoleId"];
        });
        Contextobj.administrationService.getCustomerSubscribedFeatures("191").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            Contextobj.isDownloadFormat = customerFeatureobj[0]["IsSubscribed"];
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
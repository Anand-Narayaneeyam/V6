import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { DefineWorkTypeComponent } from '../../Common/Define Work Type/define-worktypeList';
import { SetWorkflowMainComponent} from '../../common/set workflow/setworkflow-main.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'documents-workflowsettings',
    templateUrl: './app/Views/Documents/Workflow Settings/workflow-settings.component.html',
    directives: [SectionComponent, PageComponent, DefineWorkTypeComponent, SetWorkflowMainComponent]
})

export class DocumentsWorkflowSettingsComponent implements OnInit {
    pageTitle: string = "Workflow Settings";
    pagePath = "Settings / Documents / Workflow Settings";
    isSiteAdmin: boolean = true;
   // isMAdmin: boolean = false;
    sectionExpansionStatus = [{ "title": "Define Work Types", "isExpanded": false }, { "title": "Set Workflow", "isExpanded": false }];
    constructor(private administrationService: AdministrationService) {

    }
    ngOnInit(): void {
        debugger
        var objContext = this;
        objContext.administrationService.CheckIsSiteLevelAdmin(4).subscribe(function (result) {
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

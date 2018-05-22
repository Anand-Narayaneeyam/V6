import { Component } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { SetWorkflowEditableFieldsComponent } from './setworkflow-editablefields';
import { SetWorkflowPerissionsComponent } from './setworkflow-permissions';

@Component({
    selector: 'workflow-settings',
    templateUrl: './app/Views/Common/Set Workflow/workflow-settings.html',
    directives: [SectionComponent, SetWorkflowEditableFieldsComponent, SetWorkflowPerissionsComponent],
    inputs: ['selectedId', 'worktype', 'isGeneral' ]
})

export class WorkflowSettingsComponent {
    pageTitle: string = "General Settings";
    pagePath = "Settings / Work Order / General Settings";
    selectedId: any;
    moduleId: any;
    sectionExpansionStatus = [{ "title": "Editable Fields", "isExpanded": false }, { "title": "Permissions", "isExpanded": false }];
    worktype: any;
    isGeneral: boolean = false;

    onSectionExpandChange(obj) {
        console.log("Workflow ActionPointId", this.selectedId);
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
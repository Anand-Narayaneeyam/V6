import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { Trades } from './trades.component';
import { ContractorsListComponent } from './contractors-list.component';
import { TechniciansListComponent } from './technicians-list.component';
import { ManufacturersListComponent } from './manufacturers-list.component';
//import { SetWorkflowComponent } from '../../Common/Set Workflow/setworkflow.component';
//import { SetWorkflowMainComponent} from '../../common/set workflow/setworkflow-main.component';
import { PartsListComponent } from './parts-list.component';
//import { DefineWorkTypeComponent } from '../../Common/Define Work Type/define-worktypeList';
import { ToolsListComponent } from './tools-list.component';
import { PriorityListComponent } from './priority-list.component';
//import { WorkOrderAdditionalDataFieldsComponent } from '../Additional Data Fields/additional-datafields.component';
import { HoldReasonListComponent } from './holdReason-list.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { WorkflowComponent } from '../../WorkOrder/Workflow/workflow.component';
import { ListDeficiencyCategoriesComponent } from '../../Objects/Deficiency/Listdeficiencycategories';
import { ListDeficiencyComponent } from '../../Objects/Deficiency/deficiencies-list';
import { ObjectClassesComponent } from '../../objects/general settings/objectclasses.component';
import { AttributesComponent } from '../../objects/general settings/attributes.component';
import { ClassAttributesComponent } from '../../objects/general settings/class-attributes.component';
import { ObjectDataListComponent } from '../../objects/data/objectdata-list.component'
//import { AdditionalCharges} from './additional-charges.component';
import { NumberFormat} from '../../common/number format/numberformat.component';

@Component({
    selector: 'general-settings',
    templateUrl: './app/Views/WorkOrder/GeneralSettings/general-settings.component.html',
    directives: [SectionComponent, ListDeficiencyCategoriesComponent, ListDeficiencyComponent, PageComponent, Trades, ContractorsListComponent, TechniciansListComponent, ManufacturersListComponent, PartsListComponent, ToolsListComponent, PriorityListComponent, HoldReasonListComponent, WorkflowComponent, ObjectClassesComponent, AttributesComponent, ClassAttributesComponent, ObjectDataListComponent, NumberFormat]
})

export class WorkOrderGeneralSettingsComponent implements OnInit {
    pageTitle: string = "General Settings";
    pagePath = "Settings / Work Order / General Settings";
    isMAdmin: boolean = false;
    isObject = false;
    isSiteAdmin: boolean = false;
    userRoleId: any;
    //sectionExpansionStatus = [{ "title": "Trades", "isExpanded": false }, { "title": "Technicians", "isExpanded": false }, { "title": "Contractors", "isExpanded": false }, { "title": "Manufacturers", "isExpanded": false }, { "title": "Parts", "isExpanded": false }, { "title": "Tools", "isExpanded": false }, { "title": "Priorities", "isExpanded": false }, { "title": "Reasons for Hold", "isExpanded": false }, { "title": "Define Work Types", "isExpanded": false }, { "title": "Set Workflow", "isExpanded": false }, { "title": "Additional Data Fields", "isExpanded": false }, { "title": "Show Workflow", "isExpanded": false } ];
    sectionExpansionStatus = [{ "title": "Trades", "isExpanded": false },
        { "title": "Technicians", "isExpanded": false },
        { "title": "Contractors", "isExpanded": false },
        { "title": "Manufacturers", "isExpanded": false },
        { "title": "Parts", "isExpanded": false },
        { "title": "Tools", "isExpanded": false },
        { "title": "Priorities", "isExpanded": false },
        { "title": "Reasons for Hold", "isExpanded": false },
        { "title": "Asset Classes", "isExpanded": false },
        { "title": "Asset Common Attributes", "isExpanded": false },
        { "title": "Asset Class Attributes", "isExpanded": false },
        { "title": "Assets", "isExpanded": false },        
        { "title": "Deficiency Categories", "isExpanded": false },
        { "title": "Deficiencies", "isExpanded": false },
        { "title": "Number Prefix", "isExpanded": false }];
    constructor(private administrationService: AdministrationService) {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            if (UserRoleId >= 4) {
                objContext.isMAdmin = true;
            }
        });
        objContext.administrationService.getAccessibleModuleForUser().subscribe(function (data) {
            data["Data"].filter(function (el) { 
                if (el.ModuleId == 7 || el.ModuleId == 8 || el.ModuleId == 6
                    || el.ModuleId == 17 || el.ModuleId == 18 || el.ModuleId == 25
                    || el.ModuleId == 26 || el.ModuleId == 27 || el.ModuleId == 24) {
                    objContext.isObject = true;
                    return true
                }
                else
                    return false
            });
        });
        objContext.administrationService.CheckIsSiteLevelAdmin(5).subscribe(function (result) {
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

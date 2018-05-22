import { Component, OnInit, OnChanges, SimpleChange, Output, EventEmitter} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { WorkFlowService } from '../../../Models/Common/workflow.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SetWorkFlowAddEditComponent } from './setworkflow-addedit';
import { WorkflowSettingsComponent } from './workflow-settings';
import { WorkflowOutcomeComponent } from './workflow-outcomesList';
import { AdministrationService } from '../../../models/administration/administration.service';
import { CopyWorkflowComponent } from './copy-workflow';
import {WorkflowEscalationsNotificationsComponent } from '../Set Workflow/workflow-EscalationNotificationsList';

@Component({
    selector: 'setworkflow',
    templateUrl: './app/Views/Common/Set Workflow/setworkflow.component.html',
    directives: [SplitViewComponent, FieldComponent, SubMenu, GridComponent, PagingComponent, SlideComponent, DropDownListComponent,
        SetWorkFlowAddEditComponent, WorkflowSettingsComponent, WorkflowOutcomeComponent, CopyWorkflowComponent, WorkflowEscalationsNotificationsComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, WorkFlowService, AdministrationService],
    inputs: ['moduleId', 'workFlowCategoryId','workTypeId']
})

export class SetWorkflowComponent implements OnInit {
    pageTitle: string;
    showSlide: boolean = false;
    showWorkflowSlide: boolean = false;
    position: any = "top-right";
    alignContent: string;
    ddlWorkType: any;
    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    fieldDetailsCloneWorkflow: IField[];
    itemsSource: any[];
    moduleId: number = 0;
    workFlowCategoryId: number = 0;
    workTypeId: number = 0;
    actionPointNumber: number = 0;
    actionPointTypeId: number = 0;
    actionPointId: number = 0;
    isGeneral: boolean = false;
    outcomeCount: any;
    incomeOutcomeCount: any;
    entityCategoryCount: any;
    workTypeName: any;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    action: string;
    btnName: string;
    target: number = 0;
    selRowId: any;
    isChanged: boolean = false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: "" };
    menuData;
    menumock = [];
    enableMenu: any[];
    refreshgrid;
    @Output() openWorkflow = new EventEmitter();
    isSiteAdmin: boolean = false;
    constructor(private generFun: GeneralFunctions, private workFlowService: WorkFlowService, private notificationService: NotificationService, private administrationService: AdministrationService) {
       
    }

    ngOnInit(): void {
        this.btnName = "Add";
        var contextObj = this;
        contextObj.loadMenuData();
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menumock, callBack, 2437, contextObj.administrationService, contextObj.menumock.length)
        this.enableMenu = []
        this.alignContent = "horizontal";
        this.loadFieldList(this.workTypeId);   
        contextObj.administrationService.CheckIsSiteLevelAdmin(9).subscribe(function (result) {
            contextObj.isSiteAdmin = result == 1 ? true : false;
        });       
    }

    public loadFieldList(worktypeId) {
        var contextObj = this;
        this.workFlowService.getFieldsList(this.moduleId, 0).subscribe(function (resultData) {
            contextObj.ddlWorkType = resultData["Data"].find(function (el) { return el.ReportFieldId === 5832; });
            var removeArr = [5832];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            })
            if (contextObj.ddlWorkType.LookupDetails.LookupValues == "") {
                contextObj.notificationService.ShowToaster("No Work Types exist", 2);
            } else if (contextObj.ddlWorkType.LookupDetails.LookupValues.length == 1) {
                var workTypeId = contextObj.ddlWorkType.LookupDetails.LookupValues[0].Id;
                contextObj.ddlWorkType.FieldValue = workTypeId.toString();
                contextObj.onChangeWorkType(workTypeId);
            } else if (worktypeId > 0) {
                contextObj.ddlWorkType.FieldValue = worktypeId.toString();
                contextObj.onChangeWorkType(worktypeId);
            }
        });     
    }

    onSplitViewClose(event) {
        if (this.target == 3) {
            this.onChangeWorkType(this.workTypeId);
        }
    }

    onChangeWorkType(event: any) {
        var contextObj = this;
        this.workTypeId = event;
        if (this.workTypeId > -1) {
            this.workFlowService.getWorkFlowList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.workTypeId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    if (contextObj.isSiteAdmin)
                        contextObj.enableMenu = [3, 5, 7];
                    else
                        contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Action Points exist", 2);
                    contextObj.enableMenu = [0,5];
                    contextObj.itemsSource = [];
                }
            });
        } else {
            contextObj.enableMenu = [];
            contextObj.itemsSource = [];
        }
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workFlowService.getWorkFlowList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.workTypeId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }

    //public onSort(objGrid: any) {
    //    var contextObj = this;
    //    this.workFlowService.getWorkFlowList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.workTypeId).subscribe(function (resultData) {
    //        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
    //        contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
    //        contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
    //    });
    //}

    public onSubMenuChange(event: any) {
        var contextObj = this;       
        switch (event.value) {
            case 0:
                contextObj.target = 1;
                this.addClick();
                break;
            case 1:
                this.isGeneral = this.inputItems.rowData["IsGeneral"];
                contextObj.target = 1;
                if (this.isGeneral == false) {
                    this.editClick();
                } else {
                    this.notificationService.ShowToaster("Static Action Point cannot be edited", 2);
                }
                break;
            case 2:
                this.isGeneral = this.inputItems.rowData["IsGeneral"];
                if (this.isGeneral == false) {
                    this.deleteClick();
                } else {
                    this.notificationService.ShowToaster("Static Action Point cannot be deleted", 2);
                }                
                break;
            case 3:
                contextObj.target = 2;
                this.isGeneral = this.inputItems.rowData["IsGeneral"];
                this.workflowSettingsMenuClick();
                break;
            case 4:
                this.isGeneral = this.inputItems.rowData["IsGeneral"];
                contextObj.target = 3;
                if (this.isGeneral == false) {
                    this.outcomesMenuClick();
                } else {
                    this.notificationService.ShowToaster("Outcomes cannot be set for static Action Point", 2);
                }              
                break;
            case 5:
                var workTypeName = this.ddlWorkType.LookupDetails.LookupValues.find(function (el) { return el.Id == contextObj.workTypeId }).Value;
                this.openWorkflow.emit({ Id: this.workTypeId, Value: workTypeName});
                break;
            case 6:
                contextObj.target = 4;
                this.copyWorkflow();
                break;
            case 7:
                contextObj.target = 5;
                this.workflowEscalationNotifications();
                break;
        }
    }

    public addClick() {
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Action Point";
        var contextObj = this;
        this.workFlowService.loadWorkFlowAddEdit(0, 1, this.workFlowCategoryId, this.moduleId, this.workTypeId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            var workflowEntity = contextObj.fieldDetailsAddEdit.find(function (el) { return el.FieldId === 1000; });
            var lookups = workflowEntity["LookupDetails"]["LookupValues"];
            if (lookups.length == 1) {
                workflowEntity.MultiFieldValues = [lookups[0]["Id"].toString()];
                workflowEntity.IsEnabled = false;
            }
            contextObj.isChanged = false;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        })
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Action Point";
        this.outcomeCount = this.inputItems.rowData["Outcome Count"];
        this.incomeOutcomeCount = this.inputItems.rowData["Incomming Outcome Count"];
        this.entityCategoryCount = this.inputItems.rowData["EntityCategory Count"];
        var contextObj = this;        
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.workFlowService.loadWorkFlowAddEdit(this.inputItems.selectedIds[0], 2, this.workFlowCategoryId, this.moduleId, this.workTypeId).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1000) {
                        if (contextObj.outcomeCount > contextObj.entityCategoryCount || contextObj.incomeOutcomeCount > 0){
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                        } 
                        var lookups = contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"];
                        if (lookups.length == 1) {
                            contextObj.fieldDetailsAddEdit[i].MultiFieldValues = [lookups[0]["Id"].toString()];
                            contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                        }
                    }
                }
                contextObj.isChanged = false;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public deleteClick() { 
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.workFlowService.isEditableWorkflow(contextObj.workTypeId, contextObj.inputItems.selectedIds[0]).subscribe(function (isEditable) {
                if (isEditable["Data"] == true) {
                    contextObj.showSlide = !contextObj.showSlide;
                } else {
                    contextObj.showWorkflowSlide = !contextObj.showWorkflowSlide;
                }
            }); 
        }       
    }

    public deleteWorkFlow() {
        var contextObj = this;
        this.actionPointNumber = this.inputItems.rowData["Action Point Number"];       
        this.workFlowService.postDeleteWorkFlow(this.workTypeId, this.actionPointNumber, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                contextObj.workFlowService.getWorkFlowList(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.workTypeId).subscribe(function (resultData) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = resultData["Data"].DataCount;
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [0, 5];
                        contextObj.notificationService.ShowToaster("No Action Points exist", 2);
                    }
                });
                contextObj.notificationService.ShowToaster("Selected Action Point deleted", 3);
            }
            else if (resultData["Data"].StatusId = -1) 
                contextObj.notificationService.ShowToaster("Action Point is in use", 2);
            else 
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
    }

    OnSuccessfulSubmit(event: any) {
        var contextObj = this;
        this.refreshgrid = [];
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"]; 
                this.itemsSource = retUpdatedSrc["itemSrc"];
                if (this.totalItems > 0) {
                    this.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7];
                }
            } else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            } else if (this.action == "copy") {
                var newWorkTypeId = event["NewWorkTypeId"];
                this.ddlWorkType.FieldValue = newWorkTypeId;
                this.loadFieldList(newWorkTypeId);  
                this.workFlowService.getWorkFlowList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, newWorkTypeId).subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.totalItems > 0) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7];
                    } 
                });
            }
            //this.refreshgrid = this.refreshgrid.concat([true]);
            //this.itemsSource = retUpdatedSrc["itemSrc"];
            this.splitviewInput.showSecondaryView = false;
        }
    }

    public inlineDelete(event: any) {
        this.deleteWorkFlow();
    }

    okDelete(event: Event) {
        this.deleteWorkFlow();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
        this.showWorkflowSlide = false;
    }

    okWorkflowClick(event: any) {
        this.deleteWorkFlow();
        this.showWorkflowSlide = false;
    }

    cancelWorkflowClick(value: any) {
        this.showWorkflowSlide = false;
    } 

    public outcomesMenuClick() {
        this.pageTitle = "Set Outcomes for Action Point";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Workflow", 2);
        } else {
            this.actionPointTypeId = this.inputItems.rowData["ActionPointTypeId"];
            this.actionPointId = this.inputItems.rowData["ActionPointId"];
            this.splitviewInput.showSecondaryView = true;
        }
    }

    //onUpdateOutcomeCount(event: any) {
    //    debugger    
    //    this.itemsSource.find(function (item) {
    //        if (item.Id == event.workflowActionPointId) {
    //            item["Outcome Count"] = event.outcomeCount.toString();
    //            return true;
    //        } else {
    //            return false;
    //        }
    //    });
    //    var updatedData = new Array();/*To notify the watcher about the change*/
    //    updatedData = updatedData.concat(this.itemsSource);
    //    this.itemsSource = updatedData;
    //}

    public workflowSettingsMenuClick() {
        this.pageTitle = "Workflow Settings";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Workflow", 2);
        } else {
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }

    public copyWorkflow() {
        var contextObj = this;
        this.action = "copy";
        this.btnName = "Save";
        this.pageTitle = "New Workflow";
        this.workTypeName = this.inputItems.rowData["Work Type"];
        this.workFlowService.loadCloneWorkflow().subscribe(function (resultData) {
            contextObj.fieldDetailsCloneWorkflow = resultData["Data"];
            var txtCopiedfrom = contextObj.fieldDetailsCloneWorkflow.find(function (item) {
                return item.FieldId === 2789;
            });
            txtCopiedfrom.FieldValue = contextObj.workTypeName;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public workflowEscalationNotifications() {
        if (this.workTypeId > -1) {
            this.pageTitle = "Workflow Escalation Notifications";
            this.splitviewInput.showSecondaryView = true;
        }
    }

    public loadMenuData() {
        switch (this.moduleId) {
            case 5: /*Scheduling*/
            case 14:
                this.menumock = [
                    {
                        "id": 0,
                        "title": "Add",
                        "image": "Add",
                        "path": "Add",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 1,
                        "title": "Edit",
                        "image": "Edit",
                        "path": "Edit",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 2,
                        "title": "Delete",
                        "image": "Delete",
                        "path": "Delete",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 4,
                        "title": "Outcomes",
                        "image": "Outcomes",
                        "path": "Outcomes",
                        "submenu": null,
                        "privilegeId": 3790
                    }
                ];
                break;
            case 4: //Documents
                this.menumock = [
                    {
                        "id": 0,
                        "title": "Add",
                        "image": "Add",
                        "path": "Add",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 1,
                        "title": "Edit",
                        "image": "Edit",
                        "path": "Edit",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 2,
                        "title": "Delete",
                        "image": "Delete",
                        "path": "Delete",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 3,
                        "title": "Workflow Settings",
                        "image": "Workflow Settings",
                        "path": "Workflow Settings",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 4,
                        "title": "Outcomes",
                        "image": "Outcomes",
                        "path": "Outcomes",
                        "submenu": null,
                        "privilegeId": 3790
                    }
                ];
                break;
            case 9: //Workorder
                this.menumock = [
                {
                    "id": 0,
                    "title": "Add",
                    "image": "Add",
                    "path": "Add",
                    "submenu": null,
                    "privilegeId": 3790
                },
                {
                    "id": 1,
                    "title": "Edit",
                    "image": "Edit",
                    "path": "Edit",
                    "submenu": null,
                    "privilegeId": 3790
                },
                {
                    "id": 2,
                    "title": "Delete",
                    "image": "Delete",
                    "path": "Delete",
                    "submenu": null,
                    "privilegeId": 3790
                },
                {
                    "id": 3,
                    "title": "Workflow Settings",
                    "image": "Workflow Settings",
                    "path": "Workflow Settings",
                    "submenu": null,
                    "privilegeId": 3790
                },
                {
                    "id": 4,
                    "title": "Outcomes",
                    "image": "Outcomes",
                    "path": "Outcomes",
                    "submenu": null,
                    "privilegeId": 3790
                },
                {
                    "id": 5,
                    "title": "Show Workflow",
                    "image": "Show Workflow",
                    "path": "Show Workflow",
                    "submenu": null,
                    "privilegeId": 3790
                },
                {
                    "id": 6,
                    "title": "Copy Workflow",
                    "image": "Copy Workflow",
                    "path": "Copy Workflow",
                    "submenu": null,
                    "privilegeId": 3790
                },
                {
                    "id": 7,
                    "title": "Workflow Escalation Notifications",
                    "image": "Workflow Escalation Notifications",
                    "path": "Workflow Escalation Notifications",
                    "submenu": null,
                    "privilegeId": null
                }
            ];
                break;
            default:
                this.menumock = [
                    {
                        "id": 0,
                        "title": "Add",
                        "image": "Add",
                        "path": "Add",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 1,
                        "title": "Edit",
                        "image": "Edit",
                        "path": "Edit",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 2,
                        "title": "Delete",
                        "image": "Delete",
                        "path": "Delete",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 3,
                        "title": "Workflow Settings",
                        "image": "Workflow Settings",
                        "path": "Workflow Settings",
                        "submenu": null,
                        "privilegeId": 3790
                    },
                    {
                        "id": 4,
                        "title": "Outcomes",
                        "image": "Outcomes",
                        "path": "Outcomes",
                        "submenu": null,
                        "privilegeId": 3790
                    }
                ];
                break;
        }
    }
}
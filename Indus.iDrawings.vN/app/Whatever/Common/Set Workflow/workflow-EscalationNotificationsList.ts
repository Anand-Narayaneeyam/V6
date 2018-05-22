import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { IField } from  '../../../Framework/Models/Interface/IField';
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
import { GeneralFunctions} from '../../../Models/Common/General';
import { WorkFlowService } from '../../../Models/Common/workflow.service';
import { WorkflowEscalationNotificationsAddEditComponent } from './workflowEscalationNotifications-addedit';

@Component({
    selector: 'workflow-EscalationsNotifications',
    templateUrl: './app/Views/Common/Set Workflow/workflow-EscalationNotificationsList.html',
    directives: [SplitViewComponent, FieldComponent, SubMenu, GridComponent, PagingComponent, SlideComponent, WorkflowEscalationNotificationsAddEditComponent],
    providers: [HTTP_PROVIDERS, WorkFlowService, NotificationService, GeneralFunctions],
    inputs: ['workTypeId']
})

export class WorkflowEscalationsNotificationsComponent implements OnInit {
    pageTitle: string;
    showSlide: boolean = false;
    position: any = "top-right";
    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    itemsSource: any[];
    workTypeId: number = 0;
    destinationActionPointId: number;
    outcomefromSourceActionPointId: any;
    outcomefromDestinationActionPointId: any;
    notificationSubjectDetails: any;
    notificationRecipientsDetails: any;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    action: string;
    btnName: string;
    target: number;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: "ASC", sortCol: "" };
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        }
    ];
    enableMenu = [];
    refreshgrid;
    constructor(private generFun: GeneralFunctions, private workFlowService: WorkFlowService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.btnName = "Add";
        var contextObj = this;
        console.log("WT in EN: ", contextObj.workTypeId);
        this.workFlowService.getWorkflowEscalationsNotificationsFields().subscribe(function (resultData) {
            contextObj.fieldObject = (resultData["Data"]);
        })
        this.workFlowService.getWorkflowEscalationsNotificationsList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.workTypeId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 1, 2];
            } else {
                contextObj.notificationService.ShowToaster("No Workflow Escalation Notifications exist", 2);
                contextObj.enableMenu = [0];
            }
        });
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workFlowService.getWorkflowEscalationsNotificationsList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.workTypeId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.workFlowService.getWorkflowEscalationsNotificationsList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.workTypeId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 0:
                this.target = 1;
                this.addClick();
                break;
            case 1:
                this.target = 1;
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
        }
    }

    public addClick() {
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Workflow Escalation Notification";
        var contextObj = this;
        this.workFlowService.loadWorkflowEscalationsNotificationsAddEdit(0, 1, contextObj.workTypeId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            var arrList = new Array();
            arrList.push(
                {
                    ReportFieldId: 5472,
                    Value: 25
                }
            );
            var ddlNotificationSubject = contextObj.fieldDetailsAddEdit.find(function (item) {
                return item.FieldId === 2771;
            });
            contextObj.workFlowService.loadNotificationSubject(50783, JSON.stringify(arrList)).subscribe(function (resultData) {
                if (resultData["Data"] != "[]") {
                    contextObj.notificationSubjectDetails = JSON.parse(resultData["Data"]);
                    ddlNotificationSubject.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                    var notificationDetails = contextObj.notificationSubjectDetails.find(function (item) {
                        return item.Id === parseInt(ddlNotificationSubject.FieldValue);
                    });
                }
            });
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Workflow Escalation Notification";
        var contextObj = this;
        this.destinationActionPointId = this.inputItems.rowData["DesiredWorkFlowActionPointId"];
        this.outcomefromSourceActionPointId = this.inputItems.rowData["WorkflowActionId"];
        this.outcomefromDestinationActionPointId = this.inputItems.rowData["DesiredWorkflowActionId"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.workFlowService.loadWorkflowEscalationsNotificationsAddEdit(this.inputItems.selectedIds[0], 2, contextObj.workTypeId).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 2769:
                            contextObj.fieldDetailsAddEdit[i].FieldValue = contextObj.destinationActionPointId.toString();
                            break;
                        case 2770:
                            contextObj.workFlowService.loadOutcomefromDestinationActionPoint(contextObj.destinationActionPointId, 2769, contextObj.workTypeId, contextObj.outcomefromSourceActionPointId).subscribe(function (resultData) {
                                if (resultData["Data"]["LookupValues"] != "") {
                                    contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                                    contextObj.fieldDetailsAddEdit[i].FieldValue = contextObj.outcomefromDestinationActionPointId.toString();
                                }
                            });
                            break;
                        case 2771:
                            var arrList = new Array();
                            arrList.push(
                                {
                                    ReportFieldId: 5472,
                                    Value: 25
                                }
                            );
                            contextObj.workFlowService.loadNotificationSubject(50783, JSON.stringify(arrList)).subscribe(function (resultData) {
                                if (resultData["Data"] != "[]") {
                                    contextObj.notificationSubjectDetails = JSON.parse(resultData["Data"]);
                                    contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                }
                            });
                            break;
                        case 2775:
                            var arrList1 = new Array();
                            arrList1.push(
                                {
                                    ReportFieldId: 12570,
                                    Value: contextObj.inputItems.selectedIds[0]
                                }
                            )
                            contextObj.workFlowService.loadNotificationRecipients(51202, JSON.stringify(arrList1)).subscribe(function (resultData) {
                                if (resultData["Data"] != "[]") {
                                    contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                    contextObj.notificationRecipientsDetails = JSON.parse(resultData["Data"]);
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                }
                                else {
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                }
                            });
                            break;
                    }
                }
              
            });
        }
    }

    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Workflow Escalation Notification", 2);
        } else {
            contextObj.showSlide = !contextObj.showSlide;
        }
    }

    public deleteEscalationNotification() {
        var contextObj = this;
        this.workFlowService.postDeleteWorkflowEscalationsNotifications(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].ServerId >= 0) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.notificationService.ShowToaster("No Workflow Escalation Notifications exist", 2);
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Escalation Notification deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    }

    OnSuccessfulSubmit(event: any) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];
                if (this.totalItems > 0) {
                    this.enableMenu = [0, 1, 2];
                }
            } else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            this.splitviewInput.showSecondaryView = false;
        }
    }

    public inlineDelete(event: any) {
        this.deleteEscalationNotification();
    }

    okDelete(event: Event) {
        this.deleteEscalationNotification();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    getRecipientsList(event) {
        return event["RecipientsList"];
    }
}

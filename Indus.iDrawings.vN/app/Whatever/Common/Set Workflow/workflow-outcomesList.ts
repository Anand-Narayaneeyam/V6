import { Component, OnChanges, SimpleChange,Output,EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { LabelComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField'
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
import { WorkflowOutcomeAddEditComponent } from './workflowoutcomes-addedit';

@Component({
    selector: 'workflow-outcomes',
    templateUrl: './app/Views/Common/Set Workflow/workflow-outcomesList.html',
    directives: [SplitViewComponent, SubMenu, GridComponent, PagingComponent, FieldComponent, Notification, LabelComponent, SlideComponent, WorkflowOutcomeAddEditComponent],
    providers: [WorkFlowService, NotificationService],
    inputs: ['selectedId', 'workflowData', 'workTypeId', 'workFlowCategoryId', 'moduleId', 'actionPointTypeId', 'actionPointId','isChanged']
})

export class WorkflowOutcomeComponent implements OnChanges{
    pageTitle: string;
    showSlide: boolean = false;
    position: any = "top-right";
    selectedId: number;
    fieldWorkType: IField[];
    fieldActionPoint: IField[];
    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    itemsSource: any[];
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    action: string;
    btnName: string;
    target: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: "" };
    workflowData: number;
    workTypeId: number;
    workFlowCategoryId: number;
    moduleId: number;
    actionPointTypeId: number;
    actionPointId: number;
    workflowEntityCategoryId: number = 0;
    outcomeTypeId: any;
    EntityName: any;
    defaultOutcomeId: any;
    nextWorkFlowActionPointId: any;
    userLookUpDetails: any;
    notificationRecipientsDetails: any;
    success = "";
    isChanged: boolean;
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
    gridcount = 8;
    types = false;
    enableMenu = [];
    @Output() outcomeCount = new EventEmitter();
    constructor(private workFlowService: WorkFlowService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        this.loadData();
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    }

    loadData() {
        var contextObj = this;
        contextObj.workFlowService.getWorkflowOutcomeFields().subscribe(function (resultData) {
            contextObj.fieldWorkType = resultData["Data"].find(function (el) { return el.ReportFieldId === 5876; });
            contextObj.fieldActionPoint = resultData["Data"].find(function (el) { return el.ReportFieldId === 5800; });
            if (contextObj.workflowData) {
                contextObj.fieldWorkType["FieldValue"] = contextObj.workflowData["Work Type"]
                contextObj.fieldActionPoint["FieldValue"] = contextObj.workflowData["Action Point"]
            }
            var removeArr = [5876, 5800];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            })
            contextObj.workFlowService.getWorkflowOutcomeData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.selectedId, contextObj.workTypeId).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.gridcount = contextObj.totalItems;
                contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
                if (contextObj.gridcount > 0) {
                    contextObj.enableMenu = [0, 1, 2];
                }
                else {
                    contextObj.enableMenu = [0];
                }
            });
        })          
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.target = 1;
                this.addClick();
                break;
            case 1:
                contextObj.target = 1;
                this.editClick();
                break;
            case 2:
                this.defaultOutcomeId = this.inputItems.rowData["OutcomeTypeId"];
                if (this.defaultOutcomeId == 28) {
                    this.notificationService.ShowToaster("Outcome Type 'Timed Out' cannot be deleted", 2);
                } else {
                    this.deleteClick();
                }
                break;
        }
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workFlowService.getWorkflowOutcomeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.selectedId, this.workTypeId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.workFlowService.getWorkflowOutcomeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.selectedId, this.workTypeId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }

    public addClick() {
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Outcome";
        var contextObj = this;
        contextObj.notificationRecipientsDetails = [];
        this.workFlowService.loadWorkflowOutcomeAdd(this.workFlowCategoryId, this.moduleId, this.workTypeId, this.selectedId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            if (contextObj.moduleId != 9) 
                contextObj.hideNotificationFields(contextObj.fieldDetailsAddEdit);            
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public hideNotificationFields(fieldDetailsAddEdit: IField[]) {
        var contextObj = this; 
        var notifyRequester = contextObj.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1086;
        }); 
        notifyRequester.IsVisible = false;
        notifyRequester.IsMandatory = false;
              
        var chkBoxNotification = fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2813;
        });
        chkBoxNotification.IsVisible = false;
        chkBoxNotification.IsMandatory = false;

        var ddlMessageTemplate = fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2814;
        });
        ddlMessageTemplate.IsVisible = false;
        ddlMessageTemplate.IsMandatory = false;

        var chkBoxRepeatReminder = fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2815;
        });
        chkBoxRepeatReminder.IsVisible = false;
        chkBoxRepeatReminder.IsMandatory = false;

        var txtEveryDays = fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2816;
        });
        txtEveryDays.IsVisible = false;
        txtEveryDays.IsMandatory = false;

        var dylstBxRecipients = contextObj.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2817;
        });
        dylstBxRecipients.IsVisible = false;
        dylstBxRecipients.IsMandatory = false;
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Outcome";
        var contextObj = this;
        this.outcomeTypeId = this.inputItems.rowData["OutcomeTypeId"];
        this.EntityName = this.inputItems.rowData["Workflow Entity"];
        this.workflowEntityCategoryId = this.inputItems.rowData["EntityCategoryId"];
        this.nextWorkFlowActionPointId = this.inputItems.rowData["NextWorkFlowActionPointId"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.workFlowService.loadWorkflowOutcomeEdit(this.inputItems.selectedIds[0], this.actionPointId, this.actionPointTypeId, this.workFlowCategoryId, this.moduleId, this.selectedId, this.outcomeTypeId, this.workflowEntityCategoryId, this.workTypeId).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                if (contextObj.moduleId != 9)
                    contextObj.hideNotificationFields(contextObj.fieldDetailsAddEdit);          
                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1080:
                            if (contextObj.workflowEntityCategoryId == 2) {
                                contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            }
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                            break;
                        case 1082:
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                            break;
                        case 1083:
                            var notifyRequester = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1086;
                            });
                            var outcome = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1082;
                            });
                            if (contextObj.EntityName == "Service Requests") {
                                if (contextObj.outcomeTypeId == "2" || contextObj.outcomeTypeId == "18" || contextObj.outcomeTypeId == "7" || contextObj.outcomeTypeId == "8" || contextObj.outcomeTypeId == "9" || contextObj.outcomeTypeId == "11" || contextObj.outcomeTypeId == "16" || this.outcomeTypeId == "21" || contextObj.outcomeTypeId == "23" || contextObj.outcomeTypeId == "19") {
                                    notifyRequester.IsEnabled = false;
                                    notifyRequester.IsVisible = true;
                                    if (contextObj.outcomeTypeId == "18") {
                                        outcome.IsEnabled = false;
                                    }
                                } else {
                                    notifyRequester.IsEnabled = true;
                                    notifyRequester.IsVisible = true;
                                }
                            } else if (contextObj.EntityName == "PM Work Orders") {
                                notifyRequester.IsEnabled = false;
                                notifyRequester.IsVisible = false;
                            } 
                            contextObj.updateNotifyRequesterField(notifyRequester);
                            if (contextObj.outcomeTypeId == "30" || contextObj.outcomeTypeId == "6" || contextObj.outcomeTypeId == "7" || contextObj.outcomeTypeId == "8" || contextObj.outcomeTypeId == "9" || contextObj.outcomeTypeId == "11" || contextObj.outcomeTypeId == "14" || contextObj.outcomeTypeId == "15" || contextObj.outcomeTypeId == "16" || contextObj.outcomeTypeId == "21" || contextObj.outcomeTypeId == "23") {
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                            } else {
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                                contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                            }

                            if (contextObj.outcomeTypeId == "28") {
                                if (contextObj.moduleId != 9 && contextObj.moduleId != 4) {
                                    contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                    contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                                    contextObj.fieldDetailsAddEdit[i]["HasValidationError"] = false;
                                    break;
                                }
                                var ddlUser = contextObj.fieldDetailsAddEdit.find(function (item) {
                                    return item.FieldId === 1171;
                                });
                                var arrList = new Array();
                                arrList.push(
                                    {
                                        ReportFieldId: 5837,
                                        Value: contextObj.outcomeTypeId
                                    },
                                    {
                                        ReportFieldId: 5832,
                                        Value: contextObj.workTypeId
                                    },
                                    {
                                        ReportFieldId: 6570,
                                        Value: contextObj.workflowEntityCategoryId
                                    }
                                );
                                contextObj.workFlowService.loadNextActionPointDetails(50570, JSON.stringify(arrList)).subscribe(function (resultData) {
                                    if (resultData["Data"] != "[]") {
                                        contextObj.userLookUpDetails = JSON.parse(resultData["Data"]);
                                        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                        var actionPointDetails = contextObj.userLookUpDetails.find(function (item) {
                                            return item.Id === parseInt(contextObj.fieldDetailsAddEdit[i].FieldValue);
                                        });
                                    }
                                    if (actionPointDetails.IsSpecificUser == 1) {
                                        contextObj.workFlowService.loadUser(actionPointDetails.ActionPointId, 1083, contextObj.moduleId, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                                            if (resultData["Data"]["LookupValues"] != "") {
                                                ddlUser.IsMandatory = true;
                                                ddlUser.HasValidationError = true;
                                                ddlUser.IsLocallyValidated = false;
                                                ddlUser.IsEnabled = true;
                                                ddlUser.IsVisible = true;
                                                ddlUser.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                                                var userLookUp = ddlUser.LookupDetails.LookupValues;
                                                for (var i = 0; i < userLookUp.length; i++) {
                                                    if (userLookUp[i]["IsChecked"] == 1) {
                                                        ddlUser.FieldValue = userLookUp[i]["Id"].toString();
                                                        break;
                                                    }
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                            if (contextObj.outcomeTypeId == "28" && contextObj.EntityName == "PM Work Orders") {
                                notifyRequester.IsEnabled = false;
                                notifyRequester.IsVisible = false;
                            }
                            break;
                        case 2813:
                            if (contextObj.moduleId == 9) {
                                var ddlMessageTemplate = contextObj.fieldDetailsAddEdit.find(function (item) {
                                    return item.FieldId === 2814;
                                });
                                var chkBxRepeatReminder = contextObj.fieldDetailsAddEdit.find(function (item) {
                                    return item.FieldId === 2815;
                                });
                                var txtBxEveryDays = contextObj.fieldDetailsAddEdit.find(function (item) {
                                    return item.FieldId === 2816;
                                });
                                var dyLstBxRecipients = contextObj.fieldDetailsAddEdit.find(function (item) {
                                    return item.FieldId === 2817;
                                });
                                if (contextObj.workflowEntityCategoryId) {
                                    contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                                }
                                var isEnable = contextObj.fieldDetailsAddEdit[i].FieldValue == "Yes";
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                                contextObj.fieldDetailsAddEdit[i]["FieldValue"] = isEnable.toString()
                                ddlMessageTemplate.IsEnabled = isEnable;
                                ddlMessageTemplate.IsMandatory = isEnable;
                                var arrMessageTemplate = new Array();
                                arrMessageTemplate.push(
                                    {
                                        ReportFieldId: 6557,
                                        Value: contextObj.workflowEntityCategoryId
                                    }
                                );
                                contextObj.workFlowService.loadMessageTemplateforOutcome(51200, JSON.stringify(arrMessageTemplate)).subscribe(function (resultData) {
                                    if (resultData["Data"] != "[]") {
                                        ddlMessageTemplate.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                    }
                                });
                                chkBxRepeatReminder.IsEnabled = isEnable;
                                chkBxRepeatReminder.IsVisible = true;

                                if (chkBxRepeatReminder.FieldValue == "true") {
                                    txtBxEveryDays.IsEnabled = true;
                                    txtBxEveryDays.IsVisible = true;
                                    txtBxEveryDays.IsMandatory = true;
                                    txtBxEveryDays.HasValidationError = true;
                                    txtBxEveryDays.IsLocallyValidated = false;
                                    var daystoRepeatReminder = contextObj.inputItems.rowData["Days to Repeat Reminder"];
                                    txtBxEveryDays.FieldValue = daystoRepeatReminder;
                                } else if (chkBxRepeatReminder.FieldValue == "false") {
                                    txtBxEveryDays.IsEnabled = false;
                                    txtBxEveryDays.IsVisible = true;
                                    txtBxEveryDays.FieldValue = "";
                                }

                                dyLstBxRecipients.IsEnabled = isEnable;
                                dyLstBxRecipients.IsVisible = true;
                                dyLstBxRecipients.IsMandatory = isEnable;
                                dyLstBxRecipients.HasValidationError = isEnable;
                                dyLstBxRecipients.IsLocallyValidated = false;
                            }                                               
                            break;
                        case 2817:
                            if (contextObj.moduleId == 9) {
                                var arrRecipients = new Array();
                                arrRecipients.push(
                                    {
                                        ReportFieldId: 5834,
                                        Value: contextObj.inputItems.selectedIds[0]
                                    }
                                )
                                contextObj.workFlowService.loadNotificationRecipients(51203, JSON.stringify(arrRecipients)).subscribe(function (resultData) {
                                    if (resultData["Data"] != "[]") {
                                        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                        contextObj.notificationRecipientsDetails = JSON.parse(resultData["Data"]);
                                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                    } else {
                                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                    }
                                });
                            }
                            if (contextObj.moduleId != 9)
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            break;
                    }             
                    if (contextObj.fieldDetailsAddEdit[i].ReportFieldId == 5840) {
                        if (contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"]["length"] == 0) {
                            contextObj.fieldDetailsAddEdit[i].FieldValue = "-1";
                        }
                    }                                            
                }
               
            });
        }
    }

    public deleteClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.showSlide = !this.showSlide;
        }
    }

    public deleteWorkFlow() {
        var contextObj = this;
        this.EntityName = this.inputItems.rowData["Workflow Entity"];
        this.workFlowService.postDeleteWorkflowOutcomes(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Outcome deleted", 3);             
            }
            else {
                contextObj.notificationService.ShowToaster("Selected Outcome cannot be deleted", 5);
            }
        });
    }

    OnSuccessfulSubmit(event: any) {
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                if (this.totalItems > 0) {
                    this.enableMenu = [0, 1, 2];
                }   
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            }
            this.itemsSource = retUpdatedSrc["itemSrc"];
            this.splitviewInput.showSecondaryView = false;     
        }
    }

    public updateNotifyRequesterField(field: IField) {
        switch (this.workFlowCategoryId) {
            case 6: /*Documents*/
                field.IsVisible = false;
                field.IsMandatory = false;
            case 8: /*Scheduling*/
            case 17: /*Move Project Execution*/
                field.IsVisible = false;
                field.FieldValue = "false";
                break;
            default:
                field.IsVisible = true;
                break;
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
    }  
}




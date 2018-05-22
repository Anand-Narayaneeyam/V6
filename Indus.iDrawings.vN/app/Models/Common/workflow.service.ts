import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from '../../Framework/Models//Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class WorkFlowService extends HttpHelpers {

    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private addDataUrl = 'Common/GetAddAppFormFields';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private submitAddUrl = 'Common/InsertAppFormData';
    private submitEditUrl = 'Common/UpdateAppFormData';
    private lookupUrl = 'Common/GetFieldLookupValues';
    private deleteUrl = 'Common/DeleteAppFormData';

    private insertUpdateWorkflowPoint = 'WorkFlow/InsertUpdateWorkflowActionPoint';
    private insertWorkflowPermissions = 'WorkFlow/InsertWorkFlowActionPointPermissions';
    private updatetWorkflowEditableFields = 'WorkFlow/UpdateFieldAccess';
    private deleteWorkflow = 'WorkFlow/DeleteWorkflowActionPointWithNo';
    private isEditableWorkflowUrl = 'WorkFlow/GetWorkflowIsEditable';
    private insertWorkflowOutcome = 'WorkFlow/InsertWorkFlowActionPointOutcome';
    private dbObjectLookUpUrl = 'Common/GetDBObjectLookupValues';
    private updateWorkflowOutcome = 'WorkFlow/UpdateWorkFlowActionPointOutcome';

    private getNotificationRecipientsListUrl = 'WorkFlow/GetUserAndUserGroupListWithEmail';
    private insertUpdateEscalationNotificationUrl = 'WorkFlow/InsertUpdateEscalationNotification';
    private insertUpdateWorkTypeNotification = 'WorkFlow/InsertUpdateWorkTypeNotification';

    private setWorkFlowListFormId = 190;
    private setWorkFlowAddEditFormId = 193;
    private setWorkFlowEditableFieldsFormId = 229;
    private setWorkFlowPermissionsFormId = 223;
    private workFlowOutcomeFormId = 194;
    private workFlowOutcomeAddEditFormId = 208;

    private workflowEscalationsNotificationsListFormId = 538;
    private workflowEscalationsNotificationsAddEditFormId = 539;
    private selectNotificationRecipientsFormId = 547;
    private cloneWorkflowFormId = 544;
    private setNotificationFormId = 548;

    constructor(private http: Http) {
        super(http);
    }
    
    getFieldsList(moduleId: any, workFlowCategoryId: any) {
        return this.postaction({ Input: "{ FormId: " + this.setWorkFlowListFormId + " ,ListLookupReportFieldIdValues:[{ \"FieldId\":1043,\"ReportFieldId\": 5854, \"Value\":" + moduleId + " },{ \"FieldId\":1043,\"ReportFieldId\": 5875, \"Value\":" + 0 + "}]}" }, this.listFieldObjUrl);
    }

    getWorkFlowList(index: any, column: any, direction: any, workTypeId: any) {
        return this.postaction({ Input: "{ FormId:" + this.setWorkFlowListFormId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"}, {\"ReportFieldId\":5829,\"Value\": -1 }]}" }, this.listDataListUrl);
    }

    loadWorkFlowAddEdit(selectedId: number, target: number, workFlowCategoryId: any, moduleId: any, workTypeId: any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.setWorkFlowAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1069,\"ReportFieldId\": 5832, \"Value\":" + workTypeId + " },{ \"FieldId\":1000,\"ReportFieldId\": 6573, \"Value\": 0 }, { \"FieldId\":1000,\"ReportFieldId\": 6575, \"Value\": " + workTypeId + " }, { \"FieldId\":1000,\"ReportFieldId\": 5854, \"Value\": " + moduleId + " }, { \"FieldId\":1000,\"ReportFieldId\": 6569, \"Value\": 0 }, { \"FieldId\":1000,\"ReportFieldId\": 5830, \"Value\": 1 }]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.setWorkFlowAddEditFormId + ",ParentFormId:" + this.setWorkFlowListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1069,\"ReportFieldId\": 5832, \"Value\":" + workTypeId + " },{ \"FieldId\":1000,\"ReportFieldId\": 6573, \"Value\": 0 }, { \"FieldId\":1000,\"ReportFieldId\": 6575, \"Value\": 0 }, { \"FieldId\":1000,\"ReportFieldId\": 5854, \"Value\": " + moduleId + " }, { \"FieldId\":1000,\"ReportFieldId\": 6569, \"Value\": " + selectedId + " }, { \"FieldId\":1000,\"ReportFieldId\": 5830, \"Value\": 0 }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    postSubmitWorkFlow(pageDetails, selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ applnInput: "{ FormId:" + this.setWorkFlowAddEditFormId + ",ParentFormId:" + this.setWorkFlowListFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.insertUpdateWorkflowPoint);
        }
        else if (target == 2) {
            return this.postaction({ applnInput: "{ FormId:" + this.setWorkFlowAddEditFormId + ",ParentFormId:" + this.setWorkFlowListFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.insertUpdateWorkflowPoint);
        }
    }

    postDeleteWorkFlow(workTypeId: any, actionPointNumber: any, selectedId: any) {
        return this.postaction({ applnInput: "{FormId:" + this.setWorkFlowListFormId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5830,\"Value\":\"" + actionPointNumber + "\"}, {\"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"}, {\"ReportFieldId\":5829,\"Value\": -1 },{\"ReportFieldId\":5827,\"Value\": " + selectedId+" }], Id:" + selectedId + "}" }, this.deleteWorkflow)
    } 

    isEditableWorkflow(workTypeId: any, selectedId: any) {
        return this.postaction({ applnInput: "{ FormId:" + this.setWorkFlowListFormId + ",Id:" + workTypeId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5827,\"Value\":\"" + selectedId + "\"}]}" }, this.isEditableWorkflowUrl)
    }

    getWorkflowPermissionFields() {
        return this.postaction({ Input: "{ FormId: " + this.setWorkFlowPermissionsFormId + "}" }, this.listFieldObjUrl);
    }

    getWorkFlowPermissionsList(selectedId: any) {
        return this.postaction({ Input: "{ FormId:" + this.setWorkFlowPermissionsFormId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5825,\"Value\":\"" + selectedId + "\"}]}" }, this.listDataListUrl);
    }
    getWorkflowPermissions(selectedId: any) {
        return this.postaction({ Input: "{ FormId:" + this.setWorkFlowPermissionsFormId + ", ListLookupReportFieldIdValues: [{ \"FieldId\":1214,\"ReportFieldId\": 5825, \"Value\":" + selectedId + " }, { \"FieldId\":1232,\"ReportFieldId\": 5825, \"Value\":" + selectedId + " }], Id:" + selectedId + "}" }, this.editDataUrl);
    }

    postSubmitWorkflowPermissions(pageDetails, selectedId: number) {
        return this.postaction({
            applnInput: "{ FormId:" + this.setWorkFlowPermissionsFormId + ",ListPermissions:" + pageDetails + ",WorkFlowActionPointId:" + selectedId + "}" }, this.insertWorkflowPermissions);
    }

    getWorkFlowEditableFields() {
        return this.postaction({ Input: "{ FormId: " + this.setWorkFlowEditableFieldsFormId + "}" }, this.listFieldObjUrl);
    }

    getWorkFlowEditableFieldsList(selectedId: any) {
        return this.postaction({ Input: "{ FormId:" + this.setWorkFlowEditableFieldsFormId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5827,\"Value\":\"" + selectedId + "\"}]}" }, this.listDataListUrl);
    }

    postSubmitWorkflowEditableFields(pageDetails: any, selectedId: number) {
        return this.postaction({ Input: "{ ListEditViewValues:" + pageDetails + ",WorkFlowActionPointId:" + selectedId + "}" }, this.updatetWorkflowEditableFields);
    }

    getWorkflowOutcomeFields() {
        return this.postaction({ Input: "{ FormId: " + this.workFlowOutcomeFormId + "}"}, this.listFieldObjUrl);
    }

    getWorkflowOutcomeData(index: number, column: any, direction: any, selectedId: any, workTypeId: any) {
        var id;
        if (selectedId["currentValue"])
            id = selectedId["currentValue"]
        else
            id = selectedId
        return this.postaction({ Input: "{ FormId: " + this.workFlowOutcomeFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"}, {\"ReportFieldId\":5827,\"Value\":\"" + id + "\"}]}" }, this.listDataListUrl);
    }

    loadWorkflowOutcomeAdd(workFlowCategoryId: any, moduleId: any, workTypeId: any, workflowActionPointId: any) {
        return this.postaction({ Input: "{ FormId:" + this.workFlowOutcomeAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1080,\"ReportFieldId\": 6571, \"Value\": 0 },{ \"FieldId\":1080,\"ReportFieldId\": 6575, \"Value\": 0 }, { \"FieldId\":1080,\"ReportFieldId\": 5854, \"Value\": " + moduleId + " }, { \"FieldId\":1080,\"ReportFieldId\": 6569, \"Value\": " + workflowActionPointId + "}]}" }, this.addDataUrl);
    }

    loadWorkflowOutcomeEdit(selectedId: number, actionPointId: any, actionPointTypeId: any, workFlowCategoryId: any, moduleId: any, workflowActionPointId: any, outcomeTypeId: number, workflowEntityCategoryId: number, workTypeId: any) {
        return this.postaction({ Input: "{ FormId:" + this.workFlowOutcomeAddEditFormId + ",ParentFormId:" + this.workFlowOutcomeFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"}, {\"ReportFieldId\":5827,\"Value\":\"" + workflowActionPointId + "\"}], ListLookupReportFieldIdValues:[{ \"FieldId\":1080,\"ReportFieldId\": 6571, \"Value\":" + workFlowCategoryId + " },{ \"FieldId\":1080,\"ReportFieldId\": 6575, \"Value\":" + workTypeId + " }, { \"FieldId\":1080,\"ReportFieldId\": 5854, \"Value\": " + moduleId + " }, { \"FieldId\":1080,\"ReportFieldId\": 6569, \"Value\": " + workflowActionPointId + "}, { \"FieldId\":1081,\"ReportFieldId\": 5804, \"Value\":" + actionPointTypeId + " }, { \"FieldId\":1081,\"ReportFieldId\": 5855, \"Value\":" + workFlowCategoryId + " }, { \"FieldId\":1081,\"ReportFieldId\": 6575, \"Value\": " + workTypeId + "}, { \"FieldId\":1081,\"ReportFieldId\": 5835, \"Value\": " + workflowActionPointId + "}, { \"FieldId\":1081,\"ReportFieldId\": 5834, \"Value\": 0 }, { \"FieldId\":1083,\"ReportFieldId\": 6570, \"Value\":" + workflowEntityCategoryId + " }, { \"FieldId\":1083,\"ReportFieldId\": 5832, \"Value\": " + workTypeId + "}]" + ",Id:" + selectedId + "}" }, this.editDataUrl);    
    }

    loadOutcomeType(workflowEntityCategoryId: number, parentFieldId: number, actionPointTypeId: any, workFlowCategoryId: any, workTypeId: any, workflowActionPointId: any) {
        return this.postaction({ Input: "{FormId:" + this.workFlowOutcomeAddEditFormId + ",Id:" + workflowEntityCategoryId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":1081,\"ReportFieldId\": 5804, \"Value\":" + actionPointTypeId + " },{ \"FieldId\":1081,\"ReportFieldId\": 5855, \"Value\":" + workFlowCategoryId + " }, { \"FieldId\":1081,\"ReportFieldId\": 6575, \"Value\": " + workTypeId + "}, { \"FieldId\":1081,\"ReportFieldId\": 5835, \"Value\": " + workflowActionPointId + "}, { \"FieldId\":1081,\"ReportFieldId\": 5834, \"Value\": 1 }]}" }, this.lookupUrl);
    }

    loadNextActionPoint(outcomeTypeId: number, parentFieldId: number, workflowEntityCategoryId: number, workTypeId: any) {
        return this.postaction({ Input: "{FormId:" + this.workFlowOutcomeAddEditFormId + ",Id:" + outcomeTypeId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":1083,\"ReportFieldId\": 6570, \"Value\":" + workflowEntityCategoryId + " }, { \"FieldId\":1083,\"ReportFieldId\": 5832, \"Value\": " + workTypeId + "}]}" }, this.lookupUrl);
    }

    loadUser(nextActionPointId, parentFieldId: number, moduleId: number, selectedId: number) {
        return this.postaction({ Input: "{FormId:" + this.workFlowOutcomeAddEditFormId + ",Id:" + nextActionPointId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 271, \"Value\":" + moduleId + " }, { \"ReportFieldId\": 12179, \"Value\": " + selectedId + " }]}" }, this.lookupUrl);
    }

    loadNextActionPointDetails(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.workFlowOutcomeAddEditFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }

    loadMessageTemplateforOutcome(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.workFlowOutcomeAddEditFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }

    postSubmitWorkflowOutcome(pageDetails, selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ applnInput: "{ FormId:" + this.workFlowOutcomeAddEditFormId + ",ParentFormId:" + this.workFlowOutcomeFormId + ",ListReportFieldIdValues:" + pageDetails + "}", }, this.insertWorkflowOutcome);
        }
        else if (target == 2) {
            return this.postaction({ applnInput: "{ FormId:" + this.workFlowOutcomeAddEditFormId + ",ParentFormId:" + this.workFlowOutcomeFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.updateWorkflowOutcome);
        }
    } 

    postDeleteWorkflowOutcomes(selectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.workFlowOutcomeFormId + ",Id:" + selectedId + "}" }, this.deleteUrl)
    }

    /* Workflow Escalations Notifications */
    getWorkflowEscalationsNotificationsFields() {
        return this.postaction({ Input: "{ FormId: " + this.workflowEscalationsNotificationsListFormId + "}" }, this.listFieldObjUrl);
    }

    getWorkflowEscalationsNotificationsList(index: any, column: any, direction: any, workTypeId: any) {
        return this.postaction({ Input: "{ FormId:" + this.workflowEscalationsNotificationsListFormId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":5873,\"Value\":\"" + workTypeId + "\"}, {\"ReportFieldId\":571,\"Value\": 0 }]}" }, this.listDataListUrl);
    }

    loadWorkflowEscalationsNotificationsAddEdit(selectedId: number, target: number, workTypeId: any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":2767,\"ReportFieldId\": 5873, \"Value\":" + workTypeId + " }]}" }, this.addDataUrl);
        } else {
            return this.postaction({ Input: "{ FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ",ParentFormId:" + this.workflowEscalationsNotificationsListFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 5873, \"Value\": " + workTypeId + "}],ListLookupReportFieldIdValues:[{ \"FieldId\":2767,\"ReportFieldId\": 5873, \"Value\":" + workTypeId + " }, { \"FieldId\":2768,\"ReportFieldId\": 5873, \"Value\":" + workTypeId + " }, { \"FieldId\":2768,\"ReportFieldId\": 5834, \"Value\": " + 0 + "}, { \"FieldId\":2769,\"ReportFieldId\": 5873, \"Value\":" + workTypeId + " }, { \"FieldId\":2770,\"ReportFieldId\": 5873, \"Value\":" + workTypeId + " }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    loadOutcomefromSourceActionPoint(sourceActionPointId, parentFieldId: number, workTypeId: any) {
        return this.postaction({ Input: "{FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ",Id:" + sourceActionPointId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":2768,\"ReportFieldId\": 5873, \"Value\": " + workTypeId + "}, { \"FieldId\":2768,\"ReportFieldId\": 5834, \"Value\": " + 0 + "}]}" }, this.lookupUrl);
    }

    loadDestinationActionPoint(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.setNotificationFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }

    loadOutcomefromDestinationActionPoint(destinationActionPointId, parentFieldId: number, workTypeId: any, outcomefromSourceActionPointId: any) {
        return this.postaction({ Input: "{FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ",Id:" + destinationActionPointId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":2770,\"ReportFieldId\": 5873, \"Value\": " + workTypeId + "}, { \"FieldId\":2770,\"ReportFieldId\": 5834, \"Value\": " + outcomefromSourceActionPointId + "}]}" }, this.lookupUrl);
    }

    loadNotificationSubject(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }

    loadNotificationRecipients(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }

    postWorkflowEscalationsNotifications(pageDetails, userIds:any, userGroupIds: any, selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ",ParentFormId:" + this.workflowEscalationsNotificationsListFormId + ",ListReportFieldIdValues:" + pageDetails + "}", UserIds: userIds, UserGroupIds: userGroupIds, actionTarget: target }, this.insertUpdateEscalationNotificationUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{ FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ",ParentFormId:" + this.workflowEscalationsNotificationsListFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}", UserIds: userIds, UserGroupIds: userGroupIds, actionTarget: target }, this.insertUpdateEscalationNotificationUrl);
        }
    }

    postDeleteWorkflowEscalationsNotifications(selectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.workflowEscalationsNotificationsListFormId + ", Id:" + selectedId + "}" }, this.deleteUrl)
    } 

    /* select Notification Recipients */
    getNotificationRecipientsFields() {
        return this.postaction({ Input: "{ FormId: " + this.selectNotificationRecipientsFormId + " }" }, this.listFieldObjUrl);
    }

    getNotificationRecipientsList(index: number, column: any, direction: any, recipientTypeId: any) {
        return this.postaction({ Input: "{ FormId: " + this.selectNotificationRecipientsFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", UserCategoryId: recipientTypeId}, this.getNotificationRecipientsListUrl);
    }
    /* Copy Workflow */
    loadCloneWorkflow() {
        return this.postaction({ Input: "{ FormId:" + this.cloneWorkflowFormId + " }" }, this.addDataUrl);
    }

    postCopyWorkflow(pageDetails: any) {
        return this.postaction({ Input: "{ FormId:" + this.cloneWorkflowFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

     /* Workflow Notification */
    loadSetNotification(selectedId: any) {
        return this.postaction({ Input: "{ FormId:" + this.setNotificationFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":2801,\"ReportFieldId\": 5873, \"Value\":" + selectedId + " }]}" }, this.editDataUrl);
    }

    postSetNotification(pageDetails: any, userIds: any, userGroupIds: any) {
        return this.postaction({ Input: "{ FormId:" + this.setNotificationFormId + ",ListReportFieldIdValues:" + pageDetails + "}", UserIds: userIds, UserGroupIds: userGroupIds }, this.insertUpdateWorkTypeNotification);
    }

    loadActionPoint(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.setNotificationFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }

    loadOutcome(actionPointId, parentFieldId: number) {
        return this.postaction({ Input: "{FormId:" + this.setNotificationFormId + ",Id:" + actionPointId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    }

    loadMessageTemplate(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.setNotificationFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }

    loadNotificationRecipientsInWotkType(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.setNotificationFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }

    //loadMessageTemplate(messageCategoryId, parentFieldId: number) {
    //    return this.postaction({ Input: "{FormId:" + this.setNotificationFormId + ",Id:" + messageCategoryId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":2803,\"ReportFieldId\": 5472, \"Value\":" + messageCategoryId + " }]}" }, this.lookupUrl);
    //}
}
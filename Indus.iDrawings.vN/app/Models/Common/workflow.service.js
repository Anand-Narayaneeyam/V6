var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var HttpHelpers_1 = require('../../Whatever/utils/HttpHelpers');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/Rx');
var WorkFlowService = (function (_super) {
    __extends(WorkFlowService, _super);
    function WorkFlowService(http) {
        _super.call(this, http);
        this.http = http;
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.addDataUrl = 'Common/GetAddAppFormFields';
        this.editDataUrl = 'Common/GetEditAppFormFields';
        this.submitAddUrl = 'Common/InsertAppFormData';
        this.submitEditUrl = 'Common/UpdateAppFormData';
        this.lookupUrl = 'Common/GetFieldLookupValues';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.insertUpdateWorkflowPoint = 'WorkFlow/InsertUpdateWorkflowActionPoint';
        this.insertWorkflowPermissions = 'WorkFlow/InsertWorkFlowActionPointPermissions';
        this.updatetWorkflowEditableFields = 'WorkFlow/UpdateFieldAccess';
        this.deleteWorkflow = 'WorkFlow/DeleteWorkflowActionPointWithNo';
        this.isEditableWorkflowUrl = 'WorkFlow/GetWorkflowIsEditable';
        this.insertWorkflowOutcome = 'WorkFlow/InsertWorkFlowActionPointOutcome';
        this.dbObjectLookUpUrl = 'Common/GetDBObjectLookupValues';
        this.updateWorkflowOutcome = 'WorkFlow/UpdateWorkFlowActionPointOutcome';
        this.getNotificationRecipientsListUrl = 'WorkFlow/GetUserAndUserGroupListWithEmail';
        this.insertUpdateEscalationNotificationUrl = 'WorkFlow/InsertUpdateEscalationNotification';
        this.insertUpdateWorkTypeNotification = 'WorkFlow/InsertUpdateWorkTypeNotification';
        this.setWorkFlowListFormId = 190;
        this.setWorkFlowAddEditFormId = 193;
        this.setWorkFlowEditableFieldsFormId = 229;
        this.setWorkFlowPermissionsFormId = 223;
        this.workFlowOutcomeFormId = 194;
        this.workFlowOutcomeAddEditFormId = 208;
        this.workflowEscalationsNotificationsListFormId = 538;
        this.workflowEscalationsNotificationsAddEditFormId = 539;
        this.selectNotificationRecipientsFormId = 547;
        this.cloneWorkflowFormId = 544;
        this.setNotificationFormId = 548;
    }
    WorkFlowService.prototype.getFieldsList = function (moduleId, workFlowCategoryId) {
        return this.postaction({ Input: "{ FormId: " + this.setWorkFlowListFormId + " ,ListLookupReportFieldIdValues:[{ \"FieldId\":1043,\"ReportFieldId\": 5854, \"Value\":" + moduleId + " },{ \"FieldId\":1043,\"ReportFieldId\": 5875, \"Value\":" + 0 + "}]}" }, this.listFieldObjUrl);
    };
    WorkFlowService.prototype.getWorkFlowList = function (index, column, direction, workTypeId) {
        return this.postaction({ Input: "{ FormId:" + this.setWorkFlowListFormId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"}, {\"ReportFieldId\":5829,\"Value\": -1 }]}" }, this.listDataListUrl);
    };
    WorkFlowService.prototype.loadWorkFlowAddEdit = function (selectedId, target, workFlowCategoryId, moduleId, workTypeId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.setWorkFlowAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1069,\"ReportFieldId\": 5832, \"Value\":" + workTypeId + " },{ \"FieldId\":1000,\"ReportFieldId\": 6573, \"Value\": 0 }, { \"FieldId\":1000,\"ReportFieldId\": 6575, \"Value\": " + workTypeId + " }, { \"FieldId\":1000,\"ReportFieldId\": 5854, \"Value\": " + moduleId + " }, { \"FieldId\":1000,\"ReportFieldId\": 6569, \"Value\": 0 }, { \"FieldId\":1000,\"ReportFieldId\": 5830, \"Value\": 1 }]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.setWorkFlowAddEditFormId + ",ParentFormId:" + this.setWorkFlowListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1069,\"ReportFieldId\": 5832, \"Value\":" + workTypeId + " },{ \"FieldId\":1000,\"ReportFieldId\": 6573, \"Value\": 0 }, { \"FieldId\":1000,\"ReportFieldId\": 6575, \"Value\": 0 }, { \"FieldId\":1000,\"ReportFieldId\": 5854, \"Value\": " + moduleId + " }, { \"FieldId\":1000,\"ReportFieldId\": 6569, \"Value\": " + selectedId + " }, { \"FieldId\":1000,\"ReportFieldId\": 5830, \"Value\": 0 }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkFlowService.prototype.postSubmitWorkFlow = function (pageDetails, selectedId, target) {
        if (target == 1) {
            return this.postaction({ applnInput: "{ FormId:" + this.setWorkFlowAddEditFormId + ",ParentFormId:" + this.setWorkFlowListFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.insertUpdateWorkflowPoint);
        }
        else if (target == 2) {
            return this.postaction({ applnInput: "{ FormId:" + this.setWorkFlowAddEditFormId + ",ParentFormId:" + this.setWorkFlowListFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.insertUpdateWorkflowPoint);
        }
    };
    WorkFlowService.prototype.postDeleteWorkFlow = function (workTypeId, actionPointNumber, selectedId) {
        return this.postaction({ applnInput: "{FormId:" + this.setWorkFlowListFormId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5830,\"Value\":\"" + actionPointNumber + "\"}, {\"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"}, {\"ReportFieldId\":5829,\"Value\": -1 },{\"ReportFieldId\":5827,\"Value\": " + selectedId + " }], Id:" + selectedId + "}" }, this.deleteWorkflow);
    };
    WorkFlowService.prototype.isEditableWorkflow = function (workTypeId, selectedId) {
        return this.postaction({ applnInput: "{ FormId:" + this.setWorkFlowListFormId + ",Id:" + workTypeId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5827,\"Value\":\"" + selectedId + "\"}]}" }, this.isEditableWorkflowUrl);
    };
    WorkFlowService.prototype.getWorkflowPermissionFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.setWorkFlowPermissionsFormId + "}" }, this.listFieldObjUrl);
    };
    WorkFlowService.prototype.getWorkFlowPermissionsList = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.setWorkFlowPermissionsFormId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5825,\"Value\":\"" + selectedId + "\"}]}" }, this.listDataListUrl);
    };
    WorkFlowService.prototype.getWorkflowPermissions = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.setWorkFlowPermissionsFormId + ", ListLookupReportFieldIdValues: [{ \"FieldId\":1214,\"ReportFieldId\": 5825, \"Value\":" + selectedId + " }, { \"FieldId\":1232,\"ReportFieldId\": 5825, \"Value\":" + selectedId + " }], Id:" + selectedId + "}" }, this.editDataUrl);
    };
    WorkFlowService.prototype.postSubmitWorkflowPermissions = function (pageDetails, selectedId) {
        return this.postaction({
            applnInput: "{ FormId:" + this.setWorkFlowPermissionsFormId + ",ListPermissions:" + pageDetails + ",WorkFlowActionPointId:" + selectedId + "}" }, this.insertWorkflowPermissions);
    };
    WorkFlowService.prototype.getWorkFlowEditableFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.setWorkFlowEditableFieldsFormId + "}" }, this.listFieldObjUrl);
    };
    WorkFlowService.prototype.getWorkFlowEditableFieldsList = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.setWorkFlowEditableFieldsFormId + ", ListReportFieldIdValues:[{\"ReportFieldId\":5827,\"Value\":\"" + selectedId + "\"}]}" }, this.listDataListUrl);
    };
    WorkFlowService.prototype.postSubmitWorkflowEditableFields = function (pageDetails, selectedId) {
        return this.postaction({ Input: "{ ListEditViewValues:" + pageDetails + ",WorkFlowActionPointId:" + selectedId + "}" }, this.updatetWorkflowEditableFields);
    };
    WorkFlowService.prototype.getWorkflowOutcomeFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.workFlowOutcomeFormId + "}" }, this.listFieldObjUrl);
    };
    WorkFlowService.prototype.getWorkflowOutcomeData = function (index, column, direction, selectedId, workTypeId) {
        var id;
        if (selectedId["currentValue"])
            id = selectedId["currentValue"];
        else
            id = selectedId;
        return this.postaction({ Input: "{ FormId: " + this.workFlowOutcomeFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"}, {\"ReportFieldId\":5827,\"Value\":\"" + id + "\"}]}" }, this.listDataListUrl);
    };
    WorkFlowService.prototype.loadWorkflowOutcomeAdd = function (workFlowCategoryId, moduleId, workTypeId, workflowActionPointId) {
        return this.postaction({ Input: "{ FormId:" + this.workFlowOutcomeAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1080,\"ReportFieldId\": 6571, \"Value\": 0 },{ \"FieldId\":1080,\"ReportFieldId\": 6575, \"Value\": 0 }, { \"FieldId\":1080,\"ReportFieldId\": 5854, \"Value\": " + moduleId + " }, { \"FieldId\":1080,\"ReportFieldId\": 6569, \"Value\": " + workflowActionPointId + "}]}" }, this.addDataUrl);
    };
    WorkFlowService.prototype.loadWorkflowOutcomeEdit = function (selectedId, actionPointId, actionPointTypeId, workFlowCategoryId, moduleId, workflowActionPointId, outcomeTypeId, workflowEntityCategoryId, workTypeId) {
        return this.postaction({ Input: "{ FormId:" + this.workFlowOutcomeAddEditFormId + ",ParentFormId:" + this.workFlowOutcomeFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"}, {\"ReportFieldId\":5827,\"Value\":\"" + workflowActionPointId + "\"}], ListLookupReportFieldIdValues:[{ \"FieldId\":1080,\"ReportFieldId\": 6571, \"Value\":" + workFlowCategoryId + " },{ \"FieldId\":1080,\"ReportFieldId\": 6575, \"Value\":" + workTypeId + " }, { \"FieldId\":1080,\"ReportFieldId\": 5854, \"Value\": " + moduleId + " }, { \"FieldId\":1080,\"ReportFieldId\": 6569, \"Value\": " + workflowActionPointId + "}, { \"FieldId\":1081,\"ReportFieldId\": 5804, \"Value\":" + actionPointTypeId + " }, { \"FieldId\":1081,\"ReportFieldId\": 5855, \"Value\":" + workFlowCategoryId + " }, { \"FieldId\":1081,\"ReportFieldId\": 6575, \"Value\": " + workTypeId + "}, { \"FieldId\":1081,\"ReportFieldId\": 5835, \"Value\": " + workflowActionPointId + "}, { \"FieldId\":1081,\"ReportFieldId\": 5834, \"Value\": 0 }, { \"FieldId\":1083,\"ReportFieldId\": 6570, \"Value\":" + workflowEntityCategoryId + " }, { \"FieldId\":1083,\"ReportFieldId\": 5832, \"Value\": " + workTypeId + "}]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
    };
    WorkFlowService.prototype.loadOutcomeType = function (workflowEntityCategoryId, parentFieldId, actionPointTypeId, workFlowCategoryId, workTypeId, workflowActionPointId) {
        return this.postaction({ Input: "{FormId:" + this.workFlowOutcomeAddEditFormId + ",Id:" + workflowEntityCategoryId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":1081,\"ReportFieldId\": 5804, \"Value\":" + actionPointTypeId + " },{ \"FieldId\":1081,\"ReportFieldId\": 5855, \"Value\":" + workFlowCategoryId + " }, { \"FieldId\":1081,\"ReportFieldId\": 6575, \"Value\": " + workTypeId + "}, { \"FieldId\":1081,\"ReportFieldId\": 5835, \"Value\": " + workflowActionPointId + "}, { \"FieldId\":1081,\"ReportFieldId\": 5834, \"Value\": 1 }]}" }, this.lookupUrl);
    };
    WorkFlowService.prototype.loadNextActionPoint = function (outcomeTypeId, parentFieldId, workflowEntityCategoryId, workTypeId) {
        return this.postaction({ Input: "{FormId:" + this.workFlowOutcomeAddEditFormId + ",Id:" + outcomeTypeId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":1083,\"ReportFieldId\": 6570, \"Value\":" + workflowEntityCategoryId + " }, { \"FieldId\":1083,\"ReportFieldId\": 5832, \"Value\": " + workTypeId + "}]}" }, this.lookupUrl);
    };
    WorkFlowService.prototype.loadUser = function (nextActionPointId, parentFieldId, moduleId, selectedId) {
        return this.postaction({ Input: "{FormId:" + this.workFlowOutcomeAddEditFormId + ",Id:" + nextActionPointId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"ReportFieldId\": 271, \"Value\":" + moduleId + " }, { \"ReportFieldId\": 12179, \"Value\": " + selectedId + " }]}" }, this.lookupUrl);
    };
    WorkFlowService.prototype.loadNextActionPointDetails = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.workFlowOutcomeAddEditFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    WorkFlowService.prototype.loadMessageTemplateforOutcome = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.workFlowOutcomeAddEditFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    WorkFlowService.prototype.postSubmitWorkflowOutcome = function (pageDetails, selectedId, target) {
        if (target == 1) {
            return this.postaction({ applnInput: "{ FormId:" + this.workFlowOutcomeAddEditFormId + ",ParentFormId:" + this.workFlowOutcomeFormId + ",ListReportFieldIdValues:" + pageDetails + "}", }, this.insertWorkflowOutcome);
        }
        else if (target == 2) {
            return this.postaction({ applnInput: "{ FormId:" + this.workFlowOutcomeAddEditFormId + ",ParentFormId:" + this.workFlowOutcomeFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}" }, this.updateWorkflowOutcome);
        }
    };
    WorkFlowService.prototype.postDeleteWorkflowOutcomes = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.workFlowOutcomeFormId + ",Id:" + selectedId + "}" }, this.deleteUrl);
    };
    /* Workflow Escalations Notifications */
    WorkFlowService.prototype.getWorkflowEscalationsNotificationsFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.workflowEscalationsNotificationsListFormId + "}" }, this.listFieldObjUrl);
    };
    WorkFlowService.prototype.getWorkflowEscalationsNotificationsList = function (index, column, direction, workTypeId) {
        return this.postaction({ Input: "{ FormId:" + this.workflowEscalationsNotificationsListFormId + ", SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ", ListReportFieldIdValues:[{\"ReportFieldId\":5873,\"Value\":\"" + workTypeId + "\"}, {\"ReportFieldId\":571,\"Value\": 0 }]}" }, this.listDataListUrl);
    };
    WorkFlowService.prototype.loadWorkflowEscalationsNotificationsAddEdit = function (selectedId, target, workTypeId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":2767,\"ReportFieldId\": 5873, \"Value\":" + workTypeId + " }]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ",ParentFormId:" + this.workflowEscalationsNotificationsListFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 5873, \"Value\": " + workTypeId + "}],ListLookupReportFieldIdValues:[{ \"FieldId\":2767,\"ReportFieldId\": 5873, \"Value\":" + workTypeId + " }, { \"FieldId\":2768,\"ReportFieldId\": 5873, \"Value\":" + workTypeId + " }, { \"FieldId\":2768,\"ReportFieldId\": 5834, \"Value\": " + 0 + "}, { \"FieldId\":2769,\"ReportFieldId\": 5873, \"Value\":" + workTypeId + " }, { \"FieldId\":2770,\"ReportFieldId\": 5873, \"Value\":" + workTypeId + " }]" + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    WorkFlowService.prototype.loadOutcomefromSourceActionPoint = function (sourceActionPointId, parentFieldId, workTypeId) {
        return this.postaction({ Input: "{FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ",Id:" + sourceActionPointId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":2768,\"ReportFieldId\": 5873, \"Value\": " + workTypeId + "}, { \"FieldId\":2768,\"ReportFieldId\": 5834, \"Value\": " + 0 + "}]}" }, this.lookupUrl);
    };
    WorkFlowService.prototype.loadDestinationActionPoint = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.setNotificationFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    WorkFlowService.prototype.loadOutcomefromDestinationActionPoint = function (destinationActionPointId, parentFieldId, workTypeId, outcomefromSourceActionPointId) {
        return this.postaction({ Input: "{FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ",Id:" + destinationActionPointId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{ \"FieldId\":2770,\"ReportFieldId\": 5873, \"Value\": " + workTypeId + "}, { \"FieldId\":2770,\"ReportFieldId\": 5834, \"Value\": " + outcomefromSourceActionPointId + "}]}" }, this.lookupUrl);
    };
    WorkFlowService.prototype.loadNotificationSubject = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    WorkFlowService.prototype.loadNotificationRecipients = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    WorkFlowService.prototype.postWorkflowEscalationsNotifications = function (pageDetails, userIds, userGroupIds, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ",ParentFormId:" + this.workflowEscalationsNotificationsListFormId + ",ListReportFieldIdValues:" + pageDetails + "}", UserIds: userIds, UserGroupIds: userGroupIds, actionTarget: target }, this.insertUpdateEscalationNotificationUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{ FormId:" + this.workflowEscalationsNotificationsAddEditFormId + ",ParentFormId:" + this.workflowEscalationsNotificationsListFormId + ",ListReportFieldIdValues: " + pageDetails + ",Id:" + selectedId + "}", UserIds: userIds, UserGroupIds: userGroupIds, actionTarget: target }, this.insertUpdateEscalationNotificationUrl);
        }
    };
    WorkFlowService.prototype.postDeleteWorkflowEscalationsNotifications = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + this.workflowEscalationsNotificationsListFormId + ", Id:" + selectedId + "}" }, this.deleteUrl);
    };
    /* select Notification Recipients */
    WorkFlowService.prototype.getNotificationRecipientsFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.selectNotificationRecipientsFormId + " }" }, this.listFieldObjUrl);
    };
    WorkFlowService.prototype.getNotificationRecipientsList = function (index, column, direction, recipientTypeId) {
        return this.postaction({ Input: "{ FormId: " + this.selectNotificationRecipientsFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", UserCategoryId: recipientTypeId }, this.getNotificationRecipientsListUrl);
    };
    /* Copy Workflow */
    WorkFlowService.prototype.loadCloneWorkflow = function () {
        return this.postaction({ Input: "{ FormId:" + this.cloneWorkflowFormId + " }" }, this.addDataUrl);
    };
    WorkFlowService.prototype.postCopyWorkflow = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.cloneWorkflowFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    /* Workflow Notification */
    WorkFlowService.prototype.loadSetNotification = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.setNotificationFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":2801,\"ReportFieldId\": 5873, \"Value\":" + selectedId + " }]}" }, this.editDataUrl);
    };
    WorkFlowService.prototype.postSetNotification = function (pageDetails, userIds, userGroupIds) {
        return this.postaction({ Input: "{ FormId:" + this.setNotificationFormId + ",ListReportFieldIdValues:" + pageDetails + "}", UserIds: userIds, UserGroupIds: userGroupIds }, this.insertUpdateWorkTypeNotification);
    };
    WorkFlowService.prototype.loadActionPoint = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.setNotificationFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    WorkFlowService.prototype.loadOutcome = function (actionPointId, parentFieldId) {
        return this.postaction({ Input: "{FormId:" + this.setNotificationFormId + ",Id:" + actionPointId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
    };
    WorkFlowService.prototype.loadMessageTemplate = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.setNotificationFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    WorkFlowService.prototype.loadNotificationRecipientsInWotkType = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.setNotificationFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    WorkFlowService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], WorkFlowService);
    return WorkFlowService;
}(HttpHelpers_1.HttpHelpers));
exports.WorkFlowService = WorkFlowService;
//# sourceMappingURL=workflow.service.js.map
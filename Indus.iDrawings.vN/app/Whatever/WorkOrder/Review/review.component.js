var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="review history/reviewhistory.ts" />
var core_1 = require('@angular/core');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var serviceReview_list_component_1 = require('./serviceReview-list.component');
var reviewServiceRequests_component_1 = require('./reviewServiceRequests.component');
var reviewDocument_list_component_1 = require('./reviewDocument-list.component');
var reviewEquipment_list_component_1 = require('./reviewEquipment-list.component');
var review_Cost_component_1 = require('./Review Cost/review-Cost.component');
var reviewPmWorkorder_list_component_1 = require('./reviewPmWorkorder-list.component');
var reviewPMWorkorder_component_1 = require('./reviewPMWorkorder.component');
var reviewteam_members_component_1 = require('./review team members/reviewteam-members.component');
var reviewhistory_1 = require('./review history/reviewhistory');
var chargeback_list_1 = require('./Manage Chargeback/chargeback-list');
var attachments_component_1 = require('../../Common/Attachments/attachments.component');
var ReviewWorkOrderComponent = (function () {
    function ReviewWorkOrderComponent(notificationService, workOrdereService, generalFunctions, _validateService) {
        this.notificationService = notificationService;
        this.workOrdereService = workOrdereService;
        this.generalFunctions = generalFunctions;
        this._validateService = _validateService;
        this.pageTitle = "Review";
        this.pagePath = "Work Order";
        this.createReviewTabName = "Create Request";
        this.addOnTabName = "Documents";
        this.selectedTab = 0;
        this.serviceRequestListSource = [];
        this.pmListSource = [];
        this.documentSource = [];
        this.equipmentListSource = [];
        this.outComeData = [];
        this.linkArray = undefined;
        this.requestId = 0;
        this.workOrderId = 0;
        this.tabDeleteIndex = 0;
        this.reviewListItemsPerPage = 0;
        this.pmListItemsPerPage = 0;
        this.equipmentListItemsPerPage = 0;
        this.reviewListTotalItems = 0;
        this.pmListTotalItems = 0;
        this.equipmentListTotalItems = 0;
        this.entityCategoryId = 0;
        this.reviewTabEnabled = false;
        this.pmWorkOrderReviewEnabled = false;
        this.createRequestEnabled = false;
        this.documentTabEnabled = false;
        this.costTabEnabled = false;
        this.invoiceTabEnabled = false;
        this.equipmentTabEnabled = false;
        this.addOnTabEnabled = false;
        this.teamMemberTabEnabled = false;
        this.historyTabEnabled = false;
        this.chargebackTabEnabled = false;
        this.isInProgressSubscribed = false;
        this.isTimeSpentSubscribed = false;
        this.currentWorkFlowActionPointId = 0;
        this.workFlowEntityIds = [];
        this.statusId = 0;
        this.documentEnableMenu = [];
        this.requestNumber = "";
        this.siteId = 0;
        this.userDetails = { UserId: 0, UserName: "", UserEmail: "", UserFirstName: "", UserMiddleName: "", UserLastName: "", UserPhoneNo: "" };
        this.serviceRequestInputItems = { dataKey: "WorkRequestId", groupBy: [], grpWithCheckBx: false, sortCol: "[Requested Date]", sortDir: "DESC", allowAdd: false, allowEdit: false };
        this.pmListInputItems = { dataKey: "WorkOrderId", groupBy: [], grpWithCheckBx: false, sortCol: "[Scheduled Date]", sortDir: "DESC", allowAdd: false, allowEdit: false };
        this.equipmentListInputtems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalCostItems = { TechnicianTotalCost: 0.00, PartsTotalCost: 0.00, ToolsTotalCost: 0.00, OtherTotalCost: 0.00 };
        this.submitOutput = {
            WFEntityInput: null,
            WFEntityDocumentInput: null,
            //WFEntityEquipmentInput: null,
            ParentFormId: 0
        };
        this.isMultiple = false;
        this.reloadData = false;
    }
    ReviewWorkOrderComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.workOrdereService.getValuesWithDbObjectDetails(50781, '').subscribe(function (resultData) {
            if (resultData["Data"] != "[]") {
                resultData = (JSON.parse(resultData["Data"]))[0];
                contextObj.userDetails.UserFirstName = resultData["FirstName"];
                contextObj.userDetails.UserMiddleName = resultData["MiddleName"];
                contextObj.userDetails.UserLastName = resultData["LastName"];
                contextObj.userDetails.UserId = resultData["UserId"];
                contextObj.userDetails.UserName = resultData["Name"];
                contextObj.userDetails.UserEmail = resultData["Email"];
                contextObj.userDetails.UserPhoneNo = resultData["Phone Number"];
            }
        });
        contextObj.workOrdereService.checkSubscribedFeature('231,198').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0)
                return;
            for (var _i = 0, _a = result["Data"]; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.Id == 198)
                    contextObj.isTimeSpentSubscribed = item["IsSubscribed"];
                else if (item.Id == 231)
                    contextObj.isInProgressSubscribed = item["IsSubscribed"];
            }
        });
    };
    /***********************************************************************************************************
    * Function:     getSelectedTab
    * Description:  Fires when Tab is selected.
    * Comments:     Logic of tab closing while clicking each tab is done here
    *               Do Not Change Anything Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.getSelectedTab = function (event) {
        switch (event[0]) {
            case 0:
                if (event[1]) {
                    if (this.addOnTabEnabled && this.reviewTabEnabled) {
                        this.closeTab(3);
                        this.closeTab(2);
                    }
                    else if (this.addOnTabEnabled || this.reviewTabEnabled) {
                        this.closeTab(2);
                    }
                }
                this.pagePath = "Work Order / Current Tasks / Service Requests";
                break;
            case 1:
                if (event[1]) {
                    if (this.addOnTabEnabled && this.reviewTabEnabled) {
                        this.closeTab(3);
                        this.closeTab(2);
                    }
                    else if (this.addOnTabEnabled || this.reviewTabEnabled) {
                        this.closeTab(2);
                    }
                }
                this.pagePath = "Work Order / Current Tasks / PM Work Orders";
                break;
            case 2:
                if (event[1]) {
                    if (this.addOnTabEnabled && this.reviewTabEnabled) {
                        this.closeTab(3);
                    }
                }
                else {
                    var contextObj = this;
                    setTimeout(function () {
                        if (contextObj.entityCategoryId == 3) {
                            contextObj.pmWorkOrderReviewEnabled = true;
                        }
                        else {
                            contextObj.createRequestEnabled = true;
                        }
                    }, 500);
                }
                break;
        }
        this.selectedTab = event[0];
    };
    /***********************************************************************************************************
    * Function:     onTabClose
    * Description:  Fires when Tab Close button clicked.
    * Comments:     Logic of tab closing while Close button is done here
    *               Do Not Change Anything Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.onTabClose = function (event) {
        switch (event[0]) {
            case 0:
                this.reviewTabEnabled = false;
                break;
            case 1:
                if (this.addOnTabEnabled && this.reviewTabEnabled) {
                    this.reviewTabEnabled = this.createRequestEnabled = this.pmWorkOrderReviewEnabled = false;
                    this.selectedTab = 2;
                }
                else if (!this.addOnTabEnabled && this.reviewTabEnabled) {
                    this.reviewTabEnabled = false;
                    if (this.pmWorkOrderReviewEnabled) {
                        this.selectedTab = 1;
                    }
                    else if (this.createRequestEnabled) {
                        this.selectedTab = 0;
                    }
                    this.createRequestEnabled = this.pmWorkOrderReviewEnabled = false;
                }
                else if (this.addOnTabEnabled && !this.reviewTabEnabled) {
                    this.addOnTabEnabled = this.equipmentTabEnabled = this.documentTabEnabled = this.costTabEnabled = this.teamMemberTabEnabled = this.historyTabEnabled = this.chargebackTabEnabled = false;
                    this.selectedTab = 0;
                }
                break;
            case 2:
                this.addOnTabEnabled = this.equipmentTabEnabled = this.documentTabEnabled = this.costTabEnabled = this.teamMemberTabEnabled = this.historyTabEnabled = this.chargebackTabEnabled = false;
                this.selectedTab = 2;
                break;
            case 3:
                if (this.reviewTabEnabled) {
                    this.reviewTabEnabled = false;
                    if (this.pmWorkOrderReviewEnabled) {
                        this.selectedTab = 1;
                    }
                    else if (this.createRequestEnabled) {
                        this.selectedTab = 0;
                    }
                    this.createRequestEnabled = this.pmWorkOrderReviewEnabled = this.addOnTabEnabled = this.equipmentTabEnabled = this.documentTabEnabled = this.costTabEnabled = this.teamMemberTabEnabled = this.historyTabEnabled = this.chargebackTabEnabled = false;
                    this.closeTab(3);
                }
                break;
            default:
                break;
        }
    };
    /***********************************************************************************************************
    * Function:     closeTab
    * Description:  Deletes the tab with given index.
    * Comments:     Changes the boolean values for other tabs to false
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.closeTab = function (index) {
        var contextObj = this;
        switch (index) {
            case 2:
                contextObj.reviewTabEnabled = contextObj.createRequestEnabled = contextObj.pmWorkOrderReviewEnabled = false;
                break;
            case 3:
                contextObj.addOnTabEnabled = contextObj.equipmentTabEnabled = contextObj.documentTabEnabled = contextObj.costTabEnabled = contextObj.teamMemberTabEnabled = contextObj.historyTabEnabled = contextObj.invoiceTabEnabled = contextObj.chargebackTabEnabled = false;
                break;
        }
        setTimeout(function () {
            contextObj.tabDeleteIndex = index;
        }, 50);
        setTimeout(function () {
            contextObj.tabDeleteIndex = 0;
        }, 50);
    };
    /************************************************************************
    * Source Update Events
    *
    *************************************************************************/
    ReviewWorkOrderComponent.prototype.onServiceListSourceUpdated = function (event) {
        this.serviceRequestListSource = event.itemSource;
        this.reviewListItemsPerPage = event.rowsPerPage;
        this.reviewListTotalItems = event.totalItems;
    };
    ReviewWorkOrderComponent.prototype.onPMListSourceUpdated = function (event) {
        this.pmListSource = event.itemSource;
        this.pmListItemsPerPage = event.rowsPerPage;
        this.pmListTotalItems = event.totalItems;
    };
    ReviewWorkOrderComponent.prototype.onDocumentSourceUpdated = function (event) {
        this.documentSource = event;
    };
    ReviewWorkOrderComponent.prototype.onEquipmentListSourceUpdated = function (event) {
        this.equipmentListSource = event.itemSource;
        this.equipmentListItemsPerPage = event.rowsPerPage;
        this.equipmentListTotalItems = event.totalItems;
    };
    /***********************************************************************************************************
    * Function:     onServiceRequestAddEditClicked
    * Description:  Triggers when Review button is clicked from Service Requests.
    * Comments:     Refer function reviewClick() in serviceReview-List.component.ts
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.onServiceRequestAddEditClicked = function (event) {
        var contextObj = this;
        contextObj.createRequestEnabled = contextObj.pmWorkOrderReviewEnabled = contextObj.reviewTabEnabled = false;
        contextObj.linkArray = undefined;
        contextObj.fieldDetailsAdd1 = event.fieldobject;
        contextObj.action = event.action;
        contextObj.btnName = event.buttonName;
        contextObj.serviceRequestInputItems = event.input;
        contextObj.outComeData = event.outComes;
        if (contextObj.action == "review") {
            contextObj.createReviewTabName = "Review Request";
            contextObj.currentWorkFlowActionPointId = contextObj.serviceRequestInputItems.rowData["CurrentWorkFlowActionPointId"];
            contextObj.workFlowEntityIds = [contextObj.serviceRequestInputItems.rowData.WorkFlowEntityId];
            contextObj.requestId = contextObj.serviceRequestInputItems.rowData.WorkRequestId;
            contextObj.workOrderId = contextObj.serviceRequestInputItems.rowData.WorkOrderId == null ? 0 : contextObj.serviceRequestInputItems.rowData.WorkOrderId;
            contextObj.serviceRequestInputItems.dataKey = (contextObj.workOrderId == 0 || contextObj.workOrderId == null) ? "WorkRequestId" : "WorkOrderId";
            contextObj.entityCategoryId = contextObj.serviceRequestInputItems.rowData.WorkflowEntityCategoryId;
            contextObj.statusId = contextObj.serviceRequestInputItems.rowData["StatusId"];
            contextObj.requestNumber = contextObj.serviceRequestInputItems.rowData["Request Number"];
            contextObj.pagePath = "Work Order / Current Tasks / Service Requests / Review";
            contextObj.documentSource = [];
            contextObj.getPermissionDetails(contextObj.currentWorkFlowActionPointId, contextObj.serviceRequestInputItems.rowData[contextObj.serviceRequestInputItems.dataKey]);
        }
        else {
            contextObj.createReviewTabName = "Create Request";
            contextObj.requestId = 0;
            contextObj.workOrderId = 0;
            contextObj.entityCategoryId = 1;
            contextObj.workFlowEntityIds = [];
            contextObj.statusId = 0;
            contextObj.serviceRequestInputItems.dataKey = "WorkRequestId";
            contextObj.pagePath = "Work Order / Current Tasks / Service Requests / Create Request";
            contextObj.documentSource = [];
            setTimeout(function () {
                contextObj.selectedTab = 2;
            }, 500);
            this.reviewTabEnabled = true;
        }
        //setTimeout(function () {
        //    contextObj.selectedTab = 2;
        //}, 500);
        //this.reviewTabEnabled = true;
    };
    ReviewWorkOrderComponent.prototype.changeServiceRequestField = function () {
    };
    /***********************************************************************************************************
    * Function:     onPMReviewClick
    * Description:  Triggers when Review button is clicked from PM Workorder.
    * Comments:     Refer function reviewClick() in reviewPmWorkorder-List.component.ts
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.onPMReviewClick = function (event) {
        var contextObj = this;
        contextObj.linkArray = undefined;
        contextObj.createRequestEnabled = contextObj.pmWorkOrderReviewEnabled = contextObj.reviewTabEnabled = false;
        contextObj.currentWorkFlowActionPointId = contextObj.pmListInputItems.rowData["CurrentWorkFlowActionPointId"];
        contextObj.fieldDetailsAdd1 = event.fieldobject;
        contextObj.action = event.action;
        contextObj.btnName = event.buttonName;
        contextObj.pmListInputItems = event.input;
        contextObj.outComeData = event.outComes;
        contextObj.createReviewTabName = "Review Work Order";
        contextObj.pagePath = "Work Order / Current Tasks / PM Work Orders / Review";
        contextObj.statusId = contextObj.pmListInputItems.rowData["StatusId"];
        contextObj.workFlowEntityIds = [contextObj.pmListInputItems.rowData.WorkFlowEntityId];
        contextObj.workOrderId = contextObj.pmListInputItems.rowData.WorkOrderId;
        contextObj.requestNumber = contextObj.pmListInputItems.rowData["Work Order No."];
        contextObj.entityCategoryId = 3;
        contextObj.getPermissionDetails(contextObj.currentWorkFlowActionPointId, contextObj.pmListInputItems.rowData[contextObj.pmListInputItems.dataKey]);
        //contextObj.getEditableFields();
        //contextObj.getReviewCostDetails();
        //if (contextObj.isTimeSpentSubscribed) contextObj.getAutoPopulatedTimeSpentValue();
        //setTimeout(function () {
        //    contextObj.selectedTab = 2;
        //}, 300);
        //this.reviewTabEnabled = true;
    };
    /***********************************************************************************************************
    * Function:     getPermissionDetails
    * Description:  Gets the permissions for the Current Action Point (Manage Documents, etc..).
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.getPermissionDetails = function (workFlowActionPointId, dataKeyId) {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push({
            ReportFieldId: 5825,
            Value: workFlowActionPointId
        });
        contextObj.workOrdereService.getValuesWithDbObjectDetails(50694, JSON.stringify(tempArray)).subscribe(function (permission) {
            contextObj.updateLinkArray(JSON.parse(permission["Data"]), contextObj.action == "review" ? dataKeyId : 0);
            contextObj.getEditableFields();
        });
    };
    /***********************************************************************************************************
    * Function:     onRequesterPermissionUpdate
    * Description:  Gets the permissions for requester while changing WorkType in Review Page.
    * Comments:     Refer function getRequesterPermissionDetails() in reviewServiceRequest.component.ts
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.onRequesterPermissionUpdate = function (event) {
        var filteredForRequester = event.filter(function (item) { return (item.Id != 2 && item.Id != 13); });
        this.updateLinkArray(filteredForRequester, 0);
    };
    /***********************************************************************************************************
    * Function:     updateLinkArray
    * Description:  Pushes the items which have Permissions into linkArray. Items in linkArray are shown
    *               in the Review Page as Links
    * Comments:     Team Members and History are Static Permissions, hence they are pushed manually (only if
    *               action is Review)
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.updateLinkArray = function (fieldDetailsArray, dataKeyId) {
        this.linkArray = undefined;
        if (fieldDetailsArray == null || fieldDetailsArray == undefined || fieldDetailsArray.length == 0)
            return;
        var temp = new Array(); /*Documents, Equipment and Cost are done now. Update here while doing others. Also refer onLinkClick()*/
        for (var _i = 0, fieldDetailsArray_1 = fieldDetailsArray; _i < fieldDetailsArray_1.length; _i++) {
            var item = fieldDetailsArray_1[_i];
            if (item["Has Permission"] == 1 && (item.Id == 14 || item.Id == 3 || item.Id == 2 || item.Id == 13 || item.Id == 11 || item.Id == 12) && item.EntityCategoryId == (this.entityCategoryId == 2 ? 1 : this.entityCategoryId)) {
                temp.push({
                    Id: item.Id,
                    Name: item.Name,
                    DataKeyId: dataKeyId
                });
            }
            else if (item["Has Permission"] == 1 && (item.Id == 16) && item.EntityCategoryId == this.entityCategoryId) {
                if ((item.EntityCategoryId == 2 && this.serviceRequestInputItems.rowData["StatusId"] == 11) || (item.EntityCategoryId == 3 && this.pmListInputItems.rowData["StatusId"] == 11)) {
                    temp.push({
                        Id: item.Id,
                        Name: item.Name,
                        DataKeyId: dataKeyId
                    });
                }
            }
        }
        if (this.action == "review") {
            temp.push({
                Id: 999,
                Name: "Team Members",
                DataKeyId: dataKeyId
            }, {
                Id: 9999,
                Name: "History",
                DataKeyId: dataKeyId
            });
        }
        this.linkArray = temp;
    };
    /***********************************************************************************************************
    * Function:     onLinkClick
    * Description:  Fires when Permission Link is Clicked in Review or Create Page
    * Comments:     Corresponding boolean variables are changed and new tab is shown
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.onLinkClick = function (linkDetails) {
        var contextObj = this;
        contextObj.addOnTabEnabled = contextObj.documentTabEnabled = contextObj.costTabEnabled = contextObj.equipmentTabEnabled = contextObj.chargebackTabEnabled = this.invoiceTabEnabled = false;
        contextObj.addOnTabEnabled = true;
        switch (linkDetails.Id) {
            case 1: /*Manage Drawing */
            case 15:
                return;
            case 2: /*Manage Equipment */
            case 13:
                contextObj.equipmentListSource = [];
                contextObj.equipmentListItemsPerPage = contextObj.equipmentListTotalItems = 0;
                contextObj.equipmentTabEnabled = true;
                contextObj.siteId = contextObj.serviceRequestInputItems.rowData["SiteId"];
                contextObj.addOnTabName = "Equipment";
                break;
            case 3: /*Manage Documents */
            case 14:
                contextObj.documentTabEnabled = true;
                contextObj.addOnTabName = "Documents";
                break;
            case 11:
                contextObj.getWorkFlowEntityIds();
                contextObj.costTabEnabled = true;
                contextObj.addOnTabName = "Manage Cost";
                break;
            case 12:
                contextObj.addOnTabName = "Manage Invoices";
                contextObj.invoiceTabEnabled = true;
                break;
            case 16:
                contextObj.chargebackTabEnabled = true;
                contextObj.addOnTabName = "Manage Chargeback";
                break;
            case 999:
                contextObj.getWorkFlowEntityIds();
                contextObj.teamMemberTabEnabled = true;
                contextObj.addOnTabName = "Team Members";
                break;
            case 9999:
                contextObj.getWorkFlowEntityIds();
                contextObj.historyTabEnabled = true;
                contextObj.addOnTabName = "History";
                break;
            default:
                return;
        }
        contextObj.tabDeleteIndex = 0;
        setTimeout(function () {
            contextObj.selectedTab = 3;
        }, 50);
    };
    /***********************************************************************************************************
    * Function:     getWorkFlowEntityIds
    * Description:  Gets an Array of Selected WorkflowEntityIds, even if selection is single or multiple.
    * Retun:        An array of Selected WorkflowEntityIds
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.getWorkFlowEntityIds = function () {
        var inputItems = this.entityCategoryId == 3 ? this.pmListInputItems : this.serviceRequestInputItems;
        if (inputItems.selectedIds.length == 1) {
            this.workFlowEntityIds = [inputItems.rowData["WorkFlowEntityId"]];
        }
        else {
            for (var _i = 0, _a = inputItems.rowData; _i < _a.length; _i++) {
                var item = _a[_i];
                this.workFlowEntityIds.push(item["WorkFlowEntityId"]);
            }
        }
    };
    /***********************************************************************************************************
    * Function:     getEditableFields
    * Description:  Gets the fields which are editable for the current Action Point
    * Comments:     Fields which are editable and other fields are removed from fieldDetailsAdd1 except
    *               Priority and Expected Date of Completion since conflict in HTML Side.
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.getEditableFields = function () {
        var check;
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push({
            ReportFieldId: 5827,
            Value: contextObj.entityCategoryId == 3 ? contextObj.pmListInputItems.rowData["CurrentWorkFlowActionPointId"] : contextObj.serviceRequestInputItems.rowData["CurrentWorkFlowActionPointId"]
        });
        contextObj.workOrdereService.getValuesWithDbObjectDetails(50699, JSON.stringify(tempArray)).subscribe(function (resultData) {
            var editableFields = JSON.parse(resultData["Data"]);
            var reportFields = [];
            for (var _i = 0, _a = contextObj.fieldDetailsAdd1; _i < _a.length; _i++) {
                var item = _a[_i];
                var editableObject = editableFields.find(function (fieldItem) {
                    if ((fieldItem.ReportFieldId == item.ReportFieldId) && ((contextObj.entityCategoryId != 3 ? 1 : 3) == fieldItem.EntityCategoryId)) {
                        check = true;
                        return true;
                    }
                    else {
                        check = false;
                        return false;
                    }
                    //return (fieldItem.ReportFieldId === item.ReportFieldId) && contextObj.entityCategoryId === fieldIte
                });
                if (check) {
                    item.IsVisible = editableObject.Visible;
                    item.ReadOnlyMode = !editableObject.Editable;
                    item.IsEnabled = editableObject.Editable;
                    if (item.IsVisible)
                        reportFields.push(item.ReportFieldId); /*Pushes the fields which are not editable to a temp array for removing*/
                }
            }
            for (var index = 0; index < contextObj.fieldDetailsAdd1.length; index++) {
                if ((reportFields.indexOf(contextObj.fieldDetailsAdd1[index].ReportFieldId) == -1) && contextObj.fieldDetailsAdd1[index].ReportFieldId > 1000000) {
                    contextObj.fieldDetailsAdd1.splice(index, 1); /*Removes the additional data fields which are not editable*/
                    index -= 1;
                }
            }
            contextObj.getReviewCostDetails();
        });
    };
    /***********************************************************************************************************
    * Function:     getAutoPopulatedTimeSpentValue
    * Description:  Gets and Sets the value for Time Spent if it is Subscribed
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.getAutoPopulatedTimeSpentValue = function () {
        var contextObj = this;
        contextObj.workOrdereService.getAutoPopulatedTimeSpentValue(contextObj.workFlowEntityIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]) {
                var timeSpentField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 7521; });
                timeSpentField.FieldValue = resultData["Data"];
            }
        });
    };
    /***********************************************************************************************************
    * Function:     getReviewCostDetails
    * Description:  Gets cost details for the selected entity
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.getReviewCostDetails = function () {
        var contextObj = this;
        contextObj.workOrdereService.getReviewCostDetails(contextObj.workFlowEntityIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]) {
                var costData = JSON.parse(resultData["Data"]["FieldBinderData"])[0];
                contextObj.totalCostItems.TechnicianTotalCost = costData["Technician Cost"] ? costData["Technician Cost"] : 0.00;
                contextObj.totalCostItems.PartsTotalCost = costData["Spare Cost"] ? costData["Spare Cost"] : 0.00;
                contextObj.totalCostItems.ToolsTotalCost = costData["Tools Cost"] ? costData["Tools Cost"] : 0.00;
                contextObj.totalCostItems.OtherTotalCost = costData["Other Cost"] ? costData["Other Cost"] : 0.00;
            }
            if (contextObj.isTimeSpentSubscribed)
                contextObj.getAutoPopulatedTimeSpentValue();
            setTimeout(function () {
                contextObj.selectedTab = 2;
            }, 500);
            contextObj.reviewTabEnabled = true;
        });
    };
    /***********************************************************************************************************
    * Function:     onSubmitClick
    * Description:  Submit click of SR, NPM and PM WO.
    * Comments:     Custom Model is used for submition. Refer interface - IReviewSubmitData for better
    *               understanding.
    *               If Submit is from Create page, Document input is also passed along with it, since document
    *               is inserted against a request. Documented added before a request creation is stored
    *               locally in contextObj.submitOutput.WFEntityDocumentInput
    *
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.onSubmitClick = function (event) {
        var contextObj = this;
        var entityId = 0;
        if (event.isPm) {
            entityId = contextObj.workOrderId;
        }
        else {
            entityId = contextObj.workOrderId == 0 ? contextObj.requestId : contextObj.workOrderId;
        }
        var entityInput = { FormId: 228, WFEntityId: entityId, WFReportFieldIdValues: JSON.parse(event.fieldObject) };
        contextObj.submitOutput.WFEntityInput = entityInput;
        contextObj.submitOutput.ParentFormId = 226;
        if (contextObj.action == "review") {
            contextObj.submitOutput.WFEntityDocumentInput = null;
        }
        else {
            contextObj.submitOutput.WFEntityDocumentInput = (contextObj.submitOutput.WFEntityDocumentInput == null) ? null : contextObj.submitOutput.WFEntityDocumentInput;
        }
        var jsonOut = JSON.stringify(contextObj.submitOutput);
        contextObj.workOrdereService.submitAddUpdateServiceRequest(jsonOut, contextObj.workOrderId == 0 ? contextObj.requestId : contextObj.workOrderId, contextObj.action == "add" ? 1 : 2).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (resultData["Data"]["Data"] != "[]") {
                        var retUpdatedSrc = [];
                        var requestNumber = "";
                        var temp = (resultData["Data"]["Data"]).split("****")[0];
                        try {
                            retUpdatedSrc = JSON.parse(temp); /*If has next action point access return will be a proper json hence parsing will be success*/
                        }
                        catch (err) {
                            requestNumber = temp.replace("[", ""); /*If parsing fails return is Request Number only. Brackets [] are removed*/
                            requestNumber = requestNumber.replace("]", "");
                        }
                        contextObj.updateListSource(retUpdatedSrc, requestNumber, entityId);
                    }
                    else if (resultData["Data"]["Data"] == "[]") {
                        if (contextObj.entityCategoryId != 3) {
                            contextObj.serviceRequestListSource = contextObj.serviceRequestListSource.filter(function (item) {
                                return item[contextObj.serviceRequestInputItems.dataKey] != entityId;
                            });
                            contextObj.reviewListTotalItems = contextObj.reviewListTotalItems - 1;
                            contextObj.notificationService.ShowToaster("Request details updated", 3);
                        }
                        else {
                            contextObj.pmListSource = contextObj.pmListSource.filter(function (item) {
                                return item[contextObj.pmListInputItems.dataKey] != entityId;
                            });
                            contextObj.pmListTotalItems = contextObj.pmListTotalItems - 1;
                            contextObj.notificationService.ShowToaster("Work Order details updated", 3);
                        }
                    }
                    contextObj.reloadData = false;
                    break;
                case 3:
                    contextObj.notificationService.ShowToaster("No matching Space exists for the specified field values", 5);
                    return;
                default:
                    break;
            }
            contextObj.submitOutput = {
                WFEntityInput: null,
                WFEntityDocumentInput: null,
                //WFEntityEquipmentInput: null,
                ParentFormId: 0
            };
            contextObj.documentSource = [];
            setTimeout(function () {
                contextObj.tabDeleteIndex = 2;
            }, 50);
            setTimeout(function () {
                contextObj.selectedTab = contextObj.entityCategoryId == 3 ? 1 : 0;
                contextObj.tabDeleteIndex = 0;
                contextObj.createRequestEnabled = false;
                if (event.isReject) {
                    contextObj.reloadData = true;
                }
            }, 50);
            if (event.isChildRequests && event.childRequestData && event.childRequestData.length > 0) {
                if (event.isPm) {
                }
                else {
                    contextObj.serviceRequestListSource.unshift(event.childRequestData[0]);
                }
            }
        });
    };
    /***********************************************************************************************************
    * Function:     updateListSource
    * Description:  Common function to update both SR-NPM and PM List Sources
    * Comments:     Corresponding Messages are also shown here
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.updateListSource = function (retUpdatedSrc, requestNumber, entityId) {
        var contextObj = this;
        if (contextObj.action == "add") {
            if (retUpdatedSrc == undefined || retUpdatedSrc.length == 0) {
                contextObj.notificationService.ShowToaster("New Request '" + requestNumber + "' created", 3);
            }
            else {
                contextObj.serviceRequestListSource.unshift(retUpdatedSrc[0]);
                contextObj.notificationService.ShowToaster("New Request '" + retUpdatedSrc[0]["Request Number"] + "' created", 3);
            }
        }
        else if (retUpdatedSrc.length == 0 && requestNumber != "") {
            if (contextObj.entityCategoryId != 3) {
                contextObj.serviceRequestListSource = contextObj.serviceRequestListSource.filter(function (item) {
                    return item[contextObj.serviceRequestInputItems.dataKey] != entityId;
                });
                contextObj.reviewListTotalItems = contextObj.reviewListTotalItems - 1;
                contextObj.notificationService.ShowToaster("Request details updated", 3);
            }
            else {
                contextObj.pmListSource = contextObj.pmListSource.filter(function (item) {
                    return item[contextObj.pmListInputItems.dataKey] != entityId;
                });
                contextObj.pmListTotalItems = contextObj.pmListTotalItems - 1;
                contextObj.notificationService.ShowToaster("Work Order details updated", 3);
            }
        }
        else {
            if (contextObj.entityCategoryId == 1 || contextObj.entityCategoryId == 2) {
                if (contextObj.serviceRequestInputItems.selectedIds.length == 1) {
                    for (var i = 0; i < contextObj.serviceRequestListSource.length; i++) {
                        if (contextObj.serviceRequestListSource[i][contextObj.serviceRequestInputItems.dataKey] == retUpdatedSrc[0][contextObj.serviceRequestInputItems.dataKey]) {
                            contextObj.serviceRequestListSource[i] = retUpdatedSrc[0];
                        }
                    }
                    contextObj.notificationService.ShowToaster("Request details updated", 3);
                }
            }
            else if (contextObj.entityCategoryId == 3) {
                if (contextObj.pmListInputItems.selectedIds.length == 1) {
                    for (var i = 0; i < contextObj.pmListSource.length; i++) {
                        if (contextObj.pmListSource[i][contextObj.pmListInputItems.dataKey] == retUpdatedSrc[0][contextObj.pmListInputItems.dataKey]) {
                            contextObj.pmListSource[i] = retUpdatedSrc[0];
                        }
                    }
                    contextObj.notificationService.ShowToaster("Work Order details updated", 3);
                }
            }
        }
    };
    /***********************************************************************************************************
    * Function:     onDocumentSubmitClick
    * Description:  Document Submit click of Review Service Requests.
    * Comments:     Custom Model is used for submition. Refer interface - DocumentInput for better
    *               understanding.
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.onDocumentSubmitClick = function (event) {
        var contextObj = this;
        var documentInput = { FormId: 0, WFEntityId: 0, ListDocumentReportFieldIdValues: [] };
        var documentdata = { DocumentId: 0, FileDataInput: '', WFReportFieldIdValues: [] };
        documentdata.DocumentId = event.Id;
        documentdata.FileDataInput = event.fileData;
        documentdata.WFReportFieldIdValues = event.fieldObject;
        if (contextObj.action == "add") {
            contextObj.documentSource = event.itemSource;
            contextObj.notificationService.ShowToaster("Selected Document uploaded", 3);
        }
        if (contextObj.submitOutput.WFEntityDocumentInput == null) {
            documentInput.FormId = 240;
            documentInput.WFEntityId = contextObj.workOrderId == 0 ? contextObj.requestId : contextObj.workOrderId;
            documentInput.ListDocumentReportFieldIdValues.push(documentdata);
            contextObj.submitOutput.WFEntityDocumentInput = documentInput;
        }
        else {
            contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.push(documentdata);
        }
        if (contextObj.action == "review") {
            var reviewdocumentInput = { WFEntityDocumentInput: contextObj.submitOutput.WFEntityDocumentInput };
            contextObj.workOrdereService.submitReviewDocumentData(JSON.stringify(reviewdocumentInput), 1).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        if (resultData["Data"]["Message"] == "Invalid file")
                            contextObj.notificationService.ShowToaster("Select a valid file", 5);
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (resultData["Data"]["Data"] != "[]") {
                            contextObj.documentSource = JSON.parse(resultData["Data"]["Data"]);
                            contextObj.updateDocumentEnableMenu();
                            contextObj.notificationService.ShowToaster("Selected Document uploaded", 3);
                        }
                    default:
                        break;
                }
                contextObj.submitOutput.WFEntityDocumentInput = null;
            });
        }
    };
    /***********************************************************************************************************
    * Function:     onDocumentDelete
    * Description:  Document Delete click of Review Service Requests.
    * Comments:     Custom Model is used for submition. Refer interface - DocumentInput for better
    *               understanding.
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.onDocumentDelete = function (event) {
        var contextObj = this;
        if (event.itemToBeDeleted["AttachmentId"] < 0) {
            if (contextObj.submitOutput.WFEntityDocumentInput != null) {
                var itemToDelete = contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.find(function (item) {
                    return item.DocumentId === event.itemToBeDeleted["AttachmentId"];
                });
                var index = contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.indexOf(itemToDelete);
                if (index > -1) {
                    contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.splice(index, 1);
                    contextObj.notificationService.ShowToaster("Selected Document deleted", 3);
                }
                if (contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.length == 0) {
                    contextObj.documentSource = [];
                }
            }
        }
        else {
            var documentValues = [];
            documentValues.push({
                ReportFieldId: 1350,
                Value: contextObj.requestId
            }, {
                ReportFieldId: 50,
                Value: event.itemToBeDeleted["AttachmentId"]
            });
            var documentData = { DocumentId: event.itemToBeDeleted["AttachmentId"], FileDataInput: event.fileData, WFReportFieldIdValues: documentValues };
            var documentInput = { FormId: 240, WFEntityId: contextObj.requestId, ListDocumentReportFieldIdValues: [documentData] };
            var reviewdocumentInput = { WFEntityDocumentInput: documentInput };
            contextObj.workOrdereService.submitReviewDocumentData(JSON.stringify(reviewdocumentInput), 3).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.documentSource = JSON.parse(resultData["Data"]["Data"]);
                        contextObj.documentSource = contextObj.documentSource.length > 0 ? contextObj.documentSource : [];
                        contextObj.updateDocumentEnableMenu();
                        contextObj.notificationService.ShowToaster("Selected Document deleted", 3);
                        if (contextObj.documentSource.length == 0) {
                            contextObj.notificationService.ShowToaster("No Documents exist", 2);
                        }
                        break;
                    default:
                        break;
                }
            });
        }
    };
    ReviewWorkOrderComponent.prototype.updateDocumentEnableMenu = function () {
        if (this.documentSource.length > 0) {
            this.documentEnableMenu = this.entityCategoryId == 3 ? [4] : [1, 2, 4];
        }
        else {
            this.documentEnableMenu = this.entityCategoryId == 3 ? [] : [1];
        }
    };
    /***********************************************************************************************************
    * Function:     onCostSubmit
    * Description:  Set totalCostItems after cost submit. Closes the Cost Tab
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.onCostSubmit = function (event) {
        var contextObj = this;
        contextObj.totalCostItems = event; /* totalCostItems is to show a table of Costs in review page. Not implemented now */
        contextObj.selectedTab = 2;
        setTimeout(function () {
            contextObj.closeTab(3);
        }, 50);
    };
    /***********************************************************************************************************
    * Function:     onTeamMemberUpdate
    * Description:  Team member update events
    * Comments:     Custom Model is used for submition. Refer interface - ITeamMemberInput for better
    *               understanding.
    *               First Team Members is deleted and then inserted.
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.onTeamMemberUpdate = function (event) {
        debugger;
        var contextObj = this;
        var teamMemberInput = { WFEntityTeamMemberInput: { FormId: 429, ListTeamMemberReportFieldIdValues: event.data } };
        var deleteInput = { WFEntityTeamMemberInput: { FormId: 429, ListTeamMemberReportFieldIdValues: [{ WFReportFieldIdValues: contextObj.getReportfiedlIdValuesForTeamMemberDelete() }] } };
        contextObj.workOrdereService.deleteReviewTeamMemberData(JSON.stringify(deleteInput), event.target).subscribe(function (resultData) {
            debugger;
            switch (resultData.StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (event.data.length > 0) {
                        contextObj.workOrdereService.submitReviewTeamMemberData(JSON.stringify(teamMemberInput), event.target).subscribe(function (resultData) {
                            debugger;
                            switch (resultData.StatusId) {
                                case 0:
                                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                    break;
                                case 1:
                                    contextObj.notificationService.ShowToaster("Team Members updated", 3);
                                    contextObj.selectedTab = 2;
                                    setTimeout(function () {
                                        contextObj.closeTab(3);
                                    }, 50);
                                    break;
                            }
                        });
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Team Members updated", 3);
                        contextObj.selectedTab = 2;
                        setTimeout(function () {
                            contextObj.closeTab(3);
                        }, 50);
                    }
                    break;
            }
        });
    };
    /***********************************************************************************************************
    * Function:     getReportfiedlIdValuesForTeamMemberDelete
    * Description:  Returns an Array of ReportFieldIdValues with CurrentWorkFlowActionPointId and
    *               WorkFlowEntityIds.
    *
    ************************************************************************************************************/
    ReviewWorkOrderComponent.prototype.getReportfiedlIdValuesForTeamMemberDelete = function () {
        var tempArray = [];
        for (var _i = 0, _a = this.workFlowEntityIds; _i < _a.length; _i++) {
            var entityId = _a[_i];
            tempArray.push({ ReportFieldId: 5827, Value: this.currentWorkFlowActionPointId }, { ReportFieldId: 5859, Value: entityId });
        }
        return tempArray;
    };
    /************************************************************************
     * Genaral Functions
     *
     *************************************************************************/
    ReviewWorkOrderComponent.prototype.initiateValidation = function (fieldObject) {
        var contextObj = this;
        var el = document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    ReviewWorkOrderComponent.prototype.attachmentSuccess = function (event) {
        this.refreshgrid = [];
        console.log('attachmentSuccess', event);
        //this.refreshgrid = this.refreshgrid.concat([true]);
    };
    ReviewWorkOrderComponent = __decorate([
        core_1.Component({
            selector: 'review-workorder',
            templateUrl: './app/Views/WorkOrder/Review/review.component.html',
            directives: [page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, serviceReview_list_component_1.ServiceReviewListComponent, reviewServiceRequests_component_1.ReviewServiceRequestComponent,
                reviewDocument_list_component_1.ReviewDocumentListComponent, reviewPmWorkorder_list_component_1.ListReviewPMWorkOrderComponent, reviewPMWorkorder_component_1.ReviewPMWorkorderComponent, review_Cost_component_1.ReviewCostComponent,
                reviewEquipment_list_component_1.ReviewEquipmentListComponent, reviewteam_members_component_1.ReviewTeamMemberComponent, reviewhistory_1.ReviewHistory, chargeback_list_1.ChargebackListComponent, attachments_component_1.AttachmentsComponent],
            providers: [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService, General_1.GeneralFunctions, validation_service_1.ValidateService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService, General_1.GeneralFunctions, validation_service_1.ValidateService])
    ], ReviewWorkOrderComponent);
    return ReviewWorkOrderComponent;
}());
exports.ReviewWorkOrderComponent = ReviewWorkOrderComponent;
//# sourceMappingURL=review.component.js.map
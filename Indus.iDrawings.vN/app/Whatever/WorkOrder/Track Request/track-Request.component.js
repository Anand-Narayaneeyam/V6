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
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var General_1 = require('../../../Models/Common/General');
var trackRequest_list_component_1 = require('./trackRequest-list.component');
var reviewServiceRequests_component_1 = require('../Review/reviewServiceRequests.component');
var reviewDocument_list_component_1 = require('../Review/reviewDocument-list.component');
var TrackServiceRequestComponent = (function () {
    function TrackServiceRequestComponent(notificationService, workOrderService, generalFunctions) {
        this.notificationService = notificationService;
        this.workOrderService = workOrderService;
        this.generalFunctions = generalFunctions;
        this.pageTitle = "Review";
        this.pagePath = "Work Order / My Requests / Active Requests";
        this.selectedTab = 0;
        this.tabDeleteIndex = 0;
        this.action = "";
        this.btnName = "";
        this.linkArray = undefined;
        this.entityCategoryId = 1;
        this.reviewTabEnabled = false;
        this.documentTabEnabled = false;
        this.requestId = 0;
        this.activeRequestListSource = [];
        this.closedRequestListSource = [];
        this.documentSource = [];
        this.activeRequestListTotalItems = 0;
        this.activeRequestListItemsPerPage = 0;
        this.closedRequestListTotalItems = 0;
        this.closedRequestListItemsPerPage = 0;
        this.reviewServiceRequestEnabled = false;
        this.initList = false;
        this.activeRequestInputItems = { dataKey: "WorkRequestId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.closedRequestInputItems = { dataKey: "WorkRequestId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.userDetails = { UserId: 0, UserName: "", UserEmail: "", UserFirstName: "", UserMiddleName: "", UserLastName: "" };
        this.submitOutput = {
            WFEntityInput: null,
            WFEntityDocumentInput: null,
            //WFEntityEquipmentInput: null,
            ParentFormId: 0
        };
        this.documentEnableMenu = [];
    }
    TrackServiceRequestComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.workOrderService.getValuesWithDbObjectDetails(50781, '').subscribe(function (resultData) {
            if (resultData["Data"] != "[]") {
                resultData = (JSON.parse(resultData["Data"]))[0];
                contextObj.userDetails.UserFirstName = resultData["FirstName"];
                contextObj.userDetails.UserMiddleName = resultData["MiddleName"];
                contextObj.userDetails.UserLastName = resultData["LastName"];
                contextObj.userDetails.UserId = resultData["UserId"];
                contextObj.userDetails.UserName = resultData["Name"];
                contextObj.userDetails.UserEmail = resultData["Email"];
                contextObj.initList = true;
            }
        });
    };
    TrackServiceRequestComponent.prototype.getPermissionDetails = function (workTypeId, dataKeyId) {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push({
            ReportFieldId: 5873,
            Value: workTypeId
        });
        contextObj.workOrderService.getValuesWithDbObjectDetails(50847, JSON.stringify(tempArray)).subscribe(function (permission) {
            contextObj.updateLinkArray(JSON.parse(permission["Data"]), contextObj.action == "review" ? dataKeyId : 0);
        });
    };
    TrackServiceRequestComponent.prototype.updateLinkArray = function (fieldDetailsArray, dataKeyId) {
        this.linkArray = undefined;
        if (fieldDetailsArray == null || fieldDetailsArray == undefined || fieldDetailsArray.length == 0)
            return;
        var temp = new Array();
        for (var _i = 0, fieldDetailsArray_1 = fieldDetailsArray; _i < fieldDetailsArray_1.length; _i++) {
            var item = fieldDetailsArray_1[_i];
            if (item["Has Permission"] == 1 && (item.Id == 14 || item.Id == 3 /*|| item.Id == 2 || item.Id == 13*/) && item.EntityCategoryId == this.entityCategoryId) {
                temp.push({
                    Id: item.Id,
                    Name: item.Name,
                    DataKeyId: dataKeyId
                });
            }
        }
        this.linkArray = temp;
    };
    TrackServiceRequestComponent.prototype.getEditableFields = function () {
        var check;
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push({
            ReportFieldId: 5873,
            Value: contextObj.activeRequestInputItems.rowData["WorkTypeId"]
        });
        contextObj.workOrderService.getValuesWithDbObjectDetails(50699, JSON.stringify(tempArray)).subscribe(function (resultData) {
            var editableFields = JSON.parse(resultData["Data"]);
            var reportFields = [];
            for (var _i = 0, _a = contextObj.fieldDetailsAdd1; _i < _a.length; _i++) {
                var item = _a[_i];
                var editableObject = editableFields.find(function (fieldItem) {
                    if ((fieldItem.ReportFieldId == item.ReportFieldId) && (contextObj.entityCategoryId == fieldItem.EntityCategoryId)) {
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
        });
    };
    TrackServiceRequestComponent.prototype.getSelectedTab = function (event) {
        switch (event[0]) {
            case 0:
            case 1:
                if (event[1]) {
                    if (this.documentTabEnabled && this.reviewTabEnabled) {
                        this.closeTab(3);
                        this.closeTab(2);
                    }
                    else if (this.documentTabEnabled || this.reviewTabEnabled) {
                        this.closeTab(2);
                    }
                }
                this.pagePath = event[0] == 0 ? "Work Order / My Requests / Active Requests" : "Work Order / My Requests / Closed Requests";
                break;
            case 2:
                if (event[1]) {
                    if (this.documentTabEnabled && this.reviewTabEnabled) {
                        this.closeTab(3);
                    }
                }
                else {
                    var contextObj = this;
                    setTimeout(function () {
                        contextObj.reviewServiceRequestEnabled = true;
                    }, 300);
                }
                break;
        }
        this.selectedTab = event[0];
    };
    TrackServiceRequestComponent.prototype.onTabClose = function (event) {
        switch (event[0]) {
            case 0:
                this.reviewTabEnabled = false;
                break;
            case 1:
                if (this.documentTabEnabled && this.reviewTabEnabled) {
                    this.reviewTabEnabled = false;
                    this.reviewServiceRequestEnabled = false;
                    this.selectedTab = 2;
                }
                else if (!this.documentTabEnabled && this.reviewTabEnabled) {
                    this.reviewTabEnabled = false;
                    this.reviewServiceRequestEnabled = false;
                    this.selectedTab = 0;
                }
                else if (this.documentTabEnabled && !this.reviewTabEnabled) {
                    this.documentTabEnabled = false;
                    this.selectedTab = 0;
                }
                break;
            case 2:
                this.documentTabEnabled = false;
                this.selectedTab = 2;
                break;
            case 3:
                if (this.reviewTabEnabled) {
                    this.reviewTabEnabled = false;
                    this.reviewServiceRequestEnabled = false;
                }
                break;
            default:
                break;
        }
    };
    TrackServiceRequestComponent.prototype.closeTab = function (index) {
        var contextObj = this;
        switch (index) {
            case 2:
                this.reviewTabEnabled = false;
                break;
            case 3:
                this.documentTabEnabled = false;
                break;
        }
        setTimeout(function () {
            contextObj.tabDeleteIndex = index;
        }, 50);
        setTimeout(function () {
            contextObj.tabDeleteIndex = 0;
        }, 50);
    };
    TrackServiceRequestComponent.prototype.onActiveRequestListSourceUpdated = function (event) {
        this.activeRequestListSource = event.itemSource;
        this.activeRequestListItemsPerPage = event.rowsPerPage;
        this.activeRequestListTotalItems = event.totalItems;
    };
    TrackServiceRequestComponent.prototype.onClosedRequestListSourceUpdated = function (event) {
        this.closedRequestListSource = event.itemSource;
        this.closedRequestListItemsPerPage = event.rowsPerPage;
        this.closedRequestListTotalItems = event.totalItems;
    };
    TrackServiceRequestComponent.prototype.onDocumentSourceUpdated = function (event) {
        this.documentSource = event;
    };
    TrackServiceRequestComponent.prototype.onEditClicked = function (event) {
        this.reviewTabEnabled = false;
        this.fieldDetailsAdd1 = event.fieldobject;
        this.action = event.action;
        this.btnName = event.buttonName;
        this.activeRequestInputItems = event.input;
        this.outComeData = event.outComes;
        this.documentSource = [];
        this.requestId = this.activeRequestInputItems.rowData.WorkRequestId;
        this.pagePath = "Work Order / My Requests / Active Requests / Edit";
        this.action = "review";
        this.btnName = "Save Changes";
        this.getEditableFields();
        this.getPermissionDetails(this.activeRequestInputItems.rowData["WorkTypeId"], this.activeRequestInputItems.rowData[this.activeRequestInputItems.dataKey]);
        var contextObj = this;
        setTimeout(function () {
            contextObj.selectedTab = 2;
        }, 500);
        this.reviewTabEnabled = true;
    };
    TrackServiceRequestComponent.prototype.onSubmitClick = function (event) {
        var contextObj = this;
        var entityInput = { FormId: 228, WFEntityId: contextObj.activeRequestInputItems.rowData.WorkRequestId, WFReportFieldIdValues: contextObj.updateSubmitFieldObjectForStatus(JSON.parse(event.fieldObject)) };
        contextObj.submitOutput.WFEntityInput = entityInput;
        contextObj.submitOutput.ParentFormId = 293;
        contextObj.submitOutput.WFEntityDocumentInput = (contextObj.submitOutput.WFEntityDocumentInput == null) ? null : contextObj.submitOutput.WFEntityDocumentInput;
        var jsonOut = JSON.stringify(contextObj.submitOutput);
        contextObj.workOrderService.submitAddUpdateServiceRequest(jsonOut, contextObj.requestId, 3).subscribe(function (resultData) {
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
                            retUpdatedSrc = JSON.parse(temp);
                        }
                        catch (err) {
                            requestNumber = temp.replace("[", "");
                            requestNumber = requestNumber.replace("]", "");
                        }
                        if (retUpdatedSrc.length == 0 && requestNumber != "") {
                            contextObj.activeRequestListSource = contextObj.activeRequestListSource.filter(function (item) {
                                return item[contextObj.activeRequestInputItems.dataKey] != contextObj.activeRequestInputItems.rowData.WorkRequestId;
                            });
                            contextObj.activeRequestListTotalItems = contextObj.activeRequestListTotalItems - 1;
                        }
                        else {
                            for (var i = 0; i < contextObj.activeRequestListSource.length; i++) {
                                if (contextObj.activeRequestListSource[i][contextObj.activeRequestInputItems.dataKey] == retUpdatedSrc[0][contextObj.activeRequestInputItems.dataKey]) {
                                    contextObj.activeRequestListSource[i] = retUpdatedSrc[0];
                                }
                            }
                        }
                        contextObj.notificationService.ShowToaster("Request details updated", 3);
                    }
                    break;
                default:
                    break;
            }
            contextObj.submitOutput = {
                WFEntityInput: null,
                WFEntityDocumentInput: null,
                //WFEntityEquipmentInput: null,
                ParentFormId: 0
            };
            contextObj.tabDeleteIndex = 2;
            setTimeout(function () {
                contextObj.selectedTab = 0;
                contextObj.tabDeleteIndex = 0;
                contextObj.reviewTabEnabled = false;
            }, 50);
        });
    };
    TrackServiceRequestComponent.prototype.onLinkClick = function (linkDetails) {
        var contextObj = this;
        contextObj.documentTabEnabled = false;
        switch (linkDetails.Id) {
            case 2: //Manage Equipment
            case 13:
                return;
            case 3: //Manage Documents
            case 14:
                contextObj.documentTabEnabled = true;
                break;
            default:
                return;
        }
        setTimeout(function () {
            contextObj.tabDeleteIndex = 0;
            contextObj.selectedTab = 3;
        }, 50);
    };
    TrackServiceRequestComponent.prototype.onDocumentSubmitClick = function (event) {
        var contextObj = this;
        var documentInput = { FormId: 0, WFEntityId: 0, ListDocumentReportFieldIdValues: [] };
        var documentdata = { DocumentId: 0, FileDataInput: event.fileData, WFReportFieldIdValues: [] };
        documentdata.DocumentId = event.Id;
        documentdata.FileDataInput = event.fileData;
        documentdata.WFReportFieldIdValues = event.fieldObject;
        documentInput.FormId = 240;
        documentInput.WFEntityId = contextObj.requestId;
        documentInput.ListDocumentReportFieldIdValues.push(documentdata);
        var reviewdocumentInput = { WFEntityDocumentInput: documentInput };
        contextObj.workOrderService.submitReviewDocumentData(JSON.stringify(reviewdocumentInput), 1).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    if (resultData["Data"]["Message"] == "Invalid file")
                        contextObj.notificationService.ShowToaster("Select a valid file", 5);
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (resultData["Data"]["Data"] != "[]") {
                        contextObj.documentSource = JSON.parse(resultData["Data"]["Data"]);
                        contextObj.documentEnableMenu = contextObj.documentSource.length > 0 ? [1, 2, 4] : [1];
                        contextObj.notificationService.ShowToaster("Selected Document uploaded", 3);
                    }
                default:
                    break;
            }
            contextObj.submitOutput.WFEntityDocumentInput = null;
        });
    };
    TrackServiceRequestComponent.prototype.updateSubmitFieldObjectForStatus = function (fieldDetailsArray) {
        fieldDetailsArray.push({
            ReportFieldId: 1490,
            Value: 25
        });
        return fieldDetailsArray;
    };
    TrackServiceRequestComponent.prototype.onDocumentDelete = function (event) {
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
                contextObj.documentSource = event.itemSource;
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
            contextObj.workOrderService.submitReviewDocumentData(JSON.stringify(reviewdocumentInput), 3).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.documentSource = JSON.parse(resultData["Data"]["Data"]);
                        contextObj.documentEnableMenu = contextObj.documentSource.length > 0 ? [1, 2, 4] : [1];
                        contextObj.notificationService.ShowToaster("Selected Document deleted", 3);
                    default:
                        break;
                }
            });
        }
    };
    TrackServiceRequestComponent = __decorate([
        core_1.Component({
            selector: 'track-Request',
            templateUrl: './app/Views/WorkOrder/Track Request/track-Request.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, trackRequest_list_component_1.TrackRequestListComponent, reviewServiceRequests_component_1.ReviewServiceRequestComponent, reviewDocument_list_component_1.ReviewDocumentListComponent],
            providers: [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService, General_1.GeneralFunctions],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService, General_1.GeneralFunctions])
    ], TrackServiceRequestComponent);
    return TrackServiceRequestComponent;
}());
exports.TrackServiceRequestComponent = TrackServiceRequestComponent;
//# sourceMappingURL=track-Request.component.js.map
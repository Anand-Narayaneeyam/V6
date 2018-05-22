var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../review/reviewpmworkorder-list.component.ts" />
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var calendar_component_1 = require('../../../framework/whatever/calendar/calendar.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var General_1 = require('../../../Models/Common/General');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var reviewpmworkorder_list_component_1 = require('../review/reviewpmworkorder-list.component');
var reviewPMWorkorder_component_1 = require('../review/reviewPMWorkorder.component');
var review_Cost_component_1 = require('../review/Review Cost/review-Cost.component');
var PMGeneratedCalendarComponent = (function () {
    function PMGeneratedCalendarComponent(workOrderService, notificationService, generFun) {
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.selectedTab = 0;
        this.tabDeleteIndex = 0;
        this.pagePath = "Work Order / PM WOs Generated";
        this.reviewTabEnabled = false;
        this.listTabEnabled = false;
        this.reviewPmListEnabled = false;
        this.pmWorkOrderReviewEnabled = false;
        this.documentTabEnabled = false;
        this.costTabEnabled = false;
        this.equipmentTabEnabled = false;
        this.addOnTabEnabled = false;
        this.isTimeSpentSubscribed = false;
        this.dateToPerform = "";
        this.blockPrevMnthClick = false;
        this.blockNextMnthClick = false;
        this.pmListSource = [];
        this.documentSource = [];
        this.equipmentListSource = [];
        this.outComeData = [];
        this.linkArray = undefined;
        this.requestId = 0;
        this.workOrderId = 0;
        this.requestNumber = "";
        this.entityCategoryId = 3;
        this.workFlowEntityIds = [];
        this.statusId = 0;
        this.addOnTabName = "";
        this.shouldReload = false;
        this.documentEnableMenu = [];
        this.equipmentListItemsPerPage = 0;
        this.equipmentListTotalItems = 0;
        this.pmListTotalItems = 0;
        this.pmListItemsPerPage = 0;
        this.userDetails = { UserId: 0, UserName: "", UserEmail: "", UserFirstName: "", UserMiddleName: "", UserLastName: "" };
        this.pmListInputItems = { dataKey: "WorkOrderId", groupBy: [], grpWithCheckBx: false, sortCol: "[Scheduled Date]", sortDir: "DESC", allowAdd: false, allowEdit: false };
        this.equipmentListInputtems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalCostItems = { TechnicianTotalCost: 0.00, PartsTotalCost: 0.00, ToolsTotalCost: 0.00, OtherTotalCost: 0.00 };
        this.submitOutput = {
            WFEntityInput: null,
            WFEntityDocumentInput: null,
            //WFEntityEquipmentInput: null,
            ParentFormId: 0
        };
    }
    PMGeneratedCalendarComponent.prototype.ngOnInit = function () {
        this.loadCalendarData(this.formatDate());
    };
    /*************************************************************************
     * Calender Events
     *
     *************************************************************************/
    PMGeneratedCalendarComponent.prototype.loadCalendarData = function (date) {
        var contextObj = this;
        contextObj.workOrderService.getGenerateWorkOrderCalenderList(date, 0, 0, 0, 0).subscribe(function (resultData) {
            var tempData = JSON.parse(resultData["Data"].FieldBinderData);
            var tempCalendarObj = new Array();
            for (var _i = 0, tempData_1 = tempData; _i < tempData_1.length; _i++) {
                var item = tempData_1[_i];
                tempCalendarObj.push({
                    strDate: item.Day,
                    count: Number(item.WOCount)
                });
            }
            contextObj.calendarObj = tempCalendarObj;
            contextObj.blockPrevMnthClick = false;
            contextObj.blockNextMnthClick = false;
        });
    };
    PMGeneratedCalendarComponent.prototype.clearCalendarData = function () {
        if (this.calendarObj) {
            var tempData = [];
            tempData = tempData.concat(this.calendarObj);
            for (var _i = 0, tempData_2 = tempData; _i < tempData_2.length; _i++) {
                var item = tempData_2[_i];
                item.count = 0;
            }
            this.calendarObj = [];
            this.calendarObj = tempData;
        }
    };
    PMGeneratedCalendarComponent.prototype.prevMonthClick = function (event) {
        this.blockPrevMnthClick = true;
        this.blockNextMnthClick = true;
        this.clearCalendarData();
        this.loadCalendarData(event.selectedDate);
    };
    PMGeneratedCalendarComponent.prototype.nextMonthClick = function (event) {
        this.blockNextMnthClick = true;
        this.blockPrevMnthClick = true;
        this.clearCalendarData();
        this.loadCalendarData(event.selectedDate);
    };
    PMGeneratedCalendarComponent.prototype.onDayViewClick = function (event) {
        var contextObj = this;
        contextObj.pmWorkOrderReviewEnabled = false;
        contextObj.dateToPerform = event.selectedDate;
        contextObj.listTabEnabled = true;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 100);
    };
    /*************************************************************************
     * Tab Events
     *
     *************************************************************************/
    PMGeneratedCalendarComponent.prototype.getSelectedTab = function (event) {
        var contextObj = this;
        switch (event[0]) {
            case 0:
                if (event[1] && contextObj.listTabEnabled) {
                    contextObj.loadCalendarData(contextObj.dateToPerform);
                    if (contextObj.addOnTabEnabled) {
                        contextObj.addOnTabEnabled = false;
                        contextObj.costTabEnabled = false;
                        contextObj.tabDeleteIndex = 3;
                    }
                    if (contextObj.reviewTabEnabled) {
                        setTimeout(function () {
                            contextObj.reviewTabEnabled = false;
                            contextObj.pmWorkOrderReviewEnabled = false;
                            contextObj.tabDeleteIndex = 2;
                        }, 100);
                    }
                    setTimeout(function () {
                        contextObj.listTabEnabled = false;
                        contextObj.reviewPmListEnabled = false;
                        contextObj.tabDeleteIndex = 1;
                    }, 100);
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 0;
                    }, 100);
                }
                contextObj.pagePath = "Work Order / PM WOs Generated";
                break;
            case 1:
                if (event[1] && contextObj.reviewTabEnabled) {
                    if (contextObj.addOnTabEnabled) {
                        contextObj.addOnTabEnabled = false;
                        contextObj.costTabEnabled = false;
                        contextObj.tabDeleteIndex = 3;
                    }
                    setTimeout(function () {
                        contextObj.reviewTabEnabled = false;
                        contextObj.pmWorkOrderReviewEnabled = false;
                        contextObj.tabDeleteIndex = 2;
                    }, 100);
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 0;
                    }, 100);
                }
                else if (contextObj.listTabEnabled) {
                    contextObj.reviewPmListEnabled = true;
                }
                contextObj.pagePath = "Work Order / PM WOs Generated / PM Work Orders";
                break;
            case 2:
                if (event[1] && contextObj.addOnTabEnabled) {
                    contextObj.addOnTabEnabled = false;
                    contextObj.costTabEnabled = false;
                    contextObj.tabDeleteIndex = 3;
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 0;
                    }, 100);
                }
                else if (contextObj.reviewTabEnabled) {
                    contextObj.pmWorkOrderReviewEnabled = true;
                }
                contextObj.pagePath = "Work Order / PM WOs Generated / PM Work Orders / Review";
                break;
            case 3:
                break;
        }
        contextObj.selectedTab = event[0];
    };
    /*************************************************************************
     * Review Click Events
     *
     *************************************************************************/
    PMGeneratedCalendarComponent.prototype.onPMReviewClick = function (event) {
        var contextObj = this;
        contextObj.linkArray = undefined;
        contextObj.fieldDetailsAdd1 = event.fieldobject;
        contextObj.action = event.action;
        contextObj.btnName = event.buttonName;
        contextObj.pmListInputItems = event.input;
        contextObj.outComeData = event.outComes;
        contextObj.statusId = contextObj.pmListInputItems.rowData["StatusId"];
        contextObj.workFlowEntityIds = [contextObj.pmListInputItems.rowData.WorkFlowEntityId];
        contextObj.workOrderId = contextObj.pmListInputItems.rowData.WorkOrderId;
        contextObj.requestNumber = contextObj.pmListInputItems.rowData["Work Order No."];
        contextObj.getPermissionDetails(contextObj.pmListInputItems.rowData["CurrentWorkFlowActionPointId"], contextObj.pmListInputItems.rowData[contextObj.pmListInputItems.dataKey]);
        contextObj.getEditableFields();
        contextObj.getReviewCostDetails();
        if (contextObj.isTimeSpentSubscribed)
            contextObj.getAutoPopulatedTimeSpentValue();
        contextObj.reviewTabEnabled = true;
        setTimeout(function () {
            contextObj.selectedTab = 2;
        }, 100);
    };
    PMGeneratedCalendarComponent.prototype.onPMListSourceUpdated = function (event) {
        this.pmListSource = event.itemSource;
        this.pmListItemsPerPage = event.rowsPerPage;
        this.pmListTotalItems = event.totalItems;
    };
    /************************************************************************
     * Permissions, Link Click Events,
     * Editable Fields settings, Time Spent, Cost Details
     *************************************************************************/
    PMGeneratedCalendarComponent.prototype.getPermissionDetails = function (workFlowActionPointId, dataKeyId) {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push({
            ReportFieldId: 5825,
            Value: workFlowActionPointId
        });
        contextObj.workOrderService.getValuesWithDbObjectDetails(50694, JSON.stringify(tempArray)).subscribe(function (permission) {
            contextObj.updateLinkArray(JSON.parse(permission["Data"]), contextObj.action == "review" ? dataKeyId : 0);
        });
    };
    PMGeneratedCalendarComponent.prototype.onRequesterPermissionUpdate = function (event) {
        var filteredForRequester = event.filter(function (item) { return (item.Id != 2 && item.Id != 13); });
        this.updateLinkArray(filteredForRequester, 0);
    };
    PMGeneratedCalendarComponent.prototype.updateLinkArray = function (fieldDetailsArray, dataKeyId) {
        this.linkArray = undefined;
        if (fieldDetailsArray == null || fieldDetailsArray == undefined || fieldDetailsArray.length == 0)
            return;
        var temp = new Array();
        for (var _i = 0, fieldDetailsArray_1 = fieldDetailsArray; _i < fieldDetailsArray_1.length; _i++) {
            var item = fieldDetailsArray_1[_i];
            if (item["Has Permission"] == 1 && (item.Id == 14 || item.Id == 3 || item.Id == 2 || item.Id == 13 || item.Id == 11) && item.EntityCategoryId == (this.entityCategoryId == 2 ? 1 : this.entityCategoryId)) {
                temp.push({
                    Id: item.Id,
                    Name: item.Name,
                    DataKeyId: dataKeyId
                });
            }
        }
        this.linkArray = temp;
    };
    PMGeneratedCalendarComponent.prototype.onLinkClick = function (linkDetails) {
        var contextObj = this;
        contextObj.addOnTabEnabled = false;
        contextObj.documentTabEnabled = false;
        contextObj.costTabEnabled = false;
        contextObj.equipmentTabEnabled = false;
        contextObj.addOnTabEnabled = true;
        switch (linkDetails.Id) {
            case 1: /*Manage Drawing */
            case 15:
                return;
            case 2: /*Manage Equipment */
            case 13:
                contextObj.equipmentListSource = [];
                contextObj.equipmentListItemsPerPage = 0;
                contextObj.equipmentListTotalItems = 0;
                contextObj.equipmentTabEnabled = true;
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
            default:
                return;
        }
        contextObj.tabDeleteIndex = 0;
        setTimeout(function () {
            contextObj.selectedTab = 3;
        }, 50);
    };
    PMGeneratedCalendarComponent.prototype.getWorkFlowEntityIds = function () {
        if (this.pmListInputItems.selectedIds.length == 1) {
            this.workFlowEntityIds = [this.pmListInputItems.rowData["WorkFlowEntityId"]];
        }
        else {
            for (var _i = 0, _a = this.pmListInputItems.rowData; _i < _a.length; _i++) {
                var item = _a[_i];
                this.workFlowEntityIds.push(item["WorkFlowEntityId"]);
            }
        }
    };
    PMGeneratedCalendarComponent.prototype.getEditableFields = function () {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push({
            ReportFieldId: 5827,
            Value: contextObj.pmListInputItems.rowData["CurrentWorkFlowActionPointId"]
        });
        contextObj.workOrderService.getValuesWithDbObjectDetails(50699, JSON.stringify(tempArray)).subscribe(function (resultData) {
            var editableFields = JSON.parse(resultData["Data"]);
            var reportFields = [];
            for (var _i = 0, editableFields_1 = editableFields; _i < editableFields_1.length; _i++) {
                var item = editableFields_1[_i];
                var fieldObject = contextObj.fieldDetailsAdd1.find(function (fieldItem) {
                    return fieldItem.ReportFieldId === item.ReportFieldId;
                });
                if (fieldObject != undefined && (contextObj.entityCategoryId != 3 ? 1 : 3) == item.EntityCategoryId) {
                    fieldObject.IsVisible = item.Visible;
                    fieldObject.ReadOnlyMode = !item.Editable;
                    if (fieldObject.IsVisible)
                        reportFields.push(fieldObject.ReportFieldId);
                }
            }
            //contextObj.fieldDetailsAdd1 = contextObj.fieldDetailsAdd1.filter(function (item) {
            //    return !(reportFields.indexOf(item.ReportFieldId) == -1 && item.ReportFieldId > 100000);
            //});
            for (var index = 0; index < contextObj.fieldDetailsAdd1.length; index++) {
                if ((reportFields.indexOf(contextObj.fieldDetailsAdd1[index].ReportFieldId) == -1 && contextObj.fieldDetailsAdd1[index].ReportFieldId > 100000)) {
                    contextObj.fieldDetailsAdd1.splice(index, 1);
                    index -= 1;
                }
            }
        });
    };
    PMGeneratedCalendarComponent.prototype.getAutoPopulatedTimeSpentValue = function () {
        var contextObj = this;
        contextObj.workOrderService.getAutoPopulatedTimeSpentValue(contextObj.workFlowEntityIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]) {
                var timeSpentField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 7521; });
                timeSpentField.FieldValue = resultData["Data"];
            }
        });
    };
    PMGeneratedCalendarComponent.prototype.getReviewCostDetails = function () {
        var contextObj = this;
        contextObj.workOrderService.getReviewCostDetails(contextObj.workFlowEntityIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]) {
                var costData = JSON.parse(resultData["Data"]["FieldBinderData"])[0];
                contextObj.totalCostItems.TechnicianTotalCost = costData["Technician Cost"] ? costData["Technician Cost"] : 0.00;
                contextObj.totalCostItems.PartsTotalCost = costData["Spare Cost"] ? costData["Spare Cost"] : 0.00;
                contextObj.totalCostItems.ToolsTotalCost = costData["Tools Cost"] ? costData["Tools Cost"] : 0.00;
                contextObj.totalCostItems.OtherTotalCost = costData["Other Cost"] ? costData["Other Cost"] : 0.00;
            }
        });
    };
    /************************************************************************
    * Request and WorkOrder details submition
    *
    *************************************************************************/
    PMGeneratedCalendarComponent.prototype.onSubmitClick = function (event) {
        var contextObj = this;
        var entityId = contextObj.workOrderId;
        var entityInput = { FormId: 228, WFEntityId: entityId, WFReportFieldIdValues: JSON.parse(event.fieldObject) };
        contextObj.submitOutput.WFEntityInput = entityInput;
        contextObj.submitOutput.ParentFormId = 226;
        contextObj.submitOutput.WFEntityDocumentInput = null;
        var jsonOut = JSON.stringify(contextObj.submitOutput);
        contextObj.workOrderService.submitAddUpdateServiceRequest(jsonOut, contextObj.workOrderId == 0 ? contextObj.requestId : contextObj.workOrderId, contextObj.action == "add" ? 1 : 2).subscribe(function (resultData) {
            debugger;
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.shouldReload = !contextObj.shouldReload;
                    contextObj.notificationService.ShowToaster("Work Order details updated", 3);
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
            contextObj.documentSource = [];
            contextObj.reviewTabEnabled = false;
            contextObj.pmWorkOrderReviewEnabled = false;
            contextObj.tabDeleteIndex = 2;
            setTimeout(function () {
                contextObj.selectedTab = 1;
                contextObj.tabDeleteIndex = 0;
            }, 50);
        });
    };
    /************************************************************************
     * Cost Table update events
     *
     *************************************************************************/
    PMGeneratedCalendarComponent.prototype.onCostSubmit = function (event) {
        var contextObj = this;
        contextObj.totalCostItems = event;
        contextObj.selectedTab = 2;
    };
    PMGeneratedCalendarComponent.prototype.formatDate = function () {
        /*dd MMM yyyy  --format*/
        var date = new Date();
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        var formatteddate = dd + " " + mon + " " + yy;
        return formatteddate;
    };
    PMGeneratedCalendarComponent = __decorate([
        core_1.Component({
            selector: 'pm-generated',
            templateUrl: './app/Views/WorkOrder/PM Generated/pmGenerated-calender.component.html',
            directives: [calendar_component_1.CalendarComponent, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, reviewpmworkorder_list_component_1.ListReviewPMWorkOrderComponent, page_component_1.PageComponent, reviewPMWorkorder_component_1.ReviewPMWorkorderComponent, review_Cost_component_1.ReviewCostComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, workorder_service_1.WorkOrdereService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], PMGeneratedCalendarComponent);
    return PMGeneratedCalendarComponent;
}());
exports.PMGeneratedCalendarComponent = PMGeneratedCalendarComponent;
//# sourceMappingURL=pmGenerated-calender.component.js.map
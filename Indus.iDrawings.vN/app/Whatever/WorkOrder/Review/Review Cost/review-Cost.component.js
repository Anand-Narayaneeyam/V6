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
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var workorder_service_1 = require('../../../../Models/WorkOrder/workorder.service');
var General_1 = require('../../../../Models/Common/General');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var reviewCost_Technician_list_component_1 = require('./reviewCost-Technician-list.component');
var reviewCost_Tools_list_component_1 = require('./reviewCost-Tools-list.component');
var reviewCost_Parts_list_component_1 = require('./reviewCost-Parts-list.component');
var reviewCost_Other_list_component_1 = require('./reviewCost-Other-list.component');
var ReviewCostComponent = (function () {
    function ReviewCostComponent(notificationService, workOrderService, generalFunctions) {
        this.notificationService = notificationService;
        this.workOrderService = workOrderService;
        this.generalFunctions = generalFunctions;
        this.onCostSubmit = new core_1.EventEmitter();
        this.pageTitle = "Review";
        this.pagePath = "Work Order / Manage Cost";
        this.technicianListSource = [];
        this.technicianListItemsPerPage = 0;
        this.technicianListTotalItems = 0;
        this.technicianEnableMenu = [];
        this.technicianFieldObject = [];
        this.toolsListSource = [];
        this.toolsListItemsPerPage = 0;
        this.toolsListTotalItems = 0;
        this.toolsEnableMenu = [];
        this.toolsFieldObject = [];
        this.partsListSource = [];
        this.partsListItemsPerPage = 0;
        this.partsListTotalItems = 0;
        this.partsEnableMenu = [];
        this.partsFieldObject = [];
        this.otherCostListSource = [];
        this.otherCostListItemsPerPage = 0;
        this.otherCostListTotalItems = 0;
        this.otherCostEnableMenu = [];
        this.otherCostFieldObject = [];
        this.requestNumber = "";
        this.labelName = "";
        this.totalCostItems = { TechnicianTotalCost: 0.00, PartsTotalCost: 0.00, ToolsTotalCost: 0.00, OtherTotalCost: 0.00 };
        this.technicianInputItems = { dataKey: "Id", allowAdd: false, allowEdit: true, allowSort: false };
        this.partsInputItems = { dataKey: "Id", sortDir: "ASC", allowAdd: false, allowEdit: true, allowSort: false };
        this.toolsInputItems = { dataKey: "Id", allowAdd: false, allowEdit: true, allowSort: false };
        this.otherCostInputItems = { dataKey: "Id", allowAdd: false, allowEdit: true, allowSort: false };
        this.workFlowEntityReportFieldIdValues = [];
        this.slidewidth = 250;
        this.position = "top-right";
        this.showSlide = false;
    }
    ReviewCostComponent.prototype.ngOnInit = function () {
        this.workFlowEntityReportFieldIdValues = JSON.parse(this.getWorkFlowEntityReportFieldIdValues(5859));
        this.labelName = this.workFlowEntityCategoryId == 3 ? "Work Order Number: " : "Request Number: ";
    };
    /**************************************************
     * Data Load Events
     *
     **************************************************/
    ReviewCostComponent.prototype.loadTechnicianData = function () {
        var contextObj = this;
        contextObj.workOrderService.getReviewTechnicianData(contextObj.getWorkFlowEntityReportFieldIdValues(7502)).subscribe(function (result) {
            contextObj.technicianListTotalItems = result["Data"].DataCount;
            if (contextObj.technicianListTotalItems > 0) {
                contextObj.technicianListSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.technicianEnableMenu = [1, 2];
            }
            else {
                contextObj.technicianListSource = [];
                contextObj.technicianEnableMenu = [1];
            }
            contextObj.onTechnicianCostUpdate(null);
        });
    };
    ReviewCostComponent.prototype.loadPartsData = function () {
        var contextObj = this;
        contextObj.workOrderService.getReviewPartsData(contextObj.getWorkFlowEntityReportFieldIdValues(7498)).subscribe(function (result) {
            contextObj.partsListTotalItems = result["Data"].DataCount;
            if (contextObj.partsListTotalItems > 0) {
                contextObj.partsListSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.partsEnableMenu = [1, 2];
            }
            else {
                contextObj.partsListSource = [];
                contextObj.partsEnableMenu = [1];
            }
            contextObj.onPartsCostUpdate(null);
        });
    };
    ReviewCostComponent.prototype.loadToolsData = function () {
        var contextObj = this;
        contextObj.workOrderService.getReviewToolsData(contextObj.getWorkFlowEntityReportFieldIdValues(7506)).subscribe(function (result) {
            contextObj.toolsListTotalItems = result["Data"].DataCount;
            if (contextObj.toolsListTotalItems > 0) {
                contextObj.toolsListSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.toolsEnableMenu = [1, 2];
            }
            else {
                contextObj.toolsListSource = [];
                contextObj.toolsEnableMenu = [1];
            }
            contextObj.onToolsCostUpdate(null);
        });
    };
    ReviewCostComponent.prototype.loadOtherCostsData = function () {
        var contextObj = this;
        contextObj.workOrderService.getReviewOtherCostData(contextObj.getWorkFlowEntityReportFieldIdValues(7486)).subscribe(function (result) {
            contextObj.otherCostListTotalItems = result["Data"].DataCount;
            if (contextObj.otherCostListTotalItems > 0) {
                contextObj.otherCostListSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.otherCostEnableMenu = [1, 2];
            }
            else {
                contextObj.otherCostListSource = [];
                contextObj.otherCostEnableMenu = [1];
            }
            contextObj.onOtherCostUpdate(null);
        });
    };
    /**************************************************
     * Item Source Updates
     *
     **************************************************/
    ReviewCostComponent.prototype.onTechnicianListSourceUpdated = function (event) {
        this.technicianListSource = event.itemSource;
        this.technicianListItemsPerPage = event.rowsPerPage;
        this.technicianListTotalItems = event.totalItems;
        this.technicianFieldObject = event.fieldObject;
        this.onTechnicianCostUpdate(null);
    };
    ReviewCostComponent.prototype.onToolsListSourceUpdated = function (event) {
        this.toolsListSource = event.itemSource;
        this.toolsListItemsPerPage = event.rowsPerPage;
        this.toolsListTotalItems = event.totalItems;
        this.toolsFieldObject = event.fieldObject;
        this.onToolsCostUpdate(null);
    };
    ReviewCostComponent.prototype.onPartsListSourceUpdated = function (event) {
        this.partsListSource = event.itemSource;
        this.partsListItemsPerPage = event.rowsPerPage;
        this.partsListTotalItems = event.totalItems;
        this.partsFieldObject = event.fieldObject;
        this.onPartsCostUpdate(null);
    };
    ReviewCostComponent.prototype.onOtherCostListSourceUpdated = function (event) {
        this.otherCostListSource = event.itemSource;
        this.otherCostListItemsPerPage = event.rowsPerPage;
        this.otherCostListTotalItems = event.totalItems;
        this.otherCostFieldObject = event.fieldObject;
        this.onOtherCostUpdate(null);
    };
    ReviewCostComponent.prototype.getWorkFlowEntityReportFieldIdValues = function (reportFieldId) {
        var tempArray = [];
        for (var _i = 0, _a = this.workFlowEntityIds; _i < _a.length; _i++) {
            var item = _a[_i];
            tempArray.push({
                ReportFieldId: reportFieldId,
                Value: item
            });
        }
        return JSON.stringify(tempArray);
    };
    /**************************************************
     * Individual Total Cost Calculations
     *
     **************************************************/
    ReviewCostComponent.prototype.onTechnicianCostUpdate = function (event) {
        this.totalCostItems.TechnicianTotalCost = 0.00;
        debugger;
        for (var _i = 0, _a = this.technicianListSource; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item["Time Spent (Hours)"] == "") {
                item["Time Spent (Hours)"] = "0.00";
            }
            else if (!isNaN(Number(item["Time Spent (Hours)"]))) {
                item["Time Spent (Hours)"] = Number.isInteger(parseFloat(item["Time Spent (Hours)"])) ? parseFloat(item["Time Spent (Hours)"]).toFixed(2).toString() : (parseFloat(item["Time Spent (Hours)"])).toString();
                this.totalCostItems.TechnicianTotalCost += parseFloat(item["Rate/Hr."]) * parseFloat(item["Time Spent (Hours)"]);
            }
        }
        this.totalCostItems.TechnicianTotalCost = parseFloat(this.totalCostItems.TechnicianTotalCost.toFixed(2));
    };
    ReviewCostComponent.prototype.onPartsCostUpdate = function (event) {
        this.totalCostItems.PartsTotalCost = 0.00;
        for (var _i = 0, _a = this.partsListSource; _i < _a.length; _i++) {
            var item = _a[_i];
            if (!isNaN(parseInt(item["Quantity"]))) {
                this.totalCostItems.PartsTotalCost += parseFloat(item["Cost/Unit"]) * parseFloat(item["Quantity"]);
            }
            else if (item["Quantity"] == "") {
                item["Quantity"] = "0";
            }
        }
        this.totalCostItems.PartsTotalCost = parseFloat(this.totalCostItems.PartsTotalCost.toFixed(2));
    };
    ReviewCostComponent.prototype.onToolsCostUpdate = function (event) {
        this.totalCostItems.ToolsTotalCost = 0.00;
        for (var _i = 0, _a = this.toolsListSource; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item["Hours Used"] == "") {
                item["Hours Used"] = "0.00";
            }
            else if (!isNaN(Number(item["Hours Used"]))) {
                item["Hours Used"] = Number.isInteger(parseFloat(item["Hours Used"])) ? parseFloat(item["Hours Used"]).toFixed(2).toString() : (parseFloat(item["Hours Used"])).toString();
                this.totalCostItems.ToolsTotalCost += parseFloat(item["Rate/Hr."]) * parseFloat(item["Hours Used"]);
            }
        }
        this.totalCostItems.ToolsTotalCost = parseFloat(this.totalCostItems.ToolsTotalCost.toFixed(2));
    };
    ReviewCostComponent.prototype.onOtherCostUpdate = function (event) {
        this.totalCostItems.OtherTotalCost = 0.00;
        for (var _i = 0, _a = this.otherCostListSource; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item["Other Cost"] == "") {
                item["Other Cost"] = "0.00";
            }
            else if (!isNaN(Number(item["Other Cost"]))) {
                item["Other Cost"] = Number.isInteger(parseFloat(item["Other Cost"])) ? parseFloat(item["Other Cost"]).toFixed(2).toString() : (parseFloat(item["Other Cost"])).toString();
                this.totalCostItems.OtherTotalCost += parseFloat(item["Other Cost"]);
            }
        }
        this.totalCostItems.OtherTotalCost = parseFloat(this.totalCostItems.OtherTotalCost.toFixed(2));
    };
    /**************************************************
     * Individual Add Events
     *
     **************************************************/
    ReviewCostComponent.prototype.onTechnicianAdd = function (event) {
        var contextObj = this;
        var costData = [];
        costData.push({
            CostTypeId: 3,
            WFReportFieldIdValues: event
        });
        var costSubmitOutput = {
            WFEntityCostInput: {
                FormId: 254, ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues, ListOtherCostReportFieldIdValues: null,
                ListPartsCostReportFieldIdValues: null, ListToolsCostReportFieldIdValues: null, ListTechniciansCostReportFieldIdValues: costData
            }
        };
        contextObj.workOrderService.submitReviewIndividualCostData(JSON.stringify(costSubmitOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var tempArray = JSON.parse(resultData["Data"]["Data"][0]);
                    var updatedData = new Array(); /*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.technicianListSource);
                    for (var _i = 0, tempArray_1 = tempArray; _i < tempArray_1.length; _i++) {
                        var item = tempArray_1[_i];
                        updatedData.push(item);
                    }
                    contextObj.technicianListSource = [];
                    contextObj.technicianListSource = updatedData;
                    contextObj.technicianEnableMenu = contextObj.technicianListSource.length == 0 ? [1] : [1, 2];
                    contextObj.notificationService.ShowToaster("Technician(s) added", 3);
                    break;
                default:
                    break;
            }
        });
    };
    ReviewCostComponent.prototype.onToolsAdd = function (event) {
        var contextObj = this;
        var costData = [];
        costData.push({
            CostTypeId: 4,
            WFReportFieldIdValues: event
        });
        var costSubmitOutput = {
            WFEntityCostInput: {
                FormId: 257, ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues, ListOtherCostReportFieldIdValues: null,
                ListPartsCostReportFieldIdValues: null, ListToolsCostReportFieldIdValues: costData, ListTechniciansCostReportFieldIdValues: null
            }
        };
        contextObj.workOrderService.submitReviewIndividualCostData(JSON.stringify(costSubmitOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var tempArray = JSON.parse(resultData["Data"]["Data"][0]);
                    var updatedData = new Array(); /*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.toolsListSource);
                    for (var _i = 0, tempArray_2 = tempArray; _i < tempArray_2.length; _i++) {
                        var item = tempArray_2[_i];
                        updatedData.push(item);
                    }
                    contextObj.toolsListSource = [];
                    contextObj.toolsListSource = updatedData;
                    contextObj.toolsEnableMenu = contextObj.toolsListSource.length == 0 ? [1] : [1, 2];
                    contextObj.notificationService.ShowToaster("Tool(s) added", 3);
                    break;
                default:
                    break;
            }
        });
    };
    ReviewCostComponent.prototype.onPartsAdd = function (event) {
        var contextObj = this;
        var costData = [];
        costData.push({
            CostTypeId: 2,
            WFReportFieldIdValues: event
        });
        var costSubmitOutput = {
            WFEntityCostInput: {
                FormId: 256, ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues, ListOtherCostReportFieldIdValues: null,
                ListPartsCostReportFieldIdValues: costData, ListToolsCostReportFieldIdValues: null, ListTechniciansCostReportFieldIdValues: null
            }
        };
        contextObj.workOrderService.submitReviewIndividualCostData(JSON.stringify(costSubmitOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var tempArray = JSON.parse(resultData["Data"]["Data"][0]);
                    var updatedData = new Array(); /*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.partsListSource);
                    for (var _i = 0, tempArray_3 = tempArray; _i < tempArray_3.length; _i++) {
                        var item = tempArray_3[_i];
                        updatedData.push(item);
                    }
                    contextObj.partsListSource = [];
                    contextObj.partsListSource = updatedData;
                    contextObj.partsEnableMenu = contextObj.partsListSource.length == 0 ? [1] : [1, 2];
                    contextObj.notificationService.ShowToaster("Part(s) added", 3);
                    break;
                default:
                    break;
            }
        });
    };
    ReviewCostComponent.prototype.onOtherCostAdd = function (event) {
        var contextObj = this;
        var costData = [];
        costData.push({
            CostTypeId: 1,
            WFReportFieldIdValues: event
        });
        var costSubmitOutput = {
            WFEntityCostInput: {
                FormId: 259, ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues, ListOtherCostReportFieldIdValues: costData,
                ListPartsCostReportFieldIdValues: null, ListToolsCostReportFieldIdValues: null, ListTechniciansCostReportFieldIdValues: null
            }
        };
        contextObj.workOrderService.submitReviewIndividualCostData(JSON.stringify(costSubmitOutput)).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var tempArray = JSON.parse(resultData["Data"]["Data"][0]);
                    var updatedData = new Array(); /*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.otherCostListSource);
                    for (var _i = 0, tempArray_4 = tempArray; _i < tempArray_4.length; _i++) {
                        var item = tempArray_4[_i];
                        updatedData.push(item);
                    }
                    contextObj.otherCostListSource = [];
                    contextObj.otherCostListSource = updatedData;
                    contextObj.otherCostEnableMenu = contextObj.otherCostListSource.length == 0 ? [1] : [1, 2];
                    contextObj.notificationService.ShowToaster("Other Cost added", 3);
                    break;
                default:
                    break;
            }
        });
    };
    /**************************************************
     * Final Submit Event
     *
     **************************************************/
    ReviewCostComponent.prototype.onSubmit = function () {
        var contextObj = this;
        debugger;
        setTimeout(function () {
            if (contextObj.hasAnyValidationError())
                return;
            var reviewCostOutput = {
                WFEntityCostInput: {
                    FormId: 249,
                    ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues,
                    ListTechniciansCostReportFieldIdValues: contextObj.getFinalTechnicianCostData(),
                    ListPartsCostReportFieldIdValues: contextObj.getFinalPartsCostData(),
                    ListToolsCostReportFieldIdValues: contextObj.getFinalToolsCostData(),
                    ListOtherCostReportFieldIdValues: contextObj.getFinalOtherCostData()
                }
            };
            contextObj.workOrderService.submitReviewMultipleCostData(JSON.stringify(reviewCostOutput), contextObj.workFlowEntityIds).subscribe(function (resultData) {
                console.log(resultData);
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("Cost details updated", 3);
                        contextObj.onCostSubmit.emit(contextObj.totalCostItems);
                        break;
                    default:
                        break;
                }
            });
        }, 100);
    };
    ReviewCostComponent.prototype.hasAnyValidationError = function () {
        var timeSpent = this.technicianFieldObject.find(function (item) { return item.ReportFieldId === 7521; });
        if (timeSpent && timeSpent.HasValidationError) {
            return true;
        }
        var quantity = this.partsFieldObject.find(function (item) { return item.ReportFieldId === 12046; });
        if (quantity && quantity.HasValidationError) {
            return true;
        }
        var hoursUsed = this.toolsFieldObject.find(function (item) { return item.ReportFieldId === 1390; });
        if (hoursUsed && hoursUsed.HasValidationError) {
            return true;
        }
        var otherCost = this.otherCostFieldObject.find(function (item) { return item.ReportFieldId === 7488; });
        if (otherCost && otherCost.HasValidationError) {
            return true;
        }
        return false;
    };
    /**************************************************
    * Getting Individual Cost Data For Final
    * Submission
    **************************************************/
    ReviewCostComponent.prototype.getFinalTechnicianCostData = function () {
        var returnData = [];
        for (var _i = 0, _a = this.technicianListSource; _i < _a.length; _i++) {
            var item = _a[_i];
            returnData.push({ CostTypeId: 3, WFReportFieldIdValues: [{ ReportFieldId: 1383, Value: item.Id }, { ReportFieldId: 7521, Value: item["Time Spent (Hours)"] }] });
        }
        return returnData;
    };
    ReviewCostComponent.prototype.getFinalPartsCostData = function () {
        var returnData = [];
        for (var _i = 0, _a = this.partsListSource; _i < _a.length; _i++) {
            var item = _a[_i];
            returnData.push({ CostTypeId: 2, WFReportFieldIdValues: [{ ReportFieldId: 1378, Value: item.Id }, { ReportFieldId: 12046, Value: item["Quantity"] }] });
        }
        return returnData;
    };
    ReviewCostComponent.prototype.getFinalToolsCostData = function () {
        var returnData = [];
        for (var _i = 0, _a = this.toolsListSource; _i < _a.length; _i++) {
            var item = _a[_i];
            returnData.push({ CostTypeId: 4, WFReportFieldIdValues: [{ ReportFieldId: 1389, Value: item.Id }, { ReportFieldId: 1390, Value: item["Hours Used"] }] });
        }
        return returnData;
    };
    ReviewCostComponent.prototype.getFinalOtherCostData = function () {
        var returnData = [];
        for (var _i = 0, _a = this.otherCostListSource; _i < _a.length; _i++) {
            var item = _a[_i];
            returnData.push({ CostTypeId: 1, WFReportFieldIdValues: [{ ReportFieldId: 7487, Value: item["Cost Item"] }, { ReportFieldId: 7488, Value: item["Other Cost"] }] });
        }
        return returnData;
    };
    /**************************************************
    * Individual Delete Events
    *
    **************************************************/
    ReviewCostComponent.prototype.onTechnicianCostDelete = function (event) {
        var contextObj = this;
        var reviewCostOutput = {
            WFEntityCostInput: {
                FormId: 249,
                ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues,
                ListTechniciansCostReportFieldIdValues: contextObj.getDeleteTechnicianCostData(event),
                ListPartsCostReportFieldIdValues: null,
                ListToolsCostReportFieldIdValues: null,
                ListOtherCostReportFieldIdValues: null
            }
        };
        contextObj.workOrderService.deleteReviewCostData(JSON.stringify(reviewCostOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Selected Cost deleted", 3);
                    contextObj.technicianListSource = contextObj.technicianListSource.filter(function (item) { return event.indexOf(item.Id) == -1; });
                    contextObj.onTechnicianCostUpdate(null);
                    contextObj.technicianEnableMenu = contextObj.technicianListSource.length == 0 ? [1] : [1, 2];
                    break;
                default:
                    break;
            }
        });
    };
    ReviewCostComponent.prototype.onPartsCostDelete = function (event) {
        var contextObj = this;
        var reviewCostOutput = {
            WFEntityCostInput: {
                FormId: 250,
                ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues,
                ListTechniciansCostReportFieldIdValues: null,
                ListPartsCostReportFieldIdValues: contextObj.getDeletePartsCostData(event),
                ListToolsCostReportFieldIdValues: null,
                ListOtherCostReportFieldIdValues: null
            }
        };
        contextObj.workOrderService.deleteReviewCostData(JSON.stringify(reviewCostOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Selected Cost deleted", 3);
                    contextObj.partsListSource = contextObj.partsListSource.filter(function (item) { return event.indexOf(item.Id) == -1; });
                    contextObj.onPartsCostUpdate(null);
                    contextObj.partsEnableMenu = contextObj.partsListSource.length == 0 ? [1] : [1, 2];
                    break;
                default:
                    break;
            }
        });
    };
    ReviewCostComponent.prototype.onToolsCostDelete = function (event) {
        var contextObj = this;
        var reviewCostOutput = {
            WFEntityCostInput: {
                FormId: 251,
                ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues,
                ListTechniciansCostReportFieldIdValues: null,
                ListPartsCostReportFieldIdValues: null,
                ListToolsCostReportFieldIdValues: contextObj.getDeleteToolsCostData(event),
                ListOtherCostReportFieldIdValues: null
            }
        };
        contextObj.workOrderService.deleteReviewCostData(JSON.stringify(reviewCostOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Selected Cost deleted", 3);
                    contextObj.toolsListSource = contextObj.toolsListSource.filter(function (item) { return event.indexOf(item.Id) == -1; });
                    contextObj.onToolsCostUpdate(null);
                    contextObj.toolsEnableMenu = contextObj.toolsListSource.length == 0 ? [1] : [1, 2];
                    break;
                default:
                    break;
            }
        });
    };
    ReviewCostComponent.prototype.onOthersCostDelete = function (event) {
        var contextObj = this;
        var reviewCostOutput = {
            WFEntityCostInput: {
                FormId: 252,
                ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues,
                ListTechniciansCostReportFieldIdValues: null,
                ListPartsCostReportFieldIdValues: null,
                ListToolsCostReportFieldIdValues: null,
                ListOtherCostReportFieldIdValues: contextObj.getDeleteOtherCostData(event)
            }
        };
        contextObj.workOrderService.deleteReviewCostData(JSON.stringify(reviewCostOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Selected Cost deleted", 3);
                    contextObj.otherCostListSource = contextObj.otherCostListSource.filter(function (item) { return event.indexOf(item.Id) == -1; });
                    contextObj.onOtherCostUpdate(null);
                    contextObj.otherCostEnableMenu = contextObj.otherCostListSource.length == 0 ? [1] : [1, 2];
                    break;
                default:
                    break;
            }
        });
    };
    /**************************************************
     * Getting Individual Cost Data For Delete
     *
     **************************************************/
    ReviewCostComponent.prototype.getDeleteTechnicianCostData = function (selectedIds) {
        var returnData = [];
        for (var _i = 0, selectedIds_1 = selectedIds; _i < selectedIds_1.length; _i++) {
            var id = selectedIds_1[_i];
            returnData.push({ CostTypeId: 3, WFReportFieldIdValues: [{ ReportFieldId: 1383, Value: id }] });
        }
        return returnData;
    };
    ReviewCostComponent.prototype.getDeletePartsCostData = function (selectedIds) {
        var returnData = [];
        for (var _i = 0, selectedIds_2 = selectedIds; _i < selectedIds_2.length; _i++) {
            var id = selectedIds_2[_i];
            returnData.push({ CostTypeId: 2, WFReportFieldIdValues: [{ ReportFieldId: 1378, Value: id }] });
        }
        return returnData;
    };
    ReviewCostComponent.prototype.getDeleteToolsCostData = function (selectedIds) {
        var returnData = [];
        for (var _i = 0, selectedIds_3 = selectedIds; _i < selectedIds_3.length; _i++) {
            var id = selectedIds_3[_i];
            returnData.push({ CostTypeId: 4, WFReportFieldIdValues: [{ ReportFieldId: 1389, Value: id }] });
        }
        return returnData;
    };
    ReviewCostComponent.prototype.getDeleteOtherCostData = function (selectedIds) {
        var returnData = [];
        for (var _i = 0, selectedIds_4 = selectedIds; _i < selectedIds_4.length; _i++) {
            var id = selectedIds_4[_i];
            var otherCostItem = this.otherCostListSource.find(function (item) { return item.Id === id; });
            returnData.push({ CostTypeId: 1, WFReportFieldIdValues: [{ ReportFieldId: 7487, Value: otherCostItem["Cost Item"] }] });
        }
        return returnData;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewCostComponent.prototype, "onCostSubmit", void 0);
    ReviewCostComponent = __decorate([
        core_1.Component({
            selector: 'review-Cost',
            templateUrl: './app/Views/WorkOrder/Review/Review Cost/review-Cost.component.html',
            directives: [page_component_1.PageComponent, reviewCost_Technician_list_component_1.ReviewTechniciansComponent, reviewCost_Tools_list_component_1.ReviewToolsComponent, reviewCost_Parts_list_component_1.ReviewPartsComponent, reviewCost_Other_list_component_1.ReviewOtherCostComponent, slide_component_1.SlideComponent],
            providers: [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService, General_1.GeneralFunctions],
            inputs: ['workFlowEntityCategoryId', 'workFlowEntityIds', 'requestNumber'],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService, General_1.GeneralFunctions])
    ], ReviewCostComponent);
    return ReviewCostComponent;
}());
exports.ReviewCostComponent = ReviewCostComponent;
//# sourceMappingURL=review-Cost.component.js.map
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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var search_component_1 = require('../../../framework/whatever/search/search.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var ListReviewPMWorkOrderComponent = (function () {
    function ListReviewPMWorkOrderComponent(workOrderService, AdministrationService, notificationService, generFun, _validateService) {
        this.workOrderService = workOrderService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this._validateService = _validateService;
        this.onReviewClick = new core_1.EventEmitter();
        this.itemSourceUpdate = new core_1.EventEmitter();
        this.pageIndex = 0;
        this.secondaryTarget = 0;
        this.dateToPerform = '';
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 20 };
        this.advanceValue = "[]";
        this.filter = "";
        this.isKeyWordSearch = 0;
        this.isAdvanceSearch = 0;
        this.disable = true;
        this.outComeId = 0;
        this.shouldReload = false;
        this.selectActionInline = "horizontal";
        this.enableMenu = [];
        this.menuData = [
            {
                "id": 1,
                "title": "Review",
                "image": "Review",
                "path": "Review",
                "subMenu": null,
                "privilegeId": null //9514
            },
            {
                "id": 3,
                "title": "More",
                "image": "More",
                "path": "More",
                "subMenu": [
                    {
                        "id": 4,
                        "title": "Complete",
                        "image": "Complete",
                        "path": "Complete",
                        "subMenu": null,
                        "privilegeId": null
                    },
                    {
                        "id": 5,
                        "title": "Close",
                        "image": "Close",
                        "path": "Close",
                        "subMenu": null,
                        "privilegeId": null
                    },
                    {
                        "id": 6,
                        "title": "Discard",
                        "image": "Discard",
                        "path": "Discard",
                        "subMenu": null,
                        "privilegeId": null
                    },
                    {
                        "id": 7,
                        "title": "Override",
                        "image": "Override",
                        "path": "Override",
                        "subMenu": null,
                        "privilegeId": 9515 // Bug 81947
                    },
                    {
                        "id": 8,
                        "title": "Reminder",
                        "image": "Reminder",
                        "path": "Reminder",
                        "subMenu": null,
                        "privilegeId": 9516 // Bug 81947
                    },
                ]
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    ListReviewPMWorkOrderComponent.prototype.ngOnInit = function () {
        if (window["IsMobile"] == true) {
            this.selectActionInline = "vertical";
        }
        var contextObj = this;
        if (!contextObj.isActive) {
            contextObj.menuData = [];
        }
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 851, contextObj.AdministrationService, contextObj.menuData.length);
        this.workOrderService.getPMReviewListFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            if (!contextObj.isActive) {
                var fieldIdToBeRemoved = [1475, 1476]; /* Current Action Point and For Action By*/
                contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return fieldIdToBeRemoved.indexOf(item.FieldId) == -1; });
            }
            contextObj.dataLoad(1);
            contextObj.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8];
        });
        contextObj.workOrderService.getPmWorkorderKeywordField(contextObj.getReportFieldIdValuesForSearch()).subscribe(function (resultData) {
            contextObj.keywordFieldObject = resultData["FieldBinderList"];
        });
    };
    ListReviewPMWorkOrderComponent.prototype.ngOnChanges = function (changes) {
        if (changes["shouldReload"] && typeof (changes["shouldReload"]["previousValue"]) == 'boolean' && changes["shouldReload"]["currentValue"] != changes["shouldReload"]["previousValue"]) {
            this.loadData(0);
        }
    };
    ListReviewPMWorkOrderComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.workOrderService.getPMReviewListData(0, 0, contextObj.isActive ? 0 : 3, contextObj.dateToPerform, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, '').subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.disable = false;
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1];
                contextObj.itemSourceUpdate.emit({
                    itemSource: contextObj.itemsSource,
                    rowsPerPage: contextObj.itemsPerPage,
                    totalItems: contextObj.totalItems,
                });
                contextObj.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8];
            }
            else {
                contextObj.notificationService.ShowToaster("No PM Work Orders exist", 2);
                contextObj.enableMenu = [];
                contextObj.itemsSource = [];
                contextObj.disable = true;
            }
        });
    };
    ListReviewPMWorkOrderComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.loadData(0);
    };
    ;
    ListReviewPMWorkOrderComponent.prototype.onSort = function (objGrid) {
        this.loadData(0);
    };
    ListReviewPMWorkOrderComponent.prototype.loadData = function (target) {
        if (this.isKeyWordSearch == 0 && this.isAdvanceSearch == 0)
            this.dataLoad(target);
        else if (this.isKeyWordSearch == 1 && this.isAdvanceSearch == 0)
            this.getKeywordSearchdata();
        else if (this.isKeyWordSearch == 0 && this.isAdvanceSearch == 1)
            this.getAdvancedSearchdata();
    };
    ListReviewPMWorkOrderComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.reviewClick();
                break;
            case 4:
                this.onCompleteClick();
                break;
            case 5:
                this.onClose();
                break;
            case 6:
                this.discard();
                break;
            case 7:
                this.override();
                break;
            case 8:
                this.reminder();
                break;
        }
    };
    ListReviewPMWorkOrderComponent.prototype.reviewClick = function () {
        var contextObj = this;
        this.action = "review";
        this.btnName = "Save Changes";
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Work Order", 2);
        }
        else if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            contextObj.workOrderService.loadReviewServiceRequest(contextObj.inputItems.rowData.WorkOrderId, "review", contextObj.inputItems.rowData["WorkTypeId"], contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"], 3, contextObj.inputItems.rowData["WorkFlowEntityId"], contextObj.inputItems.rowData["EquipmentCategoryId"]).subscribe(function (resultData) {
                contextObj.fieldDetailsAdd1 = contextObj.updateFieldDetails(resultData["Data"]["FieldBinderList"]);
                if (resultData["Data"]["FieldBinderData"] != null) {
                    contextObj.removeTimeOutActionFromLookUps(JSON.parse(resultData["Data"]["FieldBinderData"]));
                }
                contextObj.onReviewClick.emit({
                    fieldobject: contextObj.fieldDetailsAdd1,
                    outComes: resultData["Data"]["FieldBinderData"] == null ? [] : JSON.parse(resultData["Data"]["FieldBinderData"]),
                    action: contextObj.action,
                    buttonName: contextObj.btnName,
                    input: contextObj.inputItems,
                });
            });
        }
    };
    ListReviewPMWorkOrderComponent.prototype.onClose = function () {
        var contextObj = this;
        contextObj.CompleteOrClose = 2;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Work Order", 2);
            return;
        }
        if (contextObj.inputItems.selectedIds.length > 1) {
            var preivousWorkTypeId;
            for (var _i = 0, _a = contextObj.inputItems.rowData; _i < _a.length; _i++) {
                var item = _a[_i];
                if (preivousWorkTypeId && preivousWorkTypeId != item["WorkTypeId"]) {
                    contextObj.notificationService.ShowToaster("Work Order(s) of different Work Types cannot be closed", 2);
                    return;
                }
                preivousWorkTypeId = item["WorkTypeId"];
            }
        }
        var reportFieldIds = [];
        if (contextObj.inputItems.selectedIds.length > 1) {
            for (var _b = 0, _c = contextObj.inputItems.rowData; _b < _c.length; _b++) {
                var item = _c[_b];
                reportFieldIds.push({
                    ReportFieldId: 1481,
                    Value: item["WorkOrderId"]
                });
            }
            reportFieldIds.push({
                ReportFieldId: 6561,
                Value: 2
            });
        }
        else {
            reportFieldIds.push({
                ReportFieldId: 1481,
                Value: contextObj.inputItems.rowData["WorkOrderId"]
            }, {
                ReportFieldId: 6561,
                Value: 3
            });
        }
        var workFlowInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: reportFieldIds };
        var reviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };
        contextObj.workOrderService.CheckMultipleCompleteorClose(JSON.stringify(reviewSubmitOutput), 1).subscribe(function (result) {
            var WorkflowEntityCategoryId = 3;
            if (result["Data"] == -2 || result["Data"] == -12 || result["Data"] == -11) {
                contextObj.notificationService.ShowToaster("Selected Work Order(s) cannot be closed", 2);
                return;
            }
            else if (result["Data"] == -3) {
                contextObj.notificationService.ShowToaster("Selected Work Order(s) in On Hold status, cannot be closed", 2);
            }
            else if (result["Data"] == -1) {
                contextObj.notificationService.ShowToaster("Some of the selected Work Order(s) cannot be closed", 2);
            }
            else if (result["Data"] == 0) {
                contextObj.notificationService.ShowToaster("Selected Work Order(s) are already closed", 2);
            }
            else if (result["Data"] == 1) {
                contextObj.btnName = "Save";
                contextObj.action = "Close";
                contextObj.workOrderService.getCompleteOrCloseRequestFields().subscribe(function (resultData) {
                    contextObj.completeCloseFieldObject = contextObj.updateFieldDetailsForComplete(resultData["Data"]);
                    contextObj.pageTitle = "Close Work Orders";
                    var SendTo = resultData["Data"].find(function (item) { return item.ReportFieldId === 12254; });
                    SendTo.IsVisible = false;
                    if (contextObj.isTimeSpentSubscribed == false) {
                        if (contextObj.inputItems.selectedIds.length == 1) {
                            var TimeSpent = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521; });
                            TimeSpent.IsVisible = false;
                            TimeSpent.FieldValue = "0.01";
                        }
                        else if (contextObj.inputItems.selectedIds.length > 1) {
                            for (var _i = 0, _a = contextObj.inputItems.rowData; _i < _a.length; _i++) {
                                var item = _a[_i];
                                var TimeSpent = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521; });
                                TimeSpent.IsVisible = false;
                                TimeSpent.FieldValue = "0.01";
                                break;
                            }
                        }
                    }
                    if (contextObj.isTimeSpentSubscribed == true) {
                        var TimeSpent = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521; });
                        TimeSpent.IsVisible = false;
                        TimeSpent.FieldValue = "0.01";
                    }
                    contextObj.secondaryTarget = 1;
                    contextObj.splitviewInput.showSecondaryView = true;
                });
            }
            else {
                contextObj.notificationService.ShowToaster("Selected Work Order(s) cannot be closed", 2);
                return;
            }
        });
    };
    ListReviewPMWorkOrderComponent.prototype.onCompleteOrCloseSubmit = function (event) {
        var contextObj = this;
        var reportFieldIds = JSON.parse(event.fieldobject);
        var actionPoint = reportFieldIds.find(function (items) { return items.ReportFieldId === 12254; });
        var index = reportFieldIds.indexOf(actionPoint);
        if (index > -1) {
            reportFieldIds.splice(index, 1);
        }
        if (contextObj.CompleteOrClose == 3) {
            var DateOfCompletionRemove = reportFieldIds.find(function (items) { return items.ReportFieldId === 1487; });
            var index = reportFieldIds.indexOf(DateOfCompletionRemove);
            if (index > -1) {
                reportFieldIds.splice(index, 1);
            }
        }
        if (contextObj.CompleteOrClose == 1) {
            var DateRemove = reportFieldIds.find(function (items) { return items.ReportFieldId === 1481; });
            var index = reportFieldIds.indexOf(DateRemove);
            if (index > -1) {
                reportFieldIds.splice(index, 1);
            }
        }
        var actionPointField = contextObj.completeCloseFieldObject.find(function (item) {
            return item.ReportFieldId === 12254;
        });
        if (actionPointField.MultiFieldValues != null) {
            for (var _i = 0, _a = actionPointField.MultiFieldValues; _i < _a.length; _i++) {
                var items = _a[_i];
                reportFieldIds.push({
                    ReportFieldId: 12254,
                    Value: items
                });
            }
        }
        if (contextObj.inputItems.selectedIds.length > 1) {
            for (var _b = 0, _c = contextObj.inputItems.rowData; _b < _c.length; _b++) {
                var item = _c[_b];
                reportFieldIds.push({
                    ReportFieldId: 1481,
                    Value: item["WorkOrderId"]
                }, {
                    ReportFieldId: 5859,
                    Value: item["WorkFlowEntityId"]
                });
            }
            reportFieldIds.push({
                ReportFieldId: 6561,
                Value: 3
            });
        }
        else {
            reportFieldIds.push({
                ReportFieldId: 1481,
                Value: contextObj.inputItems.rowData["WorkOrderId"]
            }, {
                ReportFieldId: 5859,
                Value: contextObj.inputItems.rowData["WorkFlowEntityId"]
            }, {
                ReportFieldId: 6561,
                Value: 3
            });
        }
        var workFlowInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: reportFieldIds };
        var reviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };
        if (contextObj.CompleteOrClose == 1) {
            var itemDate;
            var WorkflowEntityCategoryId = 3;
            var DateofCompletion = contextObj.completeCloseFieldObject.find(function (item) { return item.ReportFieldId === 1487; });
            var dateofCompletionValue = new Date(new Date(DateofCompletion.FieldValue).toDateString());
            var TimeSpent = contextObj.completeCloseFieldObject.find(function (item) { return item.ReportFieldId === 7521; });
            if (TimeSpent && TimeSpent.FieldValue == "0") {
                contextObj.notificationService.ShowToaster("Time Spent (Hours) must be greater than zero", 2);
                return;
            }
            if (contextObj.inputItems.selectedIds.length > 1) {
                if (WorkflowEntityCategoryId == 3)
                    for (var _d = 0, _e = contextObj.inputItems.rowData; _d < _e.length; _d++) {
                        var item = _e[_d];
                        itemDate = new Date(item["Work Order Date"]);
                        if (dateofCompletionValue < itemDate) {
                            contextObj.notificationService.ShowToaster("Date of Completion should be greater than Work Order Date", 2);
                            return;
                        }
                    }
            }
            else if (contextObj.inputItems.selectedIds.length == 1) {
                if (WorkflowEntityCategoryId == 3) {
                    itemDate = new Date(contextObj.inputItems.rowData["Work Order Date"]);
                    if (dateofCompletionValue < itemDate) {
                        contextObj.notificationService.ShowToaster("Date of Completion should be greater than Work Order Date", 2);
                        return;
                    }
                }
            }
            contextObj.workOrderService.CompleteUpdateData(JSON.stringify(reviewSubmitOutput), 2).subscribe(function (result) {
                if (result.Message == "Success") {
                    contextObj.checkAndLoadData();
                    var WorkflowEntityCategoryId = 3;
                    if (WorkflowEntityCategoryId == 1)
                        contextObj.notificationService.ShowToaster("Work Order(s) completed", 2);
                    else
                        contextObj.notificationService.ShowToaster("Work Order(s) completed", 2);
                    contextObj.splitviewInput.showSecondaryView = false;
                }
            });
        }
        else if (contextObj.CompleteOrClose == 2) {
            var itemDate;
            var WorkflowEntityCategoryId = 3;
            var DateofCompletion = contextObj.completeCloseFieldObject.find(function (item) { return item.ReportFieldId === 1487; });
            var dateofCompletionValue = new Date(new Date(DateofCompletion.FieldValue).toDateString());
            var TimeSpent = contextObj.completeCloseFieldObject.find(function (item) { return item.ReportFieldId === 7521; });
            if (TimeSpent && TimeSpent.FieldValue == "0") {
                contextObj.notificationService.ShowToaster("Time Spent (Hours) must be greater than zero", 2);
                return;
            }
            if (contextObj.inputItems.selectedIds.length > 1) {
                if (WorkflowEntityCategoryId == 3)
                    for (var _f = 0, _g = contextObj.inputItems.rowData; _f < _g.length; _f++) {
                        var item = _g[_f];
                        itemDate = new Date(item["Work Order Date"]);
                        if (dateofCompletionValue < itemDate) {
                            contextObj.notificationService.ShowToaster("Date of Completion should be greater than Work Order Date", 2);
                            return;
                        }
                    }
            }
            else if (contextObj.inputItems.selectedIds.length == 1) {
                if (WorkflowEntityCategoryId == 3) {
                    itemDate = new Date(contextObj.inputItems.rowData["Work Order Date"]);
                    if (dateofCompletionValue < itemDate) {
                        contextObj.notificationService.ShowToaster("Date of Completion should be greater than Work Order Date", 2);
                        return;
                    }
                }
            }
            contextObj.workOrderService.CompleteUpdateData(JSON.stringify(reviewSubmitOutput), 1).subscribe(function (result) {
                if (result.Message == "Success") {
                    contextObj.checkAndLoadData();
                    var WorkflowEntityCategoryId = 3;
                    if (WorkflowEntityCategoryId == 1)
                        contextObj.notificationService.ShowToaster("Work Order(s) closed", 2);
                    else
                        contextObj.notificationService.ShowToaster("Work Order(s) closed", 2);
                    contextObj.splitviewInput.showSecondaryView = false;
                }
            });
        }
        else if (contextObj.CompleteOrClose == 3) {
            contextObj.workOrderService.CompleteUpdateData(JSON.stringify(reviewSubmitOutput), 3).subscribe(function (result) {
                if (result.Message == "Success") {
                    contextObj.checkAndLoadData();
                    contextObj.notificationService.ShowToaster("Work Order(s) discarded", 2);
                    contextObj.splitviewInput.showSecondaryView = false;
                }
            });
        }
    };
    ListReviewPMWorkOrderComponent.prototype.checkAndLoadData = function () {
        if (this.isKeyWordSearch == 0 && this.isAdvanceSearch == 0)
            this.dataLoad(0);
        else if (this.isKeyWordSearch == 1 && this.isAdvanceSearch == 0)
            this.getKeywordSearchdata();
        else if (this.isKeyWordSearch == 0 && this.isAdvanceSearch == 1)
            this.getAdvancedSearchdata();
    };
    ListReviewPMWorkOrderComponent.prototype.onCompleteClick = function () {
        var contextObj = this;
        contextObj.CompleteOrClose = 1;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Work Order", 2);
            return;
        }
        if (contextObj.inputItems.selectedIds.length > 1) {
            var preivousWorkTypeId;
            for (var _i = 0, _a = contextObj.inputItems.rowData; _i < _a.length; _i++) {
                var item = _a[_i];
                if (preivousWorkTypeId && preivousWorkTypeId != item["WorkTypeId"]) {
                    contextObj.notificationService.ShowToaster("Work Order(s) of different Work Types cannot be completed", 2);
                    return;
                }
                preivousWorkTypeId = item["WorkTypeId"];
            }
        }
        var reportFieldIds = [];
        if (contextObj.inputItems.selectedIds.length > 1) {
            for (var _b = 0, _c = contextObj.inputItems.rowData; _b < _c.length; _b++) {
                var item = _c[_b];
                reportFieldIds.push({
                    ReportFieldId: 1481,
                    Value: item["WorkOrderId"]
                });
            }
            reportFieldIds.push({
                ReportFieldId: 6561,
                Value: 3
            });
        }
        else {
            reportFieldIds.push({
                ReportFieldId: 1481,
                Value: contextObj.inputItems.rowData["WorkOrderId"]
            }, {
                ReportFieldId: 6561,
                Value: 3
            });
        }
        var workFlowInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: reportFieldIds };
        var reviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };
        contextObj.workOrderService.CheckMultipleCompleteorClose(JSON.stringify(reviewSubmitOutput), 2).subscribe(function (result) {
            var WorkflowEntityCategoryId = 3;
            if (result["Data"] == -2 || result["Data"] == -12 || result["Data"] == -11) {
                if (WorkflowEntityCategoryId == 1)
                    contextObj.notificationService.ShowToaster("Selected Work Order(s) cannot be completed", 2);
                else
                    contextObj.notificationService.ShowToaster("Selected Work Order(s) cannot be completed", 2);
            }
            else if (result["Data"] == -3) {
                contextObj.notificationService.ShowToaster("Selected Work Order(s) in On Hold status, cannot be completed", 2);
            }
            else if (result["Data"] == -1) {
                contextObj.notificationService.ShowToaster("Some of the selected Work Order(s) cannot be completed", 2);
            }
            else if (result["Data"] == 0)
                contextObj.notificationService.ShowToaster("Some of the selected Work Order(s) are already completed", 2);
            else if (result["Data"] == 1) {
                contextObj.btnName = "Save";
                contextObj.action = "Complete";
                contextObj.workOrderService.getCompleteOrCloseRequestFields().subscribe(function (resultData) {
                    contextObj.completeCloseFieldObject = contextObj.updateFieldDetailsForComplete(resultData["Data"]);
                    contextObj.pageTitle = "Complete Work Orders";
                    if (contextObj.isTimeSpentSubscribed == false) {
                        var TimeSpent = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521; });
                        TimeSpent.IsVisible = false;
                        TimeSpent.FieldValue = "0.01";
                    }
                    if (contextObj.inputItems.selectedIds.length == 1) {
                        var entityCategoryId = 3;
                        var workTypeId = contextObj.inputItems.rowData["WorkTypeId"];
                        var actionPointId = contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"];
                    }
                    else if (contextObj.inputItems.selectedIds.length > 1) {
                        var entityCategoryId = 3;
                        var workTypeId = contextObj.inputItems.rowData[0]["WorkTypeId"];
                        var actionPointId = contextObj.inputItems.rowData[0]["CurrentWorkFlowActionPointId"];
                    }
                    contextObj.workOrderService.getActionPointUserLookupForComplete(0, parseInt(workTypeId), 9, entityCategoryId, actionPointId).subscribe(function (resultData) {
                        var actionUser = contextObj.completeCloseFieldObject.find(function (item) {
                            return item.FieldId === 1562;
                        });
                        if (resultData["FieldBinderData"] != "[]") {
                            var lookUpArray = JSON.parse(resultData["FieldBinderData"]);
                            actionUser.LookupDetails.LookupValues = lookUpArray;
                            actionUser.IsVisible = true;
                            actionUser.IsMandatory = true;
                            actionUser.FieldLabel = "Next Action Point User(s)";
                        }
                        else {
                            actionUser.IsVisible = false;
                            actionUser.IsMandatory = false;
                            actionUser.HasValidationError = false;
                            contextObj.initiateValidation(actionUser);
                            actionUser.LookupDetails.LookupValues = [];
                            actionUser.MultiFieldValues = [];
                        }
                    });
                    contextObj.secondaryTarget = 1;
                    contextObj.splitviewInput.showSecondaryView = true;
                });
            }
            else {
                if (WorkflowEntityCategoryId == 1)
                    contextObj.notificationService.ShowToaster("Selected Work Order(s) cannot be completed", 2);
                else
                    contextObj.notificationService.ShowToaster("Selected Work Order(s) cannot be completed", 2);
                return;
            }
        });
    };
    ListReviewPMWorkOrderComponent.prototype.initiateValidation = function (fieldObject) {
        var contextObj = this;
        var el = document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    ListReviewPMWorkOrderComponent.prototype.fieldChange = function (event) {
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 1) {
            var entityCategoryId = 3;
            var workTypeId = contextObj.inputItems.rowData["WorkTypeId"];
            var actionPointId = event.ddlRelationShipEvent.ChildFieldObject.FieldValue; //contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"];
        }
        contextObj.workOrderService.getActionPointUserLookupForOverride(0, parseInt(workTypeId), 9, entityCategoryId, actionPointId).subscribe(function (resultData) {
            var actionUser = contextObj.overrideFieldObject.find(function (item) {
                return item.FieldId === 1488;
            });
            if (resultData["FieldBinderData"] != "[]") {
                var sendTo = contextObj.overrideFieldObject.find(function (item) { return item.ReportFieldId === 12254; });
                sendTo.IsVisible = true;
                var lookUpArray = JSON.parse(resultData["FieldBinderData"]);
                actionUser.LookupDetails.LookupValues = lookUpArray;
                actionUser.IsVisible = true;
                actionUser.IsMandatory = true;
                actionUser.FieldLabel = "Next Action Point User(s)";
            }
            else {
                actionUser.IsVisible = false;
                actionUser.IsMandatory = false;
                actionUser.HasValidationError = false;
                contextObj.initiateValidation(actionUser);
                actionUser.LookupDetails.LookupValues = [];
                actionUser.MultiFieldValues = [];
            }
        });
    };
    ListReviewPMWorkOrderComponent.prototype.discard = function () {
        var contextObj = this;
        this.pageTitle = "Discard Work Orders";
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Request", 2);
            return;
        }
        contextObj.CompleteOrClose = 3;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Work Order", 2);
            return;
        }
        if (contextObj.inputItems.selectedIds.length > 1) {
            var preivousWorkTypeId;
            for (var _i = 0, _a = contextObj.inputItems.rowData; _i < _a.length; _i++) {
                var item = _a[_i];
                if (preivousWorkTypeId && preivousWorkTypeId != item["WorkTypeId"]) {
                    contextObj.notificationService.ShowToaster("Work Order(s) of different Work Types cannot be completed", 2);
                    return;
                }
                preivousWorkTypeId = item["WorkTypeId"];
            }
        }
        var reportFieldIds = [];
        if (contextObj.inputItems.selectedIds.length > 1) {
            for (var _b = 0, _c = contextObj.inputItems.rowData; _b < _c.length; _b++) {
                var item = _c[_b];
                reportFieldIds.push({
                    ReportFieldId: 1481,
                    Value: item["WorkOrderId"]
                });
            }
            reportFieldIds.push({
                ReportFieldId: 6561,
                Value: 3
            });
        }
        else {
            reportFieldIds.push({
                ReportFieldId: 1481,
                Value: contextObj.inputItems.rowData["WorkOrderId"]
            }, {
                ReportFieldId: 6561,
                Value: 3
            });
        }
        var workFlowInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: reportFieldIds };
        var reviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };
        contextObj.workOrderService.CheckMultipleCompleteorClose(JSON.stringify(reviewSubmitOutput), 3).subscribe(function (result) {
            if (result["Data"] == -2 || result["Data"] == -12 || result["Data"] == -11) {
                contextObj.notificationService.ShowToaster("Selected Work Order(s) cannot be discarded", 2);
            }
            else if (result["Data"] == -3) {
                contextObj.notificationService.ShowToaster("Selected Work Order(s) in On Hold status, cannot be discarded", 2);
            }
            else if (result["Data"] == -1) {
                contextObj.notificationService.ShowToaster("Some of the selected Work Order(s) cannot be discarded", 2);
            }
            else if (result["Data"] == 0) {
                contextObj.notificationService.ShowToaster("Selected Work Order(s) are already discarded", 2);
            }
            else if (result["Data"] == 1) {
                contextObj.btnName = "Save";
                contextObj.action = "Complete";
                contextObj.workOrderService.getCompleteOrCloseRequestFields().subscribe(function (resultData) {
                    contextObj.completeCloseFieldObject = contextObj.updateFieldDetailsForComplete(resultData["Data"]);
                    var TimeSpent = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521; });
                    var DateofCompletion = resultData["Data"].find(function (item) { return item.ReportFieldId === 1487; });
                    var SendTo = resultData["Data"].find(function (item) { return item.ReportFieldId === 12254; });
                    var Remarks = resultData["Data"].find(function (item) { return item.ReportFieldId === 1454; });
                    Remarks.IsMandatory = true;
                    TimeSpent.IsVisible = false;
                    DateofCompletion.IsVisible = false;
                    SendTo.IsVisible = false;
                    TimeSpent.FieldValue = "0.01";
                    contextObj.secondaryTarget = 1;
                    contextObj.splitviewInput.showSecondaryView = true;
                });
            }
        });
    };
    ListReviewPMWorkOrderComponent.prototype.override = function () {
        this.pageTitle = "Override Work Order";
        var contextObj = this;
        this.btnName = "Save";
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Work Order", 2);
            return;
        }
        if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            contextObj.workOrderService.getOverrideRequestFields().subscribe(function (resultData) {
                contextObj.overrideFieldObject = resultData["Data"];
                var overrideFieldObjectlookUp = contextObj.overrideFieldObject.find(function (item) { return item.ReportFieldId === 5828; });
                var WorkflowActionPointid = contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"];
                var WorkTypeId = contextObj.inputItems.rowData["WorkTypeId"];
                var WorkflowEntity = contextObj.inputItems.rowData["WorkFlowEntityId"];
                var sendTo = contextObj.overrideFieldObject.find(function (item) { return item.ReportFieldId === 12254; });
                sendTo.IsVisible = false;
                contextObj.workOrderService.loadNextActionPointDetails(WorkflowActionPointid, WorkTypeId, WorkflowEntity).subscribe(function (resultData) {
                    overrideFieldObjectlookUp.LookupDetails.LookupValues = JSON.parse(resultData["FieldBinderData"]);
                });
                var CurrActionPoint = contextObj.overrideFieldObject.find(function (item) { return item.ReportFieldId === 5830; });
                CurrActionPoint.FieldValue = contextObj.inputItems.rowData["Current Action Point"];
                CurrActionPoint.IsEnabled = false;
            });
            contextObj.secondaryTarget = 2;
            contextObj.splitviewInput.showSecondaryView = true;
        }
    };
    ListReviewPMWorkOrderComponent.prototype.overrideRequestSubmit = function (event) {
        var contextObj = this;
        var EntityCategoryId = 3;
        var CurrentWorkFlowActionPointId = contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"];
        var WorkflowEntityId = contextObj.inputItems.rowData["WorkFlowEntityId"];
        var submitDetails = JSON.parse(event.fieldobject);
        var actionPointId = submitDetails.find(function (item) {
            return item.ReportFieldId === 5828;
        });
        if (EntityCategoryId == 1) {
            var EntityId = contextObj.inputItems.rowData["WorkRequestId"];
        }
        else {
            var EntityId = contextObj.inputItems.rowData["WorkOrderId"];
        }
        var nextActionUserID = submitDetails.find(function (items) { return items.ReportFieldId === 12254; });
        var index = submitDetails.indexOf(nextActionUserID);
        if (index > -1) {
            submitDetails.splice(index, 1);
        }
        var reportfieldIdArray = [];
        var nextActionPointUsers = contextObj.overrideFieldObject.find(function (items) { return items.ReportFieldId === 12254; });
        if (nextActionPointUsers.MultiFieldValues != null) {
            for (var _i = 0, _a = nextActionPointUsers.MultiFieldValues; _i < _a.length; _i++) {
                var items = _a[_i];
                reportfieldIdArray.push({
                    ReportFieldId: 5864,
                    Value: items
                });
            }
        }
        var EntityIds;
        var WorkFlowEntityIds;
        var CurrentWorkFlowActionPointIds;
        var EntityCategoryIds;
        reportfieldIdArray.push({
            ReportFieldId: 5868,
            Value: EntityId
        });
        reportfieldIdArray.push({
            ReportFieldId: 5859,
            Value: WorkflowEntityId
        });
        reportfieldIdArray.push({
            ReportFieldId: 5863,
            Value: actionPointId.Value
        });
        reportfieldIdArray.push({
            ReportFieldId: 6561,
            Value: EntityCategoryId
        });
        var workFlowInput = { FormId: 375, WFEntityId: 0, WFReportFieldIdValues: reportfieldIdArray };
        var reviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };
        contextObj.workOrderService.overrideUpdateData(JSON.stringify(reviewSubmitOutput)).subscribe(function (result) {
            if (result.Message == "Success") {
                contextObj.notificationService.ShowToaster("Workflow of the selected Work Order has been overridden", 2);
                contextObj.checkAndLoadData();
            }
            else {
                contextObj.notificationService.ShowToaster("Failed", 2);
            }
        });
        contextObj.secondaryTarget = 2;
        contextObj.splitviewInput.showSecondaryView = false;
    };
    ListReviewPMWorkOrderComponent.prototype.reminder = function () {
        var contextObj = this;
        contextObj.pageTitle = "Reminder";
        contextObj.btnName = "Send";
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Work Order", 2);
            return;
        }
        if (contextObj.inputItems.selectedIds.length == 1) {
            contextObj.workOrderService.GetReminderData().subscribe(function (resultData) {
                contextObj.reminderObject = resultData.Data;
                var requestId;
                var entityCategoryId = 3;
                var workflowEntityId = contextObj.inputItems.rowData["WorkFlowEntityId"];
                if (Number(entityCategoryId) == 1)
                    requestId = contextObj.inputItems.rowData["WorkRequestId"];
                else if (Number(entityCategoryId) == 2 || Number(entityCategoryId) == 3)
                    requestId = contextObj.inputItems.rowData.WorkOrderId;
                contextObj.workOrderService.GetReminderDatas(entityCategoryId, workflowEntityId, requestId).subscribe(function (resultData) {
                    var pageDetails = JSON.parse(resultData.FieldBinderData);
                    var from = contextObj.reminderObject.find(function (item) {
                        return item.FieldId === 2070;
                    });
                    var to = contextObj.reminderObject.find(function (item) {
                        return item.FieldId === 2071;
                    });
                    var subject = contextObj.reminderObject.find(function (item) {
                        return item.FieldId === 2072;
                    });
                    var message = contextObj.reminderObject.find(function (item) {
                        return item.FieldId === 2073;
                    });
                    from.FieldValue = pageDetails[0].From;
                    to.FieldValue = pageDetails[0].ToEmail;
                    subject.FieldValue = pageDetails[0].Subject;
                    message.FieldValue = pageDetails[0].Message;
                    setTimeout(function () {
                        var el = document.getElementById("2071"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/
                        if (el != null && el != undefined) {
                            el.focus();
                            el.blur();
                        }
                    }, 20);
                    setTimeout(function () {
                        var el = document.getElementById("2072"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/
                        if (el != null && el != undefined) {
                            el.focus();
                            el.blur();
                        }
                    }, 20);
                    setTimeout(function () {
                        var el = document.getElementById("2073"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/
                        if (el != null && el != undefined) {
                            el.focus();
                            el.blur();
                        }
                    }, 20);
                    contextObj.secondaryTarget = 3;
                    contextObj.splitviewInput.showSecondaryView = true;
                });
            });
        }
        else {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
    };
    ListReviewPMWorkOrderComponent.prototype.onRemiderSubmit = function (event) {
        var contextObj = this;
        var entityCategoryId = 3;
        var workflowEntityId = contextObj.inputItems.rowData["WorkFlowEntityId"];
        var requestId = contextObj.inputItems.rowData.WorkOrderId;
        var pageDetails = JSON.parse(event.fieldobject);
        pageDetails.push({
            ReportFieldId: 6561,
            Value: entityCategoryId
        });
        pageDetails.push({
            ReportFieldId: 5859,
            Value: workflowEntityId
        });
        pageDetails.push({
            ReportFieldId: 1481,
            Value: requestId
        });
        var workFlowInput = { FormId: 385, WFEntityId: 0, WFReportFieldIdValues: pageDetails };
        var reviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };
        var EmailTo = contextObj.reminderObject.find(function (item) { return item.ReportFieldId === 6715; });
        var emailToArray = EmailTo.FieldValue.split(",");
        var checkvalidationEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailToArray.length > 0) {
            for (var _i = 0, emailToArray_1 = emailToArray; _i < emailToArray_1.length; _i++) {
                var item = emailToArray_1[_i];
                if (checkvalidationEmail.test(item) == false) {
                    contextObj.notificationService.ShowToaster("Enter a valid To Email", 2);
                    return;
                }
            }
        }
        contextObj.workOrderService.sendReminderDatas(reviewSubmitOutput).subscribe(function (resultData) {
            if (resultData.Message == "Success")
                contextObj.notificationService.ShowToaster("Reminder email sent", 2);
            else
                contextObj.notificationService.ShowToaster("Reminder email sent failed", 3);
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = false;
        });
    };
    ListReviewPMWorkOrderComponent.prototype.updateFieldDetailsForComplete = function (fieldDetailsArray) {
        var contextObj = this;
        fieldDetailsArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 1500:
                    item.IsVisible = true;
                    break;
                case 1454:
                    item.IsVisible = true;
                    break;
                case 12254:
                    item.IsVisible = true;
                    break;
                case 7521:
                    item.IsVisible = contextObj.isTimeSpentSubscribed;
                    item.IsMandatory = contextObj.isTimeSpentSubscribed;
                    break;
            }
        });
        return fieldDetailsArray;
    };
    ListReviewPMWorkOrderComponent.prototype.removeTimeOutActionFromLookUps = function (outcomeData) {
        var actionfield = this.fieldDetailsAdd1.find(function (item) {
            return item.ReportFieldId === 5834;
        });
        if (outcomeData != null && outcomeData.length != 0) {
            actionfield.LookupDetails.LookupValues = outcomeData.filter(function (item) {
                return item["OutcomeTypeId"] != 28;
            });
        }
    };
    ListReviewPMWorkOrderComponent.prototype.onKeyWordSearch = function (event) {
        this.filter = event.value;
        this.isKeyWordSearch = 1;
        this.isAdvanceSearch = 0;
        this.pageIndex = 0;
        this.getKeywordSearchdata();
    };
    ListReviewPMWorkOrderComponent.prototype.getKeywordSearchdata = function () {
        var contextObj = this;
        contextObj.workOrderService.getWorkOrderKeyWordListData(1, contextObj.getReportFieldIdValuesForSearch(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0 || resultData["Data"]["FieldBinderData"] == "[]") {
                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                contextObj.itemsSource = [];
                contextObj.enableMenu = [];
            }
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8];
            }
        });
    };
    ListReviewPMWorkOrderComponent.prototype.loadadvanceSearch = function () {
        var contextObj = this;
        this.workOrderService.getPmWorkorderAdvnceSearchLookup(contextObj.getReportFieldIdValuesForSearch()).subscribe(function (resultData) {
            contextObj.advancelookup = contextObj.isActive ? resultData["Data"]["FieldBinderList"] : contextObj.updateAdvanceSearchFields(resultData["Data"]["FieldBinderList"]);
        });
    };
    ListReviewPMWorkOrderComponent.prototype.updateAdvanceSearchFields = function (advanceSearchFields) {
        for (var _i = 0, advanceSearchFields_1 = advanceSearchFields; _i < advanceSearchFields_1.length; _i++) {
            var item = advanceSearchFields_1[_i];
            switch (item.ReportFieldId) {
                case 5809:
                case 5800:
                    item.IsVisible = false;
                    break;
                default:
                    break;
            }
        }
        return advanceSearchFields;
    };
    ListReviewPMWorkOrderComponent.prototype.onAdvanceSearch = function (event) {
        this.advanceValue = event.fieldobject;
        this.isAdvanceSearch = 1;
        this.isKeyWordSearch = 0;
        this.pageIndex = 0;
        this.getAdvancedSearchdata();
    };
    ListReviewPMWorkOrderComponent.prototype.getAdvancedSearchdata = function () {
        var contextObj = this;
        contextObj.workOrderService.getWorkOrderAdvanceSearchListData(1, contextObj.getReportFieldIdValuesForSearch(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.advanceValue).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                contextObj.itemsSource = [];
                contextObj.enableMenu = [];
            }
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8];
            }
        });
    };
    ListReviewPMWorkOrderComponent.prototype.getReportFieldIdValuesForSearch = function () {
        var contextObj = this;
        var tempArray = [];
        tempArray.push({
            ReportFieldId: 1111,
            Value: 0
        }, {
            ReportFieldId: 1490,
            Value: contextObj.isActive ? 0 : 3
        }, {
            ReportFieldId: 1442,
            Value: contextObj.dateToPerform
        });
        return JSON.stringify(tempArray);
    };
    ListReviewPMWorkOrderComponent.prototype.updateFieldDetails = function (fieldDetailsArray) {
        if (!fieldDetailsArray)
            return;
        var contextObj = this;
        fieldDetailsArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 1439:
                    item.ReadOnlyMode = true;
                    break;
                case 5873:
                    item.FieldValue = contextObj.inputItems.rowData["Work Type"];
                    item.ReadOnlyMode = true;
                    break;
                case 7521:
                    item.IsVisible = contextObj.isTimeSpentSubscribed;
                    item.IsMandatory = contextObj.isTimeSpentSubscribed;
                    item.Width = "220";
                    item.FieldValue = "0.01";
                    break;
                case 12254:
                    item.IsEnabled = false;
                    break;
                case 1478:
                    item.IsEnabled = false;
                    var replaceString = "** ";
                    item.FieldValue = item.FieldValue.replace(new RegExp(replaceString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), "\n");
                    break;
                case 5978:
                    item.IsMandatory = true;
                    break;
                case 6562:
                    item.IsVisible = true;
                    item.FieldValue = contextObj.inputItems.rowData["StatusId"] == 22 ? "1" : "0";
                    break;
                case 5834:
                    item.Width = "220";
                    break;
                case 6202:
                    item.IsVisible = contextObj.inputItems.rowData["StatusId"] == 22;
                    item.FieldValue = (contextObj.inputItems.rowData["CurrentOnHoldReasonId"] == null || contextObj.inputItems.rowData["StatusId"] != 22) ? "-1" : contextObj.inputItems.rowData["CurrentOnHoldReasonId"];
                    item.IsEnabled = false;
                    break;
                case 6201:
                    item.IsVisible = contextObj.inputItems.rowData["StatusId"] == 22;
                    item.ReadOnlyMode = true;
                    item.FieldValue = (contextObj.inputItems.rowData["CurrentOnHoldStartTime"] == null || contextObj.inputItems.rowData["StatusId"] != 22) ? "" : contextObj.inputItems.rowData["CurrentOnHoldStartTime"];
                    break;
                case 6203:
                    item.IsVisible = false;
                    break;
                case 1442:
                    item.ReadOnlyMode = true;
                    break;
                case 648:
                    item.ReadOnlyMode = true;
                    break;
                case 660:
                    item.ReadOnlyMode = true;
                    break;
                case 5564:
                    item.ReadOnlyMode = true;
                    break;
                case 1334:
                    item.ReadOnlyMode = true;
                    break;
                case 489:
                    item.ReadOnlyMode = true;
                    break;
                case 473:
                    item.ReadOnlyMode = true;
                    break;
                case 9548:
                    item.ReadOnlyMode = true;
                    break;
                case 290:
                    item.ReadOnlyMode = true;
                    break;
            }
        });
        return fieldDetailsArray;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListReviewPMWorkOrderComponent.prototype, "onReviewClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListReviewPMWorkOrderComponent.prototype, "itemSourceUpdate", void 0);
    ListReviewPMWorkOrderComponent = __decorate([
        core_1.Component({
            selector: 'reviewPM-list',
            templateUrl: './app/Views/WorkOrder/Review/reviewPmWorkorder-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, search_component_1.searchBox],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, validation_service_1.ValidateService],
            inputs: ['itemsSource', 'userDetails', 'inputItems', 'totalItems', 'itemsPerPage', 'isActive', 'isTimeSpentSubscribed', 'dateToPerform', 'shouldReload'],
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService])
    ], ListReviewPMWorkOrderComponent);
    return ListReviewPMWorkOrderComponent;
}());
exports.ListReviewPMWorkOrderComponent = ListReviewPMWorkOrderComponent;
//# sourceMappingURL=reviewPmWorkorder-list.component.js.map
import {Component, EventEmitter, OnInit, AfterViewInit, Output, SimpleChange, OnChanges} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { searchBox } from '../../../framework/whatever/search/search.component';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';


@Component({
    selector: 'reviewPM-list',
    templateUrl: './app/Views/WorkOrder/Review/reviewPmWorkorder-list.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, SlideComponent, TabsComponent, TabComponent, searchBox],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, ValidateService],
    inputs: ['itemsSource', 'userDetails', 'inputItems', 'totalItems', 'itemsPerPage', 'isActive', 'isTimeSpentSubscribed', 'dateToPerform', 'shouldReload'],
})

export class ListReviewPMWorkOrderComponent implements OnInit {

    @Output() onReviewClick = new EventEmitter();
    @Output() itemSourceUpdate = new EventEmitter();
    fieldObject: IField[];
    workrequestId: number;
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    userDetails: any;
    inputItems: IGrid;
    totalItems: number;
    itemsPerPage: number;
    isActive: boolean;
    pageIndex: number = 0;
    secondaryTarget: number = 0;
    dateToPerform: string = '';
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 20 };
    action: string;
    btnName: string;
    workFlowEntityIds: any;
    isTimeSpentSubscribed: boolean;
    completeCloseFieldObject: IField[];
    reminderObject: IField[];
    overrideFieldObject: IField[];
    keyWordLookup: any[];
    advanceValue = "[]";
    keywordFieldObject: IField[];
    advancelookup: any[];
    filter: string = "";
    isKeyWordSearch: number = 0;
    isAdvanceSearch: number = 0;
    disable: boolean = true;
    outComeId: number = 0;
    CompleteOrClose: number;
    pageTitle: string;
    shouldReload: boolean = false;
    selectActionInline = "horizontal";
    enableMenu = [];
    menuData = [
        {
            "id": 1,
            "title": "Review",
            "image": "Review",
            "path": "Review",
            "subMenu": null,
            "privilegeId": null//9514
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
                    "privilegeId": 9515      // Bug 81947
                },
                {
                    "id": 8,
                    "title": "Reminder",
                    "image": "Reminder",
                    "path": "Reminder",
                    "subMenu": null,
                    "privilegeId": 9516     // Bug 81947
                },
                //{
                //    "id": 9,
                //    "title": "Edit Rule",
                //    "image": "Edit Rule",
                //    "path": "Edit Rule",
                //    "subMenu": null,
                //    "privilegeId": 9518
                //},


            ]
        }

    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;

    constructor(private workOrderService: WorkOrdereService, private AdministrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions, private _validateService: ValidateService) { }

    ngOnInit() {
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
                contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return fieldIdToBeRemoved.indexOf(item.FieldId) == -1 });
            }
            contextObj.dataLoad(1);
            contextObj.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8];
        });

        contextObj.workOrderService.getPmWorkorderKeywordField(contextObj.getReportFieldIdValuesForSearch()).subscribe(function (resultData) {
            contextObj.keywordFieldObject = resultData["FieldBinderList"];
        });
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["shouldReload"] && typeof (changes["shouldReload"]["previousValue"]) == 'boolean' && changes["shouldReload"]["currentValue"] != changes["shouldReload"]["previousValue"]) {
            this.loadData(0);
        }
    }

    public dataLoad(target?: number) {
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
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.loadData(0);
    };

    public onSort(objGrid: any) {
        this.loadData(0);
    }

    public loadData(target: number) {
        if (this.isKeyWordSearch == 0 && this.isAdvanceSearch == 0)
            this.dataLoad(target);
        else if (this.isKeyWordSearch == 1 && this.isAdvanceSearch == 0)
            this.getKeywordSearchdata();
        else if (this.isKeyWordSearch == 0 && this.isAdvanceSearch == 1)
            this.getAdvancedSearchdata();
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.reviewClick();
                break;
            case 4:     //complete
                this.onCompleteClick();
                break;
            case 5:     //close
                this.onClose();
                break;
            case 6:     //Discard
                this.discard();
                break;
            case 7:     //over-ride
                this.override();
                break;

            case 8:     //reminder
                this.reminder();
                break;

        }
    }

    public reviewClick() {
        var contextObj = this;
        this.action = "review";
        this.btnName = "Save Changes";

        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Work Order", 2);
        } else if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            contextObj.workOrderService.loadReviewServiceRequest(contextObj.inputItems.rowData.WorkOrderId, "review", contextObj.inputItems.rowData["WorkTypeId"],
                contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"], 3, contextObj.inputItems.rowData["WorkFlowEntityId"], contextObj.inputItems.rowData["EquipmentCategoryId"]).subscribe(function (resultData) {

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
    }

    public onClose() {


        var contextObj = this;
        contextObj.CompleteOrClose = 2;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Work Order", 2);
            return;
        }
        if (contextObj.inputItems.selectedIds.length > 1) {
            var preivousWorkTypeId;
            for (var item of contextObj.inputItems.rowData) {
                if (preivousWorkTypeId && preivousWorkTypeId != item["WorkTypeId"]) {
                    contextObj.notificationService.ShowToaster("Work Order(s) of different Work Types cannot be closed", 2);
                    return;
                }
                preivousWorkTypeId = item["WorkTypeId"];
            }
        }

        var reportFieldIds: ReportFieldIdValues[] = [];
        if (contextObj.inputItems.selectedIds.length > 1) {
            for (var item of contextObj.inputItems.rowData) {
                reportFieldIds.push(
                    {
                        ReportFieldId: 1481,
                        Value: item["WorkOrderId"]
                    }
                )
            }
            reportFieldIds.push({
                ReportFieldId: 6561,
                Value: 2
            });
        } else {
            reportFieldIds.push(
                {
                    ReportFieldId: 1481,
                    Value: contextObj.inputItems.rowData["WorkOrderId"]
                },
                {
                    ReportFieldId: 6561,
                    Value: 3
                }
            )
        }

        var workFlowInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: reportFieldIds };
        var reviewSubmitOutput: ReviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };

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
                    var SendTo = resultData["Data"].find(function (item) { return item.ReportFieldId === 12254 });
                    SendTo.IsVisible = false;
                    if (contextObj.isTimeSpentSubscribed == false) {

                        if (contextObj.inputItems.selectedIds.length == 1) {
                            var TimeSpent: IField = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521 })
                            TimeSpent.IsVisible = false;
                            TimeSpent.FieldValue = "0.01";
                        }
                        else if (contextObj.inputItems.selectedIds.length > 1) {
                            for (var item of contextObj.inputItems.rowData) {
                                var TimeSpent: IField = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521 })
                                TimeSpent.IsVisible = false;
                                TimeSpent.FieldValue = "0.01";
                                break;
                            }
                        }

                    }
                    if (contextObj.isTimeSpentSubscribed == true) {

                        var TimeSpent: IField = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521 })
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


    }

    public onCompleteOrCloseSubmit(event) {

        var contextObj = this;

        var reportFieldIds = JSON.parse(event.fieldobject);

        var actionPoint = reportFieldIds.find(function (items) { return items.ReportFieldId === 12254 });

        var index = reportFieldIds.indexOf(actionPoint);

        if (index > -1) {
            reportFieldIds.splice(index, 1);
        }

        if (contextObj.CompleteOrClose == 3) {

            var DateOfCompletionRemove = reportFieldIds.find(function (items) { return items.ReportFieldId === 1487 });
            var index = reportFieldIds.indexOf(DateOfCompletionRemove);
            if (index > -1) {
                reportFieldIds.splice(index, 1);
            }
        }
        if (contextObj.CompleteOrClose == 1) {

            var DateRemove = reportFieldIds.find(function (items) { return items.ReportFieldId === 1481 });
            var index = reportFieldIds.indexOf(DateRemove);
            if (index > -1) {
                reportFieldIds.splice(index, 1);
            }
        }

        var actionPointField: IField = contextObj.completeCloseFieldObject.find(function (item) {
            return item.ReportFieldId === 12254;
        });
        if (actionPointField.MultiFieldValues != null) {

            for (var items of actionPointField.MultiFieldValues) {
                reportFieldIds.push({
                    ReportFieldId: 12254,
                    Value: items
                });
            }
        }

        if (contextObj.inputItems.selectedIds.length > 1) {

            for (var item of contextObj.inputItems.rowData) {
                reportFieldIds.push(
                    {
                        ReportFieldId: 1481,
                        Value: item["WorkOrderId"]
                    },
                    {
                        ReportFieldId: 5859,
                        Value: item["WorkFlowEntityId"]
                    }

                )
            }
            reportFieldIds.push({
                ReportFieldId: 6561,
                Value: 3
            });

        } else {

            reportFieldIds.push(
                {
                    ReportFieldId: 1481,
                    Value: contextObj.inputItems.rowData["WorkOrderId"]
                },
                {
                    ReportFieldId: 5859,
                    Value: contextObj.inputItems.rowData["WorkFlowEntityId"]
                },
                {
                    ReportFieldId: 6561,
                    Value: 3
                }
            )
        }

        var workFlowInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: reportFieldIds };
        var reviewSubmitOutput: ReviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };

        if (contextObj.CompleteOrClose == 1) {

            var itemDate;
            var WorkflowEntityCategoryId = 3;
            var DateofCompletion: IField = contextObj.completeCloseFieldObject.find(function (item) { return item.ReportFieldId === 1487 });
            var dateofCompletionValue = new Date(new Date(DateofCompletion.FieldValue).toDateString());
            var TimeSpent: IField = contextObj.completeCloseFieldObject.find(function (item) { return item.ReportFieldId === 7521 });
            if (TimeSpent && TimeSpent.FieldValue == "0") {
                contextObj.notificationService.ShowToaster("Time Spent (Hours) must be greater than zero", 2);
                return;
            }
            if (contextObj.inputItems.selectedIds.length > 1) {

                if (WorkflowEntityCategoryId == 3)
                    for (var item of contextObj.inputItems.rowData) {
                        itemDate = new Date(item["Work Order Date"]);
                        if (dateofCompletionValue < itemDate) {
                            contextObj.notificationService.ShowToaster("Date of Completion should be greater than Work Order Date", 2);
                            return;
                        }

                    }

            } else if (contextObj.inputItems.selectedIds.length == 1) {
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
            var DateofCompletion: IField = contextObj.completeCloseFieldObject.find(function (item) { return item.ReportFieldId === 1487 });
            var dateofCompletionValue = new Date(new Date(DateofCompletion.FieldValue).toDateString());
            var TimeSpent: IField = contextObj.completeCloseFieldObject.find(function (item) { return item.ReportFieldId === 7521 });
            if (TimeSpent && TimeSpent.FieldValue == "0") {
                contextObj.notificationService.ShowToaster("Time Spent (Hours) must be greater than zero", 2);
                return;
            }
            if (contextObj.inputItems.selectedIds.length > 1) {

                if (WorkflowEntityCategoryId == 3)
                    for (var item of contextObj.inputItems.rowData) {
                        itemDate = new Date(item["Work Order Date"]);
                        if (dateofCompletionValue < itemDate) {
                            contextObj.notificationService.ShowToaster("Date of Completion should be greater than Work Order Date", 2);
                            return;
                        }

                    }

            } else if (contextObj.inputItems.selectedIds.length == 1) {
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


    }
    public checkAndLoadData() {
        if (this.isKeyWordSearch == 0 && this.isAdvanceSearch == 0)
            this.dataLoad(0);
        else if (this.isKeyWordSearch == 1 && this.isAdvanceSearch == 0)
            this.getKeywordSearchdata();
        else if (this.isKeyWordSearch == 0 && this.isAdvanceSearch == 1)
            this.getAdvancedSearchdata();
    }

    public onCompleteClick() {


        var contextObj = this;
        contextObj.CompleteOrClose = 1;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Work Order", 2);
            return;
        }
        if (contextObj.inputItems.selectedIds.length > 1) {

            var preivousWorkTypeId;
            for (var item of contextObj.inputItems.rowData) {
                if (preivousWorkTypeId && preivousWorkTypeId != item["WorkTypeId"]) {
                    contextObj.notificationService.ShowToaster("Work Order(s) of different Work Types cannot be completed", 2);
                    return;
                }
                preivousWorkTypeId = item["WorkTypeId"];
            }
        }

        var reportFieldIds: ReportFieldIdValues[] = [];
        if (contextObj.inputItems.selectedIds.length > 1) {

            for (var item of contextObj.inputItems.rowData) {
                reportFieldIds.push(
                    {
                        ReportFieldId: 1481,
                        Value: item["WorkOrderId"]
                    }
                )
            }
            reportFieldIds.push({
                ReportFieldId: 6561,
                Value: 3
            });
        } else {

            reportFieldIds.push(
                {
                    ReportFieldId: 1481,
                    Value: contextObj.inputItems.rowData["WorkOrderId"]
                },
                {
                    ReportFieldId: 6561,
                    Value: 3
                }
            )
        }

        var workFlowInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: reportFieldIds };
        var reviewSubmitOutput: ReviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };

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
                        var TimeSpent: IField = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521 })
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

                        var actionUser: IField = contextObj.completeCloseFieldObject.find(function (item) {
                            return item.FieldId === 1562
                        });
                        if (resultData["FieldBinderData"] != "[]") {

                            var lookUpArray = JSON.parse(resultData["FieldBinderData"]);
                            actionUser.LookupDetails.LookupValues = lookUpArray;
                            actionUser.IsVisible = true;
                            actionUser.IsMandatory = true;
                            actionUser.FieldLabel = "Next Action Point User(s)";
                        } else {
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


    }

    public initiateValidation(fieldObject: IField) {
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    }

    public fieldChange(event) {

        var contextObj = this;

        if (contextObj.inputItems.selectedIds.length == 1) {
            var entityCategoryId = 3;
            var workTypeId = contextObj.inputItems.rowData["WorkTypeId"];
            var actionPointId = event.ddlRelationShipEvent.ChildFieldObject.FieldValue//contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"];
        }


        contextObj.workOrderService.getActionPointUserLookupForOverride(0, parseInt(workTypeId), 9, entityCategoryId, actionPointId).subscribe(function (resultData) {

            var actionUser: IField = contextObj.overrideFieldObject.find(function (item) {

                return item.FieldId === 1488
            });

            if (resultData["FieldBinderData"] != "[]") {
                var sendTo = contextObj.overrideFieldObject.find(function (item) { return item.ReportFieldId === 12254 });
                sendTo.IsVisible = true;
                var lookUpArray = JSON.parse(resultData["FieldBinderData"]);
                actionUser.LookupDetails.LookupValues = lookUpArray;
                actionUser.IsVisible = true;
                actionUser.IsMandatory = true;
                actionUser.FieldLabel = "Next Action Point User(s)";
            } else {
                actionUser.IsVisible = false;
                actionUser.IsMandatory = false;
                actionUser.HasValidationError = false;
                contextObj.initiateValidation(actionUser);
                actionUser.LookupDetails.LookupValues = [];
                actionUser.MultiFieldValues = [];
            }
        });
    }

    public discard() {
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
            for (var item of contextObj.inputItems.rowData) {
                if (preivousWorkTypeId && preivousWorkTypeId != item["WorkTypeId"]) {
                    contextObj.notificationService.ShowToaster("Work Order(s) of different Work Types cannot be completed", 2);
                    return;
                }
                preivousWorkTypeId = item["WorkTypeId"];
            }
        }

        var reportFieldIds: ReportFieldIdValues[] = [];
        if (contextObj.inputItems.selectedIds.length > 1) {

            for (var item of contextObj.inputItems.rowData) {
                reportFieldIds.push(
                    {
                        ReportFieldId: 1481,
                        Value: item["WorkOrderId"]
                    }
                )
            }
            reportFieldIds.push({
                ReportFieldId: 6561,
                Value: 3
            });
        } else {

            reportFieldIds.push(
                {
                    ReportFieldId: 1481,
                    Value: contextObj.inputItems.rowData["WorkOrderId"]
                },
                {
                    ReportFieldId: 6561,
                    Value: 3
                }
            )
        }

        var workFlowInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: reportFieldIds };
        var reviewSubmitOutput: ReviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };

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

                    var TimeSpent: IField = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521 });
                    var DateofCompletion: IField = resultData["Data"].find(function (item) { return item.ReportFieldId === 1487 });
                    var SendTo = resultData["Data"].find(function (item) { return item.ReportFieldId === 12254 });
                    var Remarks = resultData["Data"].find(function (item) { return item.ReportFieldId === 1454 });
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
    }
    public override() {

        this.pageTitle = "Override Work Order";
        var contextObj = this;
        this.btnName = "Save";
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Work Order", 2);
            return;
        }
        if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            contextObj.workOrderService.getOverrideRequestFields().subscribe(function (resultData) {

                contextObj.overrideFieldObject = resultData["Data"];

                var overrideFieldObjectlookUp = contextObj.overrideFieldObject.find(function (item) { return item.ReportFieldId === 5828 })

                var WorkflowActionPointid = contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"];
                var WorkTypeId = contextObj.inputItems.rowData["WorkTypeId"];
                var WorkflowEntity = contextObj.inputItems.rowData["WorkFlowEntityId"];

                var sendTo = contextObj.overrideFieldObject.find(function (item) { return item.ReportFieldId === 12254 });
                sendTo.IsVisible = false;
                contextObj.workOrderService.loadNextActionPointDetails(WorkflowActionPointid, WorkTypeId, WorkflowEntity).subscribe(function (resultData) {


                    overrideFieldObjectlookUp.LookupDetails.LookupValues = JSON.parse(resultData["FieldBinderData"]);


                });
                var CurrActionPoint = contextObj.overrideFieldObject.find(function (item) { return item.ReportFieldId === 5830 });

                CurrActionPoint.FieldValue = contextObj.inputItems.rowData["Current Action Point"];
                CurrActionPoint.IsEnabled = false;


            });



            contextObj.secondaryTarget = 2;
            contextObj.splitviewInput.showSecondaryView = true;
        }
    }
    public overrideRequestSubmit(event) {
        var contextObj = this;
        var EntityCategoryId = 3;
        var CurrentWorkFlowActionPointId = contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"];
        var WorkflowEntityId = contextObj.inputItems.rowData["WorkFlowEntityId"]
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


        var nextActionUserID = submitDetails.find(function (items) { return items.ReportFieldId === 12254 });
        var index = submitDetails.indexOf(nextActionUserID);
        if (index > -1) {
            submitDetails.splice(index, 1);
        }
        var reportfieldIdArray: ReportFieldIdValues[] = [];
        var nextActionPointUsers = contextObj.overrideFieldObject.find(function (items) { return items.ReportFieldId === 12254 });
        if (nextActionPointUsers.MultiFieldValues != null) {
            for (var items of nextActionPointUsers.MultiFieldValues) {
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


        var workFlowInput: WorkFlowEntityInput = { FormId: 375, WFEntityId: 0, WFReportFieldIdValues: reportfieldIdArray };
        var reviewSubmitOutput: ReviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };
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
    }
    public reminder() {

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
                        return item.FieldId === 2070
                    });
                    var to = contextObj.reminderObject.find(function (item) {
                        return item.FieldId === 2071
                    });
                    var subject = contextObj.reminderObject.find(function (item) {
                        return item.FieldId === 2072
                    });
                    var message = contextObj.reminderObject.find(function (item) {
                        return item.FieldId === 2073
                    });

                    from.FieldValue = pageDetails[0].From;
                    to.FieldValue = pageDetails[0].ToEmail;
                    subject.FieldValue = pageDetails[0].Subject;
                    message.FieldValue = pageDetails[0].Message;

                    setTimeout(function () {
                        var el = <HTMLElement>document.getElementById("2071"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/

                        if (el != null && el != undefined) {
                            el.focus();
                            el.blur();
                        }
                    }, 20);
                    setTimeout(function () {
                        var el = <HTMLElement>document.getElementById("2072"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/

                        if (el != null && el != undefined) {
                            el.focus();
                            el.blur();
                        }
                    }, 20);
                    setTimeout(function () {
                        var el = <HTMLElement>document.getElementById("2073"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/

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


    }
    onRemiderSubmit(event: any) {

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

        var workFlowInput: WorkFlowEntityInput = { FormId: 385, WFEntityId: 0, WFReportFieldIdValues: pageDetails };
        var reviewSubmitOutput: ReviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };
        var EmailTo = contextObj.reminderObject.find(function (item) { return item.ReportFieldId === 6715 });

        var emailToArray = [] = EmailTo.FieldValue.split(",");
        var checkvalidationEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailToArray.length > 0) {

            for (var item of emailToArray)
                if (checkvalidationEmail.test(item) == false) {
                    contextObj.notificationService.ShowToaster("Enter a valid To Email", 2);
                    return;
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
    }

    updateFieldDetailsForComplete(fieldDetailsArray) {
        var contextObj = this;
        fieldDetailsArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 1500:  //Date of Completion
                    item.IsVisible = true;
                    break;
                case 1454:  //Remarks
                    item.IsVisible = true;
                    break;
                case 12254:  //Send to
                    item.IsVisible = true;
                    break;
                case 7521:  //Time Spent (Hours)
                    item.IsVisible = contextObj.isTimeSpentSubscribed;
                    item.IsMandatory = contextObj.isTimeSpentSubscribed;
                    break;
            }
        });

        return fieldDetailsArray;
    }

    public removeTimeOutActionFromLookUps(outcomeData: any[]) {
        var actionfield = this.fieldDetailsAdd1.find(function (item) {
            return item.ReportFieldId === 5834;
        });
        if (outcomeData != null && outcomeData.length != 0) {
            actionfield.LookupDetails.LookupValues = outcomeData.filter(function (item) {
                return item["OutcomeTypeId"] != 28;
            });
        }
    }

    public onKeyWordSearch(event) {
        this.filter = event.value;
        this.isKeyWordSearch = 1;
        this.isAdvanceSearch = 0;
        this.pageIndex = 0;
        this.getKeywordSearchdata();
    }

    public getKeywordSearchdata() {
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
    }

    public loadadvanceSearch() {
        var contextObj = this;
        this.workOrderService.getPmWorkorderAdvnceSearchLookup(contextObj.getReportFieldIdValuesForSearch()).subscribe(function (resultData) {
            contextObj.advancelookup = contextObj.isActive ? resultData["Data"]["FieldBinderList"] : contextObj.updateAdvanceSearchFields(resultData["Data"]["FieldBinderList"]);
        });
    }

    public updateAdvanceSearchFields(advanceSearchFields: IField[]) {
        for (var item of advanceSearchFields) {
            switch (item.ReportFieldId) {
                case 5809:
                case 5800:
                    item.IsVisible = false;
                    break;
                default:
                    break
            }
        }
        return advanceSearchFields;
    }

    public onAdvanceSearch(event) {
        this.advanceValue = event.fieldobject;
        this.isAdvanceSearch = 1;
        this.isKeyWordSearch = 0;
        this.pageIndex = 0;
        this.getAdvancedSearchdata();
    }

    public getAdvancedSearchdata() {
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
    }

    public getReportFieldIdValuesForSearch() {
        var contextObj = this
        var tempArray: ReportFieldIdValues[] = [];
        tempArray.push(
            {
                ReportFieldId: 1111,
                Value: 0
            },
            {
                ReportFieldId: 1490, /*Status*/
                Value: contextObj.isActive ? 0 : 3
            },
            {
                ReportFieldId: 1442,
                Value: contextObj.dateToPerform
            }
        );
        return JSON.stringify(tempArray);
    }

    public updateFieldDetails(fieldDetailsArray) {
        if (!fieldDetailsArray) return;
        var contextObj = this;
        fieldDetailsArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 1439:      //Work Order No.
                    item.ReadOnlyMode = true;
                    break;
                case 5873:		//WorkType
                    item.FieldValue = contextObj.inputItems.rowData["Work Type"];
                    item.ReadOnlyMode = true;
                    break;
                case 7521:  //Time Spent (Hours)
                    item.IsVisible = contextObj.isTimeSpentSubscribed;
                    item.IsMandatory = contextObj.isTimeSpentSubscribed;
                    item.Width = "220";
                    item.FieldValue = "0.01";
                    break;
                case 12254:		//Send to
                    item.IsEnabled = false;
                    break;
                case 1478:		//Previous Review Comments
                    item.IsEnabled = false;
                    var replaceString = "** ";
                    item.FieldValue = item.FieldValue.replace(new RegExp(replaceString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), "\n");
                    break;
                case 5978:  //Review Comments
                    item.IsMandatory = true;
                    break;
                case 6562:  //Hold Details
                    item.IsVisible = true;
                    item.FieldValue = contextObj.inputItems.rowData["StatusId"] == 22 ? "1" : "0";
                    break;
                case 5834: //Action Point
                    item.Width = "220";
                    break
                case 6202:  //Hold Reason
                    item.IsVisible = contextObj.inputItems.rowData["StatusId"] == 22;
                    item.FieldValue = (contextObj.inputItems.rowData["CurrentOnHoldReasonId"] == null || contextObj.inputItems.rowData["StatusId"] != 22) ? "-1" : contextObj.inputItems.rowData["CurrentOnHoldReasonId"];
                    item.IsEnabled = false;
                    break;
                case 6201:  //Hold time
                    item.IsVisible = contextObj.inputItems.rowData["StatusId"] == 22;
                    item.ReadOnlyMode = true;
                    item.FieldValue = (contextObj.inputItems.rowData["CurrentOnHoldStartTime"] == null || contextObj.inputItems.rowData["StatusId"] != 22) ? "" : contextObj.inputItems.rowData["CurrentOnHoldStartTime"];
                    break;
                case 6203:  //Date of Completion
                    item.IsVisible = false;
                    break;
                case 1442:  //Scheduled Date
                    item.ReadOnlyMode = true;
                    break;
                case 648:	//Equipment Class
                    item.ReadOnlyMode = true;
                    break;
                case 660:	//Equipment No.
                    item.ReadOnlyMode = true;
                    break;
                case 5564:	//PM
                    item.ReadOnlyMode = true;
                    break;
                case 1334:	//Procedure
                    item.ReadOnlyMode = true;
                    break;
                case 489:   //Site
                    item.ReadOnlyMode = true;
                    break;
                case 473:  //Building
                    item.ReadOnlyMode = true;
                    break;
                case 9548:  //Floor
                    item.ReadOnlyMode = true;
                    break;
                case 290:  //Ogr L1
                    item.ReadOnlyMode = true;
                    break;
            }
        });

        return fieldDetailsArray;
    }



}

interface ReportFieldIdValues {
    ReportFieldId: number,
    Value: any
}
interface ReviewSubmitOutput {
    WFEntityInput: WorkFlowEntityInput;
    WFEntityDocumentInput: DocumentInput;
    //WFEntityEquipmentInput: EquipmentInput;
    ParentFormId: number;
}
interface WorkFlowEntityInput {
    FormId: number;
    WFEntityId: number;
    WFReportFieldIdValues: any;
}

interface DocumentInput {
    FormId: number;
    WFEntityId: number;
    ListDocumentReportFieldIdValues: DocumentDataInput[];
}

interface DocumentDataInput {
    DocumentId: number;
    WFReportFieldIdValues: any;
    FileDataInput: any;
}


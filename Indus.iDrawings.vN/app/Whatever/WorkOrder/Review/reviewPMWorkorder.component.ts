import { Component, Output, EventEmitter, Input, AfterViewInit, ViewEncapsulation, ElementRef, ViewChild, Renderer  } from '@angular/core';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { IField, ILookupValues } from '../../../Framework/Models//Interface/IField'
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { NgForm, FormGroup} from '@angular/forms';

import { StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { TextAreaComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/textareacomponent.component';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CustomRadioComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component';
import { DateComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { DateTimeComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/datetimecomponent.component';
import { LabelComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/labelcomponent.component';
import { ButtonComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/buttoncomponent.component';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'review-PMWorkOrders',
    templateUrl: 'app/Views/WorkOrder/Review/reviewPMWorkorder.component.html',
    providers: [WorkOrdereService, GeneralFunctions, NotificationService, ValidateService],
    directives: [FieldComponent, Notification, SplitViewComponent, StringTextBoxComponent, TextAreaComponent, DropDownListComponent, CustomCheckBoxComponent, ListBoxComponent, DateComponent, DateTimeComponent, LabelComponent, ButtonComponent],
    inputs: ['inputItems', 'action', 'fieldDetailsAdd', 'btnName', 'linkArray', 'userDetails', 'entityCategoryId', 'outComeData', 'statusId', 'isInProgressSubscribed'],
    encapsulation: ViewEncapsulation.None
})

export class ReviewPMWorkorderComponent implements AfterViewInit {
    dataKey: string = "WorkOrderId";
    inputItems: IGrid;
    holdReasonAddFields: IField;
    linkArray: any;
    userDetails: any;
    workFlowActionPointId: number = 0;
    outComeId: number = 0;
    outComeData: any[];
    outcomeTypeId: number = 0;
    isOnHold: boolean = false;
    statusId: number;
    entityCategoryId: number;
    isInProgressSubscribed: boolean;
    secondaryTarget: number;
    action: string;
    btnName: string = "Save";
    pageTitle: string = "New Reason";
    fieldDetailsAdd: IField[];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 20 };
    @Output() linkClick = new EventEmitter();
    @Output() submitClick = new EventEmitter();
    fieldDetailsAddAdditionalDataFld: any[];
    showDateTimeOnLoad: boolean = true;
    public reportFieldArray: any;
    horizontal = "horizontal";
    selectActionInline = "horizontal";
    @ViewChild('input') input: ElementRef;

    constructor(private workOrderService: WorkOrdereService, private notificationService: NotificationService, private _validateService: ValidateService, private generFun: GeneralFunctions, private el: ElementRef, private _renderer: Renderer) { }

    ngOnInit() {
        debugger
        if (window["IsMobile"] == true) {
            this.selectActionInline = "vertical";
        }
    }

    ngAfterViewInit() {

        if (this.fieldDetailsAdd) {
            var onHoldField: IField = this.fieldDetailsAdd.find(function (item) {
                return item.ReportFieldId === 6562;
            });
            var deficiencycat = this.fieldDetailsAdd.find(function (item) { return item.FieldId === 2421  })
            var deficiency = this.fieldDetailsAdd.find(function (item) { return  item.FieldId === 2422 })
            deficiency.IsVisible = false;
            deficiencycat.IsVisible = false;
            this.fieldDetailsAddAdditionalDataFld = this.fieldDetailsAdd.filter(function (item) {
                if (item.ReportFieldId >= 1000000)
                    return true;
                else
                    return false;
            })
            this.isOnHold = onHoldField.FieldValue == "1" ? true : false;
            this.statusId = this.inputItems ? this.inputItems.rowData["StatusId"] : 0;
            this.removeAdditionalDataFields();
        }
        this.showDateTimeOnLoad = false;

        var input = null;
        var idtoFocus;
        if (this.action == "review") {
            idtoFocus = 1255;
        }
        input = document.getElementById(idtoFocus.toString());

        if (input != undefined) {
            this._renderer.invokeElementMethod(input, 'focus');
        }
    }
    public removeAdditionalDataFields() {
        for (var index = 0; index < this.fieldDetailsAdd.length; index++) {     /*To remove additional data fields from main Fields array*/
            if (this.fieldDetailsAdd[index].ReportFieldId > 1000000) {
                this.fieldDetailsAdd.splice(index, 1);
                index -= 1;
            }
        }
    }
    /**********************************************************************************************************
    * Function:     onSubmitDataClick
    * Description:  fires when submit button clicked
    *
    **********************************************************************************************************/

    public onSubmitData(event) {
        var contextObj = this;
        if (!contextObj.isActionValid() || !contextObj.isTimeSpentValid() || !contextObj.isWorkOrderDatesValid(JSON.parse(event))) {
            return;
        }
        var fieldObject = JSON.stringify(contextObj.updateFieldObject(JSON.parse(event)));
        this.submitClick.emit({
            fieldObject: fieldObject,
            action: contextObj.action,
            isPm: true
        });
    }

    /**********************************************************************************************************
    * Function:     isActionValid
    * Description:  Checks whether the selected action is valid with respect to the status of selected
    *               Workorder
    * Return:       flase if invalid
    *
    **********************************************************************************************************/

    public isActionValid() {

        switch (this.outcomeTypeId) {
            case 19:    /*Complete WorkOrder*/
                if (this.statusId == 11) {
                    this.notificationService.ShowToaster("Work Order already completed", 2);
                    return false;
                } else if (this.isInProgressSubscribed && this.statusId != 38) {
                    this.notificationService.ShowToaster("Work Order not moved to In Progress, cannot be completed", 2);
                    return false;
                }
                break;
            case 7:     /*Close WorkOrder*/
                if (this.statusId == 19 || this.statusId == 22) {
                    this.notificationService.ShowToaster("Work Order should be completed before closing", 2);
                    return false;
                }
                break;
            case 18:
                if (this.statusId == 38) {
                    this.notificationService.ShowToaster("Work Order already in progress", 2);
                    return false;
                }
                break;
            default:
                return true;
        }
        return true;
    }

    /**********************************************************************************************************
    * Function:     isTimeSpentValid
    * Description:  Checks whether the Time Spent entered  is valid
    * Return:       false if invalid
    *
    **********************************************************************************************************/

    public isTimeSpentValid() {
        var timeSpentField = this.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 7521;
        });

        if (timeSpentField.IsVisible && parseFloat(timeSpentField.FieldValue) <= 0.00) {
            this.notificationService.ShowToaster('Time spent (Hours) must be greater than zero', 2);
            return false;
        }
        return true;
    }

    /**********************************************************************************************************
    * Function:     isWorkOrderDatesValid
    * Description:  Checks whether the selected Hold dates is valid
    * Return:       false if invalid
    *
    **********************************************************************************************************/

    public isWorkOrderDatesValid(fieldObject: any[]) {
        if (this.entityCategoryId == 1 || fieldObject == null || fieldObject.length == 0) return true;

        var dateOfCompletionField = fieldObject.find(function (item) {
            return item.ReportFieldId === 6203;
        });

        var holdDateField = fieldObject.find(function (item) {
            return item.ReportFieldId === 6201;
        });

        if (this.isOnHold || this.inputItems.rowData["StatusId"] == 22) {
            if (this.inputItems.rowData["CurrentOnHoldStartTime"] == null) {
                if (new Date(holdDateField.Value) > new Date()) {
                    this.notificationService.ShowToaster("On Hold Date should be less than or equal to Current Date", 2);
                    return false;
                }
                if (new Date(holdDateField.Value) < new Date(this.inputItems.rowData["Work Order Date"])) {
                    this.notificationService.ShowToaster("On Hold Start Date should be greater than Work Order Date", 2);
                    return false;
                }
            } else {
                var date = new Date(this.inputItems.rowData["CurrentOnHoldStartTime"]);
                var timeZone = new Date().getTimezoneOffset();
                if (!this.isOnHold && new Date(holdDateField.Value) < new Date(date.setMinutes(date.getMinutes() + parseInt(timeZone.toString())))) {
                    this.notificationService.ShowToaster("On Hold End Date should be greater than or equal to On Hold Start Date", 2);
                    return false;
                }
                if (this.outcomeTypeId == 19 && new Date(dateOfCompletionField.Value) < new Date(holdDateField.Value)) {
                    this.notificationService.ShowToaster("Date of Completion should be greater than On Hold End Date", 2);
                    return false;
                }
            }
        }

        if (this.inputItems.rowData["CurrentOnHoldStartTime"] != null) {
            if (this.outcomeTypeId == 19 && this.inputItems.rowData["StatusId"] != 22 && new Date(dateOfCompletionField.Value) < new Date(holdDateField.Value)) {
                this.notificationService.ShowToaster("Date of Completion should be greater than On Hold End Date", 2);
                return false;
            }
        }

        if (this.outcomeTypeId == 19 && new Date(dateOfCompletionField.Value) < new Date(this.inputItems.rowData["Work Order Date"])) {
            this.notificationService.ShowToaster("Date of Completion should be greater than Work Order Date", 2);
            return false;
        }

        var inProgressDateField = fieldObject.find(function (item) {
            return item.ReportFieldId === 6175;
        });

        if (this.outcomeTypeId == 18 && new Date(inProgressDateField.Value) < new Date(this.inputItems.rowData["Work Order Date"])) {
            this.notificationService.ShowToaster("Work In progress date should be greater than Work Order Date", 2);
            return false;
        }
        return true;
    }

    /***********************************************************************************************************
    * Function:     updateFieldObject
    * Description:  Updates the field values for final submisson
    * Return:       Updated fieldarray
    *
    ************************************************************************************************************/

    public updateFieldObject(fieldObjectArray) {

        var contextObj = this;
        var actionPoint: any;
        var prvComments: any;
        fieldObjectArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 5841:
                    item.Value = "3";
                    break;
                case 12254:
                    actionPoint = item;
                    break;
                case 1478:
                    prvComments = item;
                    break;
                case 6561:
                    item.Value = 3;
                    break;
                case 6562:
                    item.Value = contextObj.isOnHold == false ? 0 : 1;
                    break;
                case 5873:
                    item.Value = contextObj.inputItems.rowData["WorkTypeId"];
                    break;
            }

        });

        /*////// deletes the action point and previous comments item///////*/
        var index = fieldObjectArray.indexOf(actionPoint);
        if (index > -1) {
            fieldObjectArray.splice(index, 1);
        }
        index = fieldObjectArray.indexOf(prvComments);
        if (index > -1) {
            fieldObjectArray.splice(index, 1);
        }
        /*/////////////////////////////////////////////////////////////////*/

        var actionPointField: IField = contextObj.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 12254;
        });

        if (actionPointField.MultiFieldValues != null) {
            for (var item of actionPointField.MultiFieldValues) {
                fieldObjectArray.push({
                    ReportFieldId: 12254,
                    Value: item
                });
            }
        }

        return fieldObjectArray;
    }
    /***********************************************************************************************************
  * Function:     loadDeficiencyLookUpValues
  * Description:  Loads the Deficiency dropdown with selected Deficiency Category
  *
  ************************************************************************************************************/

    public loadDeficiencyLookUpValues(deficiencyCategoryId: string) {
        var contextObj = this;
        var deficiency: IField = contextObj.fieldDetailsAdd.find(function (item) {
            return item.FieldId === 2422
        });
        deficiency.FieldValue = "-1";
        deficiency.LookupDetails.LookupValues = null;
        if (deficiencyCategoryId == "-1") {
            return;
        }

        contextObj.workOrderService.loadDeficiencies(deficiencyCategoryId, 2421).subscribe(function (resultData) {

            if (resultData["Data"]["LookupValues"].length > 0) {
                deficiency.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                if (deficiency.LookupDetails.LookupValues.length >= 1) {
                    deficiency.FieldValue = deficiency.LookupDetails.LookupValues[0].Id.toString();
                }
            }
        });
    }

    /***********************************************************************************************************
    * Function:     onDropDownChange
    * Description:  Fire when dropdowns changes
    *           
    ************************************************************************************************************/

    public onDropDownChange(event: IField) {
        var contextObj = this;
        switch (event.FieldId) {
            case 2421:/*deficiency category change in PM work order review page*/
                contextObj.loadDeficiencyLookUpValues(event.FieldValue);
            case 1255:  /*Action*/
                var actionUser: IField = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 1562
                });
                var reviewComments: IField = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.ReportFieldId === 5978
                });
                if (event.FieldValue == "-1") {
                    actionUser.IsVisible = false;
                    actionUser.IsMandatory = false;
                    contextObj.initiateValidation(actionUser);
                    actionUser.LookupDetails.LookupValues = [];
                    actionUser.MultiFieldValues = [];
                    reviewComments.FieldValue = "";
                    contextObj.outcomeTypeId = 0;
                    contextObj.initiateValidation(reviewComments);
                    contextObj.updateFieldValuesForWorkInProgress(contextObj.fieldDetailsAdd.find(function (item: IField) { return item.ReportFieldId === 6175 }), 0);    // Work In Progress
                    contextObj.updateFieldValuesForDateOfCompletion(contextObj.fieldDetailsAdd.find(function (item: IField) { return item.ReportFieldId === 6203 }), 0);    // Date Of Completion
                    return;
                }


                contextObj.outComeId = parseInt(event.FieldValue);
                contextObj.workOrderService.getActionPointUserLookupValues(contextObj.outComeId, contextObj.inputItems.rowData["WorkTypeId"], 9, contextObj.entityCategoryId, 0).subscribe(function (resultData) {
                    if (resultData["FieldBinderData"] != "[]") {
                        var lookUpArray = JSON.parse(resultData["FieldBinderData"]);
                        actionUser.LookupDetails.LookupValues = lookUpArray;
                        actionUser.IsVisible = true;
                        actionUser.IsEnabled = true;
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

                var outComeDetails = contextObj.outComeData.find(function (item) {
                    return item.Id === parseInt(event.FieldValue);
                });

                reviewComments.FieldValue = outComeDetails.Value;
                contextObj.initiateValidation(reviewComments);
                contextObj.outcomeTypeId = outComeDetails.OutcomeTypeId;
                contextObj.updateFieldValuesForWorkInProgress(contextObj.fieldDetailsAdd.find(function (item: IField) { return item.ReportFieldId === 6175 }), outComeDetails.OutcomeTypeId);
                contextObj.updateFieldValuesForDateOfCompletion(contextObj.fieldDetailsAdd.find(function (item: IField) { return item.ReportFieldId === 6203 }), outComeDetails.OutcomeTypeId);
                break;
            default:
                break;
        }
    }

    /***********************************************************************************************************
    * Function:     onCheckBoxClicked
    * Description:  Updates hold details when Hold Check box is clicked
    *          
    ************************************************************************************************************/

    public onCheckBoxClicked(event) {
        this.updateFieldValuesForHoldDetails(this.fieldDetailsAdd, event.chkBoxObject.IsChecked);
        this.isOnHold = event.chkBoxObject.IsChecked;
    }

    /***********************************************************************************************************
    * Function:     updateFieldValuesForDateOfCompletion
    * Description:  Enables, Sets and Clears Date of Completion details while action selected is 'Complete'
    *
    ************************************************************************************************************/

    public updateFieldValuesForDateOfCompletion(item: IField, value: any) {
        item.IsEnabled = item.IsVisible = item.IsMandatory = item.HasValidationError = value == 19 ? true : false;
        item.FieldValue = item.IsEnabled ? this.getDateTimeString(null) : "";
        item.IsLocallyValidated = false;
        this.initiateValidation(item);

    }

    /***********************************************************************************************************
    * Function:     updateFieldValuesForWorkInProgress
    * Description:  Enables, Sets and Clears Date of Completion details while action selected is 'Work In Progress'
    *
    ************************************************************************************************************/

    public updateFieldValuesForWorkInProgress(item: IField, value: any) {
        item.IsEnabled = item.IsVisible = item.IsMandatory = item.HasValidationError = value == 18 ? true : false;
        item.FieldValue = item.IsEnabled ? this.getDateTimeString(null) : "";
        item.IsLocallyValidated = false;
        this.initiateValidation(item);
    }

    /***********************************************************************************************************
    * Function:     updateFieldValuesForHoldDetails
    * Description:  Sets and Clears Hold details while changing On Hold Checkbox
    * Comments:     Once On Hold, Hold Reason and Hold Date are disabled.
    *               StatusId '22' is 'On Hold'
    *
    ************************************************************************************************************/

    public updateFieldValuesForHoldDetails(fieldDetailsArray: any, isChecked: any) {
        var contextObj = this;
        var onHoldRenew = (contextObj.inputItems.rowData["StatusId"] == 19 && contextObj.inputItems.rowData["CurrentOnHoldStartTime"] != null);
        fieldDetailsArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 6202:  /*Hold Reason*/
                    item.IsVisible = (contextObj.inputItems.rowData["StatusId"] == 22 || isChecked)
                    item.IsEnabled = contextObj.inputItems.rowData["CurrentOnHoldStartTime"] == null || onHoldRenew ? isChecked : false;
                    item.IsMandatory = contextObj.inputItems.rowData["CurrentOnHoldStartTime"] == null || onHoldRenew ? isChecked : false;
                    if (item.IsEnabled) {
                        item.LookupDetails.PopupComponent = { Name: "Hold Reason", showImage: true };
                    } else {
                        item.LookupDetails.PopupComponent = null;
                    }
                    item.IsLocallyValidated = false;
                    contextObj.initiateValidation(item);
                    break;
                case 6201:  /*Hold time*/
                    item.IsVisible = (contextObj.inputItems.rowData["StatusId"] == 22 || isChecked)
                    item.ReadOnlyMode = contextObj.inputItems.rowData["CurrentOnHoldStartTime"] == null || onHoldRenew ? !isChecked : isChecked;
                    item.IsMandatory = contextObj.inputItems.rowData["CurrentOnHoldStartTime"] == null || onHoldRenew ? isChecked : !isChecked;
                    item.FieldValue = (contextObj.inputItems.rowData["StatusId"] == 22 && isChecked) ? contextObj.getDateTimeString(contextObj.inputItems.rowData["CurrentOnHoldStartTime"]) : contextObj.getDateTimeString(null);
                    item.IsLocallyValidated = false;
                    contextObj.initiateValidation(item);
                    break;
            }
        });
    }

    public getDateTimeString(value: string) {
        var time;
        var hh;
        var hour;
        var min;
        var meridian;
        var date = value ? new Date(value) : new Date();

        hh = date.getHours();
        min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        if (hh > 12) {
            meridian = "PM";
            hh = hh - 12;
        }
        else {
            meridian = "AM";
        }
        hour = hh.toString();
        hour = (hh < 10 ? '0' : '') + hour;
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var year = date.getFullYear();

        return day + " " + monthNames[date.getMonth()] + " " + year + " " + hour + ":" + min + " " + meridian;
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

    public popupItemEmit(event) {
        var contextObj = this;
        contextObj.btnName = "Save";
        contextObj.workOrderService.getHoldReasonFields().subscribe(function (resultData) {
            contextObj.holdReasonAddFields = resultData["Data"].filter(function (item: IField) { return item.ReportFieldId != 6192 });
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });

    }

    public onReasonHoldAddSubmit(event) {
        var contextObj = this;
        contextObj.workOrderService.postAddHoldReasonDetails(event.fieldobject).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var returnData = JSON.parse(resultData["Data"]["Data"])[0];
                    var reasonField: IField = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 6202 });
                    reasonField.LookupDetails.LookupValues.push({ Id: returnData.Id, Value: returnData.Reason });
                    reasonField.FieldValue = returnData.Id.toString();
                    reasonField.HasValidationError = false;
                    reasonField.IsLocallyValidated = false;
                    contextObj.initiateValidation(reasonField);
                    contextObj.notificationService.ShowToaster("Reason added", 3);
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    break;
                case 3:
                    contextObj.notificationService.ShowToaster("Reason already exists", 5);
                    break;
            }
        });
    }

    public onLinkClick(event) {
        this.linkClick.emit(event);
    }

    public getCurrentDateTimeString() {
        var time;
        var hh;
        var hour;
        var min;
        var meridian;
        var date = new Date();
        hh = date.getHours();
        min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        if (hh > 12) {
            meridian = "PM";
            hh = hh - 12;
        }
        else {
            meridian = "AM";
        }
        hour = hh.toString();
        hour = (hh < 10 ? '0' : '') + hour;
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var day = date.getDate();
        var year = date.getFullYear();

        return day + " " + monthNames[date.getMonth()] + " " + year + " " + hour + ":" + min + " " + meridian;
    }

    emitKeyUp(value: any) {

    }

    txtBoxChanges(value: any) {

    }

    chkBoxChange(value: any) {
        this.updateFieldValuesForHoldDetails(this.fieldDetailsAdd, value.IsChecked);
        this.isOnHold = value.IsChecked;
    }

    showComponent(fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    }

    onSubmit(form: NgForm, value: string) {
        var contextObj = this;
        for (let i = 0; i < this.fieldDetailsAdd.length; i++) {
            if (this.fieldDetailsAdd[i].HasValidationError == true) {
                var input = null;
                if (contextObj.fieldDetailsAdd[i].DataEntryControlId == 5) {
                    input = document.getElementById(contextObj.fieldDetailsAdd[i].LookupDetails.LookupValues[0].Id.toString());
                }
                else {
                    input = document.getElementById(contextObj.fieldDetailsAdd[i].FieldId.toString());
                }
                if (contextObj.fieldDetailsAdd != undefined) {
                    if (input != undefined) {
                        this._renderer.invokeElementMethod(input, 'focus');
                        break;
                    }
                }
            }
        }
        var checkForErrors = function (fieldObject: IField) {
            return fieldObject.HasValidationError;
        };
        if (this.fieldDetailsAdd.find(checkForErrors)) {
            return;
        }
        if (contextObj.fieldDetailsAddAdditionalDataFld.find(checkForErrors)) {
            return;
        }
        this.reportFieldArray = this.generFun.getFieldValuesAsReportFieldArray(this.fieldDetailsAdd);
        var tempArray: any[] = JSON.parse(this.reportFieldArray);
        tempArray = tempArray.concat(JSON.parse(this.generFun.getFieldValuesAsReportFieldArray(this.fieldDetailsAddAdditionalDataFld)));
        this.reportFieldArray = JSON.stringify(tempArray);
        var isValid = true;
        if (isValid == true) {
            this.onSubmitData(this.reportFieldArray);
        }
        else {
        }
    }


}

interface TotalCostItems {
    TechnicianTotalCost: number;
    PartsTotalCost: number;
    ToolsTotalCost: number;
    OtherTotalCost: number;
}

export interface ReportFieldArray {
    ReportFieldId: number;
    FieldValue: string;
}
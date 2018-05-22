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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var textareacomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/textareacomponent.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var listboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var datecomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var datetimecomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/datetimecomponent.component');
var labelcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/labelcomponent.component');
var buttoncomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/buttoncomponent.component');
var General_1 = require('../../../Models/Common/General');
var ReviewPMWorkorderComponent = (function () {
    function ReviewPMWorkorderComponent(workOrderService, notificationService, _validateService, generFun, el, _renderer) {
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this._validateService = _validateService;
        this.generFun = generFun;
        this.el = el;
        this._renderer = _renderer;
        this.dataKey = "WorkOrderId";
        this.workFlowActionPointId = 0;
        this.outComeId = 0;
        this.outcomeTypeId = 0;
        this.isOnHold = false;
        this.btnName = "Save";
        this.pageTitle = "New Reason";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 20 };
        this.linkClick = new core_1.EventEmitter();
        this.submitClick = new core_1.EventEmitter();
        this.showDateTimeOnLoad = true;
        this.horizontal = "horizontal";
        this.selectActionInline = "horizontal";
    }
    ReviewPMWorkorderComponent.prototype.ngOnInit = function () {
        debugger;
        if (window["IsMobile"] == true) {
            this.selectActionInline = "vertical";
        }
    };
    ReviewPMWorkorderComponent.prototype.ngAfterViewInit = function () {
        if (this.fieldDetailsAdd) {
            var onHoldField = this.fieldDetailsAdd.find(function (item) {
                return item.ReportFieldId === 6562;
            });
            var deficiencycat = this.fieldDetailsAdd.find(function (item) { return item.FieldId === 2421; });
            var deficiency = this.fieldDetailsAdd.find(function (item) { return item.FieldId === 2422; });
            deficiency.IsVisible = false;
            deficiencycat.IsVisible = false;
            this.fieldDetailsAddAdditionalDataFld = this.fieldDetailsAdd.filter(function (item) {
                if (item.ReportFieldId >= 1000000)
                    return true;
                else
                    return false;
            });
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
    };
    ReviewPMWorkorderComponent.prototype.removeAdditionalDataFields = function () {
        for (var index = 0; index < this.fieldDetailsAdd.length; index++) {
            if (this.fieldDetailsAdd[index].ReportFieldId > 1000000) {
                this.fieldDetailsAdd.splice(index, 1);
                index -= 1;
            }
        }
    };
    /**********************************************************************************************************
    * Function:     onSubmitDataClick
    * Description:  fires when submit button clicked
    *
    **********************************************************************************************************/
    ReviewPMWorkorderComponent.prototype.onSubmitData = function (event) {
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
    };
    /**********************************************************************************************************
    * Function:     isActionValid
    * Description:  Checks whether the selected action is valid with respect to the status of selected
    *               Workorder
    * Return:       flase if invalid
    *
    **********************************************************************************************************/
    ReviewPMWorkorderComponent.prototype.isActionValid = function () {
        switch (this.outcomeTypeId) {
            case 19:
                if (this.statusId == 11) {
                    this.notificationService.ShowToaster("Work Order already completed", 2);
                    return false;
                }
                else if (this.isInProgressSubscribed && this.statusId != 38) {
                    this.notificationService.ShowToaster("Work Order not moved to In Progress, cannot be completed", 2);
                    return false;
                }
                break;
            case 7:
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
    };
    /**********************************************************************************************************
    * Function:     isTimeSpentValid
    * Description:  Checks whether the Time Spent entered  is valid
    * Return:       false if invalid
    *
    **********************************************************************************************************/
    ReviewPMWorkorderComponent.prototype.isTimeSpentValid = function () {
        var timeSpentField = this.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 7521;
        });
        if (timeSpentField.IsVisible && parseFloat(timeSpentField.FieldValue) <= 0.00) {
            this.notificationService.ShowToaster('Time spent (Hours) must be greater than zero', 2);
            return false;
        }
        return true;
    };
    /**********************************************************************************************************
    * Function:     isWorkOrderDatesValid
    * Description:  Checks whether the selected Hold dates is valid
    * Return:       false if invalid
    *
    **********************************************************************************************************/
    ReviewPMWorkorderComponent.prototype.isWorkOrderDatesValid = function (fieldObject) {
        if (this.entityCategoryId == 1 || fieldObject == null || fieldObject.length == 0)
            return true;
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
            }
            else {
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
    };
    /***********************************************************************************************************
    * Function:     updateFieldObject
    * Description:  Updates the field values for final submisson
    * Return:       Updated fieldarray
    *
    ************************************************************************************************************/
    ReviewPMWorkorderComponent.prototype.updateFieldObject = function (fieldObjectArray) {
        var contextObj = this;
        var actionPoint;
        var prvComments;
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
        var actionPointField = contextObj.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 12254;
        });
        if (actionPointField.MultiFieldValues != null) {
            for (var _i = 0, _a = actionPointField.MultiFieldValues; _i < _a.length; _i++) {
                var item = _a[_i];
                fieldObjectArray.push({
                    ReportFieldId: 12254,
                    Value: item
                });
            }
        }
        return fieldObjectArray;
    };
    /***********************************************************************************************************
  * Function:     loadDeficiencyLookUpValues
  * Description:  Loads the Deficiency dropdown with selected Deficiency Category
  *
  ************************************************************************************************************/
    ReviewPMWorkorderComponent.prototype.loadDeficiencyLookUpValues = function (deficiencyCategoryId) {
        var contextObj = this;
        var deficiency = contextObj.fieldDetailsAdd.find(function (item) {
            return item.FieldId === 2422;
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
    };
    /***********************************************************************************************************
    * Function:     onDropDownChange
    * Description:  Fire when dropdowns changes
    *
    ************************************************************************************************************/
    ReviewPMWorkorderComponent.prototype.onDropDownChange = function (event) {
        var contextObj = this;
        switch (event.FieldId) {
            case 2421:
                contextObj.loadDeficiencyLookUpValues(event.FieldValue);
            case 1255:
                var actionUser = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 1562;
                });
                var reviewComments = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.ReportFieldId === 5978;
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
                    contextObj.updateFieldValuesForWorkInProgress(contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 6175; }), 0); // Work In Progress
                    contextObj.updateFieldValuesForDateOfCompletion(contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 6203; }), 0); // Date Of Completion
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
                var outComeDetails = contextObj.outComeData.find(function (item) {
                    return item.Id === parseInt(event.FieldValue);
                });
                reviewComments.FieldValue = outComeDetails.Value;
                contextObj.initiateValidation(reviewComments);
                contextObj.outcomeTypeId = outComeDetails.OutcomeTypeId;
                contextObj.updateFieldValuesForWorkInProgress(contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 6175; }), outComeDetails.OutcomeTypeId);
                contextObj.updateFieldValuesForDateOfCompletion(contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 6203; }), outComeDetails.OutcomeTypeId);
                break;
            default:
                break;
        }
    };
    /***********************************************************************************************************
    * Function:     onCheckBoxClicked
    * Description:  Updates hold details when Hold Check box is clicked
    *
    ************************************************************************************************************/
    ReviewPMWorkorderComponent.prototype.onCheckBoxClicked = function (event) {
        this.updateFieldValuesForHoldDetails(this.fieldDetailsAdd, event.chkBoxObject.IsChecked);
        this.isOnHold = event.chkBoxObject.IsChecked;
    };
    /***********************************************************************************************************
    * Function:     updateFieldValuesForDateOfCompletion
    * Description:  Enables, Sets and Clears Date of Completion details while action selected is 'Complete'
    *
    ************************************************************************************************************/
    ReviewPMWorkorderComponent.prototype.updateFieldValuesForDateOfCompletion = function (item, value) {
        item.IsEnabled = item.IsVisible = item.IsMandatory = item.HasValidationError = value == 19 ? true : false;
        item.FieldValue = item.IsEnabled ? this.getDateTimeString(null) : "";
        item.IsLocallyValidated = false;
        this.initiateValidation(item);
    };
    /***********************************************************************************************************
    * Function:     updateFieldValuesForWorkInProgress
    * Description:  Enables, Sets and Clears Date of Completion details while action selected is 'Work In Progress'
    *
    ************************************************************************************************************/
    ReviewPMWorkorderComponent.prototype.updateFieldValuesForWorkInProgress = function (item, value) {
        item.IsEnabled = item.IsVisible = item.IsMandatory = item.HasValidationError = value == 18 ? true : false;
        item.FieldValue = item.IsEnabled ? this.getDateTimeString(null) : "";
        item.IsLocallyValidated = false;
        this.initiateValidation(item);
    };
    /***********************************************************************************************************
    * Function:     updateFieldValuesForHoldDetails
    * Description:  Sets and Clears Hold details while changing On Hold Checkbox
    * Comments:     Once On Hold, Hold Reason and Hold Date are disabled.
    *               StatusId '22' is 'On Hold'
    *
    ************************************************************************************************************/
    ReviewPMWorkorderComponent.prototype.updateFieldValuesForHoldDetails = function (fieldDetailsArray, isChecked) {
        var contextObj = this;
        var onHoldRenew = (contextObj.inputItems.rowData["StatusId"] == 19 && contextObj.inputItems.rowData["CurrentOnHoldStartTime"] != null);
        fieldDetailsArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 6202:
                    item.IsVisible = (contextObj.inputItems.rowData["StatusId"] == 22 || isChecked);
                    item.IsEnabled = contextObj.inputItems.rowData["CurrentOnHoldStartTime"] == null || onHoldRenew ? isChecked : false;
                    item.IsMandatory = contextObj.inputItems.rowData["CurrentOnHoldStartTime"] == null || onHoldRenew ? isChecked : false;
                    if (item.IsEnabled) {
                        item.LookupDetails.PopupComponent = { Name: "Hold Reason", showImage: true };
                    }
                    else {
                        item.LookupDetails.PopupComponent = null;
                    }
                    item.IsLocallyValidated = false;
                    contextObj.initiateValidation(item);
                    break;
                case 6201:
                    item.IsVisible = (contextObj.inputItems.rowData["StatusId"] == 22 || isChecked);
                    item.ReadOnlyMode = contextObj.inputItems.rowData["CurrentOnHoldStartTime"] == null || onHoldRenew ? !isChecked : isChecked;
                    item.IsMandatory = contextObj.inputItems.rowData["CurrentOnHoldStartTime"] == null || onHoldRenew ? isChecked : !isChecked;
                    item.FieldValue = (contextObj.inputItems.rowData["StatusId"] == 22 && isChecked) ? contextObj.getDateTimeString(contextObj.inputItems.rowData["CurrentOnHoldStartTime"]) : contextObj.getDateTimeString(null);
                    item.IsLocallyValidated = false;
                    contextObj.initiateValidation(item);
                    break;
            }
        });
    };
    ReviewPMWorkorderComponent.prototype.getDateTimeString = function (value) {
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
    };
    ReviewPMWorkorderComponent.prototype.initiateValidation = function (fieldObject) {
        var contextObj = this;
        var el = document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    ReviewPMWorkorderComponent.prototype.popupItemEmit = function (event) {
        var contextObj = this;
        contextObj.btnName = "Save";
        contextObj.workOrderService.getHoldReasonFields().subscribe(function (resultData) {
            contextObj.holdReasonAddFields = resultData["Data"].filter(function (item) { return item.ReportFieldId != 6192; });
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    ReviewPMWorkorderComponent.prototype.onReasonHoldAddSubmit = function (event) {
        var contextObj = this;
        contextObj.workOrderService.postAddHoldReasonDetails(event.fieldobject).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var returnData = JSON.parse(resultData["Data"]["Data"])[0];
                    var reasonField = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 6202; });
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
    };
    ReviewPMWorkorderComponent.prototype.onLinkClick = function (event) {
        this.linkClick.emit(event);
    };
    ReviewPMWorkorderComponent.prototype.getCurrentDateTimeString = function () {
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
    };
    ReviewPMWorkorderComponent.prototype.emitKeyUp = function (value) {
    };
    ReviewPMWorkorderComponent.prototype.txtBoxChanges = function (value) {
    };
    ReviewPMWorkorderComponent.prototype.chkBoxChange = function (value) {
        this.updateFieldValuesForHoldDetails(this.fieldDetailsAdd, value.IsChecked);
        this.isOnHold = value.IsChecked;
    };
    ReviewPMWorkorderComponent.prototype.showComponent = function (fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    };
    ReviewPMWorkorderComponent.prototype.onSubmit = function (form, value) {
        var contextObj = this;
        for (var i = 0; i < this.fieldDetailsAdd.length; i++) {
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
        var checkForErrors = function (fieldObject) {
            return fieldObject.HasValidationError;
        };
        if (this.fieldDetailsAdd.find(checkForErrors)) {
            return;
        }
        if (contextObj.fieldDetailsAddAdditionalDataFld.find(checkForErrors)) {
            return;
        }
        this.reportFieldArray = this.generFun.getFieldValuesAsReportFieldArray(this.fieldDetailsAdd);
        var tempArray = JSON.parse(this.reportFieldArray);
        tempArray = tempArray.concat(JSON.parse(this.generFun.getFieldValuesAsReportFieldArray(this.fieldDetailsAddAdditionalDataFld)));
        this.reportFieldArray = JSON.stringify(tempArray);
        var isValid = true;
        if (isValid == true) {
            this.onSubmitData(this.reportFieldArray);
        }
        else {
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewPMWorkorderComponent.prototype, "linkClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewPMWorkorderComponent.prototype, "submitClick", void 0);
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], ReviewPMWorkorderComponent.prototype, "input", void 0);
    ReviewPMWorkorderComponent = __decorate([
        core_1.Component({
            selector: 'review-PMWorkOrders',
            templateUrl: 'app/Views/WorkOrder/Review/reviewPMWorkorder.component.html',
            providers: [workorder_service_1.WorkOrdereService, General_1.GeneralFunctions, notify_service_1.NotificationService, validation_service_1.ValidateService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, split_view_component_1.SplitViewComponent, stringtextbox_component_1.StringTextBoxComponent, textareacomponent_component_1.TextAreaComponent, dropdownlistcomponent_component_1.DropDownListComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, listboxcomponent_component_1.ListBoxComponent, datecomponent_component_1.DateComponent, datetimecomponent_component_1.DateTimeComponent, labelcomponent_component_1.LabelComponent, buttoncomponent_component_1.ButtonComponent],
            inputs: ['inputItems', 'action', 'fieldDetailsAdd', 'btnName', 'linkArray', 'userDetails', 'entityCategoryId', 'outComeData', 'statusId', 'isInProgressSubscribed'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, validation_service_1.ValidateService, General_1.GeneralFunctions, core_1.ElementRef, core_1.Renderer])
    ], ReviewPMWorkorderComponent);
    return ReviewPMWorkorderComponent;
}());
exports.ReviewPMWorkorderComponent = ReviewPMWorkorderComponent;
//# sourceMappingURL=reviewPMWorkorder.component.js.map
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
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var common_service_1 = require('../../../models/common/common.service');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var textareacomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/textareacomponent.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var radiocomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component');
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var listboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var datecomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var datetimecomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/datetimecomponent.component');
var General_1 = require('../../../Models/Common/General');
var createrequest_root_component_1 = require('../create request/createrequest-root.component');
var ReviewServiceRequestComponent = (function () {
    function ReviewServiceRequestComponent(workOrderService, notificationService, _validateService, generFun, el, _renderer, commonService) {
        var _this = this;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this._validateService = _validateService;
        this.generFun = generFun;
        this.el = el;
        this._renderer = _renderer;
        this.commonService = commonService;
        this.linkClick = new core_1.EventEmitter();
        this.submitClick = new core_1.EventEmitter();
        this.requesterPermissionUpdate = new core_1.EventEmitter();
        this.siteSelected = new core_1.EventEmitter();
        this.dataKey = "WorkRequestId";
        this.workFlowActionPointId = 0;
        this.outComeId = 0;
        this.outcomeTypeId = 0;
        this.isOnHold = false;
        this.allowSubmit = true;
        this.btnName = "Save";
        this.pageTitle = "New Reason";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 20 };
        this.showDateTimeOnLoad = false;
        this.horizontal = "horizontal";
        this.position = "top-right";
        this.showSlide = false;
        this.selectActionInline = "horizontal";
        this.submitOutput = {
            WFEntityInput: null,
            WFEntityDocumentInput: null,
            //WFEntityEquipmentInput: null,
            ParentFormId: 0
        };
        this._validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
    }
    ReviewServiceRequestComponent.prototype.ngOnInit = function () {
        if (window["IsMobile"] == true) {
            this.selectActionInline = "vertical";
        }
        if (this.fieldDetailsAdd && this.action == "add") {
            var workTypeField = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 5873; });
            workTypeField.IsMandatory = true;
            if (workTypeField.LookupDetails && workTypeField.LookupDetails.LookupValues.length >= 1) {
                //workTypeField.FieldValue = workTypeField.LookupDetails.LookupValues[0].Id.toString();// commented to avoid loading issues
                //this.loadFieldsForWorkType(workTypeField.FieldValue, workTypeField.LookupDetails.LookupValues.length > 1); /*To set worktype as selected and load corresponding fields*/
                this.getEditableFields(workTypeField.FieldValue);
                this.fieldDetailsAddAdditionalDataFld = undefined;
                this.fieldDetailsAddAdditionalDataFld = this.fieldDetailsAdd.filter(function (item) {
                    if (item.DataEntryControlId == 4)
                        if (item.FieldValue == null)
                            item.FieldValue = "-1";
                    return item.ReportFieldId >= 1000000;
                });
                this.getRequesterPermissionDetails(workTypeField.FieldValue);
            }
            else {
                this.checkAndLoadBuildingIfOnly1Site(); /*To set site,building,floor combo with first value*/
            }
        }
        else {
            var siteField = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 489; });
            siteField.IsEnabled = false;
            this.updateAdditionalFieldObject();
        }
    };
    ReviewServiceRequestComponent.prototype.ngAfterViewInit = function () {
        /*setTimeout(function () {
        //    var el = <HTMLElement>document.getElementById("1260"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/
        //    if (el != null && el != undefined) {
        //        el.focus();
        //        el.blur();
        //    }
        //}, 2000);       /*Time Out 2000 given inorder to ensure this working when network is slow*/
        var onHoldField = this.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 6562;
        });
        this.updateAdditionalFieldObject();
        this.isOnHold = onHoldField.FieldValue == "1" ? true : false;
        this.statusId = this.inputItems ? this.inputItems.rowData["StatusId"] : 0;
        this.showDateTimeOnLoad = false;
    };
    ReviewServiceRequestComponent.prototype.updateAdditionalFieldObject = function () {
        if (this.fieldDetailsAdd != undefined) {
            for (var _i = 0, _a = this.fieldDetailsAdd; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.ReportFieldId > 1000000 && item.FieldValue && item.FieldValue != '' && item.LookupDetails.LookupValues && item.LookupDetails.LookupValues.length > 0) {
                    var selectedItem = item.LookupDetails.LookupValues.find(function (lookUps) { return lookUps.Id.toString() === item.FieldValue; }); /* For additional datafields dropdown fieldvalue is not id */
                    if (selectedItem) {
                        item.FieldValue = selectedItem.Value;
                    }
                }
            }
            //var fieldfilter = this.fieldDetailsAdd.filter(function (item) {       /* To split AddititonalData Fields */
            //    if (item.ReportFieldId >= 1000000)
            //        return true;
            //    else
            //        return false;
            //})
            //this.fieldDetailsAddAdditionalDataFld.concat(fieldfilter)
            if (this.fieldDetailsAddAdditionalDataFld == undefined) {
                this.fieldDetailsAddAdditionalDataFld = this.fieldDetailsAdd.filter(function (item) {
                    if (item.ReportFieldId >= 1000000)
                        return true;
                    else
                        return false;
                });
            }
            if (this.action != "add") {
                this.removeAdditionalDataFields();
            }
        }
    };
    ReviewServiceRequestComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes["boolcheck"]) {
            if ((changes["boolcheck"]["currentValue"]) != (changes["boolcheck"]["previousValue"])) {
                contextObj.fieldDetailsAddAdditionalDataFld = undefined;
                if (contextObj.fieldDetailsAdd != undefined)
                    contextObj.checkAndLoadBuildingIfOnly1Site();
            }
        }
    };
    ReviewServiceRequestComponent.prototype.removeAdditionalDataFields = function () {
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
    ReviewServiceRequestComponent.prototype.onSubmitDataClick = function (event) {
        var contextObj = this;
        if (contextObj.allowSubmit) {
            var fieldObject = JSON.parse(event);
            if (!contextObj.isActionValid() || !contextObj.isTimeSpentValid() || !contextObj.isExpectedDateValid(fieldObject) || !contextObj.isWorkOrderDatesValid(fieldObject)) {
                return;
            }
            fieldObject = JSON.stringify(contextObj.updateFieldObject(fieldObject));
            contextObj.reviewSubmitData = { fieldObject: fieldObject, action: contextObj.action, isPm: false, isChildRequests: false, childRequestData: undefined, isReject: false };
            if (this.action != "add") {
                contextObj.checkChildParentEntityDetails();
            }
            else {
                contextObj.onSubmitData();
            }
        }
    };
    /**********************************************************************************************************
    * Function:     onSubmitData
    * Description:  If Outcome type is Create Service Request SplitView is shown, else emits with final data for
    *               submission.
    * Comments:     allowSubmit - to block double click of submit button
    *
    **********************************************************************************************************/
    ReviewServiceRequestComponent.prototype.onSubmitData = function () {
        var contextObj = this;
        if (contextObj.outcomeTypeId != 20) {
            contextObj.submitClick.emit(contextObj.reviewSubmitData);
            contextObj.allowSubmit = false;
            setTimeout(function () {
                contextObj.allowSubmit = true;
                // contextObj.fieldDetailsAddAdditionalDataFld = undefined;
            }, 200);
        }
        else {
            var entityId = 0;
            if (contextObj.reviewSubmitData.isPm) {
                entityId = this.inputItems.rowData["WorkOrderId"];
            }
            else {
                entityId = (this.inputItems.rowData["WorkOrderId"] == 0 || this.inputItems.rowData["WorkOrderId"] == null) ? this.inputItems.rowData["WorkRequestId"] : this.inputItems.rowData["WorkOrderId"];
            }
            var entityInput = { FormId: 228, WFEntityId: entityId, WFReportFieldIdValues: JSON.parse(contextObj.reviewSubmitData.fieldObject) };
            contextObj.submitOutput.WFEntityInput = entityInput;
            contextObj.submitOutput.ParentFormId = 226;
            if (contextObj.action == "review") {
                contextObj.submitOutput.WFEntityDocumentInput = null;
            }
            else {
                contextObj.submitOutput.WFEntityDocumentInput = (contextObj.submitOutput.WFEntityDocumentInput == null) ? null : contextObj.submitOutput.WFEntityDocumentInput;
            }
            var jsonOut = JSON.stringify(contextObj.submitOutput);
            contextObj.workOrderService.SpaceValidation(jsonOut, 0).subscribe(function (resultData) {
                if (resultData.Data == 1) {
                    contextObj.secondaryTarget = 1;
                    contextObj.splitviewInput.secondaryArea = 79;
                    setTimeout(function () {
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        contextObj.pageTitle = "Create Request";
                    }, 200);
                }
                else {
                    contextObj.notificationService.ShowToaster("No matching Space exists for the specified field values", 5);
                }
            });
        }
    };
    /**********************************************************************************************************
    * Function:     checkChildParentEntityDetails
    * Description:  Checks if any parent child relation exists for the selected requests
    *
    **********************************************************************************************************/
    ReviewServiceRequestComponent.prototype.checkChildParentEntityDetails = function () {
        var contextObject = this;
        var reportFieldIdArray = [{ ReportFieldId: 5827, Value: contextObject.inputItems.rowData["CurrentWorkFlowActionPointId"] }, { ReportFieldId: 5859, Value: contextObject.inputItems.rowData["WorkFlowEntityId"] }];
        contextObject.workOrderService.getParentChildEntityDetails(JSON.stringify(reportFieldIdArray)).subscribe(function (returnData) {
            contextObject.parentChildRelations = JSON.parse(returnData["FieldBinderData"])[0];
            if (contextObject.outcomeTypeId == 2 || contextObject.outcomeTypeId == 19) {
                if (contextObject.parentChildRelations.ChildRequestToComplete.length > 0 && contextObject.parentChildRelations.ChildWorkOrderToComplete.length > 0) {
                    contextObject.notificationService.ShowToaster("Selected Request cannot be completed before the Child Request(s) (" + contextObject.parentChildRelations.ChildRequestToComplete + ")/ Child Work Order(s) (" + contextObject.parentChildRelations.ChildWorkOrderToComplete + ") is completed", 3);
                    return;
                }
                else if (contextObject.parentChildRelations.ChildRequestToComplete.length > 0) {
                    contextObject.notificationService.ShowToaster("Selected Request cannot be completed before the Child Request(s) (" + contextObject.parentChildRelations.ChildRequestToComplete + ") is completed", 3);
                    return;
                }
                else if (contextObject.parentChildRelations.ChildWorkOrderToComplete.length > 0) {
                    contextObject.notificationService.ShowToaster("Selected Request cannot be completed before the Child Work Order(s) (" + contextObject.parentChildRelations.ChildWorkOrderToComplete + ") is completed", 3);
                    return;
                }
            }
            else if ((contextObject.outcomeTypeId == 9 || contextObject.outcomeTypeId == 16) && contextObject.parentChildRelations.ParentRequestName.length > 0 && contextObject.parentChildRelations.HasRejectedSettings == "True") {
                contextObject.showSlide = true;
                return;
            }
            if (contextObject.parentChildRelations.ChildRequestCurrentActionPoint.length > 0 && contextObject.parentChildRelations.ChildWorkOrderCurrentActionPoint.length > 0) {
                contextObject.notificationService.ShowToaster("Complete the Child Request(s) (" + contextObject.parentChildRelations.ChildRequestCurrentActionPoint + ")/ Child Work Order(s) (" + contextObject.parentChildRelations.ChildWorkOrderCurrentActionPoint + ") before the selected Action Point can move this request to the next Action Point", 3);
                return;
            }
            else if (contextObject.parentChildRelations.ChildRequestCurrentActionPoint.length > 0) {
                contextObject.notificationService.ShowToaster("Complete the Child Request(s) (" + contextObject.parentChildRelations.ChildRequestCurrentActionPoint + ") before the selected Action Point can move this request to the next Action Point", 3);
                return;
            }
            else if (contextObject.parentChildRelations.ChildWorkOrderCurrentActionPoint.length > 0) {
                contextObject.notificationService.ShowToaster("Complete the Child Work Order(s) (" + contextObject.parentChildRelations.ChildWorkOrderCurrentActionPoint + ") before the selected Action Point can move this request to the next Action Point", 3);
                return;
            }
            contextObject.onSubmitData();
            console.log(returnData);
        });
    };
    ReviewServiceRequestComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = false;
    };
    ReviewServiceRequestComponent.prototype.onSlideYesClick = function (event) {
        this.showSlide = false;
        this.reviewSubmitData.isReject = true;
        this.onSubmitData();
    };
    ReviewServiceRequestComponent.prototype.onSlideNoClick = function (event) {
        this.showSlide = false;
    };
    /**********************************************************************************************************
    * Function:     onChildRequestCreated
    * Description:  Fires when submit button clicked in Create Child Request
    *
    **********************************************************************************************************/
    ReviewServiceRequestComponent.prototype.onChildRequestCreated = function (event) {
        this.secondaryTarget = -1;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.reviewSubmitData.isChildRequests = true;
        this.reviewSubmitData.childRequestData = event;
        this.submitClick.emit(this.reviewSubmitData);
    };
    ReviewServiceRequestComponent.prototype.onSplitViewClose = function (event) {
        for (var _i = 0, _a = this.fieldDetailsAddAdditionalDataFld; _i < _a.length; _i++) {
            var item = _a[_i];
            this.initiateValidation(item);
        }
        this.secondaryTarget = -1;
    };
    /**********************************************************************************************************
    * Function:     isActionValid
    * Description:  Checks whether the selected action is valid with respect to the status of selected
    *               Request/Workorder
    * Return:       flase if invalid
    *
    **********************************************************************************************************/
    ReviewServiceRequestComponent.prototype.isActionValid = function () {
        switch (this.outcomeTypeId) {
            case 2:
                if (this.statusId == 11) {
                    this.notificationService.ShowToaster("Request already completed", 2);
                    return false;
                }
                break;
            case 7:
                if (this.statusId == 19 || this.statusId == 22) {
                    this.notificationService.ShowToaster("Work Order should be completed before closing", 2);
                    return false;
                }
                break;
            case 9:
                if (this.statusId == 11) {
                    this.notificationService.ShowToaster("Request already completed, cannot be rejected", 2);
                    return false;
                }
                break;
            case 11:
                if (this.statusId == 18) {
                    this.notificationService.ShowToaster("Request is not completed", 2);
                    return false;
                }
                break;
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
            case 18:
                if (this.statusId == 38 && this.entityCategoryId == 2) {
                    this.notificationService.ShowToaster("Work Order already in progress", 2);
                    return false;
                }
                break;
            default:
                break;
        }
        return true;
    };
    /**********************************************************************************************************
    * Function:     isTimeSpentValid
    * Description:  Checks whether the Time Spent entered  is valid
    * Return:       false if invalid
    *
    **********************************************************************************************************/
    ReviewServiceRequestComponent.prototype.isTimeSpentValid = function () {
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
    * Function:     isExpectedDateValid
    * Description:  Checks whether the Expected Date of Completion  is valid
    * Return:       false if invalid
    *
    **********************************************************************************************************/
    ReviewServiceRequestComponent.prototype.isExpectedDateValid = function (fieldObject) {
        if (this.entityCategoryId != 1)
            return true;
        if (fieldObject == null || fieldObject.length == 0)
            return true;
        var expectedDateField = fieldObject.find(function (item) {
            return item.ReportFieldId === 1487;
        });
        var requestedDateField = fieldObject.find(function (item) {
            return item.ReportFieldId === 1486;
        });
        var requestedDate = (requestedDateField.Value == "" || requestedDateField.Value == null) ? new Date() : new Date(requestedDateField.Value);
        requestedDate.setHours(0, 0, 0, 0);
        var expectedDate = new Date(expectedDateField.Value);
        if (expectedDate < requestedDate) {
            this.notificationService.ShowToaster('Expected Date of Completion should be on or after the Requested Date', 2);
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
    ReviewServiceRequestComponent.prototype.isWorkOrderDatesValid = function (fieldObject) {
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
                if (!this.isOnHold && new Date(holdDateField.Value) < new Date(this.inputItems.rowData["CurrentOnHoldStartTime"])) {
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
    * Comments:     Additional Data Fields with no values are removed.
    *               Organizational units Fieldvalue changed to the corresponding Id and
    *               with no values are removed
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.updateFieldObject = function (fieldObjectArray) {
        var contextObj = this;
        for (var index = 0; index < fieldObjectArray.length; index++) {
            switch (fieldObjectArray[index].ReportFieldId) {
                case 5841:
                    fieldObjectArray[index].Value = contextObj.entityCategoryId;
                    break;
                case 12254:
                    fieldObjectArray.splice(index, 1);
                    index -= 1;
                    break;
                case 6561:
                    fieldObjectArray[index].Value = contextObj.entityCategoryId;
                    break;
                case 1478:
                    fieldObjectArray.splice(index, 1);
                    index -= 1;
                    break;
                case 6562:
                    fieldObjectArray[index].Value = contextObj.isOnHold == false ? 0 : 1;
                    break;
                case 1755:
                case 4302:
                case 900001:
                case 900066:
                case 900005:
                case 900004:
                case 900008:
                case 900067:
                case 900006:
                case 900003:
                case 900002:
                case 290:
                    if (fieldObjectArray[index].Value == "-1" || fieldObjectArray[index].Value == "" || !fieldObjectArray[index].Value) {
                        fieldObjectArray.splice(index, 1);
                        index -= 1;
                    }
                    break;
                case 292:
                case 294:
                case 296:
                case 298:
                    var orgUnit = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === fieldObjectArray[index].ReportFieldId; });
                    if (orgUnit) {
                        if (orgUnit.LookupDetails.LookupValues) {
                            var selectedItem = orgUnit.LookupDetails.LookupValues.find(function (lookUps) { return lookUps.Value === orgUnit.FieldValue; });
                            if (selectedItem) {
                                fieldObjectArray[index].Value = selectedItem.Id.toString();
                            }
                            else {
                                fieldObjectArray[index].Value == "-1";
                            }
                        }
                        else {
                            fieldObjectArray[index].Value == "-1";
                        }
                    }
                    if (fieldObjectArray[index].Value == "-1" || fieldObjectArray[index].Value == "" || !fieldObjectArray[index].Value) {
                        fieldObjectArray.splice(index, 1);
                        index -= 1;
                    }
                    break;
                case 5988:
                    fieldObjectArray.splice(index, 1);
                    index -= 1;
                    break;
                default:
                    break;
            }
        }
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
        var requester = contextObj.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 1372;
        });
        fieldObjectArray.push({
            ReportFieldId: 990019,
            Value: requester.FieldValue == "14" ? "1" : "0" /*Value 1 for Me, 0 for Others*/
        });
        return fieldObjectArray;
    };
    /***********************************************************************************************************
    * Function:     onDropDownChange
    * Description:  Fire when dropdowns changes
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.onDropDownChange = function (event) {
        var contextObj = this;
        switch (event.FieldId) {
            case 1302:
                contextObj.loadBuildingLookupValues(event.FieldValue);
                var workType = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 1261;
                });
                contextObj.getActionPointUserLookupValues(workType.FieldValue, event.FieldValue);
                break;
            case 1303:
                contextObj.loadFloorLookupValues(event.FieldValue);
                break;
            case 1305:
                contextObj.loadOrgUnitLookupValues(event.FieldValue); /*Procedure for OrgUnit First level Dropdown is different, hence different function is used*/
                break;
            case 2421:
                contextObj.loadDeficiencyLookUpValues(event.FieldValue);
                break;
            case 1499:
                contextObj.resetOrganizationalDropDowns(290);
                contextObj.loadOrganizationalDropDownValues(event.FieldValue, event.FieldId, 292, 2);
                break;
            case 2417:
                contextObj.resetOrganizationalDropDowns(292);
                contextObj.loadOrganizationalDropDownValues(event.FieldValue, event.FieldId, 294, 3);
                break;
            case 2418:
                contextObj.resetOrganizationalDropDowns(294);
                contextObj.loadOrganizationalDropDownValues(event.FieldValue, event.FieldId, 296, 4);
                break;
            case 2419:
                contextObj.resetOrganizationalDropDowns(296);
                contextObj.loadOrganizationalDropDownValues(event.FieldValue, event.FieldId, 298, 5);
                break;
            case 1261:
                contextObj.outComeId = 0;
                contextObj.allowSubmit = true;
                if (event.FieldValue == "-1") {
                    var actionUser = contextObj.fieldDetailsAdd.find(function (item) {
                        return item.FieldId === 1488;
                    });
                    actionUser.IsVisible = false;
                    actionUser.IsMandatory = false;
                    actionUser.LookupDetails.LookupValues = [];
                    actionUser.MultiFieldValues = [];
                    contextObj.linkArray = undefined;
                    contextObj.fieldDetailsAddAdditionalDataFld = undefined;
                    return;
                }
                contextObj.getRequesterPermissionDetails(event.FieldValue);
                contextObj.loadFieldsForWorkType(event.FieldValue, true);
                break;
            case 1255:
                var actionUser = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 1488;
                });
                var reviewComments = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.ReportFieldId === 5978;
                });
                if (event.FieldValue == "-1") {
                    actionUser.IsVisible = false;
                    actionUser.IsMandatory = false;
                    actionUser.HasValidationError = false;
                    contextObj.initiateValidation(actionUser);
                    actionUser.LookupDetails.LookupValues = [];
                    actionUser.MultiFieldValues = [];
                    contextObj.outcomeTypeId = 0;
                    reviewComments.FieldValue = "";
                    contextObj.initiateValidation(reviewComments);
                    if (contextObj.entityCategoryId != 1) {
                        contextObj.updateFieldValuesForWorkInProgress(contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 6175; }), 0); // Work In Progress
                        contextObj.updateFieldValuesForDateOfCompletion(contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 6203; }), 0); // Date Of Completion
                    }
                    return;
                }
                var workType = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 1261;
                });
                var Site = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 1302;
                });
                contextObj.outComeId = parseInt(event.FieldValue);
                contextObj.getActionPointUserLookupValues(workType.FieldValue, Site.FieldValue);
                var outComeDetails = contextObj.outComeData.find(function (item) {
                    return item.Id === parseInt(event.FieldValue);
                });
                reviewComments.FieldValue = outComeDetails.Value;
                contextObj.initiateValidation(reviewComments);
                contextObj.outcomeTypeId = outComeDetails.OutcomeTypeId;
                if (contextObj.entityCategoryId != 1) {
                    contextObj.updateFieldValuesForWorkInProgress(contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 6175; }), outComeDetails.OutcomeTypeId); // Work In Progress
                    contextObj.updateFieldValuesForDateOfCompletion(contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 6203; }), outComeDetails.OutcomeTypeId); // Date Of Completion
                }
                break;
        }
    };
    /***********************************************************************************************************
    * Function:     onRadioButtonChange
    * Description:  Radio button change events of Requester fields
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.onRadioButtonChange = function (event) {
        if (event.rbtnObject.fieldobject.FieldLabel == "Requester") {
            this.updateFiedlValueForRequester(this.fieldDetailsAdd, event.rbtnObject.fieldobject.FieldValue);
            var updatedData = new Array(); /*To notify the watcher about the change*/
            updatedData = updatedData.concat(this.fieldDetailsAdd);
            this.fieldDetailsAdd = updatedData;
        }
    };
    /***********************************************************************************************************
    * Function:     onCheckBoxChange
    * Description:  Updates hold details when Hold Check box is clicked
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.onCheckBoxChange = function (event) {
        this.updateFieldValuesForHoldDetails(this.fieldDetailsAdd, event.chkBoxObject.IsChecked);
        this.isOnHold = event.chkBoxObject.IsChecked;
    };
    /***********************************************************************************************************
    * Function:     getRequesterPermissionDetails
    * Description:  Gets Requester Permission details
    * Comments:     Permission details are emited from this component
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.getRequesterPermissionDetails = function (workTypeId) {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push({
            ReportFieldId: 5873,
            Value: workTypeId
        });
        contextObj.workOrderService.getValuesWithDbObjectDetails(50847, JSON.stringify(tempArray)).subscribe(function (permission) {
            contextObj.requesterPermissionUpdate.emit(JSON.parse(permission["Data"]));
        });
    };
    /***********************************************************************************************************
    * Function:     checkAndLoadBuildingIfOnly1Site
    * Description:  Sets the Site dropdown value to first one
    * Comments:     Calls the function to load Building with the selected Site
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.checkAndLoadBuildingIfOnly1Site = function () {
        var site = this.fieldDetailsAdd.find(function (item) { return item.FieldId === 1302; });
        if (site.LookupDetails.LookupValues && site.LookupDetails.LookupValues.length >= 1) {
            site.FieldValue = site.LookupDetails.LookupValues[0].Id.toString();
            site.HasValidationError = true;
            this.loadBuildingLookupValues(site.FieldValue);
        }
        this.initiateValidation(site);
    };
    /***********************************************************************************************************
    * Function:     loadBuildingLookupValues
    * Description:  Loads the building for selected site and sets the Building dropdown value to first one
    * Comments:     Calls the function to load Floor with the selected Building
    *               Also clears other dependent dropdowns
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.loadBuildingLookupValues = function (siteId) {
        var contextObj = this;
        var building = contextObj.fieldDetailsAdd.find(function (item) {
            return item.FieldId === 1303;
        });
        var floor = contextObj.fieldDetailsAdd.find(function (item) {
            return item.FieldId === 1305;
        });
        var orgUnit = contextObj.fieldDetailsAdd.find(function (item) {
            return item.FieldId === 1499;
        });
        building.FieldValue = "-1";
        floor.FieldValue = "-1";
        if (orgUnit) {
            orgUnit.FieldValue = "-1";
            orgUnit.LookupDetails.LookupValues = null;
        }
        building.LookupDetails.LookupValues = null;
        floor.LookupDetails.LookupValues = null;
        if (siteId == "-1") {
            return;
        }
        contextObj.workOrderService.loadBuilding(siteId, 1302).subscribe(function (resultData) {
            // alert("4");
            if (resultData["Data"]["LookupValues"].length > 0) {
                building.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                if (building.LookupDetails.LookupValues.length >= 1) {
                    building.FieldValue = building.LookupDetails.LookupValues[0].Id.toString();
                    contextObj.loadFloorLookupValues(building.FieldValue);
                }
            }
        });
    };
    /***********************************************************************************************************
    * Function:     loadFloorLookupValues
    * Description:  Loads the Floor for selected Building and sets the Floor dropdown value to first one
    * Comments:     Calls the function to load Org Unit with the selected Floor
    *               Also clears other dependent dropdowns
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.loadFloorLookupValues = function (buildingId) {
        var contextObj = this;
        var floor = contextObj.fieldDetailsAdd.find(function (item) {
            return item.FieldId === 1305;
        });
        var orgUnit = contextObj.fieldDetailsAdd.find(function (item) {
            return item.FieldId === 1499;
        });
        floor.FieldValue = "-1";
        if (orgUnit) {
            orgUnit.FieldValue = "-1";
            orgUnit.LookupDetails.LookupValues = null;
        }
        floor.LookupDetails.LookupValues = null;
        if (buildingId == "-1") {
            return;
        }
        contextObj.workOrderService.loadFloor(buildingId, 1303).subscribe(function (resultData) {
            // alert("5");
            if (resultData["Data"]["LookupValues"].length > 0) {
                floor.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                if (floor.LookupDetails.LookupValues.length >= 1) {
                    floor.FieldValue = floor.LookupDetails.LookupValues[0].Id.toString();
                    contextObj.loadOrgUnitLookupValues(floor.FieldValue);
                }
            }
        });
    };
    /***********************************************************************************************************
    * Function:     loadOrgUnitLookupValues
    * Description:  Loads the 1st Level of Org Unit for selected Floor and sets the OrgUnit
    *               dropdown value to first one
    * Comments:     Calls the function to load Other level Org Unit with the selected Unit
    *               Also clears other dependent dropdowns
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.loadOrgUnitLookupValues = function (floorId) {
        var contextObj = this;
        var orgUnit = contextObj.fieldDetailsAdd.find(function (item) {
            return item.FieldId === 1499;
        });
        if (orgUnit) {
            orgUnit.FieldValue = "-1";
            orgUnit.LookupDetails.LookupValues = null;
            contextObj.resetOrganizationalDropDowns(290);
            if (floorId == "-1") {
                return;
            }
            contextObj.workOrderService.loadOrganizationalUnit(floorId, 1305).subscribe(function (resultData) {
                // alert("6");
                if (resultData["Data"]["LookupValues"].length > 0) {
                    orgUnit.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                    if (orgUnit.LookupDetails.LookupValues.length >= 1) {
                        orgUnit.FieldValue = orgUnit.LookupDetails.LookupValues[0].Id.toString();
                        contextObj.loadOrganizationalDropDownValues(orgUnit.FieldValue, orgUnit.FieldId, 292, 2);
                    }
                }
            });
        }
    };
    /***********************************************************************************************************
    * Function:     loadOrgUnitLookupValues
    * Description:  Loads the next level Org Unit for selected OrgUnit and sets the OrgUnit
    *               dropdown value to first one
    * Comments:     Recursively calls this function to load next level orgUnits
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.loadOrganizationalDropDownValues = function (selectedId, parentId, reportFiedlId, levelId) {
        var contextObj = this;
        contextObj.commonService.loadOrganizationalUnit(selectedId, parentId, 228, levelId).subscribe(function (resultData) {
            // alert("7");
            var orgUnit = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === reportFiedlId; });
            if (orgUnit && orgUnit.IsVisible) {
                orgUnit.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                if (orgUnit.LookupDetails.LookupValues.length >= 1) {
                    orgUnit.FieldValue = orgUnit.LookupDetails.LookupValues[0].Id.toString();
                    contextObj.resetOrganizationalDropDowns(reportFiedlId);
                    if (reportFiedlId <= 298) {
                        contextObj.loadOrganizationalDropDownValues(orgUnit.FieldValue, orgUnit.FieldId, reportFiedlId + 2, levelId + 1);
                    }
                }
            }
        });
    };
    /***********************************************************************************************************
    * Function:     resetOrganizationalDropDowns
    * Description:  Resets the Orgunit Dropdown with reportfieldId greater than the given
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.resetOrganizationalDropDowns = function (reportFieldId) {
        var orgFieldArray = this.fieldDetailsAdd.filter(function (item) { return (item.ReportFieldId > reportFieldId && item.ReportFieldId <= 298); });
        for (var _i = 0, orgFieldArray_1 = orgFieldArray; _i < orgFieldArray_1.length; _i++) {
            var orgField = orgFieldArray_1[_i];
            orgField.FieldValue = "-1";
            orgField.LookupDetails.LookupValues = null;
        }
    };
    /***********************************************************************************************************
    * Function:     loadDeficiencyLookUpValues
    * Description:  Loads the Deficiency dropdown with selected Deficiency Category
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.loadDeficiencyLookUpValues = function (deficiencyCategoryId) {
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
    * Function:     loadFieldsForWorkType
    * Description:  Loads the fields for selected Worktype
    * Comments:     Parameter enableWorkType - for enabling the Worktype dropdown. Enables only
    *               if more than 1 worktype exists
    *               Fields are first stored in a temporary array - fieldDetailsAddTemp. It is binded to the main
    *               in function getEditableFields(). Refer that.
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.loadFieldsForWorkType = function (workTypeId, enableWorkType) {
        var contextObj = this;
        contextObj.workOrderService.loadReviewServiceRequest(0, "add", parseInt(workTypeId), 0, 1, 0).subscribe(function (resultData) {
            // alert("1");
            contextObj.fieldDetailsAdd = contextObj.updateFieldDetailsForAdd(resultData["Data"]["FieldBinderList"], workTypeId);
            var workTypefield = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 5873; });
            workTypefield.ReadOnlyMode = !enableWorkType;
            contextObj.getEditableFields(workTypeId);
            contextObj.fieldDetailsAddAdditionalDataFld = undefined;
            contextObj.fieldDetailsAddAdditionalDataFld = contextObj.fieldDetailsAdd.filter(function (item) {
                if (item.DataEntryControlId == 4)
                    if (item.FieldValue == null)
                        item.FieldValue = "-1";
                return item.ReportFieldId >= 1000000;
            });
            //for (var index = 0; index < contextObj.fieldDetailsAdd.length; index++) {
            //    if (contextObj.fieldDetailsAdd[index].ReportFieldId > 1000000) {
            //        contextObj.fieldDetailsAdd.splice(index, 1);
            //        index -= 1;
            //    }
            //}
        });
    };
    /***********************************************************************************************************
    * Function:     getActionPointUserLookupValues
    * Description:  Loads the lookup for Action Point Users checkbox list for the selected Worktype
    * Comments:     initiateValidation() function is called to check the fields validation
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.getActionPointUserLookupValues = function (workTypeId, SiteId) {
        //alert("3");
        var contextObj = this;
        contextObj.workOrderService.getActionPointUserLookupValues(contextObj.outComeId, parseInt(workTypeId), 9, contextObj.entityCategoryId, parseInt(SiteId)).subscribe(function (resultData) {
            var actionUser = contextObj.fieldDetailsAdd.find(function (item) {
                return item.FieldId === 1488;
            });
            if (SiteId > 0) {
                if (resultData["FieldBinderData"] != "[]") {
                    actionUser.LookupDetails.LookupValues = null;
                    actionUser.MultiFieldValues = [];
                    var lookUpArray = JSON.parse(resultData["FieldBinderData"]);
                    actionUser.LookupDetails.LookupValues = lookUpArray;
                    actionUser.IsVisible = true;
                    actionUser.IsMandatory = true;
                    actionUser.FieldLabel = "Next Action Point User(s)";
                    contextObj.initiateValidation(actionUser); /*Do not comment this line without discussing and proper testing*/
                }
                else {
                    actionUser.IsVisible = false;
                    actionUser.IsMandatory = false;
                    actionUser.HasValidationError = false;
                    contextObj.initiateValidation(actionUser);
                    actionUser.LookupDetails.LookupValues = [];
                    actionUser.MultiFieldValues = [];
                }
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
    /***********************************************************************************************************
    * Function:     getEditableFields
    * Description:  Gets the fields which are editable for requester for the selected Worktype
    * Comments:     Fields which are editable and other fields are removed from fieldDetailsAddTemp except
    *               Priority and Expected Date of Completion since conflict in HTML Side.
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.getEditableFields = function (workTypeId) {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push({
            ReportFieldId: 5873,
            Value: workTypeId
        });
        contextObj.workOrderService.getValuesWithDbObjectDetails(50699, JSON.stringify(tempArray)).subscribe(function (resultData) {
            //  alert("2");
            var editableFields = JSON.parse(resultData["Data"]);
            var reportFields = [];
            var entitycategoryid = (contextObj.entityCategoryId != 3 ? 1 : 3);
            for (var _i = 0, _a = contextObj.fieldDetailsAdd; _i < _a.length; _i++) {
                var item = _a[_i];
                var editableObject = editableFields.find(function (fieldItem) { return (fieldItem.ReportFieldId === item.ReportFieldId && entitycategoryid === fieldItem.EntityCategoryId); }); /* && (contextObj.entityCategoryId != 3 ? 1 : 3) == editableObject.EntityCategoryId) */
                if (editableObject) {
                    item.IsVisible = editableObject.Visible;
                    item.ReadOnlyMode = !editableObject.Editable;
                    item.IsEnabled = editableObject.Editable;
                    if (!item.IsVisible)
                        reportFields.push(item.ReportFieldId); /*Pushes the fields which are not editable to a temp array for removing*/
                }
            }
            for (var index = 0; index < contextObj.fieldDetailsAdd.length; index++) {
                if ((reportFields.indexOf(contextObj.fieldDetailsAdd[index].ReportFieldId) != -1) && contextObj.fieldDetailsAdd[index].ReportFieldId > 1000000) {
                    contextObj.fieldDetailsAdd.splice(index, 1); /*Removes the additional data fields which are not editable*/
                    index -= 1;
                }
            }
            //contextObj.fieldDetailsAdd = undefined;
            setTimeout(function () {
                //contextObj.fieldDetailsAdd = contextObj.fieldDetailsAddTemp;
                contextObj.checkAndLoadBuildingIfOnly1Site();
                var Site = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 1302;
                });
                contextObj.getActionPointUserLookupValues(workTypeId, Site.FieldValue);
                var fieldfilter = contextObj.fieldDetailsAdd.filter(function (item) {
                    return item.ReportFieldId >= 1000000;
                });
                contextObj.fieldDetailsAddAdditionalDataFld = [];
                contextObj.fieldDetailsAddAdditionalDataFld = contextObj.fieldDetailsAddAdditionalDataFld.concat(fieldfilter);
                for (var _i = 0, _a = contextObj.fieldDetailsAddAdditionalDataFld; _i < _a.length; _i++) {
                    var item2 = _a[_i];
                    if (item2.IsMandatory) {
                        item2.IsLocallyValidated = false;
                        contextObj.initiateValidation(item2);
                    }
                }
                contextObj.removeAdditionalDataFields();
            }, 100);
        });
    };
    /***********************************************************************************************************
    * Function:     updateFiedlValueForRequester
    * Description:  Sets and Clears requester details while changing Requester Radio button
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.updateFiedlValueForRequester = function (fieldDetailsArray, value) {
        var contextObj = this;
        fieldDetailsArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 1369:
                    item.FieldValue = value == "15" ? '' : contextObj.userDetails.UserFirstName;
                    item.IsVisible = true;
                    item.IsMandatory = value == "15";
                    item.IsEnabled = value == "15" ? true : false;
                    item.IsLocallyValidated = !item.IsMandatory;
                    contextObj.initiateValidation(item);
                    break;
                case 1370:
                    item.FieldValue = value == "15" ? '' : contextObj.userDetails.UserMiddleName;
                    item.IsVisible = true;
                    item.IsEnabled = value == "15" ? true : false;
                    break;
                case 1371:
                    item.FieldValue = value == "15" ? '' : contextObj.userDetails.UserLastName;
                    item.IsMandatory = value == "15";
                    item.IsVisible = true;
                    item.IsEnabled = value == "15" ? true : false;
                    item.IsLocallyValidated = !item.IsMandatory;
                    contextObj.initiateValidation(item);
                    break;
                case 1374:
                    item.FieldValue = value == "15" ? '' : contextObj.userDetails.UserEmail;
                    item.IsVisible = true;
                    item.IsMandatory = value == "15";
                    item.IsEnabled = value == "15" ? true : false;
                    item.IsLocallyValidated = !item.IsMandatory;
                    contextObj.initiateValidation(item);
                    break;
                case 7807:
                    item.FieldValue = value == "15" ? '' : contextObj.userDetails.UserPhoneNo;
                    item.IsVisible = value == "15" ? false : true;
                    item.IsMandatory = false;
                    item.IsEnabled = false;
                    contextObj.initiateValidation(item);
                    break;
            }
        });
    };
    /***********************************************************************************************************
    * Function:     updateFieldValuesForHoldDetails
    * Description:  Sets and Clears Hold details while changing On Hold Checkbox
    * Comments:     Once On Hold, Hold Reason and Hold Date are disabled.
    *               StatusId '22' is 'On Hold'
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.updateFieldValuesForHoldDetails = function (fieldDetailsArray, isChecked) {
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
    /***********************************************************************************************************
    * Function:     updateFieldValuesForDateOfCompletion
    * Description:  Enables, Sets and Clears Date of Completion details while action selected is 'Complete'
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.updateFieldValuesForDateOfCompletion = function (item, value) {
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
    ReviewServiceRequestComponent.prototype.updateFieldValuesForWorkInProgress = function (item, value) {
        item.IsEnabled = item.IsVisible = item.IsMandatory = item.HasValidationError = value == 18 ? true : false;
        item.FieldValue = item.IsEnabled ? this.getDateTimeString(null) : "";
        item.IsLocallyValidated = false;
        this.initiateValidation(item);
    };
    ReviewServiceRequestComponent.prototype.popupItemEmit = function (event) {
        console.log(event);
        var contextObj = this;
        contextObj.btnName = "Save";
        contextObj.workOrderService.getHoldReasonFields().subscribe(function (resultData) {
            contextObj.holdReasonAddFields = resultData["Data"];
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    ReviewServiceRequestComponent.prototype.onReasonHoldAddSubmit = function (event) {
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
    ReviewServiceRequestComponent.prototype.onLinkClick = function (event) {
        this.linkClick.emit(event);
    };
    ReviewServiceRequestComponent.prototype.getDateTimeString = function (value) {
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
    ReviewServiceRequestComponent.prototype.initiateValidation = function (fieldObject) {
        var contextObj = this;
        var el = document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    ReviewServiceRequestComponent.prototype.updateFieldDetailsForAdd = function (fieldDetailsArray, workType) {
        debugger;
        var contextObj = this;
        for (var _i = 0, fieldDetailsArray_1 = fieldDetailsArray; _i < fieldDetailsArray_1.length; _i++) {
            var item = fieldDetailsArray_1[_i];
            switch (item.ReportFieldId) {
                case 1492:
                    item.IsVisible = false;
                    break;
                case 1367:
                    item.IsVisible = false;
                    break;
                case 5834:
                    item.IsVisible = false;
                    break;
                case 7521:
                    item.IsVisible = false;
                    break;
                case 12254:
                    item.IsVisible = false;
                    item.FieldLabel = "Next Action Point User(s)";
                    break;
                case 5988:
                    item.IsVisible = false;
                    break;
                case 1478:
                    item.IsVisible = false;
                    break;
                case 5978:
                    item.IsVisible = false;
                    break;
                case 5873:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = workType;
                    if (item.LookupDetails == null || item.LookupDetails.LookupValues == null || item.LookupDetails.LookupValues.length == 0)
                        contextObj.notificationService.ShowToaster("No Work Types exist", 2);
                    break;
                case 1471:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = "";
                    break;
                case 1369:
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserFirstName;
                    break;
                case 1370:
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserMiddleName;
                    break;
                case 1371:
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserLastName;
                    break;
                case 1486:
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    break;
                case 1374:
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserEmail;
                    break;
                case 1488:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = (item.LookupDetails.LookupValues && item.LookupDetails.LookupValues.length > 0) ? item.LookupDetails.LookupValues[0].Id.toString() : "-1";
                    break;
                case 1487:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    var date = new Date();
                    date.setDate(date.getDate() + 1);
                    item.FieldValue = contextObj.getFormattedDate(date.toDateString());
                    break;
                case 489:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    break;
                case 487:
                    item.IsVisible = true;
                    item.FieldValue = "-1";
                    break;
                case 539:
                    item.IsVisible = true;
                    item.FieldValue = "-1";
                    break;
                case 1372:
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = "14";
                    break;
                //Fields specially for For WorkOrder. Enables only in Review of WorkOrder
                case 1440:
                    item.IsVisible = false;
                    break;
                case 6562:
                    item.IsVisible = false;
                    break;
                case 6202:
                    item.IsVisible = false;
                    break;
                case 6201:
                    item.IsVisible = false;
                    break;
                case 6203:
                    item.IsVisible = false;
                    break;
                case 7807:
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserPhoneNo;
                    break;
            }
        }
        ;
        return fieldDetailsArray;
    };
    ReviewServiceRequestComponent.prototype.getFormattedDate = function (value) {
        var strDate = "";
        var date;
        if (value != undefined) {
            date = new Date(value);
        }
        else {
            date = new Date();
        }
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        strDate = dd + " " + mon + " " + yy;
        console.log(strDate.length);
        return strDate;
    };
    ReviewServiceRequestComponent.prototype.emitKeyUp = function (value) {
    };
    /***********************************************************************************************************
    * Function:     txtBoxChanges
    * Description:  Fires when textbox changes.
    * Comments:     Logic done to limit numeric values to 2 decimal points.
    *               Done for Time Spent.
    *
    ************************************************************************************************************/
    ReviewServiceRequestComponent.prototype.txtBoxChanges = function (value) {
        if (value.fieldObject.ReportFieldId == 7521) {
            value.fieldObject.FieldValue = round(value.fieldObject.FieldValue, 2, value.fieldObject.MaxLength);
            function round(str, strRoundTo, max) {
                if (str != 0 && Number(str)) {
                    str = str.toString();
                    str = str.split(".");
                    str[0] = str[0] ? Number(str[0]).toString() : "0";
                    str[1] = str.length > 1 && str[1] ? str[1].substring(0, strRoundTo) + (str[1].length > 1 ? "" : repeat("0", strRoundTo - 1)) : repeat("0", strRoundTo);
                    str[1] = str[1].length == strRoundTo ? str[1] : str[1] + repeat("0", strRoundTo - str[1].length);
                    str = str.join(".");
                }
                else {
                    str = str == 0 ? "0." + repeat("0", strRoundTo) : str;
                    return str;
                }
                str = (endsWith(str.substring(0, max), ".") ? str.substring(0, max - 1) : str.substring(0, max));
                return (endsWith(str, ".")) ? str.substring(0, str.length - 1) : str;
                function repeat(str, cnt) {
                    var e = str;
                    cnt = cnt || 1;
                    str = str != 0 && str ? str.toString() : "0";
                    if (str != e)
                        return;
                    for (var i = 0; i < cnt - 1; i++) {
                        str += e;
                    }
                    return str;
                }
                function endsWith(str, searchStr, Position) {
                    if (!(Position < str.length))
                        Position = str.length;
                    else
                        Position |= 0;
                    return str.substr(Position - searchStr.length, searchStr.length) === searchStr;
                }
            }
        }
    };
    ReviewServiceRequestComponent.prototype.chkBoxChange = function (value) {
        this.updateFieldValuesForHoldDetails(this.fieldDetailsAdd, value.IsChecked);
        this.isOnHold = value.IsChecked;
    };
    ReviewServiceRequestComponent.prototype.rbtnChange = function (value) {
        if (value.fieldobject.FieldLabel == "Requester") {
            this.updateFiedlValueForRequester(this.fieldDetailsAdd, value.fieldobject.FieldValue);
            var updatedData = new Array(); /*To notify the watcher about the change*/
            updatedData = updatedData.concat(this.fieldDetailsAdd);
            this.fieldDetailsAdd = updatedData;
        }
    };
    ReviewServiceRequestComponent.prototype.showComponent = function (fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    };
    ReviewServiceRequestComponent.prototype.onSubmit = function (form, value) {
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
            return fieldObject.HasValidationError && fieldObject.IsVisible;
        };
        if (this.fieldDetailsAdd.find(checkForErrors)) {
            return;
        }
        contextObj.checkAdditionalDataFieldsValid();
        if (contextObj.fieldDetailsAddAdditionalDataFld.find(checkForErrors)) {
            return;
        }
        this.reportFieldArray = this.generFun.getFieldValuesAsReportFieldArray(this.fieldDetailsAdd);
        var tempArray = JSON.parse(this.reportFieldArray);
        tempArray = tempArray.concat(JSON.parse(this.generFun.getFieldValuesAsReportFieldArray(this.fieldDetailsAddAdditionalDataFld)));
        this.reportFieldArray = JSON.stringify(tempArray);
        var isValid = true;
        if (isValid == true) {
            this.onSubmitDataClick(this.reportFieldArray);
        }
        else {
        }
    };
    ReviewServiceRequestComponent.prototype.checkAdditionalDataFieldsValid = function () {
        for (var _i = 0, _a = this.fieldDetailsAddAdditionalDataFld; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.HasValidationError == true) {
                var input = null;
                if (item.DataEntryControlId == 5) {
                    input = document.getElementById(item.LookupDetails.LookupValues[0].Id.toString());
                }
                else {
                    input = document.getElementById(item.FieldId.toString());
                }
                if (this.fieldDetailsAddAdditionalDataFld != undefined) {
                    if (input != undefined) {
                        this._renderer.invokeElementMethod(input, 'focus');
                        break;
                    }
                }
            }
        }
    };
    ReviewServiceRequestComponent.prototype.onkeyPressLinkClick = function (e, array) {
        if (!e)
            e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            this.onLinkClick(array);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewServiceRequestComponent.prototype, "linkClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewServiceRequestComponent.prototype, "submitClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewServiceRequestComponent.prototype, "requesterPermissionUpdate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReviewServiceRequestComponent.prototype, "siteSelected", void 0);
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], ReviewServiceRequestComponent.prototype, "input", void 0);
    ReviewServiceRequestComponent = __decorate([
        core_1.Component({
            selector: 'review-ServiceRequests',
            templateUrl: 'app/Views/WorkOrder/Review/reviewServiceRequests.component.html',
            providers: [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, validation_service_1.ValidateService, General_1.GeneralFunctions, common_service_1.CommonService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, split_view_component_1.SplitViewComponent, textareacomponent_component_1.TextAreaComponent, stringtextbox_component_1.StringTextBoxComponent, dropdownlistcomponent_component_1.DropDownListComponent, radiocomponent_component_1.CustomRadioComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, listboxcomponent_component_1.ListBoxComponent,
                datecomponent_component_1.DateComponent, datetimecomponent_component_1.DateTimeComponent, core_1.forwardRef(function () { return createrequest_root_component_1.CreateServiceRequestComponent; }), slide_component_1.SlideComponent],
            inputs: ['inputItems', 'action', 'boolcheck', 'fieldDetailsAdd', 'btnName', 'linkArray', 'userDetails', 'entityCategoryId', 'outComeData', 'isInProgressSubscribed', 'totalCostItems', 'allowSubmit'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, validation_service_1.ValidateService, General_1.GeneralFunctions, core_1.ElementRef, core_1.Renderer, common_service_1.CommonService])
    ], ReviewServiceRequestComponent);
    return ReviewServiceRequestComponent;
}());
exports.ReviewServiceRequestComponent = ReviewServiceRequestComponent;
//# sourceMappingURL=reviewServiceRequests.component.js.map
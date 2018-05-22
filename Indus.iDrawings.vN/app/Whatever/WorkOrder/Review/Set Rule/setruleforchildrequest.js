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
var workorder_service_1 = require('../../../../Models/WorkOrder/workorder.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var checkboxcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var radiocomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component');
var listboxcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var SetRuleForChildRequest = (function () {
    function SetRuleForChildRequest(notificationService, workOrderService) {
        this.notificationService = notificationService;
        this.workOrderService = workOrderService;
        this.noRuleRadio = undefined;
        this.actionPointRadio = undefined;
        this.parentRadio = undefined;
        this.actionPointListboxData = undefined;
        this.discardcheckbox = undefined;
        this.submitSuccess = new core_1.EventEmitter();
        this.isCheckboxChecked = false;
        this.IsActionPoint = false;
        this.ParentEntityId = 0;
        this.workRequestId = 0;
        this.WorkflowEntityRelationshipId = 0;
        this.StatusId = 16;
        this.checkedActionPoints = [];
        this.InitialData = undefined;
    }
    SetRuleForChildRequest.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.workOrderService.getSetRuleFields(contextObj.ParentEntityId, contextObj.workRequestId).subscribe(function (resultData) {
            if (resultData["Data"] != "[]") {
                contextObj.fieldDetails = resultData["Data"];
                contextObj.fieldDetails[0].FieldLabel = "";
                contextObj.fieldDetails[0].LookupDetails.LookupValues = [
                    {
                        "Id": 1,
                        "Value": "No Rule",
                    },
                    {
                        "Id": 2,
                        "Value": "Parent Request/Work Order cannot be completed before this request is completed",
                    },
                    {
                        "Id": 3,
                        "Value": "Complete this request before the parent request move from the selected Action Point ",
                    }
                ];
                contextObj.fieldDetails[0].FieldValue = "1";
                contextObj.noRuleRadio = contextObj.fieldDetails[0];
                contextObj.actionPointListboxData = contextObj.fieldDetails[3];
                contextObj.discardcheckbox = contextObj.fieldDetails[4];
                var dataTemp = contextObj.fieldDetails[3].LookupDetails.LookupValues;
                for (var count = 0; count < dataTemp.length; count++) {
                    if (dataTemp[count]["IsChecked"] == 1) {
                        contextObj.checkedActionPoints.push(dataTemp[count]["Id"].toString());
                    }
                }
                contextObj.actionPointListboxData.MultiFieldValues = contextObj.checkedActionPoints;
            }
            if (contextObj.workRequestId != 0) {
                contextObj.workOrderService.getUpdateRuleEditdata(contextObj.workRequestId).subscribe(function (resultData) {
                    contextObj.savedData = JSON.parse(resultData.Data.FieldBinderData)[0];
                    contextObj.savedWorkflowEntityRelationship = contextObj.savedData.WorkflowEntityRelationshipTypeId;
                    contextObj.savedHasRejectedSettings = contextObj.savedData.HasRejectedSettings;
                    if (contextObj.savedWorkflowEntityRelationship == "1") {
                        contextObj.fieldDetails[0].FieldValue = "1";
                        contextObj.IsActionPoint = false;
                    }
                    else if (contextObj.savedWorkflowEntityRelationship == "3") {
                        contextObj.fieldDetails[0].FieldValue = "3";
                        contextObj.IsActionPoint = true;
                    }
                    else if (contextObj.savedWorkflowEntityRelationship == "2") {
                        contextObj.fieldDetails[0].FieldValue = "2";
                        contextObj.IsActionPoint = false;
                    }
                    if (contextObj.savedHasRejectedSettings == true) {
                        contextObj.discardcheckbox.FieldValue = "true";
                    }
                    else {
                        contextObj.discardcheckbox.FieldValue = "false";
                    }
                    contextObj.workOrderService.getSelectedActionPointsRule(contextObj.ParentEntityId, contextObj.workRequestId).subscribe(function (resultData) {
                        if (resultData != undefined || resultData != null || resultData != "") {
                            contextObj.actionPointListboxData.MultiFieldValues = resultData;
                        }
                    });
                });
            }
            if (contextObj.InitialData != undefined) {
                contextObj.actionPointListboxData.MultiFieldValues = contextObj.InitialData.ActionPoint;
                contextObj.noRuleRadio.FieldValue = contextObj.InitialData.RadioButton.toString();
                contextObj.discardcheckbox.FieldValue = contextObj.InitialData.Checkbox.toString();
                if (contextObj.noRuleRadio.FieldValue == "3") {
                    contextObj.IsActionPoint = true;
                }
                else {
                    contextObj.IsActionPoint = false;
                    contextObj.actionPointListboxData.MultiFieldValues = null;
                }
            }
        });
    };
    SetRuleForChildRequest.prototype.onRadiobtnChange = function (event) {
        var contextObj = this;
        if (event.fieldobject.FieldValue == "3") {
            this.IsActionPoint = true;
        }
        else {
            this.IsActionPoint = false;
            this.actionPointListboxData.MultiFieldValues = null;
        }
    };
    SetRuleForChildRequest.prototype.discardchecked = function (event) {
        this.isCheckboxChecked = event.IsChecked;
    };
    SetRuleForChildRequest.prototype.onSubmitSet = function (event) {
        var contextObj = this;
        if (contextObj.WorkflowEntityRelationshipId == 0) {
            if (contextObj.noRuleRadio.FieldValue == "3" && contextObj.actionPointListboxData.MultiFieldValues.length == 0) {
                contextObj.notificationService.ShowToaster("Select at least one Parent Action Point", 2);
            }
            else {
                var arrayList = new Array();
                arrayList.push({
                    RadioButton: parseInt(contextObj.noRuleRadio.FieldValue),
                    ActionPoint: contextObj.actionPointListboxData.MultiFieldValues,
                    Checkbox: contextObj.isCheckboxChecked,
                });
                contextObj.submitSuccess.emit({ SetRuleData: arrayList });
                contextObj.notificationService.ShowToaster("Rule added", 2);
            }
        }
        else {
            var updateRuleArray = new Array();
            updateRuleArray.push({
                ReportFieldId: 7489,
                Value: this.workRequestId.toString()
            }, {
                ReportFieldId: 7490,
                Value: this.noRuleRadio.FieldValue.toString()
            }, {
                ReportFieldId: 7492,
                Value: (this.isCheckboxChecked) ? "1" : "0"
            }, {
                ReportFieldId: 7493,
                Value: this.StatusId.toString()
            }, {
                ReportFieldId: 5859,
                Value: this.ParentEntityId.toString()
            }, {
                ReportFieldId: 7494,
                Value: this.WorkflowEntityRelationshipId.toString()
            });
            if (contextObj.noRuleRadio.FieldValue == "3") {
                for (var count = 0; count < contextObj.actionPointListboxData.MultiFieldValues.length; count++) {
                    updateRuleArray.push({
                        ReportFieldId: 7495,
                        Value: contextObj.actionPointListboxData.MultiFieldValues[count].toString()
                    });
                }
            }
            var entityInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: updateRuleArray };
            var submitOutput = { WFEntityInput: entityInput, ParentFormId: 226, WFEntityDocumentInput: null };
            this.workOrderService.updateEditRuleSubmit(JSON.stringify(submitOutput)).subscribe(function (resultData) {
                if (resultData["Data"].StatusId == 1) {
                    contextObj.notificationService.ShowToaster("Rule Updated", 2);
                    contextObj.submitSuccess.emit({ SetRuleData: undefined });
                }
            });
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SetRuleForChildRequest.prototype, "submitSuccess", void 0);
    SetRuleForChildRequest = __decorate([
        core_1.Component({
            selector: 'setrule-childrequest',
            templateUrl: './app/Views/WorkOrder/Review/Set Rule/setruleforchildrequest.html',
            directives: [page_component_1.PageComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, radiocomponent_component_1.CustomRadioComponent, listboxcomponent_component_1.ListBoxComponent,],
            providers: [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService],
            inputs: ['ParentEntityId', 'workRequestId', 'WorkflowEntityRelationshipId', 'StatusId', 'InitialData'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, workorder_service_1.WorkOrdereService])
    ], SetRuleForChildRequest);
    return SetRuleForChildRequest;
}());
exports.SetRuleForChildRequest = SetRuleForChildRequest;
//# sourceMappingURL=setruleforchildrequest.js.map
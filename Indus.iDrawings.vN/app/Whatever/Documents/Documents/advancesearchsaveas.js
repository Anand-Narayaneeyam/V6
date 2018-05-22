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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var AdvanceSearchSaveAs = (function () {
    function AdvanceSearchSaveAs(DocumentService, _notificationService, generalFunctions) {
        this.DocumentService = DocumentService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.showSlide = false;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    AdvanceSearchSaveAs.prototype.ngOnInit = function () {
    };
    AdvanceSearchSaveAs.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
        }
    };
    AdvanceSearchSaveAs.prototype.postSubmit = function (strsubmitField, target) {
        debugger;
        var contextObj = this;
        var temp = JSON.parse(strsubmitField);
        var TempName = temp.find(function (item) { return item.ReportFieldId === 2144; });
        var CheckboxShare = temp.find(function (item) { return item.ReportFieldId === 6438; });
        var Name = TempName.Value;
        var ishare = CheckboxShare.Value == "false" ? 0 : 1;
        var reportfieldIdArray = [];
        var reportfieldIds = [];
        ReportfieldIdPush(2144, Name);
        ReportfieldIdPush(2145, 32);
        ReportfieldIdPush(2146, 1);
        ReportfieldIdPush(6438, ishare);
        var AdvanceSearchEntry = contextObj.advanceValues;
        for (var i = 0; i < AdvanceSearchEntry.length; i++) {
            var fieldValue = AdvanceSearchEntry[i].FieldValue;
            var ReportFieldIds = AdvanceSearchEntry[i].ReportFieldId;
            var GenericDataTypeId = AdvanceSearchEntry[i].GenericDataTypeId;
            if (fieldValue != null && fieldValue != undefined && fieldValue != "Ñµô¥¥ô" && fieldValue != "") {
                var Operator;
                var OperatorSymbols = fieldValue.split("µ")[0];
                if (OperatorSymbols == "Ñ") {
                    Operator = "LIKE";
                }
                else if (OperatorSymbols == "ü") {
                    Operator = ">";
                }
                else if (OperatorSymbols == "é") {
                    Operator = "<";
                }
                else if (OperatorSymbols == "æ") {
                    Operator = "BETWEEN";
                }
                else if (OperatorSymbols == "Ç") {
                    Operator = "=";
                }
                else if (OperatorSymbols == "Ѫє") {
                    Operator = "NOT EQUAL TO";
                }
                if (Operator == "LIKE")
                    var fieldValueSplit = fieldValue.split("¥")[1];
                else if (Operator == "BETWEEN")
                    var fieldValueSplit = fieldValue.split("ô")[1] + ", " + fieldValue.split("ô")[3];
                else
                    var fieldValueSplit = fieldValue.split("ô")[1];
                ReportfieldId(2139, ReportFieldIds, 4318, Operator, 4319, fieldValueSplit, 2141, "AND", 2138, 1);
            }
        }
        contextObj.DocumentService.AddSearches(JSON.stringify(reportfieldIdArray), JSON.stringify(reportfieldIds), this.selectedId, target).subscribe(function (resultData) {
            debugger;
            if (reportfieldIds.length == 0) {
                contextObj._notificationService.ShowToaster("Enter a Search condition", 5);
            }
            else if (resultData.StatusId == 1) {
                //  contextObj.advancelookupSaveAs.FieldValue = "-1";
                contextObj._notificationService.ShowToaster("Search added", 3);
                contextObj.submitSuccess.emit(resultData);
            }
            else if (resultData.StatusId == -1) {
                contextObj._notificationService.ShowToaster("Search name already exists", 5);
            }
            else {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
        function ReportfieldIdPush(Id, Value) {
            reportfieldIdArray.push({
                ReportFieldId: Id,
                Value: Value,
            });
        }
        function ReportfieldId(Id, IdValue, OperatorId, OperatorValue, FieldValueId, FieldValue, ConditionId, ConditionValue, ConditionIndexId, ConditionIndexValue) {
            reportfieldIds.push({
                ReportFieldId: Id,
                IdValue: IdValue,
                Operator: OperatorId,
                OperatorValue: OperatorValue,
                FieldValue: FieldValue,
                FieldValues: FieldValue,
                Condition: ConditionId,
                ConditioValue: ConditionValue,
                ConditionIndex: ConditionIndexId,
                ConditionIndexValue: ConditionIndexValue
            });
        }
    };
    AdvanceSearchSaveAs.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    AdvanceSearchSaveAs.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AdvanceSearchSaveAs.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AdvanceSearchSaveAs.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AdvanceSearchSaveAs.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AdvanceSearchSaveAs.prototype, "advanceValues", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AdvanceSearchSaveAs.prototype, "submitSuccess", void 0);
    AdvanceSearchSaveAs = __decorate([
        core_1.Component({
            selector: 'AdvanceSearchSaveAs',
            templateUrl: './app/Views/Documents/Documents/AdvanceSearchSaveAs.html',
            providers: [documents_service_1.DocumentService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'dataKey', 'advanceValues'],
        }), 
        __metadata('design:paramtypes', [documents_service_1.DocumentService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], AdvanceSearchSaveAs);
    return AdvanceSearchSaveAs;
}());
exports.AdvanceSearchSaveAs = AdvanceSearchSaveAs;
//# sourceMappingURL=advancesearchsaveas.js.map
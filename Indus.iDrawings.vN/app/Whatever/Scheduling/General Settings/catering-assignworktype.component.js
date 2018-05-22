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
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var CateringAssignWorkTypeComponent = (function () {
    function CateringAssignWorkTypeComponent(schedulingservice, _notificationService) {
        this.schedulingservice = schedulingservice;
        this._notificationService = _notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    CateringAssignWorkTypeComponent.prototype.ngOnInit = function () { };
    CateringAssignWorkTypeComponent.prototype.onSubmitData = function (event) {
        this.postSubmit(event["fieldobject"]);
        this.submitSuccess.emit({
            value: event["fieldobject"]
        });
    };
    CateringAssignWorkTypeComponent.prototype.postSubmit = function (strsubmitField) {
        var contextObj = this;
        var reportfieldvalue = JSON.parse(strsubmitField);
        var rptFieldArray = new Array();
        rptFieldArray.push({
            ReportFieldId: 8755,
            Value: reportfieldvalue[1].Value == -1 ? 0 : reportfieldvalue[1].Value
        });
        strsubmitField = JSON.stringify(rptFieldArray);
        contextObj.schedulingservice.updateAssignWorkTypeEdit(strsubmitField).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                contextObj._notificationService.ShowToaster("Work Type updated", 3);
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CateringAssignWorkTypeComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CateringAssignWorkTypeComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CateringAssignWorkTypeComponent.prototype, "submitSuccess", void 0);
    CateringAssignWorkTypeComponent = __decorate([
        core_1.Component({
            selector: 'catering-assignworktype',
            templateUrl: 'app/Views/Scheduling/General Settings/catering-assignworktype.component.html',
            providers: [scheduling_service_1.SchedulingService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService])
    ], CateringAssignWorkTypeComponent);
    return CateringAssignWorkTypeComponent;
}());
exports.CateringAssignWorkTypeComponent = CateringAssignWorkTypeComponent;
//# sourceMappingURL=catering-assignworktype.component.js.map
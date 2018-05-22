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
var datecomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var common_service_1 = require('../../../../Models/reports/common.service');
var SelectPeriodReportComponent = (function () {
    function SelectPeriodReportComponent(usersreportservice) {
        this.usersreportservice = usersreportservice;
        this.onSubmitClick = new core_1.EventEmitter();
        this.dateSelectorField = undefined;
    }
    SelectPeriodReportComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        contexObj.usersreportservice.UserReportdate().subscribe(function (resultData) {
            contexObj.dateSelectorField = resultData.Data;
        });
    };
    SelectPeriodReportComponent.prototype.onSubmit = function (event) {
        if (this.dateSelectorField[0].FieldValue != "" && this.dateSelectorField[1].FieldValue != "") {
            this.onSubmitClick.emit(this.dateSelectorField);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SelectPeriodReportComponent.prototype, "onSubmitClick", void 0);
    SelectPeriodReportComponent = __decorate([
        core_1.Component({
            selector: 'select-reportperiod',
            templateUrl: './app/Views/Reports/Common/SelectPeriod/select.period.report.component.html',
            directives: [datecomponent_component_1.DateComponent],
            providers: [common_service_1.CommonReportService]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], SelectPeriodReportComponent);
    return SelectPeriodReportComponent;
}());
exports.SelectPeriodReportComponent = SelectPeriodReportComponent;
//# sourceMappingURL=select.period.report.component.js.map
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
var page_component_1 = require('../../Framework/Whatever/Page/page.component');
var CommonReportComponent = (function () {
    function CommonReportComponent() {
    }
    CommonReportComponent.prototype.ngOnInit = function () {
        this.pagePath = "Reports";
    };
    CommonReportComponent = __decorate([
        core_1.Component({
            selector: 'common-report',
            templateUrl: 'app/Views/Reports/common.report.html',
            directives: [page_component_1.PageComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], CommonReportComponent);
    return CommonReportComponent;
}());
exports.CommonReportComponent = CommonReportComponent;
//# sourceMappingURL=common.report.component.js.map
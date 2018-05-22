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
var reportviewercomponent_1 = require('../../../Framework/Whatever/ReportViewer/reportviewercomponent');
var common_service_1 = require('../../../Models/reports/common.service');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var customreports_preview_1 = require('../../Reports/CustomReports/customreports-preview');
var router_1 = require('@angular/router');
var CustomReportComponent = (function () {
    function CustomReportComponent(commonreportservice, route, router) {
        this.commonreportservice = commonreportservice;
        this.route = route;
        this.router = router;
        this.reportTitle = "";
        this.reportId = 0;
        this.needPrefix = "False";
        this.dataForCustomReport = undefined;
        this.sub = 0;
        this.isNext = false;
    }
    CustomReportComponent.prototype.ngAfterViewInit = function () {
    };
    CustomReportComponent.prototype.ngDoCheck = function () {
        var oldValue = this.sub;
        this.sub = this.route.snapshot.params["t"];
        if (this.sub != oldValue) {
            this.isNext = false;
            this.sub = this.route.snapshot.params["t"];
            if (this.sub >= 2000) {
                var temp = this.sub - 2000;
                this.reportId = temp;
                var contexObj = this;
                setTimeout(function () {
                    contexObj.isNext = true;
                }, 1000);
            }
        }
    };
    CustomReportComponent = __decorate([
        core_1.Component({
            selector: 'custom-report',
            template: "\n        <custom-reportviewer *ngIf=\"isNext\" [isPreview]=\"false\" [reportId]=\"reportId\"></custom-reportviewer>\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, customreports_preview_1.CustomReportViewerComponent],
            providers: [common_service_1.CommonReportService],
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, router_1.ActivatedRoute, router_1.Router])
    ], CustomReportComponent);
    return CustomReportComponent;
}());
exports.CustomReportComponent = CustomReportComponent;
//# sourceMappingURL=customreports.component.js.map
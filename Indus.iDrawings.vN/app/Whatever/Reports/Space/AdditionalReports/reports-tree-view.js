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
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var floorselection_report_component_1 = require('../../Common/ReportFloorSelection/floorselection.report.component');
var reports_report_view_1 = require('./reports-report-view');
var router_1 = require('@angular/router');
var common_service_1 = require('../../../../Models/reports/common.service');
var AdditionalReportTreeComponent = (function () {
    function AdditionalReportTreeComponent(route, router, reportService) {
        this.route = route;
        this.router = router;
        this.reportService = reportService;
        this.next = undefined;
        this.selectedTab = 0;
        this.isInitialised = false;
        this.selectedCriteria = 3;
        this.ReportCategoryId = undefined;
        this.sub = 0;
        this.isFlooraenabled = false;
        this.deleteIndex = 0;
    }
    AdditionalReportTreeComponent.prototype.ngOnInit = function () {
    };
    AdditionalReportTreeComponent.prototype.ngDoCheck = function () {
        var contextObj = this;
        var oldValue = this.sub;
        this.sub = this.route.snapshot.params["t"];
        if (this.sub != oldValue) {
            this.sub = this.route.snapshot.params["t"];
            this.isFlooraenabled = false;
            if (this.isInitialised == true) {
                this.closeTab(1);
                this.isInitialised = false;
                this.selectedTab = 0;
                this.next = undefined;
            }
            if (this.sub >= 1000) {
                this.reportCategoryIdTemp = this.sub - 1000;
                this.ReportCategoryId = Number(this.sub);
                this.reportService.getAdditionalReportDetails(this.ReportCategoryId).subscribe(function (resultData) {
                    var temp = JSON.parse(resultData.FieldBinderData);
                    contextObj.reportFieldId = temp[0].Id;
                    contextObj.reportName = temp[0].Column1;
                    contextObj.isFlooraenabled = true;
                });
            }
        }
    };
    AdditionalReportTreeComponent.prototype.submit = function (value) {
        //  this.deleteIndex = undefined;
        this.isInitialised = false;
        this.next = value;
        var contexObj = this;
        setTimeout(function () {
            contexObj.isInitialised = true;
        }, 50);
        setTimeout(function () {
            contexObj.selectedTab = 1;
        }, 100);
    };
    AdditionalReportTreeComponent.prototype.getSelectedTab = function (event) {
        // this.selectedTab = event[0];
        // console.log('event:  ', event);
        // var contextObj = this
        //switch (event[0]) {
        //    case 0:
        //        if (event[1] && this.isInitialised) {
        //            this.closeTab(1);
        //            this.isInitialised = false;
        //        }
        //        break;
        //}
        this.selectedTab = event[0];
    };
    AdditionalReportTreeComponent.prototype.closeTab = function (index) {
        var contextObj = this;
        setTimeout(function () {
            contextObj.deleteIndex = index;
        }, 50);
        setTimeout(function () {
            contextObj.deleteIndex = 0;
        }, 50);
    };
    AdditionalReportTreeComponent = __decorate([
        core_1.Component({
            selector: 'additionalReportTree-report',
            templateUrl: './app/Views/Reports/Space/AdditionalReports/reports-tree-view.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, floorselection_report_component_1.FloorSelectionReportComponent, reports_report_view_1.AdditionalReportComponent],
            providers: [common_service_1.CommonReportService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, common_service_1.CommonReportService])
    ], AdditionalReportTreeComponent);
    return AdditionalReportTreeComponent;
}());
exports.AdditionalReportTreeComponent = AdditionalReportTreeComponent;
//# sourceMappingURL=reports-tree-view.js.map
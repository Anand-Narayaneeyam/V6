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
var space_netareadistribution_report_component_1 = require('../NetAreaDistribution/space.netareadistribution.report.component');
var SpaceNetAreaDistributionTreeComponent = (function () {
    function SpaceNetAreaDistributionTreeComponent() {
        this.next = undefined;
        this.selectedTab = 0;
        this.isInitialised = false;
        this.selectedCriteria = 3;
        this.ReportCategoryId = 91;
    }
    SpaceNetAreaDistributionTreeComponent.prototype.ngOnInit = function () {
    };
    SpaceNetAreaDistributionTreeComponent.prototype.submit = function (value) {
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
    SpaceNetAreaDistributionTreeComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
    };
    SpaceNetAreaDistributionTreeComponent = __decorate([
        core_1.Component({
            selector: 'spaceNetAreaDistributiontree-report',
            templateUrl: './app/Views/Reports/Space/NetAreaDistributionTree/space.netareadistributiontree.report.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, floorselection_report_component_1.FloorSelectionReportComponent, space_netareadistribution_report_component_1.SpaceNetAreaDistributionComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], SpaceNetAreaDistributionTreeComponent);
    return SpaceNetAreaDistributionTreeComponent;
}());
exports.SpaceNetAreaDistributionTreeComponent = SpaceNetAreaDistributionTreeComponent;
//# sourceMappingURL=space.netareadistributiontree.report.component.js.map
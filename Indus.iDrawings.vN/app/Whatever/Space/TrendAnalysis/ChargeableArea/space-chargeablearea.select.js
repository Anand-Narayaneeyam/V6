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
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../../Models/Common/General');
var space_service_1 = require('../../../../Models/Space/space.service');
var space_trend_reportviewer_1 = require('../TrendReport/space.trend.reportviewer');
var datecomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var SpaceChargeableAreaComponent = (function () {
    function SpaceChargeableAreaComponent(spaceService, notificationService, generFun) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.totalItems = 0;
        this.EndDate = "";
        this.StartDate = "";
        this.nextClicked = false;
        this.blnShowDate = false;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.nextEnabled = false;
        this.reportType = undefined;
        this.fromDate = "";
        this.toDate = "";
        this.ReportTitle = "Trend Analysis: Chargeable Area";
        this.selectedTab = 0;
        this.iscard = true;
        this.tabDeleteIndex = 0;
    }
    SpaceChargeableAreaComponent.prototype.ngOnInit = function () {
        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            }
        ];
        this.pagePath = "Space / Chargeable Area";
        var contextObj = this;
        contextObj.spaceService.trendAnalysisDateSelector().subscribe(function (resultData) {
            contextObj.dateSelectorField = resultData.Data;
            contextObj.spaceService.getSnapshotsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                contextObj.totalItems = result["Data"].DataCount;
                if (contextObj.totalItems < 2) {
                    contextObj.notificationService.ShowToaster('At least 2 snapshots are required to show', 2);
                    contextObj.enableMenu = [];
                }
                else {
                    contextObj.nextEnabled = true;
                    contextObj.enableMenu = [0];
                    contextObj.spaceService.getSnapshotsDates().subscribe(function (resultData) {
                        var date = JSON.parse(resultData.FieldBinderData);
                        contextObj.EndDate = date[0].EndDate.trim();
                        contextObj.StartDate = date[0].StartDate.trim();
                        for (var i = 0; i < contextObj.dateSelectorField.length; i++) {
                            if (i == 0) {
                                contextObj.dateSelectorField[i].FieldValue = date[0].StartDate.trim();
                                contextObj.blnShowDate = true;
                            }
                            if (i == 1) {
                                contextObj.dateSelectorField[1].FieldValue = date[0].EndDate.trim();
                                contextObj.blnShowDate = true;
                            }
                        }
                    });
                }
            });
        });
    };
    SpaceChargeableAreaComponent.prototype.onSubMenuChange = function (event) {
        this.nextClicked = false;
        this.fromDate = this.dateSelectorField[0].FieldValue;
        this.toDate = this.dateSelectorField[1].FieldValue;
        var toDate = new Date(this.toDate);
        var fromDate = new Date(this.fromDate);
        if (this.fromDate != "" && this.toDate != "") {
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('From Date must be less than or equal to To Date', 2);
            }
            else {
                this.reportType = 11;
                var contexObj = this;
                setTimeout(function () {
                    contexObj.nextClicked = true;
                }, 50);
                setTimeout(function () {
                    contexObj.selectedTab = 1;
                }, 100);
            }
        }
        else {
            return;
        }
    };
    SpaceChargeableAreaComponent.prototype.getSelectedTab = function (event) {
        if (event[0] == 0) {
            this.selectedTab = 0;
            if (event[1] == true && this.reportType != undefined) {
                this.nextClicked = false;
                var contextObj = this;
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 1;
                    contextObj.reportType = undefined;
                }, 50);
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 0;
                }, 50);
            }
        }
    };
    SpaceChargeableAreaComponent = __decorate([
        core_1.Component({
            selector: 'spaceChargeableArea',
            templateUrl: './app/Views/Space/TrendAnalysis/ChargeableArea/space-chargeablearea.select.html',
            directives: [notify_component_1.Notification, slide_component_1.SlideComponent, space_trend_reportviewer_1.SpaceTrendReportViewer, datecomponent_component_1.DateComponent, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu],
            providers: [space_service_1.SpaceService, notify_service_1.NotificationService],
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], SpaceChargeableAreaComponent);
    return SpaceChargeableAreaComponent;
}());
exports.SpaceChargeableAreaComponent = SpaceChargeableAreaComponent;
//# sourceMappingURL=space-chargeablearea.select.js.map
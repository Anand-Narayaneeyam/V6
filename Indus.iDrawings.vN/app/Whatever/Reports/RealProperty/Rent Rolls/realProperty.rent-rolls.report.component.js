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
var common_service_1 = require('../../../../Models/reports/common.service');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var realProperty_rent_rolls_report_list_component_1 = require('./realProperty.rent-rolls.report.list.component');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var realproperty_service_1 = require('../../../../Models/RealProperty/realproperty.service');
var datecomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var realPropertyRentRollsReport = (function () {
    function realPropertyRentRollsReport(commonreportservice, notificationService, realPropertyService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.realPropertyService = realPropertyService;
        this.onSubmitClick = new core_1.EventEmitter();
        this.selectedTab = 0;
        this.blnShowDate = true;
        this.iscard = true;
        this.tabDeleteIndex = 0;
    }
    realPropertyRentRollsReport.prototype.ngOnInit = function () {
        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
        this.isNextClicked = false;
        this.pagePath = "Reports / Real property / Rent Rolls";
        var contextObj = this;
        contextObj.realPropertyService.rentRollsDateSelector().subscribe(function (resultData) {
            contextObj.dateSelectorField = resultData.Data;
            var date = new Date();
            var year = date.getFullYear();
            contextObj.dateSelectorField[0].FieldValue = "01 JAN " + year;
            contextObj.dateSelectorField[1].FieldValue = "01 DEC " + year;
        });
    };
    //onNextClick(event) {
    //    this.isNextClicked = false;
    //    this.fromDate = this.dateSelectorField[0].FieldValue;
    //    this.toDate = this.dateSelectorField[1].FieldValue;
    //    var toDate = new Date(this.toDate);
    //    var fromDate = new Date(this.fromDate);
    //    this.ToDateInput = toDate;
    //    this.FromDateInput = fromDate;
    //    if (toDate < fromDate) {
    //        this.notificationService.ShowToaster('From Date must be less than To Date', 2);
    //    }
    //    else {
    //      //  this.isNextClicked = true;
    //        var contexObj = this;
    //        setTimeout(function () {
    //          contexObj.isNextClicked = true;
    //        }, 50);
    //        setTimeout(function () {
    //            contexObj.selectedTab = 1;
    //        }, 100);
    //    }
    //}
    realPropertyRentRollsReport.prototype.onSubMenuChange = function (event) {
        this.isNextClicked = false;
        this.fromDate = this.dateSelectorField[0].FieldValue;
        this.toDate = this.dateSelectorField[1].FieldValue;
        var toDate = new Date(this.toDate);
        var fromDate = new Date(this.fromDate);
        this.ToDateInput = toDate;
        this.FromDateInput = fromDate;
        if (this.fromDate != "" && this.toDate != "") {
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('From Date must be less than To Date', 2);
            }
            else {
                //  this.isNextClicked = true;
                var contexObj = this;
                setTimeout(function () {
                    contexObj.isNextClicked = true;
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
    realPropertyRentRollsReport.prototype.getSelectedTab = function (event) {
        //this.selectedTab = event[0];
        //var contextObj = this;
        //if (event[0] == 1) {
        //    contextObj.isNextClicked = true;
        //}
        //if (this.isNextClicked) {
        //    setTimeout(function () {
        //        contextObj.tabDeleteIndex = 1;
        //        this.isNextClicked = false;
        //    }, 50);
        //    setTimeout(function () {
        //        contextObj.tabDeleteIndex = 1;
        //    }, 50);
        //}
        if (event[0] == 0) {
            this.selectedTab = 0;
            if (event[1] == true && this.isNextClicked == true) {
                this.isNextClicked = false;
                var contextObj = this;
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 1;
                    contextObj.isNextClicked = false;
                }, 50);
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 0;
                }, 50);
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], realPropertyRentRollsReport.prototype, "onSubmitClick", void 0);
    realPropertyRentRollsReport = __decorate([
        core_1.Component({
            selector: 'realProperty.RentRolls.report',
            templateUrl: './app/Views/Reports/RealProperty/Rent Rolls/realProperty.rent-rolls.report.component.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService, realproperty_service_1.RealPropertyService],
            directives: [paging_component_1.PagingComponent, notify_component_1.Notification, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, realProperty_rent_rolls_report_list_component_1.realPropertyRentRollsReportList, datecomponent_component_1.DateComponent, submenu_component_1.SubMenu]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService, realproperty_service_1.RealPropertyService])
    ], realPropertyRentRollsReport);
    return realPropertyRentRollsReport;
}());
exports.realPropertyRentRollsReport = realPropertyRentRollsReport;
//# sourceMappingURL=realProperty.rent-rolls.report.component.js.map
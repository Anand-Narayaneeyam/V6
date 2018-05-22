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
var common_service_1 = require('../../../../../Models/reports/common.service');
var notify_component_1 = require('../../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../../Framework/Models/Notification/notify.service');
var stringtextbox_component_1 = require('../../../../../framework/whatever/dynamiccontrols/dynamicfields/stringtextbox.component');
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var page_component_1 = require('../../../../../Framework/Whatever/Page/page.component');
var wo_pmnumberrange_report_component_1 = require('./wo.pmnumberrange.report.component');
var tabs_component_1 = require('../../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../../Framework/Whatever/Submenu/submenu.component');
var WOPMNumberRangeReportSelect = (function () {
    function WOPMNumberRangeReportSelect(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.isNextClicked = false;
        this.fieldnumberfrom = undefined;
        this.fieldnumberto = undefined;
        this.ddlWorkType = undefined;
        this.NumberFrom = 0;
        this.NumberTo = 0;
        this.WorkTypeId = 0;
        this.selectedTab = 0;
        this.WorkTypeName = "";
        this.isnext = undefined;
        this.iscard = true;
        this.tabDeleteIndex = 0;
    }
    WOPMNumberRangeReportSelect.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Work Order / PM Work Orders / Work Orders by Number Range";
        var contextObj = this;
        this.commonreportservice.getSRNumberRangeReportFields().subscribe(function (result) {
            contextObj.fieldnumberfrom = result.Data[0];
            contextObj.fieldnumberto = result.Data[1];
            contextObj.ddlWorkType = result.Data[2];
            contextObj.getdata();
        });
        contextObj.alignContent = "horizontal";
    };
    WOPMNumberRangeReportSelect.prototype.getdata = function () {
        var contextObj = this;
        this.commonreportservice.ddlgetPMWorkTypeReportLookups(0).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlWorkType.FieldValue = "-1";
        });
    };
    WOPMNumberRangeReportSelect.prototype.onChangeWorkType = function (event) {
        this.WorkTypeId = event;
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
    };
    WOPMNumberRangeReportSelect.prototype.onSubMenuChange = function (event) {
        this.isnext = undefined;
        this.isNextClicked = false;
        if (this.fieldnumberfrom.HasValidationError || this.fieldnumberto.HasValidationError || this.WorkTypeId == undefined || this.WorkTypeName == "" || this.WorkTypeId == -1) {
            this.isNextClicked = false;
        }
        else {
            this.NumberFrom = Number(this.fieldnumberfrom.FieldValue);
            this.NumberTo = Number(this.fieldnumberto.FieldValue);
            if (this.NumberTo < this.NumberFrom) {
                this.notificationService.ShowToaster('Work Order Number From must be less than or equal to Work Order Number To', 2);
            }
            else {
                this.isnext = 1;
                var contexObj = this;
                setTimeout(function () {
                    contexObj.isNextClicked = true;
                }, 50);
                setTimeout(function () {
                    contexObj.selectedTab = 1;
                }, 100);
            }
        }
    };
    WOPMNumberRangeReportSelect.prototype.getSelectedTab = function (event) {
        if (event[0] == 0) {
            this.selectedTab = 0;
            if (event[1] == true && this.isnext != undefined) {
                this.isNextClicked = false;
                var contextObj = this;
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 1;
                    contextObj.isnext = undefined;
                }, 50);
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 0;
                }, 50);
            }
        }
    };
    WOPMNumberRangeReportSelect = __decorate([
        core_1.Component({
            selector: 'wo-pmnumberrange-report',
            templateUrl: './app/Views/Reports/WorkOrder/PM/NumberRange/wo.pmnumberrange.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, stringtextbox_component_1.StringTextBoxComponent, dropdownlistcomponent_component_1.DropDownListComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, wo_pmnumberrange_report_component_1.WOPMNumberRangeReportComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], WOPMNumberRangeReportSelect);
    return WOPMNumberRangeReportSelect;
}());
exports.WOPMNumberRangeReportSelect = WOPMNumberRangeReportSelect;
//# sourceMappingURL=wo.pmnumberrange.report.select.js.map
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
var page_component_1 = require('../../../../../Framework/Whatever/Page/page.component');
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var datecomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var tabs_component_1 = require('../../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../../Framework/Whatever/Submenu/submenu.component');
var wo_srstatusbasedreports_component_1 = require('./wo.srstatusbasedreports.component');
var validation_service_1 = require('../../../../../Framework/Models/Validation/validation.service');
var WOSRStausBasedReportsSelect = (function () {
    function WOSRStausBasedReportsSelect(commonreportservice, notificationService, _validateService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this._validateService = _validateService;
        this.isNextClicked = false;
        this.ddlWorkType = undefined;
        this.ddlStatus = undefined;
        this.StatusId = 0;
        this.WorkTypeId = 0;
        this.EntityCategoryId = 0;
        this.WorkTypeName = "";
        this.StatusName = "";
        this.selectedTab = 0;
        this.isnext = undefined;
        this.iscard = true;
        this.tabDeleteIndex = 0;
    }
    WOSRStausBasedReportsSelect.prototype.ngOnInit = function () {
        var contextObj = this;
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
        this.pagePath = "Reports / Work Order / Service Requests / Status based Reports";
        this.commonreportservice.ddlgetSRStatusFields().subscribe(function (result) {
            contextObj.ddlStatus = result.Data[0];
            contextObj.ddlWorkType = result.Data[1];
            contextObj.getdata();
        });
        contextObj.alignContent = "horizontal";
    };
    WOSRStausBasedReportsSelect.prototype.getdata = function () {
        var contextObj = this;
        this.commonreportservice.ddlgetStatusLookups().subscribe(function (result) {
            contextObj.ddlStatus.LookupDetails.LookupValues = result.LookupValues;
        });
    };
    WOSRStausBasedReportsSelect.prototype.onChangeStatus = function (event) {
        this.StatusId = parseInt(event);
        this.WorkTypeId = -1;
        this.ddlWorkType.FieldValue = "-1";
        var contextObj = this;
        var lookUp = this.ddlStatus.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.StatusName = lookUp.Value;
        if (this.StatusName.indexOf("Requests") > -1) {
            this.EntityCategoryId = 1;
        }
        else if (this.StatusName.indexOf("Work Orders") > -1) {
            this.EntityCategoryId = 2;
        }
        this.commonreportservice.ddlgetWorkTypeLookupsforEntityCategory(contextObj.StatusId, contextObj.EntityCategoryId).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlWorkType.FieldValue = "-1";
        });
    };
    WOSRStausBasedReportsSelect.prototype.onChangeWorkType = function (event) {
        this.WorkTypeId = parseInt(event);
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
    };
    WOSRStausBasedReportsSelect.prototype.onSubMenuChange = function (event) {
        this.isnext = undefined;
        this.isNextClicked = false;
        if (this.ddlStatus.HasValidationError == true || this.ddlWorkType.HasValidationError == true || this.WorkTypeId == -1 || this.StatusId == -1) {
            this.isNextClicked = false;
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
    };
    WOSRStausBasedReportsSelect.prototype.getSelectedTab = function (event) {
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
    WOSRStausBasedReportsSelect = __decorate([
        core_1.Component({
            selector: 'srstatusbased-selector',
            templateUrl: './app/Views/Reports/WorkOrder/SR/SRStausBasedReports/wo.srstatusbasedreports.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, dropdownlistcomponent_component_1.DropDownListComponent, datecomponent_component_1.DateComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, wo_srstatusbasedreports_component_1.WOSRStatusBasedReportComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], WOSRStausBasedReportsSelect);
    return WOSRStausBasedReportsSelect;
}());
exports.WOSRStausBasedReportsSelect = WOSRStausBasedReportsSelect;
//# sourceMappingURL=wo.srstatusbasedreports.select.js.map
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
var wo_sractionpointstatusreports_component_1 = require('./wo.sractionpointstatusreports.component');
var validation_service_1 = require('../../../../../Framework/Models/Validation/validation.service');
var WOSRActionPointStatusReportsSelect = (function () {
    function WOSRActionPointStatusReportsSelect(commonreportservice, notificationService, _validateService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this._validateService = _validateService;
        this.isNextClicked = false;
        this.ddlWorkType = undefined;
        this.ddlActionPoint = undefined;
        this.ActionPointId = 0;
        this.WorkTypeId = 0;
        this.WorkTypeName = "";
        this.selectedTab = 0;
        this.isnext = undefined;
        this.iscard = true;
        this.tabDeleteIndex = 0;
    }
    WOSRActionPointStatusReportsSelect.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Work Order / Service Requests / Requests based on Action Point";
        this.commonreportservice.ddlgetSRActionTypeStatusFields().subscribe(function (result) {
            contextObj.ddlWorkType = result.Data[0];
            contextObj.ddlActionPoint = result.Data[1];
            contextObj.getdata();
        });
        contextObj.alignContent = "horizontal";
    };
    WOSRActionPointStatusReportsSelect.prototype.getdata = function () {
        var contextObj = this;
        this.commonreportservice.ddlgetWorkTypeLookups(0).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
        });
    };
    WOSRActionPointStatusReportsSelect.prototype.onChangeWorkType = function (event) {
        this.WorkTypeId = parseInt(event);
        this.ActionPointId = -1;
        this.ddlActionPoint.FieldValue = "-1";
        var contextObj = this;
        this.commonreportservice.ddlgetActionPointLookups(contextObj.WorkTypeId).subscribe(function (result) {
            contextObj.ddlActionPoint.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlActionPoint.FieldValue = "-1";
        });
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
    };
    WOSRActionPointStatusReportsSelect.prototype.onChangeActionPoint = function (event) {
        this.ActionPointId = parseInt(event);
    };
    WOSRActionPointStatusReportsSelect.prototype.onSubMenuChange = function (event) {
        this.isnext = undefined;
        this.isNextClicked = false;
        if (this.ddlActionPoint.HasValidationError == true || this.ddlWorkType.HasValidationError == true || this.WorkTypeId == -1 || this.ActionPointId == -1) {
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
    WOSRActionPointStatusReportsSelect.prototype.getSelectedTab = function (event) {
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
    WOSRActionPointStatusReportsSelect = __decorate([
        core_1.Component({
            selector: 'sractionpointstatus-selector',
            templateUrl: './app/Views/Reports/WorkOrder/SR/SRActionPointStatus/wo.sractionpointstatus.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, dropdownlistcomponent_component_1.DropDownListComponent, datecomponent_component_1.DateComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, wo_sractionpointstatusreports_component_1.WOSRActionPointStatusReportComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], WOSRActionPointStatusReportsSelect);
    return WOSRActionPointStatusReportsSelect;
}());
exports.WOSRActionPointStatusReportsSelect = WOSRActionPointStatusReportsSelect;
//# sourceMappingURL=wo.sractionpointstatusreports.select.js.map
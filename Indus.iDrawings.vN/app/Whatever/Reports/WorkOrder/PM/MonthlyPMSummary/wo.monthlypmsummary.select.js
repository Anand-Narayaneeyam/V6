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
var wo_monthlypmsummary_report_component_1 = require('./wo.monthlypmsummary.report.component');
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var datecomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var tabs_component_1 = require('../../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../../Framework/Whatever/Submenu/submenu.component');
var WOMonthlyPMSummarySelect = (function () {
    function WOMonthlyPMSummarySelect(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.isNextClicked = false;
        this.dateSelectorField = undefined;
        this.ddlWorkType = undefined;
        this.ddlEquipmentCategory = undefined;
        this.ddlEquipmentClass = undefined;
        this.ddlEquipmentNo = undefined;
        this.ScheduledFromDate = "";
        this.ScheduledToDate = "";
        this.StatusId = 0;
        this.WorkTypeId = 0;
        this.EquipmentCategoryId = 0;
        this.EquipmentClassId = 0;
        this.EquipmentNoId = 0;
        this.EquipmentCategoryName = "";
        this.EquipmentClassName = "";
        this.EquipmentNoName = "";
        this.WorkTypeName = "";
        this.DateRange = "";
        this.selectedTab = 0;
        this.isnext = undefined;
        this.iscard = true;
        this.tabDeleteIndex = 0;
    }
    WOMonthlyPMSummarySelect.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Work Order / PM Work Orders / Monthly PM Summary";
        var contextObj = this;
        this.commonreportservice.getMonthlySummary().subscribe(function (result) {
            contextObj.ddlWorkType = result.Data[0];
            contextObj.ddlEquipmentCategory = result.Data[1];
            contextObj.ddlEquipmentClass = result.Data[2];
            contextObj.ddlEquipmentNo = result.Data[3];
            var tempArray = new Array();
            tempArray.push(result.Data[4]);
            tempArray.push(result.Data[5]);
            contextObj.dateSelectorField = tempArray;
        });
        contextObj.alignContent = "horizontal";
    };
    WOMonthlyPMSummarySelect.prototype.getDropDownData = function (StatusId, WorkTypeId, EquipmentCategoryId, EquipmentClassId, dropDownType) {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push({
            ReportFieldId: 1992,
            Value: StatusId
        }, {
            ReportFieldId: 5861,
            Value: WorkTypeId
        }, {
            ReportFieldId: 7632,
            Value: EquipmentCategoryId
        }, {
            ReportFieldId: 4140,
            Value: EquipmentClassId
        });
        contextObj.commonreportservice.getEquipmentForReport(50820, JSON.stringify(tempArray)).subscribe(function (data) {
            if (contextObj.dropDownType == 1) {
                contextObj.ddlEquipmentCategory.LookupDetails.LookupValues = JSON.parse(data["Data"]["Table1"]);
            }
            else if (contextObj.dropDownType == 2) {
                contextObj.ddlEquipmentClass.LookupDetails.LookupValues = JSON.parse(data["Data"]["Table2"]);
            }
            else if (contextObj.dropDownType == 3) {
                contextObj.ddlEquipmentNo.LookupDetails.LookupValues = JSON.parse(data["Data"]["Table3"]);
            }
        });
    };
    WOMonthlyPMSummarySelect.prototype.onChangeWorkType = function (event) {
        this.ddlEquipmentCategory.FieldValue = "-1";
        this.ddlEquipmentClass.FieldValue = "-1";
        this.ddlEquipmentNo.FieldValue = "-1";
        this.ddlEquipmentCategory.LookupDetails.LookupValues = null;
        this.ddlEquipmentClass.LookupDetails.LookupValues = null;
        this.ddlEquipmentNo.LookupDetails.LookupValues = null;
        this.WorkTypeId = event;
        this.dropDownType = 1;
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
        this.getDropDownData(this.StatusId, this.WorkTypeId, this.EquipmentCategoryId, this.EquipmentClassId, this.dropDownType);
    };
    WOMonthlyPMSummarySelect.prototype.onChangeEquipmentCategory = function (event) {
        this.ddlEquipmentClass.FieldValue = "-1";
        this.ddlEquipmentNo.FieldValue = "-1";
        this.ddlEquipmentClass.LookupDetails.LookupValues = null;
        this.ddlEquipmentNo.LookupDetails.LookupValues = null;
        this.EquipmentCategoryId = event;
        this.dropDownType = 2;
        var lookUp = this.ddlEquipmentCategory.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.EquipmentCategoryName = lookUp.Value;
        this.getDropDownData(this.StatusId, this.WorkTypeId, this.EquipmentCategoryId, this.EquipmentClassId, this.dropDownType);
    };
    WOMonthlyPMSummarySelect.prototype.onChangeEquipmentClass = function (event) {
        this.ddlEquipmentNo.FieldValue = "-1";
        this.ddlEquipmentNo.LookupDetails.LookupValues = null;
        this.EquipmentClassId = event;
        this.dropDownType = 3;
        var lookUp = this.ddlEquipmentClass.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.EquipmentClassName = lookUp.Value;
        this.getDropDownData(this.StatusId, this.WorkTypeId, this.EquipmentCategoryId, this.EquipmentClassId, this.dropDownType);
        if (this.EquipmentClassId == 0) {
            this.EquipmentClassId = -1;
            this.EquipmentClassName = "";
        }
    };
    WOMonthlyPMSummarySelect.prototype.onChangeEquipmentNo = function (event) {
        this.EquipmentNoId = event;
        var lookUp = this.ddlEquipmentNo.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.EquipmentNoName = lookUp.Value;
        if (this.EquipmentNoId == 0) {
            this.EquipmentNoId = -1;
            this.EquipmentNoName = "";
        }
    };
    WOMonthlyPMSummarySelect.prototype.onSubMenuChange = function (event) {
        this.isnext = undefined;
        this.isNextClicked = false;
        this.ScheduledFromDate = this.dateSelectorField[0].FieldValue;
        this.ScheduledToDate = this.dateSelectorField[1].FieldValue;
        if (this.ScheduledFromDate != "" && this.ScheduledToDate != "") {
            this.DateRange = this.ScheduledFromDate + " to " + this.ScheduledToDate;
            var toDate = new Date(this.ScheduledToDate);
            var fromDate = new Date(this.ScheduledFromDate);
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('PM Scheduled From must be less than or equal to PM Scheduled To', 2);
            }
            else {
                var dateselectorFrom = this.dateSelectorField[0];
                var dateselectorTo = this.dateSelectorField[1];
                if (this.DateRange == "" || this.WorkTypeId == undefined || this.WorkTypeId == -1 || this.EquipmentCategoryId == undefined || this.EquipmentCategoryId == -1 || this.EquipmentClassId == undefined || this.ddlEquipmentClass.FieldValue == "-1" || this.EquipmentNoId == undefined || this.EquipmentCategoryName == "" || this.WorkTypeName == "" || dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError) {
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
            }
        }
    };
    WOMonthlyPMSummarySelect.prototype.getSelectedTab = function (event) {
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
    WOMonthlyPMSummarySelect = __decorate([
        core_1.Component({
            selector: 'pmmonthlysummary-selector',
            templateUrl: './app/Views/Reports/WorkOrder/PM/MonthlyPMSummary/wo.monthlypmsummary.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, wo_monthlypmsummary_report_component_1.WOMonthlyPMSummaryReportComponent, dropdownlistcomponent_component_1.DropDownListComponent, datecomponent_component_1.DateComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], WOMonthlyPMSummarySelect);
    return WOMonthlyPMSummarySelect;
}());
exports.WOMonthlyPMSummarySelect = WOMonthlyPMSummarySelect;
//# sourceMappingURL=wo.monthlypmsummary.select.js.map
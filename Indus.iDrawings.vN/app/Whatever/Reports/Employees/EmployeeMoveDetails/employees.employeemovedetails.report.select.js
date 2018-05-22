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
var datecomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var dropdownlistcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var employees_employeemovedetails_report_component_1 = require('./employees.employeemovedetails.report.component');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var EmployeeMoveDetailsSelect = (function () {
    function EmployeeMoveDetailsSelect(reportservice, notificationService) {
        this.reportservice = reportservice;
        this.notificationService = notificationService;
        this.StatusId = "0";
        this.EmployeeId = "0";
        this.ToDate = "";
        this.FromDate = "";
        this.dateSelectorField = undefined;
        this.ddlmoveStatus = undefined;
        this.ddlemployee = undefined;
        this.isNextClicked = false;
        this.DateFrom = "";
        this.DateTo = "";
        this.selectedTab = 0;
        this.isnext = undefined;
        this.iscard = true;
        this.tabDeleteIndex = 0;
    }
    EmployeeMoveDetailsSelect.prototype.ngOnInit = function () {
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
        var contexObj = this;
        contexObj.reportservice.getddlemployeemove().subscribe(function (resultData1) {
            contexObj.ddlmoveStatus = resultData1.Data[2];
            contexObj.ddlemployee = resultData1.Data[3];
            var tempArray = new Array();
            tempArray.push(resultData1.Data[0]);
            tempArray.push(resultData1.Data[1]);
            contexObj.dateSelectorField = tempArray;
            contexObj.dateSelectorField[0].IsMandatory = false;
            contexObj.dateSelectorField[1].IsMandatory = false;
        });
        this.pagePath = "Reports / Employees / Employee Move Details";
        contexObj.alignContent = "horizontal";
    };
    EmployeeMoveDetailsSelect.prototype.onChangeStatus = function (event) {
        switch (event) {
            case "19":
                this.StatusId = "13";
                break;
            case "20":
                this.StatusId = "17";
                break;
            case "21":
                this.StatusId = "27";
                break;
            case "22":
                this.StatusId = "34";
                break;
            case "23":
                this.StatusId = "39";
                break;
            default:
                this.StatusId = "0";
                break;
        }
    };
    EmployeeMoveDetailsSelect.prototype.onChangeEmployee = function (event) {
        this.EmployeeId = event;
    };
    EmployeeMoveDetailsSelect.prototype.onSubMenuChange = function (event) {
        this.isnext = undefined;
        this.isNextClicked = false;
        this.FromDate = this.dateSelectorField[0].FieldValue;
        this.ToDate = this.dateSelectorField[1].FieldValue;
        var toDate = new Date(this.DateTo);
        var fromDate = new Date(this.DateFrom);
        if (toDate < fromDate) {
            this.notificationService.ShowToaster('From Date must be less than or equal to To Date', 2);
        }
        else {
            var dateselectorFrom = this.dateSelectorField[0];
            var dateselectorTo = this.dateSelectorField[1];
            if (dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError) {
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
    };
    EmployeeMoveDetailsSelect.prototype.getSelectedTab = function (event) {
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
    EmployeeMoveDetailsSelect = __decorate([
        core_1.Component({
            selector: 'employee-MoveDetailsReport',
            templateUrl: './app/Views/Reports/Employee/EmployeeMoveDetails/employees.employeemovedetails.select.html',
            directives: [page_component_1.PageComponent, datecomponent_component_1.DateComponent, dropdownlistcomponent_component_1.DropDownListComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, employees_employeemovedetails_report_component_1.EmployeeMoveDetailsComponent],
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            styleUrls: ['app/Views/Reports/Employee/EmployeeMoveDetails/employeemove.css'] }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], EmployeeMoveDetailsSelect);
    return EmployeeMoveDetailsSelect;
}());
exports.EmployeeMoveDetailsSelect = EmployeeMoveDetailsSelect;
//# sourceMappingURL=employees.employeemovedetails.report.select.js.map
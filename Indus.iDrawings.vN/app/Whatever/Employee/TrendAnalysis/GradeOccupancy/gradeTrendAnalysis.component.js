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
var datecomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var employee_services_1 = require('../../../../models/employee/employee.services');
var listboxcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var gradeTrendAnalysis_chartview_1 = require('./gradeTrendAnalysis-chartview');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var stringtextbox_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var validation_service_1 = require('../../../../Framework/Models/Validation/validation.service');
var GradeTrendAnalysisComponent = (function () {
    //constructor(private notificationService: NotificationService, private generFun: GeneralFunctions, private empservice: EmployeeService) {
    //}
    function GradeTrendAnalysisComponent(notificationService, empservice, _validateService) {
        var _this = this;
        this.notificationService = notificationService;
        this.empservice = empservice;
        this._validateService = _validateService;
        this.selectedTab = 0;
        this.tabDeleteIndex = 0;
        this.EndDate = "";
        this.StartDate = "";
        this.nextClicked = false;
        this.blnShowDate = true;
        this.isTabClicked = false;
        this.fromDate = "";
        this.toDate = "";
        this.iscard = true;
        this.ListboxData = undefined;
        this.forecastFlag = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.foreCastingYear = "0";
        this.foreCastingValue = "0";
        this.tabname = "Trend";
        this.pagePath = "Employees / Occupancy by Grade over Time";
        this._validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
    }
    GradeTrendAnalysisComponent.prototype.ngOnInit = function () {
        this.menuData = [
            {
                "id": 0,
                "title": "Show Trend",
                "image": "Show Trend",
                "path": "Show Trend",
                "subMenu": null,
            },
            {
                "id": 1,
                "title": "Show Forecast for 3 years",
                "image": "Show Forecast",
                "path": "Show Forecast",
                "subMenu": null,
            }
        ];
        this.enableMenu = [];
        var contextObj = this;
        contextObj.empservice.getGradeTrendFields().subscribe(function (resultData) {
            contextObj.dateSelectorField = resultData.Data;
            if (resultData.Data[2].LookupDetails.LookupValues.length == 0) {
                contextObj.enableMenu = [];
                contextObj.notificationService.ShowToaster('No Data exists', 2);
            }
            else {
                var temp = resultData.Data[2];
                contextObj.ListboxData = temp;
            }
            var date = new Date();
            var year = date.getFullYear();
            contextObj.dateSelectorField[0].FieldValue = "01 JAN " + (year - 2);
            contextObj.dateSelectorField[1].FieldValue = "31 DEC " + year;
            contextObj.foreCastFieldObject = resultData["Data"].find(function (item) {
                if (item.FieldId == 2039)
                    return true;
                else
                    return false;
            });
        });
    };
    GradeTrendAnalysisComponent.prototype.getListBoxData = function (event) {
        if (event.fieldObject.MultiFieldValues != undefined) {
            if (event.fieldObject.MultiFieldValues.length == 0) {
                this.enableMenu = [];
            }
            else {
                this.enableMenu = [0, 1];
            }
        }
    };
    GradeTrendAnalysisComponent.prototype.onSubMenuChange = function (event) {
        var selectedClassIds = '';
        if (this.ListboxData.MultiFieldValues == null || this.ListboxData.MultiFieldValues.length == 0) {
            this.notificationService.ShowToaster("Select a Grade", 2);
        }
        else {
            for (var count = 0; count < this.ListboxData.MultiFieldValues.length; count++) {
                selectedClassIds = selectedClassIds + this.ListboxData.MultiFieldValues[count] + ',';
            }
            selectedClassIds = selectedClassIds.slice(0, -1);
            this.selectedIds = selectedClassIds;
            if (event.value == 0) {
                this.forecastFlag = false;
                this.showTrend();
            }
            else if (event.value == 1) {
                this.showForecast();
            }
        }
    };
    GradeTrendAnalysisComponent.prototype.showTrend = function () {
        var contextObj = this;
        this.isNextClicked = false;
        this.fromDate = this.dateSelectorField[0].FieldValue;
        this.toDate = this.dateSelectorField[1].FieldValue;
        var toDateComp = new Date(this.toDate);
        var fromDateComp = new Date(this.fromDate);
        //this.ToDateInput = toDate;
        //this.FromDateInput = fromDate;
        if (this.fromDate != "" && this.toDate != "") {
            if (toDateComp < fromDateComp) {
                this.notificationService.ShowToaster('From Date must be less than To Date', 2);
            }
            else if (this.dateSelectorField[0].FieldValue === this.dateSelectorField[1].FieldValue) {
                this.notificationService.ShowToaster('Year in From Date and To Date should not be the same', 2);
            }
            else {
                var reportFieldIdsandValues = [];
                reportFieldIdsandValues.push({
                    ReportFieldId: 7894,
                    Value: this.selectedIds
                });
                reportFieldIdsandValues.push({
                    ReportFieldId: 900194,
                    Value: this.dateSelectorField[0].FieldValue
                });
                reportFieldIdsandValues.push({
                    ReportFieldId: 900195,
                    Value: this.dateSelectorField[1].FieldValue
                });
                reportFieldIdsandValues.push({
                    ReportFieldId: 7907,
                    Value: this.foreCastingYear
                });
                reportFieldIdsandValues.push({
                    ReportFieldId: 5080,
                    Value: this.foreCastingValue
                });
                contextObj.empservice.getGradeTrendAnalysis(JSON.stringify(reportFieldIdsandValues)).subscribe(function (resultData) {
                    if (JSON.parse(resultData["Data"]["Table1"]).length == 0) {
                        contextObj.notificationService.ShowToaster('No Data exists', 2);
                        return;
                    }
                    else {
                        contextObj.chartData = resultData;
                        contextObj.foreCastingYear = "0";
                        contextObj.foreCastingValue = "0";
                        contextObj.foreCastFieldObject.FieldValue = "";
                        if (contextObj.forecastFlag) {
                            contextObj.tabname = "Forecasting";
                        }
                        else {
                            contextObj.tabname = "Trend";
                        }
                        if (contextObj.isTabClicked) {
                            setTimeout(function () {
                                contextObj.isTabClicked = contextObj.isNextClicked = false;
                                contextObj.tabDeleteIndex = 1;
                            }, 100);
                        }
                        setTimeout(function () {
                            contextObj.isTabClicked = true;
                            contextObj.isNextClicked = true;
                        }, 100);
                        //this.localselection = 1;
                        setTimeout(function () {
                            contextObj.selectedTab = 1;
                            contextObj.tabDeleteIndex = 0;
                        }, 100);
                    }
                });
            }
        }
    };
    GradeTrendAnalysisComponent.prototype.showForecast = function () {
        if (this.ListboxData.MultiFieldValues == null || this.ListboxData.MultiFieldValues.length == 0) {
            this.notificationService.ShowToaster("Select a Grade", 2);
        }
        else {
            this.forecastFlag = true;
            this.btnName = "Ok";
            this.splitviewInput.showSecondaryView = true;
            setTimeout(function () {
                var el = document.getElementById("2039"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/
                if (el != null && el != undefined) {
                    el.focus();
                }
            }, 20);
        }
    };
    GradeTrendAnalysisComponent.prototype.onSubmitData = function (event) {
    };
    GradeTrendAnalysisComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
    };
    GradeTrendAnalysisComponent.prototype.okSubmit = function (event) {
        if (this.foreCastFieldObject.HasValidationError == true)
            return;
        else if (this.foreCastFieldObject.HasValidationError == false) {
            if (Number(this.foreCastFieldObject.FieldValue) > 0) {
                this.foreCastingYear = "3";
                this.foreCastingValue = this.foreCastFieldObject.FieldValue;
            }
            this.splitviewInput.showSecondaryView = false;
            this.showTrend();
        }
    };
    GradeTrendAnalysisComponent = __decorate([
        core_1.Component({
            selector: 'trendAnalysis-Grade',
            templateUrl: './app/Views/Employee/TrendAnalysis/GradeOccupancy/gradeTrendAnalysis.component.html',
            directives: [submenu_component_1.SubMenu, tab_component_1.TabComponent, tabs_component_1.TabsComponent, page_component_1.PageComponent, datecomponent_component_1.DateComponent, notify_component_1.Notification, listboxcomponent_component_1.ListBoxComponent, gradeTrendAnalysis_chartview_1.GradeTrendAnalysisChartview, split_view_component_1.SplitViewComponent, stringtextbox_component_1.StringTextBoxComponent],
            providers: [notify_service_1.NotificationService, employee_services_1.EmployeeService, validation_service_1.ValidateService],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, employee_services_1.EmployeeService, validation_service_1.ValidateService])
    ], GradeTrendAnalysisComponent);
    return GradeTrendAnalysisComponent;
}());
exports.GradeTrendAnalysisComponent = GradeTrendAnalysisComponent;
//# sourceMappingURL=gradeTrendAnalysis.component.js.map
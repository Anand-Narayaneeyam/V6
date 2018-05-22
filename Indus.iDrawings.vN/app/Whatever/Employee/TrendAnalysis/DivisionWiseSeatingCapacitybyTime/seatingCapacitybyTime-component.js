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
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var datecomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var seatingCapacitybyTime_chartView_1 = require('./seatingCapacitybyTime-chartView');
var employee_services_1 = require('../../../../Models/Employee/employee.services');
var dropdownlistcomponent_component_1 = require('../../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var space_service_1 = require('../../../../Models/Space/space.service');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var stringtextbox_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var validation_service_1 = require('../../../../Framework/Models/Validation/validation.service');
var employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime = (function () {
    function employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime(notificationService, employeeService, _validateService, spaceService) {
        var _this = this;
        this.notificationService = notificationService;
        this.employeeService = employeeService;
        this._validateService = _validateService;
        this.spaceService = spaceService;
        this.onSubmitClick = new core_1.EventEmitter();
        this.isTabClicked = false;
        this.selectedTab = 0;
        this.blnShowDate = true;
        this.iscard = true;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.forecastFlag = false;
        this.OrgUnitId = "";
        this.foreCastingYear = "0";
        this.foreCastingValue = "0";
        this.LevelNameCustomized = "";
        this.tabname = "Trend";
        this._validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
    }
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.ngOnInit = function () {
        this.menuData = [
            {
                "id": 0,
                "title": "Show Trend",
                "image": "Show Trend",
                "path": "Show Trend",
                "subMenu": null
            },
            {
                "id": 1,
                "title": "Show Forecast for 3 years",
                "image": "Show Forecast",
                "path": "Show Forecast",
                "subMenu": null
            }
        ];
        this.enableMenu = [];
        this.isNextClicked = false;
        //this.pagePath = "Employees / Trend Analysis / Division wise Seating Capacity by Time";
        var contextObj = this;
        this.employeeService.getOrgLevelCustomizedName().subscribe(function (resultData) {
            if (resultData.Data != undefined) {
                var LevelNames = JSON.parse(resultData.Data);
                contextObj.LevelNameCustomized = LevelNames[0].L1Caption;
                if (contextObj.LevelNameCustomized != "") {
                    contextObj.pagePath = "Employees / Seating Capacities by " + contextObj.LevelNameCustomized + " over Time";
                }
            }
            setTimeout(function () {
                contextObj.loadField();
            }, 50);
        });
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.loadField = function () {
        var contextObj = this;
        this.employeeService.loadTrendAnalysisDivisionWiseSeatingCapacitybyTime().subscribe(function (resultData) {
            // contextObj.dateSelectorField[0] = resultData.Data[0];
            // contextObj.dateSelectorField[1] = resultData.Data[1];
            contextObj.dateSelectorField1 = resultData.Data[0];
            contextObj.dateSelectorField2 = resultData.Data[1];
            var date = new Date();
            var year = date.getFullYear();
            var ddl1 = resultData["Data"].find(function (item) { return item.FieldId === 737; });
            var ddl2 = resultData["Data"].find(function (item) { return item.FieldId === 738; });
            var ddl3 = resultData["Data"].find(function (item) { return item.FieldId === 739; });
            var ddl4 = resultData["Data"].find(function (item) { return item.FieldId === 740; });
            var ddl5 = resultData["Data"].find(function (item) { return item.FieldId === 741; });
            contextObj.dateSelectorField1.FieldValue = "01 JAN " + (year - 2);
            contextObj.dateSelectorField2.FieldValue = "31 DEC " + year;
            contextObj.ddlLevel1 = ddl1;
            contextObj.ddlLevel2 = ddl2;
            contextObj.ddlLevel3 = ddl3;
            contextObj.ddlLevel4 = ddl4;
            contextObj.ddlLevel5 = ddl5;
            //resultData["Data"].splice(0, 7);
            contextObj.foreCastFieldObject = resultData["Data"].find(function (item) {
                if (item.FieldId == 2039)
                    return true;
                else
                    return false;
            });
            // contextObj.foreCastFieldObject = JSON.parse(contextObj.foreCastFieldObject);
        });
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.onSubMenuChange = function (event) {
        if (event.value == 0) {
            this.forecastFlag = false;
            this.showTrend();
        }
        else if (event.value == 1) {
            this.foreCasting();
        }
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.showTrend = function () {
        var contexObj = this;
        if (this.ddlLevel1.FieldValue == "-1")
            this.notificationService.ShowToaster('Select a ' + this.ddlLevel1.FieldLabel, 2);
        else {
            this.isNextClicked = false;
            this.fromDate = this.dateSelectorField1.FieldValue;
            this.toDate = this.dateSelectorField2.FieldValue;
            var toDate = new Date(this.toDate);
            var fromDate = new Date(this.fromDate);
            this.ToDateInput = toDate;
            this.FromDateInput = fromDate;
            if (this.fromDate != "" && this.toDate != "") {
                if (toDate < fromDate) {
                    this.notificationService.ShowToaster('From Date must be less than To Date', 2);
                }
                else if (this.dateSelectorField2.FieldValue === this.dateSelectorField1.FieldValue) {
                    this.notificationService.ShowToaster('Year in From Date and To Date should not be the same', 2);
                }
                else {
                    var newTemp = [];
                    newTemp.push({
                        ReportFieldId: 1965,
                        Value: this.OrgUnitId
                    });
                    newTemp.push({
                        ReportFieldId: 900194,
                        Value: this.dateSelectorField1.FieldValue
                    });
                    newTemp.push({
                        ReportFieldId: 900195,
                        Value: this.dateSelectorField2.FieldValue
                    });
                    newTemp.push({
                        ReportFieldId: 7907,
                        Value: this.foreCastingYear
                    });
                    newTemp.push({
                        ReportFieldId: 5080,
                        Value: this.foreCastingValue
                    });
                    contexObj.employeeService.getSeatingCapacityforOrgUnitTrendAnalysis(JSON.stringify(newTemp)).subscribe(function (resultData) {
                        if (JSON.parse(resultData["Data"]["Table1"]).length == 0) {
                            contexObj.notificationService.ShowToaster('No Data exists', 2);
                            return;
                        }
                        else {
                            contexObj.chartData = resultData;
                            contexObj.foreCastingYear = "0";
                            contexObj.foreCastingValue = "0";
                            contexObj.foreCastFieldObject.FieldValue = "";
                            if (contexObj.forecastFlag) {
                                contexObj.tabname = "Forecasting";
                            }
                            else {
                                contexObj.tabname = "Trend";
                            }
                            //this.localselection = 1;
                            //contexObj.isTabClicked = true;
                            //contexObj.isNextClicked = true;
                            //setTimeout(function () {
                            //    contexObj.selectedTab = 1;
                            //}, 100);
                            //contexObj.chartData = resultData;
                            if (contexObj.isTabClicked) {
                                setTimeout(function () {
                                    contexObj.isTabClicked = contexObj.isNextClicked = false;
                                    contexObj.tabDeleteIndex = 1;
                                }, 100);
                            }
                            setTimeout(function () {
                                contexObj.isTabClicked = true;
                                contexObj.isNextClicked = true;
                            }, 100);
                            //this.localselection = 1; 
                            setTimeout(function () {
                                contexObj.selectedTab = 1;
                                contexObj.tabDeleteIndex = 0;
                            }, 100);
                        }
                    });
                }
            }
            else {
                return;
            }
        }
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.foreCasting = function () {
        if (this.ddlLevel1.FieldValue == "-1")
            this.notificationService.ShowToaster('Select a ' + this.ddlLevel1.FieldLabel, 2);
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
    //onChangeDdlLevel1(event: any) {
    //}
    //onChangeDdlLevel2(event: any) {
    //}
    //onChangeDdlLevel3(event: any) {
    //}
    //onChangeDdlLevel4(event: any) {
    //}
    //onChangeDdlLevel5(event: any) {
    //}
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.onChangeDdlLevel1 = function (event, fieldValue) {
        var contextObj = this;
        if (this.ddlLevel2 != undefined && Number(event) > 0) {
            //if (Number(this.ddlLevel2.FieldValue) > 0)
            //    this.ddlLevel2.FieldValue = "-1";
            this.OrgUnitId = event;
            this.enableMenu = [0, 1];
            if (this.ddlLevel2 != undefined) {
                this.ddlLevel2.LookupDetails.LookupValues = null;
                this.ddlLevel2.FieldValue = "-1";
            }
            if (this.ddlLevel3 != undefined) {
                this.ddlLevel3.LookupDetails.LookupValues = null;
                this.ddlLevel3.FieldValue = "-1";
            }
            if (this.ddlLevel4 != undefined) {
                this.ddlLevel4.LookupDetails.LookupValues = null;
                this.ddlLevel4.FieldValue = "-1";
            }
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
            var newTemp = [];
            newTemp.push({
                ReportFieldId: 289,
                Value: "2"
            });
            newTemp.push({
                ReportFieldId: 288,
                Value: event
            });
            contextObj.spaceService.loadSpaceOrganizationalUnitDll(event, 737, newTemp).subscribe(function (resultData) {
                contextObj.ddlLevel2.LookupDetails.LookupValues = resultData.Data.LookupValues;
            });
        }
        else if (Number(event) == -1) {
            this.OrgUnitId = "";
            this.enableMenu = [];
            if (this.ddlLevel2 != undefined) {
                this.ddlLevel2.LookupDetails.LookupValues = null;
                this.ddlLevel2.FieldValue = "-1";
            }
            if (this.ddlLevel3 != undefined) {
                this.ddlLevel3.LookupDetails.LookupValues = null;
                this.ddlLevel3.FieldValue = "-1";
            }
            if (this.ddlLevel4 != undefined) {
                this.ddlLevel4.LookupDetails.LookupValues = null;
                this.ddlLevel4.FieldValue = "-1";
            }
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
        }
        else {
            this.OrgUnitId = event;
            this.enableMenu = [0, 1];
        }
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.onChangeDdlLevel2 = function (event, fieldValue) {
        var contextObj = this;
        if (this.ddlLevel3 != undefined && Number(event) > 0) {
            this.OrgUnitId = event;
            if (this.ddlLevel3 != undefined) {
                this.ddlLevel3.LookupDetails.LookupValues = null;
                this.ddlLevel3.FieldValue = "-1";
            }
            if (this.ddlLevel4 != undefined) {
                this.ddlLevel4.LookupDetails.LookupValues = null;
                this.ddlLevel4.FieldValue = "-1";
            }
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
            var newTemp = [];
            newTemp.push({
                ReportFieldId: 289,
                Value: "3"
            });
            newTemp.push({
                ReportFieldId: 288,
                Value: event
            });
            contextObj.spaceService.loadSpaceOrganizationalUnitDll(event, 738, newTemp).subscribe(function (resultData) {
                contextObj.ddlLevel3.LookupDetails.LookupValues = resultData.Data.LookupValues;
                if (fieldValue > 0)
                    contextObj.ddlLevel3.FieldValue = fieldValue;
            });
        }
        else if (Number(event) == -1) {
            this.OrgUnitId = this.ddlLevel1.FieldValue;
            if (this.ddlLevel3 != undefined) {
                this.ddlLevel3.LookupDetails.LookupValues = null;
                this.ddlLevel3.FieldValue = "-1";
            }
            if (this.ddlLevel4 != undefined) {
                this.ddlLevel4.LookupDetails.LookupValues = null;
                this.ddlLevel4.FieldValue = "-1";
            }
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
        }
        else {
            this.OrgUnitId = event;
        }
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.onChangeDdlLevel3 = function (event, fieldValue) {
        var contextObj = this;
        if (this.ddlLevel4 != undefined && Number(event) > 0) {
            this.OrgUnitId = event;
            if (this.ddlLevel4 != undefined) {
                this.ddlLevel4.LookupDetails.LookupValues = null;
                this.ddlLevel4.FieldValue = "-1";
            }
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
            var newTemp = [];
            newTemp.push({
                ReportFieldId: 289,
                Value: "4"
            });
            newTemp.push({
                ReportFieldId: 288,
                Value: event
            });
            contextObj.spaceService.loadSpaceOrganizationalUnitDll(event, 739, newTemp).subscribe(function (resultData) {
                contextObj.ddlLevel4.LookupDetails.LookupValues = resultData.Data.LookupValues;
                if (fieldValue > 0)
                    contextObj.ddlLevel4.FieldValue = fieldValue;
            });
        }
        else if (Number(event) == -1) {
            this.OrgUnitId = this.ddlLevel2.FieldValue;
            if (this.ddlLevel4 != undefined) {
                this.ddlLevel4.LookupDetails.LookupValues = null;
                this.ddlLevel4.FieldValue = "-1";
            }
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
        }
        else {
            this.OrgUnitId = event;
        }
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.onChangeDdlLevel4 = function (event, fieldValue) {
        var contextObj = this;
        if (this.ddlLevel5 != undefined && Number(event) > 0) {
            this.OrgUnitId = event;
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
            var newTemp = [];
            newTemp.push({
                ReportFieldId: 289,
                Value: "5"
            });
            newTemp.push({
                ReportFieldId: 288,
                Value: event
            });
            contextObj.spaceService.loadSpaceOrganizationalUnitDll(event, 740, newTemp).subscribe(function (resultData) {
                contextObj.ddlLevel5.LookupDetails.LookupValues = resultData.Data.LookupValues;
                if (fieldValue > 0)
                    contextObj.ddlLevel5.FieldValue = fieldValue;
            });
        }
        else if (Number(event) == -1) {
            this.OrgUnitId = this.ddlLevel3.FieldValue;
            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }
        }
        else {
            this.OrgUnitId = event;
        }
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.onChangeDdlLevel5 = function (event, fieldValue) {
        var contextObj = this;
        if (Number(event) > 0) {
            this.OrgUnitId = event;
        }
        else if (Number(event) == -1) {
            this.OrgUnitId = this.ddlLevel4.FieldValue;
        }
    };
    //getSelectedTab(event) {
    //    if (event[0] == 0) {
    //        this.selectedTab = 0;
    //        if (event[1] == true && this.isNextClicked == true) {
    //            this.isNextClicked = false;
    //            var contextObj = this;
    //            setTimeout(function () {
    //                contextObj.tabDeleteIndex = 1;
    //                contextObj.isNextClicked = false;
    //            }, 50);
    //            setTimeout(function () {
    //                contextObj.tabDeleteIndex = 0;
    //            }, 50);
    //        }
    //    }
    //}
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.onSubmitData = function (event) {
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.getSelectedTab = function (event) {
        this.tabDeleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            // this.tabDeleteIndex = this.localselection;
            this.isNextClicked = false;
        }
        this.selectedTab = event[0];
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.onTabClose = function (event) {
        this.isNextClicked = false;
        this.selectedTab = event[0];
    };
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype.okSubmit = function (event) {
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
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime.prototype, "onSubmitClick", void 0);
    employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime = __decorate([
        core_1.Component({
            selector: 'employee.TrendAnalysis.DivisionWiseSeatingCapacitybyTime',
            templateUrl: './app/Views/Employee/TrendAnalysis/DivisionWiseSeatingCapacitybyTime/seatingCapacitybyTime-component.html',
            providers: [notify_service_1.NotificationService, employee_services_1.EmployeeService, space_service_1.SpaceService, validation_service_1.ValidateService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, datecomponent_component_1.DateComponent, submenu_component_1.SubMenu, seatingCapacitybyTime_chartView_1.employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView, dropdownlistcomponent_component_1.DropDownListComponent, fieldGeneration_component_1.FieldComponent, split_view_component_1.SplitViewComponent, stringtextbox_component_1.StringTextBoxComponent]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, employee_services_1.EmployeeService, validation_service_1.ValidateService, space_service_1.SpaceService])
    ], employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime);
    return employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime;
}());
exports.employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime = employeeTrendAnalysisDivisionWiseSeatingCapacitybyTime;
//# sourceMappingURL=seatingCapacitybyTime-component.js.map
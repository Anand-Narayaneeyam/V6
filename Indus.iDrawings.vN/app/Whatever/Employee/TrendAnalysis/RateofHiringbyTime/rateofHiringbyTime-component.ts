import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {IField} from '../../../../Framework/Models//Interface/IField';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import {DateComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { employeeTrendAnalysisRateofHiringbyTimeChartView } from './rateofHiringbyTime-chartView';
import { EmployeeService } from '../../../../Models/Employee/employee.services'
import { DropDownListComponent } from '../../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SpaceService} from '../../../../Models/Space/space.service';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../../Framework/Models/Interface/ISplit-view'
import { StringTextBoxComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { ValidateService } from '../../../../Framework/Models/Validation/validation.service';



@Component({
    selector: 'employee.TrendAnalysis.RateofHiringbyTime',
    templateUrl: './app/Views/Employee/TrendAnalysis/RateofHiringbyTime/rateofHiringbyTime-component.html',
    providers: [NotificationService, EmployeeService, SpaceService, ValidateService],
    directives: [Notification, PageComponent, TabsComponent, TabComponent, DateComponent, SubMenu, employeeTrendAnalysisRateofHiringbyTimeChartView, DropDownListComponent, FieldComponent, SplitViewComponent, StringTextBoxComponent]
})

export class employeeTrendAnalysisRateofHiringbyTime implements OnInit {

    dateSelectorField1: IField;
    dateSelectorField2: IField;
    ddlLevel1: IField;
    ddlLevel2: IField;
    ddlLevel3: IField;
    ddlLevel4: IField;
    foreCastFieldObject: IField;
    ddlLevel5: IField;
    @Output() onSubmitClick = new EventEmitter();
    isNextClicked: boolean;
    isTabClicked: boolean = false;
    selectedTab: number = 0;
    pagePath: string;
    blnShowDate: boolean = true;
    fromDate: any;
    toDate: any;
    FromDateInput: any;
    ToDateInput: any;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    tabDeleteIndex: number;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    localselection: number;
    pageTitle: string;
    forecastFlag: boolean = false;
    btnName: string;
    chartData: any;
    public validationData;
    OrgUnitId: string = "";
    foreCastingYear: string = "0";
    foreCastingValue: string = "0";
    tabname: string = "Trend";

    constructor(private notificationService: NotificationService, private employeeService: EmployeeService, private _validateService: ValidateService, private spaceService: SpaceService) {
        this._validateService.getBlacklist().subscribe(resultData => this.validationData = resultData);
    }

    ngOnInit() {
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
        this.pagePath = "Employees / Hiring Rate over Time";
        var contextObj = this;
        this.employeeService.loadTrendAnalysisRateofHiringbyTime().subscribe(function (resultData) {
            
            // contextObj.dateSelectorField[0] = resultData.Data[0];
            // contextObj.dateSelectorField[1] = resultData.Data[1];

            contextObj.dateSelectorField1 = resultData.Data[0];
            contextObj.dateSelectorField2 = resultData.Data[1];
            var date = new Date();
            var year = date.getFullYear();

            var ddl1 = resultData["Data"].find(function (item) { return item.FieldId === 395 })
            var ddl2 = resultData["Data"].find(function (item) { return item.FieldId === 399 })
            var ddl3 = resultData["Data"].find(function (item) { return item.FieldId === 400 })
            var ddl4 = resultData["Data"].find(function (item) { return item.FieldId === 487 })
            var ddl5 = resultData["Data"].find(function (item) { return item.FieldId === 489 })

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

    }

    onSubMenuChange(event) {
        if (event.value == 0) /* showTrend */ {
            this.forecastFlag = false;
            this.showTrend();
        }
        else if (event.value == 1) /* foreCasting */ {
            this.foreCasting();
        }
    }

    showTrend() {
        
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

                    var newTemp: any[] = [];
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


                    contexObj.employeeService.getRateofHiringbyTimeTrendAnalysis(JSON.stringify(newTemp)).subscribe(function (resultData) {

                        if (JSON.parse(resultData["Data"]["Table1"]).length == 0) {
                            contexObj.notificationService.ShowToaster('No Data exists', 2);
                            return;
                        } else {
                            
                            contexObj.chartData = resultData;

                            contexObj.foreCastingYear = "0";
                            contexObj.foreCastingValue = "0";
                            contexObj.foreCastFieldObject.FieldValue = "";
                            if (contexObj.forecastFlag) {
                                contexObj.tabname = "Forecasting";
                            } else {
                                contexObj.tabname = "Trend";
                            }
                            //this.localselection = 1;
                            //contexObj.isTabClicked = true;
                            //contexObj.isNextClicked = true;
                            //setTimeout(function () {
                            //    contexObj.selectedTab = 1;
                            //}, 100);

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
                return
            }
        }
    }

    foreCasting() {

        if (this.ddlLevel1.FieldValue == "-1")
            this.notificationService.ShowToaster('Select a ' + this.ddlLevel1.FieldLabel, 2);
        else {
            this.forecastFlag = true;
            this.btnName = "Ok";
            this.splitviewInput.showSecondaryView = true;
            setTimeout(function () {
                var el = <HTMLElement>document.getElementById("2039"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/

                if (el != null && el != undefined) {
                    el.focus();
                }
            }, 20);
        }
    }

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


    onChangeDdlLevel1(event: any, fieldValue: any) {

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

            var newTemp: any[] = [];
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

    }

    onChangeDdlLevel2(event: any, fieldValue: any) {

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

            var newTemp: any[] = [];
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
        else
        {
            this.OrgUnitId = event;
        }

    }

    onChangeDdlLevel3(event: any, fieldValue: any) {

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

            var newTemp: any[] = [];
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

    }

    onChangeDdlLevel4(event: any, fieldValue: any) {

        var contextObj = this;
        if (this.ddlLevel5 != undefined && Number(event) > 0) {

            this.OrgUnitId = event;

            if (this.ddlLevel5 != undefined) {
                this.ddlLevel5.LookupDetails.LookupValues = null;
                this.ddlLevel5.FieldValue = "-1";
            }

            var newTemp: any[] = [];
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
    }

    onChangeDdlLevel5(event: any, fieldValue: any) {
        var contextObj = this;
        if (Number(event) > 0) {
            this.OrgUnitId = event;
        }
        else if (Number(event) == -1) {
            this.OrgUnitId = this.ddlLevel4.FieldValue;
        }
    }

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


    onSubmitData(event) {
    }

    getSelectedTab(event: any) {

        this.tabDeleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            // this.tabDeleteIndex = this.localselection;
            this.isNextClicked = false;
        }
        this.selectedTab = event[0];
    }

    onTabClose(event: any) {

        this.isNextClicked = false;
        this.selectedTab = event[0];
    }

    okSubmit(event) {

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

    }

}

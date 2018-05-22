import { Component, OnInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions } from '../../../../Models/Common/General';
import { DateComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { IField} from  '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import {EmployeeService} from '../../../../models/employee/employee.services';
import { ListBoxComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component';
import {SpaceStandardTrendAnalysisChartview } from './spacestandardtrendanalysis-chartview';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../../Framework/Models/Interface/ISplit-view'
import { StringTextBoxComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { ValidateService } from '../../../../Framework/Models/Validation/validation.service';

@Component({
    selector: 'trendAnalysis-SpaceStandard',
    templateUrl: './app/Views/Employee/TrendAnalysis/SpaceStandardWiseSeatingCapacitybyTime/spaceStandardTrendAnalysis.component.html',
    directives: [SubMenu, TabComponent, TabsComponent, PageComponent, DateComponent, Notification, ListBoxComponent, SpaceStandardTrendAnalysisChartview, SplitViewComponent, StringTextBoxComponent],
    providers: [NotificationService, EmployeeService, ValidateService],
})

export class SpaceStandardTrendAnalysisComponent implements OnInit {
    selectedTab: number = 0;
    tabDeleteIndex: any = 0;

    dateSelectorField: IField[];
    EndDate: string = "";
    StartDate: string = "";
    nextClicked: boolean = false;
    blnShowDate: boolean = true;
    isTabClicked: boolean = false;
    fromDate: any = "";
    toDate: any = "";
    
    menuData: any;
    iscard = true;
    enableMenu: any[];
    ListboxData: IField= undefined;
    localselection: number;
    isNextClicked: boolean;
    selectedIds: any;
    chartData: any;
    public validationData;
    forecastFlag: boolean = false;
    btnName: string;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    foreCastingYear: string = "0";
    foreCastingValue: string = "0";
    foreCastFieldObject: IField;
    tabname: string = "Trend";

    pagePath: any = "Employees / Seating Capacities by Space Standard over Time";

    //constructor(private notificationService: NotificationService, private generFun: GeneralFunctions, private empservice: EmployeeService) {
    //}

    constructor(private notificationService: NotificationService, private empservice: EmployeeService, private _validateService: ValidateService) {
        this._validateService.getBlacklist().subscribe(resultData => this.validationData = resultData);
    }

    ngOnInit() {
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
        contextObj.empservice.getSpaceStandardTrendFields().subscribe(function (resultData) {    

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
            contextObj.dateSelectorField[0].FieldValue = "01 JAN " + (year-2);
            contextObj.dateSelectorField[1].FieldValue = "31 DEC " + year;
            contextObj.foreCastFieldObject = resultData["Data"].find(function (item) {
                if (item.FieldId == 2039)
                    return true;
                else
                    return false;
            });
        });       
    }

    getListBoxData(event) {
        if (event.fieldObject.MultiFieldValues != undefined) {
            if (event.fieldObject.MultiFieldValues.length == 0) {
                this.enableMenu = [];
            }
            else {
                this.enableMenu = [0,1];
            }
        }
    }

    onSubMenuChange(event) {
        var selectedClassIds = '';
        if (this.ListboxData.MultiFieldValues == null || this.ListboxData.MultiFieldValues.length == 0) {
            this.notificationService.ShowToaster("Select a Space Standard", 2)
        }
        else {
            for (var count = 0; count < this.ListboxData.MultiFieldValues.length; count++) {
                selectedClassIds = selectedClassIds + this.ListboxData.MultiFieldValues[count] + ',';
            }
            selectedClassIds = selectedClassIds.slice(0, -1);
            this.selectedIds = selectedClassIds;
            if (event.value == 0) /* showTrend */ {
                this.forecastFlag = false;
                this.showTrend();
            }
            else if (event.value == 1) /* foreCasting */ {
                this.showForecast();
            }
        }    
       
    }

    showTrend() {

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

                    var reportFieldIdsandValues: any[] = [];
                    reportFieldIdsandValues.push({
                        ReportFieldId: 790,
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


                    contextObj.empservice.getSpaceStandardTrendAnalysis(JSON.stringify(reportFieldIdsandValues)).subscribe(function (resultData) {

                        if (JSON.parse(resultData["Data"]["Table1"]).length == 0) {
                            contextObj.notificationService.ShowToaster('No Data exists', 2);
                            return;
                        } else {
                            contextObj.chartData = resultData;
                            contextObj.foreCastingYear = "0";
                            contextObj.foreCastingValue = "0";
                            contextObj.foreCastFieldObject.FieldValue = "";
                            if (contextObj.forecastFlag) {
                                contextObj.tabname = "Forecasting";
                            } else {
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
        
    }

    showForecast() {
        if (this.ListboxData.MultiFieldValues == null || this.ListboxData.MultiFieldValues.length == 0) {
            this.notificationService.ShowToaster("Select a Space Standard", 2)
        }else {
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

    onSubmitData(event) {
    }

    getSelectedTab(event: any) {
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

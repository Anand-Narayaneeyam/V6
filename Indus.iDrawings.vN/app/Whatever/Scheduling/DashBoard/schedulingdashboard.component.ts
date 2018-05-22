import {Component, OnInit } from '@angular/core';
import {PieChart, IPieChart} from '../../../Framework/Whatever/Charts/piechart.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {MultiBarChart, IMultiBarChart, IMultiBarChartData} from '../../../Framework/Whatever/Charts/multibarchart.component';
import {SchedulingService} from '../../../models/Scheduling/scheduling.service';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DashboardComponent} from '../../../Framework/Whatever/Dashboard/dashboard.component';
import {WidgetComponent} from '../../../Framework/Whatever/Dashboard/widget.component';
import {GridComponent} from '../../../framework/whatever/grid/grid.component';
import {IGrid} from '../../../framework/models/interface/igrid';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {DashboardSchedulerComponent} from '../../../Framework/Whatever/Scheduler/dashboardscheduler.component';

@Component({
    selector: 'dashboard',
    directives: [PieChart, MultiBarChart, PageComponent, DashboardComponent, WidgetComponent, GridComponent, DropDownListComponent, DashboardSchedulerComponent],
    providers: [SchedulingService],
    templateUrl: "./app/Views/Scheduling/DashBoard/schedulingdashboard.component.html"


})
export class SchedulingDashBoard implements OnInit {
    Barchart1Data: IMultiBarChart;
    Barchart2Data: IMultiBarChart;
    PieChart1Data: IPieChart;
    PieChart2Data: IPieChart;

    pagePath = "Scheduling / Dashboard";

    alignContent = "horizontal";
    UserCount = '';
    AreaUnit = 'Sq. Ft.';
    DwgCount = '';

    fieldObject: IField;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    DrawingCategoryCountMap: any;
    sourceLength: any;
    ddlPeriod: IField;
    calculatedWidth: number;
    calculatedHeight: number = 100;
    ischanged: boolean = false;
    schedulerArrObj = new Array<ISchedulerObj>();
    Dateforcalender: string = "";
    totalItems1: number = 0;
    totalItems2: number = 0;
    roomday = [];
    seatday = [];
    constructor(private SS: SchedulingService) {

    }

    ngOnInit() {
        var contextObj = this;
        if (window["IsMobile"] == false) {
            contextObj.calculatedWidth = $(".pageContent").width() / 2.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 2;
        }
        else {
            contextObj.calculatedWidth = $(".pageContent").width();
            contextObj.calculatedHeight = $(".pageContent").height();
        }
        contextObj.ddlPeriod = {
            FormFieldId:0,
            FieldId: 0,
            ReportFieldId: 0,
            FieldLabel: "",
            DataEntryControlId: 4,
            GenericDataTypeId: 6,
            Whitelist: { Id: 3, FormatString: null, RegularExpression: null },                      
            IsValidated: true,                            
            IsMandatory: false,
            IsVisible: true,
            IsEnabled: true,
            isContentHtml: null,
            Precision: 0,
            Scale: 1,
            Height: 30,
            Width: "120",
            IsSigned: false,
            RangeFrom: null,
            RangeTo: null,
            HelpText: null,
            IsGrouped: false,
            HasChild: false,
            ParentId: 0,
            IsSubField: false,
            LookupDetails: { LookupValues: [], PopupComponent: null },          
        }
        contextObj.ddlPeriod.FieldValue = "2";
        contextObj.ddlPeriod.LookupDetails.LookupValues = [{ Id: 1, Value: "Today" }, { Id: 2, Value: "This Week" }, { Id: 3, Value: "This Month" }];
        contextObj.LoadSchedulingDashBoard(2);
    }
    onChangeddlPeriod(period) {
        switch (period) {
            case "1":
                period = 1;
                break;
            case "2":
                period = 2;
                break;
            case "3":
                period = 3;
                break;
        }
        this.LoadSchedulingDashBoard(period);
    }
    LoadSchedulingDashBoard(period) {
        var contextObj = this;
        debugger
        this.SS.getRoomUsageForDashboard(period, false, null, null).subscribe(function (resultData) {
            debugger
            var roomusage = JSON.parse(resultData.Table1);
            var MultiBarChartDataRoomUsage: IMultiBarChartData[] = [];
            var Usage = [];      
            for (let item of roomusage) {
                Usage.push({
                    label: item["Room No."], value: item["Duration"]

                });
            }
            MultiBarChartDataRoomUsage.push({ key: "Room No.", values: Usage });
            contextObj.Barchart1Data = { data: MultiBarChartDataRoomUsage, chartWidth: contextObj.calculatedWidth, chartHeight: contextObj.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
            var seatusage = JSON.parse(resultData.Table2);
            var MultiBarChartDataSeatUsage: IMultiBarChartData[] = [];
            var Usage = [];
            for (let item of seatusage) {
                Usage.push({
                    label: item["Seat No."], value: item["Duration"]

                });
            }
            MultiBarChartDataSeatUsage.push({ key: "Seat No.", values: Usage });
            contextObj.Barchart2Data = { data: MultiBarChartDataSeatUsage, chartWidth: contextObj.calculatedWidth, chartHeight: contextObj.calculatedHeight, chartXaxisLabel: "", chartYaxisLabel: "", IsStackedChart: false, wrapLabels: false };
            contextObj.ischanged = !contextObj.ischanged;
        });
        this.SS.getRoomReservationCalendarForDashboard(period, 0, null, null).subscribe(function (resultData) {
            debugger
            var table1 = JSON.parse(resultData);
            contextObj.totalItems1 = table1.length;
            contextObj.roomday = [];
            for (let day of table1) {
                contextObj.roomday.push(day.Day);
            }
        });

        //this.SS.getSeatReservationCalendarForDashboard(period, 0, null, null).subscribe(function (resultData) {
        //    debugger
        //    var table2 = JSON.parse(resultData);
        //    contextObj.totalItems2 = table2.length;
        //    contextObj.seatday = [];
        //    for (let day of table2) {
        //        contextObj.seatday.push(day.Day);
        //    }
        //});
    }

    LoadDrawingCategoryCount(event) {
        var contextObj = this;
        //this.ABS.GetDrawingCategoriesCountforDashboard(event).subscribe(function (resultData) {
        //    var Arr = JSON.parse(resultData);
        //    var PieChartData = { data: [], chartWidth: 520, chartHeight: 300, legendPosition: "top" };
        //    for (let item of Arr) {
        //        PieChartData.data.push({
        //            key: item["Category"], y: item["No.OfDrawings"]
        //        });
        //    }
        //    contextObj.DrawingCategoryCountMap[event] = PieChartData;
        //});
    }
}
export interface ISchedulerObj {
    rowNo: number,
    bookedDates: string[],
    strTooltip: string
}
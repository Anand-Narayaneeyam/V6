import {Component, Input, OnInit} from '@angular/core';
import {LineChart, ILineChart, ILineChartData} from '../../../../Framework/Whatever/Charts/linechart.component';


@Component({
    selector: 'employee-TrendAnalysis-DivisionWiseSeatingCapacitybyTimeChartView',
    templateUrl: './app/Views/Employee/TrendAnalysis/DivisionWiseSeatingCapacitybyTime/seatingCapacitybyTime-chartView.html',
    providers: [],
    directives: [LineChart]
})


export class employeeTrendAnalysisDivisionWiseSeatingCapacitybyTimeChartView implements OnInit {
    @Input() FromRpDate: string = "";
    @Input() ToRpDate: string = "";
    @Input() chartData: any = "";

    pagePath: string;
    lineChartData: ILineChart;
    calculatedWidth: number;
    calculatedHeight: number;

    constructor() {

    }

    ngOnInit() {
        var contextObj = this;
        if (/msie|Trident/.test(navigator.userAgent)) {
            contextObj.calculatedWidth = $(".pageContent").width() / 1.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 1.35;
        } else {
            contextObj.calculatedWidth = 0;
            contextObj.calculatedHeight = 0;
        }
        //this.pagePath = "Employees / Trend Analysis / Division wise Seating Capacity by Time";
        this.LoadSeatingCapacitydataDetailsForDashboard();

    }

    LoadSeatingCapacitydataDetailsForDashboard() {
        var contextObj = this;

        var seatingCapacityData = JSON.parse(this.chartData.Data.Table1);
        var orgName = JSON.parse(this.chartData.Data.Table2)[0].Column1;
        var lineChartSeatingCapacityData: ILineChartData[] = [];
        var orgSeats = [];
        var totalSeats = [];
        var length: number;
        length = ((seatingCapacityData.length) - 1);

        //orgSeats.push({
        //    label: seatingCapacityData[0].Year - 2,
        //    value: null
        //});
        orgSeats.push({
            label: seatingCapacityData[0].Year - 1,
            value: null
        });
        //totalSeats.push({
        //    label: seatingCapacityData[0].Year - 2,
        //    value: null
        //});
        totalSeats.push({
            label: seatingCapacityData[0].Year - 1,
            value: null
        });


        //contextObj.data = [];        
        for (let item of seatingCapacityData) {
            orgSeats.push({
                label: item["Year"], value: item["OrgSeats"]

            });
            totalSeats.push({
                label: item["Year"], value: item["TotalSeats"]

            });
        }

        //orgSeats.push({
        //    label: seatingCapacityData[length].Year + 2,
        //    value: null
        //});
        orgSeats.push({
            label: seatingCapacityData[length].Year + 1,
            value: null
        });
        //totalSeats.push({
        //    label: seatingCapacityData[length].Year + 2,
        //    value: null
        //});
        totalSeats.push({
            label: seatingCapacityData[length].Year + 1,
            value: null
        });

        //orgSeats.push({
        //    label: 2018,
        //    value: 0
        //});

        //totalSeats.push({
        //    label: 2018,
        //    value: null
        //});

        lineChartSeatingCapacityData.push({ key: orgName, values: orgSeats, color: '#FF0000' }, { key: "Total Seats", values: totalSeats, color: '#008000' });
        contextObj.lineChartData = { data: lineChartSeatingCapacityData, chartWidth: contextObj.calculatedWidth, chartHeight: contextObj.calculatedHeight, chartXaxisLabel: "Year", chartYaxisLabel: "Seating Capacity" };

    }

}

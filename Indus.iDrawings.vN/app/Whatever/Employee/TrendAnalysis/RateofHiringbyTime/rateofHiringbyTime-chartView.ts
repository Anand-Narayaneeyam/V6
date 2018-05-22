import {Component, Input, OnInit} from '@angular/core';
import {LineChart, ILineChart, ILineChartData} from '../../../../Framework/Whatever/Charts/linechart.component';



@Component({
    selector: 'employee-TrendAnalysis-RateofHiringbyTimeChartView',
    templateUrl: './app/Views/Employee/TrendAnalysis/RateofHiringbyTime/rateofHiringbyTime-chartView.html',
    providers: [],
    directives: [LineChart]
})


export class employeeTrendAnalysisRateofHiringbyTimeChartView implements OnInit {
    @Input() FromRpDate: string = "";
    @Input() ToRpDate: string = "";
    @Input() chartData: any = "";

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
        this.LoadRateofHiringbyTimeDataDetailsForDashboard();

    }

    LoadRateofHiringbyTimeDataDetailsForDashboard() {
        var contextObj = this;
        
        var seatingCapacityData = JSON.parse(this.chartData.Data.Table1);
        var orgName = JSON.parse(this.chartData.Data.Table2)[0].OrgUnitName;
        var lineChartSeatingCapacityData: ILineChartData[] = [];
        var orgEmployee = [];
        var totalEmployee = [];   
        var length: number;
        length = ((seatingCapacityData.length) - 1);    

        debugger
        orgEmployee.push({
            label: seatingCapacityData[0].Period - 1,
            value: null
        });
        //totalSeats.push({
        //    label: seatingCapacityData[0].Year - 2,
        //    value: null
        //});
        totalEmployee.push({
            label: seatingCapacityData[0].Period - 1,
            value: null
        });

        for (let item of seatingCapacityData) {
            orgEmployee.push({
                label: item["Period"], value: item["TotalOrgEmployees"]

            });
            totalEmployee.push({
                label: item["Period"], value: item["TotalEmployees"]

            });
        }


        orgEmployee.push({
            label: seatingCapacityData[length].Period + 1,
            value: null
        });
        //totalSeats.push({
        //    label: seatingCapacityData[length].Year + 2,
        //    value: null
        //});
        totalEmployee.push({
            label: seatingCapacityData[length].Period + 1,
            value: null
        });

        lineChartSeatingCapacityData.push({ key: orgName, values: orgEmployee, color: '#FF0000' }, { key: "Total Employees", values: totalEmployee, color: '#008000' });
        contextObj.lineChartData = { data: lineChartSeatingCapacityData, chartWidth: contextObj.calculatedWidth, chartHeight: contextObj.calculatedHeight, chartXaxisLabel: "Year", chartYaxisLabel: "No. of Employees" };

    }

}

import {Component, Input, OnInit} from '@angular/core';
import {LineChart, ILineChart, ILineChartData} from '../../../../Framework/Whatever/Charts/linechart.component';

@Component({
    selector: 'spaceStandardTrendAnalysis-chartview',
    templateUrl: './app/Views/Employee/TrendAnalysis/SpaceStandardWiseSeatingCapacitybyTime/spaceStandardTrendAnalysis-chartview.html',
    providers: [],
    directives: [LineChart]
})


export class SpaceStandardTrendAnalysisChartview implements OnInit {

    @Input() chartData: any = "";

    pagePath: string;
    lineChartData: ILineChart;
    calculatedWidth: number;
    calculatedHeight: number;

    ngOnInit() {
        var contextObj = this;
        if (/msie|Trident/.test(navigator.userAgent)) {
            contextObj.calculatedWidth = $(".pageContent").width() / 1.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 1.35;
        } else {
            contextObj.calculatedWidth = 0;
            contextObj.calculatedHeight = 0;
        }
        this.LoadSpaceStandardChartForTrendAnalysis();
    }

    LoadSpaceStandardChartForTrendAnalysis() {
        var contextObj = this;
        var seatingCapacitySpaceStandardData = JSON.parse(this.chartData.Data.Table1);
        var seatingCapacityTotalData = JSON.parse(this.chartData.Data.Table2);
        var lineChartSeatingCapacityData: ILineChartData[] = [];
        var SpaceStandardData = [];
        var TotalData = [];
        var orgName = "";
        var minYear = 0;
        var maxYear = 2100;
        var dataLength = 0;
        dataLength = seatingCapacityTotalData.length - 1;
        minYear = seatingCapacityTotalData[0]["Year"] - 1;
        maxYear = seatingCapacityTotalData[dataLength]["Year"] + 1;

        for (let item of seatingCapacitySpaceStandardData) {
            var keys = Object.keys(item);
            var remove = keys.find(function (item1) {
                return item1 === "Name";
            })
            var index = keys.indexOf(remove);
            if (index > -1) 
                keys.splice(index, 1);
            remove = keys.find(function (item1) {
                return item1 === "Id";
            })
            index = keys.indexOf(remove);
            if (index > -1)
                keys.splice(index, 1);

            SpaceStandardData = [];
            SpaceStandardData.push({
                label: minYear, value: null
            });
            for (let key1 of keys) {
                SpaceStandardData.push({
                    label: key1, value: item[parseInt(key1)]
                });
            }
            SpaceStandardData.push({
                label: maxYear, value: null
            });
            lineChartSeatingCapacityData.push({ key: item.Name, values: SpaceStandardData });
        }

        TotalData.push({
            label: minYear, value: null
        });   
        for (let item of seatingCapacityTotalData) {
            TotalData.push({
                label: item["Year"], value: item["TotalSeats"]
            });
        }
        TotalData.push({
            label: maxYear, value: null
        });
        lineChartSeatingCapacityData.push({ key: "Total Seats", values: TotalData });

        contextObj.lineChartData = { data: lineChartSeatingCapacityData, chartWidth: contextObj.calculatedWidth, chartHeight: contextObj.calculatedHeight, chartXaxisLabel: "Year", chartYaxisLabel: "Seating Capacity" };
    }

} 
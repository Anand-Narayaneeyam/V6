import {Component, OnInit } from '@angular/core';
import {PieChart, IPieChart} from '../../../Framework/Whatever/Charts/piechart.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {ObjectsService} from '../../../models/objects/objects.service';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DashboardComponent} from '../../../Framework/Whatever/Dashboard/dashboard.component';
import {WidgetComponent} from '../../../Framework/Whatever/Dashboard/widget.component';
import {GridComponent} from '../../../framework/whatever/grid/grid.component';
import {IGrid} from '../../../framework/models/interface/igrid';



@Component({
    selector: 'objectdashboard',
    directives: [PieChart, PageComponent, DashboardComponent, WidgetComponent, GridComponent],
    providers: [ObjectsService],
    templateUrl: "./app/Views/Objects/DashBoard/objectdashboard.component.html",
    inputs: ["objectCategoryId", "moduleId"]
})
export class ObjectDashBoard implements OnInit {
    PieChart1Data: IPieChart;
    PieChart2Data: IPieChart;

    pagePath = "Asset / Dashboard";
    objectCategoryId: number;
    moduleId: number;
    alignContent = "horizontal";
    ObjectClass = '';
    Division = 'Division';
    ObjectCategory = 'Asset';
    fieldObject1: IField;
    fieldObject2: IField;
    itemsSource1: any[];
    itemsSource2: any[];
    calculatedWidth: number;
    calculatedHeight: number = 100;
    inputItems: IGrid = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    sortCol1: string = "";
    sortDir1: string = "ASC";
    sortCol2: string = "";
    sortDir2: string = "ASC";

    constructor(private ObjS: ObjectsService) {
        
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

        contextObj.ObjS.GetOrganizationalStructure().subscribe(function (resultDataOrgLvl) {
            contextObj.Division = resultDataOrgLvl.LookupValues[0].Value;
        });

        switch (contextObj.objectCategoryId) {
            case 1:
                contextObj.pagePath = "Assets / Dashboard";
                contextObj.ObjectClass = "Asset Class";
                contextObj.ObjectCategory = "Asset"
                break;
            case 2:
                contextObj.pagePath = "Furniture / Dashboard";
                contextObj.ObjectClass = "Furniture Class";
                contextObj.ObjectCategory = "Furniture"
                break;
        }
        contextObj.LoadObjectClassListForChartDashboard();
        contextObj.LoadObjectDistByOrgUnitForDashboard();

    }

    LoadObjectClassListForChartDashboard() {
        var contextObjClassListForChart = this;
        this.ObjS.GetObjectClassListForChartDashboard(contextObjClassListForChart.objectCategoryId).subscribe(function (resultData) {
            var NoofObjectsArr = JSON.parse(resultData);

            contextObjClassListForChart.PieChart1Data = { data: [], chartWidth: contextObjClassListForChart.calculatedWidth, chartHeight: contextObjClassListForChart.calculatedHeight, legendPosition: "top" }
            for (let item of NoofObjectsArr) {
                contextObjClassListForChart.PieChart1Data.data.push({
                    key: item["Classes"], y: item["No. of Objects"]
                });
            }
        });
    }

    LoadObjectDistByOrgUnitForDashboard() {
        var contextObjectDistByOrgUnit = this;
        this.ObjS.GetObjectDistByOrgUnitForDashboard(contextObjectDistByOrgUnit.objectCategoryId).subscribe(function (resultData) {
            var DistByOrgUnit = JSON.parse(resultData);

            contextObjectDistByOrgUnit.PieChart2Data = { data: [], chartWidth: contextObjectDistByOrgUnit.calculatedWidth, chartHeight: contextObjectDistByOrgUnit.calculatedHeight, legendPosition: "top" }
            for (let item of DistByOrgUnit) {
                contextObjectDistByOrgUnit.PieChart2Data.data.push({
                    key: item["OrgUnit"], y: item["NoofObjects"]
                });
            }
        });
    }

    ngAfterViewInit() {
        var contextObj = this;
        this.ObjS.GetObjectClassListFields(contextObj.objectCategoryId).subscribe(function (result) {
            contextObj.fieldObject1 = (result["Data"]);
            switch (contextObj.objectCategoryId) {
                case 1:
                    contextObj.fieldObject1[3].FieldLabel = "Total No. of Assets";
                    break;
                case 2:
                    contextObj.fieldObject1[3].FieldLabel = "Total No. of Furniture";
                    break;
            }
            contextObj.dataLoad1();
        });
        this.ObjS.GetObjectClassListByFloorFields(contextObj.objectCategoryId).subscribe(function (result) {
            contextObj.fieldObject2 = (result["Data"]);
            switch (contextObj.objectCategoryId) {
                case 1:
                    contextObj.fieldObject2[3].FieldLabel = "Asset Class";
                    contextObj.fieldObject2[4].FieldLabel = "No. of Assets";
                    break;
                case 2:
                    contextObj.fieldObject2[3].FieldLabel = "Furniture Class";
                    contextObj.fieldObject2[4].FieldLabel = "No. of Furniture";
                    break;
            }
            contextObj.dataLoad2();
        });
    }

    public dataLoad1() {
        var contextObj = this;
        this.ObjS.GetObjectClassList(contextObj.objectCategoryId, contextObj.sortCol1, contextObj.sortDir1).subscribe(function (result) {
            contextObj.itemsSource1 = JSON.parse(result["Data"].FieldBinderData);
        });
    }
    public dataLoad2() {
        var contextObj = this;
        this.ObjS.GetObjectClassListByFloor(contextObj.objectCategoryId, contextObj.sortCol2, contextObj.sortDir2).subscribe(function (result) {
            contextObj.itemsSource2 = JSON.parse(result["Data"].FieldBinderData);
        });
    }

    public onSort1(objGrid: any) {
        var contextObj = this;
        contextObj.sortCol1 = objGrid.sortCol;
        contextObj.sortDir1 = objGrid.sortDir
        this.dataLoad1();
    }
    public onSort2(objGrid: any) {
        var contextObj = this;
        contextObj.sortCol2 = objGrid.sortCol;
        contextObj.sortDir2 = objGrid.sortDir
        this.dataLoad2();
    }
}
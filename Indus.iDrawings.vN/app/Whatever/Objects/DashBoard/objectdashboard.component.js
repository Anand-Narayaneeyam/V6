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
var piechart_component_1 = require('../../../Framework/Whatever/Charts/piechart.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var objects_service_1 = require('../../../models/objects/objects.service');
var dashboard_component_1 = require('../../../Framework/Whatever/Dashboard/dashboard.component');
var widget_component_1 = require('../../../Framework/Whatever/Dashboard/widget.component');
var grid_component_1 = require('../../../framework/whatever/grid/grid.component');
var ObjectDashBoard = (function () {
    function ObjectDashBoard(ObjS) {
        this.ObjS = ObjS;
        this.pagePath = "Asset / Dashboard";
        this.alignContent = "horizontal";
        this.ObjectClass = '';
        this.Division = 'Division';
        this.ObjectCategory = 'Asset';
        this.calculatedHeight = 100;
        this.inputItems = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.sortCol1 = "";
        this.sortDir1 = "ASC";
        this.sortCol2 = "";
        this.sortDir2 = "ASC";
    }
    ObjectDashBoard.prototype.ngOnInit = function () {
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
                contextObj.ObjectCategory = "Asset";
                break;
            case 2:
                contextObj.pagePath = "Furniture / Dashboard";
                contextObj.ObjectClass = "Furniture Class";
                contextObj.ObjectCategory = "Furniture";
                break;
        }
        contextObj.LoadObjectClassListForChartDashboard();
        contextObj.LoadObjectDistByOrgUnitForDashboard();
    };
    ObjectDashBoard.prototype.LoadObjectClassListForChartDashboard = function () {
        var contextObjClassListForChart = this;
        this.ObjS.GetObjectClassListForChartDashboard(contextObjClassListForChart.objectCategoryId).subscribe(function (resultData) {
            var NoofObjectsArr = JSON.parse(resultData);
            contextObjClassListForChart.PieChart1Data = { data: [], chartWidth: contextObjClassListForChart.calculatedWidth, chartHeight: contextObjClassListForChart.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, NoofObjectsArr_1 = NoofObjectsArr; _i < NoofObjectsArr_1.length; _i++) {
                var item = NoofObjectsArr_1[_i];
                contextObjClassListForChart.PieChart1Data.data.push({
                    key: item["Classes"], y: item["No. of Objects"]
                });
            }
        });
    };
    ObjectDashBoard.prototype.LoadObjectDistByOrgUnitForDashboard = function () {
        var contextObjectDistByOrgUnit = this;
        this.ObjS.GetObjectDistByOrgUnitForDashboard(contextObjectDistByOrgUnit.objectCategoryId).subscribe(function (resultData) {
            var DistByOrgUnit = JSON.parse(resultData);
            contextObjectDistByOrgUnit.PieChart2Data = { data: [], chartWidth: contextObjectDistByOrgUnit.calculatedWidth, chartHeight: contextObjectDistByOrgUnit.calculatedHeight, legendPosition: "top" };
            for (var _i = 0, DistByOrgUnit_1 = DistByOrgUnit; _i < DistByOrgUnit_1.length; _i++) {
                var item = DistByOrgUnit_1[_i];
                contextObjectDistByOrgUnit.PieChart2Data.data.push({
                    key: item["OrgUnit"], y: item["NoofObjects"]
                });
            }
        });
    };
    ObjectDashBoard.prototype.ngAfterViewInit = function () {
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
    };
    ObjectDashBoard.prototype.dataLoad1 = function () {
        var contextObj = this;
        this.ObjS.GetObjectClassList(contextObj.objectCategoryId, contextObj.sortCol1, contextObj.sortDir1).subscribe(function (result) {
            contextObj.itemsSource1 = JSON.parse(result["Data"].FieldBinderData);
        });
    };
    ObjectDashBoard.prototype.dataLoad2 = function () {
        var contextObj = this;
        this.ObjS.GetObjectClassListByFloor(contextObj.objectCategoryId, contextObj.sortCol2, contextObj.sortDir2).subscribe(function (result) {
            contextObj.itemsSource2 = JSON.parse(result["Data"].FieldBinderData);
        });
    };
    ObjectDashBoard.prototype.onSort1 = function (objGrid) {
        var contextObj = this;
        contextObj.sortCol1 = objGrid.sortCol;
        contextObj.sortDir1 = objGrid.sortDir;
        this.dataLoad1();
    };
    ObjectDashBoard.prototype.onSort2 = function (objGrid) {
        var contextObj = this;
        contextObj.sortCol2 = objGrid.sortCol;
        contextObj.sortDir2 = objGrid.sortDir;
        this.dataLoad2();
    };
    ObjectDashBoard = __decorate([
        core_1.Component({
            selector: 'objectdashboard',
            directives: [piechart_component_1.PieChart, page_component_1.PageComponent, dashboard_component_1.DashboardComponent, widget_component_1.WidgetComponent, grid_component_1.GridComponent],
            providers: [objects_service_1.ObjectsService],
            templateUrl: "./app/Views/Objects/DashBoard/objectdashboard.component.html",
            inputs: ["objectCategoryId", "moduleId"]
        }), 
        __metadata('design:paramtypes', [objects_service_1.ObjectsService])
    ], ObjectDashBoard);
    return ObjectDashBoard;
}());
exports.ObjectDashBoard = ObjectDashBoard;
//# sourceMappingURL=objectdashboard.component.js.map
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
var multibarchart_component_1 = require('../../../Framework/Whatever/Charts/multibarchart.component');
var asbuilt_service_1 = require('../../../models/Asbuilts/asbuilt.service');
var dashboard_component_1 = require('../../../Framework/Whatever/Dashboard/dashboard.component');
var widget_component_1 = require('../../../Framework/Whatever/Dashboard/widget.component');
var grid_component_1 = require('../../../framework/whatever/grid/grid.component');
var AsbuiltsDashBoard = (function () {
    function AsbuiltsDashBoard(ABS) {
        this.ABS = ABS;
        this.imgData = "";
        this.pagePath = "As Builts / Dashboard";
        this.alignContent = "horizontal";
        this.UserCount = '';
        this.AreaUnit = 'Sq. Ft.';
        this.DwgCount = '';
        this.inputItems = { dataKey: "", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.BuildingImageMap = [];
        this.calculatedHeight = 100;
    }
    AsbuiltsDashBoard.prototype.ngOnInit = function () {
        var contextObj = this;
        if (window["IsMobile"] == false) {
            contextObj.calculatedWidth = $(".pageContent").width() / 2.10;
            contextObj.calculatedHeight = $(".pageContent").height() / 2;
        }
        else {
            contextObj.calculatedWidth = $(".pageContent").width();
            contextObj.calculatedHeight = $(".pageContent").height();
        }
        contextObj.LoadSubscribedFeatureForAreaUnit();
        contextObj.LoadAsbuiltsDashBoard();
    };
    AsbuiltsDashBoard.prototype.LoadAsbuiltsDashBoard = function () {
        var contextObj = this;
        this.ABS.GetDetailsForDashBoard().subscribe(function (resultData) {
            debugger;
            var temparr = JSON.parse(resultData).slice(0, 200);
            contextObj.DrawingCategoryCountMap = {};
            contextObj.BuildingImageMap = [];
            contextObj.itemsSource = temparr;
            contextObj.sourceLength = contextObj.itemsSource.length;
            for (var _i = 0, temparr_1 = temparr; _i < temparr_1.length; _i++) {
                var item = temparr_1[_i];
                contextObj.LoadDrawingCategoryCount(item["BuildingId"]);
                contextObj.LoadBuildingImage(item["BuildingId"], item["Photo"]);
            }
        });
    };
    AsbuiltsDashBoard.prototype.LoadSubscribedFeatureForAreaUnit = function () {
        var contextObjAreaUnit = this;
        this.ABS.checkSubscribedFeature("32").subscribe(function (resultData) {
            if (resultData["Data"][0].FeatureLookupId == 4) {
                this.contextObjAreaUnit.AreaUnit = 'Sq.Mt.';
            }
        });
    };
    AsbuiltsDashBoard.prototype.LoadDrawingCategoryCount = function (event) {
        var contextObj = this;
        this.ABS.GetDrawingCategoriesCountforDashboard(event).subscribe(function (resultData) {
            var Arr = JSON.parse(resultData);
            var PieChartData = { data: [], chartWidth: contextObj.calculatedWidth, chartHeight: contextObj.calculatedHeight - 100, legendPosition: "top" };
            for (var _i = 0, Arr_1 = Arr; _i < Arr_1.length; _i++) {
                var item = Arr_1[_i];
                PieChartData.data.push({
                    key: item["Category"], y: item["No.OfDrawings"]
                });
            }
            contextObj.DrawingCategoryCountMap[event] = PieChartData;
        });
    };
    AsbuiltsDashBoard.prototype.LoadBuildingImage = function (bldngId, bldngPhoto) {
        var contextObj = this;
        if (bldngPhoto != null) {
            var fileExtension = bldngPhoto.replace(/^.*\./, '');
            contextObj.ABS.DownloadBuildingImage(bldngId, bldngPhoto).subscribe(function (resultData) {
                if (resultData._body != "Data is Null") {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    if (fileExtension.toUpperCase() == "JPG" || fileExtension.toUpperCase() == "JPEG") {
                        contextObj.imgData = "data:image/jpeg;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                    }
                    else if (fileExtension == "png") {
                        contextObj.imgData = "data:image/png;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                    }
                    else if (fileExtension == "bmp") {
                        ;
                        contextObj.imgData = "data:image/bmp;base64," + JSON.parse(JSON.stringify(resultData._body).trim());
                    }
                }
                else {
                    contextObj.imgData = undefined;
                }
                contextObj.BuildingImageMap[bldngId] = contextObj.imgData;
            });
        }
        else {
            contextObj.BuildingImageMap[bldngId] = undefined;
        }
    };
    AsbuiltsDashBoard.prototype.base64ToArrayBuffer = function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };
    AsbuiltsDashBoard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            directives: [piechart_component_1.PieChart, multibarchart_component_1.MultiBarChart, page_component_1.PageComponent, dashboard_component_1.DashboardComponent, widget_component_1.WidgetComponent, grid_component_1.GridComponent],
            providers: [asbuilt_service_1.AsbuiltService],
            templateUrl: "./app/Views/Asbuilts/DashBoard/asbuiltsdashboard.component.html"
        }), 
        __metadata('design:paramtypes', [asbuilt_service_1.AsbuiltService])
    ], AsbuiltsDashBoard);
    return AsbuiltsDashBoard;
}());
exports.AsbuiltsDashBoard = AsbuiltsDashBoard;
//# sourceMappingURL=asbuiltsdashboard.component.js.map
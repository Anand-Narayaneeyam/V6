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
var reportviewercomponent_1 = require('../../../../Framework/Whatever/ReportViewer/reportviewercomponent');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var AssetListByFloorComponent = (function () {
    function AssetListByFloorComponent() {
        this.objectCatId = 1;
    }
    AssetListByFloorComponent.prototype.ngOnInit = function () {
        this.ReportData = new AssetListByFloorComponent();
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 7;
        this.ReportData.ReportCategoryId = 107;
        this.ReportData.ExportFileName = "Asset List by Floor";
        this.ReportData.ReportTitle = "Asset List by Floor";
        this.ReportData.ReportSubTitle = "";
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 3650,
            Value: this.Ids.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 67,
            Value: this.objectCatId.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Assets / Asset List by Floor";
    };
    AssetListByFloorComponent = __decorate([
        core_1.Component({
            selector: 'assetListByFloor-report',
            template: "\n    <page  [pagetitle]=\"pagePath\">\n        <content>\n            <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n            </div>\n        </content>\n    </page>\n\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            inputs: ['Ids']
        }), 
        __metadata('design:paramtypes', [])
    ], AssetListByFloorComponent);
    return AssetListByFloorComponent;
}());
exports.AssetListByFloorComponent = AssetListByFloorComponent;
//# sourceMappingURL=asset.listbyfloor.report.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require('@angular/http');
var httphelpers_1 = require('../../../whatever/utils/httphelpers');
require('rxjs/Rx');
var DrawingService = (function (_super) {
    __extends(DrawingService, _super);
    function DrawingService(http) {
        _super.call(this, http);
        this.http = http;
        this.getiDrawingsLayersUrl = 'Drawing/GetiDrawingsLayers';
        this._spaceMandatoryLayerFields = 'MockData/space//mandatorylayer-mockdata.json';
        this.customerSettings = 'Common/GetSubscribedFeatures';
        this.listDataListUrl = 'Common/GetAppFormDataList';
    }
    DrawingService.prototype.getiDrawingsLayers = function () {
        return this.postaction({}, this.getiDrawingsLayersUrl);
        //return this.getaction<Observable<any>>(this._spaceMandatoryLayerFields);
    };
    DrawingService.prototype.getCustomerSettings = function () {
        return this.postaction({
            input: "{Id:0}",
            FeatureCategoryIds: "31"
        }, this.customerSettings);
    };
    DrawingService.prototype.getDefaultDrawingLayerListData = function (pagedeatils, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: 562,SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + pagedeatils + "}" }, this.listDataListUrl);
    };
    DrawingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DrawingService);
    return DrawingService;
}(httphelpers_1.HttpHelpers));
exports.DrawingService = DrawingService;
//# sourceMappingURL=drawing.service.js.map
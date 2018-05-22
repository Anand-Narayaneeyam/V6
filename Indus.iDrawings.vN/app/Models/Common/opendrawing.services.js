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
var HttpHelpers_1 = require('../../Whatever/utils/HttpHelpers');
require('rxjs/Rx');
var OpendrawingService = (function (_super) {
    __extends(OpendrawingService, _super);
    // private _spaceMandatoryLayerFields = 'MockData/space//mandatorylayer-mockdata.json';
    function OpendrawingService(http) {
        _super.call(this, http);
        this.http = http;
        this.iDrawingLayers = 'Drawing/GetiDrawingsLayers'; //mandatorylayer-mockdata.json
        this.customerSettings = 'Common/GetSubscribedFeatures';
        this.mandatoryLayers = 'Drawing/GetMandatoryLayers';
        this.drawinDetailsUrl = 'Drawing/GetOpenDrawingDetails';
        this.getSessionValues = 'Common/GetSessionValues';
        this.getIsModuleAdminUrl = 'Common/IsModuleAdmin';
        this.accessibleModuleForUserUrl = 'Common/GetAccessibleModulesForUser';
    }
    OpendrawingService.prototype.getiDrawingLayers = function () {
        return this.postaction({}, this.iDrawingLayers);
        //return this.getaction<Observable<any>>(this._spaceMandatoryLayerFields);
    };
    OpendrawingService.prototype.getCustomerSettings = function () {
        return this.postaction({
            input: "{Id:0}",
            FeatureCategoryIds: "7,8,11,29,31,32,42,187,186,190,192,195,189,285,49,51,53,80,88,96,126,136,146,224,17,19,21,78,86,94,222,124,134,144"
        }, this.customerSettings);
    };
    OpendrawingService.prototype.getMandatoryLayers = function (moduleId) {
        return this.postaction({
            input: "{ListReportFieldIdValues:[{\"ReportFieldId\":548,\"Value\":\"" + moduleId + "\"}]}" }, this.mandatoryLayers);
    };
    OpendrawingService.prototype.getDrawingDetails = function (drawingId, isBuilding) {
        if (isBuilding == undefined || isBuilding == null)
            isBuilding = false;
        return this.postaction({ Input: "{ EntityId:" + drawingId + ",ListReportFieldIdValues:[{\"ReportFieldId\":4308,\"Value\":\"" + isBuilding + "\"}]}" }, this.drawinDetailsUrl);
    };
    OpendrawingService.prototype.getSessionData = function () {
        return this.postaction({}, this.getSessionValues);
    };
    OpendrawingService.prototype.getIsModuleAdmin = function (moduleId) {
        return this.postaction({
            input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}"
        }, this.getIsModuleAdminUrl);
    };
    OpendrawingService.prototype.getAccessibleModuleForUser = function () {
        return this.postaction({ applnInput: "{FormId:0}" }, this.accessibleModuleForUserUrl);
    };
    OpendrawingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OpendrawingService);
    return OpendrawingService;
}(HttpHelpers_1.HttpHelpers));
exports.OpendrawingService = OpendrawingService;
//# sourceMappingURL=opendrawing.services.js.map
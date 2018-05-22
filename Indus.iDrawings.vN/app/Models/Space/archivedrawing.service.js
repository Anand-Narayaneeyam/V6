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
var HttpHelpers_1 = require('../../Whatever/utils/HttpHelpers');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/Rx');
var ArchiveDrawingService = (function (_super) {
    __extends(ArchiveDrawingService, _super);
    function ArchiveDrawingService() {
        _super.apply(this, arguments);
        this.getAllArchiveSpaceDetailsUrl = 'Space/GetAllArchiveSpaceDetails';
        this.getArchiveDisplaySettingsUrl = 'Space/GetArchiveDisplaySettings';
        this.getArchivedSpaceLeaderlineDetailsUrl = 'Space/GetArchivedSpaceLeaderlineDetails';
    }
    ArchiveDrawingService.prototype.getAllArchiveSpaceDetails = function (drawingId, archiveID) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":1591,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":1590,\"Value\":\"" + archiveID + "\"}]}" }, this.getAllArchiveSpaceDetailsUrl);
    };
    ArchiveDrawingService.prototype.getArchiveDisplaySettings = function (drawingId, archiveID) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":1534,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":1533,\"Value\":\"" + archiveID + "\"}]}" }, this.getArchiveDisplaySettingsUrl);
    };
    ArchiveDrawingService.prototype.getArchivedSpaceLeaderlineDetails = function (drawingId, archiveID) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":1588,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":1587,\"Value\":\"" + archiveID + "\"}]}" }, this.getArchivedSpaceLeaderlineDetailsUrl);
    };
    ArchiveDrawingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ArchiveDrawingService);
    return ArchiveDrawingService;
}(HttpHelpers_1.HttpHelpers));
exports.ArchiveDrawingService = ArchiveDrawingService;
//# sourceMappingURL=archivedrawing.service.js.map
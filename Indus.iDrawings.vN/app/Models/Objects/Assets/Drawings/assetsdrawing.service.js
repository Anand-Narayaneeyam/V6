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
var HttpHelpers_1 = require('../../../../Whatever/utils/HttpHelpers');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/Rx');
var AssetsDrawingService = (function (_super) {
    __extends(AssetsDrawingService, _super);
    function AssetsDrawingService() {
        _super.apply(this, arguments);
        //get asset details
        this.allobjectsDataUrl = 'Object/GetObjectsDetails';
        //_displaySetingsDataUrl = 'Common/GetDisplaySettingData';
        this.allAssetsSymbolUrl = 'Object/GetAllSymbolDetails';
        this.updateSymbols = 'Object/UpdateObjectSpaceDetails';
        this._getUserEditableOrgUnitsUrl = 'SpaceDrawing/GetUserEditableOrgUnits';
        this._displaySetingsDataUrl = "Drawing/GetDisplaySettingsCategoryFieldsForDrawing";
        this._displayAssetsCountUrl = "Object/GetObjectToolTip";
        //--Move
        this.getAssetsSheduledToMoveUrl = 'EmployeeDrawing/GetEmployeeSheduledToMove';
    }
    // __displaySetingsDataUrl = 'Object/GetObjectsWithSpaceDetails';
    //Get all asset details -- ObjectCategoryId : 1 Assets Module ID:7 displaysettings categoryid=3 Additionalcategoryid:19
    AssetsDrawingService.prototype.getAllAssetsDetails = function (ObjectCategory, DrawingIds, DataOption, ObjectId) {
        //debugger;    
        return this.postaction({ Input: "{ FormId: 0}", ReportFieldIdsandValues: '', ObjectCategory: ObjectCategory.toString(), DataOption: DataOption.toString(), AttributeOption: "2", ObjectClassIds: '', DrawingIds: DrawingIds, SearchCondition: '', IsOrphan: 'false', ObjectId: ObjectId, IsDataBasedOnUserAccess: 'false', ObjectComponentType: "0" }, this.allobjectsDataUrl);
    };
    //for display data ObjectCategoryId : 1 Assets Module ID:7 displaysettings categoryid=3 Additionalcategoryid:19
    AssetsDrawingService.prototype.getObjectsDisplaySettingsData = function (categoryId, addtlDataFieldCategoryId, objectCategoryId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"" + categoryId + "\"},{ \"ReportFieldId\":4281,\"Value\":\"" + objectCategoryId + "\"},{\"ReportFieldId\":24,\"Value\":\"" + addtlDataFieldCategoryId + "\"},{ \"ReportFieldId\":647,\"Value\":\"0\"}]}" }, this._displaySetingsDataUrl);
    };
    //for symbol data  -- ObjectCategoryId : 1 Assets ObjectCategoryId : 1 Assets Module ID:7 displaysettings categoryid=3 Additionalcategoryid:19
    AssetsDrawingService.prototype.getAssetsSymbolData = function (ObjectCategoryId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":672,\"Value\":\"" + ObjectCategoryId + "\"}]}" }, this.allAssetsSymbolUrl);
    };
    //for: after place functionality update the symbol details int the table
    AssetsDrawingService.prototype.updateAssetsSymbolData = function (StatusId, SpaceId, Xposition, Yposition, Angle, DrawingId, ObjectCategoryId, SiteId, ObjectId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":659,\"Value\":" + StatusId + "},{\"ReportFieldId\":665,\"Value\":" + SpaceId + "},{\"ReportFieldId\":666,\"Value\":" + Xposition + "},{\"ReportFieldId\":667,\"Value\":" + Yposition + "},{\"ReportFieldId\":668,\"Value\":" + Angle + "},{\"ReportFieldId\":669,\"Value\":" + DrawingId + "},{\"ReportFieldId\":658,\"Value\":" + ObjectCategoryId + "},{\"ReportFieldId\":7411,\"Value\":" + SiteId + "}], Id: " + ObjectId + " }" }, this.updateSymbols);
    };
    AssetsDrawingService.prototype.getUserEditableOrgUnits = function () {
        return this.postaction({ Input: "{ FormId: 0 }" }, this._getUserEditableOrgUnitsUrl);
    };
    AssetsDrawingService.prototype.getAssetsSheduledToMove = function (ObjectId) {
        return this.postaction({ Input: "{ EntityId:" + ObjectId + " }" }, this.getAssetsSheduledToMoveUrl);
    };
    //for getting assetcount details in space //spOBJ_GetObjectToolTip(@SpaceId~665,@DrawingId~669)
    AssetsDrawingService.prototype.getAssetsCount = function (DrawingId, ObjectCategoryId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":669,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":649,\"Value\":\"" + ObjectCategoryId + "\"}]}" }, this._displayAssetsCountUrl);
    };
    AssetsDrawingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AssetsDrawingService);
    return AssetsDrawingService;
}(HttpHelpers_1.HttpHelpers));
exports.AssetsDrawingService = AssetsDrawingService;
//# sourceMappingURL=assetsdrawing.service.js.map
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
var httphelpers_1 = require('../../whatever/utils/httphelpers');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/Rx');
var ObjectsDrawingService = (function (_super) {
    __extends(ObjectsDrawingService, _super);
    function ObjectsDrawingService() {
        _super.apply(this, arguments);
        //get asset details
        this.allobjectsDataUrl = 'Object/GetObjectsDetails';
        this.allBuildingobjectsDataUrl = 'Object/GetBuildingObjects';
        //_displaySetingsDataUrl = 'Common/GetDisplaySettingData';
        this.allAssetsSymbolUrl = 'Object/GetAllSymbolDetails';
        this.updateSymbols = 'Object/UpdateObjectSpaceDetails';
        this.updateBuildingSymbols = 'Object/InsertBuildingObjecDetails';
        this._getUserEditableOrgUnitsUrl = 'SpaceDrawing/GetUserEditableOrgUnits';
        this._displaySetingsDataUrl = "Drawing/GetDisplaySettingsCategoryFieldsForDrawing";
        this._displayAssetsCountUrl = "Object/GetObjectToolTip";
        this.getColorPrefernceDataUrl = 'Common/GetColorPreferenceSettings';
        this.UpdateOrphanObjectsUrl = 'Object/UpdateOrphanObjects';
        //--Move
        this.getAssetsSheduledToMoveUrl = 'EmployeeDrawing/GetEmployeeSheduledToMove';
    }
    // __displaySetingsDataUrl = 'Object/GetObjectsWithSpaceDetails';
    //Get all asset details -- ObjectCategoryId : 1 Assets Module ID:7 displaysettings categoryid=3 Additionalcategoryid:19
    ObjectsDrawingService.prototype.getAllAssetsDetails = function (ObjectCategory, DrawingIds, DataOption, ObjectId, IsbuildingDarwing, IsOrphan) {
        debugger;
        var isOrphan;
        if (IsOrphan == undefined || IsOrphan == null)
            isOrphan = false;
        else
            isOrphan = IsOrphan;
        if (IsbuildingDarwing == false) {
            return this.postaction({ Input: "{ FormId: 0}", ReportFieldIdsandValues: '', ObjectCategory: ObjectCategory.toString(), DataOption: DataOption.toString(), AttributeOption: "2", ObjectClassIds: '', DrawingIds: DrawingIds, SearchCondition: '', IsOrphan: isOrphan, ObjectId: ObjectId, IsDataBasedOnUserAccess: 'false', ObjectComponentType: "0", IsBuildingDrawing: IsbuildingDarwing }, this.allobjectsDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId: 0}", ReportFieldIdsandValues: '', ObjectCategory: ObjectCategory.toString(), DataOption: DataOption.toString(), AttributeOption: "2", ObjectClassIds: '', DrawingIds: DrawingIds, SearchCondition: '', IsOrphan: isOrphan, ObjectId: ObjectId, IsDataBasedOnUserAccess: 'false', ObjectComponentType: "0", IsBuildingDrawing: IsbuildingDarwing }, this.allBuildingobjectsDataUrl);
        }
    };
    //for display data ObjectCategoryId : 1 Assets Module ID:7 displaysettings categoryid=3 Additionalcategoryid:19
    ObjectsDrawingService.prototype.getObjectsDisplaySettingsData = function (categoryId, addtlDataFieldCategoryId, objectCategoryId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"" + categoryId + "\"},{ \"ReportFieldId\":4281,\"Value\":\"" + objectCategoryId + "\"},{\"ReportFieldId\":24,\"Value\":\"" + addtlDataFieldCategoryId + "\"},{ \"ReportFieldId\":647,\"Value\":\"0\"}]}" }, this._displaySetingsDataUrl);
    };
    //for symbol data  -- ObjectCategoryId : 1 Assets ObjectCategoryId : 1 Assets Module ID:7 displaysettings categoryid=3 Additionalcategoryid:19
    ObjectsDrawingService.prototype.getAssetsSymbolData = function (ObjectCategoryId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":672,\"Value\":\"" + ObjectCategoryId + "\"}]}" }, this.allAssetsSymbolUrl);
    };
    //for: after place functionality update the symbol details int the table
    ObjectsDrawingService.prototype.updateAssetsSymbolData = function (StatusId, SpaceId, Xposition, Yposition, Angle, DrawingId, ObjectCategoryId, SiteId, ObjectId, IsbuildingDarwing) {
        if (IsbuildingDarwing == false) {
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":659,\"Value\":" + StatusId + "},{\"ReportFieldId\":665,\"Value\":" + SpaceId + "},{\"ReportFieldId\":666,\"Value\":" + Xposition + "},{\"ReportFieldId\":667,\"Value\":" + Yposition + "},{\"ReportFieldId\":668,\"Value\":" + Angle + "},{\"ReportFieldId\":669,\"Value\":" + DrawingId + "},{\"ReportFieldId\":658,\"Value\":" + ObjectCategoryId + "},{\"ReportFieldId\":7411,\"Value\":" + SiteId + "}], Id: " + ObjectId + " }" }, this.updateSymbols);
        }
        else {
            var blockhandle = null;
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":4477,\"Value\":" + Xposition + "},{\"ReportFieldId\":4478,\"Value\":" + Yposition + "},{\"ReportFieldId\":4479,\"Value\":" + Angle + "},{\"ReportFieldId\":4475,\"Value\":" + DrawingId + "},{\"ReportFieldId\":4476,\"Value\":0}], Id: " + ObjectId + " }" }, this.updateBuildingSymbols);
        }
    };
    //for: after place functionality update the symbol details int the building table
    //updateAssetsSymbolDataforBuildig(Xposition: number, Yposition: number, Angle: number, DrawingId: number, BlockRefHandle: string, OldObjectId: number, ObjectId: number) {
    //    return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":4477,\"Value\":" + Xposition + "},{\"ReportFieldId\":4478,\"Value\":" + Yposition + "},{\"ReportFieldId\":4479,\"Value\":" + Angle + "},{\"ReportFieldId\":4475,\"Value\":" + DrawingId + "},{\"ReportFieldId\":4480,\"Value\":" + BlockRefHandle + "},{\"ReportFieldId\":4476,\"Value\":" + OldObjectId + "}], Id: " + ObjectId + " }" }, this.updateBuildingSymbols);
    //}
    ObjectsDrawingService.prototype.getUserEditableOrgUnits = function () {
        return this.postaction({ Input: "{ FormId: 0 }" }, this._getUserEditableOrgUnitsUrl);
    };
    ObjectsDrawingService.prototype.getAssetsSheduledToMove = function (ObjectId) {
        return this.postaction({ Input: "{ EntityId:" + ObjectId + " }" }, this.getAssetsSheduledToMoveUrl);
    };
    //for getting assetcount details in space //spOBJ_GetObjectToolTip(@SpaceId~665,@DrawingId~669)
    ObjectsDrawingService.prototype.getAssetsCount = function (DrawingId, ObjectCategoryId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":669,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":649,\"Value\":\"" + ObjectCategoryId + "\"}]}" }, this._displayAssetsCountUrl);
    };
    ObjectsDrawingService.prototype.getColorPreferenceDataForObjects = function (formId, ModuleId, rptField, isMySetting) {
        return this.postaction({ Input: "{ FormId:" + formId + ",ListReportFieldIdValues:" + rptField + " }", moduleId: ModuleId, selectedFieldName: "", isMySettings: isMySetting }, this.getColorPrefernceDataUrl);
    };
    ;
    ObjectsDrawingService.prototype.UpdateOrphanObjects = function (listReptValues, drawingCategoryId) {
        return this.postaction({ Input: "{EntityId:" + drawingCategoryId + ",ListReportFieldIdValues:" + listReptValues + "}" }, this.UpdateOrphanObjectsUrl);
    };
    ObjectsDrawingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ObjectsDrawingService);
    return ObjectsDrawingService;
}(httphelpers_1.HttpHelpers));
exports.ObjectsDrawingService = ObjectsDrawingService;
//# sourceMappingURL=objectsdrawing.service.js.map
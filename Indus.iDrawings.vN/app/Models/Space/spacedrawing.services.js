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
var SpaceDrawingService = (function (_super) {
    __extends(SpaceDrawingService, _super);
    function SpaceDrawingService() {
        _super.apply(this, arguments);
        //Space open Drawing
        this.getSpaceData = 'Space/GetAllSpaceDetails';
        this._displaySetingsDataUrl = 'Common/GetDisplaySettingData';
        this._displaySetingsDataTempUrl = 'Common/GetDisplaySettingDataTemp';
        this._updateDisplaySetingsDataUrl = 'Common/UpdateDisplaySettingsData';
        this._getOrgUnitDistributionMapDataUrl = 'SpaceDrawing/GetOrgUnitDistributionMapData';
        this._getOrgdistributionSettingsBasedOnDrawingsUrl = 'SpaceDrawing/GetOrgdistributionSettingsBasedOnDrawings';
        this._getSpFunctionDistributionMapDataUrl = 'SpaceDrawing/GetSpaceFunctionDistributionMapData';
        this._getSpstandardDistributionMapDataUrl = 'SpaceDrawing/GetSpaceStandardDistributionMapData';
        this._getAddDataFieldDistributionMapDataUrl = 'SpaceDrawing/GetAddlDataFieldLookupDistributionMapData';
        this._getSpFunctionDistributionSettingsBasedOnDrawingsUrl = 'spaceDrawing/GetSpFunctionDistributionSettingsBasedOnDrawings';
        this._getSpstandardDistributionSettingsBasedOnDrawingsUrl = 'spaceDrawing/GetSpStandardDistributionSettingsBasedOnDrawings';
        this._getAddDataFieldDistributionSettingsBasedOnDrawingsUrl = 'spaceDrawing/GetAddlDataFieldDistributionSettingsBasedOnDrawings';
        this._getColorPreferenceSettingsData = 'Space/GetColorSettings';
        this.editSpaceDataUrl = 'Common/GetEditAppFormFields';
        this.spaceTotalizeUrl = "Space/GetTotalizeData";
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this._UpdateXYCordinatesUrl = 'SpaceDrawing/UpdateXYCordinates';
        this._GetLeaderLineDetailsUrl = 'SpaceDrawing/GetLeaderLineDetails';
        this.getLayerFunctionMappingsUrl = 'SpaceDrawing/GetLayerFunctionMappings';
        this.spaceDataListFrmId = 103;
        this.spaceAddEditFrmId = 104;
        this.assignDeassignSpaceStdFrmId = 132;
        this.amnetiesFormId = 154;
        this._checkEditPrivilageExistUrl = 'Space/CheckEditPrivilageExist';
        //Employee open Drawing
        this._getEmpOrgUnitOccupancyDistributionMapLegendDataUrl = 'EmployeeDrawing/GetOrgUnitOccupancyDistributionMapLegendData';
        this._getOrgUnitSpaceStandardDistributionMapLegendDataUrl = 'EmployeeDrawing/GetOrgUnitSpaceStandardDistributionMapLegendData';
    }
    //*********** space Open Drawing ***********//
    SpaceDrawingService.prototype.getAllSpaceDetails = function (moduleId, drawingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this.getSpaceData);
    };
    SpaceDrawingService.prototype.getSpaceDisplaySettingsData = function (categoryId, addtlDataFieldCategoryId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"" + categoryId + "\"},{\"ReportFieldId\":24,\"Value\":\"" + addtlDataFieldCategoryId + "\"}]}" }, this._displaySetingsDataUrl);
    };
    SpaceDrawingService.prototype.getOrgUnitDistributionMapData = function (orglevelNo, drawingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + orglevelNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":286,\"Value\":\"0\"}]}" }, this._getOrgUnitDistributionMapDataUrl);
    };
    SpaceDrawingService.prototype.getOrgdistributionSettingsBasedOnDrawings = function (orglevelNo, moduleId, drawingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + orglevelNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}" }, this._getOrgdistributionSettingsBasedOnDrawingsUrl);
    };
    SpaceDrawingService.prototype.getDistributionMapValidatedFieldsData = function (fieldId, moduleId, drawingId) {
        if (fieldId == 0)
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":791,\"Value\":\"0\"}]}" }, this._getSpFunctionDistributionMapDataUrl);
        else if (fieldId == -1)
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":790,\"Value\":\"0\"}]}" }, this._getSpstandardDistributionMapDataUrl);
        else if (fieldId > 0)
            return this.postaction({
                Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":8369,\"Value\":\"" + fieldId + "\"}]}"
            }, this._getAddDataFieldDistributionMapDataUrl);
    };
    SpaceDrawingService.prototype.getValidatedFieldsSettingsBasedOnDrawings = function (fieldId, moduleId, drawingId) {
        if (fieldId == 0)
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this._getSpFunctionDistributionSettingsBasedOnDrawingsUrl);
        else if (fieldId == -1)
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this._getSpstandardDistributionSettingsBasedOnDrawingsUrl);
        else if (fieldId > 0)
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":20,\"Value\":\"" + fieldId + "\"}]}" }, this._getAddDataFieldDistributionSettingsBasedOnDrawingsUrl);
    };
    //*********** employee Open Drawing ***********//
    SpaceDrawingService.prototype.getEmpOrgUnitOccupancyDistributionMapLegendData = function (orglevelNo, drawingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + orglevelNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this._getEmpOrgUnitOccupancyDistributionMapLegendDataUrl);
    };
    SpaceDrawingService.prototype.getOrgUnitSpaceStandardDistributionMapLegendData = function (orglevelNo, drawingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + orglevelNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":286,\"Value\":\"0\"}]}" }, this._getOrgUnitSpaceStandardDistributionMapLegendDataUrl);
    };
    SpaceDrawingService.prototype.loadSpaceAddEdit = function (selectedId) {
        var lookupRptField = "[{\"FieldId\":737,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":737,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":738,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":739,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":740,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":741,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        return this.postaction({
            Input: "{ FormId:" + this.spaceAddEditFrmId + ",ParentFormId:" + this.spaceDataListFrmId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:" + lookupRptField + "}"
        }, this.editSpaceDataUrl);
    };
    SpaceDrawingService.prototype.getColorPreferenceSettingsData = function () {
        return this.postaction({}, this._getColorPreferenceSettingsData);
    };
    SpaceDrawingService.prototype.getTotalizeSpace = function (selectedIds) {
        var rptFieldValues = "[{\"ReportFieldId\":780,\"Value\":\"" + selectedIds + "\"}]";
        return this.postaction({ Input: "{ListReportFieldIdValues: " + rptFieldValues + "}" }, this.spaceTotalizeUrl);
    };
    SpaceDrawingService.prototype.checkEditPrivilageExist = function (spaceId) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this._checkEditPrivilageExistUrl);
    };
    SpaceDrawingService.prototype.loadAssignDeAssignSpacesStd = function (selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + "}" }, this.editSpaceDataUrl);
    };
    SpaceDrawingService.prototype.getAmenitiesData = function (index, column, direction, filter) {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    };
    SpaceDrawingService.prototype.UpdateXYCordinates = function (spaceId, currentXCord, currentYCord, previousXCord, previousYCord, destinationSpaceId, hasLeaderLine) {
        var rptfId = "";
        if (hasLeaderLine != undefined && hasLeaderLine != null)
            rptfId = "{\"ReportFieldId\":4769,\"Value\":\"" + false + "\"},";
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + rptfId + "{\"ReportFieldId\":745,\"Value\":\"" + spaceId + "\"},{\"ReportFieldId\":748,\"Value\":\"" + currentXCord + "\"},{\"ReportFieldId\":749,\"Value\":\"" + currentYCord + "\"},{\"ReportFieldId\":746,\"Value\":\"" + previousXCord + "\"},{\"ReportFieldId\":747,\"Value\":\"" + previousYCord + "\"}]}", DestinationSpaceId: destinationSpaceId }, this._UpdateXYCordinatesUrl);
    };
    SpaceDrawingService.prototype.GetLeaderLineDetails = function (drawingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":2059,\"Value\":\"" + drawingId + "\"}]}" }, this._GetLeaderLineDetailsUrl);
    };
    SpaceDrawingService.prototype.getLayerFunctionMappings = function () {
        return this.postaction({ Input: "{ FormId:" + this.assignDeassignSpaceStdFrmId + "}" }, this.getLayerFunctionMappingsUrl);
    };
    SpaceDrawingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SpaceDrawingService);
    return SpaceDrawingService;
}(HttpHelpers_1.HttpHelpers));
exports.SpaceDrawingService = SpaceDrawingService;
//# sourceMappingURL=spacedrawing.services.js.map
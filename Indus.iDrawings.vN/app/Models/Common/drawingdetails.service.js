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
var DrawingDetailsService = (function (_super) {
    __extends(DrawingDetailsService, _super);
    function DrawingDetailsService(http) {
        _super.call(this, http);
        this.http = http;
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.addDataUrl = 'Common/GetAddAppFormFields';
        this.editDataUrl = 'Common/GetEditAppFormFields';
        this.lookupUrl = 'Common/GetFieldLookupValues';
        this._submitURL = 'Common/UpdateAppFormData';
        this.submitEditUrl = 'Common/UpdateAppFormData';
        /*space drawing list*/
        this.lockedUrl = 'Drawing/GetLockedDrawings';
        this._spaceDrawingsListData = 'MockData/Data/spaceDrawingListData.json';
        this._spaceDrawingsListFieldData = 'MockData/FieldObjects/spaceDrawingListFieldObjects.json';
        /*space unlock drawing list*/
        this._spaceUnlockdrawingListData = 'MockData/Data/unlock_drawing_list.json';
        this._spaceUnlockdrawingFields = 'MockData/FieldObjects/unlockdrawingfieldobject.json';
        this._spaceDrawingmenuData = 'MockData/Space/spaceDrawing_menuData.json';
        this.revisionDetailsData = 'MockData/Data/dwg_revision_listdata.json';
        this.revisionDetailsFieldData = 'MockData/FieldObjects/dwg_revision_fieldobjects.json';
        this.markupsDetailsData = "MockData/Data/dwg_markuplistData.json";
        this.markupsDetailsFieldData = "MockData/FieldObjects/dwg_markuplistFieldObjects.json";
        /*private markupsTextStyles = "MockData/Data/ddlmarkupsTextStyles.json";
        private markupsFontSize = "MockData/Data/ddlmarkupsFontSize.json";*/
        this.moduleSwitchData = 'MockData/Data/moduleswitch-drawing_data.json';
        this.markupCommentData = 'app/Models/Asbuilts/Drawing_Data/markup_Drawing_Data.json';
        this.DrawingFloorAccessFields_url = 'MockData/Data/user-drawing_floor-accessFieldsList.json';
        this.DrawingFloorAccess_url = 'MockData/Data/user-drawing-floor-access.json';
        this.insertMarkupUrl = 'Drawing/InsertMarkupDrawing';
        this.updateMarkupUrl = 'Drawing/UpdateMarkupDrawing';
        this.getXmlStringUrl = 'Drawing/GetMarkupXml';
        this.submitDescription = 'Drawing/UpdateMarkupDescription';
        this.deleteMarkupsUrl = 'Drawing/DeleteMarkupDrawing';
        this.deleteUrl = 'Common/DeleteAppFormData';
        /*Space Drawing*/
        this.spacelockedDrawingsUrl = 'Drawing/GetLockedDrawingsData';
        this.spaceDistributionMenu = 'SpaceDrawing/GetDistributionMapFieldListFromDrawingWithLevels';
        this.DeleteSpaceData = 'SpaceDrawing/DeleteSpaceData';
        this.getSessionValues = 'Common/GetSessionValues';
        //project module
        this.insertProjectDwgMarkupUrl = 'Project/InsertMarkupDrawing';
        this.getProjectMarkupXmlStringUrl = 'Project/GetMarkupXml';
        this.markupFloorFormId = 81;
        this.markupBuildingFormId = 82;
        this.buildingDrawingMarkupListId = 57;
        this.floorDrawingMarkupListId = 60;
        this.buildingDrawingRevisionListId = 58;
        this.floorDrawingRevisionListId = 64;
        this.buildingDrawingEditRevisionFormId = 135;
        this.FloorDrawingEditRevisionFormId = 136;
        this.editBuildingMarkupDes = 315;
        this.editFloorMarkupDes = 316;
    }
    DrawingDetailsService.prototype.getspaceDrawingsListData = function () {
        return this.getaction(this._spaceDrawingsListData);
    };
    DrawingDetailsService.prototype.getspaceDrawingsListFields = function () {
        return this.getaction(this._spaceDrawingsListFieldData);
    };
    DrawingDetailsService.prototype.getspacelockdrawingListData = function (ModuleId) {
        return this.postaction({ applnInput: "{ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"},{\"ReportFieldId\":278,\"Value\":\"" + ModuleId + "\"}]}" }, this.spacelockedDrawingsUrl);
    };
    DrawingDetailsService.prototype.sortSpaceDrawing = function (formId, direction, column, moduleId) {
        return this.postaction({ Input: "{ FormId: " + formId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "', ListReportFieldIdValues: [{ \"ReportFieldId\":584,\"Value\":\"" + Math.pow(2, moduleId).toString() + "\"}]}" }, this.listDataListUrl);
    };
    DrawingDetailsService.prototype.sortSpaceUnlockDrawing = function (direction, column, moduleId) {
        return this.postaction({ applnInput: "{ SortColumn:'" + column + "',SortDirection:'" + direction + "', ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, moduleId).toString() + "\"},{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}" }, this.spacelockedDrawingsUrl);
    };
    DrawingDetailsService.prototype.getspaceUnlockdrawingFields = function () {
        return this.getaction(this._spaceUnlockdrawingFields);
    };
    DrawingDetailsService.prototype.getspaceDrawingMenuData = function () {
        return this.getaction(this._spaceDrawingmenuData);
    };
    DrawingDetailsService.prototype.getMarkupsDetailsFields = function (drawingType) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingMarkupListId + "}" }, this.listFieldObjUrl);
        else if (drawingType == 1)
            return this.postaction({ Input: "{FormId:" + this.floorDrawingMarkupListId + "}" }, this.listFieldObjUrl);
    };
    DrawingDetailsService.prototype.getMarkupsDetailsData = function (drawingType, drawingId, revisionNo, column, direction) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingMarkupListId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "' ,ListReportFieldIdValues:[{\"ReportFieldId\":4389,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":4390,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":4388,\"Value\":\"0\"}]}" }, this.listDataListUrl);
        else if (drawingType == 1)
            return this.postaction({ Input: "{FormId:" + this.floorDrawingMarkupListId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "' ,ListReportFieldIdValues:[{\"ReportFieldId\":551,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":552,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":550,\"Value\":\"0\"}]}" }, this.listDataListUrl);
    };
    DrawingDetailsService.prototype.getRevisionDetailsFields = function (drawingType) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingRevisionListId + "}" }, this.listFieldObjUrl);
        else if (drawingType == 1)
            return this.postaction({ Input: "{FormId:" + this.floorDrawingRevisionListId + "}" }, this.listFieldObjUrl);
    };
    DrawingDetailsService.prototype.getRevisionDetailsData = function (drawingType, drawingId, revisionNo) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingRevisionListId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":4376,\"Value\":\"" + drawingId + "\"}]}" }, this.listDataListUrl);
        else if (drawingType == 1)
            return this.postaction({ Input: "{FormId:" + this.floorDrawingRevisionListId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":510,\"Value\":\"" + drawingId + "\"}]}" }, this.listDataListUrl);
    };
    //revison
    DrawingDetailsService.prototype.getRevisionDetailsDataPaging = function (index, column, direction, drawingType, drawingId, revisionNo) {
        //  return this.postaction({ Input: "{ FormId: " + formId + ",PageIndex:" + index + "}" }, this.listDataListUrl);
        if (drawingType == 0)
            return this.postaction({ Input: "{ FormId: " + this.buildingDrawingRevisionListId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":4376,\"Value\":\"" + drawingId + "\"}]}" }, this.listDataListUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.floorDrawingRevisionListId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " ,ListReportFieldIdValues:[{\"ReportFieldId\":510,\"Value\":\"" + drawingId + "\"}]}" }, this.listDataListUrl);
        //console.log('current page', index)
    };
    DrawingDetailsService.prototype.getRevisionsData = function (drawingType, drawingId, revisionNo, index, column, direction) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingRevisionListId + " ,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":4376,\"Value\":\"" + drawingId + "\"}]}" }, this.listDataListUrl);
        else
            return this.postaction({ Input: "{FormId:" + this.floorDrawingRevisionListId + " ,Id:" + revisionNo + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":510,\"Value\":\"" + drawingId + "\"}]}" }, this.listDataListUrl);
    };
    DrawingDetailsService.prototype.getEditBuildingDrawingFieldDetails = function (formId, selectedId, parentFormId, drawingId, revisionNo) {
        return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + selectedId + ",ParentFormId:" + parentFormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"},{\"ReportFieldId\":4376,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":4377,\"Value\":\"" + revisionNo + "\"}]}" }, this.editDataUrl);
        //return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + selectedId + ",ParentFormId:" + parentFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":4377,\"Value\":\"0\"}]}" }, this.editDataUrl);
    };
    DrawingDetailsService.prototype.getEditFloorDrawingFieldDetails = function (formId, selectedId, parentFormId, drawingId, revisionNo) {
        return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + selectedId + ",ParentFormId:" + parentFormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"},{\"ReportFieldId\":510,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":511,\"Value\":\"" + revisionNo + "\"}]}" }, this.editDataUrl);
    };
    DrawingDetailsService.prototype.updateRevisionDescription = function (drawingId, updateValue, drawingType, revisionNo, revisionobject) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingEditRevisionFormId + ",Id:" + drawingId + ",ParentFormId:" + this.buildingDrawingRevisionListId + " ,ListReportFieldIdValues:[" + updateValue + "," + revisionobject + ",{\"ReportFieldId\":4376,\"Value\":\"" + drawingId + "\"} ]}" }, this.submitEditUrl);
        else
            return this.postaction({ Input: "{FormId:" + this.FloorDrawingEditRevisionFormId + ",Id:" + drawingId + ",ParentFormId:" + this.floorDrawingRevisionListId + " ,ListReportFieldIdValues:[" + updateValue + "," + revisionobject + ",{\"ReportFieldId\":510,\"Value\":\"" + drawingId + "\"} ]}" }, this.submitEditUrl);
    };
    DrawingDetailsService.prototype.postRevisionDelete = function (drawingId, revisionNo, drawingType) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingRevisionListId + ",Id:" + drawingId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":4376,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":4377,\"Value\":\"" + revisionNo + "\"}]}" }, this.deleteUrl);
        else
            return this.postaction({ Input: "{FormId:" + this.floorDrawingRevisionListId + ",Id:" + drawingId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":510,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":511,\"Value\":\"" + revisionNo + "\"}]}" }, this.deleteUrl);
    };
    DrawingDetailsService.prototype.getDrawingListPaging = function (index) {
        console.log('current page', index);
    };
    DrawingDetailsService.prototype.getModuleSwitchData = function () {
        return this.getaction(this.moduleSwitchData);
    };
    DrawingDetailsService.prototype.getMarkupCommentData = function () {
        console.log("markupCommentData ", this.markupCommentData);
        return this.getaction(this.markupCommentData);
    };
    DrawingDetailsService.prototype.getDrawingFloorAccessFieldsList = function () {
        return this.getaction(this.DrawingFloorAccessFields_url);
    };
    DrawingDetailsService.prototype.getDrawingFloorAccessList = function () {
        return this.getaction(this.DrawingFloorAccess_url);
    };
    DrawingDetailsService.prototype.updateDrawingAccess = function (formObject) {
        console.log('User drawing access updated');
    };
    DrawingDetailsService.prototype.insertMarkupDetails = function (drawingType, XMLContent, Description, DrawingId, RevisionNo, isBuildingDrawing, moduleId, projectId) {
        if (moduleId == 2) {
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":1017,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":1018,\"Value\":\"" + RevisionNo + "\"},{\"ReportFieldId\":1021,\"Value\":\"" + Description + "\"},{\"ReportFieldId\":550,\"Value\":\"" + XMLContent + "\"},{\"ReportFieldId\":1010,\"Value\":\"" + projectId + "\"}]}" }, this.insertProjectDwgMarkupUrl);
        }
        else {
            if (drawingType == 0)
                return this.postaction({ Input: "{FormId:" + this.markupBuildingFormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":4389,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":4390,\"Value\":\"" + RevisionNo + "\"},{\"ReportFieldId\":4393,\"Value\":\"" + Description + "\"},{\"ReportFieldId\":4388,\"Value\":\"" + XMLContent + "\"}]}" }, this.insertMarkupUrl);
            else if (drawingType == 1)
                return this.postaction({ Input: "{FormId:" + this.markupFloorFormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":551,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":552,\"Value\":\"" + RevisionNo + "\"},{\"ReportFieldId\":555,\"Value\":\"" + Description + "\"},{\"ReportFieldId\":550,\"Value\":\"" + XMLContent + "\"}]}" }, this.insertMarkupUrl);
        }
    };
    DrawingDetailsService.prototype.updateMarkupDetails = function (markupId, drawingType, XMLContent, DrawingId, RevisionNo, isBuildingDrawing) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.markupBuildingFormId + " ,Id:" + markupId + ",ListReportFieldIdValues:[{\"ReportFieldId\":4389,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":4390,\"Value\":\"" + RevisionNo + "\"},{\"ReportFieldId\":4388,\"Value\":\"" + XMLContent + "\"}]}" }, this.updateMarkupUrl);
        else if (drawingType == 1)
            return this.postaction({ Input: "{FormId:" + this.markupFloorFormId + " ,Id:" + markupId + ",ListReportFieldIdValues:[{\"ReportFieldId\":551,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":552,\"Value\":\"" + RevisionNo + "\"},{\"ReportFieldId\":550,\"Value\":\"" + XMLContent + "\"}]}" }, this.updateMarkupUrl);
    };
    DrawingDetailsService.prototype.loadMarkupXmlString = function (DrawingId, RevisionNo, MarkupId, isBuildingDrawing) {
        return this.postaction({ DrawingId: DrawingId, RevisionNo: RevisionNo, MarkupId: MarkupId, isBuildingDrawing: isBuildingDrawing }, this.getXmlStringUrl);
        ;
    };
    DrawingDetailsService.prototype.loadProjectDrawingMarkupXmlString = function (DrawingId, RevisionNo, MarkupId, projectId) {
        return this.postaction({ DrawingId: DrawingId, RevisionNo: RevisionNo, MarkupId: MarkupId, ProjectId: projectId }, this.getProjectMarkupXmlStringUrl);
        ;
    };
    DrawingDetailsService.prototype.updateMarkupDescription = function (updateValue, selectedId, drawingType, drawingId, revisionNo) {
        if (drawingType == 0)
            return this.postaction({
                Input: "{ListReportFieldIdValues:[" + updateValue + ",{\"ReportFieldId\":4389,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":4390,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":4388,\"Value\":\"" + selectedId + "\"}],EntityId:" + selectedId + "}"
            }, this.submitDescription);
        else
            return this.postaction({
                Input: "{ListReportFieldIdValues:[" + updateValue + ",{\"ReportFieldId\":551,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":552,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":550,\"Value\":\"" + selectedId + "\"}],EntityId:" + selectedId + "}"
            }, this.submitDescription);
    };
    DrawingDetailsService.prototype.postMarkupDelete = function (markupId, drawingId, revisionNo, drawingType) {
        if (drawingType == 0)
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":4389,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":4390,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":4388,\"Value\":\"" + markupId + "\"}]}" }, this.deleteMarkupsUrl);
        else
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":551,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":552,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":550,\"Value\":\"" + markupId + "\"}]}" }, this.deleteMarkupsUrl);
    };
    DrawingDetailsService.prototype.getDrawingLockedCount = function (formId, ModuleId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.lockedUrl);
    };
    DrawingDetailsService.prototype.getLockedDrawingList = function (formId, ModuleId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.lockedUrl);
    };
    DrawingDetailsService.prototype.getSpaceDistributionMenuData = function (drawingId, moduleId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}" }, this.spaceDistributionMenu);
    };
    DrawingDetailsService.prototype.getSessionData = function () {
        return this.postaction({}, this.getSessionValues);
    };
    DrawingDetailsService.prototype.loadMarkupDesEdit = function (selectedId, isBuildingMarkup, drawingId, revisionNo) {
        var formId;
        var parentFormId;
        var listValues;
        if (isBuildingMarkup) {
            formId = this.editBuildingMarkupDes;
            parentFormId = this.buildingDrawingMarkupListId;
            listValues = "[{\"ReportFieldId\":471,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":4390,\"Value\":\"" + revisionNo + "\"}]}";
        }
        else {
            formId = this.editFloorMarkupDes;
            parentFormId = this.floorDrawingMarkupListId;
            listValues = "[{\"ReportFieldId\":522,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":552,\"Value\":\"" + revisionNo + "\"}]}";
        }
        return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + selectedId + ",ParentFormId:" + parentFormId + " ,ListReportFieldIdValues:" + listValues }, this.editDataUrl);
    };
    DrawingDetailsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DrawingDetailsService);
    return DrawingDetailsService;
}(HttpHelpers_1.HttpHelpers));
exports.DrawingDetailsService = DrawingDetailsService;
//# sourceMappingURL=drawingdetails.service.js.map
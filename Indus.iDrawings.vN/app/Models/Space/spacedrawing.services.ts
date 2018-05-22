import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from '../../Framework/Models//Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class SpaceDrawingService extends HttpHelpers {
    //Space open Drawing
    private getSpaceData = 'Space/GetAllSpaceDetails';
    private _displaySetingsDataUrl = 'Common/GetDisplaySettingData';
    private _displaySetingsDataTempUrl = 'Common/GetDisplaySettingDataTemp';
    private _updateDisplaySetingsDataUrl = 'Common/UpdateDisplaySettingsData';
    private _getOrgUnitDistributionMapDataUrl = 'SpaceDrawing/GetOrgUnitDistributionMapData';
    private _getOrgdistributionSettingsBasedOnDrawingsUrl = 'SpaceDrawing/GetOrgdistributionSettingsBasedOnDrawings';
    private _getSpFunctionDistributionMapDataUrl = 'SpaceDrawing/GetSpaceFunctionDistributionMapData';
    private _getSpstandardDistributionMapDataUrl = 'SpaceDrawing/GetSpaceStandardDistributionMapData';
    private _getAddDataFieldDistributionMapDataUrl = 'SpaceDrawing/GetAddlDataFieldLookupDistributionMapData';
    private _getSpFunctionDistributionSettingsBasedOnDrawingsUrl = 'spaceDrawing/GetSpFunctionDistributionSettingsBasedOnDrawings';
    private _getSpstandardDistributionSettingsBasedOnDrawingsUrl = 'spaceDrawing/GetSpStandardDistributionSettingsBasedOnDrawings';
    private _getAddDataFieldDistributionSettingsBasedOnDrawingsUrl = 'spaceDrawing/GetAddlDataFieldDistributionSettingsBasedOnDrawings';
    private _getColorPreferenceSettingsData = 'Space/GetColorSettings';
    private editSpaceDataUrl = 'Common/GetEditAppFormFields';
    private spaceTotalizeUrl = "Space/GetTotalizeData";
    private listDataListUrl = 'Common/GetAppFormDataList';
    private _UpdateXYCordinatesUrl = 'SpaceDrawing/UpdateXYCordinates';
    private _GetLeaderLineDetailsUrl = 'SpaceDrawing/GetLeaderLineDetails';
    private getLayerFunctionMappingsUrl = 'SpaceDrawing/GetLayerFunctionMappings';
    private spaceDataListFrmId = 103;
    private spaceAddEditFrmId = 104;
    private assignDeassignSpaceStdFrmId = 132;
    private amnetiesFormId = 154;

    private _checkEditPrivilageExistUrl = 'Space/CheckEditPrivilageExist';
    //Employee open Drawing
    private _getEmpOrgUnitOccupancyDistributionMapLegendDataUrl = 'EmployeeDrawing/GetOrgUnitOccupancyDistributionMapLegendData';
    private _getOrgUnitSpaceStandardDistributionMapLegendDataUrl = 'EmployeeDrawing/GetOrgUnitSpaceStandardDistributionMapLegendData';
    //*********** space Open Drawing ***********//
    getAllSpaceDetails(moduleId: number, drawingId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this.getSpaceData);
    }
    getSpaceDisplaySettingsData(categoryId: number, addtlDataFieldCategoryId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"" + categoryId + "\"},{\"ReportFieldId\":24,\"Value\":\"" + addtlDataFieldCategoryId + "\"}]}" }, this._displaySetingsDataUrl);
    }
    getOrgUnitDistributionMapData(orglevelNo: number, drawingId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + orglevelNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":286,\"Value\":\"0\"}]}" }, this._getOrgUnitDistributionMapDataUrl);
    }
    getOrgdistributionSettingsBasedOnDrawings(orglevelNo: number, moduleId: number, drawingId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + orglevelNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}" }, this._getOrgdistributionSettingsBasedOnDrawingsUrl);
    }
    getDistributionMapValidatedFieldsData(fieldId: number, moduleId: number, drawingId: number) {
        if (fieldId == 0)// Space Function 
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":791,\"Value\":\"0\"}]}" }, this._getSpFunctionDistributionMapDataUrl);
        else if (fieldId == -1)// Space Standard
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":790,\"Value\":\"0\"}]}" }, this._getSpstandardDistributionMapDataUrl);
        else if (fieldId > 0)// Space Validated AddDataFields
            return this.postaction({
                Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":8369,\"Value\":\"" + fieldId + "\"}]}"
            }, this._getAddDataFieldDistributionMapDataUrl);
    }
    getValidatedFieldsSettingsBasedOnDrawings(fieldId: number, moduleId: number, drawingId: number) {
        if (fieldId == 0)// Space Function 
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this._getSpFunctionDistributionSettingsBasedOnDrawingsUrl);
        else if (fieldId == -1)// Space Standard
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this._getSpstandardDistributionSettingsBasedOnDrawingsUrl);
        else if (fieldId > 0) // Space Validated AddDataFields
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":20,\"Value\":\"" + fieldId + "\"}]}" }, this._getAddDataFieldDistributionSettingsBasedOnDrawingsUrl);

    }
    //*********** employee Open Drawing ***********//
    getEmpOrgUnitOccupancyDistributionMapLegendData(orglevelNo: number, drawingId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + orglevelNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this._getEmpOrgUnitOccupancyDistributionMapLegendDataUrl);
    }
    getOrgUnitSpaceStandardDistributionMapLegendData(orglevelNo: number, drawingId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + orglevelNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":286,\"Value\":\"0\"}]}" }, this._getOrgUnitSpaceStandardDistributionMapLegendDataUrl);
    }
    loadSpaceAddEdit(selectedId: number) {
        let lookupRptField = "[{\"FieldId\":737,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":737,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":738,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":739,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":740,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":741,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        return this.postaction({
            Input: "{ FormId:" + this.spaceAddEditFrmId + ",ParentFormId:" + this.spaceDataListFrmId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:" + lookupRptField + "}"
        }, this.editSpaceDataUrl);
    }
    getColorPreferenceSettingsData() {
        return this.postaction({}, this._getColorPreferenceSettingsData);
    }
    getTotalizeSpace(selectedIds: any[]) {
        let rptFieldValues = "[{\"ReportFieldId\":780,\"Value\":\"" + selectedIds + "\"}]";
        return this.postaction({ Input: "{ListReportFieldIdValues: " + rptFieldValues + "}" }, this.spaceTotalizeUrl);

    }
    checkEditPrivilageExist(spaceId: number) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this._checkEditPrivilageExistUrl);
    }
    loadAssignDeAssignSpacesStd(selectedId: number) {
        return this.postaction({ Input: "{ FormId:" + this.assignDeassignSpaceStdFrmId + ",Id:" + selectedId + "}" }, this.editSpaceDataUrl);
    }

    getAmenitiesData(index: number, column: any, direction: any, filter?: any) {
        return this.postaction({ Input: "{FormId:" + this.amnetiesFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ", Filter: '" + filter + "'}" }, this.listDataListUrl);
    }
    UpdateXYCordinates(spaceId: number, currentXCord: number, currentYCord: number, previousXCord: number, previousYCord: number, destinationSpaceId: number, hasLeaderLine?: boolean) {
        var rptfId = "";
        if (hasLeaderLine != undefined && hasLeaderLine != null)
            rptfId = "{\"ReportFieldId\":4769,\"Value\":\"" + false + "\"},";
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + rptfId+"{\"ReportFieldId\":745,\"Value\":\"" + spaceId + "\"},{\"ReportFieldId\":748,\"Value\":\"" + currentXCord + "\"},{\"ReportFieldId\":749,\"Value\":\"" + currentYCord + "\"},{\"ReportFieldId\":746,\"Value\":\"" + previousXCord + "\"},{\"ReportFieldId\":747,\"Value\":\"" + previousYCord + "\"}]}", DestinationSpaceId: destinationSpaceId }, this._UpdateXYCordinatesUrl);
    }
    GetLeaderLineDetails(drawingId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":2059,\"Value\":\"" + drawingId + "\"}]}" }, this._GetLeaderLineDetailsUrl);
    }
    getLayerFunctionMappings() {
        return this.postaction({ Input: "{ FormId:" + this.assignDeassignSpaceStdFrmId + "}" },  this.getLayerFunctionMappingsUrl)
    }
}
import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from  '../../Framework/Models/Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DrawingDetailsService extends HttpHelpers {

    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private addDataUrl = 'Common/GetAddAppFormFields';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private lookupUrl = 'Common/GetFieldLookupValues';
    private _submitURL = 'Common/UpdateAppFormData';
    private submitEditUrl = 'Common/UpdateAppFormData';
    /*space drawing list*/
    private lockedUrl = 'Drawing/GetLockedDrawings';
    private _spaceDrawingsListData = 'MockData/Data/spaceDrawingListData.json';
    private _spaceDrawingsListFieldData = 'MockData/FieldObjects/spaceDrawingListFieldObjects.json';
    /*space unlock drawing list*/
    private _spaceUnlockdrawingListData = 'MockData/Data/unlock_drawing_list.json';
    private _spaceUnlockdrawingFields = 'MockData/FieldObjects/unlockdrawingfieldobject.json';
    private _spaceDrawingmenuData = 'MockData/Space/spaceDrawing_menuData.json';

    private revisionDetailsData = 'MockData/Data/dwg_revision_listdata.json';
    private revisionDetailsFieldData = 'MockData/FieldObjects/dwg_revision_fieldobjects.json';
    private markupsDetailsData = "MockData/Data/dwg_markuplistData.json";
    private markupsDetailsFieldData = "MockData/FieldObjects/dwg_markuplistFieldObjects.json";
    /*private markupsTextStyles = "MockData/Data/ddlmarkupsTextStyles.json";
    private markupsFontSize = "MockData/Data/ddlmarkupsFontSize.json";*/
    private moduleSwitchData = 'MockData/Data/moduleswitch-drawing_data.json';
    private markupCommentData = 'app/Models/Asbuilts/Drawing_Data/markup_Drawing_Data.json';

    private DrawingFloorAccessFields_url = 'MockData/Data/user-drawing_floor-accessFieldsList.json';
    private DrawingFloorAccess_url = 'MockData/Data/user-drawing-floor-access.json';
    private insertMarkupUrl = 'Drawing/InsertMarkupDrawing';
    private updateMarkupUrl = 'Drawing/UpdateMarkupDrawing';
    private getXmlStringUrl = 'Drawing/GetMarkupXml';
    private submitDescription = 'Drawing/UpdateMarkupDescription';
    private deleteMarkupsUrl = 'Drawing/DeleteMarkupDrawing';
    private deleteUrl = 'Common/DeleteAppFormData';
    /*Space Drawing*/
    private spacelockedDrawingsUrl = 'Drawing/GetLockedDrawingsData';
    private spaceDistributionMenu = 'SpaceDrawing/GetDistributionMapFieldListFromDrawingWithLevels';
    private DeleteSpaceData = 'SpaceDrawing/DeleteSpaceData';
    private getSessionValues = 'Common/GetSessionValues';
    //project module
    private insertProjectDwgMarkupUrl = 'Project/InsertMarkupDrawing';
    private getProjectMarkupXmlStringUrl = 'Project/GetMarkupXml';
    markupFloorFormId = 81;
    markupBuildingFormId = 82;
    buildingDrawingMarkupListId = 57;
    floorDrawingMarkupListId = 60;
    buildingDrawingRevisionListId = 58;
    floorDrawingRevisionListId = 64;

    private buildingDrawingEditRevisionFormId = 135;
    private FloorDrawingEditRevisionFormId = 136;
    private editBuildingMarkupDes = 315;
    private editFloorMarkupDes = 316;
    constructor(private http: Http) {
        super(http);
    }
    getspaceDrawingsListData() {
        return this.getaction<Observable<any>>(this._spaceDrawingsListData)
    }

    getspaceDrawingsListFields() {
        return this.getaction<Observable<any>>(this._spaceDrawingsListFieldData)
    }
    getspacelockdrawingListData(ModuleId) {
        return this.postaction({ applnInput: "{ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"},{\"ReportFieldId\":278,\"Value\":\"" + ModuleId + "\"}]}" }, this.spacelockedDrawingsUrl);

    }
    sortSpaceDrawing(formId: number, direction: any, column: any, moduleId) {
        
        return this.postaction({ Input: "{ FormId: " + formId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "', ListReportFieldIdValues: [{ \"ReportFieldId\":584,\"Value\":\"" + Math.pow(2, moduleId).toString() + "\"}]}" }, this.listDataListUrl);
    }
    sortSpaceUnlockDrawing(direction: any, column: any, moduleId) {
        
        return this.postaction({ applnInput: "{ SortColumn:'" + column + "',SortDirection:'" + direction + "', ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, moduleId).toString() + "\"},{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}" }, this.spacelockedDrawingsUrl);
    }
    getspaceUnlockdrawingFields() {
        return this.getaction<Observable<any>>(this._spaceUnlockdrawingFields)
    }
    getspaceDrawingMenuData() {
        return this.getaction<Observable<any>>(this._spaceDrawingmenuData)
    }

    getMarkupsDetailsFields(drawingType: number) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingMarkupListId + "}" }, this.listFieldObjUrl);
        else if (drawingType == 1)
            return this.postaction({ Input: "{FormId:" + this.floorDrawingMarkupListId + "}" }, this.listFieldObjUrl);
    }
    getMarkupsDetailsData(drawingType: number, drawingId: number, revisionNo: number,column:any,direction:any) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingMarkupListId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "' ,ListReportFieldIdValues:[{\"ReportFieldId\":4389,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":4390,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":4388,\"Value\":\"0\"}]}" }, this.listDataListUrl);
        else if (drawingType == 1)
            return this.postaction({ Input: "{FormId:" + this.floorDrawingMarkupListId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "' ,ListReportFieldIdValues:[{\"ReportFieldId\":551,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":552,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":550,\"Value\":\"0\"}]}" }, this.listDataListUrl);
    }

    getRevisionDetailsFields(drawingType: number) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingRevisionListId + "}" }, this.listFieldObjUrl);
        else if (drawingType == 1)
            return this.postaction({ Input: "{FormId:" + this.floorDrawingRevisionListId + "}" }, this.listFieldObjUrl);
    }
    getRevisionDetailsData(drawingType: number, drawingId: number, revisionNo: number) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingRevisionListId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":4376,\"Value\":\"" + drawingId + "\"}]}" }, this.listDataListUrl);
        else if (drawingType == 1)
            return this.postaction({ Input: "{FormId:" + this.floorDrawingRevisionListId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":510,\"Value\":\"" + drawingId + "\"}]}" }, this.listDataListUrl);
    }
    //revison
   getRevisionDetailsDataPaging(index: number, column: any, direction: any, drawingType: number, drawingId: number, revisionNo: number) {
        //  return this.postaction({ Input: "{ FormId: " + formId + ",PageIndex:" + index + "}" }, this.listDataListUrl);
       if (drawingType == 0)
           return this.postaction({ Input: "{ FormId: " + this.buildingDrawingRevisionListId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":4376,\"Value\":\"" + drawingId + "\"}]}" }, this.listDataListUrl);
     else
           return this.postaction({ Input: "{ FormId: " + this.floorDrawingRevisionListId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " ,ListReportFieldIdValues:[{\"ReportFieldId\":510,\"Value\":\"" + drawingId + "\"}]}" }, this.listDataListUrl);

        //console.log('current page', index)

    }
   getRevisionsData(drawingType: number, drawingId: number, revisionNo: number,index: number, column: any, direction: any) {
       if (drawingType == 0)
           return this.postaction({ Input: "{FormId:" + this.buildingDrawingRevisionListId + " ,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":4376,\"Value\":\"" + drawingId + "\"}]}" }, this.listDataListUrl);
       else
           return this.postaction({ Input: "{FormId:" + this.floorDrawingRevisionListId + " ,Id:" + revisionNo + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":510,\"Value\":\"" + drawingId + "\"}]}" }, this.listDataListUrl);
   }
   getEditBuildingDrawingFieldDetails(formId: number, selectedId: number, parentFormId: number, drawingId, revisionNo) {

           return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + selectedId + ",ParentFormId:" + parentFormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"},{\"ReportFieldId\":4376,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":4377,\"Value\":\"" + revisionNo + "\"}]}" }, this.editDataUrl);
     
        //return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + selectedId + ",ParentFormId:" + parentFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":4377,\"Value\":\"0\"}]}" }, this.editDataUrl);
   }
   getEditFloorDrawingFieldDetails(formId: number, selectedId: number, parentFormId: number, drawingId, revisionNo) {
       return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + selectedId + ",ParentFormId:" + parentFormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"},{\"ReportFieldId\":510,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":511,\"Value\":\"" + revisionNo + "\"}]}" }, this.editDataUrl);
   }
   updateRevisionDescription(drawingId, updateValue: string, drawingType: number, revisionNo,revisionobject: string) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingEditRevisionFormId + ",Id:" + drawingId + ",ParentFormId:" + this.buildingDrawingRevisionListId + " ,ListReportFieldIdValues:[" + updateValue + "," + revisionobject + ",{\"ReportFieldId\":4376,\"Value\":\"" + drawingId + "\"} ]}" },
                this.submitEditUrl)
        else
            return this.postaction({ Input: "{FormId:" + this.FloorDrawingEditRevisionFormId + ",Id:" + drawingId + ",ParentFormId:" + this.floorDrawingRevisionListId + " ,ListReportFieldIdValues:[" + updateValue + "," + revisionobject + ",{\"ReportFieldId\":510,\"Value\":\"" + drawingId + "\"} ]}" },
                this.submitEditUrl)
    }
    postRevisionDelete(drawingId: number, revisionNo: number, drawingType: number) {
        if (drawingType == 0)
           
            return this.postaction({ Input: "{FormId:" + this.buildingDrawingRevisionListId + ",Id:" + drawingId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":4376,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":4377,\"Value\":\"" + revisionNo + "\"}]}" }, this.deleteUrl);
        else
            return this.postaction({ Input: "{FormId:" + this.floorDrawingRevisionListId + ",Id:" + drawingId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":510,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":511,\"Value\":\"" + revisionNo + "\"}]}" }, this.deleteUrl);
    }

    getDrawingListPaging(index: number) {
        console.log('current page', index)
    }

    getModuleSwitchData() {
        return this.getaction<Observable<any>>(this.moduleSwitchData)
    }

    getMarkupCommentData() {
        console.log("markupCommentData ", this.markupCommentData);
        return this.getaction<Observable<any>>(this.markupCommentData)
    }



    getDrawingFloorAccessFieldsList() {
        return this.getaction<Observable<any>>(this.DrawingFloorAccessFields_url);
    }
    getDrawingFloorAccessList() {
        return this.getaction<Observable<any>>(this.DrawingFloorAccess_url);
    }
    updateDrawingAccess(formObject: IField[]) {
        console.log('User drawing access updated');
    }
    insertMarkupDetails(drawingType: number, XMLContent: string, Description: string, DrawingId: number, RevisionNo: number, isBuildingDrawing: boolean, moduleId: number, projectId: number) {
        if (moduleId == 2) {
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":1017,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":1018,\"Value\":\"" + RevisionNo + "\"},{\"ReportFieldId\":1021,\"Value\":\"" + Description + "\"},{\"ReportFieldId\":550,\"Value\":\"" + XMLContent + "\"},{\"ReportFieldId\":1010,\"Value\":\"" + projectId + "\"}]}" }, this.insertProjectDwgMarkupUrl);
        } else {
            if (drawingType == 0)
                return this.postaction({ Input: "{FormId:" + this.markupBuildingFormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":4389,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":4390,\"Value\":\"" + RevisionNo + "\"},{\"ReportFieldId\":4393,\"Value\":\"" + Description + "\"},{\"ReportFieldId\":4388,\"Value\":\"" + XMLContent + "\"}]}" }, this.insertMarkupUrl);
            else if (drawingType == 1)
                return this.postaction({ Input: "{FormId:" + this.markupFloorFormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":551,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":552,\"Value\":\"" + RevisionNo + "\"},{\"ReportFieldId\":555,\"Value\":\"" + Description + "\"},{\"ReportFieldId\":550,\"Value\":\"" + XMLContent + "\"}]}" }, this.insertMarkupUrl);
        }
    }

    updateMarkupDetails(markupId: number, drawingType: number, XMLContent: string, DrawingId: number, RevisionNo: number, isBuildingDrawing: boolean) {
        if (drawingType == 0)
            return this.postaction({ Input: "{FormId:" + this.markupBuildingFormId + " ,Id:" + markupId+",ListReportFieldIdValues:[{\"ReportFieldId\":4389,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":4390,\"Value\":\"" + RevisionNo + "\"},{\"ReportFieldId\":4388,\"Value\":\"" + XMLContent + "\"}]}" }, this.updateMarkupUrl);
        else if (drawingType == 1)
            return this.postaction({ Input: "{FormId:" + this.markupFloorFormId + " ,Id:" + markupId +",ListReportFieldIdValues:[{\"ReportFieldId\":551,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":552,\"Value\":\"" + RevisionNo + "\"},{\"ReportFieldId\":550,\"Value\":\"" + XMLContent + "\"}]}" }, this.updateMarkupUrl);
    }
    loadMarkupXmlString(DrawingId: number, RevisionNo: number, MarkupId: number, isBuildingDrawing: boolean) {
        return this.postaction({ DrawingId: DrawingId, RevisionNo: RevisionNo, MarkupId: MarkupId, isBuildingDrawing: isBuildingDrawing }, this.getXmlStringUrl);;
    }
    loadProjectDrawingMarkupXmlString(DrawingId: number, RevisionNo: number, MarkupId: number, projectId: number) {
        return this.postaction({ DrawingId: DrawingId, RevisionNo: RevisionNo, MarkupId: MarkupId, ProjectId: projectId }, this.getProjectMarkupXmlStringUrl);;
    }
    updateMarkupDescription(updateValue: string, selectedId: number, drawingType: number, drawingId, revisionNo) {
        if (drawingType == 0)
            return this.postaction({
                Input: "{ListReportFieldIdValues:[" + updateValue + ",{\"ReportFieldId\":4389,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":4390,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":4388,\"Value\":\"" + selectedId+"\"}],EntityId:" + selectedId + "}"
            }, this.submitDescription);
        else
            return this.postaction({
                Input: "{ListReportFieldIdValues:[" + updateValue + ",{\"ReportFieldId\":551,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":552,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":550,\"Value\":\"" + selectedId+"\"}],EntityId:" + selectedId + "}"
            }, this.submitDescription);
    }
    postMarkupDelete(markupId: number, drawingId: number, revisionNo: number, drawingType: number) {
        if (drawingType == 0)
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":4389,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":4390,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":4388,\"Value\":\"" + markupId + "\"}]}" }, this.deleteMarkupsUrl);
        else
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":551,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":552,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":550,\"Value\":\"" + markupId + "\"}]}" }, this.deleteMarkupsUrl);
    }

    getDrawingLockedCount(formId, ModuleId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.lockedUrl);

    }
    getLockedDrawingList(formId, ModuleId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.lockedUrl);

    }
    getSpaceDistributionMenuData(drawingId: number, moduleId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}" }, this.spaceDistributionMenu);
    }
    getSessionData() {
        return this.postaction({}, this.getSessionValues);
    }
    loadMarkupDesEdit(selectedId: number, isBuildingMarkup: boolean, drawingId, revisionNo) {
        var formId;
        var parentFormId;
        var listValues;
        if (isBuildingMarkup) {
            formId = this.editBuildingMarkupDes;
            parentFormId = this.buildingDrawingMarkupListId;
            listValues = "[{\"ReportFieldId\":471,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":4390,\"Value\":\"" + revisionNo + "\"}]}" ;
        }
        else {
            formId = this.editFloorMarkupDes;
            parentFormId = this.floorDrawingMarkupListId
            listValues = "[{\"ReportFieldId\":522,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":552,\"Value\":\"" + revisionNo + "\"}]}";
        }
        return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + selectedId + ",ParentFormId:" + parentFormId + " ,ListReportFieldIdValues:" + listValues }, this.editDataUrl);
    }
}
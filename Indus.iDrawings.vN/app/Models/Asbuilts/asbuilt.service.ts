import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from  '../../Framework/Models/Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AsbuiltService extends HttpHelpers {
    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private addDataUrl = 'Common/GetAddAppFormFields';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private lookupUrl = 'Common/GetFieldLookupValues';
    private deleteUrl = 'Common/DeleteAppFormData';
    private inserBuildingDrawingUrl = 'Common/SaveBuildingDrawing';
    private inserFloorDrawingUrl = 'Common/SaveFloorDrawing';
    //drawing controller
    private reviseBuildingDrawing = 'Drawing/InsertRevisedBuildingDrawing';
    private reviseFloorDrawing = 'Drawing/InsertRevisedDrawing';

    private deleteBuildingDrawingUrl = 'Drawing/DeleteBuildingDrawing';
    private deleteFloorDrawingUrl = 'Drawing/DeleteFloorDrawing';
    private replaceBuildingDrawing = 'Drawing/ReplaceBuildingDrawing';
    private replaceFloorDrawing = 'Drawing/ReplaceDrawing';

    private listFormId;
    private addEditformId;
    private submitAddUrl = 'Common/InsertAppFormData';
    private submitEditUrl = 'Common/UpdateAppFormData';
    private buildingDrawinglistFormId = 47;
    private floorDrawingListFormId = 48;
    private markupFloorFormId = 81;
    private markupBuildingFormId = 82;
    private GetDetailsForAsbuiltsDashBoard = 'Common/GetDetailsForDashBoard';
    private subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
    private GetDrawingCategoriesCountforAsBuiltsDashboard = 'Common/GetDrawingCategoriesCountforDashboard';

    private asbuiltsDrawingsFields = 'MockData/Asbuilts/drawings_Fields.json';
    private asbuiltsDrawingsData = 'MockData/Asbuilts/drawings_Data.json';
    private asbuiltsMenuData = 'MockData/Asbuilts/drawingMenu_data.json';
    private drawingEditDiscription_Fields = 'MockData/Asbuilts/asbuiltsDrawing-edit_Fields.json';
    private markupDescription_Fields = 'MockData/Asbuilts/markupdescription-fields.json';
    private _displaySetingsDataUrl = 'Common/GetDisplaySettingData';
    private GetAdvancedSerachResulturl = 'Common/GetAdvancedSerachResult';
    private AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
    private keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
    private downloadUrl = 'Common/ArrayDrawingDownloadFile';
    private downloadBldngImageUrl = 'Common/ArrayBuildingImageDownloadFile'; 
    private buildingDrawingdownloadUrl = 'Common/ArrayBuildingDrawingDownloadFile';
    private multidownloadDocumentUrl = 'Common/MultipleDownloadFile';
    private getXBIMFiles = 'Common/GetXBIMFiles';
    constructor(private http: Http) {
        super(http);
    }

    getBuildingDrawingsData() {

        return this.postaction({ Input: "{FormId:" + this.buildingDrawinglistFormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.listDataListUrl);
        // return this.postaction({ Input: "{ FormId: " + this.sitelistFormId + "}" }, this.listDataListUrl);
        // return this.postaction({ Input: "{FormId: 1 }" }, this._SiteDataUrl);
        //return this.postgetaction<Observable<any>>(null, this._SiteDataUrl);
    }
    getBuildingDrawingsFields() {
        return this.postaction({ Input: "{ FormId: " + this.buildingDrawinglistFormId + " }" }, this.listFieldObjUrl);
        //return this.postaction({ Input: "{FormId: 1 }" }, this._SiteColumnDataUrl);
        //return this.postgetaction<Observable<any>>(null, this._SiteColumnDataUrl)
    }
    //getFloorDrawingsData(FormId) {
    //    console.log("{FormId:" + FormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}");
    //    return this.postaction({ Input: "{FormId:" + FormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.listDataListUrl);
    //    // return this.postaction({ Input: "{ FormId: " + this.sitelistFormId + "}" }, this.listDataListUrl);
    //    // return this.postaction({ Input: "{FormId: 1 }" }, this._SiteDataUrl);
    //    //return this.postgetaction<Observable<any>>(null, this._SiteDataUrl);
    //}
    getFloorDrawingsData(FormId,index: number, column: any, direction: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
      //  return this.postaction({ Input: "{FormId:" + FormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.listDataListUrl);
        return this.postaction({ Input: "{ FormId: " + FormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}],Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0 }, this.listDataListUrl);
    }
   
    getFloorDrawingsFields(FormId) {
        return this.postaction({ Input: "{ FormId: " + FormId + " }" }, this.listFieldObjUrl);
        //return this.postaction({ Input: "{FormId: 1 }" }, this._SiteColumnDataUrl);
        //return this.postgetaction<Observable<any>>(null, this._SiteColumnDataUrl)
    }
    getAsbuiltsMenuData() {
        return this.getaction<Observable<any>>(this.asbuiltsMenuData)
    }

    getDrawingtEditDiscriptionFields(selectedId: number, addEdit: string) {
        return this.getaction<Observable<any>>(this.drawingEditDiscription_Fields)
    }
    getmarkupDescription(isBuildingDrawing: boolean) {
        if (isBuildingDrawing)
            return this.postaction({ Input: "{ FormId: " + this.markupBuildingFormId + " }" }, this.addDataUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.markupFloorFormId + " }" }, this.addDataUrl);
    }
   
    getDrawingListSearchKeyWordLookup() {
        return ["Aberdeen", "Concord", "Arlington", "Framingham", "Greenwood", "Manchester", "Site 1", "WhiteField"];
    }
    getAddDrawingFieldDetails(formId) {
        return this.postaction({ Input: "{ FormId: " + formId + " }" }, this.addDataUrl);
    }
    getEditDrawingFieldDetails(formId: number, selectedId: number, parentFormId: number) {
       
        return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + selectedId + ",ParentFormId:" + parentFormId+ " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.editDataUrl);
        //return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + selectedId + ",ParentFormId:" + parentFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":4377,\"Value\":\"0\"}]}" }, this.editDataUrl);
    }
   
    postDrawingAdd(formId, pageDetails, ParentFormId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + ParentFormId + "}" }, this.submitAddUrl);
    }
    postDrawingEdit(formId, pageDetails, id: any, ParentFormId) {
        console.log('entered edit service')
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + ParentFormId + "}" }, this.submitEditUrl);
    }
    //postDrawingReplace(formId, revision, buildingId, desc, file,size, id: any, ParentFormId) {
    //    console.log('entered edit service')
    //    return this.postaction({
    //      //  Input: "{FormId:" + formId + " ,Id:" + id + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":511,\"Value\":\"" + revision + "\"},{\"ReportFieldId\":487,\"Value\":\"" + buildingId + "\"},{\"ReportFieldId\":516,\"Value\":\"" + desc + "\"},{\"ReportFieldId\":512,\"Value\":\"" + file + "\"},{\"ReportFieldId\":513,\"Value\":\"" + size + "\"}]}"
    //        Input: "{FormId:" + formId + " ,Id:" + id + ",ParentFormId:" + ParentFormId + ",ListReportFieldIdValues:ReportFieldId:511,Value:"+ revision+",ReportFieldId:487,Value:" + buildingId + ",ReportFieldId:516,Value:" + desc + ",ReportFieldId:512,Value:" + file + "ReportFieldId:513,Value:" + size + "}"
    //    }, this.submitEditUrl);
    //}
    //postDrawingReplaceWithFile(formId, revision, buildingId, desc, file, size,fileData ,ParentFormId) {
    //    return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":511,\"Value\":\"" + revision + "\"},{\"ReportFieldId\":487,\"Value\":\"" + buildingId + "\"},{\"ReportFieldId\":516,\"Value\":\"" + desc + "\"},{\"ReportFieldId\":512,\"Value\":\"" + file + "\"},{\"ReportFieldId\":513,\"Value\":\"" + size + "\"}],ParentFormId:" + ParentFormId + "}", FileInput: fileData  }, this.fileUploadUrl);
    //}
    postInsertBuildingDrawingAddwithFile(formId, pageDetails, fileData, ParentFormId) {
        return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.inserBuildingDrawingUrl);
    }
    postInsertFloorDrawingAddwithFile(formId, pageDetails, fileData, ParentFormId) {
        return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.inserFloorDrawingUrl);
    }
    postReviseDrawingAddwithFile(formId, pageDetails, fileData, ParentFormId,building:boolean,DrawingId) {
        
        if (building==true)
            return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.reviseBuildingDrawing);
        else return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ", Id: " + DrawingId+",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.reviseFloorDrawing);
    }
    postReplaceDrawingAddwithFile(formId, pageDetails, fileData, ParentFormId, building: boolean, DrawingId) {
        
        if (building == true)
            return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ", Id: " + DrawingId + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.replaceBuildingDrawing);
        else return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ", Id: " + DrawingId + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.replaceFloorDrawing);
    }
    //postDrawingReplaceWithFile(formId, pageDetails, fileData, ParentFormId,Id) {
    //    return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ", Id: " + Id + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.fileUploadUrl);
    //}
    loadState(formId: number, ParentId: number, parentFieldId:number) {
        //return this.postaction({ Input: "{FormId:" + formId + ",Id:" + childId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
       // return this.postaction({ Input: "{FormId:" + formId + " ,ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{\"ReportFieldId\":" + SiteReportFieldId + ",\"Value\":\"" + ParentId+"\"}]}" }, this.lookupUrl);
        return this.postaction({ Input: "{FormId:" + formId + ",Id:" + ParentId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);


    }
    sort(formId:number,direction: any, column: any) {
      
        return this.postaction({ Input: "{ FormId: " + formId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "'}" }, this.listDataListUrl);
    }
   
    Paging(formId: number, index: number) {
        return this.postaction({ Input: "{ FormId: " + formId + ",PageIndex:" + index + "}" }, this.listDataListUrl);

    }
    FloorDrawingPaging(formId: number, index: number, column: any, direction: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        //  return this.postaction({ Input: "{ FormId: " + formId + ",PageIndex:" + index + "}" }, this.listDataListUrl);
        return this.postaction({ Input: "{ FormId: " + formId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);

        //console.log('current page', index)

    }

    spaceDrawingPaging(formId: number, index: number,moduleId) {
        return this.postaction({ Input: "{FormId:" + this.buildingDrawinglistFormId + ",PageIndex:" + index + " ,ListReportFieldIdValues:[{\"ReportFieldId\":584,\"Value\":\"" + Math.pow(2, moduleId).toString() + "\"}]}" }, this.listDataListUrl)

        //console.log('current page', index)

    }
    deleteBuildingDrawing(selectedID: any, revision: number, buildingId, filename:any) {
        if (revision!=0)
            return this.postaction({ applnInput: "{FormId:" + this.buildingDrawinglistFormId + ",Id:0 ,ListReportFieldIdValues:[{\"ReportFieldId\":4376,\"Value\":\"" + selectedID[0] + "\"},{\"ReportFieldId\":4377,\"Value\":\"" + revision.toString() + "\"},{\"ReportFieldId\":4378,\"Value\":\"" + filename + "\"}]}" }, this.deleteBuildingDrawingUrl)
        else
            return this.postaction({ applnInput: "{FormId:" + this.buildingDrawinglistFormId + ",Id:0  ,ListReportFieldIdValues:[{\"ReportFieldId\":4376,\"Value\":\"" + selectedID[0] + "\"},{\"ReportFieldId\":4378,\"Value\":\"" + filename + "\"},{\"ReportFieldId\":4377,\"Value\":\"0\"}]}" }, this.deleteBuildingDrawingUrl)
 
    }

    deleteFloorDrawing(selectedID: any, revision: number, floorId, filename: any) {
        if (revision != 0)
            return this.postaction({ applnInput: "{FormId:" + this.floorDrawingListFormId + ",Id:" + selectedID[0] + " ,ListReportFieldIdValues:[{\"ReportFieldId\":522,\"Value\":\"" + selectedID[0] + "\"},{\"ReportFieldId\":511,\"Value\":\"" + revision + "\"},{\"ReportFieldId\":512,\"Value\":\"" + filename + "\"}]}" }, this.deleteFloorDrawingUrl)
        else
            return this.postaction({ applnInput: "{FormId:" + this.floorDrawingListFormId  +",Id:" + selectedID[0] + " ,ListReportFieldIdValues:[{\"ReportFieldId\":522,\"Value\":\"" + selectedID[0] + "\"},{\"ReportFieldId\":511,\"Value\":\"" + revision + "\"},{\"ReportFieldId\":512,\"Value\":\"" + filename + "\"}]}" }, this.deleteFloorDrawingUrl)
        //{\"ReportFieldId\":523,\"Value\":\"" + floorId + "\"} bugid 80844
    }
    getAllFloorDrawingAdvanceSearchLookup() {
        return this.postaction({ Input: "{FormId:233}" }, this.AdvanceSearchLookUpUrl)
    }

    getAllFloorDrawingKeywordField() {
        return this.postaction({ Input: "{FormId:232}" }, this.keywordLookUpUrl)
    }
    //doubt
    AllFloorDrawingAdvanceSeachResult(value: any, index: number, direction: any, column: any) {
        return this.postaction({ Input: "{ FormId:48,ParentFormId:233,ListFilterIdValues: " + value + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.listDataListUrl);
    }
    AllFloorDrawingKeywordSeach(value: any, index: number, direction: any, column: any) {
        return this.postaction({ Input: "{ FormId:48,Filter: '" + value + "',SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:1 ,IsAdvancedSearch:0}" }, this.listDataListUrl);
    }
    //Floor
    loadStateFloor(formId: number, ParentId: number, parentFieldId: number,floorfieldId,siteId,buildingId) {
        //return this.postaction({ Input: "{FormId:" + formId + ",Id:" + childId + ",ParentFieldId:" + parentFieldId + "}" }, this.lookupUrl);
        // return this.postaction({ Input: "{FormId:" + formId + " ,ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues:[{\"ReportFieldId\":" + SiteReportFieldId + ",\"Value\":\"" + ParentId+"\"}]}" }, this.lookupUrl);
      //  return this.postaction({ Input: "{FormId:" + formId + ",Id:" + ParentId + ",ParentFieldId:" + parentFieldId + ",ListReportFieldIdValues: FieldId: " + floorfieldId + ", ReportFieldId: 1830, Value: " + siteId + ", ReportFieldId: 1830, Value: " + buildingId + "  }" }, this.lookupUrl);

        return this.postaction({ Input: "{FormId:" + formId + ",Id:" + ParentId + ",ParentFieldId:" + parentFieldId + ",LookupReportFieldValues: FieldId: " + floorfieldId + ", ReportFieldId: 1830, Value: " + siteId + " }" }, this.lookupUrl);
    }
    downloadFile(formId, EntityId, fileName: string, RevisionNo, drawingType) {
        if (drawingType == 0) {               /*floor Drawing*/
            return this.downloadaction({ Input: "{FormId:" + formId + ",EntityId:4}", FileInput: "{FileName:'" + fileName + "',ReferenceId:'" + EntityId + "',RevisionNo:'" + RevisionNo + "'}" }, this.downloadUrl);
        }                 
        else if (drawingType == 1) {           /*Bilding Drawing*/
            return this.downloadaction({ Input: "{FormId:" + formId + ",EntityId:4}", FileInput: "{FileName:'" + fileName + "',ReferenceId:'" + EntityId + "',RevisionNo:'" + RevisionNo + "'}" }, this.buildingDrawingdownloadUrl);
        }

        //   return this.postaction({ Input: "{FormId:" + this.attachmentDetailsFormId + ",AttachmentCategoryId:'" + attachmentCategoryId + "',FileName:'" + fileName + "',ReferenceId:'" + attachmentId  + "',BaseEntityId:'" + baseEntityId +  "'}" }, this.downloadUrl);

    }

    multipleDownloadFile(formId, drawingType,FileInput) {
        debugger
        if (drawingType == 0) {                       /*floor Drawing*/
            return this.downloadaction({
                Input: "{FormId:" + formId + ",EntityId:23}", Fileinput: FileInput}, this.multidownloadDocumentUrl);
        }
        else if (drawingType == 1) {                 /*Bilding Drawing*/
            return this.downloadaction({
                Input: "{FormId:" + formId + ",EntityId:24}", Fileinput: FileInput}, this.multidownloadDocumentUrl);

        }
    }


    //getBuildingCategoriesFunctionFields() {
    //    return this.postaction({ Input: "{FormId:47,ListLookupReportFieldIdValues:[{ \"FieldId\":205,\"ReportFieldId\": 4309, \"Value\":\"1\" },{\"ReportFieldId\": 4310, \"Value\":\"0\"}]}" }, this.listFieldObjUrl);
    //}
    //getFloorCategoriesFunctionFields() {
    //    return this.postaction({ Input: "{FormId:48,ListLookupReportFieldIdValues:[{ \"FieldId\":240,\"ReportFieldId\": 4309, \"Value\":\"0\" },{\"ReportFieldId\": 4310, \"Value\":\"1\"}]}" }, this.listFieldObjUrl);
    //}
    //Space Drawing List

    GetDetailsForDashBoard() {
        return this.postaction({ Input: "{}" }, this.GetDetailsForAsbuiltsDashBoard)
    }

    checkSubscribedFeature(featureCategoryIds: string) {
        return this.postaction({ Input: "{FormId:353}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    }
    GetDrawingCategoriesCountforDashboard(buildingId) {
        return this.postaction({ Input: "{Id:0,ListReportFieldIdValues:[{\"ReportFieldId\":487,\"Value\":\"" + buildingId + "\"}]}" }, this.GetDrawingCategoriesCountforAsBuiltsDashboard);
    }

    DownloadBuildingImage(baseEntityId: string, fileName: string) {
        return this.downloadaction({ Input: "{EntityId:'3',BaseEntityId:'" + baseEntityId + "'}", FileInput: "{FileName:'" + fileName + "'}" }, this.downloadBldngImageUrl);
 
    }
    GetXBIMFiles() {
        return this.postaction({ Input: "{}" }, this.getXBIMFiles)
    }
}
import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import {HttpHelpers} from '../../whatever/utils/httphelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()

export class ObjectsDrawingService extends HttpHelpers {
    //get asset details
    allobjectsDataUrl = 'Object/GetObjectsDetails';
    allBuildingobjectsDataUrl = 'Object/GetBuildingObjects';
    //_displaySetingsDataUrl = 'Common/GetDisplaySettingData';
    allAssetsSymbolUrl = 'Object/GetAllSymbolDetails';
    updateSymbols = 'Object/UpdateObjectSpaceDetails';
    updateBuildingSymbols = 'Object/InsertBuildingObjecDetails';
    _getUserEditableOrgUnitsUrl = 'SpaceDrawing/GetUserEditableOrgUnits';
    _displaySetingsDataUrl = "Drawing/GetDisplaySettingsCategoryFieldsForDrawing";
    _displayAssetsCountUrl = "Object/GetObjectToolTip";
    private getColorPrefernceDataUrl = 'Common/GetColorPreferenceSettings';
    private UpdateOrphanObjectsUrl = 'Object/UpdateOrphanObjects';
    //--Move
    private getAssetsSheduledToMoveUrl = 'EmployeeDrawing/GetEmployeeSheduledToMove';

    // __displaySetingsDataUrl = 'Object/GetObjectsWithSpaceDetails';

    //Get all asset details -- ObjectCategoryId : 1 Assets Module ID:7 displaysettings categoryid=3 Additionalcategoryid:19
    getAllAssetsDetails(ObjectCategory: number, DrawingIds: string, DataOption: number, ObjectId: number, IsbuildingDarwing: any, IsOrphan?: boolean) {
        debugger
        var isOrphan: boolean;
        if (IsOrphan == undefined || IsOrphan == null)
            isOrphan = false;
        else
            isOrphan = IsOrphan;  
        if (IsbuildingDarwing == false) {
            return this.postaction({ Input: "{ FormId: 0}", ReportFieldIdsandValues: '', ObjectCategory: ObjectCategory.toString(), DataOption: DataOption.toString(), AttributeOption: "2", ObjectClassIds: '', DrawingIds: DrawingIds, SearchCondition: '', IsOrphan: isOrphan, ObjectId: ObjectId, IsDataBasedOnUserAccess: 'false', ObjectComponentType: "0", IsBuildingDrawing: IsbuildingDarwing }, this.allobjectsDataUrl);
        }
        else
        { return this.postaction({ Input: "{ FormId: 0}", ReportFieldIdsandValues: '', ObjectCategory: ObjectCategory.toString(), DataOption: DataOption.toString(), AttributeOption: "2", ObjectClassIds: '', DrawingIds: DrawingIds, SearchCondition: '', IsOrphan: isOrphan, ObjectId: ObjectId, IsDataBasedOnUserAccess: 'false', ObjectComponentType: "0", IsBuildingDrawing: IsbuildingDarwing }, this.allBuildingobjectsDataUrl); }
    }

    //for display data ObjectCategoryId : 1 Assets Module ID:7 displaysettings categoryid=3 Additionalcategoryid:19
    getObjectsDisplaySettingsData(categoryId: number, addtlDataFieldCategoryId: number, objectCategoryId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"" + categoryId + "\"},{ \"ReportFieldId\":4281,\"Value\":\"" + objectCategoryId + "\"},{\"ReportFieldId\":24,\"Value\":\"" + addtlDataFieldCategoryId + "\"},{ \"ReportFieldId\":647,\"Value\":\"0\"}]}" }, this._displaySetingsDataUrl);
    }

    //for symbol data  -- ObjectCategoryId : 1 Assets ObjectCategoryId : 1 Assets Module ID:7 displaysettings categoryid=3 Additionalcategoryid:19
    getAssetsSymbolData(ObjectCategoryId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":672,\"Value\":\"" + ObjectCategoryId + "\"}]}" }, this.allAssetsSymbolUrl);
    }

    //for: after place functionality update the symbol details int the table
    updateAssetsSymbolData(StatusId: number, SpaceId: number, Xposition: number, Yposition: number, Angle: number, DrawingId: number, ObjectCategoryId: number, SiteId: number, ObjectId: number, IsbuildingDarwing: boolean) {
        if (IsbuildingDarwing == false) {
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":659,\"Value\":" + StatusId + "},{\"ReportFieldId\":665,\"Value\":" + SpaceId + "},{\"ReportFieldId\":666,\"Value\":" + Xposition + "},{\"ReportFieldId\":667,\"Value\":" + Yposition + "},{\"ReportFieldId\":668,\"Value\":" + Angle + "},{\"ReportFieldId\":669,\"Value\":" + DrawingId + "},{\"ReportFieldId\":658,\"Value\":" + ObjectCategoryId + "},{\"ReportFieldId\":7411,\"Value\":" + SiteId + "}], Id: " + ObjectId + " }" }, this.updateSymbols);
        }
        else {
            var blockhandle: any = null;
            return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":4477,\"Value\":" + Xposition + "},{\"ReportFieldId\":4478,\"Value\":" + Yposition + "},{\"ReportFieldId\":4479,\"Value\":" + Angle + "},{\"ReportFieldId\":4475,\"Value\":" + DrawingId + "},{\"ReportFieldId\":4476,\"Value\":0}], Id: " + ObjectId + " }" }, this.updateBuildingSymbols);
        }
        
    }


    //for: after place functionality update the symbol details int the building table
    //updateAssetsSymbolDataforBuildig(Xposition: number, Yposition: number, Angle: number, DrawingId: number, BlockRefHandle: string, OldObjectId: number, ObjectId: number) {
    //    return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":4477,\"Value\":" + Xposition + "},{\"ReportFieldId\":4478,\"Value\":" + Yposition + "},{\"ReportFieldId\":4479,\"Value\":" + Angle + "},{\"ReportFieldId\":4475,\"Value\":" + DrawingId + "},{\"ReportFieldId\":4480,\"Value\":" + BlockRefHandle + "},{\"ReportFieldId\":4476,\"Value\":" + OldObjectId + "}], Id: " + ObjectId + " }" }, this.updateBuildingSymbols);
    //}

    getUserEditableOrgUnits() {
        return this.postaction({ Input: "{ FormId: 0 }" }, this._getUserEditableOrgUnitsUrl);
    }

    getAssetsSheduledToMove(ObjectId: number) {
        return this.postaction({ Input: "{ EntityId:" + ObjectId + " }" }, this.getAssetsSheduledToMoveUrl);
    }

    //for getting assetcount details in space //spOBJ_GetObjectToolTip(@SpaceId~665,@DrawingId~669)

    getAssetsCount(DrawingId: number, ObjectCategoryId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":669,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":649,\"Value\":\"" + ObjectCategoryId + "\"}]}" }, this._displayAssetsCountUrl);
    }
    getColorPreferenceDataForObjects(formId: string, ModuleId: string, rptField: any, isMySetting: boolean) {
        return this.postaction({ Input: "{ FormId:" + formId + ",ListReportFieldIdValues:" + rptField + " }", moduleId: ModuleId, selectedFieldName: "", isMySettings: isMySetting }, this.getColorPrefernceDataUrl);
    };
    UpdateOrphanObjects(listReptValues: any, drawingCategoryId) {
        return this.postaction({ Input: "{EntityId:" + drawingCategoryId + ",ListReportFieldIdValues:" + listReptValues + "}" }, this.UpdateOrphanObjectsUrl);
    }
}

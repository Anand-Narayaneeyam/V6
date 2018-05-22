import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from '../../Framework/Models//Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class EmployeeService extends HttpHelpers {

    //////////////////new///////////////////////

    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private employeeListDataListUrl = 'Employee/GetEmployeeList';
    private assignedEmployeeGetUrl = 'Employee/GetDrawingsWithData';
    private GetDrawingsWithDataForFloorSelection = 'Employee/GetDrawingsWithDataForFloorSelection';
    private MoveProjectAddUrl = 'Employee/InsertMoveProjects';
    private MoveProjectEditUrl = 'Employee/UpdateMoveProjects'
    private GetSpacePlanningFloorList = 'Drawing/GetAllocatedDrawingsForSpacePlanning';
    private GetAllocatedDrawingsForSpacePlanningAndFloorSelection = 'Drawing/GetAllocatedDrawingsForSpacePlanningAndFloorSelection';
    private updateStatusSpacePlanningUrl = 'Employee/UpateMoveProjectStatus'
    private updateFloorUrl = 'SiteBuildingFloor/UpdateEmployeeMoveProjectFloors'
    private MoveProjectListUrl = 'Employee/GetAllSpacePlanConvertedProject'
    private ExecuteMoveProjectUrl = 'Employee/ExecuteSpacePlanningMoveProject';
    private ExecuteDetailsUrl = 'Employee/ExecuteEmployeeMoves'
    private saveEmployee = 'Employee/SaveEmployeewithImage'
    private deleteEmployee = 'Employee/DeleteEmployeewithImage';
    private checkEmployeeStatus = 'Employee/CheckEmployee';
    private SuperVisorCount = 'Employee/GetEmployeeSuperVisorCount';
    private _checkEditPrivilageExistUrl = 'Employee/CheckEditPrivilageExist';
    private UpdateEmployeeScaleFactorUrl = 'EmployeeDrawing/UpdateEmployeeScaleFactor';


    private customerSettingsUrl = 'Common/GetSubscribedFeatures';


    private loadActionUsers = 'WorkFlow/GetFirstWorkflowActionPoint';
    private submitSendForApproval = 'WorkFlow/InsertWorkFlowEntity'

    private addDataUrl = 'Common/GetAddAppFormFields';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private submitAddUrl = 'Common/InsertAppFormData';
    private submitEditUrl = 'Common/UpdateAppFormData';
    private lookupUrl = 'Common/GetFieldLookupValues';
    private deleteUrl = 'Common/DeleteAppFormData';
    private keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
    private deleteFieldValue = 'Common/DeleteAdditionalDataFieldValues';
    private GetAdvancedSerachResulturl = 'Common/GetAdvancedSerachResult';
    private AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
    private CheckIsEntityReferenceUrl = 'Common/CheckIsEntityReferenceExists';
    private updateFieldSubscriptionUrl = 'Common/UpdateFieldSubscriptionSettings';
    //view stack
    private stackPlanDetailsUrl = 'Employee/GetEmployeeSpacePlanningStackOccupancyDetails'; //'Employee/GetEmployeeStackOccupancyDetails';
    private approveStavkPlansUrl = 'Employee/ApproveStackPlan';
    private getRandomColor = 'Employee/getRandomColorsforStack';
    private getOrgwiseEmplyees = 'Employee/GetOrganizationalWiseEmployees';
    private validatestackplanOrgMoves = 'Employee/ValidateStackPlanOrgUnitMoves';
    private saveStackDetails = 'Employee/SaveStackPlanData';
    private chkEmpAssignedToOrgUnit = 'Employee/CheckWhetherEmpAssignedToOrgUnit';
    private allemployeelistFormId = 102;
    public allemployeeAddEditFormId = 119;
    private unassignedlistFormId = 130;
    private unassignedAddEditFormId = 131;
    private assignedEmployeeListFormId = 140;
    private assignedEmployeeAddEditFormId = 143;
    private stackplansFormId = 161;
    private orgWiseEmpListFormId = 213;
    private SelectEmployeeResourceFormove = 348;
    //////////////////////////////////

    //Empployee Resource
    private employeeResourceListFormId = 142;
    private newEmployeeResourceListFormId = 149;
    private resourceTypeLookUpGetUrl = 'Employee/GetResourceTypeLookupValues';
    private resourceTypeWithFilterLookUpGetUrl = 'Employee/GetResourceTypeWithFilterLookupValues'
    private newEmployeeResourceGetUrl = 'Employee/GetEmployeeResourceforAllocation';
    private newEmployeeResourceAssignedToaSpaceGetUrl = 'Employee/GetObjectsAssignedToaSpace';
    private insertEmployeeResourcesSubmitUrl = 'Employee/InsertEmployeeResources';
    private deleteEmployeeResourcesSubmitUrl = 'Employee/DeleteEmployeeResources';
    private createMoveProjectfromScenarioUrl = 'Employee/ConvertToMoveProjectFromScenario';
    private getScenarioDrawingsUrl = 'EmployeeDrawing/GetScenarioDrawings';
    private ApprovedStackPlanUrl = 'Employee/GetAllSpacePlanningProject';
    private GetApprovedStackPlanforaProjectUrl = 'Employee/GetApprovedStackPlanforaProject';
    private ConvertApprovedStackPlanToScenarioUrl = 'Employee/ConvertApprovedStackPlanToScenario';
    private CreateMoveProjectUrl = 'Employee/ConvertToMoveProject';
    private GetMoveProjectDetailBasedOnStatusIdUrl = 'Employee/GetMoveProjectDetailBasedOnStatusId';
    private ApprovedStackPlanToScenarioUrl = 'Employee/ApprovedStackPlanToScenario';
    private orgStrucFldforStack = 'Common/GetCustomerOrganizationalStructure';

    /*Field Order*/
    private UpdateApplicationFormFieldOrderUrl = 'Common/UpdateApplicationFormFieldOrder';
    

    private SpacePlanningProjectListFormId = 146;
    private SpacePlanningProjectAddEditFormId = 148;
    private SendForApprovalFormId = 152;
    private SpacePlanningRequestFrmId = 159;
    private ScenarioListFrmId = 160;
    private AddEditScenarioFrmId = 163;
    private ScenarioDrawingFrmId = 178;
    private GradeFormId = 184; 
    private SpaceTypeId = 583;
    private SpaceAllocationRuleId = 596;
    private AddEditSpaceAllocationRuleId = 597;
    private ApprovedStackPlanFrmId = 261;
    private MoveProjectListFormId = 153;
    private showDetailsReadOnlyListFormId = 157;

    private stackPlanDetailsFormId = 266;
    private assignLocationtFormId = 286;

    private addEditStackFrmId = 216;
    private EmployeeDashBoardFrm = 365;
    private SearchForSpaceFormId= 546;
    /////////////////new///////////////////////

    private optionalFieldUrl = 'MockData/Data/moduleswitch-drawing_data.json';

    //allemployee related
    private allEmployeeSubmenuUrl = 'MockData/Menu/employee_submenu.json';
    private AllemployeeUrl = 'MockData/Data/siteList.json';
    private AllEmployeeColumnUrl = 'MockData/FieldObjects/siteColumnList.json';
    private _AllemployeeAddEditDataUrl = 'MockData/FieldObjects/siteAddEdit.json'
    //menu for drawing 
    private employeeSubmenuInDrawingUrl = 'MockData/Menu/employee_submenu_drawing.json';
    //assignedemployee related
    private assignedEmployeeMainListfield = 'MockData/Data/user-drawing_floor-accessFieldsList.json';
    private assignedEmployeeMainListData = 'MockData/Data/user-drawing-floor-access.json';
    private assignedEmployeeColumnDataUrl = 'MockData/FieldObjects/buildingColumnList.json'
    private assignedEmployeeDataUrl = 'MockData/Data/buildingList.json';
    private AssignedEmployeeAddEditDataUrl = 'MockData/FieldObjects/buildingAddEdit.json'

    //unassigned related
    private unassignedDataUrl = 'MockData/Data/floorList.json';
    private unassignedColumnDataUrl = 'MockData/FieldObjects/floorColumnList.json'
    private unassignedAddEditDataUrl = 'MockData/FieldObjects/floorAddEdit.json'
    private employeeDrawing = 'EmployeeDrawing / GetAllocatedDrawingsForEmp'

    private getSessionValues = 'Common/GetSessionValues';
    private GetSpaceSearchResultsUrl = 'Employee/GetSpaceSearch';
    

    //emp general settings
    private jobTitleData = '';
    private jobTitleFields = '';

    private gradesFields = '';
    private gradesData = '';
    private gradesPagedData = '';

    //Job Title
    private JobTitleFormId = 182;
    //private jobTitleData = 'MockData/Data/space-functions_Data.json';
    //private jobTitleFields = 'MockData/Data/space-functions_Fields.json';

    //private gradesFields = 'MockData/Space/spacestdfields.json';
    //private gradesData = 'MockData/Space/spacestd_mockdata.json';
    //private gradesPagedData = 'MockData/Space/spacestd_mockdata1.json';

    private listEmployeeSnapshotsFormId = 309;
    private getOrgLevelCustomName = 'Employee/GetOrganizationStructures';
    private dbObjectLookUpUrl = 'Common/GetDBObjectLookupValues';
    private CheckGradeInUse = 'Employee/CheckGradeInUse';

    private getEmployeeAssignRequestStatusUrl = 'EmployeeDrawing/GetEmployeeAssignRequestStatus';
    private apiAllEmployeeDataExportUrl = 'api/IndusImport/GetEmployeeData';
    private assignedEmployeeListFormIdChange = 102;

    /**
     * Employe Move Project Execution WorkFlow 
     */
    private subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
    private saveMoveProjectExecutionDetailsUrl = 'Employee/SaveMoveProjectExecutionDetails';
    private getMoveProjectExecutionTasksUrl = 'Employee/GetMoveProjectExecutionTasks';
    private getActionPointUserLookupUrl = 'WorkOrder/GetActionPointUsers';
    private getMoveProjectExecutionDataUrl = 'Employee/GetMoveProjectExecutionData';

    private employeeMoveProjectRequestListFormId = 334;
    private employeemoveProjectExecutionRequestFormId = 341;
    private reviewMoveProjectExecutionFormId = 352;

    private employeeMoveRequestFormId = 418;

    private moveMoveProjectDetailsUrl = "Employee/GetAllAssignedMoveProjectDetails";//EmployeeDrawing/GetMoveRequestedEmployees";

    private moveRequestListUrl = "EmployeeDrawing/GetMoveRequestedEmployees";
    private MoveEmployeeResources = "EmployeeDrawing/MoveEmployeeResources";
    private MoveEmployeeResourcesNew = "EmployeeDrawing/MoveMultipleEmployeeResources";
    // Rollback Moves
    private getEmployeeMovesForRollBackUrl = 'EmployeeDrawing/GetEmployeeMovesForRollBack';
    private rollbackMovesListFormId = 364;
    private checkEmployeeRollbackPossibleUrl = 'EmployeeDrawing/CheckEmployeeRollbackPossible';
    private employeeMoveRollbackUrl = 'EmployeeDrawing/EmployeeMoveRollback';
    private getEmployeeMovesForRollBackHistoryUrl = "EmployeeDrawing/GetEmployeeMovesForRollBackHistory";


    /**
     * 
     * Employee Dashboard
     */
    private getOrganizationalOccupancyforDashBoard = 'Employee/GetOrganizationalOccupancyforDashBoard';
    private getSpaceStandardOccupancyforDashBoard = 'Employee/GetSpaceStandardOccupancyforDashBoard';
    private getBuildingOccupancyforDashboard = 'Employee/GetBuildingOccupancyforDashBoard';
    private getOrganizationalStructureforLookups = 'Report/GetOrganizationalStructureforLookups';

    private updateMultipleEmployeeDataUrl = 'Employee/UpdateMultipleEmployeeData';
    private getIsModuleAdminUrl = 'Common/IsModuleAdmin';

    private getOrgUnitWiseSeatingCapacitiesforTrendAnalysis = 'Employee/GetOrgUnitWiseSeatingCapacitiesforTrendAnalysis';
    private getSpaceStandardWiseSeatingCapacitiesforTrendAnalysis = 'Employee/GetSpaceStandardWiseSeatingCapacitiesforTrendAnalysis';
     
    private getRateofHiringbyTimeforTrendAnalysis = 'Employee/GetRateOfHiringforTrendAnalysis';

    private getGradeWiseSeatingCapacitiesforTrendAnalysis = 'Employee/GetGradeWiseOccupancyforTrendAnalysis';


    /*
    Employee Move/Assign through workflow
    */
    private SaveEmployeeMovethroughWorkflow = 'EmployeeDrawing/InsertEmployeeMovethroughWorkflow'; //  'EmployeeDrawing/SaveEmployeeMovethroughWorkflow';
    private SaveEmployeeAssignthroughWorkflow = 'EmployeeDrawing/InsertEmployeeAssignthroughWorkflow';
    private SaveEmployeeResourcesthroughWorkflow = 'EmployeeDrawing/InsertEmployeeMoveObjectDetails';

    private employeeMoveRequestListFormId = 420;
    private reviewEmployeeMoveFormId = 422;
    private getEmployeeMoveAssignApprovalRequestDataUrl = 'Employee/GetEmployeeMoveAssignApprovalRequestData';
    private reviewEmployeeMovethroughWorkflowUrl = 'EmployeeDrawing/ReviewEmployeeMovethroughWorkflow';

    private employeeAssignRequestListFormId = 424;
    private reviewEmployeeAssignthroughWorkflowUrl = 'EmployeeDrawing/ReviewEmployeeAssignthroughWorkflow';
    private cancelEmployeeMoveAssignRequestUrl = 'Employee/CancelEmployeeMoveAssignRequest';

    private deleteEMPMoveDtls = 'Employee/DeleteEmployeeMoveDetails';
    private deleteEMPMoveResrcDetls = 'Employee/DeleteEmployeeMoveResourceDetails';
    private reviewMoveEMPResourceFormId = 588;
    private empReviewHistoryFrmId = 590;

    /* Employee To Work Order User */
    private employeeToWorkOrderUserFormId = 582;

    private createEmployeeToWorkOrderUserUrl = 'Employee/CreateEmployeeToWorkOrderUser';
    private drawinDetailsUrl = 'Drawing/GetOpenDrawingDetails';
    private insertMultipleSpaceAllotmentDetailsUrl = 'Employee/InsertMultipleSpaceAllotmentDetails';
    private checkSpaceEmployeeOccupancyUrl = 'Employee/CheckSpaceEmployeeOccupancy';
    private checkResourceExistForEmployeesUrl = 'EmployeeDrawing/CheckResourceExistForEmployees';
    private getEmployeeSheduledToMoveUrl = 'EmployeeDrawing/GetEmployeeSheduledToMove';
   constructor(private http: Http) {
        super(http);
    }
   getIsModuleAdmin(moduleId: number) {
       return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}" }, this.getIsModuleAdminUrl);
   }
    getOptionalField() {
        return this.postgetaction<Observable<any>>(null, this.optionalFieldUrl);
    }
    getOptionalFieldsListFields() {
        return this.postaction({ Input: "{ FormId: 448}" }, this.listFieldObjUrl);
    }  

    getOptionalFieldsListData(pageIndex, sortCol, sortDir, fieldSubscriptionCategoryId: any) {
        return this.postaction({ Input: "{FormId:448,PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:[{\"ReportFieldId\":5074,\"Value\":" + fieldSubscriptionCategoryId + "}]}" }, this.listDataListUrl);
    }

    updateOptionalFields(strRptFields: string) {
        debugger;
        return this.postaction({ Input: strRptFields }, this.updateFieldSubscriptionUrl);
    }

    getEmployeeMenu(target: number) {
        var urlForMenuData: any;
        if (target == 1)
            urlForMenuData = this.allEmployeeSubmenuUrl;
        else
            urlForMenuData = this.employeeSubmenuInDrawingUrl;
        return this.postgetaction<Observable<any>>(null, urlForMenuData)
    }
    loadOrganizationalUnit(id, parentid, fieldobj) {

        return this.postaction({ Input: "{FormId:" + this.allemployeeAddEditFormId + ",Id:" + id + ",ParentFieldId:" + parentid + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj )+ "}" }, this.lookupUrl);
    }
    CheckEmployeeStatus(id) {
        return this.postaction({ input:"{Id:"+id+"}"},this.checkEmployeeStatus)
    }
    getSupervisorCount(id) {
        
        return this.postaction({ Input: "{Id:" + id + "}" }, this.SuperVisorCount)

    }
    //allEmployee related 
    getAllEmployeeSearchKeyWordLookup() {
        return ["Aberdeen", "Concord", "Arlington", "Framingham", "Greenwood", "Manchester", "Site 1", "WhiteField"];
    }
    getAllEmployeeData(index: number, column: any, direction: any,filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any, isexport?: any) {
        // return this.postgetaction<Observable<any>>(null, this.AllemployeeUrl);    
        // return this.postaction({ Input: "{ FormId: " + this.allemployeelistFormId + ",PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "'}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 0 }, this.employeeListDataListUrl);
        if (isexport == true)
            return this.postaction({ Input: "{ FormId: " + this.allemployeelistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "0", IsExport: 1 }, this.employeeListDataListUrl);
         else return this.postaction({ Input: "{ FormId: " + this.allemployeelistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "0" }, this.employeeListDataListUrl);
    }
    getAllEmployeeDataExport(index: number, column: any, direction: any, fieldObjects: any, fileName, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any, isexport?: any) {
        var fields = fieldObjects;

        let filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });
        return { Input: "{ FormId: " + this.allemployeelistFormId + ",ParentFormId:127,SortColumn:'" + column + "',IsExport:1,SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "0", fileName: fileName, fields: filterArray};
   }
    getAllEmployeeColumnData() {
        //return this.postgetaction<Observable<any>>(null, this.AllEmployeeColumnUrl)
        return this.postaction({ Input: "{ FormId: " + this.allemployeelistFormId + " }" }, this.listFieldObjUrl);
    }
    allEmployeePaging(index: number, column: any, direction: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        console.log('current page', index)
        //return this.postaction({ Input: "{ FormId: " + this.allemployeelistFormId + ",PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "'}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 0 }, this.employeeListDataListUrl);
        return this.postaction({ Input: "{ FormId: " + this.allemployeelistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "0" }, this.employeeListDataListUrl);
    }
    loadallEmployeeAddEdit(selectedId: any, addEdit: string) {
        let lookupRptField = "[{\"FieldId\":395,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":395,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":399,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":400,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":487,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":489,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        if (addEdit == "add") { //code for loading add
            return this.postaction({ Input: "{ FormId: " + this.allemployeeAddEditFormId + ",ListLookupReportFieldIdValues:" + lookupRptField + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") { //code for loading edit
            return this.postaction({ Input: "{ FormId: " + this.allemployeeAddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.allemployeelistFormId + ",ListLookupReportFieldIdValues:" + lookupRptField + " }" }, this.editDataUrl);
        }

        //return this.postgetaction<Observable<any>>(null, this._AllemployeeAddEditDataUrl)
    }

    getAllEmployeeAdvnceSearchLookup() {
        return this.postaction({ Input: "{FormId:127}" }, this.AdvanceSearchLookUpUrl)
    }

    getAllEmployeeKeywordField() {
        return this.postaction({ Input: "{FormId:126}" }, this.keywordLookUpUrl)
    }

    AllEmployeeAdvanceSeachResult(value: any, index: number, direction: any, column: any) {
        return this.postaction({ Input: "{ FormId:102,ListFilterIdValues: " + value + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "0" }, this.employeeListDataListUrl);
    }

    AllEmployeeKeywordSeach(value: any, index: number, direction: any, column: any) {
        return this.postaction({ Input: "{ FormId:102,Filter: '" + value + "',ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:1 ,IsAdvancedSearch:0}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "0" }, this.employeeListDataListUrl);
    }

    submitAllEmployeeAdd(pageDetails, fileobj) {
        console.log('entered add service')
        if (fileobj == undefined)
            return this.postaction({ Input: "{FormId:" + this.allemployeeAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.allemployeelistFormId + "}" }, this.submitAddUrl);
        else
            return this.postaction({ applnInput: "{FormId:" + this.allemployeeAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.allemployeelistFormId + "}", FileInput: fileobj }, this.saveEmployee);

    }
    submitAllEmployeeEdit(pageDetails, id: any, fileobj) {
        console.log('entered edit service')
        if (fileobj == undefined)
            return this.postaction({ Input: "{FormId:" + this.allemployeeAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.allemployeelistFormId + "}" }, this.submitEditUrl);
        else
            return this.postaction({ applnInput: "{FormId:" + this.allemployeeAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.allemployeelistFormId + "}", FileInput: fileobj }, this.saveEmployee);

    }
    submitinlineAllEmployeeAdd(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.allemployeelistFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);
    }
    submitAllEmployeeDelete(selectedID: any) {
        console.log('entered delete service')
        // return this.postaction({ Input: "{FormId:" + this.allemployeelistFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)
        return this.postaction({ applnInput: "{FormId:" + this.allemployeelistFormId + ",Id:" + selectedID[0] + "}" }, this.deleteEmployee)

    }
    submitinlienAllEmployeeEdit(pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.allemployeelistFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);
    }

    //assignedEmployeeRelated
    //getAssignedEmployeeMainListField() {
    //    return this.postgetaction<Observable<any>>(null, this.assignedEmployeeMainListfield);
    //}
    getAssignedEmployeeMainListData(moduleId: number) {
        //return this.postgetaction<Observable<any>>(null, this.assignedEmployeeMainListData);
        return this.postaction({ Input: "{}", ModuleId: moduleId }, this.GetDrawingsWithDataForFloorSelection);

    }
    floorSelectionPaging(index: number) {
        console.log('current page', index)

    }

    getAssignedEmployeeAdvnceSearchLookup() {
        return this.postaction({ Input: "{FormId:127}" }, this.AdvanceSearchLookUpUrl)
    }

    AssignedEmployeeKeywordSeach(index: number, direction: any, column: any, drawingId: any, drawingIds: any[], filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        return this.postaction({ Input: "{ FormId:140,Filter: '" + filter + "',ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:1 ,IsAdvancedSearch:0}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1" }, this.employeeListDataListUrl);
    }

    AssingedEmployeeAdvanceSeachResult(index: number, direction: any, column: any, drawingId: any, drawingIds: any[], filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        return this.postaction({ Input: "{ FormId:140,ListFilterIdValues: " + value + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1" }, this.employeeListDataListUrl);
    }

    getAssignedEmployeeSearchKeyWordLookup() {
        return this.postaction({ Input: "{FormId:126}" }, this.keywordLookUpUrl)
    }

    getAssignedEmployeeColumnData() {
        //return this.postgetaction<Observable<any>>(null, this.assignedEmployeeColumnDataUrl);
        return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormId + " }" }, this.listFieldObjUrl);
    }

    getAssignedEmployeeData(index: number, column: any, direction: any, drawingId: any, drawingIds: any[], filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any, pageTarget?: any,isExport?:any) {
        if (pageTarget == 1) {
            if (isExport == true)
                return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1", IsExport: 1 }, this.employeeListDataListUrl);
            else
                return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormId + ",IsExport:1,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1" }, this.employeeListDataListUrl);
        } else {
            if (isExport == true)
                return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1", IsExport: 1 }, this.employeeListDataListUrl);
            else
                return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1" }, this.employeeListDataListUrl);
        }

    }
    getAssignedEmployeeDataExport(index: number, column: any, direction: any, drawingId: any, drawingIds: any[], fieldObjects: any, fileName,  filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any, pageTarget?: any, isExport?: any) {
        var fields = fieldObjects;

        let filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });
        if (pageTarget == 1) {
           
            return { Input: "{ FormId: " + this.assignedEmployeeListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1", fileName: fileName, fields: filterArray};
            } 
        else
            return { Input: "{ FormId: " + this.assignedEmployeeListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1", fileName: fileName, fields: filterArray } ;
                 
    }
    loadassignedEmployeeAddEdit(selectedId: number, addEdit: string) {
        //let lookupRptField = "[{\"FieldId\":395,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":395,\"ReportFieldId\": 288, \"Value\":\"0\" }]";
        let lookupRptField = "[{\"FieldId\":395,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":395,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":399,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":400,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":487,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":489,\"ReportFieldId\": 289, \"Value\":\"5\" }]";

        if (selectedId != undefined) {
            if (addEdit == "add") { //code for loading add
            }
            else if (addEdit == "edit") { //code for loading edit
                return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeAddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.assignedEmployeeListFormId + ",ListLookupReportFieldIdValues:" + lookupRptField + "  }" }, this.editDataUrl);

            }

        }

        // return this.postgetaction<Observable<any>>(null, this.AssignedEmployeeAddEditDataUrl)
    }
    submitAssignedEmployeeAdd(pageDetails: IField[]) {
        console.log('entered add service')
    }
    submitAssignedEmployeeEdit(pageDetails, id: any, fileobj) {
        console.log('entered edit service')
        if (fileobj == undefined)
            return this.postaction({ Input: "{FormId:" + this.assignedEmployeeAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.assignedEmployeeListFormId + "}" }, this.submitEditUrl);
        else
            return this.postaction({ applnInput: "{FormId:" + this.assignedEmployeeAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.assignedEmployeeListFormId + "}", FileInput: fileobj }, this.saveEmployee);


    }
    submitinlienAssignedEmployeeEdit(pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.allemployeelistFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);
    }

    submitAssignedEmployeeDelete(selectedID: any) {
        console.log('entered delete service')
        return this.postaction({ Input: "{FormId:" + this.assignedEmployeeListFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)

    }
    assignedEmployeePaging(index: number, column: any, direction: any, drawingId: number, drawingIds: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: drawingId, DrawingIds: drawingIds, AssignmentStatus: 1 }, this.employeeListDataListUrl);
    }

    //unassigned employee related 
    getUnassingedEmployeeMainKeyWordLookUp() {
        return ["01", "01 Tel  Rm-North", "01 Tel  Rm-South", "02", "03", "011", "010 Tel  Rm-North", "012 Tel", "12", "145"];
    }
    getUnassignedEmployeeData(index: number, column: any, direction: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any, isexport?: any) {
        if (isexport == 1)
            return this.postaction({ Input: "{ FormId: " + this.unassignedlistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2, IsExport: 1 }, this.employeeListDataListUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.unassignedlistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2 }, this.employeeListDataListUrl);

    }
    getUnassignedEmployeeDataExport(index: number, column: any, direction: any, fieldObjects: any, fileName, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any, isexport?: any) {
        var fields = fieldObjects;

        let filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel)
                return true;
            }
            else return false;

        });

        return { Input: "{ FormId: " + this.unassignedlistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2, fileName: fileName, fields: filterArray };


    }
    getUnassignedEmployeeColumnData() {
        //return this.getaction<Observable<any>>(this.unassignedColumnDataUrl);
        return this.postaction({ Input: "{ FormId: " + this.unassignedlistFormId + " }" }, this.listFieldObjUrl);
    }
    submitUnassignedEmployeeDelete(selectedID: any) {
        console.log('entered delete service')
        //return this.postaction({ Input: "{FormId:" + this.unassignedlistFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)
        return this.postaction({ applnInput: "{FormId:" + this.unassignedlistFormId + ",Id:" + selectedID[0] + "}" }, this.deleteEmployee)
    }
    submitUnassignedEmployeeAdd(pageDetails, fileobj) {
        console.log('entered add service')
        if (fileobj == undefined)
            return this.postaction({ Input: "{FormId:" + this.unassignedAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.unassignedlistFormId + "}" }, this.submitAddUrl);
        else
            return this.postaction({ applnInput: "{FormId:" + this.unassignedAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.unassignedlistFormId + "}", FileInput: fileobj }, this.saveEmployee);
    }
    submitinlineUnassignedEmployeeAdd(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.unassignedlistFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);
    }
    submitUnassignedEmployeeEdit(pageDetails, id: any, fileobj) {
        console.log('entered edit service')
        if (fileobj == undefined)
            return this.postaction({ Input: "{FormId:" + this.unassignedAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.unassignedlistFormId + "}" }, this.submitEditUrl);
        else
        return this.postaction({ applnInput: "{FormId:" + this.unassignedAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.unassignedlistFormId + "}", FileInput: fileobj }, this.saveEmployee);
    }
    submitinlineUnassignedEmployeeEdit(pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.allemployeelistFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);
    }
    unassignedEmployeePaging(index: number, column: any, direction: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        //console.log('current page', index)
        //return this.postaction({ Input: "{ FormId: " + this.unassignedlistFormId + ",PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "'}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2 }, this.employeeListDataListUrl);
        return this.postaction({ Input: "{ FormId: " + this.unassignedlistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2 }, this.employeeListDataListUrl);
    }
    loadunassignedEmployeeAddEdit(selectedId: number, addEdit: string) {
        //let lookupRptField = "[{\"FieldId\":395,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":395,\"ReportFieldId\": 288, \"Value\":\"0\" }]";
        let lookupRptField = "[{\"FieldId\":395,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":395,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":399,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":400,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":487,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":489,\"ReportFieldId\": 289, \"Value\":\"5\" }]";

        if (addEdit == "add") { //code for loading add
            return this.postaction({ Input: "{ FormId: " + this.unassignedAddEditFormId + ",ListLookupReportFieldIdValues:" + lookupRptField + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") { //code for loading edit
            return this.postaction({ Input: "{ FormId: " + this.unassignedAddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.unassignedlistFormId + ",ListLookupReportFieldIdValues:" + lookupRptField + " }" }, this.editDataUrl);
        }
    }


    getunassignedEmployeeAdvnceSearchLookup() {
        return this.postaction({ Input: "{FormId:127}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2 }, this.AdvanceSearchLookUpUrl)
    }

    getunassignedEmployeeKeywordField() {
        return this.postaction({ Input: "{FormId:126}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2 }, this.keywordLookUpUrl)
    }

    unassignedEmployeeAdvanceSeachResult(value: any, index: number, direction: any, column: any) {
        return this.postaction({ Input: "{ FormId:130,ListFilterIdValues: " + value + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "2" }, this.employeeListDataListUrl);
    }

    unassignedEmployeeKeywordSeach(value: any, index: number, direction: any, column: any) {
        return this.postaction({ Input: "{ FormId:130,Filter: '" + value + "',ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:1 ,IsAdvancedSearch:0}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "2" }, this.employeeListDataListUrl);
    }

    //job title
    getJobTitleFields() {
        return this.postaction({ Input: "{ FormId:" + this.JobTitleFormId + "}" }, this.listFieldObjUrl);
    }

    getJobTitleData(index: number,column: any, direction: any) {
        return this.postaction({ Input: "{FormId:" + this.JobTitleFormId + ",SortColumn: '" + column + "', SortDirection: '" + direction + "',PageIndex:" + index +"}" }, this.listDataListUrl);
    }
    loadJobTitleAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.JobTitleFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.JobTitleFormId + ",ParentFormId:" + this.JobTitleFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
    AddUpdateJobTitle(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.JobTitleFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.JobTitleFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }

    }
    
    insertJobTitle(pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.JobTitleFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:0}", }, this.submitAddUrl);
    }

    updateJobTitle(pageDetails, selectId) {
        return this.postaction({ Input: "{ FormId:" + this.JobTitleFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    deleteJobTitle(id: any) {
        return this.postaction({ Input: "{FormId:" + this.JobTitleFormId + ",Id:" + id + "}" }, this.deleteUrl);
    }

    //Space Type
    getpaceTypeFields() {
        return this.postaction({ Input: "{FormId:" + this.SpaceTypeId + "}" }, this.listFieldObjUrl);
    }
    getSpaceTypeData(index: number, column: any, direction: any) {
        return this.postaction({ Input: "{FormId:" + this.SpaceTypeId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    }

    postDeletepaceType(id) {
        return this.postaction({ Input: "{FormId:" + this.SpaceTypeId + " ,Id:" + id + "}" }, this.deleteUrl);
    }

    //Space Allocation Rules

    getspaceAllocationRuleFields() {
        return this.postaction({ Input: "{FormId:" + this.SpaceAllocationRuleId+ "}" }, this.listFieldObjUrl);
    }
    getSpaceAllocationRuleData(index: number, column: any, direction: any) {
        return this.postaction({ Input: "{FormId:" + this.SpaceAllocationRuleId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    }

    getSpaceAllocationRuleDetails(index: number, column: any, direction: any, id: any, reportfieldIdArray: any) {
        debugger
        return this.postaction({ Input: "{FormId:" + this.SpaceAllocationRuleId + ",Id:" + id + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ",ListReportFieldIdValues:" + JSON.stringify(reportfieldIdArray) +" }" }, this.listDataListUrl);
    }

    loadSpaceAllocationruleAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.AddEditSpaceAllocationRuleId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.AddEditSpaceAllocationRuleId + ",ParentFormId:" + this.GradeFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    postDeleteSpaceAllocation(strRptFields: any, spaceId: any) {
        return this.postaction({ Input: "{FormId:" + this.SpaceAllocationRuleId + " ,Id:" + spaceId + ",ListReportFieldIdValues:" + JSON.stringify(strRptFields) + "}" }, this.deleteUrl);
    }

    AddUpdateGradestospaceallocation(strRptFields: any, target: boolean) {
        if (target)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.AddEditSpaceAllocationRuleId + ",ListReportFieldIdValues:" + JSON.stringify(strRptFields) + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.AddEditSpaceAllocationRuleId + ",ListReportFieldIdValues:" + JSON.stringify(strRptFields) + "}" }, this.submitEditUrl);
        }

    }

    //Emp grade
    getGradeFields() {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + "}" }, this.listFieldObjUrl);
    }
    getGradeData(index: number, column: any, direction: any) {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    }
    loadGradeAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.GradeFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.GradeFormId + ",ParentFormId:" + this.GradeFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
    AddUpdateGrades(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }

    }

    postAddGradeDetails(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    }

    postEditGradeDetails(pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }

    postDeleteGradeDetails(id) {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }

    postUpdateEmployeeRankOrder(pageDetails) {
        return this.postaction({ Input: pageDetails }, this.UpdateApplicationFormFieldOrderUrl);
    }
     

    /* Employee : Scenarios BEGIN*/

    getScenarioListColumns() {
        return this.postaction({ Input: "{FormId:" + this.ScenarioListFrmId + "}" }, this.listFieldObjUrl);
    }

    scenarioListData(pageIndex?: number, sortCol?: string, sortDir?: string) {
        return this.postaction({ Input: "{ FormId: " + this.ScenarioListFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }

    listAddScenario() {
        return this.postaction({ Input: "{ FormId:" + this.AddEditScenarioFrmId + ",ParentFormId:" + this.ScenarioListFrmId + "}" }, this.addDataUrl);
    }

    postInsertScenarios(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.AddEditScenarioFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}" }, this.submitAddUrl);
    }

    loadEditScenario(selectedId: number) {
        let rptFieldValues = "[{\"ReportFieldId\":907,\"Value\":\"" + selectedId + "\"}]"; 
        return this.postaction({ Input: "{ FormId:" + this.AddEditScenarioFrmId + ",ParentFormId:" + this.ScenarioListFrmId + ",ListReportFieldIdValues:" + rptFieldValues + "}" }, this.editDataUrl); 
    }

    listUpdateScenarios(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.AddEditScenarioFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}" }, this.submitEditUrl);
    }

    convertScenarioToMoveProject(pageDetails) {
        return this.postaction({ applnInput: "{FormId:" + this.AddEditScenarioFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}" }, this.createMoveProjectfromScenarioUrl);
    }

    getScenarioDrawingListColumns() {
        return this.postaction({ Input: "{FormId:" + this.ScenarioDrawingFrmId + "}" }, this.listFieldObjUrl);
    }


    scenarioListDrawingsData(scenarioId, pageIndex?: number, sortCol?: string, sortDir?: string) {
        var rptFldValues = "[{\"ReportFieldId\":904,\"Value\":\"" + scenarioId + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.ScenarioDrawingFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + rptFldValues + "}" }, this.getScenarioDrawingsUrl);
    }

    /* Employee : Scenarios END*/


    /* Employee : Approved Stack Plan BEGIN*/

    getApprovedStackPlanListColumns() {
        return this.postaction({ Input: "{FormId:" + this.ApprovedStackPlanFrmId + "}" }, this.listFieldObjUrl);
    }

    postApprovedStackPlanListData(pageDetails, pageIndex?: number, sortCol?: string, sortDir?: string) {
        return this.postaction({ Input: "{ FormId: " + this.ApprovedStackPlanFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.ApprovedStackPlanUrl);
    }

    getGetApprovedStackPlanforaProject(pageDetails) {
        return this.postaction({ applnInput: "{ FormId: " + this.ApprovedStackPlanFrmId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.GetApprovedStackPlanforaProjectUrl);
    }

    //postApprovedStackPlanToScenario(pageDetails) {
    //    return this.postaction({ applnInput: "{ FormId: " + this.ApprovedStackPlanFrmId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.ApprovedStackPlanToScenarioUrl);
    //}

    convertApprovedStackPlanToScenario(pageDetails) {
        return this.postaction({ applnInput: "{ FormId: " + this.ApprovedStackPlanFrmId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.ApprovedStackPlanToScenarioUrl);
    }

    postCreateMoveProject(pageDetails) {
        return this.postaction({ applnInput: "{ FormId: " + this.ApprovedStackPlanFrmId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.CreateMoveProjectUrl);
    }

    postGetMoveProjectDetailBasedOnStatusId(pageDetails, pageIndex?: number, sortCol?: string, sortDir?: string) {
        return this.postaction({ Input: "{ FormId: " + this.ApprovedStackPlanFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.GetMoveProjectDetailBasedOnStatusIdUrl);
    }
    /* Employee : Approved Stack Plan END*/

    //Space Planning Project
    getSpacePlanningListField() {
        return this.postaction({ Input: "{ FormId: " + this.SpacePlanningProjectListFormId + " }" }, this.listFieldObjUrl);
    }
    getSpacePlanningData(index: number, column: any, direction: any) {
        return this.postaction({ Input: "{ FormId: " + this.SpacePlanningProjectListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" }, this.listDataListUrl);

    }
    loadSpacePlanningAddEdit(selectedId: number, addEdit: string) {

        if (addEdit == "add") { //code for loading add
            return this.postaction({ Input: "{ FormId: " + this.SpacePlanningProjectAddEditFormId + ",ParentFormId:" + this.SpacePlanningProjectListFormId + " }" }, this.addDataUrl);
        }
        if (selectedId != undefined) {
            if (addEdit == "edit") { //code for loading edit
                return this.postaction({ Input: "{ FormId: " + this.SpacePlanningProjectAddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.SpacePlanningProjectListFormId + " }" }, this.editDataUrl);

            }

        }

        // return this.postgetaction<Observable<any>>(null, this.AssignedEmployeeAddEditDataUrl)
    }
    submitAddSpacePlanningProject(pageDetails) {
        return this.postaction({ applnInput: "{FormId:" + this.SpacePlanningProjectAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.SpacePlanningProjectListFormId + "}" }, this.MoveProjectAddUrl);
    }
    submitEditSpacePlanningProject(pageDetails, id: any) {
        return this.postaction({ applnInput: "{FormId:" + this.SpacePlanningProjectAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.SpacePlanningProjectListFormId + "}" }, this.MoveProjectEditUrl);
    }
    deleteSpacePlanningProject(Id: any, obj: any) {
        return this.postaction({ applnInput: "{FormId:" + this.SpacePlanningProjectListFormId + ",Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(obj) + "}" }, this.updateStatusSpacePlanningUrl)
    }
    restoreSpacePlanningProject(Id: any, obj: any) {
        return this.postaction({ applnInput: "{FormId:" + this.SpacePlanningProjectListFormId + ",Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(obj) + "}" }, this.updateStatusSpacePlanningUrl)
    }
    discardSpacePlanningProject(Id: any, obj: any) {
        return this.postaction({ applnInput: "{FormId:" + this.SpacePlanningProjectListFormId + ",Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(obj) + "}" }, this.updateStatusSpacePlanningUrl)
    }
    getFloorforSpacePlanning(moduleId: number, projectId: number) {
        //return this.postgetaction<Observable<any>>(null, this.assignedEmployeeMainListData);
        return this.postaction({ Input: "{}", ModuleId: moduleId, projectid: projectId }, this.GetAllocatedDrawingsForSpacePlanningAndFloorSelection);
    }
    updateEmployeeMoveProjectFloors(projectid: number, floorid: any[]) {
        //if (floorid == null)
        //    floorid = [];
        return this.postaction({ applnInput: "{}", projectid: projectid[0], floorids: floorid }, this.updateFloorUrl);

    }
    getSendForApprovalFields(obj: any) {
        return this.postaction({
            Input: "{ FormId: " + this.SendForApprovalFormId + ",ParentFormId:" + this.SpacePlanningProjectListFormId + ",ListLookupReportFieldIdValues:" + JSON.stringify(obj) + "}"
        }, this.addDataUrl);
    }
    getActionPoint(fieldObj) {
        return this.postaction({
            Input: "{ FormId: " + this.SendForApprovalFormId + ",ParentFormId:" + this.SpacePlanningProjectListFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldObj) + "}"
        }, this.loadActionUsers);
    }
    checkIsSpecificUser(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.SendForApprovalFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }
    loadNextActionPointUsers(dbObjectId: number, strReportFieldIds: string) {
        return this.postaction({ Input: "{FormId:" + this.SendForApprovalFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    }
    SubmitSendForApproval(fieldObj) {
        return this.postaction({
            Input: "{ FormId: " + this.SendForApprovalFormId + ",ParentFormId:" + this.SpacePlanningProjectListFormId + ",ListLookupReportFieldIdValues:" + JSON.stringify(fieldObj) + "}"
        }, this.submitSendForApproval);
    }
    //Move Project Details
    getMoveProjectList() {
        return this.postaction({ Input: "{ FormId: " + this.MoveProjectListFormId + " }" }, this.listFieldObjUrl);
    }
    getMoveProjectListData(index: number, column: any, direction: any, fieldObj: any) {
        return this.postaction({ Input: "{ FormId: " + this.MoveProjectListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[" + JSON.stringify(fieldObj[0]) + "]}" }, this.MoveProjectListUrl);
    }
    getShowDetailsReadOnlyField() {
        return this.postaction({ Input: "{FormId:" + this.showDetailsReadOnlyListFormId + "}" }, this.listFieldObjUrl);
    }

    //Stack plan details
    getStackPlanDetailsFields() {
        return this.postaction({ Input: "{FormId:" + this.stackPlanDetailsFormId + "}" }, this.listFieldObjUrl);
    }

    loadAssignLocation(fieldObj, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.assignLocationtFormId + ",ListLookupReportFieldIdValues:" + JSON.stringify(fieldObj) + ",Id:" + selectedId + "}" }, this.editDataUrl);
    }

    editMoveDetails(fieldObj, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.assignLocationtFormId + ",ListLookupReportFieldIdValues:" + JSON.stringify(fieldObj) + ",Id:" + selectedId + "}" }, this.editDataUrl);
    }

    deleteMoveProjectDetails(id: any) {
        return this.postaction({ Input: "{FormId:" + this.stackPlanDetailsFormId + ",Id:" + id + "}" }, this.deleteUrl);
    }

    loadAssignLocationLookups(id, parentId, fieldobj) {
        return this.postaction({ Input: "{FormId:" + this.assignLocationtFormId + ",Id:" + id + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.lookupUrl);
    }
    
    postSubmitAssignLocation(pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.assignLocationtFormId + ",ParentFormId:" + this.stackPlanDetailsFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitEditUrl);
    }

    postSubmitUpdateLocation(pageDetails, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.assignLocationtFormId + ",ParentFormId:" + this.stackPlanDetailsFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitEditUrl);
    }

    getStackPlanDetailsListData(index: number, column: any, direction: any, fieldObj: any) {
        return this.postaction({ Input: "{ FormId: " + this.stackPlanDetailsFormId  + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:" + JSON.stringify(fieldObj) + "}" }, this.listDataListUrl);
    }
    getShowDetailsReadOnlyData(index: number, column: any, direction: any, fieldObj: any) {
        return this.postaction({ Input: "{ FormId: " + this.showDetailsReadOnlyListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:" + JSON.stringify(fieldObj) + "}" }, this.listDataListUrl);
    }
    executeMoveProject(fieldObj: any) {
        return this.postaction({ applnInput: "{ListReportFieldIdValues:" + JSON.stringify(fieldObj) + "}" }, this.ExecuteMoveProjectUrl)
    }
    executeEmployee(fieldObj, id) {
        return this.postaction({ applnInput: "{FormId: " + this.showDetailsReadOnlyListFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldObj) + "}" }, this.ExecuteDetailsUrl)

    }
    getEmployeeResourceData(index: number, column: any, direction: any, selectedId: any) {
        //var id;
        //if (selectedId["currentValue"])
        //    id = selectedId["currentValue"]
        //else
        //    id = selectedId
        return this.postaction({ Input: "{ FormId: " + this.employeeResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:" + selectedId + "}" }, this.listDataListUrl);
    }

    getEmployeeResourceColumnData() {
        return this.postaction({ Input: "{ FormId: " + this.employeeResourceListFormId + " }" }, this.listFieldObjUrl);
    }

    sortEmployeeResource(index: number, column: any, direction: any, selectedId: any) {
        return this.postaction({ Input: "{ FormId: " + this.employeeResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:" + selectedId + "}" }, this.listDataListUrl);
    }

    postResourcesDelete(selectedResourceIds: any, employeeId: any) {
        return this.postaction({ Input: "{ FormId:" + this.employeeResourceListFormId + ",ListReportFieldIdValues:" + selectedResourceIds + ", Id:" + employeeId + "}" }, this.deleteEmployeeResourcesSubmitUrl);
    }

    getResourceType(objectCategoryId: any, target: number) {
        return this.postaction({ Input: "{ ObjectCategoryId:" + objectCategoryId + ",DataOption:" + target + " }" }, this.resourceTypeLookUpGetUrl);
    }

    getResourceTypeFilterByEmployeeLocation(objectCategoryId: any, employeeId: any) {
        return this.postaction({ Input: "{ ObjectCategoryId:" + objectCategoryId + ",EmployeeId:" + employeeId + " }" }, this.resourceTypeWithFilterLookUpGetUrl);
    }

    getEmployeeNewResourceData(index: number, column: any, direction: any, target: number, objectCategoryId: any, resourceTypeId: any, employeeId: any) {
        return this.postaction({ Input: "{ FormId: " + this.newEmployeeResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }", ObjectCategory: objectCategoryId, DataOption: target, AttributeOption: 2, ObjectClassIds: resourceTypeId, DrawingIds: '', SearchCondition: '', IsOrphan: 0, ObjectId: 0, IsDataBasedOnUserAccess: 1, ObjectComponentType: 1, EmployeeId: employeeId }, this.newEmployeeResourceGetUrl);
    }

    getEmployeeNewResourceByLocationData(index: number, column: any, direction: any, objectCategoryId: any, resourceTypeId: any, employeeId: any) {
        return this.postaction({ Input: "{ FormId: " + this.newEmployeeResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }", ObjectCategory: objectCategoryId.toString(), ObjectClassId: resourceTypeId.toString(), EmployeeId: employeeId.toString() }, this.newEmployeeResourceAssignedToaSpaceGetUrl);
    }

    postSubmitActionEmployeeRsource(selectedRowIds, selectedId) { // submit
        return this.postaction({ Input: "{ FormId:" + this.newEmployeeResourceListFormId + ",ListReportFieldIdValues:" + selectedRowIds + ",Id:" + selectedId + "}" }, this.insertEmployeeResourcesSubmitUrl);
    }

    getEmployeeNewResourceColumnData() {
        return this.postaction({ Input: "{ FormId: " + this.newEmployeeResourceListFormId + " }" }, this.listFieldObjUrl);
    }

    customerSubscribedFeatures(feaureIds: string) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerSettingsUrl);
    } 

    //stack plan details

    getStackPlansListField() {
        return this.postaction({ Input: "{ FormId: " + this.stackplansFormId + " }" }, this.listFieldObjUrl);
    }

    getStackPlansListData(fieldobj: any, pageIndex?: number, sortCol?: string, sortDir?: string) {
        var param = "{ FormId: " + this.stackplansFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) +  ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"
        return this.postaction({ Input: param }, this.listDataListUrl);



        //return this.postaction({ Input: "{ FormId: " + this.stackplansFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.listDataListUrl);
    }

    deleteStackPlans(id: any) {
        return this.postaction({ Input: "{ FormId: " + this.stackplansFormId + ",Id:" + id + "}" }, this.deleteUrl);
    }

    approveStackPlans(fieldobj: any, stackId: any) {
        return this.postaction({ applnInput: "{ FormId: " + this.stackplansFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + ",Id:" + stackId + "}" }, this.approveStavkPlansUrl);
    }

    getOrgWiseEmpListField() {
        return this.postaction({ Input: "{ FormId: " + this.orgWiseEmpListFormId + " }" }, this.listFieldObjUrl);
    }

    GetEmployeesNotHavingSeatsPerGradeAndSpaceType(Orgid, TargetFloorId, SourceFloorId, EmpIds) {
        var rptFielsValue = "[{\"ReportFieldId\":875,\"Value\":\"" + Orgid + "\"},{\"ReportFieldId\":2938,\"Value\":\"" + SourceFloorId + "\"},{\"ReportFieldId\":2054,\"Value\":\"" + TargetFloorId + "\"},{\"ReportFieldId\":866,\"Value\":\"" + EmpIds + "\"}]";

        return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFielsValue + "}" }, this.validatestackplanOrgMoves);

    }

    GetEmployeeSpacePlanningStackOccupancyDetails(prjtId,stackPlanId) {
      
        // let rptFieldValues = "[{\"ReportFieldId\":893,\"Value\":\"15\"},{\"ReportFieldId\":781,\"Value\":\"38\"},{\"ReportFieldId\":8978,\"Value\":\"0\"}]";
        let rptFieldValues = "[{\"ReportFieldId\":893,\"Value\":\"" + prjtId + "\"},{\"ReportFieldId\":8978,\"Value\":\"" + stackPlanId+"\"}]"; 
        return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + "}" }, this.stackPlanDetailsUrl);
    }

    GetRandomColor(deptId: number) {
        return this.postaction({ "departmentId": deptId }, this.getRandomColor);
    }
    GetOrganizationalWiseEmployees(OrgUnitId: number, FlrId: number, MovePrjtId: number, FromFlrId: number) {
        return this.postaction({ Input: "{Id:0}", "OrgUnitId": OrgUnitId, "FloorId": FlrId, "MoveProjectID": MovePrjtId, FromFloorId: FromFlrId }, this.getOrgwiseEmplyees);
    }
    loadAddEditStack(stackPlanId,prjtId, target) {      
        if (target == 1) 
            return this.postaction({ Input: "{ FormId: " + this.addEditStackFrmId + " }" }, this.addDataUrl);
        else
            var rptFielsValue = "[{\"ReportFieldId\":8972,\"Value\":\"" + prjtId + "\"},{\"ReportFieldId\":8971,\"Value\":\"" + stackPlanId + "\"}]";
      
        return this.postaction({ Input: "{ FormId: " + this.addEditStackFrmId + ",ParentFormId:" + this.stackplansFormId + ",Id:" + stackPlanId + ",ListReportFieldIdValues:" + rptFielsValue + " }" }, this.editDataUrl);

    }

    addUpdateStackPlanDetails(rptFieldvalues: string, movePrjtId: number, flrDetls, stackPlanDetailId: number, anticipatedSeats) {

        var subObj = JSON.parse(rptFieldvalues["fieldobject"]);
        var stackPlanName = "";
        var Description = "";
        subObj.find(function (item) {
            if (item.ReportFieldId == 8973)
                stackPlanName = item.Value;
            else if (item.ReportFieldId == 8975)
                Description = item.Value;
        });

        return this.postaction({ Input: "{FormId:" + this.addEditStackFrmId + ",ParentFormId:" + this.stackplansFormId + "}", "Name": stackPlanName, "Description":Description,"MoveProjectId": movePrjtId, "floorDetails": flrDetls, "StackPlanId": stackPlanDetailId, "AnticipatedSeats": anticipatedSeats }, this.saveStackDetails);
      
       // string input, int MoveProjectId, string Name, string Description, Floor FloorDetails, int StackPlanId, string AnticipatedSeats
    }

    chkWhetherEmpAssignedToOrgUnit(prjtId:number) {
        return this.postaction({ Input: "{Id:" + prjtId+ "}" }, this.chkEmpAssignedToOrgUnit);

    }
    //stack plan



    getEmployeerawingListData(formId, ModuleId, movedEmpDrawingId?) {
        debugger
        var reptFileds;
        reptFileds = "{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}";
        if (movedEmpDrawingId != undefined && movedEmpDrawingId != null)
            reptFileds += ",{\"ReportFieldId\":669,\"Value\":\"" + movedEmpDrawingId + "\"}"
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[" + reptFileds+"]}" }, this.listDataListUrl);
        // return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":584,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.listDataListUrl);

    }

    getEmployeerawingListDataSort(FormId, index: number, column: any, direction: any, filter?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        //  return this.postaction({ Input: "{FormId:" + FormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.listDataListUrl);
        return this.postaction({ Input: "{ FormId: " + FormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"32\"}],Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0 }, this.listDataListUrl);
    }

    getEmployeeDrawingsFields(FormId) {
        return this.postaction({ Input: "{ FormId: " + FormId + " }" }, this.listFieldObjUrl);
        //return this.postaction({ Input: "{FormId: 1 }" }, this._SiteColumnDataUrl);
        //return this.postgetaction<Observable<any>>(null, this._SiteColumnDataUrl)
    }
    getSpacePlanningRequestFields() {
        return this.postaction({ Input: "{ FormId:" + this.SpacePlanningRequestFrmId + "}" }, this.listFieldObjUrl);
    }
    getSpacePlanningRequestData() {
        // return this.postaction({ Input: "{FormId:" + this.SpacePlanningRequestFrmId + "}" }, this.listDataListUrl);
        return this.postaction({ Input: "{FormId:159,ListReportFieldIdValues:[{\"ReportFieldId\":893,\"Value\":\"0\"}]}" }, this.listDataListUrl);
    }
    getSpacePlanningRequestDataSort(direction: any, column: any) {
        return this.postaction({ Input: "{ FormId:159,SortColumn:'" + column + "',SortDirection:'" + direction + "'}" }, this.listDataListUrl);

    }

    CheckIsEntityReferenceFound(Dbobject: any, Id: any) {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(Dbobject) + "}" }, this.CheckIsEntityReferenceUrl);
    }
    checkEditPrivilageExist(Id: number) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":945,\"Value\":\"" + Id + "\"}]}" }, this._checkEditPrivilageExistUrl);
    }

    getEmpSnapshotsFields() {
        return this.postaction({ Input: "{FormId:" + this.listEmployeeSnapshotsFormId + "}" }, this.listFieldObjUrl);
    }

    getEmpSnapshotsData(pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.listEmployeeSnapshotsFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }

    getEmpSnapshotsAdd(SnapshotDate: string, replace: number ) {
        return this.postaction({ Input: "{ FormId:" + this.listEmployeeSnapshotsFormId + ",ParentFormId:" + this.listEmployeeSnapshotsFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":7907,\"Value\":\"" + SnapshotDate + "\"},{\"ReportFieldId\":3356,\"Value\":\"" + replace + "\"}]}" }, this.submitAddUrl);
    }
    getEmpSnapshotsdelete(Id: number) {
        return this.postaction({ Input: "{FormId:" + this.listEmployeeSnapshotsFormId + ",ParentFormId:" + this.listEmployeeSnapshotsFormId + ",Id:" + Id + "}" }, this.deleteUrl);
    }

    getOrgLevelCustomizedName(){
        return this.postaction({}, this.getOrgLevelCustomName);
    }
    //Export

   

    getSessionData() {
        return this.postaction({}, this.getSessionValues);
    }

    getAllocatedDrawingsForSpacePlanningProject(dbObjectId: number, selectedProject: number) {
        return this.postaction({ Input: "{Id: " + dbObjectId + ",ListReportFieldIdValues:[{\"ReportFieldId\":5092,\"Value\":\"" + selectedProject + "\"}]}" }, this.dbObjectLookUpUrl);
    }

    getOrganizationalStructureFields() {
        return this.postaction({ Input: "{}" }, this.orgStrucFldforStack);
    }
    IsGradeInUse(SelectedId: any) {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",Id:" + SelectedId +  "}" }, this.CheckGradeInUse);
    }
    getEmployeeAssignRequestStatus(empIds: number[]) {
        var repFieldValues: string = "";
        for (var empId of empIds)
            repFieldValues += "{\"ReportFieldId\":7845,\"Value\":\"" + empId + "\"},";
        repFieldValues = repFieldValues.substring(0, repFieldValues.length - 1);
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + repFieldValues+"]}" }, this.getEmployeeAssignRequestStatusUrl);
    }

	getApiAllEmployeeDataExport(customerId, userId, timeOffset){		
		return this.postaction({IsForDemo: true,CustomerId: customerId,UserId: userId ,TimeOffset: timeOffset },this.apiAllEmployeeDataExportUrl);
	}
    getAssignedEmployeeColumnDataChanges() {
        //return this.postgetaction<Observable<any>>(null, this.assignedEmployeeColumnDataUrl);
        return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormIdChange + " }" }, this.listFieldObjUrl);
    }

    /***********************************************************
     * Move Project Execution ,Request and Review Begin
     ***********************************************************/

    getMoveProjectExecutionRequestFields() {
        return this.postaction({ Input: "{FormId:" + this.employeemoveProjectExecutionRequestFormId + ", ListLookupReportFieldIdValues: [{\"FieldId\":1870,\"ReportFieldId\":5854,\"Value\":\"5\"},{\"FieldId\":1870,\"ReportFieldId\":5875,\"Value\":\"17\"}]}" }, this.listFieldObjUrl);
    }

    submitMoveExecutionRequestDetails(target: number, strReportFieldIds: string, selectedId: any, moveProjectId: number) {
        return this.postaction({
            applnInput: "{ FormId: " + this.employeemoveProjectExecutionRequestFormId + ",ListReportFieldIdValues:" + strReportFieldIds + ",ParentFormId:" + (target == 1 ? this.MoveProjectListFormId : this.employeeMoveProjectRequestListFormId) + ",Id:" + moveProjectId + ",EntityId:" + selectedId + "}", PageTarget: target}, this.saveMoveProjectExecutionDetailsUrl);
    }

    getActionPointUserLookupValues(outComeId: number, workTypeId: number, moduleId: number, entityCategoryId: number) {
        return this.postaction({ Input: "{FormId:" + this.employeemoveProjectExecutionRequestFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 1419, \"Value\":" + outComeId + "},{\"ReportFieldId\": 5873, \"Value\":" + workTypeId + "},{\"ReportFieldId\": 271, \"Value\":" + moduleId + "},{\"ReportFieldId\": 6573, \"Value\":" + entityCategoryId + "},{\"ReportFieldId\": 5834, \"Value\":" + 0 + "}]}" }, this.getActionPointUserLookupUrl);
    }

    getMoveProjectExecutionTaskListFields() {
        return this.postaction({ Input: "{ FormId: " + this.employeeMoveProjectRequestListFormId + " }" }, this.listFieldObjUrl);
    }

    getMoveProjectExecutionTasksList(target: number, strReportFieldIds: string, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{ FormId: " + this.employeeMoveProjectRequestListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + strReportFieldIds + "}", Target: target }, this.getMoveProjectExecutionTasksUrl);
    }

    checkSubscribedFeature(featureCategoryIds: string) {
        return this.postaction({ Input: "{FormId:" + this.employeeMoveProjectRequestListFormId + "}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    }

    getReviewMoveProjectExecutionData(selectedId: number, workTypeId: number, currentActionPointId: number) {
        return this.postaction({
            Input: "{FormId:" + this.reviewMoveProjectExecutionFormId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1255,\"ReportFieldId\":5832, \"Value\":" + workTypeId + " },{ \"FieldId\":1255,\"ReportFieldId\":5827, \"Value\":" + currentActionPointId + "},{ \"FieldId\":1255,\"ReportFieldId\":6553, \"Value\": 20},{ \"FieldId\":1255,\"ReportFieldId\":5826, \"Value\": 1},{ \"FieldId\":1870,\"ReportFieldId\":5854, \"Value\": 5},{ \"FieldId\":1870,\"ReportFieldId\":5875, \"Value\": 17}]" +
                            ",ListReportFieldIdValues:[{\"ReportFieldId\":5832, \"Value\":" + workTypeId + " },{\"ReportFieldId\":5827, \"Value\":" + currentActionPointId + " },{\"ReportFieldId\":6553, \"Value\": 20},{\"ReportFieldId\":5826, \"Value\": 1},{\"ReportFieldId\":5854, \"Value\": 5},{\"ReportFieldId\":5875, \"Value\": 17}]}"
        }, this.getMoveProjectExecutionDataUrl);
    }

     /***********************************************************
     * Move Project Execution ,Request and Review End
     ***********************************************************/

    getRecourcedatafieldsforemployeemove() {        
        return this.postaction({ Input: "{ FormId: " + this.SelectEmployeeResourceFormove + " }" }, this.listFieldObjUrl);
    }
    getRecourcedataforemployeemove(EmployeeId: number) {
        return this.postaction({ Input: "{FormId:" + this.SelectEmployeeResourceFormove + ",Id:0,ListReportFieldIdValues:[{\"ReportFieldId\":945, \"Value\":" + EmployeeId + " }]}" }, this.listDataListUrl);
    }
    submitmoveresourcedata(Details, id) {
        return this.postaction({ Input: "{FormId:" + this.SelectEmployeeResourceFormove + ",ListReportFieldIdValues: " + Details + ",Id:" + id + "}" }, this.MoveEmployeeResources);
    }
    submitmoveresourcedataNew(Details, id) {
        return this.postaction({ Input:  Details  }, this.MoveEmployeeResourcesNew);
    }
/*Scheduled Moves*/
    getScheduledMoveRequestFields() {
        return this.postaction({ Input: "{FormId:351}" }, this.listFieldObjUrl);
    }
    getScheduledMoveRequestLists(index, column, direction, DrawingId) {

        return this.postaction({ Input: "{ FormId: 351,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " ,ListReportFieldIdValues:[{\"ReportFieldId\":3059,\"Value\":\"" + DrawingId + "\"}]}" }, this.moveMoveProjectDetailsUrl);
    }
    /*Roll back Moves */
    getRollbackMovesFields() {
        return this.postaction({ Input: "{ FormId:" + this.rollbackMovesListFormId + " }" }, this.listFieldObjUrl);
    }
    getEmployeeMovesForRollBack(changedDay: number,pageIndex?: number, sortCol?: string, sortDir?: string) {
     //   let rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + changedDay + "\"}]";
        return this.postaction({ Input: "{FormId:" + this.rollbackMovesListFormId + ",SortColumn: '" + sortCol + "', SortDirection: '" + sortDir + "', PageIndex: " + pageIndex + " }" , NoOfDays:changedDay }, this.getEmployeeMovesForRollBackUrl)
    }
    checkEmployeeRollbackPossible(moveId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":7880,\"Value\":\"" + moveId + "\"}]}" }, this.checkEmployeeRollbackPossibleUrl)
    }
    employeeMoveRollback(moveId: number, noOfDays: number, empId: number) {
        return this.postaction({ Input: "{Id:" + empId +",ListReportFieldIdValues:[{\"ReportFieldId\":7880,\"Value\":\"" + moveId + "\"}]}", NoOfDays: noOfDays }, this.employeeMoveRollbackUrl)
    }
    getEmployeeMovesForRollBackHistory(moveId: number, pageIndex?: number, sortCol?: string, sortDir?: string) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":7880,\"Value\":\"" + moveId + "\"}]}"}, this.getEmployeeMovesForRollBackHistoryUrl)
    }

    /* Employee DashBoard */
    getOrgOccupancyforDashBoard(SiteId, BuildingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":" + SiteId + " },{\"ReportFieldId\":487, \"Value\":" + BuildingId + " }]}" }, this.getOrganizationalOccupancyforDashBoard);
    }

    getSpaceStandardOccupancy(SiteId, BuildingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":" + SiteId + " },{\"ReportFieldId\":487, \"Value\":" + BuildingId + " }]}" }, this.getSpaceStandardOccupancyforDashBoard);
    }

    getBuildingOccupancyforDashBoard(SiteId, BuildingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":" + SiteId + " },{\"ReportFieldId\":487, \"Value\":" + BuildingId + " }]}" }, this.getBuildingOccupancyforDashboard);
    }

    ddlLoadSite() {
        return this.postaction({ Input: "{ FormId:365,ListLookupReportFieldIdValues:[{ \"FieldId\":1302}]}" }, this.listFieldObjUrl);
    }

    GetOrganizationalStructure() {
        return this.postaction({ Input: "{}" }, this.getOrganizationalStructureforLookups);
    }

    loadBuilding(siteid: any, parentId: number) {
        return this.postaction({ Input: "{FormId:" + this.EmployeeDashBoardFrm + ",Id:" + siteid + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    }

    updateMultipleEmployeeData(strReportFieldIdValues: string, reportField: number, newValue: any, orgUnitId: any) {
        return this.postaction({ Input: "{FormId:" + this.allemployeeAddEditFormId + ",ListReportFieldIdValues:" + strReportFieldIdValues + "}", ReportField: reportField, NewValue: newValue, OrgUnitId: orgUnitId }, this.updateMultipleEmployeeDataUrl);
    }

    getSeatingCapacityforOrgUnitTrendAnalysis(input) {
        
        return this.postaction({ Input: "{ListReportFieldIdValues:" + input + "}" }, this.getOrgUnitWiseSeatingCapacitiesforTrendAnalysis);
    }

    getSpaceStandardTrendAnalysis(input) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + input + "}" }, this.getSpaceStandardWiseSeatingCapacitiesforTrendAnalysis);
    }

    getSpaceStandardTrendFields() {
        return this.postaction({ Input: "{ FormId: 372}" }, this.listFieldObjUrl);
    }

    getGradeTrendFields() {
        return this.postaction({ Input: "{ FormId: 383}" }, this.listFieldObjUrl);
    }

    getGradeTrendAnalysis(input) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + input + "}" }, this.getGradeWiseSeatingCapacitiesforTrendAnalysis);
    }

    loadTrendAnalysisDivisionWiseSeatingCapacitybyTime  () {
        // return this.postaction({ Input: "{FormId:366" + ",ListReportFieldIdValues:" + JSON.stringify(reportFieldIdArray) + "}" }, this.listFieldObjUrl);
        let lookupRptField = "[{\"FieldId\":737,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":737,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":738,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":739,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":740,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":741,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        return this.postaction({ Input: "{ FormId:371" + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.listFieldObjUrl);
    }

    loadTrendAnalysisRateofHiringbyTime() {
        // return this.postaction({ Input: "{FormId:366" + ",ListReportFieldIdValues:" + JSON.stringify(reportFieldIdArray) + "}" }, this.listFieldObjUrl);
        let lookupRptField = "[{\"FieldId\":395,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":395,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":399,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":400,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":487,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":489,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        return this.postaction({ Input: "{ FormId:378" + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.listFieldObjUrl);
    }

    getRateofHiringbyTimeTrendAnalysis(input) {       
        return this.postaction({ Input: "{ListReportFieldIdValues:" + input + "}" }, this.getRateofHiringbyTimeforTrendAnalysis);
    }


    getEmployeeMoveRequestFields(workFlowCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.employeeMoveRequestFormId + ", ListLookupReportFieldIdValues: [{\"FieldId\":1870,\"ReportFieldId\":5854,\"Value\":\"5\"},{\"FieldId\":1870,\"ReportFieldId\":5875,\"Value\":\""+workFlowCategoryId+"\"}]}" }, this.listFieldObjUrl);
    }

    saveEmployeeAssignthroughWorkflow(EmployeeIdsWithSpaceDetails, TargetDrawingId, DateToPerform, Comments, ReportFieldIdValues) {
        return this.postaction({ applnInput: "{FormId:" + this.employeeMoveRequestFormId + ", ListReportFieldIdValues: " + ReportFieldIdValues + "}", employeeAssignRequest: EmployeeIdsWithSpaceDetails, TargetDrawingId: TargetDrawingId, DateToPerform: DateToPerform, Comments: Comments }, this.SaveEmployeeAssignthroughWorkflow);
    }

    saveEmployeeMovethroughWorkflow(EmployeeIdsWithSpaceDetails, DateToPerform, Comments, TargetDrawingId, ReportFieldIdValues) {
        return this.postaction({ applnInput: "{FormId:" + this.employeeMoveRequestFormId + ", ListReportFieldIdValues: " + ReportFieldIdValues + "}", employeeMoveRequest: EmployeeIdsWithSpaceDetails, TargetDrawingId: TargetDrawingId, DateToPerform: DateToPerform, Comments: Comments, CurrentDrawingId: TargetDrawingId}, this.SaveEmployeeMovethroughWorkflow);
    }

    saveEmployeeResourcesthroughWorkflow(EmployeeObjects) {
        return this.postaction({ applnInput: "{FormId:" + this.employeeMoveRequestFormId + "}", data: EmployeeObjects }, this.SaveEmployeeResourcesthroughWorkflow);
    }

    /***********************************************************
     * Employee Move Request List and Review Begin
     ***********************************************************/

    getEmployeeMoveRequestListFields() {
        return this.postaction({ Input: "{ FormId: " + this.employeeMoveRequestListFormId + " }" }, this.listFieldObjUrl);
    }

    getEmployeeMoveRequestList(target: number, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{ FormId: " + this.employeeMoveRequestListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }

    getReviewEmployeeMoveData(selectedId: number, workTypeId: number, currentActionPointId: number) {
        return this.postaction({
            Input: "{FormId:" + this.reviewEmployeeMoveFormId + ",Id:" + selectedId + ",ParentFormId:" + this.showDetailsReadOnlyListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1255,\"ReportFieldId\":5832, \"Value\":" + workTypeId + " },{ \"FieldId\":1255,\"ReportFieldId\":5827, \"Value\":" + currentActionPointId + "},{ \"FieldId\":1255,\"ReportFieldId\":6553, \"Value\": 11},{ \"FieldId\":1255,\"ReportFieldId\":5826, \"Value\": 1},{ \"FieldId\":1870,\"ReportFieldId\":5854, \"Value\": 5},{ \"FieldId\":1870,\"ReportFieldId\":5875, \"Value\": 7}]" +
            ",ListReportFieldIdValues:[{\"ReportFieldId\":7456, \"Value\":" + selectedId + " },{\"ReportFieldId\":5832, \"Value\":" + workTypeId + " },{\"ReportFieldId\":5827, \"Value\":" + currentActionPointId + " },{\"ReportFieldId\":6553, \"Value\": 9},{\"ReportFieldId\":5826, \"Value\": 1},{\"ReportFieldId\":5854, \"Value\": 5},{\"ReportFieldId\":5875, \"Value\": 7}]}", Target: 1
        }, this.getEmployeeMoveAssignApprovalRequestDataUrl);
    }

    submitEmployeeMoveRequestDetails(strReportFieldIds: string, selectedId: any, strEmployeeDetails: string) {
        return this.postaction({
            applnInput: "{ FormId: " + this.reviewEmployeeMoveFormId + ",ListReportFieldIdValues:" + strReportFieldIds + ",ParentFormId:" + this.employeeMoveRequestListFormId + ",Id:" + selectedId + "}", employeeMoveRequest: strEmployeeDetails
        }, this.reviewEmployeeMovethroughWorkflowUrl);
    }

    cancelReviewEmployeeMoveRequest(selectedId: number, employeeMoveId: number, employeeMoveNo: string, employeeId: number) {
        return this.postaction({
            Input: "{FormId:" + this.reviewEmployeeMoveFormId + ",Id:" + selectedId + "}", EmployeeMoveId: employeeMoveId, EmployeeMoveNo: employeeMoveNo, EmployeeId: employeeId, Target: 2
        }, this.cancelEmployeeMoveAssignRequestUrl);
    }

    /***********************************************************
     * Employee Move Request List and Review End
     ***********************************************************/

    /***********************************************************
     * Employee Assign Request List and Review Begin
     ***********************************************************/

    getEmployeeAssignRequestListFields() {
        return this.postaction({ Input: "{ FormId: " + this.employeeAssignRequestListFormId + " }" }, this.listFieldObjUrl);
    }

    getEmployeeAssignRequestList(target: number, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{ FormId: " + this.employeeAssignRequestListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }

    getReviewEmployeeAssignData(selectedId: number, workTypeId: number, currentActionPointId: number) {
        return this.postaction({
            Input: "{FormId:" + this.reviewEmployeeMoveFormId + ",Id:" + selectedId + ",ParentFormId:" + this.showDetailsReadOnlyListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1255,\"ReportFieldId\":5832, \"Value\":" + workTypeId + " },{ \"FieldId\":1255,\"ReportFieldId\":5827, \"Value\":" + currentActionPointId + "},{ \"FieldId\":1255,\"ReportFieldId\":6553, \"Value\": 11},{ \"FieldId\":1255,\"ReportFieldId\":5826, \"Value\": 1},{ \"FieldId\":1870,\"ReportFieldId\":5854, \"Value\": 5},{ \"FieldId\":1870,\"ReportFieldId\":5875, \"Value\": 9}]" +
            ",ListReportFieldIdValues:[{\"ReportFieldId\":7854, \"Value\":" + selectedId + " },{\"ReportFieldId\":5832, \"Value\":" + workTypeId + " },{\"ReportFieldId\":5827, \"Value\":" + currentActionPointId + " },{\"ReportFieldId\":6553, \"Value\": 11},{\"ReportFieldId\":5826, \"Value\": 1},{\"ReportFieldId\":5854, \"Value\": 5},{\"ReportFieldId\":5875, \"Value\": 9}]}", Target: 2
        }, this.getEmployeeMoveAssignApprovalRequestDataUrl);
    }

    submitEmployeeAssignRequestDetails(strReportFieldIds: string, selectedId: any, strEmployeeDetails: string) {
        return this.postaction({
            applnInput: "{ FormId: " + this.reviewEmployeeMoveFormId + ",ListReportFieldIdValues:" + strReportFieldIds + ",ParentFormId:" + this.employeeMoveRequestListFormId + ",Id:" + selectedId + "}", employeeMoveRequest: strEmployeeDetails
        }, this.reviewEmployeeAssignthroughWorkflowUrl);
    }

    cancelReviewEmployeeAssignRequest(selectedId: number, employeeMoveId: number, employeeMoveNo: string, employeeId: number) {
        return this.postaction({
            Input: "{FormId:" + this.reviewEmployeeMoveFormId + ",Id:" + selectedId + "}", EmployeeMoveId: employeeMoveId, EmployeeMoveNo: employeeMoveNo, EmployeeId: employeeId, Target: 2
        }, this.cancelEmployeeMoveAssignRequestUrl);
    }

    /***********************************************************
     * Employee Assign Request List and Review End
     ***********************************************************/ 
    
    ScaleEmployeefield() {
        return this.postaction({ Input: "{FormId:518}"}, this.listFieldObjUrl);
    }
    //this.listDataListUrl);

    UpdateEmployeeScaleFactor(strRptFields: string) {
        return this.postaction({ Input: "{FormId:518" + ",ListReportFieldIdValues:" + strRptFields + "}"}, this.UpdateEmployeeScaleFactorUrl);
    }

    SpaceForSearchfield() {
        return this.postaction({ Input: "{FormId:" + this.SearchForSpaceFormId + ",ListLookupReportFieldIdValues: [{ \"FieldId\":2812,\"ReportFieldId\": 12097, \"Value\":4312 }]}"}, this.listFieldObjUrl);
    }
    
    GetSpaceSearchResults(OccupiedValue : any,DrawingId: any, Query: any, IsVacant: any, IsUnderOccupied: any, IsOverOccupied: any, IsNominalOccupied: any) {
        return this.postaction({ Input: "{FormId:" + this.SearchForSpaceFormId + ",ListReportFieldIdValues:" + OccupiedValue + ",ListFilterIdValues: " + Query + ",IsKeywordSearch:0" + ",IsAdvancedSearch:1}", DrawingId: DrawingId, IsVacant: IsVacant, IsUnderOccupied: IsUnderOccupied, IsOverOccupied: IsOverOccupied, IsNominalOccupied: IsNominalOccupied }, this.GetSpaceSearchResultsUrl);
    }
    DeleteEmpMoveDetails(selEmpId, moveId) {
        var strReportFieldIds = " [{\"ReportFieldId\":7454,\"Value\":\"" + moveId + "\"}]";
        return this.postaction({ Input: "{FormId:" + this.showDetailsReadOnlyListFormId + ",Id:" + selEmpId+",ListReportFieldIdValues:" + strReportFieldIds+  "}" }, this.deleteEMPMoveDtls);
    }
    deleteEmpMoveResourceDetails(selEmpId, resourceId) {
        var strReportFieldIds = "[{\"ReportFieldId\":7453,\"Value\":\"" + resourceId + "\"}]";
        return this.postaction({ Input: "{FormId:" + this.showDetailsReadOnlyListFormId + ",Id:" + selEmpId + ",ListReportFieldIdValues:" + strReportFieldIds + "}"}, this.deleteEMPMoveResrcDetls);
    }

    getReviewMOveResourceColumns() {
        return this.postaction({ Input: "{ FormId: " + this.reviewMoveEMPResourceFormId + " }" }, this.listFieldObjUrl);
    
    }
    getReviewMoveResourceListData (pageIndex?: number, sortCol?: string, sortDir?: string, moveReqId?: number, SelEmpId?:number) {
        var strReportFieldIds = "[{\"ReportFieldId\":7392,\"Value\":\"" + SelEmpId + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.reviewMoveEMPResourceFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",Id:" + moveReqId + ",ListReportFieldIdValues:" + strReportFieldIds +  "}" }, this.listDataListUrl);
    }
    getEmpWorkflowHistoryColumns() {
        return this.postaction({ Input: "{ FormId: " + this.empReviewHistoryFrmId + " }" }, this.listFieldObjUrl);

    }
    getEmpWorkflowHistoryListData(pageIndex?: number, sortCol?: string, sortDir?: string,WorkFlowEntityId?: number) {
       
        return this.postaction({ Input: "{ FormId: " + this.empReviewHistoryFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",Id:" + WorkFlowEntityId + "}" }, this.listDataListUrl);
    }
   
     


    /* Employee To Work Order User */
    getEmployeeToWorkOrderUserFields() {
        return this.postaction({ Input: "{ FormId: " + this.employeeToWorkOrderUserFormId + " }" }, this.listFieldObjUrl);
    }

    getEmployeeToWorkOrderUserList(pageIndex?: number, sortCol?: string, sortDir?: string, keyworsearch?: any, value?: any, IsKeyword?: any, IsAdvance?: any) {
        return this.postaction({ Input: "{ FormId: " + this.employeeToWorkOrderUserFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    }

    getKeywordSearchField(formId) {
        return this.postaction({ Input: "{FormId:" + formId + "}" }, this.keywordLookUpUrl)
    }

    postSubmitEmployeeToWorkOrderUser(selectedIds) {
        return this.postaction({ Input: "{ FormId:" + this.employeeToWorkOrderUserFormId + ",ListReportFieldIdValues:" + selectedIds + "}" }, this.createEmployeeToWorkOrderUserUrl);
    }

    getAssignOrMoveEmpFields(formId: number,fieldObj) {
        return this.postaction({ Input: "{ FormId:" + formId + ",ListLookupReportFieldIdValues:" + JSON.stringify(fieldObj) + "}" }, this.addDataUrl);
    }  
    loadAssignOrMoveEmpLookups(formId,id, parentId, fieldobj) {
        return this.postaction({ Input: "{FormId:" + formId + ",Id:" + id + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.lookupUrl);
    }
    getDrawingDetails(drawingId: number, isBuilding: boolean) {
        if (isBuilding == undefined || isBuilding == null)
            isBuilding = false;
        return this.postaction({ Input: "{ EntityId:" + drawingId + ",ListReportFieldIdValues:[{\"ReportFieldId\":4308,\"Value\":\"" + isBuilding + "\"}]}" }, this.drawinDetailsUrl);
    }
    insertMultipleSpaceAllotmentDetails(empDetails: any) {
        return this.postaction({ Input: JSON.stringify(empDetails) }, this.insertMultipleSpaceAllotmentDetailsUrl);
    }
    checkSpaceEmployeeOccupancy(spaceId: number, empDetails: any) {
        var reptFieldValues: string = '';
        for (var i = 0; i < empDetails.length; i++) {
            reptFieldValues += "{\"ReportFieldId\":945, \"Value\":" + empDetails[i]['Id'] + " },";
        }
        return this.postaction({
            Input: "{ListReportFieldIdValues:[" + reptFieldValues+"{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this.checkSpaceEmployeeOccupancyUrl);
    }
    checkResourceExistForEmployees(empDetails: any) {
        var reptFieldValues: string = '';
        for (var i = 0; i < empDetails.length; i++) {
            reptFieldValues += "{\"ReportFieldId\":945, \"Value\":" + empDetails[i]['Id'] + " },";
        }
        reptFieldValues = reptFieldValues.substring(0, reptFieldValues.length - 1);
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + reptFieldValues + "]}" }, this.checkResourceExistForEmployeesUrl);
    }
    getEmployeeSheduledToMove(empDetails: any) {
        var reptFieldValues: string = '';
        for (var i = 0; i < empDetails.length; i++) {
            reptFieldValues += "{\"ReportFieldId\":7392 , \"Value\":" + empDetails[i]['Id'] + " },";
        }
        reptFieldValues = reptFieldValues.substring(0, reptFieldValues.length - 1);
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + reptFieldValues + "]}" }, this.getEmployeeSheduledToMoveUrl);
    }
 }
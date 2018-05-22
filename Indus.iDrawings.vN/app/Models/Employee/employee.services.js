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
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/Rx');
var EmployeeService = (function (_super) {
    __extends(EmployeeService, _super);
    function EmployeeService(http) {
        _super.call(this, http);
        this.http = http;
        //////////////////new///////////////////////
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.employeeListDataListUrl = 'Employee/GetEmployeeList';
        this.assignedEmployeeGetUrl = 'Employee/GetDrawingsWithData';
        this.GetDrawingsWithDataForFloorSelection = 'Employee/GetDrawingsWithDataForFloorSelection';
        this.MoveProjectAddUrl = 'Employee/InsertMoveProjects';
        this.MoveProjectEditUrl = 'Employee/UpdateMoveProjects';
        this.GetSpacePlanningFloorList = 'Drawing/GetAllocatedDrawingsForSpacePlanning';
        this.GetAllocatedDrawingsForSpacePlanningAndFloorSelection = 'Drawing/GetAllocatedDrawingsForSpacePlanningAndFloorSelection';
        this.updateStatusSpacePlanningUrl = 'Employee/UpateMoveProjectStatus';
        this.updateFloorUrl = 'SiteBuildingFloor/UpdateEmployeeMoveProjectFloors';
        this.MoveProjectListUrl = 'Employee/GetAllSpacePlanConvertedProject';
        this.ExecuteMoveProjectUrl = 'Employee/ExecuteSpacePlanningMoveProject';
        this.ExecuteDetailsUrl = 'Employee/ExecuteEmployeeMoves';
        this.saveEmployee = 'Employee/SaveEmployeewithImage';
        this.deleteEmployee = 'Employee/DeleteEmployeewithImage';
        this.checkEmployeeStatus = 'Employee/CheckEmployee';
        this.SuperVisorCount = 'Employee/GetEmployeeSuperVisorCount';
        this._checkEditPrivilageExistUrl = 'Employee/CheckEditPrivilageExist';
        this.UpdateEmployeeScaleFactorUrl = 'EmployeeDrawing/UpdateEmployeeScaleFactor';
        this.customerSettingsUrl = 'Common/GetSubscribedFeatures';
        this.loadActionUsers = 'WorkFlow/GetFirstWorkflowActionPoint';
        this.submitSendForApproval = 'WorkFlow/InsertWorkFlowEntity';
        this.addDataUrl = 'Common/GetAddAppFormFields';
        this.editDataUrl = 'Common/GetEditAppFormFields';
        this.submitAddUrl = 'Common/InsertAppFormData';
        this.submitEditUrl = 'Common/UpdateAppFormData';
        this.lookupUrl = 'Common/GetFieldLookupValues';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
        this.deleteFieldValue = 'Common/DeleteAdditionalDataFieldValues';
        this.GetAdvancedSerachResulturl = 'Common/GetAdvancedSerachResult';
        this.AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
        this.CheckIsEntityReferenceUrl = 'Common/CheckIsEntityReferenceExists';
        this.updateFieldSubscriptionUrl = 'Common/UpdateFieldSubscriptionSettings';
        //view stack
        this.stackPlanDetailsUrl = 'Employee/GetEmployeeSpacePlanningStackOccupancyDetails'; //'Employee/GetEmployeeStackOccupancyDetails';
        this.approveStavkPlansUrl = 'Employee/ApproveStackPlan';
        this.getRandomColor = 'Employee/getRandomColorsforStack';
        this.getOrgwiseEmplyees = 'Employee/GetOrganizationalWiseEmployees';
        this.validatestackplanOrgMoves = 'Employee/ValidateStackPlanOrgUnitMoves';
        this.saveStackDetails = 'Employee/SaveStackPlanData';
        this.chkEmpAssignedToOrgUnit = 'Employee/CheckWhetherEmpAssignedToOrgUnit';
        this.allemployeelistFormId = 102;
        this.allemployeeAddEditFormId = 119;
        this.unassignedlistFormId = 130;
        this.unassignedAddEditFormId = 131;
        this.assignedEmployeeListFormId = 140;
        this.assignedEmployeeAddEditFormId = 143;
        this.stackplansFormId = 161;
        this.orgWiseEmpListFormId = 213;
        this.SelectEmployeeResourceFormove = 348;
        //////////////////////////////////
        //Empployee Resource
        this.employeeResourceListFormId = 142;
        this.newEmployeeResourceListFormId = 149;
        this.resourceTypeLookUpGetUrl = 'Employee/GetResourceTypeLookupValues';
        this.resourceTypeWithFilterLookUpGetUrl = 'Employee/GetResourceTypeWithFilterLookupValues';
        this.newEmployeeResourceGetUrl = 'Employee/GetEmployeeResourceforAllocation';
        this.newEmployeeResourceAssignedToaSpaceGetUrl = 'Employee/GetObjectsAssignedToaSpace';
        this.insertEmployeeResourcesSubmitUrl = 'Employee/InsertEmployeeResources';
        this.deleteEmployeeResourcesSubmitUrl = 'Employee/DeleteEmployeeResources';
        this.createMoveProjectfromScenarioUrl = 'Employee/ConvertToMoveProjectFromScenario';
        this.getScenarioDrawingsUrl = 'EmployeeDrawing/GetScenarioDrawings';
        this.ApprovedStackPlanUrl = 'Employee/GetAllSpacePlanningProject';
        this.GetApprovedStackPlanforaProjectUrl = 'Employee/GetApprovedStackPlanforaProject';
        this.ConvertApprovedStackPlanToScenarioUrl = 'Employee/ConvertApprovedStackPlanToScenario';
        this.CreateMoveProjectUrl = 'Employee/ConvertToMoveProject';
        this.GetMoveProjectDetailBasedOnStatusIdUrl = 'Employee/GetMoveProjectDetailBasedOnStatusId';
        this.ApprovedStackPlanToScenarioUrl = 'Employee/ApprovedStackPlanToScenario';
        this.orgStrucFldforStack = 'Common/GetCustomerOrganizationalStructure';
        /*Field Order*/
        this.UpdateApplicationFormFieldOrderUrl = 'Common/UpdateApplicationFormFieldOrder';
        this.SpacePlanningProjectListFormId = 146;
        this.SpacePlanningProjectAddEditFormId = 148;
        this.SendForApprovalFormId = 152;
        this.SpacePlanningRequestFrmId = 159;
        this.ScenarioListFrmId = 160;
        this.AddEditScenarioFrmId = 163;
        this.ScenarioDrawingFrmId = 178;
        this.GradeFormId = 184;
        this.SpaceTypeId = 583;
        this.SpaceAllocationRuleId = 596;
        this.AddEditSpaceAllocationRuleId = 597;
        this.ApprovedStackPlanFrmId = 261;
        this.MoveProjectListFormId = 153;
        this.showDetailsReadOnlyListFormId = 157;
        this.stackPlanDetailsFormId = 266;
        this.assignLocationtFormId = 286;
        this.addEditStackFrmId = 216;
        this.EmployeeDashBoardFrm = 365;
        this.SearchForSpaceFormId = 546;
        /////////////////new///////////////////////
        this.optionalFieldUrl = 'MockData/Data/moduleswitch-drawing_data.json';
        //allemployee related
        this.allEmployeeSubmenuUrl = 'MockData/Menu/employee_submenu.json';
        this.AllemployeeUrl = 'MockData/Data/siteList.json';
        this.AllEmployeeColumnUrl = 'MockData/FieldObjects/siteColumnList.json';
        this._AllemployeeAddEditDataUrl = 'MockData/FieldObjects/siteAddEdit.json';
        //menu for drawing 
        this.employeeSubmenuInDrawingUrl = 'MockData/Menu/employee_submenu_drawing.json';
        //assignedemployee related
        this.assignedEmployeeMainListfield = 'MockData/Data/user-drawing_floor-accessFieldsList.json';
        this.assignedEmployeeMainListData = 'MockData/Data/user-drawing-floor-access.json';
        this.assignedEmployeeColumnDataUrl = 'MockData/FieldObjects/buildingColumnList.json';
        this.assignedEmployeeDataUrl = 'MockData/Data/buildingList.json';
        this.AssignedEmployeeAddEditDataUrl = 'MockData/FieldObjects/buildingAddEdit.json';
        //unassigned related
        this.unassignedDataUrl = 'MockData/Data/floorList.json';
        this.unassignedColumnDataUrl = 'MockData/FieldObjects/floorColumnList.json';
        this.unassignedAddEditDataUrl = 'MockData/FieldObjects/floorAddEdit.json';
        this.employeeDrawing = 'EmployeeDrawing / GetAllocatedDrawingsForEmp';
        this.getSessionValues = 'Common/GetSessionValues';
        this.GetSpaceSearchResultsUrl = 'Employee/GetSpaceSearch';
        //emp general settings
        this.jobTitleData = '';
        this.jobTitleFields = '';
        this.gradesFields = '';
        this.gradesData = '';
        this.gradesPagedData = '';
        //Job Title
        this.JobTitleFormId = 182;
        //private jobTitleData = 'MockData/Data/space-functions_Data.json';
        //private jobTitleFields = 'MockData/Data/space-functions_Fields.json';
        //private gradesFields = 'MockData/Space/spacestdfields.json';
        //private gradesData = 'MockData/Space/spacestd_mockdata.json';
        //private gradesPagedData = 'MockData/Space/spacestd_mockdata1.json';
        this.listEmployeeSnapshotsFormId = 309;
        this.getOrgLevelCustomName = 'Employee/GetOrganizationStructures';
        this.dbObjectLookUpUrl = 'Common/GetDBObjectLookupValues';
        this.CheckGradeInUse = 'Employee/CheckGradeInUse';
        this.getEmployeeAssignRequestStatusUrl = 'EmployeeDrawing/GetEmployeeAssignRequestStatus';
        this.apiAllEmployeeDataExportUrl = 'api/IndusImport/GetEmployeeData';
        this.assignedEmployeeListFormIdChange = 102;
        /**
         * Employe Move Project Execution WorkFlow
         */
        this.subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
        this.saveMoveProjectExecutionDetailsUrl = 'Employee/SaveMoveProjectExecutionDetails';
        this.getMoveProjectExecutionTasksUrl = 'Employee/GetMoveProjectExecutionTasks';
        this.getActionPointUserLookupUrl = 'WorkOrder/GetActionPointUsers';
        this.getMoveProjectExecutionDataUrl = 'Employee/GetMoveProjectExecutionData';
        this.employeeMoveProjectRequestListFormId = 334;
        this.employeemoveProjectExecutionRequestFormId = 341;
        this.reviewMoveProjectExecutionFormId = 352;
        this.employeeMoveRequestFormId = 418;
        this.moveMoveProjectDetailsUrl = "Employee/GetAllAssignedMoveProjectDetails"; //EmployeeDrawing/GetMoveRequestedEmployees";
        this.moveRequestListUrl = "EmployeeDrawing/GetMoveRequestedEmployees";
        this.MoveEmployeeResources = "EmployeeDrawing/MoveEmployeeResources";
        this.MoveEmployeeResourcesNew = "EmployeeDrawing/MoveMultipleEmployeeResources";
        // Rollback Moves
        this.getEmployeeMovesForRollBackUrl = 'EmployeeDrawing/GetEmployeeMovesForRollBack';
        this.rollbackMovesListFormId = 364;
        this.checkEmployeeRollbackPossibleUrl = 'EmployeeDrawing/CheckEmployeeRollbackPossible';
        this.employeeMoveRollbackUrl = 'EmployeeDrawing/EmployeeMoveRollback';
        this.getEmployeeMovesForRollBackHistoryUrl = "EmployeeDrawing/GetEmployeeMovesForRollBackHistory";
        /**
         *
         * Employee Dashboard
         */
        this.getOrganizationalOccupancyforDashBoard = 'Employee/GetOrganizationalOccupancyforDashBoard';
        this.getSpaceStandardOccupancyforDashBoard = 'Employee/GetSpaceStandardOccupancyforDashBoard';
        this.getBuildingOccupancyforDashboard = 'Employee/GetBuildingOccupancyforDashBoard';
        this.getOrganizationalStructureforLookups = 'Report/GetOrganizationalStructureforLookups';
        this.updateMultipleEmployeeDataUrl = 'Employee/UpdateMultipleEmployeeData';
        this.getIsModuleAdminUrl = 'Common/IsModuleAdmin';
        this.getOrgUnitWiseSeatingCapacitiesforTrendAnalysis = 'Employee/GetOrgUnitWiseSeatingCapacitiesforTrendAnalysis';
        this.getSpaceStandardWiseSeatingCapacitiesforTrendAnalysis = 'Employee/GetSpaceStandardWiseSeatingCapacitiesforTrendAnalysis';
        this.getRateofHiringbyTimeforTrendAnalysis = 'Employee/GetRateOfHiringforTrendAnalysis';
        this.getGradeWiseSeatingCapacitiesforTrendAnalysis = 'Employee/GetGradeWiseOccupancyforTrendAnalysis';
        /*
        Employee Move/Assign through workflow
        */
        this.SaveEmployeeMovethroughWorkflow = 'EmployeeDrawing/InsertEmployeeMovethroughWorkflow'; //  'EmployeeDrawing/SaveEmployeeMovethroughWorkflow';
        this.SaveEmployeeAssignthroughWorkflow = 'EmployeeDrawing/InsertEmployeeAssignthroughWorkflow';
        this.SaveEmployeeResourcesthroughWorkflow = 'EmployeeDrawing/InsertEmployeeMoveObjectDetails';
        this.employeeMoveRequestListFormId = 420;
        this.reviewEmployeeMoveFormId = 422;
        this.getEmployeeMoveAssignApprovalRequestDataUrl = 'Employee/GetEmployeeMoveAssignApprovalRequestData';
        this.reviewEmployeeMovethroughWorkflowUrl = 'EmployeeDrawing/ReviewEmployeeMovethroughWorkflow';
        this.employeeAssignRequestListFormId = 424;
        this.reviewEmployeeAssignthroughWorkflowUrl = 'EmployeeDrawing/ReviewEmployeeAssignthroughWorkflow';
        this.cancelEmployeeMoveAssignRequestUrl = 'Employee/CancelEmployeeMoveAssignRequest';
        this.deleteEMPMoveDtls = 'Employee/DeleteEmployeeMoveDetails';
        this.deleteEMPMoveResrcDetls = 'Employee/DeleteEmployeeMoveResourceDetails';
        this.reviewMoveEMPResourceFormId = 588;
        this.empReviewHistoryFrmId = 590;
        /* Employee To Work Order User */
        this.employeeToWorkOrderUserFormId = 582;
        this.createEmployeeToWorkOrderUserUrl = 'Employee/CreateEmployeeToWorkOrderUser';
        this.drawinDetailsUrl = 'Drawing/GetOpenDrawingDetails';
        this.insertMultipleSpaceAllotmentDetailsUrl = 'Employee/InsertMultipleSpaceAllotmentDetails';
        this.checkSpaceEmployeeOccupancyUrl = 'Employee/CheckSpaceEmployeeOccupancy';
        this.checkResourceExistForEmployeesUrl = 'EmployeeDrawing/CheckResourceExistForEmployees';
        this.getEmployeeSheduledToMoveUrl = 'EmployeeDrawing/GetEmployeeSheduledToMove';
    }
    EmployeeService.prototype.getIsModuleAdmin = function (moduleId) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}" }, this.getIsModuleAdminUrl);
    };
    EmployeeService.prototype.getOptionalField = function () {
        return this.postgetaction(null, this.optionalFieldUrl);
    };
    EmployeeService.prototype.getOptionalFieldsListFields = function () {
        return this.postaction({ Input: "{ FormId: 448}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getOptionalFieldsListData = function (pageIndex, sortCol, sortDir, fieldSubscriptionCategoryId) {
        return this.postaction({ Input: "{FormId:448,PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:[{\"ReportFieldId\":5074,\"Value\":" + fieldSubscriptionCategoryId + "}]}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.updateOptionalFields = function (strRptFields) {
        debugger;
        return this.postaction({ Input: strRptFields }, this.updateFieldSubscriptionUrl);
    };
    EmployeeService.prototype.getEmployeeMenu = function (target) {
        var urlForMenuData;
        if (target == 1)
            urlForMenuData = this.allEmployeeSubmenuUrl;
        else
            urlForMenuData = this.employeeSubmenuInDrawingUrl;
        return this.postgetaction(null, urlForMenuData);
    };
    EmployeeService.prototype.loadOrganizationalUnit = function (id, parentid, fieldobj) {
        return this.postaction({ Input: "{FormId:" + this.allemployeeAddEditFormId + ",Id:" + id + ",ParentFieldId:" + parentid + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.lookupUrl);
    };
    EmployeeService.prototype.CheckEmployeeStatus = function (id) {
        return this.postaction({ input: "{Id:" + id + "}" }, this.checkEmployeeStatus);
    };
    EmployeeService.prototype.getSupervisorCount = function (id) {
        return this.postaction({ Input: "{Id:" + id + "}" }, this.SuperVisorCount);
    };
    //allEmployee related 
    EmployeeService.prototype.getAllEmployeeSearchKeyWordLookup = function () {
        return ["Aberdeen", "Concord", "Arlington", "Framingham", "Greenwood", "Manchester", "Site 1", "WhiteField"];
    };
    EmployeeService.prototype.getAllEmployeeData = function (index, column, direction, filter, value, IsKeyword, IsAdvance, isexport) {
        // return this.postgetaction<Observable<any>>(null, this.AllemployeeUrl);    
        // return this.postaction({ Input: "{ FormId: " + this.allemployeelistFormId + ",PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "'}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 0 }, this.employeeListDataListUrl);
        if (isexport == true)
            return this.postaction({ Input: "{ FormId: " + this.allemployeelistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "0", IsExport: 1 }, this.employeeListDataListUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.allemployeelistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "0" }, this.employeeListDataListUrl);
    };
    EmployeeService.prototype.getAllEmployeeDataExport = function (index, column, direction, fieldObjects, fileName, filter, value, IsKeyword, IsAdvance, isexport) {
        var fields = fieldObjects;
        var filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        return { Input: "{ FormId: " + this.allemployeelistFormId + ",ParentFormId:127,SortColumn:'" + column + "',IsExport:1,SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "0", fileName: fileName, fields: filterArray };
    };
    EmployeeService.prototype.getAllEmployeeColumnData = function () {
        //return this.postgetaction<Observable<any>>(null, this.AllEmployeeColumnUrl)
        return this.postaction({ Input: "{ FormId: " + this.allemployeelistFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.allEmployeePaging = function (index, column, direction, filter, value, IsKeyword, IsAdvance) {
        console.log('current page', index);
        //return this.postaction({ Input: "{ FormId: " + this.allemployeelistFormId + ",PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "'}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 0 }, this.employeeListDataListUrl);
        return this.postaction({ Input: "{ FormId: " + this.allemployeelistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "0" }, this.employeeListDataListUrl);
    };
    EmployeeService.prototype.loadallEmployeeAddEdit = function (selectedId, addEdit) {
        var lookupRptField = "[{\"FieldId\":395,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":395,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":399,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":400,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":487,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":489,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        if (addEdit == "add") {
            return this.postaction({ Input: "{ FormId: " + this.allemployeeAddEditFormId + ",ListLookupReportFieldIdValues:" + lookupRptField + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") {
            return this.postaction({ Input: "{ FormId: " + this.allemployeeAddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.allemployeelistFormId + ",ListLookupReportFieldIdValues:" + lookupRptField + " }" }, this.editDataUrl);
        }
        //return this.postgetaction<Observable<any>>(null, this._AllemployeeAddEditDataUrl)
    };
    EmployeeService.prototype.getAllEmployeeAdvnceSearchLookup = function () {
        return this.postaction({ Input: "{FormId:127}" }, this.AdvanceSearchLookUpUrl);
    };
    EmployeeService.prototype.getAllEmployeeKeywordField = function () {
        return this.postaction({ Input: "{FormId:126}" }, this.keywordLookUpUrl);
    };
    EmployeeService.prototype.AllEmployeeAdvanceSeachResult = function (value, index, direction, column) {
        return this.postaction({ Input: "{ FormId:102,ListFilterIdValues: " + value + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "0" }, this.employeeListDataListUrl);
    };
    EmployeeService.prototype.AllEmployeeKeywordSeach = function (value, index, direction, column) {
        return this.postaction({ Input: "{ FormId:102,Filter: '" + value + "',ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:1 ,IsAdvancedSearch:0}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "0" }, this.employeeListDataListUrl);
    };
    EmployeeService.prototype.submitAllEmployeeAdd = function (pageDetails, fileobj) {
        console.log('entered add service');
        if (fileobj == undefined)
            return this.postaction({ Input: "{FormId:" + this.allemployeeAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.allemployeelistFormId + "}" }, this.submitAddUrl);
        else
            return this.postaction({ applnInput: "{FormId:" + this.allemployeeAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.allemployeelistFormId + "}", FileInput: fileobj }, this.saveEmployee);
    };
    EmployeeService.prototype.submitAllEmployeeEdit = function (pageDetails, id, fileobj) {
        console.log('entered edit service');
        if (fileobj == undefined)
            return this.postaction({ Input: "{FormId:" + this.allemployeeAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.allemployeelistFormId + "}" }, this.submitEditUrl);
        else
            return this.postaction({ applnInput: "{FormId:" + this.allemployeeAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.allemployeelistFormId + "}", FileInput: fileobj }, this.saveEmployee);
    };
    EmployeeService.prototype.submitinlineAllEmployeeAdd = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.allemployeelistFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);
    };
    EmployeeService.prototype.submitAllEmployeeDelete = function (selectedID) {
        console.log('entered delete service');
        // return this.postaction({ Input: "{FormId:" + this.allemployeelistFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)
        return this.postaction({ applnInput: "{FormId:" + this.allemployeelistFormId + ",Id:" + selectedID[0] + "}" }, this.deleteEmployee);
    };
    EmployeeService.prototype.submitinlienAllEmployeeEdit = function (pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.allemployeelistFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);
    };
    //assignedEmployeeRelated
    //getAssignedEmployeeMainListField() {
    //    return this.postgetaction<Observable<any>>(null, this.assignedEmployeeMainListfield);
    //}
    EmployeeService.prototype.getAssignedEmployeeMainListData = function (moduleId) {
        //return this.postgetaction<Observable<any>>(null, this.assignedEmployeeMainListData);
        return this.postaction({ Input: "{}", ModuleId: moduleId }, this.GetDrawingsWithDataForFloorSelection);
    };
    EmployeeService.prototype.floorSelectionPaging = function (index) {
        console.log('current page', index);
    };
    EmployeeService.prototype.getAssignedEmployeeAdvnceSearchLookup = function () {
        return this.postaction({ Input: "{FormId:127}" }, this.AdvanceSearchLookUpUrl);
    };
    EmployeeService.prototype.AssignedEmployeeKeywordSeach = function (index, direction, column, drawingId, drawingIds, filter, value, IsKeyword, IsAdvance) {
        return this.postaction({ Input: "{ FormId:140,Filter: '" + filter + "',ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:1 ,IsAdvancedSearch:0}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1" }, this.employeeListDataListUrl);
    };
    EmployeeService.prototype.AssingedEmployeeAdvanceSeachResult = function (index, direction, column, drawingId, drawingIds, filter, value, IsKeyword, IsAdvance) {
        return this.postaction({ Input: "{ FormId:140,ListFilterIdValues: " + value + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1" }, this.employeeListDataListUrl);
    };
    EmployeeService.prototype.getAssignedEmployeeSearchKeyWordLookup = function () {
        return this.postaction({ Input: "{FormId:126}" }, this.keywordLookUpUrl);
    };
    EmployeeService.prototype.getAssignedEmployeeColumnData = function () {
        //return this.postgetaction<Observable<any>>(null, this.assignedEmployeeColumnDataUrl);
        return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getAssignedEmployeeData = function (index, column, direction, drawingId, drawingIds, filter, value, IsKeyword, IsAdvance, pageTarget, isExport) {
        if (pageTarget == 1) {
            if (isExport == true)
                return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1", IsExport: 1 }, this.employeeListDataListUrl);
            else
                return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormId + ",IsExport:1,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1" }, this.employeeListDataListUrl);
        }
        else {
            if (isExport == true)
                return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1", IsExport: 1 }, this.employeeListDataListUrl);
            else
                return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1" }, this.employeeListDataListUrl);
        }
    };
    EmployeeService.prototype.getAssignedEmployeeDataExport = function (index, column, direction, drawingId, drawingIds, fieldObjects, fileName, filter, value, IsKeyword, IsAdvance, pageTarget, isExport) {
        var fields = fieldObjects;
        var filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        if (pageTarget == 1) {
            return { Input: "{ FormId: " + this.assignedEmployeeListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1", fileName: fileName, fields: filterArray };
        }
        else
            return { Input: "{ FormId: " + this.assignedEmployeeListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}", DrawingId: drawingId.toString(), DrawingIds: drawingIds, AssignmentStatus: "1", fileName: fileName, fields: filterArray };
    };
    EmployeeService.prototype.loadassignedEmployeeAddEdit = function (selectedId, addEdit) {
        //let lookupRptField = "[{\"FieldId\":395,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":395,\"ReportFieldId\": 288, \"Value\":\"0\" }]";
        var lookupRptField = "[{\"FieldId\":395,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":395,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":399,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":400,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":487,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":489,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        if (selectedId != undefined) {
            if (addEdit == "add") {
            }
            else if (addEdit == "edit") {
                return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeAddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.assignedEmployeeListFormId + ",ListLookupReportFieldIdValues:" + lookupRptField + "  }" }, this.editDataUrl);
            }
        }
        // return this.postgetaction<Observable<any>>(null, this.AssignedEmployeeAddEditDataUrl)
    };
    EmployeeService.prototype.submitAssignedEmployeeAdd = function (pageDetails) {
        console.log('entered add service');
    };
    EmployeeService.prototype.submitAssignedEmployeeEdit = function (pageDetails, id, fileobj) {
        console.log('entered edit service');
        if (fileobj == undefined)
            return this.postaction({ Input: "{FormId:" + this.assignedEmployeeAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.assignedEmployeeListFormId + "}" }, this.submitEditUrl);
        else
            return this.postaction({ applnInput: "{FormId:" + this.assignedEmployeeAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.assignedEmployeeListFormId + "}", FileInput: fileobj }, this.saveEmployee);
    };
    EmployeeService.prototype.submitinlienAssignedEmployeeEdit = function (pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.allemployeelistFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);
    };
    EmployeeService.prototype.submitAssignedEmployeeDelete = function (selectedID) {
        console.log('entered delete service');
        return this.postaction({ Input: "{FormId:" + this.assignedEmployeeListFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl);
    };
    EmployeeService.prototype.assignedEmployeePaging = function (index, column, direction, drawingId, drawingIds, filter, value, IsKeyword, IsAdvance) {
        return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: drawingId, DrawingIds: drawingIds, AssignmentStatus: 1 }, this.employeeListDataListUrl);
    };
    //unassigned employee related 
    EmployeeService.prototype.getUnassingedEmployeeMainKeyWordLookUp = function () {
        return ["01", "01 Tel  Rm-North", "01 Tel  Rm-South", "02", "03", "011", "010 Tel  Rm-North", "012 Tel", "12", "145"];
    };
    EmployeeService.prototype.getUnassignedEmployeeData = function (index, column, direction, filter, value, IsKeyword, IsAdvance, isexport) {
        if (isexport == 1)
            return this.postaction({ Input: "{ FormId: " + this.unassignedlistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2, IsExport: 1 }, this.employeeListDataListUrl);
        else
            return this.postaction({ Input: "{ FormId: " + this.unassignedlistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2 }, this.employeeListDataListUrl);
    };
    EmployeeService.prototype.getUnassignedEmployeeDataExport = function (index, column, direction, fieldObjects, fileName, filter, value, IsKeyword, IsAdvance, isexport) {
        var fields = fieldObjects;
        var filterArray = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray.push(item.FieldLabel);
                return true;
            }
            else
                return false;
        });
        return { Input: "{ FormId: " + this.unassignedlistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2, fileName: fileName, fields: filterArray };
    };
    EmployeeService.prototype.getUnassignedEmployeeColumnData = function () {
        //return this.getaction<Observable<any>>(this.unassignedColumnDataUrl);
        return this.postaction({ Input: "{ FormId: " + this.unassignedlistFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.submitUnassignedEmployeeDelete = function (selectedID) {
        console.log('entered delete service');
        //return this.postaction({ Input: "{FormId:" + this.unassignedlistFormId + ",Id:" + selectedID[0] + "}" }, this.deleteUrl)
        return this.postaction({ applnInput: "{FormId:" + this.unassignedlistFormId + ",Id:" + selectedID[0] + "}" }, this.deleteEmployee);
    };
    EmployeeService.prototype.submitUnassignedEmployeeAdd = function (pageDetails, fileobj) {
        console.log('entered add service');
        if (fileobj == undefined)
            return this.postaction({ Input: "{FormId:" + this.unassignedAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.unassignedlistFormId + "}" }, this.submitAddUrl);
        else
            return this.postaction({ applnInput: "{FormId:" + this.unassignedAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.unassignedlistFormId + "}", FileInput: fileobj }, this.saveEmployee);
    };
    EmployeeService.prototype.submitinlineUnassignedEmployeeAdd = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.unassignedlistFormId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.submitAddUrl);
    };
    EmployeeService.prototype.submitUnassignedEmployeeEdit = function (pageDetails, id, fileobj) {
        console.log('entered edit service');
        if (fileobj == undefined)
            return this.postaction({ Input: "{FormId:" + this.unassignedAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.unassignedlistFormId + "}" }, this.submitEditUrl);
        else
            return this.postaction({ applnInput: "{FormId:" + this.unassignedAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.unassignedlistFormId + "}", FileInput: fileobj }, this.saveEmployee);
    };
    EmployeeService.prototype.submitinlineUnassignedEmployeeEdit = function (pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.allemployeelistFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + "}" }, this.submitEditUrl);
    };
    EmployeeService.prototype.unassignedEmployeePaging = function (index, column, direction, filter, value, IsKeyword, IsAdvance) {
        //console.log('current page', index)
        //return this.postaction({ Input: "{ FormId: " + this.unassignedlistFormId + ",PageIndex:" + index + ",SortColumn:'" + column + "',SortDirection:'" + direction + "'}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2 }, this.employeeListDataListUrl);
        return this.postaction({ Input: "{ FormId: " + this.unassignedlistFormId + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2 }, this.employeeListDataListUrl);
    };
    EmployeeService.prototype.loadunassignedEmployeeAddEdit = function (selectedId, addEdit) {
        //let lookupRptField = "[{\"FieldId\":395,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":395,\"ReportFieldId\": 288, \"Value\":\"0\" }]";
        var lookupRptField = "[{\"FieldId\":395,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":395,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":399,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":400,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":487,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":489,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        if (addEdit == "add") {
            return this.postaction({ Input: "{ FormId: " + this.unassignedAddEditFormId + ",ListLookupReportFieldIdValues:" + lookupRptField + " }" }, this.addDataUrl);
        }
        else if (addEdit == "edit") {
            return this.postaction({ Input: "{ FormId: " + this.unassignedAddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.unassignedlistFormId + ",ListLookupReportFieldIdValues:" + lookupRptField + " }" }, this.editDataUrl);
        }
    };
    EmployeeService.prototype.getunassignedEmployeeAdvnceSearchLookup = function () {
        return this.postaction({ Input: "{FormId:127}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2 }, this.AdvanceSearchLookUpUrl);
    };
    EmployeeService.prototype.getunassignedEmployeeKeywordField = function () {
        return this.postaction({ Input: "{FormId:126}", DrawingId: 0, DrawingIds: '', AssignmentStatus: 2 }, this.keywordLookUpUrl);
    };
    EmployeeService.prototype.unassignedEmployeeAdvanceSeachResult = function (value, index, direction, column) {
        return this.postaction({ Input: "{ FormId:130,ListFilterIdValues: " + value + ",ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "2" }, this.employeeListDataListUrl);
    };
    EmployeeService.prototype.unassignedEmployeeKeywordSeach = function (value, index, direction, column) {
        return this.postaction({ Input: "{ FormId:130,Filter: '" + value + "',ParentFormId:127,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:1 ,IsAdvancedSearch:0}", DrawingId: "0", DrawingIds: '', AssignmentStatus: "2" }, this.employeeListDataListUrl);
    };
    //job title
    EmployeeService.prototype.getJobTitleFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.JobTitleFormId + "}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getJobTitleData = function (index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.JobTitleFormId + ",SortColumn: '" + column + "', SortDirection: '" + direction + "',PageIndex:" + index + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.loadJobTitleAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.JobTitleFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.JobTitleFormId + ",ParentFormId:" + this.JobTitleFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    EmployeeService.prototype.AddUpdateJobTitle = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.JobTitleFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.JobTitleFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    EmployeeService.prototype.insertJobTitle = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.JobTitleFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:0}", }, this.submitAddUrl);
    };
    EmployeeService.prototype.updateJobTitle = function (pageDetails, selectId) {
        return this.postaction({ Input: "{ FormId:" + this.JobTitleFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    EmployeeService.prototype.deleteJobTitle = function (id) {
        return this.postaction({ Input: "{FormId:" + this.JobTitleFormId + ",Id:" + id + "}" }, this.deleteUrl);
    };
    //Space Type
    EmployeeService.prototype.getpaceTypeFields = function () {
        return this.postaction({ Input: "{FormId:" + this.SpaceTypeId + "}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getSpaceTypeData = function (index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.SpaceTypeId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.postDeletepaceType = function (id) {
        return this.postaction({ Input: "{FormId:" + this.SpaceTypeId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    //Space Allocation Rules
    EmployeeService.prototype.getspaceAllocationRuleFields = function () {
        return this.postaction({ Input: "{FormId:" + this.SpaceAllocationRuleId + "}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getSpaceAllocationRuleData = function (index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.SpaceAllocationRuleId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.getSpaceAllocationRuleDetails = function (index, column, direction, id, reportfieldIdArray) {
        debugger;
        return this.postaction({ Input: "{FormId:" + this.SpaceAllocationRuleId + ",Id:" + id + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + ",ListReportFieldIdValues:" + JSON.stringify(reportfieldIdArray) + " }" }, this.listDataListUrl);
    };
    EmployeeService.prototype.loadSpaceAllocationruleAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.AddEditSpaceAllocationRuleId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.AddEditSpaceAllocationRuleId + ",ParentFormId:" + this.GradeFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    EmployeeService.prototype.postDeleteSpaceAllocation = function (strRptFields, spaceId) {
        return this.postaction({ Input: "{FormId:" + this.SpaceAllocationRuleId + " ,Id:" + spaceId + ",ListReportFieldIdValues:" + JSON.stringify(strRptFields) + "}" }, this.deleteUrl);
    };
    EmployeeService.prototype.AddUpdateGradestospaceallocation = function (strRptFields, target) {
        if (target) {
            return this.postaction({ Input: "{FormId:" + this.AddEditSpaceAllocationRuleId + ",ListReportFieldIdValues:" + JSON.stringify(strRptFields) + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.AddEditSpaceAllocationRuleId + ",ListReportFieldIdValues:" + JSON.stringify(strRptFields) + "}" }, this.submitEditUrl);
        }
    };
    //Emp grade
    EmployeeService.prototype.getGradeFields = function () {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + "}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getGradeData = function (index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",Id:0 " + ", SortColumn: '" + column + "', SortDirection: '" + direction + "', PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.loadGradeAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.GradeFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.GradeFormId + ",ParentFormId:" + this.GradeFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    EmployeeService.prototype.AddUpdateGrades = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",ListReportFieldIdValues:" + strRptFields + ",Id:" + selectedId + "}" }, this.submitEditUrl);
        }
    };
    EmployeeService.prototype.postAddGradeDetails = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitAddUrl);
    };
    EmployeeService.prototype.postEditGradeDetails = function (pageDetails, selectId) {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    EmployeeService.prototype.postDeleteGradeDetails = function (id) {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    EmployeeService.prototype.postUpdateEmployeeRankOrder = function (pageDetails) {
        return this.postaction({ Input: pageDetails }, this.UpdateApplicationFormFieldOrderUrl);
    };
    /* Employee : Scenarios BEGIN*/
    EmployeeService.prototype.getScenarioListColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.ScenarioListFrmId + "}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.scenarioListData = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: " + this.ScenarioListFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.listAddScenario = function () {
        return this.postaction({ Input: "{ FormId:" + this.AddEditScenarioFrmId + ",ParentFormId:" + this.ScenarioListFrmId + "}" }, this.addDataUrl);
    };
    EmployeeService.prototype.postInsertScenarios = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.AddEditScenarioFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}" }, this.submitAddUrl);
    };
    EmployeeService.prototype.loadEditScenario = function (selectedId) {
        var rptFieldValues = "[{\"ReportFieldId\":907,\"Value\":\"" + selectedId + "\"}]";
        return this.postaction({ Input: "{ FormId:" + this.AddEditScenarioFrmId + ",ParentFormId:" + this.ScenarioListFrmId + ",ListReportFieldIdValues:" + rptFieldValues + "}" }, this.editDataUrl);
    };
    EmployeeService.prototype.listUpdateScenarios = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.AddEditScenarioFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}" }, this.submitEditUrl);
    };
    EmployeeService.prototype.convertScenarioToMoveProject = function (pageDetails) {
        return this.postaction({ applnInput: "{FormId:" + this.AddEditScenarioFrmId + ",ListReportFieldIdValues:" + pageDetails + ",Id:1}" }, this.createMoveProjectfromScenarioUrl);
    };
    EmployeeService.prototype.getScenarioDrawingListColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.ScenarioDrawingFrmId + "}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.scenarioListDrawingsData = function (scenarioId, pageIndex, sortCol, sortDir) {
        var rptFldValues = "[{\"ReportFieldId\":904,\"Value\":\"" + scenarioId + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.ScenarioDrawingFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + rptFldValues + "}" }, this.getScenarioDrawingsUrl);
    };
    /* Employee : Scenarios END*/
    /* Employee : Approved Stack Plan BEGIN*/
    EmployeeService.prototype.getApprovedStackPlanListColumns = function () {
        return this.postaction({ Input: "{FormId:" + this.ApprovedStackPlanFrmId + "}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.postApprovedStackPlanListData = function (pageDetails, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: " + this.ApprovedStackPlanFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.ApprovedStackPlanUrl);
    };
    EmployeeService.prototype.getGetApprovedStackPlanforaProject = function (pageDetails) {
        return this.postaction({ applnInput: "{ FormId: " + this.ApprovedStackPlanFrmId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.GetApprovedStackPlanforaProjectUrl);
    };
    //postApprovedStackPlanToScenario(pageDetails) {
    //    return this.postaction({ applnInput: "{ FormId: " + this.ApprovedStackPlanFrmId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.ApprovedStackPlanToScenarioUrl);
    //}
    EmployeeService.prototype.convertApprovedStackPlanToScenario = function (pageDetails) {
        return this.postaction({ applnInput: "{ FormId: " + this.ApprovedStackPlanFrmId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.ApprovedStackPlanToScenarioUrl);
    };
    EmployeeService.prototype.postCreateMoveProject = function (pageDetails) {
        return this.postaction({ applnInput: "{ FormId: " + this.ApprovedStackPlanFrmId + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.CreateMoveProjectUrl);
    };
    EmployeeService.prototype.postGetMoveProjectDetailBasedOnStatusId = function (pageDetails, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ FormId: " + this.ApprovedStackPlanFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + " ,ListReportFieldIdValues: " + pageDetails + "}" }, this.GetMoveProjectDetailBasedOnStatusIdUrl);
    };
    /* Employee : Approved Stack Plan END*/
    //Space Planning Project
    EmployeeService.prototype.getSpacePlanningListField = function () {
        return this.postaction({ Input: "{ FormId: " + this.SpacePlanningProjectListFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getSpacePlanningData = function (index, column, direction) {
        return this.postaction({ Input: "{ FormId: " + this.SpacePlanningProjectListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.loadSpacePlanningAddEdit = function (selectedId, addEdit) {
        if (addEdit == "add") {
            return this.postaction({ Input: "{ FormId: " + this.SpacePlanningProjectAddEditFormId + ",ParentFormId:" + this.SpacePlanningProjectListFormId + " }" }, this.addDataUrl);
        }
        if (selectedId != undefined) {
            if (addEdit == "edit") {
                return this.postaction({ Input: "{ FormId: " + this.SpacePlanningProjectAddEditFormId + ",Id:" + selectedId + ",ParentFormId:" + this.SpacePlanningProjectListFormId + " }" }, this.editDataUrl);
            }
        }
        // return this.postgetaction<Observable<any>>(null, this.AssignedEmployeeAddEditDataUrl)
    };
    EmployeeService.prototype.submitAddSpacePlanningProject = function (pageDetails) {
        return this.postaction({ applnInput: "{FormId:" + this.SpacePlanningProjectAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.SpacePlanningProjectListFormId + "}" }, this.MoveProjectAddUrl);
    };
    EmployeeService.prototype.submitEditSpacePlanningProject = function (pageDetails, id) {
        return this.postaction({ applnInput: "{FormId:" + this.SpacePlanningProjectAddEditFormId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.SpacePlanningProjectListFormId + "}" }, this.MoveProjectEditUrl);
    };
    EmployeeService.prototype.deleteSpacePlanningProject = function (Id, obj) {
        return this.postaction({ applnInput: "{FormId:" + this.SpacePlanningProjectListFormId + ",Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(obj) + "}" }, this.updateStatusSpacePlanningUrl);
    };
    EmployeeService.prototype.restoreSpacePlanningProject = function (Id, obj) {
        return this.postaction({ applnInput: "{FormId:" + this.SpacePlanningProjectListFormId + ",Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(obj) + "}" }, this.updateStatusSpacePlanningUrl);
    };
    EmployeeService.prototype.discardSpacePlanningProject = function (Id, obj) {
        return this.postaction({ applnInput: "{FormId:" + this.SpacePlanningProjectListFormId + ",Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(obj) + "}" }, this.updateStatusSpacePlanningUrl);
    };
    EmployeeService.prototype.getFloorforSpacePlanning = function (moduleId, projectId) {
        //return this.postgetaction<Observable<any>>(null, this.assignedEmployeeMainListData);
        return this.postaction({ Input: "{}", ModuleId: moduleId, projectid: projectId }, this.GetAllocatedDrawingsForSpacePlanningAndFloorSelection);
    };
    EmployeeService.prototype.updateEmployeeMoveProjectFloors = function (projectid, floorid) {
        //if (floorid == null)
        //    floorid = [];
        return this.postaction({ applnInput: "{}", projectid: projectid[0], floorids: floorid }, this.updateFloorUrl);
    };
    EmployeeService.prototype.getSendForApprovalFields = function (obj) {
        return this.postaction({
            Input: "{ FormId: " + this.SendForApprovalFormId + ",ParentFormId:" + this.SpacePlanningProjectListFormId + ",ListLookupReportFieldIdValues:" + JSON.stringify(obj) + "}"
        }, this.addDataUrl);
    };
    EmployeeService.prototype.getActionPoint = function (fieldObj) {
        return this.postaction({
            Input: "{ FormId: " + this.SendForApprovalFormId + ",ParentFormId:" + this.SpacePlanningProjectListFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldObj) + "}"
        }, this.loadActionUsers);
    };
    EmployeeService.prototype.checkIsSpecificUser = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.SendForApprovalFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    EmployeeService.prototype.loadNextActionPointUsers = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.SendForApprovalFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    EmployeeService.prototype.SubmitSendForApproval = function (fieldObj) {
        return this.postaction({
            Input: "{ FormId: " + this.SendForApprovalFormId + ",ParentFormId:" + this.SpacePlanningProjectListFormId + ",ListLookupReportFieldIdValues:" + JSON.stringify(fieldObj) + "}"
        }, this.submitSendForApproval);
    };
    //Move Project Details
    EmployeeService.prototype.getMoveProjectList = function () {
        return this.postaction({ Input: "{ FormId: " + this.MoveProjectListFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getMoveProjectListData = function (index, column, direction, fieldObj) {
        return this.postaction({ Input: "{ FormId: " + this.MoveProjectListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[" + JSON.stringify(fieldObj[0]) + "]}" }, this.MoveProjectListUrl);
    };
    EmployeeService.prototype.getShowDetailsReadOnlyField = function () {
        return this.postaction({ Input: "{FormId:" + this.showDetailsReadOnlyListFormId + "}" }, this.listFieldObjUrl);
    };
    //Stack plan details
    EmployeeService.prototype.getStackPlanDetailsFields = function () {
        return this.postaction({ Input: "{FormId:" + this.stackPlanDetailsFormId + "}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.loadAssignLocation = function (fieldObj, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.assignLocationtFormId + ",ListLookupReportFieldIdValues:" + JSON.stringify(fieldObj) + ",Id:" + selectedId + "}" }, this.editDataUrl);
    };
    EmployeeService.prototype.editMoveDetails = function (fieldObj, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.assignLocationtFormId + ",ListLookupReportFieldIdValues:" + JSON.stringify(fieldObj) + ",Id:" + selectedId + "}" }, this.editDataUrl);
    };
    EmployeeService.prototype.deleteMoveProjectDetails = function (id) {
        return this.postaction({ Input: "{FormId:" + this.stackPlanDetailsFormId + ",Id:" + id + "}" }, this.deleteUrl);
    };
    EmployeeService.prototype.loadAssignLocationLookups = function (id, parentId, fieldobj) {
        return this.postaction({ Input: "{FormId:" + this.assignLocationtFormId + ",Id:" + id + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.lookupUrl);
    };
    EmployeeService.prototype.postSubmitAssignLocation = function (pageDetails) {
        return this.postaction({ Input: "{ FormId:" + this.assignLocationtFormId + ",ParentFormId:" + this.stackPlanDetailsFormId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitEditUrl);
    };
    EmployeeService.prototype.postSubmitUpdateLocation = function (pageDetails, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.assignLocationtFormId + ",ParentFormId:" + this.stackPlanDetailsFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.submitEditUrl);
    };
    EmployeeService.prototype.getStackPlanDetailsListData = function (index, column, direction, fieldObj) {
        return this.postaction({ Input: "{ FormId: " + this.stackPlanDetailsFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:" + JSON.stringify(fieldObj) + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.getShowDetailsReadOnlyData = function (index, column, direction, fieldObj) {
        return this.postaction({ Input: "{ FormId: " + this.showDetailsReadOnlyListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:" + JSON.stringify(fieldObj) + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.executeMoveProject = function (fieldObj) {
        return this.postaction({ applnInput: "{ListReportFieldIdValues:" + JSON.stringify(fieldObj) + "}" }, this.ExecuteMoveProjectUrl);
    };
    EmployeeService.prototype.executeEmployee = function (fieldObj, id) {
        return this.postaction({ applnInput: "{FormId: " + this.showDetailsReadOnlyListFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldObj) + "}" }, this.ExecuteDetailsUrl);
    };
    EmployeeService.prototype.getEmployeeResourceData = function (index, column, direction, selectedId) {
        //var id;
        //if (selectedId["currentValue"])
        //    id = selectedId["currentValue"]
        //else
        //    id = selectedId
        return this.postaction({ Input: "{ FormId: " + this.employeeResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:" + selectedId + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.getEmployeeResourceColumnData = function () {
        return this.postaction({ Input: "{ FormId: " + this.employeeResourceListFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.sortEmployeeResource = function (index, column, direction, selectedId) {
        return this.postaction({ Input: "{ FormId: " + this.employeeResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",Id:" + selectedId + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.postResourcesDelete = function (selectedResourceIds, employeeId) {
        return this.postaction({ Input: "{ FormId:" + this.employeeResourceListFormId + ",ListReportFieldIdValues:" + selectedResourceIds + ", Id:" + employeeId + "}" }, this.deleteEmployeeResourcesSubmitUrl);
    };
    EmployeeService.prototype.getResourceType = function (objectCategoryId, target) {
        return this.postaction({ Input: "{ ObjectCategoryId:" + objectCategoryId + ",DataOption:" + target + " }" }, this.resourceTypeLookUpGetUrl);
    };
    EmployeeService.prototype.getResourceTypeFilterByEmployeeLocation = function (objectCategoryId, employeeId) {
        return this.postaction({ Input: "{ ObjectCategoryId:" + objectCategoryId + ",EmployeeId:" + employeeId + " }" }, this.resourceTypeWithFilterLookUpGetUrl);
    };
    EmployeeService.prototype.getEmployeeNewResourceData = function (index, column, direction, target, objectCategoryId, resourceTypeId, employeeId) {
        return this.postaction({ Input: "{ FormId: " + this.newEmployeeResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }", ObjectCategory: objectCategoryId, DataOption: target, AttributeOption: 2, ObjectClassIds: resourceTypeId, DrawingIds: '', SearchCondition: '', IsOrphan: 0, ObjectId: 0, IsDataBasedOnUserAccess: 1, ObjectComponentType: 1, EmployeeId: employeeId }, this.newEmployeeResourceGetUrl);
    };
    EmployeeService.prototype.getEmployeeNewResourceByLocationData = function (index, column, direction, objectCategoryId, resourceTypeId, employeeId) {
        return this.postaction({ Input: "{ FormId: " + this.newEmployeeResourceListFormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " }", ObjectCategory: objectCategoryId.toString(), ObjectClassId: resourceTypeId.toString(), EmployeeId: employeeId.toString() }, this.newEmployeeResourceAssignedToaSpaceGetUrl);
    };
    EmployeeService.prototype.postSubmitActionEmployeeRsource = function (selectedRowIds, selectedId) {
        return this.postaction({ Input: "{ FormId:" + this.newEmployeeResourceListFormId + ",ListReportFieldIdValues:" + selectedRowIds + ",Id:" + selectedId + "}" }, this.insertEmployeeResourcesSubmitUrl);
    };
    EmployeeService.prototype.getEmployeeNewResourceColumnData = function () {
        return this.postaction({ Input: "{ FormId: " + this.newEmployeeResourceListFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.customerSubscribedFeatures = function (feaureIds) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerSettingsUrl);
    };
    //stack plan details
    EmployeeService.prototype.getStackPlansListField = function () {
        return this.postaction({ Input: "{ FormId: " + this.stackplansFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getStackPlansListData = function (fieldobj, pageIndex, sortCol, sortDir) {
        var param = "{ FormId: " + this.stackplansFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}";
        return this.postaction({ Input: param }, this.listDataListUrl);
        //return this.postaction({ Input: "{ FormId: " + this.stackplansFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.deleteStackPlans = function (id) {
        return this.postaction({ Input: "{ FormId: " + this.stackplansFormId + ",Id:" + id + "}" }, this.deleteUrl);
    };
    EmployeeService.prototype.approveStackPlans = function (fieldobj, stackId) {
        return this.postaction({ applnInput: "{ FormId: " + this.stackplansFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + ",Id:" + stackId + "}" }, this.approveStavkPlansUrl);
    };
    EmployeeService.prototype.getOrgWiseEmpListField = function () {
        return this.postaction({ Input: "{ FormId: " + this.orgWiseEmpListFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.GetEmployeesNotHavingSeatsPerGradeAndSpaceType = function (Orgid, TargetFloorId, SourceFloorId, EmpIds) {
        var rptFielsValue = "[{\"ReportFieldId\":875,\"Value\":\"" + Orgid + "\"},{\"ReportFieldId\":2938,\"Value\":\"" + SourceFloorId + "\"},{\"ReportFieldId\":2054,\"Value\":\"" + TargetFloorId + "\"},{\"ReportFieldId\":866,\"Value\":\"" + EmpIds + "\"}]";
        return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFielsValue + "}" }, this.validatestackplanOrgMoves);
    };
    EmployeeService.prototype.GetEmployeeSpacePlanningStackOccupancyDetails = function (prjtId, stackPlanId) {
        // let rptFieldValues = "[{\"ReportFieldId\":893,\"Value\":\"15\"},{\"ReportFieldId\":781,\"Value\":\"38\"},{\"ReportFieldId\":8978,\"Value\":\"0\"}]";
        var rptFieldValues = "[{\"ReportFieldId\":893,\"Value\":\"" + prjtId + "\"},{\"ReportFieldId\":8978,\"Value\":\"" + stackPlanId + "\"}]";
        return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + "}" }, this.stackPlanDetailsUrl);
    };
    EmployeeService.prototype.GetRandomColor = function (deptId) {
        return this.postaction({ "departmentId": deptId }, this.getRandomColor);
    };
    EmployeeService.prototype.GetOrganizationalWiseEmployees = function (OrgUnitId, FlrId, MovePrjtId, FromFlrId) {
        return this.postaction({ Input: "{Id:0}", "OrgUnitId": OrgUnitId, "FloorId": FlrId, "MoveProjectID": MovePrjtId, FromFloorId: FromFlrId }, this.getOrgwiseEmplyees);
    };
    EmployeeService.prototype.loadAddEditStack = function (stackPlanId, prjtId, target) {
        if (target == 1)
            return this.postaction({ Input: "{ FormId: " + this.addEditStackFrmId + " }" }, this.addDataUrl);
        else
            var rptFielsValue = "[{\"ReportFieldId\":8972,\"Value\":\"" + prjtId + "\"},{\"ReportFieldId\":8971,\"Value\":\"" + stackPlanId + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.addEditStackFrmId + ",ParentFormId:" + this.stackplansFormId + ",Id:" + stackPlanId + ",ListReportFieldIdValues:" + rptFielsValue + " }" }, this.editDataUrl);
    };
    EmployeeService.prototype.addUpdateStackPlanDetails = function (rptFieldvalues, movePrjtId, flrDetls, stackPlanDetailId, anticipatedSeats) {
        var subObj = JSON.parse(rptFieldvalues["fieldobject"]);
        var stackPlanName = "";
        var Description = "";
        subObj.find(function (item) {
            if (item.ReportFieldId == 8973)
                stackPlanName = item.Value;
            else if (item.ReportFieldId == 8975)
                Description = item.Value;
        });
        return this.postaction({ Input: "{FormId:" + this.addEditStackFrmId + ",ParentFormId:" + this.stackplansFormId + "}", "Name": stackPlanName, "Description": Description, "MoveProjectId": movePrjtId, "floorDetails": flrDetls, "StackPlanId": stackPlanDetailId, "AnticipatedSeats": anticipatedSeats }, this.saveStackDetails);
        // string input, int MoveProjectId, string Name, string Description, Floor FloorDetails, int StackPlanId, string AnticipatedSeats
    };
    EmployeeService.prototype.chkWhetherEmpAssignedToOrgUnit = function (prjtId) {
        return this.postaction({ Input: "{Id:" + prjtId + "}" }, this.chkEmpAssignedToOrgUnit);
    };
    //stack plan
    EmployeeService.prototype.getEmployeerawingListData = function (formId, ModuleId, movedEmpDrawingId) {
        debugger;
        var reptFileds;
        reptFileds = "{\"ReportFieldId\":508,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}";
        if (movedEmpDrawingId != undefined && movedEmpDrawingId != null)
            reptFileds += ",{\"ReportFieldId\":669,\"Value\":\"" + movedEmpDrawingId + "\"}";
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[" + reptFileds + "]}" }, this.listDataListUrl);
        // return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":584,\"Value\":\"" + Math.pow(2, ModuleId).toString() + "\"}]}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.getEmployeerawingListDataSort = function (FormId, index, column, direction, filter, value, IsKeyword, IsAdvance) {
        //  return this.postaction({ Input: "{FormId:" + FormId + " ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.listDataListUrl);
        return this.postaction({ Input: "{ FormId: " + FormId + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",ListReportFieldIdValues:[{\"ReportFieldId\":508,\"Value\":\"32\"}],Filter:'" + filter + "',ListFilterIdValues: " + value + ",IsKeywordSearch:" + IsKeyword + ",IsAdvancedSearch:" + IsAdvance + "}", DrawingId: 0 }, this.listDataListUrl);
    };
    EmployeeService.prototype.getEmployeeDrawingsFields = function (FormId) {
        return this.postaction({ Input: "{ FormId: " + FormId + " }" }, this.listFieldObjUrl);
        //return this.postaction({ Input: "{FormId: 1 }" }, this._SiteColumnDataUrl);
        //return this.postgetaction<Observable<any>>(null, this._SiteColumnDataUrl)
    };
    EmployeeService.prototype.getSpacePlanningRequestFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.SpacePlanningRequestFrmId + "}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getSpacePlanningRequestData = function () {
        // return this.postaction({ Input: "{FormId:" + this.SpacePlanningRequestFrmId + "}" }, this.listDataListUrl);
        return this.postaction({ Input: "{FormId:159,ListReportFieldIdValues:[{\"ReportFieldId\":893,\"Value\":\"0\"}]}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.getSpacePlanningRequestDataSort = function (direction, column) {
        return this.postaction({ Input: "{ FormId:159,SortColumn:'" + column + "',SortDirection:'" + direction + "'}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.CheckIsEntityReferenceFound = function (Dbobject, Id) {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",Id:" + Id + ",ListReportFieldIdValues:" + JSON.stringify(Dbobject) + "}" }, this.CheckIsEntityReferenceUrl);
    };
    EmployeeService.prototype.checkEditPrivilageExist = function (Id) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":945,\"Value\":\"" + Id + "\"}]}" }, this._checkEditPrivilageExistUrl);
    };
    EmployeeService.prototype.getEmpSnapshotsFields = function () {
        return this.postaction({ Input: "{FormId:" + this.listEmployeeSnapshotsFormId + "}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getEmpSnapshotsData = function (pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.listEmployeeSnapshotsFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.getEmpSnapshotsAdd = function (SnapshotDate, replace) {
        return this.postaction({ Input: "{ FormId:" + this.listEmployeeSnapshotsFormId + ",ParentFormId:" + this.listEmployeeSnapshotsFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":7907,\"Value\":\"" + SnapshotDate + "\"},{\"ReportFieldId\":3356,\"Value\":\"" + replace + "\"}]}" }, this.submitAddUrl);
    };
    EmployeeService.prototype.getEmpSnapshotsdelete = function (Id) {
        return this.postaction({ Input: "{FormId:" + this.listEmployeeSnapshotsFormId + ",ParentFormId:" + this.listEmployeeSnapshotsFormId + ",Id:" + Id + "}" }, this.deleteUrl);
    };
    EmployeeService.prototype.getOrgLevelCustomizedName = function () {
        return this.postaction({}, this.getOrgLevelCustomName);
    };
    //Export
    EmployeeService.prototype.getSessionData = function () {
        return this.postaction({}, this.getSessionValues);
    };
    EmployeeService.prototype.getAllocatedDrawingsForSpacePlanningProject = function (dbObjectId, selectedProject) {
        return this.postaction({ Input: "{Id: " + dbObjectId + ",ListReportFieldIdValues:[{\"ReportFieldId\":5092,\"Value\":\"" + selectedProject + "\"}]}" }, this.dbObjectLookUpUrl);
    };
    EmployeeService.prototype.getOrganizationalStructureFields = function () {
        return this.postaction({ Input: "{}" }, this.orgStrucFldforStack);
    };
    EmployeeService.prototype.IsGradeInUse = function (SelectedId) {
        return this.postaction({ Input: "{FormId:" + this.GradeFormId + ",Id:" + SelectedId + "}" }, this.CheckGradeInUse);
    };
    EmployeeService.prototype.getEmployeeAssignRequestStatus = function (empIds) {
        var repFieldValues = "";
        for (var _i = 0, empIds_1 = empIds; _i < empIds_1.length; _i++) {
            var empId = empIds_1[_i];
            repFieldValues += "{\"ReportFieldId\":7845,\"Value\":\"" + empId + "\"},";
        }
        repFieldValues = repFieldValues.substring(0, repFieldValues.length - 1);
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + repFieldValues + "]}" }, this.getEmployeeAssignRequestStatusUrl);
    };
    EmployeeService.prototype.getApiAllEmployeeDataExport = function (customerId, userId, timeOffset) {
        return this.postaction({ IsForDemo: true, CustomerId: customerId, UserId: userId, TimeOffset: timeOffset }, this.apiAllEmployeeDataExportUrl);
    };
    EmployeeService.prototype.getAssignedEmployeeColumnDataChanges = function () {
        //return this.postgetaction<Observable<any>>(null, this.assignedEmployeeColumnDataUrl);
        return this.postaction({ Input: "{ FormId: " + this.assignedEmployeeListFormIdChange + " }" }, this.listFieldObjUrl);
    };
    /***********************************************************
     * Move Project Execution ,Request and Review Begin
     ***********************************************************/
    EmployeeService.prototype.getMoveProjectExecutionRequestFields = function () {
        return this.postaction({ Input: "{FormId:" + this.employeemoveProjectExecutionRequestFormId + ", ListLookupReportFieldIdValues: [{\"FieldId\":1870,\"ReportFieldId\":5854,\"Value\":\"5\"},{\"FieldId\":1870,\"ReportFieldId\":5875,\"Value\":\"17\"}]}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.submitMoveExecutionRequestDetails = function (target, strReportFieldIds, selectedId, moveProjectId) {
        return this.postaction({
            applnInput: "{ FormId: " + this.employeemoveProjectExecutionRequestFormId + ",ListReportFieldIdValues:" + strReportFieldIds + ",ParentFormId:" + (target == 1 ? this.MoveProjectListFormId : this.employeeMoveProjectRequestListFormId) + ",Id:" + moveProjectId + ",EntityId:" + selectedId + "}", PageTarget: target }, this.saveMoveProjectExecutionDetailsUrl);
    };
    EmployeeService.prototype.getActionPointUserLookupValues = function (outComeId, workTypeId, moduleId, entityCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.employeemoveProjectExecutionRequestFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\": 1419, \"Value\":" + outComeId + "},{\"ReportFieldId\": 5873, \"Value\":" + workTypeId + "},{\"ReportFieldId\": 271, \"Value\":" + moduleId + "},{\"ReportFieldId\": 6573, \"Value\":" + entityCategoryId + "},{\"ReportFieldId\": 5834, \"Value\":" + 0 + "}]}" }, this.getActionPointUserLookupUrl);
    };
    EmployeeService.prototype.getMoveProjectExecutionTaskListFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.employeeMoveProjectRequestListFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getMoveProjectExecutionTasksList = function (target, strReportFieldIds, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.employeeMoveProjectRequestListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + strReportFieldIds + "}", Target: target }, this.getMoveProjectExecutionTasksUrl);
    };
    EmployeeService.prototype.checkSubscribedFeature = function (featureCategoryIds) {
        return this.postaction({ Input: "{FormId:" + this.employeeMoveProjectRequestListFormId + "}", FeatureCategoryIds: featureCategoryIds }, this.subscribedFeatureUrl);
    };
    EmployeeService.prototype.getReviewMoveProjectExecutionData = function (selectedId, workTypeId, currentActionPointId) {
        return this.postaction({
            Input: "{FormId:" + this.reviewMoveProjectExecutionFormId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1255,\"ReportFieldId\":5832, \"Value\":" + workTypeId + " },{ \"FieldId\":1255,\"ReportFieldId\":5827, \"Value\":" + currentActionPointId + "},{ \"FieldId\":1255,\"ReportFieldId\":6553, \"Value\": 20},{ \"FieldId\":1255,\"ReportFieldId\":5826, \"Value\": 1},{ \"FieldId\":1870,\"ReportFieldId\":5854, \"Value\": 5},{ \"FieldId\":1870,\"ReportFieldId\":5875, \"Value\": 17}]" +
                ",ListReportFieldIdValues:[{\"ReportFieldId\":5832, \"Value\":" + workTypeId + " },{\"ReportFieldId\":5827, \"Value\":" + currentActionPointId + " },{\"ReportFieldId\":6553, \"Value\": 20},{\"ReportFieldId\":5826, \"Value\": 1},{\"ReportFieldId\":5854, \"Value\": 5},{\"ReportFieldId\":5875, \"Value\": 17}]}"
        }, this.getMoveProjectExecutionDataUrl);
    };
    /***********************************************************
    * Move Project Execution ,Request and Review End
    ***********************************************************/
    EmployeeService.prototype.getRecourcedatafieldsforemployeemove = function () {
        return this.postaction({ Input: "{ FormId: " + this.SelectEmployeeResourceFormove + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getRecourcedataforemployeemove = function (EmployeeId) {
        return this.postaction({ Input: "{FormId:" + this.SelectEmployeeResourceFormove + ",Id:0,ListReportFieldIdValues:[{\"ReportFieldId\":945, \"Value\":" + EmployeeId + " }]}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.submitmoveresourcedata = function (Details, id) {
        return this.postaction({ Input: "{FormId:" + this.SelectEmployeeResourceFormove + ",ListReportFieldIdValues: " + Details + ",Id:" + id + "}" }, this.MoveEmployeeResources);
    };
    EmployeeService.prototype.submitmoveresourcedataNew = function (Details, id) {
        return this.postaction({ Input: Details }, this.MoveEmployeeResourcesNew);
    };
    /*Scheduled Moves*/
    EmployeeService.prototype.getScheduledMoveRequestFields = function () {
        return this.postaction({ Input: "{FormId:351}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getScheduledMoveRequestLists = function (index, column, direction, DrawingId) {
        return this.postaction({ Input: "{ FormId: 351,SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + " ,ListReportFieldIdValues:[{\"ReportFieldId\":3059,\"Value\":\"" + DrawingId + "\"}]}" }, this.moveMoveProjectDetailsUrl);
    };
    /*Roll back Moves */
    EmployeeService.prototype.getRollbackMovesFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.rollbackMovesListFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getEmployeeMovesForRollBack = function (changedDay, pageIndex, sortCol, sortDir) {
        //   let rptFieldValues = "[{\"ReportFieldId\":271,\"Value\":\"" + changedDay + "\"}]";
        return this.postaction({ Input: "{FormId:" + this.rollbackMovesListFormId + ",SortColumn: '" + sortCol + "', SortDirection: '" + sortDir + "', PageIndex: " + pageIndex + " }", NoOfDays: changedDay }, this.getEmployeeMovesForRollBackUrl);
    };
    EmployeeService.prototype.checkEmployeeRollbackPossible = function (moveId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":7880,\"Value\":\"" + moveId + "\"}]}" }, this.checkEmployeeRollbackPossibleUrl);
    };
    EmployeeService.prototype.employeeMoveRollback = function (moveId, noOfDays, empId) {
        return this.postaction({ Input: "{Id:" + empId + ",ListReportFieldIdValues:[{\"ReportFieldId\":7880,\"Value\":\"" + moveId + "\"}]}", NoOfDays: noOfDays }, this.employeeMoveRollbackUrl);
    };
    EmployeeService.prototype.getEmployeeMovesForRollBackHistory = function (moveId, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":7880,\"Value\":\"" + moveId + "\"}]}" }, this.getEmployeeMovesForRollBackHistoryUrl);
    };
    /* Employee DashBoard */
    EmployeeService.prototype.getOrgOccupancyforDashBoard = function (SiteId, BuildingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":" + SiteId + " },{\"ReportFieldId\":487, \"Value\":" + BuildingId + " }]}" }, this.getOrganizationalOccupancyforDashBoard);
    };
    EmployeeService.prototype.getSpaceStandardOccupancy = function (SiteId, BuildingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":" + SiteId + " },{\"ReportFieldId\":487, \"Value\":" + BuildingId + " }]}" }, this.getSpaceStandardOccupancyforDashBoard);
    };
    EmployeeService.prototype.getBuildingOccupancyforDashBoard = function (SiteId, BuildingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":571, \"Value\":" + SiteId + " },{\"ReportFieldId\":487, \"Value\":" + BuildingId + " }]}" }, this.getBuildingOccupancyforDashboard);
    };
    EmployeeService.prototype.ddlLoadSite = function () {
        return this.postaction({ Input: "{ FormId:365,ListLookupReportFieldIdValues:[{ \"FieldId\":1302}]}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.GetOrganizationalStructure = function () {
        return this.postaction({ Input: "{}" }, this.getOrganizationalStructureforLookups);
    };
    EmployeeService.prototype.loadBuilding = function (siteid, parentId) {
        return this.postaction({ Input: "{FormId:" + this.EmployeeDashBoardFrm + ",Id:" + siteid + ",ParentFieldId:" + parentId + "}" }, this.lookupUrl);
    };
    EmployeeService.prototype.updateMultipleEmployeeData = function (strReportFieldIdValues, reportField, newValue, orgUnitId) {
        return this.postaction({ Input: "{FormId:" + this.allemployeeAddEditFormId + ",ListReportFieldIdValues:" + strReportFieldIdValues + "}", ReportField: reportField, NewValue: newValue, OrgUnitId: orgUnitId }, this.updateMultipleEmployeeDataUrl);
    };
    EmployeeService.prototype.getSeatingCapacityforOrgUnitTrendAnalysis = function (input) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + input + "}" }, this.getOrgUnitWiseSeatingCapacitiesforTrendAnalysis);
    };
    EmployeeService.prototype.getSpaceStandardTrendAnalysis = function (input) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + input + "}" }, this.getSpaceStandardWiseSeatingCapacitiesforTrendAnalysis);
    };
    EmployeeService.prototype.getSpaceStandardTrendFields = function () {
        return this.postaction({ Input: "{ FormId: 372}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getGradeTrendFields = function () {
        return this.postaction({ Input: "{ FormId: 383}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getGradeTrendAnalysis = function (input) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + input + "}" }, this.getGradeWiseSeatingCapacitiesforTrendAnalysis);
    };
    EmployeeService.prototype.loadTrendAnalysisDivisionWiseSeatingCapacitybyTime = function () {
        // return this.postaction({ Input: "{FormId:366" + ",ListReportFieldIdValues:" + JSON.stringify(reportFieldIdArray) + "}" }, this.listFieldObjUrl);
        var lookupRptField = "[{\"FieldId\":737,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":737,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":738,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":739,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":740,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":741,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        return this.postaction({ Input: "{ FormId:371" + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.loadTrendAnalysisRateofHiringbyTime = function () {
        // return this.postaction({ Input: "{FormId:366" + ",ListReportFieldIdValues:" + JSON.stringify(reportFieldIdArray) + "}" }, this.listFieldObjUrl);
        var lookupRptField = "[{\"FieldId\":395,\"ReportFieldId\": 289, \"Value\":\"1\" },{\"FieldId\":395,\"ReportFieldId\": 288, \"Value\":\"0\" },{\"FieldId\":399,\"ReportFieldId\": 289, \"Value\":\"2\" },{\"FieldId\":400,\"ReportFieldId\": 289, \"Value\":\"3\" },{\"FieldId\":487,\"ReportFieldId\": 289, \"Value\":\"4\" },{\"FieldId\":489,\"ReportFieldId\": 289, \"Value\":\"5\" }]";
        return this.postaction({ Input: "{ FormId:378" + ",ListLookupReportFieldIdValues:" + lookupRptField + "}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getRateofHiringbyTimeTrendAnalysis = function (input) {
        return this.postaction({ Input: "{ListReportFieldIdValues:" + input + "}" }, this.getRateofHiringbyTimeforTrendAnalysis);
    };
    EmployeeService.prototype.getEmployeeMoveRequestFields = function (workFlowCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.employeeMoveRequestFormId + ", ListLookupReportFieldIdValues: [{\"FieldId\":1870,\"ReportFieldId\":5854,\"Value\":\"5\"},{\"FieldId\":1870,\"ReportFieldId\":5875,\"Value\":\"" + workFlowCategoryId + "\"}]}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.saveEmployeeAssignthroughWorkflow = function (EmployeeIdsWithSpaceDetails, TargetDrawingId, DateToPerform, Comments, ReportFieldIdValues) {
        return this.postaction({ applnInput: "{FormId:" + this.employeeMoveRequestFormId + ", ListReportFieldIdValues: " + ReportFieldIdValues + "}", employeeAssignRequest: EmployeeIdsWithSpaceDetails, TargetDrawingId: TargetDrawingId, DateToPerform: DateToPerform, Comments: Comments }, this.SaveEmployeeAssignthroughWorkflow);
    };
    EmployeeService.prototype.saveEmployeeMovethroughWorkflow = function (EmployeeIdsWithSpaceDetails, DateToPerform, Comments, TargetDrawingId, ReportFieldIdValues) {
        return this.postaction({ applnInput: "{FormId:" + this.employeeMoveRequestFormId + ", ListReportFieldIdValues: " + ReportFieldIdValues + "}", employeeMoveRequest: EmployeeIdsWithSpaceDetails, TargetDrawingId: TargetDrawingId, DateToPerform: DateToPerform, Comments: Comments, CurrentDrawingId: TargetDrawingId }, this.SaveEmployeeMovethroughWorkflow);
    };
    EmployeeService.prototype.saveEmployeeResourcesthroughWorkflow = function (EmployeeObjects) {
        return this.postaction({ applnInput: "{FormId:" + this.employeeMoveRequestFormId + "}", data: EmployeeObjects }, this.SaveEmployeeResourcesthroughWorkflow);
    };
    /***********************************************************
     * Employee Move Request List and Review Begin
     ***********************************************************/
    EmployeeService.prototype.getEmployeeMoveRequestListFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.employeeMoveRequestListFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getEmployeeMoveRequestList = function (target, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.employeeMoveRequestListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.getReviewEmployeeMoveData = function (selectedId, workTypeId, currentActionPointId) {
        return this.postaction({
            Input: "{FormId:" + this.reviewEmployeeMoveFormId + ",Id:" + selectedId + ",ParentFormId:" + this.showDetailsReadOnlyListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1255,\"ReportFieldId\":5832, \"Value\":" + workTypeId + " },{ \"FieldId\":1255,\"ReportFieldId\":5827, \"Value\":" + currentActionPointId + "},{ \"FieldId\":1255,\"ReportFieldId\":6553, \"Value\": 11},{ \"FieldId\":1255,\"ReportFieldId\":5826, \"Value\": 1},{ \"FieldId\":1870,\"ReportFieldId\":5854, \"Value\": 5},{ \"FieldId\":1870,\"ReportFieldId\":5875, \"Value\": 7}]" +
                ",ListReportFieldIdValues:[{\"ReportFieldId\":7456, \"Value\":" + selectedId + " },{\"ReportFieldId\":5832, \"Value\":" + workTypeId + " },{\"ReportFieldId\":5827, \"Value\":" + currentActionPointId + " },{\"ReportFieldId\":6553, \"Value\": 9},{\"ReportFieldId\":5826, \"Value\": 1},{\"ReportFieldId\":5854, \"Value\": 5},{\"ReportFieldId\":5875, \"Value\": 7}]}", Target: 1
        }, this.getEmployeeMoveAssignApprovalRequestDataUrl);
    };
    EmployeeService.prototype.submitEmployeeMoveRequestDetails = function (strReportFieldIds, selectedId, strEmployeeDetails) {
        return this.postaction({
            applnInput: "{ FormId: " + this.reviewEmployeeMoveFormId + ",ListReportFieldIdValues:" + strReportFieldIds + ",ParentFormId:" + this.employeeMoveRequestListFormId + ",Id:" + selectedId + "}", employeeMoveRequest: strEmployeeDetails
        }, this.reviewEmployeeMovethroughWorkflowUrl);
    };
    EmployeeService.prototype.cancelReviewEmployeeMoveRequest = function (selectedId, employeeMoveId, employeeMoveNo, employeeId) {
        return this.postaction({
            Input: "{FormId:" + this.reviewEmployeeMoveFormId + ",Id:" + selectedId + "}", EmployeeMoveId: employeeMoveId, EmployeeMoveNo: employeeMoveNo, EmployeeId: employeeId, Target: 2
        }, this.cancelEmployeeMoveAssignRequestUrl);
    };
    /***********************************************************
     * Employee Move Request List and Review End
     ***********************************************************/
    /***********************************************************
     * Employee Assign Request List and Review Begin
     ***********************************************************/
    EmployeeService.prototype.getEmployeeAssignRequestListFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.employeeAssignRequestListFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getEmployeeAssignRequestList = function (target, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.employeeAssignRequestListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.getReviewEmployeeAssignData = function (selectedId, workTypeId, currentActionPointId) {
        return this.postaction({
            Input: "{FormId:" + this.reviewEmployeeMoveFormId + ",Id:" + selectedId + ",ParentFormId:" + this.showDetailsReadOnlyListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1255,\"ReportFieldId\":5832, \"Value\":" + workTypeId + " },{ \"FieldId\":1255,\"ReportFieldId\":5827, \"Value\":" + currentActionPointId + "},{ \"FieldId\":1255,\"ReportFieldId\":6553, \"Value\": 11},{ \"FieldId\":1255,\"ReportFieldId\":5826, \"Value\": 1},{ \"FieldId\":1870,\"ReportFieldId\":5854, \"Value\": 5},{ \"FieldId\":1870,\"ReportFieldId\":5875, \"Value\": 9}]" +
                ",ListReportFieldIdValues:[{\"ReportFieldId\":7854, \"Value\":" + selectedId + " },{\"ReportFieldId\":5832, \"Value\":" + workTypeId + " },{\"ReportFieldId\":5827, \"Value\":" + currentActionPointId + " },{\"ReportFieldId\":6553, \"Value\": 11},{\"ReportFieldId\":5826, \"Value\": 1},{\"ReportFieldId\":5854, \"Value\": 5},{\"ReportFieldId\":5875, \"Value\": 9}]}", Target: 2
        }, this.getEmployeeMoveAssignApprovalRequestDataUrl);
    };
    EmployeeService.prototype.submitEmployeeAssignRequestDetails = function (strReportFieldIds, selectedId, strEmployeeDetails) {
        return this.postaction({
            applnInput: "{ FormId: " + this.reviewEmployeeMoveFormId + ",ListReportFieldIdValues:" + strReportFieldIds + ",ParentFormId:" + this.employeeMoveRequestListFormId + ",Id:" + selectedId + "}", employeeMoveRequest: strEmployeeDetails
        }, this.reviewEmployeeAssignthroughWorkflowUrl);
    };
    EmployeeService.prototype.cancelReviewEmployeeAssignRequest = function (selectedId, employeeMoveId, employeeMoveNo, employeeId) {
        return this.postaction({
            Input: "{FormId:" + this.reviewEmployeeMoveFormId + ",Id:" + selectedId + "}", EmployeeMoveId: employeeMoveId, EmployeeMoveNo: employeeMoveNo, EmployeeId: employeeId, Target: 2
        }, this.cancelEmployeeMoveAssignRequestUrl);
    };
    /***********************************************************
     * Employee Assign Request List and Review End
     ***********************************************************/
    EmployeeService.prototype.ScaleEmployeefield = function () {
        return this.postaction({ Input: "{FormId:518}" }, this.listFieldObjUrl);
    };
    //this.listDataListUrl);
    EmployeeService.prototype.UpdateEmployeeScaleFactor = function (strRptFields) {
        return this.postaction({ Input: "{FormId:518" + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.UpdateEmployeeScaleFactorUrl);
    };
    EmployeeService.prototype.SpaceForSearchfield = function () {
        return this.postaction({ Input: "{FormId:" + this.SearchForSpaceFormId + ",ListLookupReportFieldIdValues: [{ \"FieldId\":2812,\"ReportFieldId\": 12097, \"Value\":4312 }]}" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.GetSpaceSearchResults = function (OccupiedValue, DrawingId, Query, IsVacant, IsUnderOccupied, IsOverOccupied, IsNominalOccupied) {
        return this.postaction({ Input: "{FormId:" + this.SearchForSpaceFormId + ",ListReportFieldIdValues:" + OccupiedValue + ",ListFilterIdValues: " + Query + ",IsKeywordSearch:0" + ",IsAdvancedSearch:1}", DrawingId: DrawingId, IsVacant: IsVacant, IsUnderOccupied: IsUnderOccupied, IsOverOccupied: IsOverOccupied, IsNominalOccupied: IsNominalOccupied }, this.GetSpaceSearchResultsUrl);
    };
    EmployeeService.prototype.DeleteEmpMoveDetails = function (selEmpId, moveId) {
        var strReportFieldIds = " [{\"ReportFieldId\":7454,\"Value\":\"" + moveId + "\"}]";
        return this.postaction({ Input: "{FormId:" + this.showDetailsReadOnlyListFormId + ",Id:" + selEmpId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.deleteEMPMoveDtls);
    };
    EmployeeService.prototype.deleteEmpMoveResourceDetails = function (selEmpId, resourceId) {
        var strReportFieldIds = "[{\"ReportFieldId\":7453,\"Value\":\"" + resourceId + "\"}]";
        return this.postaction({ Input: "{FormId:" + this.showDetailsReadOnlyListFormId + ",Id:" + selEmpId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.deleteEMPMoveResrcDetls);
    };
    EmployeeService.prototype.getReviewMOveResourceColumns = function () {
        return this.postaction({ Input: "{ FormId: " + this.reviewMoveEMPResourceFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getReviewMoveResourceListData = function (pageIndex, sortCol, sortDir, moveReqId, SelEmpId) {
        var strReportFieldIds = "[{\"ReportFieldId\":7392,\"Value\":\"" + SelEmpId + "\"}]";
        return this.postaction({ Input: "{ FormId: " + this.reviewMoveEMPResourceFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",Id:" + moveReqId + ",ListReportFieldIdValues:" + strReportFieldIds + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.getEmpWorkflowHistoryColumns = function () {
        return this.postaction({ Input: "{ FormId: " + this.empReviewHistoryFrmId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getEmpWorkflowHistoryListData = function (pageIndex, sortCol, sortDir, WorkFlowEntityId) {
        return this.postaction({ Input: "{ FormId: " + this.empReviewHistoryFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",Id:" + WorkFlowEntityId + "}" }, this.listDataListUrl);
    };
    /* Employee To Work Order User */
    EmployeeService.prototype.getEmployeeToWorkOrderUserFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.employeeToWorkOrderUserFormId + " }" }, this.listFieldObjUrl);
    };
    EmployeeService.prototype.getEmployeeToWorkOrderUserList = function (pageIndex, sortCol, sortDir, keyworsearch, value, IsKeyword, IsAdvance) {
        return this.postaction({ Input: "{ FormId: " + this.employeeToWorkOrderUserFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "', Filter: '" + keyworsearch + "', ListFilterIdValues: " + value + ", IsKeywordSearch: " + IsKeyword + ", IsAdvancedSearch:" + IsAdvance + "}" }, this.listDataListUrl);
    };
    EmployeeService.prototype.getKeywordSearchField = function (formId) {
        return this.postaction({ Input: "{FormId:" + formId + "}" }, this.keywordLookUpUrl);
    };
    EmployeeService.prototype.postSubmitEmployeeToWorkOrderUser = function (selectedIds) {
        return this.postaction({ Input: "{ FormId:" + this.employeeToWorkOrderUserFormId + ",ListReportFieldIdValues:" + selectedIds + "}" }, this.createEmployeeToWorkOrderUserUrl);
    };
    EmployeeService.prototype.getAssignOrMoveEmpFields = function (formId, fieldObj) {
        return this.postaction({ Input: "{ FormId:" + formId + ",ListLookupReportFieldIdValues:" + JSON.stringify(fieldObj) + "}" }, this.addDataUrl);
    };
    EmployeeService.prototype.loadAssignOrMoveEmpLookups = function (formId, id, parentId, fieldobj) {
        return this.postaction({ Input: "{FormId:" + formId + ",Id:" + id + ",ParentFieldId:" + parentId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.lookupUrl);
    };
    EmployeeService.prototype.getDrawingDetails = function (drawingId, isBuilding) {
        if (isBuilding == undefined || isBuilding == null)
            isBuilding = false;
        return this.postaction({ Input: "{ EntityId:" + drawingId + ",ListReportFieldIdValues:[{\"ReportFieldId\":4308,\"Value\":\"" + isBuilding + "\"}]}" }, this.drawinDetailsUrl);
    };
    EmployeeService.prototype.insertMultipleSpaceAllotmentDetails = function (empDetails) {
        return this.postaction({ Input: JSON.stringify(empDetails) }, this.insertMultipleSpaceAllotmentDetailsUrl);
    };
    EmployeeService.prototype.checkSpaceEmployeeOccupancy = function (spaceId, empDetails) {
        var reptFieldValues = '';
        for (var i = 0; i < empDetails.length; i++) {
            reptFieldValues += "{\"ReportFieldId\":945, \"Value\":" + empDetails[i]['Id'] + " },";
        }
        return this.postaction({
            Input: "{ListReportFieldIdValues:[" + reptFieldValues + "{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this.checkSpaceEmployeeOccupancyUrl);
    };
    EmployeeService.prototype.checkResourceExistForEmployees = function (empDetails) {
        var reptFieldValues = '';
        for (var i = 0; i < empDetails.length; i++) {
            reptFieldValues += "{\"ReportFieldId\":945, \"Value\":" + empDetails[i]['Id'] + " },";
        }
        reptFieldValues = reptFieldValues.substring(0, reptFieldValues.length - 1);
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + reptFieldValues + "]}" }, this.checkResourceExistForEmployeesUrl);
    };
    EmployeeService.prototype.getEmployeeSheduledToMove = function (empDetails) {
        var reptFieldValues = '';
        for (var i = 0; i < empDetails.length; i++) {
            reptFieldValues += "{\"ReportFieldId\":7392 , \"Value\":" + empDetails[i]['Id'] + " },";
        }
        reptFieldValues = reptFieldValues.substring(0, reptFieldValues.length - 1);
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + reptFieldValues + "]}" }, this.getEmployeeSheduledToMoveUrl);
    };
    EmployeeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EmployeeService);
    return EmployeeService;
}(HttpHelpers_1.HttpHelpers));
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.services.js.map
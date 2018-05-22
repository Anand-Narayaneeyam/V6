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
var EmployeeDrawingService = (function (_super) {
    __extends(EmployeeDrawingService, _super);
    function EmployeeDrawingService() {
        _super.apply(this, arguments);
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.customerFeatures = 'Common/GetSubscribedFeatures';
        this.allEmployeeDataUrl = 'EmployeeDrawing/GetAllEmployeeDetails';
        this._displaySetingsDataUrl = 'Common/GetDisplaySettingData';
        this._getSpaceHandleForDistributionUrl = 'EmployeeDrawing/GetSpaceHandleForDistribution';
        this._getGetColorPreferencesUrl = 'EmployeeDrawing/GetColorPreferences';
        this._getSpaceStandardCapacityLegendForDrawingUrl = 'EmployeeDrawing/GetSpaceStandardCapacityLegendForDrawing';
        this.getEmployeeAssignRequestStatusUrl = 'EmployeeDrawing/GetEmployeeAssignRequestStatus';
        this._getUserEditableOrgUnitsUrl = 'SpaceDrawing/GetUserEditableOrgUnits';
        this.getSpaceEmployeeOccupancyUrl = 'EmployeeDrawing/GetSpaceEmployeeOccupancy';
        this.checkEmployeeAssignPossibleUrl = 'EmployeeDrawing/CheckEmployeeAssignPossible';
        this.insertSpaceAllotmentDetailsUrl = 'Employee/InsertSpaceAllotmentDetails';
        this.getEmployeeSheduledToMoveUrl = 'EmployeeDrawing/GetEmployeeSheduledToMove';
        this.getEmployeeMoveRequestStatusUrl = 'EmployeeDrawing/GetEmployeeMoveRequestStatus';
        this.cancelEmployeeMoveRequestUrl = 'EmployeeDrawing/CancelEmployeeMoveRequest';
        this.deAssignEmployeeUrl = 'EmployeeDrawing/DeAssignEmployee';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.isFieldSubscribedUrl = 'Common/IsFieldSubscribed';
        this._checkEditPrivilageExistUrl = 'Space/CheckEditPrivilageExist';
        this.getIsModuleAdminUrl = 'Common/IsModuleAdmin';
        this._checkUserEditableOrgUnitsUrl = 'Employee/CheckUserEditableOrgUnits';
        this._getSacaleFactor = 'EmployeeDrawing/GetDrawingScaleFactor';
        this._getTotalizeSpaceStandardCapacityForSelectedUrl = 'EmployeeDrawing/GetTotalizeSpaceStandardCapacityForSelected';
        this.scenarioEmpDetails = 'EmployeeDrawing/GetAllScenarioDrawingEmployeeDetails';
        this.scenarioDwgIdUrl = 'EmployeeDrawing/GetScenarioDrawingId';
        this.saveScenarioUrl = 'EmployeeDrawing/AddUpdateEmployeeToScenario';
        this.insertMultipleSpaceAllotmentDetailsUrl = 'Employee/InsertMultipleSpaceAllotmentDetails';
        this.checkResourceExistForEmployeesUrl = 'EmployeeDrawing/CheckResourceExistForEmployees';
        this.getAllEmployeeDetailsForRelinkUrl = 'EmployeeDrawing/GetAllEmployeeDetailsForRelink';
        this.checkEmployeeStatusURL = 'Employee/CheckEmployee';
        this.SuperVisorCountURL = 'Employee/GetEmployeeSuperVisorCount';
    }
    EmployeeDrawingService.prototype.getAllEmployeeDetails = function (DrawingId, DrawingIds, AssignmentStatus) {
        return this.postaction({ Input: "{ FormId: 0}", DrawingId: DrawingId.toString(), DrawingIds: DrawingIds, AssignmentStatus: AssignmentStatus.toString() }, this.allEmployeeDataUrl);
        //return '{[{"RowIndex":1,"Id",234,"CustomerId":1,"DesignationId":355,"OrgUnitID":177,"AssignedSpaceId":86,"AssignedDrawingId":5,"XPosition":2965.03,"YPosition":1635.28}]}';
    };
    EmployeeDrawingService.prototype.getEmployeeDisplaySettingsData = function (categoryId, addtlDataFieldCategoryId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"" + categoryId + "\"},{\"ReportFieldId\":24,\"Value\":\"" + addtlDataFieldCategoryId + "\"}]}" }, this._displaySetingsDataUrl);
    };
    EmployeeDrawingService.prototype.getOccupancyDistributionMapData = function (distributionBy, drawingId) {
        return this.postaction({ Input: "{ FormId: 0 }", DrawingId: drawingId.toString(), DistributionBy: distributionBy.toString() }, this._getSpaceHandleForDistributionUrl);
    };
    EmployeeDrawingService.prototype.getColorHatchPreferences = function () {
        return this.postaction({ Input: "{ FormId: 0 }" }, this._getGetColorPreferencesUrl);
    };
    EmployeeDrawingService.prototype.getSpaceStandardCapacityLegendForDrawing = function (drawingId, ruleId, proposedAssignCount) {
        return this.postaction({ Input: "{ FormId: 0 }", DrawingId: drawingId, RuleId: ruleId, ProposedAssignCount: proposedAssignCount }, this._getSpaceStandardCapacityLegendForDrawingUrl);
    };
    EmployeeDrawingService.prototype.getEmployeeAssignRequestStatus = function (empId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":7845,\"Value\":\"" + empId + "\"}]}" }, this.getEmployeeAssignRequestStatusUrl);
    };
    EmployeeDrawingService.prototype.getUserEditableOrgUnits = function (drawingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this._getUserEditableOrgUnitsUrl);
    };
    EmployeeDrawingService.prototype.getSpaceEmployeeOccupancy = function (spaceId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this.getSpaceEmployeeOccupancyUrl);
    };
    EmployeeDrawingService.prototype.getCustomerSubscribedFeatures = function (feaureIds) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerFeatures);
    };
    EmployeeDrawingService.prototype.checkEmployeeAssignPossible = function (empId, spaceId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":866,\"Value\":\"" + empId + "\"},{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this.checkEmployeeAssignPossibleUrl);
    };
    EmployeeDrawingService.prototype.isFieldSubscribed = function (fieldSubscriptionCategoryId, reportFieldId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":5074,\"Value\":\"" + fieldSubscriptionCategoryId + "\"},{\"ReportFieldId\":5075,\"Value\":\"" + reportFieldId + "\"}]}" }, this.isFieldSubscribedUrl);
    };
    EmployeeDrawingService.prototype.insertSpaceAllotmentDetails = function (employeeId, spaceId, drawingId, xPosition, yPosition) {
        return this.postaction({ applnInput: "{ListReportFieldIdValues:[{\"ReportFieldId\":7881,\"Value\":\"" + employeeId + "\"},{\"ReportFieldId\":946,\"Value\":\"" + spaceId + "\"},{\"ReportFieldId\":947,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":948,\"Value\":\"" + xPosition + "\"},{\"ReportFieldId\":949,\"Value\":\"" + yPosition + "\"}]}" }, this.insertSpaceAllotmentDetailsUrl);
    };
    EmployeeDrawingService.prototype.deAssignEmployee = function (empId) {
        return this.postaction({ Input: "{ FormId: 0 }", EmployeeID: empId }, this.deAssignEmployeeUrl);
    };
    EmployeeDrawingService.prototype.deleteEmployee = function (selectedID) {
        console.log('entered delete service');
        return this.postaction({ Input: "{FormId:140,Id:" + selectedID + "}" }, this.deleteUrl);
    };
    EmployeeDrawingService.prototype.checkEmployeeStatus = function (id) {
        return this.postaction({ input: "{Id:" + id + "}" }, this.checkEmployeeStatusURL);
    };
    EmployeeDrawingService.prototype.getSupervisorCount = function (id) {
        return this.postaction({ Input: "{Id:" + id + "}" }, this.SuperVisorCountURL);
    };
    EmployeeDrawingService.prototype.getEmployeeSheduledToMove = function (empId) {
        return this.postaction({ Input: "{ EntityId:" + empId + " }" }, this.getEmployeeSheduledToMoveUrl);
    };
    EmployeeDrawingService.prototype.getEmployeeMoveRequestStatus = function (empId) {
        return this.postaction({ Input: "{ EntityId:" + empId + " }" }, this.getEmployeeMoveRequestStatusUrl);
    };
    EmployeeDrawingService.prototype.cancelEmployeeMoveRequest = function (moveId, moveNo, employeeId) {
        return this.postaction({ Input: "{ FormId: 0 }", EmployeeMoveId: moveId, EmployeeMoveNo: moveNo, EmployeeId: employeeId }, this.cancelEmployeeMoveRequestUrl);
    };
    EmployeeDrawingService.prototype.checkEditPrivilageExist = function (spaceId) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this._checkEditPrivilageExistUrl);
    };
    EmployeeDrawingService.prototype.getIsModuleAdmin = function (moduleId) {
        return this.postaction({
            input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}"
        }, this.getIsModuleAdminUrl);
    };
    EmployeeDrawingService.prototype.checkUserEditableOrgUnits = function (drawingId) {
        return this.postaction({ applnInput: "{ListReportFieldIdValues:[{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this._checkUserEditableOrgUnitsUrl);
    };
    EmployeeDrawingService.prototype.getDrawingScaleFactor = function (drawingId, moduleId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":615,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":616,\"Value\":\"" + moduleId + "\"}]}" }, this._getSacaleFactor);
    };
    EmployeeDrawingService.prototype.getTotalizeSpaceStandardCapacityForSelected = function (drawingId, spaceIds) {
        return this.postaction({ Input: "{ FormId: 0 }", DrawingId: drawingId, RuleId: 0, ProposedAssignCount: 0, SpaceIds: spaceIds }, this._getTotalizeSpaceStandardCapacityForSelectedUrl);
    };
    EmployeeDrawingService.prototype.getScenarioEmployeeDtls = function (DrawingId, ForAssignment) {
        return this.postaction({ Input: "{ FormId: 0}", DrawingId: DrawingId, ForAssignment: ForAssignment }, this.scenarioEmpDetails);
    };
    EmployeeDrawingService.prototype.saveScenario = function (empdata) {
        return this.postaction({ Input: empdata }, this.saveScenarioUrl);
    };
    EmployeeDrawingService.prototype.insertMultipleSpaceAllotmentDetails = function (empDetails) {
        return this.postaction({ Input: JSON.stringify(empDetails) }, this.insertMultipleSpaceAllotmentDetailsUrl);
    };
    EmployeeDrawingService.prototype.checkResourceExistForEmployees = function (empDetails) {
        var reptFieldValues = '';
        for (var i = 0; i < empDetails.length; i++) {
            reptFieldValues += "{\"ReportFieldId\":945, \"Value\":" + empDetails[i]['Id'] + " },";
        }
        reptFieldValues = reptFieldValues.substring(0, reptFieldValues.length - 1);
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + reptFieldValues + "]}" }, this.checkResourceExistForEmployeesUrl);
    };
    EmployeeDrawingService.prototype.getRelinkEmployeeData = function (drawingid, index, column, direction) {
        var reptFieldValues = "{\"ReportFieldId\":947, \"Value\":" + drawingid + " }";
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + reptFieldValues + "],SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" }, this.getAllEmployeeDetailsForRelinkUrl);
    };
    EmployeeDrawingService.prototype.getRelinkEmployeeField = function () {
        return this.postaction({ Input: "{ FormId: 556 }" }, this.listFieldObjUrl);
    };
    EmployeeDrawingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], EmployeeDrawingService);
    return EmployeeDrawingService;
}(HttpHelpers_1.HttpHelpers));
exports.EmployeeDrawingService = EmployeeDrawingService;
//# sourceMappingURL=employeedrawing.services.js.map
import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from '../../Framework/Models//Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class EmployeeDrawingService extends HttpHelpers {
    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private customerFeatures = 'Common/GetSubscribedFeatures';
    allEmployeeDataUrl = 'EmployeeDrawing/GetAllEmployeeDetails';
    _displaySetingsDataUrl = 'Common/GetDisplaySettingData';
    private _getSpaceHandleForDistributionUrl = 'EmployeeDrawing/GetSpaceHandleForDistribution';
    private _getGetColorPreferencesUrl = 'EmployeeDrawing/GetColorPreferences';
    private _getSpaceStandardCapacityLegendForDrawingUrl = 'EmployeeDrawing/GetSpaceStandardCapacityLegendForDrawing';
    private getEmployeeAssignRequestStatusUrl = 'EmployeeDrawing/GetEmployeeAssignRequestStatus';
    private _getUserEditableOrgUnitsUrl = 'SpaceDrawing/GetUserEditableOrgUnits';
    private getSpaceEmployeeOccupancyUrl = 'EmployeeDrawing/GetSpaceEmployeeOccupancy';
    private checkEmployeeAssignPossibleUrl = 'EmployeeDrawing/CheckEmployeeAssignPossible'
    private insertSpaceAllotmentDetailsUrl = 'Employee/InsertSpaceAllotmentDetails';
    private getEmployeeSheduledToMoveUrl = 'EmployeeDrawing/GetEmployeeSheduledToMove';
    private getEmployeeMoveRequestStatusUrl = 'EmployeeDrawing/GetEmployeeMoveRequestStatus';
    private cancelEmployeeMoveRequestUrl = 'EmployeeDrawing/CancelEmployeeMoveRequest';
    private deAssignEmployeeUrl = 'EmployeeDrawing/DeAssignEmployee';
    private deleteUrl = 'Common/DeleteAppFormData';
    private isFieldSubscribedUrl = 'Common/IsFieldSubscribed'
    private _checkEditPrivilageExistUrl = 'Space/CheckEditPrivilageExist';
    private getIsModuleAdminUrl = 'Common/IsModuleAdmin';
    private _checkUserEditableOrgUnitsUrl = 'Employee/CheckUserEditableOrgUnits';
    private _getSacaleFactor = 'EmployeeDrawing/GetDrawingScaleFactor';
    private _getTotalizeSpaceStandardCapacityForSelectedUrl = 'EmployeeDrawing/GetTotalizeSpaceStandardCapacityForSelected';
    private scenarioEmpDetails = 'EmployeeDrawing/GetAllScenarioDrawingEmployeeDetails';
    private scenarioDwgIdUrl = 'EmployeeDrawing/GetScenarioDrawingId';
    private saveScenarioUrl = 'EmployeeDrawing/AddUpdateEmployeeToScenario';
    private insertMultipleSpaceAllotmentDetailsUrl = 'Employee/InsertMultipleSpaceAllotmentDetails';
    private checkResourceExistForEmployeesUrl = 'EmployeeDrawing/CheckResourceExistForEmployees';
    private getAllEmployeeDetailsForRelinkUrl = 'EmployeeDrawing/GetAllEmployeeDetailsForRelink';
    private checkEmployeeStatusURL = 'Employee/CheckEmployee';
    private SuperVisorCountURL = 'Employee/GetEmployeeSuperVisorCount';



    getAllEmployeeDetails(DrawingId: number, DrawingIds: string, AssignmentStatus: number) {
        return this.postaction({ Input: "{ FormId: 0}", DrawingId: DrawingId.toString(), DrawingIds: DrawingIds, AssignmentStatus: AssignmentStatus.toString() }, this.allEmployeeDataUrl);

        //return '{[{"RowIndex":1,"Id",234,"CustomerId":1,"DesignationId":355,"OrgUnitID":177,"AssignedSpaceId":86,"AssignedDrawingId":5,"XPosition":2965.03,"YPosition":1635.28}]}';
    }
    getEmployeeDisplaySettingsData(categoryId: number, addtlDataFieldCategoryId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"" + categoryId + "\"},{\"ReportFieldId\":24,\"Value\":\"" + addtlDataFieldCategoryId + "\"}]}" }, this._displaySetingsDataUrl);
    }
    getOccupancyDistributionMapData(distributionBy: number, drawingId: number) {
        return this.postaction({ Input: "{ FormId: 0 }", DrawingId: drawingId.toString(), DistributionBy: distributionBy.toString() }, this._getSpaceHandleForDistributionUrl);
    }
    getColorHatchPreferences() {
        return this.postaction({ Input: "{ FormId: 0 }" }, this._getGetColorPreferencesUrl);
    }
    getSpaceStandardCapacityLegendForDrawing(drawingId: number, ruleId: number, proposedAssignCount: number) {
        return this.postaction({ Input: "{ FormId: 0 }", DrawingId: drawingId, RuleId: ruleId, ProposedAssignCount: proposedAssignCount }, this._getSpaceStandardCapacityLegendForDrawingUrl);
    }
    getEmployeeAssignRequestStatus(empId: number) {
        return this.postaction({Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":7845,\"Value\":\"" + empId + "\"}]}"}, this.getEmployeeAssignRequestStatusUrl);
    }
    getUserEditableOrgUnits(drawingId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this._getUserEditableOrgUnitsUrl);
    }
    getSpaceEmployeeOccupancy(spaceId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this.getSpaceEmployeeOccupancyUrl);
    }
    getCustomerSubscribedFeatures(feaureIds: string) {
        return this.postaction({ input: "{Id:0}", FeatureCategoryIds: feaureIds }, this.customerFeatures);
    }
    checkEmployeeAssignPossible(empId: number,spaceId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":866,\"Value\":\"" + empId + "\"},{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this.checkEmployeeAssignPossibleUrl);
    }
    isFieldSubscribed(fieldSubscriptionCategoryId: number, reportFieldId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":5074,\"Value\":\"" + fieldSubscriptionCategoryId + "\"},{\"ReportFieldId\":5075,\"Value\":\"" + reportFieldId + "\"}]}" }, this.isFieldSubscribedUrl);
    }
    insertSpaceAllotmentDetails(employeeId: number, spaceId: number, drawingId: number, xPosition: number, yPosition: number) {
        return this.postaction({ applnInput: "{ListReportFieldIdValues:[{\"ReportFieldId\":7881,\"Value\":\"" + employeeId + "\"},{\"ReportFieldId\":946,\"Value\":\"" + spaceId + "\"},{\"ReportFieldId\":947,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":948,\"Value\":\"" + xPosition + "\"},{\"ReportFieldId\":949,\"Value\":\"" + yPosition + "\"}]}" }, this.insertSpaceAllotmentDetailsUrl);
    }
    deAssignEmployee(empId: number) {
        return this.postaction({ Input: "{ FormId: 0 }", EmployeeID: empId }, this.deAssignEmployeeUrl);
    }
    deleteEmployee(selectedID: any) {
        console.log('entered delete service')
        return this.postaction({ Input: "{FormId:140,Id:" + selectedID + "}" }, this.deleteUrl)
    }
    checkEmployeeStatus(id) {
        return this.postaction({ input: "{Id:" + id + "}" }, this.checkEmployeeStatusURL)
    }
    getSupervisorCount(id) {

        return this.postaction({ Input: "{Id:" + id + "}" }, this.SuperVisorCountURL)

    }
    getEmployeeSheduledToMove(empId: number) {
        return this.postaction({ Input: "{ EntityId:" + empId+" }" }, this.getEmployeeSheduledToMoveUrl);
    }
    getEmployeeMoveRequestStatus(empId: number) {
        return this.postaction({ Input: "{ EntityId:" + empId + " }" }, this.getEmployeeMoveRequestStatusUrl);
    }
    cancelEmployeeMoveRequest(moveId: any, moveNo: any, employeeId: number) {
        return this.postaction({ Input: "{ FormId: 0 }", EmployeeMoveId: moveId, EmployeeMoveNo: moveNo, EmployeeId: employeeId }, this.cancelEmployeeMoveRequestUrl);
    }
    checkEditPrivilageExist(spaceId: number) {
        return this.postaction({ input: "{ListReportFieldIdValues:[{\"ReportFieldId\":780,\"Value\":\"" + spaceId + "\"}]}" }, this._checkEditPrivilageExistUrl);
    }
    getIsModuleAdmin(moduleId: number) {
        return this.postaction({
            input: "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + moduleId + "\"}]}"
        }, this.getIsModuleAdminUrl);
    }
    checkUserEditableOrgUnits(drawingId) {
        return this.postaction({ applnInput: "{ListReportFieldIdValues:[{\"ReportFieldId\":781,\"Value\":\"" + drawingId + "\"}]}" }, this._checkUserEditableOrgUnitsUrl);
    }
    getDrawingScaleFactor(drawingId: number,moduleId: number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":615,\"Value\":\"" + drawingId + "\"},{\"ReportFieldId\":616,\"Value\":\"" + moduleId + "\"}]}" }, this._getSacaleFactor);
    }
    getTotalizeSpaceStandardCapacityForSelected(drawingId: number, spaceIds: any[]) {
        return this.postaction({ Input: "{ FormId: 0 }", DrawingId: drawingId, RuleId: 0, ProposedAssignCount: 0, SpaceIds: spaceIds }, this._getTotalizeSpaceStandardCapacityForSelectedUrl);
    }


    getScenarioEmployeeDtls(DrawingId: number, ForAssignment: boolean) {
        return this.postaction({ Input: "{ FormId: 0}", DrawingId: DrawingId, ForAssignment: ForAssignment }, this.scenarioEmpDetails);            
    }
    saveScenario(empdata: string) {
        return this.postaction({ Input: empdata }, this.saveScenarioUrl);            
    }
    insertMultipleSpaceAllotmentDetails(empDetails: any) {
        return this.postaction({ Input: JSON.stringify(empDetails) }, this.insertMultipleSpaceAllotmentDetailsUrl);
    }
    checkResourceExistForEmployees(empDetails: any) {
        var reptFieldValues: string = '';
        for (var i = 0; i < empDetails.length; i++) {
            reptFieldValues += "{\"ReportFieldId\":945, \"Value\":" + empDetails[i]['Id'] + " },";
        }
        reptFieldValues = reptFieldValues.substring(0, reptFieldValues.length - 1);
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + reptFieldValues + "]}" }, this.checkResourceExistForEmployeesUrl);
    }
    getRelinkEmployeeData(drawingid: any, index: number, column: any, direction: any) {
        var reptFieldValues = "{\"ReportFieldId\":947, \"Value\":" + drawingid + " }"
        return this.postaction({ Input: "{ListReportFieldIdValues:[" + reptFieldValues + "],SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + "}" }, this.getAllEmployeeDetailsForRelinkUrl);
    }
    getRelinkEmployeeField() {
        return this.postaction({ Input: "{ FormId: 556 }" }, this.listFieldObjUrl);
    }
}

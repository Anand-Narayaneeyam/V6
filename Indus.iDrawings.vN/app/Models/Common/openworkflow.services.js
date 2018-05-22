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
var OpenWorkflowServices = (function (_super) {
    __extends(OpenWorkflowServices, _super);
    function OpenWorkflowServices(http) {
        _super.call(this, http);
        this.http = http;
        this.getFlowChartDataUrl = 'WorkFlow/GetFlowChartData';
        this.saveFlowchartFileUrl = 'WorkFlow/SaveFlowchartFile';
        this.updateWorkFlowActionPointOutcomeUrl = 'WorkFlow/UpdateWorkFlowActionPointOutcome';
        this.deleteWorkflowActionPointWithNoFromWorkflowUrl = 'WorkFlow/DeleteWorkflowActionPointWithNoFromWorkflow';
        this.checkFlowchartFileExistUrl = 'WorkFlow/CheckFlowchartFileExist';
        this.getWorkflowIsEditableForWorktypeUrl = 'WorkFlow/GetWorkflowIsEditableForWorktype';
    }
    OpenWorkflowServices.prototype.getActionPointAndOutcomes = function (workTypeId, revisionNo, workflowActionPointId) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"},{\"ReportFieldId\":5829,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":5827,\"Value\":\"" + workflowActionPointId + "\"}]}" }, this.getFlowChartDataUrl);
    };
    OpenWorkflowServices.prototype.saveFlowchartFile = function (xmlString, workTypeId, workflowCategoryId) {
        return this.postaction({ strXml: xmlString, workTypeId: workTypeId, workflowEntityCategoryId: workflowCategoryId }, this.saveFlowchartFileUrl);
    };
    OpenWorkflowServices.prototype.updateWorkFlowActionPointOutcome = function (worktypeId, outcomeId, workFlowActionPointId, outcomeText, outcomeTypeId, description, nextWorkFlowActionPointId, entityCategoryId, isNotifyRequestor, userId) {
        return this.postaction({ applnInput: "{Id:" + outcomeId + ",ListReportFieldIdValues:[{\"ReportFieldId\":5832,\"Value\":\"" + worktypeId + "\"},{\"ReportFieldId\":6553,\"Value\":\"0\"},{\"ReportFieldId\":5826,\"Value\":\"0\"},{\"ReportFieldId\":5827,\"Value\":\"" + workFlowActionPointId + "\"},{\"ReportFieldId\":5836,\"Value\":\"" + outcomeText + "\"},{\"ReportFieldId\":5837,\"Value\":\"" + outcomeTypeId + "\"},{\"ReportFieldId\":5839,\"Value\":\"" + description + "\"},{\"ReportFieldId\":5840,\"Value\":\"" + nextWorkFlowActionPointId + "\"},{\"ReportFieldId\":6557,\"Value\":\"" + entityCategoryId + "\"},{\"ReportFieldId\":12048,\"Value\":\"" + isNotifyRequestor + "\"},{\"ReportFieldId\":5809,\"Value\":\"" + userId + "\"}]}" }, this.updateWorkFlowActionPointOutcomeUrl);
    };
    OpenWorkflowServices.prototype.deleteWorkflowActionPointWithNoFromWorkflow = function (workTypeId, revisionNo, actionPointNos) {
        return this.postaction({ applnInput: "{ListReportFieldIdValues:[{\"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"},{\"ReportFieldId\":5829,\"Value\":\"" + revisionNo + "\"}]}", arrActionPointNo: actionPointNos }, this.deleteWorkflowActionPointWithNoFromWorkflowUrl);
    };
    OpenWorkflowServices.prototype.getWorkflowIsEditableForWorktype = function (workTypeId) {
        return this.postaction({ applnInput: "{Id:" + workTypeId + "}" }, this.getWorkflowIsEditableForWorktypeUrl);
    };
    OpenWorkflowServices.prototype.checkFlowchartFileExist = function (workTypeId, workflowCategoryId) {
        return this.postaction({ workTypeId: workTypeId, workflowEntityCategoryId: workflowCategoryId }, this.checkFlowchartFileExistUrl);
    };
    OpenWorkflowServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OpenWorkflowServices);
    return OpenWorkflowServices;
}(HttpHelpers_1.HttpHelpers));
exports.OpenWorkflowServices = OpenWorkflowServices;
//# sourceMappingURL=openworkflow.services.js.map
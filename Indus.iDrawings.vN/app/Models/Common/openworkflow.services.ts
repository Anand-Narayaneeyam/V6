import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from  '../../Framework/Models/Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class OpenWorkflowServices extends HttpHelpers {

    private getFlowChartDataUrl = 'WorkFlow/GetFlowChartData';
    private saveFlowchartFileUrl = 'WorkFlow/SaveFlowchartFile';
    private updateWorkFlowActionPointOutcomeUrl = 'WorkFlow/UpdateWorkFlowActionPointOutcome';
    private deleteWorkflowActionPointWithNoFromWorkflowUrl = 'WorkFlow/DeleteWorkflowActionPointWithNoFromWorkflow';
    private checkFlowchartFileExistUrl = 'WorkFlow/CheckFlowchartFileExist';
    private getWorkflowIsEditableForWorktypeUrl = 'WorkFlow/GetWorkflowIsEditableForWorktype';

    
    constructor(private http: Http) {
        super(http);
    }



    getActionPointAndOutcomes(workTypeId: number, revisionNo: number, workflowActionPointId : number) {
        return this.postaction({ Input: "{ListReportFieldIdValues:[{\"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"},{\"ReportFieldId\":5829,\"Value\":\"" + revisionNo + "\"},{\"ReportFieldId\":5827,\"Value\":\"" + workflowActionPointId + "\"}]}" }, this.getFlowChartDataUrl);
    }
    saveFlowchartFile(xmlString: string, workTypeId: number, workflowCategoryId: number) {
        return this.postaction({ strXml: xmlString, workTypeId: workTypeId, workflowEntityCategoryId: workflowCategoryId }, this.saveFlowchartFileUrl)
    }
    updateWorkFlowActionPointOutcome(worktypeId:number, outcomeId: number, workFlowActionPointId: number, outcomeText: string, outcomeTypeId: number, description: string, nextWorkFlowActionPointId: number, entityCategoryId: number, isNotifyRequestor: boolean, userId: number) {
        return this.postaction({ applnInput: "{Id:" + outcomeId + ",ListReportFieldIdValues:[{\"ReportFieldId\":5832,\"Value\":\"" + worktypeId + "\"},{\"ReportFieldId\":6553,\"Value\":\"0\"},{\"ReportFieldId\":5826,\"Value\":\"0\"},{\"ReportFieldId\":5827,\"Value\":\"" + workFlowActionPointId + "\"},{\"ReportFieldId\":5836,\"Value\":\"" + outcomeText + "\"},{\"ReportFieldId\":5837,\"Value\":\"" + outcomeTypeId + "\"},{\"ReportFieldId\":5839,\"Value\":\"" + description + "\"},{\"ReportFieldId\":5840,\"Value\":\"" + nextWorkFlowActionPointId + "\"},{\"ReportFieldId\":6557,\"Value\":\"" + entityCategoryId + "\"},{\"ReportFieldId\":12048,\"Value\":\"" + isNotifyRequestor + "\"},{\"ReportFieldId\":5809,\"Value\":\"" + userId + "\"}]}" }, this.updateWorkFlowActionPointOutcomeUrl);

    }
    deleteWorkflowActionPointWithNoFromWorkflow(workTypeId: number, revisionNo: number, actionPointNos: string[]) {
        return this.postaction({applnInput: "{ListReportFieldIdValues:[{\"ReportFieldId\":5832,\"Value\":\"" + workTypeId + "\"},{\"ReportFieldId\":5829,\"Value\":\"" + revisionNo + "\"}]}", arrActionPointNo: actionPointNos }, this.deleteWorkflowActionPointWithNoFromWorkflowUrl);

    }
    getWorkflowIsEditableForWorktype(workTypeId: number) {
        return this.postaction({ applnInput: "{Id:" + workTypeId +"}" }, this.getWorkflowIsEditableForWorktypeUrl);
    }










    checkFlowchartFileExist(workTypeId: number, workflowCategoryId: number) {
        return this.postaction({ workTypeId: workTypeId, workflowEntityCategoryId: workflowCategoryId }, this.checkFlowchartFileExistUrl)
    }


}
import { Injectable, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from '../../Framework/Models//Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class ProjectsService extends HttpHelpers {
    //All general functions 
    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private addDataUrl = 'Common/GetAddAppFormFields';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private submitAddUrl = 'Common/InsertAppFormData';
    private submitEditUrl = 'Common/UpdateAppFormData';
    private lookupUrl = 'Common/GetFieldLookupValues';
    private deleteUrl = 'Common/DeleteAppFormData';
    private subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
    private addProjectData = 'Project/InsertProjectAndReminder';
    private updateProjectData = 'Project/UpdateProjectAndReminder';
    private updateProjectStatusurl = 'Project/UpdateProjectStatus';
    private inserBaseDrawingUrl = 'Common/SaveBaseDrawingFiles';
    private deleteBaseDrawingUrl = 'Drawing/DeleteBaseDrawing';
    private reviseBaseDrawing = 'Drawing/ReviseBaseDrawing';
    private replaceBaseDrawing = 'Drawing/ReplaceBaseDrawing';
    private downloadUrl = 'Common/DownloadBaseDrawingFile';
    private insertBaseDocumentUrl = 'Project/InsertBaseDocument';
    private updateBaseDocumentUrl = 'Project/UpdateBaseDocument';
    private deleteBaseDocumentUrl = 'Project/DeleteBaseDocument';
    private reviseBaseDocumentUrl = 'Project/ReviseBaseDocument';
    private replaceBaseDocumentUrl = 'Project/ReplaceBaseDocument';
    private downloadBaseDocUrl = 'Project/DownloadBaseDocFile';
    private insertReviewCommentsUrl = 'Project/InsertReviewComments';
    private updateReviewCommentsUrl = 'Project/UpdateReviewComments';
    private deleteReviewCommentsUrl = 'Project/DeleteReviewComment';
    private saveTeamMemberUrl = 'Project/SaveTeamMember';

    private projectsFrmId = 346;
    private projectsAddEditFrmId = 349;
    private basedrawingListFormId = 571;
    private baseDrawingAddEditFormId = 572;
    private projectTypeList = 573;
    private projectTypeAddEdit = 574;
    private basedocumentListFormId = 581;
    private basedocumentAddEditFormId = 585;
    private basedocumentrevisionListFormId = 589;
    private listTeamMembersFormId = 591;
    private reviewORCommentsListFormId = 580;
    private reviewORCommentsAddEditFormId = 595;
    private tasksListFormId = 598;
    private tasksAddEditFormId = 600;
    private milestoneListFormId = 601;
    private milestoneAddEditFormId = 603;
    private notesListFormId = 605;
    private notesAddEditFormId = 606;
    //---------------------------------

    constructor(private http: Http) {
        super(http);
    }

    getProjectsFields() {
        return this.postaction({ Input: "{FormId:" + this.projectsFrmId + "}" }, this.listFieldObjUrl);
    }

    getProjectsData(pageDetails, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{ FormId: " + this.projectsFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.listDataListUrl);
    }

    loadProjectsAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.projectsAddEditFrmId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1911,\"ReportFieldId\": 12097, \"Value\":\"2676\" }]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.projectsAddEditFrmId + ",ParentFormId:" + this.projectsFrmId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1911,\"ReportFieldId\": 12097, \"Value\":\"2676\" }]}" }, this.editDataUrl);
        }
    }

    AddUpdateProjects(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ applnInput: "{FormId:" + this.projectsAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.projectsFrmId + "}" }, this.addProjectData);
        } else {
            return this.postaction({ applnInput: "{FormId:" + this.projectsAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.projectsFrmId + "}" }, this.updateProjectData);
        }
    }

    updateProjectStatus(strRptFields: string, selectedId: number) {
        return this.postaction({ applnInput: "{FormId:" + this.projectsFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.updateProjectStatusurl);
    }
    getBaseDrawingListFormId(formid) {
        return this.postaction({ Input: "{FormId:" + formid + "}" }, this.listFieldObjUrl);
    }
    getBaseDrawingsListData(projectId, sortCol, sortDir, pageIndex) {
        return this.postaction({ Input: "{ FormId: " + this.basedrawingListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + JSON.stringify(projectId) + "}" }, this.listDataListUrl);
    }
    getBaseDrawingAddEditFields(target, selectedId?: number,fieldobj?:any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.baseDrawingAddEditFormId + "}" }, this.addDataUrl);
        }
        else if (target==2) {
            return this.postaction({ Input: "{ FormId:" + this.baseDrawingAddEditFormId + ",ParentFormId:" + this.basedrawingListFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
        else
            return this.postaction({ Input: "{ FormId:" + this.baseDrawingAddEditFormId + ",ParentFormId:" + this.basedrawingListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.editDataUrl);

    }
    postInsertBaseDrawingwithFile(formid, pagedetails, filedata, parentformid) {
        return this.postaction({ ApplnInput: "{FormId:" + formid + " ,ListReportFieldIdValues: " + pagedetails + ",ParentFormId:" + parentformid + "}", FileInput: filedata }, this.inserBaseDrawingUrl);

    }
    postUpdateBaseDrawing(formId, pageDetails, id: any, ParentFormId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + ParentFormId + "}" }, this.submitEditUrl);
    }
    postDeleteBaseDrawing(formid, selectedId, revision, projectId, filename, ismainlist) {
        return this.postaction({ applnInput: "{FormId:" + formid + ",Id:" + selectedId[0] + " ,ListReportFieldIdValues:[{\"ReportFieldId\":1001,\"Value\":\"" + revision + "\"},{\"ReportFieldId\":1010,\"Value\":\"" + projectId + "\"},{\"ReportFieldId\":512,\"Value\":\"" + filename + "\"}]}", IsMainList: ismainlist }, this.deleteBaseDrawingUrl)
    }
    postReviseBaseDrawingAddwithFile(formId, pageDetails, fileData, ParentFormId, DrawingId) {
        return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ", Id: " + DrawingId + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.reviseBaseDrawing);
    }
    postReplaceBaseDrawingAddwithFile(formId, pageDetails, fileData, ParentFormId, DrawingId) {
        return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ", Id: " + DrawingId + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.replaceBaseDrawing);
    }
    getProjectTypeListFields() {
        return this.postaction({ Input: "{FormId:" + this.projectTypeList + "}" }, this.listFieldObjUrl);
    }
    getProjectsTypeListData(sortCol, sortDir, pageIndex) {
        return this.postaction({ Input: "{ FormId: " + this.projectTypeList + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    getProjectTypeAddEditFields(target, selectedId?: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.projectTypeAddEdit + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.projectTypeAddEdit + ",ParentFormId:" + this.projectTypeList + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
    insertProjectType(pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.projectTypeAddEdit + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.projectTypeList + "}" }, this.submitAddUrl);
    }
    updateProjectType(pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.projectTypeAddEdit + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.projectTypeList + "}" }, this.submitEditUrl);
    }
    deleteProjectType(id) {
        return this.postaction({ Input: "{FormId:" + this.projectTypeList + ",Id:" + id + "}" }, this.deleteUrl);

    }

    getBaseDrawingMarkRevisionListData(formId, basedrawignId, sortCol, sortDir, pageIndex, target,revno) {
        if(target==1)//revision list
        return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + basedrawignId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
        else // mark up list
            return this.postaction({ Input: "{ FormId: " + formId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{\"ReportFieldId\":1017,\"Value\":\"" + basedrawignId + "\"},{\"ReportFieldId\":1018,\"Value\":\"" + revno + "\"}]}" }, this.listDataListUrl);

    }
    downloadFile(selectedId, filename, revisionNo, projectId) {
        return this.downloadaction({ Input: "{FormId:" + this.basedrawingListFormId + ",EntityId:" + projectId + "}", FileInput: "{FileName:'" + filename + "',ReferenceId:'" + selectedId + "',RevisionNo:'" + revisionNo + "'}" }, this.downloadUrl);
    }
    updateMarkUp(fieldobj,id) {
        return this.postaction({ Input: "{FormId:" + 579 + " ,ListReportFieldIdValues: " + fieldobj + ",Id:" + id + ",ParentFormId:" + 578 + "}" }, this.submitEditUrl);
    }
    deleteMarkUp(selectedId) {
        return this.postaction({ Input: "{FormId:" + 578 + ",Id:" + selectedId + "}" }, this.deleteUrl)
    }


    getBaseDocumentFields(formid) {
        return this.postaction({ Input: "{FormId:" + formid + "}" }, this.listFieldObjUrl);
    }
    getBaseDocumentAddEditFields(target, selectedId?: number,fieldobj?:any) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.basedocumentAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.basedocumentAddEditFormId + ",ParentFormId:" + this.basedocumentListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues: " + fieldobj + "}" }, this.editDataUrl);
        }
    }
    getBaseDocumentsListData(fieldobj, sortCol, sortDir, pageIndex) {
        return this.postaction({ Input: "{ FormId: " + this.basedocumentListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.listDataListUrl);
    }
    SubmitBaseDocuments(strRptFields: any, fileData, selectedId: number, target: number) {
        if (target == 1) //add 
            return this.postaction({ Input: "{ FormId:" + this.basedocumentAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.basedocumentListFormId + "}", FileInput: fileData }, this.insertBaseDocumentUrl);
        else if (target == 2) // edit
            return this.postaction({ Input: "{ FormId:" + this.basedocumentAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.basedocumentListFormId + "}" }, this.updateBaseDocumentUrl);
        else if (target == 3) // revise
            return this.postaction({ Input: "{ FormId:" + this.basedocumentAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.basedocumentListFormId + "}", FileInput: fileData }, this.reviseBaseDocumentUrl);
        else if (target == 4) // replace
            return this.postaction({ Input: "{ FormId:" + this.basedocumentAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.basedocumentListFormId + "}", FileInput: fileData }, this.replaceBaseDocumentUrl);
    }
    postDeleteBaseDocument(formid, selectedId, revision, projectId, filename, ismainlist) {
        return this.postaction({ applnInput: "{FormId:" + formid + ",Id:" + selectedId[0] + " ,ListReportFieldIdValues:[{\"ReportFieldId\":989,\"Value\":\"" + revision + "\"},{\"ReportFieldId\":995,\"Value\":\"" + projectId + "\"},{\"ReportFieldId\":990,\"Value\":\"" + filename + "\"}]}", IsMainList: ismainlist }, this.deleteBaseDocumentUrl)
    }
    downloadBaseDocumentFile(selectedId, filename, revisionNo, projectId) {
        return this.downloadaction({ Input: "{FormId:" + this.basedocumentListFormId + ",EntityId:" + projectId + "}", FileInput: "{FileName:'" + filename + "',ReferenceId:'" + selectedId + "',RevisionNo:'" + revisionNo + "'}" }, this.downloadBaseDocUrl);
    }
    getReviewsORCommentsGridFields() {
        return this.postaction({ Input: "{FormId:" + this.reviewORCommentsListFormId + "}" }, this.listFieldObjUrl);
    }
    getReviewsORCommentsGridData(pageIndex, sortCol, sortDir,fieldobj) {
               
        return this.postaction({ Input: "{ FormId: " + this.reviewORCommentsListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.listDataListUrl);
    }
    getReviewORCommentsAdd() {

        return this.postaction({ Input: "{ FormId:" + this.reviewORCommentsAddEditFormId + ",ParentFormId:" + this.reviewORCommentsListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":3034,\"ReportFieldId\": 12097, \"Value\":4685 }]}" }, this.addDataUrl);
    }

    getReviewORCommentsEdit(strRptFields:string,selectedId: number) {
        debugger
        return this.postaction({ Input: "{ FormId:" + this.reviewORCommentsAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.reviewORCommentsListFormId +",ListLookupReportFieldIdValues:[{ \"FieldId\":3034,\"ReportFieldId\": 12097, \"Value\":4685 }]}" }, this.editDataUrl);
    }


    InsertReviewsORComments(strRptFields: string, fileData: string) {

        return this.postaction({ Input: "{ FormId:" + this.reviewORCommentsAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.reviewORCommentsListFormId + "}", FileInput: fileData }, this.insertReviewCommentsUrl);
    }

    updateReviewORComments(selectedId: number, strRptFields: string) {

        return this.postaction({ Input: "{ FormId:" + this.reviewORCommentsAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.reviewORCommentsListFormId + ",Id:" + selectedId+"}" }, this.updateReviewCommentsUrl);

    }
    deleteReviewsORComments(selectId:number) {

        return this.postaction({ Input: "{FormId:" + this.reviewORCommentsListFormId + ",Id:" + selectId +  "}" }, this.deleteUrl);

    }

    getProjectTeamMembersFields(formId) {
        return this.postaction({ Input: "{FormId:" + formId + "}" }, this.listFieldObjUrl);
    }
    getTeamMembersData(reportFieldIdValues: string, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.listTeamMembersFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + reportFieldIdValues + "}" }, this.listDataListUrl);
    }
    SaveTeamMembers(pageDetails) {
        return this.postaction({ Input: "{FormId:" + 591 + ",ListEntityReportFieldIdValues:" + pageDetails + "}" }, this.saveTeamMemberUrl);

    }
    getTasksGridFields() {
        return this.postaction({ Input: "{FormId:" + this.tasksListFormId + "}" }, this.listFieldObjUrl);
    }
    
    getTasksGridData(pageIndex, sortCol, sortDir, fieldobj) {

        return this.postaction({ Input: "{ FormId: " + this.tasksListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.listDataListUrl);
    }
    getTasksAddFields(reportFieldLookupValues:string) {

        return this.postaction({ Input: "{ FormId:" + this.tasksAddEditFormId + ",ParentFormId:" + this.tasksListFormId + ",ListLookupReportFieldIdValues:" + reportFieldLookupValues +" }" }, this.addDataUrl);
    }
    getTasksEditFields(selectedId: number, reportFieldIdLookupValues: string, reportFieldIdValues: string) {

        return this.postaction({ Input: "{ FormId:" + this.tasksAddEditFormId + ",ParentFormId:" + this.tasksListFormId + ",Id:" + selectedId + " ,ListLookupReportFieldIdValues:" + reportFieldIdLookupValues + ", ListReportFieldIdValues:" + reportFieldIdValues+" }" }, this.editDataUrl);
    }
    insertTasks(strRptFields: string) {

        return this.postaction({ Input: "{ FormId:" + this.tasksAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.tasksListFormId + "}" }, this.submitAddUrl);
    }

    updateTasks(selectedId: number, strRptFields: string) {

        return this.postaction({ Input: "{ FormId:" + this.tasksAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.tasksListFormId + ",Id:" + selectedId + "}" }, this.submitEditUrl);

    }
    deleteTasks(selectId: number) {

        return this.postaction({ Input: "{FormId:" + this.tasksListFormId + ",Id:" + selectId + "}" }, this.deleteUrl);

    }
    getMilestoneFields() {
        return this.postaction({ Input: "{FormId:" + this.milestoneListFormId + "}" }, this.listFieldObjUrl);
    }

    getMileStoneGridData(pageIndex, sortCol, sortDir, fieldobj) {

        return this.postaction({ Input: "{ FormId: " + this.milestoneListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.listDataListUrl);
    }
    getMileStoneAddFields() {

        return this.postaction({ Input: "{ FormId:" + this.milestoneAddEditFormId + ",ParentFormId:" + this.milestoneListFormId +  " }" }, this.addDataUrl);
    }
    getMileStoneEditFields(selectedId: number, fieldObj: string) {

        return this.postaction({ Input: "{ FormId:" + this.milestoneAddEditFormId + ",ParentFormId:" + this.milestoneListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:" + fieldObj +  "}" }, this.editDataUrl);
    }
    deleteMilestone(selectId: number) {

        return this.postaction({ Input: "{FormId:" + this.milestoneListFormId + ",Id:" + selectId + "}" }, this.deleteUrl);

    }
    insertMilestone(strRptFields: string) {

        return this.postaction({ Input: "{ FormId:" + this.milestoneAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.milestoneListFormId + "}" }, this.submitAddUrl);
    }

    updateMilestone(selectedId: number, strRptFields: string) {

        return this.postaction({ Input: "{ FormId:" + this.milestoneAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.milestoneListFormId + ",Id:" + selectedId + "}" }, this.submitEditUrl);

    }
    getNotesGridFields() {
        return this.postaction({ Input: "{FormId:" + this.notesListFormId + "}" }, this.listFieldObjUrl);
    }
    getNotesGridData(pageIndex, sortCol, sortDir, fieldobj) {

        return this.postaction({ Input: "{ FormId: " + this.notesListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.listDataListUrl);
    }
    getNotesAdd() {

        return this.postaction({ Input: "{ FormId:" + this.notesAddEditFormId + ",ParentFormId:" + this.notesListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":3095,\"ReportFieldId\": 12097, \"Value\":4752 }]}" }, this.addDataUrl);
    }

    getNotesEdit(selectedId: number, strRptFields: string) {
        debugger
        return this.postaction({ Input: "{ FormId:" + this.notesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.notesListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":3095,\"ReportFieldId\": 12097, \"Value\":4752 }]}" }, this.editDataUrl);
    }

    insertNotes(strRptFields: string) {

        return this.postaction({ Input: "{ FormId:" + this.notesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.notesListFormId + "}" }, this.submitAddUrl);
    }

    updateNotes(selectedId: number, strRptFields: string) {

        return this.postaction({ Input: "{ FormId:" + this.notesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.notesListFormId + ",Id:" + selectedId + "}" }, this.submitEditUrl);

    }
    deleteNote(selectId: number) {

        return this.postaction({ Input: "{FormId:" + this.notesListFormId + ",Id:" + selectId + "}" }, this.deleteUrl);

    }
}

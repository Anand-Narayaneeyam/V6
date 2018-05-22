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
var ProjectsService = (function (_super) {
    __extends(ProjectsService, _super);
    //---------------------------------
    function ProjectsService(http) {
        _super.call(this, http);
        this.http = http;
        //All general functions 
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.addDataUrl = 'Common/GetAddAppFormFields';
        this.editDataUrl = 'Common/GetEditAppFormFields';
        this.submitAddUrl = 'Common/InsertAppFormData';
        this.submitEditUrl = 'Common/UpdateAppFormData';
        this.lookupUrl = 'Common/GetFieldLookupValues';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.subscribedFeatureUrl = 'Common/GetSubscribedFeatures';
        this.addProjectData = 'Project/InsertProjectAndReminder';
        this.updateProjectData = 'Project/UpdateProjectAndReminder';
        this.updateProjectStatusurl = 'Project/UpdateProjectStatus';
        this.inserBaseDrawingUrl = 'Common/SaveBaseDrawingFiles';
        this.deleteBaseDrawingUrl = 'Drawing/DeleteBaseDrawing';
        this.reviseBaseDrawing = 'Drawing/ReviseBaseDrawing';
        this.replaceBaseDrawing = 'Drawing/ReplaceBaseDrawing';
        this.downloadUrl = 'Common/DownloadBaseDrawingFile';
        this.insertBaseDocumentUrl = 'Project/InsertBaseDocument';
        this.updateBaseDocumentUrl = 'Project/UpdateBaseDocument';
        this.deleteBaseDocumentUrl = 'Project/DeleteBaseDocument';
        this.reviseBaseDocumentUrl = 'Project/ReviseBaseDocument';
        this.replaceBaseDocumentUrl = 'Project/ReplaceBaseDocument';
        this.downloadBaseDocUrl = 'Project/DownloadBaseDocFile';
        this.insertReviewCommentsUrl = 'Project/InsertReviewComments';
        this.updateReviewCommentsUrl = 'Project/UpdateReviewComments';
        this.deleteReviewCommentsUrl = 'Project/DeleteReviewComment';
        this.saveTeamMemberUrl = 'Project/SaveTeamMember';
        this.projectsFrmId = 346;
        this.projectsAddEditFrmId = 349;
        this.basedrawingListFormId = 571;
        this.baseDrawingAddEditFormId = 572;
        this.projectTypeList = 573;
        this.projectTypeAddEdit = 574;
        this.basedocumentListFormId = 581;
        this.basedocumentAddEditFormId = 585;
        this.basedocumentrevisionListFormId = 589;
        this.listTeamMembersFormId = 591;
        this.reviewORCommentsListFormId = 580;
        this.reviewORCommentsAddEditFormId = 595;
        this.tasksListFormId = 598;
        this.tasksAddEditFormId = 600;
        this.milestoneListFormId = 601;
        this.milestoneAddEditFormId = 603;
        this.notesListFormId = 605;
        this.notesAddEditFormId = 606;
    }
    ProjectsService.prototype.getProjectsFields = function () {
        return this.postaction({ Input: "{FormId:" + this.projectsFrmId + "}" }, this.listFieldObjUrl);
    };
    ProjectsService.prototype.getProjectsData = function (pageDetails, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.projectsFrmId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.listDataListUrl);
    };
    ProjectsService.prototype.loadProjectsAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.projectsAddEditFrmId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1911,\"ReportFieldId\": 12097, \"Value\":\"2676\" }]}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.projectsAddEditFrmId + ",ParentFormId:" + this.projectsFrmId + ",Id:" + selectedId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":1911,\"ReportFieldId\": 12097, \"Value\":\"2676\" }]}" }, this.editDataUrl);
        }
    };
    ProjectsService.prototype.AddUpdateProjects = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ applnInput: "{FormId:" + this.projectsAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.projectsFrmId + "}" }, this.addProjectData);
        }
        else {
            return this.postaction({ applnInput: "{FormId:" + this.projectsAddEditFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.projectsFrmId + "}" }, this.updateProjectData);
        }
    };
    ProjectsService.prototype.updateProjectStatus = function (strRptFields, selectedId) {
        return this.postaction({ applnInput: "{FormId:" + this.projectsFrmId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + "}" }, this.updateProjectStatusurl);
    };
    ProjectsService.prototype.getBaseDrawingListFormId = function (formid) {
        return this.postaction({ Input: "{FormId:" + formid + "}" }, this.listFieldObjUrl);
    };
    ProjectsService.prototype.getBaseDrawingsListData = function (projectId, sortCol, sortDir, pageIndex) {
        return this.postaction({ Input: "{ FormId: " + this.basedrawingListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + JSON.stringify(projectId) + "}" }, this.listDataListUrl);
    };
    ProjectsService.prototype.getBaseDrawingAddEditFields = function (target, selectedId, fieldobj) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.baseDrawingAddEditFormId + "}" }, this.addDataUrl);
        }
        else if (target == 2) {
            return this.postaction({ Input: "{ FormId:" + this.baseDrawingAddEditFormId + ",ParentFormId:" + this.basedrawingListFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
        else
            return this.postaction({ Input: "{ FormId:" + this.baseDrawingAddEditFormId + ",ParentFormId:" + this.basedrawingListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.editDataUrl);
    };
    ProjectsService.prototype.postInsertBaseDrawingwithFile = function (formid, pagedetails, filedata, parentformid) {
        return this.postaction({ ApplnInput: "{FormId:" + formid + " ,ListReportFieldIdValues: " + pagedetails + ",ParentFormId:" + parentformid + "}", FileInput: filedata }, this.inserBaseDrawingUrl);
    };
    ProjectsService.prototype.postUpdateBaseDrawing = function (formId, pageDetails, id, ParentFormId) {
        return this.postaction({ Input: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + ParentFormId + "}" }, this.submitEditUrl);
    };
    ProjectsService.prototype.postDeleteBaseDrawing = function (formid, selectedId, revision, projectId, filename, ismainlist) {
        return this.postaction({ applnInput: "{FormId:" + formid + ",Id:" + selectedId[0] + " ,ListReportFieldIdValues:[{\"ReportFieldId\":1001,\"Value\":\"" + revision + "\"},{\"ReportFieldId\":1010,\"Value\":\"" + projectId + "\"},{\"ReportFieldId\":512,\"Value\":\"" + filename + "\"}]}", IsMainList: ismainlist }, this.deleteBaseDrawingUrl);
    };
    ProjectsService.prototype.postReviseBaseDrawingAddwithFile = function (formId, pageDetails, fileData, ParentFormId, DrawingId) {
        return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ", Id: " + DrawingId + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.reviseBaseDrawing);
    };
    ProjectsService.prototype.postReplaceBaseDrawingAddwithFile = function (formId, pageDetails, fileData, ParentFormId, DrawingId) {
        return this.postaction({ ApplnInput: "{FormId:" + formId + " ,ListReportFieldIdValues: " + pageDetails + ", Id: " + DrawingId + ",ParentFormId:" + ParentFormId + "}", FileInput: fileData }, this.replaceBaseDrawing);
    };
    ProjectsService.prototype.getProjectTypeListFields = function () {
        return this.postaction({ Input: "{FormId:" + this.projectTypeList + "}" }, this.listFieldObjUrl);
    };
    ProjectsService.prototype.getProjectsTypeListData = function (sortCol, sortDir, pageIndex) {
        return this.postaction({ Input: "{ FormId: " + this.projectTypeList + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    ProjectsService.prototype.getProjectTypeAddEditFields = function (target, selectedId) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.projectTypeAddEdit + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.projectTypeAddEdit + ",ParentFormId:" + this.projectTypeList + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    ProjectsService.prototype.insertProjectType = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + this.projectTypeAddEdit + " ,ListReportFieldIdValues: " + pageDetails + ",ParentFormId:" + this.projectTypeList + "}" }, this.submitAddUrl);
    };
    ProjectsService.prototype.updateProjectType = function (pageDetails, id) {
        return this.postaction({ Input: "{FormId:" + this.projectTypeAddEdit + " ,ListReportFieldIdValues: " + pageDetails + ",Id:" + id + ",ParentFormId:" + this.projectTypeList + "}" }, this.submitEditUrl);
    };
    ProjectsService.prototype.deleteProjectType = function (id) {
        return this.postaction({ Input: "{FormId:" + this.projectTypeList + ",Id:" + id + "}" }, this.deleteUrl);
    };
    ProjectsService.prototype.getBaseDrawingMarkRevisionListData = function (formId, basedrawignId, sortCol, sortDir, pageIndex, target, revno) {
        if (target == 1)
            return this.postaction({ Input: "{ FormId: " + formId + ",Id:" + basedrawignId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
        else
            return this.postaction({ Input: "{ FormId: " + formId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:[{\"ReportFieldId\":1017,\"Value\":\"" + basedrawignId + "\"},{\"ReportFieldId\":1018,\"Value\":\"" + revno + "\"}]}" }, this.listDataListUrl);
    };
    ProjectsService.prototype.downloadFile = function (selectedId, filename, revisionNo, projectId) {
        return this.downloadaction({ Input: "{FormId:" + this.basedrawingListFormId + ",EntityId:" + projectId + "}", FileInput: "{FileName:'" + filename + "',ReferenceId:'" + selectedId + "',RevisionNo:'" + revisionNo + "'}" }, this.downloadUrl);
    };
    ProjectsService.prototype.updateMarkUp = function (fieldobj, id) {
        return this.postaction({ Input: "{FormId:" + 579 + " ,ListReportFieldIdValues: " + fieldobj + ",Id:" + id + ",ParentFormId:" + 578 + "}" }, this.submitEditUrl);
    };
    ProjectsService.prototype.deleteMarkUp = function (selectedId) {
        return this.postaction({ Input: "{FormId:" + 578 + ",Id:" + selectedId + "}" }, this.deleteUrl);
    };
    ProjectsService.prototype.getBaseDocumentFields = function (formid) {
        return this.postaction({ Input: "{FormId:" + formid + "}" }, this.listFieldObjUrl);
    };
    ProjectsService.prototype.getBaseDocumentAddEditFields = function (target, selectedId, fieldobj) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.basedocumentAddEditFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.basedocumentAddEditFormId + ",ParentFormId:" + this.basedocumentListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues: " + fieldobj + "}" }, this.editDataUrl);
        }
    };
    ProjectsService.prototype.getBaseDocumentsListData = function (fieldobj, sortCol, sortDir, pageIndex) {
        return this.postaction({ Input: "{ FormId: " + this.basedocumentListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.listDataListUrl);
    };
    ProjectsService.prototype.SubmitBaseDocuments = function (strRptFields, fileData, selectedId, target) {
        if (target == 1)
            return this.postaction({ Input: "{ FormId:" + this.basedocumentAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.basedocumentListFormId + "}", FileInput: fileData }, this.insertBaseDocumentUrl);
        else if (target == 2)
            return this.postaction({ Input: "{ FormId:" + this.basedocumentAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.basedocumentListFormId + "}" }, this.updateBaseDocumentUrl);
        else if (target == 3)
            return this.postaction({ Input: "{ FormId:" + this.basedocumentAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.basedocumentListFormId + "}", FileInput: fileData }, this.reviseBaseDocumentUrl);
        else if (target == 4)
            return this.postaction({ Input: "{ FormId:" + this.basedocumentAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.basedocumentListFormId + "}", FileInput: fileData }, this.replaceBaseDocumentUrl);
    };
    ProjectsService.prototype.postDeleteBaseDocument = function (formid, selectedId, revision, projectId, filename, ismainlist) {
        return this.postaction({ applnInput: "{FormId:" + formid + ",Id:" + selectedId[0] + " ,ListReportFieldIdValues:[{\"ReportFieldId\":989,\"Value\":\"" + revision + "\"},{\"ReportFieldId\":995,\"Value\":\"" + projectId + "\"},{\"ReportFieldId\":990,\"Value\":\"" + filename + "\"}]}", IsMainList: ismainlist }, this.deleteBaseDocumentUrl);
    };
    ProjectsService.prototype.downloadBaseDocumentFile = function (selectedId, filename, revisionNo, projectId) {
        return this.downloadaction({ Input: "{FormId:" + this.basedocumentListFormId + ",EntityId:" + projectId + "}", FileInput: "{FileName:'" + filename + "',ReferenceId:'" + selectedId + "',RevisionNo:'" + revisionNo + "'}" }, this.downloadBaseDocUrl);
    };
    ProjectsService.prototype.getReviewsORCommentsGridFields = function () {
        return this.postaction({ Input: "{FormId:" + this.reviewORCommentsListFormId + "}" }, this.listFieldObjUrl);
    };
    ProjectsService.prototype.getReviewsORCommentsGridData = function (pageIndex, sortCol, sortDir, fieldobj) {
        return this.postaction({ Input: "{ FormId: " + this.reviewORCommentsListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.listDataListUrl);
    };
    ProjectsService.prototype.getReviewORCommentsAdd = function () {
        return this.postaction({ Input: "{ FormId:" + this.reviewORCommentsAddEditFormId + ",ParentFormId:" + this.reviewORCommentsListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":3034,\"ReportFieldId\": 12097, \"Value\":4685 }]}" }, this.addDataUrl);
    };
    ProjectsService.prototype.getReviewORCommentsEdit = function (strRptFields, selectedId) {
        debugger;
        return this.postaction({ Input: "{ FormId:" + this.reviewORCommentsAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.reviewORCommentsListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":3034,\"ReportFieldId\": 12097, \"Value\":4685 }]}" }, this.editDataUrl);
    };
    ProjectsService.prototype.InsertReviewsORComments = function (strRptFields, fileData) {
        return this.postaction({ Input: "{ FormId:" + this.reviewORCommentsAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.reviewORCommentsListFormId + "}", FileInput: fileData }, this.insertReviewCommentsUrl);
    };
    ProjectsService.prototype.updateReviewORComments = function (selectedId, strRptFields) {
        return this.postaction({ Input: "{ FormId:" + this.reviewORCommentsAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.reviewORCommentsListFormId + ",Id:" + selectedId + "}" }, this.updateReviewCommentsUrl);
    };
    ProjectsService.prototype.deleteReviewsORComments = function (selectId) {
        return this.postaction({ Input: "{FormId:" + this.reviewORCommentsListFormId + ",Id:" + selectId + "}" }, this.deleteUrl);
    };
    ProjectsService.prototype.getProjectTeamMembersFields = function (formId) {
        return this.postaction({ Input: "{FormId:" + formId + "}" }, this.listFieldObjUrl);
    };
    ProjectsService.prototype.getTeamMembersData = function (reportFieldIdValues, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.listTeamMembersFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + reportFieldIdValues + "}" }, this.listDataListUrl);
    };
    ProjectsService.prototype.SaveTeamMembers = function (pageDetails) {
        return this.postaction({ Input: "{FormId:" + 591 + ",ListEntityReportFieldIdValues:" + pageDetails + "}" }, this.saveTeamMemberUrl);
    };
    ProjectsService.prototype.getTasksGridFields = function () {
        return this.postaction({ Input: "{FormId:" + this.tasksListFormId + "}" }, this.listFieldObjUrl);
    };
    ProjectsService.prototype.getTasksGridData = function (pageIndex, sortCol, sortDir, fieldobj) {
        return this.postaction({ Input: "{ FormId: " + this.tasksListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.listDataListUrl);
    };
    ProjectsService.prototype.getTasksAddFields = function (reportFieldLookupValues) {
        return this.postaction({ Input: "{ FormId:" + this.tasksAddEditFormId + ",ParentFormId:" + this.tasksListFormId + ",ListLookupReportFieldIdValues:" + reportFieldLookupValues + " }" }, this.addDataUrl);
    };
    ProjectsService.prototype.getTasksEditFields = function (selectedId, reportFieldIdLookupValues, reportFieldIdValues) {
        return this.postaction({ Input: "{ FormId:" + this.tasksAddEditFormId + ",ParentFormId:" + this.tasksListFormId + ",Id:" + selectedId + " ,ListLookupReportFieldIdValues:" + reportFieldIdLookupValues + ", ListReportFieldIdValues:" + reportFieldIdValues + " }" }, this.editDataUrl);
    };
    ProjectsService.prototype.insertTasks = function (strRptFields) {
        return this.postaction({ Input: "{ FormId:" + this.tasksAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.tasksListFormId + "}" }, this.submitAddUrl);
    };
    ProjectsService.prototype.updateTasks = function (selectedId, strRptFields) {
        return this.postaction({ Input: "{ FormId:" + this.tasksAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.tasksListFormId + ",Id:" + selectedId + "}" }, this.submitEditUrl);
    };
    ProjectsService.prototype.deleteTasks = function (selectId) {
        return this.postaction({ Input: "{FormId:" + this.tasksListFormId + ",Id:" + selectId + "}" }, this.deleteUrl);
    };
    ProjectsService.prototype.getMilestoneFields = function () {
        return this.postaction({ Input: "{FormId:" + this.milestoneListFormId + "}" }, this.listFieldObjUrl);
    };
    ProjectsService.prototype.getMileStoneGridData = function (pageIndex, sortCol, sortDir, fieldobj) {
        return this.postaction({ Input: "{ FormId: " + this.milestoneListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.listDataListUrl);
    };
    ProjectsService.prototype.getMileStoneAddFields = function () {
        return this.postaction({ Input: "{ FormId:" + this.milestoneAddEditFormId + ",ParentFormId:" + this.milestoneListFormId + " }" }, this.addDataUrl);
    };
    ProjectsService.prototype.getMileStoneEditFields = function (selectedId, fieldObj) {
        return this.postaction({ Input: "{ FormId:" + this.milestoneAddEditFormId + ",ParentFormId:" + this.milestoneListFormId + ",Id:" + selectedId + ",ListReportFieldIdValues:" + fieldObj + "}" }, this.editDataUrl);
    };
    ProjectsService.prototype.deleteMilestone = function (selectId) {
        return this.postaction({ Input: "{FormId:" + this.milestoneListFormId + ",Id:" + selectId + "}" }, this.deleteUrl);
    };
    ProjectsService.prototype.insertMilestone = function (strRptFields) {
        return this.postaction({ Input: "{ FormId:" + this.milestoneAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.milestoneListFormId + "}" }, this.submitAddUrl);
    };
    ProjectsService.prototype.updateMilestone = function (selectedId, strRptFields) {
        return this.postaction({ Input: "{ FormId:" + this.milestoneAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.milestoneListFormId + ",Id:" + selectedId + "}" }, this.submitEditUrl);
    };
    ProjectsService.prototype.getNotesGridFields = function () {
        return this.postaction({ Input: "{FormId:" + this.notesListFormId + "}" }, this.listFieldObjUrl);
    };
    ProjectsService.prototype.getNotesGridData = function (pageIndex, sortCol, sortDir, fieldobj) {
        return this.postaction({ Input: "{ FormId: " + this.notesListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + ",ListReportFieldIdValues:" + JSON.stringify(fieldobj) + "}" }, this.listDataListUrl);
    };
    ProjectsService.prototype.getNotesAdd = function () {
        return this.postaction({ Input: "{ FormId:" + this.notesAddEditFormId + ",ParentFormId:" + this.notesListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":3095,\"ReportFieldId\": 12097, \"Value\":4752 }]}" }, this.addDataUrl);
    };
    ProjectsService.prototype.getNotesEdit = function (selectedId, strRptFields) {
        debugger;
        return this.postaction({ Input: "{ FormId:" + this.notesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.notesListFormId + ",ListLookupReportFieldIdValues:[{ \"FieldId\":3095,\"ReportFieldId\": 12097, \"Value\":4752 }]}" }, this.editDataUrl);
    };
    ProjectsService.prototype.insertNotes = function (strRptFields) {
        return this.postaction({ Input: "{ FormId:" + this.notesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.notesListFormId + "}" }, this.submitAddUrl);
    };
    ProjectsService.prototype.updateNotes = function (selectedId, strRptFields) {
        return this.postaction({ Input: "{ FormId:" + this.notesAddEditFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.notesListFormId + ",Id:" + selectedId + "}" }, this.submitEditUrl);
    };
    ProjectsService.prototype.deleteNote = function (selectId) {
        return this.postaction({ Input: "{FormId:" + this.notesListFormId + ",Id:" + selectId + "}" }, this.deleteUrl);
    };
    ProjectsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProjectsService);
    return ProjectsService;
}(HttpHelpers_1.HttpHelpers));
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=projects.service.js.map
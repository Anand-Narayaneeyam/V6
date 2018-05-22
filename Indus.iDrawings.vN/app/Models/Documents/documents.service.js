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
var DocumentService = (function (_super) {
    __extends(DocumentService, _super);
    function DocumentService(http) {
        _super.call(this, http);
        this.http = http;
        this.listFieldObjUrl = 'Common/GetListAppFormFields';
        this.listDataListUrl = 'Common/GetAppFormDataList';
        this.addDataUrl = 'Common/GetAddAppFormFields';
        this.editDataUrl = 'Common/GetEditAppFormFields';
        this.insertDocumentUrl = 'Documents/InsertDocument';
        this.updateDocumentUrl = 'Documents/UpdateDocument';
        this.reviseDocumentUrl = 'Documents/ReviseDocument';
        this.replaceDocumentUrl = 'Documents/ReplaceDocument';
        this.deleteDocumentUrl = 'Documents/DeleteDocumentData';
        this.updateMultipleDocumentsUrl = 'Documents/UpdateMultipleDocuments';
        this.listtreeviewfieldsurl = 'Documents/GetFieldsForTreeViewSettings';
        this.updatetreeviewfieldurl = 'Documents/UpdateTreeViewFields';
        this.submitEditUrl = 'Common/UpdateAppFormData';
        this.submitAddUrl = 'Common/InsertAppFormData';
        this.deleteUrl = 'Common/DeleteAppFormData';
        this.CheckDocumentGroupInUseUrl = 'Documents/CheckDocumentGroupInUse';
        this.updateFieldSubscriptionUrl = 'Documents/UpdateFieldSubscriptionSettings';
        this.updateDocumentforDocumentGroupsUrl = 'Documents/AddDocumentsToGroups';
        this.downloadDocumentUrl = 'Common/ArrayDownloadFile';
        this.getDocumentFormtFileNameurl = 'Common/getDocumentFormtFileName';
        this.multidownloadDocumentUrl = 'Common/MultipleDownloadFile';
        this.CheckDirectAccesstoaDocumentbyManyUsersUserListUrl = 'Documents/CheckAndGetUsersAssignedToADocumentGroup';
        this.GetDashboardDocumentByCategory = 'Documents/GetDashboardDocumentByCategoryForChart';
        this.DocumentBasedFileType = 'Documents/GetDashboardDocumentByFileTypeForChart';
        this.GetDashboardDocumentDetails = 'Documents/GetDashboardDocumentDetails';
        this.keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
        this.AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
        this.GetTreeViewFieldsForExplorerUrl = 'Documents/GetTreeViewFieldsForExplorer';
        this.GetArchivedSearches = 'Documents/GetArchivedSearches';
        this.InsertArchivedSearches = 'Documents/InsertArchivedSearches';
        this.DeleteSavedSearches = 'Documents/DeleteSavedSearches';
        this.CheckDocumentCategoryUse = 'Documents/CheckDocumentCategoryInUse';
        this.CheckRevision = 'Documents/CheckDocumentRevisions';
        this.GetNextDocumentNumber = 'Documents/GetNextDocumentNumber';
        this.GetWorkFlowReviewRequestListUrl = 'Documents/GetWorkFlowReviewRequestList';
        this.SendCheckOutRequestUrl = 'Documents/SendCheckOutRequest';
        this.SendPublishRequestUrl = 'Documents/SendPublishRequest';
        this.ExplorerViewUrl = 'Documents/GetPagedDocumentsForExplorerView';
        this.NumberFormatItemDetailsUrl = 'Documents/GetNumberFormatItemDetails';
        this.InsertUpdateNumberFormatUrl = 'Documents/InsertUpdateNumberFormat';
        this.DocumentPublishRequestListUrl = 'Documents/GetDocumentPublishRequestList';
        this.UpdateCheckOutRequestUrl = 'Documents/UpdateCheckOutRequest';
        this.UpdatePublishUrl = 'Documents/UpdatePublish';
        this.getDOcWorkFlowActionPointOutcomes = 'Documents/GetDOcWorkFlowActionPointOutcomes';
        this.getCheckOutRequestedUsersurl = 'Documents/GetCheckOutRequestedUserAndCheckOut';
        this.getCheckOutUserurl = 'Documents/GetCheckOutUser';
        this.allowCheckOutCheckInurl = 'Documents/AllowCheckOutCheckIn';
        this.updateDocumentStatusurl = 'Documents/UpdateDocumentStatus';
        this.UserPrivilegesofPagejUrl = 'Common/GetUserPrivilegesofPage';
        this.getSubscribedOptionalFieldsURL = 'Common/getSubscribedOptionalFields';
        this.CheckInDocumentUrl = 'Documents/CheckInDocument';
        this.GetExplorerFieldValuesUrl = 'Documents/GetExplorerFieldValues';
        this.docDashboardMySearchUrl = 'Documents/docDashboardMySearch';
        this.docSearchlistUrl = 'Documents/docSearchlist';
        this.dbObjectLookUpUrl = 'Common/GetDBObjectLookupValues';
        this.DocumentListFormId = 427;
        this.DashboardDocuentListFormId = 473;
        this.DocumentGroupsAccessibletoaUserFormId = 434;
        this.DocumentGroupFormId = 442;
        this.DocumentCategoryFormId = 435;
        this.AllDocumentsAccessibletoaUserFormId = 444;
        this.DocumentAddEditformId = 439;
        this.OptionalFieldsFormId = 448;
        this.DocumentforDocumentGroupsFormId = 447;
        this.DocumentforDocumentGroupsMainListFormId = 450;
        this.DocumentdownloadEntityId = 22;
        this.DocumentRevisionListFormId = 464;
        this.SendForApprovalFormId = 152;
        this.TreeViewFieldsFormId = 436;
        this.AccesstoaDocumentGroupbyManyUsersFormId = 453;
        this.DocumentsDirectlyAccessibletoaUserFormId = 454;
        this.DocumentsDirectlyAccessibletoaUserMainListFormId = 456;
        this.DirectAccesstoaDocumentbyManyUsersFormId = 458;
        this.DirectAccesstoaDocumentbyManyUsersUserListFormId = 463;
        this.DocCheckoutListFormId = 428;
        this.DocCheckoutReviewFormId = 490;
        this.ReviewHistoryFormId = 441;
        this.DocumentDownloadFormatFormId = 491;
        this.DocumentExplorerDetails = 492;
    }
    ;
    DocumentService.prototype.getDocumentListFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.DocumentListFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getTreeViewFieldsForExplorer = function () {
        return this.postaction({ Input: "{ FormId: " + this.DocumentListFormId + "}" }, this.GetTreeViewFieldsForExplorerUrl);
    };
    DocumentService.prototype.GetExplorerFieldValues = function (levelno, strRptFields) {
        return this.postaction({
            Input: "{ FormId: " + this.DocumentListFormId + ',Id: ' + levelno + (strRptFields == '' ? '' : ",ListFilterIdValues:" + strRptFields) + "}"
        }, this.GetExplorerFieldValuesUrl);
    };
    DocumentService.prototype.getDocumentListData = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.DocumentListFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.listDataListUrl);
        //has additional input reportField and LoginUserID for proc.Need to ask whether custom model is required or not
    };
    DocumentService.prototype.getUserPrivilegesofPage = function (pageId, previlages, fromId) {
        return this.postaction({ Input: "{ FormId:" + fromId + " }", PageId: pageId, Privileges: previlages }, this.UserPrivilegesofPagejUrl);
    };
    DocumentService.prototype.loadDocumentAddEditFields = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId: " + this.DocumentAddEditformId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId: " + this.DocumentAddEditformId + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentListFormId + ",ListLookupReportFieldIdValues:[{\"FieldId\":2423,\"ReportFieldId\": 12097, \"Value\":\"3500\"}] ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.editDataUrl);
        }
    };
    DocumentService.prototype.postSubmitDocument = function (strRptFields, fileData, selectedId, target) {
        if (target == 1)
            return this.postaction({ Input: "{ FormId:" + this.DocumentAddEditformId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.DocumentListFormId + "}", FileInput: fileData }, this.insertDocumentUrl);
        else if (target == 2)
            return this.postaction({ Input: "{ FormId:" + this.DocumentAddEditformId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentListFormId + "}" }, this.updateDocumentUrl);
        else if (target == 3)
            return this.postaction({ Input: "{ FormId:" + this.DocumentAddEditformId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentListFormId + "}", FileInput: fileData }, this.reviseDocumentUrl);
        else if (target == 4)
            return this.postaction({ Input: "{ FormId:" + this.DocumentAddEditformId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentListFormId + "}", FileInput: fileData }, this.replaceDocumentUrl);
    };
    DocumentService.prototype.updateMultipleDocuments = function (strReportFieldIdValues, reportField, newValue) {
        return this.postaction({ Input: "{FormId:" + this.DocumentAddEditformId + ",ListReportFieldIdValues:" + strReportFieldIdValues + "}", ReportField: reportField, NewValue: newValue }, this.updateMultipleDocumentsUrl);
    };
    DocumentService.prototype.getdocumentCategoryFeilds = function () {
        return this.postaction({ Input: "{FormId:" + this.DocumentCategoryFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getdocumentCategory = function (pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{FormId:" + this.DocumentCategoryFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    DocumentService.prototype.postDocumentCategoryDelete = function (id) {
        return this.postaction({ Input: "{FormId:" + this.DocumentCategoryFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    DocumentService.prototype.DocumentCategoryAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.DocumentCategoryFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.DocumentCategoryFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    DocumentService.prototype.AddUpdateDocumentCategory = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.DocumentCategoryFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.DocumentCategoryFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({
                Input: "{ FormId:" + this.DocumentCategoryFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentCategoryFormId + "}" }, this.submitEditUrl);
        }
    };
    DocumentService.prototype.getDocumentGroupsAccessibletoaUserFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.DocumentGroupsAccessibletoaUserFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getDocumentGroupsAccessibletoaUserData = function (pageIndex, sortCol, sortDir, id) {
        return this.postaction({ Input: "{FormId:" + this.DocumentGroupsAccessibletoaUserFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + id + "}" }, this.listDataListUrl);
    };
    DocumentService.prototype.documentGroupsAccessibletoaUserUpdate = function (pageDetails, selectId) {
        return this.postaction({ Input: "{ FormId:" + this.DocumentGroupsAccessibletoaUserFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    };
    DocumentService.prototype.getDocumentTreeviewListFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.TreeViewFieldsFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":24,\"Value\":\"5\"},{\"ReportFieldId\":604,\"Value\":\"30\"}]}" }, this.listtreeviewfieldsurl);
    };
    DocumentService.prototype.updateDocumentTreeviewListFields = function (Reportfieldids, target) {
        return this.postaction({ Input: "{ FormId: " + this.TreeViewFieldsFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":604,\"Value\":\"30\"}]}", Reportfieldids: Reportfieldids, target: target.toString() }, this.updatetreeviewfieldurl);
    };
    DocumentService.prototype.getDocumentGroupFields = function () {
        return this.postaction({ Input: "{FormId:" + this.DocumentGroupFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getDocumentGroupData = function (pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.DocumentGroupFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    DocumentService.prototype.loadtDocumentGroupAddEdit = function (selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.DocumentGroupFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.DocumentGroupFormId + ",ParentFormId:" + this.DocumentGroupFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    };
    DocumentService.prototype.DocumentGroupSubmitAddEdit = function (strRptFields, selectedId, target) {
        if (target == 1) {
            return this.postaction({ Input: "{FormId:" + this.DocumentGroupFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.DocumentGroupFormId + "}" }, this.submitAddUrl);
        }
        else {
            return this.postaction({ Input: "{FormId:" + this.DocumentGroupFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentGroupFormId + "}" }, this.submitEditUrl);
        }
    };
    DocumentService.prototype.checkDocumentGroupIsInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.DocumentGroupFormId + ",Id:" + id + "}" }, this.CheckDocumentGroupInUseUrl);
    };
    DocumentService.prototype.postDocumentGroupDelete = function (id) {
        return this.postaction({ Input: "{FormId:" + this.DocumentGroupFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    };
    DocumentService.prototype.getAllDocumentsAccessibletoaUserFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.AllDocumentsAccessibletoaUserFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getAllDocumentsAccessibletoaUserData = function (pageIndex, sortCol, sortDir, strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.AllDocumentsAccessibletoaUserFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:" + strRptFields + "}" }, this.listDataListUrl);
    };
    DocumentService.prototype.getOptionalFieldsListFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.OptionalFieldsFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getOptionalFieldsListData = function (pageIndex, sortCol, sortDir, fieldSubscriptionCategoryId) {
        return this.postaction({ Input: "{FormId:" + this.OptionalFieldsFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:[{\"ReportFieldId\":5074,\"Value\":" + fieldSubscriptionCategoryId + "}]}" }, this.listDataListUrl);
    };
    DocumentService.prototype.updateOptionalFields = function (strRptFields) {
        return this.postaction({ Input: strRptFields }, this.updateFieldSubscriptionUrl);
    };
    DocumentService.prototype.getDocumentforDocumentGroupsFields = function () {
        return this.postaction({ Input: "{FormId:" + this.DocumentforDocumentGroupsFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getDocumentforDocumentGroupsData = function (strRptFields, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.DocumentforDocumentGroupsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    DocumentService.prototype.getDocumentforDocumentGroupsMainListFields = function () {
        return this.postaction({ Input: "{FormId: " + this.DocumentforDocumentGroupsMainListFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getDocumentforDocumentGroupsMainListData = function (DocumentGroupId, index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.DocumentforDocumentGroupsMainListFormId + ",Id: " + DocumentGroupId + ",SortColumn: '" + column + "',SortDirection: '" + direction + "',PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    DocumentService.prototype.updateDocumentforDocumentGroupsMainList = function (strRptFields, UpdateAccessRights) {
        return this.postaction({ Input: "{FormId: " + this.DocumentforDocumentGroupsMainListFormId + " ,ListReportFieldIdValues: " + strRptFields + "}", UpdateAccessRights: UpdateAccessRights }, this.updateDocumentforDocumentGroupsUrl);
    };
    DocumentService.prototype.DeleteDocumentforDocumentGroupsData = function (fieldobj) {
        return this.postaction({ Input: "{FormId:" + this.DocumentforDocumentGroupsFormId + ",ListReportFieldIdValues:" + fieldobj + ",Id:0}" }, this.deleteUrl);
    };
    DocumentService.prototype.deleteDocument = function (pageDetails, id) {
        return this.postaction({
            Input: "{FormId:" + this.DocumentListFormId + ",Id:" + id + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.deleteDocumentUrl);
    };
    DocumentService.prototype.DocumentDownloadFile = function (ReferenceId, filename, RevisionNo) {
        return this.downloadaction({
            Input: "{FormId:" + this.DocumentListFormId + ",EntityId:" + this.DocumentdownloadEntityId + "}",
            FileInput: "{ReferenceId:" + ReferenceId + ",FileName:'" + filename + "',RevisionNo:'" + RevisionNo + "'}" }, this.downloadDocumentUrl);
    };
    DocumentService.prototype.multiDocumentDownloadFile = function (FileInput) {
        return this.downloadaction({ Input: "{FormId:" + this.DocumentListFormId + ",EntityId:" + this.DocumentdownloadEntityId + "}", Fileinput: FileInput }, this.multidownloadDocumentUrl);
    };
    DocumentService.prototype.getAccesstoaDocumentGroupbyManyUsersFields = function () {
        return this.postaction({ Input: "{FormId: " + this.AccesstoaDocumentGroupbyManyUsersFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getAccesstoaDocumentGroupbyManyUsersData = function (strRptFields, index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.AccesstoaDocumentGroupbyManyUsersFormId + ",Id: 0" + " ,ListReportFieldIdValues: " + strRptFields + ",SortColumn: '" + column + "',SortDirection: '" + direction + "',PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    DocumentService.prototype.updateAccesstoaDocumentGroupbyManyUsers = function (strRptFields, documentGroupId) {
        return this.postaction({ Input: "{FormId: " + this.AccesstoaDocumentGroupbyManyUsersFormId + ",Id:" + documentGroupId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
    };
    DocumentService.prototype.getDocumentsDirectlyAccessibletoaUserFields = function () {
        return this.postaction({ Input: "{FormId:" + this.DocumentsDirectlyAccessibletoaUserFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getDocumentsDirectlyAccessibletoaUserData = function (strRptFields, pageIndex, sortCol, sortDir, filter) {
        return this.postaction({ Input: "{ FormId: " + this.DocumentsDirectlyAccessibletoaUserFormId + " ,ListReportFieldIdValues: " + strRptFields + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    };
    DocumentService.prototype.getDocumentsDirectlyAccessibletoaUserMainListFields = function () {
        return this.postaction({ Input: "{FormId: " + this.DocumentsDirectlyAccessibletoaUserMainListFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getDocumentsDirectlyAccessibletoaUserMainListData = function (UserIdId, index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.DocumentsDirectlyAccessibletoaUserMainListFormId + ",Id: " + UserIdId + ",SortColumn: '" + column + "',SortDirection: '" + direction + "',PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    DocumentService.prototype.updateDocumentsDirectlyAccessibletoaUserMainList = function (strRptFields, UserIdId) {
        return this.postaction({ Input: "{FormId: " + this.DocumentsDirectlyAccessibletoaUserMainListFormId + ",Id: " + UserIdId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
    };
    DocumentService.prototype.DeleteDocumentsDirectlyAccessibletoaUserMainList = function (strRptFields, UserIdId) {
        return this.postaction({ Input: "{FormId:" + this.DocumentsDirectlyAccessibletoaUserFormId + ",Id: " + UserIdId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.deleteUrl);
    };
    DocumentService.prototype.getDirectAccesstoaDocumentbyManyUsersFields = function () {
        return this.postaction({ Input: "{FormId:" + this.DirectAccesstoaDocumentbyManyUsersFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getDirectAccesstoaDocumentbyManyUsersData = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.DirectAccesstoaDocumentbyManyUsersFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id: 0}" }, this.listDataListUrl);
    };
    DocumentService.prototype.getDirectAccesstoaDocumentbyManyUsersUserListFields = function () {
        return this.postaction({ Input: "{FormId: " + this.DirectAccesstoaDocumentbyManyUsersUserListFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getDirectAccesstoaDocumentbyManyUsersUserListData = function (strRptFields, index, column, direction) {
        return this.postaction({ Input: "{FormId:" + this.DirectAccesstoaDocumentbyManyUsersUserListFormId + ",Id: 0" + " ,ListReportFieldIdValues: " + strRptFields + ",SortColumn: '" + column + "',SortDirection: '" + direction + "',PageIndex: " + index + "}" }, this.listDataListUrl);
    };
    DocumentService.prototype.checkDirectAccesstoaDocumentbyManyUsersUserList = function (strRptFields) {
        return this.postaction({ Input: "{FormId: " + this.DirectAccesstoaDocumentbyManyUsersUserListFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.CheckDirectAccesstoaDocumentbyManyUsersUserListUrl);
    };
    DocumentService.prototype.updatekDirectAccesstoaDocumentbyManyUsersUserList = function (strRptFields) {
        return this.postaction({ Input: "{FormId: " + this.DirectAccesstoaDocumentbyManyUsersUserListFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
    };
    DocumentService.prototype.getDocumentRevisionList = function (documentId, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.DocumentRevisionListFormId + ",Id: " + documentId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.listDataListUrl);
    };
    DocumentService.prototype.getDocumentRevisionFeildList = function () {
        return this.postaction({ Input: "{FormId:" + this.DocumentRevisionListFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.postRevisionDelete = function (pageDetails, documentId) {
        return this.postaction({
            Input: "{FormId:" + this.DocumentRevisionListFormId + ",Id:" + documentId + ",ListReportFieldIdValues:" + pageDetails + "}" }, this.deleteUrl);
    };
    /* Document DashBoard */
    DocumentService.prototype.getOrgCategoryforDashBoard = function () {
        return this.postaction({ Input: "{}" }, this.GetDashboardDocumentByCategory);
    };
    DocumentService.prototype.getDocumentFileTypeDashBoard = function () {
        return this.postaction({ Input: "{}" }, this.DocumentBasedFileType);
    };
    DocumentService.prototype.GetDashboardDocumentFeildId = function (sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.DashboardDocuentListFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.GetDashboardDocument = function (sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.DashboardDocuentListFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.GetDashboardDocumentDetails);
    };
    DocumentService.prototype.getWorkFlowReviewRequestList = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.DocCheckoutListFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.listDataListUrl);
    };
    DocumentService.prototype.getDocumentKeywordField = function () {
        return this.postaction({ Input: "{FormId:486}" }, this.keywordLookUpUrl);
    };
    DocumentService.prototype.getDocumentAdvanceSearchField = function () {
        return this.postaction({ Input: "{FormId:487}" }, this.AdvanceSearchLookUpUrl);
    };
    DocumentService.prototype.LoadAdvanceSearchSaveAs = function (strRptFields) {
        var rptFieldValues1 = "[{\"FieldId\":2558,\"ReportFieldId\":2145,\"Value\":\"" + "32" + "\"},{\"FieldId\":2558,\"ReportFieldId\":2146,\"Value\":\"" + "1" + "\"} ]";
        return this.postaction({ Input: "{FormId:488,ListLookupReportFieldIdValues: " + rptFieldValues1 + "}" }, this.addDataUrl);
    };
    DocumentService.prototype.DocumentKeywordSearch = function (value, index, direction, column) {
        return this.postaction({ Input: "{ FormId:486,Filter: '" + value + "',SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:1 ,IsAdvancedSearch:0}" }, this.listDataListUrl);
    };
    DocumentService.prototype.DocumentAdvanceSeachResult = function (value, index, direction, column) {
        return this.postaction({ Input: "{ FormId:487,ListFilterIdValues: " + value + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.listDataListUrl);
    };
    DocumentService.prototype.SendCheckoutRequest = function (fieldObj, selectedId) {
        return this.postaction({ Input: "{ FormId: " + this.SendForApprovalFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldObj) + ",Id:" + selectedId + "}" }, this.SendCheckOutRequestUrl);
    };
    DocumentService.prototype.SendPublishRequest = function (fieldObj, selectedId, DocId) {
        return this.postaction({ Input: "{ FormId: " + this.SendForApprovalFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldObj) + ",Id:" + DocId + "}" }, this.SendPublishRequestUrl);
    };
    DocumentService.prototype.GetArchivedSearchesddl = function (strRptFields) {
        return this.postaction({ Input: "{FormId:487,ListReportFieldIdValues: " + strRptFields + "}" }, this.GetArchivedSearches);
    };
    DocumentService.prototype.DocAdvanceSearchSaveAs = function () {
        return this.postaction({ Input: "{FormId:489}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.AddSearches = function (strRptFields, reportfieldIds, selectedId, target) {
        if (target == 1) {
            return this.postaction({
                Input: "{FormId:489 ,ListReportFieldIdValues: " + strRptFields + " }", Input1: reportfieldIds
            }, this.InsertArchivedSearches);
        }
    };
    DocumentService.prototype.getDocumentCheckoutListFields = function () {
        return this.postaction({ Input: "{ FormId: " + this.DocCheckoutListFormId + "}" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getReviewHistoryColumns = function () {
        return this.postaction({ Input: "{ FormId:" + this.ReviewHistoryFormId + " }" }, this.listFieldObjUrl);
    };
    DocumentService.prototype.getReviewHistoryData = function (workflowEntityId) {
        return this.postaction({ Input: "{ FormId: " + this.ReviewHistoryFormId + ",Id:" + workflowEntityId + "}" }, this.listDataListUrl);
    };
    DocumentService.prototype.getDocumentCheckoutReviewFields = function (fieldObj, strLookupRptFields) {
        return this.postaction({ Input: "{ FormId: " + this.DocCheckoutReviewFormId + ",ListLookupReportFieldIdValues:" + strLookupRptFields + ",ListReportFieldIdValues:" + fieldObj + "}" }, this.editDataUrl);
    };
    DocumentService.prototype.getDocumentPublishReviewFields = function (fieldObj, strLookupRptFields) {
        return this.postaction({ Input: "{ FormId: " + this.DocCheckoutReviewFormId + ",ListLookupReportFieldIdValues:" + strLookupRptFields + ",ListReportFieldIdValues:" + fieldObj + "}" }, this.editDataUrl);
    };
    DocumentService.prototype.postSubmitCheckoutReview = function (strRptFields, Id, entityId) {
        return this.postaction({ Input: "{ FormId:" + this.DocCheckoutReviewFormId + ", Id:" + Id + " ,ListReportFieldIdValues: " + strRptFields + "}", CheckOutRequestId: entityId }, this.UpdateCheckOutRequestUrl);
    };
    DocumentService.prototype.postSubmitPublishReview = function (strRptFields, Id) {
        return this.postaction({ Input: "{ FormId:" + this.DocCheckoutReviewFormId + ", Id:" + Id + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.UpdatePublishUrl);
    };
    DocumentService.prototype.getdocumentdownloadformatfields = function () {
        return this.postaction({ Input: "{ FormId:" + this.DocumentDownloadFormatFormId + "}" }, this.editDataUrl);
    };
    DocumentService.prototype.getNumberFormatItemDetails = function () {
        return this.postaction({ Input: "{ FormId:" + this.DocumentDownloadFormatFormId + "}", NumberFormatCategoryId: 14, Target: 7 }, this.NumberFormatItemDetailsUrl);
    };
    DocumentService.prototype.UpdateNumberFormatDetails = function (NumberFormatInput) {
        return this.postaction({ Input: "{ FormId:" + this.DocumentDownloadFormatFormId + "}", NumberFormatInput: NumberFormatInput, NumberFormatCategoryId: 14 }, this.InsertUpdateNumberFormatUrl);
    };
    DocumentService.prototype.getDocumentListOnTreeSelection = function (pageIndex, sortCol, sortDir, filterIdValues) {
        debugger;
        if (filterIdValues != "") {
            return this.postaction({
                Input: "{FormId:" + this.DocumentListFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListFilterIdValues:" + filterIdValues + "}" }, this.ExplorerViewUrl);
        }
        else {
            return this.postaction({
                Input: "{FormId:" + this.DocumentListFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.ExplorerViewUrl);
        }
        //has additional input reportField and LoginUserID for proc.Need to ask whether custom model is required or not
    };
    DocumentService.prototype.loadDocumentExplorerDetails = function (selectedId) {
        return this.postaction({ Input: "{ FormId: " + this.DocumentExplorerDetails + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentExplorerDetails + ",ListLookupReportFieldIdValues:[{\"FieldId\":2423,\"ReportFieldId\": 12097, \"Value\":\"3500\"}] ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.editDataUrl);
    };
    DocumentService.prototype.getdocumentpublishrequestlist = function (pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.DocCheckoutListFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.DocumentPublishRequestListUrl);
    };
    DocumentService.prototype.AdvanceSearchDelete = function (id) {
        return this.postaction({ Input: "{FormId:488,Id: " + id + "}" }, this.DeleteSavedSearches);
    };
    DocumentService.prototype.CheckDocumentCategoryInUse = function (id) {
        return this.postaction({ Input: "{FormId:" + this.DocumentCategoryFormId + " ,Id:" + id + "}" }, this.CheckDocumentCategoryUse);
    };
    DocumentService.prototype.CheckRevisionExists = function (id) {
        return this.postaction({ Input: "{FormId:" + this.DocumentRevisionListFormId + " ,Id:" + id + "}" }, this.CheckRevision);
    };
    DocumentService.prototype.getNextDocumentNumber = function () {
        return this.postaction({ Input: "{}" }, this.GetNextDocumentNumber);
    };
    DocumentService.prototype.getDocWFActionOutComes = function (rowdata, selectedOcutComeId) {
        var outcomeNotReal = 0;
        var rptFieldValues = "[{\"ReportFieldId\":5826,\"Value\":\"" + outcomeNotReal + "\"},{\"ReportFieldId\":6553,\"Value\":\"" + rowdata["EntityCategoryId"] + "\"},{\"ReportFieldId\":5832,\"Value\":\"" + rowdata["WorkTypeId"] + "\"},{\"ReportFieldId\":5827,\"Value\":\"" + rowdata["WorkFlowActionPointId"] + "\"}]";
        return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + " ,Id:" + selectedOcutComeId + "}" }, this.getDOcWorkFlowActionPointOutcomes);
    };
    DocumentService.prototype.getDocWFActionOutComesOnChange = function (rowdata, selectedOcutComeId) {
        var outcomeNotReal = 0;
        var rptFieldValues = "[{\"ReportFieldId\":5826,\"Value\":\"" + outcomeNotReal + "\"},{\"ReportFieldId\":6553,\"Value\":\"" + rowdata["EntityCategoryId"] + "\"},{\"ReportFieldId\":5832,\"Value\":\"" + rowdata["WorkTypeId"] + "\"},{\"ReportFieldId\":5827,\"Value\":\"" + rowdata["WorkFlowActionPointId"] + "\"}]";
        return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + " ,Id:" + selectedOcutComeId + "}" }, this.getDOcWorkFlowActionPointOutcomes);
    };
    DocumentService.prototype.getCheckOutRequestedUsers = function (rowData) {
        var rptFieldValues = "[{\"ReportFieldId\":5909,\"Value\":\"" + 964 + "\"},{\"ReportFieldId\":5910,\"Value\":\"" + rowData["DocumentId"] + "\"},{\"ReportFieldId\":5915,\"Value\":\"" + 0 + "\"},{\"ReportFieldId\":5911,\"Value\":\"" + rowData["Latest Revision No"] + "\"},{\"ReportFieldId\":5919,\"Value\":\"" + rowData["File Name"] + "\"}]";
        return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + " ,Id:" + rowData["DocumentId"] + "}" }, this.getCheckOutRequestedUsersurl);
    };
    DocumentService.prototype.getCheckOutUser = function (selDocId) {
        //let rptFieldValues = "[{\"ReportFieldId\":5826,\"Value\":\"" + outcomeNotReal + "\"},{\"ReportFieldId\":6553,\"Value\":\"" + rowdata["EntityCategoryId"] + "\"},{\"ReportFieldId\":5832,\"Value\":\"" + rowdata["WorkTypeId"] + "\"},{\"ReportFieldId\":5827,\"Value\":\"" + rowdata["WorkFlowActionPointId"] + "\"}]";
        return this.postaction({ Input: "{Id:" + selDocId + "}" }, this.getCheckOutUserurl);
    };
    //allowCheckOutCheckIn(selId,) {
    //    return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + " ,Id:" + selId + "}" }, this.allowCheckOutCheckInurl);
    //}
    DocumentService.prototype.updateDocumentStatus = function (statusId, RevisionNo) {
        var rptFieldValues = "[{\"ReportFieldId\":972,\"Value\":\"" + statusId + "\"},{\"ReportFieldId\":975,\"Value\":\"" + RevisionNo + "\"} ]";
        return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + "}" }, this.updateDocumentStatusurl);
    };
    DocumentService.prototype.getDocumentFormtFileName = function (ReferenceId, filename, RevisionNo) {
        return this.postaction({
            Input: "{FormId:" + this.DocumentListFormId + ",EntityId:" + this.DocumentdownloadEntityId + "}",
            FileInput: "{ReferenceId:" + ReferenceId + ",FileName:'" + filename + "',RevisionNo:'" + RevisionNo + "'}"
        }, this.getDocumentFormtFileNameurl);
    };
    DocumentService.prototype.CheckInDocument = function (FileInput) {
        //let rptFieldValues = "[{\"ReportFieldId\":972,\"Value\":\"" + statusId + "\"},{\"ReportFieldId\":975,\"Value\":\"" + FileInput. + "\"} ]";
        //return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + "}" }, this.updateDocumentStatusurl);
        return this.postaction({ Input: "{FormId:" + this.DocumentListFormId + "}", Fileinput: FileInput }, this.CheckInDocumentUrl);
    };
    DocumentService.prototype.getSubscribedOptionalFields = function (reportIds, fieldSubscriptionCategoryId) {
        return this.postaction({ Input: "{FormId:488,Id: " + reportIds + ",EntityId:" + fieldSubscriptionCategoryId + "}" }, this.getSubscribedOptionalFieldsURL);
    };
    DocumentService.prototype.getValuesWithDbObjectDetails = function (dbObjectId, strReportFieldIds) {
        return this.postaction({ Input: "{FormId:" + this.DocCheckoutListFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
    };
    DocumentService.prototype.docDashboardMySearchList = function (strRptFields) {
        return this.postaction({ Input: "{FormId:" + this.DashboardDocuentListFormId + ",ListReportFieldIdValues: " + strRptFields + "}" }, this.docDashboardMySearchUrl);
    };
    DocumentService.prototype.DocumentsForDashboardSearch = function (strRptFields, pageIndex, sortCol, sortDir) {
        return this.postaction({ Input: "{FormId:" + this.DashboardDocuentListFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues: " + strRptFields + "}" }, this.docSearchlistUrl);
    };
    DocumentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DocumentService);
    return DocumentService;
}(HttpHelpers_1.HttpHelpers));
exports.DocumentService = DocumentService;
//# sourceMappingURL=documents.service.js.map
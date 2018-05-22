import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {IField} from  '../../Framework/Models/Interface/IField'
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DocumentService extends HttpHelpers {

    private listFieldObjUrl = 'Common/GetListAppFormFields';
    private listDataListUrl = 'Common/GetAppFormDataList';
    private addDataUrl = 'Common/GetAddAppFormFields';
    private editDataUrl = 'Common/GetEditAppFormFields';
    private insertDocumentUrl = 'Documents/InsertDocument';
    private updateDocumentUrl = 'Documents/UpdateDocument';
    private reviseDocumentUrl = 'Documents/ReviseDocument';
    private replaceDocumentUrl = 'Documents/ReplaceDocument';
    private deleteDocumentUrl = 'Documents/DeleteDocumentData';
    private updateMultipleDocumentsUrl = 'Documents/UpdateMultipleDocuments';
    private listtreeviewfieldsurl = 'Documents/GetFieldsForTreeViewSettings';
    private updatetreeviewfieldurl = 'Documents/UpdateTreeViewFields';
    private submitEditUrl = 'Common/UpdateAppFormData';
    private submitAddUrl = 'Common/InsertAppFormData';
    private deleteUrl = 'Common/DeleteAppFormData';
    private CheckDocumentGroupInUseUrl = 'Documents/CheckDocumentGroupInUse';
    private updateFieldSubscriptionUrl = 'Documents/UpdateFieldSubscriptionSettings'; 
    private updateDocumentforDocumentGroupsUrl = 'Documents/AddDocumentsToGroups';
    private downloadDocumentUrl = 'Common/ArrayDownloadFile';
    private getDocumentFormtFileNameurl = 'Common/getDocumentFormtFileName';
    private multidownloadDocumentUrl = 'Common/MultipleDownloadFile';
    private CheckDirectAccesstoaDocumentbyManyUsersUserListUrl = 'Documents/CheckAndGetUsersAssignedToADocumentGroup';
    private GetDashboardDocumentByCategory = 'Documents/GetDashboardDocumentByCategoryForChart';
    private DocumentBasedFileType = 'Documents/GetDashboardDocumentByFileTypeForChart';
    private GetDashboardDocumentDetails = 'Documents/GetDashboardDocumentDetails';
    private keywordLookUpUrl = 'Common/GetKeywordSearchLookups';
    private AdvanceSearchLookUpUrl = 'Common/GetAdvancedSerachLookups';
    private GetTreeViewFieldsForExplorerUrl = 'Documents/GetTreeViewFieldsForExplorer';
    private GetArchivedSearches = 'Documents/GetArchivedSearches';
    private InsertArchivedSearches = 'Documents/InsertArchivedSearches';
    private DeleteSavedSearches = 'Documents/DeleteSavedSearches';
    private CheckDocumentCategoryUse = 'Documents/CheckDocumentCategoryInUse';
    private CheckRevision = 'Documents/CheckDocumentRevisions';
    private GetNextDocumentNumber = 'Documents/GetNextDocumentNumber';

    private GetWorkFlowReviewRequestListUrl = 'Documents/GetWorkFlowReviewRequestList';

    private SendCheckOutRequestUrl = 'Documents/SendCheckOutRequest';
    private SendPublishRequestUrl = 'Documents/SendPublishRequest';
    
    private ExplorerViewUrl = 'Documents/GetPagedDocumentsForExplorerView';
    private NumberFormatItemDetailsUrl = 'Documents/GetNumberFormatItemDetails'
    private InsertUpdateNumberFormatUrl = 'Documents/InsertUpdateNumberFormat'

    private DocumentPublishRequestListUrl = 'Documents/GetDocumentPublishRequestList'
    private UpdateCheckOutRequestUrl = 'Documents/UpdateCheckOutRequest'
    private UpdatePublishUrl = 'Documents/UpdatePublish'
    private getDOcWorkFlowActionPointOutcomes = 'Documents/GetDOcWorkFlowActionPointOutcomes'

    private getCheckOutRequestedUsersurl = 'Documents/GetCheckOutRequestedUserAndCheckOut'
    private getCheckOutUserurl = 'Documents/GetCheckOutUser'
    private allowCheckOutCheckInurl = 'Documents/AllowCheckOutCheckIn'
    private updateDocumentStatusurl = 'Documents/UpdateDocumentStatus'
    private UserPrivilegesofPagejUrl = 'Common/GetUserPrivilegesofPage';;
    private getSubscribedOptionalFieldsURL = 'Common/getSubscribedOptionalFields';
    private CheckInDocumentUrl = 'Documents/CheckInDocument';
    private GetExplorerFieldValuesUrl = 'Documents/GetExplorerFieldValues';
    private docDashboardMySearchUrl = 'Documents/docDashboardMySearch';
    private docSearchlistUrl = 'Documents/docSearchlist';
    private dbObjectLookUpUrl = 'Common/GetDBObjectLookupValues';

    private DocumentListFormId = 427;
    private DashboardDocuentListFormId = 473;
    private DocumentGroupsAccessibletoaUserFormId = 434;
    private DocumentGroupFormId = 442;
    private DocumentCategoryFormId = 435;
    private AllDocumentsAccessibletoaUserFormId = 444;
    private DocumentAddEditformId = 439;
    private OptionalFieldsFormId = 448;
    private DocumentforDocumentGroupsFormId = 447;
    private DocumentforDocumentGroupsMainListFormId = 450;
    private DocumentdownloadEntityId = 22;
    private DocumentRevisionListFormId = 464;
    private SendForApprovalFormId = 152;

    private TreeViewFieldsFormId = 436;
    private AccesstoaDocumentGroupbyManyUsersFormId = 453;
    private DocumentsDirectlyAccessibletoaUserFormId = 454;
    private DocumentsDirectlyAccessibletoaUserMainListFormId = 456;
    private DirectAccesstoaDocumentbyManyUsersFormId = 458;
    private DirectAccesstoaDocumentbyManyUsersUserListFormId = 463;
    private DocCheckoutListFormId = 428;
    private DocCheckoutReviewFormId = 490;
    private ReviewHistoryFormId = 441;

    private DocumentDownloadFormatFormId = 491;
    private DocumentExplorerDetails = 492;
   

    constructor(private http: Http) {
        super(http);
    }
    getDocumentListFields() {        
        return this.postaction({ Input: "{ FormId: " + this.DocumentListFormId + "}" }, this.listFieldObjUrl);
    } 

    getTreeViewFieldsForExplorer()
    {
        return this.postaction({ Input: "{ FormId: " + this.DocumentListFormId + "}" }, this.GetTreeViewFieldsForExplorerUrl);
    }

    GetExplorerFieldValues(levelno: string, strRptFields: string)
    {
        return this.postaction({
            Input: "{ FormId: " + this.DocumentListFormId + ',Id: ' + levelno + (strRptFields == '' ? '' : ",ListFilterIdValues:" + strRptFields) + "}"
        }, this.GetExplorerFieldValuesUrl);
    }

    getDocumentListData(pageIndex,sortCol,sortDir) {
        return this.postaction({ Input: "{FormId:" + this.DocumentListFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.listDataListUrl);
        //has additional input reportField and LoginUserID for proc.Need to ask whether custom model is required or not

    }

    getUserPrivilegesofPage(pageId: any, previlages: any, fromId: any) {
        return this.postaction({ Input: "{ FormId:"+ fromId +" }", PageId: pageId, Privileges: previlages }, this.UserPrivilegesofPagejUrl);
    }

    loadDocumentAddEditFields(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId: " + this.DocumentAddEditformId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId: " + this.DocumentAddEditformId + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentListFormId + ",ListLookupReportFieldIdValues:[{\"FieldId\":2423,\"ReportFieldId\": 12097, \"Value\":\"3500\"}] ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.editDataUrl);
        }
    }

    postSubmitDocument(strRptFields: string, fileData, selectedId: number, target: number) {
        if (target == 1) //add 
            return this.postaction({ Input: "{ FormId:" + this.DocumentAddEditformId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.DocumentListFormId + "}", FileInput: fileData}, this.insertDocumentUrl);
        else if(target == 2) // edit
            return this.postaction({ Input: "{ FormId:" + this.DocumentAddEditformId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentListFormId + "}" }, this.updateDocumentUrl);
        else if (target == 3) // revise
            return this.postaction({ Input: "{ FormId:" + this.DocumentAddEditformId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentListFormId + "}", FileInput: fileData }, this.reviseDocumentUrl);
        else if (target == 4) // replace
            return this.postaction({ Input: "{ FormId:" + this.DocumentAddEditformId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentListFormId + "}", FileInput: fileData }, this.replaceDocumentUrl);
    }

    updateMultipleDocuments(strReportFieldIdValues: string, reportField: number, newValue: any) {
        return this.postaction({ Input: "{FormId:" + this.DocumentAddEditformId + ",ListReportFieldIdValues:" + strReportFieldIdValues + "}", ReportField: reportField, NewValue: newValue }, this.updateMultipleDocumentsUrl);
    }

    getdocumentCategoryFeilds() {
        return this.postaction({ Input: "{FormId:" + this.DocumentCategoryFormId + "}" }, this.listFieldObjUrl);

    }

    getdocumentCategory(pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{FormId:" + this.DocumentCategoryFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" },this.listDataListUrl);

    }

    postDocumentCategoryDelete(id: any) {
        return this.postaction({ Input: "{FormId:" + this.DocumentCategoryFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }

      
    DocumentCategoryAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.DocumentCategoryFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.DocumentCategoryFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }

    AddUpdateDocumentCategory(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{ FormId:" + this.DocumentCategoryFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.DocumentCategoryFormId + "}" }, this.submitAddUrl);

        } else {
            return this.postaction({
                Input: "{ FormId:" + this.DocumentCategoryFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentCategoryFormId + "}"}, this.submitEditUrl);
        }
    }

    getDocumentGroupsAccessibletoaUserFields() {
        return this.postaction({ Input: "{ FormId: " + this.DocumentGroupsAccessibletoaUserFormId + "}" }, this.listFieldObjUrl);
    } 

    getDocumentGroupsAccessibletoaUserData(pageIndex, sortCol, sortDir, id: any) {
        return this.postaction({ Input: "{FormId:" + this.DocumentGroupsAccessibletoaUserFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id:" + id + "}" }, this.listDataListUrl);
    }

    documentGroupsAccessibletoaUserUpdate(pageDetails, selectId) {
        return this.postaction({ Input: "{ FormId:" + this.DocumentGroupsAccessibletoaUserFormId + ",ListReportFieldIdValues:" + pageDetails + ",Id:" + selectId + "}" }, this.submitEditUrl);
    }
    getDocumentTreeviewListFields() {
        return this.postaction({ Input: "{ FormId: " + this.TreeViewFieldsFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":24,\"Value\":\"5\"},{\"ReportFieldId\":604,\"Value\":\"30\"}]}" }, this.listtreeviewfieldsurl);
    }  
    updateDocumentTreeviewListFields(Reportfieldids: any, target: number) {
        return this.postaction({ Input: "{ FormId: " + this.TreeViewFieldsFormId + ",ListReportFieldIdValues:[{\"ReportFieldId\":604,\"Value\":\"30\"}]}", Reportfieldids, target: target.toString()}, this.updatetreeviewfieldurl);
    }  
    getDocumentGroupFields() {
        return this.postaction({ Input: "{FormId:" + this.DocumentGroupFormId + "}" }, this.listFieldObjUrl);
    }
    getDocumentGroupData(pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{ FormId: " + this.DocumentGroupFormId + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    loadtDocumentGroupAddEdit(selectedId: number, target: number) {
        if (target == 1) {
            return this.postaction({ Input: "{ FormId:" + this.DocumentGroupFormId + "}" }, this.addDataUrl);
        }
        else {
            return this.postaction({ Input: "{ FormId:" + this.DocumentGroupFormId + ",ParentFormId:" + this.DocumentGroupFormId + ",Id:" + selectedId + "}" }, this.editDataUrl);
        }
    }
    DocumentGroupSubmitAddEdit(strRptFields: string, selectedId: number, target: number) {
        if (target == 1)//add 
        {
            return this.postaction({ Input: "{FormId:" + this.DocumentGroupFormId + " ,ListReportFieldIdValues: " + strRptFields + ",ParentFormId:" + this.DocumentGroupFormId + "}" }, this.submitAddUrl);
        } else {
            return this.postaction({ Input: "{FormId:" + this.DocumentGroupFormId + " ,ListReportFieldIdValues: " + strRptFields + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentGroupFormId + "}" }, this.submitEditUrl);
        }
    }
    checkDocumentGroupIsInUse(id: any) {      
        return this.postaction({ Input: "{FormId:" + this.DocumentGroupFormId + ",Id:" + id + "}" }, this.CheckDocumentGroupInUseUrl);
    }
    postDocumentGroupDelete(id: any) {
        return this.postaction({ Input: "{FormId:" + this.DocumentGroupFormId + " ,Id:" + id + "}" }, this.deleteUrl);
    }
  
    getAllDocumentsAccessibletoaUserFields() {
        return this.postaction({ Input: "{ FormId: " + this.AllDocumentsAccessibletoaUserFormId + "}" }, this.listFieldObjUrl);
    }
    getAllDocumentsAccessibletoaUserData(pageIndex, sortCol, sortDir, strRptFields: string) {
        return this.postaction({ Input: "{FormId:" + this.AllDocumentsAccessibletoaUserFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:" + strRptFields + "}" }, this.listDataListUrl);
    }

    getOptionalFieldsListFields() {
        return this.postaction({ Input: "{ FormId: " + this.OptionalFieldsFormId + "}" }, this.listFieldObjUrl);
    }  

    getOptionalFieldsListData(pageIndex, sortCol, sortDir, fieldSubscriptionCategoryId:any) {
        return this.postaction({ Input: "{FormId:" + this.OptionalFieldsFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListReportFieldIdValues:[{\"ReportFieldId\":5074,\"Value\":" + fieldSubscriptionCategoryId + "}]}" }, this.listDataListUrl);
    }

    updateOptionalFields(strRptFields: string) {
        return this.postaction({ Input: strRptFields}, this.updateFieldSubscriptionUrl);
    }
    getDocumentforDocumentGroupsFields() {
        return this.postaction({ Input: "{FormId:" + this.DocumentforDocumentGroupsFormId + "}" }, this.listFieldObjUrl);
    }
    getDocumentforDocumentGroupsData(strRptFields: string, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
        return this.postaction({ Input: "{ FormId: " + this.DocumentforDocumentGroupsFormId + " ,ListReportFieldIdValues: " + strRptFields + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
    getDocumentforDocumentGroupsMainListFields() {
        return this.postaction({ Input: "{FormId: " + this.DocumentforDocumentGroupsMainListFormId + "}" }, this.listFieldObjUrl);
    }
    getDocumentforDocumentGroupsMainListData(DocumentGroupId: any, index: number, column: any, direction: any) {
        return this.postaction({ Input: "{FormId:" + this.DocumentforDocumentGroupsMainListFormId + ",Id: " + DocumentGroupId + ",SortColumn: '" + column + "',SortDirection: '" + direction + "',PageIndex: " + index + "}" }, this.listDataListUrl);
    }
    updateDocumentforDocumentGroupsMainList(strRptFields: string, UpdateAccessRights: number) {
        return this.postaction({ Input: "{FormId: " + this.DocumentforDocumentGroupsMainListFormId + " ,ListReportFieldIdValues: " + strRptFields + "}", UpdateAccessRights }, this.updateDocumentforDocumentGroupsUrl);
    }
    DeleteDocumentforDocumentGroupsData(fieldobj: any) {
        return this.postaction({ Input: "{FormId:" + this.DocumentforDocumentGroupsFormId + ",ListReportFieldIdValues:" + fieldobj + ",Id:0}" }, this.deleteUrl);
    }
    deleteDocument(pageDetails,id: any) {
        return this.postaction({
            Input: "{FormId:" + this.DocumentListFormId + ",Id:" + id + ",ListReportFieldIdValues:" + pageDetails + "}"}, this.deleteDocumentUrl);
    }
    DocumentDownloadFile(ReferenceId: any, filename: any, RevisionNo: any) {
        return this.downloadaction({
            Input: "{FormId:" + this.DocumentListFormId + ",EntityId:" + this.DocumentdownloadEntityId + "}",
            FileInput: "{ReferenceId:" + ReferenceId + ",FileName:'" + filename + "',RevisionNo:'" + RevisionNo + "'}"}, this.downloadDocumentUrl);
    }
    multiDocumentDownloadFile(FileInput) {
        return this.downloadaction({ Input: "{FormId:" + this.DocumentListFormId + ",EntityId:" + this.DocumentdownloadEntityId + "}", Fileinput: FileInput}, this.multidownloadDocumentUrl);
    }
    getAccesstoaDocumentGroupbyManyUsersFields() {
        return this.postaction({ Input: "{FormId: " + this.AccesstoaDocumentGroupbyManyUsersFormId + "}" }, this.listFieldObjUrl);
    }
    getAccesstoaDocumentGroupbyManyUsersData(strRptFields: any, index: number, column: any, direction: any) {
        return this.postaction({ Input: "{FormId:" + this.AccesstoaDocumentGroupbyManyUsersFormId + ",Id: 0"  + " ,ListReportFieldIdValues: " + strRptFields + ",SortColumn: '" + column + "',SortDirection: '" + direction + "',PageIndex: " + index + "}" }, this.listDataListUrl);
    }
    updateAccesstoaDocumentGroupbyManyUsers(strRptFields: string, documentGroupId: any) {
        return this.postaction({ Input: "{FormId: " + this.AccesstoaDocumentGroupbyManyUsersFormId + ",Id:" + documentGroupId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
    }
    getDocumentsDirectlyAccessibletoaUserFields() {
        return this.postaction({ Input: "{FormId:" + this.DocumentsDirectlyAccessibletoaUserFormId + "}" }, this.listFieldObjUrl);
    }
     getDocumentsDirectlyAccessibletoaUserData(strRptFields: string, pageIndex?: number, sortCol?: string, sortDir?: string, filter?: string) {
         return this.postaction({ Input: "{ FormId: " + this.DocumentsDirectlyAccessibletoaUserFormId + " ,ListReportFieldIdValues: " + strRptFields + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',PageIndex:" + pageIndex + "}" }, this.listDataListUrl);
    }
     getDocumentsDirectlyAccessibletoaUserMainListFields() {
         return this.postaction({ Input: "{FormId: " + this.DocumentsDirectlyAccessibletoaUserMainListFormId + "}" }, this.listFieldObjUrl);
     }
     getDocumentsDirectlyAccessibletoaUserMainListData(UserIdId: any, index: number, column: any, direction: any) {
         return this.postaction({ Input: "{FormId:" + this.DocumentsDirectlyAccessibletoaUserMainListFormId + ",Id: " + UserIdId + ",SortColumn: '" + column + "',SortDirection: '" + direction + "',PageIndex: " + index + "}" }, this.listDataListUrl);
     }
     updateDocumentsDirectlyAccessibletoaUserMainList(strRptFields: string, UserIdId: number) {
         return this.postaction({ Input: "{FormId: " + this.DocumentsDirectlyAccessibletoaUserMainListFormId + ",Id: " + UserIdId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
     }
     DeleteDocumentsDirectlyAccessibletoaUserMainList(strRptFields: any, UserIdId: any) {
         return this.postaction({ Input: "{FormId:" + this.DocumentsDirectlyAccessibletoaUserFormId + ",Id: " + UserIdId + ",ListReportFieldIdValues:" + strRptFields + "}" }, this.deleteUrl);
     }
     getDirectAccesstoaDocumentbyManyUsersFields() {
         return this.postaction({ Input: "{FormId:" + this.DirectAccesstoaDocumentbyManyUsersFormId + "}" }, this.listFieldObjUrl);
     }
     getDirectAccesstoaDocumentbyManyUsersData(pageIndex, sortCol, sortDir) {
         return this.postaction({ Input: "{FormId:" + this.DirectAccesstoaDocumentbyManyUsersFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',Id: 0}" }, this.listDataListUrl);
     }
     getDirectAccesstoaDocumentbyManyUsersUserListFields() {
         return this.postaction({ Input: "{FormId: " + this.DirectAccesstoaDocumentbyManyUsersUserListFormId + "}" }, this.listFieldObjUrl);
     }
     getDirectAccesstoaDocumentbyManyUsersUserListData(strRptFields: any, index: number, column: any, direction: any) {
         return this.postaction({ Input: "{FormId:" + this.DirectAccesstoaDocumentbyManyUsersUserListFormId + ",Id: 0" + " ,ListReportFieldIdValues: " + strRptFields + ",SortColumn: '" + column + "',SortDirection: '" + direction + "',PageIndex: " + index + "}" }, this.listDataListUrl);
     }
     checkDirectAccesstoaDocumentbyManyUsersUserList(strRptFields: string) {
         return this.postaction({ Input: "{FormId: " + this.DirectAccesstoaDocumentbyManyUsersUserListFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.CheckDirectAccesstoaDocumentbyManyUsersUserListUrl);
     }
     updatekDirectAccesstoaDocumentbyManyUsersUserList(strRptFields: string) {
         return this.postaction({ Input: "{FormId: " + this.DirectAccesstoaDocumentbyManyUsersUserListFormId + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.submitEditUrl);
     }
     getDocumentRevisionList(documentId:any, pageIndex, sortCol, sortDir) {
         return this.postaction({ Input: "{FormId:" + this.DocumentRevisionListFormId + ",Id: " + documentId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.listDataListUrl);
     }
     getDocumentRevisionFeildList() {
         return this.postaction({ Input: "{FormId:" + this.DocumentRevisionListFormId + "}" }, this.listFieldObjUrl);
     }
     postRevisionDelete(pageDetails, documentId: any) {
         return this.postaction({
             Input: "{FormId:" + this.DocumentRevisionListFormId + ",Id:" + documentId + ",ListReportFieldIdValues:" + pageDetails + "}"}, this.deleteUrl);
     }
     /* Document DashBoard */

     getOrgCategoryforDashBoard() {
         return this.postaction({ Input: "{}" }, this.GetDashboardDocumentByCategory);
     }

     getDocumentFileTypeDashBoard() {
         return this.postaction({ Input: "{}" }, this.DocumentBasedFileType);
     }
     GetDashboardDocumentFeildId(sortCol?: string, sortDir?: string) {
         return this.postaction({ Input: "{FormId:" + this.DashboardDocuentListFormId + "}" }, this.listFieldObjUrl);
     }
     GetDashboardDocument(sortCol?: string, sortDir?: string) {
         return this.postaction({ Input: "{FormId:" + this.DashboardDocuentListFormId  + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}"}, this.GetDashboardDocumentDetails);
     }

     getWorkFlowReviewRequestList(pageIndex, sortCol, sortDir) {
         return this.postaction({ Input: "{FormId:" + this.DocCheckoutListFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.listDataListUrl);
     }
     getDocumentKeywordField() {
         return this.postaction({ Input: "{FormId:486}" }, this.keywordLookUpUrl);
     }
     getDocumentAdvanceSearchField() {
         return this.postaction({ Input: "{FormId:487}" }, this.AdvanceSearchLookUpUrl);
     }
     LoadAdvanceSearchSaveAs(strRptFields: string) {
         let rptFieldValues1 = "[{\"FieldId\":2558,\"ReportFieldId\":2145,\"Value\":\"" + "32" + "\"},{\"FieldId\":2558,\"ReportFieldId\":2146,\"Value\":\"" + "1" + "\"} ]";
         return this.postaction({ Input: "{FormId:488,ListLookupReportFieldIdValues: " + rptFieldValues1 + "}" }, this.addDataUrl);
     }    
     DocumentKeywordSearch(value: any, index: number, direction: any, column: any) {
         return this.postaction({ Input: "{ FormId:486,Filter: '" + value + "',SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:1 ,IsAdvancedSearch:0}"}, this.listDataListUrl);
     }
     DocumentAdvanceSeachResult(value: any, index: number, direction: any, column: any) {
         return this.postaction({ Input: "{ FormId:487,ListFilterIdValues: " + value + ",SortColumn:'" + column + "',SortDirection:'" + direction + "',PageIndex:" + index + ",IsKeywordSearch:0 ,IsAdvancedSearch:1}" }, this.listDataListUrl);
     }

     SendCheckoutRequest(fieldObj,selectedId) {
         return this.postaction({Input: "{ FormId: " + this.SendForApprovalFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldObj) + ",Id:" + selectedId + "}" }, this.SendCheckOutRequestUrl);
     }
     SendPublishRequest(fieldObj, selectedId, DocId) {
         return this.postaction({ Input: "{ FormId: " + this.SendForApprovalFormId + ",ListReportFieldIdValues:" + JSON.stringify(fieldObj) + ",Id:" + DocId  +  "}" }, this.SendPublishRequestUrl);
     }
     GetArchivedSearchesddl(strRptFields: string) {
         return this.postaction({ Input: "{FormId:487,ListReportFieldIdValues: " + strRptFields + "}" }, this.GetArchivedSearches);
     }
     DocAdvanceSearchSaveAs() {
         return this.postaction({ Input: "{FormId:489}" }, this.listFieldObjUrl);
     }
     AddSearches(strRptFields: string, reportfieldIds: any, selectedId: number, target: number) {
         if (target == 1)//add 
         {
             return this.postaction({
                 Input: "{FormId:489 ,ListReportFieldIdValues: " + strRptFields + " }", Input1: reportfieldIds
             }, this.InsertArchivedSearches);
         }
     }

     getDocumentCheckoutListFields() {
         return this.postaction({ Input: "{ FormId: " + this.DocCheckoutListFormId + "}" }, this.listFieldObjUrl);
     } 
     getReviewHistoryColumns() {
         return this.postaction({ Input: "{ FormId:" + this.ReviewHistoryFormId + " }" }, this.listFieldObjUrl);
     }

     getReviewHistoryData(workflowEntityId) {
         return this.postaction({ Input: "{ FormId: " + this.ReviewHistoryFormId + ",Id:" + workflowEntityId + "}" }, this.listDataListUrl);
     }

     getDocumentCheckoutReviewFields(fieldObj, strLookupRptFields: string) {
         return this.postaction({ Input: "{ FormId: " + this.DocCheckoutReviewFormId + ",ListLookupReportFieldIdValues:" + strLookupRptFields +",ListReportFieldIdValues:" + fieldObj + "}" }, this.editDataUrl);
     } 

     getDocumentPublishReviewFields(fieldObj, strLookupRptFields: string) {
         return this.postaction({ Input: "{ FormId: " + this.DocCheckoutReviewFormId + ",ListLookupReportFieldIdValues:" + strLookupRptFields +",ListReportFieldIdValues:" + fieldObj + "}" }, this.editDataUrl);
     } 

     postSubmitCheckoutReview(strRptFields: string, Id: number, entityId: number) {
         return this.postaction({ Input: "{ FormId:" + this.DocCheckoutReviewFormId + ", Id:" + Id + " ,ListReportFieldIdValues: " + strRptFields + "}", CheckOutRequestId: entityId }, this.UpdateCheckOutRequestUrl);
     }
     postSubmitPublishReview(strRptFields: string, Id: number) {
         return this.postaction({ Input: "{ FormId:" + this.DocCheckoutReviewFormId + ", Id:" + Id + " ,ListReportFieldIdValues: " + strRptFields + "}" }, this.UpdatePublishUrl);
     }
     getdocumentdownloadformatfields() {
         return this.postaction({ Input: "{ FormId:" + this.DocumentDownloadFormatFormId + "}" }, this.editDataUrl);
     }
     getNumberFormatItemDetails() {
         return this.postaction({ Input: "{ FormId:" + this.DocumentDownloadFormatFormId + "}", NumberFormatCategoryId: 14, Target:7 }, this.NumberFormatItemDetailsUrl);
     }
     UpdateNumberFormatDetails(NumberFormatInput: any) {
         return this.postaction({ Input: "{ FormId:" + this.DocumentDownloadFormatFormId + "}", NumberFormatInput: NumberFormatInput, NumberFormatCategoryId: 14 }, this.InsertUpdateNumberFormatUrl);
     }
     getDocumentListOnTreeSelection(pageIndex, sortCol, sortDir, filterIdValues) {
         debugger
         if (filterIdValues != "") {

             return this.postaction({
                 Input: "{FormId:" + this.DocumentListFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "',ListFilterIdValues:" + filterIdValues + "}" }, this.ExplorerViewUrl);
         }
         else {

             return this.postaction({
                 Input: "{FormId:" + this.DocumentListFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.ExplorerViewUrl);

         }
         //has additional input reportField and LoginUserID for proc.Need to ask whether custom model is required or not

     }
     loadDocumentExplorerDetails(selectedId: number) {
         return this.postaction({ Input: "{ FormId: " + this.DocumentExplorerDetails + ",Id:" + selectedId + ",ParentFormId:" + this.DocumentExplorerDetails + ",ListLookupReportFieldIdValues:[{\"FieldId\":2423,\"ReportFieldId\": 12097, \"Value\":\"3500\"}] ,ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"1\"}]}" }, this.editDataUrl);
     }

     getdocumentpublishrequestlist(pageIndex, sortCol, sortDir) {
         return this.postaction({ Input: "{FormId:" + this.DocCheckoutListFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir + "'}" }, this.DocumentPublishRequestListUrl);
     }
     
     AdvanceSearchDelete(id) {
         return this.postaction({ Input: "{FormId:488,Id: "+ id +"}"}, this.DeleteSavedSearches);
     }

     CheckDocumentCategoryInUse(id: any) {
         return this.postaction({ Input: "{FormId:" + this.DocumentCategoryFormId + " ,Id:" + id + "}" }, this.CheckDocumentCategoryUse);
     }
     CheckRevisionExists(id: any) {
         return this.postaction({ Input: "{FormId:" + this.DocumentRevisionListFormId + " ,Id:" + id + "}" }, this.CheckRevision);
     }

     getNextDocumentNumber()
     {
         return this.postaction({ Input: "{}" }, this.GetNextDocumentNumber);
     }

     getDocWFActionOutComes(rowdata,selectedOcutComeId) {
         var outcomeNotReal = 0;
         let rptFieldValues = "[{\"ReportFieldId\":5826,\"Value\":\"" + outcomeNotReal + "\"},{\"ReportFieldId\":6553,\"Value\":\"" + rowdata["EntityCategoryId"] + "\"},{\"ReportFieldId\":5832,\"Value\":\"" + rowdata["WorkTypeId"] + "\"},{\"ReportFieldId\":5827,\"Value\":\"" + rowdata["WorkFlowActionPointId"] + "\"}]";
         return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + " ,Id:" + selectedOcutComeId +"}" }, this.getDOcWorkFlowActionPointOutcomes);
     }

     getDocWFActionOutComesOnChange(rowdata, selectedOcutComeId) {
         var outcomeNotReal = 0;
         let rptFieldValues = "[{\"ReportFieldId\":5826,\"Value\":\"" + outcomeNotReal + "\"},{\"ReportFieldId\":6553,\"Value\":\"" + rowdata["EntityCategoryId"] + "\"},{\"ReportFieldId\":5832,\"Value\":\"" + rowdata["WorkTypeId"] + "\"},{\"ReportFieldId\":5827,\"Value\":\"" + rowdata["WorkFlowActionPointId"] + "\"}]";
         return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + " ,Id:" + selectedOcutComeId + "}" }, this.getDOcWorkFlowActionPointOutcomes);
     }
    
     getCheckOutRequestedUsers(rowData) {     
         let rptFieldValues = "[{\"ReportFieldId\":5909,\"Value\":\"" + 964 + "\"},{\"ReportFieldId\":5910,\"Value\":\"" + rowData["DocumentId"] + "\"},{\"ReportFieldId\":5915,\"Value\":\"" + 0 + "\"},{\"ReportFieldId\":5911,\"Value\":\"" + rowData["Latest Revision No"] + "\"},{\"ReportFieldId\":5919,\"Value\":\"" + rowData["File Name"] + "\"}]";
         return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + " ,Id:" + rowData["DocumentId"] + "}" }, this.getCheckOutRequestedUsersurl);
     }
     getCheckOutUser(selDocId) {
         //let rptFieldValues = "[{\"ReportFieldId\":5826,\"Value\":\"" + outcomeNotReal + "\"},{\"ReportFieldId\":6553,\"Value\":\"" + rowdata["EntityCategoryId"] + "\"},{\"ReportFieldId\":5832,\"Value\":\"" + rowdata["WorkTypeId"] + "\"},{\"ReportFieldId\":5827,\"Value\":\"" + rowdata["WorkFlowActionPointId"] + "\"}]";
         return this.postaction({ Input: "{Id:" + selDocId + "}" }, this.getCheckOutUserurl);
     }
     //allowCheckOutCheckIn(selId,) {
         
     //    return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + " ,Id:" + selId + "}" }, this.allowCheckOutCheckInurl);
     //}
     updateDocumentStatus(statusId,RevisionNo) {
         let rptFieldValues = "[{\"ReportFieldId\":972,\"Value\":\"" + statusId + "\"},{\"ReportFieldId\":975,\"Value\":\"" +RevisionNo+ "\"} ]";
         return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + "}" }, this.updateDocumentStatusurl);
     }
     getDocumentFormtFileName(ReferenceId: any, filename: any, RevisionNo: any) {
         return this.postaction({
             Input: "{FormId:" + this.DocumentListFormId + ",EntityId:" + this.DocumentdownloadEntityId + "}",
             FileInput: "{ReferenceId:" + ReferenceId + ",FileName:'" + filename + "',RevisionNo:'" + RevisionNo + "'}"
         }, this.getDocumentFormtFileNameurl);
     }

     CheckInDocument(FileInput) {
         //let rptFieldValues = "[{\"ReportFieldId\":972,\"Value\":\"" + statusId + "\"},{\"ReportFieldId\":975,\"Value\":\"" + FileInput. + "\"} ]";
         //return this.postaction({ Input: "{ListReportFieldIdValues:" + rptFieldValues + "}" }, this.updateDocumentStatusurl);
         return this.postaction({ Input: "{FormId:" + this.DocumentListFormId + "}", Fileinput: FileInput }, this.CheckInDocumentUrl);
     }

     getSubscribedOptionalFields(reportIds: string, fieldSubscriptionCategoryId: any) {
         return this.postaction({ Input: "{FormId:488,Id: " + reportIds + ",EntityId:" + fieldSubscriptionCategoryId + "}" }, this.getSubscribedOptionalFieldsURL);
     }

     getValuesWithDbObjectDetails(dbObjectId: number, strReportFieldIds: string) {
         return this.postaction({ Input: "{FormId:" + this.DocCheckoutListFormId + ", Id: " + dbObjectId + (strReportFieldIds == '' ? '' : ",ListReportFieldIdValues:" + strReportFieldIds) + "}" }, this.dbObjectLookUpUrl);
     }

     docDashboardMySearchList(strRptFields: string) {
         return this.postaction({ Input: "{FormId:" + this.DashboardDocuentListFormId + ",ListReportFieldIdValues: " + strRptFields +"}" }, this.docDashboardMySearchUrl);
     }
     DocumentsForDashboardSearch(strRptFields: string, pageIndex?: number, sortCol?: string, sortDir?: string){
         return this.postaction({ Input: "{FormId:" + this.DashboardDocuentListFormId + ",PageIndex:" + pageIndex + ",SortColumn:'" + sortCol + "',SortDirection:'" + sortDir +"',ListReportFieldIdValues: " + strRptFields + "}" }, this.docSearchlistUrl);
     }
                                                                                                            
} 
using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Documents.Entity;
using Indus.iDrawings.Documents.Models;
using Indus.iDrawings.Documents.Models.Items;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Utils.Security.Validation;
using Indus.iDrawings.Web;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Indus.iDrawings.vN.Controllers
{
    public class DocumentsController : iDrawingsController
    {
        public DocumentsController()
        {
           
        }

        [ActionName("InsertDocument")]
        public JsonResult InsertDocument(string Input, string FileInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                FileDataInput fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new DocumentsModel(BaseInput).DocumentsItem.InsertDocument(applnInp, fileDataInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateDocument")]
        public JsonResult UpdateDocument(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new DocumentsModel(BaseInput).DocumentsItem.UpdateDocument(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateMultipleDocuments")]
        public JsonResult UpdateMultipleDocuments(string Input, int ReportField, string NewValue)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new DocumentsModel(BaseInput).DocumentsItem.UpdateMultipleDocuments(applnInp, ReportField, NewValue);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ReviseDocument")]
        public JsonResult ReviseDocument(string Input, string FileInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                FileDataInput fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
                MessageReturn messageReturn = new DocumentsModel(BaseInput).DocumentsItem.ReviseDocument(applnInp, fileDataInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ReplaceDocument")]
        public JsonResult ReplaceDocument(string Input, string FileInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                FileDataInput fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
                MessageReturn messageReturn = new DocumentsModel(BaseInput).DocumentsItem.ReplaceDocument(applnInp, fileDataInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetFieldsForTreeViewSettings")]
        public JsonResult GetFieldsForTreeViewSettings(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new DocumentsModel(BaseInput).DocumentsItem.GetFieldsForTreeViewSettings(applnInp);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateTreeViewFields")]
        public JsonResult UpdateTreeViewFields(string Input, string[] Reportfieldids, int Target)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new DocumentsModel(BaseInput).DocumentsItem.UpdateTreeViewFields(applnInp, Reportfieldids, Target);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckDocumentGroupInUse")]
        public JsonResult CheckDocumentGroupInUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnval = new DocumentsModel(BaseInput).DocumentsItem.CheckDocumentGroupInUse(applnInp);
                var jsonResult = Json(returnval, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateFieldSubscriptionSettings")]
        public JsonResult UpdateFieldSubscriptionSettings(string Input)
        {
            try
            {
                List<FieldSubscriptionInput> inp = JsonConvert.DeserializeObject<List<FieldSubscriptionInput>>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new DocumentsModel(BaseInput).DocumentsItem.UpdateFieldSubscriptionSettings(inp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("AddDocumentsToGroups")]
        public JsonResult AddDocumentsToGroups(string Input, int UpdateAccessRights)
        {
            try
            {
                ApplicationFormInput inp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new DocumentsModel(BaseInput).DocumentsItem.AddDocumentsToGroups(inp, UpdateAccessRights);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckAndGetUsersAssignedToADocumentGroup")]
        public JsonResult CheckAndGetUsersAssignedToADocumentGroup(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new DocumentsModel(BaseInput).DocumentsItem.CheckAndGetUsersAssignedToADocumentGroup(applnInp);
                //objDefaultApiReturn = new CommonController().logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetDashboardDocumentByCategoryForChart")]
        public JsonResult GetDashboardDocumentByCategoryForChart(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new DocumentsModel(BaseInput).DocumentsItem.GetDashboardDocumentByCategoryForChart(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDashboardDocumentByFileTypeForChart")]
        public JsonResult GetDashboardDocumentByFileTypeForChart(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new DocumentsModel(BaseInput).DocumentsItem.GetDashboardDocumentByFileTypeForChart(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetDashboardDocumentDetails")]
        public JsonResult GetDashboardDocumentDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new DocumentsModel(BaseInput).DocumentsItem.GetDashboardDocumentDetails(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("SendCheckOutRequest")]
        public JsonResult SendCheckOutRequest(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new DocumentsModel(BaseInput).DocumentsItem.SendCheckOutRequest(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        public JsonResult SendPublishRequest(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new DocumentsModel(BaseInput).DocumentsItem.SendPublishRequest(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetTreeViewFieldsForExplorer")]
        public JsonResult GetTreeViewFieldsForExplorer(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                List<TreeNode> lstnode = new DocumentsModel(BaseInput).DocumentsItem.GetTreeViewFieldsForExplorer(applnInp);
                var jsonResult = Json(lstnode, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetExplorerFieldValues")]
        public JsonResult GetExplorerFieldValues(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                List<TreeNode> lstnode = new DocumentsModel(BaseInput).DocumentsItem.GetExplorerFieldValues(applnInp);
                var jsonResult = Json(lstnode, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetArchivedSearches")]
        public JsonResult GetArchivedSearches(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
              //  Session["SessionId"] = Session.SessionID;
                DefaultApiReturn objDefaultApiReturn = new DocumentsModel(BaseInput).DocumentsItem.GetArchivedSearches(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertArchivedSearches")]
        public JsonResult InsertArchivedSearches(string Input,string Input1)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                List<SavedSearchInput> Inp1 = JsonConvert.DeserializeObject<List<SavedSearchInput>>(Input1);

           
                MessageReturn messageReturn = new DocumentsModel(BaseInput).DocumentsItem.InsertArchivedSearches(applnInp, Inp1);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetNumberFormatItemDetails")]
        public JsonResult GetNumberFormatItemDetails(string Input, int NumberFormatCategoryId, int Target)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DocumentsModel(BaseInput).DocumentsItem.GetNumberFormatItemDetails(applnInp, NumberFormatCategoryId, Target);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
            
        }

        [ActionName("InsertUpdateNumberFormat")]
        public JsonResult InsertUpdateNumberFormat(string Input, string NumberFormatInput, int NumberFormatCategoryId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                List<Documents.Entity.NumberFormatInput> Inp1 = JsonConvert.DeserializeObject<List<Documents.Entity.NumberFormatInput>>(NumberFormatInput);
                MessageReturn messageReturn = new DocumentsModel(BaseInput).DocumentsItem.InsertUpdateNumberFormat(applnInp, Inp1, NumberFormatCategoryId);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("DeleteSavedSearches")]
        public JsonResult DeleteSavedSearches(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new DocumentsModel(BaseInput).DocumentsItem.DeleteSavedSearches(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetPagedDocumentsForExplorerView")]
        public JsonResult GetPagedDocumentsForExplorerView(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DocumentsModel(BaseInput).DocumentsItem.GetPagedDocumentsForExplorerView(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDocumentPublishRequestList")]
        public JsonResult GetDocumentPublishRequestList(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DocumentsModel(BaseInput).DocumentsItem.GetDocumentPublishRequestList(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateCheckOutRequest")]
        public JsonResult UpdateCheckOutRequest(string Input, int CheckOutRequestId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new DocumentsModel(BaseInput).DocumentsItem.UpdateCheckOutRequest(applnInp, CheckOutRequestId);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdatePublish")]
        public JsonResult UpdatePublish(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new DocumentsModel(BaseInput).DocumentsItem.UpdatePublishRequest(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("CheckDocumentCategoryInUse")]
        public JsonResult CheckDocumentCategoryInUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                bool CheckDocumentCategory = new DocumentsModel(BaseInput).DocumentsItem.CheckDocumentCategoryInUse(applnInp);
                var jsonResult = Json(CheckDocumentCategory, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("CheckDocumentRevisions")]
        public JsonResult CheckDocumentRevisions(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                bool CheckDocumentCategory = new DocumentsModel(BaseInput).DocumentsItem.CheckDocumentRevisions(applnInp);
                var jsonResult = Json(CheckDocumentCategory, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetNextDocumentNumber")]
        public JsonResult GetNextDocumentNumber(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int DocumentNumber = new DocumentsModel(BaseInput).DocumentsItem.GetNextDocumentNumber(applnInp);
                var jsonResult = Json(DocumentNumber, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDOcWorkFlowActionPointOutcomes")]
        public JsonResult GetDOcWorkFlowActionPointOutcomes(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DocumentsModel(BaseInput).DocumentsItem.GetDOcWorkFlowActionPointOutcomes(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateDocumentStatus")]
        public JsonResult UpdateDocumentStatus(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMsgReturn = new DocumentsModel(BaseInput).DocumentsItem.UpdateDocumentStatus(applnInp);
                var jsonResult = Json(objMsgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetCheckOutUser")]
        public JsonResult GetCheckOutUser(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMsgReturn = new DocumentsModel(BaseInput).DocumentsItem.GetCheckOutUser(applnInp);
                var jsonResult = Json(objMsgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCheckOutRequestedUserAndCheckOut")]
        public JsonResult GetCheckOutRequestedUserAndCheckOut(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMsgReturn = new DocumentsModel(BaseInput).DocumentsItem.GetCheckOutRequestedUserAndCheckOut(applnInp);
                var jsonResult = Json(objMsgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        public JsonResult DeleteDocumentData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new DocumentsModel(BaseInput).DocumentsItem.DeleteDocumentData(applnInp);               
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                string ErrorException = ex.ToString() + " Error Message: " + Input;
                return new CommonController().ErrorMessage(ErrorException);
            }
        }

        [ActionName("CheckInDocument")]
        public JsonResult CheckInDocument(string Input, string Fileinput)
        {
            try
            {
                MessageReturn objMessageReturn = new MessageReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                List<FileDataInput> fileInp = new List<FileDataInput>();
                fileInp = JsonConvert.DeserializeObject<List<FileDataInput>>(Fileinput);               
                objMessageReturn = new DocumentsModel(BaseInput).DocumentsItem.CheckInDocument(applnInp, fileInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        //[ActionName("AllowCheckOutCheckIn")]
        //public JsonResult AllowCheckOutCheckIn(string Input,bool IsCheckOut, int DBObjectColumnId, int ItemId, int RevisionNo, int RequestUserId, bool IsCancelled, string FileName)
        //{
        //    try
        //    {
        //        ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
        //        int objreturn = new DocumentsModel(BaseInput).DocumentsItem.AllowCheckOutCheckIn(applnInp, IsCheckOut, DBObjectColumnId, ItemId, RevisionNo, RequestUserId, IsCancelled, FileName);
        //        var jsonResult = Json(objreturn, JsonRequestBehavior.AllowGet);
        //        jsonResult.MaxJsonLength = int.MaxValue;
        //        return jsonResult;
        //    }
        //    catch (Exception ex)
        //    {
        //        return new CommonController().ErrorMessage(ex.ToString());
        //    }
        //}

        [ActionName("GetDocumentListAnalytics")]
        public JsonResult GetDocumentListAnalytics(string Input,  int AnalyticsType, string ColumnName)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                TypeValidation typeVal = new TypeValidation();
                bool blnReturn = true;
                if (applnInp.Filter != null)
                {
                    blnReturn = typeVal.checkWhiteList(applnInp.Filter, 15);
                }
                if (blnReturn == true)
                {
                    string strReturn = new DocumentsModel(BaseInput).DocumentsItem.GetDocumentListAnalytics(applnInp, AnalyticsType, ColumnName);
                    var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;
                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        //docDashboardMySearch

        [ActionName("docDashboardMySearch")]
        public JsonResult docDashboardMySearch(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DocumentsModel(BaseInput).DocumentsItem.docDashboardMySearch(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
 
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("docSearchlist")]
        public JsonResult docSearchlist(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DocumentsModel(BaseInput).DocumentsItem.docSearchlist(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;

            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

    }
}
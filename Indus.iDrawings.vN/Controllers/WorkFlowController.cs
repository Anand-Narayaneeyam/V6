using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Web;
using Indus.iDrawings.WorkFlow.Entity;
using Indus.iDrawings.WorkFlow.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Indus.iDrawings.vN.Controllers
{
    public class WorkFlowController : iDrawingsController
    {
        public WorkFlowController()
        {

        }

        // GET: WorkFlow
        public ActionResult Index()
        {
            return View();
        }

        [ActionName("CheckUserExistInActionPoint")]
        public JsonResult CheckUserExistInActionPoint(string input, string siteIds, int siteId, int target)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                string returnIds = new WorkFlowModel(BaseInput).WorkFlowItem.CheckUserExistInActionPoint(applicationFormInput, siteIds, siteId, target);
                var jsonResult = Json(returnIds, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWorkTypeSpaceFields")]
        public JsonResult GetWorkTypeSpaceFields(string Input, int WorktypeId, int EntityCategoryId)
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkFlowModel(BaseInput).WorkFlowItem.GetWorkTypeSpaceFields(applnInp, WorktypeId, EntityCategoryId);
                objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateRule")]
        public JsonResult UpdateRule(string Input)
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkFlowModel(BaseInput).WorkFlowItem.UpdateRule(applnInp);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWorkflowEntityRelationships")]
        public JsonResult GetWorkflowEntityRelationships(string Input)
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkFlowModel(BaseInput).WorkFlowItem.GetWorkflowEntityRelationships(applnInp);
                objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWorkTypesWithWorkFlow")]
        public JsonResult GetWorkTypesWithWorkFlow(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkFlowModel(BaseInput).WorkFlowItem.GetWorkTypesWithWorkFlow(applnInp);
                // objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetFirstWorkflowActionPoint")]
        public JsonResult GetFirstWorkflowActionPoint(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkFlowModel(BaseInput).WorkFlowItem.GetFirstWorkflowActionPoint(applnInp);
                // objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        //[ActionName("GetActionPointUsers")]
        //public JsonResult GetActionPointUsers(string Input)
        //{
        //    ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
        //    DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
        //    objDefaultApiReturn = new WorkFlowModel(baseInp).WorkFlowItem.GetActionPointUsers(applnInp);
        //    var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
        //    jsonResult.MaxJsonLength = int.MaxValue;
        //    return Json(jsonResult, JsonRequestBehavior.AllowGet);
        //}


        [ActionName("InsertWorkFlowEntity")]
        public JsonResult InsertMoveProjects(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkFlowModel(BaseInput).WorkFlowItem.InsertWorkFlowEntity(applicationFormInput);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeleteWorkflowActionPointWithNo")]
        public JsonResult DeleteWorkflowActionPointWithNo(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkFlowModel(BaseInput).WorkFlowItem.DeleteWorkflowActionPointWithNo(applicationFormInput);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWorkflowIsEditable")]
        public JsonResult GetWorkflowIsEditable(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                bool IsEditable = new WorkFlowModel(BaseInput).WorkFlowItem.GetWorkflowIsEditable(applicationFormInput);
                var jsonResult = Json(IsEditable, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertWorkFlowActionPointOutcome")]
        public JsonResult InsertWorkFlowActionPointOutcome(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkFlowModel(BaseInput).WorkFlowItem.InsertWorkFlowActionPointOutcome(applicationFormInput);
                //  messageReturn = new CommonController().logError(messageReturn);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateWorkFlowActionPointOutcome")]
        public JsonResult UpdateWorkFlowActionPointOutcome(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkFlowModel(BaseInput).WorkFlowItem.UpdateWorkFlowActionPointOutcome(applicationFormInput);
                //  messageReturn = new CommonController().logError(messageReturn);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdateWorkflowActionPoint")]
        public JsonResult InsertUpdateWorkflowActionPoint(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkFlowModel(BaseInput).WorkFlowItem.InsertUpdateWorkflowActionPoint(applicationFormInput);
                // messageReturn = new CommonController().logError(messageReturn);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertWorkFlowActionPointPermissions")]
        public JsonResult InsertWorkFlowActionPointPermissions(string applnInput)
        {
            try
            {
                WorkFlowPermissionInput workFlowPermissionInput = new WorkFlowPermissionInput();
                workFlowPermissionInput = JsonConvert.DeserializeObject<WorkFlowPermissionInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkFlowModel(BaseInput).WorkFlowItem.InsertWorkFlowActionPointPermissions(workFlowPermissionInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateFieldAccess")]
        public JsonResult UpdateFieldAccess(string Input)
        {
            try
            {
                WorkFlowFieldAccessInput workFlowFieldAccessInput = new WorkFlowFieldAccessInput();
                workFlowFieldAccessInput = JsonConvert.DeserializeObject<WorkFlowFieldAccessInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkFlowModel(BaseInput).WorkFlowItem.UpdateFieldAccess(workFlowFieldAccessInput);
                //  messageReturn = new CommonController().logError(messageReturn);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckActionPointInUse")]
        public JsonResult CheckActionPointInUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new WorkFlowModel(BaseInput).WorkFlowItem.CheckActionPointInUse(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetFirstWorkflowActionPointByWorkTypeAndCategory")]
        public JsonResult GetFirstWorkflowActionPointByWorkTypeAndCategory(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkFlowModel(BaseInput).WorkFlowItem.GetFirstWorkflowActionPointByWorkTypeAndCategory(applnInp);
                // objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("WorkFlowAttachmentInputData")] //REVIEW INVOICE
        public JsonResult WorkFlowAttachmentInputData(string Input, int actionTarget)  //actionTarget ---> 1 - Attachment Add, 2 - Attachment Update, 3 - Attachment Delete
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkFlowModel(BaseInput).WorkFlowItem.WorkFlowAttachmentInputData(applnInp, actionTarget);
                messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckWorkTypeInUse")]
        public JsonResult CheckWorkTypeInUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new WorkFlowModel(BaseInput).WorkFlowItem.CheckWorkTypeInUse(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckFlowchartFileExist")]
        public JsonResult CheckFlowchartFileExist(string workTypeId, string workflowEntityCategoryId)
        {
            try
            {
                string returnValue = new WorkFlowModel(BaseInput).WorkFlowItem.IsFlowchartFileExist(workTypeId, workflowEntityCategoryId);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetFlowChartData")]
        public JsonResult GetFlowChartData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                WorkflowChart WFChart = new WorkflowChart();
                WFChart = new WorkFlowModel(BaseInput).WorkFlowItem.getFlowChartData(applnInp);
                var jsonResult = Json(WFChart, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("SaveFlowchartFile")]
        public JsonResult SaveFlowchartFile(string strXml, string workTypeId, string workflowEntityCategoryId)
        {
            try
            {
                string returnValue = new WorkFlowModel(BaseInput).WorkFlowItem.SaveFlowchartFile(strXml, workTypeId, workflowEntityCategoryId);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeleteWorkflowActionPointWithNoFromWorkflow")]
        public JsonResult DeleteWorkflowActionPointWithNoFromWorkflow(string applnInput, string[] arrActionPointNo)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkFlowModel(BaseInput).WorkFlowItem.DeleteWorkflowActionPointWithNoFromWorkflow(applicationFormInput, arrActionPointNo);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWorkflowIsEditableForWorktype")]
        public JsonResult GetWorkflowIsEditableForWorktype(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                bool IsEditable = new WorkFlowModel(BaseInput).WorkFlowItem.GetWorkflowIsEditableForWorktype(applicationFormInput);
                var jsonResult = Json(IsEditable, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdateEscalationNotification")]
        public JsonResult InsertUpdateEscalationNotification(string Input, string UserIds, string UserGroupIds, int actionTarget)
        {
            try
            {
                ApplicationFormInput appInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkFlowModel(BaseInput).WorkFlowItem.InsertUpdateEscalationNotification(appInp, UserIds, UserGroupIds, actionTarget);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);                
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWorkTypeNotification")]
        public JsonResult GetWorkTypeNotification(string Input, int actionTarget)
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkFlowModel(BaseInput).WorkFlowItem.GetWorkTypeNotification(applnInp, actionTarget);
                // objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdateWorkTypeNotification")]
        public JsonResult InsertUpdateWorkTypeNotification(string Input, string UserIds, string UserGroupIds)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkFlowModel(BaseInput).WorkFlowItem.InsertUpdateWorkTypeNotification(applnInp, UserIds, UserGroupIds);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);


            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetUserAndUserGroupListWithEmail")]
        public JsonResult GetUserAndUserGroupListWithEmail(string Input, int UserCategoryId)
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkFlowModel(BaseInput).WorkFlowItem.GetUserAndUserGroupListWithEmail(applnInp, UserCategoryId);
                // objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetMessageTemplateForEntity")]
        public JsonResult GetMessageTemplateForEntity(string Input)
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkFlowModel(BaseInput).WorkFlowItem.GetMessageTemplateForEntity(applnInp);
                // objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetMessageTemplateData")]
        public JsonResult GetMessageTemplateData(string Input, int MessageCategoryId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkFlowModel(BaseInput).WorkFlowItem.GetMessageTemplateData(applnInp, MessageCategoryId);
                // objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckActionPointUsersandUserGroupsExists")]
        public JsonResult CheckActionPointUsersandUserGroupsExists(string input, int target)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                string returnIds = new WorkFlowModel(BaseInput).WorkFlowItem.CheckActionPointUsersandUserGroupsExists(applicationFormInput, target);
                var jsonResult = Json(returnIds, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
    }
}
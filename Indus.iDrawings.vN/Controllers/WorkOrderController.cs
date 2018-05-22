using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Web;
using Indus.iDrawings.WorkFlow.Entity;
using Indus.iDrawings.WorkOrder.Models;

using Indus.iDrawings.WorkOrder.Entity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Indus.iDrawings.Utils.Security.Validation;
using System.Web;
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;

namespace Indus.iDrawings.vN.Controllers
{
    public class WorkOrderController : iDrawingsController
    {
        public WorkOrderController()
        {
        }

        // For List page column field data
        [ActionName("GetListAppFormFields")]
        public JsonResult GetListAppFormFields(string Input)
        {
            return GetAppFormFields(Input);
        }

        // For Add page Field generation 
        [ActionName("GetAddAppFormFields")]
        public JsonResult GetAddAppFormFields(string Input)
        {
            return GetAppFormFields(Input);
        }

        private JsonResult GetAppFormFields(string Input)
        {
            try
            {
                List<string> errors = new List<string>();
                WorkOrderInput workOrderInput = JsonConvert.DeserializeObject<WorkOrderInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WOApplicationForm.GetFieldBinderAddContent(workOrderInput);
                var jsonResult = Json(objDefaultApiReturn.FieldBinderList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        // For Edit page Field generation
        [ActionName("GetEditAppFormFields")]
        public JsonResult GetEditAppFormFields(string Input)
        {
            try
            {
                WorkOrderInput workOrderInput = JsonConvert.DeserializeObject<WorkOrderInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WOApplicationForm.GetFieldBinderEditContent(workOrderInput);
                var jsonResult = Json(objDefaultApiReturn.FieldBinderList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckWhetherCustomerSpecificItem")]
        public JsonResult CheckWhetherCustomerSpecificItem(string input, int tokenId, int ModuleId)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                string returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckWhetherCustomerSpecificItem(applicationFormInput, tokenId, ModuleId);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetPMListDisplaySettings")]
        public JsonResult GetPMListDisplaySettings(string Input, int Target, int ComponentCategoryId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetPMListDisplaySettings(applnInp, Target, ComponentCategoryId);
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
        [ActionName("GetEquipmentTypesForPart")]
        public JsonResult GetEquipmentTypesForPart(string Input, int EquipmentCategory, int PartId, int Target)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetEquipmentTypesForPart(applnInp, EquipmentCategory, PartId, Target);
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
        [ActionName("GetReminderData")]
        public JsonResult GetReminderData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetReminderData(applnInp);
                objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
     
        [ActionName("ReminderNotification")]
        public JsonResult ReminderNotification(string Input)
        {
            try
            {
                WorkflowEntityFormInput workflowEntityFormInput = new WorkflowEntityFormInput();
                workflowEntityFormInput = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.ReminderNotification(workflowEntityFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetActionPointUsers")]
        public JsonResult GetActionPointUsers(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetActionPointUsers(applnInp);
                objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetNextActionPointDetails")]
        public JsonResult GetNextActionPointDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetNextActionPointDetails(applnInp);
                objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("OverrideToSelectedActionPoint")]
        public JsonResult OverrideToSelectedActionPoint(string Input)
        {
            try
            {
                WorkflowEntityFormInput workflowEntityFormInput = new WorkflowEntityFormInput();
                workflowEntityFormInput = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.OverrideToSelectedActionPoint(workflowEntityFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("InsertWorkFlowEntityTeamMembers")]
        public JsonResult InsertWorkFlowEntityTeamMembers(string Input, int Target) //Target --->  1:spWF_InsertWorkFlowEntityMembers, 2:spWF_InsertWorkFlowEntityMembersForMultiplrWFEntityIds
        {
            try
            {
                WorkflowEntityFormInput workflowEntityFormInput = new WorkflowEntityFormInput();
                workflowEntityFormInput = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.InsertWorkFlowEntityTeamMembers(workflowEntityFormInput, Target);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeleteWorkFlowEntityTeamMembers")]
        public JsonResult DeleteWorkFlowEntityTeamMembers(string Input, int Target) //Target --->  1:spWF_DeleteWorkFlowEntityMembers, 2:spWF_DeleteWorkFlowEntityMembersForMultipleWFEntityIds
        {
            try
            {
                WorkflowEntityFormInput workflowEntityFormInput = new WorkflowEntityFormInput();
                workflowEntityFormInput = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.DeleteWorkFlowEntityTeamMembers(workflowEntityFormInput, Target);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetFieldsforWorkOrderReview")]
        public JsonResult GetFieldsforWorkOrderReview(string Input, int Target, int WorkTypeTarget)
        {
            try
            {
                WorkOrderInput applnInp = JsonConvert.DeserializeObject<WorkOrderInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetFieldsforWorkOrderReview(applnInp, Target, WorkTypeTarget);
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

        [ActionName("InsertPMScheduleWorkOrders")]
        public JsonResult InsertPMScheduleWorkOrders(string Input, string[] SendToMailAddress, int MessageTemplateId)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.InsertPMScheduleWorkOrders(applicationFormInput, SendToMailAddress, MessageTemplateId);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("SaveWorkflowEntityData")]
        public JsonResult SaveWorkflowEntityData(string Input, int Target)
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.SaveWorkflowEntityData(applnInp, Target);
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

        [ActionName("DocumentEntityInputData")]
        public JsonResult DocumentEntityInputData(string Input, int actionTarget)  //actionTarget ---> 1 - Document Add, 2 - Document Update, 3 - Document Delete
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.DocumentEntityInputData(applnInp, actionTarget);
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

        [ActionName("EquipmentEntityInputData")]
        public JsonResult EquipmentEntityInputData(string Input, int actionTarget)  //actionTarget ---> 1 -Link Equipment, 2 - Delete Linked Equipment
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.EquipmentEntityInputData(applnInp, actionTarget);
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

        [ActionName("SaveWorkflowEntityCostItems")] //Individual Cost Add
        public JsonResult SaveWorkflowEntityCostItems(string Input)
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.SaveWorkflowEntityCostItems(applnInp);
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

        [ActionName("SaveMultipleWorkflowEntityCostItems")] //Multiple Cost Update
        public JsonResult SaveMultipleWorkflowEntityCostItems(string Input, string WorkflowEntityIds)
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.SaveMultipleWorkflowEntityCostItems(applnInp);
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
        [ActionName("DeleteMultipleWorkflowEntityCostItems")] //Multiple Cost Delete
        public JsonResult DeleteMultipleWorkflowEntityCostItems(string Input)
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.DeleteMultipleWorkflowEntityCostItems(applnInp);
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

        [ActionName("GetPMSchedulesForCriteriaByKeyWord")]
        public JsonResult GetPMSchedulesForCriteriaByKeyWord(string Input, int Target, int EquipmentCategoryId, int EquipmentTypeId,
                                            int RouteId, int DueDays, int WorkTypeId, bool IsTab, string ByKeyWord)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetPMSchedulesForCriteriaByKeyWord(applnInp, EquipmentCategoryId, EquipmentTypeId,
                                             RouteId, DueDays, WorkTypeId, IsTab, ByKeyWord);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWorkFlowActionPointPermissions")]
        public JsonResult GetWorkFlowActionPointPermissions(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetWorkFlowActionPointPermissions(applnInp);
                //objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetSearchedEquipmentsTypeForList")]
        public JsonResult GetSearchedEquipmentsTypeForList(string Input, int EquipmentCategory, int EquipmentType, int Target)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetSearchedEquipmentsTypeForList(applnInp, EquipmentCategory, EquipmentType, Target);
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


        [ActionName("InsertRouteEquipments")]
        public JsonResult InsertRouteEquipments(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.InsertRouteEquipments(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUnusedSiteTechnicians")]
        public JsonResult GetUnusedSiteTechnicians(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                CustomApiReturn objCustomReturn = new CustomApiReturn();
                objCustomReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetUnusedSiteTechnicians(applnInp);
                var jsonResult = Json(objCustomReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUnusedSpares")]
        public JsonResult GetUnusedSpares(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                CustomApiReturn objCustomReturn = new CustomApiReturn();
                objCustomReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetUnusedSpares(applnInp);
                var jsonResult = Json(objCustomReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckInUseHoldReasons")]
        public JsonResult CheckInUseHoldReasons(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckInUseHoldReasons(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckPMProcedureInUse")]
        public JsonResult CheckPMProcedureInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckPMProcedureInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertPMProcedureJobStep")]
        public JsonResult InsertPMProcedureJobStep(string input)
        {
            try
            {
                PMJobSteps pmjobStepInput = new PMJobSteps();
                pmjobStepInput = JsonConvert.DeserializeObject<PMJobSteps>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.InsertPMProcedureJobStep(pmjobStepInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdatePMProcedureJobStep")]
        public JsonResult UpdatePMProcedureJobStep(string input)
        {
            try
            {
                PMJobSteps pmjobStepInput = new PMJobSteps();
                pmjobStepInput = JsonConvert.DeserializeObject<PMJobSteps>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.UpdatePMProcedureJobStep(pmjobStepInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdatePM")]
        public JsonResult InsertUpdatePM(string input, int IsAdd)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MessageReturn msgReturn = new MessageReturn();
                msgReturn = new WorkOrderModel(BaseInput).WorkOrderItem.InsertUpdatePM(applicationFormInput, IsAdd);
                var jsonResult = Json(msgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdatePMTemplate")]
        public JsonResult InsertUpdatePMTemplate(string input, int IsAdd)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MessageReturn msgReturn = new MessageReturn();
                msgReturn = new WorkOrderModel(BaseInput).WorkOrderItem.InsertUpdatePMTemplate(applicationFormInput, IsAdd);
                var jsonResult = Json(msgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeletePMForMultiple")]
        public JsonResult DeletePMForMultiple(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MessageReturn msgReturn = new MessageReturn();
                msgReturn = new WorkOrderModel(BaseInput).WorkOrderItem.DeletePMForMultiple(applicationFormInput);
                var jsonResult = Json(msgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertPMProcedureSafetyStep")]
        public JsonResult InsertPMProcedureSafetyStep(string Input, int ProcedureId, string SafetySteps, int TradeId, int ExpTradeHours, string ToolsData, string SparesData)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.InsertPMProcedureSafetyStep(applnInp, ProcedureId, SafetySteps, TradeId, ExpTradeHours, ToolsData, SparesData);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdatePMProcedureSafetyStep")]
        public JsonResult UpdatePMProcedureSafetyStep(string Input, int ProcedureId, string SafetySteps, int TradeId, int ExpTradeHours, string ToolsData, string SparesData)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.UpdatePMProcedureSafetyStep(applnInp, ProcedureId, SafetySteps, TradeId, ExpTradeHours, ToolsData, SparesData);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEquipmentCategoryforPM")]
        public JsonResult GetEquipmentCategoryforPM(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                objCustomApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetEquipmentCategoryforPM(applnInp);
                var jsonResult = Json(objCustomApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEquipmentClassesforPM")]
        public JsonResult GetEquipmentClassesforPM(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                objCustomApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetEquipmentClassesforPM(applnInp);
                var jsonResult = Json(objCustomApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEquipmentforPM")]
        public JsonResult GetEquipmentforPM(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                objCustomApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetEquipmentforPM(applnInp);
                var jsonResult = Json(objCustomApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetRouteEquipmentforPM")]
        public JsonResult GetRouteEquipmentforPM(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                objCustomApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetRouteEquipmentforPM(applnInp);
                var jsonResult = Json(objCustomApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckPMsProceduresInUse")]
        public JsonResult CheckPMsProceduresInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckPMsProceduresInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckPMTemplateProceduresInUse")]
        public JsonResult CheckPMTemplateProceduresInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckPMTemplateProceduresInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckPMTemplateInUse")]
        public JsonResult CheckPMTemplateInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckPMTemplateInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetMasterPMDetailsforPM")]
        public JsonResult GetMasterPMDetailsforPM(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetMasterPMDetailsforPM(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWeekDaysForPM")]
        public JsonResult GetWeekDaysForPM(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                objCustomApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetWeekDaysForPM(applnInp);
                var jsonResult = Json(objCustomApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSeasonsForPM")]
        public JsonResult GetSeasonsForPM(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                objCustomApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetSeasonsForPM(applnInp);
                var jsonResult = Json(objCustomApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckContractorInUse")]
        public JsonResult CheckContractorInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckContractorInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DecodeBarCodeFromUploadedImage")]
        public JsonResult DecodeBarCode(string fileInput)
        {
            try
            {
                //ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();

                fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(fileInput);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(fileDataInput.FileName))
                {
                    if (!typeVal.checkWhiteList(fileDataInput.FileName, 6))
                        throw new Exception();
                }

                string barcodeResult = new WorkOrderModel(BaseInput).WorkOrderItem.DecodeBarCodeFromImage(fileDataInput);
                var jsonResult = Json(barcodeResult, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectAttributeSearchFieldList")]
        public JsonResult GetObjectAttributeSearchFieldList(string Input, int ObjectCategoryId, int ClassId, bool IsFromSpaceSearch)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetObjectAttributeSearchFieldList(applnInp, ObjectCategoryId, ClassId, IsFromSpaceSearch);
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

        [ActionName("GetCalendarInformation")]
        public JsonResult GetCalendarInformation(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetCalendarInformation(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAttributeLength")]
        public JsonResult GetAttributeLength(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnVal = new WorkOrderModel(BaseInput).WorkOrderItem.GetAttributeLength(applnInp);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetAutoPopulatedTimeSpentInHours")]
        public JsonResult GetAutoPopulatedTimeSpentInHours(string Input)
        {
            try
            {
                WorkflowEntityFormInput workflowEntityFormInput = new WorkflowEntityFormInput();
                workflowEntityFormInput = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                string returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.GetAutoPopulatedTimeSpentInHours(workflowEntityFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckConditionforMultipleCompleteorClose")]
        public JsonResult CheckConditionforMultipleCompleteorClose(string Input, int Option)
        {
            try
            {
                WorkflowEntityFormInput workflowEntityFormInput = new WorkflowEntityFormInput();
                workflowEntityFormInput = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckConditionforMultipleCompleteorClose(workflowEntityFormInput, Option);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("UpdateMultipleCompleteorClose")]
        public JsonResult UpdateMultipleCompleteorClose(string Input, int Option)
        {
            try
            {
                WorkflowEntityFormInput workflowEntityFormInput = new WorkflowEntityFormInput();
                workflowEntityFormInput = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new WorkOrderModel(BaseInput).WorkOrderItem.UpdateMultipleCompleteorClose(workflowEntityFormInput, Option);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("CheckDocumentFileData")]
        public JsonResult CheckDocumentFileData(string Input)
        {
            try
            {
                WorkflowEntityFormInput workflowEntityFormInput = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                int returnVal = new WorkOrderModel(BaseInput).WorkOrderItem.CheckDocumentFileData(workflowEntityFormInput);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("CheckEquipmentInUse")]
        public JsonResult CheckEquipmentInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckEquipmentInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DocumentFileDownload")]
        public HttpResponseMessage DocumentFileDownload(string Input)
        {
            byte[] arrData = new byte[0];
            WorkflowEntityFormInput inp = new WorkflowEntityFormInput();
            FileDataInput fileInp = new FileDataInput();
            inp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
            HttpResponse response = System.Web.HttpContext.Current.Response;
            response.Clear();
            response.ClearContent();
            response.ClearHeaders();
            response.Buffer = true;
            arrData = new WorkOrderModel(BaseInput).WorkOrderItem.DocumentFileDownload(inp);
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            String file;
            if (arrData != null)
            {
                file = Convert.ToBase64String(arrData);
                response.Write(file);
                response.End();
                httpResponseMessage.Content = new StringContent(file);
                httpResponseMessage.Content.Headers.Add("x-filename", fileInp.FileName);
                httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                httpResponseMessage.Content.Headers.ContentDisposition.FileName = fileInp.FileName;
                httpResponseMessage.StatusCode = HttpStatusCode.OK;
            }
            else
            {
                file = "Data is Null";
                response.Write(file);
                response.End();
                httpResponseMessage.Content = new StringContent(file);
            }
            return httpResponseMessage;
        }

        [ActionName("GetCostDetails")]
        public JsonResult GetCostDetails(string Input)
        {
            try
            {
                WorkflowEntityFormInput Inp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetCostDetails(Inp);
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

        [ActionName("GetPMTemplatesForPM")]
        public JsonResult GetPMTemplatesForPM(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetPMTemplatesForPM(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetKeyWordSearchForWorkOrders")]
        public JsonResult GetKeyWordSearchForWorkOrders(string Input, int Target) // Target 1: PM List, 2: NON PM&SR List
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetKeyWordSearchForWorkOrders(applicationFormInput, Target);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetAdvanceSearchForWorkOrders")]
        public JsonResult GetAdvanceSearchForWorkOrders(string Input, int Target) // Target 1: PM List, 2: NON PM&SR List
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetAdvanceSearchForWorkOrders(applicationFormInput, Target);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetRequesterDetails")]
        public JsonResult GetRequesterDetails(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetRequesterDetails(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn.FieldBinderData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckTechnicianInUse")]
        public JsonResult CheckTechnicianInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckTechnicianInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckTradeInUse")]
        public JsonResult CheckTradeInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckTradeInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckManufacturerInUse")]
        public JsonResult CheckManufacturerInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckManufacturerInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckItemIdInUse")]
        public JsonResult CheckItemIdInUse(string input, int Option)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckItemIdInUse(applicationFormInput, Option);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckRouteInUse")]
        public JsonResult CheckRouteInUse(string input, int Option)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.CheckRouteInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOpenedPMWOAgingForDashBoard")]
        public JsonResult GetOpenedPMWOAgingForDashBoard()
        {
            try
            {
                string strReturn = new WorkOrderModel(BaseInput).WorkOrderDashboardItem.GetOpenedPMWOAgingForDashBoard();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetNonPMWOStatusForDashBoard")]
        public JsonResult GetNonPMWOStatusForDashBoard()
        {
            try
            {
                string strReturn = new WorkOrderModel(BaseInput).WorkOrderDashboardItem.GetNonPMWOStatusForDashBoard();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOpenedRequestAndNonPMWOAgingForDashBoard")]
        public JsonResult GetOpenedRequestAndNonPMWOAgingForDashBoard()
        {
            try
            {
                string strReturn = new WorkOrderModel(BaseInput).WorkOrderDashboardItem.GetOpenedRequestAndNonPMWOAgingForDashBoard();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetPMWOStatusForDashBoard")]
        public JsonResult GetPMWOStatusForDashBoard()
        {
            try
            {
                string strReturn = new WorkOrderModel(BaseInput).WorkOrderDashboardItem.GetPMWOStatusForDashBoard();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWorkOrderActiveUsersCount")]
        public JsonResult GetWorkOrderActiveUsersCount()
        {
            try
            {
                int returnVal = new WorkOrderModel(BaseInput).WorkOrderItem.GetWorkOrderActiveUsersCount();
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetParentChildEntityDetails")]
        public JsonResult GetParentChildEntityDetails(string Input)
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new WorkOrderModel(BaseInput).WorkOrderItem.GetParentChildEntityDetails(applnInp);
                objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetSelectedActionPointsForRule")]
        public JsonResult GetSelectedActionPointsForRule(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                string[] returnVal = new WorkOrderModel(BaseInput).WorkOrderItem.GetSelectedActionPointsForRule(applicationFormInput);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetChargebackLookup")]
        public JsonResult GetChargebackLookup(string input, int ChargebackType)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                string returnVal = new WorkOrderModel(BaseInput).WorkOrderItem.GetChargebacks(applicationFormInput, ChargebackType);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWorkOrderDetails")]
        public JsonResult GetWorkOrderDetails(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                string returnVal = new WorkOrderModel(BaseInput).WorkOrderItem.GetWorkOrderDetails(applicationFormInput);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("UpdateSafetyStepOrder")]
        public JsonResult UpdateSafetyStepOrder(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MessageReturn msgReturn = new MessageReturn();
                msgReturn = new WorkOrderModel(BaseInput).WorkOrderItem.UpdateSafetyStepOrder(applicationFormInput);
                var jsonResult = Json(msgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("UpdateJobStepOrder")]
        public JsonResult UpdateJobStepOrder(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MessageReturn msgReturn = new MessageReturn();
                msgReturn = new WorkOrderModel(BaseInput).WorkOrderItem.UpdateJobStepOrder(applicationFormInput);
                var jsonResult = Json(msgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("SpaceValidation")]
        public JsonResult SpaceValidation(string Input)
        {
            try
            {
                WorkflowEntityFormInput applnInp = JsonConvert.DeserializeObject<WorkflowEntityFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                int returnValue = new WorkOrderModel(BaseInput).WorkOrderItem.SpaceValidation(applnInp);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
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
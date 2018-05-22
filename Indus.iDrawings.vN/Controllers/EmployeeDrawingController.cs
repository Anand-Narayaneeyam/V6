using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Employees.Entity;
using Indus.iDrawings.Employees.Models;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Utils.Security.Validation;
using Indus.iDrawings.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace Indus.iDrawings.vN.Controllers
{
    public class EmployeeDrawingController : iDrawingsController
    {
        public EmployeeDrawingController()
        {

        }

        [ActionName("GetAllocatedDrawingsForEmp")]
        public JsonResult GetAllocatedDrawingsForEmp(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetAllocatedDrawingsForEmp(applnInp);
                return Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAllEmployeeDetails")]
        public JsonResult GetAllEmployeeDetails(string Input, string DrawingId, string DrawingIds, string AssignmentStatus)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(DrawingIds))
                {
                  var  blnReturn = typeVal.checkWhiteListSelectedIds(DrawingIds, 5, ",");
                    if (blnReturn == false)
                    {
                        throw new Exception();
                    }
                }
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetAllEmployeeDetails(applnInp,Convert.ToInt32( DrawingId), DrawingIds,Convert.ToInt32( AssignmentStatus));
               // objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetSpaceEmployeeOccupancy")]
        public JsonResult GetSpaceEmployeeOccupancy(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetSpaceEmployeeOccupancy(applnInp);
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
        [ActionName("CheckEmployeeAssignPossible")]
        public JsonResult CheckEmployeeAssignPossible(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnvalue = new EmployeeModel(BaseInput).EmployeeDrawingItem.CheckEmployeeAssignPossible(applnInp);
                var jsonResult = Json(returnvalue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetAllResourcesForEmployees")]
        public JsonResult GetAllResourcesForEmployees(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetAllResourcesForEmployees(applnInp);
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

        [ActionName("CheckResourceExistForEmployees")]
        public JsonResult CheckResourceExistForEmployees(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                bool retrnVal = new EmployeeModel(BaseInput).EmployeeDrawingItem.CheckResourceExistForEmployees(applnInp);
                var jsonResult = Json(retrnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEmployeeMoveDetails")]
        public JsonResult GetEmployeeMoveDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeeMoveDetails(applnInp);
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
        [ActionName("GetEmployeeDetailsForEmployeeMove")]
        public JsonResult GetEmployeeDetailsForEmployeeMove(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeeDetailsForEmployeeMove(applnInp);
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
        [ActionName("DeleteAttachedEmployeeObjects")]
        public JsonResult DeleteAttachedEmployeeObjects(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.DeleteAttachedEmployeeObjects(applnInp);
              //  messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("MoveEmployeeResources")]
        public JsonResult MoveEmployeeResources(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.MoveEmployeeResources(applnInp);
               /// messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("MoveMultipleEmployeeResources")]
        public JsonResult MoveMultipleEmployeeResources(string Input)
        {
            try
            {
                List<EmployeeMoveRequestDataInput> inp = JsonConvert.DeserializeObject<List<EmployeeMoveRequestDataInput>>(Input);
                MessageReturn messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.MoveMultipleEmployeeResources(inp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEmployeeMoveRequestDetails")]
        public JsonResult GetEmployeeMoveRequestDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeeMoveRequestDetails(applnInp);
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
        [ActionName("GetEmployeeDetailsForMoveRequest")]
        public JsonResult GetEmployeeDetailsForMoveRequest(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeeDetailsForMoveRequest(applnInp);
              //  objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetEmployeeMoveDetailsList")]
        public JsonResult GetEmployeeMoveDetailsList(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeeMoveDetailsList(applnInp);
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
        [ActionName("CheckEmployee")]
        public JsonResult CheckEmployee(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnvalue = new EmployeeModel(BaseInput).EmployeeDrawingItem.CheckEmployee(applnInp);
                var jsonResult = Json(returnvalue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetEmployeesWithSupervisorinDrawing")]
        public JsonResult GetEmployeesWithSupervisorinDrawing(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeesWithSupervisorinDrawing(applnInp);
              //  objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetEmployeeQueryBuilderData")]
        public JsonResult GetEmployeeQueryBuilderData(string Input, int DrawingId, int ProjectId, int Target)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeeQueryBuilderData(applnInp, DrawingId, ProjectId, Target);
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
    
        [ActionName("GetEmployeeAssignRequestStatus")]
        public JsonResult GetEmployeeAssignRequestStatus(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeeAssignRequestStatus(applnInp);
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
        [ActionName("GetAllEmployeeDetailsForRelink")]
        public JsonResult GetAllEmployeeDetailsForRelink(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetAllEmployeeDetailsForRelink(applnInp);
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
        [ActionName("GetMoveRequestedEmployees")]
        public JsonResult GetMoveRequestedEmployees(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetMoveRequestedEmployees(applnInp);
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
        [ActionName("GetTotalizeSpaceStandardCapacityForSelected")]
        public JsonResult GetTotalizeSpaceStandardCapacityForSelected(string Input, int DrawingId, int RuleId, int ProposedAssignCount, string SpaceIds)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetTotalizeSpaceStandardCapacityForSelected(applnInp, DrawingId, RuleId, ProposedAssignCount, SpaceIds);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                //objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("InsertEmployeeMoveRequest")]
        public JsonResult InsertEmployeeMoveRequest(string Input, string EmployeeIdsWithDetails, int TargetDrawingId, int CurrentDrawingId, DateTime DateToPerform, string Comments)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.InsertEmployeeMoveRequest(applnInp, EmployeeIdsWithDetails, TargetDrawingId, CurrentDrawingId, DateToPerform, Comments);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                messageReturn = new CommonController().logError((messageReturn));
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetSpaceSearchResults")]
        public JsonResult GetSpaceSearchResults(string Input, int DrawingId, string Query, bool IsVacant, bool IsUnderOccupied, bool IsOverOccupied, bool IsNominalOccupied)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetSpaceSearchResults(applnInp, DrawingId, Query, IsVacant, IsUnderOccupied, IsOverOccupied, IsNominalOccupied);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
               // objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("UpdateEmployeeScaleFactor")]
        public JsonResult UpdateEmployeeScaleFactor(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.UpdateEmployeeScaleFactor(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                messageReturn = new CommonController().logError((messageReturn));
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetEmployeeAdvanceSearchResults")]
        public JsonResult GetEmployeeAdvanceSearchResults(string Input, int DrawingId, int TargetId, int ProjectId, string Query)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeeAdvanceSearchResults(applnInp, DrawingId, TargetId, ProjectId, Query);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                //objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetSpaceHandleForDistribution")]
        public JsonResult GetSpaceHandleForDistribution(string Input, string DrawingId, string DistributionBy)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetSpaceHandleForDistribution(applnInp,Convert.ToInt32( DrawingId),Convert.ToInt32( DistributionBy)); ;
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
              //  objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetSpaceStandardCapacityForDrawing")]
        public JsonResult GetSpaceStandardCapacityForDrawing(string Input, int DrawingId, int RuleId, int ProposedAssignCount)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetSpaceStandardCapacityForDrawing(applnInp, DrawingId, RuleId, ProposedAssignCount);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
               // objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetScenarioDrawings")]
        public JsonResult GetScenarioDrawings(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetScenarioDrawings(applnInp);
              //  objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetOrgUnitOccupancyDistributionMapLegendData")]
        public JsonResult GetOrgUnitOccupancyDistributionMapLegendData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetOrgUnitOccupancyDistributionMapLegendData(applnInp);
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


        [ActionName("GetOrgUnitSpaceStandardDistributionMapLegendData")]
        public JsonResult GetOrgUnitSpaceStandardDistributionMapLegendData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetOrgUnitSpaceStandardDistributionMapLegendData(applnInp);
              //  objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetColorPreferences")]
        public JsonResult GetColorPreferences(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetColorPreferences(applnInp);
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

        [ActionName("GetSpaceStandardCapacityLegendForDrawing")]
        public JsonResult GetSpaceStandardCapacityLegendForDrawing(string Input, int DrawingId, int RuleId, int ProposedAssignCount)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetSpaceStandardCapacityLegendForDrawing(applnInp, DrawingId, RuleId, ProposedAssignCount);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
              //  objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEmployeeSheduledToMove")]
        public JsonResult GetEmployeeSheduledToMove(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeeSheduledToMove(applnInp);
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
        [ActionName("GetEmployeeMoveRequestStatus")]
        public JsonResult GetEmployeeMoveRequestStatus(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeeMoveRequestStatus(applnInp);
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

        [ActionName("DeAssignEmployee")]
        public JsonResult DeAssignEmployee(string Input, int EmployeeID)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.DeAssignEmployee(applnInp, EmployeeID);
                //  messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("CancelEmployeeMoveRequest")]
        public JsonResult CancelEmployeeMoveRequest(string Input, int EmployeeMoveId, string EmployeeMoveNo, int EmployeeId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.CancelEmployeeMoveRequest(applnInp, EmployeeMoveId, EmployeeMoveNo, EmployeeId);
                //  messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAllScenarioSpaceDetails")]
        public JsonResult GetAllScenarioSpaceDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetAllScenarioSpaceDetails(applnInp);
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

        [ActionName("GetScenarioOpenDrawingDetails")]
        public JsonResult GetScenarioOpenDrawingDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetScenarioOpenDrawingDetails(applnInp);
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

        [ActionName("GetAllScenarioDrawingEmployeeDetails")]
        public JsonResult GetAllScenarioDrawingEmployeeDetails(string Input, int DrawingId, bool ForAssignment)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetAllScenarioDrawingEmployeeDetails(applnInp, DrawingId,ForAssignment);
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

        [ActionName("GetScenarioEmployees")]
        public JsonResult GetScenarioEmployees(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetScenarioEmployees(applnInp);
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

        [ActionName("CheckScenarioSavedOrNot")]
        public JsonResult CheckScenarioSavedOrNot(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int drawingId = new EmployeeModel(BaseInput).EmployeeDrawingItem.CheckScenarioSavedOrNot(applnInp);
                var jsonResult = Json(drawingId, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetAllUnAssignedEmployeeDetails")]
        public JsonResult GetAllUnAssignedEmployeeDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetAllUnAssignedEmployeeDetails(applnInp);
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

        [ActionName("GetScenarioDrawingId")]
        public JsonResult GetScenarioDrawingId(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int drawingId = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetScenarioDrawingId(applnInp);
                var jsonResult = Json(drawingId, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDrawingEmployeeOccupancyDetails")]
        public JsonResult GetDrawingEmployeeOccupancyDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetDrawingEmployeeOccupancyDetails(applnInp);
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

        [ActionName("GetDrawingScaleFactor")]
        public JsonResult GetDrawingScaleFactor(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetDrawingScaleFactor(applnInp);
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

        [ActionName("GetAllEmployeeDetailsForMultipleIds")]
        public JsonResult GetAllEmployeeDetailsForMultipleIds(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetAllEmployeeDetailsForMultipleIds(applnInp);
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

        [ActionName("DeleteScenarioEmployee")]
        public JsonResult DeleteScenarioEmployee(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.DeleteScenarioEmployee(applnInp);
                objMessageReturn = new CommonController().logError((objMessageReturn));
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("AddUpdateEmployeeToScenario")]
        public JsonResult AddUpdateEmployeeToScenario(string Input)
        {
            try
            {
                List<List<ReportFieldValues>> listReportFieldValues = JsonConvert.DeserializeObject<List<List<ReportFieldValues>>>(Input);
                MessageReturn objMessageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.AddUpdateEmployeeToScenario(listReportFieldValues);
                objMessageReturn = new CommonController().logError((objMessageReturn));
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEmployeeMovesForRollBack")]
        public JsonResult GetEmployeeMovesForRollBack(string Input, int NoOfDays)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeeMovesForRollBack(applnInp, NoOfDays);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckEmployeeRollbackPossible")]
        public JsonResult CheckEmployeeRollbackPossible(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnVal = new EmployeeModel(BaseInput).EmployeeDrawingItem.CheckEmployeeRollbackPossible(applnInp);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("EmployeeMoveRollback")]
        public JsonResult EmployeeMoveRollback(string Input, int NoOfDays)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.EmployeeMoveRollback(applnInp, NoOfDays);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEmployeeMovesForRollBackHistory")]
        public JsonResult GetEmployeeMovesForRollBackHistory(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetEmployeeMovesForRollBackHistory(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAllEmployeeDetailsForEmployeeId")]
        public JsonResult GetAllEmployeeDetailsForEmployeeId(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetAllEmployeeDetailsForEmployeeId(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("InsertEmployeeMovethroughWorkflow")]
        public JsonResult InsertEmployeeMovethroughWorkflow(string applnInput, string employeeMoveRequest, int TargetDrawingId, int CurrentDrawingId, DateTime DateToPerform, string Comments) //PageTarget 1: Insert Request, 2:Review Move Request
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                List<EmployeeMoveRequestDataInput> employeeMoveRequestDataInput = new List<EmployeeMoveRequestDataInput>();
                employeeMoveRequestDataInput = JsonConvert.DeserializeObject<List<EmployeeMoveRequestDataInput>>(employeeMoveRequest);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.InsertEmployeeMovethroughWorkflow(applicationFormInput, employeeMoveRequestDataInput, TargetDrawingId, CurrentDrawingId, DateToPerform, Comments);
                //messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("InsertEmployeeMoveObjectDetails")]
        public JsonResult InsertEmployeeMoveObjectDetails(string applnInput, string data)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                List<EmployeeMoveRequestDataInput> employeeMoveRequestDataInput = new List<EmployeeMoveRequestDataInput>();
                employeeMoveRequestDataInput = JsonConvert.DeserializeObject<List<EmployeeMoveRequestDataInput>>(data);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.InsertEmployeeMoveObjectDetails(applicationFormInput, employeeMoveRequestDataInput);
                //messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("InsertEmployeeAssignthroughWorkflow")]
        public JsonResult InsertEmployeeAssignthroughWorkflow(string applnInput, string employeeAssignRequest, int TargetDrawingId, DateTime DateToPerform, string Comments) //PageTarget 1: Insert Request, 2:Review Move Request
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                List<EmployeeMoveRequestDataInput> employeeMoveRequestDataInput = new List<EmployeeMoveRequestDataInput>();
                employeeMoveRequestDataInput = JsonConvert.DeserializeObject<List<EmployeeMoveRequestDataInput>>(employeeAssignRequest);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.InsertEmployeeAssignthroughWorkflow(applicationFormInput, employeeMoveRequestDataInput, TargetDrawingId, DateToPerform, Comments);
                //messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("ReviewEmployeeMovethroughWorkflow")]
        public JsonResult ReviewEmployeeMovethroughWorkflow(string applnInput, string employeeMoveRequest) 
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                List<EmployeeMoveRequestDataInput> employeeMoveRequestDataInput = new List<EmployeeMoveRequestDataInput>();
                employeeMoveRequestDataInput = JsonConvert.DeserializeObject<List<EmployeeMoveRequestDataInput>>(employeeMoveRequest);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.ReviewEmployeeMovethroughWorkflow(applicationFormInput, employeeMoveRequestDataInput);
                //messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("ReviewEmployeeAssignthroughWorkflow")]
        public JsonResult ReviewEmployeeAssignthroughWorkflow(string applnInput, string employeeMoveRequest)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                List<EmployeeMoveRequestDataInput> employeeMoveRequestDataInput = new List<EmployeeMoveRequestDataInput>();
                employeeMoveRequestDataInput = JsonConvert.DeserializeObject<List<EmployeeMoveRequestDataInput>>(employeeMoveRequest);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.ReviewEmployeeAssignthroughWorkflow(applicationFormInput, employeeMoveRequestDataInput);
                //messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
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
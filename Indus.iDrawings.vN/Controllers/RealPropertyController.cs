using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.RealPropertyManagement.Models;
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
    public class RealPropertyController : iDrawingsController
    {
        public RealPropertyController()
        {

        }

        [ActionName("GetLeaseRenewals")]
        public JsonResult GetLeaseRenewals(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new RealPropertyModel(BaseInput).LeasesItem.GetLeaseRenewals(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetLeaseClausesByLease")]
        public JsonResult GetLeaseClausesByLease(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new RealPropertyModel(BaseInput).LeasesItem.GetLeaseClausesByLease(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateLeaseAgreementClauses")]
        public JsonResult UpdateLeaseAgreementClauses(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new RealPropertyModel(BaseInput).LeasesItem.UpdateLeaseAgreementClauses(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckLeaseClausesinuse")]
        public JsonResult CheckLeaseClausesinuse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new RealPropertyModel(BaseInput).LeasesItem.CheckLeaseClausesinuse(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("IsClientInUse")]
        public JsonResult IsClientInUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new RealPropertyModel(BaseInput).RealPropertyItem.IsClientInUse(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("IsCheckFinancialHeadInUse")]
        public JsonResult IsCheckFinancialHeadInUse(string Input, int Option)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new RealPropertyModel(BaseInput).RealPropertyItem.IsCheckFinancialHeadInUse(applnInp, Option);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateLeaseAgreementFinancialClauses")]
        public JsonResult UpdateLeaseAgreementFinancialClauses(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new RealPropertyModel(BaseInput).LeasesItem.UpdateLeaseAgreementFinancialClauses(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetFinancialStartEndRange")]
        public JsonResult GetFinancialStartEndRange(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new RealPropertyModel(BaseInput).RealPropertyItem.GetFinancialStartEndRange(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetLeaseFinancialClauseId")]
        public JsonResult GetLeaseFinancialClauseId(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new RealPropertyModel(BaseInput).RealPropertyItem.GetLeaseFinancialClauseId(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetIsLeaseStatusEditable")]
        public JsonResult GetIsLeaseStatusEditable(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new RealPropertyModel(BaseInput).LeasesItem.GetIsLeaseStatusEditable(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertLeaseCancellationCost")]
        public JsonResult InsertLeaseCancellationCost(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new RealPropertyModel(BaseInput).LeasesItem.InsertLeaseCancellationCost(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetLeaseCancellationCost")]
        public JsonResult GetLeaseCancellationCost(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new RealPropertyModel(BaseInput).LeasesItem.GetLeaseCancellationCost(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetLeaseSiteBuildingFloorManagement")]
        public JsonResult GetLeaseSiteBuildingFloorManagement(string Input, int Leaseid, int RenewalCount, int Target)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MultipleTablesReturn objMultipleTablesReturn = new MultipleTablesReturn();
                objMultipleTablesReturn = new RealPropertyModel(BaseInput).LeasesItem.GetLeaseSiteBuildingFloorManagement(applnInp, Leaseid, RenewalCount, Target);
                var jsonResult = Json(objMultipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdateRPMBuildings")]
        public JsonResult InsertUpdateRPMBuildings(string Input, int Leaseid, int RenewalCount, string BuildingData, string RowSeperator, string ColumnSeperator)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new RealPropertyModel(BaseInput).LeasesItem.InsertUpdateRPMBuildings(applnInp, Leaseid, RenewalCount, BuildingData, RowSeperator, ColumnSeperator);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdateRPMFloors")]
        public JsonResult InsertUpdateRPMFloors(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new RealPropertyModel(BaseInput).LeasesItem.InsertUpdateRPMFloors(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetGisData")]
        public JsonResult GetGisData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new RealPropertyModel(BaseInput).RealPropertyItem.GetGisData(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCriticalLeaseDatesForDashboard")]
        public JsonResult GetCriticalLeaseDatesForDashboard()
        {
            try
            {
                string strReturn = new RealPropertyModel(BaseInput).RealPropertyDashboardItem.GetCriticalLeaseDatesForDashboard();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetLeaseExpirationSqFtForDashboard")]
        public JsonResult GetLeaseExpirationSqFtForDashboard()
        {
            try
            {
                string strReturn = new RealPropertyModel(BaseInput).RealPropertyDashboardItem.GetLeaseExpirationSqFtForDashboard();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetLeaseRentableAreaForDashboard")]
        public JsonResult GetLeaseRentableAreaForDashboard()
        {
            try
            {
                string strReturn = new RealPropertyModel(BaseInput).RealPropertyDashboardItem.GetLeaseRentableAreaForDashboard();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetLeasedBuildingOccupancyForDashboard")]
        public JsonResult GetLeasedBuildingOccupancyForDashboard(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new RealPropertyModel(BaseInput).RealPropertyDashboardItem.GetLeasedBuildingOccupancyForDashboard(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetLeaseDetailsAnalytics")]
        public JsonResult GetLeaseDetailsAnalytics(string Input,  int AnalyticsType, string ColumnName)
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
                    string strReturn = new RealPropertyModel(BaseInput).LeasesItem.GetLeaseDetailsAnalytics(applnInp, AnalyticsType, ColumnName);
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
    }
}
using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Models;
using Indus.iDrawings.Reports.Entity;
using Indus.iDrawings.Reports.Models;
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
    public class ReportController : iDrawingsController
    {
        public string[] Month = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
        public ReportController()
        {

        }

        [ActionName("GetUnlockedDrawingsforReportFloorSelection")]
        public JsonResult GetUnlockedDrawingsforReportFloorSelection(string Input)
        {
          
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new CommonModel(BaseInput).ReportItem.GetUnlockedDrawingsforReportFloorSelection(applnInp);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        public JsonResult getSpaceFunctionCustomizedName()
        {
            try
            {
                string returnVal = "";
                returnVal = new CommonModel(BaseInput).ReportItem.GetSpaceFunctionCustomizedName();
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetCriteriaforReportSelection")]
        public JsonResult GetCriteriaforReportSelection(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                CustomApiReturn objCustomReturn = new CustomApiReturn();
                objCustomReturn = new CommonModel(BaseInput).ReportItem.GetCriteriaforReportSelection(applnInp);
                var jsonResult = Json(objCustomReturn.LookupValues, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOrganizationalStructureforLookups")]
        public JsonResult GetOrganizationalStructureforLookups(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                CustomApiReturn objCustomReturn = new CustomApiReturn();
                objCustomReturn = new CommonModel(BaseInput).ReportItem.GetOrganizationalStructureforLookups(applnInp);
                var jsonResult = Json(objCustomReturn.LookupValues, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEmployeeOccupancyDrawingList")]
        public JsonResult GetEmployeeOccupancyDrawingList(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new CommonModel(BaseInput).ReportItem.GetEmployeeOccupancyDrawingList(applnInp);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDrawingsWithDataforEmployeeReport")]
        public JsonResult GetDrawingsWithDataforEmployeeReport(string Input, int ModuleId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new CommonModel(BaseInput).ReportItem.GetDrawingsWithDataforEmployeeReport(applnInp, ModuleId);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUserAccessibleDrawingHavingDataForObjectCategory")]
        public JsonResult GetUserAccessibleDrawingHavingDataForObjectCategory(string Input, int objectCategoryId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new CommonModel(BaseInput).ReportItem.GetUserAccessibleDrawingHavingDataForObjectCategory(applnInp, objectCategoryId);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckReportPrivilegeforUser")]
        public JsonResult CheckReportPrivilegeforUser(string input, int ModuleId, int ReportDetailId, int ReportCategoryId, int CustomReportId, int ReportFieldId)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new CommonModel(BaseInput).ReportItem.CheckReportPrivilegeforUser(applicationFormInput, ModuleId, ReportDetailId, ReportCategoryId, CustomReportId, ReportFieldId);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetStatusLookups")]
        public JsonResult GetStatusLookups(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MutiValuedItems multiItems = new MutiValuedItems();
                multiItems = new CommonModel(BaseInput).ReportItem.GetStatusLookups(applicationFormInput);
                var jsonResult = Json(multiItems, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWorkTypeLookups")]
        public JsonResult GetWorkTypeLookups(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MutiValuedItems multiItems = new MutiValuedItems();
                multiItems = new CommonModel(BaseInput).ReportItem.GetWorkTypeLookups(applicationFormInput);
                var jsonResult = Json(multiItems, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetActionPointLookups")]
        public JsonResult GetActionPointLookups(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MutiValuedItems multiItems = new MutiValuedItems();
                multiItems = new CommonModel(BaseInput).ReportItem.GetActionPointLookups(applicationFormInput);
                var jsonResult = Json(multiItems, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetPMStatusLookups")]
        public JsonResult GetPMStatusLookups(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MutiValuedItems multiItems = new MutiValuedItems();
                multiItems = new CommonModel(BaseInput).ReportItem.GetPMStatusLookups(applicationFormInput);
                var jsonResult = Json(multiItems, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetPMWorkTypeLookups")]
        public JsonResult GetPMWorkTypeLookups(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MutiValuedItems multiItems = new MutiValuedItems();
                multiItems = new CommonModel(BaseInput).ReportItem.GetPMWorkTypeLookups(applicationFormInput);
                var jsonResult = Json(multiItems, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetFirstLastdaysofWeek")]
        public JsonResult GetFirstLastdaysofWeek()
        {
            try
            {
                string[] FirstLastDays = new string[2];
                DateTime result = System.DateTime.Today;
                while (result.DayOfWeek != DayOfWeek.Sunday)
                    result = result.AddDays(-1);
                FirstLastDays[0] = string.Format("{0:dd MMM yyyy}", Convert.ToDateTime(result));
                while (result.DayOfWeek != DayOfWeek.Saturday)
                    result = result.AddDays(1);
                FirstLastDays[1] = string.Format("{0:dd MMM yyyy}", Convert.ToDateTime(result));
                var jsonResult = Json(FirstLastDays, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

       [ActionName("SetFirstLastdaysofWeek")]
        public JsonResult SetFirstLastdaysofWeek(string FromDate, string ToDate)
        {
            try
            {
                string[] FirstLastDays = new string[2];
                int MonthCount = 0;
                int Year = 0;
                string[] splitFromDate = FromDate.Split(" ".ToCharArray());
                for (int i = 0; i < Month.Length; i++)
                {
                    if (Month[i] == splitFromDate[1])
                    {
                        MonthCount = i + 1;
                    }
                }
                Year = int.Parse(splitFromDate[2].ToString());
                DateTime resultFromDate = new DateTime(Year, MonthCount, Convert.ToInt32(splitFromDate[0]));
                while (resultFromDate.DayOfWeek != DayOfWeek.Sunday)
                    resultFromDate = resultFromDate.AddDays(-1);
                FirstLastDays[0] = string.Format("{0:dd MMM yyyy}", Convert.ToDateTime(resultFromDate));

                MonthCount = 0;
                string[] splitdateTo = ToDate.Split(" ".ToCharArray());
                for (int i = 0; i < Month.Length; i++)
                {
                    if (Month[i] == splitdateTo[1])
                    {
                        MonthCount = i + 1;
                    }
                }
                Year = int.Parse(splitdateTo[2].ToString());
                DateTime resultToDate = new DateTime(Year, MonthCount, Convert.ToInt32(splitdateTo[0]));
                while (resultToDate.DayOfWeek != DayOfWeek.Saturday)
                    resultToDate = resultToDate.AddDays(1);
                FirstLastDays[1] = string.Format("{0:dd MMM yyyy}", Convert.ToDateTime(resultToDate));

                var jsonResult = Json(FirstLastDays, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }

        }

        [ActionName("GetFirstLastdaysofMonth")]
        public JsonResult GetFirstLastdaysofMonth(string FromDate, string ToDate)
        {
            try
            {
                string[] FirstLastDays = new string[3];
                string ReportSubTitle = "";
                FromDate = "01 " + FromDate.Substring(2);
                string[] splitdate = ToDate.Split(" ".ToCharArray());
                int MonthCount = 0;
                for (int i = 0; i < Month.Length; i++)
                {
                    if (Month[i] == splitdate[1])
                    {
                        MonthCount = i + 1;
                    }
                }
                int Year = int.Parse(splitdate[2].ToString());
                ToDate = DateTime.DaysInMonth(Year, MonthCount).ToString() + " " + ToDate.Substring(2);
                ReportSubTitle = FromDate + " to " + ToDate;
                FirstLastDays[0] = FromDate;
                FirstLastDays[1] = ToDate;
                FirstLastDays[2] = ReportSubTitle;
                var jsonResult = Json(FirstLastDays, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetAdditionalReports")]
        public JsonResult GetAdditionalReports(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new CommonModel(BaseInput).ReportItem.GetAdditionalReports(applnInp);
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
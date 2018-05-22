
using Indus.iDrawings.Codebase.Models.Items.Reports;
using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Models;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Utils.Security.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;

namespace Indus.iDrawings.vN.app
{
   
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [Indus.iDrawings.Web.SessionActionFilter]

    public class CustomReportService : GrapeCity.ActiveReports.Web.ReportService
    {
        [ValidateAntiForgeryToken]
        [WebMethod]
        protected override object OnCreateReportHandler(string reportDataInJson)
        {
            try
            {
                int returnValue = 0;
                BaseClassInput baseInp = new BaseClassInput();
                int customReportId = 0;
                int ReportFieldId = 0;

                ReportDataEntity objReportDataEntity = CommonReportUtils.GetObjectFromJsonString<ReportDataEntity>(reportDataInJson);
                if (!CheckReportValidInputData(objReportDataEntity))
                {
                    throw new Exception();
                }
                objReportDataEntity.BaseClassInputValues = new BaseClassInput();
                objReportDataEntity.BaseClassInputValues.CustomerId = CustomerId;
                objReportDataEntity.BaseClassInputValues.UserId = UserId;
                objReportDataEntity.BaseClassInputValues.TimeOffset = TimeOffset;
                objReportDataEntity.BaseClassInputValues.RowsPerPage = RowsPerPage;
                objReportDataEntity.BaseClassInputValues.CustomerName = CustomerName;
                objReportDataEntity.BaseClassInputValues.TimeZoneId = TimeZoneId;
                
                if (objReportDataEntity.ReportCategoryId == 0 && objReportDataEntity.ReportsTypeId == 0)
                {
                    List<ReportFieldValues> lstRptFieldValues = new List<ReportFieldValues>();
                    lstRptFieldValues = objReportDataEntity.GetListReportFieldIdValues;
                    customReportId = Convert.ToInt32(lstRptFieldValues.Find(item => item.ReportFieldId == 147).Value);
                }

                if (objReportDataEntity.ReportCategoryId == 0 && objReportDataEntity.ReportsTypeId == 6)
                {
                    List<ReportFieldValues> lstRptFieldValues = new List<ReportFieldValues>();
                    lstRptFieldValues = objReportDataEntity.GetListReportFieldIdValues;
                    ReportFieldId = Convert.ToInt32(lstRptFieldValues.Find(item => item.ReportFieldId == 3428).Value);
                }

                ApplicationFormInput appInp = new ApplicationFormInput();
                baseInp.CustomerId = CustomerId;
                baseInp.UserId = UserId;
                returnValue = new CommonModel(baseInp).ReportItem.CheckReportPrivilegeforUser(appInp, objReportDataEntity.ModuleId, 0, objReportDataEntity.ReportCategoryId, customReportId, ReportFieldId);
                if (returnValue == 0)
                {
                    throw new Exception();
                }
                objReportDataEntity.ExportTypeId = 0;
                Indus.iDrawings.ReportExtension.HtmlViewerAlignment.NeedHtmlViewerAlignment = true;
                if (objReportDataEntity.IsCustomize != 1)
                {
                    objReportDataEntity.IsCustomize = 0;
                }
               
                return new ModuleSelector().SelectModuleForReportData(objReportDataEntity);
            }
            catch (Exception ex)
            {
                HttpResponse response = HttpContext.Current.Response;

                //  response.Redirect("~/Home/Index");
                //  System.Web.HttpContext.Current.Response.Redirect("~/Home/Index");

                HttpContext.Current.Server.ClearError();
                response.Clear();
                response.Status = "200 OK";
                response.Write("iDrawings encountered a problem while executing your command");
                response.End();
                return null;
            }

        }
        public bool CheckReportValidInputData(ReportDataEntity appInput)
        {
            bool isValid = true;
            if (appInput != null)
            {
                TypeValidation typeVal = new TypeValidation();
                List<ReportFieldValues> listReportFieldValues = new List<ReportFieldValues>();             
                listReportFieldValues = appInput.GetListReportFieldIdValues;
          
                for (int i = 0; i < listReportFieldValues.Count; i++)
                {
                    if (typeVal.checkWhiteList(listReportFieldValues[i].ReportFieldId.ToString(), 5) == false)
                    {
                        isValid = false;
                        break;

                    }
                    if (typeVal.checkWhiteList(listReportFieldValues[i].Value.ToString(), 6) == false)
                    {
                        isValid = false;
                        break;
                    }

                }
            }
            return isValid;
        }
        protected int UserId
        {
            get
            {
                return Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
            }
        }
        protected int CustomerId
        {
            get
            {
                return Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);
            }
        }
        protected int TimeZoneId
        {
            get
            {
                return Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "TimeZoneId").Value);
            }
        }
        protected string CustomerName
        {
            get
            {
                return (User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerName").Value;
            }
        }
        protected int RowsPerPage
        {
            get
            {
                return Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "RowsPerPage").Value);
            }
        }
        protected int TimeOffset
        {
            get
            {
                return Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "TimeOffset").Value);
            }
        }
    }
}

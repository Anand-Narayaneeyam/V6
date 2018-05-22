using Indus.iDrawings.Codebase.Models.Items.Reports;
using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Models;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Utils.Security.Validation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace Indus.iDrawings.vN.Controllers
{
    [Indus.iDrawings.Web.SessionActionFilter]
    public class ReportExportController : Controller
    {
        public ReportExportController()
        {
        }


        [ActionName("CommonExport")]
        public System.Net.Http.HttpResponseMessage CommonExport()
        {
            HttpResponse response = System.Web.HttpContext.Current.Response;
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                reader.BaseStream.Seek(0, SeekOrigin.Begin);
                string requestFromPost = reader.ReadToEnd();
                //requestFromPost = HttpUtility.UrlDecode(requestFromPost);
                reader.BaseStream.Seek(0, SeekOrigin.Begin);
                // var result = WebUtility.UrlDecode(new StreamReader(context.Request.InputStream).ReadToEnd());

                HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
                
                GrapeCity.ActiveReports.SectionReport report = new GrapeCity.ActiveReports.SectionReport();
                int intType = System.Web.Helpers.Json.Decode(requestFromPost.ToString()).jsonData.type;
                if (intType == 1)
                {
                    Indus.iDrawings.ReportExtension.ExcelExport.ExcelFormat = true;
                }
                else
                {
                    Indus.iDrawings.ReportExtension.ExcelExport.ExcelFormat = false;
                }
                Indus.iDrawings.ReportExtension.HtmlViewerAlignment.NeedHtmlViewerAlignment = false;

                int customReportId = 0;
                int ReportFieldId = 0;
                BaseClassInput baseInp = new BaseClassInput();

                //string strReportData = System.Web.Helpers.Json.Decode(requestFromPost.ToString()).ReportData;
                string strReportData = System.Web.Helpers.Json.Decode(requestFromPost.ToString()).jsonData.reportDataInJson.ReportData;
                ReportDataEntity objReportDataEntity = CommonReportUtils.GetObjectFromJsonString<ReportDataEntity>(strReportData);
                if (!CheckReportValidInputData(objReportDataEntity))
                {
                    throw new Exception();
                }

                objReportDataEntity.BaseClassInputValues = new BaseClassInput();
                objReportDataEntity.BaseClassInputValues.CustomerId = Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);
                objReportDataEntity.BaseClassInputValues.UserId = Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                objReportDataEntity.BaseClassInputValues.TimeOffset = Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "TimeOffset").Value);
                objReportDataEntity.BaseClassInputValues.RowsPerPage = Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "RowsPerPage").Value);
                objReportDataEntity.BaseClassInputValues.CustomerName = (User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerName").Value;
                objReportDataEntity.BaseClassInputValues.TimeZoneId = Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "TimeZoneId").Value);

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
                baseInp.CustomerId = objReportDataEntity.BaseClassInputValues.CustomerId;
                baseInp.UserId = objReportDataEntity.BaseClassInputValues.UserId;
                int returnValue = new CommonModel(baseInp).ReportItem.CheckReportPrivilegeforUser(appInp, objReportDataEntity.ModuleId, 0, objReportDataEntity.ReportCategoryId, customReportId, ReportFieldId);
                if (returnValue == 0)
                {
                    throw new Exception();
                }

                objReportDataEntity.ExportTypeId = intType;
                report = new ModuleSelector().SelectModuleForReportData(objReportDataEntity);
                report.Document.Printer.PrinterName = string.Empty;
                report.Run();
                MemoryStream memstream = new MemoryStream();
                byte[] arrData = new byte[0];

                switch (intType)
                {
                    case 1://excel export
                        GrapeCity.ActiveReports.Export.Excel.Section.XlsExport excelexport = new GrapeCity.ActiveReports.Export.Excel.Section.XlsExport();
                        excelexport.AutoRowHeight = true;
                        excelexport.DisplayGridLines = true;
                        excelexport.MinColumnWidth = .5F;
                        excelexport.RemoveVerticalSpace = true;
                        excelexport.UseCellMerging = true;
                        excelexport.Export(report.Document, memstream);
                        memstream.Position = 0;

                        response.Clear();
                        response.ClearContent();
                        response.ClearHeaders();
                        response.Buffer = true;
                        arrData = memstream.ToArray();

                        String file;
                        if (arrData != null)
                        {
                            file = Convert.ToBase64String(arrData);
                            response.Write(file);
                            response.End();

                            httpResponseMessage.Content = new StringContent(file);
                            httpResponseMessage.Headers.Add("x-filename", objReportDataEntity.ExportFileName);
                            httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                            httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                            httpResponseMessage.Content.Headers.ContentDisposition.FileName = objReportDataEntity.ExportFileName;
                            httpResponseMessage.StatusCode = HttpStatusCode.OK;
                        }
                        else
                        {
                            file = "Data is Null";
                            response.Write(file);
                            response.End();
                            httpResponseMessage.Content = new StringContent(file);
                        }                        
                        break;
                    case 2: //pdf export
                        GrapeCity.ActiveReports.Export.Pdf.Section.PdfExport pdfexport = new GrapeCity.ActiveReports.Export.Pdf.Section.PdfExport();
                        //pdfexport.Export(report.Document, memstream);
                        //Response.AddHeader("content-disposition", "attachment; filename=" + objReportDataEntity.ExportFileName + ".pdf");
                        //memstream.Position = 0;
                        //Response.ContentType = "application/pdf";
                        //Response.BinaryWrite(memstream.ToArray());
                        //Response.AddHeader("Content-Length", memstream.Length.ToString());
                        ////System.Web.HttpContext.Current.Response.Flush(); 
                        ////System.Web.HttpContext.Current.Response.SuppressContent = true;  
                        ////System.Web.HttpContext.Current.ApplicationInstance.CompleteRequest();


                        pdfexport.Export(report.Document, memstream);
                        memstream.Position = 0;
                        arrData = memstream.ToArray();

                        response.Clear();
                        response.ClearContent();
                        response.ClearHeaders();
                        response.Buffer = true;
                        if (arrData != null)
                        {
                            file = Convert.ToBase64String(arrData);
                            response.Write(file);
                            response.End();
                            httpResponseMessage.Content = new StringContent(file);
                            httpResponseMessage.Content.Headers.Add("x-filename", objReportDataEntity.ExportFileName);
                            httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
                            httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                            httpResponseMessage.Content.Headers.ContentDisposition.FileName = objReportDataEntity.ExportFileName;
                            httpResponseMessage.StatusCode = HttpStatusCode.OK;
                        }
                        else
                        {
                            file = "Data is Null";
                            response.Write(file);
                            response.End();
                            httpResponseMessage.Content = new StringContent(file);
                        }
                        break;
                    case 3: //rtf export
                        GrapeCity.ActiveReports.Export.Word.Section.RtfExport wordexport = new GrapeCity.ActiveReports.Export.Word.Section.RtfExport();
                        wordexport.Export(report.Document, memstream);
                        memstream.Position = 0;
                        arrData = memstream.ToArray();

                        response.Clear();
                        response.ClearContent();
                        response.ClearHeaders();
                        response.Buffer = true;
                        if (arrData != null)
                        {
                            file = Convert.ToBase64String(arrData);
                            response.Write(file);
                            response.End();
                            httpResponseMessage.Content = new StringContent(file);
                            httpResponseMessage.Content.Headers.Add("x-filename", objReportDataEntity.ExportFileName);
                            httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/rtf");
                            httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                            httpResponseMessage.Content.Headers.ContentDisposition.FileName = objReportDataEntity.ExportFileName;
                            httpResponseMessage.StatusCode = HttpStatusCode.OK;
                        }
                        else
                        {
                            file = "Data is Null";
                            response.Write(file);
                            response.End();
                            httpResponseMessage.Content = new StringContent(file);
                        }
                        break;
                    case 4: //text export
                        //Response.ContentType = "text/plain";
                        //Response.AddHeader("content-disposition", "attachment; filename=" + objReportDataEntity.ExportFileName + ".txt");
                        //GrapeCity.ActiveReports.Export.Xml.Section.TextExport txtexport = new GrapeCity.ActiveReports.Export.Xml.Section.TextExport();
                        //Response.ContentType = "text/plain";
                        //txtexport.Encoding = System.Text.Encoding.Default;
                        //txtexport.SuppressEmptyLines = false;
                        //txtexport.TextDelimiter = "      ";
                        //txtexport.Export(report.Document, memstream);
                        //memstream.Position = 0;
                        //Response.BinaryWrite(memstream.ToArray());
                        //Response.AddHeader("Content-Length", memstream.Length.ToString());
                        //System.Web.HttpContext.Current.Response.Flush();
                        //System.Web.HttpContext.Current.Response.SuppressContent = true;
                        //System.Web.HttpContext.Current.ApplicationInstance.CompleteRequest();
                        break;
                }
                return httpResponseMessage;
             }
            catch (Exception ex)
            {
                //  response.Redirect("~/Home/Index");
                //  System.Web.HttpContext.Current.Response.Redirect("~/Home/Index");

                //HttpContext.Current.Server.ClearError();
                response.Clear();
                response.Status = "200 OK";
                response.Write("iDrawings encountered a problem while executing your command");
                response.End();
                return null;
            }
        }

        private bool CheckReportValidInputData(ReportDataEntity appInput)
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
    }
}
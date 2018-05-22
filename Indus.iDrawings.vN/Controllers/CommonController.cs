using Indus.iDrawings.Administration.Entity;
using Indus.iDrawings.Administration.Entity.Interfaces;
using Indus.iDrawings.Administration.Models;
using Indus.iDrawings.Utils;
using System.Web.Mvc;

using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Entity.Interfaces;
using Indus.iDrawings.Common.Models.Items;
using Indus.iDrawings.Common.Models;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Security.Claims;
using Indus.iDrawings.Web;
using System.Web;
using Indus.iDrawings.Utils.Security.Validation;
using System;
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;
using System.IO;
using System.Data;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Web.UI.WebControls;
using System.Web.UI;
using ClosedXML;
using ClosedXML.Excel;
using Indus.iDrawings.Codebase.Models.Items.Reports;
using Indus.iDrawings.Codebase.Models.Items.Reports.ReportData;

namespace Indus.iDrawings.vN.Controllers
{

    public class CommonController : iDrawingsController
    {
        private static List<string> errors = new List<string>();

        public CommonController()
        {

        }


        // For Add page Field generation 
        [ActionName("GetAddAppFormFields")]
        //[ValidateAntiForgeryToken]
        public JsonResult GetAddAppFormFields(string Input)
        {
            return GetAppFormFields(Input);
        }

        // For Edit page Field generation
        [ActionName("GetEditAppFormFields")]
        //[ValidateAntiForgeryToken]
        public JsonResult GetEditAppFormFields(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetFieldBinderEditContent(applnInp);
                //  objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn.FieldBinderList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = Int32.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }

        }
        protected override JsonResult Json(object data, string contentType, System.Text.Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonResult()
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior,
                MaxJsonLength = Int32.MaxValue // Use this value to set your maximum size for all of your Requests
            };
        }


        // For List page column field data
        [ActionName("GetListAppFormFields")]
        //[ValidateAntiForgeryToken]
        public JsonResult GetListAppFormFields(string Input)
        {
            return GetAppFormFields(Input);
        }
        public DefaultApiReturn logError(DefaultApiReturn objDefaultApiReturn)
        {
            for (int i = 0; i < errors.Count; i++)
            {
                if (objDefaultApiReturn.UnhandledErrorMessage == null)
                {
                    objDefaultApiReturn.UnhandledErrorMessage = errors[i];
                }
                else
                {
                    objDefaultApiReturn.UnhandledErrorMessage += "; " + errors[i];
                }
            }
            return objDefaultApiReturn;
        }
        public CustomApiReturn logError(CustomApiReturn objCustomApiReturn)
        {
            for (int i = 0; i < errors.Count; i++)
            {
                if (objCustomApiReturn.UnhandledErrorMessage == null)
                {
                    objCustomApiReturn.UnhandledErrorMessage = errors[i];
                }
                else
                {
                    objCustomApiReturn.UnhandledErrorMessage += "; " + errors[i];
                }
            }
            return objCustomApiReturn;
        }
        public MessageReturn logError(MessageReturn objDefaultApiReturn)
        {
            for (int i = 0; i < errors.Count; i++)
            {
                if (objDefaultApiReturn.UnhandledErrorMessage == null)
                {
                    objDefaultApiReturn.UnhandledErrorMessage = errors[i];
                }
                else
                {
                    objDefaultApiReturn.UnhandledErrorMessage += "; " + errors[i];
                }
            }
            return objDefaultApiReturn;
        }

        private static void recordErrors(string errorMessage)
        {
            errors.Clear();
            errors.Add(errorMessage);
        }
        public JsonSerializerSettings jsonSerializeSettingsObj = new JsonSerializerSettings
        {
            Error = delegate (object sender, Newtonsoft.Json.Serialization.ErrorEventArgs args)
            {
                recordErrors(args.ErrorContext.Error.Message);
                args.ErrorContext.Handled = true;
            }
        };
        // For List page data
        [ActionName("GetAppFormDataList")]
        public JsonResult GetAppFormDataList(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                TypeValidation typeVal = new TypeValidation();
                bool blnReturn = true;
                if (applnInp.Filter != null)
                {
                    blnReturn = typeVal.checkWhiteList(applnInp.Filter, 15);
                }
                if (blnReturn == true)
                {
                    BaseClassInput baseClassInput = BaseInput;
                    if (applnInp.IsExport == 1)
                    {
                        baseClassInput.RowsPerPage = 0;
                    }
                    objDefaultApiReturn = new CommonModel(baseClassInput).ApplicationFormItem.Extented.GetFieldBinderListContent(applnInp);
                    var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return Json(jsonResult, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }
        // For List page data
        [ActionName("GetAppFormDataListExport")]
        public HttpResponseMessage GetAppFormDataListExport(string Input, string fileName, string[] fields = null)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                TypeValidation typeVal = new TypeValidation();
                bool blnReturn = true;
                if (applnInp.Filter != null)
                {
                    blnReturn = typeVal.checkWhiteList(applnInp.Filter, 15);
                }
                if (blnReturn == true)
                {
                    BaseClassInput baseClassInput = BaseInput;
                    //if (applnInp.IsExport == 1)
                    //{
                    baseClassInput.RowsPerPage = 0;
                    // }
                    objDefaultApiReturn = new CommonModel(baseClassInput).ApplicationFormItem.Extented.GetFieldBinderListContent(applnInp);
                    List<string> dateFields = new List<string>();
                    if (fields != null)
                    {
                        dynamic fieldObj = this.GetListAppFormFields("{FormId:" + applnInp.FormId + "}");
                        dynamic columnFields = (fieldObj.Data).Data;

                        for (int i = 0; i < columnFields.Count; i++)
                        {
                            if (columnFields[i].GenericDataTypeId == 2)
                            {
                                int index = Array.IndexOf(fields, columnFields[i].FieldLabel);
                                if (index != -1)
                                {
                                    dateFields.Add(fields[index]);
                                }

                            }
                        }
                    }
                    return ExportToExcel(objDefaultApiReturn.FieldBinderData, fileName, fields, null, dateFields);
                    //  var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                    // jsonResult.MaxJsonLength = int.MaxValue;

                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception ex)
            {
                return HTTPResponseErrorMessage(ex.ToString());
            }
        }
        public HttpResponseMessage ExportToExcel(string Input, string fileName, string[] fields = null, BaseClassInput baseClassInput = null, List<string> dateFields = null)//,string selection=null, string dataKey=null)
        {

            byte[] arrData;
            fileName = fileName + ".xlsx";
            try
            {

                //  throw new Exception();

                System.Data.DataTable dataTable = (System.Data.DataTable)JsonConvert.DeserializeObject(Input, (typeof(System.Data.DataTable)));
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                int userid = 0;
                string folderPath = "";
                if (baseClassInput == null)
                {
                    folderPath = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetCustomerFolderName();
                    userid = BaseInput.UserId;
                }
                else
                { folderPath = new CommonModel(baseClassInput).ApplicationFormItem.Extented.GetCustomerFolderName();
                    userid = baseClassInput.UserId;
                }

                DataView dataView = dataTable.DefaultView;
                GridView gridView = new GridView();
                HttpContext context = System.Web.HttpContext.Current;
                HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
                if (dataTable.Rows.Count > 0)
                {
                    fields = fields ?? new string[0];
                    string[] columnNames = (from dc in dataTable.Columns.Cast<DataColumn>()
                                            select dc.ColumnName).ToArray();
                    for (int i = 0; i < columnNames.Length; i++)//Dsiplay settings
                    {
                        var isExists = fields.Contains(columnNames[i].ToString());
                        if (!isExists)
                        {
                            dataTable.Columns.Remove(columnNames[i].ToString());
                        }
                        dataTable.TableName = "Export";
                    }

                    dataTable.TableName = "Export";
                    // var temp = Path.GetTempPath(); // Get %TEMP% path
                    // var file = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()); // Get random file name without extension

                    var path = Path.Combine(folderPath, "ExportFiles\\Temp\\" + userid);//+"\"" + fileName;
                                                                                        // @"D:\\" + fileName;
                    if (!Directory.Exists(path))
                    {

                        Directory.CreateDirectory(path);
                    }

                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        var ws = wb.Worksheets.Add(dataTable);
                        for (int i = 0; i < dataTable.Columns.Count; i++)
                        {
                            if (dataTable.Columns[i].DataType == typeof(DateTime))
                            {
                                string columnName = dataTable.Columns[i].ColumnName;
                                if (dateFields != null && dateFields.IndexOf(columnName) != -1)
                                {
                                    ws.Column(i + 1).Style.NumberFormat.Format = "dd MMM yyyy";
                                }
                                else
                                {
                                    ws.Column(i + 1).Style.NumberFormat.Format = "dd MMM yyyy h:mm AM/PM";
                                    ws.Column(i + 1).Width = 20;
                                }
                            }
                        }
                        //   wb.SaveAs(fileName);
                        using (MemoryStream ms = new MemoryStream())
                        {
                            wb.SaveAs(ms);
                            string filepath = path + "\\" + fileName;
                            using (var fs = new FileStream(filepath, FileMode.Create, FileAccess.Write))
                            {
                                // Write content of your memory stream into file stream
                                ms.WriteTo(fs);
                            }

                            context.Response.Clear();
                            context.Response.ClearContent();
                            context.Response.ClearHeaders();
                            context.Response.Buffer = true;

                            WebClient req = new WebClient();
                            arrData = req.DownloadData(filepath);
                            if (System.IO.File.Exists(filepath))
                                System.IO.File.Delete(filepath);

                            String file;
                            if (arrData != null)
                            {
                                file = Convert.ToBase64String(arrData);
                                context.Response.Write(file);
                                context.Response.End();
                                httpResponseMessage.Content = new StringContent(file);
                                httpResponseMessage.Content.Headers.Add("x-filename", fileName);
                                httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                                httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                                httpResponseMessage.Content.Headers.ContentDisposition.FileName = fileName;
                                httpResponseMessage.StatusCode = HttpStatusCode.OK;
                            }
                            else
                            {
                                file = "Data is Null";
                                context.Response.Write(file);
                                context.Response.End();
                                httpResponseMessage.Content = new StringContent(file);

                            }


                        }
                    }

                }
                else
                {
                    String file;
                    file = "Data is Null";
                    context.Response.Write(file);
                    context.Response.End();
                    httpResponseMessage.Content = new StringContent(file);
                }
                return httpResponseMessage;
            }

            catch (Exception ex)
            {
                return HTTPResponseErrorMessage(ex.ToString());
            }
        }

        // For Insert 
        [ActionName("InsertAppFormData")]
        public JsonResult InsertAppFormData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.InsertFieldBinderData(applnInp);
                // //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }
        // For Update 
        [ActionName("UpdateAppFormData")]
        public JsonResult UpdateAppFormData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.UpdateFieldBinderData(applnInp);
                // //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        // For Delete   
        [ActionName("DeleteAppFormData")]
        public JsonResult DeleteAppFormData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.DeleteFieldBinderData(applnInp);
                //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }
        [ActionName("CheckValidInputData")]
        public bool CheckValidInputData(ApplicationFormInput appInput)
        {
            bool isValid = true;
            if (appInput != null)
            {
                TypeValidation typeVal = new TypeValidation();
                List<ReportFieldValues> listReportFieldValues = new List<ReportFieldValues>();
                List<LookupReportFieldValues> lstLookupReportFieldValues = new List<LookupReportFieldValues>();
                listReportFieldValues = appInput.GetListReportFieldIdValues;
                lstLookupReportFieldValues = appInput.GetListLookupReportFieldIdValues;
                for (int i = 0; i < listReportFieldValues.Count; i++)
                {
                    if (typeVal.checkWhiteList(listReportFieldValues[i].ReportFieldId.ToString(), 5) == false)
                    {
                        isValid = false;
                        break;

                    }
                    if (listReportFieldValues[i].Value != null)
                        if (typeVal.checkWhiteList(listReportFieldValues[i].Value.ToString(), 6) == false)
                        {
                            isValid = false;
                            break;
                        }

                }
                for (int i = 0; i < lstLookupReportFieldValues.Count; i++)
                {
                    if (typeVal.checkWhiteList(lstLookupReportFieldValues[i].ReportFieldId.ToString(), 5) == false)
                    {
                        isValid = false;
                        break;

                    }
                    if (lstLookupReportFieldValues[i].Value != null)
                        if (typeVal.checkWhiteList(lstLookupReportFieldValues[i].Value.ToString(), 6) == false)
                        {
                            isValid = false;
                            break;
                        }
                }

            }
            else
                isValid = false;
            return isValid;
        }
        // For populating dependent lookups   
        [ActionName("GetFieldLookupValues")]
        public JsonResult GetFieldLookupValues(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                objCustomApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetFieldLookupValues(applnInp);
                var jsonResult = Json(objCustomApiReturn.LookupValues, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        // For display settings   
        [ActionName("GetDisplaySettingData")]
        public JsonResult GetDisplaySettingData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                else
                {
                    DisplaySettingInput displaySettingInput = JsonConvert.DeserializeObject<DisplaySettingInput>(Input);
                    CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                    objCustomApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetDisplaySettingData(displaySettingInput);
                    var jsonResult = Json(objCustomApiReturn.DisplaySettingsData, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return Json(jsonResult, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateDisplaySettingsData")]
        public JsonResult UpdateDisplaySettingsData(string ApplnInput, string DisplaySettingsInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(ApplnInput);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                List<DisplaySettingsInput> displaysettingsInp = new List<DisplaySettingsInput>();
                displaysettingsInp = JsonConvert.DeserializeObject<List<DisplaySettingsInput>>(DisplaySettingsInput);
                TypeValidation typeVal = new TypeValidation();
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.UpdateDisplaySettings(applnInp, displaysettingsInp);
                //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateCustomerDisplaySettings")]
        public JsonResult UpdateCustomerDisplaySettings(string ApplnInput, string DisplaySettingsInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(ApplnInput);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                List<DisplaySettingsInput> displaysettingsInp = new List<DisplaySettingsInput>();
                displaysettingsInp = JsonConvert.DeserializeObject<List<DisplaySettingsInput>>(DisplaySettingsInput);
                TypeValidation typeVal = new TypeValidation();
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.UpdateCustomerDisplaySettings(applnInp, displaysettingsInp);
                //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateCAIDisplaySettingsData")]
        public JsonResult UpdateCAIDisplaySettingsData(string ApplnInput, string DisplaySettingsInput, int ArchiveId, int DrawingId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(ApplnInput);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                List<DisplaySettingsInput> displaysettingsInp = new List<DisplaySettingsInput>();
                displaysettingsInp = JsonConvert.DeserializeObject<List<DisplaySettingsInput>>(DisplaySettingsInput);
                TypeValidation typeVal = new TypeValidation();
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.UpdateCAIDisplaySettings(applnInp, displaysettingsInp, ArchiveId, DrawingId);
                //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }


        // For saving drawing   
        [ActionName("SaveBuildingDrawing")]
        public JsonResult SaveBuildingDrawing(string ApplnInput, string FileInput)
        {
            try
            {
                ApplicationFormInput applnInp = new ApplicationFormInput();
                FileDataInput fileInp = new FileDataInput();
                applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(ApplnInput);
                fileInp = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(fileInp.FileName))
                {
                    if (!typeVal.checkWhiteList(fileInp.FileName, 6))
                        throw new Exception();
                }
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).FileUploadItem.SaveBuildingDrawingFiles(applnInp, fileInp);
                //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        // For saving drawing   
        [ActionName("SaveFloorDrawing")]
        public JsonResult SaveFloorDrawing(string ApplnInput, string FileInput)
        {
            try
            {
                ApplicationFormInput applnInp = new ApplicationFormInput();
                FileDataInput fileInp = new FileDataInput();
                applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(ApplnInput);
                fileInp = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(fileInp.FileName))
                {
                    if (!typeVal.checkWhiteList(fileInp.FileName, 6))
                        throw new Exception();
                }
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).FileUploadItem.SaveFloorDrawingFiles(applnInp, fileInp);
                //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("SaveBaseDrawingFiles")]
        public JsonResult SaveBaseDrawingFiles(string ApplnInput, string FileInput) {
            try
            {
                ApplicationFormInput applnInp = new ApplicationFormInput();
                FileDataInput fileInp = new FileDataInput();
                applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(ApplnInput);
                fileInp = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(fileInp.FileName))
                {
                    if (!typeVal.checkWhiteList(fileInp.FileName, 6))
                        throw new Exception();
                }
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).FileUploadItem.SaveBaseDrawingFiles(applnInp, fileInp);
                //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }
        // For Keyword Lookup values   
        [ActionName("GetKeywordSearchLookups")]
        public JsonResult GetKeywordSearchLookups(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetFieldBinderKeywordSearchContent(applnInp);
                objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                //var jsonData = Json(jsonResult, JsonRequestBehavior.AllowGet);
                //jsonData.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        // For AdvancedSerach Lookup values   
        [ActionName("GetAdvancedSerachLookups")]
        public JsonResult GetAdvancedSerachLookups(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetFieldBinderAdvacnedSearchContent(applnInp);
                objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                var jsonData = Json(jsonResult, JsonRequestBehavior.AllowGet);
                jsonData.MaxJsonLength = int.MaxValue;
                return jsonData;
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        // For getting more details   
        [ActionName("GetDetails")]
        public JsonResult GetDetails(string Input)
        {
            //ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            try
            {
                ApplicationFormInput applnInp = new ApplicationFormInput();
                applnInp.FormId = 83;
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetDetails(applnInp);
                objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        // For saving report setup
        [ActionName("SaveReportSetupWithWaterMark")]
        public JsonResult SaveReportSetupWithWaterMark(string ApplnInput, string FileInput, string OldFileName)
        {
            try
            {
                ApplicationFormInput applnInp = new ApplicationFormInput();
                FileDataInput fileInp = new FileDataInput();
                applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(ApplnInput);
                fileInp = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(fileInp.FileName))
                {
                    if (!typeVal.checkWhiteList(fileInp.FileName, 6))
                        throw new Exception();
                }
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).FileUploadItem.SaveReportSetupWithWaterMark(applnInp, fileInp, OldFileName);
                //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        // For populating dependent lookups in list pages  
        [ActionName("GetFieldLookupValuesforList")]
        public JsonResult GetFieldLookupValuesforList(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                objCustomApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetFieldLookupValuesforList(applnInp);
                var jsonResult = Json(objCustomApiReturn.LookupValues, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }
        private JsonResult GetAppFormFields(string Input)
        {
            try
            {
                List<string> errors = new List<string>();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetFieldBinderAddContent(applnInp);
                objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn.FieldBinderList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }

        }

        [ActionName("GetAdditionalDataFieldDetails")]
        public JsonResult GetAdditionalDataFieldDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).AdditionalFieldItem.GetAdditionalDataFieldDetails(applnInp);
                objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeleteAdditionalDataFieldValues")]
        public JsonResult DeleteAdditionalDataFieldValues(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);

                if (CheckValidInputData(applicationFormInput) == false)
                {
                    throw new Exception();
                }
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).AdditionalFieldItem.DeleteAdditionalDataFieldValues(applicationFormInput);
                messageReturn = logError(messageReturn);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        // For Edit page Field generation
        [ActionName("GetAttachmentEditContent")]
        public JsonResult GetAttachmentEditContent(string Input, string attachmentCategoryId, string baseEntityId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                List<ReportFieldValues> lstValues = new List<ReportFieldValues>();
                applnInp.BaseEntityId = Convert.ToInt32(baseEntityId);
                switch (attachmentCategoryId)
                {
                    case "2":
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 571, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;
                    case "3":
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 487, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;
                    case "4":
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 539, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;
                    case "5":  //space
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 780, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;

                    case "6":  //object class
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 647, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;

                    case "7":  //
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 639, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;

                    case "9":  //Employee
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 866, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;
                        
                    case "12":
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 7416, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;
                    case "17":  //Lease Clause
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 5975, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;

                    case "18":  //Lease
                        lstValues = applnInp.GetListReportFieldIdValues;
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;

                    case "21":  //Attach procedure
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 1332, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;

                    default:
                        break;
                }
                applnInp.ListReportFieldIdValues = lstValues;
                objDefaultApiReturn = new CommonModel(BaseInput).AttachmentsItem.GetAttachmentEditContent(applnInp);
                var jsonResult = Json(objDefaultApiReturn.FieldBinderList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = Int32.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }

        }

        [ActionName("GetAttachmentsList")]
        public JsonResult GetAttachmentsList(string Input, string attachmentCategoryId, string baseEntityId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                List<ReportFieldValues> lstValues = new List<ReportFieldValues>();
                switch (attachmentCategoryId)
                {
                    case "2":
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 571, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;
                    case "3":
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 487, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;
                    case "4":
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 539, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;
                    case "5":  //space
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 780, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;

                    case "6":  //object class
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 647, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;

                    case "7":  //
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 639, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;

                    case "9":  //Employee
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 866, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;
                    case "12":
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 7416, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;
                    case "17":  //Lease Clause
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 5975, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;

                    case "18":  //Lease
                        lstValues = applnInp.GetListReportFieldIdValues;
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;

                    case "21":  //Attach procedure
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 1332, Value = baseEntityId });
                        lstValues.Insert(0, new ReportFieldValues { ReportFieldId = 51, Value = attachmentCategoryId });
                        break;

                    default:
                        break;
                }
                applnInp.ListReportFieldIdValues = lstValues;
                objDefaultApiReturn = new CommonModel(BaseInput).AttachmentsItem.GetAttachmentsList(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertAttachment")]
        public JsonResult InsertAttachment(string applnInput, string fileInput, string attachmentCategoryId)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(fileInput);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(fileDataInput.FileName))
                {
                    if (!typeVal.checkWhiteList(fileDataInput.FileName, 6))
                        throw new Exception();
                }
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).AttachmentsItem.InsertAttachment(applicationFormInput, fileDataInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }
        [ActionName("UpdateAttachment")]
        public JsonResult UpdateAttachment(string applnInput, string fileInput, string attachmentCategoryId)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(fileInput);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(fileDataInput.FileName))
                {
                    if (!typeVal.checkWhiteList(fileDataInput.FileName, 6))
                        throw new Exception();
                }
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).AttachmentsItem.UpdateAttachment(applicationFormInput, fileDataInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeleteAttachment")]
        public JsonResult DeleteAttachment(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).AttachmentsItem.DeleteAttachment(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }
        [ActionName("DecodeBarCodeFromImageUploaded")]
        public JsonResult DecodeBarCodeFromImage(string fileInput)
        {
            try
            {
                FileDataInput fileDataInput = new FileDataInput();
                fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(fileInput);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(fileDataInput.FileName))
                {
                    if (!typeVal.checkWhiteList(fileDataInput.FileName, 6))
                        throw new Exception();
                }
                string barcodeResult = new CommonModel(BaseInput).AttachmentsItem.DecodeBarCodeFromImage(fileDataInput);
                var jsonResult = Json(barcodeResult, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("CheckObjectClassAttachments")]
        public JsonResult CheckObjectClassAttachments(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                int returnVal = new CommonModel(BaseInput).AttachmentsItem.CheckObjectClassAttachments(applicationFormInput);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertAttachmentCustomFieldValues")]
        public JsonResult InsertAttachmentCustomFieldValues(string applnInput, int attachmentId, string addlDataFieldValue, string addlDataFieldLookUpId, string colSeparator, string rowSeparator)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).AdditionalFieldItem.InsertAttachmentCustomFieldValues(applicationFormInput, attachmentId, addlDataFieldValue, addlDataFieldLookUpId, colSeparator, rowSeparator);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCurrentDateTime")]
        public JsonResult GetCurrentDateTime()
        {
            try
            {
                string dateTime = new CommonModel(BaseInput).AttachmentsItem.GetCurrentDateTime();
                var jsonResult = Json(dateTime, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }


        [ActionName("CheckIsEntityReferenceExists")]
        public JsonResult CheckIsEntityReferenceExists(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                bool returnValue = new CommonModel(BaseInput).ApplicationFormItem.Extented.CheckIsEntityReferenceExists(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet); //return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSubscribedFeatures")]
        public JsonResult GetSubscribedFeatures(string input, string FeatureCategoryIds)
        {
            //"1,2,26,117,"
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(FeatureCategoryIds))
                {
                    bool blnReturn = typeVal.checkWhiteListSelectedIds(FeatureCategoryIds, 5, ",");
                    if (blnReturn == false)
                    {
                        throw new Exception();
                    }
                }
                SubscribedFeaturesOutput objFeatureOut = new SubscribedFeaturesOutput();
                objFeatureOut = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetSubscribedFeatures(applicationFormInput, FeatureCategoryIds);
                var jsonResult = Json(objFeatureOut.lstSubscribedFeature, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUserPrivilegesofPage")]
        public JsonResult GetUserPrivilegesofPage(string input, string Privileges)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                if (input.Length > 0)
                {
                    applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                }
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(Privileges))
                {
                    bool blnReturn = typeVal.checkWhiteListSelectedIds(Privileges, 5, ",");
                    if (blnReturn == false)
                    {
                        throw new Exception();
                    }
                }
                int returnVal = new CommonModel(BaseInput).ApplicationFormItem.Extented.HasPrivilege(applicationFormInput, Privileges);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        public void DownloadFile(string input)
        {
            ApplicationFormInput inp = new ApplicationFormInput();
            FileDataInput fileInp = new FileDataInput();
            byte[] arrVal = new CommonModel(BaseInput).FileDownloadItem.DownloadFloorDrawingFiles(inp, fileInp);
            HttpResponse response = System.Web.HttpContext.Current.Response;
            response.Clear();
            response.ClearContent();
            response.ClearHeaders();
            response.Buffer = true;
            //response.AddHeader("Content-Disposition", "attachment;filename=\"" + _filepath + "\"");
            response.BinaryWrite(arrVal);
            response.End();
        }

        [ActionName("ArrayDownloadFile")]
        public System.Net.Http.HttpResponseMessage ArrayDownloadFile(string Input, string Fileinput)
        {
            byte[] arrData = new byte[0];
            ApplicationFormInput inp = new ApplicationFormInput();
            FileDataInput fileInp = new FileDataInput();
            inp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            fileInp = JsonConvert.DeserializeObject<FileDataInput>(Fileinput);

            HttpResponse response = System.Web.HttpContext.Current.Response;
            response.Clear();
            response.ClearContent();
            response.ClearHeaders();
            response.Buffer = true;

            arrData = new CommonModel(BaseInput).FileDownloadItem.ArrayDownloadFile(inp, fileInp, response);
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            String file;
            if (arrData != null)
            {
                file = Convert.ToBase64String(arrData);
                // response.AddHeader("Content-Disposition", "attachment;filename=\"" + fileInp.FilePath + "\"");
                // response.ContentType = "image/jpeg";
                response.Write(file);
                response.End();
                httpResponseMessage.Content = new StringContent(file);
                httpResponseMessage.Content.Headers.Add("x-filename", fileInp.FileName);
                httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                // httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
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

        [ActionName("MultipleDownloadFile")]
        public System.Net.Http.HttpResponseMessage MultipleDownloadFile(string Input, string Fileinput)
        {
            byte[] arrData = new byte[0];
            ApplicationFormInput inp = new ApplicationFormInput();
            List<FileDataInput> fileInp = new List<FileDataInput>();
            inp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            fileInp = JsonConvert.DeserializeObject<List<FileDataInput>>(Fileinput);

            HttpResponse response = System.Web.HttpContext.Current.Response;
            response.Clear();
            response.ClearContent();
            response.ClearHeaders();
            response.Buffer = true;

            arrData = new CommonModel(BaseInput).FileDownloadItem.MultipleDownloadFile(inp, fileInp, response);
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            String file;
            if (arrData != null)
            {
                file = Convert.ToBase64String(arrData);
                // response.AddHeader("Content-Disposition", "attachment;filename=\"" + fileInp.FilePath + "\"");
                // response.ContentType = "image/jpeg";
                response.Write(file);
                response.End();
                httpResponseMessage.Content = new StringContent(file);
                httpResponseMessage.Content.Headers.Add("x-filename", "Document.zip");
                httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                // httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
                httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                httpResponseMessage.Content.Headers.ContentDisposition.FileName = "Document.zip";
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

        [ActionName("ArrayDrawingDownloadFile")]
        public System.Net.Http.HttpResponseMessage ArrayDrawingDownloadFile(string Input, string Fileinput)
        {
            byte[] arrData = new byte[0];
            ApplicationFormInput inp = new ApplicationFormInput();
            FileDataInput fileInp = new FileDataInput();
            inp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            fileInp = JsonConvert.DeserializeObject<FileDataInput>(Fileinput);

            HttpResponse response = System.Web.HttpContext.Current.Response;
            response.Clear();
            response.ClearContent();
            response.ClearHeaders();
            response.Buffer = true;

            arrData = new CommonModel(BaseInput).FileDownloadItem.ArrayDrawingDownloadFile(inp, fileInp, response);
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            String file;
            if (arrData != null)
            {
                file = Convert.ToBase64String(arrData);
                // response.AddHeader("Content-Disposition", "attachment;filename=\"" + fileInp.FilePath + "\"");
                // response.ContentType = "image/jpeg";
                response.Write(file);
                response.End();
                httpResponseMessage.Content = new StringContent(file);
                httpResponseMessage.Content.Headers.Add("x-filename", fileInp.FileName);
                httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                // httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
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

        [ActionName("DownloadBaseDrawingFile")]
        public System.Net.Http.HttpResponseMessage DownloadBaseDrawingFile(string Input, string Fileinput)
        {
            byte[] arrData = new byte[0];
            ApplicationFormInput inp = new ApplicationFormInput();
            FileDataInput fileInp = new FileDataInput();
            inp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            fileInp = JsonConvert.DeserializeObject<FileDataInput>(Fileinput);

            HttpResponse response = System.Web.HttpContext.Current.Response;
            response.Clear();
            response.ClearContent();
            response.ClearHeaders();
            response.Buffer = true;

            arrData = new CommonModel(BaseInput).FileDownloadItem.DownloadBaseDrawingFile(inp, fileInp, response);
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            String file;
            if (arrData != null)
            {
                file = Convert.ToBase64String(arrData);
                // response.AddHeader("Content-Disposition", "attachment;filename=\"" + fileInp.FilePath + "\"");
                // response.ContentType = "image/jpeg";
                response.Write(file);
                response.End();
                httpResponseMessage.Content = new StringContent(file);
                httpResponseMessage.Content.Headers.Add("x-filename", fileInp.FileName);
                httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                // httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
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

        [ActionName("ArrayBuildingDrawingDownloadFile")]
        public System.Net.Http.HttpResponseMessage ArrayBuildingDrawingDownloadFile(string Input, string Fileinput)
        {
            byte[] arrData = new byte[0];
            ApplicationFormInput inp = new ApplicationFormInput();
            FileDataInput fileInp = new FileDataInput();
            inp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            fileInp = JsonConvert.DeserializeObject<FileDataInput>(Fileinput);

            HttpResponse response = System.Web.HttpContext.Current.Response;
            response.Clear();
            response.ClearContent();
            response.ClearHeaders();
            response.Buffer = true;

            arrData = new CommonModel(BaseInput).FileDownloadItem.ArrayBuildingDrawingDownloadFile(inp, fileInp, response);
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            String file;
            if (arrData != null)
            {
                file = Convert.ToBase64String(arrData);
                // response.AddHeader("Content-Disposition", "attachment;filename=\"" + fileInp.FilePath + "\"");
                // response.ContentType = "image/jpeg";
                response.Write(file);
                response.End();
                httpResponseMessage.Content = new StringContent(file);
                httpResponseMessage.Content.Headers.Add("x-filename", fileInp.FileName);
                httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                // httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
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

        [ActionName("GetAllColors")]
        public JsonResult GetAllColors()
        {
            try
            {
                List<ColorsReturn> lstColors = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetAllColors();
                var jsonResult = Json(lstColors, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOrganizationUnits")]
        public JsonResult GetOrganizationUnits(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetOrganizationUnits(applnInp);
                return Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetFieldFormatDetails")]
        public JsonResult GetFieldFormatDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).AdditionalFieldItem.GetFieldFormatDetails(applnInp);
                objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWhiteListDetails")]
        public JsonResult GetWhiteListDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).AdditionalFieldItem.GetWhiteListDetails(applnInp);
                objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }

        }

        [ActionName("GetPrivilegesOfPageForUser")]
        public JsonResult GetPrivilegesOfPageForUser(string input, int PageId, string Privileges)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                if (input.Length > 0)
                {
                    applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                }
                int returnVal = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetPrivilegesOfPageForUser(applicationFormInput, PageId, Privileges);

                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }

        }

        [ActionName("GetPrivilegesOfMultiplePagesForUser")]
        public JsonResult GetPrivilegesOfMultiplePagesForUser(string input, string PageId, string Privileges)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                if (input.Length > 0)
                {
                    applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                }
                int returnVal = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetPrivilegesOfMultiplePagesForUser(applicationFormInput, PageId, Privileges);

                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }

        }


        [ActionName("IsFieldSubscribed")]
        public JsonResult IsFieldSubscribed(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                if (input.Length > 0)
                {
                    applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                }
                int returnVal = 0;// new CommonModel(BaseInput).ApplicationFormItem.Extented.IsFieldSubscribed(applicationFormInput);

                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetBuildingList")]
        public JsonResult GetBuildingList(string Input, int OwnerShipId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).SiteBuildingFloorItem.GetBuildingList(applnInp, OwnerShipId);
                objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAdditionalFieldIsInUse")]
        public JsonResult GetAdditionalFieldIsInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();

                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                if (CheckValidInputData(applicationFormInput) == false)
                {
                    throw new Exception();
                }
                int returnValue = new CommonModel(BaseInput).AdditionalFieldItem.GetAdditionalFieldIsInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckAdditionalDataFieldLookUpValueInUse")]
        public JsonResult CheckAdditionalDataFieldLookUpValueInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new CommonModel(BaseInput).AdditionalFieldItem.CheckAdditionalDataFieldLookUpValueInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAdditionalFieldHaveLookUpValues")]
        public JsonResult GetAdditionalFieldHaveLookUpValues(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new CommonModel(BaseInput).AdditionalFieldItem.GetAdditionalFieldHaveLookUpValues(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetBuildingRenovations")]
        public JsonResult GetBuildingRenovations(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).SiteBuildingFloorItem.GetBuildingRenovations(applnInp);
                objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }
        [ActionName("InsertBuildingRenovation")]
        public JsonResult InsertBuildingRenovation(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).SiteBuildingFloorItem.InsertBuildingRenovation(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }
        [ActionName("UpdateBuildingRenovation")]
        public JsonResult UpdateBuildingRenovation(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).SiteBuildingFloorItem.UpdateBuildingRenovation(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }
        [ActionName("DeleteBuildingRenovation")]
        public JsonResult DeleteBuildingRenovation(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).SiteBuildingFloorItem.DeleteBuildingRenovation(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckWhiteList")]
        public JsonResult CheckWhiteList(string Value, int Type)
        {
            try
            {
                TypeValidation typeVal = new TypeValidation();
                bool blnReturn = typeVal.checkWhiteList(Value, Type);
                var jsonResult = Json(blnReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSessionValues")]
        public JsonResult GetSessionValues()
        {
            try
            {
                var jsonResult = Json(BaseInput, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCustomerPermittedFiles")]
        public JsonResult GetCustomerPermittedFiles(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (applnInp.GetListReportFieldIdValues[0].ReportFieldId == 331)
                {
                    TypeValidation typeVal = new TypeValidation();
                    if (typeVal.checkWhiteList(applnInp.GetListReportFieldIdValues[0].Value, 6) == false)
                    {
                        throw new Exception();
                    }
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetCustomerPermittedFiles(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ErrorMessage")]
        public JsonResult ErrorMessage(string ex)
        {
            try
            {
                if (BaseInput != null)
                {
                    new CommonModel(BaseInput).ApplicationFormItem.Extented.InsertErrorMessages(ex);
                }
            }
            catch(Exception e)
            {
                BaseClassInput input = new BaseClassInput();
                input.CustomerId = 1;
                input.UserId = 1;
                input.TimeOffset = 0;
                new CommonModel(input).ApplicationFormItem.Extented.InsertErrorMessages(ex);
            }
            MessageReturn messageReturn = new MessageReturn();
            messageReturn.StatusId = -9999;
            messageReturn.ServerId = -9999;
            messageReturn.UnhandledErrorMessage = "iDrawings encountered a problem while executing your command";
            var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
        }
        [ActionName("HTTPResponseErrorMessage")]
        public HttpResponseMessage HTTPResponseErrorMessage(string ex)
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            try
            {
                if (BaseInput != null)
                {
                    new CommonModel(BaseInput).ApplicationFormItem.Extented.InsertErrorMessages(ex);
                }
            }
            catch (Exception e)
            {
                BaseClassInput input = new BaseClassInput();
                input.CustomerId = 1;
                input.UserId = 1;
                input.TimeOffset = 0;
                new CommonModel(input).ApplicationFormItem.Extented.InsertErrorMessages(ex);
            }
            HttpContext context = System.Web.HttpContext.Current;
            context.Response.Write("-9999");
            context.Response.End();
            httpResponseMessage.Content = new StringContent("");

            //  httpResponseMessage.Content = new StringContent("-9999");
            //   httpResponseMessage.StatusCode= HttpStatusCode.BadRequest;
            //MessageReturn messageReturn = new MessageReturn();
            //messageReturn.StatusId = -9999;
            //messageReturn.ServerId = -9999;
            // messageReturn.UnhandledErrorMessage = "iDrawings encountered a problem while executing your command";
            // var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
            //jsonResult.MaxJsonLength = int.MaxValue;
            return httpResponseMessage;
        }
        [ActionName("GetPrivilegesOfPage")]
        public JsonResult GetPrivilegesOfPage(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetPrivilegesOfPage(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAccessibleModulesForUser")]
        public JsonResult GetAccessibleModulesForUser()
        {
            try
            {
                List<ModuleDetails> lstModuleDetails = new CommonModel(BaseInput).UserItem.GetAccessibleModulesForUser();
                var jsonResult = Json(lstModuleDetails, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetMenuDetails")]
        public JsonResult GetMenuDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                List<MenuGroups> lstMenu = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetMenuDetails(applnInp);
                var jsonResult = Json(lstMenu, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSettingsMenuDetails")]
        public JsonResult GetSettingsMenuDetails()
        {
            try
            {
                List<MenuGroups> lstMenu = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetSettingsMenuDetails();
                /*List<MenuGroups> lstMenu = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetUserAccessMenuDetails(1);*/
                var jsonResult = Json(lstMenu, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetReportMenuDetails")]
        public JsonResult GetReportMenuDetails()
        {
            try
            {
                List<MenuGroups> lstMenu = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetReportMenuDetails();
                var jsonResult = Json(lstMenu, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetEntityStatus")]
        public JsonResult GetEntityStatus(string Input, string DbobjectId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                int returnVal = new CommonModel(BaseInput).AdditionalFieldItem.GetEntityStatus(applnInp, Convert.ToInt32(DbobjectId));
                // objDefaultApiReturn = new CommonController().logError(objDefaultApiReturn);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDBObjectLookupValues")]
        public JsonResult GetDBObjectLookupValues(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string ApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetFieldLookupValuesByDBObject(applnInp);
                var jsonResult = Json(ApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("IsModuleAdmin")]
        public JsonResult IsModuleAdmin(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                bool returnValue = new CommonModel(BaseInput).ApplicationFormItem.Extented.IsModuleAdmin(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckMailDomainInUse")]
        public JsonResult CheckMailDomainInUse(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new CommonModel(BaseInput).ApplicationFormItem.Extented.CheckMailDomainInUse(applicationFormInput);
                if (returnValue == -999)
                {
                    throw new Exception();
                }
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckAttachmentCategoryInUse")]
        public JsonResult CheckAttachmentCategoryInUse(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new CommonModel(BaseInput).ApplicationFormItem.Extented.CheckAttachmentCategoryInUse(applicationFormInput);
                if (returnValue == -999)
                {
                    throw new Exception();
                }
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetMultiDatabyDBObject")]
        public JsonResult GetMultiDatabyDBObject(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetMultiDatabyDBObject(applnInp);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("SaveCustomReport")]
        public JsonResult SaveCustomReport(string Input, bool isSaveAs, int parentRPTId)
        {
            try
            {
                CustomReportInput customReportInput = new CustomReportInput();
                FileDataInput fileInp = new FileDataInput();
                customReportInput = JsonConvert.DeserializeObject<CustomReportInput>(Input);

                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).CustomReportItem.SaveReport(customReportInput, isSaveAs, parentRPTId);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("SaveCustomReportPreview")]
        public JsonResult SaveCustomReportPreview(string Input)
        {
            try
            {
                CustomReportInput customReportInput = new CustomReportInput();
                FileDataInput fileInp = new FileDataInput();
                customReportInput = JsonConvert.DeserializeObject<CustomReportInput>(Input);

                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).CustomReportItem.SaveCustomReportPreview(customReportInput);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCustomReportDetails")]
        public JsonResult GetCustomReportDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new CommonModel(BaseInput).CustomReportItem.GetCustomReportDetails(applnInp);
                return Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSiteTimeOffset")]
        public JsonResult GetSiteTimeOffset(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).SiteBuildingFloorItem.GetSiteTimeOffset(applnInp);
                objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCustomerOrganizationalStructure")]
        public JsonResult GetCustomerOrganizationalStructure(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string OrgStructure = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetCustomerOrganizationalStructure(applnInp);
                return Json(OrgStructure, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCustomReportData")]
        public JsonResult GetCustomReportData(string Input, int ObjectCategoryId)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string ReportFields = new CommonModel(BaseInput).CustomReportItem.GetCustomReportData(applicationFormInput, ObjectCategoryId);
                return Json(ReportFields, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCustomerFolderName")]
        public JsonResult GetCustomerFolderName()
        {
            try
            {
                string folderpath = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetCustomerFolderName();
                return Json(folderpath, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }


        [ActionName("PopulateQueryBuilderFieldList")]
        public JsonResult PopulateQueryBuilderFieldList(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).CustomReportItem.PopulateQueryBuilderFieldList(applicationFormInput);
                return Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetQueryBuilderLookupValues")]
        public JsonResult GetQueryBuilderLookupValues(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).CustomReportItem.GetQueryBuilderLookupValues(applicationFormInput);
                return Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }


        [ActionName("UpdateApplicationFormFieldOrder")]
        public JsonResult UpdateApplicationFormFieldOrder(string Input)
        {
            try
            {
                List<ApplicationFormFieldOrderInput> listApplicationFormFieldOrder = JsonConvert.DeserializeObject<List<ApplicationFormFieldOrderInput>>(Input);
                // ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.UpdateApplicationFormFieldOrder(listApplicationFormFieldOrder);
                // //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckOrgUnitStructureExists")]
        public JsonResult CheckOrgUnitStructureExists(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new CommonModel(BaseInput).ApplicationFormItem.Extented.CheckOrgUnitStructureExists(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetApplicationFormFieldsForMultipleEdit")]
        public JsonResult GetApplicationFormFieldsForMultipleEdit(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                string strFields = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetApplicationFormFieldsForMultipleEdit(applicationFormInput);
                var jsonResult = Json(strFields, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetApplicationFormFieldDetails")]
        public JsonResult GetApplicationFormFieldDetails(string input)
        {
            try
            {
                List<string> errors = new List<string>();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                if (CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetApplicationFormFieldDetails(applnInp);
                objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn.FieldBinderList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDetailsForDashBoard")]
        public JsonResult GetDetailsForDashBoard()
        {
            try
            {
                string strReturn = new CommonModel(BaseInput).AsBuiltsDashboardItem.GetDetailsForDashBoard();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDrawingCategoriesCountforDashboard")]
        public JsonResult GetDrawingCategoriesCountforDashboard(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new CommonModel(BaseInput).AsBuiltsDashboardItem.GetDrawingCategoriesCountforDashboard(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUserAccessibleSites")]
        public JsonResult GetUserAccessibleSites(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetUserAccessibleSites(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckIsSiteLevelAdmin")]
        public JsonResult CheckIsSiteLevelAdmin(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int intReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.CheckIsSiteLevelAdmin(applnInp);

                var jsonResult = Json(intReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckIsSiteLevelUser")]
        public JsonResult CheckIsSiteLevelUser()
        {
            try
            {
                int intReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.CheckIsSiteLevelUser();
                var jsonResult = Json(intReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetHelpMenuDetails")]
        public JsonResult GetHelpMenuDetails()
        {
            try
            {
                List<MenuGroups> lstMenu = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetHelpMenuDetails();
                /*List<MenuGroups> lstMenu = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetUserAccessMenuDetails(2);*/
                var jsonResult = Json(lstMenu, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUserAccessReportDetails")]
        public JsonResult GetUserAccessReportDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetUserAccessReportDetails(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("SendFeedback")]
        public JsonResult SendFeedback(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new CommonModel(BaseInput).FeedbackItem.SendFeedbackMail(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCustomerAccessScheduleReportDetails")]
        public JsonResult GetCustomerAccessScheduleReportDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetCustomerAccessScheduleReportDetails(applnInp);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("InsertXRefedFloorDrawingDetails")]
        public JsonResult InsertXRefedFloorDrawingDetails(string Input)
        {
            try
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                objDefaultApiReturn = new CommonModel(BaseInput).DrawingItem.InsertXRefedFloorDrawingDetails(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("UpdateCustomerAccessScheduleReports")]
        public JsonResult UpdateCustomerAccessScheduleReports(string Input)
        {
            try
            {
                MessageReturn objMessageReturn = new MessageReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                objMessageReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.UpdateCustomerAccessScheduleReports(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetScheduledReports")]
        public JsonResult GetScheduledReports(string Input, int Moduleid, int Target, int NameDisplayFormatId, int ScheduledReportId)
        {
            try
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetScheduledReports(applnInp,Moduleid,Target,NameDisplayFormatId,ScheduledReportId);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("UpdateScheduleReportStatus")]
        public JsonResult UpdateScheduleReportStatus(string Input)
        {
            try
            {
                MessageReturn objMessageReturn = new MessageReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                objMessageReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.UpdateScheduleReportStatus(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCustomReportDetailsforSelectedAdditionalField")]
        public JsonResult GetCustomReportDetailsforSelectedAdditionalField(string Input)
        {
            try
            {
                var statusReport = "";
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DataSet ds = new CommonModel(BaseInput).AdditionalFieldItem.GetCustomReportDetailsforSelectedAdditionalField(applnInp);
                if ((ds.Tables[0].Rows.Count > 0) || (ds.Tables[1].Rows.Count > 0))
                {
                   // statusReport = "   < table style = 'width:100%;' border = '0' >< tr >< td width = '10%'>&nbsp;</ td >< td width = '40% >< div id = 'divReport' style = 'overflow: auto; height: 239px;' >";
                    statusReport = statusReport+ "Selected additional data field could not be deleted as it is linked to the following ";
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        statusReport = statusReport + " report";
                        statusReport = statusReport + ((ds.Tables[0].Rows.Count > 1) ? "s" : "");
                    }
                    if (ds.Tables[1].Rows.Count > 0)
                    {
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            statusReport = statusReport + " and space allocation rule";
                        }
                        else
                        {
                            statusReport = statusReport + " space allocation rule";
                        }
                        statusReport = statusReport + ((ds.Tables[1].Rows.Count > 1) ? "s" : "");
                    }
                    statusReport = statusReport + ".";
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        statusReport = statusReport +
                                  "<br><br><b><u>Custom report" +
                                  ((ds.Tables[0].Rows.Count > 1) ? "s" : "") +
                                  "</u></b><br><ul>" +
                                  string.Join("", ds.Tables[0].AsEnumerable().Select(s => (string)("<li> " + s["Name"].ToString() + " created by " + s["UserName"].ToString() + " in " + s["Module"].ToString() + " module" + "</li>")).ToArray()) + "</ul>";
                    }
                    if (ds.Tables[1].Rows.Count > 0)
                    {
                        statusReport = statusReport +
                                       "<br><br><b><u>Space Allocation Rule" +
                                       ((ds.Tables[1].Rows.Count > 1) ? "s" : "") +
                                       "</u></b><br><ul>" +
                                       string.Join("", ds.Tables[1].AsEnumerable().Select(s => (string)("<li> " + s["Name"].ToString() + "</li>")).ToArray()) + "</ul>";
                    }

                //    statusReport = statusReport + "</ td > < td width = '10%' > &nbsp;</ td ></ tr >";
                }
                var jsonResult = Json(statusReport, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        
        [ActionName("GetQueryBuilderSeachResult")]
        public JsonResult GetQueryBuilderSeachResult(string Input,int drawingId)
        {
            try
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetQueryBuilderSeachResult(applnInp,drawingId);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetQueryBuilderSeachResultExport")]
        public HttpResponseMessage GetQueryBuilderSeachResultExport(string Input, int drawingId, string fileName, string[] fields = null)
        {
           

            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                TypeValidation typeVal = new TypeValidation();
                bool blnReturn = true;
                if (applnInp.Filter != null)
                {
                    blnReturn = typeVal.checkWhiteList(applnInp.Filter, 15);
                }
                if (blnReturn == true)
                {
                    BaseClassInput baseClassInput = BaseInput;
                    //if (applnInp.IsExport == 1)
                    //{
                    baseClassInput.RowsPerPage = 0;
                    // }
                 
                
                    objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetQueryBuilderSeachResult(applnInp, drawingId);
                    List<string> dateFields = new List<string>();
                    if (fields != null)
                    {
                        dynamic fieldObj = this.GetListAppFormFields("{FormId:" + applnInp.FormId + "}");
                        dynamic columnFields = (fieldObj.Data).Data;

                        for (int i = 0; i < columnFields.Count; i++)
                        {
                            if (columnFields[i].GenericDataTypeId == 2)
                            {
                                int index = Array.IndexOf(fields, columnFields[i].FieldLabel);
                                if (index != -1)
                                {
                                    dateFields.Add(fields[index]);
                                }

                            }
                        }
                    }
                    return ExportToExcel(objDefaultApiReturn.FieldBinderData, fileName, fields, null, dateFields);
                    //  var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                    // jsonResult.MaxJsonLength = int.MaxValue;

                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception ex)
            {
                return HTTPResponseErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetQueryBuilderSearchResultsForObjects")]
        public JsonResult GetQueryBuilderSearchResultsForObjects(string Input, string DrawingIds, int ObjectCategory, int StatusId, int Attributes, string ObjectClassIds)
        {
            try
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetQueryBuilderSearchResultsForObjects(applnInp, DrawingIds, ObjectCategory, StatusId, Attributes, ObjectClassIds);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetQueryBuilderSearchResultsForObjectsExport")]
        public HttpResponseMessage GetQueryBuilderSearchResultsForObjectsExport(string Input, string DrawingIds, int ObjectCategory, int StatusId, int Attributes, string ObjectClassIds, string fileName, string[] fields = null)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(DrawingIds))
                {
                    if (!typeVal.checkWhiteListSelectedIds(DrawingIds, 5, ","))
                        throw new Exception();
                }
                if (!string.IsNullOrEmpty(ObjectClassIds))
                {
                    if (!typeVal.checkWhiteListSelectedIds(ObjectClassIds, 5, ","))
                        throw new Exception();
                }
                BaseClassInput baseClassInput = BaseInput;
                baseClassInput.RowsPerPage = 0;
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetQueryBuilderSearchResultsForObjects(applnInp, DrawingIds, ObjectCategory, StatusId, Attributes, ObjectClassIds);

                return new CommonController().ExportToExcel(objDefaultApiReturn.FieldBinderData, fileName, fields, baseClassInput);
            }
            catch (Exception ex)
            {
                return new CommonController().HTTPResponseErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertQueryBuilderSearchName")]
        public JsonResult InsertQueryBuilderSearchName(string Input)
        {
            try
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.InsertQueryBuilderSearchName(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("InsertQueryBuilderSeachCondition")]
        public JsonResult InsertQueryBuilderSeachCondition(string Input, int queryCategoryId)
        {
            try
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.InsertQueryBuilderSeachCondition(applnInp, queryCategoryId);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpaceTypeDataset")]
        public JsonResult GetSpaceTypeDataset(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                //  Session["SessionId"] = Session.SessionID;
                DefaultApiReturn objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetSpaceTypeDataset(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertAttachmentCategory")]
        public JsonResult InsertAttachmentCategory(string CategoryName)
        {
            try
            {               
                int returnVal = new CommonModel(BaseInput).AttachmentsItem.InsertAttachmentCategory(CategoryName);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUsersByCategoryForScheduledReport")]
        public JsonResult GetUsersByCategoryForScheduledReport(string Input, int RecipientType, int InternalUserGroupId, int ReportId)
        {
            try
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                objDefaultApiReturn = new CommonModel(BaseInput).ScheduledReportItem.GetUsersByCategoryForScheduledReport(applnInp, RecipientType, InternalUserGroupId, ReportId);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdateScheduledReport")]
        public JsonResult InsertUpdateScheduledReport(string Input, int IsAdd, string ScheduleReportInput,string AllReportData)
        {
            try
            {

                MessageReturn objMessageReturn = new MessageReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                ScheduleReportInput scheduleReportInput = JsonConvert.DeserializeObject<ScheduleReportInput>(ScheduleReportInput);
                ReportDataEntity allRPTData;
                if (IsAdd == 1)
                    allRPTData = JsonConvert.DeserializeObject<ReportDataEntity>(AllReportData);
                else
                    allRPTData = null;
                objMessageReturn = new ScheduleReportItem(BaseInput).InsertUpdateScheduledReport(applnInp, IsAdd, scheduleReportInput, allRPTData);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetSavedSearches")]
        public JsonResult GetSavedSearches(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                //  Session["SessionId"] = Session.SessionID;
                DefaultApiReturn objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetSavedSearches(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("getDocumentFormtFileName")]
        public JsonResult getDocumentFormtFileName(string Input, string Fileinput)
        {
            FileDataInput fileInp = new FileDataInput();
            fileInp = JsonConvert.DeserializeObject<FileDataInput>(Fileinput);
            ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            MessageReturn objMsgReturn = new CommonModel(BaseInput).FileDownloadItem.getDocumentFormtFileName(applnInp, fileInp);
            //string ss = "p1.txt";
            var jsonResult = Json(objMsgReturn, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [ActionName("CheckHasScheduledReport")]
        public JsonResult CheckHasScheduledReport(int ReportCategoryId, int IsCustomReport)
        {
            try
            {                         
                MessageReturn  objMessageReturn = new CommonModel(BaseInput).ScheduledReportItem.CheckHasScheduledReport(ReportCategoryId, IsCustomReport);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }

        }

        [ActionName("GetWorkingTime")]
        public JsonResult GetWorkingTime(string Input)
        {
            try
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                objDefaultApiReturn = new CommonModel(BaseInput).CalendarItem.GetWorkingTime(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCalendarDetails")]
        public JsonResult GetCalendarDetails(string Input)
        {
            try
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                objDefaultApiReturn = new CommonModel(BaseInput).CalendarItem.GetCalendarDetails(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetWorkingTimeBasedonDate")]
        public JsonResult GetWorkingTimeBasedonDate(string Input)
        {
            try
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                objDefaultApiReturn = new CommonModel(BaseInput).CalendarItem.GetWorkingTimeBasedonDate(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCalendarInUse")]
        public JsonResult GetCalendarInUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int isInUse = new CommonModel(BaseInput).CalendarItem.GetCalendarInUse(applnInp);
                var jsonResult = Json(isInUse, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetAllEmailIds")]
        public JsonResult GetAllEmailIds(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new CommonModel(BaseInput).ScheduledReportItem.GetAllEmailIds(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }

        }

        [ActionName("InsertCalendar")]
        public JsonResult InsertCalendar(string Input, string CalendarInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                List<CalendarInput> lstCalendarInput = JsonConvert.DeserializeObject<List<CalendarInput>>(CalendarInput);
                MessageReturn objMessageReturn = new CommonModel(BaseInput).CalendarItem.InsertCalendar(applnInp, lstCalendarInput);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }

        }

        [ActionName("GetFloorDrawingListAnalytics")]
        public JsonResult GetFloorDrawingListAnalytics(string Input, int AnalyticsType, string ColumnName)
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
                    string strReturn = new CommonModel(BaseInput).DrawingItem.GetFloorDrawingListAnalytics(applnInp, AnalyticsType, ColumnName);
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
        [ActionName("GetBuildingDrawingListAnalytics")]
        public JsonResult GetBuildingDrawingListAnalytics(string Input, int AnalyticsType, string ColumnName)
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
                    string strReturn = new CommonModel(BaseInput).DrawingItem.GetBuildingDrawingListAnalytics(applnInp, AnalyticsType, ColumnName);
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

        [ActionName("UpdateColorPreferenceSettings")]
        public JsonResult UpdateColorPreferenceSettings(string Input, string moduleId, bool isMySettings)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MessageReturn msgReturn = new MessageReturn();
                msgReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.UpdateColorPreferenceSettings(applnInp, Convert.ToInt32(moduleId), isMySettings);
                var jsonResult = Json(msgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetColorPreferenceSettings")]
        public JsonResult GetColorPreferenceSettings(string Input, string moduleId, bool isMySettings)
        {
            try
            {
                TypeValidation typeVal = new TypeValidation();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                //if (typeVal.checkWhiteList(selectedFieldName, 6) == false)
                //{
                //    throw new Exception();
                //}
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetColorPreferenceSettings(applnInp, Convert.ToInt32(moduleId), isMySettings);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                // objDefaultApiReturn = new CommonController().logError(objDefaultApiReturn);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckDeletePermisionForArchivedSearch")]
        public JsonResult CheckDeletePermisionForArchivedSearch(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int intReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.CheckDeletePermisionForArchivedSearch(applnInp);

                var jsonResult = Json(intReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCustomizeReportData")]
        public JsonResult GetCustomizeReportData(string Input, int ObjectCategoryId)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string ReportFields =  new CommonModel(BaseInput).CustomReportItem.GetCustomizeReportData(applicationFormInput, ObjectCategoryId);
                return Json(ReportFields, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDefaultCustomizeReportData")]
        public JsonResult GetDefaultCustomizeReportData(string Input, int ObjectCategoryId, bool IsDefault)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string ReportFields = new CommonModel(BaseInput).CustomReportItem.GetDefaultCustomizeReportData(applicationFormInput, ObjectCategoryId, IsDefault);
                return Json(ReportFields, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ApplySaveCustomizationReport")]
        public JsonResult ApplySaveCustomizationReport(string Input, string reportCategoryId, bool IsLandscape, bool IsSlNoReqd, bool IsDefault)
        {
            try
            {
                CustomReportInput customReportInput = new CustomReportInput();
                FileDataInput fileInp = new FileDataInput();
                customReportInput = JsonConvert.DeserializeObject<CustomReportInput>(Input);

                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).CustomReportItem.ApplySaveCustomizationReport(customReportInput, Convert.ToInt32(reportCategoryId), IsLandscape, IsSlNoReqd, IsDefault );
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckUserDefaultSettingsExists")]
        public JsonResult CheckUserDefaultSettingsExists(int ReportCategoryId)
        {
            try
            {
                MessageReturn objMessageReturn = new MessageReturn();
                int returnValue = new CommonModel(BaseInput).CustomReportItem.CheckUserDefaultSettingsExists(ReportCategoryId);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdateCalendarExceptions")]
        public JsonResult InsertUpdateCalendarExceptions(string Input, string CalendarInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                List<CalendarInput> lstCalendarInput = JsonConvert.DeserializeObject<List<CalendarInput>>(CalendarInput);
                MessageReturn objMessageReturn = new CommonModel(BaseInput).CalendarItem.InsertUpdateCalendarExceptions(applnInp, lstCalendarInput);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }

        }

        [ActionName("GetCustomRptQueryCondition")]
        public JsonResult GetCustomRptQueryCondition(string Input)
        {
            try
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                objDefaultApiReturn = new CommonModel(BaseInput).CustomReportItem.GetCustomRptQueryCondition(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("getSubscribedOptionalFields")]
        public JsonResult getSubscribedOptionalFields(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                bool intReturn = new CommonModel(BaseInput).ApplicationFormItem.Extented.getSubscribedOptionalFields(applnInp);
                var jsonResult = Json(intReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetCalendarExceptionsDays")]
        public JsonResult GetCalendarExceptionsDays(string Input, string StartDate, string EndDate)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new CommonModel(BaseInput).CalendarItem.GetCalendarExceptionsDays(applnInp, StartDate, EndDate);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateLogOutCount")]
        public JsonResult UpdateLogOutCount()
        {
            try
            {

                int Return = new CommonModel(BaseInput).UserItem.UpdateLogOutCount();
                var jsonResult = Json(Return, JsonRequestBehavior.AllowGet);
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
                DefaultApiReturn objDefaultApiReturn = new CommonModel(BaseInput).NumberFormatItem.GetNumberFormatItemDetails(applnInp, NumberFormatCategoryId, Target);
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
                List<NumberFormatInput> Inp1 = JsonConvert.DeserializeObject<List<NumberFormatInput>>(NumberFormatInput);
                MessageReturn messageReturn = new CommonModel(BaseInput).NumberFormatItem.InsertUpdateNumberFormat(applnInp, Inp1, NumberFormatCategoryId);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ViewDWGfile")]
        public JsonResult ViewDWGfile(string Input, string FileInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                FileDataInput fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
               
                string []path = new CommonModel(BaseInput).FileUploadItem.ViewDWGfileForSymbolLibrary(applnInp, fileDataInput);
                var jsonResult = Json(path, JsonRequestBehavior.AllowGet);
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
                messageReturn = new CommonModel(BaseInput).FieldSubscriptionSettings.UpdateFieldSubscriptionSettings(inp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        public JsonResult InsertSymbolLibrary(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).DrawingItem.InsertSymbolLibrary(applnInp);
                // //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetNumberFormatDetails")]
        public JsonResult GetNumberFormatDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new CommonModel(BaseInput).NumberFormatItem.GetNumberFormatDetails(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckNumberFormatInUse")]
        public JsonResult CheckNumberFormatInUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new CommonModel(BaseInput).NumberFormatItem.CheckNumberFormatInUse(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckDuplicateFieldValues")]
        public JsonResult CheckDuplicateFieldValues(string Input,int Category)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue;
                if (Category == 14)
                    returnValue = new CommonModel(BaseInput).NumberFormatItem.CheckDuplicateFieldValues(applnInp);
                else
                    returnValue = 0;
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ArrayBuildingImageDownloadFile")]
        public System.Net.Http.HttpResponseMessage ArrayBuildingImageDownloadFile(string Input, string Fileinput)
        {
            byte[] arrData = new byte[0];
            ApplicationFormInput inp = new ApplicationFormInput();
            FileDataInput fileInp = new FileDataInput();
            inp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            fileInp = JsonConvert.DeserializeObject<FileDataInput>(Fileinput);

            HttpResponse response = System.Web.HttpContext.Current.Response;
            response.Clear();
            response.ClearContent();
            response.ClearHeaders();
            response.Buffer = true;

            arrData = new CommonModel(BaseInput).FileDownloadItem.ArrayBuildingImageDownloadFile(inp, fileInp, response);
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            String file;
            if (arrData != null)
            {
                file = Convert.ToBase64String(arrData);
                // response.AddHeader("Content-Disposition", "attachment;filename=\"" + fileInp.FilePath + "\"");
                // response.ContentType = "image/jpeg";
                response.Write(file);
                response.End();
                httpResponseMessage.Content = new StringContent(file);
                httpResponseMessage.Content.Headers.Add("x-filename", fileInp.FileName);
                httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                // httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
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
        [ActionName("GetXBIMFiles")]
        public JsonResult GetXBIMFiles()
        {
            try
            {
                // ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                // DefaultApiReturn objDefaultApiReturn = new CommonModel(BaseInput).NumberFormatItem.GetNumberFormatItemDetails(applnInp, NumberFormatCategoryId, Target);
                String path = "D:\\IISRoot\\TFSScrum\\WexBimViewer\\WexBimViewer\\models"; // System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath + "models";
                DirectoryInfo di = new DirectoryInfo(path);
                // FileInfo[] fis = di.GetFiles("*.xbim");

                string[] extensions = { ".wexbim" };

                string[] fis = Directory.GetFiles(path, "*.*")
                    .Where(f => extensions.Contains(new FileInfo(f).Extension.ToLower())).ToArray();
                string[] fis1 = new string[fis.Length];
                int incr = 0;
                foreach (string fi in fis)
                {
                    fis1[incr] = Path.GetFileName(fi);
                    incr++;
                }

                var jsonResult = Json(fis1, JsonRequestBehavior.AllowGet);
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
using ClosedXML.Excel;
using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Models;
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
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using static Indus.iDrawings.Employees.Entity.EmpStackplan;

namespace Indus.iDrawings.vN.Controllers
{
    public class EmployeeController : iDrawingsController
    {        
       //************* Stack plan
        private Dictionary<int, string> objRandomColorDict = new Dictionary<int, string>();
        string strToolTip = "";
        string strSavedToolTip = "";
        string strFromSavedToOriginal = "";
        //********************
        public EmployeeController()
        {
            
        }

        [ActionName("GetEmployeeList")]
        public JsonResult GetEmployeeList(string Input, string DrawingId, string DrawingIds, string AssignmentStatus)
        {
            try
            {
                bool blnReturn = true;
                TypeValidation typeVal = new TypeValidation();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
              
                if (!typeVal.checkWhiteList(applnInp.SortColumn.Replace("["," ").Replace("]", " "), 6))
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();

                if (applnInp.Filter != null)
                {
                   if(!typeVal.checkWhiteList(applnInp.Filter, 15))   
                    throw new Exception();
                }
                if (!string.IsNullOrEmpty(DrawingIds))
                {
                    if (!typeVal.checkWhiteListSelectedIds(DrawingIds, 5, ","))
                        throw new Exception();

                }
                BaseClassInput baseClassInput = BaseInput;
                if (applnInp.IsExport == 1)
                {
                    baseClassInput.RowsPerPage = 0;
                }
                objDefaultApiReturn = new EmployeeModel(baseClassInput).EmployeeEntityContext.GetEmployeeList(applnInp, Convert.ToInt32(DrawingId), DrawingIds, Convert.ToInt32(AssignmentStatus));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                //return Json(jsonResult, JsonRequestBehavior.AllowGet);
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetEmployeeListExport")]
        public JsonResult GetEmployeeListExport(string Input, string DrawingId, string DrawingIds, string AssignmentStatus,string fileName, string[] fields = null)
        {
            try
            {
                bool blnReturn = true;
                TypeValidation typeVal = new TypeValidation();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);

                if (!typeVal.checkWhiteList(applnInp.SortColumn.Replace("[", " ").Replace("]", " "), 6))
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();

                if (applnInp.Filter != null)
                {
                    if (!typeVal.checkWhiteList(applnInp.Filter, 15))
                        throw new Exception();
                }
                if (!string.IsNullOrEmpty(DrawingIds))
                {
                    if (!typeVal.checkWhiteListSelectedIds(DrawingIds, 5, ","))
                        throw new Exception();

                }
                BaseClassInput baseClassInput = BaseInput;
               // if (applnInp.IsExport == 1)
               // {
                    baseClassInput.RowsPerPage = 0;
               // }
                objDefaultApiReturn = new EmployeeModel(baseClassInput).EmployeeEntityContext.GetEmployeeList(applnInp, Convert.ToInt32(DrawingId), DrawingIds, Convert.ToInt32(AssignmentStatus));
                return new CommonController().ExportToExcel(objDefaultApiReturn.FieldBinderData, fileName, fields, baseClassInput);
                //objDefaultApiReturn = new CommonController().logError(objDefaultApiReturn);
                //var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                //jsonResult.MaxJsonLength = int.MaxValue;
                //return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        //public HttpResponseMessage ExportToExcel(string Input, string fileName, string[] fields = null)//,string selection=null, string dataKey=null)
        //{

        //    byte[] arrData;
        //    fileName = fileName + ".xlsx";
        //    try
        //    {
        //        BaseClassInput baseClassInput = BaseInput;
        //        //  throw new Exception();
        //        System.Data.DataTable dataTable = (System.Data.DataTable)JsonConvert.DeserializeObject(Input, (typeof(System.Data.DataTable)));
        //        DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
        //        string folderPath = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetCustomerFolderName();
        //        DataView dataView = dataTable.DefaultView;
        //        GridView gridView = new GridView();
        //        HttpContext context = System.Web.HttpContext.Current;
        //        HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
        //        if (dataTable.Rows.Count > 0)
        //        {
        //            fields = fields ?? new string[0];
        //            string[] columnNames = (from dc in dataTable.Columns.Cast<DataColumn>()
        //                                    select dc.ColumnName).ToArray();
        //            for (int i = 0; i < columnNames.Length; i++)//Dsiplay settings
        //            {
        //                var isExists = fields.Contains(columnNames[i].ToString());
        //                if (!isExists)
        //                {
        //                    dataTable.Columns.Remove(columnNames[i].ToString());
        //                }
        //                dataTable.TableName = "Export";
        //            }

        //            dataTable.TableName = "Export";
        //            // var temp = Path.GetTempPath(); // Get %TEMP% path
        //            // var file = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()); // Get random file name without extension

        //            var path = Path.Combine(folderPath, "ExportFiles\\Temp\\" + BaseInput.UserId);//+"\"" + fileName;
        //                                                                                          // @"D:\\" + fileName;
        //            if (!Directory.Exists(path))
        //            {

        //                Directory.CreateDirectory(path);
        //            }

        //            using (XLWorkbook wb = new XLWorkbook())
        //            {
        //                wb.Worksheets.Add(dataTable);
        //                //   wb.SaveAs(fileName);
        //                using (MemoryStream ms = new MemoryStream())
        //                {
        //                    wb.SaveAs(ms);
        //                    string filepath = path + "\\" + fileName;
        //                    using (var fs = new FileStream(filepath, FileMode.Create, FileAccess.Write))
        //                    {
        //                        // Write content of your memory stream into file stream
        //                        ms.WriteTo(fs);
        //                    }

        //                    context.Response.Clear();
        //                    context.Response.ClearContent();
        //                    context.Response.ClearHeaders();
        //                    context.Response.Buffer = true;

        //                    WebClient req = new WebClient();
        //                    arrData = req.DownloadData(filepath);
        //                    if (System.IO.File.Exists(filepath))
        //                        System.IO.File.Delete(filepath);

        //                    String file;
        //                    if (arrData != null)
        //                    {
        //                        file = Convert.ToBase64String(arrData);
        //                        context.Response.Write(file);
        //                        context.Response.End();
        //                        httpResponseMessage.Content = new StringContent(file);
        //                        httpResponseMessage.Content.Headers.Add("x-filename", fileName);
        //                        httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        //                        httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
        //                        httpResponseMessage.Content.Headers.ContentDisposition.FileName = fileName;
        //                        httpResponseMessage.StatusCode = HttpStatusCode.OK;
        //                    }
        //                    else
        //                    {
        //                        file = "Data is Null";
        //                        context.Response.Write(file);
        //                        context.Response.End();
        //                        httpResponseMessage.Content = new StringContent(file);

        //                    }


        //                }
        //            }

        //        }
        //        else
        //        {
        //            String file;
        //            file = "Data is Null";
        //            context.Response.Write(file);
        //            context.Response.End();
        //            httpResponseMessage.Content = new StringContent(file);
        //        }
        //        return httpResponseMessage;
        //    }

        //    catch (Exception ex)
        //    {
        //        return new CommonController().HTTPResponseErrorMessage(ex.ToString());
        //    }
        //}

        [ActionName("GetDrawingsWithData")]
        public JsonResult GetDrawingsWithData(string Input, int ModuleId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                TypeValidation typeVal = new TypeValidation();
                bool blnReturn = typeVal.checkWhiteList(ModuleId.ToString(), 5);
                if (blnReturn == false)
                    throw new Exception();

                objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetDrawingsWithData(applnInp, ModuleId);
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

        [ActionName("GetDrawingsWithDataForFloorSelection")]
        public JsonResult GetDrawingsWithDataForFloorSelection(string Input, int ModuleId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                TypeValidation typeVal = new TypeValidation();
                bool blnReturn = typeVal.checkWhiteList(ModuleId.ToString(), 5);
                if (blnReturn == false)
                    throw new Exception();
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetDrawingsWithDataForFloorSelection(applnInp, ModuleId);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        //[ActionName("CheckMoveProjectExists")]
        //public JsonResult CheckMoveProjectExists(string input)
        //{
        //    ApplicationFormInput applicationFormInput = new ApplicationFormInput();
        //    applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
        //    bool returnValue = new EmployeeModel(baseInp).EmployeeEntityContext.CheckMoveProjectExists(applicationFormInput);
        //    var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
        //    jsonResult.MaxJsonLength = int.MaxValue;
        //    return Json(jsonResult, JsonRequestBehavior.AllowGet);
        //}

        [ActionName("GetAllSpacePlanningProject")]
        public JsonResult GetAllSpacePlanningProject(string Input)
        {
            try { ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetAllSpacePlanningProject(applnInp);
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

        [ActionName("GetAllSpacePlanningProjectWithoutStackplan")]
        public JsonResult GetAllSpacePlanningProjectWithoutStackplan(string Input)
        {
         try {   ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetAllSpacePlanningProjectWithoutStackplan(applnInp);
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

        [ActionName("GetEmployeeNames")]
        public JsonResult GetEmployeeNames(string Input)
        {
          try {  ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetEmployeeNames(applnInp);
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

        [ActionName("GetStackPlanCountforaProject")]
        public JsonResult GetStackPlanCountforaProject(string Input)
        {
          try {  ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetStackPlanCountforaProject(applnInp);
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


        [ActionName("UpateMoveProjectStatus")]
        public JsonResult UpateMoveProjectStatus(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.UpateMoveProjectStatus(applicationFormInput);
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
        [ActionName("InsertMoveProjects")]
        public JsonResult InsertMoveProjects(string applnInput)
        {
          try {  ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            FileDataInput fileDataInput = new FileDataInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
            MessageReturn messageReturn = new MessageReturn();
            messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.InsertMoveProjects(applicationFormInput);
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

        [ActionName("ExecuteSpacePlanningMoveProject")]
        public JsonResult ExecuteSpacePlanningMoveProject(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).SpacePlanningItem.ExecuteSpacePlanningMoveProject(applicationFormInput);
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

        [ActionName("SaveMoveProjectExecutionDetails")]
        public JsonResult SaveMoveProjectExecutionDetails(string applnInput, int PageTarget) // PageTarget 1: Insert Move Project Execution, 2:Review Move Project Execution
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).SpacePlanningItem.SaveMoveProjectExecutionDetails(applicationFormInput, PageTarget);
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

        [ActionName("GetMoveProjectExecutionTasks")]
        public JsonResult GetMoveProjectExecutionTasks(string Input, int Target) //Target 1: Move Project Execution Tasks List, 2: Move Project Execution Employee List in Review 
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new EmployeeModel(BaseInput).SpacePlanningItem.GetMoveProjectExecutionTasks(applnInp, Target);
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

        [ActionName("GetMoveProjectExecutionSearch")]
        public JsonResult GetMoveProjectExecutionSearch(string Input, int Target) //Target 1: spEMP_GetKeywordSearchForMoveProjectExecutionTasks, 2: spEMP_GetMoveProjectExecutionTasksSearchResults
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new EmployeeModel(BaseInput).SpacePlanningItem.GetMoveProjectExecutionSearch(applnInp, Target);
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

        //[ActionName("InsertMoveProjectAddlDataFieldValues")]
        //public JsonResult InsertMoveProjectAddlDataFieldValues(string applnInput)
        //{
        //    ApplicationFormInput applicationFormInput = new ApplicationFormInput();
        //    FileDataInput fileDataInput = new FileDataInput();
        //    applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
        //    MessageReturn messageReturn = new MessageReturn();
        //    messageReturn = new EmployeeModel(baseInp).EmployeeEntityContext.InsertMoveProjectAddlDataFieldValues(applicationFormInput);
        //    var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
        //    jsonResult.MaxJsonLength = int.MaxValue;

        //    return Json(jsonResult, JsonRequestBehavior.AllowGet);
        //}

        [ActionName("UpdateMoveProjects")]
        public JsonResult UpdateMoveProjects(string applnInput)
        {
         try {   ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            FileDataInput fileDataInput = new FileDataInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
            MessageReturn messageReturn = new MessageReturn();
            messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.UpdateMoveProjects(applicationFormInput);
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

        [ActionName("GetStackPlanList")]
        public JsonResult GetStackPlanList(string Input)
        {
          try {  ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetStackPlanList(applnInp);
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

        [ActionName("DeleteStackPlan")]
        public JsonResult DeleteStackPlan(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                if (new CommonController().CheckValidInputData(applicationFormInput) == false)
                {
                    throw new Exception();
                }
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.DeleteStackPlan(applicationFormInput);
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
        [ActionName("CheckMoveProjectRequestReviewPermission")]
        public JsonResult CheckMoveProjectRequestReviewPermission(string input)
        {
           try { ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
            bool returnValue = new EmployeeModel(BaseInput).EmployeeEntityContext.CheckMoveProjectRequestReviewPermission(applicationFormInput);
            var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckEmployeeStackOccupancyDetailsSaved")]
        public JsonResult CheckEmployeeStackOccupancyDetailsSaved(string input)
        {
          try {  ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
            bool returnValue = new EmployeeModel(BaseInput).SpacePlanningItem.CheckEmployeeStackOccupancyDetailsSaved(applicationFormInput);
            var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        /* [ActionName("CheckWhetherStackPlanIsProposed")]
         public JsonResult CheckWhetherStackPlanIsProposed(string input)
         {
             ApplicationFormInput applicationFormInput = new ApplicationFormInput();
             applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
             bool returnValue = new EmployeeModel(BaseInput).EmployeeEntityContext.CheckWhetherStackPlanIsProposed(applicationFormInput);
             var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
             jsonResult.MaxJsonLength = int.MaxValue;
             return Json(jsonResult, JsonRequestBehavior.AllowGet);
         }*/

        [ActionName("ValidateStackPlanOrgUnitMoves")]
        public JsonResult ValidateStackPlanOrgUnitMoves(string Input)
        {
          try {  ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.ValidateStackPlanOrgUnitMoves(applnInp);
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

        [ActionName("GetGrades")]
        public JsonResult GetGrades(string Input)
        {
           try { ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetGrades(applnInp);
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

        [ActionName("InsertStackPlan")]
        public JsonResult InsertStackPlan(string applnInput)
        {
           try { ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            FileDataInput fileDataInput = new FileDataInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
            MessageReturn messageReturn = new MessageReturn();
            messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.InsertStackPlan(applicationFormInput);
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

        [ActionName("GetOrganizationalUnitListSelected")]
        public JsonResult GetOrganizationalUnitListSelected(string applnInput)
        {
            try { ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            FileDataInput fileDataInput = new FileDataInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
            MessageReturn messageReturn = new MessageReturn();
            messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetOrganizationalUnitListSelected(applicationFormInput);
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

        [ActionName("InsertSpaceAllotmentDetails")]
        public JsonResult InsertSpaceAllotmentDetails(string applnInput)
        {
        try {    ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            FileDataInput fileDataInput = new FileDataInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
            MessageReturn messageReturn = new MessageReturn();
            messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.InsertSpaceAllotmentDetails(applicationFormInput);
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

        [ActionName("InsertMultipleSpaceAllotmentDetails")]
        public JsonResult InsertMultipleSpaceAllotmentDetails(string Input)
        {
            try
            {
                List<EmployeeMoveRequestDataInput> employeeMoveRequestDataInput = JsonConvert.DeserializeObject<List<EmployeeMoveRequestDataInput>>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.InsertMultipleSpaceAllotmentDetails(employeeMoveRequestDataInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpacePlanningApprovalRequest")]
        public JsonResult GetSpacePlanningApprovalRequest(string Input)
        {
           try { ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetSpacePlanningApprovalRequest(applnInp);
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

        [ActionName("GetApprovedStackPlanforaProject")]
        public JsonResult GetApprovedStackPlanforaProject(string applnInput)
        {
          try {  ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            FileDataInput fileDataInput = new FileDataInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).SpacePlanningItem.GetApprovedStackPlanforaProject(applicationFormInput);
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

        [ActionName("GetEmployeeSpacePlanningStackOccupancyDetails")]
        public JsonResult GetEmployeeSpacePlanningStackOccupancyDetails(string Input)
        {
            try { ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
            multipleTablesReturn = new EmployeeModel(BaseInput).SpacePlanningItem.GetEmployeeSpacePlanningStackOccupancyDetails(applnInp);
            //multipleTablesReturn = new CommonController().logError((multipleTablesReturn));
            //var divHtml = GenerateDynamicTableforView(multipleTablesReturn);

            //Random rnd = new Random();
            //returnTable.objColor = Color.FromArgb(255, rnd.Next(0, 255), rnd.Next(0, 255), rnd.Next(0, 255));
            //var jsonResult = Json(divHtml, JsonRequestBehavior.AllowGet);
            var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("getRandomColorsforStack")]
        public JsonResult getRandomColorsforStack(int departmentId)
        {
          try {  Random rnd = new Random();
            string strColor = "";
            Color objColor = Color.FromArgb(255, rnd.Next(0, 255), rnd.Next(0, 255), rnd.Next(0, 255));
            char[] s = objColor.Name.ToCharArray();
            for (var i = 0; i < 6; i++)
            {
                 strColor += s[i];
            }
            if (objRandomColorDict.ContainsKey(departmentId)) {
                strColor = objRandomColorDict[departmentId];
            }
            else {
                objRandomColorDict[departmentId] = strColor;
            }

            return Json(strColor, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEmployeeStackOccupancyDetails")]
        public JsonResult GetEmployeeStackOccupancyDetails(string Input)
        {
           try { ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetEmployeeStackOccupancyDetails(applnInp);
            //objDefaultApiReturn = new CommonController().logError(objDefaultApiReturn);
            var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
     


        [ActionName("GetAllMoveProjects")]
        public JsonResult GetAllMoveProjects(string Input)
        {
          try {  ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetAllMoveProjects(applnInp);
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

        [ActionName("GetAllMoveProjectDetails")]
        public JsonResult GetAllMoveProjectDetails(string Input)
        {
            try { ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).SpacePlanningItem.GetAllMoveProjectDetails(applnInp);
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

        [ActionName("GetMoveProjectDetailBasedOnStatusId")]
        public JsonResult GetMoveProjectDetailBasedOnStatusId(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new EmployeeModel(BaseInput).SpacePlanningItem.GetMoveProjectDetailBasedOnStatusId(applnInp);
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

        [ActionName("ConvertApprovedStackPlanToScenario")]
        public JsonResult ConvertApprovedStackPlanToScenario(string applnInput)
        {
          try {  ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            FileDataInput fileDataInput = new FileDataInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
            MessageReturn messageReturn = new MessageReturn();
            messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.ConvertApprovedStackPlanToScenario(applicationFormInput);
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

        [ActionName("ConvertToMoveProject")]
        public JsonResult ConvertToMoveProject(string applnInput)
        {
          try {  ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            FileDataInput fileDataInput = new FileDataInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
            MessageReturn messageReturn = new MessageReturn();
            messageReturn = new EmployeeModel(BaseInput).SpacePlanningItem.ConvertToMoveProject(applicationFormInput);
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

        [ActionName("ConvertToMoveProjectFromScenario")]
        public JsonResult ConvertToMoveProjectFromScenario(string applnInput)
        {
          try {  ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            FileDataInput fileDataInput = new FileDataInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
            MessageReturn messageReturn = new MessageReturn();
            messageReturn = new EmployeeModel(BaseInput).SpacePlanningItem.ConvertToMoveProjectFromScenario(applicationFormInput);
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

        [ActionName("GetResourceTypeLookupValues")]
        public JsonResult GetResourceTypeLookupValues(string Input)
        {
           try { ResourceTypeInput resourceTypeInput = new ResourceTypeInput();
            resourceTypeInput = JsonConvert.DeserializeObject<ResourceTypeInput>(Input);
            resourceTypeInput.ClassListOption = 1;
            CustomApiReturn objCustomApiReturn = new CustomApiReturn();
            objCustomApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetResourceType(resourceTypeInput);
           // objCustomApiReturn = new CommonController().logError((objCustomApiReturn));
            var jsonResult = Json(objCustomApiReturn.LookupValues, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetResourceTypeWithFilterLookupValues")]
        public JsonResult GetResourceTypeWithFilterLookupValues(string Input)
        {
            try
            {
                ResourceTypeInput resourceTypeInput = new ResourceTypeInput();
                resourceTypeInput = JsonConvert.DeserializeObject<ResourceTypeInput>(Input);
           
                CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                objCustomApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetResourceTypeWithFilter(resourceTypeInput);
                // objCustomApiReturn = new CommonController().logError((objCustomApiReturn));
                var jsonResult = Json(objCustomApiReturn.LookupValues, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEmployeeResourceforAllocation")]
        public JsonResult GetEmployeeResourceforAllocation(string Input, int ObjectCategory, int DataOption, int AttributeOption, string ObjectClassIds,
            string DrawingIds, string SearchCondition, bool IsOrphan, int ObjectId, bool IsDataBasedOnUserAccess, int ObjectComponentType, int EmployeeId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetEmployeeResourceforAllocation(applnInp, ObjectCategory, DataOption,
                    AttributeOption, ObjectClassIds, DrawingIds, SearchCondition, IsOrphan, ObjectId, IsDataBasedOnUserAccess, ObjectComponentType, EmployeeId);
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
        [ActionName("GetObjectsAssignedToaSpace")]
        public JsonResult GetObjectsAssignedToaSpace(string Input, string ObjectCategory, string ObjectClassId, string EmployeeId)
        {
           try { ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetObjectsAssignedToaSpace(applnInp,Convert.ToInt32( ObjectCategory), Convert.ToInt32(ObjectClassId), Convert.ToInt32(EmployeeId));
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

        [ActionName("InsertEmployeeResources")]
        public JsonResult InsertEmployeeResources(string Input)
        {
          try {  ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            MessageReturn messageReturn = new MessageReturn();
            messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.InsertEmployeeResources(applnInp);
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

        [ActionName("GetAllSpacePlanConvertedProject")]
        public JsonResult GetAllSpacePlanConvertedProject(string Input)
        {
          try {  ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).SpacePlanningItem.GetAllSpacePlanConvertedProject(applnInp);
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

        [ActionName("InsertMoveProjectDetailsForStackPlan")]
        public JsonResult InsertMoveProjectDetailsForStackPlan(string Input, int MoveProjectId, int StackPlanId)
        {
          try {  ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            MessageReturn messageReturn = new MessageReturn();
            messageReturn = new EmployeeModel(BaseInput).SpacePlanningItem.InsertMoveProjectDetailsForStackPlan(applnInp, MoveProjectId, StackPlanId);
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

        [ActionName("DeleteEmployeeResources")]
        public JsonResult DeleteEmployeeResources(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
               
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.DeleteEmployeeResources(applnInp);
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

        [ActionName("ApproveStackPlan")]
        public JsonResult ApproveStackPlan(string applnInput)
        {
           try { ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            FileDataInput fileDataInput = new FileDataInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
            MessageReturn messageReturn = new MessageReturn();
            messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.ApproveStackPlan(applicationFormInput);
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


        [ActionName("ExecuteEmployeeMoves")]
        public JsonResult ExecuteEmployeeMoves(string applnInput)
        {
           try { ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            FileDataInput fileDataInput = new FileDataInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
            MessageReturn messageReturn = new MessageReturn();
            messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.ExecuteEmployeeMoves(applicationFormInput);
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

        [ActionName("SaveEmployeewithImage")]
        public JsonResult SaveEmployeewithImage(string applnInput, string FileInput)
        {
            try
            {
                ApplicationFormInput applnInp = new ApplicationFormInput();
                FileDataInput fileInp = new FileDataInput();
                applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                fileInp = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(fileInp.FileName))
                {
                    if (!typeVal.checkWhiteList(fileInp.FileName, 6))
                        throw new Exception();
                }
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).FileUploadItem.SaveEmployeewithImage(applnInp, fileInp);
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
        [ActionName("DeleteEmployeewithImage")]
        public JsonResult DeleteEmployeewithImage(string applnInput)
        {
            try
            {
                ApplicationFormInput applnInp = new ApplicationFormInput();
                applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).FileUploadItem.DeleteEmployeewithImage(applnInp);
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

        [ActionName("CheckEmployee")]
        public JsonResult CheckEmployee(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                if (new CommonController().CheckValidInputData(applicationFormInput) == false)
                {
                    throw new Exception();
                }
                int returnValue = new EmployeeModel(BaseInput).EmployeeEntityContext.CheckEmployee(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEmployeeSuperVisorCount")]
        public JsonResult GetEmployeeSuperVisorCount(string Input)
        {
           try { ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetEmployeeSuperVisorCount(applnInp);
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

        [ActionName("GetOrganizationalWiseEmployees")]
        public JsonResult GetOrganizationalWiseEmployees(string Input, int OrgUnitId, int FloorId, int MoveProjectID, int FromFloorId)
        {
         try {   ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetOrganizationalWiseEmployees(applnInp, OrgUnitId, FloorId, MoveProjectID, FromFloorId);
            var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("SaveStackPlanData")]
        public JsonResult SaveStackPlanData(string input,string Name, string Description, int MoveProjectId,string floorDetails , int StackPlanId, string AnticipatedSeats)
        {
          try {  Floor FloorDetails = SaveDetails(floorDetails);
          
            //string Name, string Description,Floor FloorDetails         
            ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            MessageReturn messageReturn = new MessageReturn();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
            messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.SaveStackPlanData(applicationFormInput, MoveProjectId, Name, Description, FloorDetails, StackPlanId, AnticipatedSeats);
            var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        //public JsonResult SaveStackPlanData(string input, int MoveProjectId, string Name, string Description, Floor FloorDetails, int StackPlanId, string AnticipatedSeats)
        //{
        //    ApplicationFormInput applicationFormInput = new ApplicationFormInput();
        //    applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
        //    int returnValue = new EmployeeModel(BaseInput).EmployeeEntityContext.SaveStackPlanData(applicationFormInput,  MoveProjectId,  Name,  Description,  FloorDetails,  StackPlanId,  AnticipatedSeats);
        //    var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
        //    jsonResult.MaxJsonLength = int.MaxValue;
        //    return Json(jsonResult, JsonRequestBehavior.AllowGet);
        //}


        private Floor SaveDetails(string s)
        {
            Floor str = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<Floor>(s);
            return str;
        }

        [ActionName("CheckWhetherEmpAssignedToOrgUnit")]
        public JsonResult CheckWhetherEmpAssignedToOrgUnit(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applicationFormInput) == false)
                {
                    throw new Exception();
                }
                string returnValue = new EmployeeModel(BaseInput).EmployeeEntityContext.CheckWhetherEmpAssignedToOrgUnit(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

      
        [ActionName("CheckEditPrivilageExist")]
        public JsonResult CheckEditPrivilageExist(string input)
        {
            ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            MessageReturn messageReturn = new MessageReturn();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
            messageReturn.ServerId = new EmployeeModel(BaseInput).EmployeeEntityContext.CheckEditPrivilageExist(applicationFormInput);
            var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
        }


        [ActionName("ApprovedStackPlanToScenario")]
        public JsonResult ApprovedStackPlanToScenario(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.ApprovedStackPlanToScenario(applicationFormInput);
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

        [ActionName("GetOrganizationStructures")]
        public JsonResult GetOrganizationStructures()
        {
            try
            {
                string ReturnVal = new EmployeeModel(BaseInput).EmployeeEntityContext.GetOrganizationStructures();
                var jsonResult = Json(ReturnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("CheckUserEditableOrgUnits")]
        public JsonResult CheckUserEditableOrgUnits(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.CheckUserEditableOrgUnits(applicationFormInput);
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

        [ActionName("CheckGradeInUse")]
        public JsonResult CheckGradeInUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new EmployeeModel(BaseInput).EmployeeEntityContext.CheckGradeInUse(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAllAssignedMoveProjectDetails")]
        public JsonResult GetAllAssignedMoveProjectDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetAllAssignedMoveProjectDetails(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetMoveProjectExecutionData")]
        public JsonResult GetMoveProjectExecutionData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MoveProjectExecutionReturn objApiReturn = new MoveProjectExecutionReturn();
                objApiReturn = new EmployeeModel(BaseInput).SpacePlanningItem.GetMoveProjectExecutionData(applnInp);
                var jsonResult = Json(objApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOrganizationalOccupancyforDashBoard")]
        public JsonResult GetOrganizationalOccupancyforDashBoard(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);                
                string strReturn = new EmployeeModel(BaseInput).EmployeeDashboardItem.GetOrganizationalOccupancyforDashBoard(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpaceStandardOccupancyforDashBoard")]
        public JsonResult GetSpaceStandardOccupancyforDashBoard(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new EmployeeModel(BaseInput).EmployeeDashboardItem.GetSpaceStandardOccupancyforDashBoard(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetBuildingOccupancyforDashBoard")]
        public JsonResult GetBuildingOccupancyforDashBoard(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new EmployeeModel(BaseInput).EmployeeDashboardItem.GetBuildingOccupancyforDashBoard(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateMultipleEmployeeData")]
        public JsonResult UpdateMultipleEmployeeData(string Input, int ReportField, string NewValue, int OrgUnitId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.UpdateMultipleEmployeeData(applnInp, ReportField, NewValue, OrgUnitId);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOrgUnitWiseSeatingCapacitiesforTrendAnalysis")]
        public JsonResult GetOrgUnitWiseSeatingCapacitiesforTrendAnalysis(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new EmployeeModel(BaseInput).EmployeeDashboardItem.GetOrgUnitWiseSeatingCapacitiesforTrendAnalysis(applnInp);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpaceStandardWiseSeatingCapacitiesforTrendAnalysis")]
        public JsonResult GetSpaceStandardWiseSeatingCapacitiesforTrendAnalysis(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new EmployeeModel(BaseInput).EmployeeDashboardItem.GetSpaceStandardWiseSeatingCapacitiesforTrendAnalysis(applnInp);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetGradeWiseOccupancyforTrendAnalysis")]
        public JsonResult GetGradeWiseOccupancyforTrendAnalysis(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new EmployeeModel(BaseInput).EmployeeDashboardItem.GetGradeWiseOccupancyforTrendAnalysis(applnInp);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetRateOfHiringforTrendAnalysis")]
        public JsonResult GetRateOfHiringforTrendAnalysis(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new EmployeeModel(BaseInput).EmployeeDashboardItem.GetRateOfHiringforTrendAnalysis(applnInp);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEmployeeMoveAssignApprovalRequestData")]
        public JsonResult GetEmployeeMoveAssignApprovalRequestData(string Input, int Target)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MoveProjectExecutionReturn objApiReturn = new MoveProjectExecutionReturn();
                objApiReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetEmployeeMoveAssignApprovalRequestData(applnInp, Target);
                var jsonResult = Json(objApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CancelEmployeeMoveAssignRequest")]
        public JsonResult CancelEmployeeMoveAssignRequest(string Input, int EmployeeMoveId, string EmployeeMoveNo, int EmployeeId, int Target)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.CancelEmployeeMoveAssignRequest(applnInp, EmployeeMoveId, EmployeeMoveNo, EmployeeId, Target);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpaceSearch")]
        public JsonResult GetSpaceSearch(string Input, int DrawingId, string Query, string chrCOLSeparator, string chrROWSeparator, bool IsVacant, bool IsUnderOccupied, bool IsOverOccupied, bool IsNominalOccupied)
        {
                try
                {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetSpaceSearch(applnInp, DrawingId, Query, chrCOLSeparator, chrROWSeparator, IsVacant, IsUnderOccupied, IsOverOccupied, IsNominalOccupied);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        //[ActionName("GetSpaceSearchResults")]
        //public JsonResult GetSpaceSearchResults(string Input, int DrawingId, string Query, string chrCOLSeparator, string chrROWSeparator, bool IsVacant, bool IsUnderOccupied, bool IsOverOccupied, bool IsNominalOccupied)
        //{
        //    try
        //    {
        //        ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
        //        DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
        //        objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.GetSpaceSearchResults(applnInp, DrawingId, Query, chrCOLSeparator, chrROWSeparator, IsVacant, IsUnderOccupied, IsOverOccupied, IsNominalOccupied);
        //        //objDefaultApiReturn = new CommonController().logError(objDefaultApiReturn);
        //        var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
        //        jsonResult.MaxJsonLength = int.MaxValue;
        //        return Json(jsonResult, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        return new CommonController().ErrorMessage(ex.ToString());
        //    }
        //}

        [ActionName("GetAllEmployeeDetailsAnalytics")]
        public JsonResult GetAllEmployeeDetailsAnalytics(string Input, int DrawingId, string DrawingIds, int AssignmentStatus, int ModuleId, int AnalyticsType, string ColumnName)
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
                    string strReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.GetAllEmployeeDetailsAnalytics(applnInp, DrawingId, DrawingIds, AssignmentStatus, ModuleId, AnalyticsType, ColumnName);
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


        [ActionName("DeleteEmployeeMoveDetails")]
        public JsonResult DeleteEmployeeMoveDetails(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.DeleteEmployeeMoveDetails(applicationFormInput);
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


        [ActionName("DeleteEmployeeMoveResourceDetails")]
        public JsonResult DeleteEmployeeMoveResourceDetails(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.DeleteEmployeeMoveResourceDetails(applicationFormInput);
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

        [ActionName("CreateEmployeeToWorkOrderUser")]
        public JsonResult CreateEmployeeToWorkOrderUser(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new EmployeeModel(BaseInput).EmployeeEntityContext.CreateEmployeeToWorkOrderUser(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("CheckSpaceEmployeeOccupancy")]
        public JsonResult CheckSpaceEmployeeOccupancy(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new EmployeeModel(BaseInput).EmployeeDrawingItem.CheckSpaceEmployeeOccupancy(applnInp);
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
    }
}
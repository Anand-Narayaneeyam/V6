using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Models;
using Indus.iDrawings.Space.Models;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Utils.Security.Validation;
using Indus.iDrawings.Web;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Mvc;

namespace Indus.iDrawings.vN.Controllers
{
    public class LogbookController : iDrawingsController
    {
        public LogbookController()
        {

        }

        [ActionName("GetLogUsers")]
        public JsonResult GetLogUsers(string LogParameters)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(LogParameters);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).LogBookItem.GetLogUsers(applnInp);
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

        [ActionName("GetLogEntities")]
        public JsonResult GetLogEntities(string LogParameters, string LogUserIds)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(LogParameters);
                ApplicationFormInput applnInp1 = JsonConvert.DeserializeObject<ApplicationFormInput>(LogUserIds);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).LogBookItem.GetLogEntities(applnInp, applnInp1);
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

        [ActionName("GetLogEvents")]
        public JsonResult GetLogEvents(string LogParameters, string LogUserIds, string LogEntityIds)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(LogParameters);
                ApplicationFormInput applnInp1 = JsonConvert.DeserializeObject<ApplicationFormInput>(LogUserIds);
                ApplicationFormInput applnInp2 = JsonConvert.DeserializeObject<ApplicationFormInput>(LogEntityIds);

                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).LogBookItem.GetLogEvents(applnInp, applnInp1, applnInp2);
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

        [ActionName("GetLogs")]
        public JsonResult GetLogs(string LogParameters, string LogUserIds, string LogEntityIds, string LogEventIds)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(LogParameters);
                ApplicationFormInput applnInp1 = JsonConvert.DeserializeObject<ApplicationFormInput>(LogUserIds);
                ApplicationFormInput applnInp2 = JsonConvert.DeserializeObject<ApplicationFormInput>(LogEntityIds);
                ApplicationFormInput applnInp3 = JsonConvert.DeserializeObject<ApplicationFormInput>(LogEventIds);

                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).LogBookItem.GetLogs(applnInp, applnInp1, applnInp2, applnInp3);
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

        [ActionName("GetLogsByConditions")]
        public JsonResult GetLogsByConditions(string logParameterInput, string logUserInput, string logEntityInput, string logActivityInput, string gridInput)
        {
            try
            {
                ApplicationFormInput LogParameterInput = JsonConvert.DeserializeObject<ApplicationFormInput>(logParameterInput);
                ApplicationFormInput LogUserInput = JsonConvert.DeserializeObject<ApplicationFormInput>(logUserInput);
                ApplicationFormInput LogEntityInput = JsonConvert.DeserializeObject<ApplicationFormInput>(logEntityInput);
                ApplicationFormInput LogActivityInput = JsonConvert.DeserializeObject<ApplicationFormInput>(logActivityInput);
                ApplicationFormInput GridInput = JsonConvert.DeserializeObject<ApplicationFormInput>(gridInput);

                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).LogBookItem.GetLogsByConditions(LogParameterInput, LogUserInput, LogEntityInput, LogActivityInput, GridInput);
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

        [ActionName("GetAllLogs")]
        public JsonResult GetAllLogs(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).LogBookItem.GetAllLogs(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetLogDetailsExport")]

        public HttpResponseMessage GetLogDetailsExport(int Target, string fileName, string[] fields = null, string Input = null, string LogParameters = null, string LogUserIds = null, string LogEntityIds = null, string LogEventIds = null)
        {
            try
            {
                ApplicationFormInput applnInp = new ApplicationFormInput();
                ApplicationFormInput applnInp1 = new ApplicationFormInput();
                ApplicationFormInput applnInp2 = new ApplicationFormInput();
                ApplicationFormInput applnInp3 = new ApplicationFormInput();
                ApplicationFormInput applnInp4 = new ApplicationFormInput();
                if (Input != null)
                    applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (LogParameters != null)
                    applnInp1 = JsonConvert.DeserializeObject<ApplicationFormInput>(LogParameters);
                if (LogUserIds != null)
                    applnInp2 = JsonConvert.DeserializeObject<ApplicationFormInput>(LogUserIds);
                if (LogEntityIds != null)
                    applnInp3 = JsonConvert.DeserializeObject<ApplicationFormInput>(LogEntityIds);
                if (LogEventIds != null)
                    applnInp4 = JsonConvert.DeserializeObject<ApplicationFormInput>(LogEventIds);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                BaseClassInput baseClassInput = BaseInput;
                if (applnInp.IsExport == 1 || applnInp4.IsExport == 1)
                {
                    baseClassInput.RowsPerPage = 0;
                }
                if (Target == 1)
                {
                    objDefaultApiReturn = new CommonModel(baseClassInput).LogBookItem.GetAllLogs(applnInp);
                }
                else
                {
                    objDefaultApiReturn = new CommonModel(baseClassInput).LogBookItem.GetLogs(applnInp1, applnInp2, applnInp3, applnInp4);
                }
                List<string> dateFields = new List<string>();
                if (fields != null)
                {
                    DefaultApiReturn objDefaultApiReturn1 = new DefaultApiReturn();
                    objDefaultApiReturn1 = new CommonModel(BaseInput).ApplicationFormItem.Extented.GetFieldBinderAddContent(applnInp);
                    //objDefaultApiReturn = logError(objDefaultApiReturn);
                    var jsonResult = Json(objDefaultApiReturn1.FieldBinderList, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;

                    dynamic fieldObj = jsonResult;
                    dynamic columnFields = fieldObj.Data;

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
                return new CommonController().ExportToExcel(objDefaultApiReturn.FieldBinderData, fileName, fields, baseClassInput, dateFields);
            }
            catch (Exception ex)
            {
                return new CommonController().HTTPResponseErrorMessage(ex.ToString());
            }
        }
    }
}
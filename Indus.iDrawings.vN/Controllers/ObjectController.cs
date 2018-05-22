using Indus.iDrawings.Common.Entity;
using System.Collections.ObjectModel;
using Indus.iDrawings.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Indus.iDrawings.Objects.Models;
using Indus.iDrawings.Web;
using Indus.iDrawings.Utils.Security.Validation;
using System.Net.Http;
using System.IO;
using ClosedXML.Excel;
using System.Net;
using System.Net.Http.Headers;
using Indus.iDrawings.Common.Models;
using System.Data;
using System.Web.UI.WebControls;

namespace Indus.iDrawings.vN.Controllers
{
    public class ObjectController : iDrawingsController
    {
        public ObjectController()
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
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetFieldBinderAddContent(applnInp);
                //objDefaultApiReturn = new CommonController().logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn.FieldBinderList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

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
                    objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetFieldBinderListContent(applnInp);
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
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        // For Edit page Field generation
        [ActionName("GetEditAppFormFields")]
        public JsonResult GetEditAppFormFields(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetFieldBinderEditContent(applnInp);
                //objDefaultApiReturn = new CommonController().logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn.FieldBinderList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
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
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.InsertFieldBinderData(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
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
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.UpdateFieldBinderData(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        // For AdvancedSerach Lookup values   
        [ActionName("GetAdvancedSerachLookups")]
        public JsonResult GetAdvancedSerachLookups(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetFieldBinderAdvacnedSearchContent(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                var jsonData = Json(jsonResult, JsonRequestBehavior.AllowGet);
                jsonData.MaxJsonLength = int.MaxValue;
                return jsonData;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectsDetails")]
        public JsonResult GetObjectsDetails(string Input, string ObjectCategory, string DataOption, string AttributeOption, string ObjectClassIds,
            string DrawingIds, string SearchCondition, string IsOrphan, string ObjectId, string IsDataBasedOnUserAccess, string ObjectComponentType,string IsBuildingDrawing)
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
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetObjectsDetails(applnInp, Convert.ToInt32(ObjectCategory), Convert.ToInt32(DataOption),
                     Convert.ToInt32(AttributeOption), ObjectClassIds, DrawingIds, SearchCondition, Convert.ToBoolean(IsOrphan), Convert.ToInt32(ObjectId),
                      Convert.ToBoolean(IsDataBasedOnUserAccess), Convert.ToInt32(ObjectComponentType),Convert.ToBoolean(IsBuildingDrawing));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }



        [ActionName("GetBuildingObjects")]
        public JsonResult GetBuildingObjects(string Input, string ObjectCategory, string DataOption, string AttributeOption, string ObjectClassIds, string DrawingIds,
            string SearchCondition, string IsOrphan, string ObjectId, string IsDataBasedOnUserAccess, string ObjectComponentType,string IsBuildingDrawing)
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
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetBuildingObjects(applnInp, Convert.ToInt32(ObjectCategory),
                    Convert.ToInt32(DataOption), Convert.ToInt32(AttributeOption), ObjectClassIds, DrawingIds, SearchCondition,
                    Convert.ToBoolean(IsOrphan), Convert.ToInt32(ObjectId), Convert.ToBoolean(IsDataBasedOnUserAccess), Convert.ToInt32(ObjectComponentType),Convert.ToBoolean(IsBuildingDrawing));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
                // return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectClasses")]
        public JsonResult GetObjectClasses(string Input, string ObjectCategoryId, string DrawingIds, string DataOption, string ClassListOption, string ObjectComponentCategory)
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
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectClassesItem.GetObjectClasses(applnInp, Convert.ToInt32(ObjectCategoryId), DrawingIds,
                    Convert.ToInt32(DataOption), Convert.ToInt32(ClassListOption), Convert.ToInt32(ObjectComponentCategory));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetBuildingObjectClasses")]
        public JsonResult GetBuildingObjectClasses(string Input, string ObjectCategoryId, string DrawingIds, string DataOption, string ClassListOption, string ObjectComponentCategory)
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
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectClassesItem.GetBuildingObjectClasses(applnInp, Convert.ToInt32(ObjectCategoryId),
                    DrawingIds, Convert.ToInt32(DataOption), Convert.ToInt32(ClassListOption), Convert.ToInt32(ObjectComponentCategory));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAttributes")]
        public JsonResult GetAttributes(string Input, string ObjectCategoryId, string ObjectClassId, string NeedCommonAttribute)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectClassesItem.GetAttributes(applnInp, Convert.ToInt32(ObjectCategoryId),
                    Convert.ToInt32(ObjectClassId), Convert.ToBoolean(NeedCommonAttribute));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectClassesLookup")]
        public JsonResult GetObjectClassesLookup(string Input, string ObjectCategoryId, string DrawingIds, string DataOption, string ClassListOption, string ObjectComponentCategory)
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
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetObjectClassesLookup(applnInp, Convert.ToInt32(ObjectCategoryId), DrawingIds,
                    Convert.ToInt32(DataOption), Convert.ToInt32(ClassListOption), Convert.ToInt32(ObjectComponentCategory));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectsSpaceDetails")]
        public JsonResult GetObjectsSpaceDetails(string Input, string ObjectCategory, string DataOption, string AttributeOption, string ObjectClassIds,
            string DrawingIds, string SearchCondition, string IsOrphan, string ObjectId, string IsDataBasedOnUserAccess, string ObjectComponentType,string IsBuildingDrawing)
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
                if (applnInp.IsExport == 1)
                {
                    baseClassInput.RowsPerPage = 0;
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(baseClassInput).ObjectItem.GetObjectsSpaceDetails(applnInp, Convert.ToInt32(ObjectCategory),
                    Convert.ToInt32(DataOption), Convert.ToInt32(AttributeOption), ObjectClassIds, DrawingIds, SearchCondition, Convert.ToBoolean(IsOrphan),
                    Convert.ToInt32(ObjectId), Convert.ToBoolean(IsDataBasedOnUserAccess), Convert.ToInt32(ObjectComponentType),Convert.ToBoolean(IsBuildingDrawing));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectsSpaceDetailsExport")]
        public HttpResponseMessage GetObjectsSpaceDetailsExport(string Input, string ObjectCategory, string DataOption, string AttributeOption, string ObjectClassIds,
          string DrawingIds, string SearchCondition, string IsOrphan, string ObjectId, string IsDataBasedOnUserAccess, string ObjectComponentType, string fileName, string[] fields = null)
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
                if (applnInp.IsExport == 1)
                {
                    baseClassInput.RowsPerPage = 0;
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(baseClassInput).ObjectItem.GetObjectsSpaceDetails(applnInp, Convert.ToInt32(ObjectCategory),
                    Convert.ToInt32(DataOption), Convert.ToInt32(AttributeOption), ObjectClassIds, DrawingIds, SearchCondition, Convert.ToBoolean(IsOrphan),
                    Convert.ToInt32(ObjectId), Convert.ToBoolean(IsDataBasedOnUserAccess), Convert.ToInt32(ObjectComponentType),false);
                //  return ExportToExcel(objDefaultApiReturn.FieldBinderData, fileName, fields);
                return new CommonController().ExportToExcel(objDefaultApiReturn.FieldBinderData, fileName, fields, baseClassInput);
            }
            catch (Exception ex)
            {
                return new CommonController().HTTPResponseErrorMessage(ex.ToString());
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

        //[ActionName("GetObjectsWithSpaceDetails")]
        //public JsonResult GetObjectsWithSpaceDetails(string Input, int ObjectCategory, int DataOption, int AttributeOption, string ObjectClassIds, 
        //    string DrawingIds, string SearchCondition, bool IsOrphan, int ObjectId, bool IsDataBasedOnUserAccess, int ObjectComponentType)
        //{
        //    try
        //    {
        //        ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
        //        DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
        //        objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetObjectsWithSpaceDetails(applnInp, ObjectCategory, DataOption, AttributeOption, ObjectClassIds, DrawingIds, SearchCondition, IsOrphan, ObjectId, IsDataBasedOnUserAccess, ObjectComponentType);
        //        var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
        //        jsonResult.MaxJsonLength = int.MaxValue;
        //        return Json(jsonResult, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        return new CommonController().ErrorMessage(ex.ToString());
        //    }
        //}

        [ActionName("GetObjectsSpaceDetailsForClassLookup")]
        public JsonResult GetObjectsSpaceDetailsForClassLookup(string Input, string ObjectCategory, string DataOption, string AttributeOption, string ObjectClassIds,
            string DrawingIds, string SearchCondition, string IsOrphan, string ObjectId, string IsDataBasedOnUserAccess, string ObjectComponentType,string IsBuildingDrawing)
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
                if (applnInp.IsExport == 1)
                {
                    baseClassInput.RowsPerPage = 0;
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(baseClassInput).ObjectItem.GetObjectsSpaceDetailsForClassLookup(applnInp, Convert.ToInt32(ObjectCategory),
                    Convert.ToInt32(DataOption), Convert.ToInt32(AttributeOption), ObjectClassIds, DrawingIds, SearchCondition, Convert.ToBoolean(IsOrphan),
                    Convert.ToInt32(ObjectId), Convert.ToBoolean(IsDataBasedOnUserAccess), Convert.ToInt32(ObjectComponentType),Convert.ToBoolean(IsBuildingDrawing));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult; //Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("InsertAttribute")]
        public JsonResult InsertAttribute(string Input, string Id, string ObjectCategoryId, string Name, string DataEntryTypeId, string IsValidated,
            string IsMandatory, string IsTotalizable, string MaxLength, string AddedBy, string ObjectClassId, string Selection, string NeedAlert,
            string AlertAdvancePeriod, string RepeatInterval, string AlertMessage, string NeedCommonAttribute)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.InsertAttribute(applnInp, Convert.ToInt32(Id), Convert.ToInt32(ObjectCategoryId), Name,
                    Convert.ToInt32(DataEntryTypeId), Convert.ToBoolean(IsValidated), Convert.ToBoolean(IsMandatory), Convert.ToBoolean(IsTotalizable),
                    Convert.ToInt32(MaxLength), Convert.ToInt32(AddedBy), Convert.ToInt32(ObjectClassId), Convert.ToInt32(Selection), Convert.ToBoolean(NeedAlert),
                    Convert.ToInt32(AlertAdvancePeriod), Convert.ToInt32(RepeatInterval), AlertMessage, Convert.ToBoolean(NeedCommonAttribute));
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeleteAttribute")]
        public JsonResult DeleteAttribute(string Input, string ObjectCategoryId, string ObjectClassId, string NeedCommonAttribute)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.DeleteAttribute(applnInp, Convert.ToInt32(ObjectCategoryId),
                    Convert.ToInt32(ObjectClassId), Convert.ToBoolean(NeedCommonAttribute));
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("FieldEditContent")]
        public JsonResult FieldEditContent(string Input, string ObjectCategoryId, string ObjectClassId, string NeedCommonAttribute)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.FieldEditContent(applnInp, Convert.ToInt32(ObjectCategoryId),
                    Convert.ToInt32(ObjectClassId), Convert.ToBoolean(NeedCommonAttribute));
                var jsonResult = Json(objDefaultApiReturn.FieldBinderList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        //[ActionName("GetAllClassAttributes")]
        //public JsonResult GetAllClassAttributes(string Input,int ObjectClassId,int SelectedClassId)
        //{
        //    try
        //    {
        //        ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
        //        DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
        //        objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetAllClassAttributes(applnInp, ObjectClassId, SelectedClassId);
        //        var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
        //        jsonResult.MaxJsonLength = int.MaxValue;
        //        return Json(jsonResult, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        return new CommonController().ErrorMessage(ex.ToString());
        //    }
        //}


        [ActionName("GetDisplaySettingsCategoryFields")]
        public JsonResult GetDisplaySettingsCategoryFields(string Input, string ObjectCategoryId, string IsSystemDefault)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetDisplaySettingsCategoryFields(applnInp, Convert.ToInt32(ObjectCategoryId), Convert.ToBoolean(IsSystemDefault));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetAllSymbolDetails")]
        public JsonResult GetAllSymbolDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetAllSymbolDetails(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("CustomUpdateFieldBinderData")]
        public JsonResult CustomUpdateFieldBinderData(string Input, string ObjectCategoryId, string ObjectClassId, string NeedCommonAttribute)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.CustomUpdateFieldBinderData(applnInp, Convert.ToInt32(ObjectCategoryId),
                    Convert.ToInt32(ObjectClassId), Convert.ToBoolean(NeedCommonAttribute));
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("EditObjectsWithSpaceDetails")]
        public JsonResult EditObjectsWithSpaceDetails(string Input, string ObjectCategory, string DataOption, string AttributeOption,
            string ObjectClassIds, string DrawingIds, string SearchCondition, int IsOrphan, string ObjectId, int IsDataBasedOnUserAccess, string ObjectComponentType, string IsBuildingDrawing)
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
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.EditObjectsWithSpaceDetails(applnInp, Convert.ToInt32(ObjectCategory),
                    Convert.ToInt32(DataOption), Convert.ToInt32(AttributeOption), ObjectClassIds, DrawingIds, SearchCondition, Convert.ToBoolean(IsOrphan),
                    Convert.ToInt32(ObjectId), Convert.ToBoolean(IsDataBasedOnUserAccess), Convert.ToInt32(ObjectComponentType),Convert.ToBoolean(IsBuildingDrawing));
                //objDefaultApiReturn = new CommonController().logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn.FieldBinderList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateObjectSpaceDetails")]
        public JsonResult UpdateObjectSpaceDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.UpdateObjectSpaceDetails(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertBuildingObjecDetails")]
        public JsonResult InsertBuildingObjecDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.InsertBuildingObjecDetails(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("UpdateObjectSpaceData")]
        public JsonResult UpdateObjectSpaceDetails(string Input, int ObjectCategory, int DataOption, int AttributeOption,
           string ObjectClassIds, string DrawingIds, string SearchCondition, bool IsOrphan, int ObjectId, bool IsDataBasedOnUserAccess, int ObjectComponentType,bool IsbuildingDrawing)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.UpdateObjectSpaceData(applnInp, ObjectCategory, DataOption, AttributeOption,
                 ObjectClassIds, DrawingIds, SearchCondition, IsOrphan, ObjectId, IsDataBasedOnUserAccess, ObjectComponentType, IsbuildingDrawing);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        // For Insert 
        [ActionName("InsertObject")]
        public JsonResult InsertObject(string Input, string ObjectCategory, string DataOption, string AttributeOption, string ObjectClassIds, string DrawingIds,
            string SearchCondition, int IsOrphan, string ObjectId, int IsDataBasedOnUserAccess, string ObjectComponentType,string IsBuildingDrawing)
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
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.InsertObject(applnInp, Convert.ToInt32(ObjectCategory), Convert.ToInt32(DataOption),
                     Convert.ToInt32(AttributeOption), ObjectClassIds, DrawingIds, SearchCondition, Convert.ToBoolean(IsOrphan), Convert.ToInt32(ObjectId),
                      Convert.ToBoolean(IsDataBasedOnUserAccess), Convert.ToInt32(ObjectComponentType),Convert.ToBoolean(IsBuildingDrawing));
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateObject")]
        public JsonResult UpdateObject(string Input, string ObjectCategory, string DataOption, string AttributeOption, string ObjectClassIds, string DrawingIds,
            string SearchCondition, int IsOrphan, string ObjectId, int IsDataBasedOnUserAccess, string ObjectComponentType,string IsBuildingDrawing)
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
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.UpdateObject(applnInp, Convert.ToInt32(ObjectCategory), Convert.ToInt32(DataOption),
                     Convert.ToInt32(AttributeOption), ObjectClassIds, DrawingIds, SearchCondition, Convert.ToBoolean(IsOrphan), Convert.ToInt32(ObjectId),
                      Convert.ToBoolean(IsDataBasedOnUserAccess), Convert.ToInt32(ObjectComponentType),Convert.ToBoolean(IsBuildingDrawing));
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetComponentCategoryObjectCategory")]
        public JsonResult GetComponentCategoryObjectCategory(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetComponentCategoryObjectCategory(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckAttributeIdIsInUse")]
        public JsonResult CheckAttributeIdIsInUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new ObjectModel(BaseInput).ObjectItem.CheckAttributeIdIsInUse(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckAttributeLookupValueInUse")]
        public JsonResult CheckAttributeLookupValueInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new ObjectModel(BaseInput).ObjectItem.CheckAttributeLookupValueInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAttributeldHaveLookUpValues")]
        public JsonResult GetAttributeldHaveLookUpValues(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new ObjectModel(BaseInput).ObjectItem.GetAttributeldHaveLookUpValues(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("CheckAttributeIdIsInUseForAssets")]
        public JsonResult CheckAttributeIdIsInUseForAssets(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new ObjectModel(BaseInput).ObjectItem.CheckAttributeIdIsInUseForAssets(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectClassInUse")]
        public JsonResult GetObjectClassInUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new ObjectModel(BaseInput).ObjectItem.GetObjectClassInUse(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckAssetExistsinOtherModules")]
        public JsonResult CheckAssetExistsinOtherModules(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new ObjectModel(BaseInput).ObjectItem.CheckAssetExistsinOtherModules(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectToolTip")]
        public JsonResult GetObjectToolTip(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectDrawingItem.GetObjectToolTip(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectToolTipForSelected")]
        public JsonResult GetObjectToolTipForSelected(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectDrawingItem.GetObjectToolTipForSelected(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectBarcodeExists")]
        public JsonResult GetObjectBarcodeExists(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new ObjectModel(BaseInput).ObjectItem.GetObjectBarcodeExists(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectClassPrefix")]
        public JsonResult GetObjectClassPrefix(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetObjectClassPrefix(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateMultipleObjectsDetails")]
        public JsonResult UpdateMultipleObjectsDetails(string Input, string ObjectIdWithSpaceIds, string ObjectIdWithXpositions, string ObjectIdWithYpositions)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.UpdateMultipleObjectsDetails(applnInp, ObjectIdWithSpaceIds, ObjectIdWithXpositions, ObjectIdWithYpositions);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateMultipleObjectData")]
        public JsonResult UpdateMultipleObjectData(string Input, int ReportField, string NewValue)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.UpdateMultipleObjectData(applnInp, ReportField, NewValue);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCustomerOrganizationalStructure")]
        public JsonResult GetCustomerOrganizationalStructure()
        {
            try
            {
                string strReturn = new ObjectModel(BaseInput).ObjectDashboardItem.GetCustomerOrganizationalStructure();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectClassListForChartDashboard")]
        public JsonResult GetObjectClassListForChartDashboard(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new ObjectModel(BaseInput).ObjectDashboardItem.GetObjectClassListForChartDashboard(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectDistByOrgUnitForDashboard")]
        public JsonResult GetObjectDistByOrgUnitForDashboard(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new ObjectModel(BaseInput).ObjectDashboardItem.GetObjectDistByOrgUnitForDashboard(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectClassListForDashboard")]
        public JsonResult GetObjectClassListForDashboard(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new ObjectModel(BaseInput).ObjectDashboardItem.GetObjectClassListForDashboard(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectClassListByFloorForDashboard")]
        public JsonResult GetObjectClassListByFloorForDashboard(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new ObjectModel(BaseInput).ObjectDashboardItem.GetObjectClassListByFloorForDashboard(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckAutoNumberingStatus")]
        public JsonResult CheckAutoNumberingStatus(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new ObjectModel(BaseInput).ObjectItem.CheckAutoNumberingStatus(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckDeficiencyCategoryIsinUse")]
        public JsonResult CheckDeficiencyCategoryIsinUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int val = new ObjectModel(BaseInput).ObjectItem.CheckDeficiencyCategoryIsinUse(applnInp);
                var jsonResult = Json(val, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckDeficiencyIsinUse")]
        public JsonResult CheckDeficiencyIsinUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int val = new ObjectModel(BaseInput).ObjectItem.CheckDeficiencyIsinUse(applnInp);
                var jsonResult = Json(val, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetObjectClassesforScheduling")]
        public JsonResult GetObjectClassesforScheduling(string Input, string ObjectCategoryId, string DrawingIds, string DataOption, string ClassListOption, string ObjectComponentCategory)
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
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectClassesItem.GetObjectClassesforScheduling(applnInp, Convert.ToInt32(ObjectCategoryId), DrawingIds,
                    Convert.ToInt32(DataOption), Convert.ToInt32(ClassListOption), Convert.ToInt32(ObjectComponentCategory));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckEquipmentObjectClassInUse")]
        public JsonResult CheckEquipmentObjectClassInUse(int ClassId)
        {
            try
            {
                int returnVal = new ObjectModel(BaseInput).ObjectClassesItem.CheckEquipmentObjectClassInUse(ClassId);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckEquipmentObjectClassStatisticsInUse")]
        public JsonResult CheckEquipmentObjectClassStatisticsInUse(int ClassStatisticsId)
        {
            try
            {
                int returnVal = new ObjectModel(BaseInput).ObjectClassesItem.CheckEquipmentObjectClassStatisticsInUse(ClassStatisticsId);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckRelationshipRuleInUse")]
        public JsonResult CheckRelationshipRuleInUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnValue = new ObjectModel(BaseInput).ObjectItem.CheckRelationshipRuleInUse(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDeficiencyCategoryList")]
        public JsonResult GetDeficiencyCategoryList(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetDeficiencyCategoryList(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetAssociationforselectedConnectionType")]
        public JsonResult GetAssociationforselectedConnectionType(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new ObjectModel(BaseInput).ObjectItem.GetAssociationforselectedConnectionType(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAssociationTypeForConnectivity")]
        public JsonResult GetAssociationTypeForConnectivity(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new ObjectModel(BaseInput).ObjectDrawingItem.GetAssociationTypeForConnectivity(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAssociationTypeConnectivity")]
        public JsonResult GetAssociationTypeConnectivity(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new ObjectModel(BaseInput).ObjectDrawingItem.GetClassAssociationTypeForConnectivity(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
            

        [ActionName("GetObjectAssociationToHatch")]
        public JsonResult GetObjectAssociationToHatch(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new ObjectModel(BaseInput).ObjectDrawingItem.GetObjectAssociationToHatch(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectAssociationToAnotherDrawing")]
        public JsonResult GetObjectAssociationToAnotherDrawing(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new ObjectModel(BaseInput).ObjectDrawingItem.GetObjectAssociationToAnotherDrawing(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUserAccessibleDrawingForObjectConnectivity")]
        public JsonResult GetUserAccessibleDrawingForObjectConnectivity(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new ObjectModel(BaseInput).ObjectDrawingItem.GetObjectAssociationToAnotherDrawing(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("InsertDeleteObjectAssociation")]
        public JsonResult InsertDeleteObjectAssociation(string Input, int IsInsert, int PrimaryObjectId, int SecondaryObjectId, int AssociationId, int CircuitNo1, int CircuitNo2, int CircuitNo3, int IsPrimaryObjectPanel, int IsInverse)
        {
            try
            {
                MessageReturn objMessageReturn = new MessageReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                objMessageReturn = new ObjectModel(BaseInput).ObjectDrawingItem.InsertDeleteObjectAssociation(applnInp,IsInsert,PrimaryObjectId,SecondaryObjectId,AssociationId,CircuitNo1,CircuitNo2,CircuitNo3,IsPrimaryObjectPanel,IsInverse);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetObjectAssociationToModify")]
        public JsonResult GetObjectAssociationToModify(string Input, int ObjectCategoryId, int DrawingId, Boolean IsBuildingDrawing, int SecondaryClassId, int AssociationId, Boolean IsInverse, int ObjectId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new ObjectModel(BaseInput).ObjectDrawingItem.GetObjectAssociationToModify(applnInp, ObjectCategoryId, DrawingId, IsBuildingDrawing, SecondaryClassId, AssociationId, IsInverse, ObjectId);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectAssociationDetails")]
        public JsonResult GetObjectAssociationDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new ObjectModel(BaseInput).ObjectDrawingItem.GetObjectAssociationDetails(applnInp);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }



        
        [ActionName("GetObjectsSpaceDetailsAnalytics")]
        public JsonResult GetObjectsSpaceDetailsAnalytics(string Input, int ObjectCategory, int DataOption, int AttributeOption, string ObjectClassIds,
                string DrawingIds, string SearchCondition, bool IsOrphan, int ObjectId, bool IsDataBasedOnUserAccess, int ObjectComponentType, int AnalyticsType, string ColumnName)
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
                    string strReturn = new ObjectModel(BaseInput).ObjectItem.GetObjectsSpaceDetailsAnalytics(applnInp, ObjectCategory, DataOption, AttributeOption, ObjectClassIds,
                                DrawingIds, SearchCondition, IsOrphan, ObjectId, IsDataBasedOnUserAccess, ObjectComponentType, AnalyticsType, ColumnName);
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

        [ActionName("ReplaceFieldLabel")]
        public JsonResult ReplaceFieldLabel(string text, int objectCategoryId)
        {
            try
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                ObjectFieldLabels objectFieldLabels = new ObjectFieldLabels();
                string label = objectFieldLabels.ReplaceFieldLabel(text, objectCategoryId);
                var jsonResult = Json(label, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
       

        [ActionName("GetUserAccessibleDrawingForObjectCategoryFloorConnection")]
        public JsonResult GetUserAccessibleDrawingForObjectCategoryFloorConnection(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new ObjectModel(BaseInput).ObjectDrawingItem.GetUserAccessibleDrawingForObjectCategoryFloorConnection(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("UpdateOrphanObjects")]
        public JsonResult UpdateOrphanObjects(string Input) {
            try {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new ObjectModel(BaseInput).ObjectItem.UpdateOrphanObjects(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex) {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

    }
}
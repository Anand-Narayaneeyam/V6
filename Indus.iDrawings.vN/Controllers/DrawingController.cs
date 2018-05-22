using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Models;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Web;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Indus.iDrawings.Utils.Security.Validation;

namespace Indus.iDrawings.vN.Controllers
{
    public class DrawingController : iDrawingsController
    {
        private static List<string> errors = new List<string>();

        public DrawingController()
        {

        }

        [ActionName("InsertMarkupDrawing")]
        public JsonResult InsertMarkupDrawing(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).DrawingItem.InsertMarkupDrawing(applicationFormInput);
              //  messageReturn = logError(messageReturn);
                return Json(messageReturn, JsonRequestBehavior.AllowGet);
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateMarkupDrawing")]
        public JsonResult UpdateMarkupDrawing(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).DrawingItem.UpdateMarkupDrawing(applicationFormInput);
                return Json(messageReturn, JsonRequestBehavior.AllowGet);
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetMarkupXml")]
        public JsonResult GetMarkupXml(int DrawingId, int RevisionNo, int MarkupId, bool isBuildingDrawing)
        {
            try
            {
                string markupXml = new CommonModel(BaseInput).DrawingItem.GetMarkupXml(DrawingId, RevisionNo, MarkupId, isBuildingDrawing);
                var jsonResult = Json(markupXml, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("UpdateMarkupDescription")]
        public JsonResult UpdateMarkupDescription(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).DrawingItem.UpdateMarkupDescription(applicationFormInput);
               // messageReturn = logError(messageReturn);
                return Json(messageReturn, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("DeleteMarkupDrawing")]
        public JsonResult DeleteMarkupDrawing(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).DrawingItem.DeleteMarkupDrawing(applicationFormInput);
                return Json(messageReturn, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertRevisedDrawing")]
        public JsonResult InsertRevisedDrawing(string applnInput, string fileInput)
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
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).DrawingItem.InsertRevisedDrawing(applicationFormInput, fileDataInput);
               // objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("ReviseBaseDrawing")]
        public JsonResult ReviseBaseDrawing(string applnInput, string fileInput)
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
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).DrawingItem.ReviseBaseDrawing(applicationFormInput, fileDataInput);
                // objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("ReplaceDrawing")]
        public JsonResult ReplaceDrawing(string applnInput, string fileInput)
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
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).DrawingItem.ReplaceDrawing(applicationFormInput, fileDataInput);
                //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }

        }
        [ActionName("ReplaceBaseDrawing")]
        public JsonResult ReplaceBaseDrawing(string applnInput, string fileInput)
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
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).DrawingItem.ReplaceBaseDrawing(applicationFormInput, fileDataInput);
                //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }

        }
        [ActionName("InsertRevisedBuildingDrawing")]
        public JsonResult InsertRevisedBuildingDrawing(string applnInput, string fileInput)
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
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).DrawingItem.InsertRevisedBuildingDrawing(applicationFormInput, fileDataInput);
                //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ReplaceBuildingDrawing")]
        public JsonResult ReplaceBuildingDrawing(string applnInput, string fileInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();          
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(fileInput);
                TypeValidation typeVal = new TypeValidation();
               
                if (typeVal.checkWhiteList(fileDataInput.FileName.ToString(), 6) == false)
                {
                    throw new Exception();
                }
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).DrawingItem.ReplaceBuildingDrawing(applicationFormInput, fileDataInput);
                //objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
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
        [ActionName("DeleteBuildingDrawing")]
        public JsonResult DeleteBuildingDrawing(string applnInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).DrawingItem.DeleteBuildingDrawing(applnInp);
               // objMessageReturn = logError(objMessageReturn);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }

        }
        [ActionName("DeleteFloorDrawing")]
        public JsonResult DeleteFloorDrawing(string applnInput)
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
                messageReturn = new CommonModel(BaseInput).DrawingItem.DeleteFloorDrawing(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeleteBaseDrawing")]
        public JsonResult DeleteBaseDrawing(string applnInput,string IsMainList)
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
                messageReturn = new CommonModel(BaseInput).DrawingItem.DeleteBaseDrawing(applicationFormInput,Convert.ToBoolean(IsMainList));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetiDrawingsLayers")]
        public string GetiDrawingsLayers()
        {
            string returnVal = new CommonModel(BaseInput).DrawingItem.GetiDrawingsLayers();
            return returnVal;
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
        [ActionName("GetLockedDrawings")]
        public JsonResult GetLockedDrawings(string input)
        {

            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                int count = new CommonModel(BaseInput).DrawingItem.GetLockedDrawings(applnInp);
               // objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(count, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetLockedDrawingsData")]
        public JsonResult GetLockedDrawingsData(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).DrawingItem.GetLockedDrawingsData(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateDrawingManagement")]
        public JsonResult UpdateDrawingManagement(string applnInput, string ModuleId)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                TypeValidation typeVal = new TypeValidation();
                //if (typeVal.checkWhiteList(ModuleId, 5) == false)
                //{ throw new Exception(); }

                messageReturn = new CommonModel(BaseInput).DrawingItem.UpdateDrawingManagement(applicationFormInput,Convert.ToInt32( ModuleId));
                //messageReturn = logError(messageReturn);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAllDrawingsForModuleDrawingManagement")]
        public JsonResult GetAllDrawingsForModuleDrawingManagement(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new CommonModel(BaseInput).DrawingItem.GetAllDrawingsForModuleDrawingManagement(applnInp);
                return Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetAllocatedDrawingsForSpacePlanning")]
        public JsonResult GetAllocatedDrawingsForSpacePlanning(string Input, string  ModuleId, string projectid)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                TypeValidation typeVal = new TypeValidation();
                //if (typeVal.checkWhiteList(ModuleId, 5) == false)
                //{ throw new Exception(); }
                //if (typeVal.checkWhiteList(projectid, 5) == false)
                //{ throw new Exception(); }
                objDefaultApiReturn = new CommonModel(BaseInput).DrawingItem.GetAllocatedDrawingsForSpacePlanning(applnInp,Convert.ToInt32( ModuleId),Convert.ToInt32( projectid));
              //  objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAllocatedDrawingsForSpacePlanningAndFloorSelection")]
        public JsonResult GetAllocatedDrawingsForSpacePlanningAndFloorSelection(string Input, string ModuleId, string projectid)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                TypeValidation typeVal = new TypeValidation();
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new CommonModel(BaseInput).DrawingItem.GetAllocatedDrawingsForSpacePlanningAndFloorSelection(applnInp, Convert.ToInt32(ModuleId), Convert.ToInt32(projectid));
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAllocatedDrawings")]
        public JsonResult GetAllocatedDrawings(string Input, string  ModuleId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                TypeValidation typeVal = new TypeValidation();
                //if (typeVal.checkWhiteList(ModuleId, 5) == false)
                //{ throw new Exception(); }
                objDefaultApiReturn = new CommonModel(BaseInput).DrawingItem.GetAllocatedDrawings(applnInp,Convert.ToInt32( ModuleId));
               // objDefaultApiReturn = logError(objDefaultApiReturn);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetMandatoryLayers")]
        public JsonResult GetMandatoryLayers(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new CommonModel(BaseInput).DrawingItem.GetMandatoryLayers(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOpenDrawingDetails")]
        public JsonResult GetOpenDrawingDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DrawingAPIReturn objDrawingApiReturn = new DrawingAPIReturn();
                objDrawingApiReturn = new CommonModel(BaseInput).DrawingItem.GetOpenDrawingDetails(applnInp);
                var jsonResult = Json(objDrawingApiReturn.DrawingDetails, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateLockStatusOfDrawing")]
        public JsonResult UpdateLockStatusOfDrawing(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new CommonModel(BaseInput).DrawingItem.UpdateLockStatusOfDrawing(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUnLockedDrawings")]
        public JsonResult GetUnLockedDrawings(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).DrawingItem.GetUnlockedDrawings(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUnlockedDrawingsForFloorSelection")]
        public JsonResult GetUnlockedDrawingsForFloorSelection(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new CommonModel(BaseInput).DrawingItem.GetUnlockedDrawingsForFloorSelection(applicationFormInput);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDisplaySettingsCategoryFieldsForDrawing")]
        public JsonResult GetDisplaySettingsCategoryFieldsForDrawing(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                else
                {
                    DisplaySettingInput displaySettingInput = JsonConvert.DeserializeObject<DisplaySettingInput>(Input);
                    CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                    objCustomApiReturn = new CommonModel(BaseInput).DrawingItem.GetDisplaySettingsCategoryFieldsForDrawing(displaySettingInput);
                    var jsonResult = Json(objCustomApiReturn.DisplaySettingsData, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return Json(jsonResult, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetModuleDrawingsForDrawingManagement")]
        public JsonResult GetModuleDrawingsForDrawingManagement(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new CommonModel(BaseInput).DrawingItem.GetModuleDrawingsForDrawingManagement(applnInp);
                return Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUserSessionDistributionMapSettings")]
        public JsonResult InsertUserSessionDistributionMapSettings(string Input, string distInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DistributionMapInput distInp = JsonConvert.DeserializeObject<DistributionMapInput>(distInput);
                MessageReturn msgReturn = new MessageReturn();
                msgReturn = new CommonModel(BaseInput).DrawingItem.InsertUSerSessionDistributionMapSettings(applnInp, distInp);
                return Json(msgReturn, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDefaultLayers")]
        public string GetDefaultLayers(string Input)
        {
            ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            string returnVal = new CommonModel(BaseInput).DrawingItem.GetDefaultLayers(applnInp);

            return returnVal;
        }

    }
}
using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Space.Models;
using Indus.iDrawings.Space.Models.Item;
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
    public class SpaceDrawingController : iDrawingsController
    {
        public SpaceDrawingController()
        {

        }



        [ActionName("GetDistributionMapFieldListFromDrawing")]
        public JsonResult GetDistributionMapFieldListFromDrawing(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetDistributionMapFieldListFromDrawing(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetOrgdistributionSettingsBasedOnDrawings")]
        public JsonResult GetOrgdistributionSettingsBasedOnDrawings(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetOrgdistributionSettingsBasedOnDrawings(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOrgUnitDistributionMapData")]
        public JsonResult GetOrgUnitDistributionMapData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetOrgUnitDistributionMapData(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpaceFunctionDistributionMapData")]
        public JsonResult GetSpaceFunctionDistributionMapData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetSpaceFunctionDistributionMapData(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAddlDataFieldLookupDistributionMapData")]
        public JsonResult GetAddlDataFieldLookupDistributionMapData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetAddlDataFieldLookupDistributionMapData(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpaceStandardDistributionMapData")]
        public JsonResult GetSpaceStandardDistributionMapData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetSpaceStandardDistributionMapData(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateDistributionMapSettings")]
        public JsonResult UpdateDistributionMapSettings(string Input, string IsBounding, string Target, string PageTarget, string dropDownValue)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MessageReturn msgReturn = new MessageReturn();
                msgReturn = new SpaceModel(BaseInput).SpaceDrawingItem.UpdateDistributionMapSettings(applnInp, Convert.ToInt32(IsBounding), Convert.ToInt32(Target), Convert.ToInt32(PageTarget), dropDownValue);
                var jsonResult = Json(msgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDistributionMapSettings")]
        public JsonResult GetDistributionMapSettings(string Input, string OrgUnitId, string Target, string selectedFieldName)
        {
            try
            {
                TypeValidation typeVal = new TypeValidation();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                if (typeVal.checkWhiteList(selectedFieldName, 6) == false)
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetDistributionMapSettings(applnInp, Convert.ToInt32(OrgUnitId), Convert.ToInt32(Target), selectedFieldName);
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



        [ActionName("GetSpFunctionDistributionSettingsBasedOnDrawings")]
        public JsonResult GetSpFunctionDistributionSettingsBasedOnDrawings(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetSpFunctionDistributionSettingsBasedOnDrawings(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }



        [ActionName("GetSpStandardDistributionSettingsBasedOnDrawings")]
        public JsonResult GetSpStandardDistributionSettingsBasedOnDrawings(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetSpStandardDistributionSettingsBasedOnDrawings(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetAddlDataFieldDistributionSettingsBasedOnDrawings")]
        public JsonResult GetAddlDataFieldDistributionSettingsBasedOnDrawings(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetAddlDataFieldDistributionSettingsBasedOnDrawings(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDistributionMapSettingsBasedOnDrawings")]
        public JsonResult GetDistributionMapSettingsBasedOnDrawings(string Input, string OrgUnitId, string Target, string selectedFieldName)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetDistributionMapSettingsBasedOnDrawings(applnInp, Convert.ToInt32(OrgUnitId), Convert.ToInt32(Target), selectedFieldName);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetDistributionMapFieldListFromDrawingWithLevels")]
        public JsonResult GetDistributionMapFieldListFromDrawingWithLevels(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetDistributionMapFieldListFromDrawingWithLevels(applnInp);
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

        [ActionName("GetUserEditableOrgUnits")]
        public JsonResult GetUserEditableOrgUnits(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetUserEditableOrgUnits(applnInp);
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
        [ActionName("CheckSpaceForDrawing")]
        public JsonResult CheckSpaceForDrawing(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.CheckSpaceForDrawing(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        #region Unlock Drawings

        [ActionName("GetIsObjectExistsWithSpaceIds(")]
        public JsonResult GetIsObjectExistsWithSpaceIds(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                string returnVal = new SpaceModel(BaseInput).SpaceDrawingItem.GetIsObjectExistsWithSpaceIds(applicationFormInput);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("RemoveSpaces")]
        public JsonResult RemoveSpaces(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceDrawingItem.RemoveSpaces(applicationFormInput);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdateSpaceData")]
        public JsonResult InsertUpdateSpaceData(string input)
        {
            try
            {
                List<SpaceDataInput> spaceDataInput = new List<SpaceDataInput>();
                spaceDataInput = JsonConvert.DeserializeObject<List<SpaceDataInput>>(input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceDrawingItem.InsertSpaceData(spaceDataInput);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateDrawingLockAsUnlocked")]
        public JsonResult UpdateDrawingLockAsUnlocked(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                if (new CommonController().CheckValidInputData(applicationFormInput) == false)
                {
                    throw new Exception();
                }
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceDrawingItem.UpdateDrawingLockAsUnlocked(applicationFormInput);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeleteFilesToDelete")]
        public JsonResult DeleteFilesToDelete(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceDrawingItem.DeleteFilesToDelete(applicationFormInput);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        #endregion

        [ActionName("CheckDrawingSeatingAssignmentType")]
        public JsonResult CheckDrawingSeatingAssignmentType(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                bool returnValue = new SpaceModel(BaseInput).SpaceDrawingItem.CheckDrawingSeatingAssignmentType(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("CheckReservationSeatingAssignmentType")]
        public JsonResult CheckReservationSeatingAssignmentType(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                bool returnValue = new SpaceModel(BaseInput).SpaceDrawingItem.CheckReservationSeatingAssignmentType(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("IsApprovalRequiredforSpace")]
        public JsonResult IsApprovalRequiredforSpace(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                bool returnValue = new SpaceModel(BaseInput).SpaceDrawingItem.IsApprovalRequiredforSpace(applnInp);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetHotelingRequestsCalender")]
        public JsonResult GetHotelingRequestsCalender(string Input, string Date, string StartDate, string EndDate, string SearchQuery, string AmenityQuery, bool IsAvailable, string SearchToDate, int DrawingId, int ReservedBy, bool IsSpecialRoom)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetHotelingRequestsCalender(applnInp, Date, StartDate, EndDate, SearchQuery, AmenityQuery, IsAvailable, SearchToDate, DrawingId, ReservedBy, IsSpecialRoom);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpaceDriverDistributionMapData")]
        public JsonResult GetSpaceDriverDistributionMapData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetSpaceDriverDistributionMapData(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCAISpaceDriverDistributionSettingsBasedOnDrawings")]
        public JsonResult GetCAISpaceDriverDistributionSettingsBasedOnDrawings(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetCAISpaceDriverDistributionSettingsBasedOnDrawings(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetLeaderLineDetails")]
        public JsonResult GetLeaderLineDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetLeaderLineDetails(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateXYCordinates")]
        public JsonResult UpdateXYCordinates(string Input, int DestinationSpaceId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnVal = new SpaceModel(BaseInput).SpaceDrawingItem.UpdateXYCordinates(applnInp, DestinationSpaceId);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetXRefedArchitecturalDrawingId")]
        public JsonResult GetXRefedArchitecturalDrawingId(string Input, int IsBuildingDrawing)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetXRefedArchitecturalDrawingId(applnInp, IsBuildingDrawing);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("DeleteSpaceOrphanRecords")]
        public JsonResult DeleteSpaceOrphanRecords(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceDrawingItem.DeleteSpaceOrphanRecords(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("RelinkSpaceOrphanRecords")]
        public JsonResult RelinkSpaceOrphanRecords(string input)
        {
            try
            {
                List<SpaceDataInput> spaceDataInput = new List<SpaceDataInput>();
                spaceDataInput = JsonConvert.DeserializeObject<List<SpaceDataInput>>(input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceDrawingItem.RelinkSpaceOrphanRecords(spaceDataInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetLayerFunctionMappings")]
        public JsonResult GetLayerFunctionMappings(string Input)
        {
            ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new SpaceModel(BaseInput).SpaceDrawingItem.GetLayerFunctionMappings(applnInp);
            var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
        }
    }
}
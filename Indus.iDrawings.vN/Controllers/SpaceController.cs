using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Space.Models;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Utils.Security.Validation;
using Indus.iDrawings.Web;
using Newtonsoft.Json;
using System;
using System.Web.Mvc;
using Indus.iDrawings.Common;
using Indus.iDrawings.Common.Models;
using Indus.iDrawings.Space.Models.Item;
using System.Collections.Generic;
using System.Net.Http;
using Indus.iDrawings.Space.Entity;

namespace Indus.iDrawings.vN.Controllers
{
    public class SpaceController : iDrawingsController
    {
        public SpaceController()
        {

        }

        [ActionName("GetAllSpaceDetails")]
        public JsonResult GetAllSpaceDetails(string Input)
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
                    DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                    objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetAllSpaceDetails(applnInp);
                    //objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                    var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return Json(jsonResult, JsonRequestBehavior.AllowGet);
                   // return jsonResult;
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
        [ActionName("GetAllSpaceDetailsExport")]
        public HttpResponseMessage GetAllSpaceDetailsExport(string Input, string fileName, string[] fields = null)
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
                    BaseClassInput baseClassInput = BaseInput;
                    baseClassInput.RowsPerPage = 0;
                    DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                    objDefaultApiReturn = new SpaceModel(baseClassInput).SpaceItem.GetAllSpaceDetails(applnInp);
                    return new CommonController().ExportToExcel(objDefaultApiReturn.FieldBinderData, fileName, fields, BaseInput);
                    //objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                    //var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                    //jsonResult.MaxJsonLength = int.MaxValue;
                    //return Json(jsonResult, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception ex)
            {
                return new CommonController().HTTPResponseErrorMessage(ex.ToString());
            }
        }
        [ActionName("AssignSpaceStandard")]
        public JsonResult AssignSpaceStandard(string Input, string aminitees, string DrawingIds)
        {

            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applicationFormInput) == false)
                {
                    throw new Exception();
                }
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.AssignSpaceStandard(applicationFormInput, aminitees, DrawingIds);
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
        [ActionName("AssignMultipleSpaceStd")]
        public JsonResult AssignMultipleSpaceStd(string Input, string aminitees, string DrawingIds, int[] Ids, string SeatSpaceArray)
        {

            try
            {
                List<SeatDetails> lstSeatDetails;
                if (SeatSpaceArray != null && !SeatSpaceArray.Equals("null"))
                {
                    lstSeatDetails = JsonConvert.DeserializeObject<List<SeatDetails>>(SeatSpaceArray);
                }
                else
                {
                    lstSeatDetails = null;
                }
                List<MultipleSpaceDetails> lstmultipleSpaceDetails = JsonConvert.DeserializeObject<List<MultipleSpaceDetails>>(DrawingIds);
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applicationFormInput) == false)
                {
                    throw new Exception();
                }
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.AssignMultipleSpaceStandard(applicationFormInput, aminitees, lstmultipleSpaceDetails, Ids, lstSeatDetails);
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

        [ActionName("DeAssignSpaceStandard")]
        public JsonResult DeAssignSpaceStandard(string Input, string DrawingIds)
        {

            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(DrawingIds))
                {
                    if (!typeVal.checkWhiteListSelectedIds(DrawingIds, 5, ","))
                        throw new Exception();

                }
                MessageReturn messageReturn = new MessageReturn();
                if (new CommonController().CheckValidInputData(applicationFormInput) == false)
                {
                    throw new Exception();
                }
                messageReturn = new SpaceModel(BaseInput).SpaceItem.DeAssignSpaceStandard(applicationFormInput, DrawingIds);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("DeassignMultipleSpaceStd")]
        public JsonResult DeassignMultipleSpaceStd(string Input, string DrawingIds, int[] Ids)
        {

            try
            {
                List<MultipleSpaceDetails> lstMultipleSpaceDetails = JsonConvert.DeserializeObject<List<MultipleSpaceDetails>>(DrawingIds);
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                if (new CommonController().CheckValidInputData(applicationFormInput) == false)
                {
                    throw new Exception();
                }
                messageReturn = new SpaceModel(BaseInput).SpaceItem.DeassignMultipleSpaceStd(applicationFormInput, lstMultipleSpaceDetails, Ids);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetTotalizeData")]
        public JsonResult GetTotalizeData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetTotalizeData(applnInp);
                //objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }

            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDistributionMapValuesInDrawing")]
        public JsonResult GetDistributionMapValuesInDrawing(string applnInput, int distributionBy, int drawingId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetDistributionMapValuesInDrawing(applnInp, distributionBy, drawingId);
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

        [ActionName("UpdateOrgUnitDistributionColorSettings")]
        public JsonResult UpdateOrgUnitDistributionColorSettings(string applnInput, string OrgUnitId, string HatchPatternId, string HatchAngle, string HatchScale, string ColorId, int IsBounding, int Target)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.UpdateOrgUnitDistributionColorSettings(applicationFormInput, OrgUnitId, HatchPatternId, HatchAngle, HatchScale, ColorId, IsBounding, Target);
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
        [ActionName("UpdateArchivedSpaceDriverDefaultColors")]

        public JsonResult UpdateArchivedSpaceDriverDefaultColors(string applnInput,  int DrawingId, int ArchiveId) {
            try {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.UpdateArchivedSpaceDriverDefaultColors(applicationFormInput, DrawingId, ArchiveId);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex) {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckWhetherCustomerSpecificItem")]
        public JsonResult CheckWhetherCustomerSpecificItem(string input, int tokenId)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                bool returnValue = new SpaceModel(BaseInput).SpaceItem.CheckWhetherCustomerSpecificItem(applicationFormInput, tokenId);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetSpaceStandardDetails")]
        public JsonResult GetSpaceStandardDetails(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string description = new SpaceModel(BaseInput).SpaceItem.GetSpaceStandardDetails(applicationFormInput);
                return Json(description, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("UpdateSpaceDetails")]
        public JsonResult UpdateSpaceDetails(string Input, string DrawingIds)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                TypeValidation typeVal = new TypeValidation();
                if (!string.IsNullOrEmpty(DrawingIds))
                {
                    if (!typeVal.checkWhiteListSelectedIds(DrawingIds, 5, ","))
                        throw new Exception();

                }
                messageReturn = new SpaceModel(BaseInput).SpaceItem.UpdateSpaceDetails(applicationFormInput, DrawingIds);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetSpaceResourceforAllocation")]
        public JsonResult GetSpaceResourceforAllocation(string Input, string ObjectCategory, string DataOption, string AttributeOption, string ObjectClassIds,
            string DrawingIds, string SearchCondition, string IsOrphan, string ObjectId, string IsDataBasedOnUserAccess, string ObjectComponentType, string SpaceId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetSpaceResourceforAllocation(applnInp, Convert.ToInt32(ObjectCategory), Convert.ToInt32(DataOption),
                    Convert.ToInt32(AttributeOption), ObjectClassIds, DrawingIds, SearchCondition, Convert.ToBoolean(Convert.ToInt32(IsOrphan)), Convert.ToInt32(ObjectId), Convert.ToBoolean(Convert.ToInt32(IsDataBasedOnUserAccess)), Convert.ToInt32(ObjectComponentType), Convert.ToInt32(SpaceId));
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
        [ActionName("DeleteSpaceResources")]
        public JsonResult DeleteSpaceResources(string Input, string[] ObjectIds)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }

                var varObjectIds = string.Join(",", ObjectIds);
                TypeValidation typeVal = new TypeValidation();
                if (!typeVal.checkWhiteListSelectedIds(varObjectIds, 5, ","))
                    throw new Exception();

                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.DeleteSpaceResources(applnInp);
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
        [ActionName("InsertResourcesToSpace")]
        public JsonResult InsertResourcesToSpace(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.InsertResourcesToSpace(applnInp);
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
        [ActionName("GetSearchForSpace")]
        public JsonResult GetSearchForSpace(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetSearchForSpace(applnInp);
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
        [ActionName("DeleteSpaceData")]
        public JsonResult DeleteSpaceData(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applicationFormInput) == false)
                {
                    throw new Exception();
                }
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.DeleteSpaceData(applicationFormInput);
                // messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckEditPrivilageExist")]
        public JsonResult CheckEditPrivilageExist(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);

                MessageReturn messageReturn = new MessageReturn();
                messageReturn.ServerId = new SpaceModel(BaseInput).SpaceItem.CheckEditPrivilageExist(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckEditPrivilageExistForMultipleSpace")]
        public JsonResult CheckEditPrivilageExistForMultipleSpace(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn.ServerId = new SpaceModel(BaseInput).SpaceItem.CheckEditPrivilageExistForMultipleSpace(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetColorSettings")]
        public JsonResult GetColorSettings()
        {
            try
            {
                string strColor = new SpaceModel(BaseInput).SpaceItem.GetColorSettings();
                var jsonResult = Json(strColor, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDatesOfSnapShots")]
        public JsonResult GetDatesOfSnapShots(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetDatesOfSnapShots(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetRoomDetailsForReservation")]
        public JsonResult GetRoomDetailsForReservation(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MultipleTablesReturn multipleTablesReturn = new MultipleTablesReturn();
                multipleTablesReturn = new SpaceModel(BaseInput).SpaceItem.GetRoomDetailsForReservation(applnInp);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetRoomReservationofDrawing")]
        public JsonResult GetRoomReservationofDrawing(string Input, int NameDisplayFormatId, string Date, string StartDate, string EndDate, string SearchQuery, string AminityQuery,
            bool IsAvailable, string SearchToDate, int DrawingId, int ReservedBy, bool IsSpecialRoom, bool IsFromDrawing, bool LoadNonBaseOrgUnitSpace)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                BaseClassInput baseClassInput = BaseInput;
                if (IsFromDrawing)
                {
                    baseClassInput.RowsPerPage = 0;
                }
                objDefaultApiReturn = new SpaceModel(baseClassInput).SpaceItem.GetRoomReservationofDrawing(applnInp, NameDisplayFormatId,
                    Date, StartDate, EndDate, SearchQuery, AminityQuery, IsAvailable, SearchToDate, DrawingId, ReservedBy, IsSpecialRoom, LoadNonBaseOrgUnitSpace);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
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

        [ActionName("AssignSpecialRoomSeatToSpace")]
        public JsonResult AssignSpecialRoomSeatToSpace(string applnInput, int ModuleId, int DrawingId)
        {
            try
            {
                ApplicationFormInput applnInp = new ApplicationFormInput();
                applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.AssignSpecialRoomSeatToSpace(applnInp, ModuleId, DrawingId);
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

        [ActionName("AssignSpecialRoomSeatToMultipleSpace")]
        public JsonResult AssignSpecialRoomSeatToMultipleSpace(string applnInput, int ModuleId, string DrawingId, int[] Ids)
        {
            try
            {
                List<MultipleSpaceDetails> lstmultipleSpaceDetails = JsonConvert.DeserializeObject<List<MultipleSpaceDetails>>(DrawingId);
                ApplicationFormInput applnInp = new ApplicationFormInput();
                applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.AssignSpecialRoomSeatToMultipleSpace(applnInp, ModuleId, lstmultipleSpaceDetails, Ids);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertReservationRequest")]
        public JsonResult InsertReservationRequest(string applnInput, string reservationDataInput)
        {
            try
            {
                ApplicationFormInput applnInp = new ApplicationFormInput();
                List<ReservationRequestDataInput> reservationRequestDataInput = new List<ReservationRequestDataInput>();
                applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                reservationRequestDataInput = JsonConvert.DeserializeObject<List<ReservationRequestDataInput>>(reservationDataInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.InsertReservationRequest(applnInp, reservationRequestDataInput);
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


        [ActionName("GetBookedUserDetails")]
        public JsonResult GetBookedUserDetails(string Input, int BookedforUserId, int BookedForUserCategoryId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetBookedUserDetails(applnInp, BookedforUserId, BookedForUserCategoryId);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetReservationbookedforListDetails")]
        public JsonResult GetReservationbookedforListDetails(string Input, int Target) //Target 1: spOWL_GetReservationUserList, 2:spEMP_GetEmployeeList, 3: spOWL_GetContactsList
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetReservationBookedForDetails(applnInp, Target);
                objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetInviteesListForUserCategoryId")]
        public JsonResult GetInviteesListForUserCategoryId(string Input, int Target) //Target 1: spOWL_GetReservationUsers, 2: spEMP_GetEmployeeUsersList, 3: spOWL_GetReservationContacts, 4: spSPE_GetReservationUserGroups 
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetInviteesListForUserCategoryId(applnInp, Target);
                objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetReservationComponentsList")]
        public JsonResult GetReservationComponentsList(string Input, int Target) //Target 1: spSPE_GetAmenitiesListForLookup, 2:spSPE_GetServicesList, 3: spSPE_GetAllCateringForLookup
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetReservationComponentsList(applnInp, Target);
                objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetInviteesScheduleDetails")]
        public JsonResult GetInviteesScheduleDetails(string Input, string INVITEID, DateTime FromDate, DateTime ToDate, int CategoryId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetInviteesScheduleDetails(applnInp, INVITEID, FromDate, ToDate, CategoryId);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetSpaceIdFromHandle")]
        public JsonResult GetSpaceIdFromHandle(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetSpaceIdFromHandle(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDailyReservationCount")]
        public JsonResult GetDailyReservationCount(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetDailyReservationCount(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpaceIdsForScheduling")]
        public JsonResult GetSpaceIdsForScheduling(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetSpaceIdsForScheduling(applnInp);
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

        [ActionName("GetSpacesOnSearchForReservation")]
        public JsonResult GetSpacesOnSearchForReservation(string Input, string SearchQuery, string AminityQuery, DateTime FromDate, DateTime ToDate, bool IsAvailable)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetSpacesOnSearchForReservation(applnInp, SearchQuery, AminityQuery, FromDate, ToDate, IsAvailable);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetNotificationMails")]
        public JsonResult GetNotificationMails(string Input, int RequestId, int MailTarget)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetNotificationMails(applnInp, RequestId, MailTarget);
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

        [ActionName("SendReminderNotification")]
        public JsonResult SendReminderNotification(int Target, int RequestId)
        {
            try
            {
                ApplicationFormInput applnInp = new ApplicationFormInput();
                int returnVal = new Notifications().SendReminderNotification(applnInp, Target, RequestId);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAmenityData")]
        public JsonResult GetAmenityData(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetAmenityData(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetReservationTimeSlots")]
        public JsonResult GetReservationTimeSlots(string Input, string Date, string StartDate, string EndDate, int SpaceId, int FloorId, string RoomNo, int ReservedBy)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetReservationTimeSlots(applnInp, Date, StartDate, EndDate, SpaceId, FloorId, RoomNo, ReservedBy);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOrganizationalLevel1UnitsAndCostCatgory")]
        public JsonResult GetOrganizationalLevel1UnitsAndCostCatgory(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetOrganizationalLevel1UnitsAndCostCatgory(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertMultipleOrgUnitAssignment")]
        public JsonResult InsertMultipleOrgUnitAssignment(string Input)
        {
            try
            {
                List<List<ReportFieldValues>> listReportFieldValues = JsonConvert.DeserializeObject<List<List<ReportFieldValues>>>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.InsertMultipleOrgUnitAssignment(listReportFieldValues);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeleteMultipleOrgUnitAssignment")]
        public JsonResult DeleteMultipleOrgUnitAssignment(string Input)
        {

            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applicationFormInput) == false)
                {
                    throw new Exception();
                }
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.DeleteMultipleOrgUnitAssignment(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("SetAreaOptions")]
        public JsonResult SetAreaOptions(string Input, float dblRate, bool blnExtWalArea, bool blnVerWalArea, bool blnNetAreaEnabled)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                MessageReturn messageReturn = new MessageReturn();
                int Area = new SpaceModel(BaseInput).SpaceItem.SetAreaOptions(applnInp, dblRate, blnExtWalArea, blnVerWalArea, blnNetAreaEnabled);
                var jsonResult = Json(Area, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("AddOrgUnitCostAssignment")]
        public JsonResult AddOrgUnitCostAssignment(string Input)
        {
            try
            {
                List<CostCategoryInput> costInp = JsonConvert.DeserializeObject<List<CostCategoryInput>>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.AddOrgUnitCostAssignment(costInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCostCategoryRate")]
        public JsonResult GetCostCategoryRate(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                objCustomApiReturn = new SpaceModel(BaseInput).SpaceItem.GetCostCategoryRate(applnInp);
                var jsonResult = Json(objCustomApiReturn.LookupValues, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAllSharedSpaceDetails")]
        public JsonResult GetAllSharedSpaceDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetAllSharedSpaceDetails(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetAllSharedSpaceDetailsExport")]
        public HttpResponseMessage GetAllSharedSpaceDetailsExport(string Input, string fileName, string[] fields = null)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                BaseClassInput baseClassInput = BaseInput;
                baseClassInput.RowsPerPage = 0;
                objDefaultApiReturn = new SpaceModel(baseClassInput).SpaceItem.GetAllSharedSpaceDetails(applnInp);
                return new CommonController().ExportToExcel(objDefaultApiReturn.FieldBinderData, fileName, fields, BaseInput);
            }

            catch (Exception ex)
            {
                return new CommonController().HTTPResponseErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateMultipleSpaceData")]
        public JsonResult UpdateMultipleSpaceData(string Input, int ReportField, string NewValue, int ParentUnitId)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.UpdateMultipleSpaceData(applnInp, ReportField, NewValue, ParentUnitId);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertSeatNumber")]
        public JsonResult InsertSeatNumber(string Input, bool IsMultiple, string multiplespacerommnumber)
        {
            try
            {
                List<MultipleSpaceDetails> lstmultipleSpaceDetails;
                if (multiplespacerommnumber != null && !multiplespacerommnumber.Equals("null"))
                {
                    lstmultipleSpaceDetails = JsonConvert.DeserializeObject<List<MultipleSpaceDetails>>(multiplespacerommnumber);

                }
                else
                    lstmultipleSpaceDetails = null;
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.InsertSeatNumber(applnInp, IsMultiple);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpaceDetailsFromSeatId")]
        public JsonResult GetSpaceDetailsFromSeatId(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string ReturnVal = new SpaceModel(BaseInput).SpaceItem.GetSpaceDetailsFromSeatId(applnInp);
                var jsonResult = Json(ReturnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeleteSeats")]
        public JsonResult DeleteSeats(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.DeleteSeats(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertSeatingResources")]
        public JsonResult InsertSeatingResources(string Input)
        {
            try
            {
                SeatingResourceInput applnInp = JsonConvert.DeserializeObject<SeatingResourceInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.InsertSeatingResources(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetGrossAreaDistributionbyCategoryForDashBoard")]
        public JsonResult GetGrossAreaDistributionbyCategoryForDashBoard(int CategoryId, int SiteId)
        {
            try
            {
                string strReturn = new SpaceModel(BaseInput).SpaceDashboardItem.GetGrossAreaDistributionbyCategoryForDashBoard(CategoryId, SiteId);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpaceBarChartDetailsForDashboard")]
        public JsonResult GetSpaceBarChartDetailsForDashboard(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new SpaceModel(BaseInput).SpaceDashboardItem.GetSpaceBarChartDetailsForDashboard(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOrgDistributionChartDetailsForDashboard")]
        public JsonResult GetOrgDistributionChartDetailsForDashboard(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new SpaceModel(BaseInput).SpaceDashboardItem.GetOrgDistributionChartDetailsForDashboard(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOrgDistributionDetailsForDashboard")]
        public JsonResult GetOrgDistributionDetailsForDashboard(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new SpaceModel(BaseInput).SpaceDashboardItem.GetOrgDistributionDetailsForDashboard(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateStatusOfRequest")]
        public JsonResult UpdateStatusOfRequest(string Input, string[] requestIds = null)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.UpdateStatusOfRequest(applnInp, requestIds);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateRoomStatusOfRequest")]
        public JsonResult UpdateRoomStatusOfRequest(string Input, string[] requestIds = null)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.UpdateRoomStatusOfRequest(applnInp, requestIds);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpacesOnSearchForReservationSeats")]
        public JsonResult GetSpacesOnSearchForReservationSeats(string SearchQuery, string SearchResourceQuery, string FromDate, string ToDate, bool IsAvailable, bool IsSpecialRoom, bool LoadNonBaseOrgUnitSpace)
        {
            try
            {
                DefaultApiReturn defaultApiReturn = new DefaultApiReturn();
                defaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetSpacesOnSearchForReservationSeats(SearchQuery, SearchResourceQuery, FromDate, ToDate, IsAvailable, IsSpecialRoom, LoadNonBaseOrgUnitSpace);
                var jsonResult = Json(defaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSpacesForReservationSeatsSearch")]
        public JsonResult GetSpacesForReservationSeatsSearch(string Input, string SearchResourceQuery, string FromDate, string ToDate, bool IsAvailable, bool IsSpecialRoom, bool LoadNonBaseOrgUnitSpace)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn defaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetSpacesForReservationSeatsSearch(applnInp, SearchResourceQuery, FromDate, ToDate, IsAvailable, IsSpecialRoom, LoadNonBaseOrgUnitSpace);
                var jsonResult = Json(defaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("UpdateSeatNumberAsHotelingOrNot")]
        public JsonResult UpdateSeatNumberAsHotelingOrNot(string Input)
        {
            try
            {
                List<SeatDetails> lstSeatDetails = JsonConvert.DeserializeObject<List<SeatDetails>>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).SpaceItem.UpdateSeatNumberAsHotelingOrNot(lstSeatDetails);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckConflictedSeatRequestExists")]
        public JsonResult CheckConflictedSeatRequestExists(string Input, string FromDate, string ToDate, int BookedForId, bool IsRoomNo = false)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int intReturn = new SpaceModel(BaseInput).SpaceItem.CheckConflictedSeatRequestExists(applicationFormInput, FromDate, ToDate, BookedForId, IsRoomNo);
                var jsonResult = Json(intReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertSeatReservationRequest")]
        public JsonResult InsertSeatReservationRequest(string Input, string Resources, string OtherResources)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                dynamic listResources = JsonConvert.DeserializeObject(Resources);
                dynamic listOtherResources = JsonConvert.DeserializeObject(OtherResources);
                MessageReturn msgReturn = new MessageReturn();
                msgReturn = new SpaceModel(BaseInput).SpaceItem.InsertSeatReservationRequest(applicationFormInput, listResources, listOtherResources);
                var jsonResult = Json(msgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("IsCheckInCheckOutPossible")]
        public JsonResult IsCheckInCheckOutPossible(int RequestId, DateTime FromDate, DateTime ToDate, bool IsCheckIn)
        {
            try
            {               
                string strReturn = new SpaceModel(BaseInput).SpaceItem.IsCheckInCheckOutPossible(RequestId, FromDate, ToDate, IsCheckIn);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetTimeZoneNameForSite")]
        public JsonResult GetTimeZoneNameForSite(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new SpaceModel(BaseInput).SpaceItem.GetTimeZoneNameForSite(applicationFormInput);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetRoomUsageForDashboard")]
        public JsonResult GetRoomUsageForDashboard(int Interval, bool IsHotelling, string FromDate, string ToDate)
        {
            try
            {
                MultipleTablesReturn tblReturn = new MultipleTablesReturn();
                tblReturn = new SpaceModel(BaseInput).SpaceDashboardItem.GetRoomUsageForDashboard(Interval, IsHotelling, FromDate, ToDate);
                var jsonResult = Json(tblReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetRoomReservationCalendarForDashboard")]
        public JsonResult GetRoomReservationCalendarForDashboard(int Interval, int ReservedBy, string StartDate, string EndDate)
        {
            try
            {
                string strReturn = new SpaceModel(BaseInput).SpaceDashboardItem.GetRoomReservationCalendarForDashboard(Interval, ReservedBy, StartDate, EndDate);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSeatReservationCalendarForDashboard")]
        public JsonResult GetSeatReservationCalendarForDashboard(int Interval, int ReservedBy, string StartDate, string EndDate, int SeatId)
        {
            try
            {
                string strReturn = new SpaceModel(BaseInput).SpaceDashboardItem.GetSeatReservationCalendarForDashboard(Interval, ReservedBy, StartDate, EndDate, SeatId);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSeatDetailsforDrawing")]
        public JsonResult GetSeatDetailsforDrawing(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new SpaceModel(BaseInput).SpaceItem.GetSeatDetailsforDrawing(applicationFormInput);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateSeatXYPosition")]
        public JsonResult UpdateSeatXYPosition(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new SpaceModel(BaseInput).SpaceItem.UpdateSeatXYPosition(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCurrentTimeOfSpace")]
        public JsonResult GetCurrentTimeOfSpace(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetCurrentTimeOfSpace(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("AssignHotellingSeatToSpace")]
        public JsonResult AssignHotellingSeatToSpace(string Input, int ModuleId, int DrawingId, bool IsFromDrawing)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new SpaceModel(BaseInput).SpaceItem.AssignHotellingSeatToSpace(applicationFormInput, ModuleId, DrawingId, IsFromDrawing);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("AssignHotellingSeatToMultipleSpace")]
        public JsonResult AssignHotellingSeatToMultipleSpace(string Input, int ModuleId, string DrawingId, bool IsFromDrawing, int[] Ids)
        {
            try
            {
                List<MultipleSpaceDetails> lstmultipleSpaceDetails = JsonConvert.DeserializeObject<List<MultipleSpaceDetails>>(DrawingId);
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new SpaceModel(BaseInput).SpaceItem.AssignHotellingSeatToMultipleSpace(applicationFormInput, ModuleId, lstmultipleSpaceDetails, IsFromDrawing, Ids);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetUniqueRoomNoExists")]
        public JsonResult GetUniqueRoomNoExists(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetUniqueRoomNoExists(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAllWorkSpaceDetails")]
        public JsonResult GetAllWorkSpaceDetails(string Input, int Target)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetAllWorkSpaceDetails(applnInp, Target);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateReservationRequest")]
        public JsonResult UpdateReservationRequest(string Input, string Resources, string OtherResources,bool IsSeatUpdate)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn msgReturn = new SpaceModel(BaseInput).SpaceItem.UpdateReservationRequest(applnInp, Resources,OtherResources, IsSeatUpdate);
                var jsonResult = Json(msgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetRoomReservationofDrawingSearch")]
        public JsonResult GetRoomReservationofDrawingSearch(string Input, string Date, string StartDate, string EndDate,
            string SearchQuery, string AminityQuery, bool IsAvailable, string SearchToDate, int DrawingId, int ReservedBy, bool IsSpecialRoom, bool LoadNonBaseOrgUnitSpace)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetRoomReservationofDrawingSearch(applnInp, Date, StartDate, 
                    EndDate, SearchQuery, AminityQuery, IsAvailable, SearchToDate, DrawingId, ReservedBy, IsSpecialRoom, LoadNonBaseOrgUnitSpace);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("IsEditPossible")]
        public JsonResult IsEditPossible(string[] RequestIds, bool IsActive)
        {
            try
            {
                bool blnReturn = new SpaceModel(BaseInput).SpaceItem.IsEditPossible(RequestIds, IsActive);
                var jsonResult = Json(blnReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("IsRoomCheckInCheckOutPossible")]
        public JsonResult IsRoomCheckInCheckOutPossible(int RequestId, DateTime FromDate, DateTime ToDate, bool IsCheckIn)
        {
            try
            {
                string strReturn = new SpaceModel(BaseInput).SpaceItem.IsRoomCheckInCheckOutPossible(RequestId, FromDate, ToDate, IsCheckIn);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("IsRoomEditPossible")]
        public JsonResult IsRoomEditPossible(string[] RequestIds, bool IsActive)
        {
            try
            {
                bool blnReturn = new SpaceModel(BaseInput).SpaceItem.IsRoomEditPossible(RequestIds, IsActive);
                var jsonResult = Json(blnReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }       

        [ActionName("GetCAIDistributionMapSettings")]
        public JsonResult GetCAIDistributionMapSettings(string Input, string moduleId, bool isMySettings)
        {
            try
            {
                TypeValidation typeVal = new TypeValidation();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetCAIDistributionMapSettingsData(applnInp, Convert.ToInt32(moduleId), isMySettings);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateCAIDistributionMapSettings")]
        public JsonResult UpdateCAIDistributionMapSettings(string Input,int Target,string IsBounding)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                if (new CommonController().CheckValidInputData(applnInp) == false)
                {
                    throw new Exception();
                }
                MessageReturn msgReturn = new MessageReturn();
                msgReturn = new SpaceModel(BaseInput).SpaceItem.UpdateCAIDistributionMapSettings(applnInp,  Convert.ToInt32(Target), Convert.ToInt32(IsBounding));
                var jsonResult = Json(msgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetSeatAdvancedSearchListContent")]
        public JsonResult GetSeatAdvancedSearchListContent(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn defaultApiReturn = new DefaultApiReturn();
                defaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetSeatAdvancedSearchListContent(applicationFormInput);
                var jsonResult = Json(defaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdateSeatReservation")]

        public JsonResult InsertUpdateSeatReservation(string Input, string ConflictInput, string FromDate, string ToDate, int BookedForId, bool IsRoomNo, string Resources, string OtherResources, bool IsSeatUpdate, int Target)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                ApplicationFormInput conflictFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(ConflictInput);
                dynamic listResources = JsonConvert.DeserializeObject(Resources);
                dynamic listOtherResources = JsonConvert.DeserializeObject(OtherResources);
                MessageReturn msgReturn = new MessageReturn();
                msgReturn = new SpaceModel(BaseInput).SpaceItem.InsertUpdateSeatReservation(applicationFormInput, conflictFormInput, FromDate, ToDate, BookedForId, IsRoomNo, listResources, listOtherResources, IsSeatUpdate, Target);
                var jsonResult = Json(msgReturn.ServerId, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateEquipmentStatusOfRequest")]
        public JsonResult UpdateEquipmentStatusOfRequest(string Input, string[] requestIds = null)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new SpaceModel(BaseInput).EquipmentItem.UpdateEquipmentStatusOfRequest(applnInp, requestIds);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertEquipmentReservationRequest")]
        public JsonResult InsertEquipmentReservationRequest(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn msgReturn = new MessageReturn();
                msgReturn = new SpaceModel(BaseInput).EquipmentItem.InsertEquipmentReservationRequest(applicationFormInput);
                var jsonResult = Json(msgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckConflictedEquipmentRequestExists")]
        public JsonResult CheckConflictedEquipmentRequestExists(string Input, string FromDate, string ToDate, int BookedForId, int SiteId, int BuildingId)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int intReturn = new SpaceModel(BaseInput).EquipmentItem.CheckConflictedEquipmentRequestExists(applicationFormInput, FromDate, ToDate, BookedForId, SiteId, BuildingId);
                var jsonResult = Json(intReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetEquipmentsForReservationSearch")]
        public JsonResult GetEquipmentsForReservationSearch(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn defaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetEquipmentsForReservationSearch(applnInp);
                var jsonResult = Json(defaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateEquipmentReservationRequest")]
        public JsonResult UpdateEquipmentReservationRequest(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn msgReturn = new SpaceModel(BaseInput).EquipmentItem.UpdateEquipmentReservationRequest(applnInp);
                var jsonResult = Json(msgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("IsEquipmentEditPossible")]
        public JsonResult IsEquipmentEditPossible(string[] RequestIds, bool IsActive)
        {
            try
            {
                bool blnReturn = new SpaceModel(BaseInput).EquipmentItem.IsEquipmentEditPossible(RequestIds, IsActive);
                var jsonResult = Json(blnReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdateEquipmentReservation")]
        public JsonResult InsertUpdateEquipmentReservation(string Input, string ConflictInput, string FromDate, string ToDate, int BookedForId, int SiteId, int BuildingId, int Target)
        {
            ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            ApplicationFormInput conflictFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(ConflictInput);
            MessageReturn msgReturn = new MessageReturn();
            msgReturn = new SpaceModel(BaseInput).EquipmentItem.InsertUpdateEquipmentReservation(applicationFormInput, conflictFormInput, FromDate, ToDate, BookedForId, SiteId, BuildingId, Target);
            var jsonResult = Json(msgReturn.ServerId, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [ActionName("GetCurrentTimeOfSite")]
        public JsonResult GetCurrentTimeOfSite(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new SpaceModel(BaseInput).EquipmentItem.GetCurrentTimeOfSite(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetReservationsForSpaceIds")]
        public JsonResult GetReservationsForSpaceIds(int SpaceId)
        {
            try
            {
                string strReturn = new SpaceModel(BaseInput).SpaceItem.GetReservationsForSpaceIds(SpaceId);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetAllSpaceDetailsAnalytics")]
        public JsonResult GetAllSpaceDetailsAnalytics(string Input, string DrawingIds, int ModuleId, int AnalyticsType, string ColumnName)
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
                    string strReturn = new SpaceModel(BaseInput).SpaceItem.GetAllSpaceDetailsAnalytics(applnInp,DrawingIds, ModuleId, AnalyticsType, ColumnName);
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

        [ActionName("IsEquipmentCheckInCheckOutPossible")]
        public JsonResult IsEquipmentCheckInCheckOutPossible(int RequestId, DateTime FromDate, DateTime ToDate, bool IsCheckIn)
        {
            try
            {
                string strReturn = new SpaceModel(BaseInput).EquipmentItem.IsEquipmentCheckInCheckOutPossible(RequestId, FromDate, ToDate, IsCheckIn);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("InsertCAIArchive")]
        public JsonResult InsertCAIArchive(string Input,string[] DrawingIds)
        {
            try
            {
                MessageReturn msgReturn = new MessageReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int intReturn = new SpaceModel(BaseInput).SpaceItem.InsertCAIArchive(applnInp, DrawingIds);
                var jsonResult = Json(intReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetNextArchiveName")]
        public JsonResult GetNextArchiveName(string Input, int TypeId)
        {
            try
            {
                MessageReturn msgReturn = new MessageReturn();
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new SpaceModel(BaseInput).SpaceItem.GetNextArchiveName(applnInp, TypeId);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("IsMultipleCheckInCheckOutPossible")]
        public JsonResult IsMultipleCheckInCheckOutPossible(string Input, bool IsCheckIn)
        {
            try
            {
                List<CheckinCheckoutDetails> lstCheckinCheckoutDetails = JsonConvert.DeserializeObject<List<CheckinCheckoutDetails>>(Input);
                List<CheckinCheckoutDetails> lstReturn = new SpaceModel(BaseInput).SpaceItem.IsMultipleCheckInCheckOutPossible(lstCheckinCheckoutDetails, IsCheckIn);
                var jsonResult = Json(lstReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetArchiveList")]
        public JsonResult GetArchiveList(string Input,int typeId,int archiveId,DateTime fromDate,DateTime toDate )
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetArchiveList(applicationFormInput,typeId,archiveId,fromDate,toDate);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("CAIUpdateArchives")]
        public JsonResult CAIUpdateArchives(string Input, int typeId, int archiveId, DateTime fromDate, DateTime toDate)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMsgReturn = new SpaceModel(BaseInput).SpaceItem.CAIUpdateArchives(applicationFormInput, typeId, archiveId, fromDate, toDate);
                var jsonResult = Json(objMsgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        
        [ActionName("CAIUpdateBuildingArchives")]
        public JsonResult CAIUpdateBuildingArchives(string Input, int typeId, int archiveId, DateTime fromDate, DateTime toDate)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMsgReturn = new SpaceModel(BaseInput).SpaceItem.CAIUpdateBuildingArchives(applicationFormInput, typeId, archiveId, fromDate, toDate);
                var jsonResult = Json(objMsgReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("CheckOrphanSpaceDetails")]
        public JsonResult CheckOrphanSpaceDetails(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MultipleTablesReturn Return = new SpaceModel(BaseInput).SpaceItem.CheckOrphanSpaceDetails(applicationFormInput);
                var jsonResult = Json(Return, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetArchiveDrawingDetails")]
        public JsonResult GetArchiveDrawingDetails(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetArchiveDrawingDetails(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetAllArchiveSpaceDetails")]
        public JsonResult GetAllArchiveSpaceDetails(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetAllArchiveSpaceDetails(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetArchiveDisplaySettings")]
        public JsonResult GetArchiveDisplaySettings(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetArchiveDisplaySettings(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetArchivedSpaceLeaderlineDetails")]
        public JsonResult GetArchivedSpaceLeaderlineDetails(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new SpaceModel(BaseInput).SpaceItem.GetArchivedSpaceLeaderlineDetails(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetQueryBuilderSearchResultsAnalytics")]
        public JsonResult GetQueryBuilderSearchResultsAnalytics(string Input, int TargetId, int DrawingId, int AnalyticsType, string ColumnName)
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
                    string strReturn = new SpaceModel(BaseInput).SpaceItem.GetQueryBuilderSearchResultsAnalytics(applnInp, TargetId, DrawingId, AnalyticsType, ColumnName);
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
        [ActionName("CheckResourceinUse")]
        public JsonResult CheckResourceinUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new SpaceModel(BaseInput).SpaceItem.CheckResourceinUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetReservationUserRolesBasedSettings")]
        public JsonResult GetReservationUserRolesBasedSettings(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                DefaultApiReturn objDefaultApiReturn =  new SpaceModel(BaseInput).SpaceItem.GetReservationUserRolesBasedSettings(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetReservationsForMultipleSpaceIds")]
        public JsonResult GetReservationsForMultipleSpaceIds(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new SpaceModel(BaseInput).SpaceItem.GetReservationsForMultipleSpaceIds(applicationFormInput);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetMaximumHotelingSeatsForSpace")]
        public JsonResult GetMaximumHotelingSeatsForSpace(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                MessageReturn messageReturn = new MessageReturn();
                int MaximumCount = new SpaceModel(BaseInput).SpaceItem.GetMaximumHotelingSeatsForSpace(applnInp);
                var jsonResult = Json(MaximumCount, JsonRequestBehavior.AllowGet);
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
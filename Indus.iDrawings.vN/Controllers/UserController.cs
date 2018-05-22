using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Models;
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
    public class UserController : iDrawingsController
    {
        public UserController()
        {

        }

        // For Module Access update
        [ActionName("UpdateModuleAccess")]
        public JsonResult UpdateModuleAccess(string Input)
        {
            try
            {
                UserInput userInp = JsonConvert.DeserializeObject<UserInput>(Input);
                //UserInput inp = new UserInput();
                //inp.FormId = 85;
                //inp.UserIds = new String[] { "1", "2", "3" };
                //inp.selectedIds = new String[] { "6", "7", "8" };
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).UserItem.UpdateModuleAccess(userInp);
               // objMessageReturn = new CommonController().logError((objMessageReturn));
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        // For Report Access update
        [ActionName("UpdateReportAccessToUser")]
        public JsonResult UpdateReportAccessToUser(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).UserItem.UpdateReportAccessToUser(applicationFormInput);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOrganizationalUnitListForaSelectedUser")]
        public JsonResult GetOrganizationalUnitListForaSelectedUser(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new CommonModel(BaseInput).UserItem.GetOrganizationalUnitListForaSelectedUser(applnInp);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        // For Division Access update
        [ActionName("UpdateDivisionAccess")]
        public JsonResult UpdateDivisionAccess(string Input, bool IsDivisionAdmin)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).UserItem.UpdateDivisionAccess(applnInp, IsDivisionAdmin);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        
        [ActionName("UpdateDivisionAccessToManyUser")]
        public JsonResult UpdateDivisionAccessToManyUser(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).UserItem.UpdateDivisionAccessToManyUser(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        // For Module Admin Access update
        [ActionName("UpdateModuleAdminAccess")]
        public JsonResult UpdateModuleAdminAccess(string Input)
        {
            try
            {
                UserInput userInp = JsonConvert.DeserializeObject<UserInput>(Input);
                //UserInput inp = new UserInput();
                //inp.FormId = 85;
                //inp.UserIds = new String[] { "1", "2", "3" };
                //inp.selectedIds = new String[] { "6", "7", "8" };
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).UserItem.UpdateModuleAdminAccess(userInp);
               // objMessageReturn = new CommonController().logError((objMessageReturn));
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        // For Division Admin Access update
        [ActionName("UpdateDivisionAdminAccess")]
        public JsonResult UpdateDivisionAdminAccess(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).UserItem.UpdateDivisionAdminAccess(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetMaxWorkOrderUserCreated")]
        public JsonResult GetMaxWorkOrderUserCreated()
        {
            try
            {
                int returnVal = new CommonModel(BaseInput).UserItem.GetMaxWorkOrderUserCreated();
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetMaxUserCreated")]
        public JsonResult GetMaxUserCreated()
        {
            try
            {
                int returnVal = new CommonModel(BaseInput).UserItem.GetMaxUserCreated();
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetMaxUserandWOCreated")]
        public JsonResult GetMaxUserandWOCreated()
        {
            try
            {
                var maxUser = GetMaxUserCreated();
                var maxWOUSer = GetMaxWorkOrderUserCreated();
                var createdMaxUser = new { maxUser = ((System.Web.Mvc.JsonResult)maxUser.Data).Data, maxWOUSer = ((System.Web.Mvc.JsonResult)maxWOUSer.Data).Data };
                var jsonResult = Json(createdMaxUser, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("GetUserListForUserRole")]
        public JsonResult GetUserListForUserRole(int UserRoleId, int selectedUserId)
        {
            try
            {
                List<UserList> lstUser = new CommonModel(BaseInput).UserItem.GetUserListForUserRole(UserRoleId, selectedUserId);
                var jsonResult = Json(lstUser, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetAccessTemplatesForUserRole")]
        public JsonResult GetAccessTemplatesForUserRole(int UserRoleId)
        {
            try
            {
                List<AccessTemplates> lstAccessTemplate = new CommonModel(BaseInput).UserItem.GetAccessTemplatesForUserRole(UserRoleId);
                var jsonResult = Json(lstAccessTemplate, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("InsertUser")]
        public JsonResult InsertUser(string Input)
        {
            try
            {
                ApplicationFormInput userInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn UserReturn = new MessageReturn();
                UserReturn = new CommonModel(BaseInput).UserItem.InsertUser(userInp);
               // UserReturn = new CommonController().logError((UserReturn));
                var jsonResult = Json(UserReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckLoginNameAvailability")]
        public JsonResult CheckLoginNameAvailability(string LoginName)
        {
            try
            {
                TypeValidation typeVal = new TypeValidation();
                bool blnReturn = typeVal.checkWhiteList(LoginName,6);
                if (blnReturn == false)
                {
                    throw new Exception();
                }

                int IsAvailable = new CommonModel(BaseInput).UserItem.CheckLoginNameAvailability(LoginName);
                var jsonResult = Json(IsAvailable, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("CheckUserGroupInUse")]
        public JsonResult CheckUserGroupInUse(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int IsInUse = new CommonModel(BaseInput).UserItem.CheckUserGroupInUse(applnInp);
                var jsonResult = Json(IsInUse, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckdomainValidations")]
        public JsonResult CheckdomainValidations(string Email)
        {
            try
            {
                bool returnVal = new CommonModel(BaseInput).UserItem.CheckdomainValidations(Email);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetResetPasswordDetails")]
        public JsonResult GetResetPasswordDetails(int LoginUserId)
        {
            try
            {
                ResetPasswordDetails objReset = new CommonModel(BaseInput).ResetPasswordItem.GetResetPasswordDetails(LoginUserId);
                var jsonResult = Json(objReset, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("ResetPasswordUserList")]
        public JsonResult ResetPasswordUserList(string Input)
        {
            try
            {
                ApplicationFormInput userInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).ResetPasswordItem.ResetPasswordUserList(userInp);
               // objMessageReturn = new CommonController().logError((objMessageReturn));
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetPasswordHistory")]
        public JsonResult GetPasswordHistory()
        {
            try
            {
                string strVal = new CommonModel(BaseInput).ResetPasswordItem.GetPasswordHistory();
                var jsonResult = Json(strVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetPasswordPolicy")]
        public JsonResult GetPasswordPolicy()
        {
            try
            {
                string strVal = new CommonModel(BaseInput).ResetPasswordItem.GetPasswordPolicy();
                var jsonResult = Json(strVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUserDetails")]
        public JsonResult GetUserDetails(string Input)
        {
            try
            {
                ApplicationFormInput userInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strVal = new CommonModel(BaseInput).ResetPasswordItem.GetUserDetails(userInp);
                var jsonResult = Json(strVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ResetpasswordAndSendEmail")]
        public JsonResult ResetpasswordAndSendEmail(string selectedUserId)
        {
            try
            {
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).ResetPasswordItem.ResetpasswordAndSendEmail(Convert.ToInt32( selectedUserId));
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetPasswordChangePossible")]
        public JsonResult GetPasswordChangePossible(int selUserId)
        {
            try
            {
                int IsPossible = new CommonModel(BaseInput).UserItem.GetPasswordChangePossible(selUserId);
                var jsonResult = Json(IsPossible, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDrawingAccessDetails")]
        public JsonResult GetDrawingAccessDetails(string selectedUserId, string ModuleId)
        {
            try
            {
                MultipleTablesReturn returnTable = new CommonModel(BaseInput).UserItem.GetDrawingAccessDetails(Convert.ToInt32( selectedUserId),Convert.ToInt32( ModuleId));
                var jsonResult = Json(returnTable, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("AllocateDrawingsForUser")]
        public JsonResult AllocateDrawingsForUser(string Input, string ModuleId)
        {
            try
            {
                ApplicationFormInput userInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).UserItem.AllocateDrawingsForUser(userInp,Convert.ToInt32( ModuleId));
               // objMessageReturn = new CommonController().logError((objMessageReturn));
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetBaseOrganizationUsers")]
        public JsonResult GetBaseOrganizationUsers(int OrganizationalUnitId)
        {
            try
            {
                int[] arrUsers = new CommonModel(BaseInput).UserItem.GetBaseOrganizationUsers(OrganizationalUnitId);
                var jsonResult = Json(arrUsers, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateMultipleUserData")]
        public JsonResult UpdateMultipleUserData(string Input, int ReportField, string NewValue)
        {
            try
            {
                ApplicationFormInput userInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new CommonModel(BaseInput).UserItem.UpdateMultipleUserData(userInp, ReportField, NewValue);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetUserListAnalytics")]
        public JsonResult GetUserListAnalytics(string Input, int AnalyticsType, string ColumnName)
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
                    string strReturn = new CommonModel(BaseInput).UserItem.GetUserListAnalytics(applnInp, AnalyticsType, ColumnName);
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
    }
}
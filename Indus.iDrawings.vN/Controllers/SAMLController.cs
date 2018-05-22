using ComponentSpace.SAML2;
using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Models;
using Indus.iDrawings.Common.Models.Items.User;
using Indus.iDrawings.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Indus.iDrawings.vN.Controllers
{
    public class SAMLController : Controller
    {
        private ApplicationUserManager _userManager;
        public async Task<ActionResult> AssertionConsumerService()
        {
            InsertLogToDB("SAMLController class Initiated.");
            InsertLogToDB("=============================================");
            InsertLogToDB("AssertionConsumerService method is called.");
            bool isInResponseTo = false;
            string partnerIdP = null;
            string userName = null;
            // string name = null;
            string SAMAccountName = null;
            iDrawingsDomainUser domainUser = new iDrawingsDomainUser();

            domainUser.FirstName = "FirstName";
            domainUser.LastName = "LastName";
            domainUser.MiddleName = "MiddleName";
            InsertLogToDB("FirstName , lastName , MiddleName are set with default values.");
            IDictionary<string, string> attributes = null;
            string targetUrl = null;
            InsertLogToDB("Before calling ReceiveSSO method");
            SAMLServiceProvider.ReceiveSSO(Request, out isInResponseTo, out partnerIdP, out userName, out attributes, out targetUrl);
            InsertLogToDB("ReceiveSSO method successfully called.");
            InsertLogToDB("ReceiveSSO return following values.");
            InsertLogToDB("isInResponseTo  = " + isInResponseTo + "  " + "  partnerIdP = " + partnerIdP + "  userName = " + userName + "  targetUrl = " + targetUrl);
            string Logdata = string.Empty;
            string attributedata = string.Empty;
            try
            {
                foreach (var item in attributes)
                {
                    attributedata = attributedata + Environment.NewLine + item.Key + " : " + ((item.Value != null) ? item.Value : " ") + Environment.NewLine;
                    InsertLogToDB("Attribute  =  " + item.Key);

                    if (LdapAttribute.GivenName.Contains(item.Key, StringComparer.OrdinalIgnoreCase))
                    {
                        InsertLogToDB("FirstName  :  " + item.Value);
                        domainUser.FirstName = item.Value;
                    }

                    if (LdapAttribute.Surname.Contains(item.Key, StringComparer.OrdinalIgnoreCase))
                    {
                        InsertLogToDB("LastName  :  " + item.Value);
                        domainUser.LastName = item.Value;
                    }

                    if (LdapAttribute.Initials.Contains(item.Key, StringComparer.OrdinalIgnoreCase))
                    {
                        InsertLogToDB("MiddleName  :  " + item.Value);
                        domainUser.MiddleName = item.Value;
                    }

                    if (LdapAttribute.Email.Contains(item.Key, StringComparer.OrdinalIgnoreCase))
                    {
                        InsertLogToDB("Email  :  " + item.Value);
                        domainUser.Email = item.Value;
                        domainUser.LoginName = item.Value;

                    }

                    if (LdapAttribute.TelephoneNumber.Contains(item.Key, StringComparer.OrdinalIgnoreCase))
                    {
                        InsertLogToDB("PhoneNo1  :  " + item.Value);
                        domainUser.PhoneNo1 = item.Value;
                    }
                    if (LdapAttribute.SAMAccountName.Contains(item.Key, StringComparer.OrdinalIgnoreCase))
                    {
                        InsertLogToDB("SAMAccountName  :  " + item.Value);
                        SAMAccountName = item.Value;
                    }

                    if (LdapAttribute.UserPrincipalName.Contains(item.Key, StringComparer.OrdinalIgnoreCase))
                    {
                        if (!String.IsNullOrEmpty(item.Value))
                        {
                            InsertLogToDB("LoginName  (UPN):  " + item.Value);
                           // domainUser.LoginName = item.Value;
                            try
                            {
                                string[] values = item.Value.Split('@');
                                InsertLogToDB("DomainName  :  " + values[1]);
                                domainUser.DomainName = values[1];

                            }
                            catch (Exception exc)
                            {

                            }
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                InsertLogToDB("Exception 01:" + ex.Message + ex.InnerException);
            }
            // Automatically login using the asserted identity.

            if (string.IsNullOrEmpty(domainUser.LoginName))
            {
                if (string.IsNullOrEmpty(SAMAccountName))
                {

                    if (!string.IsNullOrEmpty(userName))
                    {
                       // domainUser.LoginName = userName;
                    }
                }
                else
                {
                   // domainUser.LoginName = SAMAccountName;
                }
            }

            InsertLogToDB("Final LoinName = " + domainUser.LoginName);
            var user = await PIndusUserManager.FindByName(domainUser.LoginName, Session.SessionID);

            try
            {
                if (user != null)
                {
                    try
                    {
                        InsertLogToDB("Existing User Found. User Id = " + user.Id);
                        domainUser.UserId = Convert.ToInt32(user.Id);
                        InsertLogToDB("Before updating Domain User Data.");
                        InsertLogToDB("Calling UpdateDomainUserData method.");
                        int returnValue = new UserItem(new Utils.BaseClassInput()).UpdateDomainUserData(domainUser);
                        InsertLogToDB(" UpdateDomainUserData method successfully called. Return value = "+ returnValue);
                       
                    }
                    catch (Exception exe)
                    {
                        InsertLogToDB("Exception 02: "+exe.Message+exe.InnerException);
                    }
                    PIndusUserManager.InsertUserSessionDetails(domainUser.UserId, Session.SessionID.ToString(), IPAddress, 0, null, UserAgent);
                    InsertLogToDB("InsertUserSessionDetails called , User SessionDetails inserted.");
                    AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = true }, await user.GenerateUserIdentityAsync(PIndusUserManager));
                    InsertLogToDB("AuthenticationManager.SignIn called.");
                    Session["UserId"] = user.Id;
                    // Session["IPAddress"] = IPAddress;
                }
                else
                {
                    InsertLogToDB("Not an iDrawings Existing User. user = "+ user);
                    InsertLogToDB("Setting default values to Domain user");
                    domainUser.LoginPassword = System.Web.Security.Membership.GeneratePassword(96, 25);
                    domainUser.AccountActivationDate = DateTime.Now;
                    domainUser.AccountExpiryDate = domainUser.AccountActivationDate.AddYears(1);
                    domainUser.IsCACUser = false;
                    domainUser.CACNo = null;
                    domainUser.UserRoleId = 8;  //work order user 4- Facility user
                    domainUser.ExistingUserId = 0;
                    domainUser.AccessTemplateId = 0;
                    domainUser.DWGAccess = true;
                    domainUser.AddedBy = 1;
                    domainUser.ResetPasswordOnNextLogon = false;
                    domainUser.GUId = null;
                    domainUser.IsADUser = true;
                    domainUser.UserAccountLevelId = 0;
                    domainUser.Sites = string.Empty;
                    InsertLogToDB("FirstName = "+domainUser.FirstName+"  LastName = "+domainUser.LastName+"  MiddleName = "+domainUser.MiddleName+"  Email = "+domainUser.Email+"  LoginPassword = "+ domainUser.LoginPassword + "  AccountActivationDate = "+ domainUser.AccountActivationDate+
                        "  AccountExpiryDate = "+ domainUser.AccountExpiryDate+ "  IsCACUser = "+ domainUser.IsCACUser+ "  CACNo = " + domainUser.CACNo+
                        "  UserRoleId = " + domainUser.UserRoleId+ "  ExistingUserId = "+domainUser.ExistingUserId+ "  AccessTemplateId = "+domainUser.AccessTemplateId+
                        "  AccessTemplateId = "+domainUser.AccessTemplateId+ "  DWGAccess = "+domainUser.DWGAccess+ "  AddedBy = "+domainUser.AddedBy+ "  ResetPasswordOnNextLogon = "+domainUser.ResetPasswordOnNextLogon+
                        "  GUId = "+domainUser.GUId+ "  IsADUser = "+domainUser.IsADUser+ "  UserAccountLevelId = "+domainUser.UserAccountLevelId+ "  Sites = "+domainUser.Sites
                        );

                    InsertLogToDB("All default domain user values set on domainuser");

                    InsertLogToDB("Before ccalling CreateNewDomainUser method.");

                    int returnValue = new UserItem(new Utils.BaseClassInput()).CreateNewDomainUser(domainUser);
                    InsertLogToDB("CreateNewDomainUser method called , return value = "+ returnValue);
                    if (returnValue >= 0)
                    {
                        InsertLogToDB("Domain user SUCCESSFULLY added in iDrawings DB");
                        user = await PIndusUserManager.FindByName(domainUser.LoginName, Session.SessionID);
                        InsertLogToDB("Newly added user's Id = "+ user.Id);
                        PIndusUserManager.InsertUserSessionDetails(Convert.ToInt32(user.Id), Session.SessionID.ToString(), IPAddress, 0, null, UserAgent);
                        InsertLogToDB("User SessionDetails successfully added");
                        InsertLogToDB("Before calling AuthenticationManager.SignIn method.");
                        AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = true }, await user.GenerateUserIdentityAsync(PIndusUserManager));
                        InsertLogToDB("AuthenticationManager.SignIn method successfully called.");
                        Session["UserId"] = user.Id;

                    }
                }
                //Redirect to the target URL if supplied.
                if (!string.IsNullOrEmpty(targetUrl))
                {
                    return Redirect(targetUrl);
                }
            }
            catch (Exception ex)
            {
                InsertLogToDB("Exception 03 : "+ex.Message+ex.InnerException);
            }

            //  return await System.Threading.Tasks.Task.Run(() => RedirectToAction("Index", "Home")) ;
            //  return Redirect("https://cs.test/iDrawingsV6/");
            if (user == null)
            {
                InsertLogToDB("Can't Find the user information !!!!!    user = null");
                InsertLogToDB("Redirecting to : https://www.login.cfpb.com/iDrawings/");
                InsertLogToDB("================= Issue with SAMLController,Can't find the user,user == null =================");
               // return Redirect("https://www.login.cfpb.com/iDrawings/");
                return RedirectToAction("SSOLogin", "Account");
            }
            else
            {
                InsertLogToDB("Successfully retunr from SAMLController to Index page in HomeController");

                InsertLogToDB("================= Successfully return from SAMLController =================");
                //return RedirectToLocal("");
                //return RedirectToAction("Login", "Account");
                return RedirectToAction("Index", "Home");
            }

            //return new EmptyResult();
            //return View("~/Views/Home/Index.cshtml");

        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            string baseUrl = Request.Url.GetLeftPart(UriPartial.Authority) + Request.ApplicationPath + '/';
            return Redirect(baseUrl);
            //return View("~/Views/Home/Index.cshtml");            
        }

        public ActionResult SLOService()
        {
            InsertLog("SLOService called ");
            bool isRequest = false;
            string logoutReason = null;
            string partnerIdP = null;
            string relayState = null;
            SAMLServiceProvider.ReceiveSLO(Request, out isRequest, out logoutReason, out partnerIdP, out relayState);
            InsertLog("SLOService called "+ "IsRequest = "+isRequest+ "  logoutReason = "+ logoutReason+ "   partnerIdP = "+ partnerIdP+ "  relayState = "+ relayState); 
            if (isRequest)
            {
                // Logout locally.
                HttpContext.GetOwinContext().Authentication.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

                // Respond to the IdP-initiated SLO request indicating successful logout.
                InsertLog("SendSLO called");
                SAMLServiceProvider.SendSLO(Response, null);
            }
            else
            {
                // SP-initiated SLO has completed.
                return RedirectToAction("Index", "Home");
            }

            return new EmptyResult();
        }
        Indus.iDrawings.Security.IdentityManagement.ApplicationUserManager userManager;
        public Indus.iDrawings.Security.IdentityManagement.ApplicationUserManager PIndusUserManager
        {
            get
            {
                return userManager ?? HttpContext.GetOwinContext().GetUserManager<Indus.iDrawings.Security.IdentityManagement.ApplicationUserManager>();
            }
            private set
            {
                userManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }
        public string IPAddress
        {
            get
            {
                return (Request.ServerVariables["HTTP_X_FORWARDED_FOR"] == null || Request.ServerVariables["HTTP_X_FORWARDED_FOR"] == "") ? Request.ServerVariables["REMOTE_ADDR"] : Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            }
        }
        public string UserAgent
        {
            get
            {
                return Request.UserAgent;
            }
        }

        public static void InsertLog(string Message)
        {
            try
            {
                if (System.IO.File.Exists(@"C:\iDrawingsLogs\SSOLog.txt"))
                {
                    System.IO.File.AppendAllText(@"C:\iDrawingsLogs\SSOLog.txt", Environment.NewLine + " "+DateTime.Now.ToString()+"    "+ Message);
                }
                else
                {
                    System.IO.File.Create(@"C:\iDrawingsLogs\SSOLog.txt");
                    System.IO.File.AppendAllText(@"C:\iDrawingsLogs\SSOLog.txt", Environment.NewLine +" "+ DateTime.Now.ToString() + "    " + Message);
                }

            }
            catch (Exception)
            {

                //throw;
            }

        }
        public void InsertLogToDB(string message)
        {
            InsertLog(message);
            //new CommonModel(BaseInput).ApplicationFormItem.Extented.InsertErrorMessages(message);
        }
        
    }
}
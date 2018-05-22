using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Indus.iDrawings.vN.Models;
using Indus.iDrawings.Models;
using Indus.iDrawings.Security;
using System.Data;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Common.Models;
using Indus.iDrawings.Common.Data;
using System.Text.RegularExpressions;
using ComponentSpace.SAML2;
using System.Web.Configuration;
using Indus.iDrawings.Common;
using System.Web.UI;
using Indus.iDrawings.Utils.Security.Validation;
using System.Collections.Generic;

namespace Indus.iDrawings.vN.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private string ResMessage = "";

        public AccountController()
        {
        }

        public AccountController(Indus.iDrawings.Security.IdentityManagement.ApplicationUserManager userManager)
        {
            PIndusUserManager = userManager;
           // SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set 
            { 
                _signInManager = value; 
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

        //
        // GET: /Account/Login
        [AllowAnonymous]
        [OutputCache(NoStore = true, Location = OutputCacheLocation.None)]
        public ActionResult Login(string returnUrl = "")
         {
            bool isSSOEnabled = Convert.ToBoolean( WebConfigurationManager.AppSettings["IsSSOEnabled"]);
            if (!isSSOEnabled)
            {
                  Session.Abandon();
           Response.Cookies["ASP.NET_SessionId"].Expires = DateTime.Now.AddMonths(-20);
           Response.Expires = -1;
           ViewBag.ReturnUrl = returnUrl;
           LoginViewModel log = new LoginViewModel();
           Security.Cryptography.IndusHasher indusHasher = new Security.Cryptography.IndusHasher();
           log.RSA_E = indusHasher.GetRSA_E();
           log.RSA_M = indusHasher.GetRSA_M();
             return View(log);
            }
            else
            {
                InsertLogToDB("Login called");
                var identity = new ClaimsIdentity();
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                        (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });
                if (SAMLServiceProvider.IsSSO())
                {
                    // Request logout at the identity provider.
                    InsertLogToDB("Before caclling InitiateSLO");
                    SAMLServiceProvider.InitiateSLO(Response, null, null);
                    InsertLogToDB("InitiateSLO method called from LogOff method , Response = " + Response);
                    return new EmptyResult();
                }
                return RedirectToAction("SSOLogin", "Account");
            }
   
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            try
            {
            model.ErrorMessage = "";
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            Response.Expires = -1;
            Security.Cryptography.IndusHasher indusHasher = new Security.Cryptography.IndusHasher();
            string password = indusHasher.GetRSADecryptText(model.Password); //rsa.Decrypt(model.Password);
                TypeValidation typeVal = new TypeValidation();
                if (!typeVal.checkWhiteList(model.UserName, 6)) //|| !typeVal.checkWhiteList(password, 6))
                {
                    throw new Exception();
                }
                else
                {
                    var user = PIndusUserManager.LoginUser(new Indus.iDrawings.Security.IdentityManagement.UserIdentifier { Username = model.UserName, EncrytedPassword = Indus.iDrawings.Security.Cryptography.IndusHasher.GetSHA512FIPS(password) }, IPAddress, MachineName);

                    UserLoginStatus loginstatus = (UserLoginStatus)user.Status;
                    DataTable dataTable = PIndusUserManager.GetUserDetailswithLoginName(model.UserName);
                    if (dataTable.Rows.Count != 0)
                    {
                        if (dataTable.Rows[0][11].ToString() == "True" && (int)loginstatus == 1)
                        {
                            user.Status = 11;
                            loginstatus = (UserLoginStatus)user.Status;
                        }
                    }
                    if (dataTable.Rows.Count != 0)
                    {
                        CheckUserPostAuthentication(dataTable.Rows[0], password, ref loginstatus);
                    }

                    model.loginStatus = (int)loginstatus;
                    switch (loginstatus)
                    {
                        case UserLoginStatus.Success:
                            await SignInAsync(user, model.RememberMe);

                            string RemoteHost = string.Empty;
                            string RemoteAddress = string.Empty;
                            string ClientIP = string.Empty;
                            string ForwardedIP = string.Empty;
                            string Protocol = string.Empty;
                            string Port = string.Empty;

                            if (Request.ServerVariables["REMOTE_HOST"] != null)
                            {
                                RemoteHost = Request.ServerVariables["REMOTE_HOST"];
                            }

                            if (Request.ServerVariables["REMOTE_ADDR"] != null)
                            {
                                RemoteAddress = Request.ServerVariables["REMOTE_ADDR"];
                            }

                            if (Request.ServerVariables["HTTP_CLIENT_IP"] != null)
                            {
                                ClientIP = Request.ServerVariables["HTTP_CLIENT_IP"];
                            }

                            if (Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null)
                            {
                                ForwardedIP = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                            }

                            if (Request.RequestContext.HttpContext.Request.Headers.GetValues("X-Forwarded-Proto") != null)
                            {
                                if(Request.RequestContext.HttpContext.Request.Headers.GetValues("X-Forwarded-Proto").Length>0)
                                    Protocol = Request.RequestContext.HttpContext.Request.Headers.GetValues("X-Forwarded-Proto")[0];
                            }

                            if (Request.RequestContext.HttpContext.Request.Headers.GetValues("X-Forwarded-Port") != null)
                            {
                                if (Request.RequestContext.HttpContext.Request.Headers.GetValues("X-Forwarded-Proto").Length > 0)
                                    Protocol = Request.RequestContext.HttpContext.Request.Headers.GetValues("X-Forwarded-Port")[0];
                            }
                            PIndusUserManager.AddUserDevices(user.UserId, RemoteHost, RemoteAddress, ClientIP, ForwardedIP, Protocol, Port);

                            RemoveTxHostApp(user.UserId.ToString());
                            return RedirectToLocal("");
                        case UserLoginStatus.InvalidCredential:
                            ModelState.AddModelError("", "Incorrect Login Name or Password. Try again");
                            model.ErrorMessage = "Incorrect Login Name or Password. Try again";
                            return View(model);
                        case UserLoginStatus.UserAccountLocked:
                            int lockPeriod = 0;
                            try
                            {

                                lockPeriod = int.Parse(dataTable.Rows[0]["UnLockPeriod"].ToString());
                            }
                            catch (Exception)
                            {

                                ModelState.AddModelError("", "Your account is locked. Please contact the Administrator.");
                                model.ErrorMessage = "Your account is locked. Please contact the Administrator.";
                            }
                            if (lockPeriod > 0)
                            {
                                ModelState.AddModelError("", "Your account has been temporarily locked due to " +
                                                    "repeated invalid attempts. Please try after " + GetHourMinutesFromMinutes(lockPeriod));
                                model.ErrorMessage = "Your account has been temporarily locked due to " +
                                                    "repeated invalid attempts. Please try after " + GetHourMinutesFromMinutes(lockPeriod);
                            }
                            else
                            {
                                ModelState.AddModelError("", "Your account is locked. Please contact the Administrator.");
                                model.ErrorMessage = "Your account is locked. Please contact the Administrator.";
                            }                                
                            // return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                            return View(model);
                        case UserLoginStatus.CustomerAccountBlocked:
                            ModelState.AddModelError("", "Your Organization is blocked from logging in!!");
                            model.ErrorMessage = "Your Organization is blocked from logging in!!";
                            return View(model);
                        //break;
                        case UserLoginStatus.CustomerAccountExpired:
                            ModelState.AddModelError("", "Your Organization's account has expired!!");
                            model.ErrorMessage = "Your Organization's account has expired!!";
                            return View(model);
                        case UserLoginStatus.UserAccountNotActivated:
                            ModelState.AddModelError("", "Your Login not activated!!");
                            model.ErrorMessage = "Your Login not activated!!";
                            return View(model);
                        case UserLoginStatus.UserAccountBlocked:
                            ModelState.AddModelError("", "You are blocked from logging in!!");
                            model.ErrorMessage = "You are blocked from logging in!!";
                            return View(model);
                        case UserLoginStatus.UserAccountExpired:
                            ModelState.AddModelError("", "Your Login expired!!");
                            model.ErrorMessage = "Your Login expired!!";
                            return View(model);
                        case UserLoginStatus.PasswordExpired:                          
                        /*ModelState.AddModelError("", "Your Password expired!!");
                        return View(model);
                        await SignInAsync(user, model.RememberMe);
                        return RedirectToLocal("");*/
                        case UserLoginStatus.ChangePasswordOnFirstLogin:
                        case UserLoginStatus.PasswordRequirementDoesntMeet:
                            if (user.Status == 2)
                            {
                                ModelState.AddModelError("", "Incorrect Login Name or Password. Try again");
                                model.ErrorMessage = "Incorrect Login Name or Password. Try again";
                                model.loginStatus = 2;
                            }
                            else if(user.Status == 3)
                            {
                                int lockPerd = int.Parse(dataTable.Rows[0]["UnLockPeriod"].ToString());
                                ModelState.AddModelError("", "Your account has been temporarily locked due to " +
                                                "repeated invalid attempts. Please try after " + GetHourMinutesFromMinutes(lockPerd));
                                model.ErrorMessage = "Your account has been temporarily locked due to " +
                                                "repeated invalid attempts. Please try after " + GetHourMinutesFromMinutes(lockPerd);
                                model.loginStatus = 3;
                            }                           
                            else
                            {
                                int id = Convert.ToInt32(dataTable.Rows[0][0].ToString());
                                int customerid = Convert.ToInt32(dataTable.Rows[0][8].ToString());
                                DataTable DTPassword = PIndusUserManager.GetPasswordPolicyDetails(customerid);
                                model.Passwordlength = 8;
                                if (DTPassword.Rows.Count > 0)
                                {
                                    if (DTPassword.Rows[0]["Minimum length of the password"].ToString().Length > 0)
                                    {
                                        model.Passwordlength = Int32.Parse(DTPassword.Rows[0]["Minimum length of the password"].ToString());
                                    }
                                }
                                if (loginstatus == UserLoginStatus.PasswordExpired)
                                {
                                    ModelState.AddModelError("", "Your password has been expired. Please change your password");
                                    model.ErrorMessage = "Your password has been expired. Please change your password";
                                }
                            }
                            //model.Passwordlength = Int32.Parse(DTPassword.Rows[0]["Minimum length of the password"].ToString());
                            return View(model);
                        case UserLoginStatus.MaxLoginExceded:
                            ModelState.AddModelError("", "Maximum allowed concurrent users are already logged in");
                            model.ErrorMessage = "Maximum allowed concurrent users are already logged in";
                            return View(model);
                        case UserLoginStatus.DeviceAccessDenied:
                            ModelState.AddModelError("", "You do not have access permission for this device");
                            model.ErrorMessage = "You do not have access permission for this device";
                            return View(model);
                        case UserLoginStatus.MaxRoleSpecificLoginExceded:
                            ModelState.AddModelError("", "Maximum allowed concurrent users for this role are already logged in");
                            model.ErrorMessage = "Maximum allowed concurrent users for this role are already logged in";
                            return View(model);
                        case UserLoginStatus.SiteAdministratorNotSubscribed:
                            ModelState.AddModelError("", "Site Administrator feature is not subscribed, cannot login");
                            model.ErrorMessage = "Site Administrator feature is not subscribed, cannot login";
                            return View(model);
                        default:
                            ModelState.AddModelError("", "Invalid login attempt.");
                            model.ErrorMessage = "Invalid login attempt.";
                            return View(model);
                    }
                }
            }
            catch(Exception ex)
            {
                ModelState.AddModelError("", "Incorrect Login Name or Password. Try again");
                model.ErrorMessage = "Incorrect Login Name or Password. Try again";
                return View(model);
            }          
        }
        
        [HttpPost]
        [AllowAnonymous]
        public string GetAppTitle()
        {
            BaseClassInput baseInp = new BaseClassInput();
            string appTitle = new CommonModel(baseInp).ApplicationFormItem.Extented.GetApplicationTitle();
            return appTitle;
        }

        //
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync())
            {
                return View("Error");
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes. 
            // If a user enters incorrect codes for a specified amount of time then the user account 
            // will be locked out for a specified amount of time. 
            // You can configure the account lockout settings in IdentityConfig
            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent: model.RememberMe, rememberBrowser: model.RememberBrowser);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(model.ReturnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid code.");
                    return View(model);
            }
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }


        [AllowAnonymous]
        public ActionResult SSOLogin()
        {
            var identity = new ClaimsIdentity();
            InsertLogToDB("SSOLogin called");
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            InsertLogToDB("AuthenticationManager.SignOut called from LogOff method");
            AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                    (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });
            string RedirectURL = WebConfigurationManager.AppSettings["TrustedURL"];
            return Redirect(RedirectURL);
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                    
                    // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                    // Send an email with this link
                    // string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    // var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    // await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

                    return RedirectToAction("Index", "Home");
                }
                AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // GET: /Account/ForgotPassword
        //[AllowAnonymous]
        //public ActionResult ForgotPassword()
        //{
        //    return View();
        //}

        [AllowAnonymous]
        public PartialViewResult ForgotPassword()
        {
            ForgotPasswordViewModel forgotPasswordViewModel = new ForgotPasswordViewModel();
            return PartialView("ForgotPassword", forgotPasswordViewModel);
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.LoginName);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return View("ForgotPasswordConfirmation");
                }

                // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                // Send an email with this link
                // string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                // var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);		
                // await UserManager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + callbackUrl + "\">here</a>");
                // return RedirectToAction("ForgotPasswordConfirmation", "Account");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation(ForgotPasswordViewModel forgotPasswordViewModel)
        {           
            try
            {
                bool returnJson = false;

                if (ModelState.IsValid)
                {
                    ForgotPasswordDetails sendMailDetails = new ForgotPasswordDetails();
                    BaseClassInput baseInp = new BaseClassInput();
                    sendMailDetails = new CommonModel(baseInp).UserItem.GetForgotPasswordDetails(forgotPasswordViewModel.LoginName);
                    if (sendMailDetails.IsValidUser)
                    {
                        string randomPassword = new Indus.iDrawings.Utils.Crypto.Password().RandomPassword.GetRandomString();
                        string strRandomEncryptPassword = Indus.iDrawings.Security.Cryptography.IndusHasher.GetSHA512FIPS(randomPassword);
                        if (sendMailDetails.StatusId == 1 || sendMailDetails.UserRoleId == 0 || sendMailDetails.UserRoleId == 1)
                        {
                            Indus.iDrawings.Common.Entity.ApplicationFormInput appInp = new Indus.iDrawings.Common.Entity.ApplicationFormInput();
                            appInp.CustomerId = sendMailDetails.CustomerId;
                            appInp.UserId = sendMailDetails.UserId;
                            new UserDBContext().ResetPassword(appInp, 0, sendMailDetails.LoginName, strRandomEncryptPassword);
                        }
                        SendMailAsync(sendMailDetails, randomPassword);
                    }
                    returnJson = true;
                }
                else
                {
                    return PartialView("ForgotPassword", forgotPasswordViewModel);
                }
                return Json(returnJson, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //new Indus.iDrawings.LogServices.ErrorLog.ErrorMessages(new Indus.iDrawings.LogServices.ErrorLog.ErrorMessage { Message = ex.Message }).Add();
                return Json(new { Url = Url.Action("Information", "Information", new { id = "cmE4SEdVTWYyYTdJWDNwNlVPY09YZz09" }) });
            }
        }

        public async Task SendMailAsync(ForgotPasswordDetails sendMailDetails, string randomPassword)
        {
            await Task.Run(() =>
            {
                sendMail(sendMailDetails, randomPassword);
            });
        }
      
        [AllowAnonymous]
        public PartialViewResult ChangePassword(string txtLn, string pswrdLn)
        {
            TypeValidation typeVal = new TypeValidation();
            if (!typeVal.checkWhiteList(txtLn, 6) || !typeVal.checkWhiteList(pswrdLn, 6))
            {
                throw new Exception();
            }
            changePasswordViewModel ChangePassword = new changePasswordViewModel();
            Security.Cryptography.IndusHasher indusHasher = new Security.Cryptography.IndusHasher();
            ChangePassword.RSA_E = indusHasher.GetRSA_E();
            ChangePassword.RSA_M = indusHasher.GetRSA_M();            
            ChangePassword.LoginName = txtLn;
            ChangePassword.Passwordlength = pswrdLn;
            return PartialView("ChangePassword", ChangePassword);           
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult changePasswordConfirmation(changePasswordViewModel ChangePasswordViewModel)
        {
            try
            {
                TypeValidation typeVal = new TypeValidation();
                if (!typeVal.checkWhiteList(ChangePasswordViewModel.RSA_E, 6) || !typeVal.checkWhiteList(ChangePasswordViewModel.RSA_M, 6))
                {
                    throw new Exception();
                }

                Security.Cryptography.IndusHasher indusHasher = new Security.Cryptography.IndusHasher();
                ChangePasswordViewModel.CurrentPassword = (ChangePasswordViewModel.CurrentPassword != null) ? indusHasher.GetRSADecryptText(ChangePasswordViewModel.CurrentPassword) : "";
                ChangePasswordViewModel.Password = (ChangePasswordViewModel.Password != null) ? indusHasher.GetRSADecryptText(ChangePasswordViewModel.Password) : "";
                ChangePasswordViewModel.ConfirmPassword = (ChangePasswordViewModel.ConfirmPassword != null) ? indusHasher.GetRSADecryptText(ChangePasswordViewModel.ConfirmPassword) : "";
                if (ChangePasswordViewModel.Password != ChangePasswordViewModel.ConfirmPassword)
                    ModelState.AddModelError("ConfirmPassword", "New password and Confirm New password should be same.");
                if (ChangePasswordViewModel.Password.Length >= 100)
                    ModelState.AddModelError("Password", "The {0} must be at least {2} characters long.");

                /*if (!String.IsNullOrEmpty(General.CheckInvalidCharacterForSearchList(ChangePasswordViewModel.Passwordlength, "Length")))
                {
                    throw new Exception("Access Denied!");
                }


                string valid = "";
                SecurityValidations objSecurityValidations = new SecurityValidations();
                valid = objSecurityValidations.WhitelistFieldValidations(0, "New Password", ChangePasswordViewModel.Password, 1, 6, false);
                if (valid != "")
                    ModelState.AddModelError("Password", valid.Trim('#', '0'));
                valid = objSecurityValidations.WhitelistFieldValidations(0, "Confirm New Password", ChangePasswordViewModel.ConfirmPassword, 1, 6, false);
                if (valid != "")
                    ModelState.AddModelError("ConfirmPassword", valid.Trim('#', '0'));*/

                DataTable dataTable = PIndusUserManager.GetUserDetailswithLoginName(ChangePasswordViewModel.LoginName);
                string userid = dataTable.Rows[0][0].ToString();
                string customerid = dataTable.Rows[0][8].ToString();
                string strInvalidpaswdmsg = GetInVaildPasswordMsg(Convert.ToInt32(customerid), ChangePasswordViewModel.ConfirmPassword);
                if (strInvalidpaswdmsg != "")
                {
                    ModelState.AddModelError("Password", strInvalidpaswdmsg);
                }
                if (ModelState.IsValid)
                {
                   
                    string check = checkValidationsforLogin(ChangePasswordViewModel, Convert.ToInt32(userid), Convert.ToInt32(customerid));
                    if (check == "Password updated")
                    {
                        //this.Flash(check.ToString(), iDrawings.Common.FlashLevel.Success);
                        return Json(true, JsonRequestBehavior.AllowGet);
                    }
                    else if (check == "Current Password entered is not correct")
                    {
                        ModelState.AddModelError("CurrentPassword", check);                        
                        ChangePasswordViewModel.RSA_E = indusHasher.GetRSA_E();
                        ChangePasswordViewModel.RSA_M = indusHasher.GetRSA_M();
                        return PartialView("ChangePassword", ChangePasswordViewModel);
                    }
                    else
                    {                        
                        ModelState.AddModelError("Password", check);
                        ChangePasswordViewModel.RSA_E = indusHasher.GetRSA_E();
                        ChangePasswordViewModel.RSA_M = indusHasher.GetRSA_M();
                        return PartialView("ChangePassword", ChangePasswordViewModel);
                    }
                }
                else
                {
                    return PartialView("ChangePassword", ChangePasswordViewModel);
                }
            }
            catch (Exception ex)
            {
                return Json(new { Url = Url.Action("Information", "Information", new { id = "cmE4SEdVTWYyYTdJWDNwNlVPY09YZz09" }) });
            }
        }

        public string GetInVaildPasswordMsg(int customerid, string password)
        {
            string invalidPswdMsg = "";
            BaseClassInput baseInp = new BaseClassInput();
            PasswordSettings settings = new CommonModel(baseInp).UserItem.Passwordsettings(customerid);
            if (password.Length < settings.PasswordRequirements.Length)
            {
                invalidPswdMsg = "Your password must include at least " + settings.PasswordRequirements.Length + " characters";
            }
            if (settings.PasswordRequirements.IsUpperCaseCharacterMust && !(new System.Text.RegularExpressions.Regex("[A-Z]").Match(password).Success))
            {
                invalidPswdMsg = "Your password must include at least one uppercase letter ";
            }
            if (settings.PasswordRequirements.IsLowerCaseCharacterMust && !(new System.Text.RegularExpressions.Regex("[a-z]").Match(password).Success))
            {
                invalidPswdMsg = "Your password must include at least one lowercase letter";
            }
            if (settings.PasswordRequirements.IsNumericCharacterMust && !(new System.Text.RegularExpressions.Regex(@"\d").Match(password).Success))
            {
                invalidPswdMsg = "Your password must include at least one nmber";
            }
            if (settings.PasswordRequirements.IsNonAlphaNumericCharacterMust && !(new System.Text.RegularExpressions.Regex(@"[!,@,#,$,%,^,&,*,?,_,-,(,)]").Match(password).Success))
            {
                invalidPswdMsg = "Your password must include least one non alpha numeric letter";
            }
            return invalidPswdMsg;
        }

        public string checkValidationsforLogin(changePasswordViewModel ChangePasswordViewModel, int id, int customerid)
        {
            string messgae = "";
            if (ChangePasswordViewModel.LoginName.Length > 0 && ChangePasswordViewModel.CurrentPassword.Length > 0 && ChangePasswordViewModel.Password.Length > 0 && ChangePasswordViewModel.ConfirmPassword.Length > 0)
            {
                BaseClassInput inp = new BaseClassInput();
                UserDetails userdetails = new CommonModel(inp).UserItem.GetUserAccountDetails(id);
                PasswordSettings passwordsettings = new CommonModel(inp).UserItem.Passwordsettings(customerid);
                string passwordhistory = new CommonModel(inp).UserItem.GetPasswordHistory(id);
                messgae = CheckValidations(ChangePasswordViewModel, userdetails, passwordsettings, passwordhistory, id, customerid);
            }
            return messgae;
        }

        private string CheckValidations(changePasswordViewModel ChangePasswordViewModel, UserDetails userdetails, PasswordSettings passwordsettings, string passwordhistory, int Id, int customerid)
        {
            bool bln_pwdValidate = false, bln_currpwdValidate = false, bln_confpwd_validate = false;
            int Returnval = 10;

            if (checkPasswordValidation(ChangePasswordViewModel, passwordsettings, userdetails)) // Basic Validations
            {
                bln_currpwdValidate = ClientSideValidations(ChangePasswordViewModel.Password, "New Password", passwordsettings, passwordhistory); // Password Policy Validations               
                if (bln_currpwdValidate)
                {
                    bln_confpwd_validate = ClientSideValidations(ChangePasswordViewModel.ConfirmPassword, "Confirm Password", passwordsettings, passwordhistory); // Password Policy Validations
                }
                if (bln_currpwdValidate && bln_confpwd_validate)
                {
                    if (ResMessage.Length == 0)
                    {
                        if (ChangePasswordViewModel.Password.CompareTo(ChangePasswordViewModel.LoginName) == 0)
                        {
                            ResMessage = "Login name and login password should not be same.";
                        }
                        else
                        {
                            if (ChangePasswordViewModel.CurrentPassword != ChangePasswordViewModel.Password)
                            {
                                BaseClassInput inp = new BaseClassInput();
                                Returnval = new CommonModel(inp).UserItem.ChangePassword(customerid, Id, Indus.iDrawings.Security.Cryptography.IndusHasher.GetSHA512FIPS(ChangePasswordViewModel.Password));
                            }
                            else
                            {
                                Returnval = 0;
                            }
                            if (Returnval == 0)
                            {
                                ResMessage = "Password updated"; 
                                //Session.Abandon();                                
                            }
                            else if (Returnval == -2)
                            {
                                if (Convert.ToInt32(passwordsettings.RepeatIntervalCount) > 0)
                                {
                                    ResMessage = "New password should be different from " + Convert.ToInt32(passwordsettings.RepeatIntervalCount) + "  previous passwords";
                                }
                            }
                            else
                            {
                                ResMessage = "iDrawings encountered a problem while executing your command";
                            }
                        }
                    }
                }
            }
            return ResMessage;
        }

        private bool IsValidate = true;
        private bool ClientSideValidations(string pwd, string text, PasswordSettings passwordsettings, string passwordhistory)
        {
            var specialChars = new[] { '~', '`', '<', '>', '[', ']', '^' };
            bool hasCapitalLetters = false, hasSmallLetters = false, hasNumbers = false;
            if (pwd.Length > 0)
            {
                if (pwd.IndexOfAny("~`<>[]^".ToCharArray()) != -1)
                {
                    foreach (var specialChar in specialChars.Where(pwd.Contains))
                    {
                        ResMessage = (string.Format("Special character " + specialChar + " is not allowed in " + text));
                    }
                    IsValidate = false;
                }
            }
            else
            {
                ResMessage = "Enter " + text;
                IsValidate = false;
            }

            if (IsValidate)
            {
                if (pwd.Length < Int32.Parse(passwordsettings.PasswordRequirements.Length.ToString()))
                {
                    ResMessage = text + " requires minimum of " + passwordsettings.PasswordRequirements.Length + " characters";
                    IsValidate = false;
                }
            }
            if (IsValidate)
            {
                if (passwordsettings.PasswordRequirements.IsUpperCaseCharacterMust)
                {
                    hasCapitalLetters = !string.IsNullOrEmpty(pwd) && pwd.Any(c => char.IsUpper(c));
                    if (!hasCapitalLetters)
                    {
                        ResMessage = text + " requires at least one Upper Case character";
                        IsValidate = false;
                    }
                }
            }
            if (IsValidate)
            {
                if (passwordsettings.PasswordRequirements.IsLowerCaseCharacterMust)
                {
                    hasSmallLetters = !string.IsNullOrEmpty(pwd) && pwd.Any(c => char.IsLower(c));
                    if (!hasSmallLetters)
                    {
                        ResMessage = text + " requires at least one Lower Case character";
                        IsValidate = false;
                    }
                }
            }
            if (IsValidate)
            {
                if (passwordsettings.PasswordRequirements.IsNonAlphaNumericCharacterMust)
                {         // "[!@#$%^&*?_\\-()//\\[\\]]"       
                    var regexItem = new Regex("[!@#$%^&*?_\\-()//\\[\\]]");
                    if (!regexItem.IsMatch(pwd))
                    {
                        ResMessage = text + " requires at least one Special character and should not be at the beginning";
                        IsValidate = false;
                    }
                }
            }
            if (IsValidate)
            {
                if (passwordsettings.PasswordRequirements.IsNumericCharacterMust)
                {
                    var regexItem = new Regex("\\d");
                    if (!regexItem.IsMatch(pwd))
                    {
                        ResMessage = text + " requires at least one Number";
                        IsValidate = false;
                    }
                }
            }

            if (IsValidate)
            {
                if (Convert.ToInt32(passwordsettings.RepeatIntervalCount) > 0)
                {
                    if (passwordsettings.PasswordRequirements.IsCaseSensitive)
                    {
                        if (passwordhistory.IndexOf(pwd) > -1)
                        {
                            ResMessage = "New password should be different from " + Convert.ToInt32(passwordsettings.RepeatIntervalCount) + "  previous passwords";
                            IsValidate = false;
                        }
                    }
                    else
                    {
                        if (passwordhistory.ToLower().IndexOf(pwd.ToLower()) > -1)
                        {
                            ResMessage = "New password should be different from " + Convert.ToInt32(passwordsettings.RepeatIntervalCount) + "  previous passwords";
                            IsValidate = false;
                        }
                    }
                }
            }

            return IsValidate;
        }

        private bool checkPasswordValidation(changePasswordViewModel ChangePasswordViewModel, PasswordSettings passwordsettings, UserDetails userdetails)
        {
            bool g_isCaseSensitive = false;
            if (passwordsettings.PasswordRequirements.IsCaseSensitive)
            {
                g_isCaseSensitive = true;
            }
            if (ChangePasswordViewModel.Password.Length > 0)
            {
                if (ChangePasswordViewModel.CurrentPassword.Length > 0)
                {
                    if (g_isCaseSensitive)
                    {
                        if (userdetails.Password != Indus.iDrawings.Security.Cryptography.IndusHasher.GetSHA512FIPS(ChangePasswordViewModel.CurrentPassword))
                        {
                            if (userdetails.Password != Indus.iDrawings.Security.Cryptography.IndusHasher.GetSHA512FIPS(ChangePasswordViewModel.CurrentPassword.ToLower()))
                            {
                                ResMessage = "Current Password entered is not correct";
                            }
                        }
                    }
                    else
                    {
                        if (userdetails.Password != Indus.iDrawings.Security.Cryptography.IndusHasher.GetSHA512FIPS(ChangePasswordViewModel.CurrentPassword.ToLower()))
                        {
                            if ((userdetails.Password != Indus.iDrawings.Security.Cryptography.IndusHasher.GetSHA512FIPS(ChangePasswordViewModel.CurrentPassword)))
                            {
                                ResMessage = "Current Password entered is not correct";
                            }
                        }
                    }
                }
                if (ResMessage == "")
                {
                    if (g_isCaseSensitive)
                    {
                        if (ChangePasswordViewModel.Password == ChangePasswordViewModel.CurrentPassword)
                        {
                            ResMessage = "Current Password and New Password should not be same";
                        }
                    }
                    else
                    {
                        if (ChangePasswordViewModel.CurrentPassword.ToLower() == ChangePasswordViewModel.Password.ToLower())
                        {
                            ResMessage = "Current Password and New Password should not be same";
                        }
                    }
                }
                if (ResMessage == "")
                {
                    if (g_isCaseSensitive)
                    {
                        if (ChangePasswordViewModel.Password != ChangePasswordViewModel.ConfirmPassword)
                        {
                            ResMessage = "New Password and Confirm New Password should be same";
                        }
                    }
                    else
                    {
                        if (ChangePasswordViewModel.Password.ToLower() != ChangePasswordViewModel.ConfirmPassword.ToLower())
                        {
                            ResMessage = "New Password and Confirm New Password should be same";
                        }
                    }
                }
            }

            if (ResMessage.Length > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        private static async Task<bool> sendMail(ForgotPasswordDetails sendMailDetails, string randomPassword)
        {
            BaseClassInput baseInp = new BaseClassInput();
            return new CommonModel(baseInp).UserItem.SendMailNewPassword(sendMailDetails, randomPassword);
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await UserManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            AddErrors(result);
            return View();
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("Login");
            }

            // Sign in the user with this external login provider if the user already has a login
            var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    // If the user does not have an account, then prompt the user to create an account
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
                    return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = loginInfo.Email });
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Manage");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // POST: /Account/LogOff
       
        //[HttpPost]
        public ActionResult LogOff()
        {
            bool isSSOEnabled = Convert.ToBoolean(WebConfigurationManager.AppSettings["IsSSOEnabled"]);
            if (isSSOEnabled)
            {
                InsertLogToDB("LogOff called");
                var identity = new ClaimsIdentity();
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                        (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });
                if (SAMLServiceProvider.IsSSO())
                {
                    // Request logout at the identity provider.
                    InsertLogToDB("Before caclling InitiateSLO");
                    SAMLServiceProvider.InitiateSLO(Response, null, null);
                    InsertLogToDB("InitiateSLO method called from LogOff method , Response = " + Response);
                    return new EmptyResult();
                }
               
                return RedirectToAction("SSOLogin", "Account");
            }
            else
            {
                int UserId = Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                int CustomerId = Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);
                int UserRoleId = Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserRoleId").Value);
                BaseClassInput baseInp = new BaseClassInput();
                new CommonModel(baseInp).ApplicationFormItem.Extented.UpdateLogOutUserCount(CustomerId, UserId, UserRoleId);
                var identity = new ClaimsIdentity();
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                        (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });
                HttpCookie aCookie;
                string cookieName;
                int limit = Request.Cookies.Count;
                for (int i = 0; i < limit; i++)
                {
                    cookieName = Request.Cookies[i].Name;
                    aCookie = new HttpCookie(cookieName);
                    aCookie.Expires = DateTime.Now.AddYears(-1); // make it expire yesterday
                    Response.Cookies.Add(aCookie); // overwrite it
                }
                return RedirectToAction("Login", "Account");
            }
           
        }

        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult SingleSignOn()
        {
            // To login at the service provider, initiate single sign-on to the identity provider (SP-initiated SSO).
            string partnerIdP = WebConfigurationManager.AppSettings[AppSetting.PartnerIdP];

            SAMLServiceProvider.InitiateSSO(Response, null, partnerIdP);

            return new EmptyResult();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
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

        private async Task SignInAsync(Indus.iDrawings.Common.Entity.UserLoginStatus loginStatus, bool isPersistent)
        {

            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            //var ssid = Session.SessionID;
            Session["SessionId"] = Session.SessionID;
            var user = await PIndusUserManager.FindAsync((int)loginStatus.UserId, Session["SessionId"].ToString());
            //var user = await PIndusUserManager.FindAsync((int)loginStatus.UserId);
            if (user != null)
            {
                // var identity = await PIndusUserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
                PIndusUserManager.InsertUserSessionDetails(loginStatus.UserId, Session["SessionId"].ToString(), IPAddress, 0, null, UserAgent);

                AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, await user.GenerateUserIdentityAsync(PIndusUserManager));
                ////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////
                Session["UserId"] = loginStatus.UserId;
                ////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////

               // Session["IPAddress"] = IPAddress;
            }
        }

        private void CheckUserPostAuthentication(DataRow UserDetails, string Password, ref UserLoginStatus LoginStatus)
        {

            if (bool.Parse(UserDetails["ResetPasswordOnNextLogon"].ToString()))
            {
                LoginStatus = UserLoginStatus.ChangePasswordOnFirstLogin;
            }
            else
            {
                if (bool.Parse(UserDetails["IsPasswordExpired"].ToString()))
                {
                    LoginStatus = UserLoginStatus.PasswordExpired;
                }
                else
                {
                    if (!IsVaildPassword(Convert.ToInt32(UserDetails[8].ToString()), Password) && LoginStatus == UserLoginStatus.Success && (Convert.ToInt32(UserDetails[2].ToString()) > 1))
                    {
                        LoginStatus = UserLoginStatus.PasswordRequirementDoesntMeet;
                    }
                }
            }

        }

        public bool IsVaildPassword(int customerid, string password)
        {
            bool isVaildPassword = true;
            BaseClassInput baseInp = new BaseClassInput();
            PasswordSettings settings = new CommonModel(baseInp).UserItem.Passwordsettings(customerid);
            if (password.Length < settings.PasswordRequirements.Length)
            {
                isVaildPassword = false;
            }
            if (settings.PasswordRequirements.IsUpperCaseCharacterMust && !(new System.Text.RegularExpressions.Regex("[A-Z]").Match(password).Success))
            {
                isVaildPassword = false;
            }
            if (settings.PasswordRequirements.IsLowerCaseCharacterMust && !(new System.Text.RegularExpressions.Regex("[a-z]").Match(password).Success))
            {
                isVaildPassword = false;
            }
            if (settings.PasswordRequirements.IsNumericCharacterMust && !(new System.Text.RegularExpressions.Regex(@"\d").Match(password).Success))
            {
                isVaildPassword = false;
            }
            if (settings.PasswordRequirements.IsNonAlphaNumericCharacterMust && !(new System.Text.RegularExpressions.Regex(@"[!,@,#,$,%,^,&,*,?,_,-,(,)]").Match(password).Success))
            {
                isVaildPassword = false;
            }
            return isVaildPassword;
        }

        private string GetHourMinutesFromMinutes(int Seconds)
        {
            string time;
            int hr;
            int mi;
            int sec;
            hr = TimeSpan.FromSeconds(Seconds).Hours;
            mi = TimeSpan.FromSeconds(Seconds).Minutes;
            sec = TimeSpan.FromSeconds(Seconds).Seconds;
            mi += (sec > 0) ? 1 : 0;
            time = (hr > 0 ? hr.ToString() + (hr > 1 ? " Hours " : " Hour ") : "") +
                      (mi > 0 ? mi.ToString() + (mi > 1 ? " Minutes " : " Minute ") : "");
            return time;
        }

        public string IPAddress
        {
            get
            {
                return (Request.ServerVariables["HTTP_X_FORWARDED_FOR"] == null || Request.ServerVariables["HTTP_X_FORWARDED_FOR"] == "") ? Request.ServerVariables["REMOTE_ADDR"] : Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            }
        }

        public string MachineName
        {
            get
            {
                return Request.UserHostName;
            }
        }
        public string UserAgent
        {
            get
            {
                return Request.UserAgent;
            }
        }
        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
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

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion

        private void RemoveTxHostApp(string UserId)
        {
            if (UserId != null)
            {
                //string UserId = Session["UserId"].ToString();
                if (UserId != null)
                {
                    string strDrawingIds;
                    if (DrawingHost.UsertoDrawing.TryGetValue(UserId, out strDrawingIds))
                    {
                        foreach (string drawingId in strDrawingIds.Split(';').ToArray())
                        {

                            DrawingHost.objCloud.Close(drawingId, Convert.ToInt32(UserId));
                        }
                    }
                    DrawingHost.UsertoDrawing.Remove(UserId);
                }
                string strConnectionId;
                var context = Microsoft.AspNet.SignalR.GlobalHost.ConnectionManager.GetHubContext("UpdateHub");
                if (DrawingHost.UsertoConnction.TryGetValue(UserId, out strConnectionId))
                {
                    context.Clients.Client(strConnectionId).stop();
                    DrawingHost.UsertoConnction.Remove(UserId);
                }
            }
        }

        public void InsertLogToDB(string message)
        {
            SAMLController.InsertLog(message);
            //  new CommonModel(BaseInput).ApplicationFormItem.Extented.InsertErrorMessages(message);
        }
    }
}
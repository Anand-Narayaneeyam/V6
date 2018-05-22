using Indus.iDrawings.Codebase.Models.Items.Reports;
using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Models;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Utils.Security.Validation;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web;
using System.Web.Configuration;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Indus.iDrawings.vN
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.Email;
            Application["FileFolder"] = "Files";
            JsonValueProviderFactory jsonValueProviderFactory = null;

            foreach (var factory in ValueProviderFactories.Factories)
            {
                if (factory is JsonValueProviderFactory)
                {
                    jsonValueProviderFactory = factory as JsonValueProviderFactory;
                }
            }

            //remove the default JsonVAlueProviderFactory
            if (jsonValueProviderFactory != null) ValueProviderFactories.Factories.Remove(jsonValueProviderFactory);

            //add the custom one
            ValueProviderFactories.Factories.Add(new CustomJsonValueProviderFactory());
        }

        protected void Application_PreSendRequestHeaders()
        {
            Response.Headers.Remove("Server");
            Response.Headers.Remove("X-AspNetMvc-Version");
            Response.Headers.Remove("X-AspNet-Version");
        }
        protected void Session_Start(object sender, EventArgs e)
        {
            /*if (Request.IsSecureConnection == true)
                Response.Cookies["ASP.NET_SessionID"].Secure = true;*/
            if (Request.IsSecureConnection == true)
                Response.Cookies["ASP.NET_SessionId"].Secure = true;

            Session["SessionId"] = null;
        }

        public sealed class CustomJsonValueProviderFactory : ValueProviderFactory
        {

            private static void AddToBackingStore(Dictionary<string, object> backingStore, string prefix, object value)
            {
                IDictionary<string, object> d = value as IDictionary<string, object>;
                if (d != null)
                {
                    foreach (KeyValuePair<string, object> entry in d)
                    {
                        AddToBackingStore(backingStore, MakePropertyKey(prefix, entry.Key), entry.Value);
                    }
                    return;
                }

                IList l = value as IList;
                if (l != null)
                {
                    for (int i = 0; i < l.Count; i++)
                    {
                        AddToBackingStore(backingStore, MakeArrayKey(prefix, i), l[i]);
                    }
                    return;
                }

                // primitive
                backingStore[prefix] = value;
            }

            private static object GetDeserializedObject(ControllerContext controllerContext)
            {
                object jsonData;
                try
                {
                    if (!controllerContext.HttpContext.Request.ContentType.StartsWith("application/json", StringComparison.OrdinalIgnoreCase))
                    {
                        // not JSON request
                        return null;
                    }

                    System.IO.StreamReader reader = new System.IO.StreamReader(controllerContext.HttpContext.Request.InputStream);
                    string bodyText = reader.ReadToEnd();
                    if (String.IsNullOrEmpty(bodyText))
                    {
                        // no JSON data
                        return null;
                    }

                    System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                    serializer.MaxJsonLength = int.MaxValue; //increase MaxJsonLength.  This could be read in from the web.config if you prefer
                    jsonData = serializer.DeserializeObject(bodyText);
                }
                catch (Exception ex)
                {
                    jsonData = null;
                }
                return jsonData;
            }

            public override IValueProvider GetValueProvider(ControllerContext controllerContext)
            {
                if (controllerContext == null)
                {
                    throw new ArgumentNullException("controllerContext");
                }

                object jsonData = GetDeserializedObject(controllerContext);
                if (jsonData == null)
                {
                    return null;
                }

                Dictionary<string, object> backingStore = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
                AddToBackingStore(backingStore, String.Empty, jsonData);
                return new DictionaryValueProvider<object>(backingStore, System.Globalization.CultureInfo.CurrentCulture);
            }

            private static string MakeArrayKey(string prefix, int index)
            {
                return prefix + "[" + index.ToString(System.Globalization.CultureInfo.InvariantCulture) + "]";
            }

            private static string MakePropertyKey(string prefix, string propertyName)
            {
                return (String.IsNullOrEmpty(prefix)) ? propertyName : prefix + "." + propertyName;
            }
        }




        protected void Application_Error()
        {
            if (!Request.RawUrl.Contains("ui/"))
            {
                Exception exception = Server.GetLastError();
                Server.ClearError();
                if (exception is HttpRequestValidationException)
                {
                    Response.Clear();
                    Response.StatusCode = 200;
                    Response.Redirect("~/Information/Information/cm0zcXVwOWZ4NDBMZWdRcEphUzRZZz09", true);

                }
                else if (exception is HttpAntiForgeryException)
                {
                    Response.Clear();
                    Response.StatusCode = 200;
                    Response.Redirect("~/Information/Information/cmE4SEdVTWYyYTdJWDNwNlVPY09YZz09", true);
                    // Response.Write("antiforgery token error");
                }
                else if (exception is System.Runtime.InteropServices.ExternalException)
                {
                    int errCode;

                    Int32.TryParse((((System.Runtime.InteropServices.ExternalException)(exception)).ErrorCode.ToString()), out errCode);

                    if (errCode == -2147467259)
                    {
                        Response.Clear();
                        Response.StatusCode = 200;
                        //Response.Write("A potentially dangerous Request.Path value was detected from the client");
                        //Response.Redirect("~/Information/Information/5", true);
                        Response.Redirect("~/Information/Information/cVJRZkF0aHdSdHZrUXk1cHo1eVA4Zz09", true);
                        Response.End();
                    }
                }

                else
                {
                    Response.Clear();
                    Response.StatusCode = 200;
                    Response.Redirect("~/Information/Information/cmE4SEdVTWYyYTdJWDNwNlVPY09YZz09", true);
                    //Response.Redirect("~/Information/Information/1");

                }
            }
        }

        protected void Session_End(object sender, EventArgs e)
        {
            ////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////

            if (Session["UserId"] != null)
            {
                string UserId = Session["UserId"].ToString();
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

            //System.Web.HttpContext.Current.Response.Redirect("~/Account/Login");   

            ////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////

        }
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return System.Web.HttpContext.Current.GetOwinContext().Authentication;
            }
        }
        protected void Application_PreRequestHandlerExecute(Object sender, EventArgs e)
        {
            if (Request.RawUrl.Contains("CustomReportService.asmx") || Request.RawUrl.Contains("ActiveReports.ar10"))
            {
                if (!Request.RawUrl.Contains("ActiveReports.ar10"))
                {
                    if (!ValidatePrivilegeforReport(Request))
                    {
                        var identity = new ClaimsIdentity();
                        AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                        AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                              (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });
                        Server.ClearError();
                        Response.Clear();
                        Response.Status = "200 OK";
                        Response.Write("iDrawings encountered a problem while executing your command");
                        Response.End();
                    }
                }
                else
                {
                    if (!ValidatePrivilegeforReport(Request) || (User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value == null) //Bug 76251:
                    {
                        var identity = new ClaimsIdentity();
                        AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                        AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                              (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });
                        Server.ClearError();
                        Response.Clear();
                        Response.Status = "200 OK";
                        Response.Write("iDrawings encountered a problem while executing your command");
                        Response.End();
                    }
                }
            
                if (!iDrawings.Utils.General.ValidateCSToken(Request))
                {
                    var identity = new ClaimsIdentity();
                    AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                    AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                          (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });
                    Server.ClearError();
                    Response.Clear();
                    Response.Status = "200 OK";
                    Response.Write("iDrawings encountered a problem while executing your command");
                    Response.End();
                }
                
                if (!ValidateAntiForgeryTokenAttributeforReport(Request.RequestContext.HttpContext))    //Bug 75759: Bug 75747:
                {
                    var identity = new ClaimsIdentity();
                    AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                    AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                            (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });
                    Server.ClearError();
                    Response.Clear();
                    Response.Status = "200 OK";
                    Response.Write("iDrawings encountered a problem while executing your command");
                    Response.End();
                }

            }            
        }


        private bool ValidateAntiForgeryTokenAttributeforReport(System.Web.HttpContextBase objHttpContext)
        {
            //WriteLog("10-- ValidateAntiForgeryTokenAttribute Begin");
            bool toBeIgnored = false;
            //if (objHttpContext.Request.RequestContext.RouteData.Values["controller"].ToString() == "Home" && objHttpContext.Request.RequestContext.RouteData.Values["action"].ToString() == "Index")
            //{
            //    toBeIgnored = true;
            //}
            //if (objHttpContext.Request.RequestContext.RouteData.Values["controller"].ToString() == "Account" && objHttpContext.Request.RequestContext.RouteData.Values["action"].ToString() == "Login")
            //{
            //    toBeIgnored = true;
            //}
            if (!toBeIgnored)
            {
                try
                {
                    var httpContext = objHttpContext;
                    if (Request.RawUrl.Contains("ActiveReports.ar10"))
                    {
                        if (httpContext.Request.Params["__RequestVerificationToken"] == null)
                        {
                            httpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                            httpContext.Response.StatusDescription = "RequestVerificationToken missing.";
                            return false;
                        }
                        var cookie = httpContext.Request.Cookies[System.Web.Helpers.AntiForgeryConfig.CookieName];
                        System.Web.Helpers.AntiForgery.Validate(cookie != null ? cookie.Value : null, httpContext.Request.Params["__RequestVerificationToken"]);
                    }
                    else
                    {
                        if (httpContext.Request.Headers["__RequestVerificationToken"] == null)
                        {
                            httpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                            httpContext.Response.StatusDescription = "RequestVerificationToken missing.";
                            return false;
                        }
                        var cookie = httpContext.Request.Cookies[System.Web.Helpers.AntiForgeryConfig.CookieName];
                        System.Web.Helpers.AntiForgery.Validate(cookie != null ? cookie.Value : null, httpContext.Request.Headers["__RequestVerificationToken"]);
                    }
                   // WriteLog("10-- ValidateAntiForgeryTokenAttribute Succeess");
                }
                catch (Exception ex)
                {
                   // WriteLog("10-- ValidateAntiForgeryTokenAttribute Exception - " + ex.Message);
                    var identity = new ClaimsIdentity();
                    AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                    AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                            (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });
                    objHttpContext.Response.Cookies["ASP.NET_SessionId"].Value = string.Empty;
                    return false;
                }
                return true;
            }
            else
            {
                return true;
            }
        }

        private bool ValidatePrivilegeforReport(dynamic objHttpRequest)   /* for report privilege checks, security bugs. ActiveReports URL manipulations   */   
        {
            try
            {
                int returnValue = 0;
                int customReportId = 0;
                int ReportFieldId = 0;
                string strReportData = "";
                if (Request.RawUrl.Contains("ActiveReports.ar10"))
                {
                    strReportData = objHttpRequest.Params["reportPath"];
                }
                else
                {
                    StreamReader reader = new StreamReader(objHttpRequest.InputStream);
                    reader.BaseStream.Seek(0, SeekOrigin.Begin);
                    string reportDataInJson = reader.ReadToEnd();
                    strReportData = Json.Decode(reportDataInJson).ReportData;
                }

                ReportDataEntity objReportDataEntity = CommonReportUtils.GetObjectFromJsonString<ReportDataEntity>(strReportData);
                if (!CheckReportValidInputData(objReportDataEntity))
                {
                    throw new Exception();
                }

                BaseClassInput baseInp = new BaseClassInput();
                ApplicationFormInput appInp = new ApplicationFormInput();
                baseInp.CustomerId = Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);
                baseInp.UserId = Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                if(objReportDataEntity.ReportCategoryId == 0 && objReportDataEntity.ReportsTypeId == 0)
                {
                    List<ReportFieldValues> lstRptFieldValues = new List<ReportFieldValues>();
                    lstRptFieldValues = objReportDataEntity.GetListReportFieldIdValues;
                    customReportId = Convert.ToInt32(lstRptFieldValues.Find(item => item.ReportFieldId == 147).Value);
                }

                if (objReportDataEntity.ReportCategoryId == 0 && objReportDataEntity.ReportsTypeId == 6)
                {
                    List<ReportFieldValues> lstRptFieldValues = new List<ReportFieldValues>();
                    lstRptFieldValues = objReportDataEntity.GetListReportFieldIdValues;
                    ReportFieldId = Convert.ToInt32(lstRptFieldValues.Find(item => item.ReportFieldId == 3428).Value);
                }

                returnValue = new CommonModel(baseInp).ReportItem.CheckReportPrivilegeforUser(appInp, objReportDataEntity.ModuleId, 0, objReportDataEntity.ReportCategoryId, customReportId, ReportFieldId);
                if (returnValue == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                var identity = new ClaimsIdentity();
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                      (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });
                Server.ClearError();
                Response.Clear();
                Response.Status = "200 OK";
                Response.Write("iDrawings encountered a problem while executing your command");
                Response.End();
                return false;
            }
        }

        private bool CheckReportValidInputData(ReportDataEntity appInput)
        {
            bool isValid = true;
            if (appInput != null)
            {
                TypeValidation typeVal = new TypeValidation();
                List<ReportFieldValues> listReportFieldValues = new List<ReportFieldValues>();
                listReportFieldValues = appInput.GetListReportFieldIdValues;

                for (int i = 0; i < listReportFieldValues.Count; i++)
                {
                    if (typeVal.checkWhiteList(listReportFieldValues[i].ReportFieldId.ToString(), 5) == false)
                    {
                        isValid = false;
                        break;

                    }
                    if (typeVal.checkWhiteList(listReportFieldValues[i].Value.ToString(), 6) == false)
                    {
                        isValid = false;
                        break;
                    }

                }
            }
            return isValid;
        }

        protected void Application_BeginRequest(object o, EventArgs e)
        {
            if (Request.RawUrl.Contains("?ReturnUrl="))
            {
                string baseUrl = string.Empty;
                bool isSSOEnabled = Convert.ToBoolean(WebConfigurationManager.AppSettings["IsSSOEnabled"]);
                if (isSSOEnabled)
                {
                    baseUrl = Request.Url.GetLeftPart(UriPartial.Authority) + Request.ApplicationPath + "/Account/SingleSignOn";
                }
                else
                {
                     baseUrl = Request.Url.GetLeftPart(UriPartial.Authority) + Request.ApplicationPath + "/Account/Login";
                }
                
                Response.Redirect(baseUrl);
            }
            
        }

    }
}

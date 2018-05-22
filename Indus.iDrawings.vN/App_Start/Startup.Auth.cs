using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Owin;
using Indus.iDrawings.vN.Models;
using Microsoft.Owin.Security;
using System.Web;
using System.Linq;
using System.Threading.Tasks;
using Indus.iDrawings.Common;
using System.Collections.Generic;



using System.Web.Mvc;
using System.Security.Claims;

namespace Indus.iDrawings.vN
{
    public partial class Startup
    {
        public static System.Runtime.Caching.MemoryCache authenticationTokens = new System.Runtime.Caching.MemoryCache("TOKEN_CACHE1");
        private static int cookieExpirySeconds = 10800;
        // string timeOut = System.Configuration.ConfigurationManager.AppSettings["SessionTimeout"];
        public void ConfigureAuth(IAppBuilder app)
        {
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<Indus.iDrawings.Security.IdentityManagement.ApplicationUserManager>(Indus.iDrawings.Security.IdentityManagement.ApplicationUserManager.Create);

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                //LoginPath = new PathString("/Account/login"),
                LoginPath = new PathString(System.Web.Configuration.WebConfigurationManager.AppSettings["LoginURL"]),
                AuthenticationMode = Microsoft.Owin.Security.AuthenticationMode.Active,
                SlidingExpiration = true,

                SessionStore = new SessionIdentityStore(),               
            });
        }

        private class SessionIdentityStore : IAuthenticationSessionStore
        {


            public SessionIdentityStore()
            {
                AppSettings appSetting = new AppSettings();
                List<AppSetting> lstSetting = appSetting.GetAllKeyValues();
                string timeOut = lstSetting.Find(item => item.Id == (int)AppSettingsKey.SessionTimeout).Value.ToString();
                //string timeOut = new Indus.iDrawings.Models.AppSettings()[Models.AppSettingsKey.SessionTimeout].Value;
                if (timeOut != null)
                {
                    cookieExpirySeconds = int.Parse(timeOut);
                }


            }
            public Task RemoveAsync(string key)
            {
                Task storeTask = new Task(() =>
                {
                    if (authenticationTokens.Contains(key))
                    {
                        authenticationTokens.Remove(key);
                    }
                });
                storeTask.Start();
                return storeTask;
            }

            public Task RenewAsync(string key, Microsoft.Owin.Security.AuthenticationTicket ticket)
            {
                Task storeTask = new Task(() =>
                {
                    if (authenticationTokens.Contains(key))
                    {
                        authenticationTokens[key] = ticket;
                    }
                });
                storeTask.Start();
                return storeTask;
            }

            public Task<Microsoft.Owin.Security.AuthenticationTicket> RetrieveAsync(string key)
            {
                Task<Microsoft.Owin.Security.AuthenticationTicket> storeTask = new Task<Microsoft.Owin.Security.AuthenticationTicket>(() =>
                {
                    if (authenticationTokens.Contains(key))
                    {
                        return (Microsoft.Owin.Security.AuthenticationTicket)authenticationTokens[key];
                    }
                    else
                {
                        return null;
                }
                });
                storeTask.Start();
                return storeTask;

            }
          

            public Task<string> StoreAsync(Microsoft.Owin.Security.AuthenticationTicket ticket)
            {

                Task<string> storeTask = new Task<string>(() =>
                {

                    string key = Guid.NewGuid().ToString();
                    //string key = ticket.Identity.Claims.Where(c => c.Type == "SecurityStamp").First().Value;
                    if (authenticationTokens.Contains(key))
                    {
                        authenticationTokens[key] = ticket;
                    }
                    else
                    {
                        System.Runtime.Caching.CacheItemPolicy policy = new System.Runtime.Caching.CacheItemPolicy()
                        {
                            SlidingExpiration = new System.TimeSpan(0, 0, cookieExpirySeconds)
                        };

                        ////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////
                        policy.RemovedCallback += new System.Runtime.Caching.CacheEntryRemovedCallback(CachedItemRemovedCallback);
                        ////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////

                        authenticationTokens.Add(new System.Runtime.Caching.CacheItem(key, ticket),
                                               policy);
                    }
                    return key;
                });
                storeTask.Start();
                return storeTask;
            }

            ////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////
            private void CachedItemRemovedCallback(System.Runtime.Caching.CacheEntryRemovedArguments arguments)
            {
                Console.WriteLine(arguments.CacheItem.Key + "," + arguments.CacheItem.Value);
                Microsoft.Owin.Security.AuthenticationTicket ticket = (Microsoft.Owin.Security.AuthenticationTicket)arguments.CacheItem.Value;
                string UserId = ticket.Identity.GetUserId();
                string strDrawingIds, strConnectionId;
                if (DrawingHost.UsertoDrawing.TryGetValue(UserId, out strDrawingIds))
                {
                    foreach (string drawingId in strDrawingIds.Split(';').ToArray())
                    {
                        DrawingHost.objCloud.Close(drawingId, Convert.ToInt32(UserId));
                    }
                }
                DrawingHost.UsertoDrawing.Remove(UserId);
                var context = Microsoft.AspNet.SignalR.GlobalHost.ConnectionManager.GetHubContext("UpdateHub");
                if (DrawingHost.UsertoConnction.TryGetValue(UserId, out strConnectionId))
                {
                    context.Clients.Client(strConnectionId).stop();
                    DrawingHost.UsertoConnction.Remove(UserId);
                }
                // System.Web.HttpContext.Current.GetOwinContext().Authentication
                // AuthenticationManager.
                LogOff();

            }
            ////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////
            private IAuthenticationManager AuthenticationManager
            {
                get
                {
                    return System.Web.HttpContext.Current.GetOwinContext().Authentication;
                }
            }
            public void LogOff()
            {
                //System.Web.HttpContext.Current.Session.Clear();
                //System.Web.HttpContext.Current.Session.Abandon();
                //System.Web.HttpContext.Current.Session.RemoveAll();

                //if (System.Web.HttpContext.Current.Request.Cookies["ASP.NET_SessionId"] != null)
            //{
                //    System.Web.HttpContext.Current.Response.Cookies["ASP.NET_SessionId"].Value = string.Empty;
                //    System.Web.HttpContext.Current.Response.Cookies["ASP.NET_SessionId"].Expires = DateTime.Now.AddMonths(-20);
                //}
                //var identity = new ClaimsIdentity();
                //AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                //AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                //        (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });

                // System.Web.HttpContext.Current.Response.Redirect("~/Account/Login");
            }
        }
    }
}
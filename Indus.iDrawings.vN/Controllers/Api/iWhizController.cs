////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using System.Web;
using Newtonsoft.Json;
using System.Web.Http.Filters;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Helpers;
using System.Threading;

namespace Indus.iDrawings.vN
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public sealed class ValidateAntiForgeryTokenAttribute : FilterAttribute, IAuthorizationFilter
    {
        public Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
        {
            try
            {
                HttpRequestMessage request = actionContext.Request;

                if (IsAjaxRequest(request))
                {
                    ValidateRequestHeader(request);
                }
                else
                {
                    AntiForgery.Validate();
                }

            }
            catch
            {
                actionContext.Response = new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK, //Forbidden,
                    RequestMessage = actionContext.ControllerContext.Request
                };
                return FromResult(actionContext.Response);
            }
            return continuation();
        }

        private Task<HttpResponseMessage> FromResult(HttpResponseMessage result)
        {
            var source = new TaskCompletionSource<HttpResponseMessage>();
            source.SetResult(result);
            return source.Task;
        }
        private bool IsAjaxRequest(HttpRequestMessage request)
        {
            IEnumerable<string> xRequestedWithHeaders;
            if (request.Headers.TryGetValues("X-Requested-With", out xRequestedWithHeaders))
            {
                string headerValue = xRequestedWithHeaders.FirstOrDefault();
                if (!String.IsNullOrEmpty(headerValue))
                {
                    return String.Equals(headerValue, "XMLHttpRequest", StringComparison.OrdinalIgnoreCase);
                }
            }

            return false;
        }
        private void ValidateRequestHeader(HttpRequestMessage request)
        {
            var headers = request.Headers;
            var cookie = headers
                .GetCookies()
                .Select(c => c[AntiForgeryConfig.CookieName])
                .FirstOrDefault();

            IEnumerable<string> xXsrfHeaders;

            if (headers.TryGetValues("__RequestVerificationToken", out xXsrfHeaders))
            {
                var rvt = xXsrfHeaders.FirstOrDefault();

                if (cookie == null)
                {
                    throw new InvalidOperationException(String.Format("Missing {0} cookie", AntiForgeryConfig.CookieName));
                }

                AntiForgery.Validate(cookie.Value, rvt);
            }
            else
            {
                var headerBuilder = new StringBuilder();

                headerBuilder.AppendLine("Missing X-XSRF-Token HTTP header:");

                foreach (var header in headers)
                {
                    headerBuilder.AppendFormat("- [{0}] = {1}", header.Key, header.Value);
                    headerBuilder.AppendLine();
                }

                throw new InvalidOperationException(headerBuilder.ToString());
            }
        }

    }
    public class CacheFilter : ActionFilterAttribute
    {
        public int TimeDuration { get; set; }
        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            actionExecutedContext.Response.Headers.CacheControl = new CacheControlHeaderValue
            {
                MaxAge = TimeSpan.FromSeconds(TimeDuration),
                MustRevalidate = true,
                Public = true
            };
        }
    }
    public class DeflateCompressionAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext actContext)
        {
            var content = actContext.Response.Content;
            var bytes = content == null ? null : content.ReadAsByteArrayAsync().Result;
            var zlibbedContent = bytes == null ? new byte[0] :
            CompressionHelper.DeflateByte(bytes);
            actContext.Response.Content = new ByteArrayContent(zlibbedContent);
            actContext.Response.Content.Headers.Remove("Content-Type");
            actContext.Response.Content.Headers.Add("Content-encoding", "deflate");
            actContext.Response.Content.Headers.Add("Content-Type", "application/json");
            base.OnActionExecuted(actContext);
        }
    }


    [Authorize]
    public class iWhizController : ApiController
    {
        [AcceptVerbs("POST")]
       // [DeflateCompression]
       // [CacheFilter(TimeDuration = 100)]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage OpenDrawing(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                int RevisionNumber;
                double Width, Height;
                int DrawingType, ArchivedId;
                bool IsRender, IsFreeze;
                DrawingId = Val[0];
                RevisionNumber = Convert.ToInt32(Val[1]);
                DrawingType = Convert.ToInt32(Val[2]);
                IsFreeze = Convert.ToBoolean(Val[3]);

                if (Val.Count > 3)
                    IsRender = Convert.ToBoolean(Val[4]);
                else
                    IsRender = true;

                if (IsRender)
                {
                    Width = Convert.ToDouble(Val[5]);
                    Height = Convert.ToDouble(Val[6]);

                    ArchivedId = Convert.ToInt32(Val[7]);
                }
                else
                {
                    Width = 1920;
                    Height = 1080;

                    ArchivedId = 0;
                }
                                
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;//RequestContext.Principal.Identity.GetUserId(); //(RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;//  (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                int CustomerId = Convert.ToInt32((RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);
                string FileFolder = "Files";//HttpContext.Current.Application["FileFolder"].ToString();
                                             //  byte[] cacheData = null;, ref cacheData
                string CacheString = ""; short result;
                result = DrawingHost.objCloud.OpenDrawing(HttpRuntime.AppDomainAppPath, Convert.ToInt32(UserId), CustomerId, HttpContext.Current.Request.PhysicalApplicationPath + "iWhizLib", FileFolder, DrawingId, RevisionNumber, DrawingType, IsFreeze, Width, Height, ref CacheString,ArchivedId, IsRender);
                //  result = DrawingHost.objCloud.OpenDrawing(HttpRuntime.AppDomainAppPath, Convert.ToInt32(UserId), CustomerId, HttpContext.Current.Request.PhysicalApplicationPath + "iWhizLib", FileFolder, DrawingId, RevisionNumber, DrawingType, IsFreeze, Width, Height, ref CacheString, ArchivedId,IsRender);
                // result = DrawingHost.objCloud.OpenDrawingPartial(HttpRuntime.AppDomainAppPath, Convert.ToInt32(UserId), CustomerId, HttpContext.Current.Request.PhysicalApplicationPath + "iWhizLib", FileFolder, DrawingId, RevisionNumber, DrawingType, "",Width, Height, ref CacheString, IsRender);
                // result = DrawingHost.objCloud.OpenPartiallyWithLayers(Convert.ToInt32(UserId), CustomerId, HttpContext.Current.Request.PhysicalApplicationPath + "iWhizLib",
                //     FileFolder, DrawingId, RevisionNumber, DrawingType, Width, Height, "$POLYLINE_SP§$POLYLINE_NT§$POLYLINE_GR§$POLYLINE_CN§", ref CacheString, IsRender);


                string strDrawingId;
                if (DrawingHost.UsertoDrawing.TryGetValue(UserId, out strDrawingId))
                {
                    strDrawingId += ";" + DrawingId;
                    DrawingHost.UsertoDrawing.Remove(UserId);
                }
                else
                    strDrawingId = DrawingId;
                DrawingHost.UsertoDrawing.Add(UserId, strDrawingId);


                var returnObject = new { returnCode = result, Cache = CacheString };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }

            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [DeflateCompression]
        [CacheFilter(TimeDuration = 100)]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage OpenDrawingPartial(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, PolylineHandles, LayerNames;
                int RevisionNumber;
                double Width, Height;
                int DrawingType;
                bool IsRender;
                DrawingId = Val[0];
                RevisionNumber = Convert.ToInt32(Val[1]);
                DrawingType = Convert.ToInt32(Val[2]);
                PolylineHandles = Val[3];
                LayerNames = Val[4];

                if (Val.Count > 4)
                    IsRender = Convert.ToBoolean(Val[5]);
                else
                    IsRender = true;

                if (IsRender)
                {
                    Width = Convert.ToDouble(Val[6]);
                    Height = Convert.ToDouble(Val[7]);
                }
                else
                {
                    Width = 1920;
                    Height = 1080;
                }

                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;//RequestContext.Principal.Identity.GetUserId(); //(RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;//  (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                int CustomerId = Convert.ToInt32((RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);
                string FileFolder = "Files";//HttpContext.Current.Application["FileFolder"].ToString();
                                            //  byte[] cacheData = null;, ref cacheData
                string CacheString = ""; short result;

                result = DrawingHost.objCloud.OpenDrawingPartial(HttpRuntime.AppDomainAppPath, Convert.ToInt32(UserId), CustomerId, HttpContext.Current.Request.PhysicalApplicationPath + "iWhizLib", FileFolder, DrawingId, RevisionNumber, DrawingType, PolylineHandles, LayerNames, Width, Height, ref CacheString, IsRender);


                string strDrawingId;
                if (DrawingHost.UsertoDrawing.TryGetValue(UserId, out strDrawingId))
                {
                    strDrawingId += ";" + DrawingId;
                    DrawingHost.UsertoDrawing.Remove(UserId);
                }
                else
                    strDrawingId = DrawingId;
                DrawingHost.UsertoDrawing.Add(UserId, strDrawingId);


                var returnObject = new { returnCode = result, Cache = CacheString };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }

            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage OpenPartiallyWithLayers(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerNames;
                int RevisionNumber;
                double Width, Height;
                bool IsRender;
                int DrawingType;
                DrawingId = Val[0];
                RevisionNumber = Convert.ToInt32(Val[1]);
                DrawingType = Convert.ToInt32(Val[2]);

                LayerNames = Val[3];
                if (Val.Count > 2)
                    IsRender = Convert.ToBoolean(Val[4]);
                else
                    IsRender = true;
                if (IsRender)
                {
                    Width = Convert.ToDouble(Val[5]);
                    Height = Convert.ToDouble(Val[6]);
                }
                else
                {
                    Width = 1920;
                    Height = 1080;
                }

                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                int CustomerId = Convert.ToInt32((RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);
                string FileFolder = HttpContext.Current.Application["FileFolder"].ToString();

                //  byte[] cacheData = null;, ref cacheData
                string CacheString = "";
                short result = DrawingHost.objCloud.OpenPartiallyWithLayers(Convert.ToInt32(UserId), CustomerId, HttpContext.Current.Request.PhysicalApplicationPath + "iWhizLib",
                    FileFolder, DrawingId, RevisionNumber, DrawingType, Width, Height, LayerNames, ref CacheString, IsRender);

                string strDrawingId;
                if (DrawingHost.UsertoDrawing.TryGetValue(UserId, out strDrawingId))
                {
                    strDrawingId += ";" + DrawingId;
                    DrawingHost.UsertoDrawing.Remove(UserId);
                }
                else
                    strDrawingId = DrawingId;

                DrawingHost.UsertoDrawing.Add(UserId, strDrawingId);


                var returnObject = new { returnCode = result, Cache = CacheString };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }

            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateDrawing(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short Measurement;
                double Width, Height;
                DrawingId = Val[0];
                Measurement = Convert.ToInt16(Val[1]);
                Width = Convert.ToDouble(Val[2]);
                Height = Convert.ToDouble(Val[3]);

                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                string FileFolder = HttpContext.Current.Application["FileFolder"].ToString();

                string CacheString = "";
                short result = DrawingHost.objCloud.CreateDrawing(DrawingId, UserId, HttpContext.Current.Request.PhysicalApplicationPath + "iWhizLib", FileFolder, Measurement, Width, Height, ref CacheString);

                string strDrawingId;
                if (DrawingHost.UsertoDrawing.TryGetValue(UserId, out strDrawingId))
                {
                    strDrawingId += ";" + DrawingId;
                    DrawingHost.UsertoDrawing.Remove(UserId);
                }
                else
                    strDrawingId = DrawingId;
                
                DrawingHost.UsertoDrawing.Add(UserId, strDrawingId);
                var returnObject = new { returnCode = result, Cache = CacheString };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage Close(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.Close(DrawingId, Convert.ToInt32(UserId));

                string strDrawingId, strOut = "";

                if (DrawingHost.UsertoDrawing.TryGetValue(UserId, out strDrawingId))
                {
                    foreach (string drawingId in strDrawingId.Split(';').ToArray())
                    {
                        if (drawingId != DrawingId)
                            strOut += ";" + drawingId;
                    }
                    DrawingHost.UsertoDrawing.Remove(UserId);
                    if (strOut != "")
                        DrawingHost.UsertoDrawing.Add(UserId, strOut);
                }

                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }

            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage RegenerateDevice(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, Red, Green, Blue;
                double Width, Height;
                DrawingId = Val[0];

                Red = Val[1]; Green = Val[2]; Blue = Val[3]; string CacheString = "";
                Width = Convert.ToDouble(Val[4]);
                Height = Convert.ToDouble(Val[5]);

                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.RegenerateDevice(DrawingId, UserId, Red, Green, Blue, Width, Height, ref CacheString);
                var returnObject = new { returnCode = result, Cache = CacheString };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }

            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
       
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage Regenerate(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.Regenerate(DrawingId, UserId);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }

            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        /////////////////////////////////////////////Context///////////////////////////////////////////////////////////////
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ViewLayout(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayoutName;
                double Width, Height;

                DrawingId = Val[0];
                LayoutName = Val[1];
                Width = Convert.ToDouble(Val[2]);
                Height = Convert.ToDouble(Val[3]);

                string CacheString = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.ViewLayout(DrawingId, LayoutName, UserId, Width, Height, ref CacheString);
                var returnObject = new { returnCode = result, Cache = CacheString };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetAreaRatio(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double AreaRatio;
                DrawingId = Val[0];
                AreaRatio = Convert.ToDouble(Val[1]);

                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.SetAreaRatio(DrawingId, AreaRatio, UserId);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetDelimiter(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, RowDelimiter, ColumnDelimiter;
                DrawingId = Val[0];
                RowDelimiter = Val[1];
                ColumnDelimiter = Val[2];

                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.SetDelimiter(DrawingId, RowDelimiter, ColumnDelimiter, UserId);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetLayout(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayoutName;
                DrawingId = Val[0];
                LayoutName = Val[1];

                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.SetLayout(DrawingId, LayoutName, UserId);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("GET")]
        public HttpResponseMessage GetODAlibVersion()
        {
            string jsonResult;
            try
            {
                string libVersion = "";
                short result = DrawingHost.objCloud.GetODAlibVersion(HttpContext.Current.Request.PhysicalApplicationPath + "iWhizLib", ref libVersion);
                var returnObject = new { returnCode = result, ODALibVersion = libVersion.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetDWGVersion(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                string DWGVersion = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.GetDWGVersion(DrawingId, ref DWGVersion, UserId);
                var returnObject = new { returnCode = result, DWGVersion = DWGVersion.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllXrefs(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                string xrefFiles = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.GetAllXrefs(DrawingId, ref xrefFiles, UserId);
                var returnObject = new { returnCode = result, XrefFileNames = xrefFiles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllLayouts(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                string layoutnames = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.GetAllLayouts(DrawingId, ref layoutnames, UserId);

                var returnObject = new { returnCode = result, Layouts = layoutnames };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllTextStyles(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                string styles = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.GetAllTextStyles(DrawingId, ref styles, UserId);

                var returnObject = new { returnCode = result, StyleNames = styles.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllLineTypes(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                short count = 0;
                string lineTypes = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.GetAllLineTypes(DrawingId, ref count, ref lineTypes, UserId);

                var returnObject = new { returnCode = result, Count = count, LineTypes = lineTypes.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetXRefHandles(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                string xrefHandles = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.GetXRefHandles(DrawingId, ref xrefHandles, UserId);

                var returnObject = new { returnCode = result, XrefHandles = xrefHandles.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage IsTextStyleExists(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, TextStyle;
                DrawingId = Val[0];
                TextStyle = Val[1];

                bool isExists = false;
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.IsTextStyleExists(DrawingId, TextStyle, ref isExists, UserId);

                var returnObject = new { returnCode = result, IsExists = isExists };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetXRefPath(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, FileName, NewPath;
                DrawingId = Val[0];
                FileName = Val[1];
                NewPath = Val[2];
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.SetXRefPath(DrawingId, FileName, NewPath, UserId);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage AttachXref(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, FilePath;
                DrawingId = Val[0];
                FilePath = Val[1];
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.AttachXref(DrawingId, FilePath, UserId);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage DetachFailedXRefs(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                short result = DrawingHost.objCloud.DetachFailedXRefs(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetFailedXrefs(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, fileNames = "";
                DrawingId = Val[0];
                short result = DrawingHost.objCloud.GetFailedXrefs(DrawingId, ref fileNames, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, FileNames = fileNames };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage IsLayerFrozen(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                DrawingId = Val[0];
                LayerName = Val[1];

                bool isFrozen = false;
                short result = DrawingHost.objCloud.IsLayerFrozen(DrawingId, LayerName, ref isFrozen, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, IsFrozen = isFrozen };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetLayerColor(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                DrawingId = Val[0];
                LayerName = Val[1];

                short color = 0;

                short result = DrawingHost.objCloud.GetLayerColor(DrawingId, LayerName, ref color, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, AutocadColor = color };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetLayerInfo(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                DrawingId = Val[0];
                LayerName = Val[1];

                short color = 0;
                bool isvisible = false;
                string layerid = "";

                short result = DrawingHost.objCloud.GetLayerInfo(DrawingId, LayerName, ref isvisible, ref color, ref layerid, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, IsVisible = isvisible, AutocadColor = color, LayerId = layerid };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetLayerVisibility(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                bool IsVisible;
                DrawingId = Val[0];
                LayerName = Val[1];
                IsVisible = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.SetLayerVisibility(DrawingId, LayerName, IsVisible, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetLayersVisibility(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerNames;
                DrawingId = Val[0];
                LayerNames = Val[1];

                short result = DrawingHost.objCloud.SetLayersVisibility(DrawingId, LayerNames, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetLayerName(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerId;
                DrawingId = Val[0];
                LayerId = Val[1];

                string layerName = "";
                short result = DrawingHost.objCloud.GetLayerName(DrawingId, LayerId, ref layerName, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, LayerName = layerName };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateLayer(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                short AutoCadColor;
                bool IsVisible;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                IsVisible = Convert.ToBoolean(Val[3]);

                short result = DrawingHost.objCloud.CreateLayer(DrawingId, LayerName, AutoCadColor, IsVisible, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage RenameLayer(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, NewLayerName;

                DrawingId = Val[0];
                LayerName = Val[1];
                NewLayerName = Val[2];

                short result = DrawingHost.objCloud.RenameLayer(DrawingId, LayerName, NewLayerName, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage DeleteLayer(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;

                DrawingId = Val[0];
                LayerName = Val[1];

                short result = DrawingHost.objCloud.DeleteLayer(DrawingId, LayerName, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ThawAllFrozenLayers(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                short result = DrawingHost.objCloud.ThawAllFrozenLayers(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CheckForNonPlottableLayers(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                bool isNonPlottable = false;
                DrawingId = Val[0];

                short result = DrawingHost.objCloud.CheckForNonPlottableLayers(DrawingId, ref isNonPlottable, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, IsNonPlottable = isNonPlottable };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllLayers(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId = Val[0];
                string layernames = "";
                short result = DrawingHost.objCloud.GetAllLayers(DrawingId, ref layernames, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, Layers = layernames };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetLayerData(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId = Val[0];
                string layerinfo = "";
                short result = DrawingHost.objCloud.GetLayerData(DrawingId, ref layerinfo, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, LayerInfo = layerinfo };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [DeflateCompression]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ExportToPNG(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                byte[] exportedData = null;
                string fileName = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.ExportToPNG(DrawingId, UserId, ref exportedData, ref fileName);

                var returnObject = new { returnCode = result, ExportedData = Convert.ToBase64String(exportedData), FileName = fileName };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [DeflateCompression]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ExportToJPEG(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                byte[] exportedData = null;
                string fileName = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.ExportToJPEG(DrawingId, UserId, ref exportedData, ref fileName);

                var returnObject = new { returnCode = result, ExportedData = Convert.ToBase64String(exportedData), FileName = fileName };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [DeflateCompression]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ExportToBMP(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                byte[] exportedData = null;
                string fileName = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.ExportToBMP(DrawingId, UserId, ref exportedData, ref fileName);

                var returnObject = new { returnCode = result, ExportedData = Convert.ToBase64String(exportedData), FileName = fileName };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [DeflateCompression]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ExportToDWF(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short FileCode;
                DrawingId = Val[0];
                FileCode = Convert.ToInt16(Val[1]);

                byte[] exportedData = null;
                string fileName = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.ExportToDWF(DrawingId, FileCode, UserId, ref exportedData, ref fileName);

                var returnObject = new { returnCode = result, ExportedData = Convert.ToBase64String(exportedData), FileName = fileName };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [DeflateCompression]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ExportToSVG(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                byte[] exportedData = null;
                string fileName = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.ExportToSVG(DrawingId, UserId, ref exportedData, ref fileName);

                var returnObject = new { returnCode = result, ExportedData = Convert.ToBase64String(exportedData), FileName = fileName };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [DeflateCompression]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ExportToDXF(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short FileCode;
                DrawingId = Val[0];
                FileCode = Convert.ToInt16(Val[1]);

                byte[] exportedData = null;
                string fileName = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.ExportToDXF(DrawingId, FileCode, UserId, ref exportedData, ref fileName);

                var returnObject = new { returnCode = result, ExportedData = Convert.ToBase64String(exportedData), FileName = fileName };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [DeflateCompression]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ExportToDXB(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short FileCode;
                DrawingId = Val[0];
                FileCode = Convert.ToInt16(Val[1]);

                byte[] exportedData = null;
                string fileName = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.ExportToDXB(DrawingId, FileCode, UserId, ref exportedData, ref fileName);

                var returnObject = new { returnCode = result, ExportedData = Convert.ToBase64String(exportedData), FileName = fileName };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [DeflateCompression]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ExportToPDF(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayoutName;
                bool UsePlotStyle;
                DrawingId = Val[0];
                UsePlotStyle = Convert.ToBoolean(Val[1]);
                LayoutName = Val[2];

                byte[] exportedData = null;
                string fileName = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.ExportToPDF(DrawingId, UsePlotStyle, LayoutName, UserId, ref exportedData, ref fileName);

                var returnObject = new { returnCode = result, ExportedData = Convert.ToBase64String(exportedData), FileName = fileName };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ExportToXML(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                bool IsFile;
                DrawingId = Val[0];
                IsFile = Convert.ToBoolean(Val[1]);
                LayerName = Val[2];

                string exportedxml = "";
                byte[] exportedData = null;
                string fileName = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.ExportToXML(DrawingId, IsFile, LayerName, UserId, ref exportedxml, ref exportedData, ref fileName);

                string strexporteddata = "";
                if (IsFile)
                    strexporteddata = Convert.ToBase64String(exportedData);
                else
                    strexporteddata = "";
                var returnObject = new { returnCode = result, ExportedXml = exportedxml, ExportedData = strexporteddata, FileName = fileName };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ExportTo3DDWF(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                byte[] exportedData = null;
                string fileName = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                short result = DrawingHost.objCloud.ExportTo3DDWF(DrawingId, UserId, ref exportedData, ref fileName);

                var returnObject = new { returnCode = result, ExportedData = Convert.ToBase64String(exportedData), FileName = fileName };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SaveAs(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                bool ShowPreview;
                short FileCode;

                DrawingId = Val[0];
                ShowPreview = Convert.ToBoolean(Val[1]);
                FileCode = Convert.ToInt16(Val[2]);

                byte[] exportedData = null;
                string fileName = "", filePath = "";
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                int CustomerId = Convert.ToInt32((RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);

                short result = DrawingHost.objCloud.SaveAs(DrawingId, ShowPreview, FileCode, UserId, CustomerId, ref exportedData, ref fileName, ref filePath);

                var returnObject = new { returnCode = result, ExportedData = Convert.ToBase64String(exportedData), FileName = fileName, FilePath = filePath };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ZoomExtents(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double FieldWidth, FieldHeight, ViewPosX, ViewPosY;
                DrawingId = Val[0];
                FieldWidth = Convert.ToDouble(Val[1]);
                FieldHeight = Convert.ToDouble(Val[2]);
                ViewPosX = Convert.ToDouble(Val[3]);
                ViewPosY = Convert.ToDouble(Val[4]);

                short result = DrawingHost.objCloud.ZoomExtents(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value, FieldWidth, FieldHeight, ViewPosX, ViewPosY);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage UpdateViewport(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, ViewParams;
                double CanvasWidth, CanvasHeight;
                DrawingId = Val[0];
                ViewParams = Val[1];
                CanvasWidth = Convert.ToDouble(Val[2]);
                CanvasHeight = Convert.ToDouble(Val[3]);

                short result = DrawingHost.objCloud.UpdateViewport(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value, ViewParams, CanvasWidth, CanvasHeight);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        /////////////////////////////////////////////Entity///////////////////////////////////////////////////////////////        
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntityExtents(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                double minX = 0, minY = 0, maxX = 0, maxY = 0;
                short result = DrawingHost.objCloud.GetEntityExtents(DrawingId, EntityHandle, ref minX, ref minY, ref maxX, ref maxY, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, MinX = minX, MinY = minY, MaxX = maxX, MaxY = maxY };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntityMidPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                double midX = 0, midY = 0;
                short result = DrawingHost.objCloud.GetEntityMidPoint(DrawingId, EntityHandle, ref midX, ref midY, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, MidX = midX, MidY = midY };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntityMidPointMultiple(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                string midX = "", midY = "";
                short result = DrawingHost.objCloud.GetEntityMidPointMultiple(DrawingId, EntityHandle, ref midX, ref midY, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, MidX = midX, MidY = midY };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntityType(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                short typeId = 0;
                short result = DrawingHost.objCloud.GetEntityType(DrawingId, EntityHandle, ref typeId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, TypeId = typeId };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntityArea(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                string area = "";
                short result = DrawingHost.objCloud.GetEntityArea(DrawingId, EntityHandle, ref area, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, Area = area };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntityPerimeter(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                string perimeter = "";
                short result = DrawingHost.objCloud.GetEntityPerimeter(DrawingId, EntityHandle, ref perimeter, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, Perimeter = perimeter };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntityColor(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                short autocadColor = 0;
                short result = DrawingHost.objCloud.GetEntityColor(DrawingId, EntityHandle, ref autocadColor, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, AutocadColor = autocadColor };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllTexts(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                DrawingId = Val[0];
                LayerName = Val[1];

                string entitiesText = "";
                short result = DrawingHost.objCloud.GetAllTexts(DrawingId, LayerName, ref entitiesText, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntitiesText = entitiesText.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetTextStyle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                string TextStyle = "";
                short result = DrawingHost.objCloud.GetTextStyle(DrawingId, EntityHandle, ref TextStyle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, TextStyle = TextStyle.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllEntities(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                DrawingId = Val[0];
                LayerName = Val[1];

                string entities = "";
                short result = DrawingHost.objCloud.GetAllEntities(DrawingId, LayerName, ref entities, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandles = entities.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllContentTexts(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                DrawingId = Val[0];
                LayerName = Val[1];

                string contenttext = "";
                short result = DrawingHost.objCloud.GetAllContentTexts(DrawingId, LayerName, ref contenttext, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, ContentText = contenttext.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntityProperties(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                short typeId = 0;
                string properties = "";
                short result = DrawingHost.objCloud.GetEntityProperties(DrawingId, EntityHandle, ref typeId, ref properties, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, TypeId = typeId, Properties = properties };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetXdString(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, AppData;
                DrawingId = Val[0];
                EntityHandle = Val[1];
                AppData = Val[2];

                string xdata = "";
                short result = DrawingHost.objCloud.GetXdString(DrawingId, EntityHandle, AppData, ref xdata, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, XData = xdata };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetMLeaderArrowSize(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                double arrowSize = 0;
                short result = DrawingHost.objCloud.GetMLeaderArrowSize(DrawingId, EntityHandle, ref arrowSize, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, ArrowSize = arrowSize };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetTextInsertionPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                double insertionPointX = 0;
                double insertionPointY = 0;
                short result = DrawingHost.objCloud.GetTextInsertionPoint(DrawingId, EntityHandle, ref insertionPointX, ref insertionPointY, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, InsertionPointX = insertionPointX, InsertionPointY = insertionPointY };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetContentText(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                string textcontent = "";
                short result = DrawingHost.objCloud.GetContentText(DrawingId, EntityHandle, ref textcontent, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, TextContent = textcontent.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage Get3DEntities(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                DrawingId = Val[0];
                LayerName = Val[1];

                string entityHandles = "";
                short result = DrawingHost.objCloud.Get3DEntities(DrawingId, LayerName, ref entityHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandles = entityHandles.Trim() };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetPolylineInfo(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                bool isClosed = false;
                bool hasBulges = false;
                bool isOnlyLines = false;
                bool vertexCheck = false;
                short result = DrawingHost.objCloud.GetPolylineInfo(DrawingId, EntityHandle, ref isClosed, ref hasBulges, ref isOnlyLines, ref vertexCheck, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, IsClosed = isClosed, HasBulges = hasBulges, IsOnlyLines = isOnlyLines, VertexCheck = vertexCheck };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllPolylines(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                DrawingId = Val[0];
                LayerName = Val[1];
                string closedEntityHandles = "", openEntityHandles = "", otherEntityHandles = "";

                short result = DrawingHost.objCloud.GetAllPolylines(DrawingId, LayerName, ref closedEntityHandles, ref openEntityHandles, ref otherEntityHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, ClosedEntityHandles = closedEntityHandles.Trim(), OpenEntityHandles = openEntityHandles.Trim(), OtherEntityHandles = otherEntityHandles.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetPolylineCoordinates(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                string xCoords = "", yCoords = "";

                short result = DrawingHost.objCloud.GetPolylineCoordinates(DrawingId, EntityHandle, ref xCoords, ref yCoords, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, XCoords = xCoords.Trim(), YCoords = yCoords.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
       
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SearchForText(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, Text;
                bool IsExact;
                DrawingId = Val[0];
                Text = Val[1];
                IsExact = Convert.ToBoolean(Val[2]);

                string textHandles = "";

                short result = DrawingHost.objCloud.SearchForText(DrawingId, Text, IsExact, ref textHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, TextHandles = textHandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetTextSize(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                double size = 0;

                short result = DrawingHost.objCloud.GetTextSize(DrawingId, EntityHandle, ref size, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, TextSize = size };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntityText(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                string entitytext = "";
                bool ismultilinetext = false;

                short result = DrawingHost.objCloud.GetEntityText(DrawingId, EntityHandle, ref entitytext, ref ismultilinetext, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityText = entitytext, IsMultiLineText = ismultilinetext };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetTextProperties(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                bool isBold = false;
                bool isItalic = false;
                bool isUnderline = false;
                double textAngle = 0;
                string fontName = "";
                short result = DrawingHost.objCloud.GetTextProperties(DrawingId, EntityHandle, ref isBold, ref isItalic, ref isUnderline, ref textAngle, ref fontName, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, IsBold = isBold, IsItalic = isItalic, IsUnderline = isUnderline, TextAngle = textAngle, FontName = fontName };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntities(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, EntityHandles;
                short TypeId;
                bool IsHighlight;

                DrawingId = Val[0];
                LayerName = Val[1];
                EntityHandles = Val[2];
                TypeId = Convert.ToInt16(Val[3]);
                IsHighlight = Convert.ToBoolean(Val[4]);

                short result = DrawingHost.objCloud.GetEntities(DrawingId, LayerName, ref EntityHandles, TypeId, IsHighlight, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandles = EntityHandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntitiesWithMultipleTypes(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, EntityHandles, TypeId;
                bool IsHighlight;
                DrawingId = Val[0];
                LayerName = Val[1];
                EntityHandles = Val[2];
                TypeId = Val[3];
                IsHighlight = Convert.ToBoolean(Val[4]);

                short result = DrawingHost.objCloud.GetEntitiesWithMultipleTypes(DrawingId, LayerName, ref EntityHandles, TypeId, IsHighlight, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandles = EntityHandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllBlocks(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                string blockInfo = "";
                short result = DrawingHost.objCloud.GetAllBlocks(DrawingId, ref blockInfo, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, BlockInfo = blockInfo.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetBlockInfo(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, BlockHandle;
                DrawingId = Val[0];
                BlockHandle = Val[1];

                string blockName = "";
                string attributes = "";
                string comment = "";
                short result = DrawingHost.objCloud.GetBlockInfo(DrawingId, BlockHandle, ref blockName, ref attributes, ref comment, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, BlockName = blockName, Attributes = attributes, Comment = comment };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetBlockRefInfo(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, BlockRefHandle;
                DrawingId = Val[0];
                BlockRefHandle = Val[1];

                string blockHandle = "";
                string blockName = "";
                string values = "";
                short result = DrawingHost.objCloud.GetBlockRefInfo(DrawingId, BlockRefHandle, ref blockHandle, ref blockName, ref values, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, BlockHandle = blockHandle, BlockName = blockName, Values = values };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllBlockRef(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                DrawingId = Val[0];
                LayerName = Val[1];

                string blockrefhandles = "";
                short result = DrawingHost.objCloud.GetAllBlockRef(DrawingId, LayerName, ref blockrefhandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, BlockRefHandles = blockrefhandles.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllBlockRefOfBlockHandle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, BlockHandle;
                DrawingId = Val[0];
                LayerName = Val[1];
                BlockHandle = Val[2];

                string blockrefhandles = "";
                short result = DrawingHost.objCloud.GetAllBlockRefOfBlockHandle(DrawingId, LayerName, BlockHandle, ref blockrefhandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, BlockRefHandles = blockrefhandles.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllBlockRefOfBlockName(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, BlockName;
                DrawingId = Val[0];
                LayerName = Val[1];
                BlockName = Val[2];

                string blockrefhandles = "";
                short result = DrawingHost.objCloud.GetAllBlockRefOfBlockName(DrawingId, LayerName, BlockName, ref blockrefhandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, BlockRefHandles = blockrefhandles.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage BlockExplode(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, BlockRefHandle;
                DrawingId = Val[0];
                BlockRefHandle = Val[1];

                string TypeId = "", EntityData = "";
                short result = DrawingHost.objCloud.BlockExplode(DrawingId, BlockRefHandle, ref TypeId, ref EntityData, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, TypeId = TypeId, EntityData = EntityData };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetPolylinesWithPointInEntity(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                double XCoord, YCoord;

                DrawingId = Val[0];
                LayerName = Val[1];
                XCoord = Convert.ToDouble(Val[2]);
                YCoord = Convert.ToDouble(Val[3]);

                string entityHandles = "";
                short result = DrawingHost.objCloud.GetPolylinesWithPointInEntity(DrawingId, LayerName, XCoord, YCoord, ref entityHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandles = entityHandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetXdString(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, AppName, XData;
                DrawingId = Val[0];
                EntityHandle = Val[1];
                AppName = Val[2];
                XData = Val[3];

                short result = DrawingHost.objCloud.SetXdString(DrawingId, EntityHandle, AppName, XData, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetEntitiesVisibility(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandles;
                bool IsVisible;
                DrawingId = Val[0];
                EntityHandles = Val[1];
                IsVisible = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.SetEntitiesVisibility(DrawingId, EntityHandles, IsVisible, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetEntityLayer(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, LayerName;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                LayerName = Val[2];

                short result = DrawingHost.objCloud.SetEntityLayer(DrawingId, EntityHandle, LayerName, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntityLayer(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, strLayerName = "";

                DrawingId = Val[0];
                EntityHandle = Val[1];

                short result = DrawingHost.objCloud.GetEntityLayer(DrawingId, EntityHandle, ref strLayerName, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, LayerName = strLayerName };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetEntityColor(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                short AutocadColor;
                DrawingId = Val[0];
                EntityHandle = Val[1];
                AutocadColor = Convert.ToInt16(Val[2]);

                short result = DrawingHost.objCloud.SetEntityColor(DrawingId, EntityHandle, AutocadColor, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetEntitiesColor(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                short AutocadColor;
                DrawingId = Val[0];
                LayerName = Val[1];
                AutocadColor = Convert.ToInt16(Val[2]);

                short result = DrawingHost.objCloud.SetEntitiesColor(DrawingId, LayerName, AutocadColor, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetInsidePoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                int CursorIndex;
                double XCoord, YCoord;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                CursorIndex = Convert.ToInt32(Val[2]);
                XCoord = Convert.ToDouble(Val[3]);
                YCoord = Convert.ToDouble(Val[4]);

                double xcoord = XCoord, ycoord = YCoord;
                short result = DrawingHost.objCloud.GetInsidePoint(DrawingId, EntityHandle, CursorIndex, ref xcoord, ref ycoord, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, XCoord = xcoord, YCoord = ycoord };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetTextUnderline(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                bool IsUnderline;
                DrawingId = Val[0];
                EntityHandle = Val[1];
                IsUnderline = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.SetTextUnderline(DrawingId, EntityHandle, IsUnderline, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetEntityVisibility(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                bool IsVisible;
                DrawingId = Val[0];
                EntityHandle = Val[1];
                IsVisible = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.SetEntityVisibility(DrawingId, EntityHandle, IsVisible, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetTextSize(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double Size;
                DrawingId = Val[0];
                EntityHandle = Val[1];
                Size = Convert.ToDouble(Val[2]);

                short result = DrawingHost.objCloud.SetTextSize(DrawingId, EntityHandle, Size, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetText(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, Text;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                Text = Val[2];

                short result = DrawingHost.objCloud.SetText(DrawingId, EntityHandle, Text, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetTextStyle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, TextStyle;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                TextStyle = Val[2];

                short result = DrawingHost.objCloud.SetTextStyle(DrawingId, EntityHandle, TextStyle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetLineType(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, LineType;
                double LineTypeScale;
                DrawingId = Val[0];
                EntityHandle = Val[1];
                LineType = Val[2];
                LineTypeScale = Convert.ToDouble(Val[3]);

                short result = DrawingHost.objCloud.SetLineType(DrawingId, EntityHandle, LineType, LineTypeScale, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetMLeaderArrowSize(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double ArrowSize;
                DrawingId = Val[0];
                EntityHandle = Val[1];
                ArrowSize = Convert.ToDouble(Val[2]);

                short result = DrawingHost.objCloud.SetMLeaderArrowSize(DrawingId, EntityHandle, ArrowSize, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateLine(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                short AutoCadColor;
                double StartX, StartY, EndX, EndY;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                StartX = Convert.ToDouble(Val[3]);
                StartY = Convert.ToDouble(Val[4]);
                EndX = Convert.ToDouble(Val[5]);
                EndY = Convert.ToDouble(Val[6]);

                string entityhandle = "";
                short result = DrawingHost.objCloud.CreateLine(DrawingId, LayerName, AutoCadColor, StartX, StartY, EndX, EndY, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateText(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, Text, TextStyle;
                short AutoCadColor, StyleId;
                double StartX, StartY, Angle, Height, WidthFactor;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                StartX = Convert.ToDouble(Val[3]);
                StartY = Convert.ToDouble(Val[4]);
                Angle = Convert.ToDouble(Val[5]);
                Height = Convert.ToDouble(Val[6]);
                WidthFactor = Convert.ToDouble(Val[7]);
                Text = Val[8];
                TextStyle = Val[9];
                StyleId = Convert.ToInt16(Val[10]);

                string entityhandle = "";
                short result = DrawingHost.objCloud.CreateText(DrawingId, LayerName, AutoCadColor, StartX, StartY, Angle,
                         Height, WidthFactor, Text, TextStyle, StyleId, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateMultilineText(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, Text, TextStyle;
                short AutoCadColor, StyleId;
                double StartX, StartY, Angle, Height, WrapWidth, LineSpace;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                StartX = Convert.ToDouble(Val[3]);
                StartY = Convert.ToDouble(Val[4]);
                Angle = Convert.ToDouble(Val[5]);
                Height = Convert.ToDouble(Val[6]);
                WrapWidth = Convert.ToDouble(Val[7]);
                LineSpace = Convert.ToDouble(Val[8]);
                Text = Val[9];
                TextStyle = Val[10];
                StyleId = Convert.ToInt16(Val[11]);

                string entityhandle = "";
                short result = DrawingHost.objCloud.CreateMultilineText(DrawingId, LayerName, AutoCadColor, StartX, StartY, Angle,
                         Height, WrapWidth, LineSpace, Text, TextStyle, StyleId, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateRectangle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, LineType;
                short AutoCadColor;
                double CenterX, CenterY, Width, Height, LineWidth, LineTypeScale;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                CenterX = Convert.ToDouble(Val[3]);
                CenterY = Convert.ToDouble(Val[4]);
                Width = Convert.ToDouble(Val[5]);
                Height = Convert.ToDouble(Val[6]);
                LineWidth = Convert.ToDouble(Val[7]);
                LineType = Val[8];
                LineTypeScale = Convert.ToDouble(Val[9]);

                string entityhandle = "";
                short result = DrawingHost.objCloud.CreateRectangle(DrawingId, LayerName, AutoCadColor, CenterX, CenterY, Width,
                         Height, LineWidth, LineType, LineTypeScale, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateEllipse(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                short AutoCadColor;
                double CenterX, CenterY, VectorX, VectorY, RadiusRatio;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                CenterX = Convert.ToDouble(Val[3]);
                CenterY = Convert.ToDouble(Val[4]);
                VectorX = Convert.ToDouble(Val[5]);
                VectorY = Convert.ToDouble(Val[6]);
                RadiusRatio = Convert.ToDouble(Val[7]);

                string entityhandle = "";
                short result = DrawingHost.objCloud.CreateEllipse(DrawingId, LayerName, AutoCadColor, CenterX, CenterY, VectorX,
                         VectorY, RadiusRatio, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateLeader(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, Points, LineType;
                short AutoCadColor;
                double Size, Scale, LineTypeScale;
                bool AppDriven;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                Points = Val[3];
                Size = Convert.ToDouble(Val[4]);
                Scale = Convert.ToDouble(Val[5]);
                LineType = Val[6];
                LineTypeScale = Convert.ToDouble(Val[7]);
                AppDriven = Convert.ToBoolean(Val[8]);

                string entityhandle = "";
                short result = DrawingHost.objCloud.CreateLeader(DrawingId, LayerName, AutoCadColor, Points, Size, Scale,
                         LineType, LineTypeScale, AppDriven, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateArc(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                short AutoCadColor;
                double CenterX, CenterY, StartAngle, EndAngle, Radious;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                CenterX = Convert.ToDouble(Val[3]);
                CenterY = Convert.ToDouble(Val[4]);
                StartAngle = Convert.ToDouble(Val[5]);
                EndAngle = Convert.ToDouble(Val[6]);
                Radious = Convert.ToDouble(Val[7]);

                string entityhandle = "";
                short result = DrawingHost.objCloud.CreateArc(DrawingId, LayerName, AutoCadColor, CenterX, CenterY, StartAngle,
                         EndAngle, Radious, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateMultiLeader(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, TextHandle;
                short AutoCadColor;
                double StartX, StartY, EndX, EndY, ArrowSize, DogLength, LandingGap;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                StartX = Convert.ToDouble(Val[3]);
                StartY = Convert.ToDouble(Val[4]);
                EndX = Convert.ToDouble(Val[5]);
                EndY = Convert.ToDouble(Val[6]);
                ArrowSize = Convert.ToDouble(Val[7]);
                DogLength = Convert.ToDouble(Val[8]);
                LandingGap = Convert.ToDouble(Val[9]);
                TextHandle = Val[10];

                string entityhandle = "";
                short result = DrawingHost.objCloud.CreateMultiLeader(DrawingId, LayerName, AutoCadColor, StartX, StartY, EndX,
                         EndY, ArrowSize, DogLength, LandingGap, TextHandle, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateCircle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                short AutoCadColor;
                double CenterX, CenterY, Radius;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                CenterX = Convert.ToDouble(Val[3]);
                CenterY = Convert.ToDouble(Val[4]);
                Radius = Convert.ToDouble(Val[5]);

                string entityhandle = "";
                short result = DrawingHost.objCloud.CreateCircle(DrawingId, LayerName, AutoCadColor, CenterX, CenterY,
                                                                Radius, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateBlockRef(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, BlockHandle;
                short AutoCadColor;
                double XCoord, YCoord, Angle, Scale;

                DrawingId = Val[0];
                LayerName = Val[1];
                BlockHandle = Val[2];
                AutoCadColor = Convert.ToInt16(Val[3]);
                XCoord = Convert.ToDouble(Val[4]);
                YCoord = Convert.ToDouble(Val[5]);
                Angle = Convert.ToDouble(Val[6]);
                Scale = Convert.ToDouble(Val[7]);

                string entityhandle = "";
                short result = DrawingHost.objCloud.CreateBlockRef(DrawingId, LayerName, BlockHandle, AutoCadColor,
                                            XCoord, YCoord, Angle, Scale, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage DrawEllipseMarkup(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, LineType;
                double CenterX, CenterY, EndX, EndY, LineWidth, LineTypeScale;
                short AutoCadColor;
                bool IsCircle;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                CenterX = Convert.ToDouble(Val[3]);
                CenterY = Convert.ToDouble(Val[4]);
                EndX = Convert.ToDouble(Val[5]);
                EndY = Convert.ToDouble(Val[6]);
                LineWidth = Convert.ToDouble(Val[7]);
                LineType = Val[8];
                LineTypeScale = Convert.ToDouble(Val[9]);
                IsCircle = Convert.ToBoolean(Val[10]);

                string entityHandle = "";
                short result = DrawingHost.objCloud.DrawEllipseMarkup(DrawingId, LayerName, AutoCadColor, CenterX, CenterY,
                                            EndX, EndY, LineWidth, LineType, LineTypeScale, IsCircle, ref entityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityHandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage DrawCloudMarkup(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, Points, LineType;
                double BulgeSpace, LineWidth, LineTypeScale;
                short AutoCadColor;
                bool IsClosed;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                BulgeSpace = Convert.ToDouble(Val[3]);
                Points = Val[4];
                LineWidth = Convert.ToDouble(Val[5]);
                LineType = Val[6];
                LineTypeScale = Convert.ToDouble(Val[7]);
                IsClosed = Convert.ToBoolean(Val[8]);

                string entityHandle = "";
                short result = DrawingHost.objCloud.DrawCloudMarkup(DrawingId, LayerName, AutoCadColor, BulgeSpace,
                                            Points, LineWidth, LineType, LineTypeScale, IsClosed, ref entityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityHandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreatePolyLine(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, Points, LineType;
                short AutoCadColor;
                double LineWidth, LineTypeScale;
                bool IsClosed;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                Points = Val[3];
                LineWidth = Convert.ToDouble(Val[4]);
                LineType = Val[5];
                LineTypeScale = Convert.ToDouble(Val[6]);
                IsClosed = Convert.ToBoolean(Val[7]);


                string entityhandle = "";

                short result = DrawingHost.objCloud.CreatePolyLine(DrawingId, LayerName, AutoCadColor, Points, LineWidth, LineType, LineTypeScale, IsClosed, false, false, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateDimension(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                short AutoCadColor, DimensionType;
                double StartX, StartY, EndX, EndY, InsertionX, InsertionY, TextHeight, ArrowHeight;


                DrawingId = Val[0];
                LayerName = Val[1];
                DimensionType = Convert.ToInt16(Val[2]);
                StartX = Convert.ToDouble(Val[3]);
                StartY = Convert.ToDouble(Val[4]);
                EndX = Convert.ToDouble(Val[5]);
                EndY = Convert.ToDouble(Val[6]);
                InsertionX = Convert.ToDouble(Val[7]);
                InsertionY = Convert.ToDouble(Val[8]);
                TextHeight = Convert.ToDouble(Val[9]);
                ArrowHeight = Convert.ToDouble(Val[10]);
                AutoCadColor = Convert.ToInt16(Val[11]);

                string entityhandle = "";
                short result = DrawingHost.objCloud.CreateDimension(DrawingId, LayerName, DimensionType, StartX, StartY, EndX, EndY, InsertionX, InsertionY, TextHeight, ArrowHeight, AutoCadColor, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetOrderedSymbolPosition(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, PolylineHandle, SymbolCoords;
                int SymbolCount;

                DrawingId = Val[0];
                PolylineHandle = Val[1];
                SymbolCoords = Val[2];
                SymbolCount = Convert.ToInt32(Val[3]);

                string insertpositions = "";
                double scalefactor = 0;
                short result = DrawingHost.objCloud.GetOrderedSymbolPosition(DrawingId, PolylineHandle, SymbolCoords, SymbolCount, ref insertpositions, ref scalefactor, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, InsertPositions = insertpositions, ScaleFactor = scalefactor };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage InsertMultipleSymbol(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, TextXml;

                DrawingId = Val[0];
                TextXml = Val[1];

                string entityHandles = "";
                short result = DrawingHost.objCloud.InsertMultipleSymbol(DrawingId, TextXml, ref entityHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandles = entityHandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage InsertSymbol(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, RelativePoints, LineType;
                short AutoCadColor;
                double XCoord, YCoord, LineWidth, LineTypeScale;


                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                XCoord = Convert.ToDouble(Val[3]);
                YCoord = Convert.ToDouble(Val[4]);
                RelativePoints = Val[5];
                LineWidth = Convert.ToDouble(Val[6]);
                LineType = Val[7];
                LineTypeScale = Convert.ToDouble(Val[8]);

                string entityhandle = "", actualPoints = "";
                short result = DrawingHost.objCloud.InsertSymbol(DrawingId, LayerName, AutoCadColor, XCoord, YCoord,
                    RelativePoints, LineWidth, LineType, LineTypeScale, ref entityhandle, ref actualPoints, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle, ActualPoints = actualPoints };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateSymbol(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, ActualPoints, LineType;
                short AutoCadColor;
                double LineWidth, LineTypeScale;


                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                ActualPoints = Val[3];
                LineWidth = Convert.ToDouble(Val[4]);
                LineType = Val[5];
                LineTypeScale = Convert.ToDouble(Val[6]);

                string entityhandle = "";
                short result = DrawingHost.objCloud.CreateSymbol(DrawingId, LayerName, AutoCadColor, ActualPoints,
                                 LineWidth, LineType, LineTypeScale, ref entityhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage MoveSymbol(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, MidPoint;
                double XCoord, YCoord, TargetX, TargetY;


                DrawingId = Val[0];
                EntityHandle = Val[1];
                XCoord = Convert.ToDouble(Val[2]);
                YCoord = Convert.ToDouble(Val[3]);
                TargetX = Convert.ToDouble(Val[4]);
                TargetY = Convert.ToDouble(Val[5]);
                MidPoint = Val[6];

                string actualPoints = "", midPoint = MidPoint;
                short result = DrawingHost.objCloud.MoveSymbol(DrawingId, EntityHandle, XCoord, YCoord, TargetX,
                                            TargetY, ref midPoint, ref actualPoints, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, ActualPoints = actualPoints, MidPoint = midPoint };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage RotateSymbol(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, MidPoint;
                double BaseX, BaseY, RotationAngle;


                DrawingId = Val[0];
                EntityHandle = Val[1];
                BaseX = Convert.ToDouble(Val[2]);
                BaseY = Convert.ToDouble(Val[3]);
                RotationAngle = Convert.ToDouble(Val[4]);
                MidPoint = Val[5];

                string actualPoints = "", midPoint = MidPoint;
                double finalAngle = 0;
                short result = DrawingHost.objCloud.RotateSymbol(DrawingId, EntityHandle, BaseX, BaseY, RotationAngle,
                                            ref finalAngle, ref actualPoints, ref midPoint, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, FinalAngle = finalAngle, ActualPoints = actualPoints, MidPoint = midPoint };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage ScaleSymbol(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double ScaleFactor;


                DrawingId = Val[0];
                EntityHandle = Val[1];
                ScaleFactor = Convert.ToDouble(Val[2]);

                string actualPoints = "";
                short result = DrawingHost.objCloud.ScaleSymbol(DrawingId, EntityHandle, ScaleFactor, ref actualPoints, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, ActualPoints = actualPoints };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage InsertSymbolPlus(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, RelativePoints, LineType;
                short AutoCadColor;
                double XCoord, YCoord, LineWidth, LineTypeScale, ScaleFactor, RotationAngle;


                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                XCoord = Convert.ToDouble(Val[3]);
                YCoord = Convert.ToDouble(Val[4]);
                RelativePoints = Val[5];
                LineWidth = Convert.ToDouble(Val[6]);
                LineType = Val[7];
                LineTypeScale = Convert.ToDouble(Val[8]);
                ScaleFactor = Convert.ToDouble(Val[9]);
                RotationAngle = Convert.ToDouble(Val[10]);

                string entityhandle = "", actualPoints = "";
                short result = DrawingHost.objCloud.InsertSymbolPlus(DrawingId, LayerName, AutoCadColor, XCoord, YCoord,
                    RelativePoints, LineWidth, LineType, LineTypeScale, ScaleFactor, RotationAngle, ref entityhandle, ref actualPoints, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityhandle, ActualPoints = actualPoints };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateLink(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, Points;
                short AutoCadColor;
                double StartX, StartY, Angle, Scale, LineWidth;

                DrawingId = Val[0];
                LayerName = Val[1];
                StartX = Convert.ToDouble(Val[2]);
                StartY = Convert.ToDouble(Val[3]);
                Points = Val[4];
                Scale = Convert.ToDouble(Val[5]);
                Angle = Convert.ToDouble(Val[6]);
                AutoCadColor = Convert.ToInt16(Val[7]);
                LineWidth = Convert.ToDouble(Val[8]);

                string handle = "";
                short result = DrawingHost.objCloud.CreateLink(DrawingId, LayerName, StartX, StartY, Points, Scale, Angle, AutoCadColor, LineWidth, ref handle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, Handle = handle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage MoveLink(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double XCoord, YCoord;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                XCoord = Convert.ToDouble(Val[2]);
                YCoord = Convert.ToDouble(Val[3]);

                short result = DrawingHost.objCloud.MoveLink(DrawingId, EntityHandle, XCoord, YCoord, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage MoveEntity(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double XCoord, YCoord;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                XCoord = Convert.ToDouble(Val[2]);
                YCoord = Convert.ToDouble(Val[3]);

                short result = DrawingHost.objCloud.MoveEntity(DrawingId, EntityHandle, XCoord, YCoord, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage StartMovingTrails(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double XCoord, YCoord;
                bool IsMidPointBased;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                XCoord = Convert.ToDouble(Val[2]);
                YCoord = Convert.ToDouble(Val[3]);
                IsMidPointBased = Convert.ToBoolean(Val[4]);

                short result = DrawingHost.objCloud.StartMovingTrails(DrawingId, EntityHandle, XCoord, YCoord, IsMidPointBased, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage MoveWithMovingTrails(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double XCoord, YCoord;

                DrawingId = Val[0];
                XCoord = Convert.ToDouble(Val[1]);
                YCoord = Convert.ToDouble(Val[2]);

                short result = DrawingHost.objCloud.MoveWithMovingTrails(DrawingId, XCoord, YCoord, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage StopMovingTrails(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;

                DrawingId = Val[0];

                short result = DrawingHost.objCloud.StopMovingTrails(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage RotateLink(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double XCoord, YCoord, Angle;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                XCoord = Convert.ToDouble(Val[2]);
                YCoord = Convert.ToDouble(Val[3]);
                Angle = Convert.ToDouble(Val[4]);

                string actualPoints = "";
                short result = DrawingHost.objCloud.RotateLink(DrawingId, EntityHandle, XCoord, YCoord, Angle, ref actualPoints, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage RotateBlockRef(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double Angle;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                Angle = Convert.ToDouble(Val[2]);

                short result = DrawingHost.objCloud.RotateBlockRef(DrawingId, EntityHandle, Angle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage ScaleBlockRef(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double Scale;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                Scale = Convert.ToDouble(Val[2]);

                short result = DrawingHost.objCloud.ScaleBlockRef(DrawingId, EntityHandle, Scale, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage RotateText(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double Angle;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                Angle = Convert.ToDouble(Val[2]);

                short result = DrawingHost.objCloud.RotateText(DrawingId, EntityHandle, Angle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage BlockExplodeToEntities(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, BlockRefHandle, TargetLayer;

                DrawingId = Val[0];
                BlockRefHandle = Val[1];
                TargetLayer = Val[2];

                string newEntityHandles = "";
                short result = DrawingHost.objCloud.BlockExplodeToEntities(DrawingId, BlockRefHandle, TargetLayer, ref newEntityHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, NewEntityHandles = newEntityHandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetLayerColor(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                short AutoCadColor;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);

                short result = DrawingHost.objCloud.SetLayerColor(DrawingId, LayerName, AutoCadColor, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetTransparentBackground(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                short AutoCadColor, AlphaVal;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                AlphaVal = Convert.ToInt16(Val[3]);

                short result = DrawingHost.objCloud.SetTransparentBackground(DrawingId, EntityHandle, AutoCadColor, AlphaVal, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage ImportEntities(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, Filename, Layers;
                bool IsXref;

                DrawingId = Val[0];
                Filename = Val[1];
                Layers = Val[2];
                IsXref = Convert.ToBoolean(Val[3]);
                string LayerData = "";

                short result = DrawingHost.objCloud.ImportEntities(DrawingId, Filename, Layers, IsXref, ref LayerData, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, LayerData = LayerData };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage LoadXMLFile(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, Filename;

                DrawingId = Val[0];
                Filename = Val[1];

                string LayerName = "", LayerId = "";
                bool Visible = false;
                short result = DrawingHost.objCloud.LoadXMLFile(DrawingId, Filename, ref LayerName, ref LayerId, ref Visible, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, LayerName = LayerName, LayerId = LayerId, Visible = Visible };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage LoadXMLString(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, XMLString;

                DrawingId = Val[0];
                XMLString = Val[1];

                string LayerName = "", LayerId = "";
                bool Visible = false;
                short result = DrawingHost.objCloud.LoadXMLString(DrawingId, XMLString, ref LayerName, ref LayerId, ref Visible, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, LayerName = LayerName, LayerId = LayerId, Visible = Visible };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage HighlightEntities(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandles;

                DrawingId = Val[0];
                EntityHandles = Val[1];

                short result = DrawingHost.objCloud.HighlightEntities(DrawingId, EntityHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage DeHighlightEntities(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                short result = DrawingHost.objCloud.DeHighlightEntities(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage DeHighlightEntity(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;

                DrawingId = Val[0];
                EntityHandle = Val[1];

                short result = DrawingHost.objCloud.DeHighlightEntity(DrawingId, EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage HighlightPolyline(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double LineWidth;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                LineWidth = Convert.ToDouble(Val[2]);

                short result = DrawingHost.objCloud.HighlightPolyline(DrawingId, EntityHandle, LineWidth, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage HatchEntity(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, EntityHandle;
                short AutoCadColor, PatternId;
                double Angle, Scale;
                bool IsExtents;

                DrawingId = Val[0];
                LayerName = Val[1];
                EntityHandle = Val[2];
                AutoCadColor = Convert.ToInt16(Val[3]);
                Angle = Convert.ToDouble(Val[4]);
                Scale = Convert.ToDouble(Val[5]);
                PatternId = Convert.ToInt16(Val[6]);
                IsExtents = Convert.ToBoolean(Val[7]);

                string hatchhandle = "";
                short result = DrawingHost.objCloud.HatchEntity(DrawingId, LayerName, EntityHandle, AutoCadColor, Angle, Scale, PatternId, IsExtents, ref hatchhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, HatchHandle = hatchhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage BringToFront(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                short result = DrawingHost.objCloud.BringToFront(DrawingId, EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage PushToBack(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                short result = DrawingHost.objCloud.PushToBack(DrawingId, EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage Rectify3DEntities(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandles;
                DrawingId = Val[0];
                EntityHandles = Val[1];

                short result = DrawingHost.objCloud.Rectify3DEntities(DrawingId, EntityHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage ClosePolyline(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                bool IsClosed;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                IsClosed = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.ClosePolyline(DrawingId, EntityHandle, IsClosed, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage RemoveSameTerminalVertex(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandles;
                DrawingId = Val[0];
                EntityHandles = Val[1];

                short result = DrawingHost.objCloud.RemoveSameTerminalVertex(DrawingId, EntityHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage RemoveTinyEdges(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandles;
                DrawingId = Val[0];
                EntityHandles = Val[1];

                short result = DrawingHost.objCloud.RemoveTinyEdges(DrawingId, EntityHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage RemoveIntermediateVertices(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandles;
                DrawingId = Val[0];
                EntityHandles = Val[1];

                short result = DrawingHost.objCloud.RemoveIntermediateVertices(DrawingId, EntityHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage DeleteEntity(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                short result = DrawingHost.objCloud.DeleteEntity(DrawingId, EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage DeleteEntities(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                DrawingId = Val[0];
                LayerName = Val[1];

                short result = DrawingHost.objCloud.DeleteEntities(DrawingId, LayerName, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage HighlightMLeader(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double LineWidth;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                LineWidth = Convert.ToDouble(Val[2]);

                string highlighthandle = "";
                short result = DrawingHost.objCloud.HighlightMLeader(DrawingId, EntityHandle, LineWidth, ref highlighthandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, HighlightHandle = highlighthandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage HighlightPolylines(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                double LineWidth;

                DrawingId = Val[0];
                LayerName = Val[1];
                LineWidth = Convert.ToDouble(Val[2]);

                short result = DrawingHost.objCloud.HighlightPolylines(DrawingId, LayerName, LineWidth, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage HighlightEdge(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double XCoord, YCoord;
                short AutoCadColor;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                XCoord = Convert.ToDouble(Val[3]);
                YCoord = Convert.ToDouble(Val[4]);
                string highlightHandle = "";

                short result = DrawingHost.objCloud.HighlightEdge(DrawingId, EntityHandle, AutoCadColor, XCoord, YCoord, ref highlightHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, HighlightHandle = highlightHandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage HighlightVertex(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double XCoord, YCoord;
                short AutoCadColor;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                XCoord = Convert.ToDouble(Val[3]);
                YCoord = Convert.ToDouble(Val[4]);

                string highlightHandles = "";

                short result = DrawingHost.objCloud.HighlightVertex(DrawingId, EntityHandle, AutoCadColor, XCoord, YCoord, ref highlightHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, HighlightHandles = highlightHandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage MirrorPolyline(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, PolylineHandle;
                double PointX, PointY;

                DrawingId = Val[0];
                PolylineHandle = Val[1];
                PointX = Convert.ToDouble(Val[2]);
                PointY = Convert.ToDouble(Val[3]);

                string actualPoints = "";
                short result = DrawingHost.objCloud.MirrorPolyline(DrawingId, PolylineHandle, PointX, PointY, ref actualPoints, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, ActualPoints = actualPoints };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage FlipPolyline(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, PolylineHandle;
                double PointX, PointY;

                DrawingId = Val[0];
                PolylineHandle = Val[1];
                PointX = Convert.ToDouble(Val[2]);
                PointY = Convert.ToDouble(Val[3]);

                string actualPoints = "";
                short result = DrawingHost.objCloud.FlipPolyline(DrawingId, PolylineHandle, PointX, PointY, ref actualPoints, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, ActualPoints = actualPoints };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage MorphPolyline(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, PolylineHandles;

                DrawingId = Val[0];
                PolylineHandles = Val[1];

                short result = DrawingHost.objCloud.MorphPolyline(DrawingId, PolylineHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage AddLineType(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, StyleName, DashLength;
                short Dashes;

                DrawingId = Val[0];
                StyleName = Val[1];
                Dashes = Convert.ToInt16(Val[2]);
                DashLength = Val[3];

                short result = DrawingHost.objCloud.AddLineType(DrawingId, StyleName, Dashes, DashLength, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage AddTextStyle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, StyleName, FaceName;
                bool Bold, Italic;

                DrawingId = Val[0];
                StyleName = Val[1];
                FaceName = Val[2];
                Bold = Convert.ToBoolean(Val[3]);
                Italic = Convert.ToBoolean(Val[4]);

                short result = DrawingHost.objCloud.AddTextStyle(DrawingId, StyleName, FaceName, Bold, Italic, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage EnableSolidFill(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;

                DrawingId = Val[0];

                short result = DrawingHost.objCloud.EnableSolidFill(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SolidFillEnabled(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;

                DrawingId = Val[0];

                bool bIsEnabled = false;
                short result = DrawingHost.objCloud.SolidFillEnabled(DrawingId, ref bIsEnabled, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, IsEnabled = bIsEnabled };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetLineWeightDisplay(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                bool IsOn;

                DrawingId = Val[0];
                IsOn = Convert.ToBoolean(Val[1]);

                short result = DrawingHost.objCloud.SetLineWeightDisplay(DrawingId, IsOn, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage AlignPolylines(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, HandlesToAlign, BaseHandle;
                double Offset;
                short Side;

                DrawingId = Val[0];
                HandlesToAlign = Val[1];
                BaseHandle = Val[2];
                Side = Convert.ToInt16(Val[3]);
                Offset = Convert.ToDouble(Val[4]);

                short result = DrawingHost.objCloud.AlignPolylines(DrawingId, HandlesToAlign, BaseHandle, Side, Offset, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage DistributePolylines(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, Handles;
                short DistributionType;

                DrawingId = Val[0];
                Handles = Val[1];
                DistributionType = Convert.ToInt16(Val[2]);

                short result = DrawingHost.objCloud.DistributePolylines(DrawingId, Handles, DistributionType, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage DistributePolylinesWithOffset(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, Handles;
                short DistributionType, DistributionDirection;
                double Offset;

                DrawingId = Val[0];
                Handles = Val[1];
                DistributionType = Convert.ToInt16(Val[2]);
                DistributionDirection = Convert.ToInt16(Val[3]);
                Offset = Convert.ToDouble(Val[4]);

                short result = DrawingHost.objCloud.DistributePolylinesWithOffset(DrawingId, Handles, DistributionType, DistributionDirection, Offset, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SplitPolyline(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, Handle;
                double XCoord1, YCoord1, XCoord2, YCoord2;

                DrawingId = Val[0];
                Handle = Val[1];
                XCoord1 = Convert.ToDouble(Val[2]);
                YCoord1 = Convert.ToDouble(Val[3]);
                XCoord2 = Convert.ToDouble(Val[4]);
                YCoord2 = Convert.ToDouble(Val[5]);

                string newhandle1 = "", newhandle2 = "";
                short result = DrawingHost.objCloud.SplitPolyline(DrawingId, Handle, XCoord1, YCoord1, XCoord2, YCoord2, ref newhandle1, ref newhandle2, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, NewHandle1 = newhandle1, NewHandle2 = newhandle2 };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        /////////////////////////////////////////////Utility///////////////////////////////////////////////////////////////        
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage RGBToColorIndex(List<string> Val)
        {
            string jsonResult;
            try
            {
                short Red, Green, Blue;
                Red = Convert.ToInt16(Val[0]);
                Green = Convert.ToInt16(Val[1]);
                Blue = Convert.ToInt16(Val[2]);

                short colorIndex = 0;
                short result = DrawingHost.objCloud.RGBToColorIndex(HttpContext.Current.Request.PhysicalApplicationPath + "iWhizLib", Red, Green, Blue, ref colorIndex);

                var returnObject = new { returnCode = result, ColorIndex = colorIndex };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage ColorIndexToRGB(List<string> Val)
        {
            string jsonResult;
            try
            {
                short ColorIndex;
                ColorIndex = Convert.ToInt16(Val[0]);

                short red = 0;
                short green = 0;
                short blue = 0;
                short result = DrawingHost.objCloud.ColorIndexToRGB(HttpContext.Current.Request.PhysicalApplicationPath + "iWhizLib", ColorIndex, ref red, ref green, ref blue);

                var returnObject = new { returnCode = result, Red = red, Green = green, Blue = blue };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetClosestVertexOnPolyline(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, PolylineHandle;
                double XCoord, YCoord;

                DrawingId = Val[0];
                PolylineHandle = Val[1];
                XCoord = Convert.ToDouble(Val[2]);
                YCoord = Convert.ToDouble(Val[3]);

                short result = DrawingHost.objCloud.GetClosestVertexOnPolyline(DrawingId, PolylineHandle, ref XCoord, ref YCoord, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, XCoord = XCoord, YCoord = YCoord };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetClosestPointOnPolyline(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, PolylineHandle;
                double XCoord, YCoord;

                DrawingId = Val[0];
                PolylineHandle = Val[1];
                XCoord = Convert.ToDouble(Val[2]);
                YCoord = Convert.ToDouble(Val[3]);

                short result = DrawingHost.objCloud.GetClosestPointOnPolyline(DrawingId, PolylineHandle, ref XCoord, ref YCoord, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, XCoord = XCoord, YCoord = YCoord };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage PointInEntityWithTolerance(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, PolylineHandle;
                double XCoord, YCoord, Tolerance;
                short PointsToCheck;

                DrawingId = Val[0];
                PolylineHandle = Val[1];
                XCoord = Convert.ToDouble(Val[2]);
                YCoord = Convert.ToDouble(Val[3]);
                Tolerance = Convert.ToDouble(Val[4]);
                PointsToCheck = Convert.ToInt16(Val[5]);

                bool isInside = false;
                short result = DrawingHost.objCloud.PointInEntityWithTolerance(DrawingId, PolylineHandle, XCoord, YCoord, Tolerance, PointsToCheck, ref isInside, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, IsInside = isInside };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage PointInBlockRef(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double XCoord, YCoord;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                XCoord = Convert.ToDouble(Val[2]);
                YCoord = Convert.ToDouble(Val[3]);

                bool isInside = false;
                short result = DrawingHost.objCloud.PointInBlockRef(DrawingId, EntityHandle, XCoord, YCoord, ref isInside, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, IsInside = isInside };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage PointInEntity(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, PolylineHandle;
                double XCoord, YCoord;

                DrawingId = Val[0];
                PolylineHandle = Val[1];
                XCoord = Convert.ToDouble(Val[2]);
                YCoord = Convert.ToDouble(Val[3]);

                bool isInside = false;
                short result = DrawingHost.objCloud.PointInEntity(DrawingId, PolylineHandle, XCoord, YCoord, ref isInside, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, IsInside = isInside };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        /////////////////////////////////////////////Validation///////////////////////////////////////////////////////////////        
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage VerifyPolylineOverlap(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, FirstHandle, SecondHandle;
                DrawingId = Val[0];
                FirstHandle = Val[1];
                SecondHandle = Val[2];

                bool isOverlapped = false;
                short result = DrawingHost.objCloud.VerifyPolylineOverlap(DrawingId, FirstHandle, SecondHandle, ref isOverlapped, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, IsOverlapped = isOverlapped };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage VerifyPolylineAreaOverlap(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, FirstHandle, SecondHandle;
                DrawingId = Val[0];
                FirstHandle = Val[1];
                SecondHandle = Val[2];

                bool isOverlapped = false;
                short result = DrawingHost.objCloud.VerifyPolylineAreaOverlap(DrawingId, FirstHandle, SecondHandle, ref isOverlapped, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, IsOverlapped = isOverlapped };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetGrossCNHandles(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, GrossLayer, ConstructionLayer;
                DrawingId = Val[0];
                GrossLayer = Val[1];
                ConstructionLayer = Val[2];

                string grosshandle = "", constructionhandle = "";

                short result = DrawingHost.objCloud.GetGrossCNHandles(DrawingId, GrossLayer, ConstructionLayer, ref grosshandle, ref constructionhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, GrossHandle = grosshandle, ConstructionHandle = constructionhandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage ReleaseHandle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                bool IsSpace;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                IsSpace = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.ReleaseHandle(DrawingId, EntityHandle, IsSpace, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage ReleaseSymbol(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;

                DrawingId = Val[0];
                EntityHandle = Val[1];

                short result = DrawingHost.objCloud.ReleaseSymbol(DrawingId, EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage ReleaseLinkHandle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;

                DrawingId = Val[0];
                EntityHandle = Val[1];

                short result = DrawingHost.objCloud.ReleaseLinkHandle(DrawingId, EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage ReleaseBlockRefHandle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;

                DrawingId = Val[0];
                EntityHandle = Val[1];

                short result = DrawingHost.objCloud.ReleaseBlockRefHandle(DrawingId, EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetPerformanceIndex(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short Index;

                DrawingId = Val[0];
                Index = Convert.ToInt16(Val[1]);

                short result = DrawingHost.objCloud.SetPerformanceIndex(DrawingId, Index, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage LoadNetHandles(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;

                DrawingId = Val[0];

                short result = DrawingHost.objCloud.LoadNetHandles(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage LoadSpaceHandles(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;

                DrawingId = Val[0];

                short result = DrawingHost.objCloud.LoadSpaceHandles(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetHandle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                string EntityHandle;
                bool IsSpace;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                IsSpace = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.SetHandle(DrawingId, EntityHandle, IsSpace, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetSymbol(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                string EntityHandle;

                DrawingId = Val[0];
                EntityHandle = Val[1];

                short result = DrawingHost.objCloud.SetSymbol(DrawingId, EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetLinkHandle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                string EntityHandle;

                DrawingId = Val[0];
                EntityHandle = Val[1];

                short result = DrawingHost.objCloud.SetLinkHandle(DrawingId, EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetBlockRefHandle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                string EntityHandle;

                DrawingId = Val[0];
                EntityHandle = Val[1];

                string invalidHandles = "";
                short result = DrawingHost.objCloud.SetBlockRefHandle(DrawingId, EntityHandle, ref invalidHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, InvalidHandles = invalidHandles };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage VerifyNetLayer(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double Tolerance;

                DrawingId = Val[0];
                Tolerance = Convert.ToDouble(Val[1]);

                string validNTHandles = "", overlappedNTHandles = "", invalidNT_GROverlap = "", invalidNT_IntermediateVertices = "",
                    invalidNT_UnwantedVertices = "", invalidNT_TinyEdges = "", openNTHandles = "", otherEntities = "";

                short result = DrawingHost.objCloud.VerifyNetLayer(DrawingId, ref validNTHandles, ref overlappedNTHandles, ref invalidNT_GROverlap, ref invalidNT_IntermediateVertices,
                    ref invalidNT_UnwantedVertices, ref invalidNT_TinyEdges, ref openNTHandles, ref otherEntities, Tolerance, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new
                {
                    returnCode = result,
                    ValidNTHandles = validNTHandles,
                    OverlappedNTHandles = overlappedNTHandles,
                    InvalidNT_GROverlap = invalidNT_GROverlap,
                    InvalidNT_IntermediateVertices = invalidNT_IntermediateVertices,
                    InvalidNT_UnwantedVertices = invalidNT_UnwantedVertices,
                    InvalidNT_TinyEdges = invalidNT_TinyEdges,
                    OpenNTHandles = openNTHandles,
                    OtherEntities = otherEntities
                };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage VerifySpaceLayer(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double Tolerance;

                DrawingId = Val[0];
                Tolerance = Convert.ToDouble(Val[1]);

                string validSPHandles = "", overlappedSPHandles = "", invalidSP_GROverlap = "", invalidSP_IntermediateVertices = "",
                    invalidSP_UnwantedVertices = "", invalidSP_TinyEdges = "", openSPHandles = "", otherEntities = "";

                short result = DrawingHost.objCloud.VerifySpaceLayer(DrawingId, ref validSPHandles, ref overlappedSPHandles, ref invalidSP_GROverlap, ref invalidSP_IntermediateVertices,
                    ref invalidSP_UnwantedVertices, ref invalidSP_TinyEdges, ref openSPHandles, ref otherEntities, Tolerance, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new
                {
                    returnCode = result,
                    ValidSPHandles = validSPHandles,
                    OverlappedSPHandles = overlappedSPHandles,
                    InvalidSP_GROverlap = invalidSP_GROverlap,
                    InvalidSP_IntermediateVertices = invalidSP_IntermediateVertices,
                    InvalidSP_UnwantedVertices = invalidSP_UnwantedVertices,
                    InvalidSP_TinyEdges = invalidSP_TinyEdges,
                    OpenSPHandles = openSPHandles,
                    OtherEntities = otherEntities
                };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage ValidateNetLayer(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double SPOverlapTolerance, NTOverlapTolerance, NTSPOverlapTolerance, AreaTolerance;

                DrawingId = Val[0];
                SPOverlapTolerance = Convert.ToDouble(Val[1]);
                NTOverlapTolerance = Convert.ToDouble(Val[2]);
                NTSPOverlapTolerance = Convert.ToDouble(Val[3]);
                AreaTolerance = Convert.ToDouble(Val[4]);

                string validSPHandles = "", overlappedSPHandles = "", invalidSP_GROverlap = "", invalidSP_IntermediateVertices = "",
                    invalidSP_UnwantedVertices = "", invalidSP_TinyEdges = "", openSPHandles_SPLayer = "", otherEntities_SPLayer = "",
                    validNTHandles = "", overlappedNTHandles = "", invalidNT_GROverlap = "", invalidNT_IntermediateVertices = "",
                    invalidNT_UnwantedVertices = "", invalidNT_TinyEdges = "", openNTHandles_NTLayer = "", otherEntities_NTLayer = "",
                    validNTSPCombination = "", lessAreaNTSPCombination = "", moreAreaNTSPCombination = "", multipleNTInSP = "",
                    ntWithMultipleSP = "", ntWithoutSP = "", spWithoutNT = "", invalidNT = "";


                short result = DrawingHost.objCloud.ValidateNetLayer(DrawingId, SPOverlapTolerance, ref validSPHandles, ref overlappedSPHandles,
                    ref invalidSP_GROverlap, ref invalidSP_IntermediateVertices, ref invalidSP_UnwantedVertices, ref invalidSP_TinyEdges,
                    ref openSPHandles_SPLayer, ref otherEntities_SPLayer, NTOverlapTolerance, ref validNTHandles, ref overlappedNTHandles,
                    ref invalidNT_GROverlap, ref invalidNT_IntermediateVertices, ref invalidNT_UnwantedVertices, ref invalidNT_TinyEdges,
                    ref openNTHandles_NTLayer, ref otherEntities_NTLayer, NTSPOverlapTolerance, AreaTolerance, ref validNTSPCombination,
                    ref lessAreaNTSPCombination, ref moreAreaNTSPCombination, ref multipleNTInSP, ref ntWithMultipleSP,
                    ref ntWithoutSP, ref spWithoutNT, ref invalidNT, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new
                {
                    returnCode = result,
                    ValidSPHandles = validSPHandles,
                    OverlappedSPHandles = overlappedSPHandles,
                    InvalidSP_GROverlap = invalidSP_GROverlap,
                    InvalidSP_IntermediateVertices = invalidSP_IntermediateVertices,
                    InvalidSP_UnwantedVertices = invalidSP_UnwantedVertices,
                    InvalidSP_TinyEdges = invalidSP_TinyEdges,
                    OpenSPHandles_SPLayer = openSPHandles_SPLayer,
                    OtherEntities_SPLayer = otherEntities_SPLayer,
                    ValidNTHandles = validNTHandles,
                    OverlappedNTHandles = overlappedNTHandles,
                    InvalidNT_GROverlap = invalidNT_GROverlap,
                    InvalidNT_IntermediateVertices = invalidNT_IntermediateVertices,
                    InvalidNT_UnwantedVertices = invalidNT_UnwantedVertices,
                    InvalidNT_TinyEdges = invalidNT_TinyEdges,
                    OpenNTHandles_NTLayer = openNTHandles_NTLayer,
                    OtherEntities_NTLayer = otherEntities_NTLayer,
                    ValidNTSPCombination = validNTSPCombination,
                    LessAreaNTSPCombination = lessAreaNTSPCombination,
                    MoreAreaNTSPCombination = moreAreaNTSPCombination,
                    MultipleNTInSP = multipleNTInSP,
                    NTWithMultipleSP = ntWithMultipleSP,
                    NTWithoutSP = ntWithoutSP,
                    SPWithoutNT = spWithoutNT,
                    InvalidNT = invalidNT
                };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage CheckNTAndSPOverlapCN(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double Tolerance;

                DrawingId = Val[0];
                Tolerance = Convert.ToDouble(Val[1]);

                string invalidNTHandles = "", invalidSPHandles = "";
                short result = DrawingHost.objCloud.CheckNTAndSPOverlapCN(DrawingId, ref invalidNTHandles, ref invalidSPHandles, Tolerance, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, InvalidNTHandles = invalidNTHandles, InvalidSPHandles = invalidSPHandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SetIDrawingsLayer(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName;
                short LayerId;

                DrawingId = Val[0];
                LayerId = Convert.ToInt16(Val[1]);
                LayerName = Val[2];

                short result = DrawingHost.objCloud.SetIDrawingsLayer(DrawingId, LayerId, LayerName, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
       
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetHandleWithDWGPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double XCoord, YCoord;
                bool IsSpace;

                DrawingId = Val[0];
                XCoord = Convert.ToDouble(Val[1]);
                YCoord = Convert.ToDouble(Val[2]);
                IsSpace = Convert.ToBoolean(Val[3]);

                string EntityHandle = "";
                short result = DrawingHost.objCloud.GetHandleWithDWGPoint(DrawingId, XCoord, YCoord, IsSpace, ref EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = EntityHandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetSymbolWithDWGPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double XCoord, YCoord;
                bool IsHighlight;

                DrawingId = Val[0];
                XCoord = Convert.ToDouble(Val[1]);
                YCoord = Convert.ToDouble(Val[2]);
                IsHighlight = Convert.ToBoolean(Val[3]);

                string EntityHandle = "";
                short result = DrawingHost.objCloud.GetSymbolWithDWGPoint(DrawingId, XCoord, YCoord, IsHighlight, ref EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = EntityHandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetLinkHandleWithDWGPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double XCoord, YCoord;

                DrawingId = Val[0];
                XCoord = Convert.ToDouble(Val[1]);
                YCoord = Convert.ToDouble(Val[2]);

                string EntityHandle = "";
                short result = DrawingHost.objCloud.GetLinkHandleWithDWGPoint(DrawingId, XCoord, YCoord, ref EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = EntityHandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetBlockRefWithDWGPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double XCoord, YCoord;
                bool IsMultiple;

                DrawingId = Val[0];
                XCoord = Convert.ToDouble(Val[1]);
                YCoord = Convert.ToDouble(Val[2]);
                IsMultiple = Convert.ToBoolean(Val[3]);

                string EntityHandle = "";
                short result = DrawingHost.objCloud.GetBlockRefWithDWGPoint(DrawingId, XCoord, YCoord, IsMultiple, ref EntityHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = EntityHandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetNetHandlesForSpaceHandle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, SpaceHandle;
                double Tolerance;
                DrawingId = Val[0];
                SpaceHandle = Val[1];
                Tolerance = Convert.ToDouble(Val[2]);

                string netHandles = "";
                short result = DrawingHost.objCloud.GetNetHandlesForSpaceHandle(DrawingId, SpaceHandle, Tolerance, ref netHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, NetHandles = netHandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetNetAreaPerimeterForSpaceHandles(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, SpaceHandle;
                double Tolerance;
                DrawingId = Val[0];
                SpaceHandle = Val[1];
                Tolerance = Convert.ToDouble(Val[2]);

                string netHandles = "", areas = "", perimeters = "";
                short result = DrawingHost.objCloud.GetNetAreaPerimeterForSpaceHandles(DrawingId, SpaceHandle, Tolerance, ref netHandles, ref areas, ref perimeters, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, NetHandles = netHandles, Areas = areas, Perimeters = perimeters };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetHandleForTooltip(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, Priority;
                double XCoord, YCoord;
                DrawingId = Val[0];
                XCoord = Convert.ToDouble(Val[1]);
                YCoord = Convert.ToDouble(Val[2]);
                Priority = Val[3];
                string entityHandle = "", id = "";
                short handleType = 0;
                bool isactionpoint = false;
                short result = DrawingHost.objCloud.GetHandleForTooltip(DrawingId, XCoord, YCoord, Priority, ref entityHandle, ref handleType, ref id, ref isactionpoint, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityHandle, HandleType = handleType, Id = id, IsActionPoint = isactionpoint };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetHandleOnPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, Priority;
                double XCoord, YCoord;
                DrawingId = Val[0];
                XCoord = Convert.ToDouble(Val[1]);
                YCoord = Convert.ToDouble(Val[2]);
                Priority = Val[3];
                string entityHandle = "", id = "";
                short handleType = 0;
                bool isactionpoint = false;
                short result = DrawingHost.objCloud.GetHandleOnPoint(DrawingId, XCoord, YCoord, Priority, ref entityHandle, ref handleType, ref id, ref isactionpoint, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandle = entityHandle, HandleType = handleType, Id = id, IsActionPoint = isactionpoint };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetSymbols(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandles;
                bool IsHighlight;
                DrawingId = Val[0];
                EntityHandles = Val[1];
                IsHighlight = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.GetSymbols(DrawingId, ref EntityHandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value, IsHighlight);
                var returnObject = new { returnCode = result, EntityHandles = EntityHandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetHandles(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandles;
                bool IsSpace;
                DrawingId = Val[0];
                EntityHandles = Val[1];
                IsSpace = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.GetHandles(DrawingId, ref EntityHandles, IsSpace, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, EntityHandles = EntityHandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        /////////////////////////////////////////////Snap///////////////////////////////////////////////////////////////        
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SnapSymbol(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, NetHandle;
                double StartX, StartY, TargetX, TargetY, Tolerance;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                NetHandle = Val[2];
                StartX = Convert.ToDouble(Val[3]);
                StartY = Convert.ToDouble(Val[4]);
                TargetX = Convert.ToDouble(Val[5]);
                TargetY = Convert.ToDouble(Val[6]);
                Tolerance = Convert.ToDouble(Val[7]);

                double snappedangle = 0;
                string midpoint = "", actualpoints = "";
                bool isoverlapping = false;

                short result = DrawingHost.objCloud.SnapSymbol(DrawingId, EntityHandle, NetHandle, StartX, StartY, TargetX, TargetY, Tolerance, ref snappedangle, ref midpoint, ref actualpoints, ref isoverlapping, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, SnappedAngle = snappedangle, MidPoint = midpoint, ActualPoints = actualpoints, IsOverlapping = isoverlapping };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SnapPolylineEdge(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, TargetHandle;
                double StartX, StartY, TargetX, TargetY;
                short SnapDistance;
                bool InOrOut;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                TargetHandle = Val[2];
                StartX = Convert.ToDouble(Val[3]);
                StartY = Convert.ToDouble(Val[4]);
                TargetX = Convert.ToDouble(Val[5]);
                TargetY = Convert.ToDouble(Val[6]);
                SnapDistance = Convert.ToInt16(Val[7]);
                InOrOut = Convert.ToBoolean(Val[8]);

                double snappedangle = 0;
                string midpoint = "", actualpoints = "";
                bool isoverlapping = false;

                short result = DrawingHost.objCloud.SnapPolylineEdge(DrawingId, EntityHandle, TargetHandle, StartX, StartY, TargetX, TargetY, SnapDistance, InOrOut, ref actualpoints, ref isoverlapping, ref snappedangle, ref midpoint, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, ActualPoints = actualpoints, IsOverlapping = isoverlapping, SnappedAngle = snappedangle, MidPoint = midpoint };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SnapPolylineEdgeToLine(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, PolylineHandle, LineHandle;
                double PolylineX, PolylineY, LineX, LineY;
                short SnapDistance;

                DrawingId = Val[0];
                PolylineHandle = Val[1];
                LineHandle = Val[2];
                PolylineX = Convert.ToDouble(Val[3]);
                PolylineY = Convert.ToDouble(Val[4]);
                LineX = Convert.ToDouble(Val[5]);
                LineY = Convert.ToDouble(Val[6]);
                SnapDistance = Convert.ToInt16(Val[7]);


                double snappedangle = 0;
                string midpoint = "", actualpoints = "";
                bool ifoverlap = false;

                short result = DrawingHost.objCloud.SnapPolylineEdgeToLine(DrawingId, PolylineHandle, LineHandle, PolylineX, PolylineY, LineX, LineY, SnapDistance, ref ifoverlap, ref actualpoints, ref midpoint, ref snappedangle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, IfOverlap = ifoverlap, ActualPoints = actualpoints, MidPoint = midpoint, SnappedAngle = snappedangle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SnapEntityToBlock(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, BlockHandle;
                double StartX, StartY, TargetX, TargetY, Accuracy;


                DrawingId = Val[0];
                EntityHandle = Val[1];
                BlockHandle = Val[2];
                StartX = Convert.ToDouble(Val[3]);
                StartY = Convert.ToDouble(Val[4]);
                TargetX = Convert.ToDouble(Val[5]);
                TargetY = Convert.ToDouble(Val[6]);
                Accuracy = Convert.ToDouble(Val[7]);

                string midpoint = "", actualpoints = "";

                short result = DrawingHost.objCloud.SnapEntityToBlock(DrawingId, EntityHandle, BlockHandle, StartX, StartY, TargetX, TargetY, Accuracy, ref actualpoints, ref midpoint, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, ActualPoints = actualpoints, MidPoint = midpoint };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SnapPolylineVertex(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, TargetHandle, EntityHandle;
                double XCoord, YCoord, TargetX, TargetY;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                TargetHandle = Val[2];
                XCoord = Convert.ToDouble(Val[3]);
                YCoord = Convert.ToDouble(Val[4]);
                TargetX = Convert.ToDouble(Val[5]);
                TargetY = Convert.ToDouble(Val[6]);

                string actualPoints = "", midPoint = "";
                bool isOverlapping = false;
                short result = DrawingHost.objCloud.SnapPolylineVertex(DrawingId, EntityHandle, TargetHandle, XCoord, YCoord,
                                                    TargetX, TargetY, ref actualPoints, ref isOverlapping, ref midPoint, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, ActualPoints = actualPoints, IsOverlapping = isOverlapping, MidPoint = midPoint };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage SnapPolylineVertexToEdge(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, TargetHandle, StartHandle;
                double StartX, StartY, TargetX, TargetY, SnapDistance;
                bool IfSnapToMidPoint, InOrOut;

                DrawingId = Val[0];
                StartHandle = Val[1];
                TargetHandle = Val[2];
                StartX = Convert.ToDouble(Val[3]);
                StartY = Convert.ToDouble(Val[4]);
                TargetX = Convert.ToDouble(Val[5]);
                TargetY = Convert.ToDouble(Val[6]);
                SnapDistance = Convert.ToDouble(Val[7]);
                IfSnapToMidPoint = Convert.ToBoolean(Val[8]);
                InOrOut = Convert.ToBoolean(Val[9]);

                string actualPoints = "", midPoint = "";
                bool ifOverlap = false;
                double snappedAngle = 0;
                short result = DrawingHost.objCloud.SnapPolylineVertexToEdge(DrawingId, StartHandle, TargetHandle, StartX, StartY,
                                                    TargetX, TargetY, SnapDistance, IfSnapToMidPoint, InOrOut, ref ifOverlap,
                                                    ref snappedAngle, ref actualPoints, ref midPoint, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, IfOverlap = ifOverlap, SnappedAngle = snappedAngle, ActualPoints = actualPoints, MidPoint = midPoint };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
         [ValidateAntiForgeryToken]
        public HttpResponseMessage GetSaveFileFormats(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;

                DrawingId = Val[0];

                string fileFormats = "";
                short result = DrawingHost.objCloud.GetSaveFileFormats(DrawingId, ref fileFormats, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, FileFormats = fileFormats };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        ////////////////////////////////////////iDrawing Support wrappers //////////////////////////////////////////////////////////////////////
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntityLayerMultiple(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandles, LayerNames = "";

                DrawingId = Val[0];
                EntityHandles = Val[1];

                short result = DrawingHost.objCloud.GetEntityLayerMultiple(DrawingId, EntityHandles, ref LayerNames, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, LayerNames = LayerNames };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetIDrawingsLayers(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerDetails;

                DrawingId = Val[0];
                LayerDetails = Val[1];

                short result = DrawingHost.objCloud.SetIDrawingsLayers(DrawingId, LayerDetails, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }


        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage InitialLoadSettings(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short Index;
                bool IsSpace;

                DrawingId = Val[0];
                Index = Convert.ToInt16(Val[1]);
                IsSpace = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.InitialLoadSettings(DrawingId, Index, IsSpace, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }


        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetPolylineCoordinatesMultiple(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandles;
                DrawingId = Val[0];
                EntityHandles = Val[1];

                string xCoords = "", yCoords = "";

                short result = DrawingHost.objCloud.GetPolylineCoordinatesMultiple(DrawingId, EntityHandles, ref xCoords, ref yCoords, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, XCoords = xCoords.Trim(), YCoords = yCoords.Trim() };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateDataText(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, TextStyle, TextXml;
                short AutoCadColor, StyleId;
                double Angle, Height, WrapWidth, LineSpace;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                Angle = Convert.ToDouble(Val[3]);

                Height = Convert.ToDouble(Val[4]);
                WrapWidth = Convert.ToDouble(Val[5]);
                LineSpace = Convert.ToDouble(Val[6]);
                TextStyle = Val[7];
                StyleId = Convert.ToInt16(Val[8]);
                TextXml = Val[9];

                string entityhandles = "";
                short result = DrawingHost.objCloud.CreateDataText(DrawingId, LayerName, AutoCadColor, Angle,
                         Height, WrapWidth, LineSpace, TextStyle, StyleId, TextXml, ref entityhandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandles = entityhandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateCommonSymbolDataText(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, TextLayerName, TextStyle, SymbolLayerName, SymbolCords, SymbolLineType, TextXml;
                short TextColor, TextStyleId, SymbolColor;
                double TextAngle, TextHeight, TextWrapWidth, TextLineSpace, SymbolLineWidth, SymbolScale;

                DrawingId = Val[0];
                TextLayerName = Val[1];
                TextColor = Convert.ToInt16(Val[2]);
                TextAngle = Convert.ToDouble(Val[3]);
                TextHeight = Convert.ToDouble(Val[4]);
                TextWrapWidth = Convert.ToDouble(Val[5]);
                TextLineSpace = Convert.ToDouble(Val[6]);
                TextStyle = Val[7];
                TextStyleId = Convert.ToInt16(Val[8]);
                SymbolLayerName = Val[9];
                SymbolColor = Convert.ToInt16(Val[10]);
                SymbolCords = Val[11];
                SymbolLineWidth = Convert.ToDouble(Val[12]);
                SymbolLineType = Val[13];
                SymbolScale = Convert.ToDouble(Val[14]);
                TextXml = Val[15];

                string symbolhandles = "", texthandles = "";
                short result = DrawingHost.objCloud.CreateCommonSymbolDataText(DrawingId, TextLayerName, TextColor, TextAngle,
                         TextHeight, TextWrapWidth, TextLineSpace, TextStyle, TextStyleId, SymbolLayerName, SymbolColor, SymbolCords, SymbolLineWidth, SymbolLineType, SymbolScale, TextXml, ref symbolhandles, ref texthandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, SymbolHandles = symbolhandles, TextHandles = texthandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }


        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateSymbolDataText(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, TextStyle, TextXml;
                short AutoCadColor, StyleId;
                double Angle, Height, WrapWidth, LineSpace;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                Angle = Convert.ToDouble(Val[3]);

                Height = Convert.ToDouble(Val[4]);
                WrapWidth = Convert.ToDouble(Val[5]);
                LineSpace = Convert.ToDouble(Val[6]);
                TextStyle = Val[7];
                StyleId = Convert.ToInt16(Val[8]);
                TextXml = Val[9];

                string symbolhandles = "", texthandles = "", symboltexthandles = "", layerdetails = "";
                short result = DrawingHost.objCloud.CreateSymbolDataText(DrawingId, LayerName, AutoCadColor, Angle,
                         Height, WrapWidth, LineSpace, TextStyle, StyleId, TextXml, ref symbolhandles, ref texthandles, ref symboltexthandles, ref layerdetails, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, SymbolHandles = symbolhandles, TextHandles = texthandles, SymbolTextHandles = symboltexthandles, LayerDetails = layerdetails };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateBlockDataText(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, TextStyle, TextXml;
                short AutoCadColor, StyleId;
                double Angle, Height, WrapWidth, LineSpace;

                DrawingId = Val[0];
                AutoCadColor = Convert.ToInt16(Val[1]);
                Angle = Convert.ToDouble(Val[2]);

                Height = Convert.ToDouble(Val[3]);
                WrapWidth = Convert.ToDouble(Val[4]);
                LineSpace = Convert.ToDouble(Val[5]);
                TextStyle = Val[6];
                StyleId = Convert.ToInt16(Val[7]);
                TextXml = Val[8];

                string entityhandles = "", layerdetails = "";
                short result = DrawingHost.objCloud.CreateBlockDataText(DrawingId, AutoCadColor, Angle,
                         Height, WrapWidth, LineSpace, TextStyle, StyleId, TextXml, ref entityhandles, ref layerdetails, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, EntityHandles = entityhandles, LayerDetails = layerdetails };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateDistributionMap(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, ModuleNo, OrgLevelNo, OrgLevel, OrgLevelName, SiteName, BuildingName, FloorName, AreaUnit, GrossLayerName,MapDrawingId;
                bool IsNetCustomer, IsHatch;
                double AreaRatio, FieldWidth, FieldHeight, ViewPosX, ViewPosY, XPos, YPos;
                DrawingId = Val[0];
                ModuleNo = Val[1];
                OrgLevel = Val[2];
                OrgLevelNo = Val[3];
                OrgLevelName = Val[4];
                IsNetCustomer = Convert.ToBoolean(Val[5]);
                AreaRatio = Convert.ToDouble(Val[6]);
                AreaUnit = Val[7];
                SiteName = Val[8];
                BuildingName = Val[9];
                FloorName = Val[10];
                FieldWidth = Convert.ToDouble(Val[11]);
                FieldHeight = Convert.ToDouble(Val[12]);
                ViewPosX = Convert.ToDouble(Val[13]);
                ViewPosY = Convert.ToDouble(Val[14]);
                GrossLayerName = Val[15];
                IsHatch = Convert.ToBoolean(Val[16]);
                XPos = Convert.ToDouble(Val[17]);
                YPos = Convert.ToDouble(Val[18]);
                MapDrawingId = Val[19];

                string spaceHandles = "", legendhandle = "", legendblockhandle = "";
                int CustomerId = Convert.ToInt32((RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);

                short result = DrawingHost.objCloud.CreateDistributionMap(MapDrawingId,DrawingId, CustomerId, ModuleNo, OrgLevel, OrgLevelNo, OrgLevelName, IsNetCustomer, AreaRatio, AreaUnit, SiteName, BuildingName, FloorName, FieldWidth, FieldHeight, ViewPosX, ViewPosY, GrossLayerName, IsHatch, XPos, YPos, ref spaceHandles, ref legendhandle, ref legendblockhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, SpaceHandles = spaceHandles, LegendHandle = legendhandle, LegendBlockHandle = legendblockhandle };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateDistributionMapForValidatedFields(List<string> Val)
        {
            string jsonResult;
            try
            {
                string ArchiveId,DrawingId, ModuleNo, FieldId, ValidatedFieldName, SiteName, BuildingName, FloorName, AreaUnit, GrossLayerName,MapDrawingId;
                bool IsNetCustomer, IsHatch;
                double AreaRatio, FieldWidth, FieldHeight, ViewPosX, ViewPosY, XPos, YPos;
                DrawingId = Val[0];
                ModuleNo = Val[1];
                FieldId = Val[2];
                ValidatedFieldName = Val[3];
                IsNetCustomer = Convert.ToBoolean(Val[4]);
                AreaRatio = Convert.ToDouble(Val[5]);
                AreaUnit = Val[6];
                SiteName = Val[7];
                BuildingName = Val[8];
                FloorName = Val[9];
                FieldWidth = Convert.ToDouble(Val[10]);
                FieldHeight = Convert.ToDouble(Val[11]);
                ViewPosX = Convert.ToDouble(Val[12]);
                ViewPosY = Convert.ToDouble(Val[13]);
                GrossLayerName = Val[14];
                IsHatch = Convert.ToBoolean(Val[15]);
                XPos = Convert.ToDouble(Val[16]);
                YPos = Convert.ToDouble(Val[17]);
                MapDrawingId = Val[18];
                ArchiveId = Val[19];
                string spaceHandles = "", legendhandle = "", legendblockhandle = ""; ;
                int CustomerId = Convert.ToInt32((RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);

                short result = DrawingHost.objCloud.CreateDistributionMapForValidatedFields(ArchiveId,MapDrawingId, DrawingId, CustomerId, ModuleNo, FieldId, ValidatedFieldName, IsNetCustomer, AreaRatio, AreaUnit, SiteName, BuildingName, FloorName, FieldWidth, FieldHeight, ViewPosX, ViewPosY, GrossLayerName, IsHatch, XPos, YPos, ref spaceHandles, ref legendhandle, ref legendblockhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, SpaceHandles = spaceHandles, LegendHandle = legendhandle, LegendBlockHandle = legendblockhandle };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateDistributionMapOccupancy(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, ModuleNo, Target, SiteName, BuildingName, FloorName, AreaUnit, GrossLayerName;
                bool IsNetCustomer, IsHatch;
                double AreaRatio, FieldWidth, FieldHeight, ViewPosX, ViewPosY, XPos, YPos;
                DrawingId = Val[0];
                ModuleNo = Val[1];
                Target = Val[2];                
                IsNetCustomer = Convert.ToBoolean(Val[3]);
                AreaRatio = Convert.ToDouble(Val[4]);
                AreaUnit = Val[5];
                SiteName = Val[6];
                BuildingName = Val[7];
                FloorName = Val[8];
                FieldWidth = Convert.ToDouble(Val[9]);
                FieldHeight = Convert.ToDouble(Val[10]);
                ViewPosX = Convert.ToDouble(Val[11]);
                ViewPosY = Convert.ToDouble(Val[12]);
                GrossLayerName = Val[13];
                IsHatch = Convert.ToBoolean(Val[14]);
                XPos = Convert.ToDouble(Val[15]);
                YPos = Convert.ToDouble(Val[16]);

                string hatchedHandles = "", legendhandle = "", legendblockhandle = ""; ;
                int CustomerId = Convert.ToInt32((RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);

                short result = DrawingHost.objCloud.CreateDistributionMapOccupancy(DrawingId, CustomerId, ModuleNo, Target, IsNetCustomer, AreaRatio, AreaUnit, SiteName, BuildingName, FloorName, FieldWidth, FieldHeight, ViewPosX, ViewPosY, GrossLayerName, IsHatch, XPos, YPos, ref hatchedHandles, ref legendhandle, ref legendblockhandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, HatchedHandles = hatchedHandles, LegendHandle = legendhandle, LegendBlockHandle = legendblockhandle };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateLeaderMultiple(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, LayerName, DataXml, LineType;
                short AutoCadColor;
                double Size, Scale, LineTypeScale;

                DrawingId = Val[0];
                LayerName = Val[1];
                AutoCadColor = Convert.ToInt16(Val[2]);
                Size = Convert.ToDouble(Val[3]);
                Scale = Convert.ToDouble(Val[4]);
                LineType = Val[5];
                LineTypeScale = Convert.ToDouble(Val[6]);
                DataXml = Val[7];

                string leaderhandles = "";
                short result = DrawingHost.objCloud.CreateLeaderMultiple(DrawingId, LayerName, AutoCadColor, Size,
                         Scale, LineType, LineTypeScale, DataXml, ref leaderhandles, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, LeaderHandles = leaderhandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ScaleSymbolMultiple(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double ScaleFactor;


                DrawingId = Val[0];
                EntityHandle = Val[1];
                ScaleFactor = Convert.ToDouble(Val[2]);

                string xmldata = "";
                short result = DrawingHost.objCloud.ScaleSymbolMultiple(DrawingId, EntityHandle, ScaleFactor, ref xmldata, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, XMLData = xmldata };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage MoveEntityMultiple(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, XMLData;


                DrawingId = Val[0];
                XMLData = Val[1];

                string xmldata = "";
                short result = DrawingHost.objCloud.MoveEntityMultiple(DrawingId, XMLData, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetXdStringMultiple(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle, AppData;
                DrawingId = Val[0];
                EntityHandle = Val[1];
                AppData = Val[2];

                string xdata = "";
                short result = DrawingHost.objCloud.GetXdStringMultiple(DrawingId, EntityHandle, AppData, ref xdata, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, XData = xdata };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetTextMultiple(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, TextXml;
                DrawingId = Val[0];
                TextXml = Val[1];
                
                short result = DrawingHost.objCloud.SetTextMultiple(DrawingId, TextXml, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetGripPointsOfGivenEntity(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                string EntityHandle;
                DrawingId = Val[0];
                EntityHandle = Val[1];

                string points = "";
                short result = DrawingHost.objCloud.GetGripPointsOfGivenEntity(DrawingId, EntityHandle, ref points, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, Points = points };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CloneEntity(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                string EntityHandle;
                int GripIndex;
                DrawingId = Val[0];
                EntityHandle = Val[1];
                GripIndex = Convert.ToInt32(Val[2]);

                short result = DrawingHost.objCloud.CloneEntity(DrawingId, EntityHandle, GripIndex, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CloneEntityAtPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                int GripIndex;
                double MoveX, MoveY;

                DrawingId = Val[0];
                MoveX = Convert.ToDouble(Val[1]);
                MoveY = Convert.ToDouble(Val[2]);
                GripIndex = Convert.ToInt32(Val[3]);

                string prevHandle = "", snapHandle = ""; int cursorindex = 0;
                short result = DrawingHost.objCloud.CloneEntityAtPoint(DrawingId, MoveX, MoveY, GripIndex, ref prevHandle, ref cursorindex, ref snapHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, PreviousHandle = prevHandle, CursorIndex = cursorindex, SnapHandle = snapHandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage MoveEntityGrip(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                int GripIndex;
                double MoveX, MoveY;

                DrawingId = Val[0];
                MoveX = Convert.ToDouble(Val[1]);
                MoveY = Convert.ToDouble(Val[2]);
                GripIndex = Convert.ToInt32(Val[3]);

                bool isconnectorchanged = false;
                string outcomeid = "", fromid = "", toid = "", grippoints = "";
                short result = DrawingHost.objCloud.MoveEntityGrip(DrawingId, MoveX, MoveY, GripIndex, ref isconnectorchanged, ref outcomeid, ref fromid, ref toid, ref grippoints, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, IsConnectorChanged = isconnectorchanged, OutcomeId = outcomeid, FromId = fromid, ToId = toid, GripPoints = grippoints };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        
        //////////////////////////Flowchart////////////////////////////////////////
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateWorkFlow(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId,fileName;
                double Width, Height;
                
                DrawingId = Val[0];
                Width = Convert.ToDouble(Val[1]);
                Height = Convert.ToDouble(Val[2]);
                fileName = Convert.ToString(Val[3]);
                string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                string FileFolder = HttpContext.Current.Application["FileFolder"].ToString();

                string CacheString = "";
                short result = DrawingHost.objCloud.CreateWorkFlow(DrawingId, UserId, HttpContext.Current.Request.PhysicalApplicationPath + "iWhizLib", FileFolder, Width, Height, fileName, ref CacheString);

                string strDrawingId;
                if (DrawingHost.UsertoDrawing.TryGetValue(UserId, out strDrawingId))
                {
                    strDrawingId += ";" + DrawingId;
                    DrawingHost.UsertoDrawing.Remove(UserId);
                }
                else
                    strDrawingId = DrawingId;

                DrawingHost.UsertoDrawing.Add(UserId, strDrawingId);
                var returnObject = new { returnCode = result, Cache = CacheString };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateProcessBox(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double CenterX, CenterY, Width, Height;

                DrawingId = Val[0];
                CenterX = Convert.ToDouble(Val[1]);
                CenterY = Convert.ToDouble(Val[2]);
                Width = Convert.ToDouble(Val[3]);
                Height = Convert.ToDouble(Val[4]);
  
                string boxHandle = "";
                short result = DrawingHost.objCloud.CreateProcessBox(DrawingId, CenterX, CenterY, Width, Height, ref boxHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, BoxHandle = boxHandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateBoxTextOnFlowchart(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, BoxHandle, BoxText, ActionId;
                int ActionNo;

                DrawingId = Val[0];
                BoxHandle = Val[1];
                BoxText = Val[2];
                ActionId = Val[3];
                ActionNo = Convert.ToInt16(Val[4]);

                short result = DrawingHost.objCloud.CreateBoxTextOnFlowchart(DrawingId, BoxHandle, BoxText, ActionId, ActionNo, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CancelBox(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, BoxHandle;

                DrawingId = Val[0];
                BoxHandle = Val[1];

                short result = DrawingHost.objCloud.CancelBox(DrawingId, BoxHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetNearestSnapPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double xval = 0, yval = 0;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                xval = Convert.ToDouble(Val[2]);
                yval = Convert.ToDouble(Val[3]);

                bool isnear = false;
                short result = DrawingHost.objCloud.GetNearestSnapPoint(DrawingId, EntityHandle, ref xval, ref yval, ref isnear, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, XValue = xval, YValue = yval, IsNear = isnear };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
                
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetNearestSnapPointWithAllSnapPoints(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle,szSnapPoints = "";
                double xval = 0, yval = 0;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                xval = Convert.ToDouble(Val[2]);
                yval = Convert.ToDouble(Val[3]);

                bool isnear = false;
                short result = DrawingHost.objCloud.GetNearestSnapPointWithAllSnapPoints(DrawingId, EntityHandle, ref xval, ref yval, ref isnear, ref szSnapPoints,(RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, XValue = xval, YValue = yval, IsNear = isnear, SnapPoints = szSnapPoints };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CheckValidInOut(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EntityHandle;
                double xval = 0, yval = 0;

                DrawingId = Val[0];
                EntityHandle = Val[1];
                xval = Convert.ToDouble(Val[2]);
                yval = Convert.ToDouble(Val[3]);
                bool isSpace = Convert.ToBoolean(Val[4]);

                short result = DrawingHost.objCloud.CheckValidInOut(DrawingId, EntityHandle, xval, yval, isSpace, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateConnector(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, SourceHandle, TargetHandle;
                double SourceX, SourceY, TargetX, TargetY;

                DrawingId = Val[0];
                SourceHandle = Val[1];
                TargetHandle = Val[2];
                SourceX = Convert.ToDouble(Val[3]);
                SourceY = Convert.ToDouble(Val[4]);
                TargetX = Convert.ToDouble(Val[5]);
                TargetY = Convert.ToDouble(Val[6]);

                string entityHandle = "", fromActionId = "", toActionId = "";
                short result = DrawingHost.objCloud.CreateConnector(DrawingId, SourceHandle, TargetHandle, SourceX, SourceY, TargetX, TargetY, ref entityHandle, ref fromActionId, ref toActionId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, EntityHandle = entityHandle, FromActionId = fromActionId, ToActionId = toActionId };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }


        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CancelConnector(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, ConnectorHandle;

                DrawingId = Val[0];
                ConnectorHandle = Val[1];
                short result = DrawingHost.objCloud.CancelConnector(DrawingId, ConnectorHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateNextAction(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, ConnectorHandle, Id, ActionText;
                short Type, ActionNo;

                DrawingId = Val[0];
                ConnectorHandle = Val[1];
                Type = Convert.ToInt16(Val[2]);
                Id = Val[3];
                ActionText = Val[4];
                ActionNo = Convert.ToInt16(Val[5]);
                short result = DrawingHost.objCloud.CreateNextAction(DrawingId, ConnectorHandle, Type, Id, ActionText, ActionNo, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateConnectorTextOnFlowchart(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, ConnectorHandle, OutcomeId, ConnectorText;
                short ConnectorType;

                DrawingId = Val[0];
                ConnectorHandle = Val[1];
                ConnectorText = Val[2];
                OutcomeId = Val[3];
                ConnectorType = Convert.ToInt16(Val[4]);
                short result = DrawingHost.objCloud.CreateConnectorTextOnFlowchart(DrawingId, ConnectorHandle, ConnectorText, OutcomeId, ConnectorType, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SelectShape(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                double dX, dY;

                DrawingId = Val[0];
                dX = Convert.ToDouble(Val[1]);
                dY = Convert.ToDouble(Val[2]);

                string selectHandle = "";
                short typeId = 0;
                short result = DrawingHost.objCloud.SelectShape(DrawingId, dX, dY, ref selectHandle, ref typeId,(RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, SelectHandle = selectHandle, TypeId = typeId };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetActionParams(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short nAutoCadBoxFillColor;
                string szLineType;
                double dLineWidth, dLineTypeScale;

                DrawingId = Val[0];
                nAutoCadBoxFillColor = Convert.ToInt16(Val[1]);
                dLineWidth = Convert.ToDouble(Val[2]);
                szLineType = Val[3];
                dLineTypeScale = Convert.ToDouble(Val[4]);
                
                short result = DrawingHost.objCloud.SetActionParams(DrawingId, nAutoCadBoxFillColor, dLineWidth, szLineType, dLineTypeScale, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetActionTextParams(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short nAutoCadColor, nStyleId;
                string szTextStyle;
                double dAngle, dHeight, dWrapWidth, dLineSpace;

                DrawingId = Val[0];
                nAutoCadColor = Convert.ToInt16(Val[1]);
                dAngle = Convert.ToDouble(Val[2]);
                dHeight = Convert.ToDouble(Val[3]);
                dWrapWidth = Convert.ToDouble(Val[4]);
                dLineSpace = Convert.ToDouble(Val[5]);
                szTextStyle = Val[6];
                nStyleId = Convert.ToInt16(Val[7]);

                short result = DrawingHost.objCloud.SetActionTextParams(DrawingId, nAutoCadColor, dAngle, dHeight, dWrapWidth, dLineSpace, szTextStyle, nStyleId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetOutcomeParams(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short nAutoCadColor;
                string szLineType;
                double dArrowsize, dScale, dLineTypeScale;

                DrawingId = Val[0];
                nAutoCadColor = Convert.ToInt16(Val[1]);
                dArrowsize = Convert.ToDouble(Val[2]);
                dScale = Convert.ToDouble(Val[3]);
                szLineType = Val[4];
                dLineTypeScale = Convert.ToDouble(Val[5]);
               

                short result = DrawingHost.objCloud.SetOutcomeParams(DrawingId, nAutoCadColor, dArrowsize, dScale, szLineType, dLineTypeScale, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetOutcomeTextParams(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short nAutoCadColor, nStyleId;
                string szTextStyle;
                double dAngle, dHeight, dWrapWidth, dLineSpace;

                DrawingId = Val[0];
                nAutoCadColor = Convert.ToInt16(Val[1]);
                dAngle = Convert.ToDouble(Val[2]);
                dHeight = Convert.ToDouble(Val[3]);
                dWrapWidth = Convert.ToDouble(Val[4]);
                dLineSpace = Convert.ToDouble(Val[5]);
                szTextStyle = Val[6];
                nStyleId = Convert.ToInt16(Val[7]);


                short result = DrawingHost.objCloud.SetOutcomeTextParams(DrawingId, nAutoCadColor, dAngle, dHeight, dWrapWidth, dLineSpace, szTextStyle, nStyleId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetCircleOfFlowchartParams(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short nAutoCadCircleColor, nAutoCadCircleFillColor;
                double dRadious, dTextHeight;

                DrawingId = Val[0];
                nAutoCadCircleColor = Convert.ToInt16(Val[1]);
                nAutoCadCircleFillColor = Convert.ToInt16(Val[2]);
                dRadious = Convert.ToDouble(Val[3]);
                dTextHeight = Convert.ToDouble(Val[4]);

                short result = DrawingHost.objCloud.SetCircleOfFlowchartParams(DrawingId, nAutoCadCircleColor, nAutoCadCircleFillColor, dRadious, dTextHeight, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetEndRectangleParams(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short nAutoCadBoxColor, nAutoCadBoxFillColor;
                double dLineWidth, dLineTypeScale;
                string szLineType;

                DrawingId = Val[0];
                nAutoCadBoxColor = Convert.ToInt16(Val[1]);
                nAutoCadBoxFillColor = Convert.ToInt16(Val[2]);
                dLineWidth = Convert.ToDouble(Val[3]);
                szLineType = Val[4];
                dLineTypeScale = Convert.ToDouble(Val[5]);

                short result = DrawingHost.objCloud.SetEndRectangleParams(DrawingId, nAutoCadBoxColor, nAutoCadBoxFillColor, dLineWidth, szLineType, dLineTypeScale, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetEndRectangleTextParams(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short nAutoCadColor, nStyleId;
                string szTextStyle;
                double dAngle, dHeight, dWrapWidth, dLineSpace;

                DrawingId = Val[0];
                nAutoCadColor = Convert.ToInt16(Val[1]);
                dAngle = Convert.ToDouble(Val[2]);
                dHeight = Convert.ToDouble(Val[3]);
                dWrapWidth = Convert.ToDouble(Val[4]);
                dLineSpace = Convert.ToDouble(Val[5]);
                szTextStyle = Val[6];
                nStyleId = Convert.ToInt16(Val[7]);

                short result = DrawingHost.objCloud.SetEndRectangleTextParams(DrawingId, nAutoCadColor, dAngle, dHeight, dWrapWidth, dLineSpace, szTextStyle, nStyleId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage UpdateTextOnFlowchart(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                bool bIsActionpoint;
                string szId, szText;

                DrawingId = Val[0];
                bIsActionpoint = Convert.ToBoolean(Val[1]);
                szId = Val[2];
                szText = Val[3];

                short result = DrawingHost.objCloud.UpdateTextOnFlowchart(DrawingId, bIsActionpoint, szId, szText, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage UpdateTextsOnFlowchart(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, TextXml;

                DrawingId = Val[0];
                TextXml = Val[1];

                short result = DrawingHost.objCloud.UpdateTextsOnFlowchart(DrawingId, TextXml, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SelectTextOfShape(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, szId = "";
                bool bIsBox = false;
                double dXCoord, dYCoord;

                DrawingId = Val[0];
                dXCoord = Convert.ToDouble(Val[1]);
                dYCoord = Convert.ToDouble(Val[2]);

                short result = DrawingHost.objCloud.SelectTextOfShape(DrawingId, dXCoord, dYCoord, ref bIsBox, ref szId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, IsBox = bIsBox, Id = szId };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetBoxId(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, BoxHandle, szActionId = "";             

                DrawingId = Val[0];
                BoxHandle = Val[1];

                short result = DrawingHost.objCloud.GetBoxId(DrawingId, BoxHandle, ref szActionId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, ActionId = szActionId };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetConnectorId(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, ConnectorHandle, szOutcomeId = "";

                DrawingId = Val[0];
                ConnectorHandle = Val[1];

                short result = DrawingHost.objCloud.GetConnectorId(DrawingId, ConnectorHandle, ref szOutcomeId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, OutcomeId = szOutcomeId };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetItemId(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, Handle, szId = "";
                bool bisActionPoint = false;

                DrawingId = Val[0];
                Handle = Val[1];

                short result = DrawingHost.objCloud.GetItemId(DrawingId, Handle, ref szId, ref bisActionPoint, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, Id = szId, IsActionPoint = bisActionPoint };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage DeleteActionPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, ActionId;

                DrawingId = Val[0];
                ActionId = Val[1];

                string szDeletedOutcomeIds = "";
                short result = DrawingHost.objCloud.DeleteActionPoint(DrawingId, ActionId, ref szDeletedOutcomeIds, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, DeletedOutcomeIds = szDeletedOutcomeIds };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage DeleteOutcome(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, OutcomeId;

                DrawingId = Val[0];
                OutcomeId = Val[1];

                short result = DrawingHost.objCloud.DeleteOutcome(DrawingId, OutcomeId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage DeleteEndRectangle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EndRectId;

                DrawingId = Val[0];
                EndRectId = Val[1];

                short result = DrawingHost.objCloud.DeleteEndRectangle(DrawingId, EndRectId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ShowHideCirclesInFlowchart(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                bool bIsShow = false;

                DrawingId = Val[0];
                bIsShow = Convert.ToBoolean(Val[1]);

                short result = DrawingHost.objCloud.ShowHideCirclesInFlowchart(DrawingId, bIsShow, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ShowHideActionPointsInFlowchart(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                string ActionPointIds = "";
                bool bIsShow = false;

                DrawingId = Val[0];
                ActionPointIds = Val[1];
                bIsShow = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.ShowHideActionPointsInFlowchart(DrawingId, ActionPointIds, bIsShow, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ShowHideOutcomesInFlowchart(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                string OutcomeIds = "";
                bool bIsShow = false;

                DrawingId = Val[0];
                OutcomeIds = Val[1];
                bIsShow = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.ShowHideOutcomesInFlowchart(DrawingId, OutcomeIds, bIsShow, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ShowHideEndPointsInFlowchart(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                string EndPoints = "";
                bool bIsShow = false;

                DrawingId = Val[0];
                EndPoints = Val[1];
                bIsShow = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.ShowHideEndPointsInFlowchart(DrawingId, EndPoints, bIsShow, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ArrangeFlowchart(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                int ArrangeType;
                bool bIsByActionNumber = false;

                DrawingId = Val[0];
                ArrangeType = Convert.ToInt16(Val[1]);
                bIsByActionNumber = Convert.ToBoolean(Val[2]);

                short result = DrawingHost.objCloud.ArrangeFlowchart(DrawingId, ArrangeType, bIsByActionNumber, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetBoxCount(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short Count;

                DrawingId = Val[0];
                Count = Convert.ToInt16(Val[1]);

                short result = DrawingHost.objCloud.SetBoxCount(DrawingId, Count, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateActionPoints(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, TextXml;

                DrawingId = Val[0];
                TextXml = Val[1];

                short result = DrawingHost.objCloud.CreateActionPoints(DrawingId, TextXml, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateEndPoints(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, TextXml;

                DrawingId = Val[0];
                TextXml = Val[1];
                
                short result = DrawingHost.objCloud.CreateEndPoints(DrawingId, TextXml, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateOutcomes(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, TextXml;

                DrawingId = Val[0];
                TextXml = Val[1];
                
                short result = DrawingHost.objCloud.CreateOutcomes(DrawingId, TextXml, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateActionPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, ActionId, Text, Coordinates;
                short ActionNumber;

                DrawingId = Val[0];
                ActionId = Val[1];
                Text = Val[2];
                ActionNumber = Convert.ToInt16(Val[3]);
                Coordinates = Val[4];

                short result = DrawingHost.objCloud.CreateActionPoint(DrawingId, ActionId, Text, ActionNumber, Coordinates, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateEndPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, EndId, Text, Coordinates;

                DrawingId = Val[0];
                EndId = Val[1];
                Text = Val[2];
                Coordinates = Val[3];

                short result = DrawingHost.objCloud.CreateEndPoint(DrawingId, EndId, Text, Coordinates, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage CreateOutcome(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, OutcomeId, Text, Coordinates, FromActionId, ToActionId, EndActionType, EndActionText;
                short ConnectorType;
                bool HideTimeout;

                DrawingId = Val[0];
                OutcomeId = Val[1];
                Text = Val[2];
                FromActionId = Val[3];
                ToActionId = Val[4];
                EndActionType = Val[5];
                EndActionText = Val[6];
                ConnectorType = Convert.ToInt16(Val[7]);
                Coordinates = Val[8];
                HideTimeout = Convert.ToBoolean(Val[9]);

                short result = DrawingHost.objCloud.CreateOutcome(DrawingId, OutcomeId, Text, FromActionId, ToActionId, EndActionType, EndActionText, ConnectorType, Coordinates, HideTimeout, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetFlowchartDefaultParams(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;

                DrawingId = Val[0];

                short result = DrawingHost.objCloud.SetFlowchartDefaultParams(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SaveFlowchartView(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;

                DrawingId = Val[0];
                string szXmlData = "";

                short result = DrawingHost.objCloud.SaveFlowchartView(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value, ref szXmlData);
                var returnObject = new { returnCode = result, XMLData = szXmlData };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage OpenFlowchartView(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;

                DrawingId = Val[0];
                string szXmlData = Val[1];

                short result = DrawingHost.objCloud.OpenFlowchartView(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value, szXmlData);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetBoxHandle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, szBoxHandle = "", ActionId;

                DrawingId = Val[0];
                ActionId = Val[1];

                short result = DrawingHost.objCloud.GetBoxHandle(DrawingId, ActionId, ref szBoxHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, BoxHandle = szBoxHandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetConnectorHandle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, szConnectorHandle = "", OutcomeId;

                DrawingId = Val[0];
                OutcomeId = Val[1];

                short result = DrawingHost.objCloud.GetConnectorHandle(DrawingId, OutcomeId, ref szConnectorHandle, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, ConnectorHandle = szConnectorHandle };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetAllIdsInFlowchart(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, szActionIds = "", szOutcomeIds = "", szEndPointIds = "";

                DrawingId = Val[0];

                short result = DrawingHost.objCloud.GetAllIdsInFlowchart(DrawingId, ref szActionIds, ref szOutcomeIds, ref szEndPointIds, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, ActionIds = szActionIds, OutcomeIds = szOutcomeIds, EndPointIds = szEndPointIds };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage IsItemExistsOnFlowchart(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, Id;
                short ItemType;
                bool bIsExists = false;

                DrawingId = Val[0];
                ItemType = Convert.ToInt16(Val[1]);
                Id = Val[2];

                short result = DrawingHost.objCloud.IsItemExistsOnFlowchart(DrawingId, ItemType, Id, ref bIsExists, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, IsExists = bIsExists };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetOutcomeDetails(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, OutcomeId, szFromActionId = "", szToActionId = "", szOutcomeText = "";

                DrawingId = Val[0];
                OutcomeId = Val[1];

                short result = DrawingHost.objCloud.GetOutcomeDetails(DrawingId, OutcomeId, ref szFromActionId, ref szToActionId, ref szOutcomeText, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, FromActionId = szFromActionId, ToActionId = szToActionId, OutcomeText = szOutcomeText };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage ExitGripMode(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;

                DrawingId = Val[0];

                short result = DrawingHost.objCloud.ExitGripMode(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetSelectedFlowchartId(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, Handle, szId = "";
                bool bIsActionPoint = false;

                DrawingId = Val[0];
                Handle = Val[1];

                short result = DrawingHost.objCloud.GetSelectedFlowchartId(DrawingId, Handle, ref szId, ref bIsActionPoint, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, Id = szId, IsActionPoint = bIsActionPoint };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage InitiateWorkFlow(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;

                DrawingId = Val[0];
                short result = DrawingHost.objCloud.InitiateWorkFlow(DrawingId,  (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage MoveActionPoint(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                short Direction;

                DrawingId = Val[0];
                Direction = Convert.ToInt16(Val[1]);
                short result = DrawingHost.objCloud.MoveActionPoint(DrawingId, Direction,(RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage GetEntityAndSnapPoints(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId,  szSnapPoints = "",szSnapHandle = "";
                double CurrentX,CurrentY,xval = 0, yval = 0;

                DrawingId = Val[0];
                CurrentX = Convert.ToDouble(Val[1]);
                CurrentY = Convert.ToDouble(Val[2]);
                
                short result = DrawingHost.objCloud.GetEntityAndSnapPoints(DrawingId, CurrentX,CurrentY,ref szSnapHandle,ref xval, ref yval,  ref szSnapPoints, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, SnapHandle = szSnapHandle, XValue = xval, YValue = yval, SnapPoints = szSnapPoints };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage StartUndoRecording(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                short result = DrawingHost.objCloud.StartUndoRecording(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage DisableUndoRecording(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                short result = DrawingHost.objCloud.DisableUndoRecording(DrawingId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage Undo(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                string changedOutcomeId = "", changedFromId = "", changedToId = "";
                short result = DrawingHost.objCloud.Undo(DrawingId, ref changedOutcomeId, ref changedFromId, ref changedToId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, ChangedOutcomeId = changedOutcomeId, ChangedFromId = changedFromId, ChangedToId = changedToId };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage Redo(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId;
                DrawingId = Val[0];

                string changedOutcomeId = "", changedFromId = "", changedToId = "";
                short result = DrawingHost.objCloud.Redo(DrawingId, ref changedOutcomeId, ref changedFromId, ref changedToId, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result, ChangedOutcomeId  = changedOutcomeId , ChangedFromId  = changedFromId , ChangedToId  = changedToId };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage LoadPlotStyle(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, szXmlString = "";
                
                DrawingId = Val[0];
                szXmlString = Val[1];

                short result = DrawingHost.objCloud.LoadPlotStyle(DrawingId, szXmlString, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage SetPlotstyleToLayer(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, szStyleName = "", szLayerName = "";

                DrawingId = Val[0];
                szStyleName = Val[1];
                szLayerName = Val[2];

                short result = DrawingHost.objCloud.SetPlotstyleToLayer(DrawingId, szStyleName, szLayerName, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var returnObject = new { returnCode = result };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage createDataTextOnServer(List<string> Val)
        {
            string jsonResult;
            try
            {
                int DrawingId;
                int ModuleId;
                string UserId;
                int CustomerId;
                string SpaceDataInput;
                string DisplaysettingInput;
                string Ratio;
                string ColumnDelimiter;

                ColumnDelimiter = Val[0];
                DrawingId = Convert.ToInt32(Val[1]);
                ModuleId = Convert.ToInt32(Val[2]);
                SpaceDataInput = Val[3];
                DisplaysettingInput = Val[4];
                Ratio = Val[5];
                string entityhandles = "";

                UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                CustomerId = Convert.ToInt32((RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);

                short result = DrawingHost.objCloud.createDataTextOnServer(Convert.ToInt32(UserId), CustomerId,DrawingId, ModuleId, SpaceDataInput, DisplaysettingInput, Convert.ToDouble(Ratio), ColumnDelimiter, ref entityhandles);

                var returnObject = new { returnCode = result, EntityHandles = entityhandles };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage MoveSymbolTest(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, SymbolRectHandle, TextHandle, SymbolTextHandle, MidPoint;
                double XCoord, YCoord, TargetX, TargetY;


                DrawingId = Val[0];
                SymbolRectHandle = Val[1];
                TextHandle = Val[2];
                SymbolTextHandle = Val[3];
                XCoord = Convert.ToDouble(Val[4]);
                YCoord = Convert.ToDouble(Val[5]);
                TargetX = Convert.ToDouble(Val[6]);
                TargetY = Convert.ToDouble(Val[7]);
                MidPoint = Val[6];

                string actualPoints = "", midPoint = MidPoint;
                short result = DrawingHost.objCloud.MoveSymbolTest(DrawingId, SymbolRectHandle, TextHandle, SymbolTextHandle, XCoord, YCoord, TargetX,
                                            TargetY, ref midPoint, ref actualPoints, (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result, ActualPoints = actualPoints, MidPoint = midPoint };

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage HighlightAndDehighligtEntity(List<string> Val)
        {
            string jsonResult;
            try
            {
                string DrawingId, ConnectorHandle;
                short LineWidth, Color;
                bool IsHightLight;


                DrawingId = Val[0];
                ConnectorHandle = Val[1];
                LineWidth = Convert.ToInt16(Val[2]);
                IsHightLight = Convert.ToBoolean(Val[3]);
                Color = Convert.ToInt16(Val[4]);

                short result = DrawingHost.objCloud.HighlightAndDehighligtEntity(DrawingId, ConnectorHandle, LineWidth, IsHightLight, Color, 
                    (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var returnObject = new { returnCode = result};

                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 135 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        public string Test()
        {
            return "hello";
        }

    }
}
////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Filters;
//using iWhizWexBim;
using System.IO;
using Indus.iDrawings.Common;
using System.Threading;
using Xbim.Ifc;
using Xbim.ModelGeometry.Scene;
using Xbim.Common;
using Xbim.CobieLiteUk;
using XbimExchanger.IfcToCOBieLiteUK;

namespace Indus.iDrawings.vN
{
    public class WexBimDataController : ApiController
    {
        private AppSettings appSettings = new AppSettings();
        public static WexBimStreamer objWexBim = new WexBimStreamer();
        short nResult = 0;
        protected string strErrorMessage = "";
        string drawingId, FileName, revisionNo, customerName;
        private IfcStore m_Model;
        private Xbim3DModelContext m_3DGeomContext;

        [AcceptVerbs("POST")]
        [DeflateCompression]
        public HttpResponseMessage GetWexBimData(List<string> Val)
        {
            string jsonResult; 
            try
            {
                short result = 0;
                string wexBimData = "", jsondata = "", productIds = "", parentIds = "";
                string modelId, customer, productLabel, drawingId, revisionNo;

                modelId = Val[0];
                customer = Val[1];
                productLabel = Val[2];
                drawingId = Val[3];
                revisionNo = Val[4];

                result = objWexBim.GetWexBimData(modelId, customer, productLabel, drawingId, revisionNo, ref wexBimData, ref jsondata, ref productIds, ref parentIds);

                var returnObject = new { returnCode = result, WexBimData = wexBimData, JsonData = jsondata, ProductIds = productIds, ParentIds = parentIds };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch(Exception /*e*/)
            {
                var returnObject = new { returnCode = 9 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        [AcceptVerbs("POST")]
        [DeflateCompression]
        public HttpResponseMessage GetJsonData(List<string> Val)
        {
            string jsonResult;
            try
            {
                short result = 0;
                string wexBimData = "", jsondata = "", productIds = "", parentIds = "";
                string modelId, customer, productLabel, drawingId, revisionNo; 

                modelId = Val[0];
                customer = Val[1];
                productLabel = Val[2];
                drawingId = Val[3];
                revisionNo = Val[4];

                result = objWexBim.GetJsonData(modelId, customer, productLabel, drawingId, revisionNo, ref jsondata, ref productIds);

                var returnObject = new { returnCode = result, WexBimData = wexBimData, JsonData = jsondata, ProductIds = productIds, ParentIds = parentIds };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception /*e*/)
            {
                var returnObject = new { returnCode = 9 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }

        //[AcceptVerbs("POST")]
        //[DeflateCompression]
        //public HttpResponseMessage ConvertToWexBim(List<string> Val)
        //{
        //    string jsonResult;

        //    drawingId = Val[0];
        //    FileName = Val[1];
        //    revisionNo = Val[2];
        //    customerName = Val[3];

        //    Thread obj = new Thread(new ThreadStart(ConvertToWexBimThread), 4194304);
        //    obj.IsBackground = true;
        //    obj.Start();
        //    obj.Join();


        //    //Thread obj = new Thread(() => ConvertToWexBimThread(Val));
        //    //obj.IsBackground = true;
        //    //obj.Start();
        //    //obj.Join();
        //    var returnObject = new { returnCode = nResult, errorMsg = strErrorMessage };
        //    jsonResult = JsonConvert.SerializeObject(returnObject);
        //    HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
        //    response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
        //    return response;
        //}
        //public void ConvertToWexBimThread()
        //{
        //    string filePath = "", wexBimFilePath = "";
        //    //string drawingId, FileName, revisionNo, customerName;

        //    //drawingId = Val[0];
        //    //FileName = Val[1];
        //    //revisionNo = Val[2];
        //    //customerName = Val[3];

        //    string FileNameWithoutExt = Path.GetFileNameWithoutExtension(FileName);
        //    string FileLocation = appSettings[AppSettingsKey.FileLocation].Value;
        //    string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;//RequestContext.Principal.Identity.GetUserId(); //(RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;//  (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
        //                                                                                                                                                      // int CustomerId = Convert.ToInt32((RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);

        //    filePath = FileLocation + "Files" + @"\" + customerName + @"\" + "Drawings" + @"\" + "Buildings" + @"\" + drawingId + @"\" + revisionNo + @"\" + FileName;
        //    wexBimFilePath = FileLocation + "Files" + @"\" + customerName + @"\" + "Drawings" + @"\" + "Buildings" + @"\" + drawingId + @"\" + revisionNo + @"\" + FileNameWithoutExt;

        //    XploreWexBim wexbimObj = new XploreWexBim();
        //    nResult = wexbimObj.ConvertoWexBim(filePath, wexBimFilePath, ref strErrorMessage);
        //}





        [AcceptVerbs("POST")]
        [DeflateCompression]
        public HttpResponseMessage ConvertToWexBim(List<string> Val)
        {
            string jsonResult;
            string filePath = "", wexBimFilePath = "", errorMsg = "";
            short result = 0;
            string drawingId, FileName, revisionNo, customerName;

            drawingId = Val[0];
            FileName = Val[1];
            revisionNo = Val[2];
            customerName = Val[3];

            string FileNameWithoutExt = Path.GetFileNameWithoutExtension(FileName);
            string FileLocation = appSettings[AppSettingsKey.FileLocation].Value;
            string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;//RequestContext. Principal.Identity.GetUserId(); //(RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;//  (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
                                                                                                                                                              // int CustomerId = Convert.ToInt32((RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);

             filePath = FileLocation + "Files" + @"\" + customerName + @"\" + "Drawings" + @"\" + "Buildings" + @"\" + drawingId + @"\" + revisionNo + @"\" + FileName;
             wexBimFilePath = FileLocation + "Files" + @"\" + customerName + @"\" + "Drawings" + @"\" + "Buildings" + @"\" + drawingId + @"\" + revisionNo + @"\" + FileNameWithoutExt;
           // filePath = "D:\\iDrawingsV6\\Duplex_A_20110907.ifc";
          //  wexBimFilePath = "D:\\iDrawingsV6\\Duplex_A_20110907";

            try
            {
               
                if (filePath == "" || wexBimFilePath == "")
                {
                    var returnData = new { returnCode = result, errorMsg = "Invalid File" };
                    jsonResult = JsonConvert.SerializeObject(returnData);
                }

                using (var model = IfcStore.Open(filePath))
                {
                    var jsonFilename = wexBimFilePath + ".json";   //Path.ChangeExtension(IfcFile, "json");
                    WriteJSON(model, jsonFilename);
                    var context = new Xbim3DModelContext(model);
                    context.CreateContext();

                    wexBimFilePath = wexBimFilePath + ".wexbim";
                    using (var wexBiMfile = File.Create(wexBimFilePath))
                    {
                        using (var wexBimBinaryWriter = new BinaryWriter(wexBiMfile))
                        {
                            model.SaveAsWexBim(wexBimBinaryWriter);
                            wexBimBinaryWriter.Close();
                        }
                        wexBiMfile.Close();
                    }

                }
                var returnObject = new { returnCode = result, errorMsg = "" };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            catch (Exception e)
            {
                errorMsg = e.Message + "," + "";
                errorMsg = errorMsg.Replace(@"/", @"\\");
                errorMsg = errorMsg.Replace(@"\", @"\\");
                var returnObject = new { returnCode = 9 };
                jsonResult = JsonConvert.SerializeObject(returnObject);
            }
            HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
            return response;
        }
        private void WriteJSON(IModel model, string path)
        {
            var facilities = new List<Facility>();
            var ifcToCoBieLiteUkExchanger = new IfcToCOBieLiteUkExchanger(model, facilities);
            facilities = ifcToCoBieLiteUkExchanger.Convert();

            var facilityType = facilities.FirstOrDefault();
            if (facilityType != null)
            {
                //write the cobie data in json format
                facilityType.WriteJson(path, true);
            }
        }

        //[AcceptVerbs("POST")]
        //[DeflateCompression]
        //public HttpResponseMessage ConvertToWexBim(List<string> Val)
        //{
        //    string jsonResult;
        //    string filePath = "", wexBimFilePath = "", errorMsg = "";
        //    short result = 0;
        //    string drawingId, FileName, revisionNo, customerName;

        //    drawingId = Val[0];
        //    FileName = Val[1];
        //    revisionNo = Val[2];
        //    customerName = Val[3];

        //    string FileNameWithoutExt = Path.GetFileNameWithoutExtension(FileName);
        //    string FileLocation = appSettings[AppSettingsKey.FileLocation].Value;
        //    string UserId = (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;//RequestContext.Principal.Identity.GetUserId(); //(RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;//  (RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "UserId").Value;
        //   // int CustomerId = Convert.ToInt32((RequestContext.Principal.Identity as System.Security.Claims.ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerId").Value);

        //    filePath = FileLocation + "Files" + @"\" + customerName + @"\" + "Drawings" + @"\" + "Buildings" + @"\" + drawingId + @"\" + revisionNo + @"\" + FileName;
        //    wexBimFilePath = FileLocation + "Files" + @"\" + customerName + @"\" + "Drawings" + @"\" + "Buildings" + @"\" + drawingId + @"\" + revisionNo + @"\" + FileNameWithoutExt;

        //    try
        //    {
        //        XploreWexBim wexbimObj = new XploreWexBim();
        //        result = wexbimObj.ConvertoWexBim(filePath, wexBimFilePath, ref errorMsg);
        //        var returnObject = new { returnCode = result, errorMsg = errorMsg };
        //        jsonResult = JsonConvert.SerializeObject(returnObject);
        //    }
        //    catch (Exception /*e*/)
        //    {
        //        var returnObject = new { returnCode = 9 };
        //        jsonResult = JsonConvert.SerializeObject(returnObject);
        //    }
        //    HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
        //    response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
        //    return response;
        //}

        //[AcceptVerbs("POST")]
        //public HttpResponseMessage GetSpatialStructure(List<string> Val)
        //{
        //    string jsonResult;
        //    try
        //    {
        //        short result = 0;
        //        string jsondata = "";
        //        string modelId;

        //        modelId = Val[0];

        //        result = objWexBim.GetSpatialStructure(modelId, ref jsondata);

        //        var returnObject = new { returnCode = result, SpatialData = jsondata };
        //        jsonResult = JsonConvert.SerializeObject(returnObject);
        //    }
        //    catch (Exception /*e*/)
        //    {
        //        var returnObject = new { returnCode = 9 };
        //        jsonResult = JsonConvert.SerializeObject(returnObject);
        //    }
        //    HttpResponseMessage response = this.Request.CreateResponse(HttpStatusCode.OK);
        //    response.Content = new StringContent(jsonResult, Encoding.UTF8, "application/json");
        //    return response;
        //}
    }
}
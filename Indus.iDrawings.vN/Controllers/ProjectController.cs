using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Utils.Security.Validation;
using Indus.iDrawings.Projects.Models;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Web;
using Newtonsoft.Json;
using System;
using System.Web.Mvc;
using System.Web;
using Indus.iDrawings.Common.Models;
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;


namespace Indus.iDrawings.vN.Controllers
{
    public class ProjectController : iDrawingsController
    {
        public ProjectController()
        {

        }

        [ActionName("InsertProjectAndReminder")]
        public JsonResult InsertProjectAndReminder(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new ProjectModel(BaseInput).ProjectItem.InsertProjectAndReminder(applicationFormInput);
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

        [ActionName("UpdateProjectAndReminder")]
        public JsonResult UpdateProjectAndReminder(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new ProjectModel(BaseInput).ProjectItem.UpdateProjectAndReminder(applicationFormInput);
                //messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("UpdateProjectStatus")]
        public JsonResult UpdateProjectStatus(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new ProjectModel(BaseInput).ProjectItem.UpdateProjectStatus(applicationFormInput);
                //messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("InsertBaseDocument")]
        public JsonResult InsertBaseDocument(string Input, string FileInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                FileDataInput fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new ProjectModel(BaseInput).ProjectItem.InsertBaseDocument(applnInp, fileDataInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateBaseDocument")]
        public JsonResult UpdateBaseDocument(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new ProjectModel(BaseInput).ProjectItem.UpdateBaseDocument(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeleteBaseDocument")]
        public JsonResult DeleteBaseDocument(string applnInput, string IsMainList)
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
                messageReturn = new ProjectModel(BaseInput).ProjectItem.DeleteBaseDocument(applicationFormInput, Convert.ToBoolean(IsMainList));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ReviseBaseDocument")]
        public JsonResult ReviseBaseDocument(string Input, string FileInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                FileDataInput fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
                MessageReturn messageReturn = new ProjectModel(BaseInput).ProjectItem.ReviseBaseDocument(applnInp, fileDataInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ReplaceBaseDocument")]
        public JsonResult ReplaceBaseDocument(string Input, string FileInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                FileDataInput fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
                MessageReturn messageReturn = new ProjectModel(BaseInput).ProjectItem.ReplaceBaseDocument(applnInp, fileDataInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DownloadBaseDocFile")]
        public System.Net.Http.HttpResponseMessage DownloadBaseDocFile(string Input, string Fileinput)
        {
            byte[] arrData = new byte[0];
            ApplicationFormInput inp = new ApplicationFormInput();
            FileDataInput fileInp = new FileDataInput();
            inp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            fileInp = JsonConvert.DeserializeObject<FileDataInput>(Fileinput);

            HttpResponse response = System.Web.HttpContext.Current.Response;
            response.Clear();
            response.ClearContent();
            response.ClearHeaders();
            response.Buffer = true;

            arrData = new CommonModel(BaseInput).FileDownloadItem.DownloadBaseDocumentFile(inp, fileInp, response);
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            String file;
            if (arrData != null)
            {
                file = Convert.ToBase64String(arrData);
                // response.AddHeader("Content-Disposition", "attachment;filename=\"" + fileInp.FilePath + "\"");
                // response.ContentType = "image/jpeg";
                response.Write(file);
                response.End();
                httpResponseMessage.Content = new StringContent(file);
                httpResponseMessage.Content.Headers.Add("x-filename", fileInp.FileName);
                httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                // httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
                httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                httpResponseMessage.Content.Headers.ContentDisposition.FileName = fileInp.FileName;
                httpResponseMessage.StatusCode = HttpStatusCode.OK;
            }
            else
            {
                file = "Data is Null";
                response.Write(file);
                response.End();
                httpResponseMessage.Content = new StringContent(file);
            }
            return httpResponseMessage;
        }

        [ActionName("InsertReviewComments")]
        public JsonResult InsertReviewComments(string Input, string FileInput)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                FileDataInput fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(FileInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new ProjectModel(BaseInput).ProjectItem.InsertReviewComments(applnInp, fileDataInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateReviewComments")]
        public JsonResult UpdateReviewComments(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new ProjectModel(BaseInput).ProjectItem.UpdateReviewComments(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("DeleteReviewComment")]
        public JsonResult DeleteReviewComment(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new ProjectModel(BaseInput).ProjectItem.DeleteReviewComment(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("InsertMarkupDrawing")]
        public JsonResult InsertMarkupDrawing(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                MessageReturn messageReturn = new MessageReturn();
                //messageReturn = new CommonModel(BaseInput).DrawingItem.InsertMarkupProjectDrawing(applicationFormInput);
                //  messageReturn = logError(messageReturn);
                return Json(messageReturn, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetMarkupXml")]
        public JsonResult GetMarkupXml(int DrawingId, int RevisionNo, int MarkupId, int ProjectId)
        {
            try
            {
                string markupXml = ""; //new CommonModel(BaseInput).DrawingItem.GetProjectDrawingMarkupXml(DrawingId, RevisionNo, MarkupId, isBuildingDrawing);
                var jsonResult = Json(markupXml, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("SaveTeamMember")]
        public JsonResult SaveTeamMember(string Input) {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new ProjectModel(BaseInput).ProjectItem.SaveTeamMember(applnInp);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
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
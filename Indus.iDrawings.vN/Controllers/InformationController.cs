using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Indus.iDrawings.Utils;

namespace Indus.iDrawings.vN.Controllers
{
    public class InformationController : Controller
    {
        [AllowAnonymous]
        [ActionName("Information")]
        public ActionResult Error(string id)
        {
            byte[] bSourceBytes = Convert.FromBase64String(id);
            string deocdedId = Encoding.UTF8.GetString(bSourceBytes);
            Indus.iDrawings.Common.Crypto.EncryptPassword objEncrypt = new Indus.iDrawings.Common.Crypto.EncryptPassword();
            int errorId = Convert.ToInt32(objEncrypt.DecryptPassword(deocdedId));
            ViewBag.Id = (ErrorPage)errorId;
            return PartialView("~/Views/Shared/Information.cshtml");
        }
    }
}
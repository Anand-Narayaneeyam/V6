using Indus.iDrawings.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Indus.iDrawings.vN.Controllers
{
    public class HomeController : iDrawingsController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult View1()
        {
            return View();
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult test2()
        {
            return View();
        }
        public JsonResult GetList()
        {
            List<Indus.iDrawings.vN.Models.DefualtLayer> list = new List<Models.DefualtLayer>();
            list.Add(new Models.DefualtLayer { Id = 1, Name = "$SP_Poly" });
            list.Add(new Models.DefualtLayer { Id = 1, Name = "$SP_Poly2" });
            list.Add(new Models.DefualtLayer { Id = 1, Name = "$SP_Poly3" });
            list.Add(new Models.DefualtLayer { Id = 1, Name = "$SP_Poly4" });
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}
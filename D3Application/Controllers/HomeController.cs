using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using D3Application.Models;
using D3Application.Service;
using D3Application.Factory;

namespace D3Application.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
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


        public ActionResult GetInOutData(string aggregate, DateTime startDate, DateTime endDate)
        {
            var inOutHistory = BuildInOutData.GetData(aggregate, startDate, endDate);

            return Json(inOutHistory,JsonRequestBehavior.AllowGet);
            
        }

        

    }
}
using NewPOS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NewPOS.Controllers
{
    [CheckAuthorization]
    public class InvoiceListController : Controller
    {
        // GET: InvoiceList
        public ActionResult Index()
        {
            return View();
        }
    }
}
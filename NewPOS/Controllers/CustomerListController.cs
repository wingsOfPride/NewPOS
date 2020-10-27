using NewPOS.Models;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NewPOS.Controllers
{
    [CheckAuthorization]
    public class CustomerListController : Controller
    {
        string url = URL.api_server();
        // GET: CustomerList
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult getCustomerList()
        {
            var client = new RestClient(url+"api/Customer/GetCustomer");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);


            return Json(response.Content, JsonRequestBehavior.AllowGet);

        }
    }
}
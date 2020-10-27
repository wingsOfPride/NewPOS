using NewPOS.Models;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NewPOS.Controllers
{
    [CheckAuthorization]
    public class SupplierController : Controller
    {
        string url = URL.api_server();
        // GET: Supplier
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult InsertSupplier(Supplier sup)
        {
            try
            {
            var cusData = JsonConvert.SerializeObject(sup);
            var client = new RestClient(url+"api/Supplier/InsertSupplier");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/json");
            request.AddParameter("application/json", cusData, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
        
                return Json(response.Content, JsonRequestBehavior.AllowGet);



            }
            catch (Exception ex)
            {

                var cusData = JsonConvert.SerializeObject(ex);
                return Json(cusData, JsonRequestBehavior.AllowGet);
            }

        }
    }
}
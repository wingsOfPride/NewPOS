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
    public class ProductController : Controller
    {
        string url = URL.api_server();
        // GET: Product Create Product Page
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CreateProduct(Inventory inv)
        {

            var jsonString = JsonConvert.SerializeObject(inv);
            var client = new RestClient(url+"api/Inventory/InsertInventory");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/json");
            request.AddParameter("application/json", jsonString, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);

            var responsebad = response.Content;

            return Json(response.Content, JsonRequestBehavior.AllowGet);

        }

        [HttpGet]
        public ActionResult GetProducts()
        {
            var client = new RestClient(url+"api/Inventory/GetInventory");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
        
     

            return Json(response.Content, JsonRequestBehavior.AllowGet);
        }

        //Create List of Product

   
    }
}
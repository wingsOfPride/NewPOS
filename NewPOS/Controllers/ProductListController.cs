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
    public class ProductListController : Controller
    {
        string url = URL.api_server();
        // GET: ProductList
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult GetProducts()
        {
            Inventory product = new Inventory();
            var client = new RestClient(url+"api/Inventory/GetInventory");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);

            var data = response.Content;

            var myfinal = JsonConvert.DeserializeObject<List<Inventory>>(data);


            return Json(new { data = myfinal }, JsonRequestBehavior.AllowGet);
        }
    }
}
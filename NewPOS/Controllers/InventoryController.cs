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
    public class InventoryController : Controller
    {
            
        string url = URL.api_server();
        // GET: Inventory
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult InsertInventoryIn(InventoryIn_Details cus, List<InventoryIn_Item> inv)
        {
            foreach (var data in inv)
            {
                if (data.inv_code == "NaN" || data.quantity == 0)
                {
                    var result = "{\"response\":\"2\",\"message\":\"Fill the Table below \"}";

                    return Json(result, JsonRequestBehavior.AllowGet);

                }
            }

            try
            {
                cus.terms = cus.days + " days";
                var cusData = JsonConvert.SerializeObject(cus);
                var client1 = new RestClient(url + "api/StockIn/InsertStockDetails");
                client1.Timeout = -1;
                var request1 = new RestRequest(Method.POST);
                request1.AddHeader("Content-Type", "application/json");
                request1.AddParameter("application/json", cusData, ParameterType.RequestBody);
                IRestResponse response1 = client1.Execute(request1);

                var result = response1.Content;


                dynamic jsonresult = JsonConvert.DeserializeObject<dynamic>(result);
                if (jsonresult.response == "1")
                {
                    foreach (var data in inv)
                    {
                        if (data.inv_code == "NaN")
                        {

                        }
                        else
                        {
                            var invData = JsonConvert.SerializeObject(data);
                            var client = new RestClient(url + "api/StockIn/InsertStockItems");
                            client.Timeout = -1;
                            var request = new RestRequest(Method.POST);
                            request.AddHeader("Content-Type", "application/json");
                            request.AddParameter("application/json", invData, ParameterType.RequestBody);
                            IRestResponse response = client.Execute(request);


                            var resultContent = response.Content;
                        }


                    }
                }
                else
                {

                    return Json(result, JsonRequestBehavior.AllowGet);

                }








                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json(ex.Message, JsonRequestBehavior.AllowGet);




            }



        }
    }
}
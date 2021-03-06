﻿using NewPOS.Models;
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
    public class CustomerAddController : Controller
    {
        string url = URL.api_server();
        // GET: CustomerAdd
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult InsertCustomer(Customer cus)
        {
            
            try
            {

            var cusData = JsonConvert.SerializeObject(cus);
            var client = new RestClient(url+"api/Customer/InsertCustomer");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/json");
            request.AddParameter("application/json", cusData, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);

            var responsebad = response.Content;

            return Json(response.Content, JsonRequestBehavior.AllowGet);



            }
            catch(Exception ex)
            {

                var cusData = JsonConvert.SerializeObject(ex);
                return Json(cusData, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
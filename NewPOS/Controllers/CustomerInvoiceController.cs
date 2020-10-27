using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NewPOS.Controllers
{
    public class CustomerInvoiceController : Controller
    {
        public class SampleModel
        {

            public string Id { get; set; }
            public string productName { get; set; }
            public string um { get; set; }
            public string price { get; set; }


        }

        List<SampleModel> ddd = new List<SampleModel>() {

               new SampleModel(){
                   Id = "1",
                   productName = "Product 1",
                   um = "kilogram",
                   price = "600"


               },
                    new SampleModel(){
                   Id = "2",
                   productName = "Product 2",
                   um = "kilogram",
                   price = "400"


               },
                            new SampleModel(){
                   Id = "3",
                   productName = "Product 4",
                   um = "kilogram",
                   price = "400"


               },

                                    new SampleModel(){
                   Id = "4",
                   productName = "Product5",
                   um = "kilogram",
                   price = "900"


               },


           };
        // GET: CustomerInvoice
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetList()
        {


            return Json(ddd, JsonRequestBehavior.AllowGet);




        }

        public ActionResult GetDetails(string id)
        {

            return Json(ddd.Where(x => x.Id == id), JsonRequestBehavior.AllowGet); ;
        }
    }
}
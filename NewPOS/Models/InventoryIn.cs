using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewPOS.Models
{
    public class InventoryIn_Details
    {

        public int id { get; set; }
        public string referenceNo { get; set; }
        public DateTime date { get; set; }
        public string paymentMethod { get; set; }
        public string terms { get; set; }
        public string sup_id { get; set; }
        public int days { get; set; }
        public decimal totalcost { get; set; }
    }
 

    public class InventoryIn_Item
    {

        public string inv_code { get; set; }
        public int quantity { get; set; }
        public decimal amnt { get; set; }
        public string referenceNo { get; set; }




    }
}
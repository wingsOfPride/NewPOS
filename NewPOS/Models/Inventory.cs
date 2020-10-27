using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewPOS.Models
{
    public class Inventory
    {
        public int inv_id { get; set; }
        public string inv_code { get; set; }
        public string inv_name { get; set; }
        public string inv_category { get; set; }
        public string inv_um { get; set; }
        public string inv_brand { get; set; }
        public string status { get; set; }
    }
}
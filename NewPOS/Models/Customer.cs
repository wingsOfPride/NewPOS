using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewPOS.Models
{
    public class Customer
    {
        public int id { get; set; }
        public string cus_code { get; set; }
        public string cus_name { get; set; }
        public string cus_address { get; set; }
        public string cus_contactNo { get; set; }
        public string cus_tin { get; set; }
        public string cus_email { get; set; }
        public string status { get; set; }
        public string UDT { get; set; }
        public string TDT { get; set; }
    }
}
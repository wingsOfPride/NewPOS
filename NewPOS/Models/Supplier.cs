using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewPOS.Models
{
    public class Supplier
    {
        public int id { get; set; }
        public string sup_Code { get; set; }
        public string sup_Name { get; set; }
        public string sup_Address { get; set; }
        public string sup_Tin { get; set; }
        public string sup_ContactNo { get; set; }
        public string sup_Email { get; set; }

    }
}
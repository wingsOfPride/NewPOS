using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewPOS.Models
{
    public class URL
    {
        public static string api_server()
        {
            return System.Configuration.ConfigurationManager.AppSettings["API"];
            // return System.Configuration.ConfigurationManager.AppSettings["RDOperation_url_uat"];
        }

    }
}
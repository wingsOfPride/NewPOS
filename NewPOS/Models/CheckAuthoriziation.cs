using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NewPOS.Models
{
    public class CheckAuthorization : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            HttpCookie language = HttpContext.Current.Request.Cookies.Get("userID");
            if (language == null)
            {
                filterContext.Result = new RedirectResult("Login/Index");


            }
            else
            {

                //Code HERE for page level authorization  

            }
        }
    }
}
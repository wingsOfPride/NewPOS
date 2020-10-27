using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace NewPOS.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        private ActionResult RedirectToLocal(string returnURL = "")
        {
            try
            {
                // If the return url starts with a slash "/" we assume it belongs to our site  
                // so we will redirect to this "action"  
                if (!string.IsNullOrWhiteSpace(returnURL) && Url.IsLocalUrl(returnURL))
                    return Redirect(returnURL);

                // If we cannot verify if the url is local to our host we redirect to a default location  
                return RedirectToAction("Index", "Login");
            }
            catch
            {
                throw;
            }
        }
        public ActionResult Logout()
        {
            try
            {
                // First we clean the authentication ticket like always  
                //required NameSpace: using System.Web.Security;  
                FormsAuthentication.SignOut();
                var c = new System.Web.HttpCookie("userID");
                c.Expires = DateTime.Now.AddDays(-1);
                Response.Cookies.Add(c);
                // Second we clear the principal to ensure the user does not retain any authentication  
                //required NameSpace: using System.Security.Principal;  
                HttpContext.User = new GenericPrincipal(new GenericIdentity(string.Empty), null);

                Session.Clear();
                System.Web.HttpContext.Current.Session.RemoveAll();

                // Last we redirect to a controller/action that requires authentication to ensure a redirect takes place  
                // this clears the Request.IsAuthenticated flag since this triggers a new request  
                return RedirectToLocal();
            }
            catch
            {
                throw;
            }
        }

        public ActionResult LoginMe(Login log)
        {
            try {
               
                var cusData = JsonConvert.SerializeObject(log);
                var client = new RestClient("http://wingsofpride619-001-site1.btempurl.com/api/Login/GetLogin");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/json");
            request.AddParameter("application/json", cusData, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);

                var res = response.Content;

                dynamic jsonresult = JsonConvert.DeserializeObject<dynamic>(res);

                if(jsonresult.response == "1")
                {
                    var fullname_cookie = new System.Web.HttpCookie("userID");
                    fullname_cookie.Value = log.username;
                    fullname_cookie.Expires = DateTime.Now.AddDays(1);
                    Response.Cookies.Add(fullname_cookie);

                    return Json(response.Content, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(response.Content, JsonRequestBehavior.AllowGet);
                }
                       
        }
            catch(Exception ex)
            {

                var cusData = JsonConvert.SerializeObject(ex);
                return Json(cusData, JsonRequestBehavior.AllowGet);
    }
}

        public class Login
        {
            public string username { get; set; }
            public string password { get; set; }
        }

    }
}
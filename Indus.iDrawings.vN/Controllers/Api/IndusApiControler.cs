using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Http;

namespace Indus.iDrawings.vN.Controllers.Api
{
    public class IndusApiControler : ApiController
    {
        protected int WSUserId
        {
            get
            {
                return Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "WSUserId").Value);
            }
        }
        protected int CustomerId
        {
            get
            {
                return Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "WSCustomerId").Value);
            }
        }

        protected int CustomerAdminId
        {
            get
            {
                return Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "CustomerAdminId").Value);
            }
        }

        protected int TimeOffset
        {
            get
            {
                return Convert.ToInt32((User.Identity as ClaimsIdentity).Claims.FirstOrDefault(c => c.Type == "TimeOffset").Value);
            }
        }
        protected static IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().Authentication;
            }
        }
    } 
}
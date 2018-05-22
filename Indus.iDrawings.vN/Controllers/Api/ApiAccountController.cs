using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Models.Items.WebServiceUser;
using Indus.iDrawings.Security.Cryptography;
using Indus.iDrawings.WebMethods.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http;

namespace Indus.iDrawings.vN.Controllers.Api
{
    [AllowAnonymous]
    public class ApiAccountController : IndusApiControler
    {
        [HttpPost]
        public ApiMessage Login(WSUser user)
        {
            try
            {
                RSAEncryption objRSAEncryption = new RSAEncryption();
                user.UserName = objRSAEncryption.TextDecrypt256(user.UserName);
                user.Password = objRSAEncryption.TextDecrypt256(user.Password);

                WSUserReturn _retUser = new WSAuthentication().AuthenticateUser(user);
                if (_retUser != null && _retUser.WSUserId > 0)
                {
                    List<Claim> claims = new List<Claim>();
                    claims.Add(new Claim("WSUserId", _retUser.WSUserId.ToString()));
                    claims.Add(new Claim("WSCustomerId", _retUser.CustomerId.ToString()));
                    claims.Add(new Claim("CustomerAdminId", _retUser.CustomerAdminId.ToString()));
                    claims.Add(new Claim("TimeOffset", _retUser.TimeOffset.ToString()));
                    ClaimsIdentity claimIdentity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
                    AuthenticationManager.SignIn(new AuthenticationProperties { IsPersistent = false }, claimIdentity);
                    return new ApiMessage { Code = MessageCode.Success, Message = "Logged In Successfully", Data = "" };
                }
                return new ApiMessage { Code = MessageCode.AuthenticationFailed, Message = "Authentication Failed", Data = "" };
            }
            catch (Exception ex)
            {
                return new ApiMessage { Code = MessageCode.AuthenticationFailed, Message = "Authentication Failed", Data = "" };
            }

        }

        [HttpGet]
        public ApiMessage LogOff()
        {
            var identity = new ClaimsIdentity();
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant
                     (new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = false });
            return new ApiMessage { Code = MessageCode.Loggedout, Message = "Logged Out Successfully", Data = "" };
        }

    }
}

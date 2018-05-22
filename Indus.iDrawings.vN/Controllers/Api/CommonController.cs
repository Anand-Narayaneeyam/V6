using Indus.iDrawings.Security.Cryptography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Indus.iDrawings.vN.Controllers.Api
{
    public class CommonController : IndusApiControler
    {
        [HttpPost]
        [ActionName("AndroidPEMPublicKey")]
        public string GetAndroidPEMPublicKey()
        {
            return new RSAEncryption().GetPublicKey256(KeyFormatType.PEM, DeviceType.Android);
        }

        [HttpPost]
        [ActionName("IOsPEMPublicKey")]
        public string GetIOsPEMPublicKey()
        {
            return new RSAEncryption().GetPublicKey256(KeyFormatType.PEM, DeviceType.IOs);
        }

        [HttpPost]
        [ActionName("WindowsPublicKey")]
        public string GetWindowsPublicKey()
        {
            return HttpUtility.UrlEncode(new RSAEncryption().GetPublicKey256(KeyFormatType.XML, DeviceType.Windows));
        }
    }
}
using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Entity.Interfaces;
using Indus.iDrawings.Common.Models.Items.WebServiceUser;
using Indus.iDrawings.Security.IdentityManagement;
using Indus.iDrawings.WebMethods.Entity;
using Indus.iDrawings.WebMethods.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Indus.iDrawings.vN.Controllers.Api
{
    [AuthorizeApi]
    public class IndusImportController : IndusApiControler
    {
        //[HttpPost]
        //public ApiMessage GetEmployeeData()
        //{
        //    IDataPortInput objInput = new DataPortInput() { CustomerId = this.CustomerId, UserId = 1, TimeOffset = 0 };
        //    return new ApiMessage { Code = MessageCode.Success, Message = "Successfully Retrieved", Data = new DataExport().GetEmployeeData(objInput) };
        //}

        [HttpPost]
        public ApiMessage GetEmployeeData(WSEmployeeInput input)
        {
            try
            {
                input = new WSEmployeeInput();
                input.CustomerId = this.CustomerId;
                input.CustomerAdminId = this.CustomerAdminId;
                input.TimeOffset = this.TimeOffset;
                input.WSUserId = this.WSUserId;
                if (input.IsForDemo)
                {
                    return new WebMethodsModel().DataExport.GetEmployeeDataDemo(input);
                }
                return new WebMethodsModel().DataExport.GetEmployeeData(input);

            }
            catch (Exception ex)
            {
                return new ApiMessage { Code = MessageCode.UnExpectedError, Message = "UnExpected Error", Data = "" };
            }

        }

    }
}


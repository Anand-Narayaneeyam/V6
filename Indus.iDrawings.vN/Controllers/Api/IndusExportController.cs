using Indus.iDrawings.Administration.Entity;
using Indus.iDrawings.Administration.Models;
using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Indus.iDrawings.vN.Controllers.Api
{
    public class IndusExportController : IndusApiControler
    {
        [HttpPost]
        public MessageReturn ExportEmployeeData(WSEmployeeDataInput inp)
        {

            AdministrationModel objAdministrationModel = new AdministrationModel(new BaseClassInput());
            return objAdministrationModel.ApiImportDataItem.ImportEmployeeDataModel(inp);
        }

        [HttpPost]
        public ApiMessage InsertPMRouteData(WSEmployeeDataInput inp)
        { 
            try
            {
                AdministrationModel objAdministrationModel = new AdministrationModel(new BaseClassInput());
                return objAdministrationModel.ApiImportDataItem.InsertPMRouteData(inp);
            }
            catch (Exception ex)
            {
                return new ApiMessage { Code = MessageCode.UnExpectedError, Message = "UnExpected Error", Data = "" };
            }
        }

        [HttpPost]
        public ApiMessage DeleteEmployeeeData(WSEmployeeDataInput inp)
        {
            try
            {
                AdministrationModel objAdministrationModel = new AdministrationModel(new BaseClassInput());
                return objAdministrationModel.ApiImportDataItem.InsertPMRouteData(inp);
            }
            catch (Exception ex)
            {
                return new ApiMessage { Code = MessageCode.UnExpectedError, Message = "UnExpected Error", Data = "" };
            }
        }
    }
}

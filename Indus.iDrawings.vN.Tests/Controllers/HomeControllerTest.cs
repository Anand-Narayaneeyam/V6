using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Indus.iDrawings.vN;
using Indus.iDrawings.vN.Controllers;

using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Common.Entity.Interfaces;
using Indus.iDrawings.Common.Models.Items;
using Indus.iDrawings.Utils;

namespace Indus.iDrawings.vN.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void About()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.About() as ViewResult;

            // Assert
            Assert.AreEqual("Your application description page.", result.ViewBag.Message);
        }

        [TestMethod]
        public void Contact()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Contact() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void TestMethod()
        {
            ApplicationFormInput inp = new ApplicationFormInput();
            inp.CustomerId = 1;
            inp.UserId = 3;
            inp.TimeOffset = 0;
            inp.FormId = 1;
            inp.Filter = "";

            IApplicationFormInput inp1 = new ApplicationFormInput(); ;

            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new ApplicationFormExtended(inp).GetFieldBinderAddContent(inp1);
            //return objDefaultApiReturn;
        }
    }
}

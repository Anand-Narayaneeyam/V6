using Indus.iDrawings.Administration.Models;
using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Web;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Data.OleDb;
using System.Data;
using Newtonsoft.Json;
using Indus.iDrawings.Administration.Entity;
using System.Web.Configuration;
using Indus.iDrawings.vN.Models;
using Indus.iDrawings.Common;

namespace Indus.iDrawings.vN.Controllers
{
    public class AdministrationController : iDrawingsController
    {
        public AdministrationController()
        {

        }

        [ActionName("UpdateContactDetails")]
        public JsonResult UpdateContactDetails(string applnInput, string fileInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                FileDataInput fileDataInput = new FileDataInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                if (fileInput != null)
                    fileDataInput = JsonConvert.DeserializeObject<FileDataInput>(fileInput);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new AdministrationModel(BaseInput).ContactDetailsItem.UpdateContactDetails(applicationFormInput, fileDataInput);
                //  messageReturn = new CommonController().logError((messageReturn));
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCustomerOrganizationalStructureLookup")]
        public JsonResult GetCustomerOrganizationalStructureLookup(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new AdministrationModel(BaseInput).AdministrationItem.GetCustomerOrganizationalStructureLookup(applicationFormInput);
                objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCustomerOrganztnlStructureLookup")]
        public JsonResult GetCustomerOrganztnlStructureLookup(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new AdministrationModel(BaseInput).AdministrationItem.GetCustomerOrganztnlStructureLookup(applicationFormInput);
                objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetOrganizationalUnitsByLevelID")]
        public JsonResult GetOrganizationalUnitsByLevelID(string applnInput)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new AdministrationModel(BaseInput).AdministrationItem.GetOrganizationalUnitsByLevelID(applicationFormInput);
                objDefaultApiReturn = new CommonController().logError((objDefaultApiReturn));
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetFolderPathforImport")]
        public string GetFolderPathforImport(string applnInput)
        {
            ApplicationFormInput applicationFormInput = new ApplicationFormInput();
            applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(applnInput);
            string folderPath = new AdministrationModel(BaseInput).ImportDataItem.GetFolderPathforImport(applicationFormInput);
            return folderPath;
        }

        [ActionName("uploadExcel")]
        public JsonResult uploadExcel(string Input, string FileInput, string FileName, string FileSize, string SheetName)
        {
            try
            {

                string filepath = GetFolderPathforImport(Input);
                string folderPath = filepath + "\\SA_01_1745" + "\\" + "Temp\\" + DateTime.Now.ToString("yyyy-MM-dd hh_mm_ss");
                string ProcPath = folderPath + "\\" + FileName;
                FileReader _filered = new FileReader();
                string _dbPath = "";
                _dbPath = ProcPath;
                _dbPath = _dbPath ?? "";
                if (_dbPath.Trim().Length > 0)
                {
                    string _filepath = _dbPath;
                    dynamic _saveOut = _filered.SaveFile(_filepath, _filered.GetByteArrayFromString(FileInput));
                }
                string[] list;
                if (SheetName == "")
                {
                    list = ReadExcelToTable(_dbPath);
                }
                else
                {
                    list = ReadExcelBySheetName(_dbPath, SheetName);
                }
                if (System.IO.Directory.Exists(folderPath))
                    System.IO.Directory.Delete(folderPath, true);
                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;

            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        private string[] ReadExcelToTable(string path)
        {
            /*     string connstring = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path + ";Extended Properties='Excel 8.0;HDR=NO;IMEX=1';";*/   // Extra blank space cannot appear in Office 2007 and the last version. And we need to pay attention on semicolon.
            string connstring = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path + ";Extended Properties='Excel 12.0;HDR=Yes';";
            //string connstring = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + path + ";Extended Properties=\"Excel 8.0;HDR=YES;IMEX=1;\"";

            using (OleDbConnection conn = new OleDbConnection(connstring))
            {
                conn.Open();
                DataTable sheetsName = conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, new object[] { null, null, null, "Table" });  //Get All Sheets Name
                List<string> strDetailIDList = new List<string>();
                string[] strdetailID = new string[sheetsName.Rows.Count];
                if (sheetsName.Rows.Count > 0)
                {
                    for (int i = 0; i < sheetsName.Rows.Count; i++)
                    {
                        strdetailID[i] = sheetsName.Rows[i][2].ToString().TrimEnd('\'');
                        strdetailID[i] = strdetailID[i].ToString().TrimStart('\'');
                    }
                }
                string firstSheetName = sheetsName.Rows[0][2].ToString();
                string sql = string.Format("SELECT * FROM [{0}]", firstSheetName);
                OleDbDataAdapter ada = new OleDbDataAdapter(sql, connstring);
                DataSet set = new DataSet();
                ada.Fill(set);
                string[] strdetails = new string[2];
                strdetails[0] = JsonConvert.SerializeObject(strdetailID);
                strdetails[1] = "";
                //string[] f = set.Tables[0].Rows[0].ItemArray.Select(x => x.ToString()).ToArray();
                conn.Close();
                return strdetails;
            }
        }

        [ActionName("GetSavedImportColumns")]
        public JsonResult GetSavedImportColumns(string Input, string ExcelCols, int ImportCategoryId, int Classid)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new AdministrationModel(BaseInput).ImportDataItem.GetSavedImportColumns(applicationFormInput, ExcelCols, ImportCategoryId, Classid);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetImportColumns")]
        public JsonResult GetImportColumns(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new AdministrationModel(BaseInput).ImportDataItem.GetImportColumns(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        private string[] ReadExcelBySheetName(string path, string SheetName)
        {
            string connstring = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path + ";Extended Properties='Excel 8.0;HDR=NO;IMEX=1';";   // Extra blank space cannot appear in Office 2007 and the last version. And we need to pay attention on semicolon.
            using (OleDbConnection conn = new OleDbConnection(connstring))
            {
                conn.Open();
                List<string> strDetailIDList = new List<string>();
                string sql = string.Format("SELECT * FROM [{0}]", SheetName);
                OleDbDataAdapter ada = new OleDbDataAdapter(sql, connstring);
                DataSet set = new DataSet();
                ada.Fill(set);

                foreach (DataColumn column in set.Tables[0].Columns)
                {
                    string cName = set.Tables[0].Rows[0][column.ColumnName].ToString();
                    if (!set.Tables[0].Columns.Contains(cName) && cName != "")
                    {
                        column.ColumnName = cName;
                    }
                }
                string[] strdetails = new string[2];

                DataTable newDataTable = set.Tables[0].Clone();
                DataTable newDataTable2 = set.Tables[0].Clone();
                for (int i = 0; i < set.Tables[0].Rows.Count; i++)
                {
                    if (i == 0)
                    {
                        DataRow row2 = set.Tables[0].Rows[i];
                        newDataTable.ImportRow(row2);
                    }
                    else
                    {
                        int totalRows = set.Tables[0].Rows.Count;
                        if (totalRows > 1)
                        {
                            DataRow row3 = set.Tables[0].Rows[i];
                            newDataTable2.ImportRow(row3);
                        }
                    }
                }
                strdetails[1] = newDataTable.ToJSON();
                DataRow row = set.Tables[0].Rows[0];
                set.Tables[0].Rows.Remove(row);
                strdetails[0] = newDataTable2.ToJSON();
                conn.Close();
                return strdetails;
            }
        }

        [ActionName("GetImportTemplateId")]
        public JsonResult GetImportTemplateId(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int templateId = new AdministrationModel(BaseInput).ImportDataItem.GetImportTemplateId(applicationFormInput);
                var jsonResult = Json(templateId, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckWorkFlowCategoryInUse")]
        public JsonResult CheckWorkFlowCategoryInUse(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new AdministrationModel(BaseInput).AdministrationItem.CheckWorkFlowCategoryInUse(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertImportTemplateFields")]
        public JsonResult InsertImportTemplateFields(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new AdministrationModel(BaseInput).ImportDataItem.InsertImportTemplateFields(applnInp);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ImportSpaceData")]
        public JsonResult ImportSpaceData(string ColumnMapInput, string ValidationInput, string RowData, int RelationId, string Input, string FileInput, string FileName, string FileSize, string SheetName)
         {
            try
            {
                string filepath = GetFolderPathforImport(Input);
                string folderPath = filepath + "\\SA_01_1745" + "\\" + "Temp\\" + DateTime.Now.ToString("yyyy-MM-dd hh_mm_ss");
                string ProcPath = folderPath + "\\" + FileName;
                FileReader _filered = new FileReader();
                string _dbPath = "";
                _dbPath = ProcPath;
                _dbPath = _dbPath ?? "";
                if (_dbPath.Trim().Length > 0)
                {
                    string _filepath = _dbPath;
                    dynamic _saveOut = _filered.SaveFile(_filepath, _filered.GetByteArrayFromString(FileInput));
                }
                string[] strdetails = new string[2];
                string connstring = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + _dbPath + ";Extended Properties='Excel 8.0;HDR=NO;IMEX=1';";   // Extra blank space cannot appear in Office 2007 and the last version. And we need to pay attention on semicolon.
                using (OleDbConnection conn = new OleDbConnection(connstring))
                {
                    conn.Open();
                    List<string> strDetailIDList = new List<string>();
                    string sql = string.Format("SELECT * FROM [{0}]", SheetName);
                    OleDbDataAdapter ada = new OleDbDataAdapter(sql, connstring);
                    DataSet set = new DataSet();
                    ada.Fill(set);

                    foreach (DataColumn column in set.Tables[0].Columns)
                    {
                        string cName = set.Tables[0].Rows[0][column.ColumnName].ToString();
                        if (!set.Tables[0].Columns.Contains(cName) && cName != "")
                        {
                            column.ColumnName = cName;
                        }
                    }                 
                    strdetails[1] = set.Tables[0].ToJSON();
                    DataRow row = set.Tables[0].Rows[0];
                    set.Tables[0].Rows.Remove(row);
                    strdetails[0] = set.Tables[0].ToJSON();
                    conn.Close();
                }
                if (System.IO.Directory.Exists(folderPath))
                    System.IO.Directory.Delete(folderPath, true);
                List<ColumnMappingInput> columnMappingInput = JsonConvert.DeserializeObject<List<ColumnMappingInput>>(ColumnMapInput);
                List<CheckValidatedInput> checkValidatedInput = JsonConvert.DeserializeObject<List<CheckValidatedInput>>(ValidationInput);
                dynamic jsonData = JsonConvert.DeserializeObject(strdetails[0]);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new AdministrationModel(BaseInput).ImportDataItem.ImportSpaceData(columnMappingInput, checkValidatedInput, jsonData, RelationId);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                //return Json(jsonResult, JsonRequestBehavior.AllowGet);
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("ImportEmployeeDetails")]
        public JsonResult ImportEmployeeDetails(string ColumnMapInput, string ValidationInput, string RowData, int RelationId, int IsInsert, string Input, string FileInput, string FileName, string FileSize, string SheetName)
        {
            try
            {
                string filepath = GetFolderPathforImport(Input);
                string folderPath = filepath + "\\SA_01_1745" + "\\" + "Temp\\" + DateTime.Now.ToString("yyyy-MM-dd hh_mm_ss");
                string ProcPath = folderPath + "\\" + FileName;
                FileReader _filered = new FileReader();
                string _dbPath = "";
                _dbPath = ProcPath;
                _dbPath = _dbPath ?? "";
                if (_dbPath.Trim().Length > 0)
                {
                    string _filepath = _dbPath;
                    dynamic _saveOut = _filered.SaveFile(_filepath, _filered.GetByteArrayFromString(FileInput));
                }
                string[] strdetails = new string[2];
                string connstring = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + _dbPath + ";Extended Properties='Excel 8.0;HDR=NO;IMEX=1';";   // Extra blank space cannot appear in Office 2007 and the last version. And we need to pay attention on semicolon.
                using (OleDbConnection conn = new OleDbConnection(connstring))
                {
                    conn.Open();
                    List<string> strDetailIDList = new List<string>();
                    string sql = string.Format("SELECT * FROM [{0}]", SheetName);
                    OleDbDataAdapter ada = new OleDbDataAdapter(sql, connstring);
                    DataSet set = new DataSet();
                    ada.Fill(set);

                    foreach (DataColumn column in set.Tables[0].Columns)
                    {
                        string cName = set.Tables[0].Rows[0][column.ColumnName].ToString();
                        if (!set.Tables[0].Columns.Contains(cName) && cName != "")
                        {
                            column.ColumnName = cName;
                        }
                    }
                    strdetails[1] = set.Tables[0].ToJSON();
                    DataRow row = set.Tables[0].Rows[0];
                    set.Tables[0].Rows.Remove(row);
                    strdetails[0] = set.Tables[0].ToJSON();
                    conn.Close();
                }
                if (System.IO.Directory.Exists(folderPath))
                    System.IO.Directory.Delete(folderPath, true);
                List<ColumnMappingInput> columnMappingInput = JsonConvert.DeserializeObject<List<ColumnMappingInput>>(ColumnMapInput);
                List<CheckValidatedInput> checkValidatedInput = JsonConvert.DeserializeObject<List<CheckValidatedInput>>(ValidationInput);
                dynamic jsonData = JsonConvert.DeserializeObject(strdetails[0]);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new AdministrationModel(BaseInput).ImportDataItem.ImportEmployeeDetails(columnMappingInput, checkValidatedInput, jsonData, RelationId, IsInsert);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                //return Json(jsonResult, JsonRequestBehavior.AllowGet);
                 return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetObjectImportColumns")]
        public JsonResult GetObjectImportColumns(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new AdministrationModel(BaseInput).ImportDataItem.GetObjectImportColumns(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return Json(jsonResult, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ImportObjectDetails")]
        public JsonResult ImportObjectDetails(string ColumnMapInput, string ValidationInput, string RowData, string ImportInput, string Input, string FileInput, string FileName, string FileSize, string SheetName)
        {
            try
            {
                string filepath = GetFolderPathforImport(Input);
                string folderPath = filepath + "\\SA_01_1745" + "\\" + "Temp\\" + DateTime.Now.ToString("yyyy-MM-dd hh_mm_ss");
                string ProcPath = folderPath + "\\" + FileName;
                FileReader _filered = new FileReader();
                string _dbPath = "";
                _dbPath = ProcPath;
                _dbPath = _dbPath ?? "";
                if (_dbPath.Trim().Length > 0)
                {
                    string _filepath = _dbPath;
                    dynamic _saveOut = _filered.SaveFile(_filepath, _filered.GetByteArrayFromString(FileInput));
                }
                string[] strdetails = new string[2];
                string connstring = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + _dbPath + ";Extended Properties='Excel 8.0;HDR=NO;IMEX=1';";   // Extra blank space cannot appear in Office 2007 and the last version. And we need to pay attention on semicolon.
                using (OleDbConnection conn = new OleDbConnection(connstring))
                {
                    conn.Open();
                    List<string> strDetailIDList = new List<string>();
                    string sql = string.Format("SELECT * FROM [{0}]", SheetName);
                    OleDbDataAdapter ada = new OleDbDataAdapter(sql, connstring);
                    DataSet set = new DataSet();
                    ada.Fill(set);

                    foreach (DataColumn column in set.Tables[0].Columns)
                    {
                        string cName = set.Tables[0].Rows[0][column.ColumnName].ToString();
                        if (!set.Tables[0].Columns.Contains(cName) && cName != "")
                        {
                            column.ColumnName = cName;
                        }
                    }
                    strdetails[1] = set.Tables[0].ToJSON();
                    DataRow row = set.Tables[0].Rows[0];
                    set.Tables[0].Rows.Remove(row);
                    strdetails[0] = set.Tables[0].ToJSON();
                    conn.Close();
                }
                if (System.IO.Directory.Exists(folderPath))
                    System.IO.Directory.Delete(folderPath, true);
                List<ColumnMappingInput> columnMappingInput = JsonConvert.DeserializeObject<List<ColumnMappingInput>>(ColumnMapInput);
                List<CheckValidatedInput> checkValidatedInput = JsonConvert.DeserializeObject<List<CheckValidatedInput>>(ValidationInput);
                dynamic jsonData = JsonConvert.DeserializeObject(strdetails[0]);
                ImportObjectDetailsInput importObjectDetailsInput = JsonConvert.DeserializeObject<ImportObjectDetailsInput>(ImportInput);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new AdministrationModel(BaseInput).ImportDataItem.ImportObjectDetails(columnMappingInput, checkValidatedInput, jsonData, importObjectDetailsInput);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                //return Json(jsonResult, JsonRequestBehavior.AllowGet);
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ImportDocumentDetails")]
        public JsonResult ImportDocumentDetails(string ColumnMapInput, string ValidationInput, string RowData, string Input, string DocumentFolder, int IsInsert, string FileInput, string FileName, string FileSize, string SheetName)
        {
            try
            {
                string filepath = GetFolderPathforImport(Input);
                string folderPath = filepath + "\\SA_01_1745" + "\\" + "Temp\\" + DateTime.Now.ToString("yyyy-MM-dd hh_mm_ss");
                string ProcPath = folderPath + "\\" + FileName;
                FileReader _filered = new FileReader();
                string _dbPath = "";
                _dbPath = ProcPath;
                _dbPath = _dbPath ?? "";
                if (_dbPath.Trim().Length > 0)
                {
                    string _filepath = _dbPath;
                    dynamic _saveOut = _filered.SaveFile(_filepath, _filered.GetByteArrayFromString(FileInput));
                }
                string[] strdetails = new string[2];
                string connstring = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + _dbPath + ";Extended Properties='Excel 8.0;HDR=NO;IMEX=1';";   // Extra blank space cannot appear in Office 2007 and the last version. And we need to pay attention on semicolon.
                using (OleDbConnection conn = new OleDbConnection(connstring))
                {
                    conn.Open();
                    List<string> strDetailIDList = new List<string>();
                    string sql = string.Format("SELECT * FROM [{0}]", SheetName);
                    OleDbDataAdapter ada = new OleDbDataAdapter(sql, connstring);
                    DataSet set = new DataSet();
                    ada.Fill(set);

                    foreach (DataColumn column in set.Tables[0].Columns)
                    {
                        string cName = set.Tables[0].Rows[0][column.ColumnName].ToString();
                        if (!set.Tables[0].Columns.Contains(cName) && cName != "")
                        {
                            column.ColumnName = cName;
                        }
                    }
                    strdetails[1] = set.Tables[0].ToJSON();
                    DataRow row = set.Tables[0].Rows[0];
                    set.Tables[0].Rows.Remove(row);
                    strdetails[0] = set.Tables[0].ToJSON();
                    conn.Close();
                }
                if (System.IO.Directory.Exists(folderPath))
                    System.IO.Directory.Delete(folderPath, true);
                List<ColumnMappingInput> columnMappingInput = JsonConvert.DeserializeObject<List<ColumnMappingInput>>(ColumnMapInput);
                List<CheckValidatedInput> checkValidatedInput = JsonConvert.DeserializeObject<List<CheckValidatedInput>>(ValidationInput);
                dynamic jsonData = JsonConvert.DeserializeObject(strdetails[0]);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new AdministrationModel(BaseInput).ImportDataItem.ImportDocumentDetails(columnMappingInput, checkValidatedInput, jsonData, DocumentFolder, IsInsert);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                //return Json(jsonResult, JsonRequestBehavior.AllowGet);
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("SSOEnabled")]
        public JsonResult SSOEnabled(string Input)
        {
            bool isSSOEnabled = Convert.ToBoolean(WebConfigurationManager.AppSettings["IsSSOEnabled"]);
            var jsonResult = Json(isSSOEnabled, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
        }

        [ActionName("GetUserCountForDashBoard")]
        public JsonResult GetUserCountForDashBoard()
        {
            try
            {
                string strReturn = new AdministrationModel(BaseInput).AdministrationDashboardItem.GetUserCountForDashBoard();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUsersExpiringSoonForDashBoard")]
        public JsonResult GetUsersExpiringSoonForDashBoard()
        {
            try
            {
                string strReturn = new AdministrationModel(BaseInput).AdministrationDashboardItem.GetUsersExpiringSoonForDashBoard();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDashboardDetailsForSpaceBarChart")]
        public JsonResult GetDashboardDetailsForSpaceBarChart(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                string strReturn = new AdministrationModel(BaseInput).AdministrationDashboardItem.GetDashboardDetailsForSpaceBarChart(applnInp);
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetModuleDetailsForDashBoard")]
        public JsonResult GetModuleDetailsForDashBoard()
        {
            try
            {
                string strReturn = new AdministrationModel(BaseInput).AdministrationDashboardItem.GetModuleDetailsForDashBoard();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetDrawingDistributionForDashBoard")]
        public JsonResult GetDrawingDistributionForDashBoard()
        {
            try
            {
                string strReturn = new AdministrationModel(BaseInput).AdministrationDashboardItem.GetDrawingDistributionForDashBoard();
                var jsonResult = Json(strReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetReportsAccessibleByUser")]
        public JsonResult GetReportsAccessibleByUser(string Input)
        {
            try
            {
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MultipleTablesReturn multipleTablesReturn = new AdministrationModel(BaseInput).AdministrationItem.GetReportsAccessibleByUser(applnInp);
                var jsonResult = Json(multipleTablesReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ChangePassword")]
        public ActionResult ChangePassword()
        {
            changePasswordViewModel ChangePassword = new changePasswordViewModel();
            Security.Cryptography.IndusHasher indusHasher = new Security.Cryptography.IndusHasher();
            ChangePassword.RSA_E = indusHasher.GetRSA_E();
            ChangePassword.RSA_M = indusHasher.GetRSA_M();

            return Json(ChangePassword, JsonRequestBehavior.AllowGet);
        }

        [ActionName("ChangePasswordConfirmation")]
        public ActionResult ChangePasswordConfirmation(string Input)
        {
            try
            {
                changePasswordViewModel ChangePasswordViewModel = JsonConvert.DeserializeObject<changePasswordViewModel>(Input);
                MessageReturn messageReturn = new MessageReturn();
                Security.Cryptography.IndusHasher indusHasher = new Security.Cryptography.IndusHasher();
                ChangePasswordViewModel.CurrentPassword = (ChangePasswordViewModel.CurrentPassword != null) ? indusHasher.GetRSADecryptText(ChangePasswordViewModel.CurrentPassword) : "";
                ChangePasswordViewModel.Password = (ChangePasswordViewModel.Password != null) ? indusHasher.GetRSADecryptText(ChangePasswordViewModel.Password) : "";
                ChangePasswordViewModel.ConfirmPassword = (ChangePasswordViewModel.ConfirmPassword != null) ? indusHasher.GetRSADecryptText(ChangePasswordViewModel.ConfirmPassword) : "";
                if (ChangePasswordViewModel.Password != ChangePasswordViewModel.ConfirmPassword)
                    messageReturn.Message = "Password and Confirm Password should be same.";
                else if (ChangePasswordViewModel.Password.Length >= 100)
                    messageReturn.Message = "The {0} must be at least {2} characters long.";
                else
                {
                    ChangePasswordViewModel.LoginName = BaseInput.UserName;
                    string check = new AccountController().checkValidationsforLogin(ChangePasswordViewModel, BaseInput.UserId, BaseInput.CustomerId);
                    messageReturn.Message = check;
                }
                return Json(messageReturn, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetSubscribedFeaturesWithFields")]
        public JsonResult GetSubscribedFeaturesWithFields(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new AdministrationModel(BaseInput).AdministrationItem.GetSubscribedFeaturesWithFields(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }


        [ActionName("UpdateCustomerFeatureSubscription")]
        public JsonResult UpdateCustomerFeatureSubscription(string Input)
        {
            try
            {
                CustomerFeatureInput custFeatureInput = JsonConvert.DeserializeObject<CustomerFeatureInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new AdministrationModel(BaseInput).AdministrationItem.UpdateCustomerFeatureSubscription(custFeatureInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("ImportUserDetails")]
        public JsonResult ImportUserDetails(string ColumnMapInput, string ValidationInput, string RowData, string Input, string FileInput, string FileName, string FileSize, string SheetName)
        {
            try
            {
                string filepath = GetFolderPathforImport(Input);
                string folderPath = filepath + "\\SA_01_1745" + "\\" + "Temp\\" + DateTime.Now.ToString("yyyy-MM-dd hh_mm_ss");
                string ProcPath = folderPath + "\\" + FileName;
                FileReader _filered = new FileReader();
                string _dbPath = "";
                _dbPath = ProcPath;
                _dbPath = _dbPath ?? "";
                if (_dbPath.Trim().Length > 0)
                {
                    string _filepath = _dbPath;
                    dynamic _saveOut = _filered.SaveFile(_filepath, _filered.GetByteArrayFromString(FileInput));
                }
                string[] strdetails = new string[2];
                string connstring = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + _dbPath + ";Extended Properties='Excel 8.0;HDR=NO;IMEX=1';";   // Extra blank space cannot appear in Office 2007 and the last version. And we need to pay attention on semicolon.
                using (OleDbConnection conn = new OleDbConnection(connstring))
                {
                    conn.Open();
                    List<string> strDetailIDList = new List<string>();
                    string sql = string.Format("SELECT * FROM [{0}]", SheetName);
                    OleDbDataAdapter ada = new OleDbDataAdapter(sql, connstring);
                    DataSet set = new DataSet();
                    ada.Fill(set);

                    foreach (DataColumn column in set.Tables[0].Columns)
                    {
                        string cName = set.Tables[0].Rows[0][column.ColumnName].ToString();
                        if (!set.Tables[0].Columns.Contains(cName) && cName != "")
                        {
                            column.ColumnName = cName;
                        }
                    }
                    strdetails[1] = set.Tables[0].ToJSON();
                    DataRow row = set.Tables[0].Rows[0];
                    set.Tables[0].Rows.Remove(row);
                    strdetails[0] = set.Tables[0].ToJSON();
                    conn.Close();
                }
                if (System.IO.Directory.Exists(folderPath))
                    System.IO.Directory.Delete(folderPath, true);
                List<ColumnMappingInput> columnMappingInput = JsonConvert.DeserializeObject<List<ColumnMappingInput>>(ColumnMapInput);
                List<CheckValidatedInput> checkValidatedInput = JsonConvert.DeserializeObject<List<CheckValidatedInput>>(ValidationInput);
                dynamic jsonData = JsonConvert.DeserializeObject(strdetails[0]);
                MessageReturn objMessageReturn = new MessageReturn();
                objMessageReturn = new AdministrationModel(BaseInput).ImportDataItem.ImportUserDetails(columnMappingInput, checkValidatedInput, jsonData);
                var jsonResult = Json(objMessageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                //return Json(jsonResult, JsonRequestBehavior.AllowGet);
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckMessageTemplateInUse")]
        public JsonResult CheckMessageTemplateInUse(string input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = new ApplicationFormInput();
                applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(input);
                int returnValue = new AdministrationModel(BaseInput).AdministrationItem.CheckMessageTemplateInUse(applicationFormInput);
                var jsonResult = Json(returnValue, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertUpdateCustomer")]
        public JsonResult InsertUpdateCustomer(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new AdministrationModel(BaseInput).AdministrationItem.InsertUpdateCustomer(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetCustomerDrawingCategories")]
        public JsonResult GetCustomerDrawingCategories(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new AdministrationModel(BaseInput).AdministrationItem.GetCustomerDrawingCategories(applicationFormInput);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertCustomerDrawingCategories")]
        public JsonResult InsertCustomerDrawingCategories(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new AdministrationModel(BaseInput).AdministrationItem.InsertCustomerDrawingCategories(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("InsertCustomerPermitedFiles")]
        public JsonResult InsertCustomerPermitedFiles(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new AdministrationModel(BaseInput).AdministrationItem.InsertCustomerPermitedFiles(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUserLicenseSetup")]
        public JsonResult GetUserLicenseSetup(string Input, int DeviceTypeId)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new AdministrationModel(BaseInput).AdministrationItem.GetUserLicenseSetup(applicationFormInput, DeviceTypeId);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetUserLicenseSetupForCustomers")]
        public JsonResult GetUserLicenseSetupForCustomers(string Input, int DeviceTypeId, int LicenseAccountLevel)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new AdministrationModel(BaseInput).AdministrationItem.GetUserLicenseSetupForCustomers(applicationFormInput, DeviceTypeId, LicenseAccountLevel);
                var jsonResult = Json(objDefaultApiReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateUserLicensingSetup")]
        public JsonResult UpdateUserLicensingSetup(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new AdministrationModel(BaseInput).AdministrationItem.UpdateUserLicensingSetup(applicationFormInput);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("UpdateUserLicensingSetupforCustomers")]
        public JsonResult UpdateUserLicensingSetupforCustomers(string Input,string SetupData)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                List<CustomerInput> licenseSetupData = JsonConvert.DeserializeObject<List<CustomerInput>>(SetupData);
                MessageReturn messageReturn = new MessageReturn();
                messageReturn = new AdministrationModel(BaseInput).AdministrationItem.UpdateUserLicensingSetupforCustomers(applicationFormInput, licenseSetupData);
                var jsonResult = Json(messageReturn, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckSeasonInUse")]
        public JsonResult CheckSeasonInUse(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnVal = new AdministrationModel(BaseInput).AdministrationItem.CheckSeasonInUse(applicationFormInput);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("CheckDrawingLayerForModule")]
        public JsonResult CheckDrawingLayerForModule(string Input)
        {
            try
            {
                ApplicationFormInput applicationFormInput = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                int returnVal = new AdministrationModel(BaseInput).AdministrationItem.CheckDrawingLayerForModule(applicationFormInput);
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }

        [ActionName("GetPlotSettingsAppSetingsKey")]
        public JsonResult GetPlotSettingsAppSetingsKey()
        {
            try
            {
                AppSettings appSetting = new AppSettings();
                List<AppSetting> lstSetting = appSetting.GetAllKeyValues();
                string returnVal = lstSetting.Find(item => item.Id == (int)AppSettingsKey.PlotSettings).Value.ToString();
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
        [ActionName("GetRevit3DDrawingAppSetingsKey")]
        public JsonResult GetRevit3DDrawingAppSetingsKey()
        {
            try
            {
                AppSettings appSetting = new AppSettings();
                List<AppSetting> lstSetting = appSetting.GetAllKeyValues();
                string returnVal = lstSetting.Find(item => item.Id == (int)AppSettingsKey.Revit3DDrawingApplicationURL).Value.ToString();
                var jsonResult = Json(returnVal, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                return new CommonController().ErrorMessage(ex.ToString());
            }
        }
    }
}
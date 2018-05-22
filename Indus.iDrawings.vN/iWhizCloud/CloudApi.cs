////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using System.IO;
using System.Diagnostics;
using Newtonsoft.Json;
using Indus.iDrawings.Common.Models.Items.Drawing;
using System.Threading;
using Indus.iDrawings.Utils;
using Indus.iDrawings.Common.Models;
using System.Linq;
using Indus.iDrawings.Common;
using Indus.iDrawings.Common.Entity;
using Indus.iDrawings.Space.Models;
using System.Dynamic;
using Indus.iDrawings.Utils.Security.Validation;
using Indus.iDrawings.Employees.Models;
using Indus.iDrawings.vN.Controllers;
using Indus.iDrawings.Security.Cryptography;
using System.Web.Helpers;
using System.Web.Script.Serialization;

namespace Indus.iDrawings.vN
{
    public class CloudApi
    {
        private Dictionary<string, ProcessManager> m_DrawingToProcess = new Dictionary<string, ProcessManager>();
        private Dictionary<string, string> m_DrawingToPath = new Dictionary<string, string>();
        private Dictionary<string, string> m_DrawingIdToFileName = new Dictionary<string, string>();

        private AppSettings appSettings = new AppSettings();
        private string m_BackgroundColor = "0,0,0";
        private bool m_IsConnected = false;
        enum DistributionType
        {
            Occupied = 1,
            UnOccupied = 2,
            UnderOccupied = 3,
            OverOccupied = 4,
            NominalOccupied = 5
        };

        public short OpenDrawing(string ServerPath, int UserId, int CustomerId, string ServicePath, string FileFolder,
            string DrawingId, int RevisionNumber, int DrawingType, bool IsFreeze, double Width, double Height, ref string CacheString, int ArchivedId,
            bool IsRender = false)// ref byte[] CacheData
        {
            try
            {
                //////////
                //Common.ServicePath = ServicePath;
                //string strFilePath = ServicePath;// appSettings[AppSettingsKey.FileLocation].Value;
                //strFilePath = Path.Combine(strFilePath, "OpenTime.txt");
                //DateTime curTime = DateTime.Now;
                //string strToWrite = "Open1: h: " + curTime.Hour.ToString() + ", m: " + curTime.Minute.ToString() + ", s: " + curTime.Second.ToString() + Environment.NewLine;
                //File.AppendAllText(strFilePath, strToWrite);
                //////////
                ProcessManager objPM;
                short retCode = 0;
                List<string> outList = new List<string>();
                string ConnectionId = "";
                if (IsRender)
                {

                    if (DrawingHost.UsertoConnction.TryGetValue(UserId.ToString(), out ConnectionId))
                    {
                        DrawingHost.UsertoConnction.Remove(UserId.ToString());
                    }
                    else
                        return 137;
                }
                ///////////////////////////////
                string DWGFileName = "";
                if (DrawingType == 6) // added for Add symbol in Symbol library(drawing open from client)
                {                  
                    // newDrawingId = "000";
                    if (DrawingId.Contains(PublicDataVariables.Delimiters.RowDelimiter))
                    {
                        string[] tempVal = DrawingId.Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray());
                        DrawingId = tempVal[0];
                        DWGFileName = tempVal[1];
                    }
                }
                ///////////////////////////////
                if (m_DrawingToProcess.TryGetValue(UserId.ToString() + "_" + DrawingId, out objPM))
                {
                    Close(DrawingId, UserId);
                }

                objPM = new ProcessManager();
                objPM.initSockets(ConnectionId);

                if (!m_IsConnected)
                    Thread.Sleep(3000);
                m_IsConnected = true;

                m_DrawingToProcess.Add(UserId.ToString() + "_" + DrawingId, objPM);

                int FloorId = 0, SiteId = 0, BuildingId = 0, DrawingCategoryId = 0, ProjectId = 0;
                string DWFFileName = "", SiteName = "", BuildingName = "", FloorName = "",
                       FolderName = "", DrawingCategory = "", SectionName = "";
                string RowDelimiter = PublicDataVariables.Delimiters.RowDelimiter, ColumnDelimiter = PublicDataVariables.Delimiters.ColumnDelimiter;

                DrawingAPIReturn drawingAPIReturn = new DrawingAPIReturn();

                try
                {
                    BaseClassInput baseInp = new BaseClassInput();
                    baseInp.CustomerId = CustomerId;
                    baseInp.UserId = UserId;
                    baseInp.TimeOffset = 0;
                    baseInp.RowsPerPage = 100;
                    
                    if (DrawingType == 6) // added for Add symbol in Symbol library(drawing open from client)
                    {
                        FolderName = new CommonModel(baseInp).DrawingItem.GetCustomerFolder(Convert.ToInt32(CustomerId));
                       // newDrawingId = "000";                       
                    }
                    else
                    {

                        if (DrawingType == 1)
                        {
                            drawingAPIReturn = new CommonModel(baseInp).DrawingItem.GetDrawingDetails(Convert.ToInt32(DrawingId), RevisionNumber, ArchivedId);
                            // drawingAPIReturn = new CommonModel(baseInp).DrawingItem.GetDrawingDetails(Convert.ToInt32(DrawingId), RevisionNumber);
                            FloorId = drawingAPIReturn.DrawingDetails[0].FloorId.Value;
                            FloorName = drawingAPIReturn.DrawingDetails[0].FloorName;
                        }
                        else if (DrawingType == 2)
                            drawingAPIReturn = new CommonModel(baseInp).DrawingItem.GetBuildingDrawingDetails(Convert.ToInt32(DrawingId), RevisionNumber);
                        else if (DrawingType == 5)
                        {
                            drawingAPIReturn = new CommonModel(baseInp).DrawingItem.GetProjectDrawingDetails(Convert.ToInt32(DrawingId), RevisionNumber);
                            ProjectId = drawingAPIReturn.DrawingDetails[0].ProjectId.Value;
                        }
                        SiteId = drawingAPIReturn.DrawingDetails[0].SiteId.Value;
                        BuildingId = drawingAPIReturn.DrawingDetails[0].BuildingId.Value;
                        RevisionNumber = drawingAPIReturn.DrawingDetails[0].RevisionNo.Value;
                        DWGFileName = drawingAPIReturn.DrawingDetails[0].DWGFileName;
                        DWFFileName = drawingAPIReturn.DrawingDetails[0].DWFFileName;
                        SiteName = drawingAPIReturn.DrawingDetails[0].SiteName;
                        BuildingName = drawingAPIReturn.DrawingDetails[0].BuildingName;
                        FolderName = drawingAPIReturn.DrawingDetails[0].FolderName;
                        DrawingCategory = drawingAPIReturn.DrawingDetails[0].DrawingCategory;
                        SectionName = drawingAPIReturn.DrawingDetails[0].DrawingSection;
                        DrawingCategoryId = drawingAPIReturn.DrawingDetails[0].DrawingCategoryId.Value;
                    }
                }
                catch (Exception e)
                {
                    CloseOnException(DrawingId, UserId);
                    return 136;
                }

                string FileLocation = appSettings[AppSettingsKey.FileLocation].Value;
                List<string[]> XrefCommands = new List<string[]>();
                string DrawingLocation = "", DwgFilePath = "", XRefedFilePath = "", XrefDrawingLocation = "";
                List<string> DWGFileNames = DWGFileName.Split(RowDelimiter.ToCharArray()).ToList();
                if (DWGFileNames.Count > 1)
                {
                    List<string> DWGdetails = DWGFileNames[0].Split(ColumnDelimiter.ToCharArray()).ToList();
                    if (DrawingType == 1)
                        DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", DrawingId, RevisionNumber.ToString());
                    else if (DrawingType == 2)
                        DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", "Buildings", DrawingId, RevisionNumber.ToString());
                   


                    DwgFilePath = Path.Combine(DrawingLocation, DWGdetails[0]);

                    for (int i = 1; i < DWGFileNames.Count; i++)
                    {
                        DWGdetails = DWGFileNames[i].Split(ColumnDelimiter.ToCharArray()).ToList();
                        if (DrawingType == 1)
                            XrefDrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", DWGdetails[1], DWGdetails[2]);
                        else if (DrawingType == 2)
                            XrefDrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", "Buildings", DWGdetails[1], DWGdetails[2]);

                        XRefedFilePath = Path.Combine(XrefDrawingLocation, DWGdetails[0]);
                        XrefCommands.Add(new string[]{
                            "SetXRefPath" , DWGdetails[0].Replace(".dwg",""), XRefedFilePath
                        });
                    }
                }
                else
                {
                    if (ArchivedId != 0)
                    {
                        //string strFileNameTo = ROOT_FOLDER + CustFolderName + @"\CAI\Archive\" + applicationFormInput.EntityId.ToString() + "\\" + DrawingIds[i].ToString() + "\\";
                        DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, @"CAI\Archive\", ArchivedId.ToString(), DrawingId, RevisionNumber.ToString());

                    }
                    else
                    {
                        if (DrawingType == 1)
                            DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", DrawingId, RevisionNumber.ToString());
                        else if (DrawingType == 2)
                            DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", "Buildings", DrawingId, RevisionNumber.ToString());
                        else if (DrawingType == 5) // added for Project dawingopen
                            DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Projects",ProjectId.ToString(), "BaseDrawings", DrawingId, RevisionNumber.ToString());
                        else if (DrawingType == 6)// added for Add symbol in Symbol library(drawing open from client)
                            DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "SymbolLibrary", UserId.ToString(), DrawingId);
                    }
                    DwgFilePath = Path.Combine(DrawingLocation, DWGFileName);
                }

                // DwgFilePath = Path.Combine(DrawingLocation, DWGFileName);

                if (!File.Exists(DwgFilePath))
                {
                    CloseOnException(DrawingId, UserId);
                    return 2;
                }

                DwgFilePath = "\"" + DwgFilePath + "\"";

                //string layervis = "$POLYLINE_GR,true;$POLYLINE_CN,true;$POLYLINE_SP,true;$POLYLINE_NT,true;0,false;A-ANNO-TEXT,false;A-5-EXST,false;A-FLOR-EXST,false;A-DOOR,false;A-EQPM,false;A_FURN_ERROR,false;A-FURN,false;AFUAC-P,false;AFULG-P,false;A-FURN-P-STORAGE,false;A-FLOR-TPTN,false;A-FLOR-FIXT,false;A-GRID,false;A-GRID-IDEN,false;A-COLS,false;A-WALL-EXTR,false;A-GLAZ,false;A-WALL-INTR,false;Defpoints,false;A-FLOR-PFIX,false;A-FLOR-STRS,false;A-FLOR-HRAL,false;A-FLOR-EVTR,false;A-FLOR-CASE,false;A-WALL-MOVE,false;A-FLOR-IDEN-NAME,false;A-FLOR-IDEN-NUMB,false;A-FLOR-TEXT,false;A-SHBD-TTLB,false;";
                List<string> commandsList = new List<string> {
                            "SETBKGCOL", "0,0,0",
                            "LOADAPP", "WebAdapt",
                            "LOADAPP", "DbCommands",
                            "LOADAPP", "ExCommands",
                            "LOADMODULE", "CloudGfxSrv.txv",
                            "LOADAPP", "ZeroMQ",
                            "OPEN" ,"Part" ,DwgFilePath,
                            "LOADAPP", "WebiWhiz",
                            "ViewLayout","Model",
                            //"HideAllLayers",
                            //"SOCKET", "Alias", "gsout", objPM.m_gsConnectionString + "/PUSH",
                            };
                if (IsFreeze)
                {
                    commandsList.AddRange(new string[]{                        
                        "FreezeAllLayers"
                    });
                }
                else
                {
                    commandsList.AddRange(new string[]{
                        "StoreAlreadyFrozenLayers",
                        "ShowAllLayers"
                    });
                }
                if (XrefCommands.Count > 0)
                {
                    for (int i = 0; i < XrefCommands.Count; i++)
                    {
                        commandsList.AddRange(XrefCommands[i]);
                    }
                }
                commandsList.AddRange(new string[]{
                             "SOCKET", "Alias", "gsout", objPM.m_gsConnectionString + "/PUSH",
                             "EDIOBIND", "ZeroMQ", objPM.m_ConnectionString
                    });

                ///////////////
                //curTime = DateTime.Now;
                //strToWrite = "Open2: h: " + curTime.Hour.ToString() + ", m: " + curTime.Minute.ToString() + ", s: " + curTime.Second.ToString() + Environment.NewLine;
                //File.AppendAllText(strFilePath, strToWrite);
                /////////////

                objPM.m_IsFirstCache = true;
                Thread objOpenDrawing = new Thread(() =>
                {
                    retCode = objPM.runTxHostZMQ(ServicePath, commandsList);
                    objPM.m_WaitOpen[1].Set();
                });
                objOpenDrawing.Start();
                //WaitHandle.WaitAll(objPM.m_WaitOpen);
                WaitHandle.WaitAny(objPM.m_WaitOpen);

                ///////////////
                //curTime = DateTime.Now;
                //strToWrite = "Open3: h: " + curTime.Hour.ToString() + ", m: " + curTime.Minute.ToString() + ", s: " + curTime.Second.ToString() + Environment.NewLine;
                //File.AppendAllText(strFilePath, strToWrite);
                /////////////
                if (retCode == 0)
                {
                    if (m_DrawingToPath.ContainsKey(DrawingId))
                    {
                        m_DrawingToPath.Remove(DrawingId);
                    }
                    m_DrawingToPath.Add(DrawingId, DrawingLocation);

                    if (m_DrawingIdToFileName.ContainsKey(DrawingId))
                    {
                        m_DrawingIdToFileName.Remove(DrawingId);
                    }
                    m_DrawingIdToFileName.Add(DrawingId, DWGFileName);
                    commandsList.Clear();
                    commandsList = new List<string>();
                    if (IsRender)
                    {
                        commandsList = new List<string>
                        {
                            "GfxSrv", "Auto" , "Screen",
                            Width.ToString(), Height.ToString(),
                            "Streaming", "100000",//"LOD", "0.02", "0.0001",
                            "rx:/ZeroMQ/gsout/wr"                             
                        };
                    }
                    commandsList.AddRange(new string[]{
                               "CheckForXrefs"});
                    retCode = objPM.executeCommand(commandsList, ref outList);
                }
                //////////
                ///////////////
                //curTime = DateTime.Now;
                //strToWrite = "Open4: h: " + curTime.Hour.ToString() + ", m: " + curTime.Minute.ToString() + ", s: " + curTime.Second.ToString() + Environment.NewLine;
                //File.AppendAllText(strFilePath, strToWrite);
                /////////////
                //////////
                //CacheString = objPM.m_CacheString;
                objPM.m_CacheString = "";
                return retCode;
            }
            catch (Exception e)
            {
                string FileLocation = appSettings[AppSettingsKey.FileLocation].Value;
                FileLocation = Path.Combine(FileLocation, "Open Exception.txt");
                File.AppendAllText(FileLocation, e.Message + Environment.NewLine);

                CloseOnException(DrawingId, UserId);
                //  m_DrawingToProcess.Remove(UserId.ToString() + "_" + DrawingId);
                return 9;
            }
        }
        public short OpenDrawingPartial(string ServerPath, int UserId, int CustomerId, string ServicePath,
            string FileFolder, string DrawingId, int RevisionNumber, int DrawingType, string PolylineHandles, string LayerNames,
            double Width, double Height, ref string CacheString, bool IsRender = false)// ref byte[] CacheData
        {
            try
            {
                ProcessManager objPM;
                short retCode = 0;
                List<string> outList = new List<string>();
                string ConnectionId = "";
                if (IsRender)
                {

                    if (DrawingHost.UsertoConnction.TryGetValue(UserId.ToString(), out ConnectionId))
                    {
                        DrawingHost.UsertoConnction.Remove(UserId.ToString());
                    }
                    else
                        return 137;
                }

                if (m_DrawingToProcess.TryGetValue(UserId.ToString() + "_" + DrawingId, out objPM))
                {
                    Close(DrawingId, UserId);
                }

                objPM = new ProcessManager();
                objPM.initSockets(ConnectionId);

                if (!m_IsConnected)
                    Thread.Sleep(3000);
                m_IsConnected = true;

                m_DrawingToProcess.Add(UserId.ToString() + "_" + DrawingId, objPM);

                int FloorId = 0, SiteId = 0, BuildingId = 0, DrawingCategoryId = 0;
                string DWGFileName = "", DWFFileName = "", SiteName = "", BuildingName = "", FloorName = "",
                       FolderName = "", DrawingCategory = "", SectionName = "";
                string RowDelimiter = PublicDataVariables.Delimiters.RowDelimiter, ColumnDelimiter = PublicDataVariables.Delimiters.ColumnDelimiter;

                DrawingAPIReturn drawingAPIReturn = new DrawingAPIReturn();

                try
                {
                    BaseClassInput baseInp = new BaseClassInput();
                    baseInp.CustomerId = CustomerId;
                    baseInp.UserId = UserId;
                    baseInp.TimeOffset = 0;
                    baseInp.RowsPerPage = 100;

                    if (DrawingType == 1)
                    {
                        drawingAPIReturn = new CommonModel(baseInp).DrawingItem.GetDrawingDetails(Convert.ToInt32(DrawingId), RevisionNumber,0);
                        FloorId = drawingAPIReturn.DrawingDetails[0].FloorId.Value;
                        FloorName = drawingAPIReturn.DrawingDetails[0].FloorName;
                    }
                    else if (DrawingType == 2)
                        drawingAPIReturn = new CommonModel(baseInp).DrawingItem.GetBuildingDrawingDetails(Convert.ToInt32(DrawingId), RevisionNumber);

                    SiteId = drawingAPIReturn.DrawingDetails[0].SiteId.Value;
                    BuildingId = drawingAPIReturn.DrawingDetails[0].BuildingId.Value;
                    RevisionNumber = drawingAPIReturn.DrawingDetails[0].RevisionNo.Value;
                    DWGFileName = drawingAPIReturn.DrawingDetails[0].DWGFileName;
                    DWFFileName = drawingAPIReturn.DrawingDetails[0].DWFFileName;
                    SiteName = drawingAPIReturn.DrawingDetails[0].SiteName;
                    BuildingName = drawingAPIReturn.DrawingDetails[0].BuildingName;
                    FolderName = drawingAPIReturn.DrawingDetails[0].FolderName;
                    DrawingCategory = drawingAPIReturn.DrawingDetails[0].DrawingCategory;
                    SectionName = drawingAPIReturn.DrawingDetails[0].DrawingSection;
                    DrawingCategoryId = drawingAPIReturn.DrawingDetails[0].DrawingCategoryId.Value;
                }
                catch (Exception /*e*/)
                {
                    return 136;
                }

                string FileLocation = appSettings[AppSettingsKey.FileLocation].Value;
                List<string[]> XrefCommands = new List<string[]>();
                string DrawingLocation = "", DwgFilePath = "", XRefedFilePath = "", XrefDrawingLocation = "";
                List<string> DWGFileNames = DWGFileName.Split(RowDelimiter.ToCharArray()).ToList();
                if (DWGFileNames.Count > 1)
                {
                    List<string> DWGdetails = DWGFileNames[0].Split(ColumnDelimiter.ToCharArray()).ToList();
                    if (DrawingType == 1)
                        DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", DrawingId, RevisionNumber.ToString());
                    else if (DrawingType == 2)
                        DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", "Buildings", DrawingId, RevisionNumber.ToString());

                    DwgFilePath = Path.Combine(DrawingLocation, DWGdetails[0]);

                    for (int i = 1; i < DWGFileNames.Count; i++)
                    {
                        DWGdetails = DWGFileNames[i].Split(ColumnDelimiter.ToCharArray()).ToList();
                        if (DrawingType == 1)
                            XrefDrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", DWGdetails[1], DWGdetails[2]);
                        else if (DrawingType == 2)
                            XrefDrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", "Buildings", DWGdetails[1], DWGdetails[2]);

                        XRefedFilePath = Path.Combine(XrefDrawingLocation, DWGdetails[0]);
                        XrefCommands.Add(new string[]{
                            "SetXRefPath" , DWGdetails[0].Replace(".dwg",""), XRefedFilePath
                        });
                    }
                }
                else
                {
                    if (DrawingType == 1)
                        DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", DrawingId, RevisionNumber.ToString());
                    else if (DrawingType == 2)
                        DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", "Buildings", DrawingId, RevisionNumber.ToString());
                    DwgFilePath = Path.Combine(DrawingLocation, DWGFileName);
                }
                
                if (!File.Exists(DwgFilePath))
                {
                    return 2;
                }

                DwgFilePath = "\"" + DwgFilePath + "\"";

                List<string> commandsList = new List<string> {
                            "SETBKGCOL", "0,0,0",
                            "LOADAPP", "WebAdapt",
                            "LOADAPP", "DbCommands",
                            "LOADAPP", "ExCommands",
                            "LOADMODULE", "CloudGfxSrv.txv",
                            "LOADAPP", "ZeroMQ",
                            "OPEN" ,"Part" ,DwgFilePath,
                            "LOADAPP", "WebiWhiz",
                            "ViewLayout","Model",
                            //"HideAllLayers",
                            "SOCKET", "Alias", "gsout", objPM.m_gsConnectionString + "/PUSH",
                            };
                if (XrefCommands.Count > 0)
                {
                    for (int i = 0; i < XrefCommands.Count; i++)
                    {
                        commandsList.AddRange(XrefCommands[i]);
                    }
                }
                commandsList.AddRange(new string[]{
                             "EDIOBIND", "ZeroMQ", objPM.m_ConnectionString
                    });
                
                objPM.m_IsFirstCache = true;
                Thread objOpenDrawing = new Thread(() =>
                {
                    retCode = objPM.runTxHostZMQ(ServicePath, commandsList);
                    objPM.m_WaitOpen[1].Set();
                });
                objOpenDrawing.Start();
                WaitHandle.WaitAny(objPM.m_WaitOpen);
                
                if (retCode == 0)
                {
                    if (m_DrawingToPath.ContainsKey(DrawingId))
                    {
                        m_DrawingToPath.Remove(DrawingId);
                    }
                    m_DrawingToPath.Add(DrawingId, DrawingLocation);

                    if (m_DrawingIdToFileName.ContainsKey(DrawingId))
                    {
                        m_DrawingIdToFileName.Remove(DrawingId);
                    }
                    m_DrawingIdToFileName.Add(DrawingId, DWGFileName);
                    commandsList.Clear();
                    commandsList = new List<string>();
                    if (IsRender)
                    {
                        commandsList = new List<string>
                        {
                            "OpenPartially", PolylineHandles, LayerNames,PublicDataVariables.Delimiters.RowDelimiter,
                            //"DeleteLayerForPartialOpen", "8F608", "",
                            "GfxSrv", "Auto" , "Screen",
                            Width.ToString(), Height.ToString(),
                            "Streaming", "100000",
                            "rx:/ZeroMQ/gsout/wr",
                            "DeleteLayerForPartialOpen", PolylineHandles, LayerNames
                        };
                    }
                    commandsList.AddRange(new string[]{
                               "CheckForXrefs"});
                    retCode = objPM.executeCommand(commandsList, ref outList);
                }
                objPM.m_CacheString = "";
                return retCode;
            }
            catch (Exception e)
            {
                m_DrawingToProcess.Remove(UserId.ToString() + "_" + DrawingId);
                return 9;
            }
        }

        public short OpenPartiallyWithLayers(int UserId, int CustomerId, string ServicePath, string FileFolder, string DrawingId, int RevisionNumber, int DrawingType, double Width, double Height, string LayerNames, ref string CacheString, bool IsRender = false)// ref byte[] CacheData
        {
            try
            {
                ProcessManager objPM;
                short retCode = 0;
                List<string> outList = new List<string>();
                string ConnectionId = "";
                if (IsRender)
                {

                    if (DrawingHost.UsertoConnction.TryGetValue(UserId.ToString(), out ConnectionId))
                    {
                        DrawingHost.UsertoConnction.Remove(UserId.ToString());
                    }
                    else
                        return 137;
                }

                if (m_DrawingToProcess.TryGetValue(UserId.ToString() + "_" + DrawingId, out objPM))
                {
                    Close(DrawingId, UserId);
                }

                objPM = new ProcessManager();
                objPM.initSockets(ConnectionId);

                if (!m_IsConnected)
                    Thread.Sleep(3000);
                m_IsConnected = true;

                m_DrawingToProcess.Add(UserId.ToString() + "_" + DrawingId, objPM);

                int FloorId = 0, SiteId = 0, BuildingId = 0, DrawingCategoryId = 0;
                string DWGFileName = "", DWFFileName = "", SiteName = "", BuildingName = "", FloorName = "",
                       FolderName = "", DrawingCategory = "", SectionName = "";
                string RowDelimiter = PublicDataVariables.Delimiters.RowDelimiter, ColumnDelimiter = PublicDataVariables.Delimiters.ColumnDelimiter;

                DrawingAPIReturn drawingAPIReturn = new DrawingAPIReturn();

                try
                {
                    BaseClassInput baseInp = new BaseClassInput();
                    baseInp.CustomerId = CustomerId;
                    baseInp.UserId = UserId;
                    baseInp.TimeOffset = 0;
                    baseInp.RowsPerPage = 100;

                    if (DrawingType == 1)
                    {
                        drawingAPIReturn = new CommonModel(baseInp).DrawingItem.GetDrawingDetails(Convert.ToInt32(DrawingId), RevisionNumber,0);
                        FloorId = drawingAPIReturn.DrawingDetails[0].FloorId.Value;
                        FloorName = drawingAPIReturn.DrawingDetails[0].FloorName;
                    }
                    else if (DrawingType == 2)
                        drawingAPIReturn = new CommonModel(baseInp).DrawingItem.GetBuildingDrawingDetails(Convert.ToInt32(DrawingId), RevisionNumber);

                    SiteId = drawingAPIReturn.DrawingDetails[0].SiteId.Value;
                    BuildingId = drawingAPIReturn.DrawingDetails[0].BuildingId.Value;
                    RevisionNumber = drawingAPIReturn.DrawingDetails[0].RevisionNo.Value;
                    DWGFileName = drawingAPIReturn.DrawingDetails[0].DWGFileName;
                    DWFFileName = drawingAPIReturn.DrawingDetails[0].DWFFileName;
                    SiteName = drawingAPIReturn.DrawingDetails[0].SiteName;
                    BuildingName = drawingAPIReturn.DrawingDetails[0].BuildingName;
                    FolderName = drawingAPIReturn.DrawingDetails[0].FolderName;
                    DrawingCategory = drawingAPIReturn.DrawingDetails[0].DrawingCategory;
                    SectionName = drawingAPIReturn.DrawingDetails[0].DrawingSection;
                    DrawingCategoryId = drawingAPIReturn.DrawingDetails[0].DrawingCategoryId.Value;
                }
                catch (Exception /*e*/)
                {
                    return 136;
                }
                string FileLocation = appSettings[AppSettingsKey.FileLocation].Value;
                List<string[]> XrefCommands = new List<string[]>();
                string DrawingLocation = "", DwgFilePath = "", XRefedFilePath = "", XrefDrawingLocation = "";
                List<string> DWGFileNames = DWGFileName.Split(RowDelimiter.ToCharArray()).ToList();
                if (DWGFileNames.Count > 1)
                {
                    List<string> DWGdetails = DWGFileNames[0].Split(ColumnDelimiter.ToCharArray()).ToList();
                    if (DrawingType == 1)
                        DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", DrawingId, RevisionNumber.ToString());
                    else if (DrawingType == 2)
                        DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", "Buildings", DrawingId, RevisionNumber.ToString());

                    DwgFilePath = Path.Combine(DrawingLocation, DWGdetails[0]);

                    for (int i = 1; i < DWGFileNames.Count; i++)
                    {
                        DWGdetails = DWGFileNames[i].Split(ColumnDelimiter.ToCharArray()).ToList();
                        if (DrawingType == 1)
                            XrefDrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", DWGdetails[1], DWGdetails[2]);
                        else if (DrawingType == 2)
                            XrefDrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", "Buildings", DWGdetails[1], DWGdetails[2]);

                        XRefedFilePath = Path.Combine(XrefDrawingLocation, DWGdetails[0]);
                        XrefCommands.Add(new string[]{
                            "SetXRefPath" , DWGdetails[0].Replace(".dwg",""), XRefedFilePath
                        });
                    }
                }
                else
                {
                    if (DrawingType == 1)
                        DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", DrawingId, RevisionNumber.ToString());
                    else if (DrawingType == 2)
                        DrawingLocation = Path.Combine(FileLocation, FileFolder, FolderName, "Drawings", "Buildings", DrawingId, RevisionNumber.ToString());
                    DwgFilePath = Path.Combine(DrawingLocation, DWGFileName);
                }


                if (!File.Exists(DwgFilePath))
                {
                    return 2;
                }

                DwgFilePath = "\"" + DwgFilePath + "\"";
                // Dictionary<string, object> profiles = getModelerSettings(Path.GetExtension(DWGFileName));
                List<string> commandsList = new List<string> {
                            "SETBKGCOL", "0,0,0",
                            "LOADAPP", "WebAdapt",
                            "LOADAPP", "DbCommands",
                            "LOADAPP", "ExCommands",
                            "LOADMODULE", "CloudGfxSrv.txv",
                            "LOADAPP", "ZeroMQ",
                            "OPEN" ,"Part" ,DwgFilePath,
                            "LOADAPP", "WebiWhiz",
                            "ViewLayout","Model",
                           // "HideAllLayers",
                            "SOCKET", "Alias", "gsout", objPM.m_gsConnectionString + "/PUSH",
                };
                if (XrefCommands.Count > 0)
                {
                    for (int i = 0; i < XrefCommands.Count; i++)
                    {
                        commandsList.AddRange(XrefCommands[i]);
                    }
                }
                commandsList.AddRange(new string[]{
                             "EDIOBIND", "ZeroMQ", objPM.m_ConnectionString
                    });


                objPM.m_IsFirstCache = true;
                Thread objOpenDrawing = new Thread(() =>
                {
                    retCode = objPM.runTxHostZMQ(ServicePath, commandsList);
                    objPM.m_WaitOpen[1].Set();
                });
                objOpenDrawing.Start();
                //WaitHandle.WaitAll(objPM.m_WaitOpen);
                WaitHandle.WaitAny(objPM.m_WaitOpen);
                if (retCode == 0)
                {
                    if (m_DrawingToPath.ContainsKey(DrawingId))
                    {
                        m_DrawingToPath.Remove(DrawingId);
                    }
                    m_DrawingToPath.Add(DrawingId, DrawingLocation);

                    if (m_DrawingIdToFileName.ContainsKey(DrawingId))
                    {
                        m_DrawingIdToFileName.Remove(DrawingId);
                    }
                    m_DrawingIdToFileName.Add(DrawingId, DWGFileName);
                    commandsList.Clear();
                    commandsList = new List<string>();
                    if (IsRender)
                    {
                        commandsList = new List<string>
                        {
                            "OpenPartiallyWithLayers", LayerNames, PublicDataVariables.Delimiters.RowDelimiter,
                            "GfxSrv", "Auto" , "Screen",
                            Width.ToString(), Height.ToString(),
                            "Streaming", "100000",
                            "rx:/ZeroMQ/gsout/wr"
                        };
                    }
                    commandsList.AddRange(new string[]{
                               "CheckForXrefs"});
                    retCode = objPM.executeCommand(commandsList, ref outList);
                }
                //CacheString = objPM.m_CacheString;
                objPM.m_CacheString = "";
                return retCode;
            }
            catch (Exception e)
            {
                m_DrawingToProcess.Remove(UserId.ToString() + "_" + DrawingId);
                return 9;
            }
        }
        public short RegenerateDevice(string DrawingId, string UserId, string Red, string Green, string Blue, double Width, double Height, ref string CacheString)
        {
            try
            {
                short retCode = 0;
                ProcessManager objPM;
                List<string> outList = new List<string>();

                List<string> commandsList = new List<string> { };//"VIEWLAYOUT",LayoutName
                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    commandsList.AddRange(new string[]{
                          "SETBKGCOL", Red + "," + Green + "," + Blue,
                          "GfxSrv", "Auto" , "Screen",
                            Width.ToString(), Height.ToString(),
                          "LOD","0.005","0.0001",
                            "rx:/ZeroMQ/gsout/wr"
                        });
                    objPM.ResetEvents();
                    Thread objOpenDrawing = new Thread(() =>
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        objPM.m_WaitOpen[1].Set();
                    });
                    objOpenDrawing.Start();
                    WaitHandle.WaitAll(objPM.m_WaitOpen, 2000);

                    CacheString = objPM.m_CacheString;
                    objPM.m_CacheString = "";

                    m_BackgroundColor = Red + "," + Green + "," + Blue;
                }
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public void CloseOnException(string DrawingId, int UserId)
        {
            ProcessManager objPM;
            if (m_DrawingToProcess.TryGetValue(UserId.ToString() + "_" + DrawingId, out objPM))
            {
                m_DrawingToProcess.Remove(UserId.ToString() + "_" + DrawingId);
                if (!objPM.IsExited())
                {
                    objPM.killProcess();
                }
            }
        }
        public short Close(string DrawingId, int UserId)
        {
            try
            {
                ProcessManager objPM;
                short retCode = 0;
                List<string> commandsList = new List<string> {
                            "CLOSE"
                };

                string DrawingLocation = "";
                if (m_DrawingToPath.TryGetValue(DrawingId, out DrawingLocation))
                {
                    m_DrawingToPath.Remove(DrawingId);
                }
                string DwgFileName = "";
                if (m_DrawingIdToFileName.TryGetValue(DrawingId, out DwgFileName))
                {
                    m_DrawingIdToFileName.Remove(DrawingId);
                }

                List<string> outList = new List<string>();
                if (m_DrawingToProcess.TryGetValue(UserId.ToString() + "_" + DrawingId, out objPM))
                {
                    m_DrawingToProcess.Remove(UserId.ToString() + "_" + DrawingId);
                    if (!objPM.IsExited())
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        objPM.killProcess();
                    }
                    else
                        return 0;
                }

                return retCode;
            }
            catch (Exception e)
            {
                return 9;
            }
        }
        public short CreateDrawing(string DrawingId, string UserId, string ServicePath, string FileFolder, short Measurement, double Width, double Height, ref string CacheString)
        {
            try
            {
                ProcessManager objPM;
                short retCode = 0;
                List<string> outList = new List<string>();
                string ConnectionId = "";

                if (DrawingHost.UsertoConnction.TryGetValue(UserId.ToString(), out ConnectionId))
                {
                    DrawingHost.UsertoConnction.Remove(UserId.ToString());
                }
                else
                    return 137;
                if (m_DrawingToProcess.TryGetValue(UserId.ToString() + "_" + DrawingId, out objPM))
                {
                    Close(DrawingId, Convert.ToInt32(UserId));
                }

                string TempFilePath = Path.Combine(appSettings[AppSettingsKey.FileLocation].Value, FileFolder, "New", "Drawings", "-1", UserId + ".dwg");
                 if (!File.Exists(TempFilePath))
                {
                    FileStorage FS = new FileStorage();
                    FS.createFolder(Path.GetDirectoryName(TempFilePath));
                }

                objPM = new ProcessManager();
                objPM.initSockets(ConnectionId);
                m_DrawingToProcess.Add(UserId.ToString() + "_" + DrawingId, objPM);
                List<string> commandsList = new List<string> {
                            "SETBKGCOL", "0,0,0",
                            "LOADAPP", "WebAdapt",
                            "LOADAPP", "DbCommands",
                            "LOADAPP", "ExCommands",
                            "LOADMODULE", "CloudGfxSrv.txv",
                            "LOADAPP", "WebiWhiz",
                            "CreateDrawing", Measurement.ToString(),TempFilePath

                  };

                commandsList.AddRange(new string[]{
                             "OPEN" ,"partial",TempFilePath,//since currently drawingid and filename is same                       
                             "VIEWLAYOUT","Model"  ,
                             "LOADAPP", "ZeroMQ",
                             "SOCKET", "Alias", "gsout", objPM.m_gsConnectionString + "/PUSH",
                             //"GfxSrv", "Auto" , "Screen",
                             //Width.ToString(), Height.ToString(),
                             //"LOD","0.005","0.0001",
                             //"rx:/ZeroMQ/gsout/wr",
                             "EDIOBIND", "ZeroMQ", objPM.m_ConnectionString
                     });

                objPM.m_IsFirstCache = true;
                Thread objOpenDrawing = new Thread(() =>
                {
                    retCode = objPM.runTxHostZMQ(ServicePath, commandsList);
                    objPM.m_WaitOpen[1].Set();
                });
                objOpenDrawing.Start();
                WaitHandle.WaitAny(objPM.m_WaitOpen);

                if (retCode == 0)
                {
                    commandsList = new List<string>
                    {
                        "GfxSrv", "Auto" , "Screen",
                        Width.ToString(), Height.ToString(),
                        "Streaming", "100000",//"LOD", "0.02", "0.0001",
                        "rx:/ZeroMQ/gsout/wr"
                    };
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    if (m_DrawingToPath.ContainsKey(DrawingId))
                    {
                        m_DrawingToPath.Remove(DrawingId);
                    }
                    m_DrawingToPath.Add(DrawingId, Path.GetDirectoryName(TempFilePath));

                    if (m_DrawingIdToFileName.ContainsKey(DrawingId))
                    {
                        m_DrawingIdToFileName.Remove(DrawingId);
                    }
                    m_DrawingIdToFileName.Add(DrawingId, "New");
                }
                CacheString = objPM.m_CacheString;
                objPM.m_CacheString = "";
                return retCode;

            }
            catch (Exception /*e*/)
            {
                m_DrawingToProcess.Remove(UserId.ToString() + "_" + DrawingId);
                return 9;
            }
        }
        public short Regenerate(string DrawingId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "UPDATEGS"
                };
                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        /////////////////////////////////////////////Context///////////////////////////////////////////////////////////////      
        public short GetODAlibVersion(string ServicePath, ref string Version)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "LOADAPP", "WebiWhiz",
                            "ODALibVersion"
                };

                string args = txHostCommandLineArgsFormat(commandsList);
                short retCode = 0;
                string odaVersion = "";


                retCode = executeCommand(args, ServicePath, ref odaVersion);

                Version = odaVersion;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short ViewLayout(string DrawingId, string LayoutName, string UserId, double Width, double Height, ref string CacheString)
        {
            try
            {
                short retCode = 0;
                ProcessManager objPM;
                List<string> outList = new List<string>();

                List<string> commandsList = new List<string> { };//"VIEWLAYOUT",LayoutName
                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    commandsList.AddRange(new string[]{
                            "GfxSrv", "Auto" , "Screen",
                            Width.ToString(), Height.ToString(),
                            "LOD","0.005","0.0001",
                            "rx:/ZeroMQ/gsout/wr"
                        });


                    objPM.ResetEvents();
                    Thread objOpenDrawing = new Thread(() =>
                    {
                        //  objPM.m_IsFirstCache = true;
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        objPM.m_WaitOpen[1].Set();
                    });
                    objOpenDrawing.Start();
                    WaitHandle.WaitAll(objPM.m_WaitOpen, 2000);
                    objPM.ResetEvents();
                    CacheString = objPM.m_CacheString;
                    objPM.m_CacheString = "";
                }

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short SetDelimiter(string DrawingId, string RowDelimiter, string ColumnDelimiter, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetDelimiter" , RowDelimiter,  ColumnDelimiter
                };
                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetAreaRatio(string DrawingId, double AreaRatio, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                             "SetAreaRatio",AreaRatio.ToString()
                };
                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetLayout(string DrawingId, string LayoutName, string UserId)
        {
            try
            {
                if (LayoutName == null || LayoutName == "")
                    LayoutName = "Model";
                List<string> commandsList = new List<string> {
                            "GFXSETLAYOUT" , LayoutName
                };
                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetDWGVersion(string DrawingId, ref string Version, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DWGVersion"
                };
                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    Version = outList[0];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllXrefs(string DrawingId, ref string XrefFileNames, string UserId)
        {
            try
            {

                List<string> commandsList = new List<string> {
                            "GetAllXrefs"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    XrefFileNames = outList[0];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllLayouts(string DrawingId, ref string Layouts, string UserId)
        {
            try
            {

                List<string> commandsList = new List<string> {
                            "GetAllLayouts"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    Layouts = outList[0];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllLayers(string DrawingId, ref string Layers, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetAllLayers"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    Layers = outList[0];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetLayerData(string DrawingId, ref string LayerInfo, string UserId)
        {
            try
            {
                string FilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out FilePath))
                {
                    string layerPath = Path.Combine(FilePath, "layers.txt");
                    List<string> commandsList = new List<string> {
                               "WALAYERS", layerPath
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        LayerInfo = File.ReadAllText(layerPath);
                        File.Delete(layerPath);
                    }
                    else
                        return 3;

                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllTextStyles(string DrawingId, ref string StyleNames, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetAllTextstyles"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                    {
                        int index = outList.FindLastIndex(item => item == "Command");
                        StyleNames = outList[index - 1];
                        retCode = 0;
                    }
                    else
                    {
                        StyleNames = outList[0];
                    }
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllLineTypes(string DrawingId, ref short Count, ref string LineTypes, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                           "GetAllLineTypes"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    short.TryParse(outList[0], out Count);
                    LineTypes = outList[1];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetXRefHandles(string DrawingId, ref string XrefHandles, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetXRefHandles"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    XrefHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short IsTextStyleExists(string DrawingId, string TextStyle, ref bool IsExists, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "IsTextStyleExists" , TextStyle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    if (outList[0] == "1")
                        IsExists = true;
                    else if (outList[0] == "0")
                        IsExists = false;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetXRefPath(string DrawingId, string FileName, string NewPath, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetXRefPath" , FileName,NewPath
                };
                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short DetachFailedXRefs(string DrawingId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DetachFailedXRefs"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short AttachXref(string DrawingId, string FilePath, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "AttachXref" , FilePath
                };
                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetFailedXrefs(string DrawingId, ref string fileNames, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetFailedXrefs"
                };
                List<string> outList = new List<string>();
                ProcessManager objPM;

                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    fileNames = outList[0];
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short IsLayerFrozen(string DrawingId, string LayerName, ref bool IsFrozen, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "IsLayerFrozen" , LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    if (outList[0] == "1")
                        IsFrozen = true;
                    else if (outList[0] == "0")
                        IsFrozen = false;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetLayerColor(string DrawingId, string LayerName, ref short AutocadColor, string UserId)
        {
            try
            {

                List<string> commandsList = new List<string> {
                              "GetLayerColor", LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    short.TryParse(outList[0], out AutocadColor);
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetLayerInfo(string DrawingId, string LayerName, ref bool IsVisible, ref short AutocadColor, ref string LayerId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetLayerInfo", LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    if (outList[0] == "0")
                        IsVisible = false;
                    else if (outList[0] == "1")
                        IsVisible = true;
                    short.TryParse(outList[1], out AutocadColor);
                    LayerId = outList[2];

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetLayerVisibility(string DrawingId, string LayerName, bool IsVisible, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetLayerVisibility", LayerName, IsVisible ? "1" : "0",
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetLayersVisibility(string DrawingId, string LayerName, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                          "SetLayersVisibility", LayerName,
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetLayerName(string DrawingId, string LayerId, ref string LayerName, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetLayerName", LayerId,
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    LayerName = outList[0];
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateLayer(string DrawingId, string LayerName, short AutoCadColor, bool IsVisible, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateLayer", LayerName,AutoCadColor.ToString(),
                            IsVisible?"1":"0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short RenameLayer(string DrawingId, string LayerName, string NewLayerName, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "RenameLayer", LayerName,NewLayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short DeleteLayer(string DrawingId, string LayerName, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DeleteLayer", LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ThawAllFrozenLayers(string DrawingId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ThawAllFrozenLayers"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CheckForNonPlottableLayers(string DrawingId, ref bool IsNonPlottable, String UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                    "CheckForNonPlottableLayers"
                };
                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    if (outList[0] == "1")
                        IsNonPlottable = true;
                    else
                        IsNonPlottable = false;
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ExportToPNG(string DrawingId, string UserId, ref byte[] ExportedData, ref string FileName)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    string filePath = dwgFilePath;
                    filePath = Path.Combine(filePath, UserId + ".png");

                    List<string> commandsList = new List<string> {
                              "ExportToPNG", filePath
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;

                        ExportedData = File.ReadAllBytes(filePath);
                        if (m_DrawingIdToFileName.TryGetValue(DrawingId, out FileName))
                        {
                            FileName = Path.GetFileNameWithoutExtension(FileName);
                        }
                        File.Delete(filePath);
                    }
                    else
                        return 3;
                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ExportToJPEG(string DrawingId, string UserId, ref byte[] ExportedData, ref string FileName)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    string filePath = dwgFilePath;
                    filePath = Path.Combine(filePath, UserId + ".jpg");

                    List<string> commandsList = new List<string> {
                              "ExportToJPEG", filePath
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;

                        ExportedData = File.ReadAllBytes(filePath);
                        if (m_DrawingIdToFileName.TryGetValue(DrawingId, out FileName))
                        {
                            FileName = Path.GetFileNameWithoutExtension(FileName);
                        }
                        File.Delete(filePath);
                    }
                    else
                        return 3;
                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ExportToBMP(string DrawingId, string UserId, ref byte[] ExportedData, ref string FileName)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    string filePath = dwgFilePath;
                    filePath = Path.Combine(filePath, UserId + ".bmp");

                    List<string> commandsList = new List<string> {
                              "ExportToBMP", filePath
                     };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;
                        ExportedData = File.ReadAllBytes(filePath);

                        if (m_DrawingIdToFileName.TryGetValue(DrawingId, out FileName))
                        {
                            FileName = Path.GetFileNameWithoutExtension(FileName);
                        }

                        File.Delete(filePath);
                    }
                    else
                        return 3;

                    return retCode;
                }
                return 9;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ExportToDWF(string DrawingId, short FileCode, string UserId, ref byte[] ExportedData, ref string FileName)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    string filePath = dwgFilePath;
                    filePath = Path.Combine(filePath, UserId + ".dwf");

                    List<string> commandsList = new List<string> {
                              "ExportToDWF", filePath, FileCode.ToString()
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;
                        ExportedData = File.ReadAllBytes(filePath);
                        if (m_DrawingIdToFileName.TryGetValue(DrawingId, out FileName))
                        {
                            FileName = Path.GetFileNameWithoutExtension(FileName);
                        }
                        File.Delete(filePath);
                    }
                    else
                        return 3;
                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ExportToSVG(string DrawingId, string UserId, ref byte[] ExportedData, ref string FileName)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    string filePath = dwgFilePath;
                    filePath = Path.Combine(filePath, UserId + ".svg");

                    List<string> commandsList = new List<string> {
                              "ExportToSVG", filePath
                         };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;
                        ExportedData = File.ReadAllBytes(filePath);
                        if (m_DrawingIdToFileName.TryGetValue(DrawingId, out FileName))
                        {
                            FileName = Path.GetFileNameWithoutExtension(FileName);
                        }
                        File.Delete(filePath);
                    }
                    else
                        return 3;
                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ExportToDXF(string DrawingId, short FileCode, string UserId, ref byte[] ExportedData, ref string FileName)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    string filePath = dwgFilePath;
                    filePath = Path.Combine(filePath, UserId + ".dxf");

                    List<string> commandsList = new List<string> {
                              "ExportToDXF", filePath, FileCode.ToString()
                    };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;
                        ExportedData = File.ReadAllBytes(filePath);
                        if (m_DrawingIdToFileName.TryGetValue(DrawingId, out FileName))
                        {
                            FileName = Path.GetFileNameWithoutExtension(FileName);
                        }
                        File.Delete(filePath);
                    }
                    else
                        return 3;
                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ExportToDXB(string DrawingId, short FileCode, string UserId, ref byte[] ExportedData, ref string FileName)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    string filePath = dwgFilePath;
                    filePath = Path.Combine(filePath, UserId + ".dxb");

                    List<string> commandsList = new List<string> {
                              "ExportToDXB", filePath, FileCode.ToString()
                    };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;
                        ExportedData = File.ReadAllBytes(filePath);
                        if (m_DrawingIdToFileName.TryGetValue(DrawingId, out FileName))
                        {
                            FileName = Path.GetFileNameWithoutExtension(FileName);
                        }
                        File.Delete(filePath);
                    }
                    else
                        return 3;
                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ExportToPDF(string DrawingId, bool UsePlotStyle, string LayoutName, string UserId, ref byte[] ExportedData, ref string FileName)
        {
            try
            {
                //UsePlotStyle = true;
                string dwgFilePath;
                //string tempxml = "<PLOT><STB><LINEWEIGHTUNIT>2</LINEWEIGHTUNIT><STYLE><NAME>Monochrome</NAME><COLOR>3</COLOR><DITHER>1</DITHER><GRAYSCALE>0</GRAYSCALE><PEN>3</PEN><VIRTUALPEN>10</VIRTUALPEN><SCREENING>50</SCREENING><LINETYPE>5</LINETYPE><ADAPTIVE>1</ADAPTIVE><LINEWEIGHT>15</LINEWEIGHT><LINEJOIN>1</LINEJOIN><FILLSTYLE>70</FILLSTYLE></STYLE></STB><SHADEDOPTIONS><SHADEPLOT>1</SHADEPLOT><QUALITY>2</QUALITY><DPI>1</DPI></SHADEDOPTIONS><PLOTOPTIONS><PLOTLINEWEIGHT>1</PLOTLINEWEIGHT><PLOTWITHSTYLES>0</PLOTWITHSTYLES><PAPERSPACELAST>0</PAPERSPACELAST><HIDEPAPERSPACEOBJECTS>1</HIDEPAPERSPACEOBJECTS></PLOTOPTIONS></PLOT>";
                //LoadPlotStyle(DrawingId, tempxml, UserId);
                //SetPlotstyleToLayer(DrawingId, "Monochrome", "$POLYLINE_SP", UserId);

                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    if (LayoutName == null)
                        LayoutName = "";

                    string filePath = dwgFilePath;
                    filePath = Path.Combine(filePath, UserId + ".pdf");

                    List<string> commandsList = new List<string> {
                              "ExportToPDF", filePath, UsePlotStyle ? "1" : "0", LayoutName
                      };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode == -1)
                        {
                            int index = outList.FindLastIndex(item => item == "Command");
                            if (outList[index - 1] == "0")
                                retCode = 0;
                        }
                        if (retCode != 0)
                            return retCode;
                        ExportedData = File.ReadAllBytes(filePath);
                        if (m_DrawingIdToFileName.TryGetValue(DrawingId, out FileName))
                        {
                            FileName = Path.GetFileNameWithoutExtension(FileName);
                        }
                        File.Delete(filePath);
                    }
                    else
                        return 3;
                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ExportToXML(string DrawingId, bool IsFile, string LayerName, string UserId, ref string ExportedXml, ref byte[] ExportedData, ref string FileName)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    string filePath = dwgFilePath;
                    filePath = Path.Combine(filePath, UserId + ".xml");

                    List<string> commandsList = new List<string> {
                              "ExportToXML", filePath, IsFile ? "1" : "0" , LayerName
                    };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;
                        if (!IsFile)
                            ExportedXml = outList[0];
                        else
                        {
                            ExportedData = File.ReadAllBytes(filePath);
                            if (m_DrawingIdToFileName.TryGetValue(DrawingId, out FileName))
                            {
                                FileName = Path.GetFileNameWithoutExtension(FileName);
                            }
                        }

                        File.Delete(filePath);
                    }
                    else
                        return 3;
                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ExportTo3DDWF(string DrawingId, string UserId, ref byte[] ExportedData, ref string FileName)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    string filePath = dwgFilePath;
                    filePath = Path.Combine(filePath, UserId + ".dwf");

                    List<string> commandsList = new List<string> {
                              "ExportTo3DDWF", filePath
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;
                        ExportedData = File.ReadAllBytes(filePath);

                        if (m_DrawingIdToFileName.TryGetValue(DrawingId, out FileName))
                        {
                            FileName = Path.GetFileNameWithoutExtension(FileName);
                        }
                        File.Delete(filePath);
                    }
                    else
                        return 3;
                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SaveAs(string DrawingId, bool ShowPreview, short FileCode, string UserId, int CustomerId, ref byte[] ExportedData, ref string FileName, ref string FilePath)
        {
            try
            {
                string dwgFilePath;
                string FilePathWithCustUser;
                string Encrpt64FilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    string filePath = Path.Combine(dwgFilePath, UserId);

                    // if (File.Exists(filePath))
                    //     File.Delete(filePath);
                    FileStorage FS = new FileStorage();
                    FS.clearFolder(filePath); 

                    string currentDataTime = DateTime.Now.ToString("yyyy-MM-dd hh_mm_ss");
                    filePath = Path.Combine(filePath, currentDataTime + "_Save.dwg");

                    FilePath = filePath;

                    /*To encyptfile path with custoer user id*/
                    Encryption  objEAESFIPS = new Encryption(EncryptionAlgorithm.AES);
                    FilePathWithCustUser = CustomerId + "§" + UserId + "§" + FilePath;
                    Encrpt64FilePath = Convert.ToBase64String(System.Text.ASCIIEncoding.UTF8.GetBytes(objEAESFIPS.Encrypt(FilePathWithCustUser)));
                    FilePath = Encrpt64FilePath;
                    /**/

                    if (!File.Exists(filePath))
                    {                        
                        FS.createFolder(Path.GetDirectoryName(filePath));
                    }

                    int nShowPreview = (ShowPreview == true) ? 1 : 0;
                    List<string> commandsList = new List<string> {
                              "BackupCurrentLayers",    //to backup current visible layers
                              "ShowAllLayers",          //to defreeze and turn on all layers 
                              "RestoreCurrentLayers",   //to restore only previous visible layers
                              "SaveAs", filePath, nShowPreview.ToString(), FileCode.ToString(),"0"
                    };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0 && retCode != -1)
                            return retCode;
                        retCode = 0;//Library issue

                        ExportedData = File.ReadAllBytes(filePath);

                        if (m_DrawingIdToFileName.TryGetValue(DrawingId, out FileName))
                        {
                            FileName = Path.GetFileNameWithoutExtension(FileName);
                        }

                       // File.Delete(filePath);
                    }
                    else
                        return 3;

                    return retCode;
                }
                else
                    return 9;
            }
            catch (Exception/* e*/)
            {
                return 9;
            }
        }
        public short UpdateViewport(string DrawingId, string UserId, string ViewParams, double CanvasWidth, double CanvasHeight)
        {
            try
            {
                string[] paramsArray = ViewParams.Split(" ".ToCharArray());
                List<string> commandsList = new List<string> {
                              "GfxSetView"};


                commandsList.AddRange(new string[] { "Screen", CanvasWidth.ToString(), CanvasHeight.ToString() });
                for (int i = 0; i < paramsArray.Length; i++)
                {
                    commandsList.Add(paramsArray[i]);
                }
                commandsList.Add("");
                // commandsList.AddRange(new string[] { "rx:/sqlite/", "rx:/ZeroMQ/gsout/wr" });
                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short ZoomExtents(string DrawingId, string UserId, double FieldWidth, double FieldHeight, double ViewPosX, double ViewPosY)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    List<string> commandsList = new List<string> {
                              "ZoomExtents", FieldWidth.ToString(), FieldHeight.ToString(), ViewPosX.ToString(), ViewPosY.ToString(),
                    };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0 && retCode != -1)
                            return retCode;
                        retCode = 0;//Library issue
                    }
                    else
                        return 3;
                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        /////////////////////////////////////////////Entity///////////////////////////////////////////////////////////////        
        public short GetEntityMidPoint(string DrawingId, string EntityHandle, ref double MidX, ref double MidY, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetEntityMidPoint" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    double.TryParse(outList[0], out MidX);
                    double.TryParse(outList[1], out MidY);
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetEntityMidPointMultiple(string DrawingId, string EntityHandles, ref string MidX, ref string MidY, string UserId)
        {
            try
            {
                string[] handleArray;
                // if(EntityHandles.Contains(PublicVariables.rowDelimiter))
                //{
                handleArray = EntityHandles.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);
                // }

                short retCode = 0;
                for (int i = 0; i < handleArray.Length; i++)
                {
                    if (handleArray.ElementAt(i) != "")
                    {
                        List<string> commandsList = new List<string> {
                            "GetEntityMidPoint" , handleArray.ElementAt(i)
                        };

                        List<string> outList = new List<string>();
                        ProcessManager objPM;

                        if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                        {
                            retCode = objPM.executeCommand(commandsList, ref outList);
                            if (retCode != 0)
                                return retCode;
                            MidX = MidX + outList[0] + PublicDataVariables.Delimiters.RowDelimiter;
                            MidY = MidY + outList[1] + PublicDataVariables.Delimiters.RowDelimiter;
                        }
                        else
                            return 3;
                    }
                }
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetEntityExtents(string DrawingId, string EntityHandle, ref double MinX, ref double MinY, ref double MaxX, ref double MaxY, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetEntityExtents" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    double.TryParse(outList[0], out MinX);
                    double.TryParse(outList[1], out MinY);
                    double.TryParse(outList[2], out MaxX);
                    double.TryParse(outList[3], out MaxY);
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetEntityType(string DrawingId, string EntityHandle, ref short TypeId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetEntityType" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    short.TryParse(outList[0], out TypeId);
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetEntityArea(string DrawingId, string EntityHandle, ref string Area, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "GetEntityArea", EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    Area = outList[0];
                    //double.TryParse(outList[0], out Area);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short GetEntityPerimeter(string DrawingId, string EntityHandle, ref string Perimeter, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "GetEntityPerimeter", EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    Perimeter = outList[0];
                   // double.TryParse(outList[0], out Perimeter);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetEntityColor(string DrawingId, string EntityHandle, ref short AutocadColor, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetEntityColor" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    short.TryParse(outList[0], out AutocadColor);
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllTexts(string DrawingId, string LayerName, ref string EntitiesTexts, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";

                List<string> commandsList = new List<string> {
                            "GetAllTexts", LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntitiesTexts = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetTextStyle(string DrawingId, string EntityHandle, ref string TextStyle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetTextStyle" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    TextStyle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllEntities(string DrawingId, string LayerName, ref string EntityHandles, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";

                List<string> commandsList = new List<string> {
                            "GetAllEntities", LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetDWGExtents(string DrawingId, ref double MinX, ref double MinY, ref double MaxX, ref double MaxY, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetDWGExtents"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    double.TryParse(outList[0], out MinX);
                    double.TryParse(outList[1], out MinY);
                    double.TryParse(outList[2], out MaxX);
                    double.TryParse(outList[3], out MaxY);
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllContentTexts(string DrawingId, string LayerName, ref string ContentText, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";

                List<string> commandsList = new List<string> {
                            "GetAllContentTexts", LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    ContentText = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetContentText(string DrawingId, string EntityHandle, ref string TextContent, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetContentText", EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    TextContent = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetEntityProperties(string DrawingId, string EntityHandle, ref short TypeId, ref string Properties, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetEntityProperties" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    short.TryParse(outList[0], out TypeId);
                    Properties = outList[1];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetXdString(string DrawingId, string EntityHandle, string AppData, ref string XData, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetXdString" , EntityHandle , AppData
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    XData = outList[0];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetMLeaderArrowSize(string DrawingId, string EntityHandle, ref double ArrowSize, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetMLeaderArrowSize" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    double.TryParse(outList[0], out ArrowSize);
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetTextInsertionPoint(string DrawingId, string EntityHandle, ref double InsertionPointX, ref double InsertionPointY, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetTextInsertionPoint" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    double.TryParse(outList[0], out InsertionPointX);
                    double.TryParse(outList[1], out InsertionPointY);
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short Get3DEntities(string DrawingId, string LayerName, ref string EntityHandles, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";

                List<string> commandsList = new List<string> {
                            "Get3DEntities", LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetPolylineInfo(string DrawingId, string EntityHandle, ref bool IsClosed, ref bool HasBulges, ref bool IsOnlyLines, ref bool VertexCheck, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetPolylineInfo", EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    if (outList[0] == "0")
                        IsClosed = false;
                    else if (outList[0] == "1")
                        IsClosed = true;
                    if (outList[1] == "0")
                        HasBulges = false;
                    else if (outList[1] == "1")
                        HasBulges = true;
                    if (outList[2] == "0")
                        IsOnlyLines = false;
                    else if (outList[2] == "1")
                        IsOnlyLines = true;
                    if (outList[3] == "0")
                        VertexCheck = false;
                    else if (outList[3] == "1")
                        VertexCheck = true;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllPolylines(string DrawingId, string LayerName, ref string ClosedEntityHandles, ref string OpenEntityHandles, ref string OtherEntityHandles, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";

                List<string> commandsList = new List<string> {
                            "GetAllPolylines", LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    ClosedEntityHandles = outList[0]; OpenEntityHandles = outList[1]; OtherEntityHandles = outList[2];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetPolylineCoordinates(string DrawingId, string EntityHandle, ref string xCoords, ref string yCoords, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetPolylineCoordinates", EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    xCoords = outList[0]; yCoords = outList[1];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short SearchForText(string DrawingId, string Text, bool IsExact, ref string TextHandles, string UserId)
        {
            try
            {
                short nIsExact = Convert.ToInt16(IsExact);

                List<string> commandsList = new List<string> {
                            "SearchForText", Text, nIsExact.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    TextHandles = outList[0].Trim();
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetTextSize(string DrawingId, string EntityHandle, ref double Size, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetTextSize", EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    double.TryParse(outList[0], out Size);
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetEntityText(string DrawingId, string EntityHandle, ref string EntityText, ref bool IsMultiLineText, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "GetEntityText", EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    EntityText = outList[0];
                    bool.TryParse(outList[1], out IsMultiLineText);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetTextProperties(string DrawingId, string EntityHandle, ref bool IsBold, ref bool IsItalic, ref bool IsUnderline, ref double TextAngle, ref string FontName, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetTextProperties", EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    if (outList[0] == "0")
                        IsBold = false;
                    else if (outList[0] == "1")
                        IsBold = true;
                    if (outList[1] == "0")
                        IsItalic = false;
                    else if (outList[1] == "1")
                        IsItalic = true;
                    if (outList[2] == "0")
                        IsUnderline = false;
                    else if (outList[2] == "1")
                        IsUnderline = true;

                    double.TryParse(outList[3], out TextAngle);
                    FontName = outList[4];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetXdString(string DrawingId, string EntityHandle, string AppName, string XData, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "SetXdString", EntityHandle,AppName,XData
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetEntitiesVisibility(string DrawingId, string EntityHandles, bool IsVisible, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "SetEntitiesVisibility", EntityHandles,
                              IsVisible ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetEntityLayer(string DrawingId, string EntityHandle, string LayerName, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "SetEntityLayer", EntityHandle,
                              LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetEntityLayer(string DrawingId, string EntityHandle, ref string LayerName, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "GetEntityLayer", EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    LayerName = outList[0];
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short SetEntityColor(string DrawingId, string EntityHandle, short AutocadColor, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "SetEntityColor", EntityHandle, AutocadColor.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetEntitiesColor(string DrawingId, string LayerName, short AutocadColor, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "SetEntitiesColor", LayerName, AutocadColor.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetInsidePoint(string DrawingId, string EntityHandle, int CursorIndex, ref double XCoord, ref double YCoord, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "GetInsidePoint", EntityHandle,CursorIndex.ToString(),
                              XCoord.ToString(),YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    XCoord = Convert.ToDouble(outList[0]);
                    YCoord = Convert.ToDouble(outList[1]);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetTextUnderline(string DrawingId, string EntityHandle, bool IsUnderline, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "SetTextUnderline", EntityHandle,
                              IsUnderline ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetEntityVisibility(string DrawingId, string EntityHandle, bool IsVisible, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "SetEntityVisibility", EntityHandle,
                              IsVisible ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetTextSize(string DrawingId, string EntityHandle, double Size, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "SetTextSize", EntityHandle,
                              Size.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetText(string DrawingId, string EntityHandle, string Text, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "SetText", EntityHandle,
                              Text
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetTextStyle(string DrawingId, string EntityHandle, string TextStyle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "SetTextStyle", EntityHandle,
                              TextStyle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetLineType(string DrawingId, string EntityHandle, string LineType, double LineTypeScale, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "SetLineType", EntityHandle,
                              LineType,LineTypeScale.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetMLeaderArrowSize(string DrawingId, string EntityHandle, double ArrowSize, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                              "SetMLeaderArrowSize", EntityHandle,
                              ArrowSize.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short GetBlockInfo(string DrawingId, string BlockHandle, ref string BlockName, ref string Attributes, ref string Comment, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetBlockInfo", BlockHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    BlockName = outList[0];
                    Attributes = outList[1];
                    Comment = outList[2];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetBlockRefInfo(string DrawingId, string BlockRefHandle, ref string BlockHandle, ref string BlockName, ref string Values, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetBlockRefInfo", BlockRefHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    BlockHandle = outList[0];
                    BlockName = outList[1];
                    Values = outList[2];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllBlockRef(string DrawingId, string LayerName, ref string BlockRefHandles, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";

                List<string> commandsList = new List<string> {
                            "GetAllBlockRef",LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    BlockRefHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllBlocks(string DrawingId, ref string BlockInfo, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetAllBlocks"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    BlockInfo = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllBlockRefOfBlockHandle(string DrawingId, string LayerName, string BlockHandle, ref string BlockRefHandles, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";

                List<string> commandsList = new List<string> {
                             "GetAllBlockRefOfBlockHandle",LayerName, BlockHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    BlockRefHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllBlockRefOfBlockName(string DrawingId, string LayerName, string BlockName, ref string BlockRefHandles, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";

                List<string> commandsList = new List<string> {
                            "GetAllBlockRefOfBlockName",LayerName, BlockName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    BlockRefHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short BlockExplode(string DrawingId, string BlockRefHandle, ref string TypeId, ref string EntityData, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "BlockExplode", BlockRefHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    TypeId = outList[0];
                    EntityData = outList[1];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short GetEntities(string DrawingId, string LayerName, ref string EntityHandles, short TypeId, bool bIsHighlight, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "GetEntities" , LayerName,EntityHandles,TypeId.ToString(), ((bIsHighlight == true)?1:0).ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                    {
                        EntityHandles = "";
                        return retCode;
                    }
                    EntityHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short GetEntitiesWithMultipleTypes(string DrawingId, string LayerName, ref string EntityHandles, string TypeId, bool bIsHighlight, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "GetEntitiesWithMultipleTypes" , LayerName,EntityHandles,TypeId, ((bIsHighlight == true)?1:0).ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                    {
                        EntityHandles = "";
                        return retCode;
                    }
                    EntityHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetPolylinesWithPointInEntity(string DrawingId, string LayerName, double XCoord, double YCoord, ref string EntityHandles, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "GetPolylinesWithPointInEntity" , LayerName,XCoord.ToString(),YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }


        public short CreateLine(string DrawingId, string LayerName, short AutoCadColor, double StartX, double StartY, double EndX, double EndY, ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "CreateLine" , LayerName,AutoCadColor.ToString(),
                            StartX.ToString(),StartY.ToString(),
                            EndX.ToString(),EndY.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateText(string DrawingId, string LayerName, short AutoCadColor, double StartX, double StartY,
                                double Angle, double Height, double WidthFactor, string Text,
                                string TextStyle, short StyleId, ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                if (Text == null)
                    Text = "";
                List<string> commandsList = new List<string> {
                            "CreateText" , LayerName,AutoCadColor.ToString(),
                            StartX.ToString(),StartY.ToString(),
                            Angle.ToString(),Height.ToString(),WidthFactor.ToString(),
                            Text,TextStyle,StyleId.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CreateMultilineText(string DrawingId, string LayerName, short AutoCadColor, double StartX, double StartY,
                                double Angle, double Height, double WrapWidth, double LineSpace, string Text,
                                string TextStyle, short StyleId, ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "CreateMultilineText" , LayerName,AutoCadColor.ToString(),
                            StartX.ToString(),StartY.ToString(),
                            Angle.ToString(),Height.ToString(),WrapWidth.ToString(),
                            LineSpace.ToString(),Text,TextStyle,StyleId.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateRectangle(string DrawingId, string LayerName, short AutoCadColor, double CenterX, double CenterY,
                                double Width, double Height, double LineWidth, string LineType, double LineTypeScale,
                                 ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                if (LineType == null)
                    LineType = "";
                List<string> commandsList = new List<string> {
                            "CreateRectangle" , LayerName,AutoCadColor.ToString(),
                            CenterX.ToString(),CenterY.ToString(),
                            Width.ToString(),Height.ToString(),LineWidth.ToString(),
                            LineType,LineTypeScale.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CreateEllipse(string DrawingId, string LayerName, short AutoCadColor, double CenterX, double CenterY,
                               double VectorX, double VectorY, double RadiusRatio, ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";

                List<string> commandsList = new List<string> {
                            "CreateEllipse" , LayerName,AutoCadColor.ToString(),
                            CenterX.ToString(),CenterY.ToString(),
                            VectorX.ToString(),VectorY.ToString(),RadiusRatio.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CreateLeader(string DrawingId, string LayerName, short AutoCadColor, string Points,
                            double Size, double Scale, string LineType, double dLineTypeScale, bool AppDriven,
                            ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                if (LineType == null)
                    LineType = "";

                int nAppDriven = (AppDriven == true) ? 1 : 0;
                List<string> commandsList = new List<string> {
                            "CreateLeader" , LayerName,AutoCadColor.ToString(),
                             Points, Size.ToString(), Scale.ToString(),
                             LineType, dLineTypeScale.ToString(),nAppDriven.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CreateMultiLeader(string DrawingId, string LayerName, short AutoCadColor, double StartX,
                                       double StartY, double EndX, double EndY, double ArrowSize, double DogLength,
                                       double LandingGap, string TextHandle, ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";

                List<string> commandsList = new List<string> {
                            "CreateMultiLeader" , LayerName,AutoCadColor.ToString(),
                             StartX.ToString(), StartY.ToString(), EndX.ToString(), EndY.ToString(),
                             ArrowSize.ToString(), DogLength.ToString(), LandingGap.ToString(),TextHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CreateBlockRef(string DrawingId, string LayerName, string BlockHandle, short nAutoCadColor,
                                       double XCoord, double YCoord, double Angle, double Scale, ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";

                List<string> commandsList = new List<string> {
                            "CreateBlockRef" , LayerName, BlockHandle,
                             nAutoCadColor.ToString(), XCoord.ToString(), YCoord.ToString(), Angle.ToString(),
                             Scale.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CreateBlock(string DrawingId, string BlockName, string EntityHandles,
                                       ref string BlockHandle, ref string BlockRefHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateBlock" , BlockName, EntityHandles
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    BlockHandle = outList[0];
                    BlockRefHandle = outList[1];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short DrawEllipseMarkup(string DrawingId, string LayerName, short AutoCadColor, double CenterX,
                               double CenterY, double EndX, double EndY, double LineWidth, string LineType,
                                double LineTypeScale, bool IsCircle, ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                if (LineType == null)
                    LineType = "";

                int nIsCircle = (IsCircle == true) ? 1 : 0;
                List<string> commandsList = new List<string> {
                            "DrawEllipseMarkup" , LayerName, AutoCadColor.ToString(),
                             CenterX.ToString(), CenterY.ToString(),
                             EndX.ToString(), EndY.ToString(),LineWidth.ToString(), LineType,
                             LineTypeScale.ToString(),nIsCircle.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short DrawCloudMarkup(string DrawingId, string LayerName, short AutoCadColor, double BulgeSpace,
                       string Points, double LineWidth, string LineType,
                        double LineTypeScale, bool IsClosed, ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                if (LineType == null)
                    LineType = "";

                int nIsClosed = (IsClosed == true) ? 1 : 0;
                List<string> commandsList = new List<string> {
                            "DrawCloudMarkup" , LayerName, AutoCadColor.ToString(),
                             BulgeSpace.ToString(), Points,LineWidth.ToString(), LineType,
                             LineTypeScale.ToString(),nIsClosed.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreatePolyLine(string DrawingId, string LayerName, short AutoCadColor, string Points, double LineWidth, string LineType, double LineTypeScale, bool IsClosed, bool IsPlinegen, bool AppDriven, ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "CreatePolyLine" , LayerName,AutoCadColor.ToString(),
                            Points,LineWidth.ToString(),LineType,LineTypeScale.ToString(),
                            IsClosed ? "1" : "0",IsPlinegen? "1" : "0",AppDriven? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateArc(string DrawingId, string LayerName, short AutoCadColor, double CenterX, double CenterY, double StartAngle, double EndAngle, double Radious, ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "CreateArc" , LayerName,AutoCadColor.ToString(),
                            CenterX.ToString(),CenterY.ToString(),
                            StartAngle.ToString(),EndAngle.ToString(),Radious.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CreateCircle(string DrawingId, string LayerName, short AutoCadColor, double CenterX, double CenterY,
                                    double Radius, ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "CreateCircle" , LayerName,AutoCadColor.ToString(),
                            CenterX.ToString(),CenterY.ToString(),
                            Radius.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateDimension(string DrawingId, string LayerName, short DimensionTYpe, double StartX, double StartY, double EndX, double EndY, double InsertionX, double InsertionY, double TextHeight, double ArrowHeight, short AutoCadColor, ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "CreateDimension" , LayerName,DimensionTYpe.ToString(),
                            StartX.ToString(),StartY.ToString(),EndX.ToString(),EndY.ToString(),
                            InsertionX.ToString(),InsertionY.ToString(),TextHeight.ToString(),
                            ArrowHeight.ToString(),AutoCadColor.ToString()
                };


                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CreateSymbol(string DrawingId, string LayerName, short AutoCadColor,
                            string ActualPoints, double LineWidth, string LineType, double LineTypeScale,
                            ref string EntityHandle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                if (LineType == null)
                    LineType = "";
                List<string> commandsList = new List<string> {
                            "CreateSymbol" , LayerName,AutoCadColor.ToString(),ActualPoints,
                            LineWidth.ToString(),LineType,LineTypeScale.ToString()
                };


                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetOrderedSymbolPosition(string DrawingId, string PolylineHandle, string SymbolCoords, int SymbolCount, ref string InsertPositions, ref double Scalefactor, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetOrderedSymbolPosition" , PolylineHandle,
                            SymbolCoords,SymbolCount.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    InsertPositions = outList[0];
                    Scalefactor = Convert.ToDouble(outList[1]);
                }
                else
                    return 3;
                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short InsertMultipleSymbol(string DrawingId, string TextXml, ref string EntityHandles, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "InsertMultipleSymbol" , TextXml
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandles = outList[0];
                }
                else
                    return 3;
                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short InsertSymbol(string DrawingId, string LayerName, short AutoCadColor, double XCoord, double YCoord,
                            string RelativePoints, double LineWidth, string LineType, double LineTypeScale,
                            ref string EntityHandle, ref string ActualPoints, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                if (LineType == null)
                    LineType = "";
                List<string> commandsList = new List<string> {
                            "InsertSymbol" , LayerName,AutoCadColor.ToString(),
                            XCoord.ToString(),YCoord.ToString(),RelativePoints,LineWidth.ToString(),
                            LineType,LineTypeScale.ToString()
                };


                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                    ActualPoints = outList[1];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short MoveSymbol(string DrawingId, string EntityHandle, double XCoord, double YCoord, double TargetX,
                                        double TargetY, ref string MidPoint, ref string ActualPoints, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "MoveSymbol" , EntityHandle,XCoord.ToString(),YCoord.ToString(),TargetX.ToString(),
                            TargetY.ToString(), MidPoint
                };


                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    ActualPoints = outList[0];
                    MidPoint = outList[1];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short RotateSymbol(string DrawingId, string EntityHandle, double BaseX, double BaseY, double RotationAngle,
                                       ref double FinalAngle, ref string ActualPoints, ref string MidPoint, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "RotateSymbol" , EntityHandle,BaseX.ToString(),BaseY.ToString(),RotationAngle.ToString(),
                            MidPoint
                };


                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    FinalAngle = Convert.ToDouble(outList[0]);
                    ActualPoints = outList[1];
                    MidPoint = outList[2];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short ScaleSymbol(string DrawingId, string EntityHandle, double ScaleFactor, ref string ActualPoints, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ScaleSymbol" , EntityHandle,ScaleFactor.ToString()

                };


                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    ActualPoints = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short InsertSymbolPlus(string DrawingId, string LayerName, short AutoCadColor, double XCoord, double YCoord,
                            string RelativePoints, double LineWidth, string LineType, double LineTypeScale,
                            double ScaleFactor, double RotationAngle, ref string EntityHandle, ref string ActualPoints, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                if (LineType == null)
                    LineType = "";
                List<string> commandsList = new List<string> {
                            "InsertSymbolPlus" , LayerName,AutoCadColor.ToString(),
                            XCoord.ToString(),YCoord.ToString(),RelativePoints,LineWidth.ToString(),
                            LineType,LineTypeScale.ToString(),ScaleFactor.ToString(),RotationAngle.ToString()
                };


                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                    ActualPoints = outList[1];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CreateLink(string DrawingId, string LayerName, double StartX, double StartY,
                            string Points, double Scale, double Angle, short AutoCadColor,
                            double LineWidth, ref string Handle, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "CreateLink" , LayerName, StartX.ToString(), StartY.ToString(), Points,
                            Scale.ToString(), Angle.ToString(), AutoCadColor.ToString(),
                            LineWidth.ToString()
                };


                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    Handle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short MoveLink(string DrawingId, string EntityHandle, double XCoord, double YCoord, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "MoveLink" , EntityHandle, XCoord.ToString(), YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short MoveEntity(string DrawingId, string EntityHandle, double XCoord, double YCoord, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "MoveEntity" , EntityHandle, XCoord.ToString(), YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short StartMovingTrails(string DrawingId, string EntityHandle, double XCoord, double YCoord, bool IsMidPointBased, string UserId)
        {
            try
            {
                int nIsMidPointBased = (IsMidPointBased == true) ? 1 : 0;
                List<string> commandsList = new List<string> {
                            "StartMovingTrails" , EntityHandle, XCoord.ToString(), YCoord.ToString(), nIsMidPointBased.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short MoveWithMovingTrails(string DrawingId, double XCoord, double YCoord, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "MoveWithMovingTrails" , XCoord.ToString(), YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short StopMovingTrails(string DrawingId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "StopMovingTrails"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short RotateLink(string DrawingId, string EntityHandle, double XCoord, double YCoord, double Angle, ref string ActualPoints, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "RotateLink" , EntityHandle, XCoord.ToString(), YCoord.ToString(),Angle.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    ActualPoints = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short RotateBlockRef(string DrawingId, string EntityHandle, double Angle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "RotateBlockRef" , EntityHandle, Angle.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short ScaleBlockRef(string DrawingId, string EntityHandle, double Scale, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ScaleBlockRef" , EntityHandle, Scale.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short RotateText(string DrawingId, string EntityHandle, double Angle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "RotateText" , EntityHandle, Angle.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short BlockExplodeToEntities(string DrawingId, string BlockRefHandle, string TargetLayer, ref string NewEntityHandles, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "BlockExplodeToEntities" , BlockRefHandle, TargetLayer
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    NewEntityHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short SetLayerColor(string DrawingId, string LayerName, short AutoCadColor, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetLayerColor" , LayerName, AutoCadColor.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short SetTransparentBackground(string DrawingId, string EntityHandle, short AutoCadColor, short AlphaVal, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetTransparentBackground" , EntityHandle, AutoCadColor.ToString(), AlphaVal.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short ImportEntities(string DrawingId, string Filename, string Layers, bool bIsXref, ref string LayerData, string UserId)
        {
            try
            {
                int nIsXref = (bIsXref == true) ? 1 : 0;
                List<string> commandsList = new List<string> {
                            "ImportEntities" , Filename, Layers, nIsXref.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0 || retCode == 102)
                        LayerData = outList[0];
                    else
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short LoadXMLFile(string DrawingId, string Filename, ref string LayerName, ref string LayerId, ref bool Visible, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "LoadXMLFile" , Filename
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    LayerName = outList[0];
                    LayerId = outList[1];
                    if (outList[2] == "1")
                        Visible = true;
                    else if (outList[0] == "0")
                        Visible = false;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short LoadXMLString(string DrawingId, string XMLString, ref string LayerName, ref string LayerId, ref bool Visible, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "LoadXMLString" , XMLString
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    LayerName = outList[0];
                    LayerId = outList[1];
                    if (outList[2] == "1")
                        Visible = true;
                    else if (outList[0] == "0")
                        Visible = false;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SnapPolylineVertex(string DrawingId, string EntityHandle, string TargetHandle, double XCoord,
                    double YCoord, double TargetX, double TargetY, ref string ActualPoints, ref bool IsOverlapping,
                    ref string MidPoint, string UserId)
        {
            try
            {

                List<string> commandsList = new List<string> {
                            "SnapPolylineVertex" , EntityHandle,TargetHandle,
                             XCoord.ToString(), YCoord.ToString(),TargetX.ToString(), TargetY.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    ActualPoints = outList[0];
                    IsOverlapping = Convert.ToInt16(outList[1]) == 1 ? true : false;
                    MidPoint = outList[2];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short SnapPolylineVertexToEdge(string DrawingId, string StartHandle, string TargetHandle, double StartX,
                    double StartY, double TargetX, double TargetY, double SnapDistance, bool IfSnapToMidPoint, bool InOrOut,
                    ref bool IfOverlap, ref double SnappedAngle, ref string ActualPoints, ref string MidPoint, string UserId)
        {
            try
            {
                int nIfSnapToMidPoint = IfSnapToMidPoint ? 1 : 0;
                int nInOrOut = InOrOut ? 1 : 0;
                List<string> commandsList = new List<string> {
                            "SnapPolylineVertexToEdge" , StartHandle,TargetHandle,
                             StartX.ToString(), StartY.ToString(),TargetX.ToString(), TargetY.ToString(),
                             SnapDistance.ToString(), nIfSnapToMidPoint.ToString(), nInOrOut.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    IfOverlap = Convert.ToInt16(outList[0]) == 1 ? true : false;
                    SnappedAngle = Convert.ToDouble(outList[1]);
                    ActualPoints = outList[2];
                    MidPoint = outList[3];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short HighlightPolyline(string DrawingId, string EntityHandle, double LineWidth, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "HighlightPolyline" , EntityHandle,
                             LineWidth.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short HatchEntity(string DrawingId, string LayerName, string EntityHandles, short AutoCadColor, double Angle, double Scale, short PatternId, bool IsExtents, ref string HatchEntityHandle, string UserId)
        {
            try
            {
                //if (PatternId == 11)
                //{
                //    //scale = 0.1;
                //    PatternId = 5;
                //}
                string tempHandles = EntityHandles;
                short retCode = 0;
                string tempHatchHandles = "";
                string[] handleArray = tempHandles.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);

                while (tempHandles.Length > 0)
                {
                    string[] tempArray = handleArray.Take(20).ToArray();
                    string handlesToSend = "";
                    for (int nIndex = 0; nIndex < tempArray.Length; nIndex++)
                    {
                        if (tempArray.ElementAt(nIndex) != "")
                        {
                            handlesToSend += tempArray.ElementAt(nIndex) + PublicDataVariables.Delimiters.RowDelimiter;
                        }
                    }
                    List<string> commandsList = new List<string> {
                            "HatchEntity" , LayerName, handlesToSend,
                             AutoCadColor.ToString(), Angle.ToString(),
                             Scale.ToString(),PatternId.ToString(),
                             IsExtents ? "1" : "0"
                    };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;
                        tempHatchHandles += outList[0];
                    }
                    else
                        return 3;

                    if (handlesToSend.Length < tempHandles.Length)
                    {
                        tempHandles = tempHandles.Substring(handlesToSend.Length, tempHandles.Length - handlesToSend.Length);
                        handleArray = tempHandles.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);
                    }
                    else
                        tempHandles = "";

                }
                HatchEntityHandle = tempHatchHandles;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        //public short HatchEntity(string DrawingId, string LayerName, string EntityHandle, short AutoCadColor, double Angle, double Scale, short PatternId, bool IsExtents, ref string HatchEntityHandle, string UserId)
        //{
        //    try
        //    {
        //        if (LayerName == null)
        //            LayerName = "";
        //        List<string> commandsList = new List<string> {
        //                    "HatchEntity" , LayerName,EntityHandle,
        //                     AutoCadColor.ToString(), Angle.ToString(),
        //                     Scale.ToString(),PatternId.ToString(),
        //                     IsExtents ? "1" : "0"
        //        };

        //        List<string> outList = new List<string>();
        //        ProcessManager objPM;
        //        short retCode = 0;

        //        if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
        //        {
        //            retCode = objPM.executeCommand(commandsList, ref outList);
        //            if (retCode != 0)
        //                return retCode;
        //            HatchEntityHandle = outList[0];
        //        }
        //        else
        //            return 3;
        //        return retCode;
        //    }
        //    catch (Exception /*e*/)
        //    {
        //        return 9;
        //    }
        //}
        public short BringToFront(string DrawingId, string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "BringToFront" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short PushToBack(string DrawingId, string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "PushToBack" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short Rectify3DEntities(string DrawingId, string EntityHandles, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "Rectify3DEntities" , EntityHandles
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ClosePolyline(string DrawingId, string EntityHandle, bool IsClosed, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ClosePolyline" , EntityHandle,
                              IsClosed ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short RemoveSameTerminalVertex(string DrawingId, string EntityHandles, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "RemoveSameTerminalVertex" , EntityHandles
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short RemoveTinyEdges(string DrawingId, string EntityHandles, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "RemoveTinyEdges" , EntityHandles
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short RemoveIntermediateVertices(string DrawingId, string EntityHandles, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "RemoveIntermediateVertices" , EntityHandles
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short HighlightMLeader(string DrawingId, string EntityHandle, double LineWidth, ref string HighlightHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "HighlightMLeader" , EntityHandle,LineWidth.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    HighlightHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short HighlightPolylines(string DrawingId, string LayerName, double LineWidth, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "HighlightPolylines" , LayerName,LineWidth.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short HighlightEntities(string DrawingId, string EntityHandles, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "HighlightEntities" , EntityHandles
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short DeHighlightEntity(string DrawingId, string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DeHighlightEntity" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short DeHighlightEntities(string DrawingId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DeHighlightEntities"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short HighlightEdge(string DrawingId, string EntityHandle, short AutoCadColor, double XCoord, double YCoord, ref string HighlightHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "HighlightEdge" , EntityHandle,AutoCadColor.ToString(),
                            XCoord.ToString(), YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    HighlightHandle = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short HighlightVertex(string DrawingId, string EntityHandle, short AutoCadColor, double XCoord, double YCoord, ref string HighlightHandles, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "HighlightVertex" , EntityHandle,AutoCadColor.ToString(),
                            XCoord.ToString(), YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    HighlightHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short DeleteEntity(string DrawingId, string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DeleteEntity" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short DeleteEntities(string DrawingId, string LayerName, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DeleteEntities" , LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short MirrorPolyline(string DrawingId, string PolylineHandle, double PointX, double PointY, ref string ActualPoints, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "MirrorPolyline" , PolylineHandle, PointX.ToString(), PointY.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    ActualPoints = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short FlipPolyline(string DrawingId, string PolylineHandle, double PointX, double PointY, ref string ActualPoints, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "FlipPolyline" , PolylineHandle, PointX.ToString(), PointY.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    ActualPoints = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short MorphPolyline(string DrawingId, string PolylineHandles, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "MorphPolyline" , PolylineHandles,
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short AddLineType(string DrawingId, string StyleName, short Dashes, string DashLength, string UserId)
        {
            try
            {
                if (StyleName == null || StyleName == "")
                    return 79;

                List<string> commandsList = new List<string> {
                            "AddLineType" , StyleName, Dashes.ToString(), DashLength
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short AddTextStyle(string DrawingId, string StyleName, string FaceName, bool Bold, bool Italic, string UserId)
        {
            try
            {
                if (StyleName == null || StyleName == "")
                    return 79;
                if (FaceName == null || FaceName == "")
                    return 99;

                int nBold = (Bold == true) ? 1 : 0;
                int nItalic = (Italic == true) ? 1 : 0;
                List<string> commandsList = new List<string> {
                            "AddTextStyle" , StyleName, FaceName, nBold.ToString(), nItalic.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short EnableSolidFill(string DrawingId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "EnableSolidFill"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short SolidFillEnabled(string DrawingId, ref bool IsEnabled, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SolidFillEnabled"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    IsEnabled = Convert.ToInt16(outList[0]) == 1 ? true : false;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception e)
            {
                return 9;
            }
        }

        public short SetLineWeightDisplay(string DrawingId, bool IsOn, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetLineWeightDisplay", IsOn ? "1" : "0",
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short AlignPolylines(string DrawingId, string HandlesToAlign, string BaseHandle, short Side, double Offset, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "AlignPolylines" , HandlesToAlign,
                            BaseHandle,Side.ToString(),Offset.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short DistributePolylines(string DrawingId, string Handles, short DistributionType, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DistributePolylines" , Handles,
                            DistributionType.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short DistributePolylinesWithOffset(string DrawingId, string Handles, short DistributionType, short DistributionDirection, double Offset, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DistributePolylinesWithOffset" , Handles,
                            DistributionType.ToString(),DistributionDirection.ToString(),
                            Offset.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SplitPolyline(string DrawingId, string Handle, double XCoord1, double YCoord1, double XCoord2, double YCoord2, ref string NewHandle1, ref string NewHandle2, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SplitPolyline" , Handle,
                             XCoord1.ToString(),  YCoord1.ToString(),
                             XCoord2.ToString(),  YCoord2.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    else
                    {
                        NewHandle1 = outList[0];
                        NewHandle2 = outList[1];
                    }
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        /////////////////////////////////////////////Snap///////////////////////////////////////////////////////////////        
        public short SnapSymbol(string DrawingId, string EntityHandle, string NetHandle, double StartX, double StartY, double TargetX, double TargetY, double Tolerance,
                                ref double SnappedAngle, ref string MidPoint, ref string ActualPoints, ref bool IsOverlapping, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SnapSymbol" ,EntityHandle, NetHandle,
                            StartX.ToString(),  StartY.ToString(),
                            TargetX.ToString(),  TargetY.ToString(),
                            Tolerance.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    else
                    {
                        SnappedAngle = Convert.ToDouble(outList[0]);
                        MidPoint = outList[1];
                        ActualPoints = outList[2];
                        //  IsOverlapping = Convert.ToBoolean(outList[3]);
                        if (outList[3] == "1")
                            IsOverlapping = true;
                        else if (outList[3] == "0")
                            IsOverlapping = false;
                    }
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SnapPolylineEdge(string DrawingId, string EntityHandle, string TargetHandle, double StartX, double StartY, double TargetX, double TargetY, short SnapDistance, bool InOrOut,
                               ref string ActualPoints, ref bool IsOverlapping, ref double SnappedAngle, ref string MidPoint, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SnapPolylineEdge" ,EntityHandle, TargetHandle,
                            StartX.ToString(),  StartY.ToString(),
                            TargetX.ToString(),  TargetY.ToString(),
                            SnapDistance.ToString(),
                            InOrOut?"1":"0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    else
                    {
                        ActualPoints = outList[0];
                        //IsOverlapping = Convert.ToBoolean(outList[1]);
                        SnappedAngle = Convert.ToDouble(outList[2]);
                        MidPoint = outList[3];
                        if (outList[1] == "1")
                            IsOverlapping = true;
                        else if (outList[1] == "0")
                            IsOverlapping = false;
                    }
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SnapPolylineEdgeToLine(string DrawingId, string PolylineHandle, string LineHandle, double PolylineX, double PolylineY, double LineX, double LineY, short SnapDistance,
                              ref bool IfOverlap, ref string ActualPoints, ref string MidPoint, ref double SnappedAngle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SnapPolylineEdgeToLine" ,PolylineHandle, LineHandle,
                            PolylineX.ToString(),  PolylineY.ToString(),
                            LineX.ToString(),  LineY.ToString(),
                            SnapDistance.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    else
                    {
                        if (outList[0] == "1")
                            IfOverlap = true;
                        else if (outList[0] == "0")
                            IfOverlap = false;
                        // IfOverlap = Convert.ToBoolean(outList[0]); 
                        ActualPoints = outList[1];
                        MidPoint = outList[2];
                        SnappedAngle = Convert.ToDouble(outList[3]);
                    }
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SnapEntityToBlock(string DrawingId, string EntityHandle, string BlockHandle, double StartX, double StartY, double TargetX, double TargetY, double Accuracy,
                              ref string ActualPoints, ref string MidPoint, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SnapEntityToBlock"  ,EntityHandle, BlockHandle,
                            StartX.ToString(),  StartY.ToString(),
                            TargetX.ToString(),  TargetY.ToString(),
                            Accuracy.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    else
                    {
                        ActualPoints = outList[0];
                        MidPoint = outList[1];
                    }
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }


        /////////////////////////////////////////////Utility///////////////////////////////////////////////////////////////        
        public short RGBToColorIndex(string ServicePath, short Red, short Green, short Blue, ref short ColorIndex)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "LOADAPP", "WebiWhiz",
                            "RGBToColorIndex",Red.ToString(), Green.ToString(), Blue.ToString()
                };

                string args = txHostCommandLineArgsFormat(commandsList);
                short retCode = 0;

                string ColorValue = "";
                retCode = executeCommand(args, ServicePath, ref ColorValue);
                short.TryParse(ColorValue, out ColorIndex);
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ColorIndexToRGB(string ServicePath, short ColorIndex, ref short Red, ref short Green, ref short Blue)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "LOADAPP", "WebiWhiz",
                            "ColorIndexToRGB", ColorIndex.ToString()
                };

                string args = txHostCommandLineArgsFormat(commandsList);
                short retCode = 0;

                string rgbValues = "";
                retCode = executeCommand(args, ServicePath, ref rgbValues);

                string[] colorArray = rgbValues.Split(';');
                short.TryParse(colorArray[0], out Red);
                short.TryParse(colorArray[1], out Green);
                short.TryParse(colorArray[2], out Blue);
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetClosestVertexOnPolyline(string DrawingId, string PolylineHandle, ref double XCoord, ref double YCoord, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                             "GetClosestVertexOnPolyline", PolylineHandle, XCoord.ToString(), YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    double.TryParse(outList[0], out XCoord);
                    double.TryParse(outList[1], out YCoord);
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetClosestPointOnPolyline(string DrawingId, string PolylineHandle, ref double XCoord, ref double YCoord, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                             "GetClosestPointOnPolyline", PolylineHandle, XCoord.ToString(), YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    double.TryParse(outList[0], out XCoord);
                    double.TryParse(outList[1], out YCoord);
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short PointInEntityWithTolerance(string DrawingId, string PolylineHandle, double XCoord, double YCoord, double Tolerance, short PointsToCheck, ref bool IsInside, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                           "PointInEntityWithTolerance" , PolylineHandle, XCoord.ToString(), YCoord.ToString(), Tolerance.ToString(), PointsToCheck.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    if (outList[0] == "0")
                        IsInside = false;
                    else if (outList[0] == "1")
                        IsInside = true;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short PointInEntity(string DrawingId, string PolylineHandle, double XCoord, double YCoord, ref bool IsInside, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                           "PointInEntity" , PolylineHandle, XCoord.ToString(), YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    if (outList[0] == "0")
                        IsInside = false;
                    else if (outList[0] == "1")
                        IsInside = true;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short PointInBlockRef(string DrawingId, string EntityHandle, double XCoord, double YCoord, ref bool IsInside, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "PointInBlockRef", EntityHandle, XCoord.ToString(), YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    if (outList[0] == "0")
                        IsInside = false;
                    else if (outList[0] == "1")
                        IsInside = true;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        /////////////////////////////////////////////Validation///////////////////////////////////////////////////////////////        
        public short VerifyPolylineOverlap(string DrawingId, string FirstHandle, string SecondHandle, ref bool IsOverlapped, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "VerifyPolylineOverlap", FirstHandle, SecondHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    if (outList[0] == "0")
                        IsOverlapped = false;
                    else if (outList[0] == "1")
                        IsOverlapped = true;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short VerifyPolylineAreaOverlap(string DrawingId, string FirstEntityHandle, string SecondEntityHandle, ref bool IsOverlapped, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "VerifyPolylineAreaOverlap", FirstEntityHandle, SecondEntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    if (outList[0] == "0")
                        IsOverlapped = false;
                    else if (outList[0] == "1")
                        IsOverlapped = true;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetGrossCNHandles(string DrawingId, string GrossLayer, string ConstructionLayer, ref string GrossHandle, ref string ConstructionHandle, string UserId)
        {
            try
            {

                List<string> commandsList = new List<string> {
                              "GetGrossCNHandles", GrossLayer, ConstructionLayer
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    GrossHandle = outList[0];
                    ConstructionHandle = outList[1];
                }
                else
                    return 3;

                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ReleaseHandle(string DrawingId, string EntityHandle, bool IsSpace, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ReleaseHandle", EntityHandle, IsSpace ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ReleaseSymbol(string DrawingId, string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ReleaseSymbol", EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ReleaseLinkHandle(string DrawingId, string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ReleaseLinkHandle", EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ReleaseBlockRefHandle(string DrawingId, string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ReleaseBlockRefHandle", EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetPerformanceIndex(string DrawingId, short Index, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetPerformanceIndex", Index.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                    {
                        int index = outList.FindLastIndex(item => item == "Command");
                        retCode = Convert.ToInt16(outList[index - 1]);
                    }
                    return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short LoadNetHandles(string DrawingId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "LoadNetHandles"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short LoadSpaceHandles(string DrawingId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "LoadSpaceHandles"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetHandle(string DrawingId, string EntityHandle, bool IsSpace, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetHandle",EntityHandle,IsSpace ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetSymbol(string DrawingId, string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetSymbol",EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetLinkHandle(string DrawingId, string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetLinkHandle",EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetBlockRefHandle(string DrawingId, string EntityHandle, ref string InvalidHandles, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetBlockRefHandle",EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    InvalidHandles = outList[0];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short VerifyNetLayer(string DrawingId, ref string ValidNTHandles, ref string OverlappedNTHandles, ref string InvalidNT_GROverlap, ref string InvalidNT_IntermediateVertices, ref string InvalidNT_UnwantedVertices, ref string InvalidNT_TinyEdges, ref string OpenNTHandles, ref string OtherEntities, double Tolerance, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "VerifyNetLayer",Tolerance.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    ValidNTHandles = outList[0];
                    OverlappedNTHandles = outList[1];
                    InvalidNT_GROverlap = outList[2];
                    InvalidNT_IntermediateVertices = outList[3];
                    InvalidNT_UnwantedVertices = outList[4];
                    InvalidNT_TinyEdges = outList[5];
                    OpenNTHandles = outList[6];
                    OtherEntities = outList[7];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short VerifySpaceLayer(string DrawingId, ref string ValidSPHandles, ref string OverlappedSPHandles, ref string InvalidSP_GROverlap, ref string InvalidSP_IntermediateVertices, ref string InvalidSP_UnwantedVertices, ref string InvalidSP_TinyEdges, ref string OpenSPHandles, ref string OtherEntities, double Tolerance, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "VerifySpaceLayer",Tolerance.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    ValidSPHandles = outList[0];
                    OverlappedSPHandles = outList[1];
                    InvalidSP_GROverlap = outList[2];
                    InvalidSP_IntermediateVertices = outList[3];
                    InvalidSP_UnwantedVertices = outList[4];
                    InvalidSP_TinyEdges = outList[5];
                    OpenSPHandles = outList[6];
                    OtherEntities = outList[7];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ValidateNetLayer(string DrawingId, double SPOverlapTolerance, ref string ValidSPHandles, ref string OverlappedSPHandles, ref string InvalidSP_GROverlap, ref string InvalidSP_IntermediateVertices, ref string InvalidSP_UnwantedVertices, ref string InvalidSP_TinyEdges, ref string OpenSPHandles_SPLayer, ref string OtherEntities_SPLayer, double NTOverlapTolerance, ref string ValidNTHandles, ref string OverlappedNTHandles, ref string InvalidNT_GROverlap, ref string InvalidNT_IntermediateVertices, ref string InvalidNT_UnwantedVertices, ref string InvalidNT_TinyEdges, ref string OpenNTHandles_NTLayer, ref string OtherEntities_NTLayer, double NTSPOverlapTolerance, double AreaTolerance, ref string ValidNTSPCombination, ref string LessAreaNTSPCombination, ref string MoreAreaNTSPCombination, ref string MultipleNTInSP, ref string NTWithMultipleSP, ref string NTWithoutSP, ref string SPWithoutNT, ref string InvalidNT, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ValidateNetLayer",SPOverlapTolerance.ToString(),NTOverlapTolerance.ToString(),
                            NTSPOverlapTolerance.ToString(),AreaTolerance.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;

                    ValidSPHandles = outList[0];
                    OverlappedSPHandles = outList[1];
                    InvalidSP_GROverlap = outList[2];
                    InvalidSP_IntermediateVertices = outList[3];
                    InvalidSP_UnwantedVertices = outList[4];
                    InvalidSP_TinyEdges = outList[5];
                    OpenSPHandles_SPLayer = outList[6];
                    OtherEntities_SPLayer = outList[7];
                    ValidNTHandles = outList[8];
                    OverlappedNTHandles = outList[9];
                    InvalidNT_GROverlap = outList[10];
                    InvalidNT_IntermediateVertices = outList[11];
                    InvalidNT_UnwantedVertices = outList[12];
                    InvalidNT_TinyEdges = outList[13];
                    OpenNTHandles_NTLayer = outList[14];
                    OtherEntities_NTLayer = outList[15];
                    ValidNTSPCombination = outList[16];
                    LessAreaNTSPCombination = outList[17];
                    MoreAreaNTSPCombination = outList[18];
                    MultipleNTInSP = outList[19];
                    NTWithMultipleSP = outList[20];
                    NTWithoutSP = outList[21];
                    SPWithoutNT = outList[22];
                    InvalidNT = outList[23];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CheckNTAndSPOverlapCN(string DrawingId, ref string InvalidNTHandles, ref string InvalidSPHandles, double Tolerance, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CheckNTAndSPOverlapCN",Tolerance.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    InvalidNTHandles = outList[0];
                    InvalidSPHandles = outList[1];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetIDrawingsLayer(string DrawingId, short LayerId, string LayerName, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetIDrawingsLayer",LayerId.ToString(),LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetHandleWithDWGPoint(string DrawingId, double XCoord, double YCoord, bool IsSpace, ref string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetHandleWithDWGPoint",XCoord.ToString(),YCoord.ToString(),IsSpace ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetSymbolWithDWGPoint(string DrawingId, double XCoord, double YCoord, bool IsHighlight, ref string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetSymbolWithDWGPoint",XCoord.ToString(),YCoord.ToString(),((IsHighlight == true)?1:0).ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetLinkHandleWithDWGPoint(string DrawingId, double XCoord, double YCoord, ref string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetLinkHandleWithDWGPoint",XCoord.ToString(),YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetBlockRefWithDWGPoint(string DrawingId, double XCoord, double YCoord, bool IsMultiple, ref string EntityHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetBlockRefWithDWGPoint",XCoord.ToString(),YCoord.ToString(),IsMultiple ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetNetHandlesForSpaceHandle(string DrawingId, string SpaceHandle, double Tolerance, ref string NetHandles, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetNetHandlesForSpaceHandle" , SpaceHandle,Tolerance.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    NetHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetNetAreaPerimeterForSpaceHandles(string DrawingId, string SpaceHandle, double Tolerance, ref string NetHandles, ref string Areas, ref string Perimeter, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetNetAreaPerimeterForSpaceHandles" , SpaceHandle,Tolerance.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    NetHandles = outList[0];
                    Areas = outList[1];
                    Perimeter = outList[2];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetHandleForTooltip(string DrawingId, double XCoord, double YCoord, string Priority, ref string EntityHandle, ref short HandleType, ref string Id, ref bool IsActionPoint, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetHandleForTooltip",XCoord.ToString(),YCoord.ToString(),Priority
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    if (objPM.m_IsBusy)
                        return 12;
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                    short.TryParse(outList[1], out HandleType);
                    Id = outList[2];
                    if (outList[3] == "1")
                        IsActionPoint = true;
                    else if (outList[3] == "0")
                        IsActionPoint = false;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetHandleOnPoint(string DrawingId, double XCoord, double YCoord, string Priority, ref string EntityHandle, ref short HandleType, ref string Id, ref bool IsActionPoint, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetHandleForTooltip",XCoord.ToString(),YCoord.ToString(),Priority
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandle = outList[0];
                    short.TryParse(outList[1], out HandleType);
                    Id = outList[2];
                    if (outList[3] == "1")
                        IsActionPoint = true;
                    else if (outList[3] == "0")
                        IsActionPoint = false;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetSymbols(string DrawingId, ref string EntityHandles, string UserId, bool IsHighlight)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetSymbols" , EntityHandles, ((IsHighlight==true)?1:0).ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                    {
                        EntityHandles = "";
                        return retCode;
                    }

                    EntityHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetHandles(string DrawingId, ref string EntityHandles, bool IsSpace, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetHandles" , EntityHandles,IsSpace ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                    {
                        EntityHandles = "";
                        return retCode;
                    }

                    EntityHandles = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        public short GetSaveFileFormats(string DrawingId, ref string FileFormats, string UserId)
        {
            try
            {
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    FileFormats = "AutoCAD 2013;AutoCAD 2010;AutoCAD 2007;AutoCAD 2004;AutoCAD 2000;Release 14;Release 13;Release 12;";
                }
                else
                    return retCode;
                return 0;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        ////////////////////// iDrawing Support wrappers///////////////////////////////////////////////////////

        public short GetEntityLayerMultiple(string DrawingId, string EntityHandles, ref string LayerNames, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string>
                {
                    "GetMultipleEntityLayers",EntityHandles
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    LayerNames = outList[0];
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetIDrawingsLayers(string DrawingId, string LayerDetails, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetIDrawingsLayers",LayerDetails
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short InitialLoadSettings(string DrawingId, short Index, bool IsSpace, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "InitialLoadSettings", Index.ToString(), IsSpace ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetPolylineCoordinatesMultiple(string DrawingId, string EntityHandles, ref string xCoords, ref string yCoords, string UserId)
        {
            try
            {
                string tempHandles = EntityHandles;
                short retCode = 0;
                string finalXCoords = "", finalYCoords = "";
                string[] handleArray = tempHandles.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);

                while (tempHandles.Length > 0)
                {
                    string[] tempArray = handleArray.Take(20).ToArray();
                    string handlesToSend = "";
                    for (int nIndex = 0; nIndex < tempArray.Length; nIndex++)
                    {
                        if (tempArray.ElementAt(nIndex) != "")
                        {
                            handlesToSend += tempArray.ElementAt(nIndex) + PublicDataVariables.Delimiters.RowDelimiter;
                        }
                    }

                    List<string> commandsList = new List<string> {
                            "GetPolylineCoordinatesMultiple", handlesToSend
                    };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;
                        xCoords = outList[0]; yCoords = outList[1];
                        finalXCoords += xCoords;
                        finalYCoords += yCoords;
                    }
                    else
                        return 3;

                    if (handlesToSend.Length < tempHandles.Length)
                    {
                        tempHandles = tempHandles.Substring(handlesToSend.Length, tempHandles.Length - handlesToSend.Length);
                        handleArray = tempHandles.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);
                    }
                    else
                        tempHandles = "";

                }
                xCoords = finalXCoords;
                yCoords = finalYCoords;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateDataText(string DrawingId, string LayerName, short AutoCadColor,
                          double Angle, double Height, double WrapWidth, double LineSpace,
                          string TextStyle, short StyleId, string TextXml, ref string EntityHandles, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "CreateDataText" , LayerName,AutoCadColor.ToString(),
                            Angle.ToString(),Height.ToString(),WrapWidth.ToString(),
                            LineSpace.ToString(),TextStyle,StyleId.ToString(),TextXml
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandles = outList[0];
                }
                else
                    return 3;
                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }


        public short CreateCommonSymbolDataText(string DrawingId, string TextLayerName, short TextColor, double TextAngle, double TextHeight,
                   double TextWrapWidth, double TextLineSpace, string TextStyle, short TextStyleId, string SymbolLayer, short SymbolColor,
                   string SymbolCords, double SymbolLineWidth, string SymbolLineType, double SymbolScale, string TextXml, ref string SymbolHandles, ref string TextHandles, string UserId)
        {
            try
            {
                if (TextLayerName == null)
                    TextLayerName = "";
                if (SymbolLayer == null)
                    SymbolLayer = "";

                List<string> commandsList = new List<string> {
                            "CreateCommonSymbolDataText" , TextLayerName, TextColor.ToString(),
                            TextAngle.ToString(),TextHeight.ToString(),TextWrapWidth.ToString(),
                            TextLineSpace.ToString(),TextStyle,TextStyleId.ToString(),
                            SymbolLayer,SymbolColor.ToString(),SymbolCords, SymbolLineWidth.ToString(),
                            SymbolLineType.ToString(),SymbolScale.ToString(), TextXml
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    SymbolHandles = outList[0];
                    TextHandles = outList[1];
                }
                else
                    return 3;
                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CreateSymbolDataText(string DrawingId, string LayerName, short AutoCadColor,
                        double Angle, double Height, double WrapWidth, double LineSpace,
                        string TextStyle, short StyleId, string TextXml, ref string SymbolHandles, ref string TextHandles, ref string SymbolTextHandles, ref string LayerDetails, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "CreateSymbolDataText" , LayerName,AutoCadColor.ToString(),
                            Angle.ToString(),Height.ToString(),WrapWidth.ToString(),
                            LineSpace.ToString(),TextStyle,StyleId.ToString(),TextXml
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    SymbolHandles = outList[0];
                    TextHandles = outList[1];
                    SymbolTextHandles = outList[2];
                    LayerDetails = outList[3];
                }
                else
                    return 3;
                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CreateBlockDataText(string DrawingId, short AutoCadColor,
                        double Angle, double Height, double WrapWidth, double LineSpace,
                        string TextStyle, short StyleId, string TextXml, ref string EntityHandles, ref string LayerDetails, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateBlockDataText" , AutoCadColor.ToString(),
                            Angle.ToString(),Height.ToString(),WrapWidth.ToString(),
                            LineSpace.ToString(),TextStyle,StyleId.ToString(),TextXml
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    EntityHandles = outList[0];
                    LayerDetails = outList[1];
                }
                else
                    return 3;
                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateDistributionMap(string MapDrawingId,string DrawingId, int CustomerId, string ModuleNo, string OrgLevel, string OrgLevelNo, string OrgLevelName, bool IsNetCustomer, double AreaRatio, string AreaUnit, string SiteName, string BuildingName, string FloorName, double FieldWidth, double FieldHeight, double ViewPosX, double ViewPosY, string GrossLayername, bool IsHatch, double LegendX, double LegendY, ref string SpaceHandles, ref string LegendBlockRefHandle, ref string LegendBlockHandle, string UserId)
        {
            try
            {
                string selectedOrgLevelName = OrgLevelName;
                string selectedOrgLevel = OrgLevel;
                string LegendHandles = "";

                BaseClassInput baseInp = new BaseClassInput();
                baseInp.CustomerId = CustomerId;
                baseInp.UserId = Convert.ToInt32(UserId);
                baseInp.TimeOffset = 0;
                baseInp.RowsPerPage = 100;
                var Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + OrgLevelNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + MapDrawingId + "\"},{\"ReportFieldId\":286,\"Value\":\"0\"}]}";

                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(baseInp).SpaceDrawingItem.GetOrgUnitDistributionMapData(applnInp);

                List<string> HatchedSpaceHandles = new List<string>();
                short nRetCode = 0;
                if (objDefaultApiReturn.DataCount > 0)
                {
                    dynamic distributionMapData = JsonConvert.DeserializeObject(objDefaultApiReturn.FieldBinderData);

                    Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + OrgLevelNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + MapDrawingId + "\"},{\"ReportFieldId\":278,\"Value\":\"" + ModuleNo + "\"}]}";
                    applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                    objDefaultApiReturn = new DefaultApiReturn();
                    objDefaultApiReturn = new SpaceModel(baseInp).SpaceDrawingItem.GetOrgdistributionSettingsBasedOnDrawings(applnInp);
                    if (objDefaultApiReturn.DataCount > 0)
                    {
                        List<Dictionary<string, dynamic>> empLegendDataArray = new List<Dictionary<string, dynamic>>();
                        List<Dictionary<string, dynamic>> legendDataArray = new List<Dictionary<string, dynamic>>();
                        dynamic[] orgdistributionSettingsBasedOnDrawingsData = JsonConvert.DeserializeObject<dynamic[]>(objDefaultApiReturn.FieldBinderData);

                        HatchDistributionHandles(distributionMapData, orgdistributionSettingsBasedOnDrawingsData, legendDataArray, ref HatchedSpaceHandles,
                            DrawingId, UserId, OrgLevel, OrgLevelName, IsHatch);

                        nRetCode = GetSpaceCategryForLegend(legendDataArray, HatchedSpaceHandles, CustomerId, MapDrawingId, UserId, ModuleNo, OrgLevelName, IsNetCustomer);
                        if (nRetCode == 0)
                        {
                            nRetCode = CreateLegend(selectedOrgLevelName, selectedOrgLevel, true, legendDataArray, empLegendDataArray, CustomerId, DrawingId, UserId, ModuleNo, OrgLevelName,
                                OrgLevelNo, AreaUnit, GrossLayername, SiteName, BuildingName, FloorName, AreaRatio, LegendX, LegendY, ref LegendHandles);
                            if (nRetCode == 0)
                            {
                                SetLayerVisibility(DrawingId, "$LEGEND", true, UserId);
                                nRetCode = ZoomExtents(DrawingId, UserId, FieldWidth, FieldHeight, ViewPosX, ViewPosY);
                                if (nRetCode == 0)
                                {
                                    SpaceHandles = "";
                                    foreach (string spaceHandle in HatchedSpaceHandles)
                                    {
                                        SpaceHandles += spaceHandle + PublicDataVariables.Delimiters.RowDelimiter;
                                    }
                                    CreateBlock(DrawingId, "LEGEND_BLOCK", LegendHandles, ref LegendBlockHandle, ref LegendBlockRefHandle, UserId);

                                    return 0;
                                }
                            }
                        }
                    }
                    else
                        return 37;
                }
                else
                    return 37;
                return nRetCode;
            }
            catch (Exception e)
            {
                return 9;
            }
        }

        public short CreateDistributionMapForValidatedFields(string ArchiveId,string MapDrawingId,string DrawingId, int CustomerId, string ModuleNo, string FieldId, string ValidatedFieldName, bool IsNetCustomer, double AreaRatio, string AreaUnit, string SiteName, string BuildingName, string FloorName, double FieldWidth, double FieldHeight, double ViewPosX, double ViewPosY, string GrossLayername, bool IsHatch, double LegendX, double LegendY, ref string SpaceHandles, ref string LegendBlockRefHandle, ref string LegendBlockHandle, string UserId)
        {
            try
            {
                string selectedOrgLevelName = ValidatedFieldName;
                // string selectedOrgLevel = OrgLevel;
                string LegendHandles = "";
                string ColumnName = "";
                if (FieldId == "0")
                    ColumnName = "SpFunctionName";
                else if (FieldId == "-1")
                    ColumnName = "SpStandardName";
                else if (FieldId == "-3")
                    ColumnName = "SpDriverName";
                else if (FieldId == "-4")
                    ColumnName = "CAI Archived Space Driver";
                else
                    ColumnName = "ValueName";

                BaseClassInput baseInp = new BaseClassInput();
                baseInp.CustomerId = CustomerId;
                baseInp.UserId = Convert.ToInt32(UserId);
                baseInp.TimeOffset = 0;
                baseInp.RowsPerPage = 100;

                var Input = "";
                ApplicationFormInput applnInp;
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                if (FieldId == "0")// Space Function 
                {
                    Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + ModuleNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + MapDrawingId + "\"},{\"ReportFieldId\":791,\"Value\":\"0\"}]}";
                    applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                    if (new CommonController().CheckValidInputData(applnInp) == false)
                    {
                        return 136;
                    }
                    objDefaultApiReturn = new SpaceModel(baseInp).SpaceDrawingItem.GetSpaceFunctionDistributionMapData(applnInp);
                }
                else if (FieldId == "-1")// Space Standard
                {
                    Input = "{ ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + ModuleNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + MapDrawingId + "\"},{\"ReportFieldId\":790,\"Value\":\"0\"}]}";
                    applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                    objDefaultApiReturn = new SpaceModel(baseInp).SpaceDrawingItem.GetSpaceStandardDistributionMapData(applnInp);

                }
                else if (FieldId == "-3")//CAI Space Driver
                {
                    Input = "{ ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + ModuleNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + MapDrawingId + "\"},{\"ReportFieldId\":1629,\"Value\":\"0\"}]}";
                    applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                    objDefaultApiReturn = new SpaceModel(baseInp).SpaceDrawingItem.GetSpaceDriverDistributionMapData(applnInp);
                    
                    

                }
                else if (FieldId == "-4")//Archive CAI Space Driver
                {
                    Input = "{ ListReportFieldIdValues:[{\"ReportFieldId\":1591,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":1590,\"Value\":\"" + ArchiveId + "\"}]}";
                    applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                    objDefaultApiReturn = new SpaceModel(baseInp).SpaceDrawingItem.GetArchivedDrawingDistributionDetails(applnInp);



                }
                else if (Convert.ToInt16(FieldId) > 0)// Space Validated AddDataFields
                {
                    Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + ModuleNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + MapDrawingId + "\"},{\"ReportFieldId\":8369,\"Value\":\"" + FieldId + "\"}]}";
                    applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                    objDefaultApiReturn = new SpaceModel(baseInp).SpaceDrawingItem.GetAddlDataFieldLookupDistributionMapData(applnInp);

                }

                List<string> HatchedSpaceHandles = new List<string>();
                short nRetCode = 0;
                if (objDefaultApiReturn.DataCount > 0)
                {
                    dynamic validatedFieldsMapData = JsonConvert.DeserializeObject(objDefaultApiReturn.FieldBinderData);

                    if (FieldId == "0")// Space Function 
                    {
                        Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + ModuleNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + MapDrawingId + "\"}]}";
                        applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                        objDefaultApiReturn = new SpaceModel(baseInp).SpaceDrawingItem.GetSpFunctionDistributionSettingsBasedOnDrawings(applnInp);

                    }
                    else if (FieldId == "-1")// Space Standard
                    {
                        Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + ModuleNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + MapDrawingId + "\"}]}";
                        applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                        objDefaultApiReturn = new SpaceModel(baseInp).SpaceDrawingItem.GetSpStandardDistributionSettingsBasedOnDrawings(applnInp);
                    }
                    else if (FieldId == "-3")//CAI Space Driver
                    {
                        Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + ModuleNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + MapDrawingId + "\"}]}";
                        applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                        objDefaultApiReturn = new SpaceModel(baseInp).SpaceDrawingItem.GetCAISpaceDriverDistributionSettingsBasedOnDrawings(applnInp);
                    }
                    else if ( FieldId == "-4")//CAI Space Driver
                    {
                        Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":1591,\"Value\":\"" + MapDrawingId + "\"},{\"ReportFieldId\":1590,\"Value\":\"" + ArchiveId + "\"}]}";
                        applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                        objDefaultApiReturn = new SpaceModel(baseInp).SpaceDrawingItem.GetArchivedSpaceDriverDistributionSettings(applnInp);
                    }
                    else if (Convert.ToInt16(FieldId) > 0) // Space Validated AddDataFields
                    {
                        Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":278,\"Value\":\"" + ModuleNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + MapDrawingId + "\"},{\"ReportFieldId\":20,\"Value\":\"" + FieldId + "\"}]}";
                        applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                        objDefaultApiReturn = new SpaceModel(baseInp).SpaceDrawingItem.GetAddlDataFieldDistributionSettingsBasedOnDrawings(applnInp);
                    }

                    if (objDefaultApiReturn.DataCount > 0)
                    {
                        List<Dictionary<string, dynamic>> empLegendDataArray = new List<Dictionary<string, dynamic>>();
                        List<Dictionary<string, dynamic>> legendDataArray = new List<Dictionary<string, dynamic>>();
                        dynamic[] orgdistributionSettingsBasedOnDrawingsData = JsonConvert.DeserializeObject<dynamic[]>(objDefaultApiReturn.FieldBinderData);

                        HatchDistributionHandles(validatedFieldsMapData, orgdistributionSettingsBasedOnDrawingsData, legendDataArray, ref HatchedSpaceHandles,
                            MapDrawingId, UserId, ColumnName, selectedOrgLevelName, IsHatch);

                        //nRetCode = GetSpaceCategryForLegend(legendDataArray, HatchedSpaceHandles, CustomerId, DrawingId, UserId, ModuleNo, selectedOrgLevelName, IsNetCustomer);
                       // if (nRetCode == 0)
                        {
                            nRetCode = CreateLegend(selectedOrgLevelName, "", true, legendDataArray, empLegendDataArray, CustomerId, DrawingId, UserId, ModuleNo, selectedOrgLevelName,
                                "", AreaUnit, GrossLayername, SiteName, BuildingName, FloorName, AreaRatio, LegendX, LegendY, ref LegendHandles);
                            if (nRetCode == 0)
                            {
                                SetLayerVisibility(DrawingId, "$LEGEND", true, UserId);
                                nRetCode = ZoomExtents(DrawingId, UserId, FieldWidth, FieldHeight, ViewPosX, ViewPosY);
                                if (nRetCode == 0)
                                {
                                    SpaceHandles = "";
                                    foreach (string spaceHandle in HatchedSpaceHandles)
                                    {
                                        SpaceHandles += spaceHandle + PublicDataVariables.Delimiters.RowDelimiter;
                                    }
                                    CreateBlock(DrawingId, "LEGEND_BLOCK", LegendHandles, ref LegendBlockHandle, ref LegendBlockRefHandle, UserId);

                                    return 0;
                                }
                            }
                        }
                    }
                    else
                        return 37;
                }
                else
                    return 37;
                return nRetCode;
            }
            catch (Exception e)
            {
                return 9;
            }
        }

        public short CreateDistributionMapOccupancy(string DrawingId, int CustomerId, string ModuleNo, string Target, bool IsNetCustomer, double AreaRatio, string AreaUnit, string SiteName, string BuildingName, string FloorName, double FieldWidth, double FieldHeight, double ViewPosX, double ViewPosY, string GrossLayername, bool IsHatch, double LegendX, double LegendY, ref string HatchHandles, ref string LegendBlockRefHandle, ref string LegendBlockHandle, string UserId)
        {
            try
            {
                dynamic orgdistributionSettingsBasedOnDrawingsData;
                string dataString = "";
                List<string> HatchedHandles = new List<string>();
                string LegendHandles = "";

                BaseClassInput baseInp = new BaseClassInput();
                baseInp.CustomerId = CustomerId;
                baseInp.UserId = Convert.ToInt32(UserId);
                baseInp.TimeOffset = 0;
                baseInp.RowsPerPage = 100;

                var Input = "{ FormId: 0 }";
                ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new EmployeeModel(baseInp).EmployeeDrawingItem.GetColorPreferences(applnInp);

                string selectedOccupancyName = "";
                List<Dictionary<string, dynamic>> empOccupancyLegendData = new List<Dictionary<string, dynamic>>();
                List<string> underOccupiedHandleArray, overOccupiedHandleArray, nominalOccupiedHandleArray, occupiedHandleArray;

                double occupiedArea = 0, unOccupiedArea = 0, underOccupiedArea = 0, overOccupiedArea = 0, nominalOccupiedArea = 0;
                short nRetCode = 0;

                dynamic occupancyColorHatchObject = JsonConvert.DeserializeObject(objDefaultApiReturn.FieldBinderData);
                switch (Convert.ToInt16(Target))
                {
                    case 1:
                        selectedOccupancyName = "Occupancy";
                        underOccupiedHandleArray = new List<string>();
                        overOccupiedHandleArray = new List<string>();
                        nominalOccupiedHandleArray = new List<string>();
                        occupiedHandleArray = new List<string>();
                        unOccupiedArea = 0;
                        underOccupiedArea = 0;
                        overOccupiedArea = 0;
                        nRetCode = GetOccupiedDistributionMapData(ref underOccupiedHandleArray, ref overOccupiedHandleArray, ref nominalOccupiedHandleArray, ref occupiedHandleArray, ref underOccupiedHandleArray, (int)DistributionType.UnderOccupied,
                            DrawingId, UserId, CustomerId, ref occupiedArea, ref unOccupiedArea, ref underOccupiedArea, ref overOccupiedArea, ref nominalOccupiedArea);

                        if (underOccupiedHandleArray.Count > 0)
                        {
                            Dictionary<string, dynamic> temp = new Dictionary<string, dynamic>();
                            //Dictionary<string, dynamic> tempInner = new Dictionary<string, dynamic>();
                            //tempInner.Add("ColorId", occupancyColorHatchObject[0]["UnderOccupiedColor"]);
                            //tempInner.Add("HatchAngle", occupancyColorHatchObject[0]["UnderOccupiedHatchAngle"]);
                            //tempInner.Add("HatchScale", occupancyColorHatchObject[0]["UnderOccupiedHatchScale"]);
                            //tempInner.Add("HatchPatternId", occupancyColorHatchObject[0]["UnderOccupiedHatchPatternId"]);
                            //temp.Add("HatchObj", tempInner);
                            dynamic tempInner = new
                            {
                                ColorId = occupancyColorHatchObject[0]["UnderOccupiedColor"],
                                HatchAngle = occupancyColorHatchObject[0]["UnderOccupiedHatchAngle"],
                                HatchScale = occupancyColorHatchObject[0]["UnderOccupiedHatchScale"],
                                HatchPatternId = occupancyColorHatchObject[0]["UnderOccupiedHatchPatternId"]
                            };
                            temp.Add("HatchObj", tempInner);
                            temp.Add("TextName", "Vaccant Room");
                            temp.Add("Area", underOccupiedArea);
                            empOccupancyLegendData.Add(temp);
                        }
                        nRetCode = GetOccupiedDistributionMapData(ref underOccupiedHandleArray, ref overOccupiedHandleArray, ref nominalOccupiedHandleArray, ref occupiedHandleArray, ref underOccupiedHandleArray, (int)DistributionType.OverOccupied,
                            DrawingId, UserId, CustomerId, ref occupiedArea, ref unOccupiedArea, ref underOccupiedArea, ref overOccupiedArea, ref nominalOccupiedArea);
                        nRetCode = GetOccupiedDistributionMapData(ref underOccupiedHandleArray, ref overOccupiedHandleArray, ref nominalOccupiedHandleArray, ref occupiedHandleArray, ref underOccupiedHandleArray, (int)DistributionType.NominalOccupied,
                            DrawingId, UserId, CustomerId, ref occupiedArea, ref unOccupiedArea, ref underOccupiedArea, ref overOccupiedArea, ref nominalOccupiedArea);

                        List<string> occupiedHatchArrayHandles = new List<string>();
                        if (overOccupiedHandleArray.Count > 0 && nominalOccupiedHandleArray.Count > 0)
                        {
                            occupiedHatchArrayHandles.AddRange(nominalOccupiedHandleArray);
                            occupiedHatchArrayHandles.AddRange(overOccupiedHandleArray);
                        }
                        else if (overOccupiedHandleArray.Count > 0 && nominalOccupiedHandleArray.Count == 0)
                            occupiedHatchArrayHandles = overOccupiedHandleArray;
                        else if (overOccupiedHandleArray.Count == 0 && nominalOccupiedHandleArray.Count > 0)
                            occupiedHatchArrayHandles = nominalOccupiedHandleArray;
                        if (occupiedHatchArrayHandles.Count > 0)
                        {
                            double totalArea = overOccupiedArea + nominalOccupiedArea;
                            Dictionary<string, dynamic> temp = new Dictionary<string, dynamic>();
                            //Dictionary<string, dynamic> tempInner = new Dictionary<string, dynamic>();
                            //tempInner.Add("ColorId", occupancyColorHatchObject[0]["OccupiedColor"]);
                            //tempInner.Add("HatchAngle", occupancyColorHatchObject[0]["OccupiedHatchAngle"]);
                            //tempInner.Add("HatchScale", occupancyColorHatchObject[0]["OccupiedHatchScale"]);
                            //tempInner.Add("HatchPatternId", occupancyColorHatchObject[0]["OccupiedHatchPatternId"]);
                            //temp.Add("HatchObj", tempInner);
                            dynamic tempInner = new
                            {
                                ColorId = occupancyColorHatchObject[0]["OccupiedColor"],
                                HatchAngle = occupancyColorHatchObject[0]["OccupiedHatchAngle"],
                                HatchScale = occupancyColorHatchObject[0]["OccupiedHatchScale"],
                                HatchPatternId = occupancyColorHatchObject[0]["OccupiedHatchPatternId"]
                            };
                            temp.Add("HatchObj", tempInner);
                            temp.Add("TextName", "Occupied Room");
                            temp.Add("Area", totalArea);
                            empOccupancyLegendData.Add(temp);
                        }
                        if (underOccupiedHandleArray.Count > 0 && occupiedHatchArrayHandles.Count > 0)
                        {
                            if (IsHatch)
                            {
                                HatchEmpOccupancyHandles(DrawingId, UserId, HatchedHandles, underOccupiedHandleArray, empOccupancyLegendData[0]);
                                HatchEmpOccupancyHandles(DrawingId, UserId, HatchedHandles, occupiedHatchArrayHandles, empOccupancyLegendData[1]);
                            }
                            CreateEmpOccupancyLegend(DrawingId, UserId, SiteName, BuildingName, FloorName, GrossLayername, AreaRatio, HatchedHandles,
                                empOccupancyLegendData, CustomerId, ModuleNo, selectedOccupancyName, AreaUnit, IsHatch, LegendX, LegendY, ref LegendHandles);
                        }
                        else if (underOccupiedHandleArray.Count > 0 && occupiedHatchArrayHandles.Count == 0)
                        {
                            if (IsHatch)
                                HatchEmpOccupancyHandles(DrawingId, UserId, HatchedHandles, underOccupiedHandleArray, empOccupancyLegendData[0]);
                            CreateEmpOccupancyLegend(DrawingId, UserId, SiteName, BuildingName, FloorName, GrossLayername, AreaRatio, HatchedHandles,
                                empOccupancyLegendData, CustomerId, ModuleNo, selectedOccupancyName, AreaUnit, IsHatch, LegendX, LegendY, ref LegendHandles);

                        }
                        else if (underOccupiedHandleArray.Count == 0 && occupiedHatchArrayHandles.Count > 0)
                        {
                            if (IsHatch)
                                HatchEmpOccupancyHandles(DrawingId, UserId, HatchedHandles, occupiedHatchArrayHandles, empOccupancyLegendData[0]);
                            CreateEmpOccupancyLegend(DrawingId, UserId, SiteName, BuildingName, FloorName, GrossLayername, AreaRatio, HatchedHandles,
                                 empOccupancyLegendData, CustomerId, ModuleNo, selectedOccupancyName, AreaUnit, IsHatch, LegendX, LegendY, ref LegendHandles);
                        }

                        ZoomExtents(DrawingId, UserId, FieldWidth, FieldHeight, ViewPosX, ViewPosY);
                        HatchHandles = "";
                        foreach (string spaceHandle in HatchedHandles)
                        {
                            HatchHandles += spaceHandle + PublicDataVariables.Delimiters.RowDelimiter;
                        }
                        CreateBlock(DrawingId, "LEGEND_BLOCK", LegendHandles, ref LegendBlockHandle, ref LegendBlockRefHandle, UserId);

                        break;
                }
                return 0;
            }
            catch (Exception e)
            {
                return 9;
            }
        }
        public short CreateLeaderMultiple(string DrawingId, string LayerName, short AutoCadColor,
                       double Size, double Scale, string LineType, double LineTypeScale, string DataXml,
                       ref string LeaderHandles, string UserId)
        {
            try
            {
                if (LayerName == null)
                    LayerName = "";
                List<string> commandsList = new List<string> {
                            "CreateLeaderMultiple" , LayerName,AutoCadColor.ToString(),
                            Size.ToString(),Scale.ToString(),LineType,
                            LineTypeScale.ToString(),DataXml
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    LeaderHandles = outList[0];
                }
                else
                    return 3;
                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
                
        public short ScaleSymbolMultiple(string DrawingId, string EntityHandles, double ScaleFactor, ref string XMLData, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ScaleSymbolMultiple" , EntityHandles,ScaleFactor.ToString()
                };


                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    XMLData = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short MoveEntityMultiple(string DrawingId, string XMLData, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "MoveEntityMultiple" , XMLData
                };


                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;                    
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetXdStringMultiple(string DrawingId, string EntityHandles, string AppData, ref string XData, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetXdStringMultiple" , EntityHandles , AppData
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    XData = outList[0];
                }
                else
                    return 3;

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetTextMultiple(string DrawingId, string TextXml, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetTextMultiple" , TextXml
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short GetGripPointsOfGivenEntity(string DrawingId, string EntityHandle, ref string Points, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetGripPointsOfGivenEntity" , EntityHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                    {
                        Points = "";
                        return retCode;
                    }

                    Points = outList[0];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CloneEntity(string DrawingId, string EntityHandle, int GripIndex, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CloneEntity" , EntityHandle,GripIndex.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CloneEntityAtPoint(string DrawingId, double MouseX, double MouseY, int GripIndex, ref string PreviousHandle, ref int CursorIndex, ref string SnapHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CloneEntityAtPoint" , MouseX.ToString(),MouseY.ToString(),GripIndex.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    PreviousHandle = outList[0];
                    CursorIndex = Convert.ToInt16(outList[1]);
                    SnapHandle = outList[2];
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short MoveEntityGrip(string DrawingId, double MouseX, double MouseY, int GripIndex, ref bool IsConnectorChanged, ref string OutcomeId, ref string FromId, ref string ToId, ref string GripPoints, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "MoveEntityGrip" , MouseX.ToString(),MouseY.ToString(),GripIndex.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        if (outList[0] == "0")
                            IsConnectorChanged = false;
                        else if (outList[0] == "1")
                            IsConnectorChanged = true;
                        OutcomeId = outList[1];
                        FromId = outList[2];
                        ToId = outList[3];
                        GripPoints = outList[4];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        //////////////////////Flowchart//////////////////////////////////////////////////////
        public short CreateWorkFlow(string DrawingId, string UserId, string ServicePath, string FileFolder, double Width, double Height,string fileName, ref string CacheString)
        {
            try
            {
                ProcessManager objPM;
                short retCode = 0;
                List<string> outList = new List<string>();
                string ConnectionId = "";

                if (DrawingHost.UsertoConnction.TryGetValue(UserId.ToString(), out ConnectionId))
                {
                    DrawingHost.UsertoConnction.Remove(UserId.ToString());
                }
                else
                    return 137;
                if (m_DrawingToProcess.TryGetValue(UserId.ToString() + "_" + DrawingId, out objPM))
                {
                    Close(DrawingId, Convert.ToInt32(UserId));
                }

                string TempFilePath = Path.Combine(appSettings[AppSettingsKey.FileLocation].Value, FileFolder, "WORKFLOW", "Drawings", "-1", UserId + ".dwg");
                if(!File.Exists(TempFilePath))
                {
                    FileStorage FS = new FileStorage();
                    FS.createFolder(Path.GetDirectoryName(TempFilePath));                    
                }
               
                objPM = new ProcessManager();
                objPM.initSockets(ConnectionId);
                m_DrawingToProcess.Add(UserId.ToString() + "_" + DrawingId, objPM);
                List<string> commandsList = new List<string> {
                         "SETBKGCOL", "185,205,229",
                            "LOADAPP", "WebAdapt",
                            "LOADAPP", "DbCommands",
                            "LOADAPP", "ExCommands",
                            "LOADMODULE", "CloudGfxSrv.txv",
                            "LOADAPP", "WebiWhiz",
                            "LOADAPP", "ZeroMQ",
                            "CreateDrawing", "1",TempFilePath,
                            "OPEN" ,"partial",TempFilePath,
                            "SOCKET", "Alias", "gsout", objPM.m_gsConnectionString + "/PUSH",
                            "EDIOBIND", "ZeroMQ", objPM.m_ConnectionString
                        };
                
                objPM.m_IsFirstCache = true;
                Thread objOpenDrawing = new Thread(() =>
                {
                    retCode = objPM.runTxHostZMQ(ServicePath, commandsList);
                    objPM.m_WaitOpen[1].Set();
                });
                objOpenDrawing.Start();
                WaitHandle.WaitAny(objPM.m_WaitOpen);

                if (retCode == 0)
                {
                    if (m_DrawingToPath.ContainsKey(DrawingId))
                    {
                        m_DrawingToPath.Remove(DrawingId);
                    }
                    m_DrawingToPath.Add(DrawingId, Path.GetDirectoryName(TempFilePath));

                    if (m_DrawingIdToFileName.ContainsKey(DrawingId))
                    {
                        m_DrawingIdToFileName.Remove(DrawingId);
                    }
                    m_DrawingIdToFileName.Add(DrawingId, fileName);
                    commandsList.Clear();
                    commandsList = new List<string> {                           
                            "CREATEWORKFLOW",
                            "VIEWLAYOUT","Model" ,
                            "GfxSrv", "Auto" , "Screen",
                             Width.ToString(), Height.ToString(),
                             "rx:/ZeroMQ/gsout/wr",
                             "SetApplicationMode","3"

                    };
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == -1)
                        retCode = 0;

                    WaitHandle.WaitAny(objPM.m_WaitOpen);
                }


                //CacheString = objPM.m_CacheString;
                objPM.m_CacheString = "";
                return retCode;

            }
            catch (Exception /*e*/)
            {
                m_DrawingToProcess.Remove(UserId.ToString() + "_" + DrawingId);
                return 9;
            }
        }
        public short CreateProcessBox(string DrawingId, double CenterX, double CenterY, double Width, double Height, ref string BoxHandle, string UserId)
        {

            try
            {
                List<string> commandsList = new List<string> {
                            "CreateProcessBox" , CenterX.ToString(),CenterY.ToString(),
                            Width.ToString(),Height.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        BoxHandle = outList[0];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateBoxTextOnFlowchart(string DrawingId, string BoxHandle, string BoxText, string ActionId, int ActionNo, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateBoxTextOnFlowchart", BoxHandle,
                            BoxText,ActionId,ActionNo.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CancelBox(string DrawingId, string BoxHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CancelBox" , BoxHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetNearestSnapPoint(string DrawingId, string EntityHandle, ref double XVal, ref double YVal, ref bool IsNear, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetNearestSnapPoint" , EntityHandle,
                            XVal.ToString(),YVal.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        XVal = Convert.ToDouble(outList[0]);
                        YVal = Convert.ToDouble(outList[1]);
                        if (outList[2] == "1")
                            IsNear = true;
                        else if (outList[2] == "0")
                            IsNear = false;
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }        

        public short GetNearestSnapPointWithAllSnapPoints(string DrawingId, string EntityHandle, ref double XVal, ref double YVal, ref bool IsNear,ref string SnapPoints, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetNearestSnapPointWithAllSnapPoints" , EntityHandle,
                            XVal.ToString(),YVal.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        XVal = Convert.ToDouble(outList[0]);
                        YVal = Convert.ToDouble(outList[1]);
                        if (outList[2] == "1")
                            IsNear = true;
                        else if (outList[2] == "0")
                            IsNear = false;
                        SnapPoints = outList[3];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CheckValidInOut(string DrawingId, string EntityHandle, double XVal, double YVal, bool IsSource, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CheckValidInOut" , EntityHandle,
                            XVal.ToString(),YVal.ToString(),
                            IsSource ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateConnector(string DrawingId, string SourceHandle, string TargetHandle, double SourceX, double SourceY, double TargetX, double TargetY, ref string EntityHandle, ref string FromActionId, ref string ToActionId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateConnector" , SourceHandle,
                            TargetHandle,
                            SourceX.ToString(),SourceY.ToString(),
                            TargetX.ToString(), TargetY.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        EntityHandle = outList[0];
                        FromActionId = outList[1];
                        ToActionId = outList[2];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CancelConnector(string DrawingId, string ConnectorHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CancelConnector" , ConnectorHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateNextAction(string DrawingId, string ConnectorHandle, short Type, string Id, string ActionText, short ActionNumber, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateNextAction" , ConnectorHandle,Type.ToString(),
                            Id, ActionText, ActionNumber.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateConnectorTextOnFlowchart(string DrawingId, string ConnectorHandle, string ConnectorText, string OutcomeId, short ConnectorType, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateConnectorTextOnFlowchart" , ConnectorHandle,
                            ConnectorText, OutcomeId, ConnectorType.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SelectShape(string DrawingId, double XValue, double YValue, ref string SelectHandle, ref short TypeId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SelectShape" , XValue.ToString(),
                            YValue.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        SelectHandle = outList[0];
                        short.TryParse(outList[1], out TypeId);
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short SetActionParams(string DrawingId, short AutoCadBoxFillColor, double LineWidth, string LineType, double LineTypeScale, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetActionParams" , AutoCadBoxFillColor.ToString(),LineWidth.ToString(),
                            LineType, LineTypeScale.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetActionTextParams(string DrawingId, short AutoCadColor, double Angle, double Height, double WrapWidth, double LineSpace, string TextStyle, short StyleId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetActionTextParams" , AutoCadColor.ToString(), Angle.ToString(),
                            Height.ToString(),  WrapWidth.ToString(),  LineSpace.ToString(),
                            TextStyle,  StyleId.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short SetOutcomeParams(string DrawingId, short AutoCadColor, double Arrowsize, double Scale, string LineType, double LineTypeScale, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetOutcomeParams" , AutoCadColor.ToString(), Arrowsize.ToString(),
                            Scale.ToString(),  LineType,  LineTypeScale.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetOutcomeTextParams(string DrawingId, short AutoCadColor, double Angle, double Height, double WrapWidth, double LineSpace, string TextStyle, short StyleId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetOutcomeTextParams" , AutoCadColor.ToString(), Angle.ToString(),
                            Height.ToString(),  WrapWidth.ToString(),
                            LineSpace.ToString(), TextStyle,StyleId.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short SetCircleOfFlowchartParams(string DrawingId, short AutoCadCircleColor, short AutoCadCircleFillColor, double Radius, double TextHeight, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetCircleOfFlowchartParams" , AutoCadCircleColor.ToString(),
                            AutoCadCircleFillColor.ToString(),Radius.ToString(),
                            TextHeight.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short SetEndRectangleParams(string DrawingId, short AutoCadBoxColor, short AutoCadBoxFillColor, double LineWidth, string LineType,
                                    double LineTypeScale, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetEndRectangleParams", AutoCadBoxColor.ToString(),
                            AutoCadBoxFillColor.ToString(),  LineWidth.ToString(), LineType,
                            LineTypeScale.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetEndRectangleTextParams(string DrawingId, short AutoCadColor, double Angle, double Height, double WrapWidth, double LineSpace,
                                    string TextStyle, short StyleId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetEndRectangleTextParams", AutoCadColor.ToString(),
                            Angle.ToString(), Height.ToString(), WrapWidth.ToString(),
                            LineSpace.ToString(),TextStyle, StyleId.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short UpdateTextOnFlowchart(string DrawingId, bool IsActionPoint, string Id, string TextValue, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "UpdateTextOnFlowchart", IsActionPoint ? "1" : "0",
                            Id,TextValue
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short UpdateTextsOnFlowchart(string DrawingId, string TextXml, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "UpdateTextsOnFlowchart" , TextXml
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SelectTextOfShape(string DrawingId, double XCoord, double YCoord, ref bool IsBox, ref string Id, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SelectTextOfShape", XCoord.ToString(),
                            YCoord.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        if (outList[0] == "1")
                            IsBox = true;
                        else if (outList[0] == "0")
                            IsBox = false;
                        Id = outList[1];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetBoxId(string DrawingId, string BoxHandle, ref string ActionId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetBoxId", BoxHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        ActionId = outList[0];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetConnectorId(string DrawingId, string ConnectorHandle, ref string OutcomeId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetConnectorId", ConnectorHandle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        OutcomeId = outList[0];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetItemId(string DrawingId, string Handle, ref string Id, ref bool IsActionPoint, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetItemId", Handle
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        Id = outList[0];
                        if (outList[1] == "1")
                            IsActionPoint = true;
                        else if (outList[1] == "0")
                            IsActionPoint = false;
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetBoxHandle(string DrawingId, string ActionId, ref string BoxHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetBoxHandle", ActionId
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        BoxHandle = outList[0];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetConnectorHandle(string DrawingId, string OutcomeId, ref string ConnectorHandle, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetConnectorHandle", OutcomeId
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        ConnectorHandle = outList[0];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short DeleteActionPoint(string DrawingId, string ActionId, ref string DeletedOutcomeIds, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DeleteActionPoint", ActionId
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        DeletedOutcomeIds = outList[0];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short DeleteOutcome(string DrawingId, string OutcomeId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DeleteOutcome", OutcomeId
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short DeleteEndRectangle(string DrawingId, string EndRectId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DeleteEndRectangle", EndRectId
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ShowHideCirclesInFlowchart(string DrawingId, bool IsShow, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ShowHideCirclesInFlowchart", IsShow ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ShowHideActionPointsInFlowchart(string DrawingId, string ActionPointIds, bool IsShow, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ShowHideActionPointsInFlowchart", ActionPointIds, IsShow ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ShowHideOutcomesInFlowchart(string DrawingId, string OutcomeIds, bool IsShow, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ShowHideOutcomesInFlowchart", OutcomeIds, IsShow ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ShowHideEndPointsInFlowchart(string DrawingId, string EndPointIds, bool IsShow, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ShowHideEndPointsInFlowchart", EndPointIds, IsShow ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ArrangeFlowchart(string DrawingId, int ArrangeType, bool IsByActionNumber, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "ArrangeFlowchart", ArrangeType.ToString(), IsByActionNumber ? "1" : "0"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetBoxCount(string DrawingId, short nCount, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetBoxCount", nCount.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateActionPoints(string DrawingId, string TextXml, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateActionPoints" , TextXml
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateEndPoints(string DrawingId, string TextXml, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateEndPoints" , TextXml
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateOutcomes(string DrawingId, string TextXml, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateOutcomes" , TextXml
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                }
                else
                    return 3;
                return retCode;

            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short CreateActionPoint(string DrawingId, string ActionId, string Text, short ActionNumber, string Coordinates, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateActionPoint", ActionId, Text, ActionNumber.ToString(), Coordinates
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateEndPoint(string DrawingId, string zEndId, string Text, string Coordinates, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateEndPoint", zEndId, Text, Coordinates
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short CreateOutcome(string DrawingId, string OutcomeId, string Text, string FromActionId,
            string ToActionId, string EndActionType, string EndActionText, short ConnectorType,
            string Coordinates, bool HideTimeout, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "CreateOutcome", OutcomeId, Text, FromActionId, ToActionId,EndActionType,EndActionText,ConnectorType.ToString(), Coordinates, (HideTimeout ? 1 : 0).ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetFlowchartDefaultParams(string DrawingId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetFlowchartDefaultParams"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);

                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SaveFlowchartView(string DrawingId, string UserId, ref string XmlData)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    List<string> commandsList = new List<string> {
                              "SaveFlowchartView"
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;
                        outList[0] = outList[0].Replace("version=1.0", "version=\"1.0\"");
                        XmlData = outList[0];
                    }
                    else
                        return 3;
                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short OpenFlowchartView(string DrawingId, string UserId, string XMLString)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    List<string> commandsList = new List<string> {
                             "OpenFlowchartView",XMLString
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;
                    }
                    else
                        return 3;
                    return retCode;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short IsItemExistsOnFlowchart(string DrawingId, short ItemType, string Id, ref bool IsExists, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "IsItemExistsOnFlowchart", ItemType.ToString(),Id
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        if (outList[0] == "1")
                            IsExists = true;
                        else if (outList[0] == "0")
                            IsExists = false;
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetAllIdsInFlowchart(string DrawingId, ref string ActionIds, ref string OutcomeIds, ref string EndPointIds, string UserId)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    List<string> commandsList = new List<string> {
                             "GetAllIdsInFlowchart"
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode == 0)
                        {
                            ActionIds = outList[0];
                            OutcomeIds = outList[1];
                            EndPointIds = outList[2];
                        }
                        return retCode;
                    }
                    else
                        return 3;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetOutcomeDetails(string DrawingId, string OutcomeId, ref string FromActionId, ref string ToActionId, ref string OutcomeText, string UserId)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    List<string> commandsList = new List<string> {
                             "GetOutcomeDetails",OutcomeId
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode == 0)
                        {
                            FromActionId = outList[0];
                            ToActionId = outList[1];
                            OutcomeText = outList[2];
                        }
                        return retCode;
                    }
                    else
                        return 3;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short ExitGripMode(string DrawingId, string UserId)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    List<string> commandsList = new List<string> {
                             "ExitGripMode"
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        return retCode;
                    }
                    else
                        return 3;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetSelectedFlowchartId(string DrawingId, string Handle, ref string Id, ref bool IsActionPoint, string UserId)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    List<string> commandsList = new List<string> {
                             "GetSelectedFlowchartId",Handle
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode == 0)
                        {
                            Id = outList[0];
                            if (outList[1] == "1")
                                IsActionPoint = true;
                            else if (outList[1] == "0")
                                IsActionPoint = false;
                        }
                        return retCode;
                    }
                    else
                        return 3;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        
        public short InitiateWorkFlow(string DrawingId, string UserId)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    List<string> commandsList = new List<string> {
                             "InitiateWorkFlow"
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);                   
                    return retCode;
                }
                else
                    return 3;
            }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short MoveActionPoint(string DrawingId, short Direction, string UserId)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    List<string> commandsList = new List<string> {
                             "MoveActionPoint", Direction.ToString()
                        };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        return retCode;
                    }
                    else
                        return 3;
                }
                return 9;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short GetEntityAndSnapPoints(string DrawingId,double CurrentX,double CurrentY, ref string SnapHandle, ref double XVal, ref double YVal, ref string SnapPoints, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "GetEntityAndSnapPoints" ,
                            CurrentX.ToString(),CurrentY.ToString()
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        SnapHandle = outList[0];
                        XVal = Convert.ToDouble(outList[1]);
                        YVal = Convert.ToDouble(outList[2]);                       
                        SnapPoints = outList[3];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short StartUndoRecording(string DrawingId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "StartUndoRecording" 
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);                   
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short DisableUndoRecording(string DrawingId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "DisableUndoRecording"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short Undo(string DrawingId, ref string ChangedOutcomeId, ref string ChangedFromId, ref string ChangedToId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "UndoAll"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        ChangedOutcomeId = outList[0];
                        ChangedFromId = outList[1];
                        ChangedToId = outList[2];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short Redo(string DrawingId, ref string ChangedOutcomeId, ref string ChangedFromId, ref string ChangedToId, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "RedoAll"
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode == 0)
                    {
                        ChangedOutcomeId = outList[0];
                        ChangedFromId = outList[1];
                        ChangedToId = outList[2];
                    }
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short LoadPlotStyle(string DrawingId, string XmlString, string UserId)
        {
            try
            {
                string dwgFilePath;
                if (m_DrawingToPath.TryGetValue(DrawingId, out dwgFilePath))
                {
                    List<string> commandsList = new List<string> {
                            "LoadPlotStyle" ,
                            dwgFilePath, XmlString
                    };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;
                    short retCode = 0;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        return retCode;
                    }
                    else
                        return 3;
                }
                return 9;             
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        public short SetPlotstyleToLayer(string DrawingId, string StyleName, string LayerName, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "SetPlotstyleToLayer",
                            StyleName, LayerName
                };

                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        //////////////////////////////////Private//////////////////////////////////////

        private short CreateEmployeeDistributionLegend(List<Dictionary<string, dynamic>> legendDataArray, int CustomerId, string DrawingId, string UserId, string ModuleNo, string OrgLevelName, string AreaUnit, string strTextStyleName, short nSpaceDataTextLegendStyleId, double dSpaceDataTextAngle, double dSpaceDataTextWidth, double dLegendTextSize, double AreaRatio, double dblLegendStartXCord, double dStartY, ref string LegendHandles)
        {
            string LegendLineHandles = "";
            double dblX = dblLegendStartXCord;
            double dblY = dStartY;

            double HL1StartX = dblX - (8 * AreaRatio);
            double HL1StartY = dblY + (4 * AreaRatio);
            string[] strTextHandle = { };
            double dDistRectWidth = dLegendTextSize * 2;//g_intDistRectWidth * g_dblDwgRatio+(g_intLegendTextSize/2)
            double dDistRectHeight = dLegendTextSize * 2;//g_intDistRectHeight * g_dblDwgRatio+(g_intLegendTextSize/2)

            double dTextMaxX = 0;
            double HL2StartY = 0, VL2StartX = 0;

            string TextHandle = "", TextHandle2 = "";
            short nRetCode = CreateText(DrawingId, "$LEGEND", 7, dblX, dblY, dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                                                          dSpaceDataTextWidth, "Hatch", strTextStyleName, 8, ref TextHandle, UserId);
            if (nRetCode == 0)
            {
                LegendHandles += TextHandle + PublicDataVariables.Delimiters.RowDelimiter;
                double MinX = 0, MinY = 0, MaxX = 0, MaxY = 0;
                nRetCode = GetEntityExtents(DrawingId, TextHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                if (nRetCode == 0)
                {
                    nRetCode = CreateText(DrawingId, "$LEGEND", 7, dblX, MinY - (1 * AreaRatio), dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                                                                        dSpaceDataTextWidth, "Pattern", strTextStyleName, 2, ref TextHandle2, UserId);
                    if (nRetCode == 0)
                    {
                        LegendHandles += TextHandle2 + PublicDataVariables.Delimiters.RowDelimiter;
                        double rtnTextMaxX = 0, VL1EndY = 0, rtnHL2StartY = 0, rtnVL2StartX = 0, VL3StartX = 0;

                        nRetCode = GetDistributionByName(true, DrawingId, UserId, AreaRatio, dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth,
                        OrgLevelName, strTextStyleName, nSpaceDataTextLegendStyleId, legendDataArray,
                        AreaUnit, dblX, dDistRectHeight, dblY, dTextMaxX, HL2StartY,
                        dDistRectWidth, HL1StartX, VL2StartX, ref rtnTextMaxX, ref VL1EndY, ref rtnHL2StartY, ref rtnVL2StartX, ref VL3StartX, ref LegendHandles);
                        if (nRetCode != 0)
                        {
                            DeleteLayer(DrawingId, "$LEGEND", UserId);
                            return nRetCode;
                        }
                        else
                        {
                            double HL1EndX = rtnTextMaxX + (2 * AreaRatio);
                            CreateLegendLines(DrawingId, UserId, HL1StartX, HL1StartY, HL1EndX, HL1StartY, ref LegendLineHandles, ref LegendHandles); //HL1
                            CreateLegendLines(DrawingId, UserId, HL1StartX, HL1StartY, HL1StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);//VL1
                            CreateLegendLines(DrawingId, UserId, HL1StartX, rtnHL2StartY, HL1EndX, rtnHL2StartY, ref LegendLineHandles, ref LegendHandles);//HL2
                            CreateLegendLines(DrawingId, UserId, HL1StartX, VL1EndY, HL1EndX, VL1EndY, ref LegendLineHandles, ref LegendHandles);//HL3
                            CreateLegendLines(DrawingId, UserId, rtnVL2StartX, HL1StartY, rtnVL2StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);//VL2
                            CreateLegendLines(DrawingId, UserId, VL3StartX, HL1StartY, VL3StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);//VL3
                            CreateLegendLines(DrawingId, UserId, HL1EndX, HL1StartY, HL1EndX, VL1EndY, ref LegendLineHandles, ref LegendHandles);//VL4

                            double rtnEndY = 0;
                            GetspaceStandardCapacityLegend(DrawingId, UserId, strTextStyleName, CustomerId, HL1StartX, VL1EndY, dSpaceDataTextAngle, dSpaceDataTextWidth,
                                dDistRectHeight, AreaRatio, dLegendTextSize, ref rtnEndY, ref LegendHandles);

                            int categoryId = 0, addtlDataFieldCategoryId = 0;
                            switch (ModuleNo)
                            {
                                case "3":
                                    categoryId = 1;
                                    addtlDataFieldCategoryId = 7;
                                    break;
                                case "5":
                                    categoryId = 17;
                                    addtlDataFieldCategoryId = 8;
                                    break;
                                case "7":
                                    categoryId = 1;
                                    addtlDataFieldCategoryId = 7;
                                    break;
                            }
                            BaseClassInput baseInp = new BaseClassInput();
                            baseInp.CustomerId = CustomerId;
                            baseInp.UserId = Convert.ToInt32(UserId);
                            baseInp.TimeOffset = 0;
                            baseInp.RowsPerPage = 100;
                            var Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"" + categoryId.ToString() + "\"},{\"ReportFieldId\":24,\"Value\":\"" + addtlDataFieldCategoryId.ToString() + "\"}]}";
                            DisplaySettingInput displaySettingInput = JsonConvert.DeserializeObject<DisplaySettingInput>(Input);
                            CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                            objCustomApiReturn = new CommonModel(baseInp).ApplicationFormItem.Extented.GetDisplaySettingData(displaySettingInput);
                            List<DisplaySettingsReturn> displaySettingData = objCustomApiReturn.DisplaySettingsData;

                            CreateDisplayOrderLegend(DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId, AreaRatio, dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth,
                                 displaySettingData, HL1StartX, rtnEndY, ref LegendHandles);
                            return 0;
                        }
                    }
                }
            }
            return nRetCode;
        }

        private short GetspaceStandardCapacityLegend(string DrawingId, string UserId, string strTextStyleName, int CustomerId, double xPos, double yPos, double dSpaceDataTextAngle, double dSpaceDataTextWidth, double dDistRectHeight, double AreaRatio, double dLegendTextSize, ref double rtnEndY, ref string LegendHandles)
        {
            string formatedText = "";

            double startX = xPos;
            double startY = yPos - (6 * AreaRatio);
            double dSize = dLegendTextSize;

            BaseClassInput baseInp = new BaseClassInput();
            baseInp.CustomerId = CustomerId;
            baseInp.UserId = Convert.ToInt32(UserId);
            baseInp.TimeOffset = 0;
            baseInp.RowsPerPage = 100;

            var Input = "{ FormId: 0 }";
            ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new EmployeeModel(baseInp).EmployeeDrawingItem.GetSpaceStandardCapacityLegendForDrawing(applnInp, Convert.ToInt16(DrawingId), 0, 0);

            Dictionary<string, dynamic> spStandardCapacityData = JsonConvert.DeserializeObject<List<Dictionary<string, dynamic>>>(objDefaultApiReturn.FieldBinderData)[0]; //JsonConvert.DeserializeObject<Dictionary<string,dynamic>>(objDefaultApiReturn.FieldBinderData)[0];


            dynamic keyData = spStandardCapacityData.Keys.ToArray();//spStandardCapacityData
            List<Dictionary<string, dynamic>> empSpStandardCapacityLegendData = new List<Dictionary<string, dynamic>>();
            GetspaceStandardCapacityData(empSpStandardCapacityLegendData, spStandardCapacityData, keyData);
            short nRetCode = CreatespaceStandardCapacityLegendText(DrawingId, UserId, strTextStyleName, AreaRatio, dSpaceDataTextAngle, dSpaceDataTextWidth,
                empSpStandardCapacityLegendData, startX, startY, dSize, dDistRectHeight, ref rtnEndY, ref LegendHandles);
            return nRetCode;
        }
        private short CreatespaceStandardCapacityLegendText(string DrawingId, string UserId, string strTextStyleName, double AreaRatio, double dSpaceDataTextAngle, double dSpaceDataTextWidth, List<Dictionary<string, dynamic>> empSpStandardCapacityLegendData, double startX, double startY, double dSize, double dDistRectHeight, ref double rtnEndY, ref string LegendHandles)
        {
            for (int i = 0; i < empSpStandardCapacityLegendData.Count; i++)
            {
                Dictionary<string, dynamic> legentDataItem = empSpStandardCapacityLegendData[i];
                string legentDataItemString = legentDataItem["Key"] + ": " + legentDataItem["Value"];
                string orgLevelItemTextAreaHandle = "";
                short nRetCode = CreateText(DrawingId, "$LEGEND", 1, startX, startY - (dDistRectHeight / 3), dSpaceDataTextAngle, dSize,
                        dSpaceDataTextWidth, legentDataItemString, strTextStyleName, 0, ref orgLevelItemTextAreaHandle, UserId);
                if (nRetCode == 0)
                {
                    LegendHandles += orgLevelItemTextAreaHandle + PublicDataVariables.Delimiters.RowDelimiter;
                    startY = startY - dDistRectHeight - (1 * AreaRatio);
                }
            }
            rtnEndY = startY;
            return 0;
        }
        private short GetspaceStandardCapacityData(List<Dictionary<string, dynamic>> empSpStandardCapacityLegendData, dynamic spStandardCapacityData, dynamic keyData)
        {
            for (int index = 0; index < keyData.Length; index++)
            {
                Dictionary<string, dynamic> temp = new Dictionary<string, dynamic>();
                temp.Add("Key", keyData[index]);
                temp.Add("Value", spStandardCapacityData[keyData[index]]);
                empSpStandardCapacityLegendData.Add(temp);
            }
            return 0;
        }
        private short CreateEmpOccupancyLegend(string DrawingId, string UserId, string SiteName, string BuildingName, string FloorName, string GrossLayername, double AreaRatio, List<string> HatchedHandles, List<Dictionary<string, dynamic>> legendDataArray, int CustomerId, string ModuleNo, string OrgLevelName, string AreaUnit, bool IsHatch, double LegendX, double LegendY, ref string LegendHandles)
        {
            double dLegendTextSize = 3;
            double dTextSize = 3;
            double dLegentScale = 1;

            dLegendTextSize = dTextSize * dLegentScale * AreaRatio;
            double dblLegendStartXCord, dblLegendStartYCord, dblMaxX, dblMaxY;
            string ClosedEntityHandles = "", OpenEntityHandles = "", OtherEntityHandles = "";

            short nRetCode = GetAllPolylines(DrawingId, GrossLayername, ref ClosedEntityHandles, ref OpenEntityHandles, ref OtherEntityHandles, UserId);
            if (nRetCode == 0)
            {
                double dblMinX = 0, dblMinY = 0;
                dblMaxX = 0; dblMaxY = 0;

                string[] strGrossHandle = ClosedEntityHandles.Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray());
                nRetCode = GetEntityExtents(DrawingId, strGrossHandle[0], ref dblMinX, ref dblMinY, ref dblMaxX, ref dblMaxY, UserId);
                if (nRetCode == 0)
                {
                    if (nRetCode == 0)
                    {
                        if (LegendX != 0 && LegendY != 0 && IsHatch == false)
                        {
                            dblMaxX = LegendX; dblMaxY = LegendY;
                            dblMaxX = dblMaxX + ((dLegendTextSize) + (8 * AreaRatio));
                            dblMaxY = dblMaxY - ((dLegendTextSize) + (3 * AreaRatio));

                        }
                        else
                        {
                            dblMaxX = dblMaxX + ((dLegendTextSize) + (30 * AreaRatio));
                            dblMaxY = dblMaxY - ((dLegendTextSize) + (3 * AreaRatio));
                        }


                        dblLegendStartXCord = dblMaxX;
                        dblLegendStartYCord = dblMaxY;

                        //CreateDrawingDetailsLegend
                        bool isDistMap = true;
                        double dStartX, dStartY;
                        double dSpaceDataTextAngle = 0, dSpaceDataTextWidth = 1;
                        if (isDistMap)
                            dStartX = dblLegendStartXCord - (8 * AreaRatio);
                        else
                            dStartX = dblLegendStartXCord;
                        dStartY = dblLegendStartYCord;

                        string detailsText = "Site: " + SiteName + ", Building: " + BuildingName + ", Floor: " + FloorName;
                        double dSize = 2.5 * AreaRatio;
                        string strTextStyleName = "";
                        short nSpaceDataTextLegendStyleId = 7;
                        string EntityHandle = "";

                        GetFontStyles(DrawingId, UserId, ref strTextStyleName);
                        nRetCode = CreateText(DrawingId, "$LEGEND", 7, dStartX, dStartY, dSpaceDataTextAngle, dSize,
                            dSpaceDataTextWidth, detailsText, strTextStyleName, nSpaceDataTextLegendStyleId, ref EntityHandle, UserId);
                        if (nRetCode == 0)
                        {
                            LegendHandles += EntityHandle + PublicDataVariables.Delimiters.RowDelimiter;
                            dStartY = dStartY - (dSize + (2 * AreaRatio));
                            nRetCode = CreateEmployeeDistributionLegend(legendDataArray, CustomerId, DrawingId,
                                UserId, ModuleNo, OrgLevelName, AreaUnit, strTextStyleName, nSpaceDataTextLegendStyleId, dSpaceDataTextAngle, dSpaceDataTextWidth,
                                dLegendTextSize, AreaRatio, dblLegendStartXCord, dStartY, ref LegendHandles);
                            return nRetCode;
                        }
                    }
                }
            }
            return nRetCode;
        }
        private short HatchEmpOccupancyHandles(string DrawingId, string UserId, List<string> HatchedHandles, List<string> HatchHandleArray, Dictionary<string, dynamic> empOccupancyLegendDataObj)
        {
            string Layers = "", Handles = "", Colors = "", Angles = "", Scales = "", PatternIds = "", IsExtents = "", strHatchHandles = "";
            for (int i = 0; i < HatchHandleArray.Count; i++)
            {
                //string hatchHandle = "";
                //HatchEntity(DrawingId, "$Hatch", HatchHandleArray[i], (short)Convert.ToInt16(empOccupancyLegendDataObj["HatchObj"].ColorId), Convert.ToDouble(empOccupancyLegendDataObj["HatchObj"].HatchAngle), Convert.ToDouble(empOccupancyLegendDataObj["HatchObj"].HatchScale), (short)Convert.ToInt16(empOccupancyLegendDataObj["HatchObj"].HatchPatternId), false, ref hatchHandle, UserId);
                Layers += "$Hatch" + PublicDataVariables.Delimiters.RowDelimiter;
                Handles += HatchHandleArray[i] + PublicDataVariables.Delimiters.RowDelimiter;
                Colors += empOccupancyLegendDataObj["HatchObj"].ColorId + PublicDataVariables.Delimiters.RowDelimiter;
                Angles += empOccupancyLegendDataObj["HatchObj"].HatchAngle + PublicDataVariables.Delimiters.RowDelimiter;
                Scales += empOccupancyLegendDataObj["HatchObj"].HatchScale + PublicDataVariables.Delimiters.RowDelimiter;
                PatternIds += empOccupancyLegendDataObj["HatchObj"].HatchPatternId + PublicDataVariables.Delimiters.RowDelimiter;
                IsExtents += "false" + PublicDataVariables.Delimiters.RowDelimiter;

                HatchedHandles.Add(HatchHandleArray[i]);
            }
            short retCode = HatchEntityMultiple(DrawingId, Layers, Handles, Colors, Angles, Scales, PatternIds, IsExtents, UserId, ref strHatchHandles);

            return retCode;
        }

        private short GetOccupiedDistributionMapData(ref List<string> underOccupiedHandleArray, ref List<string> overOccupiedHandleArray, ref List<string> nominalOccupiedHandleArray, ref List<string> occupiedHandleArray, ref List<string> unOccupiedHandleArray, int DistributionTypeNo, string DrawingId, string UserId, int CustomerId, ref double occupiedArea, ref double unOccupiedArea, ref double underOccupiedArea, ref double overOccupiedArea, ref double nominalOccupiedArea)
        {
            BaseClassInput baseInp = new BaseClassInput();
            baseInp.CustomerId = CustomerId;
            baseInp.UserId = Convert.ToInt32(UserId);
            baseInp.TimeOffset = 0;
            baseInp.RowsPerPage = 100;

            var Input = "{ FormId: 0 }";//DrawingId: drawingId.toString(), DistributionBy: distributionBy
            ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new EmployeeModel(baseInp).EmployeeDrawingItem.GetSpaceHandleForDistribution(applnInp, Convert.ToInt32(DrawingId), DistributionTypeNo);

            dynamic dataString = JsonConvert.DeserializeObject(objDefaultApiReturn.FieldBinderData)[0].Handles;
            string[] temp;
            temp = dataString.ToString().Split(PublicDataVariables.Delimiters.ColumnDelimiter.ToCharArray());

            if (dataString != null)
            {
                switch ((DistributionType)DistributionTypeNo)
                {
                    case DistributionType.Occupied:
                        occupiedArea = Convert.ToDouble(temp.Last());
                        temp = dataString.ToString().Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray());
                        occupiedHandleArray = temp.ToList();
                        occupiedHandleArray.RemoveAt(occupiedHandleArray.Count - 1);
                        break;
                    case DistributionType.UnOccupied:
                        unOccupiedArea = Convert.ToDouble(temp.Last());
                        temp = dataString.ToString().Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray());
                        unOccupiedHandleArray = temp.ToList();
                        unOccupiedHandleArray.RemoveAt(unOccupiedHandleArray.Count - 1);
                        break;
                    case DistributionType.UnderOccupied:
                        underOccupiedArea = Convert.ToDouble(temp.Last());
                        temp = dataString.ToString().Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray());
                        underOccupiedHandleArray = temp.ToList();
                        underOccupiedHandleArray.RemoveAt(underOccupiedHandleArray.Count - 1);
                        break;
                    case DistributionType.OverOccupied:
                        overOccupiedArea = Convert.ToDouble(temp.Last());
                        temp = dataString.ToString().Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray());
                        overOccupiedHandleArray = temp.ToList();
                        overOccupiedHandleArray.RemoveAt(overOccupiedHandleArray.Count - 1);
                        break;
                    case DistributionType.NominalOccupied:
                        nominalOccupiedArea = Convert.ToDouble(temp.Last());
                        temp = dataString.ToString().Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray());
                        nominalOccupiedHandleArray = temp.ToList();
                        nominalOccupiedHandleArray.RemoveAt(nominalOccupiedHandleArray.Count - 1);
                        break;
                }
                return 0;
            }
            else
                return 1;
        }

        private short GetSpaceCategryForLegend(List<Dictionary<string, dynamic>> legendDataArray, List<string> HatchedSpaceHandles, int CustomerId, string DrawingId, string UserId, string ModuleNo, string OrgLevelName, bool IsNetCustomer)
        {
            BaseClassInput baseInp = new BaseClassInput();
            baseInp.CustomerId = CustomerId;
            baseInp.UserId = Convert.ToInt32(UserId);
            baseInp.TimeOffset = 0;
            baseInp.RowsPerPage = 100;
            var Input = "{ ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"" + ModuleNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingId + "\"}]}";
            ApplicationFormInput applnInp = applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            TypeValidation typeVal = new TypeValidation();
            bool blnReturn = true;
            if (applnInp.Filter != null)
            {
                blnReturn = typeVal.checkWhiteList(applnInp.Filter, 15);
            }
            if (blnReturn == true)
            {
                DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                objDefaultApiReturn = new SpaceModel(baseInp).SpaceItem.GetAllSpaceDetails(applnInp);
                dynamic[] spaceData = JsonConvert.DeserializeObject<dynamic[]>(objDefaultApiReturn.FieldBinderData);

                dynamic strColor = JsonConvert.DeserializeObject(new SpaceModel(baseInp).SpaceItem.GetColorSettings());
                dynamic colorPreferenceSettingsData = strColor[0];
                var VerticalCommonAreaHatchObj = new { HatchPatternId = colorPreferenceSettingsData["VerticalHatchPatternId"], HatchAngle = colorPreferenceSettingsData["VerticalHatchAngle"], HatchScale = colorPreferenceSettingsData["VerticalHatchScale"], ColorId = colorPreferenceSettingsData["VerticalColor"], RGBColor = colorPreferenceSettingsData["BuildingCommonColorRGB"] };
                var FloorCommonAreaHatchObj = new { HatchPatternId = colorPreferenceSettingsData["FloorCommonHatchPatternId"], HatchAngle = colorPreferenceSettingsData["FloorCommonHatchAngle"], HatchScale = colorPreferenceSettingsData["FloorCommonHatchScale"], ColorId = colorPreferenceSettingsData["FloorCommonColor"], RGBColor = colorPreferenceSettingsData["BuildingCommonColorRGB"] };
                var BuildingCommonAreaHatchObj = new { HatchPatternId = colorPreferenceSettingsData["BuildingCommonHatchPatternId"], HatchAngle = colorPreferenceSettingsData["BuildingCommonHatchAngle"], HatchScale = colorPreferenceSettingsData["BuildingCommonHatchScale"], ColorId = colorPreferenceSettingsData["BuildingCommonColor"], RGBColor = colorPreferenceSettingsData["BuildingCommonColorRGB"] };
                var SharedSpaceHatchObj = new { HatchPatternId = colorPreferenceSettingsData["SharedSpaceHatchPatternId"], HatchAngle = colorPreferenceSettingsData["SharedSpaceHatchAngle"], HatchScale = colorPreferenceSettingsData["SharedSpaceHatchScale"], ColorId = colorPreferenceSettingsData["SharedSpaceColor"], RGBColor = colorPreferenceSettingsData["SharedSpaceColorRGB"] };
                //var buildingCommonAreaHatchObj;
                //var floorCommonAreaHatchObj;
                //var verticalCommonAreaHatchObj;
                string Layers = "", Handles = "", Colors = "", Angles = "", Scales = "", PatternIds = "", IsExtents = "";


                double BuildingCommonArea = 0;
                double FloorCommonArea = 0;
                double VerticalCommonArea = 0;
                double SharedSpaceCommonArea = 0;
                for (int i = 0; i < spaceData.Length; i++)
                {
                    string hatchHandle;
                    var spaceDataItem = spaceData[i];
                    if (IsNetCustomer)
                        hatchHandle = spaceDataItem["CarpetHandle"];
                    else
                        hatchHandle = spaceDataItem["BomaHandle"];
                    if (spaceDataItem["SpaceCategoryId"] != null)
                    {
                        if (spaceDataItem["SpaceCategoryId"] == 1)
                        {
                            //04 - Vertical Space
                            double grossArea = 0;
                            if (spaceDataItem["Gross Area"] != null)
                                grossArea = spaceDataItem["Gross Area"];
                            VerticalCommonArea = VerticalCommonArea + grossArea;
                            //string EntityHandle = "";
                            short nColorId = VerticalCommonAreaHatchObj.ColorId;
                            double dAngle = Convert.ToDouble(VerticalCommonAreaHatchObj.HatchAngle);
                            double dScale = Convert.ToDouble(VerticalCommonAreaHatchObj.HatchScale);
                            short nPattern = Convert.ToInt16(VerticalCommonAreaHatchObj.HatchPatternId);

                            Layers += "$Hatch" + PublicDataVariables.Delimiters.RowDelimiter;
                            Handles += hatchHandle + PublicDataVariables.Delimiters.RowDelimiter;
                            Colors += nColorId.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                            Angles += dAngle.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                            if (nPattern == 11)
                            {
                                //  dScale = 0.1;
                                // nPattern = 5;
                            }
                            Scales += dScale.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                            PatternIds += nPattern.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                            IsExtents += "false" + PublicDataVariables.Delimiters.RowDelimiter;

                            //HatchEntity(DrawingId, "$Hatch", hatchHandle, nColorId, dAngle, dScale, nPattern, false, ref EntityHandle, UserId);
                            //HatchedSpaceHandles.Add(hatchHandle);
                        }

                        else if (spaceDataItem["SpaceCategoryId"] == 2)
                        {
                            //03 - Floor Common
                            double grossArea = 0;
                            if (spaceDataItem["Gross Area"] != null)
                                grossArea = spaceDataItem["Gross Area"];
                            FloorCommonArea = FloorCommonArea + grossArea;
                            //string EntityHandle = "";
                            short nColorId = FloorCommonAreaHatchObj.ColorId;
                            double dAngle = Convert.ToDouble(FloorCommonAreaHatchObj.HatchAngle);
                            double dScale = Convert.ToDouble(FloorCommonAreaHatchObj.HatchScale);
                            short nPattern = Convert.ToInt16(FloorCommonAreaHatchObj.HatchPatternId);

                            Layers += "$Hatch" + PublicDataVariables.Delimiters.RowDelimiter;
                            Handles += hatchHandle + PublicDataVariables.Delimiters.RowDelimiter;
                            Colors += nColorId.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                            Angles += dAngle.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                            if (nPattern == 11)
                            {
                                // dScale = 0.1;
                                // nPattern = 5;
                            }
                            Scales += dScale.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                            PatternIds += nPattern.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                            IsExtents += "false" + PublicDataVariables.Delimiters.RowDelimiter;

                            //HatchEntity(DrawingId, "$Hatch", hatchHandle, nColorId, dAngle, dScale, nPattern, false, ref EntityHandle, UserId);
                            // HatchedSpaceHandles.Add(hatchHandle);
                        }
                        else if (spaceDataItem["SpaceCategoryId"] == 3)
                        {
                            //02 - Building Common
                            double grossArea = 0;
                            if (spaceDataItem["Gross Area"] != null)
                                grossArea = spaceDataItem["Gross Area"];
                            BuildingCommonArea = BuildingCommonArea + grossArea;
                            // string EntityHandle = "";
                            short nColorId = BuildingCommonAreaHatchObj.ColorId;
                            double dAngle = Convert.ToDouble(BuildingCommonAreaHatchObj.HatchAngle);
                            double dScale = Convert.ToDouble(BuildingCommonAreaHatchObj.HatchScale);
                            short nPattern = Convert.ToInt16(BuildingCommonAreaHatchObj.HatchPatternId);

                            Layers += "$Hatch" + PublicDataVariables.Delimiters.RowDelimiter;
                            Handles += hatchHandle + PublicDataVariables.Delimiters.RowDelimiter;
                            Colors += nColorId.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                            Angles += dAngle.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                            if (nPattern == 11)
                            {
                                // dScale = 0.1;
                                //nPattern = 5;
                            }
                            Scales += dScale.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                            PatternIds += nPattern.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                            IsExtents += "false" + PublicDataVariables.Delimiters.RowDelimiter;

                            //HatchEntity(DrawingId, "$Hatch", hatchHandle, nColorId, dAngle, dScale, nPattern, false, ref EntityHandle, UserId);
                            // HatchedSpaceHandles.Add(hatchHandle);
                        }
                    }
                    if (spaceDataItem["IsShared"] == true) {
                        double grossArea = 0;
                        if (spaceDataItem["Gross Area"] != null)
                            grossArea = spaceDataItem["Gross Area"];
                        SharedSpaceCommonArea = SharedSpaceCommonArea + grossArea;
                        //string EntityHandle = "";
                        short nColorId = SharedSpaceHatchObj.ColorId;
                        double dAngle = Convert.ToDouble(SharedSpaceHatchObj.HatchAngle);
                        double dScale = Convert.ToDouble(SharedSpaceHatchObj.HatchScale);
                        short nPattern = Convert.ToInt16(SharedSpaceHatchObj.HatchPatternId);

                        Layers += "$Hatch" + PublicDataVariables.Delimiters.RowDelimiter;
                        Handles += hatchHandle + PublicDataVariables.Delimiters.RowDelimiter;
                        Colors += nColorId.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                        Angles += dAngle.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                        if (nPattern == 11)
                        {
                            //  dScale = 0.1;
                            // nPattern = 5;
                        }
                        Scales += dScale.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                        PatternIds += nPattern.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                        IsExtents += "false" + PublicDataVariables.Delimiters.RowDelimiter;

                    }
                }

                string strHatchHandles = "";
                short retCode = HatchEntityMultiple(DrawingId, Layers, Handles, Colors, Angles, Scales, PatternIds, IsExtents, UserId, ref strHatchHandles);
                List<string> tempHandles = Handles.Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray()).ToList();
                tempHandles.RemoveAt(tempHandles.Count - 1);
                HatchedSpaceHandles.AddRange(tempHandles);

                if (Array.FindLastIndex(spaceData, a => a["IsShared"] == true) != -1)
                {
                    Dictionary<string, dynamic> temp = new Dictionary<string, dynamic>();
                    temp.Add(OrgLevelName, "Shared Space");
                    temp.Add("OrgunitId", 0);
                    temp.Add("Area", SharedSpaceCommonArea);
                    temp.Add("HatchObj", SharedSpaceHatchObj);
                    legendDataArray.Add(temp);
                }
                if (Array.FindLastIndex(spaceData, a => a["SpaceCategoryId"] == 1) != -1)
                {
                    Dictionary<string, dynamic> temp = new Dictionary<string, dynamic>();
                    temp.Add(OrgLevelName, "04 - Vertical Space");
                    temp.Add("Area", VerticalCommonArea);
                    temp.Add("HatchObj", VerticalCommonAreaHatchObj);
                    legendDataArray.Add(temp);
                }
                if (Array.FindLastIndex(spaceData, a => a["SpaceCategoryId"] == 2) != -1)
                {
                    Dictionary<string, dynamic> temp = new Dictionary<string, dynamic>();
                    temp.Add(OrgLevelName, "03 - Floor Common");
                    temp.Add("Area", FloorCommonArea);
                    temp.Add("HatchObj", FloorCommonAreaHatchObj);
                    legendDataArray.Add(temp);
                }
                if (Array.FindLastIndex(spaceData, a => a["SpaceCategoryId"] == 3) != -1)
                {
                    Dictionary<string, dynamic> temp = new Dictionary<string, dynamic>();
                    temp.Add(OrgLevelName, "02 - Building Common");
                    temp.Add("Area", BuildingCommonArea);
                    temp.Add("HatchObj", BuildingCommonAreaHatchObj);
                    legendDataArray.Add(temp);
                }
                return 0;
            }
            else
                return 9;
        }

        private short HatchDistributionHandles(dynamic distributionMapData, dynamic[] orgdistributionSettingsBasedOnDrawingsData, List<Dictionary<string, dynamic>> legendDataArray, ref List<string> HatchedSpaceHandles, string DrawingId, string UserId, string OrgLevel, string OrgLevelName, bool IsHatch)
        {
            string Layers = "", Handles = "", Colors = "", Angles = "", Scales = "", PatternIds = "", IsExtents = "";
            for (int i = 0; i < distributionMapData.Count; i++)
            {
                var distributionData = distributionMapData[i];
                string LevelName = distributionData[OrgLevel];
                int index = Array.FindLastIndex<dynamic>(orgdistributionSettingsBasedOnDrawingsData, a => a[OrgLevel] == LevelName);
                if (index != -1)
                {
                    dynamic hatchObj = orgdistributionSettingsBasedOnDrawingsData[index];
                    switch (OrgLevel)
                    {
                        case "L2Name":
                            LevelName = distributionData["L1Name"] + "->" + LevelName;
                            break;
                        case "L3Name":
                            LevelName = distributionData["L1Name"] + "->" + distributionData["L2Name"] + "->" + LevelName;
                            break;
                        case "L4Name":
                            LevelName = distributionData["L1Name"] + "->" + distributionData["L2Name"] + "->" + distributionData["L3Name"] + "->" + LevelName;
                            break;
                        case "L5Name":
                            LevelName = distributionData["L1Name"] + "->" + distributionData["L2Name"] + "->" + distributionData["L3Name"] + "->" + distributionData["L4Name"] + "->" + LevelName;
                            break;
                    }
                    int legendDataArrayIndex = legendDataArray.FindLastIndex(a => a[OrgLevelName] == LevelName);

                    if (legendDataArrayIndex != -1)
                    {
                        legendDataArray[legendDataArrayIndex]["Area"] = (legendDataArray[legendDataArrayIndex]["Area"] + distributionData.Area);//.toFixed(2);
                    }
                    else
                    {
                        Dictionary<string, dynamic> temp = new Dictionary<string, dynamic>();
                        temp.Add(OrgLevelName, LevelName);
                        temp.Add("OrgunitId", distributionData["OrgUnitId"]);
                        temp.Add("Area", distributionData["Area"]);
                        temp.Add("HatchObj", hatchObj);
                        legendDataArray.Add(temp);
                    }


                    short nColorId = Convert.ToInt16(hatchObj.ColorId);
                    double dAngle = Convert.ToDouble(hatchObj.HatchAngle);
                    double dScale = Convert.ToDouble(hatchObj.HatchScale);
                    short nPattern = Convert.ToInt16(hatchObj.HatchPatternId);
                    string Handle = distributionData["Handle"];

                    Layers += "$Hatch" + PublicDataVariables.Delimiters.RowDelimiter;
                    Handles += Handle + PublicDataVariables.Delimiters.RowDelimiter;
                    Colors += nColorId.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                    Angles += dAngle.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                    if (nPattern == 11)
                    {
                        //dScale = 0.1; 
                        //nPattern = 5;
                    }
                    Scales += dScale.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                    PatternIds += nPattern.ToString() + PublicDataVariables.Delimiters.RowDelimiter;
                    IsExtents += "false" + PublicDataVariables.Delimiters.RowDelimiter;
                }
            }

            string strHatchHandles = "";
            short retCode;
            if (IsHatch)
                retCode = HatchEntityMultiple(DrawingId, Layers, Handles, Colors, Angles, Scales, PatternIds, IsExtents, UserId, ref strHatchHandles);
            List<string> tempHandles = Handles.Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray()).ToList();
            tempHandles.RemoveAt(tempHandles.Count - 1);
            HatchedSpaceHandles.AddRange(tempHandles);
            // HatchedSpaceHandles = Handles.Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray()).ToList();
            // HatchedSpaceHandles.RemoveAt(HatchedSpaceHandles.Count - 1);
            //HatchedSpaceHandles.Add(Handle);
            return 0;
        }

        private short HatchEntityMultiple(string DrawingId, string Layers, string Handles, string Colors, string Angles, string Scales, string PatternIds, string IsExtents, string UserId, ref string HatchEntityHandle)
        {
            try
            {
                string tempHandles = Handles;
                string tempLayers = Layers;
                string tempColors = Colors;
                string tempAngles = Angles;
                string tempScales = Scales;
                string tempPatternIds = PatternIds;
                string tempIsExtents = IsExtents;

                short retCode = 0;
                string tempHatchHandles = "";
                string[] handleArray = tempHandles.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);
                string[] layerArray = tempLayers.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);
                string[] angleArray = tempAngles.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);
                string[] scaleArray = tempScales.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);
                string[] patternArray = tempPatternIds.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);
                string[] extentsArray = tempIsExtents.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);
                string[] colorsArray = tempColors.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);

                while (tempHandles.Length > 0)
                {
                    string[] tempArray = handleArray.Take(20).ToArray();
                    string[] tempLayersArray = layerArray.Take(20).ToArray();
                    string[] tempAngleArray = angleArray.Take(20).ToArray();
                    string[] tempScaleArray = scaleArray.Take(20).ToArray();
                    string[] tempPatternArray = patternArray.Take(20).ToArray();
                    string[] tempExtentsArray = extentsArray.Take(20).ToArray();
                    string[] tempColorsArray = colorsArray.Take(20).ToArray();

                    string handlesToSend = "", layersToSend = "", anglesToSend = "", scalesToSend = "", patternsToSend = "", extentsToSend = "", colorsToSend = "";
                    for (int nIndex = 0; nIndex < tempArray.Length; nIndex++)
                    {
                        if (tempArray.ElementAt(nIndex) != "")
                        {
                            handlesToSend += tempArray.ElementAt(nIndex) + PublicDataVariables.Delimiters.RowDelimiter;
                            layersToSend += tempLayersArray.ElementAt(nIndex) + PublicDataVariables.Delimiters.RowDelimiter;
                            anglesToSend += tempAngleArray.ElementAt(nIndex) + PublicDataVariables.Delimiters.RowDelimiter;
                            scalesToSend += tempScaleArray.ElementAt(nIndex) + PublicDataVariables.Delimiters.RowDelimiter;
                            patternsToSend += tempPatternArray.ElementAt(nIndex) + PublicDataVariables.Delimiters.RowDelimiter;
                            extentsToSend += tempExtentsArray.ElementAt(nIndex) + PublicDataVariables.Delimiters.RowDelimiter;
                            colorsToSend += tempColorsArray.ElementAt(nIndex) + PublicDataVariables.Delimiters.RowDelimiter;

                        }
                    }
                    List<string> commandsList = new List<string> {
                            "HatchEntityMultiple" , layersToSend, handlesToSend,
                             colorsToSend, anglesToSend,
                             scalesToSend,patternsToSend,
                             extentsToSend
                    };

                    List<string> outList = new List<string>();
                    ProcessManager objPM;

                    if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                    {
                        retCode = objPM.executeCommand(commandsList, ref outList);
                        if (retCode != 0)
                            return retCode;
                        tempHatchHandles += outList[0];
                    }
                    else
                        return 3;

                    if (handlesToSend.Length < tempHandles.Length)
                    {
                        tempHandles = tempHandles.Substring(handlesToSend.Length, tempHandles.Length - handlesToSend.Length);
                        handleArray = tempHandles.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);

                        tempLayers = tempLayers.Substring(layersToSend.Length, tempLayers.Length - layersToSend.Length);
                        layerArray = tempLayers.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);

                        tempAngles = tempAngles.Substring(anglesToSend.Length, tempAngles.Length - anglesToSend.Length);
                        angleArray = tempAngles.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);

                        tempScales = tempScales.Substring(scalesToSend.Length, tempScales.Length - scalesToSend.Length);
                        scaleArray = tempScales.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);

                        tempPatternIds = tempPatternIds.Substring(patternsToSend.Length, tempPatternIds.Length - patternsToSend.Length);
                        patternArray = tempPatternIds.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);

                        tempIsExtents = tempIsExtents.Substring(extentsToSend.Length, tempIsExtents.Length - extentsToSend.Length);
                        extentsArray = tempIsExtents.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);

                        tempColors = tempColors.Substring(colorsToSend.Length, tempColors.Length - colorsToSend.Length);
                        colorsArray = tempColors.Split(new string[] { PublicDataVariables.Delimiters.RowDelimiter }, StringSplitOptions.None);

                    }
                    else
                    {
                        tempLayers = "";
                        tempHandles = "";
                        tempAngles = "";
                        tempScales = "";
                        tempPatternIds = "";
                        tempIsExtents = "";
                    }

                }
                HatchEntityHandle = tempHatchHandles;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        private short CreateLegend(string selectedOrgLevelName, string selectedOrgLevel, bool isOrgLevel, List<Dictionary<string, dynamic>> legendDataArray, List<Dictionary<string, dynamic>> empLegendDataArray, int CustomerId, string DrawingId, string UserId, string ModuleNo, string OrgLevelName, string OrgLevelNo, string AreaUnit, string GrossLayername, string SiteName, string BuildingName, string FloorName, double AreaRatio, double LegendX, double LegendY, ref string LegendHandles)
        {
            double dblLegendStartXCord, dblLegendStartYCord;
            double dblMaxX = 0, dblMaxY = 0, dblMinX = 0, dblMinY = 0;
            double dLegendTextSize = 3;
            double dTextSize = 3;
            double dLegentScale = 1;

            dLegendTextSize = dTextSize * dLegentScale * AreaRatio;
            string[] strGrossHandle = { };
            string ClosedEntityHandles = "", OpenEntityHandles = "", OtherEntityHandles = "";
            short nRetCode = GetAllPolylines(DrawingId, GrossLayername, ref ClosedEntityHandles, ref OpenEntityHandles, ref OtherEntityHandles, UserId);

            if (nRetCode == 0)
            {
                strGrossHandle = ClosedEntityHandles.Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray());
                nRetCode = GetEntityExtents(DrawingId, strGrossHandle[0], ref dblMinX, ref dblMinY, ref dblMaxX, ref dblMaxY, UserId);
                if (nRetCode == 0)
                {
                    if (nRetCode == 0)
                    {
                        if (LegendX != 0 && LegendY != 0)
                        {
                            dblMaxX = LegendX; dblMaxY = LegendY;
                            dblMaxX = dblMaxX + ((dLegendTextSize) + (8 * AreaRatio));
                            dblMaxY = dblMaxY - ((dLegendTextSize) + (3 * AreaRatio));
                        }
                        else
                        {
                            dblMaxX = dblMaxX + ((dLegendTextSize) + (30 * AreaRatio));
                            dblMaxY = dblMaxY - ((dLegendTextSize) + (3 * AreaRatio));
                        }

                        dblLegendStartXCord = dblMaxX;
                        dblLegendStartYCord = dblMaxY;
                        nRetCode = CreateLayer(DrawingId, "$LEGEND", 1, true, UserId);
                        if (nRetCode == 0)
                        {
                            //CreateDrawingDetailsLegend
                            bool isDistMap = true;
                            double dStartX, dStartY;
                            double dSpaceDataTextAngle = 0, dSpaceDataTextWidth = 1;
                            if (isDistMap)
                                dStartX = dblLegendStartXCord - (8 * AreaRatio);
                            else
                                dStartX = dblLegendStartXCord;
                            dStartY = dblLegendStartYCord;

                            string detailsText = "Site: " + SiteName + ", Building: " + BuildingName + ", Floor: " + FloorName;
                            double dSize = 2.5 * AreaRatio;
                            string strTextStyleName = "";
                            short nSpaceDataTextLegendStyleId = 7;
                            string EntityHandle = "";

                            GetFontStyles(DrawingId, UserId, ref strTextStyleName);
                            nRetCode = CreateText(DrawingId, "$LEGEND", 7, dStartX, dStartY, dSpaceDataTextAngle, dSize,
                                dSpaceDataTextWidth, detailsText, strTextStyleName, nSpaceDataTextLegendStyleId, ref EntityHandle, UserId);
                            if (nRetCode == 0)
                            {
                                LegendHandles += EntityHandle + PublicDataVariables.Delimiters.RowDelimiter;
                                dStartY = dStartY - (dSize + (2 * AreaRatio));
                                nRetCode = CreateDistributionLegend(selectedOrgLevelName, selectedOrgLevel, isOrgLevel, legendDataArray, empLegendDataArray, CustomerId, DrawingId,
                                    UserId, ModuleNo, OrgLevelName, OrgLevelNo, AreaUnit, strTextStyleName, nSpaceDataTextLegendStyleId, dSpaceDataTextAngle,
                                    dSpaceDataTextWidth, dLegendTextSize, AreaRatio, dblLegendStartXCord, dStartY, ref LegendHandles);
                                return nRetCode;
                            }
                        }
                    }
                }
            }
            return nRetCode;
        }
        private short CreateDistributionLegend(string selectedOrgLevelName, string selectedOrgLevel, bool isOrgLevel, List<Dictionary<string, dynamic>> legendDataArray, List<Dictionary<string, dynamic>> empLegendDataArray, int CustomerId, string DrawingId, string UserId, string ModuleNo, string OrgLevelName, string OrgLevelNo, string AreaUnit, string strTextStyleName, short nSpaceDataTextLegendStyleId, double dSpaceDataTextAngle, double dSpaceDataTextWidth, double dLegendTextSize, double AreaRatio, double dblLegendStartXCord, double dStartY, ref string LegendHandles)
        {
            string LegendLineHandles = "";
            double dblX = dblLegendStartXCord;
            double dblY = dStartY;

            double HL1StartX = dblX - (8 * AreaRatio);
            double HL1StartY = dblY + (4 * AreaRatio);
            string[] strTextHandle = { };
            double dDistRectWidth = dLegendTextSize * 2;//g_intDistRectWidth * g_dblDwgRatio+(g_intLegendTextSize/2)
            double dDistRectHeight = dLegendTextSize * 2;//g_intDistRectHeight * g_dblDwgRatio+(g_intLegendTextSize/2)

            double dTextMaxX = 0;
            double HL2StartY = 0, VL2StartX = 0;

            string TextHandle = "", TextHandle2 = "";
            short nRetCode = CreateText(DrawingId, "$LEGEND", 7, dblX, dblY, dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                                                          dSpaceDataTextWidth, "Hatch", strTextStyleName, 8, ref TextHandle, UserId);
            if (nRetCode == 0)
            {
                LegendHandles += TextHandle + PublicDataVariables.Delimiters.RowDelimiter;
                double MinX = 0, MinY = 0, MaxX = 0, MaxY = 0;
                nRetCode = GetEntityExtents(DrawingId, TextHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                if (nRetCode == 0)
                {
                    nRetCode = CreateText(DrawingId, "$LEGEND", 7, dblX, MinY - (1 * AreaRatio), dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                                                                        dSpaceDataTextWidth, "Pattern", strTextStyleName, 2, ref TextHandle2, UserId);
                    if (nRetCode == 0)
                    {
                        LegendHandles += TextHandle2 + PublicDataVariables.Delimiters.RowDelimiter;
                        double rtnTextMaxX = 0, VL1EndY = 0, rtnHL2StartY = 0, rtnVL2StartX = 0, VL3StartX = 0;

                        nRetCode = GetDistributionByName(false, DrawingId, UserId, AreaRatio, dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth,
                        OrgLevelName, strTextStyleName, nSpaceDataTextLegendStyleId, legendDataArray,
                        AreaUnit, dblX, dDistRectHeight, dblY, dTextMaxX, HL2StartY,
                        dDistRectWidth, HL1StartX, VL2StartX, ref rtnTextMaxX, ref VL1EndY, ref rtnHL2StartY, ref rtnVL2StartX, ref VL3StartX, ref LegendHandles);
                        if (nRetCode != 0)
                        {
                            DeleteLayer(DrawingId, "$LEGEND", UserId);
                            return nRetCode;
                        }
                        else
                        {
                            double HL1EndX = rtnTextMaxX + (2 * AreaRatio);
                            CreateLegendLines(DrawingId, UserId, HL1StartX, HL1StartY, HL1EndX, HL1StartY, ref LegendLineHandles, ref LegendHandles); //HL1
                            CreateLegendLines(DrawingId, UserId, HL1StartX, HL1StartY, HL1StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);//VL1
                            CreateLegendLines(DrawingId, UserId, HL1StartX, rtnHL2StartY, HL1EndX, rtnHL2StartY, ref LegendLineHandles, ref LegendHandles);//HL2
                            CreateLegendLines(DrawingId, UserId, HL1StartX, VL1EndY, HL1EndX, VL1EndY, ref LegendLineHandles, ref LegendHandles);//HL3
                            CreateLegendLines(DrawingId, UserId, rtnVL2StartX, HL1StartY, rtnVL2StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);//VL2
                            CreateLegendLines(DrawingId, UserId, VL3StartX, HL1StartY, VL3StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);//VL3
                            CreateLegendLines(DrawingId, UserId, HL1EndX, HL1StartY, HL1EndX, VL1EndY, ref LegendLineHandles, ref LegendHandles);//VL4

                            int categoryId = 0, addtlDataFieldCategoryId = 7;
                            switch (ModuleNo)
                            {
                                case "3":
                                    categoryId = 1;
                                    addtlDataFieldCategoryId = 7;
                                    break;
                                case "5":
                                    categoryId = 17;
                                    addtlDataFieldCategoryId = 8;
                                    break;
                                case "6": // Telecom
                                    categoryId = 16;
                                    break;
                                case "7": // Assets
                                    categoryId = 13;
                                    break;
                                case "8": // Furniture
                                    categoryId = 15;
                                    break;
                                case "12": //CAI 
                                    categoryId = 2;
                                    break;
                                case "14"://Scheduling 
                                    categoryId = 29;
                                    break;
                                case "17": // Electrical
                                    categoryId = 18;
                                    break;
                                case "18": // Fire and Safety
                                    categoryId = 19;
                                    break;
                                case "24": // Security Assets
                                    categoryId = 33;
                                    break;
                                case "25": // Mechanical
                                    categoryId = 21;
                                    break;
                                case "26": // Plumbing
                                    categoryId = 23;
                                    break;
                                case "27": // Medical Gas
                                    categoryId = 25;
                                    break;
                            }

                            BaseClassInput baseInp = new BaseClassInput();
                            baseInp.CustomerId = CustomerId;
                            baseInp.UserId = Convert.ToInt32(UserId);
                            baseInp.TimeOffset = 0;
                            baseInp.RowsPerPage = 100;
                            var Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"" + categoryId.ToString() + "\"},{\"ReportFieldId\":24,\"Value\":\"" + addtlDataFieldCategoryId.ToString() + "\"}]}";
                            DisplaySettingInput displaySettingInput = JsonConvert.DeserializeObject<DisplaySettingInput>(Input);
                            CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                            objCustomApiReturn = new CommonModel(baseInp).ApplicationFormItem.Extented.GetDisplaySettingData(displaySettingInput);
                            List<DisplaySettingsReturn> displaySettingData = objCustomApiReturn.DisplaySettingsData;

                            if (ModuleNo == "5")
                            {
                                //GetDisplaySettingsData(function(spcaeDisplaySettings);
                                if (isOrgLevel)
                                {
                                    double empStartX = HL1EndX + (dLegendTextSize) + (6 * AreaRatio);
                                    double empStartY = dblY;

                                    Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + OrgLevelNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingId + "\"}]}";
                                    ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
                                    DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
                                    objDefaultApiReturn = new EmployeeModel(baseInp).EmployeeDrawingItem.GetOrgUnitOccupancyDistributionMapLegendData(applnInp);

                                    dynamic[] empOrgUnitOccupancyDistributionMapLegendData = JsonConvert.DeserializeObject<dynamic[]>(objDefaultApiReturn.FieldBinderData);
                                    if (empOrgUnitOccupancyDistributionMapLegendData.Length != 0)
                                    {
                                        double returnTextMaxX = 0;
                                        dynamic[] DistributionMapLegendData = empOrgUnitOccupancyDistributionMapLegendData;//.GetRange(0, empOrgUnitOccupancyDistributionMapLegendData.Count);
                                        nRetCode = GetEmployeeLegendData(legendDataArray, empLegendDataArray, DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId,
                                            dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth, empStartX, empStartY, dDistRectHeight, AreaRatio, DistributionMapLegendData, "Occupied", false, ref rtnTextMaxX, ref LegendHandles);
                                        if (nRetCode == 0)
                                        {
                                            empStartX = rtnTextMaxX + (dLegendTextSize) + (6 * AreaRatio);
                                            var VL5StartX = rtnTextMaxX + (2 * AreaRatio);
                                            dynamic DistributionMapLegendDataFreeSeats = empOrgUnitOccupancyDistributionMapLegendData;//.GetRange(0, empOrgUnitOccupancyDistributionMapLegendData.Count);
                                            nRetCode = GetEmployeeLegendData(legendDataArray, empLegendDataArray, DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId,
                                            dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth, empStartX, empStartY, dDistRectHeight, AreaRatio, DistributionMapLegendDataFreeSeats, "Free", false, ref returnTextMaxX, ref LegendHandles);
                                            if (nRetCode == 0)
                                            {
                                                var HL1EndXNew = returnTextMaxX + (2 * AreaRatio);
                                                var VL6StartX = returnTextMaxX + (2 * AreaRatio);

                                                CreateLegendLines(DrawingId, UserId, HL1EndX, HL1StartY, HL1EndXNew, HL1StartY, ref LegendLineHandles, ref LegendHandles);//HL1New
                                                CreateLegendLines(DrawingId, UserId, HL1EndX, rtnHL2StartY, HL1EndXNew, rtnHL2StartY, ref LegendLineHandles, ref LegendHandles);//HL2New
                                                CreateLegendLines(DrawingId, UserId, HL1EndX, VL1EndY, HL1EndXNew, VL1EndY, ref LegendLineHandles, ref LegendHandles);//HL3New
                                                CreateLegendLines(DrawingId, UserId, VL5StartX, HL1StartY, VL5StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);//VL5
                                                CreateLegendLines(DrawingId, UserId, VL6StartX, HL1StartY, VL6StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);//VL6
                                                double startYSp = VL1EndY - dDistRectHeight - (2 * AreaRatio);
                                                nRetCode = GetSpStandardOrgLevelEmpDetails(displaySettingData, legendDataArray, selectedOrgLevelName, strTextStyleName, nSpaceDataTextLegendStyleId,
                                                    selectedOrgLevel, dSpaceDataTextWidth, dSpaceDataTextAngle, dLegendTextSize, empLegendDataArray, DrawingId, UserId, OrgLevelNo, CustomerId, AreaRatio, dblX, startYSp, dDistRectHeight, ref LegendHandles);
                                                return 0;
                                            }
                                        }
                                    }
                                    else
                                        return 0;
                                }
                                else
                                {
                                    nRetCode = CreateDisplayOrderLegend(DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId, AreaRatio, dSpaceDataTextAngle, dLegendTextSize,
                                    dSpaceDataTextWidth, displaySettingData, HL1StartX, VL1EndY, ref LegendHandles);
                                    return nRetCode;
                                }
                            }
                            else
                            {
                                nRetCode = CreateDisplayOrderLegend(DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId, AreaRatio, dSpaceDataTextAngle, dLegendTextSize,
                                    dSpaceDataTextWidth, displaySettingData, HL1StartX, VL1EndY, ref LegendHandles);

                                return nRetCode;
                            }
                        }
                    }
                }
            }
            return nRetCode;
        }

        private short GetOrgUnitSpaceStandardDistributionMapLegendDataModified(string selectedOrgLevel, dynamic distData, ref List<Dictionary<string, dynamic>> empLegendDataArray)
        {
            empLegendDataArray.Clear();
            foreach (dynamic dataItem in distData)
            {
                if (dataItem[selectedOrgLevel] != null)
                {
                    Dictionary<string, dynamic> temp = new Dictionary<string, dynamic>();
                    temp.Add("OrglevelName", dataItem["Level Name"]);
                    temp.Add("SpaceStandardName", dataItem["SpaceStandardName"]);
                    temp.Add("L1Name", dataItem["L1Name"]);
                    temp.Add("OccupiedSeats", dataItem["OccupiedSeats"]);
                    temp.Add("FreeSeats", dataItem["FreeSeats"]);
                    empLegendDataArray.Add(temp);
                }
            }
            return 0;
        }
        private short CreateOrgLevlSpStandardData(string DrawingId, string UserId, string selectedOrgLevelName, string strTextStyleName, short nSpaceDataTextLegendStyleId, double AreaRatio, double dSpaceDataTextWidth, double empSpStartX, double startY, double dSpaceDataTextAngle, double dLegendTextSize, dynamic distributionMapLegendData, double dDistRectHeight, double TextMaxX, ref double rtnTextMaxX, ref List<double> rtnHlYposition, ref double HL2StartY, ref double VL1EndY, ref string LegendHandles)
        {
            string OrgLevelTextHandle = "";

            short nRetCode = CreateText(DrawingId, "$LEGEND", 7, empSpStartX, startY - (dDistRectHeight / 3), dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                dSpaceDataTextWidth, selectedOrgLevelName, strTextStyleName, nSpaceDataTextLegendStyleId, ref OrgLevelTextHandle, UserId);
            if (nRetCode == 0)
            {
                LegendHandles += OrgLevelTextHandle + PublicDataVariables.Delimiters.RowDelimiter;
                double MinX = 0, MinY = 0, MaxX = 0, MaxY = 0;
                nRetCode = GetEntityExtents(DrawingId, OrgLevelTextHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                if (nRetCode == 0)
                {
                    if (TextMaxX == 0)
                        TextMaxX = MaxX;
                    else if (MaxX > TextMaxX)
                        TextMaxX = MaxX;
                    double startDataX = empSpStartX;//+ (contextObj.intDistRectHeight + (4 * contextObj.commonServices.g_dblDwgRatio));
                    double dataStartY = startY;
                    dataStartY = dataStartY - dDistRectHeight - (2 * AreaRatio);
                    HL2StartY = dataStartY;
                    dataStartY = dataStartY - dDistRectHeight - (1 * AreaRatio);
                    double startDataY = dataStartY - (dDistRectHeight / 3);
                    string previousOrglavelName = distributionMapLegendData[0]["L1Name"];
                    //List<double> hlYposition = new List<double>();
                    nRetCode = CreateEmpOrglevelLegend(DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId, dDistRectHeight, AreaRatio, startDataX, ref startDataY, dSpaceDataTextWidth, dSpaceDataTextAngle, dLegendTextSize, distributionMapLegendData, previousOrglavelName, ref rtnHlYposition, ref TextMaxX, ref rtnTextMaxX, ref VL1EndY, ref LegendHandles);

                    rtnTextMaxX = TextMaxX;
                    return nRetCode;
                }
            }
            return nRetCode;
        }
        private short CreateEmpOrglevelLegend(string DrawingId, string UserId, string strTextStyleName, short nSpaceDataTextLegendStyleId, double dDistRectHeight, double AreaRatio, double startDataX, ref double startDataY, double dSpaceDataTextWidth, double dSpaceDataTextAngle, double dLegendTextSize, dynamic distributionMapLegendData, string previousOrglavelName, ref List<double> hlYposition, ref double TextMaxX, ref double rtnTextMaxX, ref double VL1EndY, ref string LegendHandles)
        {
            short nRetCode = 0;
            for (int i = 0; i < distributionMapLegendData.Count; i++)
            {
                dynamic distributionMapLegendDataitem = distributionMapLegendData[i];
                string displaytextName = distributionMapLegendDataitem["OrglevelName"];
                if (previousOrglavelName != distributionMapLegendDataitem["L1Name"].ToString())
                {
                    hlYposition.Add(startDataY + dDistRectHeight - (2 * AreaRatio));
                }
                if (displaytextName == null)
                {
                    startDataY = startDataY - dDistRectHeight - (2 * AreaRatio);
                    previousOrglavelName = distributionMapLegendDataitem["L1Name"];
                }
                else
                {
                    string OrgLevelTextHandle = "";
                    nRetCode = CreateText(DrawingId, "$LEGEND", 7, startDataX, startDataY, dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                        dSpaceDataTextWidth, displaytextName, strTextStyleName, nSpaceDataTextLegendStyleId, ref OrgLevelTextHandle, UserId);
                    {
                        if (nRetCode == 0)
                        {
                            LegendHandles += OrgLevelTextHandle + PublicDataVariables.Delimiters.RowDelimiter;
                            double MinX = 0, MinY = 0, MaxX = 0, MaxY = 0;
                            startDataY = startDataY - dDistRectHeight - (2 * AreaRatio);
                            nRetCode = GetEntityExtents(DrawingId, OrgLevelTextHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                            if (nRetCode == 0)
                            {
                                if (MaxX > TextMaxX)
                                    TextMaxX = MaxX;
                                previousOrglavelName = distributionMapLegendDataitem["L1Name"];
                            }
                        }
                    }
                }

            }
            rtnTextMaxX = TextMaxX;
            VL1EndY = startDataY;
            return nRetCode;
        }
        private short CreateOrgLevlSpStandardDataNameInLegend(string DrawingId, string UserId, string strTextStyleName, short nSpaceDataTextLegendStyleId, double dDistRectHeight, double AreaRatio, double dSpaceDataTextWidth, double dSpaceDataTextAngle, double dLegendTextSize, List<Dictionary<string, dynamic>> legenddata, double startX, double startY, ref double rtnTextMax, ref string LegendHandles)
        {
            double TextMaxX = 0;
            string OrgLevelTextHandle = "";
            short nRetCode = CreateText(DrawingId, "$LEGEND", 7, startX, startY - (dDistRectHeight / 3), dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                dSpaceDataTextWidth, "Space Standard", strTextStyleName, nSpaceDataTextLegendStyleId, ref OrgLevelTextHandle, UserId);
            if (nRetCode == 0)
            {
                LegendHandles += OrgLevelTextHandle + PublicDataVariables.Delimiters.RowDelimiter;
                double MinX = 0, MinY = 0, MaxX = 0, MaxY = 0;
                nRetCode = GetEntityExtents(DrawingId, OrgLevelTextHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                if (nRetCode == 0)
                {
                    if (TextMaxX == 0)
                        TextMaxX = MaxX;
                    else if (MaxX > TextMaxX)
                        TextMaxX = MaxX;
                    double startDataX = startX;
                    startY = startY - dDistRectHeight - (2 * AreaRatio);
                    startY = startY - dDistRectHeight - (1 * AreaRatio);
                    double startDataY = startY;
                    rtnTextMax = TextMaxX;
                    nRetCode = CreateOrgLevlSpStandardDatavaluesInLegend(DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId,
                        dDistRectHeight, AreaRatio, dSpaceDataTextWidth, dSpaceDataTextAngle, dLegendTextSize,
                        startDataX, startDataY, legenddata, ref rtnTextMax, ref LegendHandles);
                    return 0;
                }
            }
            return nRetCode;
        }
        private short CreateOrgLevlSpStandardDatavaluesInLegend(string DrawingId, string UserId, string strTextStyleName, short nSpaceDataTextLegendStyleId, double dDistRectHeight, double AreaRatio, double dSpaceDataTextWidth, double dSpaceDataTextAngle, double dLegendTextSize, double empStartX, double empStartY, List<Dictionary<string, dynamic>> legendData, ref double TextMaxX, ref string LegendHandles)
        {
            short nRetCode = 0;
            for (int i = 0; i < legendData.Count; i++)
            {
                dynamic legentDataItem = legendData[i];
                var spStandardName = legentDataItem["SpaceStandardName"];
                if (spStandardName == null)
                    spStandardName = "-";
                string itemTextHandle = "";
                nRetCode = CreateText(DrawingId, "$LEGEND", 7, empStartX, empStartY - (dDistRectHeight / 3), dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                dSpaceDataTextWidth, spStandardName.ToString(), strTextStyleName, nSpaceDataTextLegendStyleId, ref itemTextHandle, UserId);
                if (nRetCode == 0)
                {
                    LegendHandles += itemTextHandle + PublicDataVariables.Delimiters.RowDelimiter;
                    double MinX = 0, MinY = 0, MaxX = 0, MaxY = 0;
                    nRetCode = GetEntityExtents(DrawingId, itemTextHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                    if (nRetCode == 0)
                    {
                        if (MaxX > TextMaxX)
                        {
                            TextMaxX = MaxX;
                        }
                        empStartY = empStartY - dDistRectHeight - (2 * AreaRatio);
                    }

                }
            }
            return 0;
        }
        private short GetEmployeeLegendData(List<Dictionary<string, dynamic>> legendDataArray, List<Dictionary<string, dynamic>> empLegendDataArray, string DrawingId, string UserId, string strTextStyleName, short nSpaceDataTextLegendStyleId, double dSpaceDataTextAngle, double dLegendTextSize, double dSpaceDataTextWidth, double empStartX, double empStartY, double dDistRectHeight, double AreaRatio, dynamic[] DistributionMapLegendData, string category, bool isSpStandardLegend, ref double rtnTextMaxX, ref string LegendHandles)
        {

            dynamic[] empOrgUnitOccupancyDistributionMapLegendData = DistributionMapLegendData;
            double TextMaxX = 0;
            string dataVlaue = "";
            dynamic legentDataForOccupiedSeats;
            string textHandle = "";
            short nRetCode = CreateText(DrawingId, "$LEGEND", 7, empStartX, empStartY, dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                dSpaceDataTextWidth, category, strTextStyleName, 8, ref textHandle, UserId);
            if (nRetCode == 0)
            {
                LegendHandles += textHandle + PublicDataVariables.Delimiters.RowDelimiter;
                double MinX = 0, MinY = 0, MaxX = 0, MaxY = 0;
                nRetCode = GetEntityExtents(DrawingId, textHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                if (nRetCode == 0)
                {
                    TextMaxX = MaxX;
                    empStartY = empStartY - dDistRectHeight - (2 * AreaRatio);
                    empStartY = empStartY - dDistRectHeight - (2 * AreaRatio);
                    double empStartYData = empStartY;
                    string textHandle2 = "";
                    CreateText(DrawingId, "$LEGEND", 7, empStartX, MinY - (1 * AreaRatio), dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                                dSpaceDataTextWidth, "Seats", strTextStyleName, 2, ref textHandle2, UserId);
                    if (nRetCode == 0)
                    {
                        LegendHandles += textHandle2 + PublicDataVariables.Delimiters.RowDelimiter;
                        if (category == "Occupied")
                            dataVlaue = "OccupiedSeats";
                        else
                            dataVlaue = "FreeSeats";
                        if (isSpStandardLegend)
                        {
                            empStartYData = empStartYData + (dDistRectHeight / 3);
                            legentDataForOccupiedSeats = empLegendDataArray.GetRange(0, empLegendDataArray.Count);
                            rtnTextMaxX = TextMaxX;
                            nRetCode = CreateEmpDistributionLegend(DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId, dDistRectHeight, AreaRatio, dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth,
                                empStartX, empStartYData, dataVlaue, legentDataForOccupiedSeats, null, ref rtnTextMaxX, ref LegendHandles);
                            if (nRetCode == 0)
                            {
                                return 0;
                            }
                        }
                        else
                        {
                            legentDataForOccupiedSeats = legendDataArray.GetRange(0, legendDataArray.Count);
                            rtnTextMaxX = TextMaxX;
                            nRetCode = CreateEmpDistributionLegend(DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId, dDistRectHeight, AreaRatio, dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth,
                                empStartX, empStartYData, dataVlaue, legentDataForOccupiedSeats, empOrgUnitOccupancyDistributionMapLegendData, ref rtnTextMaxX, ref LegendHandles);
                            if (nRetCode == 0)
                            {
                                return 0;
                            }
                        }
                    }
                }
            }
            return nRetCode;
        }

        private short CreateEmpDistributionLegend(string DrawingId, string UserId, string strTextStyleName, short nSpaceDataTextLegendStyleId, double dDistRectHeight, double AreaRatio, double dSpaceDataTextAngle, double dLegendTextSize, double dSpaceDataTextWidth, double empStartX, double empStartY, string dataVlaue, dynamic legentDataForOccupiedSeats, dynamic[] empOrgUnitOccupancyDistributionMapLegendData, ref double TextMaxX, ref string LegendHandles)
        {
            dynamic occupiedSeats = null;
            for (int i = 0; i < legentDataForOccupiedSeats.Count; i++)
            {
                dynamic legentDataItem = legentDataForOccupiedSeats[i];
                if (empOrgUnitOccupancyDistributionMapLegendData != null)
                {
                    if (legentDataItem.Count > 3)//["OrgunitId"] 
                    {
                        int index = Array.FindLastIndex<dynamic>(empOrgUnitOccupancyDistributionMapLegendData, e1 => e1["OrgUnitId"] == legentDataItem["OrgunitId"]);
                        if (index != -1)
                            occupiedSeats = empOrgUnitOccupancyDistributionMapLegendData[index][dataVlaue];
                    }
                    else
                    {                       
                        occupiedSeats = null;
                    }
                }
                else
                {
                    occupiedSeats = legentDataItem[dataVlaue];
                }
                if (occupiedSeats == null)
                    occupiedSeats = "-";
                string orgLevelItemTextAreaHandle = "";
                string textValue = occupiedSeats;
                short nRetCode = CreateText(DrawingId, "$LEGEND", 7, empStartX, empStartY - (dDistRectHeight / 3), dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                    dSpaceDataTextWidth, textValue, strTextStyleName, 8, ref orgLevelItemTextAreaHandle, UserId);
                if (nRetCode == 0)
                {
                    LegendHandles += orgLevelItemTextAreaHandle + PublicDataVariables.Delimiters.RowDelimiter;
                    double MinX = 0, MinY = 0, MaxX = 0, MaxY = 0;
                    nRetCode = GetEntityExtents(DrawingId, orgLevelItemTextAreaHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                    if (nRetCode == 0)
                    {
                        if (MaxX > TextMaxX)
                        {
                            TextMaxX = MaxX;
                        }
                        empStartY = empStartY - dDistRectHeight - (2 * AreaRatio);
                    }
                }
            }
            return 0;
        }

        private short DynamicHLLines(string DrawingId, string UserId, List<double> hlLinesPosArray, double HL1StartX, double HL1EndXNew, ref string LegendHandles)
        {
            for (int i = 0; i < hlLinesPosArray.Count; i++)
            {
                double hlLineYpos = hlLinesPosArray[i];
                string LegendLineHandles = "";
                CreateLegendLines(DrawingId, UserId, HL1StartX, hlLineYpos, HL1EndXNew, hlLineYpos, ref LegendLineHandles, ref LegendHandles);
            }
            return 0;
        }

        private short GetSpStandardOrgLevelEmpDetails(List<DisplaySettingsReturn> displaySettingData, List<Dictionary<string, dynamic>> legendDataArray, string selectedOrgLevelName, string strTextStyleName, short nSpaceDataTextLegendStyleId, string selectedOrgLevel, double dSpaceDataTextWidth, double dSpaceDataTextAngle, double dLegendTextSize, List<Dictionary<string, dynamic>> empLegendDataArray, string DrawingId, string UserId, string OrgLevelNo, int CustomerId, double AreaRatio, double startX, double startY, double dDistRectHeight, ref string LegendHandles)
        {
            BaseClassInput baseInp = new BaseClassInput();
            baseInp.CustomerId = CustomerId;
            baseInp.UserId = Convert.ToInt32(UserId);
            baseInp.TimeOffset = 0;
            baseInp.RowsPerPage = 100;
            double HL1StartX = startX - (8 * AreaRatio);
            double HL1StartY = startY + (4 * AreaRatio);
            double TextMaxX = 0;
            short nRetCode = 0;

            var Input = "{ListReportFieldIdValues:[{\"ReportFieldId\":289,\"Value\":\"" + OrgLevelNo + "\"},{\"ReportFieldId\":781,\"Value\":\"" + DrawingId + "\"},{\"ReportFieldId\":286,\"Value\":\"0\"}]}";
            ApplicationFormInput applnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(Input);
            DefaultApiReturn objDefaultApiReturn = new DefaultApiReturn();
            objDefaultApiReturn = new EmployeeModel(baseInp).EmployeeDrawingItem.GetOrgUnitSpaceStandardDistributionMapLegendData(applnInp);

            dynamic empOrgUnitSpStandarsLegendData = JsonConvert.DeserializeObject(objDefaultApiReturn.FieldBinderData);
            if (empOrgUnitSpStandarsLegendData.Count > 0)
            {
                dynamic distributionMapLegendData = empOrgUnitSpStandarsLegendData;//.GetRange(0, empOrgUnitSpStandarsLegendData.Count);
                GetOrgUnitSpaceStandardDistributionMapLegendDataModified(selectedOrgLevel, distributionMapLegendData, ref empLegendDataArray);

                if (empLegendDataArray.Count > 0)
                {
                    double empSpStartX = startX;
                    double rtnTextMaxX = 0, HL2StartY = 0, VL1EndY = 0;
                    List<double> rtnHlYpositionArray = new List<double>();
                    nRetCode = CreateOrgLevlSpStandardData(DrawingId, UserId, selectedOrgLevelName, strTextStyleName, nSpaceDataTextLegendStyleId, AreaRatio, dSpaceDataTextWidth,
                        empSpStartX, startY, dSpaceDataTextAngle, dLegendTextSize, empLegendDataArray, dDistRectHeight, TextMaxX, ref rtnTextMaxX, ref rtnHlYpositionArray, ref HL2StartY, ref VL1EndY, ref LegendHandles);

                    if (nRetCode == 0)
                    {
                        List<Dictionary<string, dynamic>> legenddata = empLegendDataArray;
                        double VL2StartX = rtnTextMaxX + (dLegendTextSize) + (2 * AreaRatio);
                        empSpStartX = rtnTextMaxX + (dLegendTextSize) + (6 * AreaRatio);

                        nRetCode = CreateOrgLevlSpStandardDataNameInLegend(DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId, dDistRectHeight, AreaRatio,
                            dSpaceDataTextWidth, dSpaceDataTextAngle, dLegendTextSize, legenddata, empSpStartX, startY, ref rtnTextMaxX, ref LegendHandles);
                        if (nRetCode == 0)
                        {
                            double VL3StartX = rtnTextMaxX + (dLegendTextSize) + (2 * AreaRatio);
                            empSpStartX = VL3StartX + (dLegendTextSize) + (6 * AreaRatio);
                            startY = startY - (dDistRectHeight / 3);
                            nRetCode = GetEmployeeLegendData(legendDataArray, empLegendDataArray, DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId,
                                dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth, empSpStartX, startY, dDistRectHeight, AreaRatio, null, "Occupied", true, ref rtnTextMaxX, ref LegendHandles);
                            if (nRetCode == 0)
                            {
                                empSpStartX = rtnTextMaxX + (dLegendTextSize) + (6 * AreaRatio);
                                var VL4StartX = rtnTextMaxX + (2 * AreaRatio);
                                GetEmployeeLegendData(legendDataArray, empLegendDataArray, DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId,
                                    dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth, empSpStartX, startY, dDistRectHeight, AreaRatio, null, "Free", true, ref rtnTextMaxX, ref LegendHandles);
                                double HL1EndXNew = rtnTextMaxX + (2 * AreaRatio);
                                double VL5StartX = rtnTextMaxX + (2 * AreaRatio);
                                string LegendLineHandles = "";
                                CreateLegendLines(DrawingId, UserId, HL1StartX, HL1StartY, HL1EndXNew, HL1StartY, ref LegendLineHandles, ref LegendHandles);
                                CreateLegendLines(DrawingId, UserId, HL1StartX, HL2StartY, HL1EndXNew, HL2StartY, ref LegendLineHandles, ref LegendHandles);
                                CreateLegendLines(DrawingId, UserId, HL1StartX, VL1EndY, HL1EndXNew, VL1EndY, ref LegendLineHandles, ref LegendHandles);

                                CreateLegendLines(DrawingId, UserId, HL1StartX, HL1StartY, HL1StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);
                                CreateLegendLines(DrawingId, UserId, VL2StartX, HL1StartY, VL2StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);
                                CreateLegendLines(DrawingId, UserId, VL3StartX, HL1StartY, VL3StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);
                                CreateLegendLines(DrawingId, UserId, VL4StartX, HL1StartY, VL4StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);
                                CreateLegendLines(DrawingId, UserId, VL5StartX, HL1StartY, VL5StartX, VL1EndY, ref LegendLineHandles, ref LegendHandles);
                                if (rtnHlYpositionArray.Count > 0)
                                {
                                    DynamicHLLines(DrawingId, UserId, rtnHlYpositionArray, HL1StartX, HL1EndXNew, ref LegendHandles);
                                    CreateDisplayOrderLegend(DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId, AreaRatio, dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth, displaySettingData, HL1StartX, VL1EndY, ref LegendHandles);
                                    return 0;
                                }
                                else
                                {
                                    CreateDisplayOrderLegend(DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId, AreaRatio, dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth, displaySettingData, HL1StartX, VL1EndY, ref LegendHandles);
                                    return 0;
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                CreateDisplayOrderLegend(DrawingId, UserId, strTextStyleName, nSpaceDataTextLegendStyleId, AreaRatio, dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth, displaySettingData, HL1StartX, HL1StartY, ref LegendHandles);
                return 0;
            }
            return nRetCode;
        }

        private short CreateDisplayOrderLegend(string DrawingId, string UserId, string strTextStyleName, short nSpaceDataTextLegendStyleId, double AreaRatio, double dSpaceDataTextAngle, double dLegendTextSize, double dSpaceDataTextWidth, List<DisplaySettingsReturn> dispSettingsData, double xPos, double yPos, ref string LegendHandles)
        {
            string formatedText = "";
            double startX = xPos;
            double startY = yPos - (6 * AreaRatio);
            double dSize = dLegendTextSize;
            short nRetCode = 0;
            string EntityHandle = "";
            foreach (DisplaySettingsReturn dispSettingsItem in dispSettingsData)
            {
                if (dispSettingsItem.ShowinDrawing)
                {
                    string textContent = dispSettingsItem.FieldName;
                    formatedText += "\\f|b0|l0|c0|p18;\\C1;\\H" + AreaRatio * 3 + ";" + textContent + "\\n";
                }
            }
            if (formatedText != "")
            {
                nRetCode = CreateText(DrawingId, "$LEGEND", 7, startX, startY, dSpaceDataTextAngle, dSize, dSpaceDataTextWidth, "Space Data Display Order", strTextStyleName, nSpaceDataTextLegendStyleId, ref EntityHandle, UserId);
                if (nRetCode == 0)
                {
                    LegendHandles += EntityHandle + PublicDataVariables.Delimiters.RowDelimiter;
                    string formatedTextFinal = "{" + formatedText + "}";
                    startX = startX + dSize;
                    startY = startY - (dSize + (2 * AreaRatio));
                    nRetCode = CreateMultilineText(DrawingId, "$LEGEND", 1, startX, startY, 0, AreaRatio * 1,
                        0, 1, formatedTextFinal, "Standard", 0, ref EntityHandle, UserId);
                    LegendHandles += EntityHandle + PublicDataVariables.Delimiters.RowDelimiter;
                }
            }

            return nRetCode;
        }
        private void CreateLegendLines(string DrawingId, string UserId, double startX, double startY, double endX, double endY, ref string LegendLineHandles, ref string LegendHandles)
        {
            string tempCoords = startX + PublicDataVariables.Delimiters.ColumnDelimiter + startY + PublicDataVariables.Delimiters.RowDelimiter + endX + PublicDataVariables.Delimiters.ColumnDelimiter + endY + PublicDataVariables.Delimiters.RowDelimiter;

            string LineHandle = "";
            CreateLine(DrawingId, "$LEGEND", 255, startX, startY, endX, endY, ref LineHandle, UserId);
            LegendLineHandles += LineHandle + PublicDataVariables.Delimiters.RowDelimiter;
            LegendHandles += LineHandle + PublicDataVariables.Delimiters.RowDelimiter;
        }

        private short GetDistributionByName(bool bIsOccupancy, string DrawingId, string UserId, double AreaRatio, double dSpaceDataTextAngle, double dLegendTextSize, double dSpaceDataTextWidth, string OrgLevelName,
            string strTextStyleName, short nSpaceDataTextLegendStyleId, List<Dictionary<string, dynamic>> legendDataArray, string AreaUnit,
            double dblX, double dDistRectHeight, double dblY, double dTextMaxX, double HL2StartY, double dDistRectWidth, double HL1StartX, double VL2StartX,
            ref double rtnTextMaxX, ref double VL1EndY, ref double rtnHL2StartY, ref double rtnVL2StartX, ref double VL3StartX, ref string LegendHandles)
        {
            double dblStartY, dblStartY1;
            dblX = dblX + (dDistRectHeight / 2);
            string strOrgLevelTextHandle = "";

            short nRetCode = CreateText(DrawingId, "$LEGEND", 7, dblX + (dDistRectHeight + (4 * AreaRatio)), dblY - (dDistRectHeight / 3), dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                    dSpaceDataTextWidth, OrgLevelName, strTextStyleName, nSpaceDataTextLegendStyleId, ref strOrgLevelTextHandle, UserId);
            if (nRetCode == 0)
            {
                LegendHandles += strOrgLevelTextHandle + PublicDataVariables.Delimiters.RowDelimiter;
                double MinX = 0, MinY = 0, MaxX = 0, MaxY = 0;
                nRetCode = GetEntityExtents(DrawingId, strOrgLevelTextHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                if (nRetCode == 0)
                {
                    dblStartY = dblY;
                    if (dTextMaxX == 0)
                        dTextMaxX = MaxX;
                    else if (MaxX > dTextMaxX)
                        dTextMaxX = MaxX;
                    dblY = dblY - dDistRectHeight - (2 * AreaRatio);
                    HL2StartY = dblY;
                    dblY = dblY - dDistRectHeight - (2 * AreaRatio);
                    dblStartY1 = dblY;
                    List<Dictionary<string, dynamic>> legentData = legendDataArray.GetRange(0, legendDataArray.Count);
                    if (legentData.Count == 0)
                    {
                        rtnTextMaxX = 0; VL1EndY = 0; rtnHL2StartY = 0; rtnVL2StartX = 0; VL3StartX = 0;
                        return -1;
                    }
                    else
                    {
                        double rtnVL1EndY = 0;
                        nRetCode = HatchPatternLegend(bIsOccupancy, DrawingId, UserId, legentData, OrgLevelName, strTextStyleName, nSpaceDataTextLegendStyleId, AreaRatio,
                            dSpaceDataTextAngle, dLegendTextSize, dSpaceDataTextWidth, VL2StartX, dTextMaxX, VL1EndY, ref dblX, ref dblY, ref dDistRectHeight, ref dDistRectWidth,
                            ref rtnVL2StartX, ref rtnTextMaxX, ref rtnVL1EndY, ref LegendHandles);
                        if (nRetCode == 0)
                        {
                            dblY = dblStartY;
                            VL3StartX = rtnTextMaxX + (dLegendTextSize) + (2 * AreaRatio);
                            dblX = rtnTextMaxX + (dLegendTextSize) + (4 * AreaRatio);
                            string EntityHandle = "";
                            nRetCode = CreateText(DrawingId, "$LEGEND", 7, dblX, dblY - (dDistRectHeight / 3), dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                                    dSpaceDataTextWidth, "Area (" + AreaUnit + ")", strTextStyleName, nSpaceDataTextLegendStyleId, ref EntityHandle, UserId);
                            if (nRetCode == 0)
                            {
                                LegendHandles += EntityHandle + PublicDataVariables.Delimiters.RowDelimiter;
                                nRetCode = GetEntityExtents(DrawingId, EntityHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                                if (nRetCode == 0)
                                {
                                    dblStartY = dblY;
                                    if (dTextMaxX == 0)
                                        dTextMaxX = MaxX;
                                    else if (MaxX > dTextMaxX)
                                        dTextMaxX = MaxX;
                                    List<Dictionary<string, dynamic>> legentDataForArea = legendDataArray.GetRange(0, legendDataArray.Count);
                                    if (legentDataForArea.Count == 0)
                                    {
                                        rtnTextMaxX = 0; VL1EndY = 0; rtnHL2StartY = 0; rtnVL2StartX = 0; VL3StartX = 0;
                                        return -1;
                                    }
                                    else
                                    {
                                        nRetCode = DisplayAreaValues(DrawingId, UserId, AreaRatio, legentDataForArea, strTextStyleName, dSpaceDataTextAngle, dLegendTextSize,
                                            dSpaceDataTextWidth, VL3StartX, dblStartY1, dDistRectHeight, ref dTextMaxX, ref LegendHandles);
                                        if (nRetCode == 0)
                                        {
                                            rtnTextMaxX = dTextMaxX;
                                            rtnHL2StartY = HL2StartY;
                                            VL1EndY = rtnVL1EndY;
                                            return 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return nRetCode;
        }

        private short DisplayAreaValues(string DrawingId, string UserId, double AreaRatio, List<Dictionary<string, dynamic>> legentData, string strTextStyleName, double dSpaceDataTextAngle, double dLegendTextSize, double dSpaceDataTextWidth, double VL3StartX, double dblY, double dDistRectHeight, ref double TextMaxX, ref string LegendHandles)
        {
            short nRetCode = 0;
            for (int i = 0; i < legentData.Count; i++)
            {
                Dictionary<string, dynamic> legentDataItem = legentData[i];
                string OrgLevelItemTextAreaHandle = "";
                double dArea = legentDataItem["Area"];
                string Areatext = string.Format("{0:0.00}", dArea); // dArea.ToString();

                nRetCode = CreateText(DrawingId, "$LEGEND", 7, TextMaxX, dblY - (dDistRectHeight / 3), dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                    dSpaceDataTextWidth, Areatext, strTextStyleName, 9, ref OrgLevelItemTextAreaHandle, UserId);

                if (nRetCode == 0)
                {
                    LegendHandles += OrgLevelItemTextAreaHandle + PublicDataVariables.Delimiters.RowDelimiter;
                    double MinX = 0, MinY = 0, MaxX = 0, MaxY = 0;
                    nRetCode = GetEntityExtents(DrawingId, OrgLevelItemTextAreaHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                    if (nRetCode == 0)
                    {
                        if (MaxX > TextMaxX)
                        {
                            TextMaxX = MaxX;
                        }
                    }
                    dblY = dblY - dDistRectHeight - (2 * AreaRatio);

                }
            }
            return nRetCode;
        }
        private short HatchPatternLegend(bool bIsOccupancy, string DrawingId, string UserId, List<Dictionary<string, dynamic>> legentData, string OrglevelName, string strTextStyleName, short nSpaceDataTextLegendStyleId, double AreaRatio, double dSpaceDataTextAngle, double dLegendTextSize, double dSpaceDataTextWidth, double VL2StartX, double TextMaxX, double VL1EndY, ref double dblX, ref double dblY, ref double dDistRectHeight, ref double dDistRectWidth, ref double rtnVL2StartX, ref double rtnTextMaxX, ref double rtnVL1EndY, ref string LegendHandles)
        {
            string HatchHandle = "";
            double dDistLineWidth = 0, dDistLineTypeScale = 1;
            string strDistLineType = "";
            short nRetCode = 0;
            for (int i = 0; i < legentData.Count; i++)
            {
                Dictionary<string, dynamic> legentDataItem = legentData[i];
                string EntityHandle = "";
                short ColorId = Convert.ToInt16(legentDataItem["HatchObj"].ColorId);
                nRetCode = CreateRectangle(DrawingId, "$LEGEND", ColorId, dblX - (dDistRectHeight / 2), dblY, dDistRectWidth, dDistRectHeight, dDistLineWidth, strDistLineType, dDistLineTypeScale, ref EntityHandle, UserId);
                if (nRetCode == 0)
                {
                    LegendHandles += EntityHandle + PublicDataVariables.Delimiters.RowDelimiter;
                    double Angle = Convert.ToDouble(legentDataItem["HatchObj"].HatchAngle);
                    //  legentDataItem["HatchObj"].HatchScale = 1;
                    double dScale = Convert.ToDouble(1);
                    short PatternId = Convert.ToInt16(legentDataItem["HatchObj"].HatchPatternId);
                    nRetCode = HatchEntity(DrawingId, "$LEGEND", EntityHandle, ColorId, Angle, dScale, PatternId, false, ref HatchHandle, UserId);
                    if (nRetCode == 0)
                    {
                        LegendHandles += HatchHandle + PublicDataVariables.Delimiters.RowDelimiter;
                        double MinX = 0, MinY = 0, MaxX = 0, MaxY = 0;
                        nRetCode = GetEntityExtents(DrawingId, EntityHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                        if (nRetCode == 0)
                        {
                            VL2StartX = MaxX + (dDistRectHeight) + (2 * AreaRatio);
                            VL1EndY = MinY - (dDistRectHeight) - (1 * AreaRatio);
                            string OrgLevelItemTextHandle = "";
                            string TextValue;
                            if (!bIsOccupancy)
                                TextValue = legentDataItem[OrglevelName];
                            else
                                TextValue = legentDataItem["TextName"];
                            nRetCode = CreateText(DrawingId, "$LEGEND", 7, VL2StartX + (2 * AreaRatio), dblY - (dDistRectHeight / 3), dSpaceDataTextAngle, (dLegendTextSize) - (dLegendTextSize * .25),
                                dSpaceDataTextWidth, TextValue, strTextStyleName, nSpaceDataTextLegendStyleId, ref OrgLevelItemTextHandle, UserId);
                            if (nRetCode == 0)
                            {
                                LegendHandles += OrgLevelItemTextHandle + PublicDataVariables.Delimiters.RowDelimiter;
                                nRetCode = GetEntityExtents(DrawingId, OrgLevelItemTextHandle, ref MinX, ref MinY, ref MaxX, ref MaxY, UserId);
                                if (nRetCode == 0)
                                {
                                    if (MaxX > TextMaxX)
                                    {
                                        TextMaxX = MaxX;
                                    }
                                }
                                dblY = dblY - dDistRectHeight - (2 * AreaRatio);
                            }
                        }
                    }
                }
            }

            rtnVL2StartX = VL2StartX; rtnTextMaxX = TextMaxX; rtnVL1EndY = VL1EndY;
            return nRetCode;
        }
        private void GetFontStyles(string DrawingId, string UserId, ref string strTextStyleName)
        {
            string[] ArrstyleNames;
            string strStyleNames = "";
            bool blnStyleExists = false;
            short result = GetAllTextStyles(DrawingId, ref strStyleNames, UserId);
            string strDefaultFontStyles = "SIMPLEX" + PublicDataVariables.Delimiters.RowDelimiter + "ROMANS" + PublicDataVariables.Delimiters.RowDelimiter + "ROMAND" + PublicDataVariables.Delimiters.RowDelimiter + "STANDARD";
            string[] ArrDefaultFontStyles = strDefaultFontStyles.Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray());

            if (result == 0)
            {
                if (strStyleNames != "")
                {
                    ArrstyleNames = strStyleNames.Split(PublicDataVariables.Delimiters.RowDelimiter.ToCharArray());
                    foreach (string styleName in ArrstyleNames)
                    {
                        bool styleNameExists = ArrDefaultFontStyles.Contains(styleName);
                        if (styleNameExists)
                        {
                            strTextStyleName = styleName;
                            blnStyleExists = true;
                            break;
                        }
                    }
                    if (blnStyleExists == false)
                    {
                        strTextStyleName = ArrstyleNames[0];
                    }
                }
                else
                {
                    string strTextFaceName = "Arial";
                    AddTextStyle(DrawingId, strTextStyleName, strTextFaceName, false, false, UserId);
                }
            }
        }

        private short executeCommand(string args, string servicePath, ref string funcOutpout)
        {
            try
            {
                short retCode = 0;
                string output = "";

                ProcessManager pm = new ProcessManager();
                Process childProc = pm.runTxHost((object)args, servicePath);

                childProc.ErrorDataReceived += (sender, e) =>
                {
                    retCode = 7;
                };

                //childProc.Exited += (sender, e) =>
                //{
                //    retCode = Convert.ToInt16(childProc.StandardOutput.ReadLine().Replace("<", ""));
                //    if (retCode == 0)
                //        output = childProc.StandardOutput.ReadToEnd();
                //};
                /////////////////////////////////////////////EDIT MODE////////////////////////////////////////////////////////
                childProc.BeginOutputReadLine();
                childProc.OutputDataReceived += (sender, e) =>
                {
                    if (e.Data.Contains("<RETURN>"))
                    {
                        retCode = Convert.ToInt16(e.Data.Replace("<RETURN>", "").Replace("</RETURN>", "").Replace("<", ""));
                    }
                    else if (e.Data.Contains("<RESULT>"))
                    {
                        output = e.Data.Replace("<RESULT>", "").Replace("</RESULT>", "").Replace("<", "");
                        childProc.CancelOutputRead();
                    }
                };
                /////////////////////////////////////////////EDIT MODE////////////////////////////////////////////////////////


                childProc.WaitForExit();
                funcOutpout = output;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        private string txHostCommandLineArgsFormat(List<string> arglist)
        {
            string args = "";
            foreach (var i in arglist)
            {
                if (i != "\r\n")
                {
                    if (i == "")
                        args += "\"\"" + " ";
                    else
                        args += "\"" + i + "\"" + " ";
                }
                else
                    args += i;
            }
            return args;
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        private Dictionary<string, object> getModelerSettings(string ext)
        {
            Dictionary<string, object> dummy = new Dictionary<string, object>();
            string modelerSettings = System.Configuration.ConfigurationManager.AppSettings["after-open"];
            if (modelerSettings != "")
            {
                dummy = JsonConvert.DeserializeObject<Dictionary<string, object>>(modelerSettings);
                if (ext == ".dwg" || ext == ".dxf")
                {
                    dummy = JsonConvert.DeserializeObject<Dictionary<string, object>>(dummy["dwg"].ToString());
                    return dummy;
                }
                else if (ext == ".dgn")
                {
                    dummy = JsonConvert.DeserializeObject<Dictionary<string, object>>(dummy["dgn"].ToString());
                    return dummy;
                }
                else if (ext == ".rvt" || ext == ".rfa")
                {
                    dummy = JsonConvert.DeserializeObject<Dictionary<string, object>>(dummy["bim"].ToString());
                    return dummy;
                }
                else
                    Debug.WriteLine("Unknown profile for extension " + ext);
            }
            return dummy;
        }
        public short BuildCache(string filePath, string servicePath)
        {
            try
            {
                short retCode = 0;
                string cacheFolder = Path.GetDirectoryName(filePath);
                if (!Directory.Exists(cacheFolder))
                {
                    return 9;
                }

                string layoutPath = Path.Combine(cacheFolder, "layouts.txt");
                writeStatus(cacheFolder, "open file...", 25);
                List<string> commandsList = new List<string> {
                                "LOADAPP", "WebAdapt",
                                "OPEN" ,"partial" ,filePath,
                                "WALAYOUTS",layoutPath,
                                "CLOSE"
                             };
                string args = txHostCommandLineArgsFormat(commandsList);

                ProcessManager pm = new ProcessManager();
                Process childProc = pm.runTxHost((object)args, servicePath);
                childProc.OutputDataReceived += (sender, e) =>
                {
                    retCode = 0;
                    Debug.WriteLine(e.Data.ToString());
                };
                childProc.ErrorDataReceived += (sender, e) =>
                {
                    retCode = 7;
                    Debug.WriteLine(e.Data.ToString());
                    writeStatus(cacheFolder, "Error: cache generation error !", 0);
                };
                childProc.Exited += (sender, e) =>
                {
                    if (!File.Exists(layoutPath))
                    {
                        writeStatus(cacheFolder, "Error: cache generation error !", 0);
                        retCode = 9;
                    }
                    else
                    {
                        // cb(null, {folder: path.basename(path.dirname(cacheFolder)), fileName: path.basename(cacheFolder)});
                        retCode = builCacheStep2(filePath, servicePath, cacheFolder, pm);
                    }
                };
                childProc.WaitForExit();
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }
        private short builCacheStep2(string filePath, string servicePath, string cacheFolder, ProcessManager pm)
        {
            short retCode = 0;
            string statusPath = Path.Combine(cacheFolder, "status.txt");
            string layerPath = Path.Combine(cacheFolder, "layers.txt");
            string layoutPath = Path.Combine(cacheFolder, "layouts.txt");

            List<string> commandsList = new List<string> {
                                "LOADAPP", "WebAdapt",
                                "LOADAPP", "WebMisc",  "STATUS", "open drawing...|25", statusPath,
                                "OPEN", "partial", filePath,
                                "STATUS", "get layers...|28", statusPath,
                                "WALAYERS", layerPath,
                                "STATUS", "preview...|35", statusPath,
                                "WAPREVIEW", Path.Combine(cacheFolder, "preview.png"), "256,135", "255,255,255", // x,y-size, background R,G,B color
                              };

            string args = txHostCommandLineArgsFormat(commandsList);
            Process childProc = pm.runTxHost((object)args, servicePath);
            childProc.OutputDataReceived += (sender, e) =>
            {
                retCode = 0;
                Debug.WriteLine(e.Data.ToString());
            };
            childProc.ErrorDataReceived += (sender, e) =>
            {
                retCode = 7;
                Debug.WriteLine(e.Data.ToString());
                writeStatus(cacheFolder, "Error: cache generation error !", 0);
            };
            childProc.Exited += (sender, e) =>
            {
                commandsList = new List<string> {
                                         "LOADAPP", "WebAdapt",
                                         "LOADAPP", "WebMisc",  "STATUS", "open drawing...|25", statusPath,
                                         "OPEN", "partial", filePath,
                                         "STATUS", "generate GS cache...|45", statusPath,
                                         "PERF", "UpdateGs"
                };
                Dictionary<string, object> layoutOptions = new Dictionary<string, object>();
                layoutOptions = JsonConvert.DeserializeObject<Dictionary<string, object>>(File.ReadAllText(layoutPath));

                Dictionary<string, object> profiles = getModelerSettings(Path.GetExtension(filePath));
                List<object> updatedLayouts = new List<object>();
                List<string> layoutopts = new List<string>();
                layoutopts = JsonConvert.DeserializeObject<List<string>>(layoutOptions["layouts"].ToString());

                int index = 0;
                foreach (var layout in layoutopts)
                {
                    Common.FS.createFolder(Path.Combine(cacheFolder, index.ToString()));
                    Dictionary<string, string> layoutDet = new Dictionary<string, string>{
                                                {"name", layout},
                                                {"alias",index.ToString()}};
                    updatedLayouts.Add(layoutDet);
                    List<string> incommandsList = new List<string>();
                    incommandsList.AddRange(commandsList);
                    incommandsList.AddRange(new string[]  {   "SETLAYOUT", layout,
                                                        "STATUS", "generate cache for " + layout + "...|" + (50 + 40 / layoutopts.Count * index), statusPath});
                    foreach (var prof in profiles)
                    {
                        //if (prof.Key == "mid")
                        {
                            List<string> lstProfiles = new List<string>();
                            lstProfiles.AddRange(incommandsList);
                            lstProfiles.AddRange(JsonConvert.DeserializeObject<List<string>>(prof.Value.ToString()));
                            lstProfiles.AddRange(new string[]  {"WANEWLLGGS", Path.Combine(cacheFolder, index.ToString(), prof.Key + ".cache"), "255,255,255",
                                            "UPDATEGS",
                                            "PERF", "UpdateGs"
                                            });
                            args = txHostCommandLineArgsFormat(lstProfiles);
                            retCode = genCache(args, servicePath, pm);
                            if (retCode != 0) break;
                        }
                    }
                    if (retCode != 0) break;

                    ++index;
                }
                layoutOptions["layouts"] = updatedLayouts; ;
                File.WriteAllText(layoutPath, JsonConvert.SerializeObject(layoutOptions));


            };
            childProc.WaitForExit();
            writeStatus(cacheFolder, "File ready", 100);
            return retCode;
        }
        private short genCache(string args, string servicePath, ProcessManager pm)
        {
            try
            {
                short retCode = 0;
                Process childProcIn = pm.runTxHost(args, servicePath);

                childProcIn.OutputDataReceived += (sender1, e1) =>
                {
                    retCode = 0;
                    Debug.WriteLine(e1.Data.ToString());
                };
                childProcIn.Exited += (sender1, e1) =>
                {
                    retCode = 0;
                };
                childProcIn.ErrorDataReceived += (sender1, e1) =>
                {
                    retCode = 7;
                };
                childProcIn.WaitForExit();

                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }

        }
        public short createDataTextOnServer(int UserId, int CustomerId, int DrawingId, int ModuleId, string SpaceDataInput, string DisplaySetngInput, double Ratio, string columnDelimiter, ref string EntityHandles)
        {
            try
            {
                string formatedText = "";
                ApplicationFormInput appSpaceDatalnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(SpaceDataInput);
                TypeValidation typeVal = new TypeValidation();
                bool blnReturn = true;
                if (appSpaceDatalnInp.Filter != null)
                {
                    blnReturn = typeVal.checkWhiteList(appSpaceDatalnInp.Filter, 15);
                }
                if (blnReturn == true)
                {
                    DefaultApiReturn objDefaultSpaceDataApiReturn = new DefaultApiReturn();
                    BaseClassInput baseInp = new BaseClassInput();
                    baseInp.CustomerId = CustomerId;
                    baseInp.UserId = UserId;
                    baseInp.TimeOffset = 0;
                    baseInp.RowsPerPage = 100;
                    objDefaultSpaceDataApiReturn = new SpaceModel(baseInp).SpaceItem.GetAllSpaceDetails(appSpaceDatalnInp);

                    if (objDefaultSpaceDataApiReturn.FieldBinderData != null)
                    {
                        ApplicationFormInput appDisplaySetnglnInp = JsonConvert.DeserializeObject<ApplicationFormInput>(DisplaySetngInput);
                        if (new CommonModel(baseInp).GeneralItem.CheckValidInputData(appDisplaySetnglnInp) == false)
                        {
                            throw new Exception();
                            // return 9;
                        }
                        else
                        {
                            CustomApiReturn objCustomApiReturn = new CustomApiReturn();
                            DisplaySettingInput displaySettingInput = JsonConvert.DeserializeObject<DisplaySettingInput>(DisplaySetngInput);
                            objCustomApiReturn = new CommonModel(baseInp).ApplicationFormItem.Extented.GetDisplaySettingData(displaySettingInput);

                            if (objCustomApiReturn.DisplaySettingsData != null)
                            {
                                JavaScriptSerializer json = new JavaScriptSerializer();

                                dynamic tempData = JsonConvert.DeserializeObject(objDefaultSpaceDataApiReturn.FieldBinderData);
                                var data = json.Deserialize<Object>(objDefaultSpaceDataApiReturn.FieldBinderData);

                                List<Test1> itemsForCreateText = new List<Test1>();

                                int lineSpaceInDrawingValue = objCustomApiReturn.DisplaySettingsData.Find(item => item.FieldName == "Line Space in Drawing").FontSize;
                                string lineSpaceInDrawing = "";

                                for (int i = 0; i < lineSpaceInDrawingValue; i++)
                                    lineSpaceInDrawing += "\\P";

                                for (int i = 0; i < tempData.Count; i++)
                                {
                                    //var spaceDataInDrawing = data[i];
                                    formatedText = "";

                                    foreach (var dispSettingsItem in objCustomApiReturn.DisplaySettingsData)
                                    {
                                        if (dispSettingsItem.ShowinDrawing)
                                        {
                                            var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
                                            var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
                                            string textContent = tempData[i][dispSettingsItem.FieldName];
                                            if (textContent == "null" || textContent == null || textContent == "")
                                                textContent = "-";
                                            formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + lineSpaceInDrawing;
                                        }
                                    }
                                    var formatedTextFinal = "{" + formatedText + "}";
                                    itemsForCreateText.Insert(0, new Test1 { a = formatedTextFinal, b = tempData[i]["TextInsertionX"], c = tempData[i]["TextInsertionY"] });
                                }

                                var dataXml = "<TEXT_DATA>";
                                foreach (var item in itemsForCreateText)
                                {
                                    dataXml += "<TEXT_ITEM>";
                                    //var textData = itemsForCreateText.[item];
                                    dataXml += "<TEXT_STRING>";
                                    dataXml += item.a;
                                    dataXml += "</TEXT_STRING>";
                                    dataXml += "<TEXT_POSITION>";
                                    dataXml += item.b + columnDelimiter + item.c;
                                    dataXml += "</TEXT_POSITION>";
                                    dataXml += "</TEXT_ITEM>";
                                }
                                dataXml += "</TEXT_DATA>";
                                var handles = "";
                                File.WriteAllText("C:\\Users\\anand.r\\Desktop\\test\\" + DrawingId + ".txt", dataXml);
                                short retCode = this.CreateDataText(Convert.ToString(DrawingId), "$SpaceData", 1, 0, Ratio, 0, 1, "Standard", 0, "", ref handles, Convert.ToString(UserId));
                                if (retCode != 0)
                                    return retCode;
                                else
                                    EntityHandles = handles;
                            }
                        }
                    }
                }
                else
                {
                    throw new Exception();
                }
                return 0;
            }
            catch (Exception ex)
            {
                return 9;
            }

        }
        //private short createSpaceData(List<Test1> xmlData, int DrawingId, double Ratio, int UserId, string columnDelimiter, ref string handles)
        //{
        //    var dataXml = "<TEXT_DATA>";
        //    foreach (var item in xmlData)
        //    {
        //        dataXml += "<TEXT_ITEM>";
        //        //var textData = itemsForCreateText.[item];
        //        dataXml += "<TEXT_STRING>";
        //        dataXml += item.a;
        //        dataXml += "</TEXT_STRING>";
        //        dataXml += "<TEXT_POSITION>";
        //        dataXml += item.b + columnDelimiter + item.c;
        //        dataXml += "</TEXT_POSITION>";
        //        dataXml += "</TEXT_ITEM>";
        //    }
        //    dataXml += "</TEXT_DATA>";
        //    handles = "";
        //    short retCode = this.CreateDataText(Convert.ToString(DrawingId), "$SpaceData", 1, 0, Ratio, 0, 1, "Standard", 0, dataXml, ref handles, Convert.ToString(UserId));
        //    return retCode;
        //}
        public short MoveSymbolTest(string DrawingId, string SymbolRectHandle, string TextHandle, string SymbolTextHandle, double XCoord, double YCoord, double TargetX,
                                        double TargetY, ref string MidPoint, ref string ActualPoints, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "MoveSymbolTest" , SymbolRectHandle,TextHandle,SymbolTextHandle,XCoord.ToString(),YCoord.ToString(),TargetX.ToString(),
                            TargetY.ToString(), MidPoint
                };


                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    if (retCode != 0)
                        return retCode;
                    ActualPoints = outList[0];
                    MidPoint = outList[1];
                }
                else
                    return 3;
                return retCode;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        public short HighlightAndDehighligtEntity(string DrawingId, string ConnectorHandle, short LineWidth, bool IsHightLight, short Color, string UserId)
        {
            try
            {
                List<string> commandsList = new List<string> {
                            "HighlightAndDehighligtEntity" , ConnectorHandle, LineWidth.ToString(), IsHightLight ? "1" : "0", Color.ToString()
                };


                List<string> outList = new List<string>();
                ProcessManager objPM;
                short retCode = 0;

                if (m_DrawingToProcess.TryGetValue(UserId + "_" + DrawingId, out objPM))
                {
                    retCode = objPM.executeCommand(commandsList, ref outList);
                    return retCode;
  
                }
                else
                    return 3;
            }
            catch (Exception /*e*/)
            {
                return 9;
            }
        }

        private void writeStatus(string dest, string text, int progress)
        {
            File.WriteAllText(Path.Combine(dest, "status.txt"), text + "|" + progress);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
}

public class Test1
{
    public string a;
    public double b;
    public double c;
}
////////////////////////////////////////////////For Drawing Support//////////////////////////////////////////////////
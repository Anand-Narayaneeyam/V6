using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Collections.Concurrent;
using Xbim.CobieLiteUk;
using XbimExchanger.IfcToCOBieLiteUK;
using Xbim.Ifc;
using Xbim.IO.Esent;
using Xbim.Ifc4.Interfaces;
using Xbim.Ifc4.Kernel;
using Xbim.IO.JSON;
using Xbim.IO.Xml;
using Xbim.IO.Xml.BsConf;
using Xbim.ModelGeometry.Scene;
using Newtonsoft.Json;
using Xbim.Common.Geometry;
using Xbim.Common.XbimExtensions;
using Xbim.Common.Step21;
using Newtonsoft.Json.Linq;
using Indus.iDrawings.Common;

namespace Indus.iDrawings.vN
{
    public class WexBimStreamer
    {

        private AppSettings appSettings = new AppSettings();
        public short GetWexBimData(string modelId, string customer, string productLabel,string drawingId, string revisionNo, ref string WexBimData, ref string jsondata, ref string productIds,ref string parentIds)
        {
            try
            {
                IfcStore m_Model;
              //  Facility objFacility = new Facility();
             
                ////getting wexbim file location//////////
                string ifcDir = "models\\";
                string FileNameWithoutExt = Path.GetFileNameWithoutExtension(modelId); 
                string filePath = "", jsonFilePath = "";
                byte[] byteData = null;                
                short retCode = 0;
                productIds = ""; parentIds = "";

                if (customer != null && customer != "") // getting customer folder location  while calling from idrawings
                {
                    string FileLocation = appSettings[AppSettingsKey.FileLocation].Value;
                    modelId = FileNameWithoutExt + ".wexbim";

                    filePath = FileLocation + "Files" + @"\" + customer + @"\" + "Drawings" + @"\" + "Buildings" + @"\" + drawingId + @"\" + revisionNo + @"\" + modelId;
                    jsonFilePath = FileLocation + "Files" + @"\" + customer + @"\" + "Drawings" + @"\" + "Buildings" + @"\" + drawingId + @"\" + revisionNo + @"\" + FileNameWithoutExt + ".json";

                    if (productLabel != null && productLabel != "" && productLabel != "0")
                    {
                        string ifcPath = System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath + ifcDir + FileNameWithoutExt + ".ifc";
                        m_Model = IfcStore.Open(ifcPath, null, null, null, XbimDBAccess.ReadWrite);
                        var context = new Xbim3DModelContext(m_Model);
                        context.CreateContext();

                        GetGeometryOfProduct(m_Model, Convert.ToInt32(productLabel), context, ifcPath, ref byteData, ref productIds, ref parentIds);
                        WexBimData = Convert.ToBase64String(byteData);
                        jsondata = Convert.ToBase64String(FileToByteArray(jsonFilePath, ref retCode));
                        //jsondata = FileToString(jsonFilePath, ref retCode);
                        
                        //dynamic data = JObject.Parse(jsondata);
                        
                        //objFacility = FileToFacility(jsonFilePath);
                    }
                    else
                    {
                        //if (File.Exists(filePath))
                        //{
                        //m_Model = IfcStore.Open(filePath, null, null, null, XbimDBAccess.ReadWrite);
                        // var context = new Xbim3DModelContext(m_Model);
                        // context.CreateContext();

                        //}

                        if (File.Exists(filePath))
                        {
                            retCode = GetWexBimData(filePath, jsonFilePath, ref WexBimData, ref jsondata);

                        }
                        else
                            return 2;
                        
                       
                    }
                }
                else // default location
                {
                    //filePath = System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath + 
                     filePath = "D:\\IISRoot\\TFSScrum\\WexBimViewer\\WexBimViewer\\" + ifcDir + modelId;
                    jsonFilePath = "D:\\IISRoot\\TFSScrum\\WexBimViewer\\WexBimViewer\\" + ifcDir + FileNameWithoutExt + ".json";
                    string ifcFilePath = "D:\\IISRoot\\TFSScrum\\WexBimViewer\\WexBimViewer\\" + ifcDir + FileNameWithoutExt + ".ifc";
                    retCode = GetWexBimData(filePath, jsonFilePath, ref WexBimData, ref jsondata);
                }
                
                return retCode;
                ////getting wexbim file location//////////
               
            }
            catch (Exception e)
            {
                Debug.WriteLine("Failed To convert or send - " + e.Message);
                return 9;
            }
        }
        public short GetJsonData(string modelId, string customer, string productLabel, string drawingId, string revisionNo, ref string jsonData, ref string productIds)//ref Facility facilityObject
        {
            try
            {
                IfcStore m_Model;

                ////getting wexbim file location//////////
                string ifcDir = "models\\";
                string FileNameWithoutExt = Path.GetFileNameWithoutExtension(modelId);
                string filePath = "", jsonFilePath = "";
                short retCode = 0;

                if (customer != null && customer != "") // getting customer folder location  while calling from idrawings
                {
                    string FileLocation = appSettings[AppSettingsKey.FileLocation].Value;
                    modelId = FileNameWithoutExt + ".wexbim";

                    filePath = FileLocation + "Files" + @"\" + customer + @"\" + "Drawings" + @"\" + "Buildings" + @"\" + drawingId + @"\" + revisionNo + @"\" + modelId;

                    jsonFilePath = FileLocation + "Files" + @"\" + customer + @"\" + "Drawings" + @"\" + "Buildings" + @"\" + drawingId + @"\" + revisionNo + @"\" + FileNameWithoutExt + ".json";

                    if (!File.Exists(filePath))
                        return 2;

                        if (productLabel != null && productLabel != "" && productLabel != "0")
                    {
                        string ifcPath = System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath + ifcDir + FileNameWithoutExt + ".ifc";
                        m_Model = IfcStore.Open(ifcPath, null, null, null, XbimDBAccess.ReadWrite);
                        var context = new Xbim3DModelContext(m_Model);
                        context.CreateContext();

                        jsonData = Convert.ToBase64String(FileToByteArray(jsonFilePath, ref retCode));
                    }
                }
                else // default location
                {
                    jsonFilePath = System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath + ifcDir + FileNameWithoutExt + ".json";
                }

                jsonData = Convert.ToBase64String(FileToByteArray(jsonFilePath, ref retCode));
                return 0;
            }
            catch (Exception e)
            {
                return 9;
            }
        }
        public short GetWexBimData(string filePath, string jsonFilePath, ref string wexbimData, ref string jsonData)//ref Facility facilityObject
        {
            try
            {
                byte[] byteData = null;
                short retCode = 0;
                byteData = FileToByteArray(filePath, ref retCode);
                if (retCode == 0)
                {
                    wexbimData = Convert.ToBase64String(byteData);
                    jsonData = Convert.ToBase64String(FileToByteArray(jsonFilePath, ref retCode));                    
                }
                return 0;
            }
            catch (Exception e)
            {
                return 9;
            }
        }
       
        public const int WexBimId = 94132117;
        private short GetGeometryOfProduct(IfcStore m_Model, int ProductId, Xbim3DModelContext  context ,string ifcPath, ref byte[] Geometry,ref string ProductIds,ref string ParentIds)
        {
            try
            {
                IIfcProduct objProd = m_Model.Instances.Where<IIfcProduct>(a => a.EntityLabel == ProductId).FirstOrDefault() as IIfcProduct;
                if (objProd != null)
                {
                    List<IIfcProduct> temp = new List<IIfcProduct>();
                    GetEntityListForProduct(objProd, ref temp, true, true);
                    IEnumerable<IIfcProduct> lstProducts;
                    lstProducts = temp;
                    foreach (var product in lstProducts)
                    {
                        ProductIds += product.EntityLabel + ";";
                    }
                    
                    ParentIds = "";
                    GetParentProductIds(objProd, ref ParentIds);


                    MemoryStream ws = new MemoryStream();
                    using (var bw = new BinaryWriter(ws))
                    {            
                        var colourMap = new XbimColourMap();
                        using (var geomRead = m_Model.GeometryStore.BeginRead())
                        {              
                            var styles = geomRead.StyleIds;
                            var regions = geomRead.ContextRegions.SelectMany(r => r).ToList();
                            //we need to get all the default styles for various products
                            var defaultStyles = geomRead.ShapeInstances.Select(i => -(int)i.IfcTypeId).Distinct();
                            var allStyles = defaultStyles.Concat(styles).ToList();
                            int numberOfGeometries = 0;
                            int numberOfVertices = 0;
                            int numberOfTriangles = 0;
                            int numberOfMatrices = 0;
                            int numberOfProducts = 0;
                            int numberOfStyles = allStyles.Count;
                        
                            //start writing out

                            bw.Write((Int32)WexBimId); //magic number

                            bw.Write((byte)2); //version of stream, arrays now packed as doubles
                            var start = (int)bw.Seek(0, SeekOrigin.Current);
                            bw.Write((Int32)0); //number of shapes
                            bw.Write((Int32)0); //number of vertices
                            bw.Write((Int32)0); //number of triangles
                            bw.Write((Int32)0); //number of matrices
                            bw.Write((Int32)0); //number of products
                            bw.Write((Int32)numberOfStyles); //number of styles
                            bw.Write(Convert.ToSingle(m_Model.ModelFactors.OneMetre));
                            //write out conversion to meter factor

                            bw.Write(Convert.ToInt16(regions.Count)); //write out the population data
                            foreach (var r in regions)
                            {
                                bw.Write((Int32)(r.Population));
                                var bounds = r.ToXbimRect3D();
                                var centre = r.Centre;
                                //write out the centre of the region
                                bw.Write((Single)centre.X);
                                bw.Write((Single)centre.Y);
                                bw.Write((Single)centre.Z);
                                //bounding box of largest region
                                bw.Write(bounds.ToFloatArray());
                            }
                            //textures

                            foreach (var styleId in allStyles)
                            {
                                XbimColour colour;
                                if (styleId > 0)
                                {
                                    var ss = (IIfcSurfaceStyle)m_Model.Instances[styleId];
                                    var texture = XbimTexture.Create(ss);
                                    colour = texture.ColourMap.FirstOrDefault();
                                }
                                else //use the default in the colour map for the enetity type
                                {
                                    var theType = m_Model.Metadata.GetType((short)Math.Abs(styleId));
                                    colour = colourMap[theType.Name];
                                }
                                if (colour == null) colour = XbimColour.DefaultColour;
                                bw.Write((Int32)styleId); //style ID                       
                                bw.Write((Single)colour.Red);
                                bw.Write((Single)colour.Green);
                                bw.Write((Single)colour.Blue);
                                bw.Write((Single)colour.Alpha);

                            }

                             //write out all the product bounding boxes
                            var prodIds = new HashSet<int>();
                            foreach (var product in lstProducts)
                            {
                                if (product is IIfcFeatureElement) continue;
                                prodIds.Add(product.EntityLabel);

                                var bb = XbimRect3D.Empty;
                                foreach (var si in geomRead.ShapeInstancesOfEntity(product))
                                {
                                    var bbPart = XbimRect3D.TransformBy(si.BoundingBox, si.Transformation);
                                    //make sure we put the box in the right place and then convert to axis aligned
                                    if (bb.IsEmpty) bb = bbPart;
                                    else
                                        bb.Union(bbPart);
                                }
                                //do not write out anything with no geometry
                                if (bb.IsEmpty) continue;

                                bw.Write((Int32)product.EntityLabel);
                                bw.Write((UInt16)m_Model.Metadata.ExpressTypeId(product));
                                bw.Write(bb.ToFloatArray());
                                numberOfProducts++;
                            }

                            //projections and openings have already been applied, 

                            var toIgnore = new short[4];
                            toIgnore[0] = m_Model.Metadata.ExpressTypeId("IFCOPENINGELEMENT");
                            toIgnore[1] = m_Model.Metadata.ExpressTypeId("IFCPROJECTIONELEMENT");
                            string schemaIdentifier;
                             IfcSchemaVersion ifcVersion = IfcStore.GetIfcSchemaVersion(ifcPath, out schemaIdentifier);
                            if (ifcVersion == IfcSchemaVersion.Ifc4)
                            {
                                toIgnore[2] = m_Model.Metadata.ExpressTypeId("IFCVOIDINGFEATURE");
                                toIgnore[3] = m_Model.Metadata.ExpressTypeId("IFCSURFACEFEATURE");
                            }

                            foreach(IIfcProduct objProdItem in lstProducts)
                            {
                                foreach(XbimShapeInstance shapeInt in context.ShapeInstancesOf(objProdItem))
                                {
               
                                    if (((IXbimShapeGeometryData)context.ShapeGeometry(shapeInt)).ShapeData.Length <= 0) //no geometry to display so don't write out any products for it
                                        continue;
                                    if (((IXbimShapeGeometryData)context.ShapeGeometry(shapeInt)).ReferenceCount > 1)
                                    {
                                        var instances = geomRead.ShapeInstancesOfGeometry(((IXbimShapeGeometryData)context.ShapeGeometry(shapeInt)).ShapeLabel);

                                        var xbimShapeInstances = instances.Where(si => !toIgnore.Contains(si.IfcTypeId) &&
                                                                                        si.RepresentationType ==
                                                                                        XbimGeometryRepresentationType
                                                                                            .OpeningsAndAdditionsIncluded && prodIds.Contains(si.IfcProductLabel)).ToList(); // 
                                        //
                                        if (!xbimShapeInstances.Any()) continue;
                                        numberOfGeometries++;
                                        if (xbimShapeInstances.Count == 1)
                                            bw.Write(-1);
                                        else
                                            bw.Write(xbimShapeInstances.Count); //the number of repetitions of the geometry
                                        int x = 0;
                                        foreach (IXbimShapeInstanceData xbimShapeInstance in xbimShapeInstances)
                                        //write out each of the ids style and transforms
                                        {
                                            bw.Write(xbimShapeInstance.IfcProductLabel);
                                            bw.Write((UInt16)xbimShapeInstance.IfcTypeId);
                                            bw.Write((UInt32)xbimShapeInstance.InstanceLabel);
                                            bw.Write((Int32)xbimShapeInstance.StyleLabel > 0
                                                ? xbimShapeInstance.StyleLabel
                                                : xbimShapeInstance.IfcTypeId * -1);
                                            bw.Write(xbimShapeInstance.Transformation);
                                            numberOfTriangles +=
                                                XbimShapeTriangulation.TriangleCount(((IXbimShapeGeometryData)context.ShapeGeometry(shapeInt)).ShapeData);
                                            numberOfMatrices++;
                                            ++x;
                                            //if (x == 2)
                                            //    break;
                                        }
                                        numberOfVertices +=
                                            XbimShapeTriangulation.VerticesCount(((IXbimShapeGeometryData)context.ShapeGeometry(shapeInt)).ShapeData);
                                        // binaryStream.Write(geometry.ShapeData);
                                        var ms = new MemoryStream(((IXbimShapeGeometryData)context.ShapeGeometry(shapeInt)).ShapeData);
                                        var br = new BinaryReader(ms);
                                        var tr = br.ReadShapeTriangulation();

                                        tr.Write(bw);
                                    }
                                    else if (context.ShapeGeometry(shapeInt).ReferenceCount == 1)//now do the single instances
                                    {
                                        var xbimShapeInstance = geomRead.ShapeInstancesOfGeometry(((IXbimShapeGeometryData)context.ShapeGeometry(shapeInt)).ShapeLabel).FirstOrDefault();

                                        if (xbimShapeInstance == null || toIgnore.Contains(xbimShapeInstance.IfcTypeId) ||
                                            xbimShapeInstance.RepresentationType != XbimGeometryRepresentationType.OpeningsAndAdditionsIncluded)//|| !prodIds.Contains(xbimShapeInstance.IfcProductLabel)
                                            continue;
                                        numberOfGeometries++;

                                        // IXbimShapeGeometryData geometry = ShapeGeometry(kv.Key);
                                        bw.Write((Int32)1); //the number of repetitions of the geometry (1)
                                        bw.Write((Int32)xbimShapeInstance.IfcProductLabel);
                                        bw.Write((UInt16)xbimShapeInstance.IfcTypeId);
                                        bw.Write((Int32)xbimShapeInstance.InstanceLabel);
                                        bw.Write((Int32)xbimShapeInstance.StyleLabel > 0
                                            ? xbimShapeInstance.StyleLabel
                                            : xbimShapeInstance.IfcTypeId * -1);
                                        
                                        //Read all vertices and normals in the geometry stream and transform

                                        var ms = new MemoryStream(((IXbimShapeGeometryData)context.ShapeGeometry(shapeInt)).ShapeData);
                                        var br = new BinaryReader(ms);
                                        var tr = br.ReadShapeTriangulation();
                                        var trTransformed = tr.Transform(((XbimShapeInstance)xbimShapeInstance).Transformation);
                                        trTransformed.Write(bw);
                                        numberOfTriangles += XbimShapeTriangulation.TriangleCount(((IXbimShapeGeometryData)context.ShapeGeometry(shapeInt)).ShapeData);
                                        numberOfVertices += XbimShapeTriangulation.VerticesCount(((IXbimShapeGeometryData)context.ShapeGeometry(shapeInt)).ShapeData);
                                    }
                                 }
                            }

                            bw.Seek(start, SeekOrigin.Begin);
                            bw.Write((Int32)numberOfGeometries);
                            bw.Write((Int32)numberOfVertices);
                            bw.Write((Int32)numberOfTriangles);
                            bw.Write((Int32)numberOfMatrices);
                            bw.Write((Int32)numberOfProducts);
                            bw.Seek(0, SeekOrigin.End); //go back to end
                            // ReSharper restore RedundantCast
                        }
                    
                    }   
              
                    Geometry = ws.ToArray();
                }
                return 0;
            }
            catch (Exception e)
            {
                System.Console.Out.Write(e.Message);
                return 9;
            }
        }

        private void GetParentProductIds(IIfcProduct objProd,ref string ProdIds)
        {
            if (objProd.IsContainedIn != null)
            {
                ProdIds += objProd.IsContainedIn.EntityLabel + ";";
                GetParentProductIds((IIfcProduct)objProd.IsContainedIn,ref ProdIds);
            }    
            else if(objProd.Decomposes.Count()>0)
            {
                if (objProd.Decomposes.FirstOrDefault().RelatingObject != null && !(objProd.Decomposes.FirstOrDefault().RelatingObject is  IIfcProject))
                {
                    ProdIds += objProd.Decomposes.FirstOrDefault().RelatingObject.EntityLabel + ";";
                    GetParentProductIds((IIfcProduct)objProd.Decomposes.FirstOrDefault().RelatingObject, ref ProdIds);
                }
            }
        }
        private void GetEntityListForProduct(IIfcProduct objProd,ref List<IIfcProduct> lstTemp,bool bShowRelated,bool bShowContaining)
        {
            lstTemp.Add(objProd);
            
            //Get all sub products and call this function for that products
            List<IIfcRelAggregates> breakdown = objProd.IsDecomposedBy.ToList();
            if (breakdown.Any())
                foreach (IIfcRelAggregates rel in breakdown)
                    foreach (IfcProduct subprod in rel.RelatedObjects.OfType<IfcProduct>())
                    {
                        GetEntityListForProduct(subprod, ref lstTemp,bShowRelated, bShowContaining);
                     }

            //Get all related products and call this function for that products
            if (bShowRelated)
            {
                if (objProd is IIfcSpace)
                {
                    //get bounded by elements of the space
                    IIfcSpace objSpace = objProd as IIfcSpace;
                    foreach (IIfcRelSpaceBoundary objRel in objSpace.BoundedBy.ToList())
                    {
                        IfcProduct objRelProd = objRel.RelatedBuildingElement as IfcProduct;
                        if (objRelProd != null)
                        {
                            if (!(objRelProd is IIfcCovering || objRelProd is IIfcSlab))// Avoid Covering and slab from related list
                                GetEntityListForProduct(objRelProd, ref lstTemp, bShowRelated, bShowContaining);
                        }
                    }
                }
            }

            //Get all containig elements  and call this function for that products
            IIfcSpatialStructureElement objSpatial = objProd as IIfcSpatialStructureElement;
            if (objSpatial != null)
            {             
                if (bShowContaining)
                {         
                    //If the product is a Site iterate through all building
                    if (objProd is IIfcSite)
                    {
                        IIfcSite objSite = objProd as IIfcSite;
                        foreach (IIfcProduct objSubProd in objSite.Buildings.ToList())
                        {
                            GetEntityListForProduct(objSubProd, ref lstTemp, bShowRelated, bShowContaining);
                        }
                    }

                    //If the product is a building iterate through all floor
                    if (objProd is IIfcBuilding)
                    {
                        IIfcBuilding objBuild = objProd as IIfcBuilding;
                        foreach (IIfcProduct objSubProd in objBuild.BuildingStoreys.ToList())
                        {
                            GetEntityListForProduct(objSubProd, ref lstTemp, bShowRelated, bShowContaining);
                        }
                    }

                    //If the product is a floor iterate through all space
                    if (objProd is IIfcBuildingStorey)
                    {
                        IIfcBuildingStorey objFloor = objProd as IIfcBuildingStorey;
                        foreach (IIfcProduct objSubProd in objFloor.Spaces.ToList())
                        {
                            GetEntityListForProduct(objSubProd, ref lstTemp, bShowRelated, bShowContaining);
                        }
                    }

                    //Iterate through all containing elements
                    foreach (IIfcProduct objSubProd in objSpatial.ContainsElements.FirstOrDefault().RelatedElements.ToList())
                    {
                        GetEntityListForProduct(objSubProd, ref lstTemp, bShowRelated, bShowContaining);
                    }                
                }
            }
        }
        private byte[] FileToByteArray(string fileName, ref short returnCode)
        {
            byte[] fileData = null;

            try
            {
                using (FileStream fs = new FileStream(fileName, FileMode.Open, FileAccess.Read))
                {
                    using (BinaryReader binaryReader = new BinaryReader(fs))
                    {
                        fileData = binaryReader.ReadBytes((int)fs.Length);
                    }
                }
                returnCode = 0;
            }
            catch(Exception e)
            {
                returnCode = 2;
            }
            return fileData;
        }
        private string FileToString(string fileName, ref short returnCode)
        {
            string fileData = null;

            try
            {
                using (FileStream fs = new FileStream(fileName, FileMode.Open, FileAccess.Read))
                {
                    using (StreamReader streamReader = new StreamReader(fs))
                    {
                        fileData = streamReader.ReadToEnd();
                    }
                }
                returnCode = 0;
            }
            catch (Exception e)
            {
                returnCode = 2;
            }
            return fileData;
        }
        private Facility FileToFacility(string fileName)
        {

            try
            {
                return Facility.ReadJson(fileName);
            }
            catch (Exception e)
            {
                return null;
            }
            
        }
    }
    
}
import { Injectable } from '@angular/core';
import {HttpHelpers} from '../../../../Whatever/utils/HttpHelpers';
import { Http } from '@angular/http';
import {CommonDrawings} from '../../../common/drawings/drawings-services';
import {SpaceOpenDrawing} from '../../../space/drawings/spaceopendrawing.services';
import {EmployeeDrawingService} from '../../../../models/employee/employeedrawing.services';
//Assets Service
import {AssetsDrawingService} from '../../../../models/objects/assets/drawings/assetsdrawing.service';
import { ObjectsService } from '../../../../Models/Objects/objects.service'
import {IField} from  '../../../../Framework/Models/Interface/IField'
/*ObjectCategoryId: 1 Assets Module ID: 7 displaysettings categoryid= 3 Additionalcategoryid: 19 */
export class AssetsOpenDrawing {
    //assetsDrawingService: AssetsDrawingService;
    //objectsService: ObjectsService;
    //commonDwgServices: CommonDrawings;
    //objiWhiz: any;
    //spaceOpenDrawingObj: any;
    //drawingId: number;
    //moduleId: number;
    //objectname: any;
    //objectmultiplename: any;
    //http: any;
    //drawingCategoryId: number;
    //pageTarget: number;
    ///*Column and row delimiter*/
    //rowDelimiter: string;
    //colDelimiter: string;
    //empDrawingService: EmployeeDrawingService;
    ///*to get total asset num and datas*/
    //totalObjects: number;
    //objectsData: any;
    //objectsDataCountClasswise: any[];
    //objectsDisplaySettingData: any;
    //categoryId: number;
    ///* ***************************** */
    ////categoryId = 3;
    //addtlDataFieldCategoryId = 19;
    ///* ***************************** */

    //g_dblScaleFactor = 1;
    //g_dblAssetsTextAngle = 0;
    //arrayCount: number = 0;
    //strAssetsTextLayer: string;


    ///* For drawing asset symbol */
    //strAssetsSymbolCords: string;
    //strAssetsSymbolText: string;
    //strAssetsTextHeight: number = 0;
    //strObjectsSymbolLayer: string;


    //g_dblAssetsSymbolLineWidth = 0.0;
    //g_strAssetsSymbolLineType = "ByLayer";
    //g_intAssetsTextStyleId = 1;
    //resultDataArray = [];

    //objectsHandlesData: AssetsHandleData[] = [];
    //dataInDrawingTextHandles: DataForDrawing[] = [];
    //assetsTooltipData: DataForDrawing[] = [];
    //multipleMoveData: MultipleMoveData[] = [];

    //handlesforblink: any;
    //handlesToRemoveblink: any;
    //selectedObjectDetails: any[];
    //blnPermittedSpace: boolean = false;
    //g_strObjectApplicationLayers: string = "$HatchObject;"
    //g_blnAllowMultipleSelection: boolean = false; /* For proper messgae in multiple place object */
    //strCheckPermissionForSelectedPoint: string = "0";
    ///* spaceId: number = 0; */
    //g_blnModuleAdmin: boolean = true; /* Need to take it from db... as per the time being it is set as a static variable. */
    //blnIsSpace: boolean;
    //isSpace: boolean = true;
    //objectsSymbolTextHandleData: objectsSymbolTextHandleData[] = [];
    //delinkAssets: DelinkAsset[] = [];
    //arraycount: number = 0;
    //beforeMoveSpaceId: any = undefined;
    //msgcount: any = 0;
    //placemsgcount: any = 0;
    //notificationServices;
    //userRoleId: number;
    //TotalizeDataForLegend: any;
    //multipleMoveIndex: number;
    //IsBarcodeSubscribed: boolean = false;
    //objectCategoryId: number;
    //displaySettingCategoryId: number;
    //IsAutoNumbering: boolean = false;
    //blinkColorCodeR: number = 255;
    //blinkColorCodeG: number = 0;
    //blinkColorCodeB: number = 0;
    //drawinglayerNameForSelectEntity: string = "";
    //typeIDForSelectEntity: number = 0;
    //cursorIndex: number = 12;
    //xrefedDrawingId: number;
    //constructor(private iWhizObject: any, drawingId: number, moduleId: number, drawingCategoryId: number, pageTarget: number, notificationService, http: Http, xrefedDrawing: number) {
    //    this.objiWhiz = iWhizObject;
    //    this.drawingId = drawingId;
    //    this.moduleId = moduleId;
    //    this.drawingCategoryId = drawingCategoryId;
    //    this.notificationServices = notificationService;
    //    this.pageTarget = pageTarget;
    //    this.http = http;
    //    this.xrefedDrawingId = xrefedDrawing;
    //    this.empDrawingService = new EmployeeDrawingService(this.http);

    //    switch (this.moduleId) {
    //        case 6:
    //            this.objectname = "Object";
    //            this.objectmultiplename = "Objects"
    //            this.objectCategoryId = 3;
    //            this.categoryId = 5;//displaysettings
    //            break;
    //        case 7:
    //            this.objectname = "Asset";
    //            this.objectmultiplename = "Assets"
    //            this.objectCategoryId = 1;
    //            this.categoryId = 3;
    //            break;
    //        case 8:
    //            this.objectname = "Furniture";
    //            this.objectmultiplename = "Furniture"
    //            this.objectCategoryId = 2;
    //            this.categoryId = 4;
    //            break;
    //        case 17:
    //            this.objectname = "Component";
    //            this.objectmultiplename = "Components"
    //            this.objectCategoryId = 8;
    //            this.categoryId = 9;
    //            break;
    //        case 18:
    //            this.objectname = "Component";
    //            this.objectmultiplename = "Components"
    //            this.objectCategoryId = 9;
    //            this.categoryId = 10;
    //            break;
    //        case 24:
    //            this.objectname = "Equipment";
    //            this.objectmultiplename = "Equipments"
    //            this.objectCategoryId = 20;
    //            this.categoryId = 32;
    //            break;
    //        case 25:
    //            this.objectname = "Component";
    //            this.objectmultiplename = "Components"
    //            this.objectCategoryId = 10;
    //            this.categoryId = 20;
    //            break;
    //        case 26:
    //            this.objectname = "Component";
    //            this.objectmultiplename = "Components"
    //            this.objectCategoryId = 11;
    //            this.categoryId = 22;
    //            break;
    //        case 27:
    //            this.objectname = "Component";
    //            this.objectmultiplename = "Components"
    //            this.objectCategoryId = 12;
    //            this.categoryId = 24;
    //            break;
    //        default:
    //            break;
    //    }



    //}
    ///* Initialise objects */
    //initilizeObjects = function (resCallback) {
    //    var contextObj = this;
    //    var drawingid;
    //    if (this.xrefedDrawingId == 0 || this.xrefedDrawingId == undefined || this.xrefedDrawingId==null)
    //        drawingid = this.drawingId;

    //    else
    //        drawingid = this.xrefedDrawingId
    //    this.spaceOpenDrawingObj = new SpaceOpenDrawing(this.objiWhiz, drawingid, this.moduleId, this.http);
    //    contextObj.assetsDrawingService = new AssetsDrawingService(contextObj.http);
    //    contextObj.objectsService = new ObjectsService(contextObj.http);
    //    contextObj.objectsService.getCustomerSubscribedFeaturesBarcode("105,72,73").subscribe(function (rt) {
    //        rt["Data"].find(function (item) {

    //            switch (item.Id) {
    //                case 72:
    //                    if (item["IsSubscribed"] == true && item["Id"] == 72) {
    //                        if (contextObj.objectCategoryId == 1)
    //                            contextObj.IsAutoNumbering = true;
    //                    }
    //                    break;
    //                case 73:
    //                    if (item["IsSubscribed"] == true && item["Id"] == 73) {
    //                        if (contextObj.objectCategoryId == 2)
    //                            contextObj.IsAutoNumbering = true;
    //                    }
    //                    break;
    //                case 105:
    //                    if (item["IsSubscribed"] == true && item["Id"] == 105) {
    //                        contextObj.IsBarcodeSubscribed = true;
    //                    }
    //                    break;
    //                case 107:
    //                    if (item["IsSubscribed"] == true && item["Id"] == 107) {
    //                        contextObj.IsBarcodeSubscribed = true;
    //                    }
    //                    break;
    //            }
    //        });
    //    });
    //    contextObj.getAllAssetsDetails(function (retCode) { });
    //    contextObj.getObjectsDisplaySettingsData();
    //    contextObj.getAssetsSymbolDetails(function (retCode) { });
    //    contextObj.spaceOpenDrawingObj.initilizeObjects(function (retCode) {
    //        contextObj.commonDwgServices = contextObj.spaceOpenDrawingObj.commonServices;
    //        contextObj.userRoleId = contextObj.commonDwgServices.sessionUserRoleId;
    //        contextObj.rowDelimiter = contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter
    //        contextObj.colDelimiter = contextObj.spaceOpenDrawingObj.commonServices.columnDelimiter;
    //        contextObj.isSpace = contextObj.spaceOpenDrawingObj.commonServices.isSpace;
    //        resCallback(0);
    //    });
    //}

    ///*---------------------------------------------------------------*/
    ///*Permission for the selected point : for Place*/
    //CheckPermissionForSelectedPoint = function (MaxX, MaxY, Target, rescallBack) {

    //    var contextObj = this;
    //    /*var blnIsSpace: boolean;*/
    //    var strLayerName: string;
    //    var blnEditPermission: boolean = false;
    //    var g_intUserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
    //    if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
    //        contextObj.blnIsSpace = false;
    //        strLayerName = contextObj.commonDwgServices.netLayername;
    //    }
    //    else {
    //        contextObj.blnIsSpace = true;
    //        strLayerName = contextObj.commonDwgServices.spacelayerName;
    //    }
    //    var blnLayerIsVisible = [0];
    //    var returnCode = contextObj.objiWhiz.getLayerVisibility(strLayerName, blnLayerIsVisible);
    //    if (returnCode == 0) {
    //        contextObj.objiWhiz.setLayerVisibility(strLayerName, true, function (retcode) {

    //            if (retcode == 0) {
    //                contextObj.objiWhiz.getHandleWithDWGPoint(MaxX, MaxY, contextObj.blnIsSpace, function (IsSpace, strSpaceOrNetHandle) {

    //                    if ((strSpaceOrNetHandle != null) && (strSpaceOrNetHandle != "")) {

    //                        contextObj.strCheckPermissionForSelectedPoint = strSpaceOrNetHandle;
    //                        contextObj.objiWhiz.setLayerVisibility(strLayerName, blnLayerIsVisible[0], function (returnCode) {

    //                            if (returnCode == 0) {
    //                                if (g_intUserRoleId > 3) {
    //                                    // //debugger
    //                                    var spaceId = contextObj.getSpaceIdFromSpaceHandle(strSpaceOrNetHandle);
    //                                    contextObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {

    //                                        contextObj.notificationServices.ClearAllToasts();
    //                                        if (blnEditPermission == false) {
    //                                            contextObj.notificationServices.ClearAllToasts();
    //                                            if (Target == 3)
    //                                                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
    //                                            else
    //                                                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
    //                                            contextObj.strCheckPermissionForSelectedPoint = "0";
    //                                            rescallBack(contextObj.strCheckPermissionForSelectedPoint);
    //                                        }
    //                                        else {
    //                                            rescallBack(contextObj.strCheckPermissionForSelectedPoint);//by aswathy on 21/03/17
    //                                        }
    //                                    });
    //                                }
    //                                else {
    //                                    rescallBack(contextObj.strCheckPermissionForSelectedPoint);
    //                                }
    //                            }
    //                            else {
    //                                rescallBack("0");
    //                            }
    //                        });
    //                    }

    //                    else {/*
    //                              contextObj.strCheckPermissionForSelectedPoint = "0";
    //                              //debugger;
    //                              if (g_intUserRoleId > 3) {
    //                                  //contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space, Select another space", 3);
    //                                  contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 3);
    //                                  rescallBack("0");
    //                              }
    //                              else {
    //                                  rescallBack(contextObj.strCheckPermissionForSelectedPoint);
    //                              }
    //                              */
    //                        contextObj.notificationServices.ClearAllToasts();
    //                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
    //                        rescallBack("0");
    //                    }
    //                });
    //            }
    //            else {
    //                rescallBack("0");
    //            }
    //        });
    //    }
    //    else {
    //        rescallBack("0");
    //    }

    //}
    ///*PlaceSymbol--- From assets grid->drawinglist grid -> opendrawing Pagetarget : 2   || drawinglist grid -> opendrawing Pagetarget : 1 */
    //placeSymbolInDrawing = function (selectedObjectDetails, SiteId, SpaceId, resCallback) {
    //    var contextObj = this;
     
    //    //var SymbolLayerName = "$Test";
    //    //AssetLayer created with objectclassid and objectid
    //    var formatedText = "";
    //    var MinX = [0];
    //    var MinY = [0];
    //    var MaxX = [0];
    //    var MaxY = [0];
    //    var spaceId;
    //    /*set the cursor */
    //    contextObj.objiWhiz.setCursor(2);
    //    var SymbolId = selectedObjectDetails["SymbolId"];
    //    /*Taking symbol details*/
    //    var index = contextObj.resultDataArray.findIndex(function (el) { return el.Id === SymbolId });
    //    if (index != -1) {
    //        var item = contextObj.resultDataArray[index];
    //        contextObj.strAssetsSymbolText = item.SymbolText;       /*symboltext */
    //        contextObj.strAssetsTextHeight = item.TextHeight;       /*symboltext height*/
    //        contextObj.strAssetsSymbolCords = item.CoordinateString.replace(/,/g, contextObj.colDelimiter);   //coordinates 
    //        contextObj.strAssetsSymbolCords = contextObj.strAssetsSymbolCords.replace(/;/g, contextObj.rowDelimiter);
    //        contextObj.objiWhiz.getDWGExtents(MinX, MinY, MaxX, MaxY);
    //        /*Get dwg point*/
    //        contextObj.objiWhiz.getDWGPoint(function (returnCode, dXCoord, dYCoord) {
    //            if (returnCode != 0) {
    //                /*console.log('Failure: getDWGPoint------------------------' + returnCode);*/
    //                resCallback(returnCode);
    //            }
    //            else {
    //                //condition to deal with archi and util drawing
    //                if (contextObj.drawingCategoryId != 1) {
    //                    contextObj.PlaceCoreSymbol(dXCoord, dYCoord, 0, selectedObjectDetails, SiteId, function (resplacecallbak) {
    //                        if (resplacecallbak == 0)
    //                            resCallback(0)
    //                        else
    //                            resCallback(resplacecallbak)
    //                    })
    //                }
    //                else {
    //                    contextObj.objiWhiz.getHandleWithDWGPoint(dXCoord, dYCoord, contextObj.blnIsSpace, function (IsSpace, strSpaceOrNetHandle) {
    //                        var spaceId = contextObj.getSpaceIdFromSpaceHandle(strSpaceOrNetHandle);
    //                        contextObj.strCheckPermissionForSelectedPoint = strSpaceOrNetHandle;
    //                        contextObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {
    //                            if (blnEditPermission) {
    //                                contextObj.PlaceCoreSymbol(dXCoord, dYCoord, spaceId, selectedObjectDetails, SiteId, function (resplacecallbak) {
    //                                    if (resplacecallbak == 0)
    //                                        resCallback(0)
    //                                    else
    //                                        resCallback(resplacecallbak)
    //                                })
    //                            }
    //                            else {
    //                                contextObj.strCheckPermissionForSelectedPoint = "0";
    //                                resCallback(contextObj.strCheckPermissionForSelectedPoint);                                  
    //                            }
    //                        });
    //                    });
    //                }
    //            }
    //        });
    //    }
    //}
    ////function to place asset
    //PlaceCoreSymbol = function (Xpos, Ypos, spaceid, selectedObjectDetails, SiteId, callback) {
    //    var contextObj = this;
    //    var strClassname;
    //    var formatedText = "";
    //    var strAssetNo;
    //    switch (this.moduleId) {
    //        case 6:
    //            strClassname = selectedObjectDetails["Object Class"];
    //            strAssetNo = selectedObjectDetails["Object No."];
    //        case 7:
    //            strClassname = selectedObjectDetails["Asset Class"];
    //            strAssetNo = selectedObjectDetails["Asset No."];
    //            break;
    //        case 8:
    //            strClassname = selectedObjectDetails["Furniture Class"];
    //            strAssetNo = selectedObjectDetails["Furniture No."];
    //            break;
    //        case 17:
    //        case 18:
    //        case 25:
    //        case 26:
    //        case 27:
    //            strClassname = selectedObjectDetails["Component Type"];
    //            strAssetNo = selectedObjectDetails["Component No."];
    //            break;
    //        case 24:
    //            strClassname = selectedObjectDetails["Equipment Type"];
    //            strAssetNo = selectedObjectDetails["Equipment No."];
    //            break;
    //    }
    //    var intObjectId = selectedObjectDetails["ObjectId"];
     
    //    /* if (SymbolId != null) {
    //         var SymbolId = 494; */
    //    var ClassId = selectedObjectDetails["ObjectClassId"];
    //    var intColorId = selectedObjectDetails["SymbolColor"];
    //    var SymbolLayerName = "$SL_" + ClassId + "_" + intObjectId;
    //    contextObj.assetsDrawingService.updateAssetsSymbolData(9, spaceid, Xpos, Ypos, 0, contextObj.drawingId, contextObj.objectCategoryId, SiteId, intObjectId).subscribe(function (resultData) {
    //        ////debugger;
    //        if (resultData["Data"]["Message"] == "Success") {
    //            contextObj.assetsDrawingService.getAllAssetsDetails(contextObj.objectCategoryId, contextObj.drawingId, 2, intObjectId).subscribe(function (resultData) {
    //                selectedObjectDetails = null;
    //                selectedObjectDetails = JSON.parse(resultData.FieldBinderData);
    //                if (contextObj.totalObjects != null && contextObj.totalObjects != undefined)
    //                    contextObj.totalObjects = parseInt(contextObj.totalObjects) + 1;
    //                ////debugger;

    //                //console.log('Success: getDWGPoint------------------------' + returnCode);                           
    //                //inserting symbol              
    //                contextObj.objiWhiz.insertSymbol(SymbolLayerName, intColorId, Xpos, Ypos, contextObj.strAssetsSymbolCords, contextObj.g_dblAssetsSymbolLineWidth, contextObj.g_strAssetsSymbolLineType, contextObj.g_dblScaleFactor, function (returnCode, symbolHandle, ActualPoints) {
    //                    // //debugger;
    //                    if (returnCode != 0) {
    //                        //console.log('Failure: insertSymbol------------------------' + returnCode);
    //                        callback(0);
    //                    }
    //                    else {
    //                        //console.log('Success: insertSymbol------------------------' + returnCode);
    //                        contextObj.objectsHandlesData.push({ AssetsId: intObjectId, SymbolHandle: symbolHandle });
    //                        var ratio = [0];
    //                        contextObj.objiWhiz.clientDWGAreaRatio(ratio);
    //                        //inserting symbol text
    //                        if ((contextObj.strAssetsSymbolText != "") && (contextObj.strAssetsSymbolText != null)) {
    //                            contextObj.objiWhiz.createText(SymbolLayerName, intColorId, Xpos, Ypos,
    //                                contextObj.g_dblAssetsTextAngle, contextObj.strAssetsTextHeight, 1, contextObj.strAssetsSymbolText,
    //                                "Standard", 5, function (returnCode, entityHandle) {
    //                                    ////debugger;
    //                                    if (returnCode != 0) {
    //                                        //console.log('Error occured while creating symbol text : due to errorcode--' + returnCode);
    //                                        callback(0);
    //                                    }
    //                                    else {
    //                                        contextObj.objectsSymbolTextHandleData.push({ Key: intObjectId, Value: entityHandle });
    //                                        //console.log('Success: Created Symbol Text------------------------' + returnCode);
    //                                    }
    //                                });
    //                        }
    //                        var assetsDispSettingsData = contextObj.objectsDisplaySettingData.slice();
    //                        for (let dispSettingsItem of assetsDispSettingsData) {
    //                            if (dispSettingsItem.ShowinDrawing) {
    //                                var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
    //                                var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
    //                                let textContent = selectedObjectDetails[0][dispSettingsItem.FieldName];
    //                                if (textContent == "null" || textContent == null)
    //                                    textContent = "-";

    //                                if ((dispSettingsItem.ObjectClassId != 0) && (selectedObjectDetails[0].ObjectClassId != 0)) {
    //                                    if (dispSettingsItem.ObjectClassId != selectedObjectDetails[0].ObjectClassId) {
    //                                        textContent = "";
    //                                    }
    //                                }
    //                                if (textContent != "")
    //                                    formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
    //                                // formatedText += "\\fTimes New Roman|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
    //                            }
    //                        }
    //                        let formatedTextFinal: string = "{" + formatedText + "}";
    //                        contextObj.objiWhiz.getEntityExtents(symbolHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
    //                            ////debugger;                        
    //                            if (retCode != 0) {
    //                                //console.log('Failure: getEntityExtents------------------------' + returnCode);
    //                                callback(0);
    //                            }
    //                            else {
    //                                //console.log('Success: getEntityExtents------------------------' + returnCode);
    //                                //creating text very near to the symbol : details text
    //                                ////debugger;
    //                                contextObj.strObjectsSymbolLayer = "$SL_" + ClassId + "_" + intObjectId; //AssetLayer created with objectclassid and objectid
    //                                contextObj.objiWhiz.createMultilineText(contextObj.strObjectsSymbolLayer, 1, MaxX, MaxY, 0, 3,
    //                                    0, 1, formatedTextFinal, "Standard", contextObj.g_intAssetsTextStyleId, function (retCode, entityHandle) {
    //                                        ////debugger;
    //                                        if (retCode != 0) {
    //                                            //console.log('Failure: createMultilineText------------------------' + returnCode);
    //                                            callback(0);
    //                                        }
    //                                        else {
    //                                            ////debugger;
    //                                            contextObj.dataInDrawingTextHandles.push({ Key: intObjectId, Value: entityHandle });

    //                                            //***********************for showing tooltip : push the selected data to objectsData object array*****************
    //                                            ////debugger;
    //                                            if (contextObj.objectsData != undefined) {
    //                                                {
    //                                                    /*------------get space id and space handle in the details----------------------------------------*/
    //                                                    if (selectedObjectDetails[0]["SpaceId"] == null) {
    //                                                        selectedObjectDetails[0]["SpaceId"] = spaceid
    //                                                        var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === spaceid });
    //                                                        if (index != -1) {
    //                                                            if (contextObj.blnIsSpace) {                                      /*blnIsSpace false - Carpet  else boma*/
    //                                                                selectedObjectDetails[0]['BomaHandle'] = contextObj.spaceOpenDrawingObj.spaceData[index]['BomaHandle'];
    //                                                            }
    //                                                            else {
    //                                                                selectedObjectDetails[0]['CarpetHandle'] = contextObj.spaceOpenDrawingObj.spaceData[index]['CarpetHandle'];
    //                                                            }
    //                                                        }
    //                                                    }
    //                                                    /*------update x,y coordinates in the details-----------------------------------------------*/
    //                                                    if (Xpos != null) {
    //                                                        selectedObjectDetails[0]['Xposition'] = Xpos;
    //                                                        selectedObjectDetails[0]['Yposition'] = Ypos;
    //                                                    }
    //                                                    /*********************************/
    //                                                    //----
    //                                                }

    //                                            }

    //                                            //------update details in the table                                               
    //                                            // contextObj.assetsDrawingService.updateAssetsSymbolData(9, SpaceId, dXCoord, dYCoord, 0, contextObj.drawingId, 1, SiteId, intObjectId).subscribe(function (resultData) {
    //                                            ////debugger;
    //                                            // if (resultData["Data"]["Message"] == "Success") {
    //                                            contextObj.assetsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
    //                                                contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
    //                                                contextObj.notificationServices.ClearAllToasts();
    //                                                ////debugger;
    //                                                contextObj.objectsData.push(selectedObjectDetails[0]);
    //                                                //if (contextObj.totalObjects != null && contextObj.totalObjects != undefined)
    //                                                //    contextObj.totalObjects = parseInt(contextObj.totalObjects) + 1;
    //                                                contextObj.notificationServices.ShowToaster(strClassname + " (" + strAssetNo + ") placed", 3);
    //                                                callback(1);
    //                                            });
    //                                            //}
    //                                            // else {
    //                                            //  resCallback(0);
    //                                            //}
    //                                            //});
    //                                        }
    //                                    });
    //                            }
    //                        });
    //                    }
    //                });
    //                //--------
    //                //here
    //            });
    //        }
    //    });

    //}
    ////While moving... check the permission for the selected space : For move only
    //MoveObjectPermission = function (MaxX, MaxY, param, resCallback) {
    //    ////debugger;
    //    var contextObj = this;
    //    var dblSpaceId = 0;
    //    var UserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
    //    contextObj.g_blnModuleAdmin = contextObj.commonDwgServices.isModuleAdmin;
    //    if (contextObj.drawingCategoryId == 1) { //archetectual    drawing    
    //        contextObj.g_blnAllowMultipleSelection = true;
    //        ////debugger;
    //        contextObj.MovePermissionForSelectedPoint(MaxX, MaxY, param, function (strSpaceOrNetHandle) {
    //            ////debugger;
    //            contextObj.g_blnAllowMultipleSelection = false;
    //            if (strSpaceOrNetHandle == "-1" || strSpaceOrNetHandle == null || strSpaceOrNetHandle == undefined) {
    //                contextObj.blnPermittedSpace = false;
    //                resCallback(0);
    //            }
    //            else {
    //                ////debugger;
    //                if (strSpaceOrNetHandle != "0" && strSpaceOrNetHandle != null && strSpaceOrNetHandle != undefined) {
    //                    contextObj.GetSpaceIdFromHandle(strSpaceOrNetHandle, function (SpaceId) {
    //                        ////debugger;
    //                        if (SpaceId != null && SpaceId != undefined && SpaceId != 0)
    //                            dblSpaceId = SpaceId;
    //                        else
    //                            dblSpaceId = 0;
    //                        resCallback(dblSpaceId);
    //                    });

    //                }
    //                else {
    //                    //contextObj.blnPermittedSpace = true;
    //                    dblSpaceId = 0
    //                    resCallback(0);
    //                }
    //                ////debugger;
    //                contextObj.blnPermittedSpace = true;
    //            }
    //        });
    //    }
    //    else { //utility    drawing
    //        if (UserRoleId == 4 || UserRoleId == 7) {
    //            contextObj.notificationServices.ClearAllToasts();
    //            if (param == 1)
    //                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
    //            else
    //                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
    //            contextObj.blnPermittedSpace = false;
    //            dblSpaceId = 0;
    //        }
    //        else if (UserRoleId == 6 || contextObj.g_blnModuleAdmin == false) {
    //            contextObj.notificationServices.ClearAllToasts();
    //            if (param == 1)
    //                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
    //            else
    //                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
    //            contextObj.blnPermittedSpace = false;
    //            dblSpaceId = 0;
    //        }
    //        else {
    //            contextObj.blnPermittedSpace = false;
    //            dblSpaceId = 1;
    //        }
    //        resCallback(dblSpaceId);
    //    }
    //    ////debugger;

    //}

    //EditInDrawing = function (spaceId, editAssetSelectedId, editObjectClassId, drawingId, rescallBack) {
    //    var contextObj = this;
    //    var withPrefix = false;
    //    var withoutPrefix = false;
    //    //debugger
    //    //  var blnEditPermission: boolean = true;
    //    contextObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {
    //        if (blnEditPermission == true) {
    //            contextObj.objectsService.getObjectDataEditFieldsList(contextObj.objectCategoryId, editAssetSelectedId, "edit", 2, 2, editObjectClassId.toString(), drawingId.toString(), "", 0, 0, 1, 1).subscribe(function (result) {
    //                var fieldDetailsAdd = result["Data"];
    //                contextObj.fieldDetailsAdd = result["Data"];
    //                var count = 0;
    //                contextObj.fieldDetailsAdd.find(function (item: IField) {
    //                    switch (item.ReportFieldId) {
    //                        case 4303:   /*Barcode*/
    //                            if (contextObj.IsBarcodeSubscribed == true) {
    //                                item.IsVisible = true;
    //                            }
    //                            else if (contextObj.IsBarcodeSubscribed == false) {
    //                                item.IsVisible = false;
    //                            }
    //                            count++;
    //                            break;
    //                        case 651:

    //                            if (item.FieldId == 1985) {//asset numner without prefix if autonumber subscription false
    //                                if (contextObj.IsAutoNumbering == false) {
    //                                    item.IsVisible = true;

    //                                    withoutPrefix = true;
    //                                    if (withPrefix == true)
    //                                        item.FieldValue = "";
    //                                }
    //                                else {
    //                                    item.IsVisible = false;
    //                                }

    //                            }
    //                            else if (item.FieldId == 1605) {//asset numner with prefix
    //                                item.IsEnabled = false;

    //                                if (contextObj.IsAutoNumbering == false) {
    //                                    withPrefix = true;
    //                                    item.IsVisible = false;
    //                                    if (withoutPrefix == true)
    //                                        item.FieldValue = "";
    //                                } else {
    //                                    item.IsVisible = true;

    //                                }
    //                                var tagNoItem = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 661 })
    //                                if (tagNoItem != undefined) {
    //                                    if (contextObj.IsAutoNumbering == false)
    //                                        tagNoItem.IsMandatory = true;
    //                                    else
    //                                        tagNoItem.IsVisible = false;
    //                                    tagNoItem.FieldLabel = item.FieldLabel;
    //                                }
    //                            }
    //                            count++;//2 times execution
    //                            break;
    //                        case 657:   /*class*/
    //                            item.IsEnabled = false;
    //                            item.IsMandatory = true;
    //                            contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, '', 1, 1, 0).subscribe(function (resultData) {
    //                                item.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
    //                            })
    //                            count++;
    //                            break;
    //                        case 7411:   /*site*/
    //                            if (contextObj.isSiteAdmin)
    //                                item.IsMandatory = true;
    //                            //if (contextObj.inputItems.rowData.Status == "Assigned")
    //                            item.IsEnabled = false;
    //                            count++;
    //                            break;

    //                    }
    //                    if (count == 5) { return true; }
    //                    else
    //                        return false;
    //                });
    //                //fieldDetailsAdd.find(function (item) {
    //                //    switch (item.ReportFieldId) {
    //                //        case 4303:   /*Barcode*/
    //                //            if (contextObj.IsBarcodeSubscribed == true) {
    //                //                item.IsVisible = true;
    //                //            }
    //                //            else if (contextObj.IsBarcodeSubscribed == false) {
    //                //                item.IsVisible = false;
    //                //            }
    //                //            break;
    //                //    }
    //                //    return item.ReportFieldId === 4303;
    //                //});
    //                //fieldDetailsAdd[1].IsEnabled = false;
    //                //fieldDetailsAdd[1].IsMandatory = true;
    //                //if (contextObj.isSiteAdmin)
    //                //    fieldDetailsAdd[3].IsMandatory = true;
    //                //contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, '', 1, 1, 0).subscribe(function (resultData) {
    //                //    fieldDetailsAdd[2].LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
    //                //})
    //                //switch (contextObj.moduleId) {
    //                //    case 7:
    //                //        fieldDetailsAdd[1].FieldLabel = "Asset No.";
    //                //        fieldDetailsAdd[2].FieldLabel = "Asset Class";
    //                //        break;
    //                //    case 8:
    //                //        fieldDetailsAdd[1].FieldLabel = "Furniture No.";
    //                //        fieldDetailsAdd[2].FieldLabel = "Furniture Class";
    //                //        break;
    //                //}
    //                //fieldDetailsAdd[2].IsEnabled = false;
    //                ////if (contextObj.inputItems.rowData.Status == "Assigned")
    //                //fieldDetailsAdd[3].IsEnabled = false;
    //                rescallBack(fieldDetailsAdd);

    //            });


    //        } else
    //            contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected Asset", 5);
    //    });
    //}
    ///*Permission for the selected point : Move functionality*/
    //MovePermissionForSelectedPoint = function (MaxX, MaxY, param, rescallBack) {

    //    var contextObj = this;
    //    /*var blnIsSpace: boolean;*/
    //    var strLayerName: string;
    //    var blnEditPermission: boolean = false;
    //    var g_intUserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
    //    if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
    //        contextObj.blnIsSpace = false;
    //        strLayerName = contextObj.commonDwgServices.netLayername;
    //    }
    //    else {
    //        contextObj.blnIsSpace = true;
    //        strLayerName = contextObj.commonDwgServices.spacelayerName;
    //    }
    //    var blnLayerIsVisible = [0];
    //    var returnCode = contextObj.objiWhiz.getLayerVisibility(strLayerName, blnLayerIsVisible);
    //    if (returnCode == 0) {
    //        contextObj.objiWhiz.setLayerVisibility(strLayerName, true, function (retcode) {

    //            if (retcode == 0) {
    //                contextObj.objiWhiz.getHandleWithDWGPoint(MaxX, MaxY, contextObj.blnIsSpace, function (IsSpace, strSpaceOrNetHandle) {

    //                    if ((strSpaceOrNetHandle != null) && (strSpaceOrNetHandle != "")) {

    //                        contextObj.strCheckPermissionForSelectedPoint = strSpaceOrNetHandle;
    //                        contextObj.objiWhiz.setLayerVisibility(strLayerName, blnLayerIsVisible[0], function (returnCode) {

    //                            if (returnCode == 0) {
    //                                if (g_intUserRoleId > 3) {
    //                                    // //debugger
    //                                    var spaceId = contextObj.getSpaceIdFromSpaceHandle(strSpaceOrNetHandle);
    //                                    contextObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {

    //                                        contextObj.notificationServices.ClearAllToasts();
    //                                        if (blnEditPermission == false) {
    //                                            //if (contextObj.g_blnAllowMultipleSelection == true) {
    //                                            contextObj.notificationServices.ClearAllToasts();
    //                                            if (param == 1)
    //                                                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
    //                                            else
    //                                                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
    //                                            contextObj.strCheckPermissionForSelectedPoint = "0";
    //                                            rescallBack(contextObj.strCheckPermissionForSelectedPoint);
    //                                        }
    //                                        else {
    //                                            rescallBack(contextObj.strCheckPermissionForSelectedPoint);//by aswathy on 21/03/17
    //                                        }
    //                                    });
    //                                }
    //                                else {
    //                                    rescallBack(contextObj.strCheckPermissionForSelectedPoint);
    //                                }
    //                            }
    //                            else {
    //                                rescallBack("0");
    //                            }
    //                        });
    //                    }

    //                    else {/*
    //                              contextObj.strCheckPermissionForSelectedPoint = "0";
    //                              //debugger;
    //                              if (g_intUserRoleId > 3) {
    //                                  //contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space, Select another space", 3);
    //                                  contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 3);
    //                                  rescallBack("0");
    //                              }
    //                              else {
    //                                  rescallBack(contextObj.strCheckPermissionForSelectedPoint);
    //                              }
    //                              */
    //                        contextObj.notificationServices.ClearAllToasts();
    //                        if (param == 1)
    //                            contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
    //                        else
    //                            contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
    //                        rescallBack("0");
    //                    }
    //                });
    //            }
    //            else {
    //                rescallBack("0");
    //            }
    //        });
    //    }
    //    else {
    //        rescallBack("0");
    //    }

    //}

    ////while placing a symbol, checking the permission
    //PlaceObjectPermission = function (MaxX, MaxY, Target, resCallback) {
    //    // debugger;
    //    var contextObj = this;
    //    var dblSpaceId = 0;
    //    var UserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
    //    contextObj.g_blnModuleAdmin = contextObj.commonDwgServices.isModuleAdmin;
    //    if (contextObj.drawingCategoryId == 1) { //archetectual    drawing    
    //        contextObj.g_blnAllowMultipleSelection = true;
    //        ////debugger;
    //        contextObj.CheckPermissionForSelectedPoint(MaxX, MaxY, Target, function (strSpaceOrNetHandle) {
    //            ////debugger;
    //            contextObj.g_blnAllowMultipleSelection = false;
    //            if (strSpaceOrNetHandle == "-1" || strSpaceOrNetHandle == null || strSpaceOrNetHandle == undefined) {
    //                contextObj.blnPermittedSpace = false;
    //                resCallback(0);
    //            }
    //            else {
    //                ////debugger;
    //                if (strSpaceOrNetHandle != "0" && strSpaceOrNetHandle != null && strSpaceOrNetHandle != undefined) {
    //                    contextObj.GetSpaceIdFromHandle(strSpaceOrNetHandle, function (SpaceId) {
    //                        ////debugger;
    //                        if (SpaceId != null && SpaceId != undefined && SpaceId != 0)
    //                            dblSpaceId = SpaceId;
    //                        else
    //                            dblSpaceId = 0;

    //                        resCallback(dblSpaceId);
    //                    });

    //                }
    //                else {
    //                    //contextObj.blnPermittedSpace = true;
    //                    dblSpaceId = 0
    //                    resCallback(0);
    //                }
    //                ////debugger;
    //                contextObj.blnPermittedSpace = true;
    //            }
    //        });
    //    }
    //    else { //utility    drawing
    //        if (UserRoleId == 4 || UserRoleId == 7) {
    //            contextObj.notificationServices.ClearAllToasts();
    //            if (Target == 3)
    //                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
    //            else
    //                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
    //            contextObj.blnPermittedSpace = false;
    //            dblSpaceId = 0;
    //        }
    //        else if (UserRoleId == 6 || contextObj.g_blnModuleAdmin == false) {
    //            contextObj.notificationServices.ClearAllToasts();
    //            contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
    //            contextObj.blnPermittedSpace = false;
    //            dblSpaceId = 0;
    //        }
    //        else {
    //            contextObj.blnPermittedSpace = false;
    //            dblSpaceId = 1;
    //        }
    //        resCallback(dblSpaceId);
    //    }
    //    ////debugger;

    //}
    ////Show data in drawing while loading
    //showDataInDrawing = function (dataChange, isXrefExists, resCallback) {
    //    // debugger;
    //    var contextObj = this;
    //    if (contextObj.drawingCategoryId == 1 || isXrefExists) { //drawingcategoryid=1 is archetectural - show both asset details and space details*********
    //        switch (dataChange) {
    //            case 'spaceDispChange': contextObj.spaceOpenDrawingObj.displaySettingData = null;
    //                contextObj.spaceOpenDrawingObj.getDisplaySettingsData(function (retCode) { });
    //                contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$SpaceData", function (retCode) {
    //                    contextObj.spaceOpenDrawingObj.showDataInDrawing(function (retCode) {

    //                        if (retCode == 0) {
    //                            resCallback(0);
    //                        }
    //                    });
    //                });
    //                break;

    //            case 'objectsDispChange': contextObj.objectsDisplaySettingData = null;
    //                contextObj.getObjectsDisplaySettingsData();
    //                contextObj.deleteLayerAlredyExists(contextObj.strObjectsSymbolLayer, function (retCode) {
    //                    contextObj.displayobjectsDataOnDrawing(function (returnCode) {
    //                        if (returnCode == 0)
    //                            resCallback(0);
    //                        else
    //                            resCallback(1);
    //                    });
    //                });
    //                break;


    //            case 'bothData':
    //                debugger
    //                contextObj.spaceOpenDrawingObj.showDataInDrawing(function (retCode) {
    //                    if (retCode == 0) {
    //                        contextObj.displayobjectsDataOnDrawing(function (returnCode) {
    //                            if (returnCode == 0)
    //                                resCallback(0);
    //                            else
    //                                resCallback(1);
    //                        });
    //                    }
    //                });
    //                break;
    //        }
    //    }
    //    else { //categoryid not 1 : is utility - show only asset details: no space details***********
    //        contextObj.displayobjectsDataOnDrawing(function (returnCode) {
    //            // //debugger;                               
    //            if (returnCode == 0)
    //                resCallback(0);
    //            else
    //                resCallback(1);
    //        });
    //    }
    //}

    //// for checking layer and delete layer if alredy exists (using diff selection of distribution map)
    //deleteLayerAlredyExists = function (LayerName, rescallBack) {
    //    var isExist = [0];
    //    this.objiWhiz.layerExists(LayerName, isExist);
    //   // this.objiWhiz.removeMaps(); // to remove solid hatches
    //    if (isExist[0]) {
    //        this.objiWhiz.deleteLayer(LayerName, function (retCode) {
    //            if (retCode != 0) {
    //                //console.log("deletelayer faild due to", retCode);
    //            }
    //            rescallBack(retCode);
    //        });
    //    }
    //    else
    //        rescallBack(0);
    //}



    //// showSelectedObjectZoomDrawing = function (ObjectId, strSpaceHandle, resCallback) {
    //showSelectedObjectZoomDrawing = function (ObjectId, SpaceId, resCallback) {
    //    ////debugger;
    //    var contextObj = this;
    //    var spaceId = 0;
    //    //  contextObj.GetSpaceHandleFromSpaceId(SpaceId, function (strSpaceOrNetHandle) {
    //    var index = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === ObjectId[0] });
    //    if (index != -1) {
    //        spaceId = contextObj.objectsData[index].SpaceId;
    //        contextObj.GetSpaceHandleFromSpaceId(spaceId, function (strSpaceOrNetHandle) {
    //            var dataitemIndex = contextObj.objectsHandlesData.findIndex(function (el) { return el.AssetsId === ObjectId[0] });
    //            if (dataitemIndex != -1) {
    //                var symbolHandle = contextObj.objectsHandlesData[dataitemIndex].SymbolHandle;
    //            }
    //            //var symbolHandle = contextObj.objectsHandlesData.find(function (el) { return el.AssetsId === ObjectId }).SymbolHandle;

    //            contextObj.deHatchObjects(function (retCode) {
    //                if (retCode == 0) {
    //                    //debugger
    //                    contextObj.objiWhiz.setCursor(1);
    //                    contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
    //                    contextObj.objiWhiz.regenerate();

    //                    contextObj.hatchObject(symbolHandle, function (retCode) {
    //                        if (retCode != 0) {
    //                            //console.log("hatchObject failed due to ", retCode);
    //                        }
    //                        else {
    //                            contextObj.spaceOpenDrawingObj.hatchSingleEntity(strSpaceOrNetHandle, function (retCode) {
    //                                contextObj.objiWhiz.zoomEntity(strSpaceOrNetHandle, function (rtCode) {
    //                                    if (rtCode != 0) {
    //                                        //console.log("zoomEntity failed due to", retCode);
    //                                    }
    //                                    resCallback(rtCode);
    //                                });
    //                            });
    //                        }
    //                    });
    //                }
    //            });
    //        });
    //    }
    //    else {
    //        resCallback(0);
    //    }

    //}
    //// });
    ////}
    //deHatchObjects = function (resCallback) {
    //    //debugger
    //    var contextObj = this;
    //    contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$HatchSingleEntity", function (retCode) {
    //       // contextObj.objiWhiz.removeMaps();
    //        resCallback(retCode);
    //    });
    //}
    ////*Delink from grid
    //DelinkSelectedassetonDrawing = function (ObjectId, selectedObjectDetails, resCallback) {
    //    ////debugger;
    //    var contextObj = this;
    //    var strClassname = selectedObjectDetails["Asset Class Name"];
    //    var strAssetNo = selectedObjectDetails["Asset No."];
    //    var SymbolId = selectedObjectDetails["SymbolId"];
    //    /* if (SymbolId != null) {
    //         var SymbolId = 494; */
    //    var ClassId = selectedObjectDetails["ObjectClassId"];
    //    var intColorId = selectedObjectDetails["SymbolColor"];
    //    //var SymbolLayerName = "$Test";
    //    var SymbolLayerName = "$SL_" + ClassId + "_" + ObjectId;
    //    var indexnew = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === ObjectId[0] });

    //    if (indexnew != -1) {
    //        contextObj.assetsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
    //            contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
    //            contextObj.objiWhiz.deleteLayer(SymbolLayerName, function (retCode) {
    //                resCallback(retCode);
    //                contextObj.objiWhiz.regenerate();
    //                //** remove details from the array used in this drawing
    //                //Clear all the client side arrays for proper functionality
    //                var indexobjectsHandlesData = contextObj.objectsHandlesData.findIndex(function (el) { return el.AssetsId === ObjectId[0] });
    //                if (indexobjectsHandlesData != -1)
    //                    contextObj.objectsHandlesData.splice(indexobjectsHandlesData, 1);


    //                var indexobjectsSymbolTextHandleData = contextObj.objectsSymbolTextHandleData.findIndex(function (el) { return el.Key === ObjectId[0] });
    //                if (indexobjectsSymbolTextHandleData != -1)
    //                    contextObj.objectsSymbolTextHandleData.splice(indexobjectsSymbolTextHandleData, 1);


    //                var indexdataInDrawingTextHandles = contextObj.dataInDrawingTextHandles.findIndex(function (el) { return el.Key === ObjectId[0] });
    //                if (indexdataInDrawingTextHandles != -1)
    //                    contextObj.dataInDrawingTextHandles.splice(indexdataInDrawingTextHandles, 1);

    //                if (indexnew != -1)
    //                    contextObj.objectsData.splice(indexnew, 1); //objectsData

    //                //updating totalObjects count
    //                if (contextObj.totalObjects != null && contextObj.totalObjects != undefined)
    //                    contextObj.totalObjects = parseInt(contextObj.totalObjects) - 1;

    //                //********************************************************
    //                contextObj.deHatchObjects(function (retCode) {
    //                    //debugger
    //                    if (retCode == 0) {
    //                        contextObj.objiWhiz.zoomExtents(function (ret) {
    //                            if (ret == 0)
    //                                resCallback(0);
    //                            else
    //                                resCallback(ret);
    //                        });
    //                    }
    //                    else
    //                        resCallback(retCode);
    //                });
    //            });
    //        });
    //    }

    //}
    ////Assets Multiple Hatch
    //showSelectedAssetInDrawing = function (ObjectIds, resCallback) {
    //    // debugger;
    //    var contextObj = this;
    //    var selectedHandles = [];
    //    var symbolHandles = [];
    //    for (let objId of ObjectIds) {
    //        var handle = contextObj.getSpaceHandleViaAssetId(objId);
    //        if (handle != undefined && handle != null && handle != "") {
    //            if (selectedHandles.length > 0) {
    //                var index = selectedHandles.findIndex(function (el) { return el === handle })
    //                if (index == -1)
    //                    selectedHandles.push(handle);
    //            }
    //            else
    //                selectedHandles.push(handle);
    //        }
    //        symbolHandles.push(contextObj.objectsHandlesData.find(function (el) { return el.AssetsId === objId }).SymbolHandle);
    //    }
    //    if (selectedHandles.length > 0) {
    //        contextObj.spaceOpenDrawingObj.hatchMultipleEntity(selectedHandles, function (retCode) {
    //            contextObj.hatchMultipleAssets(symbolHandles, function (returncode) {
    //                if (retCode != 0)
    //                    console.log("hatchMultipleEntity failed due to ", retCode);
    //                else {
    //                    contextObj.objiWhiz.zoomExtents(function (ret) {
    //                        contextObj.objiWhiz.blinkEntitiesByHandles(symbolHandles, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (returnCode) {
    //                            resCallback(retCode, selectedHandles);
    //                        });
    //                    });
    //                }
    //            });
    //        });
    //    }
    //}

    //// ****&&&((((

    ////hatchMultipleAssets = function (selectedHandles, resCallback) {
    ////    let contextObj = this;
    ////     if (selectedHandles.length > contextObj.arrayCount) {
    ////    var mapHandles = [];
    ////    var rgbColors = [];
    ////    for (var item in selectedHandles) {
    ////        if (selectedHandles[item] != "") {
    ////            mapHandles.push(selectedHandles[item]);
    ////            rgbColors.push([255, 255, 255]);
    ////        }
    ////    }
    ////    contextObj.objiWhiz.createMap(mapHandles, rgbColors, function (retCode) {
    ////        if (retCode != 0)
    ////            console.log("createMap failed due to ", retCode);
    ////        resCallback(0);
    ////    });

    ////}


    //hatchMultipleAssets = function (selectedHandles, resCallback) {
    //    let contextObj = this;
    //    if (selectedHandles.length > contextObj.arrayCount) {
    //        var symbolHandle = selectedHandles[contextObj.arrayCount];
    //        contextObj.objiWhiz.hatchEntity("$HatchMultipleAssets", symbolHandle, 7, 1, 1, 1, false, function (retCode, entityHandle) {
    //            contextObj.objiWhiz.setApplicationLayer("$HatchMultipleAssets");
    //            if (retCode != 0)
    //                console.log("hatchEntity failed due to ", retCode);
    //            contextObj.arrayCount++;
    //            contextObj.hatchMultipleAssets(selectedHandles, resCallback);
    //        });
    //    }
    //    else {
    //        contextObj.arrayCount = 0;
    //        resCallback(0);
    //    }

    //}




    //getSpaceHandleViaAssetId(AssetId) {
    //    ////debugger;
    //    var contextObj = this;
    //    var selectedSpacehandle: string = "";
    //    var spaceId = contextObj.objectsData.find(function (el) { return el.ObjectId === AssetId })['SpaceId'];
    //    if (contextObj.isSpace) {
    //        //selectedSpacehandle = contextObj.objectsData.find(function (el) { return el.ObjectId === AssetId })['BomaHandle'];            
    //        // selectedSpacehandle = contextObj.objectsData.find(function (el) { return el.ObjectId === AssetId })['CarpetHandle'];
    //        selectedSpacehandle = this.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId === spaceId })['BomaHandle'];

    //    }
    //    else {
    //        //var spaceId = contextObj.objectsData.find(function (el) { return el.ObjectId === AssetId })['SpaceId'];
    //        // selectedSpacehandle = contextObj.objectsData.find(function (el) { return el.ObjectId === AssetId })['CarpetHandle'];
    //        selectedSpacehandle = this.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId === spaceId })['CarpetHandle'];
    //    }

    //    return selectedSpacehandle;
    //}


    ////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@




    //hatchObject = function (symbolHandle, resCallback) {
    //    var contextObj = this;
    //    var mapHandle = [symbolHandle];
    //    var rgbColor = [[255, 255, 255]];
    //    contextObj.deHatchObjects(function (retCode) {
    //        contextObj.objiWhiz.createMap(mapHandle, rgbColor, function (retCode) {
    //            resCallback(retCode);
    //        });
    //    });
    //}

    //hatchMultipleAsset = function (symbolHandle, resCallback) {
    //    var contextObj = this;
    //    var mapHandle = [symbolHandle];
    //    var rgbColor = [[255, 255, 255]];
    //    contextObj.objiWhiz.createMap(mapHandle, rgbColor, function (retCode) {
    //        resCallback(retCode);
    //    });
    //}
    ////display asset data on drawing
    //displayobjectsDataOnDrawing = function (resCallback) {
    //    ////debugger;
    //    var contextObj = this;
    //    var ratio = [0];
    //    contextObj.objiWhiz.clientDWGAreaRatio(ratio);
    //    var objectsData: any;
    //    if (!contextObj.objectsData || !contextObj.objectsDisplaySettingData || !contextObj.resultDataArray) {
    //        setTimeout(function () {
    //            contextObj.displayobjectsDataOnDrawing(resCallback);

    //        }, 50);
    //    } else {
    //        ////debugger;
    //        var ratio = [0];
    //        contextObj.objiWhiz.clientDWGAreaRatio(ratio);
    //        var objectsData: any;
    //        if (contextObj.totalObjects > 0) {
    //            contextObj.assetsDrawingService.getObjectsDisplaySettingsData(contextObj.categoryId, contextObj.addtlDataFieldCategoryId, contextObj.objectCategoryId).subscribe(function (resultData) {
    //                contextObj.objectsDisplaySettingData = resultData["Data"];
    //                var assetsDispSettingsData = contextObj.objectsDisplaySettingData.slice();
    //                // if (objectsData != 1)

    //                //new code
    //                contextObj.assetsDrawingService.getAllAssetsDetails(contextObj.objectCategoryId, contextObj.drawingId, 2, 0).subscribe(function (resultData) {
    //                    contextObj.objectsData = JSON.parse(resultData.FieldBinderData);
    //                    objectsData = contextObj.objectsData.slice();
    //                    var isXpositionNull = contextObj.checkIsXpositionNull(objectsData, function (retCode, xPosNullAssetData) {
    //                        if (retCode == 0) {
    //                            var getXposData = contextObj.displayNotProperlyLocatedAssets(xPosNullAssetData);
    //                            for (var assetItem of getXposData) {
    //                                var index = objectsData.findIndex(function (el) { return el.ObjectId === assetItem['ObjectId'] })
    //                                if (index != -1)
    //                                    objectsData[index] = assetItem;
    //                            }

    //                            contextObj.createobjectsDataAndTooltipOnDrawing(objectsData, assetsDispSettingsData, ratio, contextObj.resultDataArray, function (retCode) {
    //                                contextObj.deHatchObjects(function (retCode) {
    //                                    if (retCode == 0) {
    //                                        contextObj.objiWhiz.zoomExtents(function (ret) {
    //                                            if (ret == 0)
    //                                                resCallback(0);
    //                                            else
    //                                                resCallback(ret);
    //                                        });
    //                                    }
    //                                    else
    //                                        resCallback(retCode);
    //                                });

    //                            });
    //                        } else {
    //                            contextObj.createobjectsDataAndTooltipOnDrawing(objectsData, assetsDispSettingsData, ratio, contextObj.resultDataArray, function (retCode) {
    //                                contextObj.deHatchObjects(function (retCode) {
    //                                    if (retCode == 0) {
    //                                        contextObj.objiWhiz.zoomExtents(function (ret) {
    //                                            if (ret == 0)
    //                                                resCallback(0);
    //                                            else
    //                                                resCallback(ret);
    //                                        });
    //                                    }
    //                                    else
    //                                        resCallback(retCode);
    //                                });
    //                            });
    //                        }
    //                    });
    //                });//----------------



    //            });
    //        }
    //        else
    //            resCallback(1);
    //    }


    //    /* {
    //         if (contextObj.totalObjects > 0) {
    //             var assetsDispSettingsData = contextObj.objectsDisplaySettingData.slice();
    //             contextObj.createobjectsDataAndTooltipOnDrawing(contextObj.objectsData, assetsDispSettingsData, ratio, contextObj.resultDataArray, function (retCode) {
    //                 resCallback(retCode);
    //             });
    //         }
    //         else
    //             resCallback(1);
    //     }*/




    //}
    ////show tooltip data
    //getTooltipData = function (Handle, resCallback) {
    //    //If the drawing contains blockrefhandle or symbol, show the asset tooltip    
    //    var contextObj = this;
    //    let isSymbolHandle = contextObj.objectsHandlesData.some(function (el) { return el.SymbolHandle === Handle });
    //    if (isSymbolHandle) {
    //        contextObj.getAssetsTooltipData(Handle, function (tooltipDataValues) {
    //            resCallback(true, tooltipDataValues);
    //        });
    //    }
    //    else {//If drawingcategoryid=1 archetectural..then only we need to show the space tooltip with details and addtional assets details(classname : count)
    //        //if (contextObj.drawingCategoryId == 1) {
    //        contextObj.spaceOpenDrawingObj.getTooltipData(Handle, "", function (retCode, tooltipDataValues) {
    //            if (contextObj.objectsDataCountClasswise && contextObj.objectsDataCountClasswise.length > 0) {
    //                var spaceId = contextObj.getSpaceIdFromSpaceHandle(Handle);
    //                var index = contextObj.objectsDataCountClasswise.findIndex(function (el) { return el.SpaceId === spaceId });
    //                if (index != -1) {
    //                    for (var i = 0; i < contextObj.objectsDataCountClasswise.length; i++) {
    //                        if (contextObj.objectsDataCountClasswise[i]["SpaceId"] == spaceId) {
    //                            tooltipDataValues.push({ Key: (contextObj.objectsDataCountClasswise[i]["Label"].replace(':', '')).trim(), Value: contextObj.objectsDataCountClasswise[i]["Value"] });

    //                        }
    //                    }
    //                }
    //            }
    //            resCallback(retCode, tooltipDataValues);
    //        });
    //        // }
    //    }
    //}
    ////get assets tooltip data
    //getAssetsTooltipData = function (symbolHandle, resCallback) {
    //    ////debugger;
    //    ////debugger;
    //    var contextObj = this;
    //    contextObj.assetsTooltipData = [];
    //    var index = contextObj.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === symbolHandle });
    //    if (index != -1) {
    //        var assetspId = contextObj.objectsHandlesData[index].AssetsId;
    //        var dataitemIndex = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === assetspId });
    //        if (dataitemIndex != -1) {
    //            var dataItem = contextObj.objectsData[dataitemIndex];
    //            //console.log("dataItem", dataItem);
    //            for (let dispalySettingsData of contextObj.objectsDisplaySettingData) {
    //                if (dispalySettingsData.ShowinTooltip) {
    //                    if ((dispalySettingsData.ObjectClassId != 0) && (dataItem.ObjectClassId != 0)) {
    //                        if (dispalySettingsData.ObjectClassId == dataItem.ObjectClassId) {
    //                            contextObj.assetsTooltipData.push({ Key: dispalySettingsData.FieldName, Value: dataItem[dispalySettingsData.FieldName] });
    //                        }

    //                    }
    //                    else {
    //                        contextObj.assetsTooltipData.push({ Key: dispalySettingsData.FieldName, Value: dataItem[dispalySettingsData.FieldName] });
    //                    }
    //                }
    //            }
    //        }
    //    }
    //    resCallback(contextObj.assetsTooltipData);
    //}


    ////Get all asset details 
    //getAllAssetsDetails = function (resCallback) {
    //    debugger;
    //    var contextObj = this;
    //    contextObj.assetsDrawingService.getAllAssetsDetails(contextObj.objectCategoryId, this.drawingId, 2).subscribe(function (resultData) {
    //        debugger;
    //        contextObj.totalObjects = JSON.parse(resultData["DataCount"]);
    //        if (contextObj.totalObjects != 0) {
    //            //   //debugger;
    //            contextObj.objectsData = [];
    //            contextObj.objectsDataCountClasswise = [];
    //            contextObj.objectsData = JSON.parse(resultData.FieldBinderData);
    //            ////debugger;
    //            contextObj.assetsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
    //                contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
    //                resCallback(contextObj.objectsData);
    //            });
    //        }
    //        else {
    //            contextObj.objectsData = [];
    //            resCallback(1);
    //        }
    //    });
    //}
    ///* getting display settings data */
    //getObjectsDisplaySettingsData = function () {
    //    var contextObj = this;
    //    contextObj.assetsDrawingService.getObjectsDisplaySettingsData(contextObj.categoryId, contextObj.addtlDataFieldCategoryId, contextObj.objectCategoryId).subscribe(function (resultData) {
    //        contextObj.objectsDisplaySettingData = resultData["Data"];
    //    });
    //}
    ////Get all asset symbol details 
    //getAssetsSymbolDetails = function (resCallback) {

    //    var contextObj = this;
    //    contextObj.assetsDrawingService.getAssetsSymbolData(this.objectCategoryId).subscribe(function (resultData) {
    //        if (resultData != "") {
    //            contextObj.resultDataArray = JSON.parse(resultData["Data"].FieldBinderData);
    //            resCallback(resultData);
    //        }
    //        else
    //            resCallback(1);
    //    });
    //}
    ///*checking whether the x and y positions are null or not */
    //checkIsXpositionNull = function (assetData, resCallback) {
    //    // //debugger;
    //    var xPosNullAssetData: any[] = [];
    //    for (let assetDataitem of assetData) {
    //        if (assetDataitem['Xposition'] == null)
    //            xPosNullAssetData.push(assetDataitem);
    //    }
    //    if (xPosNullAssetData.length > 0) {
    //        resCallback(0, xPosNullAssetData);
    //    }

    //    else
    //        resCallback(1);
    //}

    ///*If x, y are null assign a co-ordinate to show the asset in the space */
    //displayNotProperlyLocatedAssets(xPosNullAssetData) {
    //    ////debugger;
    //    var contextObj = this;
    //    //var sortedxPosNullAssetData = [];
    //    //sortedxPosNullAssetData = xPosNullAssetData;
    //    var sortedxPosNullAssetData = xPosNullAssetData.sort(function (a, b) { return a.SpaceId - b.SpaceId });
    //    for (var i = 0; i < sortedxPosNullAssetData.length; i++) {
    //        if (sortedxPosNullAssetData[i]['SpaceId'] != null) {
    //            let spaceId = sortedxPosNullAssetData[i]['SpaceId'];
    //            // let spaceId = xPosNullAssetData[i]['SpaceId'];
    //            if (spaceId != null && spaceId != undefined) {

    //                contextObj.commonDwgServices.calculateDwgRatio();
    //                let previousSpaceId: number = undefined;
    //                /* let entityHandle: string = contextObj.getSpaceHandleViaSpaceId(spaceId);*/
    //                if (i > 0)
    //                    previousSpaceId = sortedxPosNullAssetData[i - 1]['SpaceId'];

    //                /* previousSpaceId = sortedxPosNullEmpData[i]['AssignedSpaceId']; */

    //                if (spaceId != previousSpaceId) {
    //                    var currentSpaceData = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId == spaceId });
    //                    var textInsertionX = currentSpaceData['TextInsertionX'];
    //                    var textInsertionY = currentSpaceData['TextInsertionY']
    //                    sortedxPosNullAssetData[i]['Xposition'] = textInsertionX;
    //                    sortedxPosNullAssetData[i]['Yposition'] = textInsertionY;
    //                }
    //                else {
    //                    var previousSpaceData = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId == previousSpaceId });
    //                    if (previousSpaceData != undefined) {
    //                        sortedxPosNullAssetData[i]['Xposition'] = sortedxPosNullAssetData[i - 1]['Xposition'] + (3 * contextObj.commonDwgServices.g_dblDwgRatio);
    //                        sortedxPosNullAssetData[i]['Yposition'] = sortedxPosNullAssetData[i - 1]['Yposition'];
    //                    }
    //                }
    //            }
    //        }


    //    }
    //    return sortedxPosNullAssetData;
    //}
    ///* Showing assets,symbol text and text : Then create tooltip also */
    //createobjectsDataAndTooltipOnDrawing = function (objectsData, assetsDispSettingsData, ratio, resultDataArray, resCallback) {
    //    ////debugger;
    //    var contextObj = this;
    //    var intSymbolColor;
    //    var SpHandle;
    //    var itemsForCreateTextSymbol = [];
    //    var itemsForCreateTextBlock = [];
    //    var symbolProperties = [];
    //    var symbolTextProperties = [];
    //    var objectSymbolIds = [];
    //    var objectBlockIds = [];
    //    var blockRefHandles = [];
    //    contextObj.objectsHandlesData = [];
    //    contextObj.dataInDrawingTextHandles = [];
    //    contextObj.objectsSymbolTextHandleData = [];

    //    for (let i = 0; i < objectsData.length; i++) {
    //        var objectsDataItem = objectsData[i];

    //        var dblSymbolInsertionX, dblSymbolInsertionY;
    //        dblSymbolInsertionX = objectsDataItem.Xposition;
    //        dblSymbolInsertionY = objectsDataItem.Yposition;

    //        intSymbolColor = objectsDataItem.SymbolColor;//symbol color
    //        //scale factor
    //        if (objectsDataItem.ScaleFactor != null && objectsDataItem.ScaleFactor != "")
    //            contextObj.g_dblScaleFactor = objectsDataItem.ScaleFactor;
    //        else
    //            contextObj.g_dblScaleFactor = 1;
    //        contextObj.g_dblAssetsTextAngle = objectsDataItem.Angle; //angle  

    //        //checking whether the symbolid for the current item is present in asset symbol details 
    //        var index = contextObj.resultDataArray.findIndex(function (el) { return el.Id === objectsDataItem.SymbolId });
    //        if (index != -1) {

    //            var item = contextObj.resultDataArray[index];
    //            contextObj.strAssetsSymbolText = item.SymbolText;       //symboltext 
    //            contextObj.strAssetsTextHeight = item.TextHeight;       //symboltext height
    //            contextObj.strAssetsSymbolCords = item.CoordinateString.replace(/,/g, contextObj.colDelimiter);   //coordinates 
    //            contextObj.strAssetsSymbolCords = contextObj.strAssetsSymbolCords.replace(/;/g, contextObj.rowDelimiter);
    //            contextObj.strObjectsSymbolLayer = "$SL_" + objectsDataItem.ObjectClassId + "_" + objectsDataItem.ObjectId; //AssetLayer created with objectclassid and objectid
    //            //contextObj.deleteLayerAlredyExists(contextObj.strObjectsSymbolLayer, function (retCode) {
    //            //If reference point is there, start symbol drawing functionality
    //            if (dblSymbolInsertionX && dblSymbolInsertionY) {
    //                objectSymbolIds.push(objectsDataItem.ObjectId);
    //                var formatedText = "";
    //                for (let dispSettingsItem of assetsDispSettingsData) {
    //                    if (dispSettingsItem.ShowinDrawing) {
    //                        var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
    //                        var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
    //                        let textContent = objectsDataItem[dispSettingsItem.FieldName];
    //                        if (textContent == "null" || textContent == null)
    //                            textContent = "-";
    //                        if ((dispSettingsItem.ObjectClassId != 0) && (objectsDataItem.ObjectClassId != 0)) {
    //                            if (dispSettingsItem.ObjectClassId != objectsDataItem.ObjectClassId) {
    //                                textContent = "";
    //                            }
    //                        }
    //                        if (textContent != "")
    //                            formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
    //                    }
    //                }
    //                let formatedTextFinal: string = "{" + formatedText + "}";
    //                itemsForCreateTextSymbol.push([formatedTextFinal, dblSymbolInsertionX, dblSymbolInsertionY]);
    //                symbolProperties.push([contextObj.strObjectsSymbolLayer, intSymbolColor, contextObj.strAssetsSymbolCords, contextObj.g_dblAssetsSymbolLineWidth, contextObj.g_strAssetsSymbolLineType, contextObj.g_dblScaleFactor, contextObj.g_dblAssetsTextAngle]);
    //                //Write symbol text near to symbol in asset
    //                if ((contextObj.strAssetsSymbolText != "") && (contextObj.strAssetsSymbolText != null)) {
    //                    symbolTextProperties.push([contextObj.strObjectsSymbolLayer, intSymbolColor, contextObj.strAssetsSymbolText, contextObj.g_dblAssetsTextAngle, contextObj.strAssetsTextHeight, 1, "Standard", 5]);
    //                }
    //                else
    //                    symbolTextProperties.push([]);
    //            }
    //            //Block Details
    //            else {

    //                var blockrefHandle = objectsDataItem.BlockRefHandle;
    //                blockRefHandles.push(blockrefHandle);
    //                if ((blockrefHandle != "") && (blockrefHandle != null)) { //**if blockref handle
    //                    objectBlockIds.push(objectsDataItem.ObjectId);
    //                    var formatedText = "";
    //                    for (let dispSettingsItem of assetsDispSettingsData) {
    //                        if (dispSettingsItem.ShowinDrawing) {
    //                            var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
    //                            var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
    //                            let textContent = objectsDataItem[dispSettingsItem.FieldName];
    //                            if (textContent == "null" || textContent == null)
    //                                textContent = "-";
    //                            formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
    //                            // formatedText += "\\fTimes New Roman|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + ratio[0] * dispSettingsItem.FontSize + ";" + textContent + "\\n";
    //                        }
    //                    }
    //                    let formatedTextFinal: string = "{" + formatedText + "}";
    //                    itemsForCreateTextBlock.push([formatedTextFinal, blockrefHandle, contextObj.strObjectsSymbolLayer]);
    //                }
    //            }
    //            //});
    //        }

    //    }

    //    contextObj.objiWhiz.createSymbolwithData(itemsForCreateTextSymbol, contextObj.strObjectsSymbolLayer, 1, 0, 3,
    //        0, 1, "Standard", contextObj.g_intAssetsTextStyleId, symbolProperties, symbolTextProperties, function (retCode, symbolHandles, textHandles, symbolTextHandles) {
    //            if (retCode == 0) {

    //                var symbolHandleArray = symbolHandles.split(contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter);
    //                symbolHandleArray.pop();
    //                var textHandleArray = textHandles.split(contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter);
    //                textHandleArray.pop();
    //                var symboltextHandleArray = symbolTextHandles.split(contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter);
    //                symboltextHandleArray.pop();
    //                var i = 0;
    //                for (let textHandle of textHandleArray) {
    //                    if (textHandle != "" && symbolHandleArray[i] != "") {
    //                        contextObj.objectsHandlesData.push({ AssetsId: objectSymbolIds[i], SymbolHandle: symbolHandleArray[i] });
    //                        contextObj.dataInDrawingTextHandles.push({ Key: objectSymbolIds[i], Value: textHandle });
    //                        if (symboltextHandleArray[i] != "")
    //                            contextObj.objectsSymbolTextHandleData.push({ Key: objectSymbolIds[i], Value: symboltextHandleArray[i] });
    //                        contextObj.objiWhiz.setApplicationLayer(symbolProperties[i][0]);
    //                    }
    //                    i++;
    //                }
    //            }
    //            if (itemsForCreateTextBlock.length != 0) {
    //                contextObj.objiWhiz.createBlockDataText(itemsForCreateTextBlock, 1, 0, 3,
    //                    0, 1, "Standard", 0, function (retCode, entityHandles, layerDetails) {
    //                        if (retCode == 0) {
    //                            var textHandleArray = entityHandles.split(contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter);
    //                            textHandleArray.pop();
    //                            var i = 0;
    //                            for (let textHandle of textHandleArray) {
    //                                if (textHandle != "") {
    //                                    contextObj.objectsHandlesData.push({ AssetsId: objectBlockIds[i], SymbolHandle: blockRefHandles[i] });
    //                                    contextObj.dataInDrawingTextHandles.push({ Key: objectBlockIds[i], Value: textHandle });

    //                                    contextObj.objiWhiz.setApplicationLayer(itemsForCreateTextBlock[i][2]);
    //                                }
    //                                i++;
    //                            }
    //                        }
    //                        resCallback(0);
    //                    });
    //            }
    //            else
    //                resCallback(0);
    //        });
    //}
    ////Move Single Asset
    //moveAssetInDrawingOnClick(resCallback) {

    //    //debugger;
    //    var contextObj = this;
    //    var intSpaceId: number = 0;
    //    var intClassId: number = 0;
    //    var intSymbolId: number = 0;
    //    var strSpaceHandle: string = "";
    //    var blnEditPermission: boolean = true;
    //    /* Taking userroldid and moduleadmin values from common */
    //    var g_intUserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
    //    contextObj.g_blnModuleAdmin = contextObj.commonDwgServices.isModuleAdmin;

    //    /* If the drawing has assigned data */
    //    if (contextObj.objectsData) {
    //        // //debugger;
    //        if (contextObj.totalObjects == 0) {
    //            // If  g_intObjectCatIdFL = 20 Then  


    //            contextObj.notificationServices.ShowToaster("No " + contextObj.objectmultiplename + " are assigned to this floor", 2);

    //            //switch (contextObj.moduleId) {
    //            //    case 7:
    //            //        contextObj.notificationServices.ShowToaster("No Assets are assigned to this floor", 2);
    //            //        break;
    //            //    case 8:
    //            //        contextObj.notificationServices.ShowToaster("No Furniture are assigned to this floor", 2);
    //            //        break;
    //            //}
    //            resCallback(0);
    //        }
    //        else {
    //            // //debugger;
    //            /* If the drawing has assigned assets----
    //            select an asset --- getdwg point -- Get the symboldetails of the point where we clicked
    //            Get the details(spaceid,classid,symbolid etc of the symbol from our client side array --
    //             */
    //            contextObj.objiWhiz.setCursor(2);
    //            contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
    //                if (retCode == 0) {
    //                    contextObj.MoveObjectPermission(xPos, yPos, 1, function (retcode) {
    //                        var UserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
    //                        if (((contextObj.drawingCategoryId == 1) && (retcode == null || retcode == undefined || retcode == 0)) || ((contextObj.drawingCategoryId != 1) && (retcode == 0))) {
    //                            {
    //                                resCallback(1);
    //                            }
    //                        }
    //                        else {
    //                            contextObj.objiWhiz.getSymbolWithDWGPoint(xPos, yPos, true, function (retCode, selectedSymbolhandle) {
    //                                //debugger;
    //                                if (retCode == 0) {
    //                                    var index = contextObj.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle });
    //                                    //debugger;
    //                                    if (index != -1) {
    //                                        var assetsId = contextObj.objectsHandlesData[index].AssetsId;
    //                                        var indexnew = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === assetsId });
    //                                        if (indexnew != -1) {
    //                                            intSpaceId = contextObj.objectsData[indexnew].SpaceId;
    //                                            intClassId = contextObj.objectsData[indexnew].ObjectClassId;
    //                                            intSymbolId = contextObj.objectsData[indexnew].SymbolId;
    //                                            if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
    //                                                contextObj.blnIsSpace = false;
    //                                            }
    //                                            else {
    //                                                contextObj.blnIsSpace = true;
    //                                            }
    //                                            /* Take space handle from spaceid  and check the edit permission for the selected space*/
    //                                            contextObj.GetSpaceHandleFromSpaceId(intSpaceId, function (strSpaceOrNetHandle) {
    //                                                if (strSpaceOrNetHandle != "") {
    //                                                    if (g_intUserRoleId > 3) {

    //                                                        contextObj.checkEditPermissionforTheSelectedSpace(intSpaceId, function (blnEdit) {
    //                                                            blnEditPermission = blnEdit;
    //                                                            if ((g_intUserRoleId = 4) || (g_intUserRoleId = 7))
    //                                                                blnEditPermission = false
    //                                                            else ((g_intUserRoleId == 6) && (contextObj.g_blnModuleAdmin == false))
    //                                                            blnEditPermission = false
    //                                                        });
    //                                                    }
    //                                                    else {
    //                                                        blnEditPermission = true;
    //                                                    }
    //                                                    //If no edit permission : show message like   no privilege to edit data */
    //                                                    //debugger;
    //                                                    if (blnEditPermission == false) {
    //                                                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);

    //                                                        contextObj.objiWhiz.setCursor(1);
    //                                                        contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
    //                                                        contextObj.objiWhiz.regenerate();
    //                                                        resCallback(1);
    //                                                    }

    //                                                    /* if the user has the privilege ---
    //                                                    Hatch the selected symbol
    //                                                    Enable Rubberband
    //                                                    Call a function to moveobject*/
    //                                                    else {
    //                                                        //debugger;
    //                                                        contextObj.hatchObject(selectedSymbolhandle, function (retCode) {
    //                                                            if (retCode != 0) {
    //                                                                resCallback(1);
    //                                                            }
    //                                                            else {
    //                                                                //debugger;
    //                                                                var rubx = [], ruby = [], rubz = []
    //                                                                rubx[0] = xPos; ruby[0] = yPos; rubz[0] = 0;
    //                                                                contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
    //                                                                contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
    //                                                                /* Call a function to moveobject : return code 0 means successfully moved */
    //                                                                contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle, function (returnCode, spaceId, currentXCord, currentYCord, selectedSpaceHandle) {
    //                                                                    if (returnCode == 0) {
    //                                                                        resCallback(0, assetsId);
    //                                                                        /* Successfully moved */

    //                                                                    }
    //                                                                    else
    //                                                                /* if moveobject failed : then-dehatch the asset-disable rubberband-call regenerate function */ {
    //                                                                        contextObj.notificationServices.ClearAllToasts();
    //                                                                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
    //                                                                        contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle, function (returnCode, spaceId, currentXCord, currentYCord, selectedSpaceHandle) {
    //                                                                            if (returnCode == 0)
    //                                                                                resCallback(0, assetsId);
    //                                                                            else
    //                                                                                resCallback(1);

    //                                                                        });
    //                                                                    }
    //                                                                });
    //                                                            }
    //                                                        });
    //                                                    }
    //                                                }
    //                                                else {
    //                                                    /* If No strSpaceOrNetHandle */
    //                                                    resCallback(1);
    //                                                }
    //                                            });
    //                                        }
    //                                        else {
    //                                            /* If the selected asset not with our clientside list */
    //                                            resCallback(1);
    //                                        }
    //                                    }
    //                                    else {
    //                                        /* If the selected asset handle not with our clientside list */
    //                                        resCallback(1);
    //                                    }
    //                                }
    //                                else {
    //                                    /* Not getting symbolhandle  : getSymbolWithDWGPoint */
    //                                    resCallback(1);
    //                                }
    //                            });
    //                        }
    //                    });
    //                }
    //                //---------------------------------------------------------------------------------
    //                else {
    //                    /*Not getting dwg point  :  getDWGPoint*/
    //                    resCallback(1);
    //                }
    //            });
    //        }
    //    }
    //    else
    //        resCallback(0);

    //    //}

    //}
    ///*Get space handle by providing space Id*/
    //GetSpaceHandleFromSpaceId = function (spaceId, resCallback) {
    //    ////debugger;
    //    var contextObj = this;
    //    var spaceHandle: string = "";
    //    var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === spaceId });
    //    if (index != -1) {
    //        if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
    //            contextObj.blnIsSpace = false;
    //        }
    //        else {
    //            contextObj.blnIsSpace = true;
    //        }
    //        if (contextObj.blnIsSpace) {                                      /*blnIsSpace false - Carpet  else boma*/
    //            contextObj.spaceHandle = contextObj.spaceOpenDrawingObj.spaceData[index]['BomaHandle'];
    //        }
    //        else {
    //            contextObj.spaceHandle = contextObj.spaceOpenDrawingObj.spaceData[index]['CarpetHandle'];
    //        }
    //    }
    //    else
    //        contextObj.spaceHandle = "";


    //    if (contextObj.spaceHandle == null || contextObj.spaceHandle == undefined)
    //        contextObj.spaceHandle = "";
    //    resCallback(contextObj.spaceHandle);
    //}

    ///*Get space id by providing space handle*/
    //GetSpaceIdFromHandle = function (strSpaceHandle, resCallback) {
    //    ////debugger;
    //    var contextObj = this;
    //    if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
    //        contextObj.blnIsSpace = false;
    //    }
    //    else {
    //        contextObj.blnIsSpace = true;
    //    }

    //    if (contextObj.blnIsSpace == false) { /*blnIsSpace false - Carpet  else boma*/
    //        var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.CarpetHandle === strSpaceHandle });
    //        if (index != -1)
    //            contextObj.spaceId = contextObj.spaceOpenDrawingObj.spaceData[index]['SpaceId'];
    //        else
    //            contextObj.spaceId = 0;

    //    }
    //    else {
    //        var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.BomaHandle === strSpaceHandle });
    //        if (index != -1)
    //            contextObj.spaceId = contextObj.spaceOpenDrawingObj.spaceData[index]['SpaceId'];
    //        else
    //            contextObj.spaceId = 0;
    //    }

    //    if (contextObj.spaceId == null || contextObj.spaceId == undefined)
    //        contextObj.spaceId = 0;
    //    resCallback(contextObj.spaceId);
    //}

    ///*After selecting the asset, trying to move to a new position */
    //InvokeMoveObject = function (assetsId, xPos, yPos, selectedSymbolhandle, resCallback) {
    //    ////debugger;
    //    ////debugger;
    //    var contextObj = this;
    //    //var intCompareResult: boolean;//Check Edit permission For Facility User
    //    var blnPermittedSpace = false;
    //    var spaceId: number;
    //    var g_intUserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
    //    contextObj.g_blnModuleAdmin = contextObj.commonDwgServices.isModuleAdmin;
    //    contextObj.objiWhiz.setCursor(2);
    //    contextObj.objiWhiz.getDWGPoint(function (retCode, dblNewXPosition, dblNewYPosition) {
    //        if (retCode == 0) {

    //            contextObj.MoveObjectPermission(dblNewXPosition, dblNewYPosition, 2, function (retcode) {
    //                var UserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
    //                if (((contextObj.drawingCategoryId == 1) && (retcode == null || retcode == undefined || retcode == 0)) || ((contextObj.drawingCategoryId != 1) && (retcode == 0))) {
    //                    {
    //                        //contextObj.notificationServices.ClearAllToasts();
    //                        //contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space, Select another place", 3);
    //                        contextObj.objiWhiz.setCursor(2);
    //                        contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle);
    //                    }
    //                }
    //                else {
    //                    contextObj.objiWhiz.pointInEntity(contextObj.commonDwgServices.grossHandle, dblNewXPosition, dblNewYPosition, function (returnCode, isInside) {
    //                        // //debugger
    //                        if (returnCode == 0) {
    //                            contextObj.objiWhiz.getHandleWithDWGPoint(dblNewXPosition, dblNewYPosition, contextObj.blnIsSpace, function (retCode, strSpaceHandle) {
    //                                // //debugger
    //                                if (retCode == 0) {
    //                                    if (isInside) {
    //                                        // //debugger;
    //                                        contextObj.GetSpaceIdFromHandle(strSpaceHandle, function (SpaceId) {
    //                                            if (SpaceId != 0) {
    //                                                ////debugger;
    //                                                contextObj.CheckPermissionForSelectedPoint(dblNewXPosition, dblNewYPosition, 4, function (strSpaceOrNetHandle) {
    //                                                    if (strSpaceHandle != "") {
    //                                                        blnPermittedSpace = true;
    //                                                        ////debugger; 
    //                                                        contextObj.GetSpaceIdFromHandle(strSpaceHandle, function (SpaceId) {

    //                                                            contextObj.moveAssetToSelectedSpace(assetsId, xPos, yPos, dblNewXPosition, dblNewYPosition, selectedSymbolhandle, SpaceId, function (retCode) {
    //                                                                if (retCode == 0) {
    //                                                                    contextObj.deHatchObjects(function (retCode) {
    //                                                                        // contextObj.objiWhiz.setCursor(2);
    //                                                                        //------update details in the table
    //                                                                        //debugger;
    //                                                                        var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === SpaceId });
    //                                                                        if (index != -1) {
    //                                                                            var SiteId = contextObj.spaceOpenDrawingObj.spaceData[index]['SiteId'];
    //                                                                            contextObj.assetsDrawingService.updateAssetsSymbolData(9, SpaceId, dblNewXPosition, dblNewYPosition, 0, contextObj.drawingId, contextObj.objectCategoryId, SiteId, assetsId).subscribe(function (resultData) {
    //                                                                                ////debugger;
    //                                                                                if (resultData["Data"]["Message"] == "Success") {
    //                                                                                    contextObj.objiWhiz.setCursor(1);
    //                                                                                    contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
    //                                                                                    contextObj.objiWhiz.regenerate();
    //                                                                                    // //debugger;
    //                                                                                    var index = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === assetsId });
    //                                                                                    if (index != -1) { //Update objectsData with updates
    //                                                                                        contextObj.objectsData[index].SpaceId = SpaceId;
    //                                                                                        contextObj.objectsData[index].Xposition = dblNewXPosition;
    //                                                                                        contextObj.objectsData[index].Yposition = dblNewYPosition;
    //                                                                                        //Update the space handle correctly,(Net customer and space customer) otherwise issue in show in drawing/zoom/delink
    //                                                                                        var spaceId = contextObj.objectsData.find(function (el) { return el.ObjectId === assetsId })['SpaceId'];
    //                                                                                        var dataitemIndex = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === spaceId });
    //                                                                                        if (contextObj.blnIsSpace)
    //                                                                                        // contextObj.objectsData[index].BomaHandle = strSpaceOrNetHandle;
    //                                                                                        {
    //                                                                                            if (dataitemIndex != -1) {
    //                                                                                                contextObj.spaceOpenDrawingObj.spaceData[dataitemIndex].BomaHandle = strSpaceOrNetHandle;
    //                                                                                            }

    //                                                                                        }
    //                                                                                        else { /*Updating contextObj.spaceOpenDrawingObj.spaceData.CarpetHandle because we are using this object in show in drawing to get the catperhandle. Otherwise issue in delink->place->move->show drawing */
    //                                                                                            if (dataitemIndex != -1) {
    //                                                                                                contextObj.spaceOpenDrawingObj.spaceData[dataitemIndex].CarpetHandle = strSpaceOrNetHandle;
    //                                                                                            }
    //                                                                                        }
    //                                                                                    }
    //                                                                                    /* calling the additional tooltip data value function for updating the additional tooltip */
    //                                                                                    contextObj.assetsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
    //                                                                                        contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
    //                                                                                        contextObj.notificationServices.ClearAllToasts();
    //                                                                                        contextObj.notificationServices.ShowToaster(contextObj.objectname + " moved", 3);

    //                                                                                        //switch (contextObj.moduleId) {
    //                                                                                        //    case 7:
    //                                                                                        //        contextObj.notificationServices.ShowToaster("Asset moved", 3);
    //                                                                                        //        break;
    //                                                                                        //    case 8:
    //                                                                                        //        contextObj.notificationServices.ShowToaster("Furniture moved", 3);
    //                                                                                        //        break;
    //                                                                                        //}
    //                                                                                        resCallback(0);
    //                                                                                    });
    //                                                                                }
    //                                                                                else {
    //                                                                                    resCallback(1);
    //                                                                                }
    //                                                                            });
    //                                                                        }
    //                                                                        else
    //                                                                            resCallback(1);
    //                                                                    });
    //                                                                }
    //                                                                else {
    //                                                                    /* Problem with :moveAssetToSelectedSpace */
    //                                                                    resCallback(1);
    //                                                                }
    //                                                            });
    //                                                        });
    //                                                    }
    //                                                    else {
    //                                                        // //debugger;
    //                                                        //recursive function
    //                                                        contextObj.notificationServices.ClearAllToasts();
    //                                                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
    //                                                        contextObj.objiWhiz.setCursor(2);
    //                                                        contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle);
    //                                                    }
    //                                                });

    //                                            }
    //                                            else { /* Problem with :GetSpaceIdFromHandle */
    //                                                //resCallback(1);

    //                                                contextObj.notificationServices.ClearAllToasts();
    //                                                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
    //                                                contextObj.objiWhiz.setCursor(2);
    //                                                contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle);

    //                                            }
    //                                        });
    //                                    }
    //                                    else {
    //                                        /* isInside :not */
    //                                        resCallback(1);
    //                                    }
    //                                }
    //                                else {
    //                                    /* Problem with getHandleWithDWGPoint : Getting Handle */
    //                                    //recursive function
    //                                    contextObj.notificationServices.ClearAllToasts();
    //                                    contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
    //                                    contextObj.objiWhiz.setCursor(2);
    //                                    contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle);
    //                                    // resCallback(1);
    //                                }
    //                            });
    //                        }
    //                        else {
    //                            /* Problem with pointInEntity : Getting new xypoints */
    //                            resCallback(1);
    //                        }
    //                    });
    //                }
    //            });
    //        }
    //        else if (retCode == 8) {
    //            //debugger
    //            contextObj.deHatchObjects(function (retCode) {
    //                contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
    //                contextObj.objiWhiz.regenerate();
    //            });
    //        }
    //        //-----------------------------------------------------------------------
    //        else {
    //            /* Problem with getDWGPoint : Getting new xypoints */
    //            resCallback(1);
    //        }
    //    });
    //}
    ///*Check Move asset to the outside space */
    //checkMoveOutsideSpace = function (intAssetId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, resCallback) {
    //    resCallback(0);
    //}
    ///*Move asset to the selected space */
    //moveAssetToSelectedSpace = function (intAssetId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, resCallback) {
    //    ////debugger;
    //    var contextObj = this;
    //    //this.empDrawingService.insertSpaceAllotmentDetails(intEmployeeId, spaceId, contextObj.drawingId, currentXCord, currentYCord).subscribe(function (resultData) {
    //    // var updatedEmpData = JSON.parse(resultData["Data"].Data);
    //    var midPoints = contextObj.getAssetXYCordinates(intAssetId);

    //    contextObj.objiWhiz.setCursor(1);
    //    contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
    //    ////debugger;
    //    contextObj.objiWhiz.moveSymbol(selectedSymbolhandle, previousXCord, previousYCord, currentXCord, currentYCord, midPoints, function (returnCode, actualPoints, rtnMidPoints) {
    //        ////debugger;
    //        if (returnCode != 0) {
    //            console.log("moveSymbol faild due to ", returnCode);
    //            resCallback(1);
    //        }
    //        else {
    //            ////debugger;
    //            contextObj.objiWhiz.getEntityExtents(selectedSymbolhandle, function (retCode, MinX, MinY, MaxX, MaxY) {
    //                if (retCode != 0) {
    //                    console.log("getEntityExtents faild due to ", retCode);
    //                    resCallback(1);
    //                }
    //                else {
    //                    contextObj.moveAssetText(intAssetId, MaxX, MaxY, function (retCode) {
    //                        ////debugger;
    //                        if (retCode == 0) {
    //                            var index = contextObj.objectsSymbolTextHandleData.find(function (el) { return el.Key === intAssetId });
    //                            if (index != undefined) {
    //                                var SymboltextHandle = contextObj.objectsSymbolTextHandleData.find(function (el) { return el.Key === intAssetId }).Value;
    //                                if (SymboltextHandle != null && SymboltextHandle != "" && SymboltextHandle != undefined) {
    //                                    ////debugger;
    //                                    contextObj.objiWhiz.getEntityMidpoint(selectedSymbolhandle, function (rtCode, MidX, MidY) {
    //                                        // //debugger;
    //                                        if (rtCode == 0) {
    //                                            contextObj.moveAssetSymbolText(SymboltextHandle, MidX, MidY, function (retCode) {
    //                                                //debugger
    //                                                contextObj.deHatchObjects(function (retCode) {
    //                                                    //contextObj.objiWhiz.setCursor(1);
    //                                                    //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
    //                                                    contextObj.objiWhiz.regenerate();
    //                                                    resCallback(0);
    //                                                });
    //                                            });
    //                                        }
    //                                        else {
    //                                            resCallback(1);
    //                                        }
    //                                    });
    //                                }
    //                                else {
    //                                    //debugger
    //                                    contextObj.deHatchObjects(function (retCode) {
    //                                        contextObj.objiWhiz.setCursor(1);
    //                                        contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
    //                                        contextObj.objiWhiz.regenerate();
    //                                        resCallback(0);
    //                                    });
    //                                }
    //                            }
    //                            else {
    //                                //debugger
    //                                contextObj.deHatchObjects(function (retCode) {
    //                                    contextObj.objiWhiz.setCursor(1);
    //                                    contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
    //                                    contextObj.objiWhiz.regenerate();
    //                                    resCallback(0);
    //                                });
    //                            }
    //                            //var index = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === intAssetId });
    //                            ////contextObj.empData[index] = updatedEmpData[0];
    //                            //contextObj.beforeMoveSpaceId = undefined;
    //                            //resCallback(0);
    //                        }
    //                        else {
    //                            resCallback(1);
    //                        }

    //                    });
    //                }

    //            });
    //        }

    //    });
    //}
    ///* move multipe assets */
    //moveMultipleAssetInDrawingOnClick(floorid, resCallback) {
    //    //  debugger
    //    var contextObj = this;
    //    var intSpaceId: number = 0;
    //    var intClassId: number = 0;
    //    var intSymbolId: number = 0;
    //    var strSpaceHandle: string = "";
    //    var blnEditPermission: boolean = true;
    //    var blnPermittedSpace = false;
    //    var symbolId = [];
    //    /* Taking userroldid and moduleadmin values from common */
    //    var g_intUserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
    //    contextObj.g_blnModuleAdmin = contextObj.commonDwgServices.isModuleAdmin;

    //    if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
    //        contextObj.blnIsSpace = false;
    //    }
    //    else {
    //        contextObj.blnIsSpace = true;
    //    }

    //    /* If the drawing has assigned data */
    //    if (contextObj.objectsData) {
    //        //if (contextObj.totalObjects == 0) {
    //        //    // If  g_intObjectCatIdFL = 20 Then  
    //        //    contextObj.notificationServices.ShowToaster("No Assets are assigned to this floor", 3);
    //        //    resCallback(1);
    //        //}
    //        //else {
    //        /* If archetectural drawing */
    //        if (contextObj.drawingCategoryId == 1) {
    //            if (contextObj.msgcount == 0) {
    //                contextObj.notificationServices.ShowToaster("Click to select/deselect " + contextObj.objectname + ". Right click to exit", 3);

    //                //switch (contextObj.moduleId) {
    //                //    case 7:
    //                //        contextObj.notificationServices.ShowToaster("Click to select/deselect Asset. Right click to exit", 3);
    //                //        break;
    //                //    case 8:
    //                //        contextObj.notificationServices.ShowToaster("Click to select/deselect Furniture. Right click to exit", 3);
    //                //        break;
    //                //}
    //                contextObj.msgcount = 1;
    //            }
    //            contextObj.objiWhiz.setCursor(2);
    //            contextObj.objiWhiz.getDWGPoint(function (retCode, Xposition, Yposition) {    //getdwg point : clicked point                       
    //                if (retCode == 0) {
    //                    contextObj.PlaceObjectPermission(Xposition, Yposition, 2, function (retcode) {
    //                        var UserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
    //                        if (((contextObj.drawingCategoryId == 1) && (retcode == null || retcode == undefined || retcode == 0)) || ((contextObj.drawingCategoryId != 1) && (retcode == 0))) {
    //                            {
    //                                contextObj.moveMultipleAssetInDrawingOnClick(floorid, resCallback);
    //                            }
    //                        }
    //                        else {
    //                            contextObj.objiWhiz.getHandleWithDWGPoint(Xposition, Yposition, contextObj.blnIsSpace, function (retCode, strSpaceHandle) {
    //                                if (retCode == 0) {//if clicked point returns space handle
    //                                    contextObj.objiWhiz.getSymbolWithDWGPoint(Xposition, Yposition, true, function (rtCode, selectedSymbolhandle) {//if clicked point is a symbol or not
    //                                        if (rtCode != 0) {//if clicked point returns no symbol handle
    //                                            ///* call recursive function */ 
    //                                            contextObj.notificationServices.ClearAllToasts();
    //                                            //contextObj.notificationServices.ShowToaster("Select only the assets to be  moved", 3);
    //                                            contextObj.objiWhiz.setCursor(2);
    //                                            contextObj.moveMultipleAssetInDrawingOnClick(floorid, resCallback);

    //                                        }//if clicked point returns  symbol handle
    //                                        else {
    //                                            contextObj.GetSpaceIdFromHandle(strSpaceHandle, function (SpaceId) {

    //                                                /*check move outside space*/




    //                                                //Checking space id to check whether the selected asset is from the same space as before                                                    
    //                                                var spaceIdforchecking = "";
    //                                                if (contextObj.multipleMoveData.length > 0)
    //                                                    spaceIdforchecking = contextObj.multipleMoveData[0].SpaceId;
    //                                                else
    //                                                    spaceIdforchecking = SpaceId;

    //                                                if (spaceIdforchecking == SpaceId)//if from the same space push the details into multipleMoveData array
    //                                                {
    //                                                    contextObj.hatchMultipleAsset(selectedSymbolhandle, function (retCode) { /* hatch the symbol */
    //                                                        if (retCode == 0) {
    //                                                            var dataitemIndex = contextObj.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle });
    //                                                            if (dataitemIndex != -1) {
    //                                                                var intObjectId = contextObj.objectsHandlesData[dataitemIndex].AssetsId;
    //                                                                contextObj.multipleMoveData.push({ AssetsId: intObjectId, SymbolHandle: selectedSymbolhandle, xPosition: Xposition, yPosition: Yposition, newxPosition: '', newyPosition: '', SpaceId: SpaceId }); /* push selected symbol details in array */
    //                                                                contextObj.objiWhiz.setCursor(2);
    //                                                                contextObj.moveMultipleAssetInDrawingOnClick(floorid, resCallback);//call recursive function
    //                                                            }
    //                                                        }//if hatch has issue
    //                                                        else
    //                                                            resCallback(1);
    //                                                    });
    //                                                } //if the selected asset is not from the same space show message
    //                                                else {
    //                                                    contextObj.notificationServices.ClearAllToasts();
    //                                                    switch (contextObj.moduleId) {
    //                                                        case 7:
    //                                                            contextObj.notificationServices.ShowToaster("This operation can be performed for Assets placed in a single space", 5);
    //                                                            break;
    //                                                        default:
    //                                                            contextObj.notificationServices.ShowToaster("This operation can be performed for " + contextObj.objectname + "s placed in a single space", 5);
    //                                                            break;
    //                                                    }
    //                                                    contextObj.moveMultipleAssetInDrawingOnClick(floorid, resCallback);
    //                                                }
    //                                            });
    //                                        }
    //                                    });
    //                                }
    //                                else { //if clicked point has no space handle, call the same funciton again
    //                                    contextObj.notificationServices.ClearAllToasts();
    //                                    // contextObj.notificationServices.ShowToaster("This operation can be performed for Assets placed inside the polyline", 3);
    //                                    contextObj.moveMultipleAssetInDrawingOnClick(floorid, resCallback);
    //                                }
    //                            })
    //                        }
    //                    });

    //                }//-----------right click and move-------
    //                else if (retCode == 8) {
    //                    /* call recursive function */
    //                    contextObj.objiWhiz.setCursor(2);
    //                    if (contextObj.multipleMoveData.length > 0) {
    //                        var rubx = [], ruby = [], rubz = []
    //                        rubx[0] = contextObj.multipleMoveData[0].xPosition; ruby[0] = contextObj.multipleMoveData[0].yPosition; rubz[0] = 0;
    //                        contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
    //                        contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
    //                        contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
    //                        var spaceIddb = "";
    //                        // debugger;
    //                        contextObj.objiWhiz.getDWGPoint(function (retCode, Xposition, Yposition) {
    //                            if (retCode == 0) {
    //                                contextObj.objiWhiz.getHandleWithDWGPoint(Xposition, Yposition, contextObj.blnIsSpace, function (rCode, SpaceHandlenew) {
    //                                    // contextObj.objiWhiz.pointInEntity(SpaceHandlenew , Xposition, Yposition, function (retCode) {
    //                                    //   debugger;
    //                                    //    var test = retCode;



    //                                    contextObj.GetSpaceIdFromHandle(SpaceHandlenew, function (SpaceIdnew) {
    //                                        if (SpaceHandlenew == null || SpaceHandlenew == undefined || SpaceHandlenew == "")
    //                                            spaceIddb = "";
    //                                        else {
    //                                            spaceIddb = SpaceIdnew;
    //                                            if (contextObj.userRoleId > 3) {
    //                                                //debugger
    //                                                // var spaceId = contextObj.getSpaceIdFromSpaceHandle(strSpaceOrNetHandle);
    //                                                contextObj.checkEditPermissionforTheSelectedSpace(spaceIddb, function (blnEditPermission) {
    //                                                    contextObj.notificationServices.ClearAllToasts();
    //                                                    if (blnEditPermission == false) {
    //                                                        contextObj.blnPermittedSpace = false;
    //                                                        resCallback(1);
    //                                                    }

    //                                                });
    //                                            }


    //                                        }
    //                                        contextObj.objiWhiz.getEntityMidpoint(contextObj.multipleMoveData[0].SymbolHandle, function (rtCode, MidX, MidY) {
    //                                            var dblActualXDifference = Xposition - MidX;
    //                                            var dblActualYDifference = Yposition - MidY;
    //                                            contextObj.arraycount = contextObj.multipleMoveData.length;
    //                                            contextObj.multipleMoveIndex = 0;
    //                                            contextObj.checkSpaceOutside(SpaceHandlenew, contextObj.multipleMoveData[contextObj.multipleMoveIndex].AssetsId, contextObj.multipleMoveData[contextObj.multipleMoveIndex].xPosition, contextObj.multipleMoveData[contextObj.multipleMoveIndex].yPosition, dblActualXDifference, dblActualYDifference, contextObj.multipleMoveData[contextObj.multipleMoveIndex].SymbolHandle, spaceIddb, function (rCode) {
    //                                                if (rCode == 0) {
    //                                                    contextObj.updateNewpositionForMultiplemove(contextObj.multipleMoveData[contextObj.arraycount - 1].AssetsId, contextObj.multipleMoveData[contextObj.arraycount - 1].xPosition, contextObj.multipleMoveData[contextObj.arraycount - 1].yPosition, dblActualXDifference, dblActualYDifference, contextObj.multipleMoveData[contextObj.arraycount - 1].SymbolHandle, spaceIddb, contextObj.arraycount - 1, floorid, function (rCode) {
    //                                                        if (rCode == 0) {
    //                                                            //insert and show successful message
    //                                                            contextObj.notificationServices.ClearAllToasts();
    //                                                            contextObj.notificationServices.ShowToaster(contextObj.objectname + " moved", 3);

    //                                                            //switch (contextObj.moduleId) {
    //                                                            //    case 7:
    //                                                            //        contextObj.notificationServices.ShowToaster("Asset moved", 3);
    //                                                            //        break;
    //                                                            //    case 8:
    //                                                            //        contextObj.notificationServices.ShowToaster("Furniture moved", 3);
    //                                                            //        break;
    //                                                            //}
    //                                                            contextObj.multipleMoveData = [];
    //                                                            contextObj.assetsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
    //                                                                contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
    //                                                                resCallback(0);
    //                                                            });
    //                                                        }
    //                                                        else {
    //                                                            contextObj.notificationServices.ClearAllToasts();
    //                                                            contextObj.notificationServices.ShowToaster("There is some issues while moving, refresh the page and try again", 5);
    //                                                            resCallback(1);
    //                                                        }

    //                                                    });
    //                                                }
    //                                                else {

    //                                                    resCallback(-5, spaceIddb, floorid, dblActualXDifference, dblActualYDifference);
    //                                                }
    //                                            });
    //                                        });
    //                                    });
    //                                    //}
    //                                });

    //                            }
    //                            else if (retCode == 8) { /*Second click is right click, then dehatch,release the rubberband 
    //                                                            and set the cursor as pointer*/
    //                                //  debugger
    //                                contextObj.deHatchObjects(function (retCode) {
    //                                    if (retCode == 0) {
    //                                        contextObj.objiWhiz.setCursor(1);
    //                                        contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
    //                                        contextObj.multipleMoveData = [];
    //                                        contextObj.objiWhiz.regenerate();
    //                                    }
    //                                });

    //                            }

    //                        });
    //                    }
    //                    else {
    //                        contextObj.deHatchObjects(function (retCode) {
    //                            if (retCode == 0) {
    //                                contextObj.objiWhiz.setCursor(1);
    //                                contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
    //                                contextObj.multipleMoveData = [];
    //                                contextObj.objiWhiz.regenerate();
    //                                contextObj.msgcount = 0;
    //                            }
    //                        });
    //                    }
    //                }


    //            });


    //        }
    //        else //not archetectural drawing
    //        {
    //            resCallback(1);
    //        }
    //        // }
    //    }

    //}
    //checkSpaceOutside = function (SpaceHandlenew, AssetsId, xPosition, yPosition, dblActualXDifference, dblActualYDifference, SymbolHandle, SpaceId, resCallback) {
    //    //debugger
    //    var contextObj = this;
    //    contextObj.objiWhiz.getEntityMidpoint(SymbolHandle, function (rtCode, dblObjectMidX, dblObjectMidY) {
    //        var dblObjectNewMidX = dblObjectMidX + dblActualXDifference;
    //        var dblObjectNewMidY = dblObjectMidY + dblActualYDifference;
    //        //contextObj.multipleMoveData[arraycount]["newxPosition"] = dblObjectNewMidX;
    //        //contextObj.multipleMoveData[arraycount]["newyPosition"] = dblObjectNewMidY;

    //        contextObj.objiWhiz.pointInEntity(SpaceHandlenew, dblObjectNewMidX, dblObjectNewMidY, function (retCode, IsInside) {
    //            if (IsInside == false && retCode == 0) {
    //                resCallback(1);
    //            } else {
    //                if (contextObj.multipleMoveIndex == contextObj.multipleMoveData.length - 1) {
    //                    resCallback(0);
    //                }
    //                else {
    //                    contextObj.multipleMoveIndex++;
    //                    contextObj.checkSpaceOutside(SpaceHandlenew, contextObj.multipleMoveData[contextObj.multipleMoveIndex].AssetsId, contextObj.multipleMoveData[contextObj.multipleMoveIndex].xPosition, contextObj.multipleMoveData[contextObj.multipleMoveIndex].yPosition, dblActualXDifference, dblActualYDifference, contextObj.multipleMoveData[contextObj.multipleMoveIndex].SymbolHandle, SpaceId, resCallback);
    //                }
    //            }

    //        });
    //    });
    //}
    ///* After multiple move update the details in db*/
    //updateNewpositionForMultiplemove = function (AssetsId, xPosition, yPosition, dblActualXDifference, dblActualYDifference, SymbolHandle, SpaceId, arraycount, floorid, resCallback) {
    //    var contextObj = this;
    //    contextObj.objiWhiz.getEntityMidpoint(SymbolHandle, function (rtCode, dblObjectMidX, dblObjectMidY) {
    //        var dblObjectNewMidX = dblObjectMidX + dblActualXDifference;
    //        var dblObjectNewMidY = dblObjectMidY + dblActualYDifference;
    //        contextObj.multipleMoveData[arraycount]["newxPosition"] = dblObjectNewMidX;
    //        contextObj.multipleMoveData[arraycount]["newyPosition"] = dblObjectNewMidY;
    //        contextObj.objiWhiz.setCursor(2);
    //        contextObj.moveAssetToSelectedSpace(contextObj.multipleMoveData[arraycount].AssetsId, contextObj.multipleMoveData[arraycount].xPosition, contextObj.multipleMoveData[arraycount].yPosition, contextObj.multipleMoveData[arraycount].newxPosition, contextObj.multipleMoveData[arraycount].newyPosition, contextObj.multipleMoveData[arraycount].SymbolHandle, contextObj.multipleMoveData[arraycount].SpaceId, function (retCode) {
    //            if (retCode == 0) {
    //                var index = contextObj.multipleMoveData.findIndex(function (el) { return el.AssetsId === AssetsId });
    //                var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.FloorId === floorid });
    //                if (index != -1) {
    //                    var SiteId = contextObj.spaceOpenDrawingObj.spaceData[index]['SiteId'];

    //                    if (SpaceId == "")
    //                        SpaceId = 0;
    //                    contextObj.assetsDrawingService.updateAssetsSymbolData(9, SpaceId, dblObjectNewMidX, dblObjectNewMidY, 0, contextObj.drawingId, contextObj.objectCategoryId, SiteId, AssetsId).subscribe(function (resultData) {
    //                        if (resultData["Data"]["Message"] == "Success") {
    //                            var index = contextObj.multipleMoveData.findIndex(function (el) { return el.AssetsId === AssetsId });
    //                            if (index != -1) {

    //                                //******
    //                                contextObj.objectsData[index].SpaceId = SpaceId;
    //                                contextObj.objectsData[index].Xposition = dblObjectNewMidX;
    //                                contextObj.objectsData[index].Yposition = dblObjectNewMidY;
    //                                //*******
    //                                contextObj.multipleMoveData.splice(index, 1);
    //                                if (contextObj.multipleMoveData.length > 0) {
    //                                    contextObj.updateNewpositionForMultiplemove(contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].AssetsId, contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].xPosition, contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].yPosition, dblActualXDifference, dblActualYDifference, contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].SymbolHandle, SpaceId, contextObj.multipleMoveData.length - 1, floorid, resCallback);
    //                                }
    //                                else {
    //                                    resCallback(0);
    //                                }
    //                            }
    //                            else {
    //                                resCallback(1);
    //                            }

    //                        }
    //                        else {
    //                            resCallback(1);
    //                        }
    //                    });

    //                }


    //                //var index = contextObj.multipleMoveData.findIndex(function (el) { return el.AssetsId === AssetsId });
    //                //contextObj.multipleMoveData.splice(index, 1);                      
    //                //if (contextObj.multipleMoveData.length > 0)
    //                //{
    //                //    contextObj.updateNewpositionForMultiplemove(contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].AssetsId, contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].xPosition, contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].yPosition, dblActualXDifference, dblActualYDifference, contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].SymbolHandle, contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].SpaceId, contextObj.multipleMoveData.length - 1, resCallback);
    //                //}
    //                //else
    //                //{
    //                //resCallback(0);
    //                //}
    //            }
    //            else {
    //                resCallback(1);
    //            }
    //        });

    //    });

    //}

    //getAssetXYCordinates(AssetId) {
    //    var contextObj = this;
    //    var xpos: number;
    //    var ypos: number;
    //    xpos = contextObj.objectsData.find(function (el) { return el.ObjectId === AssetId })['Xposition'];
    //    ypos = contextObj.objectsData.find(function (el) { return el.ObjectId === AssetId })['Yposition'];
    //    return xpos + contextObj.colDelimiter + ypos;
    //    // return "(" + xPos + this.colDelimiter + yPos + ")";
    //}
    ///*Move asset text */
    //moveAssetText = function (AssetId, xpos, ypos, resCallback) {
    //    ////debugger;
    //    var contextObj = this;
    //    var textHandle = contextObj.dataInDrawingTextHandles.find(function (el) { return el.Key === AssetId }).Value;
    //    contextObj.objiWhiz.moveEntity(textHandle, xpos, ypos, function (retcode) {
    //        if (retcode != 0)
    //            console.log("getEntityExtents faild due to ", retcode);
    //        resCallback(0);
    //    });
    //}
    ///*Move asset symbol text */
    //moveAssetSymbolText = function (SymboltextHandle, xpos, ypos, resCallback) {
    //    var contextObj = this;
    //    contextObj.objiWhiz.moveEntity(SymboltextHandle, xpos, ypos, function (retcode) {
    //        if (retcode != 0) {
    //            console.log("Move symbol text faild due to ", retcode);
    //            resCallback(1);
    //        }
    //        else
    //            resCallback(0);
    //    });
    //}
    ///* delink asset : Start*/
    //delinkAsset(resCallback) {
    //    //debugger
    //    var contextObj = this;
    //    contextObj.objiWhiz.setCursor(2);
    //    contextObj.objiWhiz.getDWGPoint(function (retCode, Xposition, Yposition) {    //getdwg point : clicked point                       
    //        if (retCode == 0) {
    //            contextObj.objiWhiz.getSymbolWithDWGPoint(Xposition, Yposition, true, function (rtCode, selectedSymbolhandle) {//if clicked point is a symbol or not
    //                if (rtCode == 0) {
    //                    contextObj.hatchObject(selectedSymbolhandle, function (retCode) {
    //                        if (retCode == 0) {
    //                            contextObj.PlaceObjectPermission(Xposition, Yposition, 3, function (retcode) {
    //                                var UserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
    //                                if (((contextObj.drawingCategoryId == 1) && (retcode == null || retcode == undefined || retcode == 0)) || ((contextObj.drawingCategoryId != 1) && (retcode == 0))) {
    //                                    contextObj.delinkAsset(resCallback);
    //                                }

    //                                else {
    //                                    var dataitemIndex = contextObj.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle });
    //                                    if (dataitemIndex != -1) {
    //                                        var intObjectId = contextObj.objectsHandlesData[dataitemIndex].AssetsId;
    //                                        var indexnew = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === intObjectId });
    //                                        if (indexnew != -1) {
    //                                            var ClassId = contextObj.objectsData[indexnew]["ObjectClassId"];
    //                                            var indexnew = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === intObjectId });
    //                                            if (indexnew != -1) {
    //                                                contextObj.delinkAssets.push({ AssetsId: intObjectId, ClassId: ClassId });
    //                                                resCallback(0);

    //                                            }
    //                                            else
    //                                                resCallback(1);
    //                                        }
    //                                        else
    //                                            resCallback(1);
    //                                    }
    //                                    else
    //                                        resCallback(1);
    //                                }
    //                            });
    //                        }
    //                        else
    //                            resCallback(1);
    //                    });
    //                }
    //                else
    //                    contextObj.delinkAsset(resCallback);
    //            });
    //        }

    //        //else if (retCode == 8)
    //        //{
    //        //       var contextObj = this;
    //        //       contextObj.deHatchObjects(function (retCode) {
    //        //        contextObj.delinkAssets = [];
    //        //        contextObj.notificationServices.ClearAllToasts();                    
    //        //    });

    //        //}

    //        else
    //            resCallback(1);
    //    });
    //}
    ////Do you want to proceed with delink : Yes
    //delinkProgress(drawingId, resCallback) {
    //    var contextObj = this;
    //    var SymbolLayerName = "";
    //    var ObjectId = 0;
    //    var SiteId = "";

    //    // debugger
    //    if (contextObj.delinkAssets.length > 0) {
    //        var objectclassid = contextObj.delinkAssets[0].ClassId;
    //        ObjectId = contextObj.delinkAssets[0].AssetsId;
    //        SymbolLayerName = "$SL_" + objectclassid + "_" + ObjectId;
    //    }
    //    var spaceId = contextObj.objectsData.find(function (el) { return el.ObjectId === ObjectId })['SpaceId'];
    //    var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === spaceId });
    //    if (index != -1) {
    //        SiteId = contextObj.spaceOpenDrawingObj.spaceData[index]['SiteId'];
    //    }
    //    var arr = new Array<ReportFieldArray>();
    //    //arr = JSON.parse(strsubmitField);
    //    arr.push({ ReportFieldId: 658, Value: "1" });
    //    if (contextObj.moduleId == 8)
    //        arr.push({ ReportFieldId: 659, Value: "14" });
    //    else
    //        arr.push({ ReportFieldId: 659, Value: "10" });
    //    arr.push({ ReportFieldId: 665, Value: "" });
    //    arr.push({ ReportFieldId: 666, Value: "" });
    //    arr.push({ ReportFieldId: 667, Value: "" });
    //    arr.push({ ReportFieldId: 668, Value: "" });
    //    arr.push({ ReportFieldId: 669, Value: "" });
    //    arr.push({ ReportFieldId: 7411, Value: SiteId.toString() });
    //    contextObj.objectsService.DelinkObjectSpaceData(JSON.stringify(arr), ObjectId, 0, 1, 1, 1, '', drawingId, '', 0, 0, 1, 1).subscribe(function (resultData) {

    //        contextObj.objiWhiz.deleteLayer(SymbolLayerName, function (retCode) {
    //            resCallback(retCode);
    //            contextObj.delinkAssets = [];
    //            contextObj.objiWhiz.regenerate();
    //            contextObj.deHatchObjects(function (retCode) {
    //                //debugger
    //                if (retCode == 0) {
    //                    contextObj.objiWhiz.zoomExtents(function (ret) {
    //                        if (ret == 0) {
    //                            contextObj.assetsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
    //                                contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
    //                                contextObj.notificationServices.ClearAllToasts();
    //                                switch (contextObj.moduleId) {

    //                                    case 8:
    //                                        contextObj.notificationServices.ShowToaster("Selected Furniture has been warehoused", 3);
    //                                        break;
    //                                    default:
    //                                        contextObj.notificationServices.ShowToaster("Selected " + contextObj.objectname + " has been de-linked", 3);
    //                                        break;
    //                                }
    //                                resCallback(0);
    //                            });
    //                        }
    //                        else
    //                            resCallback(1);
    //                    });
    //                }
    //                else
    //                    resCallback(1);
    //            });
    //        });
    //    });
    //}
    ////Do you want to proceed with delink : No
    //delinkCancel(resCallback) {

    //    var contextObj = this;
    //    contextObj.deHatchObjects(function (retCode) {
    //        //debugger
    //        contextObj.delinkAssets = [];
    //        contextObj.notificationServices.ClearAllToasts();
    //        resCallback(0);
    //    });

    //}
    ////Do you want to proceed with delink : No
    //moveOutsideSpaceInProgress(spaceid, floorid, dblActualXDifference, dblActualYDifference, resCallback) {

    //    var contextObj = this;
    //    contextObj.updateNewpositionForMultiplemove(contextObj.multipleMoveData[contextObj.arraycount - 1].AssetsId, contextObj.multipleMoveData[contextObj.arraycount - 1].xPosition, contextObj.multipleMoveData[contextObj.arraycount - 1].yPosition, dblActualXDifference, dblActualYDifference, contextObj.multipleMoveData[contextObj.arraycount - 1].SymbolHandle, spaceid, contextObj.arraycount - 1, floorid, function (rCode) {
    //        if (rCode == 0) {
    //            //insert and show successful message
    //            contextObj.notificationServices.ClearAllToasts();
    //            contextObj.notificationServices.ShowToaster(contextObj.objectname + " moved", 3);

    //            //switch (contextObj.moduleId) {
    //            //    case 7:
    //            //        contextObj.notificationServices.ShowToaster("Asset moved", 3);
    //            //        break;
    //            //    case 8:
    //            //        contextObj.notificationServices.ShowToaster("Furniture moved", 3);
    //            //        break;
    //            //}
    //            contextObj.multipleMoveData = [];
    //            resCallback(0);
    //        }
    //        else {
    //            contextObj.notificationServices.ClearAllToasts();
    //            contextObj.notificationServices.ShowToaster("There is some issues while moving, refresh the page and try again", 5);
    //            resCallback(1);
    //        }

    //    });

    //}
    ////Do you want to proceed with delink : Yes
    //moveInsideSpaceInProgress(drawingId, resCallback) {
    //    //var contextObj = this;
    //    //var SymbolLayerName = "";
    //    //if (contextObj.delinkAssets.length > 0) {
    //    //    var objectclassid = contextObj.delinkAssets[0].ClassId;
    //    //    var ObjectId = contextObj.delinkAssets[0].AssetsId;
    //    //    SymbolLayerName = "$SL_" + objectclassid + "_" + ObjectId;
    //    //}
    //    //contextObj.objiWhiz.deleteLayer(SymbolLayerName, function (retCode) {
    //    //    resCallback(retCode);
    //    //    contextObj.delinkAssets = [];
    //    //    contextObj.objiWhiz.regenerate();
    //    //    contextObj.deHatchObjects(function (retCode) {
    //    //        //debugger
    //    //        if (retCode == 0) {
    //    //            contextObj.objiWhiz.zoomExtents(function (ret) {
    //    //                if (ret == 0) {
    //    //                    contextObj.assetsDrawingService.getAssetsCount(contextObj.drawingId).subscribe(function (result) {
    //    //                        contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
    //    //                        contextObj.notificationServices.ClearAllToasts();
    //    //                        contextObj.notificationServices.ShowToaster("Selected asset has been de-linked", 3);
    //    resCallback(0);
    //    //                    });
    //    //                }
    //    //                else
    //    //                    resCallback(1);
    //    //            });
    //    //        }
    //    //        else
    //    //            resCallback(1);
    //    //    });
    //    //});
    //}
    ///* delink asset : End*/

    //getSpaceIdFromSpaceHandle(strSpaceHandle) {
    //    // debugger;
    //    var contextObj = this;
    //    var spaceId: number;
    //    var index;
    //    if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
    //        contextObj.blnIsSpace = false;
    //    }
    //    else {
    //        contextObj.blnIsSpace = true;
    //    }
    //    // if (this.isSpace)
    //    if (contextObj.blnIsSpace)
    //        index = this.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.BomaHandle === strSpaceHandle });
    //    else
    //        index = this.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.CarpetHandle === strSpaceHandle });

    //    if (index != -1)
    //        spaceId = this.spaceOpenDrawingObj.spaceData[index]['SpaceId'];
    //    else
    //        spaceId = index
    //    return spaceId;
    //}
    //checkEditPermissionforTheSelectedSpace = function (spaceId, resCallback) {
    //    var contextObj = this;
    //    contextObj.empDrawingService.checkEditPrivilageExist(spaceId).subscribe(function (resultData) {
    //        if (resultData.ServerId > 0)
    //            resCallback(true);
    //        else
    //            resCallback(false);
    //    });
    //}



    //assetsEditReflectInDrawing = function (editedRowData, resCallback) {
    //    ////debugger;
    //    var contextObj = this;
    //    var assetId = editedRowData.ObjectId;
    //    if (editedRowData['Status'] == "Assigned") {
    //        var ratio = [0];
    //        var formatedText: string = "";
    //        contextObj.objiWhiz.clientDWGAreaRatio(ratio);
    //        var rowInsertIndex = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === assetId });
    //        contextObj.objectsData[rowInsertIndex] = editedRowData;
    //        //contextObj.objiWhiz.deleteEntity(bomaHandle, function (retCode) {
    //        //    if (retCode != 0)
    //        //        alert("deleteEntity returned with error code : " + retCode);
    //        //    else {
    //        var assetsDispSettingsData = contextObj.objectsDisplaySettingData.slice();
    //        for (let dispSettingsItem of assetsDispSettingsData) {
    //            if (dispSettingsItem.ShowinDrawing) {
    //                var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
    //                var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
    //                let textContent = editedRowData[dispSettingsItem.FieldName];
    //                if (textContent == "null" || textContent == null)
    //                    textContent = "-";

    //                if ((dispSettingsItem.ObjectClassId != 0) && (editedRowData.ObjectClassId != 0)) {
    //                    if (dispSettingsItem.ObjectClassId != editedRowData.ObjectClassId) {
    //                        textContent = "";
    //                    }
    //                }
    //                if (textContent != "")
    //                    formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
    //            }
    //        }
    //        let formatedTextFinal: string = "{" + formatedText + "}";

    //        //for (let dispSettingsItem of contextObj.objectsDisplaySettingData) {
    //        //    if (dispSettingsItem.ShowinDrawing) {
    //        //        var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
    //        //        var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
    //        //        let textContent = editedRowData[dispSettingsItem.FieldName];
    //        //        if (textContent == "null" || textContent == null)
    //        //            textContent = "-";
    //        //        formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
    //        //        //formatedText += "\\fTimes New Roman|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + ratio[0] * dispSettingsItem.FontSize + ";" + textContent + "\\n";

    //        //    }

    //        //}
    //        // let formatedTextFinal: string = "{" + formatedText + "}";
    //        var textHandle = contextObj.dataInDrawingTextHandles.find(function (el) { return el.Key === assetId }).Value;
    //        contextObj.objiWhiz.setText(textHandle, formatedTextFinal, function (retCode) {
    //            if (retCode != 0) {
    //                console.log("setText returned with error code : ", retCode);
    //            }
    //            resCallback(0);
    //        });
    //    }
    //    else
    //        resCallback(0);
    //    //{
    //    //    contextObj.clearobjMoveRequestEmpDetails(assetId, function (retCode) {
    //    //        contextObj.deHatchObjects(function (retCode) {
    //    //            //contextObj.empCount--;
    //    //            resCallback(0);
    //    //        });
    //    //    });
    //    //}

    //    //    }
    //    //});
    //}


    //getAssetIdsArray(selectedMultipleSpaceIds) {
    //    var selectedIds: string[] = [];
    //    for (let spaceId of selectedMultipleSpaceIds) {
    //        for (let assetItem of this.objectsData) {
    //            if (assetItem['SpaceId'] == spaceId)
    //                selectedIds.push(assetItem['ObjectId'])
    //        }
    //    }
    //    return selectedIds;
    //}
    ////}
    //searchInDrawing(searchData, resCallback) {
    //    var searchedSymbolhandle: any[] = [];
    //    // var selectedSpaceHandles:
    //    for (var assetitem of searchData) {
    //        var index = this.objectsHandlesData.findIndex(function (el) { return el.AssetsId == assetitem['ObjectId'] });
    //        if (index != -1)
    //            searchedSymbolhandle.push(this.objectsHandlesData[index]['SymbolHandle']);

    //    }
    //    this.objiWhiz.blinkEntitiesByHandles(searchedSymbolhandle, this.blinkColorCodeR, this.blinkColorCodeG, this.blinkColorCodeB, this.commonDwgServices.blinkSize, this.commonDwgServices.blinkDelay, function (returnCode) {
    //        resCallback();
    //    });
    //}

    //getTotalizeData = function (selectedSpaceHandles, resCallback) {
    //    var contextObj = this;
    //    contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$LEGEND", function (returnCode) {
    //        if (contextObj.spaceOpenDrawingObj.legendRectHandles.length > 0) {
    //            contextObj.objiWhiz.removeMapsByHandle(contextObj.legendRectHandles);
    //            contextObj.objiWhiz.removeLinesByHandle(contextObj.legendLineHandles);
    //            contextObj.spaceOpenDrawingObj.legendRectHandles = "";
    //            contextObj.spaceOpenDrawingObj.legendLineHandles = "";
    //        }
    //        var spaceIds = contextObj.spaceOpenDrawingObj.getSpcaceIdsArray(contextObj.isSpace, selectedSpaceHandles);
    //        var strSpaceIds = "";
    //        var spaceCount = spaceIds.length;
    //        var arr = new Array<ReportFieldArray>();
    //        for (var i = 0; i < spaceCount; i++) {

    //            //arr = JSON.parse(strsubmitField);
    //            arr.push({ ReportFieldId: 665, Value: spaceIds[i] });
    //            //if (i != spaceIds.length - 1)
    //            //    strSpaceIds += spaceIds[i] + ",";
    //            //else
    //            //    strSpaceIds += spaceIds[i];
    //        }
    //        arr.push({ ReportFieldId: 649, Value: contextObj.objectCategoryId });
    //        contextObj.objectsService.getTotalize(JSON.stringify(arr)).subscribe(function (result) {
    //            var totalizeData = JSON.parse(result["Data"].FieldBinderData);
    //            contextObj.TotalizeDataForLegend = totalizeData;
    //            var modifyTotalizeData: string = "";
    //            var modifyAssetTotalizeData: string = "";
    //            let isAsset: boolean = false;
    //            for (var item of totalizeData) {
    //                if (item['Label'] == contextObj.objectname + " Details" || isAsset == true) {
    //                    isAsset = true;
    //                    if (item['Label'] != contextObj.objectname + " Details")
    //                        modifyAssetTotalizeData += item['Label'] + " = <b>" + item['Value'] + "</b><br><br>";

    //                }
    //                else
    //                    modifyTotalizeData += item['Label'] + " = <b>" + item['Value'] + "</b><br><br>";

    //            }

    //            resCallback(modifyTotalizeData, modifyAssetTotalizeData, spaceCount);

    //        });
    //    });
    //}

    //addTotalizeLegend = function (totalSpaceCount, resCallback) {
    //    //alert("test");
    //    var contextObj = this;
    //    var textArray: string[] = [];
    //    contextObj.commonDwgServices.calculateDwgRatio();
    //    var totalCount: string = "No. of Spaces selected = " + totalSpaceCount;
    //    var formatedText = "\\f|b1|l0|c0|p18;\\C7;\\H" + contextObj.commonDwgServices.g_dblDwgRatio * 3 + ";Space Details\\n\\n\\f|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonDwgServices.g_dblDwgRatio * 3 + ";" + totalCount + "\\n";
    //    for (var item of this.TotalizeDataForLegend) {
    //        var data = "";
    //        if (item['Label'] == contextObj.objectname + " Details") {
    //            data = item['Label'];
    //            formatedText += "\\f|b0|l0|c0|p18;\\C7;\\H" + contextObj.commonDwgServices.g_dblDwgRatio * 3 + ";" + data + "\\n"

    //        }
    //        else {
    //            data = item['Label'] + " = " + item['Value'];
    //            formatedText += "\\f|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonDwgServices.g_dblDwgRatio * 3 + ";" + data + "\\n"

    //        }
    //    }

    //    contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
    //        if (retCode == 0) {
    //            contextObj.spaceOpenDrawingObj.createDrawingDetailsLegend(xPos, yPos, false, function (startY) {
    //                contextObj.objiWhiz.createMultilineText("$LEGEND", 1, xPos, startY, 0, contextObj.commonDwgServices.g_dblDwgRatio * 3,
    //                    0, 1, formatedText, "Standard", 0, function (retCode, entityHandle) {
    //                        if (retCode != 0)
    //                            console.log("createMultilineText returned with error code : ", retCode);
    //                        else
    //                            console.log("Entity handle: " + entityHandle);
    //                        contextObj.objiWhiz.zoomExtents(function (code) {
    //                            resCallback(retCode);
    //                        });
    //                    });


    //            });
    //        }
    //        else
    //            console.log("getDWGPoint failed due to ", retCode);
    //    });
    //}

    //ConnectComponents(recCallback) {

    //    var contextObj = this;
    //    contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntity, contextObj.cursorIndex, function (returnCode, entityHandles) {
    //        debugger
    //        contextObj.handlesforblink = entityHandles;
    //        if (returnCode == 0) {
    //            var handleArray = entityHandles.split(contextObj.rowDelimiter);
    //            contextObj.FindBlockOrSymbolHandle(handleArray, recCallback);
    //        }
    //        else {
    //            console.log("connectivity failed due to ", returnCode);
    //            recCallback(returnCode, "");
    //        }
    //    });
    //}

    //RemoveComponent(recCallback) {
    //    var contextObj = this;
    //    contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntity, contextObj.cursorIndex, function (returnCode, entityHandles) {
    //        if (returnCode == 0) {
    //            var handleArray = entityHandles.split(contextObj.rowDelimiter);
    //            contextObj.FindBlockOrSymbolHandle(handleArray, function (returnCode, objectId, classId) {
    //                debugger
    //                recCallback(returnCode, objectId, classId);
    //            });
    //        }
    //        else {
    //            console.log("connectivity failed due to ", returnCode);
    //        }
    //    });
    //}

    //FindBlockOrSymbolHandle(entityHandles, recCallback) {
    //    if (entityHandles.length > 0 || entityHandles[0] != "") {
    //        var contextObj = this;
    //        var objectId, classId;
    //        contextObj.objiWhiz.getEntityType(entityHandles[0], function (ret, typeId) {
    //            if (ret == 0) {
    //                debugger
    //                if (typeId == 1)  /*Block*/ {
    //                    contextObj.handlesforblink = [entityHandles[0]];
    //                    recCallback(ret, objectId, classId, typeId);
    //                    return;
    //                }
    //                else if (typeId == 9) /* Polyline*/ {
    //                    classId = contextObj.getobjectclassIdfromSymbolHandle(entityHandles[0]);
    //                    objectId = contextObj.getObjectIdFromSymbolHandle(entityHandles[0]);
    //                    if (classId != "" && objectId != "") {
    //                        contextObj.handlesforblink = [entityHandles[0]];
    //                        contextObj.handlesToRemoveblink = entityHandles[0];
    //                        recCallback(ret, objectId, classId, typeId);
    //                        return;
    //                    }
    //                }
    //                entityHandles.splice(0, 1);
    //                contextObj.FindBlockOrSymbolHandle(entityHandles, recCallback);

    //            } else {
    //                console.log("getEntityType failed due to ", ret);
    //                recCallback(ret, "");
    //            }
    //        });
    //    }
    //    else {
    //        recCallback(37, "");
    //    }
    //}
    //SelectFromBlinkConnectComponents = function (recCallback) {                    /*secondaryObjectId*/
    //    debugger
    //    var contextObj = this;
    //    var SecondaryObjectid;
    //    contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntity, contextObj.cursorIndex, function (returnCode, entityHandles) {
    //        debugger
    //        if (returnCode == 0) {
    //            var handleArray = entityHandles.split(contextObj.rowDelimiter);
    //            contextObj.FindBlockOrSymbolHandle(handleArray, function (returnCode, objectId, classId) {
    //                SecondaryObjectid = objectId;
    //                var Temphandle = contextObj.getSymbolHandleFromObjectId(objectId);
    //                var handle = Temphandle + contextObj.rowDelimiter;
    //                contextObj.objiWhiz.removeBlinksByHandle(handle);

    //                recCallback(returnCode, SecondaryObjectid);
    //            });

    //        }
    //        else {
    //            contextObj.objiWhiz.removeBlinkers();
    //            recCallback(returnCode);
    //        }
    //    });

    //}
    //GetObjectAssociationToHatch(objectIds, resCallback) {
    //    var contextObj = this;
    //    var Handles = [];
    //    for (var item of objectIds) {
    //        Handles.push(contextObj.getSymbolHandleFromObjectId(item));
    //    }
    //    debugger
    //    contextObj.objiWhiz.zoomExtents(function (ret) {
    //        contextObj.objiWhiz.blinkEntitiesByHandles(Handles, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (returnCode) {
    //            debugger

    //            resCallback(ret);
    //        });
    //    });
    //}

    ////GetBlinkForConnectivity(resCallback) {
    ////    debugger
    ////    var contextObj = this;
    ////    contextObj.objiWhiz.zoomExtents(function (ret) {
    ////        contextObj.objiWhiz.blinkEntitiesByHandles(contextObj.handlesforblink, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (returnCode) {
    ////            debugger
    ////            resCallback(ret);
    ////        });
    ////    });
    ////}

    ///*To get objectId from SymbolHandle*/
    //getObjectIdFromSymbolHandle(selectedSymbolhandle: any) {
    //    var index = this.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle });
    //    var objectId;
    //    if (index != -1)
    //        objectId = this.objectsHandlesData[index].AssetsId;
    //    return objectId;
    //}
    ///*To get SymbolHandle from objectId*/
    //getSymbolHandleFromObjectId(objectId: any) {
    //    var index = this.objectsHandlesData.findIndex(function (el) { return el.AssetsId === objectId });
    //    var SymbolHandle: any = [];
    //    if (index != -1)
    //        SymbolHandle = this.objectsHandlesData[index].SymbolHandle;
    //    return SymbolHandle;
    //}
    ///*To get objectclassId from ObjectId*/
    //getobjectclassIdfromObjectId(objectId: any) {
    //    var objectclassId;
    //    var dataitemIndex = this.objectsData.findIndex(function (el) { return el.ObjectId === objectId });
    //    if (dataitemIndex != -1) {
    //        objectclassId = this.objectsData[dataitemIndex].ObjectClassId;
    //    }
    //    return objectclassId;

    //}
    ///*To get objectclassId from SymbolHandle*/
    //getobjectclassIdfromSymbolHandle(selectedSymbolhandle: any) {
    //    var index = this.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle });
    //    var objectId;
    //    var objectclassId;
    //    if (index != -1) {
    //        objectId = this.objectsHandlesData[index].AssetsId;
    //        var dataitemIndex = this.objectsData.findIndex(function (el) { return el.ObjectId === objectId });
    //        if (dataitemIndex != -1) {
    //            objectclassId = this.objectsData[dataitemIndex].ObjectClassId;
    //        }
    //    }
    //    return objectclassId;
    //}
    //getSpaceDetailsfromobjectid(objectid: any) {
    //    var Space = "";
    //    var spaceId = this.objectsData.find(function (el) { return el.ObjectId === objectid })['SpaceId'];
    //    if (spaceId != undefined) {
    //        var index = this.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === spaceId });
    //        if (index != -1) {
    //            Space = this.spaceOpenDrawingObj.spaceData[index]//;
    //        }
    //    }
    //    return Space;
    //}

    //RotateObject = function (rescallback) {
    //    var contextObj = this;
    //    this.objiWhiz.setCursor(12);
    //    this.objiWhiz.getDWGPoint(function (returnCode, dXCoord, dYCoord) {
    //        if (returnCode != 0)
    //            rescallback(returnCode)
    //        else {
    //            contextObj.objiWhiz.getSymbolWithDWGPoint(dXCoord, dYCoord, true, function (retCode, selectedSymbolhandle) {
    //                if (retCode != 0) {
    //                    contextObj.objiWhiz.setCursor(2);
    //                    rescallback(retCode)
    //                }
    //                else
    //                    rescallback(retCode, selectedSymbolhandle);

    //            });
    //        }

    //    })
    //}
    //RotateObjectSave = function (symbolHandle, angle, resCallback) {
    //    var contextObj = this;
    //    this.objiWhiz.getEntityMidpoint(symbolHandle, function (retcode, Xpos, Ypos) {
    //        if (retcode == 0 && (angle >= 0 || angle <= 360)) {
    //            var midPoint = "0.0" + contextObj.colDelimiter + "0.0";
    //            contextObj.objiWhiz.rotateSymbol(symbolHandle, Xpos, Ypos, angle, midPoint, function (retrot, FinalAngle, ActualPoints, MidPoint) {
    //                console.log('return from rotate symbol', retrot)
    //                if (retrot == 0) {
    //                    console.log('final angle', FinalAngle)
    //                    console.log('ActualPoints', ActualPoints)
    //                    console.log('MidPoint', MidPoint)
    //                    contextObj.objiWhiz.getEntityExtents(symbolHandle, function (retentity, MinX, MinY, MaxX, MaxY) {
    //                        if (retentity == 0) {
    //                            var objectid = contextObj.getObjectIdFromSymbolHandle(symbolHandle)
    //                            var texthandle = contextObj.dataInDrawingTextHandles.find(function (textitem) { return textitem.Key === objectid })
    //                            contextObj.objiWhiz.moveEntity(texthandle.Value, MaxX, MaxY, function (retmove) {
    //                                if (retmove == 0) {
    //                                    //Saving rotated object
                                        
    //                                    console.log('contextObj.objectsData', contextObj.objectsData)
    //                                    var scopeobject = contextObj.objectsData.find(function (el) { return el.ObjectId === objectid });
    //                                    var spaceId = scopeobject['SpaceId'];                                        
    //                                    var SiteId = scopeobject['SiteId']
    //                                    if (spaceId == undefined)
    //                                        spaceId = 0;
    //                                    var arr = new Array<ReportFieldArray>();
    //                                    //arr = JSON.parse(strsubmitField);
    //                                    arr.push({ ReportFieldId: 658, Value: contextObj.objectCategoryId.toString() });
    //                                    arr.push({ ReportFieldId: 659, Value: "9" });
    //                                    arr.push({ ReportFieldId: 665, Value: spaceId.toString() });
    //                                    arr.push({ ReportFieldId: 666, Value: MidPoint.split('µ')[0].toString() });
    //                                    arr.push({ ReportFieldId: 667, Value: MidPoint.split('µ')[1].toString() });
    //                                    arr.push({ ReportFieldId: 668, Value: FinalAngle.toString() });
    //                                    arr.push({ ReportFieldId: 669, Value: contextObj.drawingId.toString() });
    //                                    arr.push({ ReportFieldId: 7411, Value: SiteId.toString() });
    //                                    contextObj.objectsService.RotateObjectSave(JSON.stringify(arr), objectid, 0, contextObj.objectCategoryId, 1, 1, '', contextObj.drawingId, '', 0, 0, 1, 1).subscribe(function (resultDataRotate) {
    //                                        if (resultDataRotate.Data.StatusId == 1) {
    //                                            console.log('resultDataRotate', JSON.parse(resultDataRotate["Data"]["Data"])[0]["Xposition"])
    //                                            console.log('resultDataRotate', JSON.parse(resultDataRotate["Data"]["Data"])[0]["Yposition"])
    //                                            scopeobject.Xposition = JSON.parse(resultDataRotate["Data"]["Data"])[0]["Xposition"]
    //                                            scopeobject.Yposition = JSON.parse(resultDataRotate["Data"]["Data"])[0]["Yposition"]

    //                                            resCallback(0)
    //                                        } else
    //                                            resCallback(1)

    //                                    });
    //                                    //end of db saving
    //                                }
    //                                else
    //                                    resCallback(retmove)
    //                            });

    //                        }
    //                        else
    //                            resCallback(retentity)
    //                    });

    //                }
    //                else
    //                    resCallback(retrot)
    //            })
    //        }
    //        else
    //            resCallback(retcode)
    //    })
    //}

}
export interface AssetsHandleData {
    AssetsId: number;
    SymbolHandle: string;

}


export interface MultipleMoveData {
    AssetsId: number;
    SymbolHandle: string;
    xPosition: string;
    yPosition: string;
    newxPosition: string;
    newyPosition: string;
    SpaceId: string;

}


export interface objectsSymbolTextHandleData {
    AssetsId: number;
    TextHandle: string;

}

export interface DataForDrawing {
    Key: string;
    Value: string;
}

export interface DelinkAsset {
    AssetsId: number;
    ClassId: number;
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}




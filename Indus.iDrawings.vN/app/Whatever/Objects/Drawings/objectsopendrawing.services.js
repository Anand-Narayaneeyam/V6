var spaceopendrawing_services_1 = require('../../space/drawings/spaceopendrawing.services');
//Assets Service
var objectsdrawing_service_1 = require('../../../models/objects/objectsdrawing.service');
var objects_service_1 = require('../../../Models/Objects/objects.service');
/*ObjectCategoryId: 1 Assets Module ID: 7 displaysettings categoryid= 3 Additionalcategoryid: 19 */
var ObjectssOpenDrawing = (function () {
    function ObjectssOpenDrawing(iWhizObject, drawingId, moduleId, drawingCategoryId, pageTarget, notificationService, http, xrefedDrawing, IsBuildingDrawing) {
        this.iWhizObject = iWhizObject;
        this.isBuildingDrawing = false;
        /* ***************************** */
        //categoryId = 3;
        this.addtlDataFieldCategoryId = 19;
        /* ***************************** */
        this.g_dblScaleFactor = 1;
        this.g_dblAssetsTextAngle = 0;
        this.arrayCount = 0;
        this.strAssetsTextHeight = 0;
        this.g_dblAssetsSymbolLineWidth = 0.0;
        this.g_strAssetsSymbolLineType = "ByLayer";
        this.g_intAssetsTextStyleId = 1;
        this.resultDataArray = [];
        this.objectsHandlesData = [];
        this.dataInDrawingTextHandles = [];
        this.objectsTooltipData = [];
        this.multipleMoveData = [];
        this.blnPermittedSpace = false;
        this.hatchObjectLayer = "$HatchObject";
        this.g_blnAllowMultipleSelection = false; /* For proper messgae in multiple place object */
        this.strCheckPermissionForSelectedPoint = "0";
        /* spaceId: number = 0; */
        this.g_blnModuleAdmin = true; /* Need to take it from db... as per the time being it is set as a static variable. */
        this.isSpace = true;
        this.objectsSymbolTextHandleData = [];
        this.delinkObjects = [];
        this.arraycount = 0;
        this.beforeMoveSpaceId = undefined;
        this.msgcount = 0;
        this.placemsgcount = 0;
        this.IsBarcodeSubscribed = false;
        this.IsAutoNumbering = false;
        this.blinkColorCodeR = 255;
        this.blinkColorCodeG = 0;
        this.blinkColorCodeB = 0;
        this.blinkGreenColorCodeR = 0;
        this.blinkGreenColorCodeG = 128;
        this.blinkGreenColorCodeB = 0;
        this.drawinglayerNameForSelectEntity = "";
        this.typeIDForSelectEntity = 0;
        this.cursorIndex = 12;
        this.xrefedDrawingId = 0;
        this.hasXrefExists = false;
        this.xRefHandles = [];
        this.featureId = '';
        this.objectSelectionColor = 2;
        this.legendColor = 2;
        this.siteId = 0;
        this.allBlockRefHandles = [];
        this.isFromCopyObject = false;
        /* Initialise objects */
        this.initilizeObjects = function (resCallback) {
            debugger;
            var contextObj = this;
            var drawingid;
            if (this.xrefedDrawingId == 0 || this.xrefedDrawingId == undefined || this.xrefedDrawingId == null) {
                drawingid = this.drawingId;
            }
            else {
                drawingid = this.xrefedDrawingId;
                contextObj.hasXrefExists = true;
            }
            contextObj.objectsDrawingService = new objectsdrawing_service_1.ObjectsDrawingService(contextObj.http);
            contextObj.objectsService = new objects_service_1.ObjectsService(contextObj.http);
            contextObj.getObjectColorpreferences(function (retCode) { });
            contextObj.getObjectsDisplaySettingsData();
            contextObj.getAssetsSymbolDetails(function (retCode) { });
            contextObj.getAllAssetsDetails(function (retCode) { });
            this.spaceOpenDrawingObj = new spaceopendrawing_services_1.SpaceOpenDrawing(this.objiWhiz, drawingid, this.moduleId, this.http, contextObj.isBuildingDrawing);
            if (contextObj.drawingCategoryId == 1 || contextObj.hasXrefExists) {
                contextObj.spaceOpenDrawingObj.initilizeObjects(function (retCode) {
                    contextObj.commonDwgServices = contextObj.spaceOpenDrawingObj.commonServices;
                    contextObj.siteId = contextObj.commonDwgServices.drawingDetails["SiteId"];
                    if (contextObj.commonDwgServices.g_IsNetCustomer == true)
                        contextObj.blnIsSpace = false;
                    else
                        contextObj.blnIsSpace = true;
                    contextObj.userRoleId = contextObj.commonDwgServices.sessionUserRoleId;
                    contextObj.rowDelimiter = contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter;
                    contextObj.colDelimiter = contextObj.spaceOpenDrawingObj.commonServices.columnDelimiter;
                    contextObj.isSpace = contextObj.spaceOpenDrawingObj.commonServices.isSpace;
                    //contextObj.updateOrphanRecords(function (retCode) {
                    //    contextObj.getAllAssetsDetails(function (retCode) { });
                    //});
                    contextObj.getAutoNumberingAndBarcodeFeature(function (res) {
                        resCallback(0);
                    });
                });
            }
            else {
                contextObj.spaceOpenDrawingObj.getCommonServices(function (retCode) {
                    contextObj.commonDwgServices = contextObj.spaceOpenDrawingObj.commonServices;
                    contextObj.siteId = contextObj.commonDwgServices.drawingDetails["SiteId"];
                    if (contextObj.commonDwgServices.g_IsNetCustomer == true)
                        contextObj.blnIsSpace = false;
                    else
                        contextObj.blnIsSpace = true;
                    contextObj.userRoleId = contextObj.commonDwgServices.sessionUserRoleId;
                    contextObj.rowDelimiter = contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter;
                    contextObj.colDelimiter = contextObj.spaceOpenDrawingObj.commonServices.columnDelimiter;
                    contextObj.isSpace = contextObj.spaceOpenDrawingObj.commonServices.isSpace;
                    //contextObj.updateOrphanRecords(function (retCode) {
                    //    contextObj.getAllAssetsDetails(function (retCode) { });
                    //});
                    contextObj.getAutoNumberingAndBarcodeFeature(function (res) {
                        resCallback(0);
                    });
                });
            }
        };
        /*---------------------------------------------------------------*/
        /*Permission for the selected point : for Place*/
        this.CheckPermissionForSelectedPoint = function (MaxX, MaxY, Target, rescallBack) {
            var contextObj = this;
            /*var blnIsSpace: boolean;*/
            var strLayerName;
            var blnEditPermission = false;
            var g_intUserRoleId = contextObj.commonDwgServices.sessionUserRoleId;
            if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
                contextObj.blnIsSpace = false;
                strLayerName = contextObj.commonDwgServices.netLayername;
            }
            else {
                contextObj.blnIsSpace = true;
                strLayerName = contextObj.commonDwgServices.spacelayerName;
            }
            var blnLayerIsVisible = [0];
            var returnCode = contextObj.objiWhiz.getLayerVisibility(strLayerName, blnLayerIsVisible);
            if (returnCode == 0) {
                contextObj.objiWhiz.setLayerVisibility(strLayerName, true, function (retcode) {
                    if (retcode == 0) {
                        contextObj.objiWhiz.getHandleWithDWGPoint(MaxX, MaxY, contextObj.blnIsSpace, function (IsSpace, strSpaceOrNetHandle) {
                            if ((strSpaceOrNetHandle != null) && (strSpaceOrNetHandle != "")) {
                                contextObj.strCheckPermissionForSelectedPoint = strSpaceOrNetHandle;
                                contextObj.objiWhiz.setLayerVisibility(strLayerName, blnLayerIsVisible[0], function (returnCode) {
                                    if (returnCode == 0) {
                                        if (g_intUserRoleId > 3) {
                                            // //debugger
                                            var spaceId = contextObj.getSpaceIdFromSpaceHandle(strSpaceOrNetHandle);
                                            contextObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {
                                                contextObj.notificationServices.ClearAllToasts();
                                                if (blnEditPermission == false) {
                                                    contextObj.notificationServices.ClearAllToasts();
                                                    if (Target == 3)
                                                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                                                    else
                                                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                                    contextObj.strCheckPermissionForSelectedPoint = "0";
                                                    rescallBack(contextObj.strCheckPermissionForSelectedPoint);
                                                }
                                                else {
                                                    rescallBack(contextObj.strCheckPermissionForSelectedPoint); //by aswathy on 21/03/17
                                                }
                                            });
                                        }
                                        else {
                                            rescallBack(contextObj.strCheckPermissionForSelectedPoint);
                                        }
                                    }
                                    else {
                                        rescallBack("0");
                                    }
                                });
                            }
                            else {
                                contextObj.notificationServices.ClearAllToasts();
                                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                                rescallBack("0");
                            }
                        });
                    }
                    else {
                        rescallBack("0");
                    }
                });
            }
            else {
                rescallBack("0");
            }
        };
        /*PlaceSymbol--- From assets grid->drawinglist grid -> opendrawing Pagetarget : 2   || drawinglist grid -> opendrawing Pagetarget : 1 */
        this.placeSymbolInDrawing = function (selectedObjectDetails, SiteId, SpaceId, resCallback) {
            var contextObj = this;
            //var SymbolLayerName = "$Test";
            //AssetLayer created with objectclassid and objectid
            var formatedText = "";
            var MinX = [0];
            var MinY = [0];
            var MaxX = [0];
            var MaxY = [0];
            var spaceId;
            /*set the cursor */
            contextObj.objiWhiz.setCursor(2);
            var SymbolId = selectedObjectDetails["SymbolId"];
            /*Taking symbol details*/
            var index = contextObj.resultDataArray.findIndex(function (el) { return el.Id === SymbolId; });
            if (index != -1) {
                var item = contextObj.resultDataArray[index];
                contextObj.strAssetsSymbolText = item.SymbolText; /*symboltext */
                contextObj.strAssetsTextHeight = item.TextHeight; /*symboltext height*/
                contextObj.strAssetsSymbolCords = item.CoordinateString.replace(/,/g, contextObj.colDelimiter); //coordinates 
                contextObj.strAssetsSymbolCords = contextObj.strAssetsSymbolCords.replace(/;/g, contextObj.rowDelimiter);
                contextObj.objiWhiz.getDWGExtents(MinX, MinY, MaxX, MaxY);
                contextObj.objiWhiz.getDWGPoint(function (returnCode, dXCoord, dYCoord) {
                    if (returnCode != 0) {
                        resCallback(returnCode);
                    }
                    else {
                        if (contextObj.drawingCategoryId != 1 && contextObj.hasXrefExists == false) {
                            if (contextObj.isFromCopyObject) {
                                resCallback(dXCoord, dYCoord, 0);
                            }
                            else {
                                contextObj.PlaceCoreSymbol(dXCoord, dYCoord, 0, selectedObjectDetails, SiteId, function (resplacecallbak) {
                                    if (resplacecallbak == 0)
                                        resCallback(0);
                                    else
                                        resCallback(resplacecallbak);
                                });
                            }
                        }
                        else {
                            contextObj.objiWhiz.getHandleWithDWGPoint(dXCoord, dYCoord, contextObj.blnIsSpace, function (IsSpace, strSpaceOrNetHandle) {
                                var spaceId = contextObj.getSpaceIdFromSpaceHandle(strSpaceOrNetHandle);
                                contextObj.strCheckPermissionForSelectedPoint = strSpaceOrNetHandle;
                                contextObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {
                                    if (blnEditPermission) {
                                        if (contextObj.isFromCopyObject) {
                                            resCallback(dXCoord, dYCoord, spaceId);
                                        }
                                        else {
                                            contextObj.PlaceCoreSymbol(dXCoord, dYCoord, spaceId, selectedObjectDetails, SiteId, function (resplacecallbak) {
                                                if (resplacecallbak == 0)
                                                    resCallback(0);
                                                else
                                                    resCallback(resplacecallbak);
                                            });
                                        }
                                    }
                                    else {
                                        contextObj.strCheckPermissionForSelectedPoint = "0";
                                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                        contextObj.placeSymbolInDrawing(selectedObjectDetails, SiteId, SpaceId, resCallback);
                                    }
                                });
                            });
                        }
                    }
                });
            }
        };
        //function to place asset
        this.PlaceCoreSymbol = function (Xpos, Ypos, spaceid, selectedObjectDetails, SiteId, callback) {
            var contextObj = this;
            var strClassname;
            var formatedText = "";
            var strAssetNo;
            switch (this.moduleId) {
                case 6:
                    strClassname = selectedObjectDetails["Object Class"];
                    strAssetNo = selectedObjectDetails["Object No."];
                    break;
                case 7:
                    strClassname = selectedObjectDetails["Asset Class"];
                    strAssetNo = selectedObjectDetails["Asset No."];
                    break;
                case 8:
                    strClassname = selectedObjectDetails["Furniture Class"];
                    strAssetNo = selectedObjectDetails["Furniture No."];
                    break;
                case 17:
                case 18:
                case 25:
                case 26:
                case 27:
                    strClassname = selectedObjectDetails["Component Type"];
                    strAssetNo = selectedObjectDetails["Component No."];
                    break;
                case 24:
                    strClassname = selectedObjectDetails["Equipment Type"];
                    strAssetNo = selectedObjectDetails["Equipment No."];
                    break;
            }
            var intObjectId = selectedObjectDetails["ObjectId"];
            /* if (SymbolId != null) {
                 var SymbolId = 494; */
            var ClassId = selectedObjectDetails["ObjectClassId"];
            var intColorId = selectedObjectDetails["SymbolColor"];
            var SymbolLayerName = "$SL_" + ClassId + "_" + intObjectId;
            contextObj.objectsDrawingService.updateAssetsSymbolData(9, spaceid, Xpos, Ypos, 0, contextObj.drawingId, contextObj.objectCategoryId, SiteId, intObjectId, contextObj.isBuildingDrawing).subscribe(function (resultData) {
                if (resultData["Data"]["Message"] == "Success") {
                    contextObj.objectsDrawingService.getAllAssetsDetails(contextObj.objectCategoryId, contextObj.drawingId, 2, intObjectId, contextObj.isBuildingDrawing).subscribe(function (resultData) {
                        selectedObjectDetails = null;
                        selectedObjectDetails = JSON.parse(resultData.FieldBinderData);
                        if (contextObj.totalObjects != null && contextObj.totalObjects != undefined)
                            contextObj.totalObjects = parseInt(contextObj.totalObjects) + 1;
                        var assetsDispSettingsData = contextObj.objectsDisplaySettingData.slice();
                        var ratio = [0];
                        contextObj.objiWhiz.clientDWGAreaRatio(ratio);
                        contextObj.createobjectsDataAndTooltipOnDrawing(selectedObjectDetails, assetsDispSettingsData, ratio, contextObj.resultDataArray, function (ret) {
                            contextObj.objectsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
                                contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
                                contextObj.notificationServices.ClearAllToasts();
                                contextObj.objectsData.push(selectedObjectDetails[0]);
                                contextObj.notificationServices.ShowToaster(strClassname + " (" + strAssetNo + ") placed", 3);
                                callback(1);
                            });
                        });
                        //contextObj.objiWhiz.insertSymbol(SymbolLayerName, intColorId, Xpos, Ypos, contextObj.strAssetsSymbolCords, contextObj.g_dblAssetsSymbolLineWidth, contextObj.g_strAssetsSymbolLineType, contextObj.g_dblScaleFactor, function (returnCode, symbolHandle, ActualPoints) {
                        //    if (returnCode != 0) {
                        //        callback(0);
                        //    }
                        //    else {
                        //        contextObj.objectsHandlesData.push({ AssetsId: intObjectId, SymbolHandle: symbolHandle });
                        //        var ratio = [0];
                        //        contextObj.objiWhiz.clientDWGAreaRatio(ratio);
                        //        if ((contextObj.strAssetsSymbolText != "") && (contextObj.strAssetsSymbolText != null)) {
                        //            contextObj.objiWhiz.createText(SymbolLayerName, intColorId, Xpos, Ypos,
                        //                contextObj.g_dblAssetsTextAngle, contextObj.strAssetsTextHeight, 1, contextObj.strAssetsSymbolText,
                        //                "Standard", 5, function (returnCode, entityHandle) {
                        //                    ////debugger;
                        //                    if (returnCode != 0) {
                        //                        //console.log('Error occured while creating symbol text : due to errorcode--' + returnCode);
                        //                        callback(0);
                        //                    }
                        //                    else {
                        //                        contextObj.objectsSymbolTextHandleData.push({ Key: intObjectId, Value: entityHandle });
                        //                        //console.log('Success: Created Symbol Text------------------------' + returnCode);
                        //                    }
                        //                });
                        //        }
                        //        var assetsDispSettingsData = contextObj.objectsDisplaySettingData.slice();
                        //        for (let dispSettingsItem of assetsDispSettingsData) {
                        //            if (dispSettingsItem.ShowinDrawing) {
                        //                var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
                        //                var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
                        //                let textContent = selectedObjectDetails[0][dispSettingsItem.FieldName];
                        //                if (textContent == "null" || textContent == null)
                        //                    textContent = "-";
                        //                if ((dispSettingsItem.ObjectClassId != 0) && (selectedObjectDetails[0].ObjectClassId != 0)) {
                        //                    if (dispSettingsItem.ObjectClassId != selectedObjectDetails[0].ObjectClassId) {
                        //                        textContent = "";
                        //                    }
                        //                }
                        //                if (textContent != "")
                        //                    formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
                        //                // formatedText += "\\fTimes New Roman|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
                        //            }
                        //        }
                        //        let formatedTextFinal: string = "{" + formatedText + "}";
                        //        contextObj.objiWhiz.getEntityExtents(symbolHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                        //            ////debugger;                        
                        //            if (retCode != 0) {
                        //                //console.log('Failure: getEntityExtents------------------------' + returnCode);
                        //                callback(0);
                        //            }
                        //            else {
                        //                //console.log('Success: getEntityExtents------------------------' + returnCode);
                        //                //creating text very near to the symbol : details text
                        //                ////debugger;
                        //                contextObj.strObjectsSymbolLayer = "$SL_" + ClassId + "_" + intObjectId; //AssetLayer created with objectclassid and objectid
                        //                contextObj.objiWhiz.createMultilineText(contextObj.strObjectsSymbolLayer, 1, MaxX, MaxY, 0, 3,
                        //                    0, 1, formatedTextFinal, "Standard", contextObj.g_intAssetsTextStyleId, function (retCode, entityHandle) {
                        //                        ////debugger;
                        //                        if (retCode != 0) {
                        //                            //console.log('Failure: createMultilineText------------------------' + returnCode);
                        //                            callback(0);
                        //                        }
                        //                        else {
                        //                            ////debugger;
                        //                            contextObj.dataInDrawingTextHandles.push({ Key: intObjectId, Value: entityHandle });
                        //                            //***********************for showing tooltip : push the selected data to objectsData object array*****************
                        //                            ////debugger;
                        //                            if (contextObj.objectsData != undefined) {
                        //                                {
                        //                                    /*------------get space id and space handle in the details----------------------------------------*/
                        //                                    if (selectedObjectDetails[0]["SpaceId"] == null) {
                        //                                        selectedObjectDetails[0]["SpaceId"] = spaceid
                        //                                        var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === spaceid });
                        //                                        if (index != -1) {
                        //                                            if (contextObj.blnIsSpace) {                                      /*blnIsSpace false - Carpet  else boma*/
                        //                                                selectedObjectDetails[0]['BomaHandle'] = contextObj.spaceOpenDrawingObj.spaceData[index]['BomaHandle'];
                        //                                            }
                        //                                            else {
                        //                                                selectedObjectDetails[0]['CarpetHandle'] = contextObj.spaceOpenDrawingObj.spaceData[index]['CarpetHandle'];
                        //                                            }
                        //                                        }
                        //                                    }
                        //                                    /*------update x,y coordinates in the details-----------------------------------------------*/
                        //                                    if (Xpos != null) {
                        //                                        selectedObjectDetails[0]['Xposition'] = Xpos;
                        //                                        selectedObjectDetails[0]['Yposition'] = Ypos;
                        //                                    }
                        //                                    /*********************************/
                        //                                    //----
                        //                                }
                        //                            }
                        //                            //------update details in the table                                               
                        //                            // contextObj.objectsDrawingService.updateAssetsSymbolData(9, SpaceId, dXCoord, dYCoord, 0, contextObj.drawingId, 1, SiteId, intObjectId).subscribe(function (resultData) {
                        //                            ////debugger;
                        //                            // if (resultData["Data"]["Message"] == "Success") {
                        //                            contextObj.objectsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
                        //                                contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
                        //                                contextObj.notificationServices.ClearAllToasts();
                        //                                ////debugger;
                        //                                contextObj.objectsData.push(selectedObjectDetails[0]);
                        //                                //if (contextObj.totalObjects != null && contextObj.totalObjects != undefined)
                        //                                //    contextObj.totalObjects = parseInt(contextObj.totalObjects) + 1;
                        //                                contextObj.notificationServices.ShowToaster(strClassname + " (" + strAssetNo + ") placed", 3);
                        //                                callback(1);
                        //                            });
                        //                            //}
                        //                            // else {
                        //                            //  resCallback(0);
                        //                            //}
                        //                            //});
                        //                        }
                        //                    });
                        //            }
                        //        });
                        //    }
                        //});
                        //--------
                        //here
                    });
                }
            });
        };
        //While moving... check the permission for the selected space : For move only
        this.MoveObjectPermission = function (MaxX, MaxY, param, resCallback) {
            ////debugger;
            var contextObj = this;
            var dblSpaceId = 0;
            var UserRoleId = contextObj.commonDwgServices.sessionUserRoleId;
            contextObj.g_blnModuleAdmin = contextObj.commonDwgServices.isModuleAdmin;
            if (contextObj.drawingCategoryId == 1) {
                contextObj.g_blnAllowMultipleSelection = true;
                ////debugger;
                contextObj.MovePermissionForSelectedPoint(MaxX, MaxY, param, function (strSpaceOrNetHandle) {
                    ////debugger;
                    contextObj.g_blnAllowMultipleSelection = false;
                    if (strSpaceOrNetHandle == "-1" || strSpaceOrNetHandle == null || strSpaceOrNetHandle == undefined) {
                        contextObj.blnPermittedSpace = false;
                        resCallback(0);
                    }
                    else {
                        ////debugger;
                        if (strSpaceOrNetHandle != "0" && strSpaceOrNetHandle != null && strSpaceOrNetHandle != undefined) {
                            contextObj.GetSpaceIdFromHandle(strSpaceOrNetHandle, function (SpaceId) {
                                ////debugger;
                                if (SpaceId != null && SpaceId != undefined && SpaceId != 0)
                                    dblSpaceId = SpaceId;
                                else
                                    dblSpaceId = 0;
                                resCallback(dblSpaceId);
                            });
                        }
                        else {
                            //contextObj.blnPermittedSpace = true;
                            dblSpaceId = 0;
                            resCallback(0);
                        }
                        ////debugger;
                        contextObj.blnPermittedSpace = true;
                    }
                });
            }
            else {
                if (UserRoleId == 4 || UserRoleId == 7) {
                    contextObj.notificationServices.ClearAllToasts();
                    if (param == 1)
                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                    else
                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                    contextObj.blnPermittedSpace = false;
                    dblSpaceId = 0;
                }
                else if (UserRoleId == 6 || contextObj.g_blnModuleAdmin == false) {
                    contextObj.notificationServices.ClearAllToasts();
                    if (param == 1)
                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                    else
                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                    contextObj.blnPermittedSpace = false;
                    dblSpaceId = 0;
                }
                else {
                    contextObj.blnPermittedSpace = false;
                    dblSpaceId = 1;
                }
                resCallback(dblSpaceId);
            }
            ////debugger;
        };
        this.EditInDrawing = function (spaceId, editObjectSelectedId, editObjectClassId, drawingId, isSymbolHandle, rescallBack) {
            var contextObj = this;
            //debugger
            //  var blnEditPermission: boolean = true;
            if (spaceId != null && spaceId != undefined && spaceId != 0) {
                contextObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {
                    if (blnEditPermission == true) {
                        contextObj.getObjectEditFields(editObjectSelectedId, editObjectClassId, drawingId, isSymbolHandle, rescallBack);
                    }
                    else
                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected Asset", 5);
                });
            }
            else {
                contextObj.getObjectEditFields(editObjectSelectedId, editObjectClassId, drawingId, isSymbolHandle, rescallBack);
            }
        };
        this.getAddObjectsFields = function (resCallback) {
            var contextObj = this;
            var Tagno = "";
            var fieldDetailsAdd;
            var classListOption;
            this.objectsService.getObjectDataAddEditFieldsList(this.objectCategoryId, 0, "add").subscribe(function (resultData) {
                fieldDetailsAdd = resultData["Data"];
                var count = 0;
                fieldDetailsAdd.find(function (item) {
                    switch (item.ReportFieldId) {
                        case 4303:
                            if (contextObj.IsBarcodeSubscribed == true) {
                                item.IsVisible = true;
                            }
                            else if (contextObj.IsBarcodeSubscribed == false) {
                                item.IsVisible = false;
                            }
                            count++;
                            break;
                        case 651:
                            if (item.FieldId == 1985) {
                                if (contextObj.commonDwgServices.IsAutoNumbering == false) {
                                    item.IsVisible = true;
                                }
                                else {
                                    item.IsVisible = false;
                                }
                            }
                            else if (item.FieldId == 1605) {
                                Tagno = item.FieldLabel;
                                item.IsVisible = false; //for autonumber true /false asset no. field is invisible
                            }
                            var tagNoItem = fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 661; });
                            if (tagNoItem != undefined) {
                                //if (contextObj.IsAutoNumbering == false)
                                //    tagNoItem.IsMandatory = true;
                                //else
                                if (contextObj.IsAutoNumbering == true)
                                    tagNoItem.IsVisible = false;
                                tagNoItem.FieldLabel = Tagno;
                            }
                            count++;
                            break;
                        case 7411:
                            count++;
                            //item.FieldValue = contextObj.siteId.toString();
                            //item.IsEnabled = false;                        
                            item.IsMandatory = true;
                            break;
                    }
                    if (count == 4) {
                        return true;
                    }
                    else
                        return false;
                });
                if (contextObj.isFromCopyObject)
                    classListOption = 1;
                else
                    classListOption = 3;
                var index = fieldDetailsAdd.findIndex(function (el) { return el.ReportFieldId == 657; }); /*class*/
                contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, '', 1, classListOption, 0).subscribe(function (resultData) {
                    fieldDetailsAdd[index].LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]); //class         
                    resCallback(fieldDetailsAdd);
                });
            });
        };
        /*Permission for the selected point : Move functionality*/
        this.MovePermissionForSelectedPoint = function (MaxX, MaxY, param, rescallBack) {
            var contextObj = this;
            /*var blnIsSpace: boolean;*/
            var strLayerName;
            var blnEditPermission = false;
            var g_intUserRoleId = contextObj.commonDwgServices.sessionUserRoleId;
            if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
                contextObj.blnIsSpace = false;
                strLayerName = contextObj.commonDwgServices.netLayername;
            }
            else {
                contextObj.blnIsSpace = true;
                strLayerName = contextObj.commonDwgServices.spacelayerName;
            }
            var blnLayerIsVisible = [0];
            var returnCode = contextObj.objiWhiz.getLayerVisibility(strLayerName, blnLayerIsVisible);
            if (returnCode == 0) {
                contextObj.objiWhiz.setLayerVisibility(strLayerName, true, function (retcode) {
                    if (retcode == 0) {
                        contextObj.objiWhiz.getHandleWithDWGPoint(MaxX, MaxY, contextObj.blnIsSpace, function (IsSpace, strSpaceOrNetHandle) {
                            if ((strSpaceOrNetHandle != null) && (strSpaceOrNetHandle != "")) {
                                contextObj.strCheckPermissionForSelectedPoint = strSpaceOrNetHandle;
                                contextObj.objiWhiz.setLayerVisibility(strLayerName, blnLayerIsVisible[0], function (returnCode) {
                                    if (returnCode == 0) {
                                        if (g_intUserRoleId > 3) {
                                            // //debugger
                                            var spaceId = contextObj.getSpaceIdFromSpaceHandle(strSpaceOrNetHandle);
                                            contextObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {
                                                contextObj.notificationServices.ClearAllToasts();
                                                if (blnEditPermission == false) {
                                                    //if (contextObj.g_blnAllowMultipleSelection == true) {
                                                    contextObj.notificationServices.ClearAllToasts();
                                                    if (param == 1)
                                                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                                                    else
                                                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                                    contextObj.strCheckPermissionForSelectedPoint = "0";
                                                    rescallBack(contextObj.strCheckPermissionForSelectedPoint);
                                                }
                                                else {
                                                    rescallBack(contextObj.strCheckPermissionForSelectedPoint); //by aswathy on 21/03/17
                                                }
                                            });
                                        }
                                        else {
                                            rescallBack(contextObj.strCheckPermissionForSelectedPoint);
                                        }
                                    }
                                    else {
                                        rescallBack("0");
                                    }
                                });
                            }
                            else {
                                contextObj.notificationServices.ClearAllToasts();
                                if (param == 1)
                                    contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                                else
                                    contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                rescallBack("0");
                            }
                        });
                    }
                    else {
                        rescallBack("0");
                    }
                });
            }
            else {
                rescallBack("0");
            }
        };
        //while placing a symbol, checking the permission
        this.PlaceObjectPermission = function (MaxX, MaxY, Target, resCallback) {
            // debugger;
            var contextObj = this;
            var dblSpaceId = 0;
            var UserRoleId = contextObj.commonDwgServices.sessionUserRoleId;
            contextObj.g_blnModuleAdmin = contextObj.commonDwgServices.isModuleAdmin;
            if (contextObj.drawingCategoryId == 1) {
                contextObj.g_blnAllowMultipleSelection = true;
                ////debugger;
                contextObj.CheckPermissionForSelectedPoint(MaxX, MaxY, Target, function (strSpaceOrNetHandle) {
                    ////debugger;
                    contextObj.g_blnAllowMultipleSelection = false;
                    if (strSpaceOrNetHandle == "-1" || strSpaceOrNetHandle == null || strSpaceOrNetHandle == undefined) {
                        contextObj.blnPermittedSpace = false;
                        resCallback(0);
                    }
                    else {
                        ////debugger;
                        if (strSpaceOrNetHandle != "0" && strSpaceOrNetHandle != null && strSpaceOrNetHandle != undefined) {
                            contextObj.GetSpaceIdFromHandle(strSpaceOrNetHandle, function (SpaceId) {
                                ////debugger;
                                if (SpaceId != null && SpaceId != undefined && SpaceId != 0)
                                    dblSpaceId = SpaceId;
                                else
                                    dblSpaceId = 0;
                                resCallback(dblSpaceId);
                            });
                        }
                        else {
                            //contextObj.blnPermittedSpace = true;
                            dblSpaceId = 0;
                            resCallback(0);
                        }
                        ////debugger;
                        contextObj.blnPermittedSpace = true;
                    }
                });
            }
            else {
                if (UserRoleId == 4 || UserRoleId == 7) {
                    contextObj.notificationServices.ClearAllToasts();
                    if (Target == 3)
                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                    else
                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                    contextObj.blnPermittedSpace = false;
                    dblSpaceId = 0;
                }
                else if (UserRoleId == 6 || contextObj.g_blnModuleAdmin == false) {
                    contextObj.notificationServices.ClearAllToasts();
                    contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                    contextObj.blnPermittedSpace = false;
                    dblSpaceId = 0;
                }
                else {
                    contextObj.blnPermittedSpace = false;
                    dblSpaceId = 1;
                }
                resCallback(dblSpaceId);
            }
            ////debugger;
        };
        //Show data in drawing while loading
        this.showDataInDrawing = function (dataChange, isXrefExists, resCallback) {
            // debugger;
            var contextObj = this;
            switch (dataChange) {
                case 'spaceDispChange':
                    contextObj.spaceOpenDrawingObj.displaySettingData = null;
                    contextObj.spaceOpenDrawingObj.getDisplaySettingsData(function (retCode) { });
                    contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$SpaceData", function (retCode) {
                        contextObj.spaceOpenDrawingObj.showDataInDrawing(function (retCode) {
                            if (retCode == 0) {
                                resCallback(0);
                            }
                        });
                    });
                    break;
                case 'objectsDispChange':
                    contextObj.objectsDisplaySettingData = null;
                    contextObj.getObjectsDisplaySettingsData();
                    contextObj.deleteLayerAlredyExists(contextObj.strObjectsSymbolLayer, function (retCode) {
                        contextObj.displayobjectsDataOnDrawing(function (returnCode) {
                            if (returnCode == 0)
                                resCallback(0);
                            else
                                resCallback(1);
                        });
                    });
                    break;
                case 'bothData':
                    contextObj.updateOrphanRecords(function (retCode) {
                        //     contextObj.getAllAssetsDetails(function (retCode) { });
                        if (contextObj.drawingCategoryId == 1 || isXrefExists) {
                            contextObj.spaceOpenDrawingObj.showDataInDrawing(function (retCode) {
                                if (retCode == 0) {
                                    contextObj.displayobjectsDataOnDrawing(function (returnCode) {
                                        if (isXrefExists) {
                                            contextObj.getXRefHandles(function (ret) {
                                                if (returnCode == 0)
                                                    resCallback(0);
                                                else
                                                    resCallback(1);
                                            });
                                        }
                                        else {
                                            if (returnCode == 0)
                                                resCallback(0);
                                            else
                                                resCallback(1);
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            contextObj.displayobjectsDataOnDrawing(function (returnCode) {
                                // //debugger;                               
                                if (returnCode == 0)
                                    resCallback(0);
                                else
                                    resCallback(1);
                            });
                        }
                    });
                    break;
            }
        };
        this.getXRefHandles = function (recCallback) {
            var contextObj = this;
            this.objiWhiz.getXRefHandles(function (retCode, blockhandles) {
                contextObj.xRefHandles = blockhandles.split(contextObj.commonDwgServices.rowDelimiter);
                contextObj.xRefHandles.pop();
                recCallback(0);
            });
        };
        // for checking layer and delete layer if alredy exists (using diff selection of distribution map)
        this.deleteLayerAlredyExists = function (LayerName, rescallBack) {
            var isExist = [0];
            this.objiWhiz.layerExists(LayerName, isExist);
            // this.objiWhiz.removeMaps(); // to remove solid hatches
            if (isExist[0]) {
                this.objiWhiz.deleteLayer(LayerName, function (retCode) {
                    if (retCode != 0) {
                    }
                    rescallBack(retCode);
                });
            }
            else
                rescallBack(0);
        };
        // showSelectedObjectZoomDrawing = function (ObjectId, strSpaceHandle, resCallback) {
        this.showSelectedObjectZoomDrawing = function (ObjectId, SpaceId, resCallback) {
            ////debugger;
            var contextObj = this;
            var spaceId = 0;
            //  contextObj.GetSpaceHandleFromSpaceId(SpaceId, function (strSpaceOrNetHandle) {
            var index = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === ObjectId[0]; });
            if (index != -1) {
                spaceId = contextObj.objectsData[index].SpaceId;
                var dataitemIndex = contextObj.objectsHandlesData.findIndex(function (el) { return el.AssetsId === ObjectId[0]; });
                if (dataitemIndex != -1) {
                    var objectHandle = contextObj.gethandleFromObjectId(ObjectId[0]);
                }
                contextObj.deHatchObjects(function (retCode) {
                    if (retCode == 0 && objectHandle != undefined) {
                        contextObj.hatchSingleObject(objectHandle, function (retCode) {
                            if (retCode != 0) {
                            }
                            else {
                                if (spaceId != undefined && spaceId != null) {
                                    var spacehandle = contextObj.spaceOpenDrawingObj.getHandleFromSpaceId(spaceId);
                                    contextObj.spaceOpenDrawingObj.hatchSingleEntity(spacehandle, function (retCode) {
                                        contextObj.objiWhiz.zoomEntity(objectHandle, function (rtCode) {
                                            if (rtCode != 0) {
                                            }
                                            resCallback(rtCode);
                                        });
                                    });
                                }
                                else {
                                    contextObj.objiWhiz.zoomEntity(objectHandle, function (rtCode) {
                                        if (rtCode != 0) {
                                        }
                                        resCallback(rtCode);
                                    });
                                }
                            }
                        });
                    }
                });
            }
            else {
                resCallback(0);
            }
        };
        // });
        //}
        this.deHatchObjects = function (resCallback) {
            //debugger
            var contextObj = this;
            contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$HatchSingleEntity", function (retCode) {
                contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists(contextObj.hatchObjectLayer, function (retCode) {
                    //contextObj.objiWhiz.removeMaps();
                    resCallback(retCode);
                });
            });
        };
        //*Delink from grid
        this.DelinkSelectedassetonDrawing = function (ObjectId, selectedObjectDetails, layerName, resCallback) {
            var contextObj = this;
            var SymbolLayerName;
            if (layerName == "") {
                var strClassname = selectedObjectDetails["Asset Class Name"];
                var strAssetNo = selectedObjectDetails["Asset No."];
                var SymbolId = selectedObjectDetails["SymbolId"];
                var ClassId = selectedObjectDetails["ObjectClassId"];
                var intColorId = selectedObjectDetails["SymbolColor"];
                SymbolLayerName = "$SL_" + ClassId + "_" + ObjectId;
            }
            else {
                SymbolLayerName = layerName;
            }
            var indexnew = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === ObjectId; });
            if (indexnew != -1) {
                contextObj.objectsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
                    contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
                    var blockRefHandle = contextObj.objectsData[indexnew]['BlockRefHandle'];
                    if (blockRefHandle != undefined && blockRefHandle != null) {
                        var blockTextHandle = contextObj.dataInDrawingTextHandles[contextObj.dataInDrawingTextHandles.findIndex(function (el) { return el.Key === ObjectId; })].Value;
                        contextObj.objiWhiz.deleteEntity(blockTextHandle, function (ret) {
                            contextObj.deleteDelinkAfterBlockOrSymbolSelection(ObjectId, indexnew, function (res) {
                                resCallback();
                            });
                        });
                    }
                    else {
                        contextObj.deleteDelinkAfterBlockOrSymbolSelection(ObjectId, indexnew, function (res) {
                            contextObj.objiWhiz.deleteLayer(SymbolLayerName, function (retCode) {
                                resCallback();
                            });
                        });
                    }
                });
            }
        };
        this.showSelectedObjectInDrawing = function (ObjectIds, resCallback) {
            // debugger;
            var contextObj = this;
            var selectedHandles = [];
            var symbolHandles = [];
            var currentSymbolHandle;
            for (var _i = 0, ObjectIds_1 = ObjectIds; _i < ObjectIds_1.length; _i++) {
                var objId = ObjectIds_1[_i];
                if (contextObj.drawingCategoryId == 1 || contextObj.hasXrefExists) {
                    var handle = contextObj.getSpaceHandleFromObjectId(objId);
                    if (handle != undefined && handle != null && handle != "") {
                        if (selectedHandles.length > 0) {
                            var index = selectedHandles.findIndex(function (el) { return el === handle; });
                            if (index == -1)
                                selectedHandles.push(handle);
                        }
                        else
                            selectedHandles.push(handle);
                    }
                }
                currentSymbolHandle = contextObj.gethandleFromObjectId(objId);
                if (currentSymbolHandle != undefined)
                    symbolHandles.push(currentSymbolHandle);
            }
            if (selectedHandles.length > 0) {
                contextObj.spaceOpenDrawingObj.hatchMultipleEntity(selectedHandles, function (retCode) {
                    // contextObj.hatchMultipleAssets(symbolHandles, function (returncode) {
                    //  if (retCode != 0)
                    //      console.log("hatchMultipleEntity failed due to ", retCode);
                    //  else {
                    contextObj.objiWhiz.zoomExtents(function (ret) {
                        if (symbolHandles.length > 0) {
                            contextObj.objiWhiz.blinkEntitiesByHandles(symbolHandles, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (returnCode) {
                                resCallback(retCode, selectedHandles);
                            });
                        }
                    });
                    //  }
                    //});
                });
            }
            else if (symbolHandles.length > 0) {
                contextObj.objiWhiz.zoomExtents(function (ret) {
                    contextObj.objiWhiz.blinkEntitiesByHandles(symbolHandles, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (returnCode) {
                        resCallback(returnCode, selectedHandles);
                    });
                });
            }
        };
        this.hatchMultipleAssets = function (selectedHandles, resCallback) {
            var contextObj = this;
            if (selectedHandles.length > contextObj.arrayCount) {
                var symbolHandle = selectedHandles[contextObj.arrayCount];
                contextObj.objiWhiz.hatchEntity("$HatchMultipleAssets", symbolHandle, 7, 1, 1, 1, false, function (retCode, entityHandle) {
                    contextObj.objiWhiz.setApplicationLayer("$HatchMultipleAssets");
                    if (retCode != 0)
                        console.log("hatchEntity failed due to ", retCode);
                    contextObj.arrayCount++;
                    contextObj.hatchMultipleAssets(selectedHandles, resCallback);
                });
            }
            else {
                contextObj.arrayCount = 0;
                resCallback(0);
            }
        };
        this.hatchObject = function (symbolHandle, resCallback) {
            var contextObj = this;
            var mapHandle = [symbolHandle];
            var rgbColor = [[255, 255, 255]];
            contextObj.deHatchObjects(function (retCode) {
                contextObj.objiWhiz.createMap(mapHandle, rgbColor, function (retCode) {
                    resCallback(retCode);
                });
            });
        };
        this.hatchMultipleAsset = function (symbolHandle, resCallback) {
            var contextObj = this;
            var mapHandle = [symbolHandle];
            var rgbColor = [[255, 255, 255]];
            contextObj.objiWhiz.createMap(mapHandle, rgbColor, function (retCode) {
                resCallback(retCode);
            });
        };
        //display asset data on drawing
        this.displayobjectsDataOnDrawing = function (resCallback) {
            ////debugger;
            var contextObj = this;
            var ratio = [0];
            contextObj.objiWhiz.clientDWGAreaRatio(ratio);
            contextObj.objectsHandlesData = [];
            contextObj.dataInDrawingTextHandles = [];
            contextObj.objectsSymbolTextHandleData = [];
            var objectsData;
            if (!contextObj.objectsData || !contextObj.objectsDisplaySettingData || !contextObj.resultDataArray) {
                setTimeout(function () {
                    contextObj.displayobjectsDataOnDrawing(resCallback);
                }, 50);
            }
            else {
                ////debugger;
                var ratio = [0];
                contextObj.objiWhiz.clientDWGAreaRatio(ratio);
                var objectsData;
                if (contextObj.totalObjects > 0) {
                    contextObj.objectsDrawingService.getObjectsDisplaySettingsData(contextObj.categoryId, contextObj.addtlDataFieldCategoryId, contextObj.objectCategoryId).subscribe(function (resultData) {
                        contextObj.objectsDisplaySettingData = resultData["Data"];
                        var assetsDispSettingsData = contextObj.objectsDisplaySettingData.slice();
                        // if (objectsData != 1)
                        //new code
                        contextObj.objectsDrawingService.getAllAssetsDetails(contextObj.objectCategoryId, contextObj.drawingId, 2, 0, contextObj.isBuildingDrawing).subscribe(function (resultData) {
                            contextObj.objectsData = JSON.parse(resultData.FieldBinderData);
                            objectsData = contextObj.objectsData.slice();
                            var isXpositionNull = contextObj.checkIsXpositionNull(objectsData, function (retCode, xPosNullAssetData) {
                                if (retCode == 0) {
                                    var getXposData = contextObj.displayNotProperlyLocatedAssets(xPosNullAssetData);
                                    for (var _i = 0, getXposData_1 = getXposData; _i < getXposData_1.length; _i++) {
                                        var assetItem = getXposData_1[_i];
                                        var index = objectsData.findIndex(function (el) { return el.ObjectId === assetItem['ObjectId']; });
                                        if (index != -1)
                                            objectsData[index] = assetItem;
                                    }
                                    contextObj.createobjectsDataAndTooltipOnDrawing(objectsData, assetsDispSettingsData, ratio, contextObj.resultDataArray, function (retCode) {
                                        contextObj.deHatchObjects(function (retCode) {
                                            if (retCode == 0) {
                                                contextObj.objiWhiz.zoomExtents(function (ret) {
                                                    if (ret == 0)
                                                        resCallback(0);
                                                    else
                                                        resCallback(ret);
                                                });
                                            }
                                            else
                                                resCallback(retCode);
                                        });
                                    });
                                }
                                else {
                                    contextObj.createobjectsDataAndTooltipOnDrawing(objectsData, assetsDispSettingsData, ratio, contextObj.resultDataArray, function (retCode) {
                                        contextObj.deHatchObjects(function (retCode) {
                                            if (retCode == 0) {
                                                contextObj.objiWhiz.zoomExtents(function (ret) {
                                                    if (ret == 0)
                                                        resCallback(0);
                                                    else
                                                        resCallback(ret);
                                                });
                                            }
                                            else
                                                resCallback(retCode);
                                        });
                                    });
                                }
                            });
                        }); //----------------
                    });
                }
                else
                    resCallback(1);
            }
            /* {
                 if (contextObj.totalObjects > 0) {
                     var assetsDispSettingsData = contextObj.objectsDisplaySettingData.slice();
                     contextObj.createobjectsDataAndTooltipOnDrawing(contextObj.objectsData, assetsDispSettingsData, ratio, contextObj.resultDataArray, function (retCode) {
                         resCallback(retCode);
                     });
                 }
                 else
                     resCallback(1);
             }*/
        };
        //show tooltip data
        this.getTooltipData = function (Handle, resCallback) {
            //If the drawing contains blockrefhandle or symbol, show the asset tooltip    
            var contextObj = this;
            var isSymbolHandle = contextObj.objectsHandlesData.some(function (el) { return el.SymbolHandle === Handle; });
            var isBlockHandle = contextObj.objectsHandlesData.some(function (el) { return el.BlockHandle === Handle; });
            if (isSymbolHandle) {
                contextObj.getObjectsTooltipData(Handle, true, function (tooltipDataValues) {
                    resCallback(true, tooltipDataValues);
                });
            }
            else if (isBlockHandle) {
                contextObj.getObjectsTooltipData(Handle, false, function (tooltipDataValues) {
                    resCallback(true, tooltipDataValues);
                });
            }
            else {
                //if (contextObj.drawingCategoryId == 1) {
                contextObj.spaceOpenDrawingObj.getTooltipData(Handle, "", function (retCode, tooltipDataValues) {
                    if (contextObj.objectsDataCountClasswise && contextObj.objectsDataCountClasswise.length > 0) {
                        var spaceId = contextObj.getSpaceIdFromSpaceHandle(Handle);
                        var index = contextObj.objectsDataCountClasswise.findIndex(function (el) { return el.SpaceId === spaceId; });
                        if (index != -1) {
                            for (var i = 0; i < contextObj.objectsDataCountClasswise.length; i++) {
                                if (contextObj.objectsDataCountClasswise[i]["SpaceId"] == spaceId) {
                                    tooltipDataValues.push({ Key: (contextObj.objectsDataCountClasswise[i]["Label"].replace(':', '')).trim(), Value: contextObj.objectsDataCountClasswise[i]["Value"] });
                                }
                            }
                        }
                    }
                    resCallback(retCode, tooltipDataValues);
                });
            }
        };
        //get assets tooltip data
        this.getObjectsTooltipData = function (handle, isSymbolHandle, resCallback) {
            ////debugger;
            ////debugger;
            var contextObj = this;
            contextObj.objectsTooltipData = [];
            var index;
            if (isSymbolHandle)
                index = contextObj.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === handle; });
            else
                index = contextObj.objectsHandlesData.findIndex(function (el) { return el.BlockHandle === handle; });
            if (index != -1) {
                var dataitemIndex;
                var objectId = contextObj.objectsHandlesData[index].AssetsId;
                dataitemIndex = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === objectId; });
                if (dataitemIndex != -1) {
                    var dataItem = contextObj.objectsData[dataitemIndex];
                    //console.log("dataItem", dataItem);
                    for (var _i = 0, _a = contextObj.objectsDisplaySettingData; _i < _a.length; _i++) {
                        var dispalySettingsData = _a[_i];
                        if (dispalySettingsData.ShowinTooltip) {
                            if ((dispalySettingsData.ObjectClassId != 0) && (dataItem.ObjectClassId != 0)) {
                                if (dispalySettingsData.ObjectClassId == dataItem.ObjectClassId) {
                                    contextObj.objectsTooltipData.push({ Key: dispalySettingsData.FieldName, Value: dataItem[dispalySettingsData.FieldName] });
                                }
                            }
                            else {
                                contextObj.objectsTooltipData.push({ Key: dispalySettingsData.FieldName, Value: dataItem[dispalySettingsData.FieldName] });
                            }
                        }
                    }
                }
                resCallback(contextObj.objectsTooltipData);
            }
            else
                resCallback();
        };
        //Get all asset details 
        this.getAllAssetsDetails = function (resCallback) {
            var contextObj = this;
            ; //sajan changed.......param 0 added
            contextObj.objectsDrawingService.getAllAssetsDetails(contextObj.objectCategoryId, this.drawingId, 2, null, contextObj.isBuildingDrawing).subscribe(function (resultData) {
                contextObj.totalObjects = JSON.parse(resultData["DataCount"]);
                if (contextObj.totalObjects != 0) {
                    //   //debugger;
                    contextObj.objectsData = [];
                    contextObj.objectsDataCountClasswise = [];
                    contextObj.objectsData = JSON.parse(resultData.FieldBinderData);
                    ////debugger;
                    contextObj.objectsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
                        contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
                        resCallback(contextObj.objectsData);
                    });
                }
                else {
                    contextObj.objectsData = [];
                    resCallback(1);
                }
            });
        };
        this.getAllAssetDetailswithOrphan = function (resCallback) {
            var contextObj = this;
            contextObj.objectsDrawingService.getAllAssetsDetails(contextObj.objectCategoryId, this.drawingId, 1, undefined, contextObj.isBuildingDrawing, true).subscribe(function (resultData) {
                console.log('getAllAssetsDetailswith orphan', resultData);
                contextObj.totalObjectsOrphan = JSON.parse(resultData["DataCount"]);
                if (contextObj.totalObjectsOrphan != 0) {
                    contextObj.objectsDataorphan = [];
                    contextObj.objectsDataorphan = JSON.parse(resultData.FieldBinderData);
                    resCallback(contextObj.objectsDataorphan);
                }
                else {
                    contextObj.objectsDataorphan = [];
                    resCallback(1);
                }
            });
        };
        this.updateOrphanRecords = function (rescallback) {
            debugger;
            var contextObj = this;
            var hasPrivilage = false;
            if (contextObj.commonDwgServices.isModuleAdmin && contextObj.commonDwgServices.sessionUserRoleId != 4) {
                hasPrivilage = true;
            }
            if (contextObj.drawingCategoryId != 1) {
                //  contextObj.updateStatusOfBlockLinkedObjects(function (orphanObjectIds) {
                if (hasPrivilage) {
                    contextObj.getAllAssetDetailswithOrphan(function (retCode) {
                        rescallback(0);
                    });
                }
                else
                    rescallback(0);
            }
            else {
                if (hasPrivilage) {
                    contextObj.getAllAssetDetailswithOrphan(function (retCode) {
                        rescallback(0);
                    });
                }
                else
                    rescallback(0);
            }
        };
        this.getOrphanRecords = function (rescallback) {
            var contextObj = this;
            var hasPrivilage = false;
            if (contextObj.commonDwgServices.isModuleAdmin && contextObj.commonDwgServices.sessionUserRoleId != 4) {
                hasPrivilage = true;
            }
            if (hasPrivilage == false)
                rescallback(hasPrivilage, contextObj.objectsDataorphan, contextObj.totalObjectsOrphan);
            else {
                if (contextObj.objectsDataorphan) {
                    //if (contextObj.totalObjectsOrphan > 0)
                    rescallback(hasPrivilage, contextObj.objectsDataorphan, contextObj.totalObjectsOrphan);
                }
                else {
                    setTimeout(function () {
                        contextObj.getOrphanRecords(rescallback);
                    }, 50);
                }
            }
        };
        /* getting display settings data */
        this.getObjectsDisplaySettingsData = function () {
            var contextObj = this;
            contextObj.objectsDrawingService.getObjectsDisplaySettingsData(contextObj.categoryId, contextObj.addtlDataFieldCategoryId, contextObj.objectCategoryId).subscribe(function (resultData) {
                contextObj.objectsDisplaySettingData = resultData["Data"];
            });
        };
        //Get all asset symbol details 
        this.getAssetsSymbolDetails = function (resCallback) {
            var contextObj = this;
            contextObj.objectsDrawingService.getAssetsSymbolData(this.objectCategoryId).subscribe(function (resultData) {
                if (resultData != "") {
                    contextObj.resultDataArray = JSON.parse(resultData["Data"].FieldBinderData);
                    resCallback(resultData);
                }
                else
                    resCallback(1);
            });
        };
        /*checking whether the x and y positions are null or not */
        this.checkIsXpositionNull = function (assetData, resCallback) {
            // //debugger;
            var xPosNullAssetData = [];
            for (var _i = 0, assetData_1 = assetData; _i < assetData_1.length; _i++) {
                var assetDataitem = assetData_1[_i];
                if (assetDataitem['Xposition'] == null && assetDataitem['BlockRefHandle'] == null)
                    xPosNullAssetData.push(assetDataitem);
            }
            if (xPosNullAssetData.length > 0) {
                resCallback(0, xPosNullAssetData);
            }
            else
                resCallback(1);
        };
        /* Showing assets,symbol text and text : Then create tooltip also */
        this.createobjectsDataAndTooltipOnDrawing = function (objectsData, assetsDispSettingsData, ratio, resultDataArray, resCallback) {
            ////debugger;
            var contextObj = this;
            var intSymbolColor;
            var SpHandle;
            var itemsForCreateTextSymbol = [];
            var itemsForCreateTextBlock = [];
            var symbolProperties = [];
            var symbolTextProperties = [];
            var objectSymbolIds = [];
            var objectBlockIds = [];
            var blockRefHandles = [];
            for (var i = 0; i < objectsData.length; i++) {
                var objectsDataItem = objectsData[i];
                var dblSymbolInsertionX, dblSymbolInsertionY;
                dblSymbolInsertionX = objectsDataItem.Xposition;
                dblSymbolInsertionY = objectsDataItem.Yposition;
                intSymbolColor = objectsDataItem.SymbolColor; //symbol color
                //scale factor
                if (objectsDataItem.ScaleFactor != null && objectsDataItem.ScaleFactor != "")
                    contextObj.g_dblScaleFactor = objectsDataItem.ScaleFactor;
                else
                    contextObj.g_dblScaleFactor = 1;
                contextObj.g_dblAssetsTextAngle = objectsDataItem.Angle; //angle  
                if (dblSymbolInsertionX && dblSymbolInsertionY) {
                    //checking whether the symbolid for the current item is present in asset symbol details 
                    var index = contextObj.resultDataArray.findIndex(function (el) { return el.Id === objectsDataItem.SymbolId; });
                    if (index != -1) {
                        var item = contextObj.resultDataArray[index];
                        contextObj.strAssetsSymbolText = item.SymbolText; //symboltext 
                        contextObj.strAssetsTextHeight = item.TextHeight; //symboltext height
                        contextObj.strAssetsSymbolCords = item.CoordinateString.replace(/,/g, contextObj.colDelimiter); //coordinates 
                        contextObj.strAssetsSymbolCords = contextObj.strAssetsSymbolCords.replace(/;/g, contextObj.rowDelimiter);
                        contextObj.strObjectsSymbolLayer = "$SL_" + objectsDataItem.ObjectClassId + "_" + objectsDataItem.ObjectId; //AssetLayer created with objectclassid and objectid
                        //contextObj.deleteLayerAlredyExists(contextObj.strObjectsSymbolLayer, function (retCode) {
                        //If reference point is there, start symbol drawing functionality
                        objectSymbolIds.push(objectsDataItem.ObjectId);
                        var formatedText = "";
                        for (var _i = 0, assetsDispSettingsData_1 = assetsDispSettingsData; _i < assetsDispSettingsData_1.length; _i++) {
                            var dispSettingsItem = assetsDispSettingsData_1[_i];
                            if (dispSettingsItem.ShowinDrawing) {
                                var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
                                var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
                                var textContent = objectsDataItem[dispSettingsItem.FieldName];
                                if (textContent == "null" || textContent == null)
                                    textContent = "-";
                                if ((dispSettingsItem.ObjectClassId != 0) && (objectsDataItem.ObjectClassId != 0)) {
                                    if (dispSettingsItem.ObjectClassId != objectsDataItem.ObjectClassId) {
                                        textContent = "";
                                    }
                                }
                                if (textContent != "")
                                    formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
                            }
                        }
                        var formatedTextFinal = "{" + formatedText + "}";
                        itemsForCreateTextSymbol.push([formatedTextFinal, dblSymbolInsertionX, dblSymbolInsertionY]);
                        symbolProperties.push([contextObj.strObjectsSymbolLayer, intSymbolColor, contextObj.strAssetsSymbolCords, contextObj.g_dblAssetsSymbolLineWidth, contextObj.g_strAssetsSymbolLineType, contextObj.g_dblScaleFactor, contextObj.g_dblAssetsTextAngle]);
                        //Write symbol text near to symbol in asset
                        if ((contextObj.strAssetsSymbolText != "") && (contextObj.strAssetsSymbolText != null)) {
                            symbolTextProperties.push([contextObj.strObjectsSymbolLayer, intSymbolColor, contextObj.strAssetsSymbolText, contextObj.g_dblAssetsTextAngle, contextObj.strAssetsTextHeight, 1, "Standard", 5]);
                        }
                        else
                            symbolTextProperties.push([]);
                    }
                }
                else {
                    var blockrefHandle = objectsDataItem.BlockRefHandle;
                    if ((blockrefHandle != "") && (blockrefHandle != null)) {
                        blockRefHandles.push(blockrefHandle);
                        objectBlockIds.push(objectsDataItem.ObjectId);
                        var formatedText = "";
                        for (var _a = 0, assetsDispSettingsData_2 = assetsDispSettingsData; _a < assetsDispSettingsData_2.length; _a++) {
                            var dispSettingsItem = assetsDispSettingsData_2[_a];
                            if (dispSettingsItem.ShowinDrawing) {
                                var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
                                var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
                                var textContent = objectsDataItem[dispSettingsItem.FieldName];
                                if (textContent == "null" || textContent == null)
                                    textContent = "-";
                                formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
                            }
                        }
                        var formatedTextFinal = "{" + formatedText + "}";
                        itemsForCreateTextBlock.push([formatedTextFinal, blockrefHandle, contextObj.strObjectsSymbolLayer]);
                    }
                }
            }
            contextObj.objiWhiz.createSymbolwithData(itemsForCreateTextSymbol, contextObj.strObjectsSymbolLayer, 1, 0, 3, 0, 1, "Standard", contextObj.g_intAssetsTextStyleId, symbolProperties, symbolTextProperties, function (retCode, symbolHandles, textHandles, symbolTextHandles) {
                if (retCode == 0) {
                    var symbolHandleArray = symbolHandles.split(contextObj.commonDwgServices.rowDelimiter);
                    symbolHandleArray.pop();
                    var textHandleArray = textHandles.split(contextObj.commonDwgServices.rowDelimiter);
                    textHandleArray.pop();
                    var symboltextHandleArray = symbolTextHandles.split(contextObj.commonDwgServices.rowDelimiter);
                    symboltextHandleArray.pop();
                    var i = 0;
                    for (var _i = 0, textHandleArray_1 = textHandleArray; _i < textHandleArray_1.length; _i++) {
                        var textHandle = textHandleArray_1[_i];
                        if (textHandle != "" && symbolHandleArray[i] != "") {
                            contextObj.objectsHandlesData.push({ AssetsId: objectSymbolIds[i], SymbolHandle: symbolHandleArray[i] });
                            contextObj.dataInDrawingTextHandles.push({ Key: objectSymbolIds[i], Value: textHandle });
                            if (symboltextHandleArray[i] != "")
                                contextObj.objectsSymbolTextHandleData.push({ Key: objectSymbolIds[i], Value: symboltextHandleArray[i] });
                            contextObj.objiWhiz.setApplicationLayer(symbolProperties[i][0]);
                        }
                        i++;
                    }
                }
                if (itemsForCreateTextBlock.length != 0) {
                    contextObj.objiWhiz.createBlockDataText(itemsForCreateTextBlock, 1, 0, 3, 0, 1, "Standard", 0, function (retCode, entityHandles, layerDetails) {
                        if (retCode == 0) {
                            var textHandleArray = entityHandles.split(contextObj.commonDwgServices.rowDelimiter);
                            textHandleArray.pop();
                            var i = 0;
                            for (var _i = 0, textHandleArray_2 = textHandleArray; _i < textHandleArray_2.length; _i++) {
                                var textHandle = textHandleArray_2[_i];
                                if (textHandle != "") {
                                    contextObj.objectsHandlesData.push({ AssetsId: objectBlockIds[i], BlockHandle: blockRefHandles[i] });
                                    contextObj.dataInDrawingTextHandles.push({ Key: objectBlockIds[i], Value: textHandle });
                                    contextObj.objiWhiz.setApplicationLayer(itemsForCreateTextBlock[i][2]);
                                }
                                i++;
                            }
                        }
                        resCallback(0);
                    });
                }
                else
                    resCallback(0);
            });
        };
        //New Move SingleAsset
        this.moveObjectInDrawingOnClick = function (selectedObjectId, resCallback) {
            var contextObj = this;
            if (selectedObjectId == 0) {
                if (contextObj.objectsData) {
                    if (contextObj.totalObjects == 0) {
                        contextObj.notificationServices.ShowToaster("No " + contextObj.objectmultiplename + " are assigned to this floor", 2);
                        resCallback(0);
                    }
                    else {
                        contextObj.objiWhiz.setCursor(12);
                        contextObj.objiWhiz.getDWGPoint(function (retcode, xPos, yPos) {
                            if (retcode == 0) {
                                contextObj.objiWhiz.getEntityWithDWGPoint(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntity, xPos, yPos, 12, function (retCodeEntity, selectedhandle) {
                                    if (retCodeEntity == 0) {
                                        var handles = [];
                                        handles = selectedhandle.split('§');
                                        handles.pop();
                                        contextObj.isBlockOrSymbolHandle(handles, function (handletype, selectedSymbolhandle) {
                                            if (handletype == 2)
                                                resCallback(2);
                                            else if (handletype == 1) {
                                                if (contextObj.drawingCategoryId == 1 || contextObj.hasXrefExists) {
                                                    var objectId = contextObj.getObjectIdFromSymbolHandle(selectedSymbolhandle);
                                                    contextObj.hasPermissionForSelectedObjectId(objectId, function (permissionCallBak) {
                                                        if (permissionCallBak) {
                                                            contextObj.hatchObject(selectedSymbolhandle, function (retCode) {
                                                                if (retCode != 0) {
                                                                    resCallback(1);
                                                                }
                                                                else {
                                                                    //var rubx = [], ruby = [], rubz = []
                                                                    //rubx[0] = xPos; ruby[0] = yPos; rubz[0] = 0;
                                                                    //contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                                                                    //contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
                                                                    contextObj.objiWhiz.startSvgTrails(selectedSymbolhandle, xPos, yPos, function (retCode) { });
                                                                    contextObj.InvokeDestination(selectedSymbolhandle, xPos, yPos, function (callback) {
                                                                        if (callback == 0)
                                                                            resCallback(0);
                                                                        else
                                                                            resCallback(callback);
                                                                    });
                                                                }
                                                            });
                                                        }
                                                        else {
                                                            contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                                            contextObj.objiWhiz.setCursor(1);
                                                            contextObj.objiWhiz.regenerate();
                                                            contextObj.moveObjectInDrawingOnClick(resCallback);
                                                        }
                                                    });
                                                }
                                                else {
                                                    contextObj.hatchObject(selectedSymbolhandle, function (retCode) {
                                                        if (retCode != 0) {
                                                            resCallback(1);
                                                        }
                                                        else {
                                                            //var rubx = [], ruby = [], rubz = []
                                                            //rubx[0] = xPos; ruby[0] = yPos; rubz[0] = 0;
                                                            //contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                                                            //contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
                                                            contextObj.objiWhiz.startSvgTrails(selectedSymbolhandle, xPos, yPos, function (retCode) { });
                                                            contextObj.InvokeDestination(selectedSymbolhandle, xPos, yPos, function (callback) {
                                                                if (callback == 0)
                                                                    resCallback(0);
                                                                else
                                                                    resCallback(callback);
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                            else
                                                resCallback(1);
                                        });
                                    }
                                    else {
                                        /* Not getting symbolhandle  : getSymbolWithDWGPoint or getEntityWithDWGPoint*/
                                        resCallback(1);
                                    }
                                });
                            }
                            else {
                                resCallback(1);
                            }
                        });
                    }
                }
                else
                    resCallback(0);
            }
            else {
                var selectedSymbolhandle = this.getSymbolHandleFromObjectId(selectedObjectId);
                var objectData = this.getObjectDataFromObjectId(selectedObjectId);
                contextObj.objiWhiz.startSvgTrails(selectedSymbolhandle, 0, 0, function (retCode) { });
                contextObj.InvokeDestination(selectedSymbolhandle, objectData['Xposition'], objectData['Yposition'], function (callback) {
                    if (callback == 0)
                        resCallback(0);
                    else
                        resCallback(callback);
                });
            }
        };
        this.InvokeDestination = function (selectedSymbolhandle, xPos, yPos, resCallback) {
            var contextObj = this;
            contextObj.objiWhiz.getDWGPoint(function (retcode, NewxPos, NewyPos) {
                if (retcode == 0) {
                    if (contextObj.drawingCategoryId == 1 || contextObj.hasXrefExists) {
                        var objectId = contextObj.getObjectIdFromSymbolHandle(selectedSymbolhandle);
                        //contextObj.hasPermissionForSelectedObjectId(objectId, function (permissionCallBak) {
                        contextObj.CheckPermissionForSelectedPoint(NewxPos, NewyPos, 4, function (strSpaceOrNetHandle) {
                            if (strSpaceOrNetHandle != 0) {
                                contextObj.moveObject(true, selectedSymbolhandle, xPos, yPos, NewxPos, NewyPos, resCallback);
                            }
                            else {
                                contextObj.notificationServices.ClearAllToasts();
                                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                contextObj.objiWhiz.setCursor(1);
                                contextObj.InvokeDestination(selectedSymbolhandle, xPos, yPos, resCallback);
                            }
                        });
                    }
                    else {
                        contextObj.moveObject(false, selectedSymbolhandle, xPos, yPos, NewxPos, NewyPos, resCallback);
                    }
                }
                else if (retcode == 8) {
                    contextObj.deHatchObjects(function (retCode) {
                        //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                        //contextObj.objiWhiz.regenerate();
                        contextObj.objiWhiz.stopSvgTrails();
                        resCallback(1);
                    });
                }
                else {
                    resCallback(1);
                }
            });
        };
        this.getSpaceHandlefromXYcord = function (xpos, ypos, rescallback) {
            var contextObj = this;
            this.objiWhiz.getHandleWithDWGPoint(xpos, ypos, contextObj.isSpace, function (retcode, spacehandle) {
                if (retcode == 0 || retcode == 37) {
                    rescallback(spacehandle);
                }
            });
        };
        this.moveObject = function (isSpaceId, selectedSymbolhandle, xPos, yPos, NewxPos, NewyPos, resCallBak) {
            var contextObj = this;
            var objectId = contextObj.getObjectIdFromSymbolHandle(selectedSymbolhandle);
            if (isSpaceId) {
                contextObj.getSpaceHandlefromXYcord(NewxPos, NewyPos, function (spacehandle) {
                    contextObj.GetSpaceIdFromHandle(spacehandle, function (SpaceId) {
                        console.log('SpaceId of to position', SpaceId);
                        contextObj.moveAssetToSelectedSpace(objectId, xPos, yPos, NewxPos, NewyPos, selectedSymbolhandle, SpaceId, function (retCode) {
                            if (retCode == 0) {
                                contextObj.moveObjectDBCall(SpaceId, NewxPos, NewyPos, objectId, spacehandle, resCallBak);
                            }
                            else {
                                /* Problem with :moveAssetToSelectedSpace */
                                resCallBak(1);
                            }
                        });
                    });
                });
            }
            else {
                contextObj.moveAssetToSelectedSpace(objectId, xPos, yPos, NewxPos, NewyPos, selectedSymbolhandle, 0, function (retCode) {
                    if (retCode == 0) {
                        contextObj.moveObjectDBCall(0, NewxPos, NewyPos, objectId, "", resCallBak);
                    }
                    else {
                        resCallBak(1);
                    }
                });
            }
        };
        /*Get space handle by providing space Id*/
        this.GetSpaceHandleFromSpaceId = function (spaceId, resCallback) {
            var contextObj = this;
            var spaceHandle = "";
            var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === spaceId; });
            if (index != -1) {
                if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
                    contextObj.blnIsSpace = false;
                }
                else {
                    contextObj.blnIsSpace = true;
                }
                if (contextObj.blnIsSpace) {
                    contextObj.spaceHandle = contextObj.spaceOpenDrawingObj.spaceData[index]['BomaHandle'];
                }
                else {
                    contextObj.spaceHandle = contextObj.spaceOpenDrawingObj.spaceData[index]['CarpetHandle'];
                }
            }
            else
                contextObj.spaceHandle = "";
            if (contextObj.spaceHandle == null || contextObj.spaceHandle == undefined)
                contextObj.spaceHandle = "";
            resCallback(contextObj.spaceHandle);
        };
        /*Get space id by providing space handle*/
        this.GetSpaceIdFromHandle = function (strSpaceHandle, resCallback) {
            var contextObj = this;
            if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
                contextObj.blnIsSpace = false;
            }
            else {
                contextObj.blnIsSpace = true;
            }
            if (contextObj.blnIsSpace == false) {
                var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.CarpetHandle === strSpaceHandle; });
                if (index != -1)
                    contextObj.spaceId = contextObj.spaceOpenDrawingObj.spaceData[index]['SpaceId'];
                else
                    contextObj.spaceId = 0;
            }
            else {
                var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.BomaHandle === strSpaceHandle; });
                if (index != -1)
                    contextObj.spaceId = contextObj.spaceOpenDrawingObj.spaceData[index]['SpaceId'];
                else
                    contextObj.spaceId = 0;
            }
            if (contextObj.spaceId == null || contextObj.spaceId == undefined)
                contextObj.spaceId = 0;
            resCallback(contextObj.spaceId);
        };
        /*After selecting the asset, trying to move to a new position */
        this.InvokeMoveObject = function (assetsId, xPos, yPos, selectedSymbolhandle, resCallback) {
            var contextObj = this;
            //var intCompareResult: boolean;//Check Edit permission For Facility User
            var blnPermittedSpace = false;
            var spaceId;
            var g_intUserRoleId = contextObj.commonDwgServices.sessionUserRoleId;
            contextObj.g_blnModuleAdmin = contextObj.commonDwgServices.isModuleAdmin;
            contextObj.objiWhiz.setCursor(2);
            contextObj.objiWhiz.getDWGPoint(function (retCode, dblNewXPosition, dblNewYPosition) {
                if (retCode == 0) {
                    contextObj.MoveObjectPermission(dblNewXPosition, dblNewYPosition, 2, function (retcode) {
                        var UserRoleId = contextObj.commonDwgServices.sessionUserRoleId;
                        if (((contextObj.drawingCategoryId == 1) && (retcode == null || retcode == undefined || retcode == 0)) || ((contextObj.drawingCategoryId != 1) && (retcode == 0))) {
                            {
                                //contextObj.notificationServices.ClearAllToasts();
                                //contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space, Select another place", 3);
                                contextObj.objiWhiz.setCursor(2);
                                contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle);
                            }
                        }
                        else {
                            contextObj.objiWhiz.pointInEntity(contextObj.commonDwgServices.grossHandle, dblNewXPosition, dblNewYPosition, function (returnCode, isInside) {
                                if (returnCode == 0) {
                                    contextObj.objiWhiz.getHandleWithDWGPoint(dblNewXPosition, dblNewYPosition, contextObj.blnIsSpace, function (retCode, strSpaceHandle) {
                                        if (retCode == 0) {
                                            if (isInside) {
                                                contextObj.GetSpaceIdFromHandle(strSpaceHandle, function (SpaceId) {
                                                    if (SpaceId != 0) {
                                                        contextObj.CheckPermissionForSelectedPoint(dblNewXPosition, dblNewYPosition, 4, function (strSpaceOrNetHandle) {
                                                            if (strSpaceHandle != "") {
                                                                blnPermittedSpace = true;
                                                                contextObj.GetSpaceIdFromHandle(strSpaceHandle, function (SpaceId) {
                                                                    contextObj.moveAssetToSelectedSpace(assetsId, xPos, yPos, dblNewXPosition, dblNewYPosition, selectedSymbolhandle, SpaceId, function (retCode) {
                                                                        if (retCode == 0) {
                                                                            contextObj.deHatchObjects(function (retCode) {
                                                                                // contextObj.objiWhiz.setCursor(2);
                                                                                //------update details in the table
                                                                                var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === SpaceId; });
                                                                                if (index != -1) {
                                                                                    var SiteId = contextObj.spaceOpenDrawingObj.spaceData[index]['SiteId'];
                                                                                    contextObj.objectsDrawingService.updateAssetsSymbolData(9, SpaceId, dblNewXPosition, dblNewYPosition, 0, contextObj.drawingId, contextObj.objectCategoryId, SiteId, assetsId, contextObj.isBuildingDrawing).subscribe(function (resultData) {
                                                                                        if (resultData["Data"]["Message"] == "Success") {
                                                                                            contextObj.objiWhiz.setCursor(1);
                                                                                            contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                                                                                            contextObj.objiWhiz.regenerate();
                                                                                            var index = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === assetsId; });
                                                                                            if (index != -1) {
                                                                                                contextObj.objectsData[index].SpaceId = SpaceId;
                                                                                                contextObj.objectsData[index].Xposition = dblNewXPosition;
                                                                                                contextObj.objectsData[index].Yposition = dblNewYPosition;
                                                                                                //Update the space handle correctly,(Net customer and space customer) otherwise issue in show in drawing/zoom/delink
                                                                                                var spaceId = contextObj.objectsData.find(function (el) { return el.ObjectId === assetsId; })['SpaceId'];
                                                                                                var dataitemIndex = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === spaceId; });
                                                                                                if (contextObj.blnIsSpace) 
                                                                                                // contextObj.objectsData[index].BomaHandle = strSpaceOrNetHandle;
                                                                                                {
                                                                                                    if (dataitemIndex != -1) {
                                                                                                        contextObj.spaceOpenDrawingObj.spaceData[dataitemIndex].BomaHandle = strSpaceOrNetHandle;
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    if (dataitemIndex != -1) {
                                                                                                        contextObj.spaceOpenDrawingObj.spaceData[dataitemIndex].CarpetHandle = strSpaceOrNetHandle;
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                            /* calling the additional tooltip data value function for updating the additional tooltip */
                                                                                            contextObj.objectsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
                                                                                                contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
                                                                                                contextObj.notificationServices.ClearAllToasts();
                                                                                                contextObj.notificationServices.ShowToaster(contextObj.objectname + " moved", 3);
                                                                                                //switch (contextObj.moduleId) {
                                                                                                //    case 7:
                                                                                                //        contextObj.notificationServices.ShowToaster("Asset moved", 3);
                                                                                                //        break;
                                                                                                //    case 8:
                                                                                                //        contextObj.notificationServices.ShowToaster("Furniture moved", 3);
                                                                                                //        break;
                                                                                                //}
                                                                                                resCallback(0);
                                                                                            });
                                                                                        }
                                                                                        else {
                                                                                            resCallback(1);
                                                                                        }
                                                                                    });
                                                                                }
                                                                                else
                                                                                    resCallback(1);
                                                                            });
                                                                        }
                                                                        else {
                                                                            /* Problem with :moveAssetToSelectedSpace */
                                                                            resCallback(1);
                                                                        }
                                                                    });
                                                                });
                                                            }
                                                            else {
                                                                //recursive function
                                                                contextObj.notificationServices.ClearAllToasts();
                                                                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                                                contextObj.objiWhiz.setCursor(2);
                                                                contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle);
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        //resCallback(1);
                                                        contextObj.notificationServices.ClearAllToasts();
                                                        contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                                        contextObj.objiWhiz.setCursor(2);
                                                        contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle);
                                                    }
                                                });
                                            }
                                            else {
                                                /* isInside :not */
                                                resCallback(1);
                                            }
                                        }
                                        else {
                                            /* Problem with getHandleWithDWGPoint : Getting Handle */
                                            //recursive function
                                            contextObj.notificationServices.ClearAllToasts();
                                            contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                            contextObj.objiWhiz.setCursor(2);
                                            contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle);
                                        }
                                    });
                                }
                                else {
                                    /* Problem with pointInEntity : Getting new xypoints */
                                    resCallback(1);
                                }
                            });
                        }
                    });
                }
                else if (retCode == 8) {
                    contextObj.deHatchObjects(function (retCode) {
                        contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                        contextObj.objiWhiz.regenerate();
                    });
                }
                else {
                    /* Problem with getDWGPoint : Getting new xypoints */
                    resCallback(1);
                }
            });
        };
        /*Check Move asset to the outside space */
        this.checkMoveOutsideSpace = function (intAssetId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, resCallback) {
            resCallback(0);
        };
        /*Move asset to the selected space */
        this.moveAssetToSelectedSpace = function (intAssetId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, resCallback) {
            var contextObj = this;
            var midPoints = contextObj.getAssetXYCordinates(intAssetId);
            contextObj.objiWhiz.setCursor(1);
            contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
            contextObj.objiWhiz.moveSymbol(selectedSymbolhandle, previousXCord, previousYCord, currentXCord, currentYCord, midPoints, function (returnCode, actualPoints, rtnMidPoints) {
                contextObj.objiWhiz.removeMaps();
                if (returnCode != 0) {
                    console.log("moveSymbol faild due to ", returnCode);
                    resCallback(1);
                }
                else {
                    contextObj.objiWhiz.getEntityExtents(selectedSymbolhandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                        if (retCode != 0) {
                            console.log("getEntityExtents faild due to ", retCode);
                            resCallback(1);
                        }
                        else {
                            contextObj.moveAssetText(intAssetId, MaxX, MaxY, function (retCode) {
                                if (retCode == 0) {
                                    var index = contextObj.objectsSymbolTextHandleData.find(function (el) { return el.Key === intAssetId; });
                                    if (index != undefined) {
                                        var SymboltextHandle = contextObj.objectsSymbolTextHandleData.find(function (el) { return el.Key === intAssetId; }).Value;
                                        if (SymboltextHandle != null && SymboltextHandle != "" && SymboltextHandle != undefined) {
                                            contextObj.objiWhiz.getEntityMidpoint(selectedSymbolhandle, function (rtCode, MidX, MidY) {
                                                if (rtCode == 0) {
                                                    contextObj.moveAssetSymbolText(SymboltextHandle, MidX, MidY, function (retCode) {
                                                        contextObj.deHatchObjects(function (retCode) {
                                                            contextObj.objiWhiz.regenerate();
                                                            resCallback(0);
                                                        });
                                                    });
                                                }
                                                else {
                                                    resCallback(1);
                                                }
                                            });
                                        }
                                        else {
                                            //debugger
                                            contextObj.deHatchObjects(function (retCode) {
                                                contextObj.objiWhiz.setCursor(1);
                                                contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                                                contextObj.objiWhiz.regenerate();
                                                resCallback(0);
                                            });
                                        }
                                    }
                                    else {
                                        //debugger
                                        contextObj.deHatchObjects(function (retCode) {
                                            contextObj.objiWhiz.setCursor(1);
                                            contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                                            contextObj.objiWhiz.regenerate();
                                            resCallback(0);
                                        });
                                    }
                                }
                                else {
                                    resCallback(1);
                                }
                            });
                        }
                    });
                }
            });
        };
        this.afterSelectingObjects = function (floorid, resCallback) {
            var contextObj = this;
            contextObj.objiWhiz.setCursor(2);
            if (contextObj.multipleMoveData.length > 0) {
                var rubx = [], ruby = [], rubz = [];
                rubx[0] = contextObj.multipleMoveData[0].xPosition;
                ruby[0] = contextObj.multipleMoveData[0].yPosition;
                rubz[0] = 0;
                contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
                contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                var spaceIddb = "";
                contextObj.objiWhiz.getDWGPoint(function (retCode, Xposition, Yposition) {
                    if (retCode == 0) {
                        contextObj.objiWhiz.getHandleWithDWGPoint(Xposition, Yposition, contextObj.blnIsSpace, function (rCode, SpaceHandlenew) {
                            if (SpaceHandlenew == null || SpaceHandlenew == undefined || SpaceHandlenew == "") {
                                contextObj.notificationServices.ShowToaster("Select a point inside a space", 5);
                                contextObj.afterSelectingObjects(floorid, resCallback);
                            }
                            else {
                                contextObj.GetSpaceIdFromHandle(SpaceHandlenew, function (SpaceIdnew) {
                                    spaceIddb = SpaceIdnew;
                                    if (contextObj.userRoleId > 3) {
                                        // var spaceId = contextObj.getSpaceIdFromSpaceHandle(strSpaceOrNetHandle);
                                        contextObj.checkEditPermissionforTheSelectedSpace(spaceIddb, function (blnEditPermission) {
                                            contextObj.notificationServices.ClearAllToasts();
                                            if (blnEditPermission == false) {
                                                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                                contextObj.blnPermittedSpace = false;
                                                contextObj.afterSelectingObjects(floorid, resCallback);
                                            }
                                            else {
                                                contextObj.afterSpaceCheckMultipleMove(Xposition, Yposition, SpaceHandlenew, spaceIddb, floorid, resCallback);
                                            }
                                        });
                                    }
                                    else {
                                        contextObj.afterSpaceCheckMultipleMove(Xposition, Yposition, SpaceHandlenew, spaceIddb, floorid, resCallback);
                                    }
                                });
                            }
                        });
                    }
                    else if (retCode == 8) {
                        // 
                        contextObj.deHatchObjects(function (retCode) {
                            if (retCode == 0) {
                                contextObj.objiWhiz.setCursor(1);
                                contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                                contextObj.multipleMoveData = [];
                                contextObj.objiWhiz.regenerate();
                            }
                        });
                    }
                });
            }
            else {
                contextObj.deHatchObjects(function (retCode) {
                    if (retCode == 0) {
                        contextObj.objiWhiz.setCursor(1);
                        contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                        contextObj.multipleMoveData = [];
                        contextObj.objiWhiz.regenerate();
                        contextObj.msgcount = 0;
                    }
                });
            }
        };
        this.checkSpaceOutside = function (SpaceHandlenew, AssetsId, xPosition, yPosition, dblActualXDifference, dblActualYDifference, SymbolHandle, SpaceId, resCallback) {
            var contextObj = this;
            contextObj.objiWhiz.getEntityMidpoint(SymbolHandle, function (rtCode, dblObjectMidX, dblObjectMidY) {
                var dblObjectNewMidX = dblObjectMidX + dblActualXDifference;
                var dblObjectNewMidY = dblObjectMidY + dblActualYDifference;
                contextObj.multipleMoveData[contextObj.multipleMoveIndex]["newxPosition"] = dblObjectNewMidX;
                contextObj.multipleMoveData[contextObj.multipleMoveIndex]["newyPosition"] = dblObjectNewMidY;
                contextObj.spaceOpenDrawingObj.getSpaceIdFromXYPoints(dblObjectNewMidX, dblObjectNewMidY, function (spaceId) {
                    contextObj.multipleMoveData[contextObj.multipleMoveIndex].SpaceId = spaceId;
                    contextObj.objiWhiz.pointInEntity(SpaceHandlenew, dblObjectNewMidX, dblObjectNewMidY, function (retCode, IsInside) {
                        if (IsInside == false && retCode == 0) {
                            resCallback(1);
                        }
                        else {
                            if (contextObj.multipleMoveIndex == contextObj.multipleMoveData.length - 1) {
                                resCallback(0);
                            }
                            else {
                                contextObj.multipleMoveIndex++;
                                contextObj.checkSpaceOutside(SpaceHandlenew, contextObj.multipleMoveData[contextObj.multipleMoveIndex].AssetsId, contextObj.multipleMoveData[contextObj.multipleMoveIndex].xPosition, contextObj.multipleMoveData[contextObj.multipleMoveIndex].yPosition, dblActualXDifference, dblActualYDifference, contextObj.multipleMoveData[contextObj.multipleMoveIndex].SymbolHandle, SpaceId, resCallback);
                            }
                        }
                    });
                });
            });
        };
        /* After multiple move update the details in db*/
        this.updateNewpositionForMultiplemove = function (ObjectId, xPosition, yPosition, dblActualXDifference, dblActualYDifference, SymbolHandle, SpaceId, arraycount, floorid, resCallback) {
            var contextObj = this;
            //contextObj.objiWhiz.getEntityMidpoint(SymbolHandle, function (rtCode, dblObjectMidX, dblObjectMidY) {
            // var dblObjectNewMidX = dblObjectMidX + dblActualXDifference;
            // var dblObjectNewMidY = dblObjectMidY + dblActualYDifference;
            // contextObj.multipleMoveData[arraycount]["newxPosition"] = dblObjectNewMidX;
            // contextObj.multipleMoveData[arraycount]["newyPosition"] = dblObjectNewMidY;
            contextObj.objiWhiz.setCursor(2);
            contextObj.moveAssetToSelectedSpace(contextObj.multipleMoveData[arraycount].AssetsId, contextObj.multipleMoveData[arraycount].xPosition, contextObj.multipleMoveData[arraycount].yPosition, contextObj.multipleMoveData[arraycount].newxPosition, contextObj.multipleMoveData[arraycount].newyPosition, contextObj.multipleMoveData[arraycount].SymbolHandle, contextObj.multipleMoveData[arraycount].SpaceId, function (retCode) {
                if (retCode == 0) {
                    if (SpaceId == "")
                        SpaceId = 0;
                    contextObj.objectsDrawingService.updateAssetsSymbolData(9, contextObj.multipleMoveData[arraycount].SpaceId, contextObj.multipleMoveData[arraycount]["newxPosition"], contextObj.multipleMoveData[arraycount]["newyPosition"], 0, contextObj.drawingId, contextObj.objectCategoryId, contextObj.siteId, ObjectId, contextObj.isBuildingDrawing).subscribe(function (resultData) {
                        if (resultData["Data"]["Message"] == "Success") {
                            var index = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === ObjectId; });
                            if (index != -1) {
                                //******
                                contextObj.objectsData[index].SpaceId = contextObj.multipleMoveData[arraycount].SpaceId;
                                contextObj.objectsData[index].Xposition = contextObj.multipleMoveData[arraycount]["newxPosition"];
                                contextObj.objectsData[index].Yposition = contextObj.multipleMoveData[arraycount]["newyPosition"];
                                //*******
                                contextObj.multipleMoveData.splice(arraycount, 1);
                                if (contextObj.multipleMoveData.length > 0) {
                                    contextObj.updateNewpositionForMultiplemove(contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].AssetsId, contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].xPosition, contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].yPosition, dblActualXDifference, dblActualYDifference, contextObj.multipleMoveData[contextObj.multipleMoveData.length - 1].SymbolHandle, SpaceId, contextObj.multipleMoveData.length - 1, floorid, resCallback);
                                }
                                else {
                                    resCallback(0);
                                }
                            }
                            else {
                                resCallback(1);
                            }
                        }
                        else {
                            resCallback(1);
                        }
                    });
                }
                else {
                    resCallback(1);
                }
            });
            //  });
        };
        /*Move asset text */
        this.moveAssetText = function (AssetId, xpos, ypos, resCallback) {
            ////debugger;
            var contextObj = this;
            var textHandle = contextObj.dataInDrawingTextHandles.find(function (el) { return el.Key === AssetId; }).Value;
            contextObj.objiWhiz.moveEntity(textHandle, xpos, ypos, function (retcode) {
                if (retcode != 0)
                    console.log("getEntityExtents faild due to ", retcode);
                resCallback(0);
            });
        };
        /*Move asset symbol text */
        this.moveAssetSymbolText = function (SymboltextHandle, xpos, ypos, resCallback) {
            var contextObj = this;
            contextObj.objiWhiz.moveEntity(SymboltextHandle, xpos, ypos, function (retcode) {
                if (retcode != 0) {
                    console.log("Move symbol text faild due to ", retcode);
                    resCallback(1);
                }
                else
                    resCallback(0);
            });
        };
        this.delinkObject = function (resCallback) {
            var contextObj = this;
            contextObj.delinkObjects = [];
            contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntity, contextObj.cursorIndex, function (returnCode, entityHandles) {
                if (returnCode == 0) {
                    var handleArray = entityHandles.split(contextObj.rowDelimiter);
                    contextObj.FindBlockOrSymbolHandle(handleArray, function (returnCode, objectId, classId, handle, isSymbolHandle) {
                        contextObj.delinkObjects.push({ AssetsId: objectId, ClassId: classId });
                        resCallback(returnCode, objectId, classId, handle, isSymbolHandle);
                    });
                }
                else {
                    console.log("connectivity failed due to ", returnCode);
                }
            });
        };
        this.hasPermissionForSelectedObjectId = function (objectId, resCallback) {
            var spaceId = this.objectsData.find(function (el) { return el.ObjectId == objectId; })['SpaceId'];
            console.log(' from space id', spaceId);
            if (spaceId != null && spaceId != undefined) {
                this.spaceOpenDrawingObj.hasPrivilageExists(spaceId, resCallback);
            }
            else {
                resCallback(true);
            }
        };
        this.checkEditPermissionforTheSelectedSpace = function (spaceId, resCallback) {
            var contextObj = this;
            contextObj.spaceOpenDrawingObj.hasPrivilageExists(spaceId, function (hasPrivilage) {
                if (hasPrivilage)
                    resCallback(true);
                else
                    resCallback(false);
            });
        };
        this.objectsEditReflectInDrawing = function (editedRowData, resCallback) {
            ////debugger;
            var contextObj = this;
            var assetId = editedRowData.ObjectId;
            if (editedRowData['Status'] == "Assigned") {
                var ratio = [0];
                var formatedText = "";
                contextObj.objiWhiz.clientDWGAreaRatio(ratio);
                var rowInsertIndex = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === assetId; });
                contextObj.objectsData[rowInsertIndex] = editedRowData;
                //contextObj.objiWhiz.deleteEntity(bomaHandle, function (retCode) {
                //    if (retCode != 0)
                //        alert("deleteEntity returned with error code : " + retCode);
                //    else {
                var assetsDispSettingsData = contextObj.objectsDisplaySettingData.slice();
                for (var _i = 0, assetsDispSettingsData_3 = assetsDispSettingsData; _i < assetsDispSettingsData_3.length; _i++) {
                    var dispSettingsItem = assetsDispSettingsData_3[_i];
                    if (dispSettingsItem.ShowinDrawing) {
                        var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
                        var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
                        var textContent = editedRowData[dispSettingsItem.FieldName];
                        if (textContent == "null" || textContent == null)
                            textContent = "-";
                        if ((dispSettingsItem.ObjectClassId != 0) && (editedRowData.ObjectClassId != 0)) {
                            if (dispSettingsItem.ObjectClassId != editedRowData.ObjectClassId) {
                                textContent = "";
                            }
                        }
                        if (textContent != "")
                            formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
                    }
                }
                var formatedTextFinal = "{" + formatedText + "}";
                //for (let dispSettingsItem of contextObj.objectsDisplaySettingData) {
                //    if (dispSettingsItem.ShowinDrawing) {
                //        var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
                //        var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
                //        let textContent = editedRowData[dispSettingsItem.FieldName];
                //        if (textContent == "null" || textContent == null)
                //            textContent = "-";
                //        formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
                //        //formatedText += "\\fTimes New Roman|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + ratio[0] * dispSettingsItem.FontSize + ";" + textContent + "\\n";
                //    }
                //}
                // let formatedTextFinal: string = "{" + formatedText + "}";
                var textHandle = contextObj.dataInDrawingTextHandles.find(function (el) { return el.Key === assetId; }).Value;
                contextObj.objiWhiz.setText(textHandle, formatedTextFinal, function (retCode) {
                    if (retCode != 0) {
                        console.log("setText returned with error code : ", retCode);
                    }
                    resCallback(0);
                });
            }
            else
                resCallback(0);
            //{
            //    contextObj.clearobjMoveRequestEmpDetails(assetId, function (retCode) {
            //        contextObj.deHatchObjects(function (retCode) {
            //            //contextObj.empCount--;
            //            resCallback(0);
            //        });
            //    });
            //}
            //    }
            //});
        };
        this.objectsAddReflectInDrawing = function (editedRowData, resCallback) {
            var contextObj = this;
            var ratio = [0];
            contextObj.objiWhiz.clientDWGAreaRatio(ratio);
            contextObj.objectsData.push(editedRowData[0]);
            contextObj.totalObjects++;
            contextObj.createobjectsDataAndTooltipOnDrawing(editedRowData, contextObj.objectsDisplaySettingData, ratio, contextObj.resultDataArray, function (retCode) {
                contextObj.deHatchObjects(function (retCode) {
                    if (retCode == 0) {
                        //   contextObj.objiWhiz.zoomExtents(function (ret) {   /* No need of zoom extends here */
                        //  if (ret == 0)
                        resCallback(0);
                    }
                    else
                        resCallback(retCode);
                });
            });
        };
        this.getTotalizeData = function (selectedSpaceHandles, resCallback) {
            var contextObj = this;
            contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$LEGEND", function (returnCode) {
                if (contextObj.spaceOpenDrawingObj.legendRectHandles.length > 0) {
                    contextObj.objiWhiz.removeMapsByHandle(contextObj.legendRectHandles);
                    contextObj.objiWhiz.removeLinesByHandle(contextObj.legendLineHandles);
                    contextObj.spaceOpenDrawingObj.legendRectHandles = "";
                    contextObj.spaceOpenDrawingObj.legendLineHandles = "";
                }
                var spaceIds = contextObj.spaceOpenDrawingObj.getSpcaceIdsArray(contextObj.isSpace, selectedSpaceHandles);
                var strSpaceIds = "";
                var spaceCount = spaceIds.length;
                var arr = new Array();
                // arr.push({ ReportFieldId: 649, Value: contextObj.objectCategoryId  });
                for (var i = 0; i < spaceCount; i++) {
                    //arr = JSON.parse(strsubmitField);
                    arr.push({ ReportFieldId: 665, Value: spaceIds[i] });
                }
                arr.push({ ReportFieldId: 649, Value: contextObj.objectCategoryId });
                contextObj.objectsService.getTotalize(JSON.stringify(arr)).subscribe(function (result) {
                    var totalizeData = JSON.parse(result["Data"].FieldBinderData);
                    contextObj.TotalizeDataForLegend = totalizeData;
                    var modifyTotalizeData = "";
                    var modifyAssetTotalizeData = "";
                    var isAsset = false;
                    for (var _i = 0, totalizeData_1 = totalizeData; _i < totalizeData_1.length; _i++) {
                        var item = totalizeData_1[_i];
                        if (item['Label'] == contextObj.objectname + " Details" || isAsset == true) {
                            isAsset = true;
                            if (item['Label'] != contextObj.objectname + " Details")
                                modifyAssetTotalizeData += item['Label'] + " = <b>" + item['Value'] + "</b><br><br>";
                        }
                        else
                            modifyTotalizeData += item['Label'] + " = <b>" + item['Value'] + "</b><br><br>";
                    }
                    resCallback(modifyTotalizeData, modifyAssetTotalizeData, spaceCount);
                });
            });
        };
        this.addTotalizeLegend = function (totalSpaceCount, resCallback) {
            //alert("test");
            var contextObj = this;
            var textArray = [];
            contextObj.commonDwgServices.calculateDwgRatio();
            var totalCount = "No. of Spaces selected = " + totalSpaceCount;
            var formatedText = "\\f|b1|l0|c0|p18;\\C7;\\H" + contextObj.commonDwgServices.g_dblDwgRatio * 3 + ";Space Details\\n\\n\\f|b0|l0|c0|p18;\\C" + contextObj.legendColor + ";\\H" + contextObj.commonDwgServices.g_dblDwgRatio * 3 + ";" + totalCount + "\\n";
            for (var _i = 0, _a = this.TotalizeDataForLegend; _i < _a.length; _i++) {
                var item = _a[_i];
                var data = "";
                if (item['Label'] == contextObj.objectname + " Details") {
                    data = item['Label'];
                    formatedText += "\\f|b0|l0|c0|p18;\\C7;\\H" + contextObj.commonDwgServices.g_dblDwgRatio * 3 + ";" + data + "\\n";
                }
                else {
                    data = item['Label'] + " = " + item['Value'];
                    formatedText += "\\f|b0|l0|c0|p18;\\C" + contextObj.legendColor + ";\\H" + contextObj.commonDwgServices.g_dblDwgRatio * 3 + ";" + data + "\\n";
                }
            }
            contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
                if (retCode == 0) {
                    contextObj.spaceOpenDrawingObj.createDrawingDetailsLegend(xPos, yPos, false, function (startY) {
                        contextObj.objiWhiz.createMultilineText("$LEGEND", contextObj.legendColor, xPos, startY, 0, contextObj.commonDwgServices.g_dblDwgRatio * 3, 0, 1, formatedText, "Standard", 0, function (retCode, entityHandle) {
                            if (retCode != 0)
                                console.log("createMultilineText returned with error code : ", retCode);
                            else
                                console.log("Entity handle: " + entityHandle);
                            contextObj.objiWhiz.zoomExtents(function (code) {
                                resCallback(retCode);
                            });
                        });
                    });
                }
                else
                    console.log("getDWGPoint failed due to ", retCode);
            });
        };
        this.SelectFromBlinkConnectComponents = function (recCallback) {
            var contextObj = this;
            var SecondaryObjectid;
            contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntity, contextObj.cursorIndex, function (returnCode, entityHandles) {
                if (returnCode == 0) {
                    var handleArray = entityHandles.split(contextObj.rowDelimiter);
                    contextObj.FindBlockOrSymbolHandle(handleArray, function (returnCode, objectId, classId) {
                        SecondaryObjectid = objectId;
                        var Temphandle = contextObj.getSymbolHandleFromObjectId(objectId);
                        var handle = Temphandle + contextObj.rowDelimiter;
                        contextObj.objiWhiz.removeBlinksByHandle(handle);
                        recCallback(returnCode, SecondaryObjectid);
                    });
                }
                else {
                    contextObj.objiWhiz.removeBlinkers();
                    recCallback(returnCode);
                }
            });
        };
        this.RotateObject = function (rescallback) {
            var contextObj = this;
            this.objiWhiz.setCursor(12);
            contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntity, contextObj.cursorIndex, function (returnCode, entityHandles) {
                if (returnCode == 0) {
                    var handleArray = entityHandles.split(contextObj.rowDelimiter);
                    contextObj.FindBlockOrSymbolHandle(handleArray, function (returnCode, objectId, classId, handle, isSymbolHandle) {
                        rescallback(returnCode, objectId, classId, handle, isSymbolHandle);
                    });
                }
                else {
                    console.log("selectEntity failed due to ", returnCode);
                }
            });
            /* this.objiWhiz.getDWGPoint(function (returnCode, dXCoord, dYCoord) {
                 if (returnCode != 0)
                     rescallback(returnCode)
                 else {
                     contextObj.objiWhiz.getSymbolWithDWGPoint(dXCoord, dYCoord, true, function (retCode, selectedSymbolhandle) {
                         if (retCode != 0) {
                             contextObj.objiWhiz.setCursor(2);
                             rescallback(retCode)
                         }
                         else
                             rescallback(retCode, selectedSymbolhandle);
     
                     });
                 }
     
             })*/
        };
        this.RotateObjectSave = function (symbolHandle, angle, resCallback) {
            var contextObj = this;
            this.objiWhiz.getEntityMidpoint(symbolHandle, function (retcode, Xpos, Ypos) {
                if (retcode == 0 && (angle >= 0 || angle <= 360)) {
                    var midPoint = "0.0" + contextObj.colDelimiter + "0.0";
                    contextObj.objiWhiz.rotateSymbol(symbolHandle, Xpos, Ypos, angle, midPoint, function (retrot, FinalAngle, ActualPoints, MidPoint) {
                        console.log('return from rotate symbol', retrot);
                        if (retrot == 0) {
                            console.log('final angle', FinalAngle);
                            console.log('ActualPoints', ActualPoints);
                            console.log('MidPoint', MidPoint);
                            contextObj.objiWhiz.getEntityExtents(symbolHandle, function (retentity, MinX, MinY, MaxX, MaxY) {
                                if (retentity == 0) {
                                    var objectid = contextObj.getObjectIdFromSymbolHandle(symbolHandle);
                                    var texthandle = contextObj.dataInDrawingTextHandles.find(function (textitem) { return textitem.Key === objectid; });
                                    contextObj.objiWhiz.moveEntity(texthandle.Value, MaxX, MaxY, function (retmove) {
                                        if (retmove == 0) {
                                            //Saving rotated object
                                            console.log('contextObj.objectsData', contextObj.objectsData);
                                            var scopeobject = contextObj.objectsData.find(function (el) { return el.ObjectId === objectid; });
                                            var spaceId = scopeobject['SpaceId'];
                                            var SiteId = scopeobject['SiteId'];
                                            if (spaceId == undefined)
                                                spaceId = 0;
                                            var arr = new Array();
                                            //arr = JSON.parse(strsubmitField);
                                            arr.push({ ReportFieldId: 658, Value: contextObj.objectCategoryId.toString() });
                                            arr.push({ ReportFieldId: 659, Value: "9" });
                                            arr.push({ ReportFieldId: 665, Value: spaceId.toString() });
                                            arr.push({ ReportFieldId: 666, Value: MidPoint.split('µ')[0].toString() });
                                            arr.push({ ReportFieldId: 667, Value: MidPoint.split('µ')[1].toString() });
                                            arr.push({ ReportFieldId: 668, Value: FinalAngle.toString() });
                                            arr.push({ ReportFieldId: 669, Value: contextObj.drawingId.toString() });
                                            arr.push({ ReportFieldId: 7411, Value: SiteId.toString() });
                                            contextObj.objectsService.RotateObjectSave(JSON.stringify(arr), objectid, 0, contextObj.objectCategoryId, 1, 1, '', contextObj.drawingId, '', 0, 0, 1, 1, contextObj.isBuildingDrawing).subscribe(function (resultDataRotate) {
                                                if (resultDataRotate.Data.StatusId == 1) {
                                                    console.log('resultDataRotate', JSON.parse(resultDataRotate["Data"]["Data"])[0]["Xposition"]);
                                                    console.log('resultDataRotate', JSON.parse(resultDataRotate["Data"]["Data"])[0]["Yposition"]);
                                                    scopeobject.Xposition = JSON.parse(resultDataRotate["Data"]["Data"])[0]["Xposition"];
                                                    scopeobject.Yposition = JSON.parse(resultDataRotate["Data"]["Data"])[0]["Yposition"];
                                                    resCallback(0);
                                                }
                                                else
                                                    resCallback(1);
                                            });
                                        }
                                        else
                                            resCallback(retmove);
                                    });
                                }
                                else
                                    resCallback(retentity);
                            });
                        }
                        else
                            resCallback(retrot);
                    });
                }
                else
                    resCallback(retcode);
            });
        };
        this.selectObjectsonClick = function (resCallback) {
            var contextObj = this;
            contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntity, contextObj.cursorIndex, function (returnCode, entityHandles) {
                if (returnCode == 0) {
                    var handleArray = entityHandles.split(contextObj.rowDelimiter);
                    contextObj.FindBlockOrSymbolHandle(handleArray, function (returnCode, objectId, classId, handle, isSymbolHandle) {
                        contextObj.getSpaceIdFromBlockHandle(handle, isSymbolHandle, objectId, function (spaceId) {
                            resCallback(returnCode, objectId, classId, handle, isSymbolHandle, spaceId);
                        });
                    });
                }
                else {
                    console.log("selectEntity failed due to ", returnCode);
                }
            });
        };
        this.selectedObjectsDetails = function (objectId, resCallback) {
            var contextObj = this;
            var handleArray = [contextObj.gethandleFromObjectId(objectId)];
            contextObj.FindBlockOrSymbolHandle(handleArray, function (returnCode, objectId, classId, handle, isSymbolHandle) {
                contextObj.getSpaceIdFromBlockHandle(handle, isSymbolHandle, objectId, function (spaceId) {
                    resCallback(returnCode, objectId, classId, handle, isSymbolHandle, spaceId);
                });
            });
        };
        this.isBlockOrSymbolHandle = function (handles, rescallback) {
            var handleType = 0;
            var index;
            var handle;
            var selectedHandle;
            for (var i = 0; i < handles.length; i++) {
                handle = handles[i];
                index = this.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle == handle; });
                if (index == -1) {
                    index = this.objectsHandlesData.findIndex(function (el) { return el.BlockHandle == handle; });
                    if (index == -1) {
                        handleType = 3;
                    }
                    else {
                        handleType = 2;
                        break;
                    }
                }
                else {
                    selectedHandle = handle;
                    handleType = 1;
                    break;
                }
            }
            rescallback(handleType, selectedHandle);
        };
        this.getSpaceHandleforRelink = function (selectedrowdata, rescallback) {
            console.log('selected row data in employee open drawing', selectedrowdata);
            this.getSpaceHandlefromXY(selectedrowdata, 0, [], function (spacehandlearraycallbak) {
                rescallback(spacehandlearraycallbak);
            });
        };
        this.updateStatusOfBlockLinkedObjects = function (resCallback) {
            var contextObj = this;
            this.objiWhiz.getAllBlockRef("", function (retCode, BlockRefHandles) {
                debugger;
                if (retCode == 0) {
                    contextObj.allBlockRefHandles = BlockRefHandles.split(contextObj.rowDelimiter);
                    contextObj.allBlockRefHandles.pop;
                    console.log("contextObj.allBlockRefHandles", contextObj.allBlockRefHandles);
                    if (contextObj.allBlockRefHandles.length > 0) {
                        var rptField = [];
                        rptField.push({ ReportFieldId: 4308, Value: contextObj.isBuildingDrawing });
                        rptField.push({ ReportFieldId: 669, Value: contextObj.drawingId });
                        for (var i = 0; i < contextObj.allBlockRefHandles.length; i++)
                            rptField.push({ ReportFieldId: 2615, Value: contextObj.allBlockRefHandles[i] });
                        contextObj.objectsDrawingService.UpdateOrphanObjects(JSON.stringify(rptField), contextObj.objectCategoryId).subscribe(function (result) {
                            resCallback(result["Data"].ServerId);
                        });
                    }
                    else
                        resCallback(0);
                }
                else
                    resCallback(0);
            });
            //}
        };
        this.copyObject = function (objectId, resCallback) {
            var contextObj = this;
            var selectedSymbolHandle = this.getSymbolHandleFromObjectId(objectId);
            var objectData = this.getObjectDataFromObjectId(objectId);
            this.objiWhiz.startSvgTrails(selectedSymbolHandle, 0, 0, function (retCode) { });
            this.isFromCopyObject = true;
            contextObj.placeSymbolInDrawing(objectData, contextObj.siteId, 0, function (dXCoord, dYCoord, spaceId) {
                contextObj.objiWhiz.stopSvgTrails();
                contextObj.getAddObjectsFields(function (fieldDetailsAdd) {
                    if (fieldDetailsAdd) {
                        contextObj.isFromCopyObject = false;
                        var classId = objectData["ObjectClassId"].toString();
                        var index = fieldDetailsAdd.findIndex(function (el) { return el.ReportFieldId == 657; }); /*class*/
                        fieldDetailsAdd[index].FieldValue = classId;
                        fieldDetailsAdd[index].IsEnabled = false;
                        resCallback(fieldDetailsAdd, dXCoord, dYCoord, spaceId, objectData["Angle"]);
                    }
                });
            });
        };
        this.selectFirstObjectToSnap = function (mainTarget, target, resCallback) {
            var contextObj = this;
            var strSpaceHandle = "";
            if (contextObj.objectsData) {
                if (contextObj.totalObjects == 0) {
                    contextObj.notificationServices.ShowToaster("No " + contextObj.objectmultiplename + " are assigned to this floor", 2);
                    resCallback(0);
                }
                else {
                    contextObj.objiWhiz.setCursor(2);
                    contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
                        if (retCode == 0) {
                            contextObj.objiWhiz.getSymbolWithDWGPoint(xPos, yPos, true, function (retCode, selectedSymbolhandle) {
                                if (retCode == 0) {
                                    contextObj.hatchSingleObject(selectedSymbolhandle, function (retCode) {
                                        //contextObj.enableRubberband(xPos, yPos);
                                        contextObj.objiWhiz.startSvgTrails(selectedSymbolhandle, xPos, yPos, function (retCode) { });
                                        var index = contextObj.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle; });
                                        if (index != -1) {
                                            var objectId = contextObj.objectsHandlesData[index].AssetsId;
                                            if (mainTarget == 1) {
                                                contextObj.notificationServices.ShowToaster("Click near the wall to move " + contextObj.objectname, 2);
                                            }
                                            else {
                                                if (target == 1) {
                                                    contextObj.notificationServices.ShowToaster("Click near desired corner of the other " + contextObj.objectname + " to be moved", 2);
                                                }
                                                else if (target == 2 || target == 3) {
                                                    contextObj.notificationServices.ShowToaster("Click near desired edge of the other " + contextObj.objectname + " to be moved", 2);
                                                }
                                            }
                                            var index = contextObj.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle; });
                                            var firstObjectData;
                                            if (index != -1) {
                                                var objectId = contextObj.objectsHandlesData[index].AssetsId;
                                                firstObjectData = contextObj.getObjectDataFromObjectId(objectId);
                                            }
                                            if (contextObj.drawingCategoryId == 1 || contextObj.isXrefExists) {
                                                contextObj.checkEditPermissionforTheSelectedSpace(firstObjectData['SpaceId'], function (blnEditPermission) {
                                                    if (blnEditPermission) {
                                                        if (mainTarget == 1)
                                                            contextObj.selectSpaceToSnap(mainTarget, target, xPos, yPos, objectId, selectedSymbolhandle, firstObjectData['Angle'], resCallback);
                                                        else
                                                            contextObj.selectSecondObjectToSnap(mainTarget, target, xPos, yPos, objectId, selectedSymbolhandle, firstObjectData['Angle'], resCallback);
                                                    }
                                                    else {
                                                        contextObj.deHatchSingleObject(function (ret) {
                                                            contextObj.objiWhiz.stopSvgTrails();
                                                            //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                                                            contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                                                            resCallback(1);
                                                        });
                                                    }
                                                });
                                            }
                                            else
                                                contextObj.selectSecondObjectToSnap(mainTarget, target, xPos, yPos, objectId, selectedSymbolhandle, firstObjectData['Angle'], resCallback);
                                        }
                                        else {
                                            contextObj.notificationServices.ShowToaster("Click inside the desired " + contextObj.objectname, 2);
                                            contextObj.selectFirstObjectToSnap(mainTarget, target, resCallback);
                                        }
                                    });
                                }
                                else {
                                    contextObj.notificationServices.ShowToaster("Click inside the desired " + contextObj.objectname, 2);
                                    contextObj.selectFirstObjectToSnap(mainTarget, target, resCallback);
                                }
                            });
                        }
                        else {
                            resCallback(1);
                        }
                    });
                }
            }
            else
                resCallback(0);
        };
        this.selectSecondObjectToSnap = function (mainTarget, target, startXPos, startYPos, ObjectId, firstSymbolHandle, firstObjectAngle, resCallback) {
            var contextObj = this;
            var intSpaceId = 0;
            var intClassId = 0;
            var intSymbolId = 0;
            contextObj.objiWhiz.setCursor(2);
            contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
                if (retCode == 0) {
                    contextObj.objiWhiz.getSymbolWithDWGPoint(xPos, yPos, true, function (retCode, selectedSymbolhandle) {
                        if (retCode == 0) {
                            var index = contextObj.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle; });
                            if (index != -1 && ObjectId != contextObj.objectsHandlesData[index].AssetsId) {
                                var objectId = contextObj.objectsHandlesData[index].AssetsId;
                                var indexnew = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === objectId; });
                                if (indexnew != -1) {
                                    intSpaceId = contextObj.objectsData[indexnew].SpaceId;
                                    intClassId = contextObj.objectsData[indexnew].ObjectClassId;
                                    intSymbolId = contextObj.objectsData[indexnew].SymbolId;
                                }
                                var strSpaceOrNetHandle; // need to find
                                if (contextObj.drawingCategoryId == 1 || contextObj.isXrefExists) {
                                    contextObj.checkEditPermissionforTheSelectedSpace(intSpaceId, function (blnEditPermission) {
                                        if (blnEditPermission) {
                                            contextObj.SnapObject(mainTarget, target, ObjectId, intSpaceId, startXPos, startYPos, xPos, yPos, firstSymbolHandle, selectedSymbolhandle, strSpaceOrNetHandle, firstObjectAngle, resCallback);
                                        }
                                        else {
                                            contextObj.deHatchSingleObject(function (ret) {
                                                //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                                                contextObj.objiWhiz.stopSvgTrails();
                                                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                                                resCallback(1);
                                            });
                                        }
                                    });
                                }
                                else
                                    contextObj.SnapObject(mainTarget, target, ObjectId, intSpaceId, startXPos, startYPos, xPos, yPos, firstSymbolHandle, selectedSymbolhandle, strSpaceOrNetHandle, firstObjectAngle, resCallback);
                            }
                            else {
                                contextObj.notificationServices.ShowToaster("Click inside the desired " + contextObj.objectname, 2);
                                contextObj.selectSecondObjectToSnap(mainTarget, target, startXPos, startYPos, ObjectId, firstSymbolHandle, firstObjectAngle, resCallback);
                            }
                        }
                        else {
                            contextObj.notificationServices.ShowToaster("Click inside the desired " + contextObj.objectname, 2);
                            contextObj.selectSecondObjectToSnap(mainTarget, target, startXPos, startYPos, ObjectId, firstSymbolHandle, firstObjectAngle, resCallback);
                        }
                    });
                }
                else {
                    if (retCode == 8) {
                        contextObj.deHatchSingleObject(function (ret) {
                            contextObj.objiWhiz.stopSvgTrails();
                            //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                        });
                    }
                    resCallback(1);
                }
            });
        };
        this.selectSpaceToSnap = function (mainTarget, target, startXPos, startYPos, ObjectId, firstSymbolHandle, firstObjectAngle, resCallback) {
            var contextObj = this;
            var intSpaceId = 0;
            var intClassId = 0;
            var intSymbolId = 0;
            contextObj.objiWhiz.setCursor(2);
            contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
                if (retCode == 0) {
                    contextObj.spaceOpenDrawingObj.getSpaceIdFromXYPoints(xPos, yPos, function (SpaceId, selectedHandle, retCode) {
                        if (retCode == 0) {
                            intSpaceId = SpaceId;
                            var strSpaceOrNetHandle = selectedHandle; // need to find
                            if (contextObj.drawingCategoryId == 1 || contextObj.isXrefExists) {
                                contextObj.checkEditPermissionforTheSelectedSpace(intSpaceId, function (blnEditPermission) {
                                    if (blnEditPermission) {
                                        contextObj.SnapObject(mainTarget, target, ObjectId, intSpaceId, startXPos, startYPos, xPos, yPos, firstSymbolHandle, "", strSpaceOrNetHandle, firstObjectAngle, resCallback);
                                    }
                                    else {
                                        contextObj.deHatchSingleObject(function (ret) {
                                            //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                                            contextObj.objiWhiz.stopSvgTrails();
                                            contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                                            resCallback(1);
                                        });
                                    }
                                });
                            }
                        }
                        else {
                            contextObj.notificationServices.ShowToaster("Click inside the desired " + contextObj.objectname, 2);
                            contextObj.selectSecondObjectToSnap(target, startXPos, startYPos, ObjectId, firstSymbolHandle, resCallback);
                        }
                    });
                }
                else {
                    if (retCode == 8) {
                        contextObj.deHatchSingleObject(function (ret) {
                            contextObj.objiWhiz.stopSvgTrails();
                            //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                        });
                    }
                    resCallback(1);
                }
            });
        };
        this.SnapObject = function (mainTarget, target, objectId, newSpaceId, startXPos, startYPos, endXPos, endYPos, firstSymbolHandle, secondSymbolHandle, strSpaceOrNetHandle, firstObjectAngle, resCallback) {
            var contextObj = this;
            var dblNewXPosition;
            var dblNewYPosition;
            var isSnapToMidPoint = false;
            var snapDistance = 0;
            var secondHandle;
            var blnInOrOut;
            if (mainTarget == 1) {
                blnInOrOut = true;
                secondHandle = strSpaceOrNetHandle;
            }
            else if (mainTarget == 2) {
                blnInOrOut = false;
                secondHandle = secondSymbolHandle;
            }
            if (target == 1) {
                contextObj.objiWhiz.snapPolylineVertex(firstSymbolHandle, secondHandle, startXPos, startYPos, endXPos, endYPos, function (returnCode, ActualPoints, IsOverlapping, MidPoints) {
                    if (returnCode == 0) {
                        contextObj.isNotFullyPlaced(mainTarget, IsOverlapping);
                        if (firstObjectAngle == undefined || firstObjectAngle == null)
                            firstObjectAngle = 0;
                        contextObj.updateObjetDetailsAfterSnap(objectId, newSpaceId, endXPos, endYPos, strSpaceOrNetHandle, firstSymbolHandle, firstObjectAngle, MidPoints, resCallback);
                    }
                    else {
                        console.log("snapPolylineVertex failed due to", returnCode);
                        contextObj.objiWhiz.stopSvgTrails(); //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                        contextObj.deHatchSingleObject(function (ret) {
                            resCallback(0);
                        });
                    }
                });
            }
            else if (target == 2) {
                contextObj.objiWhiz.snapPolylineVertexToEdge(firstSymbolHandle, secondHandle, startXPos, startYPos, endXPos, endYPos, snapDistance, isSnapToMidPoint, blnInOrOut, function (returnCode, IsOverlapping, SnappedAngle, ActualPoints, MidPoints) {
                    if (returnCode == 0) {
                        contextObj.isNotFullyPlaced(mainTarget, IsOverlapping);
                        firstObjectAngle = Math.ceil(SnappedAngle);
                        contextObj.updateObjetDetailsAfterSnap(objectId, newSpaceId, endXPos, endYPos, strSpaceOrNetHandle, firstSymbolHandle, firstObjectAngle, MidPoints, resCallback);
                    }
                    else {
                        console.log("snapPolylineEdge failed due to", returnCode);
                        contextObj.objiWhiz.stopSvgTrails(); //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                        contextObj.deHatchSingleObject(function (ret) {
                            resCallback(0);
                        });
                    }
                });
            }
            else if (target == 3) {
                contextObj.objiWhiz.snapPolylineEdge(firstSymbolHandle, secondHandle, startXPos, startYPos, endXPos, endYPos, snapDistance, blnInOrOut, function (returnCode, ActualPoints, IsOverlapping, SnappedAngle, MidPoints) {
                    if (returnCode == 0) {
                        contextObj.isNotFullyPlaced(mainTarget, IsOverlapping);
                        firstObjectAngle = Math.ceil(SnappedAngle);
                        contextObj.updateObjetDetailsAfterSnap(objectId, newSpaceId, endXPos, endYPos, strSpaceOrNetHandle, firstSymbolHandle, firstObjectAngle, MidPoints, resCallback);
                    }
                    else {
                        console.log("snapPolylineEdge failed due to", returnCode);
                        contextObj.objiWhiz.stopSvgTrails(); //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                        contextObj.deHatchSingleObject(function (ret) {
                            resCallback(0);
                        });
                    }
                });
            }
        };
        this.updateObjetDetailsAfterSnap = function (objectId, SpaceId, dblNewXPosition, dblNewYPosition, strSpaceOrNetHandle, firstSymbolHandle, firstObjectAngle, MidPoints, resCallback) {
            var contextObj = this;
            var points = MidPoints.split(contextObj.colDelimiter);
            if (points.length > 0) {
                dblNewXPosition = points[0];
                dblNewYPosition = points[1];
            }
            contextObj.deHatchSingleObject(function (ret) { });
            console.log("updateAssetsSymbolData", SpaceId, dblNewXPosition, dblNewYPosition, firstObjectAngle, contextObj.drawingId, contextObj.objectCategoryId, contextObj.siteId, objectId);
            contextObj.objectsDrawingService.updateAssetsSymbolData(9, SpaceId, dblNewXPosition, dblNewYPosition, firstObjectAngle, contextObj.drawingId, contextObj.objectCategoryId, contextObj.siteId, objectId, contextObj.isBuildingDrawing).subscribe(function (resultData) {
                if (resultData["Data"]["Message"] == "Success") {
                    contextObj.moveSymbolTextAndObjectDataText(objectId, firstSymbolHandle, function (retCode) {
                        contextObj.objiWhiz.setCursor(1);
                        contextObj.objiWhiz.stopSvgTrails(); //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                        contextObj.objiWhiz.regenerate();
                        var index = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === objectId; });
                        if (index != -1) {
                            contextObj.objectsData[index].SpaceId = SpaceId;
                            contextObj.objectsData[index].Xposition = dblNewXPosition;
                            contextObj.objectsData[index].Yposition = dblNewYPosition;
                        }
                        contextObj.objectsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
                            contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
                            resCallback(0, objectId);
                        });
                    });
                }
                else {
                    resCallback(1);
                }
            });
        };
        this.moveSymbolTextAndObjectDataText = function (objectId, selectedSymbolhandle, resCallback) {
            var contextObj = this;
            contextObj.objiWhiz.getEntityExtents(selectedSymbolhandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                if (retCode != 0) {
                    console.log("getEntityExtents faild due to ", retCode);
                    resCallback(1);
                }
                else {
                    contextObj.moveAssetText(objectId, MaxX, MaxY, function (retCode) {
                        if (retCode == 0) {
                            var index = contextObj.objectsSymbolTextHandleData.findIndex(function (el) { return el.Key === objectId; });
                            if (index != -1) {
                                var SymboltextHandle = contextObj.objectsSymbolTextHandleData.find(function (el) { return el.Key === objectId; }).Value;
                                if (SymboltextHandle != null && SymboltextHandle != "" && SymboltextHandle != undefined) {
                                    contextObj.objiWhiz.getEntityMidpoint(selectedSymbolhandle, function (rtCode, MidX, MidY) {
                                        if (rtCode == 0) {
                                            contextObj.moveAssetSymbolText(SymboltextHandle, MidX, MidY, function (retCode) {
                                                resCallback(0);
                                            });
                                        }
                                        else {
                                            resCallback(1);
                                        }
                                    });
                                }
                                else {
                                    resCallback(1);
                                }
                            }
                            else {
                                resCallback(1);
                            }
                        }
                        else {
                            resCallback(1);
                        }
                    });
                }
            });
        };
        this.objiWhiz = iWhizObject;
        this.drawingId = drawingId;
        this.moduleId = moduleId;
        this.isBuildingDrawing = IsBuildingDrawing;
        this.drawingCategoryId = drawingCategoryId;
        this.notificationServices = notificationService;
        this.pageTarget = pageTarget;
        this.http = http;
        this.xrefedDrawingId = xrefedDrawing;
        switch (this.moduleId) {
            case 6:
                this.featureId = "109,71";
                this.objectname = "Object";
                this.objectmultiplename = "Objects";
                this.objectCategoryId = 3;
                this.categoryId = 5; //displaysettings
                break;
            case 7:
                this.featureId = "105,72";
                this.objectname = "Asset";
                this.objectmultiplename = "Assets";
                this.objectCategoryId = 1;
                this.categoryId = 3;
                break;
            case 8:
                this.featureId = "107,73";
                this.objectname = "Furniture";
                this.objectmultiplename = "Furniture";
                this.objectCategoryId = 2;
                this.categoryId = 4;
                break;
            case 17:
                this.featureId = "113,92";
                this.objectname = "Component";
                this.objectmultiplename = "Components";
                this.objectCategoryId = 8;
                this.categoryId = 9;
                break;
            case 18:
                this.featureId = "115,100";
                this.objectname = "Component";
                this.objectmultiplename = "Components";
                this.objectCategoryId = 9;
                this.categoryId = 10;
                break;
            case 24:
                this.featureId = "151,228";
                this.objectname = "Equipment";
                this.objectmultiplename = "Equipments";
                this.objectCategoryId = 20;
                this.categoryId = 32;
                break;
            case 25:
                this.featureId = "229,130";
                this.objectname = "Component";
                this.objectmultiplename = "Components";
                this.objectCategoryId = 10;
                this.categoryId = 20;
                break;
            case 26:
                this.featureId = "131,140";
                this.objectname = "Component";
                this.objectmultiplename = "Components";
                this.objectCategoryId = 11;
                this.categoryId = 22;
                break;
            case 27:
                this.featureId = "141,150";
                this.objectname = "Component";
                this.objectmultiplename = "Components";
                this.objectCategoryId = 12;
                this.categoryId = 24;
                break;
            default:
                break;
        }
    }
    ObjectssOpenDrawing.prototype.getObjectColorpreferences = function () {
        var contextObj = this;
        var rptField = [];
        rptField.push({ ReportFieldId: 2620, Value: contextObj.objectCategoryId });
        contextObj.objectsDrawingService.getColorPreferenceDataForObjects("509", contextObj.moduleId.toString(), JSON.stringify(rptField), true).subscribe(function (resultData) {
            var colorPrefData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            var blinkColor = colorPrefData[0]['Color'];
            contextObj.legendColor = colorPrefData[1]['Color'];
            contextObj.objectSelectionColor = colorPrefData[2]['Color'];
            if (blinkColor != undefined) {
                contextObj.objiWhiz.colorIndexToRGB(blinkColor, function (retCode, Red, Green, Blue) {
                    if (retCode == 0) {
                        contextObj.blinkColorCodeR = Red;
                        contextObj.blinkColorCodeG = Green;
                        contextObj.blinkColorCodeB = Blue;
                    }
                    else
                        console.log("colorIndexToRGB failed due to", retCode);
                });
            }
        });
    };
    ObjectssOpenDrawing.prototype.getAutoNumberingAndBarcodeFeature = function (resCallback) {
        var contextObj = this;
        contextObj.objectsService.getCustomerSubscribedFeaturesBarcode(this.featureId).subscribe(function (rt) {
            rt["Data"].find(function (item) {
                switch (item.Id) {
                    case 71:
                    case 72:
                    case 73:
                    case 92:
                    case 100:
                    case 130:
                    case 140:
                    case 150:
                    case 228:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsAutoNumbering = true;
                        }
                        break;
                    case 105:
                    case 107:
                    case 109:
                    case 113:
                    case 115:
                    case 229:
                    case 131:
                    case 141:
                    case 151:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsBarcodeSubscribed = true;
                        }
                        break;
                }
            });
            resCallback();
        });
    };
    ObjectssOpenDrawing.prototype.getObjectEditFields = function (editObjectSelectedId, editObjectClassId, drawingId, isSymbolHandle, rescallBack) {
        var contextObj = this;
        var withPrefix = false;
        var withoutPrefix = false;
        var fieldDetailsAdd;
        contextObj.objectsService.getObjectDataEditFieldsList(contextObj.objectCategoryId, editObjectSelectedId, "edit", 2, 2, editObjectClassId.toString(), drawingId.toString(), "", 0, 0, 1, 1, contextObj.isBuildingDrawing).subscribe(function (result) {
            fieldDetailsAdd = result["Data"];
            var count = 0;
            fieldDetailsAdd.find(function (item) {
                switch (item.ReportFieldId) {
                    case 4303:
                        if (contextObj.IsBarcodeSubscribed == true) {
                            item.IsVisible = true;
                        }
                        else if (contextObj.IsBarcodeSubscribed == false) {
                            item.IsVisible = false;
                        }
                        count++;
                        break;
                    case 651:
                        if (item.FieldId == 1985) {
                            if (contextObj.IsAutoNumbering == false) {
                                item.IsVisible = true;
                                withoutPrefix = true;
                                if (withPrefix == true)
                                    item.FieldValue = "";
                            }
                            else {
                                item.IsVisible = false;
                            }
                        }
                        if (item.FieldId == 1605) {
                            item.IsEnabled = false;
                            if (contextObj.IsAutoNumbering == false) {
                                item.IsVisible = false;
                                if (withoutPrefix == true)
                                    item.FieldValue = "";
                            }
                            else {
                                withPrefix = true;
                                item.IsVisible = true;
                            }
                            var tagNoItem = fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 661; });
                            if (tagNoItem != undefined) {
                                if (contextObj.IsAutoNumbering == false)
                                    tagNoItem.IsMandatory = true;
                                else
                                    tagNoItem.IsVisible = false;
                                tagNoItem.FieldLabel = item.FieldLabel;
                            }
                        }
                        count++; //2 times execution
                        break;
                    case 657:
                        item.IsEnabled = false;
                        item.IsMandatory = true;
                        count++;
                        break;
                    case 7411:
                        item.IsMandatory = true;
                        //item.FieldValue = contextObj.siteId.toString();
                        //item.IsEnabled = false;
                        count++;
                        break;
                }
                if (count == 5) {
                    return true;
                }
                else
                    return false;
            });
            var classListOption;
            if (isSymbolHandle)
                classListOption = 1;
            else
                classListOption = 3;
            var index = fieldDetailsAdd.findIndex(function (el) { return el.ReportFieldId == 657; }); /*class*/
            contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, '', 1, classListOption, 0).subscribe(function (resultData) {
                fieldDetailsAdd[index].LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]); //class         
                rescallBack(fieldDetailsAdd);
            });
        });
    };
    ObjectssOpenDrawing.prototype.updateVariablesAfterDeleteOrRelink = function (ObjectId) {
        var indexobjectsHandlesData = this.objectsHandlesData.findIndex(function (el) { return el.AssetsId === ObjectId; });
        if (indexobjectsHandlesData != -1)
            this.objectsHandlesData.splice(indexobjectsHandlesData, 1);
        var indexobjectsSymbolTextHandleData = this.objectsSymbolTextHandleData.findIndex(function (el) { return el.AssetsId === ObjectId; });
        if (indexobjectsSymbolTextHandleData != -1)
            this.objectsSymbolTextHandleData.splice(indexobjectsSymbolTextHandleData, 1);
        var indexdataInDrawingTextHandles = this.dataInDrawingTextHandles.findIndex(function (el) { return el.Key === ObjectId; });
        if (indexdataInDrawingTextHandles != -1)
            this.dataInDrawingTextHandles.splice(indexdataInDrawingTextHandles, 1);
    };
    ObjectssOpenDrawing.prototype.deleteDelinkAfterBlockOrSymbolSelection = function (ObjectId, objectDataIndex, resCallback) {
        var contextObj = this;
        contextObj.updateVariablesAfterDeleteOrRelink(ObjectId);
        if (objectDataIndex != -1)
            contextObj.objectsData.splice(objectDataIndex, 1); //objectsData
        if (this.totalObjects != null && contextObj.totalObjects != undefined)
            contextObj.totalObjects = contextObj.totalObjects - 1;
        contextObj.deHatchObjects(function (retCode) {
            if (retCode == 0) {
                contextObj.objiWhiz.zoomExtents(function (ret) {
                    if (ret == 0)
                        resCallback(0);
                    else
                        resCallback(ret);
                });
            }
            else
                resCallback(retCode);
        });
    };
    ObjectssOpenDrawing.prototype.ShowConnectionBlink = function (primaryobjectIds, secondaryobjectIds, resCallback) {
        var contextObj = this;
        var primaryHandles = [];
        var secondaryHandles = [];
        primaryHandles.push(contextObj.getSymbolHandleFromObjectId(primaryobjectIds));
        for (var _i = 0, secondaryobjectIds_1 = secondaryobjectIds; _i < secondaryobjectIds_1.length; _i++) {
            var item = secondaryobjectIds_1[_i];
            secondaryHandles.push(contextObj.getSymbolHandleFromObjectId(item));
        }
        contextObj.objiWhiz.zoomExtents(function (ret) {
            contextObj.objiWhiz.blinkEntitiesByHandles(secondaryHandles, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (returnCode) {
                if (returnCode == 0) {
                    contextObj.objiWhiz.blinkEntitiesByHandles(primaryHandles, contextObj.blinkGreenColorCodeR, contextObj.blinkGreenColorCodeG, contextObj.blinkGreenColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (retu) {
                        resCallback(retu);
                    }(0));
                }
            });
        });
    };
    ObjectssOpenDrawing.prototype.getSpaceHandleFromObjectId = function (objectId) {
        ////debugger;
        var contextObj = this;
        var selectedSpacehandle = "";
        var index = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === objectId; });
        if (index != -1) {
            var spaceId = contextObj.objectsData[index]['SpaceId'];
            if (spaceId != null && spaceId != undefined && spaceId != 0) {
                selectedSpacehandle = this.spaceOpenDrawingObj.getHandleFromSpaceId(spaceId);
            }
        }
        return selectedSpacehandle;
    };
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    ObjectssOpenDrawing.prototype.hatchSingleObject = function (handle, resCallback) {
        var contextObj = this;
        contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists(contextObj.hatchObjectLayer, function (returnCode) {
            contextObj.objiWhiz.hatchEntity(contextObj.hatchObjectLayer, handle, contextObj.objectSelectionColor, 1, 1, 1, false, function (retCode, entityHandle) {
                contextObj.objiWhiz.setApplicationLayer(contextObj.hatchObjectLayer);
                if (retCode != 0)
                    console.log("hatchEntity failed due to ", retCode);
                resCallback(retCode);
            });
        });
    };
    ObjectssOpenDrawing.prototype.deHatchSingleObject = function (resCallback) {
        this.spaceOpenDrawingObj.deleteLayerAlredyExists(this.hatchObjectLayer, function (returnCode) {
            resCallback(returnCode);
        });
    };
    /*If x, y are null assign a co-ordinate to show the asset in the space */
    ObjectssOpenDrawing.prototype.displayNotProperlyLocatedAssets = function (xPosNullAssetData) {
        ////debugger;
        var contextObj = this;
        //var sortedxPosNullAssetData = [];
        //sortedxPosNullAssetData = xPosNullAssetData;
        var sortedxPosNullAssetData = xPosNullAssetData.sort(function (a, b) { return a.SpaceId - b.SpaceId; });
        var _loop_1 = function() {
            if (sortedxPosNullAssetData[i]['SpaceId'] != null) {
                var spaceId_1 = sortedxPosNullAssetData[i]['SpaceId'];
                // let spaceId = xPosNullAssetData[i]['SpaceId'];
                if (spaceId_1 != null && spaceId_1 != undefined) {
                    contextObj.commonDwgServices.calculateDwgRatio();
                    var previousSpaceId_1 = undefined;
                    /* let entityHandle: string = contextObj.getSpaceHandleViaSpaceId(spaceId);*/
                    if (i > 0)
                        previousSpaceId_1 = sortedxPosNullAssetData[i - 1]['SpaceId'];
                    /* previousSpaceId = sortedxPosNullEmpData[i]['AssignedSpaceId']; */
                    if (spaceId_1 != previousSpaceId_1) {
                        currentSpaceData = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId == spaceId_1; });
                        textInsertionX = currentSpaceData['TextInsertionX'];
                        textInsertionY = currentSpaceData['TextInsertionY'];
                        sortedxPosNullAssetData[i]['Xposition'] = textInsertionX;
                        sortedxPosNullAssetData[i]['Yposition'] = textInsertionY;
                    }
                    else {
                        previousSpaceData = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId == previousSpaceId_1; });
                        if (previousSpaceData != undefined) {
                            sortedxPosNullAssetData[i]['Xposition'] = sortedxPosNullAssetData[i - 1]['Xposition'] + (3 * contextObj.commonDwgServices.g_dblDwgRatio);
                            sortedxPosNullAssetData[i]['Yposition'] = sortedxPosNullAssetData[i - 1]['Yposition'];
                        }
                    }
                }
            }
        };
        var currentSpaceData, textInsertionX, textInsertionY, previousSpaceData;
        for (var i = 0; i < sortedxPosNullAssetData.length; i++) {
            _loop_1();
        }
        return sortedxPosNullAssetData;
    };
    //Move Single Asset
    ObjectssOpenDrawing.prototype.moveAssetInDrawingOnClick = function (resCallback) {
        //debugger;
        var contextObj = this;
        var intSpaceId = 0;
        var intClassId = 0;
        var intSymbolId = 0;
        var strSpaceHandle = "";
        var blnEditPermission = true;
        /* Taking userroldid and moduleadmin values from common */
        var g_intUserRoleId = contextObj.commonDwgServices.sessionUserRoleId;
        contextObj.g_blnModuleAdmin = contextObj.commonDwgServices.isModuleAdmin;
        /* If the drawing has assigned data */
        if (contextObj.objectsData) {
            // //debugger;
            if (contextObj.totalObjects == 0) {
                // If  g_intObjectCatIdFL = 20 Then  
                contextObj.notificationServices.ShowToaster("No " + contextObj.objectmultiplename + " are assigned to this floor", 2);
                //switch (contextObj.moduleId) {
                //    case 7:
                //        contextObj.notificationServices.ShowToaster("No Assets are assigned to this floor", 2);
                //        break;
                //    case 8:
                //        contextObj.notificationServices.ShowToaster("No Furniture are assigned to this floor", 2);
                //        break;
                //}
                resCallback(0);
            }
            else {
                // //debugger;
                /* If the drawing has assigned assets----
                select an asset --- getdwg point -- Get the symboldetails of the point where we clicked
                Get the details(spaceid,classid,symbolid etc of the symbol from our client side array --
                 */
                contextObj.objiWhiz.setCursor(12);
                contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
                    if (retCode == 0) {
                        contextObj.MoveObjectPermission(xPos, yPos, 1, function (retcode) {
                            var UserRoleId = contextObj.commonDwgServices.sessionUserRoleId;
                            if (((contextObj.drawingCategoryId == 1) && (retcode == null || retcode == undefined || retcode == 0)) || ((contextObj.drawingCategoryId != 1) && (retcode == 0))) {
                                {
                                    resCallback(1);
                                }
                            }
                            else {
                                //contextObj.objiWhiz.getSymbolWithDWGPoint(xPos, yPos, true, function (retCode, selectedSymbolhandle) {
                                contextObj.objiWhiz.getEntityWithDWGPoint(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntity, xPos, yPos, 12, function (retCode, selectedhandle) {
                                    if (retCode == 0) {
                                        var handles = [];
                                        handles = selectedhandle.split('§');
                                        handles.pop();
                                        contextObj.isBlockOrSymbolHandle(handles, function (handletype, selectedSymbolhandle) {
                                            if (handletype == 2)
                                                resCallback(2);
                                            else if (handletype == 1) {
                                                var index = contextObj.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle; });
                                                //debugger;
                                                if (index != -1) {
                                                    var assetsId = contextObj.objectsHandlesData[index].AssetsId;
                                                    var indexnew = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === assetsId; });
                                                    if (indexnew != -1) {
                                                        intSpaceId = contextObj.objectsData[indexnew].SpaceId;
                                                        intClassId = contextObj.objectsData[indexnew].ObjectClassId;
                                                        intSymbolId = contextObj.objectsData[indexnew].SymbolId;
                                                        if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
                                                            contextObj.blnIsSpace = false;
                                                        }
                                                        else {
                                                            contextObj.blnIsSpace = true;
                                                        }
                                                        /* Take space handle from spaceid  and check the edit permission for the selected space*/
                                                        contextObj.GetSpaceHandleFromSpaceId(intSpaceId, function (strSpaceOrNetHandle) {
                                                            if (strSpaceOrNetHandle != "") {
                                                                if (g_intUserRoleId > 3) {
                                                                    contextObj.checkEditPermissionforTheSelectedSpace(intSpaceId, function (blnEdit) {
                                                                        blnEditPermission = blnEdit;
                                                                        if ((g_intUserRoleId = 4) || (g_intUserRoleId = 7))
                                                                            blnEditPermission = false;
                                                                        else
                                                                            ((g_intUserRoleId == 6) && (contextObj.g_blnModuleAdmin == false));
                                                                        blnEditPermission = false;
                                                                    });
                                                                }
                                                                else {
                                                                    blnEditPermission = true;
                                                                }
                                                                //If no edit permission : show message like   no privilege to edit data */
                                                                //debugger;
                                                                if (blnEditPermission == false) {
                                                                    contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                                                    contextObj.objiWhiz.setCursor(1);
                                                                    contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                                                                    contextObj.objiWhiz.regenerate();
                                                                    resCallback(1);
                                                                }
                                                                else {
                                                                    //debugger;
                                                                    contextObj.hatchObject(selectedSymbolhandle, function (retCode) {
                                                                        if (retCode != 0) {
                                                                            resCallback(1);
                                                                        }
                                                                        else {
                                                                            //debugger;
                                                                            var rubx = [], ruby = [], rubz = [];
                                                                            rubx[0] = xPos;
                                                                            ruby[0] = yPos;
                                                                            rubz[0] = 0;
                                                                            contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                                                                            contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
                                                                            /* Call a function to moveobject : return code 0 means successfully moved */
                                                                            contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle, function (returnCode, spaceId, currentXCord, currentYCord, selectedSpaceHandle) {
                                                                                if (returnCode == 0) {
                                                                                    resCallback(0, assetsId);
                                                                                }
                                                                                else 
                                                                                /* if moveobject failed : then-dehatch the asset-disable rubberband-call regenerate function */ {
                                                                                    contextObj.notificationServices.ClearAllToasts();
                                                                                    contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                                                                    contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle, function (returnCode, spaceId, currentXCord, currentYCord, selectedSpaceHandle) {
                                                                                        if (returnCode == 0)
                                                                                            resCallback(0, assetsId);
                                                                                        else
                                                                                            resCallback(1);
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                            else {
                                                                /* If No strSpaceOrNetHandle */
                                                                //resCallback(1);
                                                                //code for utility without xref
                                                                contextObj.hatchObject(selectedSymbolhandle, function (retCode) {
                                                                    if (retCode != 0) {
                                                                        resCallback(1);
                                                                    }
                                                                    else {
                                                                        //debugger;
                                                                        var rubx = [], ruby = [], rubz = [];
                                                                        rubx[0] = xPos;
                                                                        ruby[0] = yPos;
                                                                        rubz[0] = 0;
                                                                        contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                                                                        contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
                                                                        /* Call a function to moveobject : return code 0 means successfully moved */
                                                                        contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle, function (returnCode, spaceId, currentXCord, currentYCord, selectedSpaceHandle) {
                                                                            if (returnCode == 0) {
                                                                                resCallback(0, assetsId);
                                                                            }
                                                                            else 
                                                                            /* if moveobject failed : then-dehatch the asset-disable rubberband-call regenerate function */ {
                                                                                contextObj.notificationServices.ClearAllToasts();
                                                                                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space. Select another space", 5);
                                                                                contextObj.InvokeMoveObject(assetsId, xPos, yPos, selectedSymbolhandle, function (returnCode, spaceId, currentXCord, currentYCord, selectedSpaceHandle) {
                                                                                    if (returnCode == 0)
                                                                                        resCallback(0, assetsId);
                                                                                    else
                                                                                        resCallback(1);
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        /* If the selected asset not with our clientside list */
                                                        resCallback(1);
                                                    }
                                                }
                                                else {
                                                    /* If the selected asset handle not with our clientside list */
                                                    resCallback(1);
                                                }
                                            }
                                            else
                                                resCallback(1);
                                        });
                                    }
                                    else {
                                        /* Not getting symbolhandle  : getSymbolWithDWGPoint or getEntityWithDWGPoint*/
                                        resCallback(1);
                                    }
                                });
                            }
                        });
                    }
                    else {
                        /*Not getting dwg point  :  getDWGPoint*/
                        resCallback(1);
                    }
                });
            }
        }
        else
            resCallback(0);
        //}
    };
    ObjectssOpenDrawing.prototype.getObjectDataFromObjectId = function (ObjectId) {
        var index = this.objectsData.findIndex(function (el) { return el['ObjectId'] == ObjectId; });
        var objectData = '';
        if (index != -1)
            objectData = this.objectsData[index];
        return objectData;
    };
    ObjectssOpenDrawing.prototype.moveObjectDBCall = function (SpaceId, NewxPos, NewyPos, objectId, spacehandle, resCallBak) {
        var contextObj = this;
        contextObj.deHatchObjects(function (retCode) {
            //var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === SpaceId });
            //var SiteId = "";
            //if (index != -1)
            //    SiteId = contextObj.spaceOpenDrawingObj.spaceData[index]['SiteId'];
            //else
            //    SiteId = contextObj.objectsData.find(function (item) { return item.ObjectId === objectId })["SiteId"];
            contextObj.objectsDrawingService.updateAssetsSymbolData(9, SpaceId, NewxPos, NewyPos, 0, contextObj.drawingId, contextObj.objectCategoryId, contextObj.siteId, objectId, contextObj.isBuildingDrawing).subscribe(function (resultData) {
                if (resultData["Data"]["Message"] == "Success") {
                    contextObj.objiWhiz.setCursor(1);
                    //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                    //contextObj.objiWhiz.regenerate();
                    contextObj.objiWhiz.stopSvgTrails();
                    var index = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === objectId; });
                    if (index != -1) {
                        contextObj.objectsData[index].Xposition = NewxPos;
                        contextObj.objectsData[index].Yposition = NewyPos;
                        if (SpaceId != 0) {
                            contextObj.objectsData[index].SpaceId = SpaceId;
                            //Update the space handle correctly,(Net customer and space customer) otherwise issue in show in drawing/zoom/delink
                            var spaceId = contextObj.objectsData.find(function (el) { return el.ObjectId === objectId; })['SpaceId'];
                            var dataitemIndex = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === spaceId; });
                            if (contextObj.blnIsSpace) {
                                if (dataitemIndex != -1) {
                                    contextObj.spaceOpenDrawingObj.spaceData[dataitemIndex].BomaHandle = spacehandle;
                                }
                            }
                            else {
                                if (dataitemIndex != -1) {
                                    contextObj.spaceOpenDrawingObj.spaceData[dataitemIndex].CarpetHandle = spacehandle;
                                }
                            }
                        }
                    }
                    /* calling the additional tooltip data value function for updating the additional tooltip */
                    contextObj.objectsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
                        contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
                        contextObj.notificationServices.ClearAllToasts();
                        contextObj.notificationServices.ShowToaster(contextObj.objectname + " moved", 3);
                        resCallBak(0);
                    });
                }
                else {
                    resCallBak(1);
                }
            });
            //}//space id not searched
            //else
            //    resCallBak(1);
        });
    };
    /* move multipe assets */
    ObjectssOpenDrawing.prototype.moveMultipleAssetInDrawingOnClick = function (floorid, resCallback) {
        var contextObj = this;
        var intSpaceId = 0;
        var intClassId = 0;
        var intSymbolId = 0;
        var strSpaceHandle = "";
        var blnEditPermission = true;
        var blnPermittedSpace = false;
        var symbolId = [];
        /* Taking userroldid and moduleadmin values from common */
        var g_intUserRoleId = contextObj.commonDwgServices.sessionUserRoleId;
        contextObj.g_blnModuleAdmin = contextObj.commonDwgServices.isModuleAdmin;
        if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
            contextObj.blnIsSpace = false;
        }
        else {
            contextObj.blnIsSpace = true;
        }
        /* If the drawing has assigned data */
        if (contextObj.objectsData) {
            //if (contextObj.totalObjects == 0) {
            //    // If  g_intObjectCatIdFL = 20 Then  
            //    contextObj.notificationServices.ShowToaster("No Assets are assigned to this floor", 3);
            //    resCallback(1);
            //}
            //else {
            /* If archetectural drawing */
            if (contextObj.drawingCategoryId == 1 || contextObj.hasXrefExists) {
                if (contextObj.msgcount == 0) {
                    contextObj.notificationServices.ShowToaster("Click to select/deselect " + contextObj.objectname + ". Right click to exit", 3);
                    //switch (contextObj.moduleId) {
                    //    case 7:
                    //        contextObj.notificationServices.ShowToaster("Click to select/deselect Asset. Right click to exit", 3);
                    //        break;
                    //    case 8:
                    //        contextObj.notificationServices.ShowToaster("Click to select/deselect Furniture. Right click to exit", 3);
                    //        break;
                    //}
                    contextObj.msgcount = 1;
                }
                contextObj.objiWhiz.setCursor(12);
                contextObj.objiWhiz.getDWGPoint(function (retCode, Xposition, Yposition) {
                    if (retCode == 0) {
                        contextObj.PlaceObjectPermission(Xposition, Yposition, 2, function (retcode) {
                            var UserRoleId = contextObj.commonDwgServices.sessionUserRoleId;
                            if (((contextObj.drawingCategoryId == 1) && (retcode == null || retcode == undefined || retcode == 0)) || ((contextObj.drawingCategoryId != 1) && (retcode == 0))) {
                                {
                                    contextObj.moveMultipleAssetInDrawingOnClick(floorid, resCallback);
                                }
                            }
                            else {
                                contextObj.objiWhiz.getHandleWithDWGPoint(Xposition, Yposition, contextObj.blnIsSpace, function (retCode, strSpaceHandle) {
                                    if (retCode == 0) {
                                        contextObj.objiWhiz.getEntityWithDWGPoint(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntity, Xposition, Yposition, 12, function (retCode, selectedhandle) {
                                            if (retCode == 0) {
                                                var handles = [];
                                                handles = selectedhandle.split('§');
                                                handles.pop();
                                                contextObj.isBlockOrSymbolHandle(handles, function (handletype, selectedSymbolhandle) {
                                                    if (handletype == 2) {
                                                        contextObj.notificationServices.ClearAllToasts();
                                                        contextObj.notificationServices.ShowToaster("Selected " + contextObj.objectname + " is a block. Only symbols can be moved", 3);
                                                        contextObj.moveMultipleAssetInDrawingOnClick(floorid, resCallback);
                                                    }
                                                    else if (handletype == 1) {
                                                        // contextObj.objiWhiz.getSymbolWithDWGPoint(Xposition, Yposition, true, function (rtCode, selectedSymbolhandle) {//if clicked point is a symbol or not
                                                        // if (rtCode != 0) {//if clicked point returns no symbol handle
                                                        ///* call recursive function */ 
                                                        //contextObj.notificationServices.ClearAllToasts();
                                                        //contextObj.notificationServices.ShowToaster("Select only the assets to be  moved", 3);
                                                        //contextObj.objiWhiz.setCursor(2);
                                                        //contextObj.moveMultipleAssetInDrawingOnClick(floorid, resCallback);
                                                        // }//if clicked point returns  symbol handle
                                                        // else {
                                                        contextObj.GetSpaceIdFromHandle(strSpaceHandle, function (SpaceId) {
                                                            /*check move outside space*/
                                                            //Checking space id to check whether the selected asset is from the same space as before                                                    
                                                            var spaceIdforchecking = "";
                                                            if (contextObj.multipleMoveData.length > 0)
                                                                spaceIdforchecking = contextObj.multipleMoveData[0].SpaceId;
                                                            else
                                                                spaceIdforchecking = SpaceId;
                                                            if (spaceIdforchecking == SpaceId) {
                                                                contextObj.hatchMultipleAsset(selectedSymbolhandle, function (retCode) {
                                                                    if (retCode == 0) {
                                                                        var dataitemIndex = contextObj.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle; });
                                                                        if (dataitemIndex != -1) {
                                                                            var intObjectId = contextObj.objectsHandlesData[dataitemIndex].AssetsId;
                                                                            //79560
                                                                            var isspliced = false;
                                                                            var moveindex = contextObj.multipleMoveData.findIndex(function (item) { return item.AssetsId === intObjectId; });
                                                                            if (moveindex > -1) {
                                                                                isspliced = true;
                                                                                contextObj.multipleMoveData.splice(moveindex, 1);
                                                                                contextObj.objiWhiz.removeMapsByHandle(selectedSymbolhandle + contextObj.rowDelimiter);
                                                                            }
                                                                            //end of bug related code 79560
                                                                            if (isspliced == false)
                                                                                contextObj.multipleMoveData.push({ AssetsId: intObjectId, SymbolHandle: selectedSymbolhandle, xPosition: Xposition, yPosition: Yposition, newxPosition: '', newyPosition: '', SpaceId: SpaceId }); /* push selected symbol details in array */
                                                                            contextObj.objiWhiz.setCursor(2);
                                                                            contextObj.moveMultipleAssetInDrawingOnClick(floorid, resCallback); //call recursive function
                                                                        }
                                                                    } //if hatch has issue
                                                                    else
                                                                        resCallback(1);
                                                                });
                                                            } //if the selected asset is not from the same space show message
                                                            else {
                                                                contextObj.notificationServices.ClearAllToasts();
                                                                switch (contextObj.moduleId) {
                                                                    case 7:
                                                                        contextObj.notificationServices.ShowToaster("This operation can be performed for Assets placed in a single space", 5);
                                                                        break;
                                                                    default:
                                                                        contextObj.notificationServices.ShowToaster("This operation can be performed for " + contextObj.objectname + "s placed in a single space", 5);
                                                                        break;
                                                                }
                                                                contextObj.moveMultipleAssetInDrawingOnClick(floorid, resCallback);
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        contextObj.notificationServices.ClearAllToasts();
                                                        contextObj.moveMultipleAssetInDrawingOnClick(floorid, resCallback);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        contextObj.notificationServices.ClearAllToasts();
                                        // contextObj.notificationServices.ShowToaster("This operation can be performed for Assets placed inside the polyline", 3);
                                        contextObj.moveMultipleAssetInDrawingOnClick(floorid, resCallback);
                                    }
                                });
                            }
                        });
                    } //-----------right click and move-------
                    else if (retCode == 8) {
                        /* call recursive function */
                        contextObj.afterSelectingObjects(floorid, resCallback);
                    }
                });
            }
            else {
                resCallback(1);
            }
        }
    };
    ObjectssOpenDrawing.prototype.afterSpaceCheckMultipleMove = function (Xposition, Yposition, SpaceHandlenew, spaceIddb, floorid, resCallback) {
        var contextObj = this;
        contextObj.objiWhiz.getEntityMidpoint(contextObj.multipleMoveData[0].SymbolHandle, function (rtCode, MidX, MidY) {
            var dblActualXDifference = Xposition - MidX;
            var dblActualYDifference = Yposition - MidY;
            contextObj.arraycount = contextObj.multipleMoveData.length;
            contextObj.multipleMoveIndex = 0;
            contextObj.checkSpaceOutside(SpaceHandlenew, contextObj.multipleMoveData[contextObj.multipleMoveIndex].AssetsId, contextObj.multipleMoveData[contextObj.multipleMoveIndex].xPosition, contextObj.multipleMoveData[contextObj.multipleMoveIndex].yPosition, dblActualXDifference, dblActualYDifference, contextObj.multipleMoveData[contextObj.multipleMoveIndex].SymbolHandle, spaceIddb, function (rCode) {
                if (rCode == 0) {
                    contextObj.updateNewpositionForMultiplemove(contextObj.multipleMoveData[contextObj.arraycount - 1].AssetsId, contextObj.multipleMoveData[contextObj.arraycount - 1].xPosition, contextObj.multipleMoveData[contextObj.arraycount - 1].yPosition, dblActualXDifference, dblActualYDifference, contextObj.multipleMoveData[contextObj.arraycount - 1].SymbolHandle, spaceIddb, contextObj.arraycount - 1, floorid, function (rCode) {
                        if (rCode == 0) {
                            //insert and show successful message
                            contextObj.notificationServices.ClearAllToasts();
                            contextObj.notificationServices.ShowToaster(contextObj.objectname + " moved", 3);
                            //switch (contextObj.moduleId) {
                            //    case 7:
                            //        contextObj.notificationServices.ShowToaster("Asset moved", 3);
                            //        break;
                            //    case 8:
                            //        contextObj.notificationServices.ShowToaster("Furniture moved", 3);
                            //        break;
                            //}
                            contextObj.multipleMoveData = [];
                            contextObj.objectsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
                                contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
                                resCallback(0);
                            });
                        }
                        else {
                            contextObj.notificationServices.ClearAllToasts();
                            contextObj.notificationServices.ShowToaster("There is some issues while moving, refresh the page and try again", 5);
                            resCallback(1);
                        }
                    });
                }
                else {
                    resCallback(-5, spaceIddb, floorid, dblActualXDifference, dblActualYDifference);
                }
            });
        });
    };
    ObjectssOpenDrawing.prototype.getAssetXYCordinates = function (AssetId) {
        var contextObj = this;
        var xpos;
        var ypos;
        xpos = contextObj.objectsData.find(function (el) { return el.ObjectId === AssetId; })['Xposition'];
        ypos = contextObj.objectsData.find(function (el) { return el.ObjectId === AssetId; })['Yposition'];
        return xpos + contextObj.colDelimiter + ypos;
        // return "(" + xPos + this.colDelimiter + yPos + ")";
    };
    /* delink asset : Start*/
    ObjectssOpenDrawing.prototype.delinkAsset = function (resCallback) {
        //debugger
        var contextObj = this;
        contextObj.objiWhiz.setCursor(2);
        contextObj.objiWhiz.getDWGPoint(function (retCode, Xposition, Yposition) {
            if (retCode == 0) {
                contextObj.objiWhiz.getSymbolWithDWGPoint(Xposition, Yposition, true, function (rtCode, selectedSymbolhandle) {
                    if (rtCode == 0) {
                        contextObj.hatchObject(selectedSymbolhandle, function (retCode) {
                            if (retCode == 0) {
                                contextObj.PlaceObjectPermission(Xposition, Yposition, 3, function (retcode) {
                                    var UserRoleId = contextObj.commonDwgServices.sessionUserRoleId;
                                    if (((contextObj.drawingCategoryId == 1) && (retcode == null || retcode == undefined || retcode == 0)) || ((contextObj.drawingCategoryId != 1) && (retcode == 0))) {
                                        contextObj.delinkAsset(resCallback);
                                    }
                                    else {
                                        var dataitemIndex = contextObj.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle; });
                                        if (dataitemIndex != -1) {
                                            var intObjectId = contextObj.objectsHandlesData[dataitemIndex].AssetsId;
                                            var indexnew = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === intObjectId; });
                                            if (indexnew != -1) {
                                                var ClassId = contextObj.objectsData[indexnew]["ObjectClassId"];
                                                var indexnew = contextObj.objectsData.findIndex(function (el) { return el.ObjectId === intObjectId; });
                                                if (indexnew != -1) {
                                                    contextObj.delinkObjects.push({ AssetsId: intObjectId, ClassId: ClassId });
                                                    resCallback(0);
                                                }
                                                else
                                                    resCallback(1);
                                            }
                                            else
                                                resCallback(1);
                                        }
                                        else
                                            resCallback(1);
                                    }
                                });
                            }
                            else
                                resCallback(1);
                        });
                    }
                    else
                        contextObj.delinkAsset(resCallback);
                });
            }
            else
                resCallback(1);
        });
    };
    ObjectssOpenDrawing.prototype.setDelinkObject = function (objectId, classId) {
        this.delinkObjects = [];
        this.delinkObjects.push({ AssetsId: objectId, ClassId: classId });
    };
    //Do you want to proceed with delink : Yes
    ObjectssOpenDrawing.prototype.delinkProgress = function (drawingId, resCallback) {
        var contextObj = this;
        var SymbolLayerName = "";
        var ObjectId = 0;
        var SiteId = "";
        // debugger
        if (contextObj.delinkObjects.length > 0) {
            var objectclassid = contextObj.delinkObjects[0].ClassId;
            ObjectId = contextObj.delinkObjects[0].AssetsId;
            SymbolLayerName = "$SL_" + objectclassid + "_" + ObjectId;
        }
        var spaceId = contextObj.objectsData.find(function (el) { return el.ObjectId == ObjectId; })['SpaceId'];
        var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId == spaceId; });
        if (index != -1) {
            SiteId = contextObj.spaceOpenDrawingObj.spaceData[index]['SiteId'];
        }
        var arr = new Array();
        //arr = JSON.parse(strsubmitField);
        arr.push({ ReportFieldId: 658, Value: "1" });
        if (contextObj.moduleId == 8)
            arr.push({ ReportFieldId: 659, Value: "14" });
        else
            arr.push({ ReportFieldId: 659, Value: "10" });
        arr.push({ ReportFieldId: 665, Value: "" });
        arr.push({ ReportFieldId: 666, Value: "" });
        arr.push({ ReportFieldId: 667, Value: "" });
        arr.push({ ReportFieldId: 668, Value: "" });
        arr.push({ ReportFieldId: 669, Value: "" });
        arr.push({ ReportFieldId: 7411, Value: SiteId.toString() });
        contextObj.objectsService.DelinkObjectSpaceData(JSON.stringify(arr), ObjectId, 0, contextObj.objectCategoryId, 1, 1, '', drawingId, '', 0, 0, 1, 1, contextObj.isBuildingDrawing).subscribe(function (resultData) {
            contextObj.DelinkSelectedassetonDrawing(ObjectId, "", SymbolLayerName, function (retcode) {
                contextObj.notificationServices.ClearAllToasts();
                switch (contextObj.moduleId) {
                    case 8:
                        contextObj.notificationServices.ShowToaster("Selected Furniture has been warehoused", 3);
                        break;
                    default:
                        contextObj.notificationServices.ShowToaster("Selected " + contextObj.objectname + " has been de-linked", 3);
                        break;
                }
                resCallback(ObjectId);
            });
            //contextObj.objiWhiz.deleteLayer(SymbolLayerName, function (retCode) {
            //    resCallback(retCode);
            //    contextObj.delinkObjects = [];
            //    contextObj.objiWhiz.regenerate();
            //    contextObj.deHatchObjects(function (retCode) {
            //        //debugger
            //        if (retCode == 0) {
            //            contextObj.objiWhiz.zoomExtents(function (ret) {
            //                if (ret == 0) {
            //                    contextObj.objectsDrawingService.getAssetsCount(contextObj.drawingId, contextObj.objectCategoryId).subscribe(function (result) {
            //                        contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
            //                        contextObj.notificationServices.ClearAllToasts();
            //                        switch (contextObj.moduleId) {
            //                            case 8:
            //                                contextObj.notificationServices.ShowToaster("Selected Furniture has been warehoused", 3);
            //                                break;
            //                            default:
            //                                contextObj.notificationServices.ShowToaster("Selected " + contextObj.objectname + " has been de-linked", 3);
            //                                break;
            //                        }
            //                        resCallback(0);
            //                    });
            //                }
            //                else
            //                    resCallback(1);
            //            });
            //        }
            //        else
            //            resCallback(1);
            //    });
            //});
        });
    };
    //Do you want to proceed with delink : No
    ObjectssOpenDrawing.prototype.delinkCancel = function (resCallback) {
        var contextObj = this;
        contextObj.deHatchObjects(function (retCode) {
            //debugger
            contextObj.delinkObjects = [];
            contextObj.notificationServices.ClearAllToasts();
            resCallback(0);
        });
    };
    //Do you want to proceed with delink : No
    ObjectssOpenDrawing.prototype.moveOutsideSpaceInProgress = function (spaceid, floorid, dblActualXDifference, dblActualYDifference, resCallback) {
        var contextObj = this;
        contextObj.updateNewpositionForMultiplemove(contextObj.multipleMoveData[contextObj.arraycount - 1].AssetsId, contextObj.multipleMoveData[contextObj.arraycount - 1].xPosition, contextObj.multipleMoveData[contextObj.arraycount - 1].yPosition, dblActualXDifference, dblActualYDifference, contextObj.multipleMoveData[contextObj.arraycount - 1].SymbolHandle, spaceid, contextObj.arraycount - 1, floorid, function (rCode) {
            if (rCode == 0) {
                //insert and show successful message
                contextObj.notificationServices.ClearAllToasts();
                contextObj.notificationServices.ShowToaster(contextObj.objectname + " moved", 3);
                //switch (contextObj.moduleId) {
                //    case 7:
                //        contextObj.notificationServices.ShowToaster("Asset moved", 3);
                //        break;
                //    case 8:
                //        contextObj.notificationServices.ShowToaster("Furniture moved", 3);
                //        break;
                //}
                contextObj.multipleMoveData = [];
                resCallback(0);
            }
            else {
                contextObj.notificationServices.ClearAllToasts();
                contextObj.notificationServices.ShowToaster("There is some issues while moving, refresh the page and try again", 5);
                resCallback(1);
            }
        });
    };
    //Do you want to proceed with delink : Yes
    ObjectssOpenDrawing.prototype.moveInsideSpaceInProgress = function (drawingId, resCallback) {
        //var contextObj = this;
        //var SymbolLayerName = "";
        //if (contextObj.delinkObjects.length > 0) {
        //    var objectclassid = contextObj.delinkObjects[0].ClassId;
        //    var ObjectId = contextObj.delinkObjects[0].AssetsId;
        //    SymbolLayerName = "$SL_" + objectclassid + "_" + ObjectId;
        //}
        //contextObj.objiWhiz.deleteLayer(SymbolLayerName, function (retCode) {
        //    resCallback(retCode);
        //    contextObj.delinkObjects = [];
        //    contextObj.objiWhiz.regenerate();
        //    contextObj.deHatchObjects(function (retCode) {
        //        //debugger
        //        if (retCode == 0) {
        //            contextObj.objiWhiz.zoomExtents(function (ret) {
        //                if (ret == 0) {
        //                    contextObj.objectsDrawingService.getAssetsCount(contextObj.drawingId).subscribe(function (result) {
        //                        contextObj.objectsDataCountClasswise = JSON.parse(result["Data"].FieldBinderData);
        //                        contextObj.notificationServices.ClearAllToasts();
        //                        contextObj.notificationServices.ShowToaster("Selected asset has been de-linked", 3);
        resCallback(0);
        //                    });
        //                }
        //                else
        //                    resCallback(1);
        //            });
        //        }
        //        else
        //            resCallback(1);
        //    });
        //});
    };
    /* delink asset : End*/
    ObjectssOpenDrawing.prototype.getSpaceIdFromSpaceHandle = function (strSpaceHandle) {
        // debugger;
        var contextObj = this;
        var spaceId;
        var index;
        if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
            contextObj.blnIsSpace = false;
        }
        else {
            contextObj.blnIsSpace = true;
        }
        // if (this.isSpace)
        if (contextObj.blnIsSpace)
            index = this.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.BomaHandle === strSpaceHandle; });
        else
            index = this.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.CarpetHandle === strSpaceHandle; });
        if (index != -1)
            spaceId = this.spaceOpenDrawingObj.spaceData[index]['SpaceId'];
        else
            spaceId = index;
        return spaceId;
    };
    ObjectssOpenDrawing.prototype.getAssetIdsArray = function (selectedMultipleSpaceIds) {
        var selectedIds = [];
        for (var _i = 0, selectedMultipleSpaceIds_1 = selectedMultipleSpaceIds; _i < selectedMultipleSpaceIds_1.length; _i++) {
            var spaceId = selectedMultipleSpaceIds_1[_i];
            for (var _a = 0, _b = this.objectsData; _a < _b.length; _a++) {
                var assetItem = _b[_a];
                if (assetItem['SpaceId'] == spaceId)
                    selectedIds.push(assetItem['ObjectId']);
            }
        }
        return selectedIds;
    };
    //}
    ObjectssOpenDrawing.prototype.searchInDrawing = function (searchData, resCallback) {
        var searchedSymbolhandle = [];
        // var selectedSpaceHandles:
        for (var _i = 0, searchData_1 = searchData; _i < searchData_1.length; _i++) {
            var assetitem = searchData_1[_i];
            var index = this.objectsHandlesData.findIndex(function (el) { return el.AssetsId == assetitem['ObjectId']; });
            if (index != -1)
                searchedSymbolhandle.push(this.objectsHandlesData[index]['SymbolHandle']);
        }
        this.objiWhiz.blinkEntitiesByHandles(searchedSymbolhandle, this.blinkColorCodeR, this.blinkColorCodeG, this.blinkColorCodeB, this.commonDwgServices.blinkSize, this.commonDwgServices.blinkDelay, function (returnCode) {
            resCallback();
        });
    };
    ObjectssOpenDrawing.prototype.ConnectComponents = function (recCallback) {
        var contextObj = this;
        contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntity, contextObj.cursorIndex, function (returnCode, entityHandles) {
            contextObj.handlesforblink = entityHandles;
            if (returnCode == 0) {
                var handleArray = entityHandles.split(contextObj.rowDelimiter);
                contextObj.FindBlockOrSymbolHandle(handleArray, recCallback);
            }
            else {
                console.log("connectivity failed due to ", returnCode);
                recCallback(returnCode, "");
            }
        });
    };
    ObjectssOpenDrawing.prototype.RemoveComponent = function (recCallback) {
        var contextObj = this;
        contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntity, contextObj.cursorIndex, function (returnCode, entityHandles) {
            if (returnCode == 0) {
                var handleArray = entityHandles.split(contextObj.rowDelimiter);
                contextObj.FindBlockOrSymbolHandle(handleArray, function (returnCode, objectId, classId) {
                    recCallback(returnCode, objectId, classId);
                });
            }
            else {
                console.log("connectivity failed due to ", returnCode);
            }
        });
    };
    ObjectssOpenDrawing.prototype.FindBlockOrSymbolHandle = function (entityHandles, recCallback) {
        if (entityHandles.length > 0 || entityHandles[0] != "") {
            var contextObj = this;
            var objectId, classId;
            var isSymbolHandle; // false blockhandle true symbpl handle
            contextObj.objiWhiz.getEntityType(entityHandles[0], function (ret, typeId) {
                if (ret == 0) {
                    if (typeId == 1) {
                        var index = contextObj.xRefHandles.findIndex(function (el) { return el == entityHandles[0]; });
                        if (index == -1) {
                            contextObj.handlesforblink = [entityHandles[0]];
                            var blockDetails = contextObj.getObjectIdObjectClassIdFromBlockRefHandle(entityHandles[0]);
                            if (blockDetails[0]['isExists']) {
                                classId = blockDetails[0]['objectClassId'];
                                objectId = blockDetails[0]['objectId'];
                            }
                            isSymbolHandle = false;
                            recCallback(ret, objectId, classId, entityHandles[0], isSymbolHandle);
                            return;
                        }
                    }
                    else if (typeId == 9) {
                        classId = contextObj.getobjectclassIdfromSymbolHandle(entityHandles[0]);
                        objectId = contextObj.getObjectIdFromSymbolHandle(entityHandles[0]);
                        if (classId != "" && objectId != "") {
                            contextObj.handlesforblink = [entityHandles[0]];
                            contextObj.handlesToRemoveblink = entityHandles[0];
                            isSymbolHandle = true;
                            recCallback(ret, objectId, classId, entityHandles[0], isSymbolHandle);
                            return;
                        }
                    }
                    entityHandles.splice(0, 1);
                    contextObj.FindBlockOrSymbolHandle(entityHandles, recCallback);
                }
                else {
                    console.log("getEntityType failed due to ", ret);
                    recCallback(ret, "");
                }
            });
        }
        else {
            recCallback(37, "");
        }
    };
    ObjectssOpenDrawing.prototype.GetObjectAssociationToHatch = function (objectIds, resCallback) {
        var contextObj = this;
        var Handles = [];
        for (var _i = 0, objectIds_1 = objectIds; _i < objectIds_1.length; _i++) {
            var item = objectIds_1[_i];
            var temp = contextObj.getSymbolHandleFromObjectId(item) == undefined ? contextObj.getBlockHandleFromObjectId(item) : contextObj.getSymbolHandleFromObjectId(item);
            Handles.push(temp);
        }
        contextObj.objiWhiz.zoomExtents(function (ret) {
            contextObj.objiWhiz.blinkEntitiesByHandles(Handles, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (returnCode) {
                resCallback(ret);
            });
        });
    };
    //GetBlinkForConnectivity(resCallback) {
    //    debugger
    //    var contextObj = this;
    //    contextObj.objiWhiz.zoomExtents(function (ret) {
    //        contextObj.objiWhiz.blinkEntitiesByHandles(contextObj.handlesforblink, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (returnCode) {
    //            debugger
    //            resCallback(ret);
    //        });
    //    });
    //}
    ObjectssOpenDrawing.prototype.gethandleFromObjectId = function (selectedObjectid) {
        var index = this.objectsHandlesData.findIndex(function (el) { return el.AssetsId === selectedObjectid; });
        var handle;
        if (index != -1) {
            handle = this.objectsHandlesData[index].SymbolHandle;
            if (handle == undefined || handle == null || handle == "")
                handle = this.objectsHandlesData[index].BlockHandle;
        }
        return handle;
    };
    /*To get objectId,objectClass from blockhandles*/
    ObjectssOpenDrawing.prototype.getObjectIdObjectClassIdFromBlockRefHandle = function (selectedBlockRefhandle) {
        var dataArray = [{ isExists: false, objectId: '', objectClassId: '' }];
        var index = this.objectsData.findIndex(function (el) { return el.BlockRefHandle === selectedBlockRefhandle; });
        if (index != -1) {
            dataArray[0].isExists = true;
            dataArray[0].objectId = this.objectsData[index].ObjectId;
            dataArray[0].objectClassId = this.objectsData[index].ObjectClassId;
        }
        return dataArray;
    };
    /*To get objectId from blockhandles*/
    ObjectssOpenDrawing.prototype.getObjectIdFromBlockRefHandle = function (selectedBlockRefhandle) {
        var index = this.objectsData.findIndex(function (el) { return el.BlockRefHandle === selectedBlockRefhandle; });
        var objectId;
        if (index != -1)
            objectId = this.objectsData[index].ObjectId;
        return objectId;
    };
    /*To get objectId from blockhandles*/
    ObjectssOpenDrawing.prototype.getObjectClassIdFromBlockRefHandle = function (selectedBlockRefhandle) {
        var index = this.objectsData.findIndex(function (el) { return el.BlockRefHandle === selectedBlockRefhandle; });
        var objectClassId;
        if (index != -1)
            objectClassId = this.objectsData[index].ObjectClassId;
        return objectClassId;
    };
    /*To get objectId from SymbolHandle*/
    ObjectssOpenDrawing.prototype.getObjectIdFromSymbolHandle = function (selectedSymbolhandle) {
        var index = this.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle; });
        var objectId;
        if (index != -1)
            objectId = this.objectsHandlesData[index].AssetsId;
        return objectId;
    };
    /*To get SymbolHandle from objectId*/
    ObjectssOpenDrawing.prototype.getSymbolHandleFromObjectId = function (objectId) {
        var index = this.objectsHandlesData.findIndex(function (el) { return el.AssetsId === objectId; });
        var SymbolHandle = [];
        if (index != -1) {
            SymbolHandle = this.objectsHandlesData[index].SymbolHandle;
        }
        return SymbolHandle;
    };
    /*To get BlockHandle from objectId*/
    ObjectssOpenDrawing.prototype.getBlockHandleFromObjectId = function (objectId) {
        var index = this.objectsHandlesData.findIndex(function (el) { return el.AssetsId === objectId; });
        var BlockHandle = [];
        if (index != -1)
            BlockHandle = this.objectsHandlesData[index].BlockHandle;
        return BlockHandle;
    };
    /*To get objectclassId from ObjectId*/
    ObjectssOpenDrawing.prototype.getobjectclassIdfromObjectId = function (objectId) {
        var objectclassId;
        var dataitemIndex = this.objectsData.findIndex(function (el) { return el.ObjectId === objectId; });
        if (dataitemIndex != -1) {
            objectclassId = this.objectsData[dataitemIndex].ObjectClassId;
        }
        return objectclassId;
    };
    /*To get objectclassId from SymbolHandle*/
    ObjectssOpenDrawing.prototype.getobjectclassIdfromSymbolHandle = function (selectedSymbolhandle) {
        var index = this.objectsHandlesData.findIndex(function (el) { return el.SymbolHandle === selectedSymbolhandle; });
        var objectId;
        var objectclassId;
        if (index != -1) {
            objectId = this.objectsHandlesData[index].AssetsId;
            var dataitemIndex = this.objectsData.findIndex(function (el) { return el.ObjectId === objectId; });
            if (dataitemIndex != -1) {
                objectclassId = this.objectsData[dataitemIndex].ObjectClassId;
            }
        }
        return objectclassId;
    };
    ObjectssOpenDrawing.prototype.getSpaceDetailsfromobjectid = function (objectid) {
        var Space = "";
        var spaceId = this.objectsData.find(function (el) { return el.ObjectId === objectid; })['SpaceId'];
        if (spaceId != undefined) {
            var index = this.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === spaceId; });
            if (index != -1) {
                Space = this.spaceOpenDrawingObj.spaceData[index]; //;
            }
        }
        return Space;
    };
    ObjectssOpenDrawing.prototype.getSpaceIdFromBlockHandle = function (handle, isSymbolHandle, objectId, resCallback) {
        var contextObj = this;
        var selectedSpaceId = 0;
        if (isSymbolHandle) {
            selectedSpaceId = this.objectsData.find(function (el) { return el.ObjectId === objectId; })['SpaceId'];
            resCallback(selectedSpaceId);
        }
        else {
            if (contextObj.drawingCategoryId == 1 || (contextObj.drawingCategoryId != 1 && contextObj.xrefedDrawingId != 0)) {
                contextObj.objiWhiz.getEntityMidpoint(handle, function (returnCode, xPos, yPos) {
                    if (returnCode == 0) {
                        contextObj.spaceOpenDrawingObj.getSpaceIdFromXYPoints(xPos, yPos, function (spaceId) {
                            selectedSpaceId = spaceId;
                            resCallback(selectedSpaceId);
                        });
                    }
                    else {
                        console.log("getEntityMidpoint failed due to ", returnCode);
                    }
                });
            }
            else {
                resCallback(selectedSpaceId);
            }
        }
    };
    ObjectssOpenDrawing.prototype.isBlockRefhandleExists = function (blockRefHandle) {
        var isExists = false;
        var index = this.objectsData.findIndex(function (el) { return el.BlockRefHandle == blockRefHandle; });
        if (index != -1)
            isExists = true;
        return isExists;
    };
    ObjectssOpenDrawing.prototype.getSpaceHandlefromXY = function (objectdata, count, spacehandlearray, rescallback) {
        var contextObj = this;
        if (objectdata.length > count) {
            var xpos = objectdata[count].Xposition;
            var ypos = objectdata[count].Yposition;
            this.objiWhiz.getHandleWithDWGPoint(xpos, ypos, contextObj.isSpace, function (retcode, spacehandle) {
                if (retcode == 0) {
                    spacehandlearray.push({ Key: objectdata[count].ObjectId, Value: spacehandle });
                }
                else {
                    console.log('getHandleWithDWGPoint failed due to ', retcode);
                    if (objectdata[count]["SpaceId"]) {
                        contextObj.GetSpaceHandleFromSpaceId(objectdata[count]["SpaceId"], function (spacehandlefromspace) {
                            spacehandlearray.push({ Key: objectdata[count].ObjectId, Value: spacehandlefromspace });
                        });
                    }
                    else
                        spacehandlearray.push({ Key: objectdata[count].ObjectId, Value: "" });
                }
                count++;
                contextObj.getSpaceHandlefromXY(objectdata, count, spacehandlearray, rescallback);
            });
        }
        else {
            rescallback(spacehandlearray);
        }
    };
    ObjectssOpenDrawing.prototype.updateAttachmentCount = function (objectId) {
        var index = this.objectsData.findIndex(function (el) { return el.ObjectId == objectId; });
        if (index != -1) {
            if (this.objectsData[index]["Attachments"] != "None")
                this.objectsData[index]["Attachments"] = this.objectsData[index]["Attachments"] + 1;
            else
                this.objectsData[index]["Attachments"] = 1;
            this.objectsEditReflectInDrawing(this.objectsData[index], function (ret) { });
        }
    };
    ObjectssOpenDrawing.prototype.isNotFullyPlaced = function (mainTarget, IsOverlapping) {
        if (mainTarget == 1 && IsOverlapping) {
            this.notificationServices.ClearAllToasts();
            this.notificationServices.ShowToaster(this.objectname + " is not fully placed inside the space", 2);
        }
    };
    ObjectssOpenDrawing.prototype.enableRubberband = function (xPos, yPos) {
        var rubx = [], ruby = [], rubz = [];
        rubx[0] = xPos;
        ruby[0] = yPos;
        rubz[0] = 0;
        this.objiWhiz.dwgToClient(rubx, ruby, rubz);
        this.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
    };
    return ObjectssOpenDrawing;
}());
exports.ObjectssOpenDrawing = ObjectssOpenDrawing;
//# sourceMappingURL=objectsopendrawing.services.js.map
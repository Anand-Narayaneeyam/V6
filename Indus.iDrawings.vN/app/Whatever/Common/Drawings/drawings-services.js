var General_1 = require('../../../Models/Common/General');
var opendrawing_services_1 = require('../../../models/common/opendrawing.services');
var General_2 = require('../../../Models/Common/General');
var CommonDrawings = (function () {
    function CommonDrawings(iWhizObject, http, drawingModuleId, dwgId, IsBuildingDrawing) {
        this.iWhizObject = iWhizObject;
        this.drawingModuleId = drawingModuleId;
        this.sessionUserCatId = 0;
        this.sessionUserRoleId = 0;
        this.sessionUserId = 0;
        this.sessionCustomerId = 0;
        this.g_intLegendTextSize = 3;
        this.g_intTextSize = 3;
        this.g_intLegentScale = 1;
        this.g_intSpaceDataTextAngle = 0;
        this.g_intSpaceDataTextWidth = 1;
        this.g_strTextFaceName = "Arial";
        this.g_strTextStyleName = "";
        this.blnStyleExists = false;
        this.g_strDistributionType = 1;
        this.g_intDistLineWidth = 0;
        this.g_intDistLineType = "";
        this.g_intDistLineTypeScale = 1;
        this.g_strSpaceDataTextLegendStyleId = 7;
        this.g_strDefaultFontStyles = "SIMPLEX" + this.rowDelimiter + "ROMANS" + this.rowDelimiter + "ROMAND" + this.rowDelimiter + "STANDARD";
        this.g_arrDefaultFontStyles = this.g_strDefaultFontStyles.split(this.rowDelimiter);
        this.isSpace = true;
        this.blinkSize = 10;
        this.blinkDelay = 500;
        this.isSiteAdmin = false;
        this.enableEmpandSched = [];
        this.isSeatBookingEnabled = false;
        this.isRoomBookingEnabled = false;
        this.isResoureFeatureEnabled = false;
        this.isApprovalForEmpAssignInDrawingEnabled = false;
        this.isApprovalForEmpMoveInDrawingEnabled = false;
        this.isMoveTextEnabled = false;
        this.IsSiteAdmin = false;
        this.isBuildingDrawing = false;
        this.IsPlotInDrawing = false;
        this.isCopyPasteEnabled = false;
        this.isSnapEnabled = false;
        this.isWOModuleEnabled = false;
        this.initilizeObjects = function (resCallback) {
            var contextObj = this;
            contextObj.opendrawingService = new opendrawing_services_1.OpendrawingService(contextObj.http);
            contextObj.generalFunctions = new General_2.GeneralFunctions();
            contextObj.opendrawingService.getiDrawingLayers().subscribe(function (resultData) {
                console.log("datadata", contextObj.iDrawinsLayers = resultData);
                contextObj.spacelayerName = contextObj.iDrawinsLayers[0]["Space Layer Name"];
                contextObj.constructionLayerName = contextObj.iDrawinsLayers[0]["External Wall Layer Name"];
                contextObj.netLayername = contextObj.iDrawinsLayers[0]["Net Layer Name"];
                contextObj.grossLayername = contextObj.iDrawinsLayers[0]["Gross Layer Name"];
                contextObj.opendrawingService.getMandatoryLayers(contextObj.moduleId).subscribe(function (resultData) {
                    // if(contextObj.generalFunctions.checkForUnhandledErrors(resultData)){
                    contextObj.mandatoryLayers = resultData;
                    contextObj.opendrawingService.getDrawingDetails(contextObj.drawingId, contextObj.isBuildingDrawing).subscribe(function (resultData) {
                        //    if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                        contextObj.drawingDetails = resultData["Data"][0];
                        contextObj.opendrawingService.getCustomerSettings().subscribe(function (resultData) {
                            // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            var jsonobject = resultData["Data"];
                            contextObj.customerSettings = jsonobject;
                            if (jsonobject) {
                                for (var i = 0; i < jsonobject.length; i++) {
                                    switch (resultData["Data"][i]["Id"]) {
                                        case 7:
                                            var isPerimeterEnabled = resultData["Data"][i]["IsSubscribed"];
                                        case 8:
                                            contextObj.isNetAreaAllowed = resultData["Data"][i]["IsSubscribed"];
                                            break;
                                        case 11:
                                            var isBoundingPolygonEnabled = resultData["Data"][i]["IsSubscribed"];
                                            break;
                                        case 29:
                                            var isNetAreaEnabled = resultData["Data"][i]["IsSubscribed"];
                                            break;
                                        case 31:
                                            //  debugger
                                            contextObj.g_IsNetCustomer = resultData["Data"][i]["FeatureLookupId"] == "1" ? false : true;
                                            if (contextObj.g_IsNetCustomer)
                                                contextObj.isSpace = false;
                                            break;
                                        case 32:
                                            contextObj.DrawingUnitId = jsonobject[i]["FeatureLookupId"] == "3" ? 1 : 2;
                                            break;
                                        case 42:
                                            contextObj.isMoveTextEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 189:
                                            contextObj.isSiteAdmin = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 186:
                                            contextObj.isRoomBookingEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 187:
                                            contextObj.isSeatBookingEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 190:
                                            contextObj.isApprovalForEmpMoveInDrawingEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 195:
                                            contextObj.isResoureFeatureEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 192:
                                            contextObj.isApprovalForEmpAssignInDrawingEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 189:
                                            contextObj.IsSiteAdmin = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 285:
                                            contextObj.IsPlotInDrawing = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 49:
                                            if (contextObj.moduleId == 6)
                                                contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 51:
                                            if (contextObj.moduleId == 7)
                                                contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 53:
                                            if (contextObj.moduleId == 8)
                                                contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 80:
                                            if (contextObj.moduleId == 16)
                                                contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 88:
                                            if (contextObj.moduleId == 17)
                                                contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 96:
                                            if (contextObj.moduleId == 18)
                                                contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 224:
                                            if (contextObj.moduleId == 24)
                                                contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 126:
                                            if (contextObj.moduleId == 25)
                                                contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 136:
                                            if (contextObj.moduleId == 26)
                                                contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 146:
                                            if (contextObj.moduleId == 27)
                                                contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 17:
                                            if (contextObj.moduleId == 7)
                                                contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 19:
                                            if (contextObj.moduleId == 6)
                                                contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 21:
                                            if (contextObj.moduleId == 8)
                                                contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 78:
                                            if (contextObj.moduleId == 16)
                                                contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 86:
                                            if (contextObj.moduleId == 17)
                                                contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 94:
                                            if (contextObj.moduleId == 18)
                                                contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 222:
                                            if (contextObj.moduleId == 24)
                                                contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 124:
                                            if (contextObj.moduleId == 25)
                                                contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 134:
                                            if (contextObj.moduleId == 26)
                                                contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                        case 144:
                                            if (contextObj.moduleId == 27)
                                                contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                            break;
                                    }
                                }
                            }
                            contextObj.opendrawingService.getSessionData().subscribe(function (data) {
                                var retData = data["Data"];
                                contextObj.sessionCustomerId = retData["CustomerId"];
                                contextObj.sessionUserId = retData["UserId"];
                                contextObj.sessionUserCatId = retData["UserCategoryId"];
                                contextObj.sessionUserRoleId = retData["UserRoleId"];
                                contextObj.getCustomerSettings();
                                contextObj.opendrawingService.getIsModuleAdmin(contextObj.moduleId).subscribe(function (data) {
                                    contextObj.isModuleAdmin = data["Data"];
                                    contextObj.opendrawingService.getAccessibleModuleForUser().subscribe(function (resultData) {
                                        contextObj.enableEmpandSched = resultData["Data"].filter(function (item) {
                                            return (item.ModuleId == 5 || item.ModuleId == 14);
                                        });
                                        if (resultData["Data"].findIndex(function (el) { return el.ModuleId == 9; }) != -1)
                                            contextObj.isWOModuleEnabled = true;
                                        resCallback(0);
                                    });
                                });
                            });
                            //  }
                        });
                        // }
                    });
                    // }
                });
            });
            //  this.getFontStyles();
        };
        this.getFontStyles = function (resCallback) {
            var contextObj = this;
            var arrstyleNames = [];
            contextObj.objiWhiz.getAllTextStyles(function (retCode, styleNames) {
                if (retCode == 0) {
                    if (styleNames != "") {
                        arrstyleNames = styleNames.split(contextObj.rowDelimiter);
                        var _loop_1 = function(layerName) {
                            var styleNameExists = contextObj.g_arrDefaultFontStyles.some(function (el) { return el === layerName; });
                            if (styleNameExists) {
                                contextObj.g_strTextStyleName = layerName;
                                contextObj.blnStyleExists = true;
                                resCallback(0);
                                return "break";
                            }
                        };
                        for (var _i = 0, arrstyleNames_1 = arrstyleNames; _i < arrstyleNames_1.length; _i++) {
                            var layerName = arrstyleNames_1[_i];
                            var state_1 = _loop_1(layerName);
                            if (state_1 === "break") break;
                        }
                        if (contextObj.blnStyleExists == false) {
                            contextObj.g_strTextStyleName = arrstyleNames[0];
                            resCallback(0);
                        }
                    }
                    else {
                        contextObj.objiWhiz.addTextStyle(contextObj.g_strTextStyleName, contextObj.g_strTextFaceName, false, false, function (retCode) {
                            resCallback(0);
                        });
                    }
                }
                else
                    console.log("getAllTextStyles failed due to", retCode);
            });
        };
        this.getExtentPoints = function (resCallback) {
            var contextObj = this;
            var strGrossHandle = [];
            console.log("contextObj.grossLayername", contextObj.grossLayername);
            contextObj.objiWhiz.getAllPolylines(contextObj.grossLayername, function (returnCode, ClosedEntityHandles, OpenEntityHandles, OtherEntityHandles) {
                if (returnCode == 0) {
                    console.log("ClosedEntityHandles", ClosedEntityHandles);
                    strGrossHandle = ClosedEntityHandles.split(contextObj.rowDelimiter);
                    contextObj.grossHandle = strGrossHandle[0];
                    contextObj.objiWhiz.getEntityExtents(strGrossHandle[0], function (retCode, MinX, MinY, MaxX, MaxY) {
                        if (retCode != 0) {
                            console.log("getEntityExtents faild due to ", retCode);
                            resCallback(0);
                        }
                        else {
                            console.log("MinX, MinY, MaxX, MaxY", MinX, MinY, MaxX, MaxY);
                            contextObj.dwgExtentsX = MaxX;
                            contextObj.dwgExtentsY = MaxY;
                            resCallback(0);
                        }
                    });
                }
                else
                    console.log("getAllPolylines failed due to", returnCode);
            });
            //var points = [];
            //contextObj.objiWhiz.getDWGExtents(points);
            //contextObj.dwgExtentsX = points[2];
            //contextObj.dwgExtentsY = points[3];
            //resCallback(0);
        };
        this.getDrawingDetails = function (resCallback) {
            var contextObj = this;
            this.opendrawingService.getDrawingDetails(this.drawingId).subscribe(function (resultData) {
                if (contextObj.generalFunctions.checkForUnhandledErrors(resultData["Data"])) {
                    resCallback(resultData["Data"][0]);
                }
            });
        };
        var contextObj = this;
        contextObj.http = http;
        contextObj.objiWhiz = iWhizObject;
        var layerName = [];
        contextObj.drawingId = dwgId;
        contextObj.delimiter = new General_1.Delimeter();
        contextObj.columnDelimiter = contextObj.delimiter.ColumnDelimeter;
        contextObj.rowDelimiter = contextObj.delimiter.RowDelimeter;
        contextObj.moduleId = drawingModuleId;
        contextObj.isBuildingDrawing = IsBuildingDrawing;
        console.log("objiwhiz123", this.objiWhiz);
    }
    CommonDrawings.prototype.getCustomerSettings = function () {
        var contextObj = this;
        if (contextObj.DrawingUnitId == 1) {
            contextObj.dwgConverstionRatio = 1;
            contextObj.dwgAreaConvertionValue = 144;
            contextObj.distanceConvertionValue = 12;
            contextObj.areaTolerance = 0.5;
            contextObj.areaUnit = "Sq. Ft.";
            contextObj.perimeterUnit = "Ft.";
        }
        else {
            contextObj.areaUnit = "Sq. Mt.";
            contextObj.perimeterUnit = " m ";
            contextObj.dwgConverstionRatio = 25.4;
            contextObj.distanceConvertionValue = 1000;
            contextObj.dwgAreaConvertionValue = 1000000;
            contextObj.areaTolerance = 0.04645152;
        }
    };
    CommonDrawings.prototype.calculateDwgRatio = function () {
        var ratio = [0];
        var contextObj = this;
        contextObj.objiWhiz.clientDWGAreaRatio(ratio);
        contextObj.g_dblDwgRatio = ratio[0];
        contextObj.g_intLegendTextSize = (contextObj.g_intTextSize * contextObj.g_intLegentScale * (ratio[0]));
    };
    return CommonDrawings;
}());
exports.CommonDrawings = CommonDrawings;
//# sourceMappingURL=drawings-services.js.map
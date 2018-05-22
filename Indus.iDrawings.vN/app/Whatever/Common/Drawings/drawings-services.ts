import { Injectable } from '@angular/core';
import {HttpHelpers} from '../../../Whatever/utils/HttpHelpers';
import { Http } from '@angular/http';
import {Delimeter} from '../../../Models/Common/General';
import {OpendrawingService} from '../../../models/common/opendrawing.services';
import { GeneralFunctions} from '../../../Models/Common/General';
export class CommonDrawings {
    objiWhiz: any;

    sessionUserCatId = 0;
    sessionUserRoleId = 0;
    sessionUserId = 0; 
    sessionCustomerId = 0;
    g_intLegendTextSize: number = 3;
    g_intTextSize: number = 3;
    g_intLegentScale: number = 1;
    g_dblDwgRatio: number;
    public delimiter: any;
    // default layers  
    spacelayerName: string;
    constructionLayerName: string;
    netLayername: string;
    grossLayername: string;
    grossHandle: string;
    opendrawingService: any;
    generalFunctions: GeneralFunctions;
    iDrawinsLayers: any;
    mandatoryLayers: any;
    rowDelimiter: any;
    columnDelimiter: any;
    dwgExtentsX: number;
    dwgExtentsY: number;

    g_intSpaceDataTextAngle: number = 0;
    g_intSpaceDataTextWidth: number = 1;
    g_strTextFaceName: string = "Arial";
    g_strTextStyleName: string = "";
    blnStyleExists: boolean = false;
    g_strDistributionType = 1;
    g_intDistLineWidth = 0;
    g_intDistLineType = "";
    g_intDistLineTypeScale = 1;
    g_strSpaceDataTextLegendStyleId = 7;

    DrawingUnitId: number;
    drawingDetails: any;
    drawingId: number;
    customerSettings: any; // for customer settings values
    dwgConverstionRatio: number;
    dwgAreaConvertionValue: number;
    areaTolerance: number;
    areaUnit: string;
    perimeterUnit: string;
    g_IsNetCustomer: boolean;
    isNetAreaAllowed: boolean;
    g_strCustomerDWGUnit: number;
    g_strDefaultFontStyles: string = "SIMPLEX" + this.rowDelimiter + "ROMANS" + this.rowDelimiter + "ROMAND" + this.rowDelimiter + "STANDARD";
    g_arrDefaultFontStyles = this.g_strDefaultFontStyles.split(this.rowDelimiter);
    http: any;
    moduleId: number;
    isSpace: boolean = true;
    isModuleAdmin: boolean;
    blinkSize:number = 10;
    blinkDelay: number = 500;
    distanceConvertionValue: number;
    isSiteAdmin: boolean = false;
    enableEmpandSched = [];
    isSeatBookingEnabled: boolean = false;
    isRoomBookingEnabled: boolean = false;
    isResoureFeatureEnabled: boolean = false;
    isApprovalForEmpAssignInDrawingEnabled: boolean = false;
    isApprovalForEmpMoveInDrawingEnabled: boolean = false;
    isMoveTextEnabled: boolean = false;
    IsSiteAdmin: boolean = false;
    isBuildingDrawing: boolean = false; 
    IsPlotInDrawing: boolean = false;
    isCopyPasteEnabled: boolean = false;
    isSnapEnabled: boolean = false;
    isWOModuleEnabled: boolean = false;
    constructor(private iWhizObject: any, http: Http, private drawingModuleId: number, dwgId: number, IsBuildingDrawing: boolean) {
        let contextObj = this;
        contextObj.http = http;
        contextObj.objiWhiz = iWhizObject;
        let layerName = [];
        contextObj.drawingId = dwgId;
        contextObj.delimiter = new Delimeter();
        contextObj.columnDelimiter = contextObj.delimiter.ColumnDelimeter;
        contextObj.rowDelimiter = contextObj.delimiter.RowDelimeter;
        contextObj.moduleId = drawingModuleId;
        contextObj.isBuildingDrawing = IsBuildingDrawing;
        console.log("objiwhiz123", this.objiWhiz);
    }
    initilizeObjects = function(resCallback) {

        let contextObj = this;
      
        contextObj.opendrawingService = new OpendrawingService(contextObj.http);
        contextObj.generalFunctions = new GeneralFunctions();

        contextObj.opendrawingService.getiDrawingLayers().subscribe
            (resultData => {
                console.log("datadata", contextObj.iDrawinsLayers = resultData)
                contextObj.spacelayerName = contextObj.iDrawinsLayers[0]["Space Layer Name"];
                contextObj.constructionLayerName = contextObj.iDrawinsLayers[0]["External Wall Layer Name"];
                contextObj.netLayername = contextObj.iDrawinsLayers[0]["Net Layer Name"];
                contextObj.grossLayername = contextObj.iDrawinsLayers[0]["Gross Layer Name"];
                contextObj.opendrawingService.getMandatoryLayers(contextObj.moduleId).subscribe
                    (resultData => {                      
                      // if(contextObj.generalFunctions.checkForUnhandledErrors(resultData)){
                        contextObj.mandatoryLayers = resultData;
                        contextObj.opendrawingService.getDrawingDetails(contextObj.drawingId, contextObj.isBuildingDrawing).subscribe
                            (resultData => {
                            //    if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.drawingDetails = resultData["Data"][0];
                                contextObj.opendrawingService.getCustomerSettings().subscribe
                                    (resultData => {
                                       // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                            var jsonobject = resultData["Data"];
                                            contextObj.customerSettings = jsonobject;
                                            if (jsonobject) {
                                                for (let i = 0; i < jsonobject.length; i++) {
                                                    switch (resultData["Data"][i]["Id"]) {
                                                        case 7:
                                                            var isPerimeterEnabled = resultData["Data"][i]["IsSubscribed"]
                                                        case 8:
                                                            contextObj.isNetAreaAllowed = resultData["Data"][i]["IsSubscribed"]
                                                            break;
                                                        case 11:
                                                            var isBoundingPolygonEnabled = resultData["Data"][i]["IsSubscribed"]
                                                            break;
                                                        case 29:
                                                            var isNetAreaEnabled = resultData["Data"][i]["IsSubscribed"]
                                                            break;
                                                        case 31:
                                                            //  debugger
                                                            contextObj.g_IsNetCustomer = resultData["Data"][i]["FeatureLookupId"] == "1" ? false : true
                                                            if (contextObj.g_IsNetCustomer)
                                                                contextObj.isSpace = false;
                                                            break;
                                                        case 32:
                                                            contextObj.DrawingUnitId = jsonobject[i]["FeatureLookupId"] == "3" ? 1 : 2
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
                                                        case 187: contextObj.isSeatBookingEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 190: contextObj.isApprovalForEmpMoveInDrawingEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 195: contextObj.isResoureFeatureEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 192: contextObj.isApprovalForEmpAssignInDrawingEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 189: contextObj.IsSiteAdmin = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 285: contextObj.IsPlotInDrawing = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 49: if (contextObj.moduleId==6)
                                                                    contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 51: if (contextObj.moduleId == 7)
                                                            contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 53: if (contextObj.moduleId == 8)
                                                            contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 80: if (contextObj.moduleId == 16)
                                                            contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 88: if (contextObj.moduleId == 17)
                                                            contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 96: if (contextObj.moduleId == 18)
                                                            contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 224: if (contextObj.moduleId == 24)
                                                            contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 126: if (contextObj.moduleId == 25)
                                                            contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 136: if (contextObj.moduleId == 26)
                                                            contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 146: if (contextObj.moduleId == 27)
                                                            contextObj.isCopyPasteEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 17: if (contextObj.moduleId == 7)
                                                            contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 19: if (contextObj.moduleId == 6)
                                                            contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 21: if (contextObj.moduleId == 8)
                                                            contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 78: if (contextObj.moduleId == 16)
                                                            contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 86: if (contextObj.moduleId == 17)
                                                            contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 94: if (contextObj.moduleId == 18)
                                                            contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 222: if (contextObj.moduleId == 24)
                                                            contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 124: if (contextObj.moduleId == 25)
                                                            contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 134: if (contextObj.moduleId == 26)
                                                            contextObj.isSnapEnabled = jsonobject[i]["IsSubscribed"];
                                                            break;
                                                        case 144: if (contextObj.moduleId == 27)
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
                                                        if (resultData["Data"].findIndex(function (el) { return el.ModuleId == 9 }) != -1)
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
       
    }
    getCustomerSettings() {
        let contextObj = this;
        if (contextObj.DrawingUnitId == 1) {// 1 For Inch,2 For Milli Meter
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
    }
    calculateDwgRatio() {
        let ratio = [0];
        let contextObj = this;
        contextObj.objiWhiz.clientDWGAreaRatio(ratio);
        contextObj.g_dblDwgRatio = ratio[0];
        contextObj.g_intLegendTextSize = (contextObj.g_intTextSize * contextObj.g_intLegentScale * (ratio[0]));
    }
    getFontStyles = function (resCallback) {
        let contextObj = this;
        let arrstyleNames = [];
        contextObj.objiWhiz.getAllTextStyles(function (retCode, styleNames) {
            if (retCode == 0) {
                if (styleNames != "") {
                    arrstyleNames = styleNames.split(contextObj.rowDelimiter);
                    for (let layerName of arrstyleNames) {
                        let styleNameExists = contextObj.g_arrDefaultFontStyles.some(function (el) { return el === layerName });
                        if (styleNameExists) {
                            contextObj.g_strTextStyleName = layerName;
                            contextObj.blnStyleExists = true;
                            resCallback(0);
                            break;
                        }
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

    }
    getExtentPoints = function (resCallback) {
        let contextObj = this;
        let strGrossHandle: string[] = [];
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
    }
    getDrawingDetails = function (resCallback) {
        var contextObj = this;
        this.opendrawingService.getDrawingDetails(this.drawingId).subscribe(function (resultData) {
            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData["Data"])) {
            resCallback(resultData["Data"][0]);
        }
        });
    }
}

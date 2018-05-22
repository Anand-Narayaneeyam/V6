import { Injectable } from '@angular/core';
import {HttpHelpers} from '../../../Whatever/utils/HttpHelpers';
import { Http } from '@angular/http';

export class UnlockDrawing {
    rowDelimiter: string = "§";
    columnDelimeter: string = "µ";
    dwgobject: any;
    customerSettings: any; // for customer settings values
    dwgConverstionRatio: number;
    dwgAreaConvertionValue: number;
    areaTolerance: number;
    areaUnit: string;
    perimeterUnit: string;
    grossHandle: string;
    netHandle: string[];
    // default layers
    spacelayerName: string;
    constructionhandle: any;
    constructionLayerName: string;
    netLayername: string;
    grossLayername: string;
    isGrossLayerExists: boolean = false;
    isConstructionLayerExists: boolean = false;
    isSpaceLayerExists: boolean = false;
    isNetLayerExists: boolean = false;
    isNetAreaAllowed: boolean = false;
    polylineOverlappingTolerance: number = 0.5
    NTOverlapTolerance: number = 0.5
    NTSPOverlapTolerance: number = 0.5
    totalSpaceOrNetArea: number = 0
    validationAreaTolerance: number = 20
    DrawingUnitId: number = 1;
    outstrHandles: string;
    spaceDetails: ISpaceDetails[] = [];
    g_strAlliDrawingsLayerEnities: any;
    //  check: boolean = false;
    handlecount: number = 0;
    g_IsNetCustomer: boolean = false;
    constructor(private iWhizObject: any, private customerSetting: any, private defaultLayers: any) {

        ////debugger
        //this.check = true;
        var contextObj = this;
        contextObj.dwgobject = iWhizObject;
        contextObj.customerSettings = customerSetting;

        var jsonobject = contextObj.customerSettings;
        contextObj.customerSettings = jsonobject;
        if (jsonobject) {
            for (let i = 0; i < jsonobject.length; i++) {
                switch (jsonobject[i]["Id"]) {
                    case 7:
                        var isPerimeterEnabled = jsonobject[i]["IsSubscribed"]
                        break;
                    case 8:
                        contextObj.isNetAreaAllowed = jsonobject[i]["IsSubscribed"]
                        break;
                    case 11:
                        var isBoundingPolygonEnabled = jsonobject[i]["IsSubscribed"]
                        break;
                    case 29:
                        var isNetAreaEnabled = jsonobject[i]["IsSubscribed"]
                        break;
                    case 31:
                        contextObj.g_IsNetCustomer = jsonobject[i]["FeatureLookupId"] == "1" ? false : true
                        break;
                    case 32://UnitofMeasureInSpace                     
                        contextObj.DrawingUnitId = jsonobject[i]["FeatureLookupId"] == "3" ? 1 : 2
                        break;
                }
            }
        }
        //contextObj.isNetAreaAllowed =contextObj.customerSettings[0].IsNetAreaAllowed;
        if (this.DrawingUnitId == 1)   // 1 for Inch or 2 for Milli Meter
        {
            contextObj.dwgConverstionRatio = 1;
            contextObj.dwgAreaConvertionValue = 144;
            contextObj.areaTolerance = 0.5;
            contextObj.areaUnit = "Sq. Ft.";
            contextObj.perimeterUnit = " Ft.";
        }
        else {
            contextObj.areaUnit = " Sq. Mt.";
            contextObj.perimeterUnit = " m ";
            contextObj.dwgConverstionRatio = 25.4;
            contextObj.dwgAreaConvertionValue = 1000000;
            contextObj.areaTolerance = 0.04645152;

        }
        ////debugger    
        contextObj.spacelayerName = defaultLayers[0]["Space Layer Name"];
        if (contextObj.spacelayerName)
            contextObj.isSpaceLayerExists = true;
        contextObj.constructionLayerName = defaultLayers[0]["External Wall Layer Name"];
        if (contextObj.constructionLayerName)
            contextObj.isConstructionLayerExists = true;
        contextObj.netLayername = defaultLayers[0]["Net Layer Name"];
        if (contextObj.netLayername)
            contextObj.isNetLayerExists = true;
        contextObj.grossLayername = defaultLayers[0]["Gross Layer Name"];
        if (contextObj.grossLayername)
            contextObj.isGrossLayerExists = true;
    }
    verifyLayers(layerName: string) { // for all layer verifications
        var contextObj = this;
        var isExist = [0];
        var result = contextObj.dwgobject.layerExists(layerName, isExist);
        if (result != 0) {
            //console.log("faild due to ", result);
        }
        return isExist[0];
    }
    verifyNetArea = function (resCallback) {
        var l_entityHandles = [];
        var l_netHandles = [];
        var l_grossArea;
        var l_totalNetArea = 0;
        var l_areaDiffPerentage;
        var contextObj = this;
        var grossLayer: boolean = true;
        var netLayer: boolean = true;
        var areaVerificationParameters = [];
        if (contextObj.isGrossLayerExists) {
            contextObj.dwgobject.getAllEntities(contextObj.grossLayername, function (returnCode, entityhandles) { //Getting Gross Layer Handles
                if (returnCode == 0) {

                    l_entityHandles = entityhandles.split(contextObj.rowDelimiter);
                    contextObj.grossHandle = l_entityHandles[0];


                    contextObj.dwgobject.getEntityArea(contextObj.grossHandle, function (returnCode, area) {
                        if (returnCode == 0) {

                            l_grossArea = area;
                            if (contextObj.isNetLayerExists) {

                                contextObj.dwgobject.getAllEntities(contextObj.netLayername, function (returnCode, entityhandles) { //Getting Net Layer Handles
                                    contextObj.g_strAlliDrawingsLayerEnities = entityhandles;
                                    if (returnCode == 0) {

                                        //Verifying area equation
                                        l_netHandles = entityhandles.split(contextObj.rowDelimiter);
                                        contextObj.netHandle = l_netHandles;
                                        ////debugger
                                        l_grossArea = +((Math.abs(l_grossArea) / contextObj.dwgAreaConvertionValue).toFixed(2));//Math.round((Math.abs(l_grossArea) / contextObj.dwgAreaConvertionValue));
                                        contextObj.getTotalAreaOfEnities(contextObj.netHandle, 0, function (dblTotalArea) {
                                            l_totalNetArea = +((Math.abs(dblTotalArea) / contextObj.dwgAreaConvertionValue).toFixed(2))//Math.round(Math.abs(dblTotalArea) / contextObj.dwgAreaConvertionValue);
                                            if (l_grossArea > 0)
                                                l_areaDiffPerentage = +((l_grossArea - l_totalNetArea) * 100 / l_grossArea).toFixed(2)// Math.round(((l_grossArea - l_totalNetArea) * 100) / l_grossArea);

                                            areaVerificationParameters.push(l_grossArea);
                                            areaVerificationParameters.push(l_totalNetArea);
                                            areaVerificationParameters.push(l_areaDiffPerentage);
                                            resCallback(grossLayer, netLayer, l_entityHandles, areaVerificationParameters);
                                        });
                                    }

                                });

                            }
                            else {
                                netLayer = false;
                                resCallback(grossLayer, netLayer, l_entityHandles, areaVerificationParameters);
                            }
                        }

                    });
                }

            });
        }
        else {
            grossLayer = false;
            resCallback(grossLayer, netLayer, l_entityHandles, areaVerificationParameters);
        }

    }
    ////private getTotalAreaOfEnities(LayerEntities) {
    ////    var dblTotalArea = 0;
    ////    if (LayerEntities) {
    ////        for (let layer of LayerEntities) {
    ////            this.dwgobject.getEntityArea(layer, function (returnCode, dblArea) {
    ////                dblTotalArea = dblTotalArea + dblArea;
    ////            });
    ////            dblTotalArea = Math.abs(dblTotalArea);
    ////        }
    ////    }
    ////    return dblTotalArea;
    ////}

    private getTotalAreaOfEnities(LayerEntities, dblTotalArea, callback) {
        //       var dblTotalArea = 0;
        var contextObj = this;
        if (LayerEntities.length > 0) {
            //for (let layer of LayerEntities) {
            var EntityHandle = LayerEntities[LayerEntities.length - 1];
            this.dwgobject.getEntityArea(EntityHandle, function (returnCode, dblArea) {
                if (EntityHandle != "") {
                    dblTotalArea = dblTotalArea + dblArea;
                    dblTotalArea = Math.abs(dblTotalArea);
                }
                LayerEntities.pop();
                contextObj.getTotalAreaOfEnities(LayerEntities, dblTotalArea, callback);
            })
        }
        else
            callback(dblTotalArea);
    }
    verifySpaceArea = function (resCallback) {
        var l_grosslayerHandles = [];
        var l_constructionlayerHandles = [];
        var l_spaceEntityhandles = [];
        var l_grossArea;
        var l_ConstructionArea;
        var l_TotalSpaceArea;
        var l_areaDiff;
        var contextObj = this;
        var grossLayer: boolean = true;
        var constructionLayer: boolean = true;
        var spaceLayer: boolean = true;
        var areaVerificationParameters = [];
        if (contextObj.isGrossLayerExists) {
            contextObj.dwgobject.getAllEntities(contextObj.grossLayername, function (res, entityhandles) { //Getting Gross Layer Handles
                if (res == 0) {

                    l_grosslayerHandles = entityhandles.split(contextObj.rowDelimiter);
                    contextObj.grossHandle = l_grosslayerHandles[0];

                    contextObj.dwgobject.getEntityArea(contextObj.grossHandle, function (returnCode, area) {
                        if (returnCode == 0) {

                            l_grossArea = area;//gross area
                            if (contextObj.isConstructionLayerExists) {
                                contextObj.dwgobject.getAllEntities(contextObj.constructionLayerName, function (res, entityhandles) { //Getting Construction Layer Handles
                                    if (res == 0) {

                                        l_constructionlayerHandles = entityhandles.split(contextObj.rowDelimiter);
                                        contextObj.constructionhandle = l_constructionlayerHandles[0];


                                        contextObj.dwgobject.getEntityArea(l_constructionlayerHandles[0], function (returnCode, area) {
                                            if (returnCode == 0) {

                                                l_ConstructionArea = area;
                                                if (contextObj.isSpaceLayerExists) {
                                                    contextObj.dwgobject.getAllEntities(contextObj.spacelayerName, function (res, spaceentityhandles) { //Getting Space Layer Handles
                                                        if (res == 0) {

                                                            l_spaceEntityhandles = spaceentityhandles.split(contextObj.rowDelimiter);
                                                            ////debugger
                                                            //'Verifying area equation
                                                            l_grossArea = +((Math.abs(l_grossArea) / contextObj.dwgAreaConvertionValue).toFixed(2));//Math.round(Math.abs(l_grossArea) / contextObj.dwgAreaConvertionValue);
                                                            l_ConstructionArea = +((Math.abs(l_ConstructionArea) / contextObj.dwgAreaConvertionValue).toFixed(2)); //Math.round(Math.abs(l_ConstructionArea) / contextObj.dwgAreaConvertionValue);

                                                            contextObj.getTotalAreaOfEnities(l_spaceEntityhandles, 0, function (dblTotalArea) {
                                                                contextObj.g_strAlliDrawingsLayerEnities = spaceentityhandles;
                                                                l_TotalSpaceArea = +((Math.abs(dblTotalArea) / contextObj.dwgAreaConvertionValue).toFixed(2));//Math.round(Math.abs(dblTotalArea) / contextObj.dwgAreaConvertionValue);
                                                                l_areaDiff = +((Math.abs(l_grossArea) - (l_ConstructionArea + l_TotalSpaceArea)).toFixed(2)); //+(Math.abs(Math.round(l_grossArea - (l_ConstructionArea + l_TotalSpaceArea))));

                                                                areaVerificationParameters.push(l_grossArea);
                                                                areaVerificationParameters.push(l_ConstructionArea);
                                                                areaVerificationParameters.push(l_TotalSpaceArea);
                                                                areaVerificationParameters.push(l_areaDiff);
                                                                resCallback(grossLayer, constructionLayer, spaceLayer, l_constructionlayerHandles, l_grosslayerHandles, areaVerificationParameters, contextObj.areaTolerance);
                                                            });
                                                        }

                                                    });
                                                }
                                                else {
                                                    spaceLayer = false;
                                                    resCallback(grossLayer, constructionLayer, spaceLayer, l_constructionlayerHandles, l_grosslayerHandles, areaVerificationParameters, contextObj.areaTolerance);
                                                }
                                            }

                                        });
                                    }

                                });
                            }
                            else {
                                constructionLayer = false;
                                resCallback(grossLayer, constructionLayer, spaceLayer, l_constructionlayerHandles, l_grosslayerHandles, areaVerificationParameters, contextObj.areaTolerance);
                            }
                        }

                    });
                }

            });
        }
        else {
            grossLayer = false;
            resCallback(grossLayer, constructionLayer, spaceLayer, l_constructionlayerHandles, l_grosslayerHandles, areaVerificationParameters, contextObj.areaTolerance);
        }
    }
    verifyNetPolyline = function (resCallback) {
        var contextObj = this;
        var l_netLayerHandles = [];
        var l_arrValidNTHandles = [];
        var l_arrOpenNTHandles = [];
        var l_arrOverlappedNTHandles = [];
        var l_arrOtherEntities = [];
        var isPolyLineVerificationPassed: boolean = true;
        // var spaceDetails: spaceDetails[] = [];
        var netLayer: boolean = true;
        var rowIndex: number = 1;
        var getAllEntitiesCheck: boolean = false;
        var verifyNetLayerCheck: boolean = false;
        if (contextObj.isNetLayerExists) {
            contextObj.dwgobject.getAllEntities(contextObj.netLayername, function (returnCode, entityhandles) { //Getting net Layer Handles
                if (returnCode == 0) {
                    getAllEntitiesCheck = true;

                    l_netLayerHandles = entityhandles.split(contextObj.rowDelimiter);
                    var tolerence: string = String(contextObj.areaTolerance);
                    contextObj.dwgobject.verifyNetLayer(tolerence, function (returnCode, validNTHandles, overlappedNTHandles, invalidNT_GROverlap, invalidNT_IntermediateVertices,
                        invalidNT_UnwantedVertices, invalidNT_TinyEdges, openNTHandles, otherEntities) {
                        if (returnCode == 0) {
                            verifyNetLayerCheck = true;

                            l_arrValidNTHandles = validNTHandles.split(contextObj.rowDelimiter);
                            l_arrOpenNTHandles = openNTHandles.split(contextObj.rowDelimiter);
                            l_arrOverlappedNTHandles = overlappedNTHandles.split(contextObj.rowDelimiter);
                            l_arrOtherEntities = otherEntities.split(contextObj.rowDelimiter);
                            //check valid NT Handles
                            if (l_arrValidNTHandles.length - 1 > 0) { // add recordset
                                //intRowId &"~" &  strResultText & "~Valid Spaces~" & Replace(ValidNTHandles,g_strRowDelimiter,";") & "~" & False & "~10~1~0~15~" & False & "~" & False & "~",strNetHatchDataType,strNetHatchFieldName
                            }
                            //check open NT Handles
                            if (l_arrOpenNTHandles.length - 1 > 0) { // add recordset
                                isPolyLineVerificationPassed = false;
                            }
                            //check Overlapped NT Handles
                            if (l_arrOverlappedNTHandles.length - 1 > 0) { // add recordset
                                isPolyLineVerificationPassed = false;
                            }
                            //check Other Entities Handles
                            if (l_arrOtherEntities.length - 1 > 0) { // add recordset
                                isPolyLineVerificationPassed = false;
                            }
                            if (isPolyLineVerificationPassed) {

                            }
                            resCallback(netLayer, l_netLayerHandles, l_arrValidNTHandles, l_arrOpenNTHandles, l_arrOverlappedNTHandles, l_arrOtherEntities, isPolyLineVerificationPassed, getAllEntitiesCheck, verifyNetLayerCheck);
                        }
                        else {
                            isPolyLineVerificationPassed = false;
                            resCallback(netLayer, l_netLayerHandles, l_arrValidNTHandles, l_arrOpenNTHandles, l_arrOverlappedNTHandles, l_arrOtherEntities, isPolyLineVerificationPassed, getAllEntitiesCheck, verifyNetLayerCheck);

                        }
                    });
                } else {
                    isPolyLineVerificationPassed = false;
                    resCallback(netLayer, l_netLayerHandles, l_arrValidNTHandles, l_arrOpenNTHandles, l_arrOverlappedNTHandles, l_arrOtherEntities, isPolyLineVerificationPassed, getAllEntitiesCheck, verifyNetLayerCheck);
                }

            });
        }
        else {
            netLayer = false;
            isPolyLineVerificationPassed = false;
            resCallback(netLayer, l_netLayerHandles, l_arrValidNTHandles, l_arrOpenNTHandles, l_arrOverlappedNTHandles, l_arrOtherEntities, isPolyLineVerificationPassed, getAllEntitiesCheck, verifyNetLayerCheck);
        }
    }

    verifySpacePolyline = function (resCallback) {
        var contextObj = this;
        var spaceLayer: boolean = true;
        var netLayer: boolean = true;
        var l_spaceEntityhandles = [];
        var l_arrValidSPHandles = [];
        var l_arrOpenSPHandles = [];
        var l_arrOverlappedSPHandles = [];


        var arrValidSPEntities = [];
        var arrLessAreaEntities = [];
        var arrMoreAreaEntities = [];
        var arrMultipleNTInSP = [];
        var arrNTWithMultipleSP = [];
        var arrInvalidNT = [];
        var arrNTWithoutSP = [];
        var arrSPWithoutNT = [];
        var arrValidOpenSPEntities = [];
        var arrOtherValidSPEntities = [];
        var arrOtherValidNTEntities = [];
        var arrValidNTHandles = [];
        var getAllEntitiesCheck: boolean = false;
        var verifySpaceLayerCheck: boolean = false;
        var validateNetLayerCheck: boolean = false;
        var isNetAreaAllowedCheck: boolean = false;
        var isPolyLineVerificationPassed: boolean = true;
        //debugger
        if (contextObj.isSpaceLayerExists) {
            if (contextObj.isNetLayerExists) {
                // If Not((Not g_blnIsNetLayerExists) And g_blng_IsNetCustomer) Then
                contextObj.dwgobject.getAllEntities(contextObj.spacelayerName, function (res, spaceentityhandles) { //Getting Space Layer Handles
                    if (res == 0) {

                        getAllEntitiesCheck = true;
                        l_spaceEntityhandles = spaceentityhandles.split(contextObj.rowDelimiter);
                        var tolerence: string = String(contextObj.areaTolerance);
                        contextObj.dwgobject.verifySpaceLayer(tolerence, function (res, validSPHandles, overlappedSPHandles, invalidSP_GROverlap, invalidSP_IntermediateVertices,
                            invalidSP_UnwantedVertices, invalidSP_TinyEdges, openSPHandles, otherEntities) {
                            if (res == 0) {

                                verifySpaceLayerCheck = true;
                                l_arrValidSPHandles = validSPHandles.split(contextObj.rowDelimiter);
                                l_arrOpenSPHandles = openSPHandles.split(contextObj.rowDelimiter);
                                l_arrOverlappedSPHandles = overlappedSPHandles.split(contextObj.rowDelimiter);
                                //l_arrOtherEntities = otherEntities.split(contextObj.rowDelimiter);
                                if (contextObj.isNetAreaAllowed) {
                                    isNetAreaAllowedCheck = true;
                                    contextObj.dwgobject.validateNetLayer(contextObj.polylineOverlappingTolerance, contextObj.NTOverlapTolerance, contextObj.NTSPOverlapTolerance, contextObj.validationAreaTolerance, function (result, ValidSPHandles, OverlappedSPHandles, InvalidSP_GROverlap, InvalidSP_IntermediateVertices,
                                        InvalidSP_UnwantedVertices, InvalidSP_TinyEdges, OpenSPHandles_SPLayer, OtherEntities_SPLayer, ValidNTHandles,//
                                        OverlappedNTHandles, InvalidNT_GROverlap, InvalidNT_IntermediateVertices, InvalidNT_UnwantedVertices,
                                        InvalidNT_TinyEdges, OpenNTHandles_NTLayer, OtherEntities_NTLayer, ValidNTSPCombination, LessAreaNTSPCombination,
                                        MoreAreaNTSPCombination, MultipleNTInSP, NTWithMultipleSP, NTWithoutSP, SPWithoutNT, InvalidNT) {
                                        if (result == 0) {
                                            validateNetLayerCheck = true;

                                            isPolyLineVerificationPassed = false;
                                            arrValidNTHandles = ValidNTHandles.split(contextObj.rowDelimiter);
                                            arrValidSPEntities = validSPHandles.split(contextObj.rowDelimiter);//ValidSpaceHandles
                                            arrLessAreaEntities = LessAreaNTSPCombination.split(contextObj.rowDelimiter);
                                            arrMoreAreaEntities = MoreAreaNTSPCombination.split(contextObj.rowDelimiter);
                                            arrMultipleNTInSP = MultipleNTInSP.split(contextObj.rowDelimiter);
                                            arrNTWithMultipleSP = NTWithMultipleSP.split(contextObj.rowDelimiter);
                                            arrInvalidNT = InvalidNT.split(contextObj.rowDelimiter);//strInvalidNT
                                            arrNTWithoutSP = NTWithoutSP.split(contextObj.rowDelimiter);
                                            arrSPWithoutNT = SPWithoutNT.split(contextObj.rowDelimiter);
                                            arrValidOpenSPEntities = OpenSPHandles_SPLayer.split(contextObj.rowDelimiter);
                                            arrOtherValidSPEntities = OtherEntities_SPLayer.split(contextObj.rowDelimiter);
                                            arrOtherValidNTEntities = OtherEntities_NTLayer.split(contextObj.rowDelimiter);

                                            if (arrOtherValidSPEntities.length - 1 > 0) {
                                                isPolyLineVerificationPassed = false;
                                            }
                                            if (arrInvalidNT.length - 1 > 0) {
                                                isPolyLineVerificationPassed = false;
                                                //need to implement
                                            }
                                            if (arrValidOpenSPEntities.length - 1 > 0) {
                                                isPolyLineVerificationPassed = false;
                                                //need to implement
                                            }
                                            if (arrOtherValidNTEntities.length - 1 > 0) {
                                                isPolyLineVerificationPassed = false;
                                                //need to implement
                                            }
                                            if (arrMultipleNTInSP.length - 1 > 0) {
                                                isPolyLineVerificationPassed = false;
                                                //need to implement
                                            }
                                            if (arrNTWithMultipleSP.length - 1 > 0) {
                                                isPolyLineVerificationPassed = false;
                                                //need to implement
                                            }
                                            //For Each strItem In arrEntities
                                            //If Len(strItem) > 0 Then
                                            //If Len(outstrHandles) > 0 Then
                                            //outstrHandles = outstrHandles & g_strColDelimiter & Split(strItem, g_strColDelimiter)(0)
                                            //Else
                                            //outstrHandles = Split(strItem, g_strColDelimiter)(0)
                                            //End If
                                            //End If
                                            //Next
                                            if (arrValidSPEntities.length - 1 > 0) {
                                                isPolyLineVerificationPassed = false;
                                                //need to implement
                                            }
                                            resCallback(netLayer, spaceLayer, getAllEntitiesCheck, verifySpaceLayerCheck, validateNetLayerCheck, l_spaceEntityhandles, isNetAreaAllowedCheck, l_arrValidSPHandles, l_arrOpenSPHandles,
                                                l_arrOverlappedSPHandles, arrOtherValidSPEntities, arrInvalidNT, arrValidOpenSPEntities, arrOtherValidNTEntities, arrMultipleNTInSP, arrNTWithMultipleSP, arrValidSPEntities, isPolyLineVerificationPassed, arrLessAreaEntities, arrValidNTHandles);
                                        }
                                        else {

                                            resCallback(netLayer, spaceLayer, getAllEntitiesCheck, verifySpaceLayerCheck, validateNetLayerCheck, l_spaceEntityhandles, isNetAreaAllowedCheck, l_arrValidSPHandles, l_arrOpenSPHandles,
                                                l_arrOverlappedSPHandles, arrOtherValidSPEntities, arrInvalidNT, arrValidOpenSPEntities, arrOtherValidNTEntities, arrMultipleNTInSP, arrNTWithMultipleSP, arrValidSPEntities, isPolyLineVerificationPassed, arrLessAreaEntities, arrValidNTHandles);
                                        }
                                    });
                                }
                                else {
                                    if ((l_arrValidSPHandles.length - 1) > 0) {
                                        //need to implement
                                    }
                                    resCallback(netLayer, spaceLayer, getAllEntitiesCheck, verifySpaceLayerCheck, validateNetLayerCheck, l_spaceEntityhandles, isNetAreaAllowedCheck, l_arrValidSPHandles, l_arrOpenSPHandles,
                                        l_arrOverlappedSPHandles, arrOtherValidSPEntities, arrInvalidNT, arrValidOpenSPEntities, arrOtherValidNTEntities, arrMultipleNTInSP, arrNTWithMultipleSP, arrValidSPEntities, isPolyLineVerificationPassed, arrLessAreaEntities, arrValidNTHandles);
                                }
                                if ((l_arrOpenSPHandles.length - 1) > 0) {
                                    isPolyLineVerificationPassed = false;
                                    //need to implement
                                }
                                if ((l_arrOverlappedSPHandles.length - 1) > 0) {
                                    isPolyLineVerificationPassed = false;
                                    //need to implement
                                }
                            }
                            else {
                                isPolyLineVerificationPassed = false;

                                resCallback(netLayer, spaceLayer, getAllEntitiesCheck, verifySpaceLayerCheck, validateNetLayerCheck, l_spaceEntityhandles, isNetAreaAllowedCheck, l_arrValidSPHandles, l_arrOpenSPHandles,
                                    l_arrOverlappedSPHandles, arrOtherValidSPEntities, arrInvalidNT, arrValidOpenSPEntities, arrOtherValidNTEntities, arrMultipleNTInSP, arrNTWithMultipleSP, arrValidSPEntities, isPolyLineVerificationPassed, arrLessAreaEntities, arrValidNTHandles);
                            }
                        });
                    }

                    else {
                        isPolyLineVerificationPassed = false;
                        resCallback(netLayer, spaceLayer, getAllEntitiesCheck, verifySpaceLayerCheck, validateNetLayerCheck, l_spaceEntityhandles, isNetAreaAllowedCheck, l_arrValidSPHandles, l_arrOpenSPHandles,
                            l_arrOverlappedSPHandles, arrOtherValidSPEntities, arrInvalidNT, arrValidOpenSPEntities, arrOtherValidNTEntities, arrMultipleNTInSP, arrNTWithMultipleSP, arrValidSPEntities, isPolyLineVerificationPassed, arrLessAreaEntities, arrValidNTHandles);

                    }
                });
            }
            else {
                isPolyLineVerificationPassed = false;
                netLayer = false;
                resCallback(netLayer, spaceLayer, getAllEntitiesCheck, verifySpaceLayerCheck, validateNetLayerCheck, l_spaceEntityhandles, isNetAreaAllowedCheck, l_arrValidSPHandles, l_arrOpenSPHandles,
                    l_arrOverlappedSPHandles, arrOtherValidSPEntities, arrInvalidNT, arrValidOpenSPEntities, arrOtherValidNTEntities, arrMultipleNTInSP, arrNTWithMultipleSP, arrValidSPEntities, isPolyLineVerificationPassed, arrLessAreaEntities, arrValidNTHandles);
            }
        }
        else {
            isPolyLineVerificationPassed = false;
            spaceLayer = false;
            resCallback(netLayer, spaceLayer, getAllEntitiesCheck, verifySpaceLayerCheck, validateNetLayerCheck, l_spaceEntityhandles, isNetAreaAllowedCheck, l_arrValidSPHandles, l_arrOpenSPHandles,
                l_arrOverlappedSPHandles, arrOtherValidSPEntities, arrInvalidNT, arrValidOpenSPEntities, arrOtherValidNTEntities, arrMultipleNTInSP, arrNTWithMultipleSP, arrValidSPEntities, isPolyLineVerificationPassed, arrLessAreaEntities, arrValidNTHandles);
        }
    }
    buildSpaceData = function (isNew, drawingId, resCallback) {
        //  debugger
        var contextObj = this;
        if (contextObj.g_strAlliDrawingsLayerEnities) {
            var i = 0;

            var handles = contextObj.g_strAlliDrawingsLayerEnities.split(contextObj.rowDelimiter)//.filter(function (el, i) {
            //  return i <70;
            // });

            if (handles.length > 0) {
                this.buildSpaceDataForUnlockDrawing(handles, true, drawingId, function (returncode) {
                    if (returncode == 0) {
                        resCallback(contextObj.spaceDetails);
                    }
                });
            }
            else {
                resCallback(contextObj.spaceDetails);
            }
        }
    }


    createHandle = function (handle, isNew, isLinked, drawingId, spaceKey, isConstruction, spaceCategoryId, resCallback) {
        var contextObj = this;
        var bomaHandle = handle;
        var grossArea = 0;
        var bomaPerimeter = 0;
        var area = 0;
        var perimeter = 0;
        var carpetPerimeter = 0;

        var carpetArea = 0;
        var bomaPerimeter = 0;
        var bomaArea = 0;

        var textInsertionX = 0;
        var isLinked = isLinked;
        var isNew = isNew;
        var textInsertionY = 0;

        var isGross = false;

        var carpetHandle = "";
        var spaceId = 0
        // var spaceCategoryId = 4;
        var grossOrConstruction = 0;
        // debugger
        if (contextObj.g_strAlliDrawingsLayerEnities) {
            contextObj.dwgobject.getEntityArea(bomaHandle, function (returnCode, resultarea) {
                if (returnCode == 0) {
                    area = (resultarea).toFixed(2);
                    //  bomaArea = area
                    grossArea = +((Math.abs(area) / contextObj.dwgAreaConvertionValue).toFixed(2))
                    bomaArea = grossArea;
                    carpetArea = isConstruction == false && spaceKey == 8000 ? 0 : bomaArea;

                    contextObj.dwgobject.getEntityPerimeter(bomaHandle, function (returnCode, resultperimeter) {
                        if (returnCode == 0) {

                            perimeter = (resultperimeter).toFixed(2);
                            bomaPerimeter = perimeter
                            carpetPerimeter = perimeter


                            //  spaceKey = 9000;
                            if (contextObj.g_IsNetCustomer && isConstruction == false) {
                                carpetHandle = bomaHandle;

                                carpetPerimeter = +(Math.abs(perimeter).toFixed(2));
                                bomaPerimeter = carpetPerimeter;
                                grossArea = +((Math.abs(area) / contextObj.dwgAreaConvertionValue).toFixed(2))
                                carpetArea = grossArea;
                            }
                            //Get nethandle points                                 
                            contextObj.dwgobject.getEntityMidpoint(bomaHandle, function (returnCode, midX, midY) {
                                if (returnCode == 0) {
                                    textInsertionX = midX;
                                    textInsertionY = midY;

                                    // spaceKey = 9000;
                                    isLinked = true;
                                    spaceCategoryId = isNew == true ? spaceCategoryId : 0;
                                    contextObj.spaceDetails.push({

                                        SpaceId: spaceId,
                                        DrawingId: drawingId,
                                        BomaHandle: contextObj.g_IsNetCustomer == true ? "" : bomaHandle,
                                        CarpetHandle: carpetHandle,
                                        BOMAArea: contextObj.g_IsNetCustomer == true ? 0 : bomaArea,
                                        CarpetArea: carpetArea,
                                        BOMAPerimeter: bomaPerimeter,
                                        CarpetPerimeter: carpetPerimeter,
                                        TextInsertionX: textInsertionX,
                                        TextInsertionY: textInsertionY,
                                        SpaceCategoryId: spaceCategoryId,
                                        isNew: isNew


                                    })
                                    resCallback(0);
                                }
                                else
                                    resCallback(1);
                            });

                        }
                    });
                }
            });
        }
    }

    buildSpaceDataForUnlockDrawing = function (handles, isNew, drawingId, resCallback) {
        var contextObj = this;
        var spaceId = 0
        var spaceCategoryId = 4;
        var grossOrConstruction = 0;


        var area = 0;
        var perimeter = 0;
        var eachHandle = handles[contextObj.handlecount];

        var grossArea = 0;
        var isLinked = false;
        var isNewCount = false;

        var isDeleted = false;
        var isObjectsSaved = false;
        var carpetHandle = "";
        var netPerimeter = 0;

        var grossArea = 0;
        var bomaPerimeter = 0;
        var bomaHandle = "";
        var carpetPerimeter = 0;

        var carpetArea = 0;
        var bomaPerimeter = 0;
        var bomaArea = 0;
        var textInsertionX = 0;

        var textInsertionY = 0;
        // var netArea = 0;
        var spaceKey = 0;
        var isGross = false;
        var isConstruction = false;
        //if (contextObj.handlecount == 118) {
        //   debugger
        //    var test = "";
        //}


        if (contextObj.handlecount != handles.length - 1) {
            contextObj.dwgobject.getEntityArea(eachHandle, function (returnCode, resultarea) {
                if (returnCode == 0) {
                    area = (resultarea).toFixed(2);


                    contextObj.dwgobject.getEntityPerimeter(eachHandle, function (returnCode, resultperimeter) {
                        if (returnCode == 0) {

                            perimeter = (resultperimeter).toFixed(2);

                            if (contextObj.g_IsNetCustomer) {
                                carpetHandle = eachHandle;
                                carpetPerimeter = +(Math.abs(perimeter).toFixed(2));
                                bomaPerimeter = carpetPerimeter;
                                grossArea = +((Math.abs(area) / contextObj.dwgAreaConvertionValue).toFixed(2))
                                carpetArea = grossArea;

                                //Get nethandle points                                 
                                contextObj.dwgobject.getEntityMidpoint(eachHandle, function (returnCode, midX, midY) {
                                    if (returnCode == 0) {
                                        textInsertionX = midX;
                                        textInsertionY = midY;
                                        switch (grossOrConstruction) {
                                            case 0:
                                                spaceCategoryId = 4;
                                                break;
                                            case 1:
                                                //if (!g_IsNetCustomer) {
                                                //    if (this.isNetAreaAllowed) {
                                                //        netArea = +((Math.abs(area) / contextObj.dwgAreaConvertionValue).toFixed(2))
                                                //        carpetArea = netArea;
                                                //    }
                                                //}
                                                spaceKey = 9000;
                                                isLinked = true;
                                                spaceCategoryId = isNew == true ? 6 : 0;
                                                break;
                                            case 2:
                                                isConstruction = true;
                                                isLinked = true;
                                                spaceKey = 8000;
                                                spaceCategoryId = isNew == true ? 7 : 0;
                                                break;

                                        }
                                        contextObj.spaceDetails.push({
                                            SpaceId: spaceId,
                                            DrawingId: drawingId,
                                            BomaHandle: bomaHandle,
                                            CarpetHandle: carpetHandle,
                                            BOMAArea: bomaArea,
                                            CarpetArea: carpetArea,
                                            BOMAPerimeter: bomaPerimeter,
                                            CarpetPerimeter: carpetPerimeter,
                                            TextInsertionX: textInsertionX,
                                            TextInsertionY: textInsertionY,
                                            SpaceCategoryId: spaceCategoryId,
                                            isNew: isNew


                                        })
                                        contextObj.handlecount++;
                                        contextObj.buildSpaceDataForUnlockDrawing(handles, isNew, drawingId, resCallback);
                                    }
                                });
                            }
                            else {

                                bomaHandle = eachHandle;
                                grossArea = +((Math.abs(area) / contextObj.dwgAreaConvertionValue).toFixed(2))
                                bomaArea = grossArea;

                                carpetPerimeter = perimeter;
                                bomaPerimeter = perimeter;


                                if (grossOrConstruction == 0 || contextObj.isNetAreaAllowed == true) {

                                    contextObj.dwgobject.getNetHandlesForSpaceHandle(eachHandle, contextObj.polylineOverlappingTolerance, function (res, netHandle) {

                                        if (res == 0) {
                                            var netHandlesarray = netHandle.split(contextObj.rowDelimiter);
                                            //Get nethandles
                                            var NTHandle = netHandlesarray;
                                            contextObj.dwgobject.getEntityArea(NTHandle[0], function (returnCode, ntArea) {

                                                if (returnCode == 0) {

                                                    contextObj.dwgobject.getEntityPerimeter(NTHandle[0], function (returnCode, ntPerimeter) {

                                                        if (returnCode == 0) {

                                                            //Get nethandle points    
                                                            carpetHandle = NTHandle[0];
                                                            contextObj.dwgobject.getEntityMidpoint(eachHandle, function (returnCode, midX, midY) {

                                                                if (returnCode == 0) {
                                                                    textInsertionX = midX;
                                                                    textInsertionY = midY;
                                                                    //switch (grossOrConstruction) {
                                                                    //    case 0://space
                                                                    //        if (contextObj.isNetAreaAllowed) {
                                                                    //            carpetArea = +((Math.abs(ntArea) / contextObj.dwgAreaConvertionValue).toFixed(2))
                                                                    //            carpetPerimeter = +((ntPerimeter).toFixed(2))
                                                                    //        }
                                                                    //        spaceCategoryId = 4;
                                                                    //        break;
                                                                    //    case 1://gross
                                                                    //        //if (!contextObj.g_IsNetCustomer) {
                                                                    //        if (contextObj.isNetAreaAllowed) {
                                                                    //            carpetArea = grossArea
                                                                    //        }
                                                                    //        // }
                                                                    //        spaceKey = 9000;
                                                                    //        isLinked = true;
                                                                    //        spaceCategoryId = isNew == true ? 6 : 0;
                                                                    //        break;
                                                                    //    case 2://construction
                                                                    //        isConstruction = true;
                                                                    //        isLinked = true;
                                                                    //        spaceKey = 8000;
                                                                    //        spaceCategoryId = isNew == true ? 7 : 0;
                                                                    //        break;

                                                                    //}
                                                                    //console.log("spaceDetails", contextObj.spaceDetails);
                                                                    //contextObj.spaceDetails.push({

                                                                    //    SpaceId: spaceId,
                                                                    //    DrawingId: drawingId,
                                                                    //    BomaHandle: bomaHandle,
                                                                    //    CarpetHandle: carpetHandle,
                                                                    //    BOMAArea: bomaArea,
                                                                    //    CarpetArea: carpetArea,
                                                                    //    BOMAPerimeter: bomaPerimeter,
                                                                    //    CarpetPerimeter: carpetPerimeter,
                                                                    //    TextInsertionX: textInsertionX,
                                                                    //    TextInsertionY: textInsertionY,
                                                                    //    SpaceCategoryId: spaceCategoryId,
                                                                    //    isNew: isNew


                                                                    //})
                                                                    contextObj.AddSpaceDetails(midX, midY, grossOrConstruction, ntArea, ntPerimeter, grossArea, isLinked, isConstruction, isNew, spaceKey, spaceId, drawingId,
                                                                        bomaHandle, carpetHandle, bomaArea, carpetArea, bomaPerimeter, carpetPerimeter, textInsertionX, textInsertionY, spaceCategoryId);

                                                                    contextObj.handlecount++;
                                                                    contextObj.buildSpaceDataForUnlockDrawing(handles, isNew, drawingId, resCallback);
                                                                }
                                                                else { //insert space handle with out x,y
                                                                    contextObj.handlecount++;
                                                                    contextObj.buildSpaceDataForUnlockDrawing(handles, isNew, drawingId, resCallback);
                                                                }
                                                            });
                                                        }
                                                        else { // push array
                                                            contextObj.handlecount++;
                                                            contextObj.buildSpaceDataForUnlockDrawing(handles, isNew, drawingId, resCallback);
                                                        }
                                                    });

                                                }
                                                else {
                                                    contextObj.handlecount++;
                                                    contextObj.buildSpaceDataForUnlockDrawing(handles, isNew, drawingId, resCallback);
                                                }
                                            });
                                        }//
                                        else {
                                            //debugger
                                            //contextObj.dwgobject.getEntityMidpoint(eachHandle, function (returnCode, midX, midY) {

                                            //    if (returnCode == 0) {
                                            //        contextObj.AddSpaceDetails(midX, midY, grossOrConstruction, 0, 0, grossArea, isLinked, isConstruction, isNew, spaceKey, spaceId, drawingId,
                                            //            bomaHandle, carpetHandle, bomaArea, carpetArea, bomaPerimeter, carpetPerimeter, textInsertionX, textInsertionY, spaceCategoryId);


                                            contextObj.handlecount++;
                                            contextObj.buildSpaceDataForUnlockDrawing(handles, isNew, drawingId, resCallback);
                                            //    }
                                            //});
                                        }
                                    });

                                } else {
                                    contextObj.handlecount++;
                                    contextObj.buildSpaceDataForUnlockDrawing(handles, isNew, drawingId, resCallback);
                                }
                            }

                        } else {
                            contextObj.handlecount++;
                            contextObj.buildSpaceDataForUnlockDrawing(handles, isNew, drawingId, resCallback);
                        }

                    });
                } else {
                    contextObj.handlecount++;
                    contextObj.buildSpaceDataForUnlockDrawing(handles, isNew, drawingId, resCallback);
                }
            });

        }
        else {//inserting construction key and gross key

            contextObj.createHandle(contextObj.grossHandle, true, false, drawingId, 9000, false, 6, function (returncode) {
                if (returncode == 0) {
                    if (!contextObj.g_IsNetCustomer) {
                        contextObj.createHandle(contextObj.constructionhandle, true, false, drawingId, 8000, false, 7, function (returncode) {
                            if (returncode == 0) {
                                resCallback(0);
                            }

                        });
                    }
                    else
                        resCallback(returncode);
                }
            });

        }
    }
    AddSpaceDetails(midX, midY, grossOrConstruction, ntArea, ntPerimeter, grossArea, isLinked, isConstruction, isNew, spaceKey, spaceId, drawingId, bomaHandle
        , carpetHandle
        , bomaArea
        , carpetArea
        , bomaPerimeter
        , carpetPerimeter
        , textInsertionX
        , textInsertionY
        , spaceCategoryId) {
        var contextObj = this;
        //  textInsertionX = midX;
        //  textInsertionY = midY;
        switch (grossOrConstruction) {
            case 0://space
                if (contextObj.isNetAreaAllowed) {
                    carpetArea = +((Math.abs(ntArea) / contextObj.dwgAreaConvertionValue).toFixed(2))
                    carpetPerimeter = +((ntPerimeter).toFixed(2))
                }
                spaceCategoryId = 4;
                break;
            case 1://gross
                //if (!contextObj.g_IsNetCustomer) {
                if (contextObj.isNetAreaAllowed) {
                    carpetArea = grossArea
                }
                // }
                spaceKey = 9000;
                isLinked = true;
                spaceCategoryId = isNew == true ? 6 : 0;
                break;
            case 2://construction
                isConstruction = true;
                isLinked = true;
                spaceKey = 8000;
                spaceCategoryId = isNew == true ? 7 : 0;
                break;

        }
        console.log("spaceDetails", contextObj.spaceDetails);
        contextObj.spaceDetails.push({

            SpaceId: spaceId,
            DrawingId: drawingId,
            BomaHandle: bomaHandle,
            CarpetHandle: carpetHandle,
            BOMAArea: bomaArea,
            CarpetArea: carpetArea,
            BOMAPerimeter: bomaPerimeter,
            CarpetPerimeter: carpetPerimeter,
            TextInsertionX: textInsertionX,
            TextInsertionY: textInsertionY,
            SpaceCategoryId: spaceCategoryId,
            IsNew: isNew


        })
    }
    buildSpaceDataForUnlockDrawingNew(drawingId, resCallback) {
        var contextObj = this;
        var areaArray: any[] = [];
        var perimeterArray: any[] = [];
        var ntAreaArray: any[] = [];
        var ntPerimeterArray: any[] = [];
        var textinsertionXArray: any[] = [];
        var textinsertionYArray: any[] = [];
        var netHandleArray: any[] = [];
        var handles = contextObj.g_strAlliDrawingsLayerEnities;
        var handleArray = handles.split(contextObj.rowDelimiter);
        handleArray.pop();
        contextObj.dwgobject.getEntityArea(handles, function (returnCode, resultarea) {
            if (returnCode == 0) {
                areaArray = resultarea.split(contextObj.rowDelimiter);
                areaArray.pop();
                contextObj.dwgobject.getEntityPerimeter(handles, function (returnCode, resultperimeter) {
                    if (returnCode == 0) {
                        perimeterArray = resultperimeter.split(contextObj.rowDelimiter);
                        perimeterArray.pop();
                        contextObj.dwgobject.getEntityMidpointMultiple(handles, function (returnCode, midX, midY) {
                            if (returnCode == 0) {
                                textinsertionXArray = midX.split(contextObj.rowDelimiter);
                                textinsertionYArray = midY.split(contextObj.rowDelimiter);
                                textinsertionXArray.pop();
                                textinsertionYArray.pop();
                                if (contextObj.g_IsNetCustomer) {
                                    resCallback(contextObj.getSpcaeDetails(handleArray, areaArray, perimeterArray, drawingId, textinsertionXArray, textinsertionYArray, ntAreaArray, ntPerimeterArray, netHandleArray));
                                } else {
                                    if (contextObj.isNetAreaAllowed == true) {
                                        contextObj.dwgobject.getNetAreaPerimeterForSpaceHandles(handles, contextObj.polylineOverlappingTolerance, function (res, netHandles,netAreas,netPerimeters) {
                                            debugger
                                            netHandleArray = netHandles.split(contextObj.rowDelimiter);
                                                netHandleArray.pop();
                                                ntAreaArray = netAreas.split(contextObj.rowDelimiter);
                                                ntAreaArray.pop();
                                                ntPerimeterArray = netPerimeters.split(contextObj.rowDelimiter);
                                                ntPerimeterArray.pop();
                                                resCallback(contextObj.getSpcaeDetails(handleArray, areaArray, perimeterArray, drawingId, textinsertionXArray, textinsertionYArray, ntAreaArray, ntPerimeterArray, netHandleArray));
                                        });
                                        //contextObj.dwgobject.getNetHandlesForSpaceHandle(handles, contextObj.polylineOverlappingTolerance, function (res, netHandle) {
                                        //    if (res == 0) {
                                        //        if (netHandle.indexOf(contextObj['columnDelimeter']) != -1) { // start from here 
                                        //            netHandle = contextObj.getModifiedNetHandles(netHandle);
                                        //        }
                                        //        netHandleArray = netHandle.split(contextObj.rowDelimiter);
                                        //        netHandleArray.pop();
                                        //        contextObj.dwgobject.getEntityArea(netHandle, function (returnCode, resultntArea) {
                                        //            if (returnCode == 0) {
                                        //                ntAreaArray = resultntArea.split(contextObj.rowDelimiter);
                                        //                ntAreaArray.pop();
                                        //                contextObj.dwgobject.getEntityPerimeter(netHandle, function (returnCode, resultntPerimeter) {
                                        //                    if (returnCode == 0) {
                                        //                        ntPerimeterArray = resultntPerimeter.split(contextObj.rowDelimiter);
                                        //                        ntPerimeterArray.pop();
                                        //                        resCallback(contextObj.getSpcaeDetails(handleArray, areaArray, perimeterArray, drawingId, textinsertionXArray, textinsertionYArray, ntAreaArray, ntPerimeterArray, netHandleArray));
                                        //                    }
                                        //                });
                                        //            }
                                        //        });
                                        //    }
                                        //});
                                    }
                                    else {
                                        resCallback(contextObj.getSpcaeDetails(handleArray, areaArray, perimeterArray, drawingId, textinsertionXArray, textinsertionYArray, ntAreaArray, ntPerimeterArray, netHandleArray));
                                    }
                                }
                            }
                        });

                    }
                });
            }
        });
    }
    getSpcaeDetails(handleArray, areaArray, perimeterArray, drawingId, textinsertionXArray, textinsertionYArray, ntAreaArray, ntPerimeterArray, netHandle) {
        var carpetHandle;
        var carpetPerimeter;
        var bomaPerimeter;
        var grossArea;
        var carpetArea;
        var spaceId = 0;
        var bomaHandle = "";
        var bomaArea = 0;
        var spaceCategoryId = 4;
        var isNew: boolean = true;
        if (this.spaceDetails.length > 0)
            this.spaceDetails = [];
        for (var i = 0; i < handleArray.length; i++) {
            if (netHandle.length > 0)
                carpetHandle = netHandle[i];
            else
                carpetHandle = handleArray[i];
            if (this.g_IsNetCustomer == false) {
                bomaHandle = handleArray[i];
                bomaArea = +((Math.abs(areaArray[i]) / this.dwgAreaConvertionValue).toFixed(2));
                if (this.isNetAreaAllowed) {
                    carpetArea = +((Math.abs(ntAreaArray[i]) / this.dwgAreaConvertionValue).toFixed(2))
                    carpetPerimeter = +(Math.abs(ntPerimeterArray[i]).toFixed(2));
                }
                    bomaPerimeter = +(Math.abs(perimeterArray[i]).toFixed(2));
            } else {
                carpetPerimeter = +(Math.abs(perimeterArray[i]).toFixed(2));
                bomaPerimeter = carpetPerimeter;
                grossArea = +((Math.abs(areaArray[i]) / this.dwgAreaConvertionValue).toFixed(2))
                carpetArea = grossArea;
                if (ntAreaArray.length > 0 && ntPerimeterArray.length > 0) {
                    carpetArea = ntAreaArray[i];
                    carpetPerimeter = ntPerimeterArray[i];
                }
            }
            this.spaceDetails.push({
                SpaceId: spaceId,
                DrawingId: drawingId,
                BomaHandle: bomaHandle,
                CarpetHandle: carpetHandle,
                BOMAArea: bomaArea,
                CarpetArea: carpetArea,
                BOMAPerimeter: bomaPerimeter,
                CarpetPerimeter: carpetPerimeter,
                TextInsertionX: textinsertionXArray[i],
                TextInsertionY: textinsertionYArray[i],
                SpaceCategoryId: spaceCategoryId,
                IsNew: isNew


            })
        }
        return this.spaceDetails;

    }
    createGrossAndConstructionHandles(drawingId, resCallback) {
        var contextObj = this;
        contextObj.createHandle(contextObj.grossHandle, true, false, drawingId, 9000, false, 6, function (returncode) {
            if (returncode == 0) {
                if (!contextObj.g_IsNetCustomer) {
                    contextObj.createHandle(contextObj.constructionhandle, true, false, drawingId, 8000, false, 7, function (returncode) {
                        if (returncode == 0) {
                            resCallback(0);
                        }

                    });
                }
                else
                    resCallback(returncode);
            }
        });
    }
    getSpaceDataForTextInDrawing(spaceData: any) {
        var index;
        var modifiedSpaceDetails = [];
        var handle;
        var handleArray = this.g_strAlliDrawingsLayerEnities.split(this.rowDelimiter);
        handleArray.pop();
        for (var item of spaceData) {
            if (this.g_IsNetCustomer)
                handle = item.CarpetHandle;
            else
                handle = item.BomaHandle;
            if (handleArray.some(function (el) { return el == handle }))
                modifiedSpaceDetails.push(item)
        }
        return modifiedSpaceDetails;
    }
    getModifiedSpaceDataForOrphan(handlesNotinDB: any, spaceDetails: any) {
        var handle;
        var index;
        debugger
        var modifiedSpaceDetails = [];
        for (var item of handlesNotinDB) {
            if (this.g_IsNetCustomer)
                index = spaceDetails.findIndex(function (el) { return el.CarpetHandle == item.SpaceHandle });
            else
                index = spaceDetails.findIndex(function (el) { return el.BomaHandle == item.SpaceHandle });
            if (index != -1)
                modifiedSpaceDetails.push(spaceDetails[index]);
        }
        return modifiedSpaceDetails;
    }
}

export interface ISpaceDetails {

    SpaceId: number;
    DrawingId: number
    BomaHandle: string;
    CarpetHandle: string;
    BOMAArea: number;
    CarpetArea: number;
    BOMAPerimeter: number;
    CarpetPerimeter: number;
    TextInsertionX: number;
    TextInsertionY: number;
    SpaceCategoryId: number;
    IsNew: boolean;

}

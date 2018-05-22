import { Injectable } from '@angular/core';
import {HttpHelpers} from '../../../Whatever/utils/HttpHelpers';
import { Http } from '@angular/http';
import {SpaceDrawingService} from '../../../models/space/spacedrawing.services';
import {CommonDrawings} from '../../common/drawings/drawings-services';
import { SchedulingService } from '../../../models/scheduling/scheduling.service';

export class SpaceOpenDrawing {
    objiWhiz: any;
    spaceServices: SpaceDrawingService;
    schedulingService: SchedulingService;
    spaceData: any;
    drawingId: number;
    moduleId: number;
    displaySettingData: any;
    leaderLineData: any;
    http: any;
    tooltipData: DataForDrawing[] = [];
    dataInDrawing: DataForDrawing[] = [];
    legendDataArray: LegentData[] = [];
    empLegentDataArray: EmpLegentData[] = [];
    dataInDrawingTextHandles: DataForDrawing[] = [];
    moveTextLeaderLineHandles: DataForDrawing[] = [];
    lookupDistMapNames: any = {};
    commonServices: any;
    categoryId: number;
    addtlDataFieldCategoryId: number;
    spaceDataDisplayOrder: string[] = [];
    selectedOrgLevelName: string = "";
    selectedOrgLevel: string = "";
    isAfterUnlock: boolean = false;
    orgLevelNumber: number;
    empOrgUnitSpStandarsLegendData: any;
    intDistRectHeight: number;
    intDistRectWidth: number;
    arrayCount: number = 0;
    checkDrawingOpen: boolean = false;
    colorPreferenceSettingsData: any;
    singleSpaceColor: number;
    singleSpaceHatchPatternId: number;
    singleSpaceHatchAngle: number;
    singleSpaceHatchScale: number;
    buildingCommonAreaHatchObj: HatchObject[] = [];
    floorCommonAreaHatchObj: HatchObject[] = [];
    verticalCommonAreaHatchObj: HatchObject[] = [];
    hatchHandles: string[] = [];
    legendRectHandles: string = "";
    legendLineHandles: string = "";
    //moveLegedDetails: any;
    moveLegendHandle: string = "";
    moveLegendBlockHandle: string = "";
    pointcount: number = 0;
    points: string = "";
    tempx: number;
    tempy: number;
    measureLayerName = "$Measure";
    measureLineAutocadColor: number = 150;
    measureLineThickness: number = 1;
    measureTextStyleId: number = 8;
    leaderLayerName: string = "$LEADERLINE";
    leaderColorCode: number = 130;
    leaderLineTypeSize = 2;
    leaderLineTypeScale = 7;
    leaderLineType = "ByLayer";
    blinkColorCodeR: number = 255;
    blinkColorCodeG: number = 0;
    blinkColorCodeB: number = 0;
    enableAminity: boolean = false;
    mappingLayerData: any;
    handleTextArray = [];
    defaultLayers: any;
    isFromUnlock: boolean = false;
    isBuildingDrawing: boolean = false;
    handleName = "BomaHandle";
    constructor(private iWhizObject: any, drawingId: number, moduleId: number, http: Http, IsBuildingDrawing: boolean) {
        var contextObj = this;
        contextObj.objiWhiz = iWhizObject;
        contextObj.drawingId = drawingId;
        contextObj.moduleId = moduleId;
        contextObj.http = http;
        contextObj.isBuildingDrawing = IsBuildingDrawing;
        //contextObj.initilizeObjects(function (retCode) {
        //    //contextObj.getOtherCommonDatas(function (retCode) { });
        //});
    }
    initilizeObjects = function (resCallback) {
        var contextObj = this;
        this.spaceServices = new SpaceDrawingService(this.http);
        this.schedulingService = new SchedulingService(this.http);
        this.addtlDataFieldCategoryId = 7;

        switch (this.moduleId) {
            case 3:
                this.categoryId = 1;
                break;
            case 5:
                this.categoryId = 17;
                break;
            case 6: // Telecom
                this.categoryId = 16;
                break;
            case 7: // Assets
                this.categoryId = 13;
                break;
            case 8: // Furniture
                this.categoryId = 15;
                break;
            case 12: //CAI 
                this.categoryId = 2;
                break;
            case 14://Scheduling 
                this.categoryId = 29;
                break;
            case 17: // Electrical
                this.categoryId = 18;
                break;
            case 18: // Fire and Safety
                this.categoryId = 19;
                break;
            case 24: // Security Assets
                this.categoryId = 33;
                break;
            case 25: // Mechanical
                this.categoryId = 21;
                break;
            case 26: // Plumbing
                this.categoryId = 23;
                break;
            case 27: // Medical Gas
                this.categoryId = 25;
                break;

        }
        contextObj.getAllSpaceDetails();
        contextObj.getDisplaySettingsData(function (retCode) { });
        contextObj.getColorPreferenceSettingsData();
        contextObj.getAllLayerMappingDetails();
        contextObj.getLeaderLineDetails();
        contextObj.schedulingService.checkSubscribedFeature('282').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.enableAminity = result["Data"][0]["IsSubscribed"];
            }
        });
        this.getCommonServices(function (retCode) {
            resCallback(0);
        });
    }
    //getOtherCommonDatas = function (resCallback) {
    //    var contextObj = this;
    //    contextObj.commonServices.getFontStyles(function (retCode) {
    //        contextObj.commonServices.getExtentPoints(function (retCode) {
    //            resCallback(0);
    //        });
    //    });
    //}
    // for getting all space data
    getCommonServices = function (resCallback) {
        var contextObj = this;
        this.commonServices = new CommonDrawings(this.objiWhiz, this.http, this.moduleId, this.drawingId, this.isBuildingDrawing);
        this.commonServices.initilizeObjects(function (retCode) {
            if (contextObj.commonServices.isSpace == false)
                contextObj.handleName = "CarpetHandle";
            //contextObj.commonServices.getFontStyles(function (retCode) {
            //    contextObj.commonServices.getExtentPoints(function (retCode) {
            resCallback(0);
            //    });
            //});
        });
    }
    getAllSpaceDetails = function () {
        var contextObj = this;
        this.spaceServices.getAllSpaceDetails(this.moduleId, this.drawingId).subscribe(function (resultData) {
            
            contextObj.spaceData = JSON.parse(resultData["Data"].FieldBinderData);

            //resCallback(contextObj.spaceData);
        });
    }
    // for getting all mapping layer data
    getAllLayerMappingDetails = function () {
        var contextObj = this;
        contextObj.spaceServices.getLayerFunctionMappings().subscribe(function (resultData) {
            
            contextObj.mappingLayerData = JSON.parse(resultData["Data"].FieldBinderData);
        });
    }
    // for getting all space display settings data
    getDisplaySettingsData = function (resCallback) {
        var contextObj = this;
        this.spaceServices.getSpaceDisplaySettingsData(contextObj.categoryId, contextObj.addtlDataFieldCategoryId).subscribe(function (resultData) {
            contextObj.displaySettingData = resultData["Data"];
            resCallback(contextObj.displaySettingData);
        });
    }
    //for getting color preference settings data
    getColorPreferenceSettingsData = function () {
        var contextObj = this;
        contextObj.spaceServices.getColorPreferenceSettingsData().subscribe(function (resultData) {
            
            contextObj.colorPreferenceSettingsData = JSON.parse(resultData['Data'])[0];
            contextObj.leaderColorCode = contextObj.colorPreferenceSettingsData['LeaderLineColor'];
            contextObj.measureLineAutocadColor = contextObj.colorPreferenceSettingsData['MeasureDistanceColor'];
            contextObj.singleSpaceColor = contextObj.colorPreferenceSettingsData['SingleSpaceColor'];
            contextObj.singleSpaceHatchPatternId = contextObj.colorPreferenceSettingsData['SingleSpaceHatchPatternId'];// comment due to hatch pattern issue
            contextObj.singleSpaceHatchAngle = contextObj.colorPreferenceSettingsData['SingleSpaceHatchAngle'];
            contextObj.singleSpaceHatchScale = contextObj.colorPreferenceSettingsData['SingleSpaceHatchScale'];
            contextObj.verticalCommonAreaHatchObj.push({ HatchPatternId: contextObj.colorPreferenceSettingsData['VerticalHatchPatternId'], HatchAngle: contextObj.colorPreferenceSettingsData['VerticalHatchAngle'], HatchScale: contextObj.colorPreferenceSettingsData['VerticalHatchScale'], ColorId: contextObj.colorPreferenceSettingsData['VerticalColor'], RGBColor: contextObj.colorPreferenceSettingsData['BuildingCommonColorRGB'] });
            contextObj.floorCommonAreaHatchObj.push({ HatchPatternId: contextObj.colorPreferenceSettingsData['FloorCommonHatchPatternId'], HatchAngle: contextObj.colorPreferenceSettingsData['FloorCommonHatchAngle'], HatchScale: contextObj.colorPreferenceSettingsData['FloorCommonHatchScale'], ColorId: contextObj.colorPreferenceSettingsData['FloorCommonColor'], RGBColor: contextObj.colorPreferenceSettingsData['BuildingCommonColorRGB'] });
            contextObj.buildingCommonAreaHatchObj.push({ HatchPatternId: contextObj.colorPreferenceSettingsData['BuildingCommonHatchPatternId'], HatchAngle: contextObj.colorPreferenceSettingsData['BuildingCommonHatchAngle'], HatchScale: contextObj.colorPreferenceSettingsData['BuildingCommonHatchScale'], ColorId: contextObj.colorPreferenceSettingsData['BuildingCommonColor'], RGBColor: contextObj.colorPreferenceSettingsData['BuildingCommonColorRGB'] });
            var blinkColor = contextObj.colorPreferenceSettingsData['BlinkColor'];
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
    }
    // for getting all space tooltipdata data (main fun)
    getTooltipData = function (bomaHandle, pageTarget, resCallback) {
        var contextObj = this;
        var retCode: boolean = false;
        this.tooltipData = [];
        //console.log("BomaHandle", bomaHandle);
        var bomaHandleArray: DataForDrawing[] = [];
        var spaceData: any = contextObj.spaceData;
        var spcaeDisplaySettings: any = contextObj.displaySettingData;
        //if (contextObj.moduleId == 3 && pageTarget == 2) {
        //    if (contextObj.isAfterUnlock == false) {
        //        contextObj.getDataAfterUnlock(function (retCode) {
        //            spaceData = contextObj.spaceData;
        //            spcaeDisplaySettings = contextObj.displaySettingData;
        //            contextObj.getTooltipDataViaDispSettings(spaceData, spcaeDisplaySettings, bomaHandle, retCode, function (returnCode, tooltipData) {
        //                resCallback(returnCode, tooltipData);
        //            });
        //        });
        //    }
        //    else {
        //        contextObj.getTooltipDataViaDispSettings(spaceData, spcaeDisplaySettings, bomaHandle, retCode, function (returnCode, tooltipData) {
        //            resCallback(returnCode, tooltipData);
        //        });
        //    }
        //}
        //else {
            contextObj.getTooltipDataViaDispSettings(spaceData, spcaeDisplaySettings, bomaHandle, retCode, function (returnCode, tooltipData) {
                resCallback(returnCode, tooltipData);
            });
       // }
    }
    // for getting all space data and disp settings data (only after unlock drawing o show tooltip)
    getDataAfterUnlock = function (resCallBack) {
        var contextObj = this;
        contextObj.getAllSpaceDetails(function (spaceData) {
            contextObj.getDisplaySettingsData(function (spcaeDisplaySettings) {//categoryId=1, addtlDataFieldCategoryId=7 in space module
                if (spaceData && spcaeDisplaySettings)
                    contextObj.isAfterUnlock = true;
                resCallBack(0);
            });
        });
    }
    // for getting all space tooltip data based on disp settings(sub fun of getTooltipData)
    getTooltipDataViaDispSettings = function (spaceData, spcaeDisplaySettings, handle, retCode, resCallback) {
        var contextObj = this;

        if (spaceData && spcaeDisplaySettings) {
            let HandleExists;
            if (contextObj.commonServices.isSpace)
                HandleExists = spaceData.some(function (el) { return el.BomaHandle === handle });
            else
                HandleExists = spaceData.some(function (el) { return el.CarpetHandle === handle });

            if (HandleExists) {
                retCode = true;
                var index;
                if (contextObj.commonServices.isSpace)
                    index = spaceData.findIndex(function (el) { return el.BomaHandle === handle });
                else
                    index = spaceData.findIndex(function (el) { return el.CarpetHandle === handle });

                var dataItem = spaceData[index];
                for (let dispalySettingsData of spcaeDisplaySettings) {
                    var itemsexists = Object.keys(dataItem).some(function (el) { return el = dispalySettingsData.FieldName })
                    if (itemsexists && dispalySettingsData.ShowinTooltip) {
                        contextObj.tooltipData.push({ Key: dispalySettingsData.FieldName, Value: dataItem[dispalySettingsData.FieldName] });
                    }
                }
                resCallback(retCode, contextObj.tooltipData);
            }
            else
                resCallback(retCode);
        }
        else
            resCallback(retCode);
    }
    // for showing space data in drawing (main fun)
    showDataInDrawing = function (resCallback) {
        var contextObj = this;
        if (!contextObj.spaceData || !contextObj.displaySettingData) {
            setTimeout(function () {
                contextObj.showDataInDrawing(resCallback);

            }, 50);
        }
        else {

            var retCode: boolean = false;
            this.tooltipData = [];
            var bomaHandleArray: DataForDrawing[] = [];
            var spcaeData: any[] = [];
            var ratio = [0];
            var formatedText: string = "";
            var dispSettingsObjTemp: any[] = [];
            let spaceDataToDrawing: any;
            contextObj.objiWhiz.clientDWGAreaRatio(ratio);
            // contextObj.objiWhiz.setDisplay(false);
            if (contextObj.spaceData) {
                //  contextObj.getDisplaySettingsData(function (spcaeDisplaySettings) {//categoryId=1, addtlDataFieldCategoryId=7 in space module
                spaceDataToDrawing = contextObj.spaceData.slice();
                if (contextObj.dataInDrawingTextHandles.length > 0)
                    contextObj.dataInDrawingTextHandles = [];
                contextObj.getFormatedText(spaceDataToDrawing, contextObj.displaySettingData, formatedText, ratio, function (callback) {
                    debugger
                    if (callback == 0) {
                        contextObj.movedTextleaderLines(function (ret) {
                            //Set Text of Layermapping function
                            if (contextObj.moduleId == 3 && contextObj.isFromUnlock==false) {
                                var allLayersArray = [];
                                for (let item of contextObj.defaultLayers) {
                                    var updatingField = contextObj.checkLayerVisibilityAndMapping(item["LayerName"])
                                    if (updatingField != "")
                                        allLayersArray.push(item["LayerName"] + contextObj.commonServices.rowDelimiter + updatingField);
                                }
                                if (allLayersArray.length > 0) {
                                    contextObj.setLayerMappingFunctions(allLayersArray, 0, function (retCode) {
                                        if (retCode == 1) {
                                            resCallback(0);
                                            //updated layer mapping data 
                                        }
                                        else
                                            resCallback(0);
                                    })
                                }
                                else
                                    resCallback(0);
                              
                            }
                            else
                                resCallback(0);
                        });
                    }
                   else resCallback(0);
                });
                //   });
            } else {

                //contextObj.getAllSpaceDetails(function (spaceData) {
                //    contextObj.getDisplaySettingsData(function (spcaeDisplaySettings) {//categoryId=1, addtlDataFieldCategoryId=7 in space module
                //        spaceDataToDrawing = spaceData.slice();
                //        contextObj.getFormatedText(spaceDataToDrawing, spcaeDisplaySettings, formatedText, ratio, function (callback) {
                //            if (callback == 0)
                           resCallback(0);
                //        });
                //    });
                //});
            }
        }
    }
    getLeaderLineDetails() {
        var contextObj = this;
        contextObj.spaceServices.GetLeaderLineDetails(contextObj.drawingId).subscribe(function (result) {
            contextObj.leaderLineData = JSON.parse(result['FieldBinderData']);
        });
    }
    movedTextleaderLines(resCallback) {
        var contextObj = this;
       // contextObj.spaceServices.GetLeaderLineDetails(contextObj.drawingId).subscribe(function (result) {

        //contextObj.leaderLineData = JSON.parse(result['FieldBinderData']);
        if (contextObj.leaderLineData != undefined && contextObj.leaderLineData!=null) {
            if (contextObj.leaderLineData.length > 0) {
                var leaderLinePoints = [];
                for (var item of contextObj.leaderLineData) {
                    leaderLinePoints.push(item['StartX'] + contextObj.commonServices.columnDelimiter + item['StartY'] + contextObj.commonServices.rowDelimiter + item['EndX'] + contextObj.commonServices.columnDelimiter + item['EndY'] + contextObj.commonServices.rowDelimiter);
                }
                contextObj.objiWhiz.createLeaderMultiple(leaderLinePoints, contextObj.leaderLayerName, contextObj.leaderColorCode, contextObj.leaderLineTypeSize, contextObj.leaderLineTypeScale, contextObj.leaderLineType, 1, function (returnCode, EntityHandle) {
                    contextObj.objiWhiz.setApplicationLayer(contextObj.leaderLayerName);
                    if (returnCode != 0) {
                        console.log("createLeaderMultiple faild due to ", returnCode);
                    }
                    var leaderHandleArray = EntityHandle.split(contextObj.commonServices.rowDelimiter); leaderHandleArray
                    leaderHandleArray.pop();
                    for (var i = 0; i < leaderHandleArray.length; i++) {
                        contextObj.moveTextLeaderLineHandles.push({ Key: contextObj.leaderLineData[i]['SpaceId'], Value: leaderHandleArray[i] })
                    }
                    resCallback(0);
                });
            }
            else
                resCallback(0)
        } else {
            setTimeout(function () {
                contextObj.movedTextleaderLines(resCallback);
            }, 50);
        }
       // });
    }
    setCheckDrawingOpen() {
        this.checkDrawingOpen = true;
    }
    // for showing space data in drawing using multilineText Api (sub function of showDataInDrawing)
    //private getFormatedText(spaceData, spcaeDisplaySettings, formatedText, ratio, callback) {

    //    var contextObj = this;
    //    var itemsForCreateText = [];
    //    if (spaceData.length > contextObj.arrayCount) {
    //        let spaceDataInDrawing = spaceData[contextObj.arrayCount];
    //        for (let dispSettingsItem of spcaeDisplaySettings) {
    //            if (dispSettingsItem.ShowinDrawing) {
    //                var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
    //                var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
    //                let textContent = spaceDataInDrawing[dispSettingsItem.FieldName];
    //                if (textContent == "null" || textContent == null)
    //                    textContent = "-";
    //                formatedText += "\\fTimes New Roman|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + ratio[0] * dispSettingsItem.FontSize + ";" + textContent + "\\n";
    //            }

    //        }
    //        if (formatedText != "") {

    //            let formatedTextFinal: string = "{" + formatedText + "}";
    //            contextObj.objiWhiz.createMultilineText("$SpaceData", 1, spaceDataInDrawing.TextInsertionX, spaceDataInDrawing.TextInsertionY, 0, ratio[0] * 1,
    //                0, 1, formatedTextFinal, "Standard", 0, function (retCode, entityHandle) {
    //                    if (retCode != 0) {
    //                        console.log("createMultilineText returned with error code : ", retCode);
    //                    }
    //                    else {
    //                        contextObj.dataInDrawingTextHandles.push({ Key: spaceDataInDrawing['BomaHandle'], Value: entityHandle })
    //                        contextObj.arrayCount++;
    //                        formatedText = "";
    //                        contextObj.getFormatedText(spaceData, spcaeDisplaySettings, formatedText, ratio, callback);
    //                    }
    //                });
    //        }
    //        else {
    //            contextObj.arrayCount++;
    //            formatedText = "";
    //            contextObj.getFormatedText(spaceData, spcaeDisplaySettings, formatedText, ratio, callback);
    //        }
    //    }
    //    else {
    //        contextObj.arrayCount = 0;
    //        contextObj.objiWhiz.setApplicationLayer("$SpaceData");
    //        callback(0);
    //    }

    //}

    public getFormatedText(spaceData, spcaeDisplaySettings, formatedText, ratio, callback) {
        var contextObj = this;
        var itemsForCreateText = [];
        var lineSpaceInDrawingValue = spcaeDisplaySettings.find(function (el) { return el['FieldName'] === 'Line Space in Drawing' })['FontSize'];
        var lineSpaceInDrawing = "";
        for (let i = 0; i < lineSpaceInDrawingValue; i++)
            lineSpaceInDrawing += "\\P";

        // if (spaceData.length > contextObj.arrayCount) {
        for (let i = 0; i < spaceData.length; i++) {
            let spaceDataInDrawing = spaceData[i];
            formatedText = "";
                for (let dispSettingsItem of spcaeDisplaySettings) {
                    if (dispSettingsItem.ShowinDrawing) {
                        var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
                        var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
                        let textContent = spaceDataInDrawing[dispSettingsItem.FieldName];
                        if (textContent == "null" || textContent == null || textContent == "")
                            textContent = "-";
                        var color = dispSettingsItem.Color;
                        if ((spaceDataInDrawing["Space Key"] == "8000") || (spaceDataInDrawing["Space Key"] == "9000")) {
                            color = 4;
                        }
                        formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + lineSpaceInDrawing;//"\\n";
                        //formatedText += "\\fTimes New Roman|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + ratio[0] * dispSettingsItem.FontSize + ";" + textContent + "\\n";
                    }
                }
            let formatedTextFinal: string = "{" + formatedText + "}";
            itemsForCreateText.push([formatedTextFinal, spaceDataInDrawing.TextInsertionX, spaceDataInDrawing.TextInsertionY]);
        }
        //
        //var lineSpaceInDrawing = spcaeDisplaySettings.find(function (el) { return el['FieldName'] === 'Line Space in Drawing' })['FontSize'];
        var handleName = "BomaHandle";
        if (contextObj.commonServices.isSpace == false)
            handleName = "CarpetHandle";
        contextObj.objiWhiz.createDataText(itemsForCreateText, "$SpaceData", 1, 0, ratio[0] * 1,
            0, 1, "Standard", 0, function (retCode, entityHandles) {
                debugger
                contextObj.objiWhiz.setApplicationLayer("$SpaceData");
                if (retCode != 0) {
                    console.log("createDataText returned with error code : ", retCode);
                }
                else {
                    var textHandleArray = entityHandles.split(contextObj.commonServices.rowDelimiter);
                    textHandleArray.pop();
                    //if (contextObj.dataInDrawingTextHandles.length > 0)
                    //    contextObj.dataInDrawingTextHandles = [];
                    var i = 0;
                    var index;
                    for (let textHandle of textHandleArray) {
                        if (textHandle != "") {
                            let handle = spaceData[i][handleName];
                            index = contextObj.dataInDrawingTextHandles.findIndex(function (el) { return el.Key == handle })
                            if (index == -1)
                                contextObj.dataInDrawingTextHandles.push({ Key: handle, Value: textHandle });
                            else
                                contextObj.dataInDrawingTextHandles[index].Value = textHandle;

                        }
                        i++;
                    }
                }
                callback(0);
            });

    }

    // for checking layer and delete layer if alredy exists (using diff selection of distribution map)
    deleteLayerAlredyExists = function (LayerName, rescallBack) {
        var isExist = [0];
        var contextObj = this;
        var layers = LayerName.split(contextObj.commonServices.rowDelimiter);
        var finalLayers = "";
      //  contextObj.objiWhiz.removeMaps(); // to remove solid hatches
        for (var index = 0; index < layers.length; index++) {
            if (layers[index] != "") {
                this.objiWhiz.layerExists(layers[index], isExist);
                if (isExist[0]) {
                    finalLayers += layers[index] + contextObj.commonServices.rowDelimiter;
                }
            }
        }
        //this.objiWhiz.layerExists(LayerName, isExist);
        if (finalLayers != "") {
            this.objiWhiz.deleteLayer(finalLayers, function (retCode) {
                if (retCode != 0)
                    console.log("deletelayer faild due to", retCode);
                rescallBack(retCode);
            });
        }
        else
            rescallBack(0);
    }
    deHatch = function (resCallback) {
        var contextObj = this;
        contextObj.deleteLayerAlredyExists("$LEGEND", function (returnCode) {
            contextObj.deleteLayerAlredyExists("$Hatch", function (returnCode) {
                contextObj.deleteLayerAlredyExists("$HatchSingleEntity", function (returnCode) {
                    contextObj.deleteLayerAlredyExists("$HatchMultipleEntity", function (returnCode) {
                        contextObj.deleteLayerAlredyExists("$HatchMultipleEmployee", function (returnCode) {
                            contextObj.deleteLayerAlredyExists("$HatchMultipleAssets", function (returnCode) {
                                contextObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (returnCode) {
                                contextObj.deleteLayerAlredyExists(contextObj.measureLayerName, function (returnCode) {
                                    contextObj.objiWhiz.removeMaps();
                                    contextObj.objiWhiz.removeLines();
                                    contextObj.objiWhiz.removeBlinkers();
                                    contextObj.moveLegendHandle = "";
                                    if (contextObj.moveLegendBlockHandle != "") {
                                        contextObj.objiWhiz.deleteEntity(contextObj.moveLegendBlockHandle, function (ret) {
                                            resCallback(0);
                                        });
                                    }
                                    else
                                        resCallback(0);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
    // for showing disribution map of Organisational Levels(main function)
    invokeDistributionMap = function (orgLevel, orgLevelNo, orgLevelName, resCallback) {
        //this.moveLegedDetails = [];
        //this.moveLegedDetails.push([ "1", orgLevel, orgLevelNo, orgLevelName ]);
        var contextObj = this;
        var distributionMapData;
        this.selectedOrgLevelName = orgLevelName;
        this.selectedOrgLevel = orgLevel;
        let orgdistributionSettingsBasedOnDrawingsData: any;
        if (this.moduleId == 5)
            this.orgLevelNumber = orgLevelNo;
        contextObj.objiWhiz.createDistributionMap(contextObj.drawingId, contextObj.moduleId, orgLevel, orgLevelNo, orgLevelName, contextObj.commonServices.g_IsNetCustomer, contextObj.commonServices.areaUnit, contextObj.commonServices.drawingDetails.SiteName, contextObj.commonServices.drawingDetails.BuildingName, contextObj.commonServices.drawingDetails.FloorName, true, 0, 0, function (retCode, spaceHandles, legendHandle, legendBlockHandle) {
            contextObj.moveLegendHandle = legendHandle;
            contextObj.moveLegendBlockHandle = legendBlockHandle;
            contextObj.objiWhiz.setApplicationLayer("$LEGEND");
            contextObj.objiWhiz.setApplicationLayer("$Hatch");
            if (retCode == 0) {
                var spaceHndleArray = spaceHandles.split(contextObj.commonServices.rowDelimiter);
                spaceHndleArray.pop();
                resCallback(0, spaceHndleArray);
            }
            else {
                console.log("createDistributionMap failed due to ", retCode);
                contextObj.objiWhiz.zoomExtents(function (ret) {
                    resCallback(1);
                });
            }
        });
        //var contextObj = this;
        //var distributionMapData;
        //this.selectedOrgLevelName = orgLevelName;
        //this.selectedOrgLevel = orgLevel;
        //let orgdistributionSettingsBasedOnDrawingsData: any;
        //contextObj.hatchHandles = [];
        //if (this.moduleId == 5)
        //    this.orgLevelNumber = orgLevelNo;
        //this.spaceServices.getOrgUnitDistributionMapData(orgLevelNo, this.drawingId).subscribe(function (resultData) {
        //    distributionMapData = JSON.parse(resultData["Data"].FieldBinderData);
        //    if (resultData["Data"].DataCount > 0) {
        //        console.log("getOrgUnitDistributionMapData", contextObj.distributionMapData);
        //        contextObj.spaceServices.getOrgdistributionSettingsBasedOnDrawings(orgLevelNo, contextObj.moduleId, contextObj.drawingId).subscribe(function (resultData) {
        //            orgdistributionSettingsBasedOnDrawingsData = JSON.parse(resultData["Data"].FieldBinderData);
        //            if (resultData["Data"].DataCount > 0) {
        //                contextObj.legendDataArray = [];
        //                contextObj.hatchDataHandles(orgLevel, distributionMapData, orgdistributionSettingsBasedOnDrawingsData, function (retCode) {
        //                    console.log("hit58retCode", retCode);
        //                    if (retCode == 0) {
        //                        var buildingCommonArea: number = 0;
        //                        var floorCommonArea: number = 0;
        //                        var verticalCommonArea: number = 0;
        //                        contextObj.getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, function (returnCode) {
        //                            if (returnCode == 0) {
        //                                if (contextObj.legendDataArray.length > 0) {
        //                                    contextObj.createLegend(true, function (retCode) {
        //                                        if (retCode == 0) {
        //                                            contextObj.objiWhiz.setLayerVisibility("$LEGEND", true, function (retCode) {
        //                                                //if (retCode == 0) {
        //                                                contextObj.objiWhiz.zoomExtents(function (ret) {
        //                                                    //if (ret == 0) {
        //                                                    resCallback(0, contextObj.hatchHandles);
        //                                                    //}

        //                                                });
        //                                                // }
        //                                            });

        //                                        } else {
        //                                            resCallback(retCode, contextObj.hatchHandles);
        //                                            return;
        //                                        }
        //                                    });
        //                                } else {
        //                                    resCallback(1);
        //                                }
        //                            }
        //                        });
        //                    }
        //                });
        //            }
        //            else
        //                resCallback(1);
        //        });
        //    }
        //    else
        //        resCallback(1);
        //});

    }
    // for showing disribution map of Validated fields (main function)
    invokeDistributionMapValidatedFields = function (archiveId,FieldId, validatedFieldName, resCallback) {
        //this.moveLegedDetails = [];
        //this.moveLegedDetails.push(["2", FieldId, validatedFieldName]);
        var contextObj = this;
        var distributionMapData;
        this.selectedOrgLevelName = FieldId;
        let orgdistributionSettingsBasedOnDrawingsData: any;
        contextObj.objiWhiz.createDistributionMapForValidatedFields(archiveId,contextObj.drawingId, contextObj.moduleId, FieldId, validatedFieldName, contextObj.commonServices.g_IsNetCustomer, contextObj.commonServices.areaUnit, contextObj.commonServices.drawingDetails.SiteName, contextObj.commonServices.drawingDetails.BuildingName, contextObj.commonServices.drawingDetails.FloorName, true, 0, 0, function (retCode, spaceHandles, legendHandle, legendBlockHandle) {
            contextObj.moveLegendHandle = legendHandle;
            contextObj.moveLegendBlockHandle = legendBlockHandle;
            contextObj.objiWhiz.setApplicationLayer("$LEGEND");
            contextObj.objiWhiz.setApplicationLayer("$Hatch");
            if (retCode == 0) {
                var spaceHndleArray = spaceHandles.split(contextObj.commonServices.rowDelimiter);
                spaceHndleArray.pop();
                resCallback(0, spaceHndleArray);
            }
            else {
                contextObj.objiWhiz.zoomExtents(function (ret) {
                    resCallback(1);
                });
            }

        });
        //var contextObj = this;
        //var validatedFieldsMapData;
        //this.selectedOrgLevelName = validatedFieldName;
        //let orgdistributionSettingsBasedOnDrawingsData: any;
        //contextObj.hatchHandles = [];
        //let columnName: string;
        //if (FieldId == 0)
        //    columnName = "SpFunctionName";
        //else if (FieldId == -1)
        //    columnName = "SpStandardName";
        //else
        //    columnName = "ValueName";
        //this.spaceServices.getDistributionMapValidatedFieldsData(FieldId, contextObj.moduleId, contextObj.drawingId).subscribe(function (resultData) {
        //    validatedFieldsMapData = JSON.parse(resultData["Data"].FieldBinderData);
        //    if (resultData["Data"].DataCount > 0) {
        //        contextObj.spaceServices.getValidatedFieldsSettingsBasedOnDrawings(FieldId, contextObj.moduleId, contextObj.drawingId).subscribe(function (resultData) {
        //            orgdistributionSettingsBasedOnDrawingsData = JSON.parse(resultData["Data"].FieldBinderData);
        //            contextObj.legendDataArray = [];
        //            contextObj.hatchDataHandles(columnName, validatedFieldsMapData, orgdistributionSettingsBasedOnDrawingsData, function (retCode) {
        //                if (retCode == 0) {
        //                    console.log("hit58", contextObj.distributionMapData);
        //                    contextObj.createLegend(false, function (retCode) {
        //                        if (retCode == 0) {
        //                            contextObj.objiWhiz.zoomExtents(function (ret) {
        //                                // if (ret == 0) {
        //                                contextObj.objiWhiz.setLayerVisibility("$LEGEND", true, function (retCode) {
        //                                    resCallback(0, contextObj.hatchHandles);
        //                                });
        //                                // }
        //                            });
        //                        } else {
        //                            resCallback(retCode, contextObj.hatchHandles);
        //                        }
        //                    });
        //                }
        //            });

        //        });
        //    }
        //    else
        //        resCallback(1);
        //});
    }
    hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
    }
    // common function for hatching spaces in disrtibution map data(both orglevel and validated fields)
    private hatchDataHandles(orgLevel, distributionMapData, distributionSettingsBasedOnDrawingsData, callback) {
        var contextObj = this;
        var itemsForCreateText = [];
        var mapHandles = [];
        var rgbColors = [];
        //  if (distributionMapData.length > contextObj.arrayCount) {
        for (var i = 0; i < distributionMapData.length; i++) {
            let distributionData = distributionMapData[i];
            let LevelName = distributionData[orgLevel];
            let index = distributionSettingsBasedOnDrawingsData.findIndex(function (el) { return el[orgLevel] === LevelName });
            if (index != -1) {
                let hatchObj = distributionSettingsBasedOnDrawingsData[index];
                switch (orgLevel) {
                    case 'L2Name': LevelName = distributionData['L1Name'] + "->" + LevelName;
                        break;
                    case 'L3Name': LevelName = distributionData['L1Name'] + "->" + distributionData['L2Name'] + "->" + LevelName;
                        break;
                    case 'L4Name': LevelName = distributionData['L1Name'] + "->" + distributionData['L2Name'] + "->" + distributionData['L3Name'] + "->" + LevelName;
                        break;
                    case 'L5Name': LevelName = distributionData['L1Name'] + "->" + distributionData['L2Name'] + "->" + distributionData['L3Name'] + "->" + distributionData['L4Name'] + "->" + LevelName;
                        break;
                }
                let legendDataArrayIndex = contextObj.legendDataArray.findIndex(function (el) { return el.OrglevelName === LevelName });
                if (legendDataArrayIndex != -1) {
                    contextObj.legendDataArray[legendDataArrayIndex].Area = +(contextObj.legendDataArray[legendDataArrayIndex].Area + distributionData.Area).toFixed(2);
                }
                else
                    contextObj.legendDataArray.push({ OrglevelName: LevelName, OrgunitId: distributionData.OrgUnitId, Area: +distributionData.Area, HatchObj: hatchObj });
                mapHandles.push(distributionData.Handle);
                rgbColors.push(contextObj.hexToRgb(hatchObj.RGBColor));
                contextObj.hatchHandles.push(distributionData.Handle);
            }
        }
        if (contextObj.legendDataArray.length > 0) {
            contextObj.objiWhiz.createMap(mapHandles, rgbColors, function (retCode) {
                if (contextObj.legendDataArray.length > 0) {
                    contextObj.legendDataArray.sort(function (a, b) {
                        return a.OrglevelName.localeCompare(b.OrglevelName);
                    });
                }
                callback(0);
            });
        } else
            callback(0);


    }
    //private hatchDataHandles(orgLevel, distributionMapData, distributionSettingsBasedOnDrawingsData, callback) {
    //    var contextObj = this;
    //    var itemsForCreateText = [];
    //    if (distributionMapData.length > contextObj.arrayCount) {
    //        let distributionData = distributionMapData[contextObj.arrayCount];
    //        console.log("distributionData", distributionData);
    //        let LevelName = distributionData[orgLevel];
    //        console.log("Level1", LevelName);
    //        console.log("distributionSettingsBasedOnDrawingsData", distributionSettingsBasedOnDrawingsData);
    //        let index = distributionSettingsBasedOnDrawingsData.findIndex(function (el) { return el[orgLevel] === LevelName });
    //        console.log("index", index);
    //        if (index != -1) {
    //            let hatchObj = distributionSettingsBasedOnDrawingsData[index];
    //            switch (orgLevel) {
    //                case 'L2Name': LevelName = distributionData['L1Name'] + "->" + LevelName;
    //                    break;
    //                case 'L3Name': LevelName = distributionData['L1Name'] + "->" + distributionData['L2Name'] +"->" +  LevelName;
    //                    break;
    //                case 'L4Name': LevelName = distributionData['L1Name'] + "->" + distributionData['L2Name'] + "->" + distributionData['L3Name'] + "->" +  LevelName;
    //                    break;
    //                case 'L5Name': LevelName = distributionData['L1Name'] + "->" + distributionData['L2Name'] + "->" + distributionData['L3Name'] + "->" + distributionData['L4Name'] + "->" + LevelName;
    //                    break;
    //            }
    //            let legendDataArrayIndex = contextObj.legendDataArray.findIndex(function (el) { return el.OrglevelName === LevelName });
    //            if (legendDataArrayIndex != -1) {
    //                contextObj.legendDataArray[legendDataArrayIndex].Area = +(contextObj.legendDataArray[legendDataArrayIndex].Area + distributionData.Area).toFixed(2);
    //            }
    //            else
    //                contextObj.legendDataArray.push({ OrglevelName: LevelName, OrgunitId: distributionData.OrgUnitId, Area: +distributionData.Area, HatchObj: hatchObj });
    //            contextObj.objiWhiz.hatchEntity("$Hatch", distributionData.Handle, hatchObj.ColorId, hatchObj.HatchAngle, hatchObj.HatchScale, hatchObj.HatchPatternId, false, function (retCode, entityHandle) {
    //                contextObj.hatchHandles.push(distributionData.Handle);
    //                contextObj.objiWhiz.setApplicationLayer("$Hatch");
    //                if (retCode != 0) {
    //                    console.log("hatchObjhatchObj", hatchObj);
    //                    console.log("hatchEntity returned with error code : ", retCode);
    //                }
    //                else {

    //                    console.log("Entity handle: ", entityHandle);
    //                }
    //                contextObj.arrayCount++;
    //                contextObj.hatchDataHandles(orgLevel, distributionMapData, distributionSettingsBasedOnDrawingsData, callback);
    //            });
    //        }
    //        else {
    //            contextObj.arrayCount++;
    //            contextObj.hatchDataHandles(orgLevel, distributionMapData, distributionSettingsBasedOnDrawingsData, callback);
    //        }

    //    }
    //    else {
    //        contextObj.arrayCount = 0;
    //        contextObj.legendDataArray.sort(function (a, b) {
    //            return a.OrglevelName.localeCompare(b.OrglevelName);
    //        });
    //        callback(0);
    //    }
    //}
    //private getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack) {
    //    var contextObj = this;
    //    var hatchHandle: string;
    //    if (contextObj.spaceData.length > contextObj.arrayCount) {
    //        var spaceDataItem = contextObj.spaceData[contextObj.arrayCount];
    //        if (contextObj.commonServices.g_IsNetCustomer)
    //            hatchHandle = spaceDataItem['CarpetHandle'];
    //        else
    //            hatchHandle = spaceDataItem['BomaHandle'];
    //        if (spaceDataItem['SpaceCategoryId']) {
    //            if (spaceDataItem['SpaceCategoryId'] == 1) {//04 - Vertical Space
    //                verticalCommonArea = verticalCommonArea + +spaceDataItem['Gross Area'];
    //                contextObj.objiWhiz.hatchEntity("$Hatch", hatchHandle, contextObj.verticalCommonAreaHatchObj[0].ColorId, contextObj.verticalCommonAreaHatchObj[0].HatchAngle, contextObj.verticalCommonAreaHatchObj[0].HatchScale, contextObj.verticalCommonAreaHatchObj[0].HatchPatternId, false, function (retCode, entityHandle) {
    //                    if (retCode != 0) {
    //                        console.log("hatchEntity returned with error code : ", retCode);
    //                    }
    //                    else
    //                        console.log("Entity handle: ", entityHandle);
    //                    contextObj.hatchHandles.push(hatchHandle);
    //                    contextObj.arrayCount++;
    //                    contextObj.getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack);
    //                });
    //            }
    //            else if (spaceDataItem['SpaceCategoryId'] == 2) {//03 - Floor Common
    //                floorCommonArea = floorCommonArea + +spaceDataItem['Gross Area'];
    //                contextObj.objiWhiz.hatchEntity("$Hatch", hatchHandle, contextObj.floorCommonAreaHatchObj[0].ColorId, contextObj.floorCommonAreaHatchObj[0].HatchAngle, contextObj.floorCommonAreaHatchObj[0].HatchScale, contextObj.floorCommonAreaHatchObj[0].HatchPatternId, false, function (retCode, entityHandle) {
    //                    if (retCode != 0) {
    //                        console.log("hatchEntity returned with error code : ", retCode);
    //                    }
    //                    else
    //                        console.log("Entity handle: ", entityHandle);
    //                    contextObj.hatchHandles.push(hatchHandle);
    //                    contextObj.arrayCount++;
    //                    contextObj.getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack);
    //                });
    //            }
    //            else if (spaceDataItem['SpaceCategoryId'] == 3) {//02 - Building Common
    //                buildingCommonArea = buildingCommonArea + +spaceDataItem['Gross Area'];
    //                console.log("buildingCommonArea", buildingCommonArea);
    //                contextObj.objiWhiz.hatchEntity("$Hatch", hatchHandle, contextObj.buildingCommonAreaHatchObj[0].ColorId, contextObj.buildingCommonAreaHatchObj[0].HatchAngle, contextObj.buildingCommonAreaHatchObj[0].HatchScale, contextObj.buildingCommonAreaHatchObj[0].HatchPatternId, false, function (retCode, entityHandle) {
    //                    if (retCode != 0) {
    //                        console.log("hatchEntity returned with error code : ", retCode);
    //                    }
    //                    else
    //                        console.log("Entity handle: ", entityHandle);
    //                    contextObj.hatchHandles.push(hatchHandle);
    //                    contextObj.arrayCount++;
    //                    contextObj.getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack);
    //                });
    //            }
    //            else {
    //                contextObj.arrayCount++;
    //                contextObj.getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack);
    //            }

    //        }
    //        else {
    //            contextObj.arrayCount++;
    //            contextObj.getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack);
    //        }

    //    } else {
    //        contextObj.arrayCount = 0;
    //        if (contextObj.spaceData.some(function (el) { return el.SpaceCategoryId === 1 }))
    //            contextObj.legendDataArray.push({ OrglevelName: "04 - Vertical Space", Area: verticalCommonArea.toFixed(2), HatchObj: contextObj.verticalCommonAreaHatchObj[0] });
    //        if (contextObj.spaceData.some(function (el) { return el.SpaceCategoryId === 2 }))
    //            contextObj.legendDataArray.push({ OrglevelName: "03 - Floor Common", Area: floorCommonArea.toFixed(2), HatchObj: contextObj.floorCommonAreaHatchObj[0] });
    //        if (contextObj.spaceData.some(function (el) { return el.SpaceCategoryId === 3 }))
    //            contextObj.legendDataArray.push({ OrglevelName: "02 - Building Common", Area: buildingCommonArea.toFixed(2), HatchObj: contextObj.buildingCommonAreaHatchObj[0] });
    //        console.log("legendDataArray", contextObj.legendDataArray);
    //        resCallBack(0);
    //    }
    //}
    private getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack) {
        var contextObj = this;
        var hatchHandle: string;
        var mapHandles = [];
        var rgbColors = [];
        while (contextObj.spaceData.length > contextObj.arrayCount) {
            var spaceDataItem = contextObj.spaceData[contextObj.arrayCount];
            if (contextObj.commonServices.g_IsNetCustomer)
                hatchHandle = spaceDataItem['CarpetHandle'];
            else
                hatchHandle = spaceDataItem['BomaHandle'];

            if (spaceDataItem['SpaceCategoryId']) {
                var grossArea = 0;
                if (spaceDataItem['Gross Area'])
                    grossArea = +spaceDataItem['Gross Area'];
                if (spaceDataItem['SpaceCategoryId'] == 1) {//04 - Vertical Space
                    verticalCommonArea = verticalCommonArea + grossArea;
                    mapHandles.push(hatchHandle);
                    rgbColors.push(contextObj.hexToRgb(contextObj.verticalCommonAreaHatchObj[0].RGBColor));

                    contextObj.hatchHandles.push(hatchHandle);
                    contextObj.arrayCount++;
                }
                else if (spaceDataItem['SpaceCategoryId'] == 2) {//03 - Floor Common
                    floorCommonArea = floorCommonArea + grossArea;
                    mapHandles.push(hatchHandle);
                    rgbColors.push(contextObj.hexToRgb(contextObj.floorCommonAreaHatchObj[0].RGBColor));

                    contextObj.hatchHandles.push(hatchHandle);
                    contextObj.arrayCount++;
                }
                else if (spaceDataItem['SpaceCategoryId'] == 3) {//02 - Building Common
                    buildingCommonArea = buildingCommonArea + grossArea;
                    console.log("buildingCommonArea", buildingCommonArea);
                    mapHandles.push(hatchHandle);
                    rgbColors.push(contextObj.hexToRgb(contextObj.buildingCommonAreaHatchObj[0].RGBColor));

                    contextObj.hatchHandles.push(hatchHandle);
                    contextObj.arrayCount++;

                }
                else {
                    contextObj.arrayCount++;
                }
            }
            else {
                contextObj.arrayCount++;
            }
        }

        // if (mapHandles.length > 0) {
        contextObj.objiWhiz.createMap(mapHandles, rgbColors, function (retCode) {
            if (retCode != 0) {
                console.log("hatchEntity returned with error code : ", retCode);
            }

            if (contextObj.spaceData.length >= contextObj.arrayCount) {
                contextObj.arrayCount = 0;
                if (contextObj.spaceData.some(function (el) { return el.SpaceCategoryId === 1 }))
                    contextObj.legendDataArray.push({ OrglevelName: "04 - Vertical Space", Area: verticalCommonArea.toFixed(2), HatchObj: contextObj.verticalCommonAreaHatchObj[0] });
                if (contextObj.spaceData.some(function (el) { return el.SpaceCategoryId === 2 }))
                    contextObj.legendDataArray.push({ OrglevelName: "03 - Floor Common", Area: floorCommonArea.toFixed(2), HatchObj: contextObj.floorCommonAreaHatchObj[0] });
                if (contextObj.spaceData.some(function (el) { return el.SpaceCategoryId === 3 }))
                    contextObj.legendDataArray.push({ OrglevelName: "02 - Building Common", Area: buildingCommonArea.toFixed(2), HatchObj: contextObj.buildingCommonAreaHatchObj[0] });
                console.log("legendDataArray", contextObj.legendDataArray);
            }
            resCallBack(0);
        });
        // }
    }
    //private getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack) {
    //    var contextObj = this;
    //    var hatchHandle: string;
    //    if (contextObj.spaceData.length > contextObj.arrayCount) {
    //        var spaceDataItem = contextObj.spaceData[contextObj.arrayCount];
    //        if (contextObj.commonServices.g_IsNetCustomer)
    //            hatchHandle = spaceDataItem['CarpetHandle'];
    //        else
    //            hatchHandle = spaceDataItem['BomaHandle'];

    //        var mapHandles = [];
    //        var rgbColors = [];
    //        if (spaceDataItem['SpaceCategoryId']) {
    //            var grossArea = 0;
    //            if (spaceDataItem['Gross Area'])
    //                grossArea = +spaceDataItem['Gross Area'];
    //            if (spaceDataItem['SpaceCategoryId'] == 1) {//04 - Vertical Space
    //                verticalCommonArea = verticalCommonArea + grossArea;
    //                mapHandles.push(hatchHandle);
    //                rgbColors.push(contextObj.hexToRgb(contextObj.verticalCommonAreaHatchObj[0].RGBColor));
    //                contextObj.objiWhiz.createMap(mapHandles, rgbColors, function (retCode) {
    //                    if (retCode != 0) {
    //                        console.log("hatchEntity returned with error code : ", retCode);
    //                    }
    //                    contextObj.hatchHandles.push(hatchHandle);
    //                    contextObj.arrayCount++;
    //                    contextObj.getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack);

    //                });
    //            }
    //            else if (spaceDataItem['SpaceCategoryId'] == 2) {//03 - Floor Common
    //                floorCommonArea = floorCommonArea + grossArea;
    //                mapHandles.push(hatchHandle);
    //                rgbColors.push(contextObj.hexToRgb(contextObj.floorCommonAreaHatchObj[0].RGBColor));
    //                contextObj.objiWhiz.createMap(mapHandles, rgbColors, function (retCode) {
    //                    if (retCode != 0) {
    //                        console.log("hatchEntity returned with error code : ", retCode);
    //                    }
    //                    contextObj.hatchHandles.push(hatchHandle);
    //                    contextObj.arrayCount++;
    //                    contextObj.getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack);

    //                });
    //            }
    //            else if (spaceDataItem['SpaceCategoryId'] == 3) {//02 - Building Common
    //                buildingCommonArea = buildingCommonArea + grossArea;
    //                console.log("buildingCommonArea", buildingCommonArea);
    //                mapHandles.push(hatchHandle);
    //                rgbColors.push(contextObj.hexToRgb(contextObj.buildingCommonAreaHatchObj[0].RGBColor));
    //                contextObj.objiWhiz.createMap(mapHandles, rgbColors, function (retCode) {
    //                    if (retCode != 0) {
    //                        console.log("hatchEntity returned with error code : ", retCode);
    //                    }
    //                    contextObj.hatchHandles.push(hatchHandle);
    //                    contextObj.arrayCount++;
    //                    contextObj.getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack);

    //                });
    //            }
    //            else {
    //                contextObj.arrayCount++;
    //                contextObj.getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack);
    //            }

    //        }
    //        else {
    //            contextObj.arrayCount++;
    //            contextObj.getSpaceCategryForLegend(verticalCommonArea, floorCommonArea, buildingCommonArea, resCallBack);
    //        }

    //    } else {
    //        contextObj.arrayCount = 0;
    //        if (contextObj.spaceData.some(function (el) { return el.SpaceCategoryId === 1 }))
    //            contextObj.legendDataArray.push({ OrglevelName: "04 - Vertical Space", Area: verticalCommonArea.toFixed(2), HatchObj: contextObj.verticalCommonAreaHatchObj[0] });
    //        if (contextObj.spaceData.some(function (el) { return el.SpaceCategoryId === 2 }))
    //            contextObj.legendDataArray.push({ OrglevelName: "03 - Floor Common", Area: floorCommonArea.toFixed(2), HatchObj: contextObj.floorCommonAreaHatchObj[0] });
    //        if (contextObj.spaceData.some(function (el) { return el.SpaceCategoryId === 3 }))
    //            contextObj.legendDataArray.push({ OrglevelName: "02 - Building Common", Area: buildingCommonArea.toFixed(2), HatchObj: contextObj.buildingCommonAreaHatchObj[0] });
    //        console.log("legendDataArray", contextObj.legendDataArray);
    //        resCallBack(0);
    //    }
    //}
    // for Creating Legend
    createLegend = function (isOrgLevel, resCallback) {
        let contextObj = this;
        let dblLegendStartXCord;
        let dblLegendStartYCord;
        let dblMaxX: number;
        let dblMaxY: number;

        console.log("contextObj.commonServices", contextObj.commonServices);
        contextObj.commonServices.calculateDwgRatio();
        dblMaxX = contextObj.commonServices.dwgExtentsX;
        dblMaxY = contextObj.commonServices.dwgExtentsY;
        console.log("dblMaxX", dblMaxX, dblMaxY);
        dblMaxX = dblMaxX + ((contextObj.commonServices.g_intLegendTextSize) + (8 * contextObj.commonServices.g_dblDwgRatio));
        dblMaxY = dblMaxY - ((contextObj.commonServices.g_intLegendTextSize) + (3 * contextObj.commonServices.g_dblDwgRatio));

        dblLegendStartXCord = dblMaxX;
        dblLegendStartYCord = dblMaxY;
        contextObj.objiWhiz.createLayer("$LEGEND", 1, true, function (retCode) {
            contextObj.objiWhiz.setApplicationLayer("$LEGEND");
            contextObj.createDrawingDetailsLegend(dblLegendStartXCord, dblLegendStartYCord, true, function (rtndblLegendStartYCord) {
                contextObj.createDistributionLegend(dblLegendStartXCord, rtndblLegendStartYCord, isOrgLevel, function (retCode) {
                    resCallback(retCode);
                });
            });
        });
    }
    // for showing drawing details as legend
    createDrawingDetailsLegend = function (xPos, yPos, isDistMap, resCallback) {
        var contextObj = this;
        var startX;
        if (isDistMap)
            startX = xPos - (8 * contextObj.commonServices.g_dblDwgRatio);
        else
            startX = xPos;
        var startY = yPos;
        console.log("startX", startX, startY);
        var detailsText = "Site: " + contextObj.commonServices.drawingDetails.SiteName + ", Building: " + contextObj.commonServices.drawingDetails.BuildingName + ", Floor: " + contextObj.commonServices.drawingDetails.FloorName;
        console.log("detailsText", detailsText);
        // formatedText += "\\fTimeTimes New Roman|b1|i0|c0|p18;\\C7;\\H" + ratio[0] * dispSettingsItem.FontSize + ";" + textContent + "\\n";
        var intSize = 2.5 * contextObj.commonServices.g_dblDwgRatio;
        contextObj.objiWhiz.createText("$LEGEND", 7, startX, startY, contextObj.commonServices.g_intSpaceDataTextAngle, intSize,
            contextObj.commonServices.g_intSpaceDataTextWidth, detailsText, contextObj.commonServices.g_strTextStyleName, contextObj.commonServices.g_strSpaceDataTextLegendStyleId, function (retCode, entityHandle) {
                if (retCode != 0)
                    console.log("createText returned with error code : ", retCode);
                else {
                    console.log("Entity handle: ", entityHandle);
                    startY = startY - (intSize + (2 * contextObj.commonServices.g_dblDwgRatio));
                }
                resCallback(startY);
            });
    }
    // for showing distribution map details legend
    createDistributionLegend = function (dblLegendStartXCord, dblLegendStartYCord, isOrgLevel, resCallback) {
        let contextObj = this;
        let dblX = dblLegendStartXCord;
        let dblY = dblLegendStartYCord;
        let HL1StartX = dblX - (8 * contextObj.commonServices.g_dblDwgRatio);
        let HL1StartY = dblY + (4 * contextObj.commonServices.g_dblDwgRatio);
        let strTextHandle: string[] = [];
        let intDistRectWidth = contextObj.commonServices.g_intLegendTextSize * 2;//g_intDistRectWidth * g_dblDwgRatio+(g_intLegendTextSize/2)
        console.log("intDistRectWidth", intDistRectWidth);
        let intDistRectHeight = contextObj.commonServices.g_intLegendTextSize * 2;//g_intDistRectHeight * g_dblDwgRatio+(g_intLegendTextSize/2)
        contextObj.intDistRectHeight = intDistRectHeight;
        let TextMaxX = 0;
        let HL2StartY;
        let VL2StartX;
        console.log("contextObj.commonServices.g_strTextStyleName", contextObj.commonServices.g_strTextStyleName);
        contextObj.objiWhiz.createText("$LEGEND", 7, dblX, dblY, contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
            contextObj.commonServices.g_intSpaceDataTextWidth, "Hatch", contextObj.commonServices.g_strTextStyleName, 8, function (retCode, textHandle) {
                if (retCode != 0)
                    console.log("createText returned with error code : ", retCode);
                else {
                    contextObj.objiWhiz.getEntityExtents(textHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                        if (retCode != 0) {
                            console.log("getEntityExtents faild due to ", retCode);
                        }
                        else {
                            contextObj.objiWhiz.createText("$LEGEND", 7, dblX, MinY - (1 * contextObj.commonServices.g_dblDwgRatio), contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
                                contextObj.commonServices.g_intSpaceDataTextWidth, "Pattern", contextObj.commonServices.g_strTextStyleName, 2, function (retCode, textHandle2) {
                                    if (retCode != 0)
                                        console.log("createText returned with error code : ", retCode);
                                    else {
                                        console.log("Entity handle: ", textHandle2);
                                        contextObj.getDistributionByName(dblX, intDistRectHeight, dblY, strTextHandle, TextMaxX, HL2StartY, intDistRectWidth, HL1StartX, VL2StartX, function (retCode, rtnTextMaxX, VL1EndY, rtnHL2StartY, rtnVL2StartX, VL3StartX) {
                                            if (retCode != 0) {
                                                contextObj.deleteLayerAlredyExists("$LEGEND", function (retCode) {
                                                    resCallback(retCode);
                                                    return;
                                                });
                                            }
                                            else {

                                                var HL1EndX = rtnTextMaxX + (2 * contextObj.commonServices.g_dblDwgRatio);
                                                contextObj.createLegendLines(HL1StartX, HL1StartY, HL1EndX, HL1StartY, function (retCode) {//HL1
                                                    contextObj.createLegendLines(HL1StartX, HL1StartY, HL1StartX, VL1EndY, function (retCode) {//VL1
                                                        contextObj.createLegendLines(HL1StartX, rtnHL2StartY, HL1EndX, rtnHL2StartY, function (retCode) {//HL2
                                                            contextObj.createLegendLines(HL1StartX, VL1EndY, HL1EndX, VL1EndY, function (retCode) {//HL3
                                                                contextObj.createLegendLines(rtnVL2StartX, HL1StartY, rtnVL2StartX, VL1EndY, function (retCode) {//VL2
                                                                    contextObj.createLegendLines(VL3StartX, HL1StartY, VL3StartX, VL1EndY, function (retCode) {//VL3
                                                                        contextObj.createLegendLines(HL1EndX, HL1StartY, HL1EndX, VL1EndY, function (retCode) {//VL4
                                                                            if (contextObj.moduleId == 5) {
                                                                                contextObj.getDisplaySettingsData(function (spcaeDisplaySettings) {//categoryId=1, addtlDataFieldCategoryId=7 in space module
                                                                                    if (isOrgLevel) {
                                                                                        var empStartX = HL1EndX + (contextObj.commonServices.g_intLegendTextSize) + (6 * contextObj.commonServices.g_dblDwgRatio);
                                                                                        var empStartY = dblY;
                                                                                        contextObj.spaceServices.getEmpOrgUnitOccupancyDistributionMapLegendData(contextObj.orgLevelNumber, contextObj.drawingId).subscribe(function (resultData) {
                                                                                            let empOrgUnitOccupancyDistributionMapLegendData = JSON.parse(resultData["Data"].FieldBinderData);
                                                                                            if (empOrgUnitOccupancyDistributionMapLegendData != "[]") {
                                                                                                let DistributionMapLegendData = empOrgUnitOccupancyDistributionMapLegendData.slice();
                                                                                                contextObj.getEmployeeLegendData(empStartX, empStartY, DistributionMapLegendData, "Occupied", false, function (retCode, rtnTextMaxX) {
                                                                                                    if (retCode == 0) {
                                                                                                        empStartX = rtnTextMaxX + (contextObj.commonServices.g_intLegendTextSize) + (6 * contextObj.commonServices.g_dblDwgRatio);
                                                                                                        var VL5StartX = rtnTextMaxX + (2 * contextObj.commonServices.g_dblDwgRatio);
                                                                                                        let DistributionMapLegendDataFreeSeats = empOrgUnitOccupancyDistributionMapLegendData.slice();
                                                                                                        contextObj.getEmployeeLegendData(empStartX, empStartY, DistributionMapLegendDataFreeSeats, "Free", false, function (retCode, returnTextMaxX) {
                                                                                                            var HL1EndXNew = returnTextMaxX + (2 * contextObj.commonServices.g_dblDwgRatio);
                                                                                                            var VL6StartX = returnTextMaxX + (2 * contextObj.commonServices.g_dblDwgRatio);
                                                                                                            contextObj.createLegendLines(HL1EndX, HL1StartY, HL1EndXNew, HL1StartY, function (retCode) {//HL1New
                                                                                                                contextObj.createLegendLines(HL1EndX, rtnHL2StartY, HL1EndXNew, rtnHL2StartY, function (retCode) {//HL2New
                                                                                                                    contextObj.createLegendLines(HL1EndX, VL1EndY, HL1EndXNew, VL1EndY, function (retCode) {//HL3New
                                                                                                                        contextObj.createLegendLines(VL5StartX, HL1StartY, VL5StartX, VL1EndY, function (retCode) {//VL5
                                                                                                                            contextObj.createLegendLines(VL6StartX, HL1StartY, VL6StartX, VL1EndY, function (retCode) {//VL6
                                                                                                                                let startYSp = VL1EndY - intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
                                                                                                                                contextObj.getSpStandardOrgLevelEmpDetails(dblX, startYSp, intDistRectHeight, function (retCode) {
                                                                                                                                    resCallback(0)
                                                                                                                                });

                                                                                                                            });
                                                                                                                        });
                                                                                                                    });
                                                                                                                });
                                                                                                            });

                                                                                                        });
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            else
                                                                                                resCallback(0);
                                                                                        });
                                                                                    }
                                                                                    else {
                                                                                        contextObj.createDisplayOrderLegend(contextObj.displaySettingData, HL1StartX, VL1EndY, function (retCode) {
                                                                                            resCallback(0)
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                            else
                                                                                contextObj.createDisplayOrderLegend(contextObj.displaySettingData, HL1StartX, VL1EndY, function (retCode) {
                                                                                    resCallback(0)
                                                                                });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            }
                                        });
                                    }
                                });
                        }

                    });
                }
            });
    }
    // creating legend details for hatchPattern,distMap criteria,also it's Area (have sub fun)
    getDistributionByName = function (dblX, intDistRectHeight, dblY, strTextHandle, TextMaxX, HL2StartY, intDistRectWidth, HL1StartX, VL2StartX, resCallback) {
        let contextObj = this;
        let dblStartY;
        let dblStartY1;
        let VL1EndY;
        dblX = dblX + (intDistRectHeight / 2);
        contextObj.objiWhiz.createText("$LEGEND", 7, dblX + (intDistRectHeight + (4 * contextObj.commonServices.g_dblDwgRatio)), dblY - (intDistRectHeight / 3), contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
            contextObj.commonServices.g_intSpaceDataTextWidth, contextObj.selectedOrgLevelName, contextObj.commonServices.g_strTextStyleName, contextObj.commonServices.g_strSpaceDataTextLegendStyleId, function (retCode, orgLevelTextHandle) {
                if (retCode != 0)
                    console.log("createText returned with error code : ", retCode);
                else {
                    console.log("orgLevelTextHandle: ", orgLevelTextHandle);
                    contextObj.objiWhiz.getEntityExtents(orgLevelTextHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                        if (retCode != 0) {
                            console.log("getEntityExtents faild due to ", retCode);
                        }
                        else {
                            dblStartY = dblY;
                            if (TextMaxX == 0)
                                TextMaxX = MaxX;
                            else if (MaxX > TextMaxX)
                                TextMaxX = MaxX;
                            dblY = dblY - intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
                            HL2StartY = dblY;
                            dblY = dblY - intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
                            dblStartY1 = dblY;
                            var legentData = contextObj.legendDataArray.slice();
                            if (legentData.length == 0) {
                                resCallback(-1, 0, 0, 0, 0, 0);
                                return;
                            }
                            else {
                                contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, function (retCode, dblX, intDistRectHeight, intDistRectWidth, dblY, rtnVL2StartX, rtnTextMaxX, rtnVL1EndY) {
                                    if (retCode == 0) {
                                        dblY = dblStartY;
                                        //'VL3StartX=TextMaxX +50
                                        let VL3StartX = rtnTextMaxX + (contextObj.commonServices.g_intLegendTextSize) + (2 * contextObj.commonServices.g_dblDwgRatio);
                                        //'dblX=TextMaxX +100
                                        dblX = rtnTextMaxX + (contextObj.commonServices.g_intLegendTextSize) + (4 * contextObj.commonServices.g_dblDwgRatio);
                                        contextObj.objiWhiz.createText("$LEGEND", 7, dblX, dblY - (intDistRectHeight / 3), contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
                                            contextObj.commonServices.g_intSpaceDataTextWidth, "Area (" + contextObj.commonServices.areaUnit + ")", contextObj.commonServices.g_strTextStyleName, contextObj.commonServices.g_strSpaceDataTextLegendStyleId, function (retCode, entityHandle) {
                                                if (retCode != 0) {
                                                    console.log("createText returned with error code : ", retCode);
                                                }
                                                else {
                                                    console.log("orgLevelItemTextHandle: ", entityHandle);
                                                    contextObj.objiWhiz.getEntityExtents(entityHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                                                        if (retCode != 0) {
                                                            console.log("getEntityExtents faild due to ", retCode);
                                                        }
                                                        else {
                                                            dblStartY = dblY;
                                                            if (TextMaxX == 0)
                                                                TextMaxX = MaxX;
                                                            else if (MaxX > TextMaxX)
                                                                TextMaxX = MaxX;
                                                            // dblY = dblY - intDistRectHeight - (6 * contextObj.commonServices.g_dblDwgRatio);
                                                            var legentDataForArea = contextObj.legendDataArray.slice();
                                                            if (legentDataForArea.length == 0) {
                                                                resCallback(-1, 0, 0, 0, 0, 0);
                                                            }
                                                            else {
                                                                contextObj.displayAreaValues(legentDataForArea, VL3StartX, dblStartY1, intDistRectHeight, TextMaxX, function (retCode, TextMaxX) {
                                                                    if (retCode == 0) {
                                                                        resCallback(0, TextMaxX, rtnVL1EndY, HL2StartY, rtnVL2StartX, VL3StartX);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            });
                                    }
                                    // contextObj.objiWhiz.zoomExtents(function () { });
                                });
                            }
                        }
                    });
                }
            });
    }
    // hatchPattern,distMap criteria legend details
    hatchPatternLegent = function (legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback) {
        var contextObj = this;
        var hatchHandle = [];
        var strTextHandle = [];
        if (legentData.length > contextObj.arrayCount) {
            var legentDataItem = legentData[contextObj.arrayCount];
            console.log(" dblX - (intDistRectHight / 2), dblY, intDistRectWidth, intDistRectHight ", dblX - (intDistRectHeight / 2), dblY, intDistRectWidth, intDistRectHeight);

            console.log("legentDataItem ", legentDataItem);
            legentDataItem.HatchObj.HatchScale = 1;
            //contextObj.objiWhiz.hatchEntity("$LEGEND", entityHandle, legentDataItem.HatchObj.ColorId, legentDataItem.HatchObj.HatchAngle, legentDataItem.HatchObj.HatchScale, legentDataItem.HatchObj.HatchPatternId, false, function (retCode, hatchHandle) {
            var tempCoords = (dblX - intDistRectWidth) + contextObj.commonServices.columnDelimiter + (dblY - intDistRectHeight / 2) + contextObj.commonServices.rowDelimiter +
                (dblX) + contextObj.commonServices.columnDelimiter + (dblY - intDistRectHeight / 2) + contextObj.commonServices.rowDelimiter +
                (dblX) + contextObj.commonServices.columnDelimiter + (dblY + intDistRectHeight / 2) + contextObj.commonServices.rowDelimiter +
                (dblX - intDistRectWidth) + contextObj.commonServices.columnDelimiter + (dblY + intDistRectHeight / 2) + contextObj.commonServices.rowDelimiter;
            var mapCoords = [tempCoords];
            var rgbColors = [];
            rgbColors.push(contextObj.hexToRgb(legentDataItem.HatchObj.RGBColor));
            var hatchId = [0];
            var retCode = contextObj.objiWhiz.createMapWithCoords(mapCoords, rgbColors, hatchId);
            if (retCode != 0) {
                console.log("createMap returned with error code : ", retCode);
                //legentData.pop();
                contextObj.arrayCount++;
                contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
            }
            else {
                contextObj.legendRectHandles += hatchId[0];
                var minX = [0], minY = [0], maxX = [0], maxY = [0];
                retCode = contextObj.objiWhiz.getExtentsOfCoords(tempCoords, minX, minY, maxX, maxY);
                if (retCode != 0) {
                    console.log("getEntityExtents faild due to ", retCode);
                    console.log("hatchObjhatchObj", legentDataItem);
                    //legentData.pop();
                    contextObj.arrayCount++;
                    contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
                }
                else {
                    //  dblX + (intDistRectHeight + (4 * contextObj.commonServices.g_dblDwgRatio))
                    // HL1StartX = MinX - (intDistRectHeight) + (4 * contextObj.commonServices.g_dblDwgRatio);
                    VL2StartX = maxX[0] + (intDistRectHeight) + (2 * contextObj.commonServices.g_dblDwgRatio);
                    VL1EndY = minY[0] - (intDistRectHeight) - (1 * contextObj.commonServices.g_dblDwgRatio);
                    console.log("VL2StartX + (2 * contextObj.commonServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3)", VL2StartX + (2 * contextObj.commonServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3));
                    contextObj.objiWhiz.createText("$LEGEND", 7, VL2StartX + (2 * contextObj.commonServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3), contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
                        contextObj.commonServices.g_intSpaceDataTextWidth, legentDataItem.OrglevelName, contextObj.commonServices.g_strTextStyleName, contextObj.commonServices.g_strSpaceDataTextLegendStyleId, function (retCode, orgLevelItemTextHandle) {
                            if (retCode != 0) {
                                console.log("createText returned with error code : ", retCode);
                                //legentData.pop();
                                contextObj.arrayCount++;
                                contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
                            }
                            else {
                                console.log("orgLevelItemTextHandle: ", orgLevelItemTextHandle);
                                contextObj.objiWhiz.getEntityExtents(orgLevelItemTextHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                                    if (retCode != 0) {
                                        console.log("getEntityExtents faild due to ", retCode);
                                    }
                                    else {
                                        if (MaxX > TextMaxX) {
                                            TextMaxX = MaxX;
                                            console.log("TextMaxX", TextMaxX);
                                        }

                                    }
                                    console.log("Y", dblY);
                                    dblY = dblY - intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);

                                    //legentData.pop();
                                    contextObj.arrayCount++;
                                    contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
                                });
                            }
                        });
                }
            }
        }
        else {
            contextObj.arrayCount = 0;
            resCallback(0, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY);
            console.log("hit hatch exit");
        }
    }

    //hatchPatternLegent = function (legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback) {
    //    var contextObj = this;
    //    var hatchHandle = [];
    //    var strTextHandle = [];
    //    if (legentData.length > contextObj.arrayCount) {
    //        var legentDataItem = legentData[contextObj.arrayCount];
    //        console.log(" dblX - (intDistRectHight / 2), dblY, intDistRectWidth, intDistRectHight ", dblX - (intDistRectHeight / 2), dblY, intDistRectWidth, intDistRectHeight);
    //        contextObj.objiWhiz.createRectangle("$LEGEND", legentDataItem.HatchObj.ColorId, dblX - (intDistRectHeight / 2), dblY, intDistRectWidth, intDistRectHeight, contextObj.commonServices.g_intDistLineWidth, contextObj.commonServices.g_intDistLineType, contextObj.commonServices.g_intDistLineTypeScale, function (retCode, entityHandle) {
    //            if (retCode != 0) {
    //                console.log("createRectangle returned with error code : ", retCode);
    //                //legentData.pop();
    //                contextObj.arrayCount++;
    //                contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
    //            }
    //            else {
    //                console.log("legentDataItem ", legentDataItem);
    //                legentDataItem.HatchObj.HatchScale = 1;
    //                //contextObj.objiWhiz.hatchEntity("$LEGEND", entityHandle, legentDataItem.HatchObj.ColorId, legentDataItem.HatchObj.HatchAngle, legentDataItem.HatchObj.HatchScale, legentDataItem.HatchObj.HatchPatternId, false, function (retCode, hatchHandle) {
    //                contextObj.legendRectHandles += entityHandle + contextObj.commonServices.rowDelimiter;
    //                var mapHandles = [entityHandle];
    //                var rgbColors = [];
    //                rgbColors.push(contextObj.hexToRgb(legentDataItem.HatchObj.RGBColor));
    //                contextObj.objiWhiz.createMap(mapHandles, rgbColors, function (retCode) {
    //                    if (retCode != 0) {
    //                        console.log("createMap returned with error code : ", retCode);
    //                        //legentData.pop();
    //                        contextObj.arrayCount++;
    //                        contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
    //                    }
    //                    else {
    //                        console.log("Entity handle: ", entityHandle);
    //                        contextObj.objiWhiz.getEntityExtents(entityHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
    //                            if (retCode != 0) {
    //                                console.log("getEntityExtents faild due to ", retCode);
    //                                console.log("hatchObjhatchObj", legentDataItem);
    //                                //legentData.pop();
    //                                contextObj.arrayCount++;
    //                                contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
    //                            }
    //                            else {
    //                                //  dblX + (intDistRectHeight + (4 * contextObj.commonServices.g_dblDwgRatio))
    //                                // HL1StartX = MinX - (intDistRectHeight) + (4 * contextObj.commonServices.g_dblDwgRatio);
    //                                VL2StartX = MaxX + (intDistRectHeight) + (2 * contextObj.commonServices.g_dblDwgRatio);
    //                                VL1EndY = MinY - (intDistRectHeight) - (1 * contextObj.commonServices.g_dblDwgRatio);
    //                                console.log("VL2StartX + (2 * contextObj.commonServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3)", VL2StartX + (2 * contextObj.commonServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3));
    //                                contextObj.objiWhiz.createText("$LEGEND", 7, VL2StartX + (2 * contextObj.commonServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3), contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
    //                                    contextObj.commonServices.g_intSpaceDataTextWidth, legentDataItem.OrglevelName, contextObj.commonServices.g_strTextStyleName, contextObj.commonServices.g_strSpaceDataTextLegendStyleId, function (retCode, orgLevelItemTextHandle) {
    //                                        if (retCode != 0) {
    //                                            console.log("createText returned with error code : ", retCode);
    //                                            //legentData.pop();
    //                                            contextObj.arrayCount++;
    //                                            contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
    //                                        }
    //                                        else {
    //                                            console.log("orgLevelItemTextHandle: ", orgLevelItemTextHandle);
    //                                            contextObj.objiWhiz.getEntityExtents(orgLevelItemTextHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
    //                                                if (retCode != 0) {
    //                                                    console.log("getEntityExtents faild due to ", retCode);
    //                                                }
    //                                                else {
    //                                                    if (MaxX > TextMaxX) {
    //                                                        TextMaxX = MaxX;
    //                                                        console.log("TextMaxX", TextMaxX);
    //                                                    }

    //                                                }
    //                                                console.log("Y", dblY);
    //                                                dblY = dblY - intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);

    //                                                //legentData.pop();
    //                                                contextObj.arrayCount++;
    //                                                contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
    //                                            });
    //                                        }
    //                                    });
    //                            }
    //                        });
    //                    }
    //                });
    //            }
    //            //  dblY = dblY - intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
    //        });
    //    }
    //    else {
    //        contextObj.arrayCount = 0;
    //        resCallback(0, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY);
    //        console.log("hit hatch exit");
    //    }
    //}
    //hatchPatternLegent = function (legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback) {
    //    var contextObj = this;
    //    var hatchHandle = [];
    //    var strTextHandle = [];
    //    if (legentData.length > contextObj.arrayCount) {
    //        var legentDataItem = legentData[contextObj.arrayCount];
    //        console.log(" dblX - (intDistRectHight / 2), dblY, intDistRectWidth, intDistRectHight ", dblX - (intDistRectHeight / 2), dblY, intDistRectWidth, intDistRectHeight);
    //        contextObj.objiWhiz.createRectangle("$LEGEND", legentDataItem.HatchObj.ColorId, dblX - (intDistRectHeight / 2), dblY, intDistRectWidth, intDistRectHeight, contextObj.commonServices.g_intDistLineWidth, contextObj.commonServices.g_intDistLineType, contextObj.commonServices.g_intDistLineTypeScale, function (retCode, entityHandle) {
    //            if (retCode != 0) {
    //                console.log("createRectangle returned with error code : ", retCode);
    //                //legentData.pop();
    //                contextObj.arrayCount++;
    //                contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
    //            }
    //            else {
    //                console.log("legentDataItem ", legentDataItem);
    //                legentDataItem.HatchObj.HatchScale = 1;
    //                contextObj.objiWhiz.hatchEntity("$LEGEND", entityHandle, legentDataItem.HatchObj.ColorId, legentDataItem.HatchObj.HatchAngle, legentDataItem.HatchObj.HatchScale, legentDataItem.HatchObj.HatchPatternId, false, function (retCode, hatchHandle) {
    //                    if (retCode != 0) {
    //                        console.log("hatchEntity returned with error code : ", retCode);
    //                        //legentData.pop();
    //                        contextObj.arrayCount++;
    //                        contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
    //                    }
    //                    else {
    //                        console.log("Entity handle: ", entityHandle);
    //                        contextObj.objiWhiz.getEntityExtents(hatchHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
    //                            if (retCode != 0) {
    //                                console.log("getEntityExtents faild due to ", retCode);
    //                                console.log("hatchObjhatchObj", legentDataItem);
    //                                //legentData.pop();
    //                                contextObj.arrayCount++;
    //                                contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
    //                            }
    //                            else {
    //                                //  dblX + (intDistRectHeight + (4 * contextObj.commonServices.g_dblDwgRatio))
    //                                // HL1StartX = MinX - (intDistRectHeight) + (4 * contextObj.commonServices.g_dblDwgRatio);
    //                                VL2StartX = MaxX + (intDistRectHeight) + (2 * contextObj.commonServices.g_dblDwgRatio);
    //                                VL1EndY = MinY - (intDistRectHeight) - (1 * contextObj.commonServices.g_dblDwgRatio);
    //                                console.log("VL2StartX + (2 * contextObj.commonServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3)", VL2StartX + (2 * contextObj.commonServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3));
    //                                contextObj.objiWhiz.createText("$LEGEND", 7, VL2StartX + (2 * contextObj.commonServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3), contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
    //                                    contextObj.commonServices.g_intSpaceDataTextWidth, legentDataItem.OrglevelName, contextObj.commonServices.g_strTextStyleName, contextObj.commonServices.g_strSpaceDataTextLegendStyleId, function (retCode, orgLevelItemTextHandle) {
    //                                        if (retCode != 0) {
    //                                            console.log("createText returned with error code : ", retCode);
    //                                            //legentData.pop();
    //                                            contextObj.arrayCount++;
    //                                            contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
    //                                        }
    //                                        else {
    //                                            console.log("orgLevelItemTextHandle: ", orgLevelItemTextHandle);
    //                                            contextObj.objiWhiz.getEntityExtents(orgLevelItemTextHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
    //                                                if (retCode != 0) {
    //                                                    console.log("getEntityExtents faild due to ", retCode);
    //                                                }
    //                                                else {
    //                                                    if (MaxX > TextMaxX) {
    //                                                        TextMaxX = MaxX;
    //                                                        console.log("TextMaxX", TextMaxX);
    //                                                    }

    //                                                }
    //                                                console.log("Y", dblY);
    //                                                dblY = dblY - intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);

    //                                                //legentData.pop();
    //                                                contextObj.arrayCount++;
    //                                                contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
    //                                            });
    //                                        }
    //                                    });
    //                            }
    //                        });
    //                    }
    //                });
    //            }
    //            //  dblY = dblY - intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
    //        });
    //    }
    //    else {
    //        contextObj.arrayCount = 0;
    //        resCallback(0, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY);
    //        console.log("hit hatch exit");
    //    }
    //}
    // Area legend details
    displayAreaValues = function (legentData, VL3StartX, dblY, intDistRectHeight, TextMaxX, resCallback) {
        var contextObj = this;
        if (legentData.length > contextObj.arrayCount) {
            var legentDataItem = legentData[contextObj.arrayCount];

            contextObj.objiWhiz.createText("$LEGEND", 7, TextMaxX, dblY - (intDistRectHeight / 3), contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
                contextObj.commonServices.g_intSpaceDataTextWidth, legentDataItem.Area, contextObj.commonServices.g_strTextStyleName, 9, function (retCode, orgLevelItemTextAreaHandle) {
                    if (retCode != 0) {
                        console.log("createText returned with error code : ", retCode);
                        //legentData.pop();
                        contextObj.arrayCount++;
                        contextObj.displayAreaValues(legentData, VL3StartX, dblY, intDistRectHeight, TextMaxX, resCallback);
                    }
                    else {
                        console.log("orgLevelItemTextHandle: ", orgLevelItemTextAreaHandle);
                        contextObj.objiWhiz.getEntityExtents(orgLevelItemTextAreaHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                            if (retCode != 0) {
                                console.log("getEntityExtents faild due to ", retCode);
                            }
                            else {
                                if (MaxX > TextMaxX) {
                                    TextMaxX = MaxX;
                                    console.log("TextMaxX", TextMaxX);
                                }

                            }
                            console.log("Y", dblY);
                            dblY = dblY - intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);

                            //legentData.pop();
                            contextObj.arrayCount++;
                            contextObj.displayAreaValues(legentData, VL3StartX, dblY, intDistRectHeight, TextMaxX, resCallback);
                        });
                    }
                });
        }
        else {
            contextObj.arrayCount = 0;
            resCallback(0, TextMaxX);
        }

    }
    // for creating lines in Legend
    createLegendLines = function (startX, startY, endX, endY, resCallback) {
        var contextObj = this;
        var tempCoords = startX + contextObj.commonServices.columnDelimiter + startY + contextObj.commonServices.rowDelimiter + endX + contextObj.commonServices.columnDelimiter + endY + contextObj.commonServices.rowDelimiter;
        var coordsArr = [tempCoords];
        var color = [[255, 255, 255]];
        var lineIds = [0];
        var retCode = contextObj.objiWhiz.drawLineWithCoords(coordsArr, color, lineIds);
        if (retCode == 0)
            contextObj.legendLineHandles += lineIds[0];
        resCallback(0);
        //contextObj.objiWhiz.createLine("$LEGEND", 255, startX, startY, endX, endY, function (retCode) {
        //    resCallback(0);
        //});
    }
    // Creating disp setting order in space data in dwg
    createDisplayOrderLegend = function (dispSettingsData, xPos, yPos, resCallback) {
        let formatedText: string = "";
        var contextObj = this;
        var startX = xPos;
        var startY = yPos - (6 * contextObj.commonServices.g_dblDwgRatio);
        var intSize = contextObj.commonServices.g_intLegendTextSize;
        var ratio = [0];
        contextObj.objiWhiz.clientDWGAreaRatio(ratio);
        contextObj.objiWhiz.createText("$LEGEND", 7, startX, startY, contextObj.commonServices.g_intSpaceDataTextAngle, intSize,
            contextObj.commonServices.g_intSpaceDataTextWidth, "Space Data Display Order", contextObj.commonServices.g_strTextStyleName, contextObj.commonServices.g_strSpaceDataTextLegendStyleId, function (retCode, entityHandle) {
                if (retCode != 0)
                    console.log("createText returned with error code : ", retCode);
                else {
                    console.log("Entity handle: ", entityHandle);
                    for (let dispSettingsItem of dispSettingsData) {
                        if (dispSettingsItem.ShowinDrawing) {
                            let textContent = dispSettingsItem.FieldName;
                            //if (textContent == "null" || textContent == null)
                            //    textContent = "-";
                            formatedText += "\\f|b0|l0|c0|p18;\\C1;\\H" + ratio[0] * 3 + ";" + textContent + "\\n";
                        }
                    }
                    let formatedTextFinal: string = "{" + formatedText + "}";
                    console.log("formatedTextFinal", formatedTextFinal);
                    startX = startX + intSize;
                    startY = startY - (intSize + (2 * contextObj.commonServices.g_dblDwgRatio));
                    contextObj.objiWhiz.createMultilineText("$LEGEND", 1, startX, startY, 0, ratio[0] * 1,
                        0, 1, formatedTextFinal, "Standard", 0, function (retCode, entityHandle) {
                            if (retCode != 0) {
                                console.log("createMultilineText returned with error code : ", retCode);
                            }
                            else {
                                resCallback(0);
                            }
                        });
                }
            });
    }

    //************ Employee Legend Functions **********//

    // Occupancy Seats and Free Seats Details of Org Level in both  table (main fun )
    getEmployeeLegendData = function (empStartX, empStartY, DistributionMapLegendData, category, isSpStandardLegend, resCallback) {
        var contextObj = this;
        var empOrgUnitOccupancyDistributionMapLegendData = DistributionMapLegendData;
        var TextMaxX = 0;
        var dataVlaue: string = "";
        var legentDataForOccupiedSeats: any;
        contextObj.objiWhiz.createText("$LEGEND", 7, empStartX, empStartY, contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
            contextObj.commonServices.g_intSpaceDataTextWidth, category, contextObj.commonServices.g_strTextStyleName, 8, function (retCode, textHandle) {
                if (retCode != 0)
                    console.log("createText returned with error code : ", retCode);
                else {
                    contextObj.objiWhiz.getEntityExtents(textHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                        if (retCode != 0) {
                            console.log("getEntityExtents faild due to ", retCode);
                        }
                        else {
                            TextMaxX = MaxX;
                            empStartY = empStartY - contextObj.intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
                            empStartY = empStartY - contextObj.intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
                            var empStartYData = empStartY;
                            contextObj.objiWhiz.createText("$LEGEND", 7, empStartX, MinY - (1 * contextObj.commonServices.g_dblDwgRatio), contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
                                contextObj.commonServices.g_intSpaceDataTextWidth, "Seats", contextObj.commonServices.g_strTextStyleName, 2, function (retCode, textHandle2) {
                                    if (retCode != 0)
                                        console.log("createText returned with error code : ", retCode);
                                    else {
                                        console.log("Entity handle: ", textHandle2);
                                        if (category == "Occupied")
                                            dataVlaue = 'OccupiedSeats';
                                        else
                                            dataVlaue = 'FreeSeats';
                                        if (isSpStandardLegend) {
                                            // empStartYData = empStartY = empStartY - contextObj.intDistRectHeight + (1 * contextObj.commonServices.g_dblDwgRatio);
                                            empStartYData = empStartYData + (contextObj.intDistRectHeight / 3);
                                            legentDataForOccupiedSeats = contextObj.empLegentDataArray.slice();
                                            contextObj.createEmpDistributionLegend(empStartX, empStartYData, dataVlaue, legentDataForOccupiedSeats, "", TextMaxX, function (retCode, rtnTextMaxX) {
                                                if (retCode == 0) {

                                                    resCallback(0, rtnTextMaxX);
                                                }
                                            });
                                        }
                                        else {
                                            legentDataForOccupiedSeats = contextObj.legendDataArray.slice();
                                            contextObj.createEmpDistributionLegend(empStartX, empStartYData, dataVlaue, legentDataForOccupiedSeats, empOrgUnitOccupancyDistributionMapLegendData, TextMaxX, function (retCode, rtnTextMaxX) {
                                                if (retCode == 0) {

                                                    resCallback(0, rtnTextMaxX);
                                                }
                                            });
                                        }
                                    }
                                });
                        }

                    });
                }
            });
    }
    // Occupancy Seats and Free Seats Details of Org Level in both  table (sub fun )
    createEmpDistributionLegend = function (empStartX, empStartY, dataVlaue, legentDataForOccupiedSeats, empOrgUnitOccupancyDistributionMapLegendData, TextMaxX, resCallback) {
        var contextObj = this;
        var occupiedSeats: any;
        
        if (legentDataForOccupiedSeats.length > contextObj.arrayCount) {
            var legentDataItem = legentDataForOccupiedSeats[contextObj.arrayCount];
            if (empOrgUnitOccupancyDistributionMapLegendData != "") {
                let index = empOrgUnitOccupancyDistributionMapLegendData.findIndex(function (el) { return el.OrgUnitId === legentDataItem.OrgunitId });
                if (index != -1)
                    occupiedSeats = empOrgUnitOccupancyDistributionMapLegendData[index][dataVlaue];
            } else {
                occupiedSeats = legentDataItem[dataVlaue];
            }
            if (occupiedSeats == undefined)
                occupiedSeats = "-";
            contextObj.objiWhiz.createText("$LEGEND", 7, empStartX, empStartY - (contextObj.intDistRectHeight / 3), contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
                contextObj.commonServices.g_intSpaceDataTextWidth, occupiedSeats, contextObj.commonServices.g_strTextStyleName, 8, function (retCode, orgLevelItemTextAreaHandle) {
                    if (retCode != 0) {
                        console.log("createText returned with error code : ", retCode);
                        contextObj.arrayCount++;
                        contextObj.createEmpDistributionLegend(empStartX, empStartY, dataVlaue, legentDataForOccupiedSeats, empOrgUnitOccupancyDistributionMapLegendData, TextMaxX, resCallback);
                    }
                    else {
                        console.log("orgLevelItemTextHandle: ", orgLevelItemTextAreaHandle);
                        console.log("TextMaxXTextMaxX", TextMaxX);
                        contextObj.objiWhiz.getEntityExtents(orgLevelItemTextAreaHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                            if (retCode != 0) {
                                console.log("getEntityExtents faild due to ", retCode);
                            }
                            else {
                                if (MaxX > TextMaxX) {
                                    TextMaxX = MaxX;
                                    console.log("TextMaxXTextMaxXTextMaxX", TextMaxX);
                                }
                                console.log("Y", empStartY);
                                empStartY = empStartY - contextObj.intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
                                contextObj.arrayCount++;
                                contextObj.createEmpDistributionLegend(empStartX, empStartY, dataVlaue, legentDataForOccupiedSeats, empOrgUnitOccupancyDistributionMapLegendData, TextMaxX, resCallback);
                            }

                        });
                    }
                });
        }
        else {
            contextObj.arrayCount = 0;
            resCallback(0, TextMaxX);
        }

    }
    // Space Standard of  Org Level(s) Details ,second table (main fun-have 6 sub functions )
    getSpStandardOrgLevelEmpDetails = function (startX, startY, intDistRectHeight, resCallback) {
        var contextObj = this;
        let HL1StartX = startX - (8 * contextObj.commonServices.g_dblDwgRatio);
        let HL1StartY = startY + (4 * contextObj.commonServices.g_dblDwgRatio);
        var TextMaxX = 0;
        contextObj.spaceServices.getOrgUnitSpaceStandardDistributionMapLegendData(contextObj.orgLevelNumber, contextObj.drawingId).subscribe(function (resultData) {
            contextObj.empOrgUnitSpStandarsLegendData = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.empOrgUnitSpStandarsLegendData.length > 0) {
                let distributionMapLegendData = contextObj.empOrgUnitSpStandarsLegendData.slice();
                contextObj.getOrgUnitSpaceStandardDistributionMapLegendDataModified(distributionMapLegendData, function (rtnDistributionMapLegendData) {
                    console.log("rtnDistributionMapLegendData ", rtnDistributionMapLegendData);
                    console.log("this.empLegentDataArray", contextObj.empLegentDataArray);
                    if (rtnDistributionMapLegendData.length > 0) {
                        var empSpStartX = startX;//+ (contextObj.commonServices.g_intLegendTextSize) + (6 * contextObj.commonServices.g_dblDwgRatio);
                        contextObj.createOrgLevlSpStandardData(empSpStartX, startY, rtnDistributionMapLegendData, intDistRectHeight, TextMaxX, function (retCode, rtnTextMaxX, rtnHlYpositionArray, HL2StartY, VL1EndY) {
                            if (retCode == 0) {
                                var legenddata = contextObj.empLegentDataArray;
                                console.log("legenddatalegenddatalegenddata", legenddata);
                                let VL2StartX = rtnTextMaxX + (contextObj.commonServices.g_intLegendTextSize) + (2 * contextObj.commonServices.g_dblDwgRatio);
                                empSpStartX = rtnTextMaxX + (contextObj.commonServices.g_intLegendTextSize) + (6 * contextObj.commonServices.g_dblDwgRatio);
                                contextObj.createOrgLevlSpStandardDataNameInLegend(legenddata, empSpStartX, startY, function (retCode, rtntextMaxX) {
                                    let VL3StartX = rtntextMaxX + (contextObj.commonServices.g_intLegendTextSize) + (2 * contextObj.commonServices.g_dblDwgRatio);
                                    empSpStartX = VL3StartX + (contextObj.commonServices.g_intLegendTextSize) + (6 * contextObj.commonServices.g_dblDwgRatio);
                                    startY = startY - (intDistRectHeight / 3);
                                    contextObj.getEmployeeLegendData(empSpStartX, startY, "", "Occupied", true, function (retCode, rtnTextMaxX) {
                                        if (retCode == 0) {
                                            empSpStartX = rtnTextMaxX + (contextObj.commonServices.g_intLegendTextSize) + (6 * contextObj.commonServices.g_dblDwgRatio);
                                            var VL4StartX = rtnTextMaxX + (2 * contextObj.commonServices.g_dblDwgRatio);
                                            contextObj.getEmployeeLegendData(empSpStartX, startY, "", "Free", true, function (retCode, returnTextMaxX) {
                                                var HL1EndXNew = returnTextMaxX + (2 * contextObj.commonServices.g_dblDwgRatio);
                                                var VL5StartX = returnTextMaxX + (2 * contextObj.commonServices.g_dblDwgRatio);
                                                contextObj.createLegendLines(HL1StartX, HL1StartY, HL1EndXNew, HL1StartY, function (retCode) {//HL1New
                                                    contextObj.createLegendLines(HL1StartX, HL2StartY, HL1EndXNew, HL2StartY, function (retCode) {//HL2New
                                                        contextObj.createLegendLines(HL1StartX, VL1EndY, HL1EndXNew, VL1EndY, function (retCode) {//HLFinalNew
                                                            contextObj.createLegendLines(HL1StartX, HL1StartY, HL1StartX, VL1EndY, function (retCode) {//VL1New
                                                                contextObj.createLegendLines(VL2StartX, HL1StartY, VL2StartX, VL1EndY, function (retCode) {//VL2New
                                                                    contextObj.createLegendLines(VL3StartX, HL1StartY, VL3StartX, VL1EndY, function (retCode) {//VL3New
                                                                        contextObj.createLegendLines(VL4StartX, HL1StartY, VL4StartX, VL1EndY, function (retCode) {//VL4New
                                                                            contextObj.createLegendLines(VL5StartX, HL1StartY, VL5StartX, VL1EndY, function (retCode) {//VL5New
                                                                                if (rtnHlYpositionArray.length > 0) {
                                                                                    contextObj.dynamicHLLines(rtnHlYpositionArray, HL1StartX, HL1EndXNew, function (retCode) {
                                                                                        contextObj.createDisplayOrderLegend(contextObj.displaySettingData, HL1StartX, VL1EndY, function (retCode) {
                                                                                            resCallback(0);
                                                                                        });
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    contextObj.createDisplayOrderLegend(contextObj.displaySettingData, HL1StartX, VL1EndY, function (retCode) {
                                                                                        resCallback(0);
                                                                                    });
                                                                                }
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    }
                    else
                        resCallback(0)
                });
            }
            else
                resCallback(0)
        });
    }
    // data modifaication of spstandard details (sub fun 1)
    getOrgUnitSpaceStandardDistributionMapLegendDataModified = function (distData, resCallback) {
        var contextObj = this;
        contextObj.empLegentDataArray = [];
        for (let dataItem of distData) {
            if (dataItem[this.selectedOrgLevel] != null) {
                contextObj.empLegentDataArray.push({ OrglevelName: dataItem['Level Name'], SpaceStandardName: dataItem['SpaceStandardName'], L1Name: dataItem['L1Name'], OccupiedSeats: dataItem['OccupiedSeats'], FreeSeats: dataItem['FreeSeats'] });
            }
        }
        console.log("this.empLegentDataArrayempLegentDataArray", contextObj.empLegentDataArray);
        resCallback(contextObj.empLegentDataArray);
    }
    // data modifaication of spstandard details (first column details- sub fun 2)
    createOrgLevlSpStandardData = function (empSpStartX, startY, distributionMapLegendData, intDistRectHeight, TextMaxX, resCallback) {
        let contextObj = this;
        contextObj.objiWhiz.createText("$LEGEND", 7, empSpStartX, startY - (intDistRectHeight / 3), contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
            contextObj.commonServices.g_intSpaceDataTextWidth, contextObj.selectedOrgLevelName, contextObj.commonServices.g_strTextStyleName, contextObj.commonServices.g_strSpaceDataTextLegendStyleId, function (retCode, orgLevelTextHandle) {
                if (retCode != 0)
                    console.log("createText returned with error code : ", retCode);
                else {
                    console.log("orgLevelTextHandle: ", orgLevelTextHandle);
                    contextObj.objiWhiz.getEntityExtents(orgLevelTextHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                        if (retCode != 0) {
                            console.log("getEntityExtents faild due to ", retCode);
                        }
                        else {
                            if (TextMaxX == 0)
                                TextMaxX = MaxX;
                            else if (MaxX > TextMaxX)
                                TextMaxX = MaxX;
                            let startDataX = empSpStartX;//+ (contextObj.intDistRectHeight + (4 * contextObj.commonServices.g_dblDwgRatio));
                            var dataStartY = startY;
                            dataStartY = dataStartY - intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
                            let HL2StartY = dataStartY;
                            dataStartY = dataStartY - intDistRectHeight - (1 * contextObj.commonServices.g_dblDwgRatio);
                            let startDataY = dataStartY - (contextObj.intDistRectHeight / 3);
                            let previousOrglavelName = distributionMapLegendData[0]['L1Name'];
                            var hlYposition: any[] = [];
                            contextObj.createEmpOrglevelLegend(startDataX, startDataY, distributionMapLegendData, previousOrglavelName, hlYposition, TextMaxX, function (retCode, rtnHlYposition, rtnTextMaxX, VL1EndY) {
                                if (retCode == 0) {
                                    console.log("hlYposition ", rtnHlYposition);
                                    resCallback(0, rtnTextMaxX, rtnHlYposition, HL2StartY, VL1EndY);
                                }
                            });
                        }
                    });
                }
            });
    }
    // data modifaication of spstandard details (first column details- sub fun 3)
    createEmpOrglevelLegend = function (startDataX, startDataY, distributionMapLegendData, previousOrglavelName, hlYposition, TextMaxX, resCallback) {
        var contextObj = this;
        var previousOrglavelName;

        if (distributionMapLegendData.length > contextObj.arrayCount) {
            let distributionMapLegendDataitem = distributionMapLegendData[contextObj.arrayCount];
            let displaytextName = distributionMapLegendDataitem['OrglevelName'];
            if (previousOrglavelName != distributionMapLegendDataitem['L1Name']) {
                hlYposition.push(startDataY + contextObj.intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio));
                //  startDataY = startDataY - contextObj.intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
            }
            if (displaytextName == null) {
                startDataY = startDataY - contextObj.intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
                previousOrglavelName = distributionMapLegendDataitem['L1Name'];
                contextObj.arrayCount++;
                contextObj.createEmpOrglevelLegend(startDataX, startDataY, distributionMapLegendData, previousOrglavelName, hlYposition, TextMaxX, resCallback);
            }
            else {

                contextObj.objiWhiz.createText("$LEGEND", 7, startDataX, startDataY, contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
                    contextObj.commonServices.g_intSpaceDataTextWidth, displaytextName, contextObj.commonServices.g_strTextStyleName, contextObj.commonServices.g_strSpaceDataTextLegendStyleId, function (retCode, orgLevelTextHandle) {
                        if (retCode != 0)
                            console.log("createText returned with error code : ", retCode);
                        else {
                            startDataY = startDataY - contextObj.intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
                            contextObj.objiWhiz.getEntityExtents(orgLevelTextHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                                if (retCode != 0) {
                                    console.log("getEntityExtents faild due to ", retCode);
                                }
                                else {
                                    if (MaxX > TextMaxX)
                                        TextMaxX = MaxX;
                                    previousOrglavelName = distributionMapLegendDataitem['L1Name'];
                                    contextObj.arrayCount++
                                    contextObj.createEmpOrglevelLegend(startDataX, startDataY, distributionMapLegendData, previousOrglavelName, hlYposition, TextMaxX, resCallback);
                                }
                            });
                        }
                    });
            }

        }
        else {
            contextObj.arrayCount = 0;
            resCallback(0, hlYposition, TextMaxX, startDataY);
        }

    }

    // data modifaication of spstandard details (second column details- sub fun 4)
    createOrgLevlSpStandardDataNameInLegend = function (legenddata, startX, startY, resCallback) {
        var contextObj = this;
        var TextMaxX = 0;
        contextObj.objiWhiz.createText("$LEGEND", 7, startX, startY - (contextObj.intDistRectHeight / 3), contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
            contextObj.commonServices.g_intSpaceDataTextWidth, "Space Standard", contextObj.commonServices.g_strTextStyleName, contextObj.commonServices.g_strSpaceDataTextLegendStyleId, function (retCode, orgLevelTextHandle) {
                if (retCode != 0)
                    console.log("createText returned with error code : ", retCode);
                else {
                    console.log("orgLevelTextHandle: ", orgLevelTextHandle);
                    contextObj.objiWhiz.getEntityExtents(orgLevelTextHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                        if (retCode != 0) {
                            console.log("getEntityExtents faild due to ", retCode);
                        }
                        else {
                            if (TextMaxX == 0)
                                TextMaxX = MaxX;
                            else if (MaxX > TextMaxX)
                                TextMaxX = MaxX;
                            let startDataX = startX;//+ (contextObj.intDistRectHeight + (4 * contextObj.commonServices.g_dblDwgRatio));
                            startY = startY - contextObj.intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);
                            startY = startY - contextObj.intDistRectHeight - (1 * contextObj.commonServices.g_dblDwgRatio);
                            let startDataY = startY;
                            contextObj.createOrgLevlSpStandardDatavaluesInLegend(startDataX, startDataY, legenddata, TextMaxX, function (retCode, rtnTextMax) {
                                resCallback(0, rtnTextMax);
                            });
                        }
                    });
                }
            });
    }
    // data modifaication of spstandard details (second column details- sub fun 5)
    createOrgLevlSpStandardDatavaluesInLegend = function (empStartX, empStartY, legendData, TextMaxX, resCallback) {
        var contextObj = this;
        if (legendData.length > contextObj.arrayCount) {
            var legentDataItem = legendData[contextObj.arrayCount];
            var spStandardName = legentDataItem['SpaceStandardName'];
            if (spStandardName == null)
                spStandardName = "-"
            contextObj.objiWhiz.createText("$LEGEND", 7, empStartX, empStartY - (contextObj.intDistRectHeight / 3), contextObj.commonServices.g_intSpaceDataTextAngle, (contextObj.commonServices.g_intLegendTextSize) - (contextObj.commonServices.g_intLegendTextSize * .25),
                contextObj.commonServices.g_intSpaceDataTextWidth, spStandardName, contextObj.commonServices.g_strTextStyleName, contextObj.commonServices.g_strSpaceDataTextLegendStyleId, function (retCode, itemTextHandle) {
                    if (retCode != 0) {
                        console.log("createText returned with error code : ", retCode);
                        contextObj.arrayCount++;
                        contextObj.createOrgLevlSpStandardDatavaluesInLegend(empStartX, empStartY, legendData, TextMaxX, resCallback);
                    }
                    else {
                        console.log("orgLevelItemTextHandle: ", itemTextHandle);
                        console.log("TextMaxXTextMaxX", TextMaxX);
                        contextObj.objiWhiz.getEntityExtents(itemTextHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                            if (retCode != 0) {
                                console.log("getEntityExtents faild due to ", retCode);
                            }
                            else {
                                if (MaxX > TextMaxX) {
                                    TextMaxX = MaxX;
                                    console.log("TextMaxXTextMaxXTextMaxX", TextMaxX);
                                }
                                console.log("Y", empStartY);
                                empStartY = empStartY - contextObj.intDistRectHeight - (2 * contextObj.commonServices.g_dblDwgRatio);

                                contextObj.arrayCount++;
                                contextObj.createOrgLevlSpStandardDatavaluesInLegend(empStartX, empStartY, legendData, TextMaxX, resCallback);
                            }

                        });
                    }
                });
        }
        else {
            contextObj.arrayCount = 0;
            resCallback(0, TextMaxX);
        }
    }
    // data modifaication of spstandard details (dynamic horizontal lines - sub fun 6)
    dynamicHLLines = function (hlLinesPosArray, HL1StartX, HL1EndXNew, resCallback) {
        var contextObj = this;
        if (hlLinesPosArray.length > contextObj.arrayCount) {
            var hlLineYpos = hlLinesPosArray[contextObj.arrayCount];
            contextObj.createLegendLines(HL1StartX, hlLineYpos, HL1EndXNew, hlLineYpos, function (retCode) {//VL5New
                contextObj.arrayCount++;
                contextObj.dynamicHLLines(hlLinesPosArray, HL1StartX, HL1EndXNew, resCallback);
            });
        }
        else {
            contextObj.arrayCount = 0;
            resCallback(0);
        }
    }
    hatchSingleEntity = function (selectedHandle, resCallback) {
        let contextObj = this;
        contextObj.objiWhiz.hatchEntity("$HatchSingleEntity", selectedHandle, contextObj.singleSpaceColor, contextObj.singleSpaceHatchAngle, contextObj.singleSpaceHatchScale, contextObj.singleSpaceHatchPatternId, false, function (retCode, entityHandle) {
            contextObj.objiWhiz.setApplicationLayer("$HatchSingleEntity");
            if (retCode != 0)
                console.log("hatchEntity failed due to ", retCode);
            else
                console.log("Entity handle: ", entityHandle);
            resCallback(retCode);
        });
    }
    hatchSingleEntityOnRightClick = function (selectedHandle, resCallback) {
        let contextObj = this;
        contextObj.objiWhiz.hatchEntity("$HatchSingleEntityOnRightClick", selectedHandle, contextObj.singleSpaceColor, contextObj.singleSpaceHatchAngle, contextObj.singleSpaceHatchScale, contextObj.singleSpaceHatchPatternId, false, function (retCode, entityHandle) {
            contextObj.objiWhiz.setApplicationLayer("$HatchSingleEntityOnRightClick");
            if (retCode != 0)
                console.log("hatchEntity failed due to ", retCode);
            else
                console.log("Entity handle: ", entityHandle);
            resCallback(retCode);
        });
    }
    hatchMultipleEntity = function (selectedHandles, resCallback) {
        let contextObj = this;
        var hatchLayerName: string = "$HatchMultipleEntity";
        //if (selectedHandles.length == 1)
        // hatchLayerName = "$HatchSingleEntity";
        if (selectedHandles.length > contextObj.arrayCount) {
            var selectedHandle = selectedHandles[contextObj.arrayCount];
            contextObj.objiWhiz.hatchEntity(hatchLayerName, selectedHandle, contextObj.singleSpaceColor, contextObj.singleSpaceHatchAngle, contextObj.singleSpaceHatchScale, contextObj.singleSpaceHatchPatternId, false, function (retCode, entityHandle) {
                if (retCode != 0) {
                    console.log("hatchEntity failed due to ", retCode);
                }
                else {
                    console.log("Entity handle: ", entityHandle);
                    contextObj.arrayCount++;
                    contextObj.hatchMultipleEntity(selectedHandles, resCallback);
                }

            });
        }
        else {
            contextObj.arrayCount = 0;
            resCallback(0);
        }

    }
    // to disableFields in SpaceEdit
    getSpaceFields = function (spaceId, target, rescallback) {//target 1.Edit Space 2.Assign Space Standard
        let contextObj = this;
        contextObj.spaceServices.checkEditPrivilageExist(spaceId).subscribe(function (resultData) {
            if (resultData.ServerId > 0) {
                switch (target) {
                    case 1: contextObj.spaceServices.loadSpaceAddEdit(spaceId).subscribe(function (result) {
                        let data = result["Data"];
                        //space key 
                        let retSpaceKey = data.find(function (item) {
                            return item.ReportFieldId === 782;
                        });

                        if (retSpaceKey.FieldValue == "8000" || retSpaceKey.FieldValue == "9000") {
                            let fieldObjLen = data.length;
                            for (let i = 0; i < fieldObjLen; i++) {
                                let rptFieldId = data[i].ReportFieldId;
                                //room No
                                if (rptFieldId != 793) {
                                    data[i].IsEnabled = false;
                                    data[i].ReadOnlyMode = true;
                                }
                            }
                        }
                        else {
                            let retItem = data.find(function (item) {
                                return item.ReportFieldId === 783; //space category object
                            });

                            //space category ddl filtering
                            if (retItem.LookupDetails && retItem.LookupDetails.LookupValues.length > 0) {
                                retItem.LookupDetails.LookupValues = retItem.LookupDetails.LookupValues.filter(function (el) {
                                    return el["Id"] < 6;
                                });
                            }
                            if (retItem.FieldValue != "4") {
                                let fieldObjLen = data.length;
                                for (let i = 0; i < fieldObjLen; i++) {
                                    let rptFieldId = data[i].ReportFieldId;
                                    //org unit and cost category disabling
                                    if ((rptFieldId >= 290 && rptFieldId <= 298) || (rptFieldId == 779)) {
                                        data[i].IsEnabled = false;
                                        data[i].ReadOnlyMode = true;
                                    }
                                }
                            } else {
                                if (contextObj.commonServices.sessionUserRoleId == 7) {
                                    let fieldObjLen = data.length;
                                    for (let i = 0; i < fieldObjLen; i++) {
                                        let rptFieldId = data[i].ReportFieldId;
                                        if ((rptFieldId == 290) || (rptFieldId == 779)) {
                                            data[i].IsEnabled = false;
                                            data[i].ReadOnlyMode = true;
                                        }
                                    }
                                }
                            }
                        }
                        rescallback(0, data, contextObj.commonServices.sessionUserRoleId);
                    });
                        break;
                    case 2: var showbtndeassign: boolean = false;
                        var spAssignmentObj;
                        contextObj.spaceServices.loadAssignDeAssignSpacesStd(spaceId).subscribe(function (result) {
                            var arrfld = [793, 6729, 6730, 791, 6731];
                            var cnt = arrfld.length;
                            var spaceAsignmentTypeVal = "";
                            result["Data"].find(function (item) {
                                switch (item.ReportFieldId) {
                                    case 793:  /*roomno*/
                                        item.IsEnabled = false;
                                        cnt--;
                                        break;
                                    case 791:  /*space function*/
                                        item.IsEnabled = false;
                                        cnt--;
                                        break;
                                    case 6729: /*Spaceassignmenttype*/
                                        spaceAsignmentTypeVal = item.FieldValue;
                                        if (item.FieldValue == "4") {
                                            spAssignmentObj = item;
                                            //    contextObj.spaceServices.getAmenitiesData(0, "", "", '').subscribe(function (resultData) {
                                            //        if (resultData["Data"].DataCount > 0) {
                                            //            item.LookupDetails.PopupComponent = { Name: "Amenities", showImage: false };
                                            //        }

                                            //    });
                                        }
                                        cnt--;
                                        break;
                                    case 6730:/*Seating Capacity*/

                                        if (spaceAsignmentTypeVal == "")
                                            showbtndeassign = false;
                                        else {
                                            showbtndeassign = true;
                                            if (spaceAsignmentTypeVal == "1" || spaceAsignmentTypeVal == "4" || spaceAsignmentTypeVal == "5" || spaceAsignmentTypeVal == "6") {
                                                item.IsMandatory = true;
                                                item.FieldValue = item.FieldValue == null ? "1" : item.FieldValue;
                                            }
                                            else {
                                                item.IsMandatory = false;
                                                item.IsEnabled = false;
                                            }
                                            if ((spaceAsignmentTypeVal == "1" || spaceAsignmentTypeVal == "5" || spaceAsignmentTypeVal == "6") && contextObj.commonServices.isSeatBookingEnabled) {
                                                /*seat booking feature*/
                                                item.LookupDetails.PopupComponent = { Name: "Seats", showImage: false };
                                                //contextObj.hyperLinkText = "Seats";
                                            }
                                        }
                                        // common :Bug 76403
                                        if (spaceAsignmentTypeVal == "5") {

                                            item.FieldLabel = "Hoteling Seating Capactiy"
                                        }
                                        else {
                                            item.FieldLabel = "Room Seating Capacity"

                                        }
                                        cnt--;
                                        break;
                                    case 6731:
                                        if (contextObj.commonServices.isSeatBookingEnabled && spaceAsignmentTypeVal == "1")
                                            item.IsVisible = true;
                                        else if (contextObj.commonServices.isSeatBookingEnabled && spaceAsignmentTypeVal == "2") {
                                            item.FieldValue = "0";
                                            item.IsVisible = false;
                                        }
                                        else
                                            item.IsVisible = false;
                                        cnt--;
                                        break;
                                    default:
                                        break;
                                }

                                if (cnt == 0)
                                    return true;
                                else
                                    return false;

                            })
                            if (spAssignmentObj != undefined) {

                                contextObj.spaceServices.getAmenitiesData(0, "", "", '').subscribe(function (resultData) {
                                    if (resultData["Data"].DataCount > 0 && contextObj.enableAminity == true) {
                                        spAssignmentObj.LookupDetails.PopupComponent = { Name: "Amenities", showImage: false };
                                    }
                                    rescallback(0, result["Data"], contextObj.commonServices.sessionUserRoleId, showbtndeassign);
                                });
                            }
                            else
                                rescallback(0, result["Data"], contextObj.commonServices.sessionUserRoleId, showbtndeassign);
                        });
                        break;
                }
            } else
                rescallback(1);
        });
    }
    spaceEditReflectInDrawing = function (editedRowData, resCallback) {
        var contextObj = this;
        var ratio = [0];
        var formatedText: string = "";
        var handle = editedRowData['BomaHandle'];
        var rowInsertIndex = contextObj.spaceData.findIndex(function (el) { return el.BomaHandle === handle });
        if (contextObj.commonServices.isSpace == false) {
            handle = editedRowData["CarpetHandle"];
            rowInsertIndex = contextObj.spaceData.findIndex(function (el) { return el.CarpetHandle === handle });
        }
        contextObj.objiWhiz.clientDWGAreaRatio(ratio);

        contextObj.spaceData[rowInsertIndex] = editedRowData;
        var lineSpaceInDrawingValue = contextObj.displaySettingData.find(function (el) { return el['FieldName'] === 'Line Space in Drawing' })['FontSize'];
        var lineSpaceInDrawing = "";
        for (let i = 0; i < lineSpaceInDrawingValue; i++)
            lineSpaceInDrawing += "\\P";
        for (let dispSettingsItem of contextObj.displaySettingData) {
            if (dispSettingsItem.ShowinDrawing) {
                var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
                var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
                let textContent = editedRowData[dispSettingsItem.FieldName];
                if (textContent == "null" || textContent == null)
                    textContent = "-";
                formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + lineSpaceInDrawing;
                //formatedText += "\\fTimes New Roman|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + ratio[0] * dispSettingsItem.FontSize + ";" + textContent + "\\n";

            }

        }
        let formatedTextFinal: string = "{" + formatedText + "}";//"{\fTimes New Roman|b0 | i0 | c0 | p18;\C10; \H12.58; 059adasdasf}";
        if (contextObj.dataInDrawingTextHandles.length > 0) {
            var textHandle = contextObj.dataInDrawingTextHandles.find(function (el) { return el.Key === handle });
            if (textHandle) {
                textHandle = textHandle.Value;
                console.log("setText: ", textHandle);
                console.log("text", formatedTextFinal);
                contextObj.objiWhiz.setText(textHandle, formatedTextFinal, function (retCode) {
                    if (retCode != 0) {
                        console.log("setText returned with error code : ", retCode);
                    }
                    resCallback(0);
                });
            }
            else { resCallback(0); }
        }
        else
            resCallback(0);
    }
    onMultipleEditSpaceDataReflectInDrawing(updatedSpaceData) {
        var contextObj = this;
        var ratio = [0];
        var formatedText: string = "";
        contextObj.objiWhiz.clientDWGAreaRatio(ratio);
        contextObj.deleteTextHandles(updatedSpaceData, function (retcode) {
            contextObj.getFormatedText(updatedSpaceData, contextObj.displaySettingData, formatedText, ratio, function (callback) {

            });
        });
        var index;
        for (let spacedata of updatedSpaceData) {
            index = contextObj.spaceData.findIndex(function (el) { return el.SpaceId == spacedata['SpaceId'] })
            if (index != -1) {
                contextObj.spaceData[index] = spacedata;
            }
        }
    }
    deleteTextHandles = function (updatedSpaceData, resCallback) {
        var contextObj = this;
        var index;
        var handles = '';
        for (let spacedata of updatedSpaceData) {
            index = this.dataInDrawingTextHandles.findIndex(function (el) { return el.Key == spacedata[contextObj.handleName] })
            if (index != -1)
                handles += this.dataInDrawingTextHandles[index].Value + contextObj.commonServices.rowDelimiter;
        }
        contextObj.objiWhiz.deleteEntity(handles, function (ret) {
            resCallback(0);
        });
    }
    showSelectedSpaceInDrawing = function (spaceIds, resCallback) {
        var contextObj = this;
        var selectedHandles = [];
        for (let spaceId of spaceIds) {
            if (contextObj.commonServices.isSpace)
                selectedHandles.push(contextObj.spaceData.find(function (el) { return el.SpaceId === spaceId }).BomaHandle);
            else
                selectedHandles.push(contextObj.spaceData.find(function (el) { return el.SpaceId === spaceId }).CarpetHandle);
        }
        contextObj.deHatch(function (retCode) {
            if (retCode == 0) {
                contextObj.hatchMultipleEntity(selectedHandles, function (retCode) {
                    contextObj.objiWhiz.zoomExtents(function (ret) {
                        contextObj.objiWhiz.blinkEntitiesByHandles(selectedHandles, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonServices.blinkSize, contextObj.commonServices.blinkDelay, function (returnCode) {
                            resCallback(retCode, selectedHandles);
                        });
                    });
                });
            }
        });
    }
    showSelectedSpaceZoomDrawing = function (spaceIds, resCallback) {
        var contextObj = this;
        var contextObj = this;
        var selectedHandles = [];
        for (var i = 0; i < spaceIds.length; i++) {
            if (contextObj.commonServices.isSpace)
                selectedHandles.push(contextObj.spaceData.find(function (el) { return el.SpaceId === spaceIds[i] }).BomaHandle);
            else
                selectedHandles.push(contextObj.spaceData.find(function (el) { return el.SpaceId === spaceIds[i] }).CarpetHandle);
        }
        contextObj.deHatch(function (retCode) {
            if (retCode == 0) {
                if (selectedHandles.length == 1) {
                    contextObj.hatchSingleEntity(selectedHandles[0], function (retCode) {
                        contextObj.objiWhiz.zoomEntity(selectedHandles[0], function (retCode) {
                            if (retCode != 0)
                                console.log("zoomEntity failed due to", retCode);
                            //contextObj.objiWhiz.blinkEntitiesByHandles(selectedHandles, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB,contextObj.commonServices.blinkSize, contextObj.commonServices.blinkDelay, function (returnCode) {
                            resCallback(retCode, selectedHandles);
                            //  });
                        });
                    });
                } else {
                    contextObj.hatchMultipleEntity(selectedHandles, function (retCode) {
                        contextObj.objiWhiz.zoomExtents(function (ret) {
                            contextObj.objiWhiz.blinkEntitiesByHandles(selectedHandles, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonServices.blinkSize, contextObj.commonServices.blinkDelay, function (returnCode) {
                                resCallback(retCode, selectedHandles);
                            });
                        });
                    });
                }
            }
        });
    }
    selectMultipleSpace = function (isSpace, resCallback) {
        var contextObj = this;
        var selectedMultipleHandles = [];
        contextObj.objiWhiz.selectHandles(isSpace, true, "$HatchMultipleEntity", contextObj.singleSpaceColor, contextObj.singleSpaceHatchAngle, contextObj.singleSpaceHatchScale, contextObj.singleSpaceHatchPatternId, function (retCode, selectedHandles) {
            contextObj.objiWhiz.setApplicationLayer("$HatchMultipleEntity");
            if (retCode == 0) {
                console.log("selectedHandles", selectedHandles);
                selectedMultipleHandles = selectedHandles.split(contextObj.commonServices.rowDelimiter);
                selectedMultipleHandles.pop();
                console.log("selectedMultipleHandles", selectedMultipleHandles);
            }
            else
                console.log("selectHandlesByWindow faild due to ", retCode);
            resCallback(0, selectedMultipleHandles);
        });
    }
    getTotalizeData = function (selectedMultipleHandles, isSpace, resCallback) {
        var contextObj = this;
        var selectedIds: string[] = [];
        var count: number;
        contextObj.deleteLayerAlredyExists("$LEGEND", function (returnCode) {
            if (contextObj.legendRectHandles.length > 0) {
                contextObj.objiWhiz.removeMapsByHandle(contextObj.legendRectHandles);
                contextObj.objiWhiz.removeLinesByHandle(contextObj.legendLineHandles);
                contextObj.legendRectHandles = "";
                contextObj.legendLineHandles = "";
            }
            selectedIds = contextObj.getSpcaceIdsArray(isSpace, selectedMultipleHandles);
            count = selectedIds.length;
            //for (let hadles of selectedMultipleHandles) {
            //    var index;
            //    if (isSpace) {
            //        index = contextObj.spaceData.findIndex(function (el) { return el.BomaHandle === hadles });
            //        if (index != -1)
            //            selectedIds.push(contextObj.spaceData[index]['SpaceId'])
            //    }
            //    else {
            //        index = contextObj.spaceData.findIndex(function (el) { return el.CarpetHandle === hadles });
            //        if (index != -1)
            //            selectedIds.push(contextObj.spaceData[index]['SpaceId'])
            //    }

            //}
            contextObj.spaceServices.getTotalizeSpace(selectedIds).subscribe(function (result) {
                resCallback(JSON.parse(result.FieldBinderData)[0].Column1, count);

            });
        });
    }
    getSpcaceIdsArray = function (isSpace, selectedMultipleHandles) {
        var selectedIds: string[] = [];
        for (let hadles of selectedMultipleHandles) {
            var index;
            if (isSpace) {
                index = this.spaceData.findIndex(function (el) { return el.BomaHandle === hadles });
                if (index != -1)
                    selectedIds.push(this.spaceData[index]['SpaceId'])
            }
            else {
                index = this.spaceData.findIndex(function (el) { return el.CarpetHandle === hadles });
                if (index != -1)
                    selectedIds.push(this.spaceData[index]['SpaceId'])
            }

        }
        return selectedIds;
    }
    addTotalizeLegend = function (text, totalSpaceCount, resCallback) {
        var contextObj = this;
        var textArray: string[] = [];
        contextObj.commonServices.calculateDwgRatio();
        var totalCount: string = "No. of Spaces selected = " + totalSpaceCount;
        var formatedText = "\\f|b1|l0|c0|p18;\\C7;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";Space Details\\n\\n\\f|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";" + totalCount + "\\n";
        textArray = text.split("</b>");
        textArray.pop();

        //textArray[0] = textArray[0].replace("<b>", "");
        for (var item of textArray) {
            var data = item.replace("<b>", "").replace(/<br>/g, "");
            formatedText += "\\f|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";" + data + "\\n"
        }

        //if (textArray.length == 2) {
        //    textArray[1] = textArray[1].replace(/<br>/g, "").replace("<b>", "")
        //    formatedText = "\\f|b1|l0|c0|p18;\\C7;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";Space Details\\n\\n\\f|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";" + totalCount + "\\n\\f|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";" + textArray[0] + "\\n" + "\\n\\f|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";" + textArray[1] + "\\n";
        //    //formatedText = "\\fArial|b1|l0|c0|p18;\\C7;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";Space Details\\n\\n\\fArial|b1|l0|c0|p18;\\C1;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";" + totalCount + "\\n\\fTimes New Roman|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";" + textArray[0] + "\\n" + "\\n\\fTimes New Roman|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";" + textArray[1] + "\\n";
        //} else
        //    formatedText = "\\f|b1|l0|c0|p18;\\C7;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";Space Details\\n\\n\\f|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";" + totalCount + "\\n\\f|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";" + textArray[0] + "\\n";
        //formatedText = "\\fArial|b1|l0|c0|p18;\\C7;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";Space Details\\n\\n\\fArial|b1|l0|c0|p18;\\C1;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";" + totalCount + "\\n\\fTimes New Roman|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonServices.g_dblDwgRatio * 3 + ";" + textArray[0] + "\\n";
        contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
            if (retCode == 0) {
                contextObj.createDrawingDetailsLegend(xPos, yPos, false, function (startY) {
                    contextObj.objiWhiz.createMultilineText("$LEGEND", 1, xPos, startY, 0, contextObj.commonServices.g_dblDwgRatio * 3,
                        0, 1, formatedText, "Standard", 0, function (retCode, entityHandle) {
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
    }
    getSpaceDataFromHandle(selectedHandle) {
        var spacedata;
        if (this.commonServices.isSpace)
            spacedata = this.spaceData.find(function (el) { return el.BomaHandle === selectedHandle });
        else
            spacedata = this.spaceData.find(function (el) { return el.CarpetHandle === selectedHandle });
        return spacedata;
    }
    getHandleFromSpaceId(spaceId) {
        var handle;
        if (this.commonServices.isSpace)
            handle = this.spaceData.find(function (el) { return el.SpaceId === spaceId })['BomaHandle'];
        else
            handle = this.spaceData.find(function (el) { return el.SpaceId === spaceId })['CarpetHandle'];
        return handle;
    }
    moveLegend() {
        var contextObj = this;
        if (contextObj.moveLegendHandle != "") {
            contextObj.objiWhiz.setCursor(2);
            contextObj.objiWhiz.setEntityVisibility(contextObj.moveLegendHandle, false, function (ret) {
                contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
                    if (retCode == 0) {
                        contextObj.objiWhiz.moveEntity(contextObj.moveLegendHandle, xPos, yPos, function (retCode) {
                            contextObj.objiWhiz.setEntityVisibility(contextObj.moveLegendHandle, true, function (ret) {
                                contextObj.objiWhiz.zoomExtents(function (ret) {

                                });
                            });
                        });
                    }
                });
            });
        }

        //this.objiWhiz.deleteLayer("$LEGEND", function (retCode) {
        //    contextObj.objiWhiz.setCursor(2);
        //    switch (contextObj.moveLegedDetails[0][0]) {
        //        case "1":
        //            contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
        //                if (retCode == 0) {                          
        //                    contextObj.objiWhiz.createDistributionMap(contextObj.moduleId, contextObj.moveLegedDetails[0][1], contextObj.moveLegedDetails[0][2], contextObj.moveLegedDetails[0][3], contextObj.commonServices.g_IsNetCustomer, contextObj.commonServices.areaUnit, contextObj.commonServices.drawingDetails.SiteName, contextObj.commonServices.drawingDetails.BuildingName, contextObj.commonServices.drawingDetails.FloorName, false, xPos, yPos,function (retCode, spaceHandles) {
        //                        contextObj.objiWhiz.setApplicationLayer("$LEGEND");                             
        //                    });
        //                }
        //            });
        //            break;
        //        case "2":
        //            contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
        //                if (retCode == 0) {
        //                    contextObj.objiWhiz.createDistributionMapForValidatedFields(contextObj.moduleId, contextObj.moveLegedDetails[0][1], contextObj.moveLegedDetails[0][2],  contextObj.commonServices.g_IsNetCustomer, contextObj.commonServices.areaUnit, contextObj.commonServices.drawingDetails.SiteName, contextObj.commonServices.drawingDetails.BuildingName, contextObj.commonServices.drawingDetails.FloorName, false, xPos, yPos, function (retCode, spaceHandles) {
        //                        contextObj.objiWhiz.setApplicationLayer("$LEGEND");
        //                    });
        //                }
        //            });
        //            break;              

        //    }
        //});
    }
    isLayerEnable() {
        var layerName;
        var isVisible = [0];
        if (this.commonServices.isSpace)
            layerName = this.commonServices.spacelayerName;
        else
            layerName = this.commonServices.netLayername;
        var returnCode = this.objiWhiz.getLayerVisibility(layerName, isVisible)
        return isVisible[0];
    }
    measurePointToPointDistance = function (resCallback) {
        var contextObj = this;
        contextObj.objiWhiz.setCursor(2);
        contextObj.objiWhiz.getDWGPoint(function (retCode, startX, startY) {
            if (retCode == 0) {
                var rubx = [], ruby = [], rubz = []
                rubx[0] = startX; ruby[0] = startY; rubz[0] = 0;
                contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
                contextObj.objiWhiz.getDWGPoint(function (rtCode, endX, endY) {
                    if (rtCode == 0) {
                        contextObj.objiWhiz.enableRubberband(startX, startX, 0, false);
                        var distance = [];
                        contextObj.objiWhiz.measureDistance(0, startX, startY, endX, endY, distance);
                        var midX = (startX + endX) / 2;
                        var midY = (startY + endY) / 2;
                        var distanceWithUnit = (distance[0] / contextObj.commonServices.distanceConvertionValue).toFixed(2) + " " + contextObj.commonServices.perimeterUnit;
                        contextObj.commonServices.calculateDwgRatio();
                        var intSize = 15;
                        //contextObj.objiWhiz.createDimension(contextObj.measureLayerName, 0, startX, startY, endX, endY, midX, midY, intSize, 5 * contextObj.commonServices.g_dblDwgRatio, contextObj.measureLineAutocadColor, function (retunCode, handle) {
                        //    contextObj.objiWhiz.setCursor(1);
                        //});

                        contextObj.objiWhiz.createLine(contextObj.measureLayerName, contextObj.measureLineAutocadColor, startX, startY, endX, endY, function (retCode, entityHandle) {
                            if (retCode != 0)
                                console.log("createLine returned with error code : ", retCode);
                            else {
                                contextObj.objiWhiz.createText(contextObj.measureLayerName, 7, midX, midY, contextObj.commonServices.g_intSpaceDataTextAngle, intSize,
                                    contextObj.commonServices.g_intSpaceDataTextWidth, distanceWithUnit, contextObj.commonServices.g_strTextStyleName, contextObj.measureTextStyleId, function (retCode, entityHandle) {
                                        if (retCode != 0)
                                            console.log("createText returned with error code : ", retCode);
                                        contextObj.objiWhiz.setCursor(1);
                                        resCallback(0);
                                    });
                            }
                        });
                    } else if (rtCode == 8) {
                        contextObj.objiWhiz.enableRubberband(startX, startX, 0, false);
                        resCallback(1);
                    }
                });
            }
            else
                resCallback(1);
        });
    }
    measureWallToWallDistance = function (resCallback) {
        var contextObj = this;
        contextObj.objiWhiz.setCursor(2);
        contextObj.objiWhiz.getDWGPoint(function (retCode, startX, startY) {
            if (retCode == 0) {
                contextObj.objiWhiz.getHandleWithDWGPoint(startX, startY, contextObj.commonServices.isSpace, function (returnCode, entityHandle) {
                    if (returnCode == 0) {
                        contextObj.objiWhiz.getClosestPointOnPolyline(entityHandle, startX, startY, function (rtCode, xCoordinates, yCoordinates) {
                            if (rtCode == 0) {
                                var rubx = [], ruby = [], rubz = []
                                rubx[0] = xCoordinates; ruby[0] = yCoordinates; rubz[0] = 0;
                                contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                                contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
                                contextObj.objiWhiz.getDWGPoint(function (retnCode, endX, endY) {
                                    if (retnCode == 0) {
                                        contextObj.objiWhiz.getHandleWithDWGPoint(endX, endY, contextObj.commonServices.isSpace, function (rCode, entityHandle) {
                                            if (rCode == 0) {
                                                contextObj.objiWhiz.getClosestPointOnPolyline(entityHandle, endX, endY, function (rtCode, endXCoordinates, endYCoordinates) {
                                                    if (rtCode == 0) {
                                                        contextObj.objiWhiz.enableRubberband(xCoordinates, yCoordinates, 0, false);
                                                        var distance = [];
                                                        contextObj.objiWhiz.measureDistance(0, xCoordinates, yCoordinates, endXCoordinates, endYCoordinates, distance);
                                                        var midX = (xCoordinates + endXCoordinates) / 2;
                                                        var midY = (yCoordinates + endYCoordinates) / 2;
                                                        var distanceWithUnit = (distance[0] / contextObj.commonServices.distanceConvertionValue).toFixed(2) + " " + contextObj.commonServices.perimeterUnit;
                                                        contextObj.commonServices.calculateDwgRatio();
                                                        var intSize = 15;
                                                        contextObj.objiWhiz.createLine(contextObj.measureLayerName, contextObj.measureLineAutocadColor, xCoordinates, yCoordinates, endXCoordinates, endYCoordinates, function (retCode, entityHandle) {
                                                            if (retCode != 0)
                                                                console.log("createLine returned with error code : ", retCode);
                                                            else {
                                                                contextObj.objiWhiz.createText(contextObj.measureLayerName, 7, midX, midY, contextObj.commonServices.g_intSpaceDataTextAngle, intSize,
                                                                    contextObj.commonServices.g_intSpaceDataTextWidth, distanceWithUnit, contextObj.commonServices.g_strTextStyleName, contextObj.measureTextStyleId, function (retCode, entityHandle) {
                                                                        if (retCode != 0)
                                                                            console.log("createText returned with error code : ", retCode);
                                                                        contextObj.objiWhiz.setCursor(1);
                                                                        resCallback(0);
                                                                    });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                            else if (rCode == 37) {
                                                contextObj.objiWhiz.enableRubberband(xCoordinates, yCoordinates, 0, false);
                                                resCallback(1);
                                            }
                                        });
                                    } else if (retnCode == 8) {
                                        contextObj.objiWhiz.enableRubberband(xCoordinates, yCoordinates, 0, false);
                                        resCallback(1);
                                    }

                                });
                            }
                        });
                    }
                });
            }
            else
                resCallback(1);
        });
    }
    measureArea = function (resCallback) {
        let contextObj = this;
        contextObj.objiWhiz.setCursor(2);
        this.drawPloyline(function (returnCode, polylineHandle) {
            if (returnCode == 0) {
                contextObj.objiWhiz.getEntityArea(polylineHandle, function (returnCode, resultarea) {
                    if (returnCode == 0) {
                        var area = (resultarea / contextObj.commonServices.dwgAreaConvertionValue).toFixed(2) + " " + contextObj.commonServices.areaUnit;
                        contextObj.objiWhiz.getEntityMidpoint(polylineHandle, function (returnCode, midX, midY) {
                            contextObj.commonServices.calculateDwgRatio();
                            var intSize = 15;
                            contextObj.objiWhiz.createText(contextObj.measureLayerName, 7, midX, midY, contextObj.commonServices.g_intSpaceDataTextAngle, intSize,
                                contextObj.commonServices.g_intSpaceDataTextWidth, area, contextObj.commonServices.g_strTextStyleName, contextObj.measureTextStyleId, function (retCode, entityHandle) {
                                    if (retCode != 0)
                                        console.log("createText returned with error code : ", retCode);
                                    contextObj.objiWhiz.setCursor(1);
                                    resCallback(0);
                                });
                        });
                    }
                });
            }
            else
                resCallback(1);
        });

    }
    drawPloyline = function (resCallback) {


        let contextObj = this;

        let result = contextObj.objiWhiz.getDWGPoint(function (retCode, x, y) {
            if (retCode == 0) {
                contextObj.points = contextObj.points + x + contextObj.commonServices.columnDelimiter + y + contextObj.commonServices.rowDelimiter;
                contextObj.pointcount++;
                var rubx = [], ruby = [], rubz = []
                rubx[0] = x; ruby[0] = y; rubz[0] = 0;
                contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);

                if (contextObj.pointcount > 1) {
                    contextObj.objiWhiz.createLine("temp", contextObj.measureLineAutocadColor, contextObj.tempx, contextObj.tempy, x, y, function (retCode, entityHandle) {
                        if (retCode != 0) {
                            console.log("createLine returned with error code : ", retCode);
                            contextObj.objiWhiz.enableRubberband(x, y, 0, false);
                            return;
                        }
                        else {
                            contextObj.tempx = x, contextObj.tempy = y;
                            contextObj.drawPloyline(resCallback);
                        }
                    });
                }
                else {
                    contextObj.tempx = x, contextObj.tempy = y;
                    contextObj.drawPloyline(resCallback);
                }
            }
            else if (retCode == 8) {
                var ratio = [0];
                contextObj.objiWhiz.getCurrentClientDWGRatio(ratio);
                contextObj.objiWhiz.createPolyline(contextObj.measureLayerName, contextObj.measureLineAutocadColor, contextObj.points, contextObj.measureLineThickness * ratio[0],
                    "", 1, true,
                    function (retCode, entityHandle) {
                        contextObj.points = "";
                        contextObj.pointcount = 0;
                        contextObj.objiWhiz.enableRubberband(x, y, 0, false);
                        if (retCode != 0)
                            console.log("createPolyline returned with error code : ", retCode);
                        else {
                            console.log("Entity handle: ", entityHandle);
                        }
                        contextObj.objiWhiz.deleteLayer("temp", function (retCode) {
                            contextObj.objiWhiz.regenerate();
                            resCallback(0, entityHandle);
                        });

                    });
            }
            else {
                console.log("getDWGPoint faild due to ", retCode);
                contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                contextObj.objiWhiz.regenerate();
                resCallback(1);
            }
        });
    }
    searchInDrawing(searchData, resCallback) {
        
        var selectedSpaceHandles: any[] = [];
        for (var spaceItem of searchData) {
            var index = this.spaceData.findIndex(function (el) { return el.SpaceId == spaceItem['SpaceId'] });
            if (index != -1)
                selectedSpaceHandles.push(this.getHandleFromSpaceId(this.spaceData[index]['SpaceId']));

        }
        this.objiWhiz.blinkEntitiesByHandles(selectedSpaceHandles, this.blinkColorCodeR, this.blinkColorCodeG, this.blinkColorCodeB, this.commonServices.blinkSize, this.commonServices.blinkDelay, function (returnCode) {
            resCallback(selectedSpaceHandles);
        });
    }
    getSelectedSpaceId = function (resCallback) {
        let contextObj = this;
        this.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
            if (retCode == 0) {
                contextObj.objiWhiz.pointInEntity(contextObj.commonServices.grossHandle, xPos, yPos, function (returnCode, isInside) {
                    contextObj.objiWhiz.getHandleWithDWGPoint(xPos, yPos, contextObj.commonServices.isSpace, function (retCode, strSpaceHandle) {
                        if (isInside) {
                            contextObj.hatchSingleEntityOnRightClick(strSpaceHandle, function (returnCode1) {
                                var selectedSpace = contextObj.getSpcaceIdsArray(contextObj.commonServices.isSpace, [strSpaceHandle]);
                                resCallback(0, selectedSpace[0], xPos, yPos);
                            });
                        }
                        else
                            resCallback(1);
                    });
                });
            }
            else
                resCallback(2);
        });
    }
    invokeSpaceMoveText(selectedSpaceId, selectedXPos, selectedYPos, resCallback) {
        
        var index;
        var contextObj = this;
        index = this.spaceData.findIndex(function (el) { return el['SpaceId'] == selectedSpaceId });
        var previousXCord = this.spaceData[index]['TextInsertionX'];
        var previousYCord = this.spaceData[index]['TextInsertionY'];
        var rubx = [], ruby = [], rubz = []
        rubx[0] = previousXCord; ruby[0] = previousYCord; rubz[0] = 0;
        contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
        contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
        var selectedHandle = this.getHandleFromSpaceId(selectedSpaceId);
        contextObj.objiWhiz.getDWGPoint(function (retCode, currentXCord, currentYCord) {
            contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, false);
            if (retCode == 0) {
                //    contextObj.objiWhiz.getEntityMidpoint(selectedHandle, function (returnCode, midX, midY) {

                contextObj.getSpaceIdFromXYPoints(currentXCord, currentYCord, function (destinationSpaceId) {
                    contextObj.spaceServices.UpdateXYCordinates(selectedSpaceId, currentXCord, currentYCord, selectedXPos, selectedYPos, destinationSpaceId).subscribe(function (result) {
                        contextObj.spaceData[index]['TextInsertionX'] = currentXCord;
                        contextObj.spaceData[index]['TextInsertionY'] = currentYCord;
                        contextObj.moveSpaceText(selectedHandle, currentXCord, currentYCord, function (res) {
                            contextObj.CheckLeaderLineIfRequired(selectedHandle, currentXCord, currentYCord, function (isInside) {
                                contextObj.deleteLeaderLine(selectedSpaceId, function (res) {
                                    if (isInside) {
                                        resCallback(0);
                                    } else {
                                        var leaderpoints = selectedXPos + contextObj.commonServices.columnDelimiter + selectedYPos + contextObj.commonServices.rowDelimiter + currentXCord + contextObj.commonServices.columnDelimiter + currentYCord + contextObj.commonServices.rowDelimiter;
                                        contextObj.objiWhiz.createLeader(contextObj.leaderLayerName, contextObj.leaderColorCode, leaderpoints, contextObj.leaderLineTypeSize, contextObj.leaderLineTypeScale, contextObj.leaderLineType, 1, function (returnCode, EntityHandle) {
                                            contextObj.objiWhiz.setApplicationLayer(contextObj.leaderLayerName);
                                            if (returnCode != 0) {
                                                console.log("createLeader faild due to ", returnCode);
                                            }
                                            contextObj.moveTextLeaderLineHandles.push({ Key: selectedSpaceId, Value: EntityHandle });
                                            resCallback(0);
                                        });
                                    }
                                });
                            });
                        });
                    });
                });
                //});
            }
            else
                console.log("getDWGpoint failed due to ", retCode);
        });
    }
    moveSpaceText = function (handle, xPos, yPos, resCallback) {
        var contextObj = this;
        var textHandle = contextObj.dataInDrawingTextHandles.find(function (el) { return el.Key === handle }).Value;
        contextObj.objiWhiz.moveEntity(textHandle, xPos, yPos, function (retcode) {
            if (retcode != 0)
                console.log("getEntityExtents faild due to ", retcode);
            resCallback(0);
        });
    }
    hasPrivilageExists(spaceId: number, resCallback) {
        this.spaceServices.checkEditPrivilageExist(spaceId).subscribe(function (resultData) {
            if (resultData.ServerId > 0)
                resCallback(true);
            else
                resCallback(false);
        });
    }
    CheckLeaderLineIfRequired(handle, xPos, yPos, resCallback) {
        this.objiWhiz.pointInEntity(handle, xPos, yPos, function (returnCode, isInside) {
            if (isInside) {
                resCallback(true);
            } else {
                resCallback(false);
            }
        });
    }
    getSpaceIdFromXYPoints(xPos: number, yPos: number, resCallback) {
        var contextObj = this;
        var spaceId = 0;
        contextObj.objiWhiz.getHandleWithDWGPoint(xPos, yPos, contextObj.commonServices.isSpace, function (returnCode, entityHandle) {
            if (returnCode == 0) {
                var spaceData = contextObj.getSpaceDataFromHandle(entityHandle);
                if (spaceData != undefined)
                    spaceId = spaceData['SpaceId'];
            } 
            resCallback(spaceId, entityHandle, returnCode);
        });

    }
    deleteLeaderLine(selectedSpaceId, callback) {
        var contextObj = this;
        var index = this.moveTextLeaderLineHandles.findIndex(function (el) { return el.Key == selectedSpaceId });
        if (index != -1) {
            contextObj.objiWhiz.deleteEntity(this.moveTextLeaderLineHandles[index].Value, function (retCode) {
                contextObj.moveTextLeaderLineHandles.splice(index, 1);
                callback(0);

            });
        }
        else
            callback(0);
    }
    setLayerMappingFunctions(allLayersArray, i, resCallback) {
      
        var contextObj = this;
        var allLayers = allLayersArray[i].split(contextObj.commonServices.rowDelimiter)
        var updatingField = allLayers[1];
        var strArrEntitiyHandles = "";
        var drawingLayer = allLayers[0];
        contextObj.objiWhiz.getAllEntities(drawingLayer, function (returnCode, entityhandles) {
         
            if (returnCode == 0) {
                contextObj.objiWhiz.getEntityType(entityhandles, function (res, typeid) {
                    if (res == 0) {
                        contextObj.objiWhiz.getXdStringMultiple(entityhandles, "ihandles", function (retCode, xData) {
                            if (retCode == 0) {
                              
                                for (var handle of xData) {
                                    var textHandle = handle[0];
                                    var spaceHandle = handle[1].split(contextObj.commonServices.rowDelimiter);
                                    var updateText = contextObj.getSpaceDataFromHandle(spaceHandle[0])[updatingField];
                                 
                                    if (updateText != "" && updateText!=null)
                                        contextObj.handleTextArray.push([textHandle, updateText]);
                                }

                                if (allLayersArray.length - 1 > i) {
                                    contextObj.setLayerMappingFunctions(allLayersArray, i + 1, resCallback)
                                }
                                else {
                                    if (contextObj.handleTextArray.length > 0) {
                                        contextObj.objiWhiz.setTextMultiple(contextObj.handleTextArray, function (retCode) {
                                            if (retCode == 0) {
                                                contextObj.handleTextArray = [];
                                                resCallback(1);
                                            }
                                            else
                                                resCallback(0);
                                        });
                                    }
                                    resCallback(1);
                                }
                            }
                            else {
                                resCallback(0);
                            }
                        });
                    }
                   else resCallback(0);

                });
            }
           else resCallback(0);
        });

    }
  
    checkLayerVisibilityAndMapping(visibleLayer) {//find mapping layer from drawing layers array
        var contextObj = this;

        if ((this.commonServices.spacelayerName == visibleLayer || this.commonServices.netLayername == visibleLayer || this.commonServices.grossLayername == visibleLayer || this.commonServices.constructionLayerName == visibleLayer)) {
            return "";
        }
        if (contextObj.mappingLayerData) {
            visibleLayer = contextObj.mappingLayerData.find(function (el) {
                return el["Drawing Layer"] === visibleLayer
            });
            if (visibleLayer) {
                return visibleLayer["Data Field"];
            }
            else {
                return "";
            }
        }
        else {
            return "";
        }

    }
    updateAttachmentCount(spaceId, action) {
    
        var index = this.spaceData.findIndex(function (el) { return el.SpaceId == spaceId });
        if (index != -1) {
            if (this.spaceData[index]["Attachments"] != "None") {
                if (action == "delete") {
                    var atmtCnt = parseInt(this.spaceData[index]["Attachments"]) - 1
                    this.spaceData[index]["Attachments"] = atmtCnt == 0 ? "None" : atmtCnt.toString();
                }
                else
                    this.spaceData[index]["Attachments"] = parseInt(this.spaceData[index]["Attachments"]) + 1;
            }
            else
                this.spaceData[index]["Attachments"] = 1;
            this.spaceEditReflectInDrawing(this.spaceData[index], function (ret) { });
        }
    }
    moveGrossOrWallText = function (target, resCallback) {//2 Gross Text 3 Wall Text 
        var contextObj = this;
        var selectedSpaceId=0;
        var index;
        if (target == 2) {
            index = contextObj.spaceData.findIndex(function (el) { return el["Space Key"] == "9000" });
            if (index != -1)
                selectedSpaceId = contextObj.spaceData[index]["SpaceId"];
        } else {
            index = contextObj.spaceData.findIndex(function (el) { return el["Space Key"] == "8000" });
            if (index != -1)
                selectedSpaceId = contextObj.spaceData[index]["SpaceId"];
        }
        if (selectedSpaceId != 0) {
            var selectedHandle = this.getHandleFromSpaceId(selectedSpaceId);
            var previousXCord = this.spaceData[index]['TextInsertionX'];
            var previousYCord = this.spaceData[index]['TextInsertionY'];
            contextObj.objiWhiz.setCursor(2);
            contextObj.objiWhiz.getDWGPoint(function (retCode, currentXCord, currentYCord) {
                if (retCode == 0) {
                    contextObj.spaceServices.UpdateXYCordinates(selectedSpaceId, currentXCord, currentYCord, previousXCord, previousYCord, 0, false).subscribe(function (result) {
                        contextObj.spaceData[index]['TextInsertionX'] = currentYCord;
                        contextObj.spaceData[index]['TextInsertionY'] = currentYCord;
                        contextObj.moveSpaceText(selectedHandle, currentXCord, currentYCord, function (res) {
                            resCallback(0);
                        });
                    });
                }
            });
        }
        else
            resCallback(1);
    }
}
export interface DataForDrawing {
    Key: string;
    Value: string;
}
export interface LegentData {
    OrglevelName: string;
    OrgunitId?: number;
    Area: number;
    HatchObj: any;
}
export interface EmpLegentData {
    OrglevelName: string;
    SpaceStandardName: string;
    L1Name: string;
    OccupiedSeats: number;
    FreeSeats: number;
}
export interface HatchObject {
    HatchPatternId: number;
    HatchAngle: number;
    HatchScale: number;
    ColorId: number;
    RGBColor: string;
}
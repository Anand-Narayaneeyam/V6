import { Injectable } from '@angular/core';
import {HttpHelpers} from '../../../Whatever/utils/HttpHelpers';
import { Http } from '@angular/http';
import {CommonDrawings} from '../../common/drawings/drawings-services';
import {ArchiveDrawingService} from '../../../models/space/archivedrawing.service';

export class ArchiveOpenDrawing {
    objiWhiz: any;
    archivedSpaceData : any;
    drawingId: number;
    moduleId: number;
    archiveId: number;
    archiveDisplaySettingData: any;
    leaderLineData: any;
    archivedrawingServices: ArchiveDrawingService;
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
    leaderLayerName: string = "$LEADERLINE";
    leaderColorCode: number = 130;
    leaderLineTypeSize = 2;
    leaderLineTypeScale = 7;
    leaderLineType = "ByLayer";
    moveLegendHandle: string = "";
    moveLegendBlockHandle: string = "";
    constructor(private iWhizObject: any, drawingId: number, moduleId: number, http: Http, archiveID: number) {
        var contextObj = this;
        contextObj.objiWhiz = iWhizObject;
        contextObj.drawingId = drawingId;
        contextObj.moduleId = moduleId;
        contextObj.http = http;
        contextObj.archiveId = archiveID;
    }
    initilizeObjects = function (resCallback) {
        var contextObj = this;
        this.archivedrawingServices = new ArchiveDrawingService(this.http);
        this.commonServices = new CommonDrawings(this.objiWhiz, this.http, this.moduleId, this.drawingId, false);
        this.addtlDataFieldCategoryId = 7;
        contextObj.getAllArchiveSpaceDetails();
        contextObj.getArchiveDisplaySettings(function (retCode) { });
        contextObj.getArchivedSpaceLeaderlineDetails();
        contextObj.commonServices.initilizeObjects(function (retCode) {
            resCallback(0);
        });
    }
    getAllArchiveSpaceDetails = function () {
        var contextObj = this;
        this.archivedrawingServices.getAllArchiveSpaceDetails(contextObj.drawingId, contextObj.archiveId).subscribe(function (resultData) {
            debugger
            contextObj.archivedSpaceData = JSON.parse(resultData.FieldBinderData);
            //resCallback(contextObj.spaceData);
        });
    }
    // for getting all space display settings data
    getArchiveDisplaySettings = function (resCallback) {
        var contextObj = this;
        this.archivedrawingServices.getArchiveDisplaySettings(contextObj.drawingId, contextObj.archiveId).subscribe(function (resultData) {
            debugger
            contextObj.archiveDisplaySettingData = JSON.parse(resultData.FieldBinderData);
            resCallback(contextObj.archiveDisplaySettingData);
        });
    }
    getArchivedSpaceLeaderlineDetails = function (resCallback) {
        var contextObj = this;
        contextObj.archivedrawingServices.getArchivedSpaceLeaderlineDetails(contextObj.drawingId, contextObj.archiveId).subscribe(function (result) {
            debugger
            contextObj.leaderLineData = JSON.parse(result['FieldBinderData']);
        });
    }
    //for getting color preference settings data
    //getColorPreferenceSettingsData = function () {
    //    var contextObj = this;
    //    contextObj.spaceServices.getColorPreferenceSettingsData().subscribe(function (resultData) {
    //        debugger
    //        contextObj.colorPreferenceSettingsData = JSON.parse(resultData['Data'])[0];
    //        contextObj.leaderColorCode = contextObj.colorPreferenceSettingsData['LeaderLineColor'];
    //        contextObj.measureLineAutocadColor = contextObj.colorPreferenceSettingsData['MeasureDistanceColor'];
    //        contextObj.singleSpaceColor = contextObj.colorPreferenceSettingsData['SingleSpaceColor'];
    //        contextObj.singleSpaceHatchPatternId = contextObj.colorPreferenceSettingsData['SingleSpaceHatchPatternId'];// comment due to hatch pattern issue
    //        contextObj.singleSpaceHatchAngle = contextObj.colorPreferenceSettingsData['SingleSpaceHatchAngle'];
    //        contextObj.singleSpaceHatchScale = contextObj.colorPreferenceSettingsData['SingleSpaceHatchScale'];
    //        contextObj.verticalCommonAreaHatchObj.push({ HatchPatternId: contextObj.colorPreferenceSettingsData['VerticalHatchPatternId'], HatchAngle: contextObj.colorPreferenceSettingsData['VerticalHatchAngle'], HatchScale: contextObj.colorPreferenceSettingsData['VerticalHatchScale'], ColorId: contextObj.colorPreferenceSettingsData['VerticalColor'], RGBColor: contextObj.colorPreferenceSettingsData['BuildingCommonColorRGB'] });
    //        contextObj.floorCommonAreaHatchObj.push({ HatchPatternId: contextObj.colorPreferenceSettingsData['FloorCommonHatchPatternId'], HatchAngle: contextObj.colorPreferenceSettingsData['FloorCommonHatchAngle'], HatchScale: contextObj.colorPreferenceSettingsData['FloorCommonHatchScale'], ColorId: contextObj.colorPreferenceSettingsData['FloorCommonColor'], RGBColor: contextObj.colorPreferenceSettingsData['BuildingCommonColorRGB'] });
    //        contextObj.buildingCommonAreaHatchObj.push({ HatchPatternId: contextObj.colorPreferenceSettingsData['BuildingCommonHatchPatternId'], HatchAngle: contextObj.colorPreferenceSettingsData['BuildingCommonHatchAngle'], HatchScale: contextObj.colorPreferenceSettingsData['BuildingCommonHatchScale'], ColorId: contextObj.colorPreferenceSettingsData['BuildingCommonColor'], RGBColor: contextObj.colorPreferenceSettingsData['BuildingCommonColorRGB'] });
    //        var blinkColor = contextObj.colorPreferenceSettingsData['BlinkColor'];
    //        if (blinkColor != undefined) {
    //            contextObj.objiWhiz.colorIndexToRGB(blinkColor, function (retCode, Red, Green, Blue) {
    //                debugger
    //                if (retCode == 0) {
    //                    contextObj.blinkColorCodeR = Red;
    //                    contextObj.blinkColorCodeG = Green;
    //                    contextObj.blinkColorCodeB = Blue;
    //                }
    //                else
    //                    console.log("colorIndexToRGB failed due to", retCode);
    //            });
    //        }
    //    });
    //}
    // for getting all space tooltipdata data (main fun)
    getTooltipData = function (bomaHandle, pageTarget, resCallback) {
        var contextObj = this;
        var retCode: boolean = false;
        this.tooltipData = [];
        //console.log("BomaHandle", bomaHandle);
        var bomaHandleArray: DataForDrawing[] = [];
        var archivedSpaceData: any = contextObj.archivedSpaceData;
        var archiveDisplaySettingData: any = contextObj.archiveDisplaySettingData;
        contextObj.getTooltipDataViaDispSettings(archivedSpaceData, archiveDisplaySettingData, bomaHandle, retCode, function (returnCode, tooltipData) {
                resCallback(returnCode, tooltipData);
            });
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
    getTooltipDataViaDispSettings = function (archivedSpaceData, archiveDisplaySettingData, handle, retCode, resCallback) {
        var contextObj = this;

        if (archivedSpaceData && archiveDisplaySettingData) {
            let HandleExists;
            if (contextObj.commonServices.isSpace)
                HandleExists = archivedSpaceData.some(function (el) { return el.BomaHandle === handle });
            else
                HandleExists = archivedSpaceData.some(function (el) { return el.CarpetHandle === handle });

            if (HandleExists) {
                retCode = true;
                var index;
                if (contextObj.commonServices.isSpace)
                    index = archivedSpaceData.findIndex(function (el) { return el.BomaHandle === handle });
                else
                    index = archivedSpaceData.findIndex(function (el) { return el.CarpetHandle === handle });

                var dataItem = archivedSpaceData[index];
                for (let dispalySettingsData of archiveDisplaySettingData) {
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
        if (!contextObj.archivedSpaceData || !contextObj.archiveDisplaySettingData) {
            setTimeout(function () {
                contextObj.showDataInDrawing(resCallback);

            }, 50);
        }
        else {
            debugger
            var retCode: boolean = false;
            this.tooltipData = [];
            var bomaHandleArray: DataForDrawing[] = [];
            var spcaeData: any[] = [];
            var ratio = [0];
            var formatedText: string = "";
            var dispSettingsObjTemp: any[] = [];
            let archiveSpaceDataToDrawing: any;
            contextObj.objiWhiz.clientDWGAreaRatio(ratio);
            if (contextObj.archivedSpaceData) {
                archiveSpaceDataToDrawing = contextObj.archivedSpaceData.slice();
                if (contextObj.dataInDrawingTextHandles.length > 0)
                    contextObj.dataInDrawingTextHandles = [];
                contextObj.getFormatedText(archiveSpaceDataToDrawing, contextObj.archiveDisplaySettingData, formatedText, ratio, function (callback) {
                    if (callback == 0) {
                        contextObj.movedTextleaderLines(function (ret) {
                            resCallback(0);
                        });
                    }
                });
            }
        }


    }


    public getFormatedText(archiveSpaceData, archiveSpcaeDisplaySettings, formatedText, ratio, callback) {
        var contextObj = this;

        var itemsForCreateText = [];
        var lineSpaceInDrawingValue = archiveSpcaeDisplaySettings.find(function (el) { return el['FieldName'] === 'Line Space in Drawing' })['FontSize'];
        var lineSpaceInDrawing = "";
        for (let i = 0; i < lineSpaceInDrawingValue; i++)
            lineSpaceInDrawing += "\\P";

        // if (spaceData.length > contextObj.arrayCount) {
        for (let i = 0; i < archiveSpaceData.length; i++) {
            let spaceDataInDrawing = archiveSpaceData[i];
            formatedText = "";
            for (let dispSettingsItem of archiveSpcaeDisplaySettings) {
                if (dispSettingsItem.ShowinDrawing) {
                    var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
                    var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
                    let textContent = spaceDataInDrawing[dispSettingsItem.FieldName];
                    if (textContent == "null" || textContent == null || textContent == "")
                        textContent = "-";
                    formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + lineSpaceInDrawing;//"\\n";
                    //formatedText += "\\fTimes New Roman|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + ratio[0] * dispSettingsItem.FontSize + ";" + textContent + "\\n";
                }
            }
            let formatedTextFinal: string = "{" + formatedText + "}";
            itemsForCreateText.push([formatedTextFinal, spaceDataInDrawing.TextInsertionX, spaceDataInDrawing.TextInsertionY]);
        }
        //debugger
        //var lineSpaceInDrawing = spcaeDisplaySettings.find(function (el) { return el['FieldName'] === 'Line Space in Drawing' })['FontSize'];
        var handleName = "BomaHandle";
        if (contextObj.commonServices.isSpace == false)
            handleName = "CarpetHandle";
        contextObj.objiWhiz.createDataText(itemsForCreateText, "$ArchiveSpaceData", 1, 0, ratio[0] * 1,
            0, 1, "Standard", 0, function (retCode, entityHandles) {
                contextObj.objiWhiz.setApplicationLayer("$ArchiveSpaceData");
                if (retCode != 0) {
                    console.log("createDataText returned with error code : ", retCode);
                }
                else {
                    var textHandleArray = entityHandles.split(contextObj.commonServices.rowDelimiter);
                    textHandleArray.pop();
                    var i = 0;
                    for (let textHandle of textHandleArray) {
                        if (textHandle != "") {
                            let spaceDataInDrawing = archiveSpaceData[i];
                            contextObj.dataInDrawingTextHandles.push({ Key: spaceDataInDrawing[handleName], Value: textHandle });

                        }
                        i++;
                    }
                }
                callback(0);
            });

    }
    movedTextleaderLines(resCallback) {
        var contextObj = this;
        if (contextObj.leaderLineData == undefined) {
            contextObj.movedTextleaderLines(resCallback);
        } else {
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
                    //var leaderHandleArray = EntityHandle.split(contextObj.commonServices.rowDelimiter); leaderHandleArray
                    //leaderHandleArray.pop();
                    //for (var i = 0; i < leaderHandleArray.length; i++) {
                    //    contextObj.moveTextLeaderLineHandles.push({ Key: leaderLineData[i]['SpaceId'], Value: leaderHandleArray[i] })
                    //}
                    resCallback(0);
                });
            }
            else
                resCallback(0)
        }
    }
    // for checking layer and delete layer if alredy exists (using diff selection of distribution map)
    deleteLayerAlredyExists = function (LayerName, rescallBack) {
        var isExist = [0];
        var contextObj = this;
        var layers = LayerName.split(contextObj.commonServices.rowDelimiter);
        var finalLayers = "";
        //contextObj.objiWhiz.removeMaps(); // to remove solid hatches
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
    // for showing disribution map of Validated fields (main function)
    invokeDistributionMapValidatedFields = function (archiveId, FieldId, validatedFieldName, resCallback) {
        //this.moveLegedDetails = [];
        //this.moveLegedDetails.push(["2", FieldId, validatedFieldName]);
        var contextObj = this;
        var distributionMapData;
        this.selectedOrgLevelName = FieldId;
        let orgdistributionSettingsBasedOnDrawingsData: any;
        contextObj.objiWhiz.createDistributionMapForValidatedFields(archiveId, contextObj.drawingId, contextObj.moduleId, FieldId, validatedFieldName, contextObj.commonServices.g_IsNetCustomer, contextObj.commonServices.areaUnit, contextObj.commonServices.drawingDetails.SiteName, contextObj.commonServices.drawingDetails.BuildingName, contextObj.commonServices.drawingDetails.FloorName, true, 0, 0, function (retCode, spaceHandles, legendHandle, legendBlockHandle) {
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
    }
    deHatch = function (resCallback) {
        var contextObj = this;
        contextObj.deleteLayerAlredyExists("$LEGEND", function (returnCode) {
            contextObj.deleteLayerAlredyExists("$Hatch", function (returnCode) {
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
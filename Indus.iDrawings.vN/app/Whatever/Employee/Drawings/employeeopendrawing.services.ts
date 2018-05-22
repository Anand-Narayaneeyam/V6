import { Injectable } from '@angular/core';
import {HttpHelpers} from '../../../Whatever/utils/HttpHelpers';
import { Http } from '@angular/http';
import {CommonDrawings} from '../../common/drawings/drawings-services';
import {SpaceOpenDrawing} from '../../space/drawings/spaceopendrawing.services';
import {EmployeeDrawingService} from '../../../models/employee/employeedrawing.services';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
export class EmployeeOpenDrawing {
    objiWhiz: any;
    empDrawingService: EmployeeDrawingService;
    empData: any;
    empCount: number = 0;
    spaceOpenDrawingObj: any;
    drawingId: number;
    moduleId: number;
    empDisplaySettingData: any;
    http: any;
    categoryId = 6;
    addtlDataFieldCategoryId = 8;
    empHandlesData: EmpployeeHandleData[] = [];
    empTooltipData: DataForDrawing[] = [];
    dataInDrawingTextHandles: DataForDrawing[] = [];
    empOccupancyLegendData: OccupancyLegendData[] = [];
    empSpStandardCapacityLegendData: DataForDrawing[] = [];
    employeeMoveDataInputList: EmployeeMoveDataInput[] = [];
    moveEmpDataArray: MoveEmpData[] = [];
    g_dblEmpSymbolLineTypeScale = 1.0;
    g_dblScaleFactor = 1;
    g_dblTextHeight = 1;
    g_dblScenarioScaleFactor = 1.5;
    g_strEmpSymbolCords = "-1.25,3.125;-2.5,0.625;-3.75,-1.875;-5,-4.375;-6.25,-6.875;-4.25,-6.875;-2.25,-6.875;0.25,-6.875;2.25,-6.875;4.25,-6.875;6.25,-6.875;1.25,3.125;2.5,4.375;2.5,5.625;1.25,6.875;-1.25,6.875;-2.5,5.625;-2.5,4.375;-1.25,3.125;1.25,3.125;"
    g_intEmployeeSymbolColor = 70;
    g_intScenarioSymbolColor = 31;

    g_intEmpStaticFieldEndIndex = 23; //Photo column included
    g_strEmployeeTextLayer = "$EmployeeData"
    g_strEmployeeSymbolLayer = "$EmployeeSymbol";
    g_dblEmpSymbolLineWidth = 0.0;
    g_strEmpSymbolLineType = "ByLayer";
    g_intEmpTextStyleId = 1;
    g_dblEmpTextAngle = 0;
    arrayCount: number = 0;
    rowDelimiter: string;
    colDelimiter: string;
    occupiedHandleArray: any;
    unOccupiedHandleArray: any;
    underOccupiedHandleArray: any;
    overOccupiedHandleArray: any;
    nominalOccupiedHandleArray: any;
    occupiedArea: number;
    unOccupiedArea: number;
    underOccupiedArea: string;
    overOccupiedArea: number;
    nominalOccupiedArea: number;
    dataString: string = "";
    occupancyColorHatchObject: any;
    commonDwgServices: any;
    selectedOccupancyName: string = "";
    totalEmp: number;
    isSpace: boolean = true;
    g_blnEmployeeModuleAdmin: boolean = true;
    g_blnAssignEmployeeInZeroCapacity: boolean;
    g_blnSpaceAllocationRuleEnabled: boolean;
    g_IsEmployeeMoveApprovalEnabled: boolean;
    notificationServices: NotificationService;
    hatchHandles: string[] = [];
    beforeMoveSpaceId: any = undefined;
    empTotalizeDataForLegend: any;
    leaderLayerName: string = "$LEADERLINE";
    leaderColorCode: number = 130;
    leaderLineTypeSize = 2;
    leaderLineTypeScale = 7;
    leaderLineType = "ByLayer";
    originalScale = 1;
    blinkColorCodeR: number = 255;
    blinkColorCodeG: number = 0;
    blinkColorCodeB: number = 0;
    NewScaleFactor: number = 0;
    NewTextHeight: number = 0;
    relinkempdata: any;
    relinkempcount: number;
    // spacehandlearray: DataForDrawing[] = [];


    // moveLegedDetails: any;

    constructor(private iWhizObject: any, drawingId: number, moduleId: number, http: Http, notificationService: NotificationService) {
        this.objiWhiz = iWhizObject;
        this.drawingId = drawingId;
        this.moduleId = moduleId;
        this.http = http;
        this.notificationServices = notificationService;
        this.empDrawingService = new EmployeeDrawingService(this.http);
        //  this.initilizeObjects();
        //console.log("SpaceOpenDrawing", this.http);
    }
    initilizeObjects = function (resCallback) {
        var contextObj = this;
        this.spaceOpenDrawingObj = new SpaceOpenDrawing(this.objiWhiz, this.drawingId, this.moduleId, this.http, false);
        contextObj.empDrawingService.getCustomerSubscribedFeatures("184,15").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            for (let i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 184://EmployeeAssignToZeroSeatingCapacity
                        contextObj.g_blnAssignEmployeeInZeroCapacity = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 15://SpaceAllocationRuleInEmployees
                        contextObj.g_blnSpaceAllocationRuleEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 190://ApprovalProcessForEmployeeMoveInDrawing
                        contextObj.g_IsEmployeeMoveApprovalEnabled = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }
        });
        contextObj.empDrawingService.getDrawingScaleFactor(contextObj.drawingId, contextObj.moduleId).subscribe(function (resultData) {
            debugger
            var scaleFactor = JSON.parse(resultData["Data"].FieldBinderData)[0].ScaleFactor;
            var TextHeight = JSON.parse(resultData["Data"].FieldBinderData)[0].TextHeight;
            if (scaleFactor != null && scaleFactor != 0 && scaleFactor != "") {
                contextObj.g_dblScaleFactor = scaleFactor;    /* Initial value of scale factor*/
            }
            if (TextHeight != null && TextHeight != 0 && TextHeight != "") {
                contextObj.g_dblTextHeight = TextHeight;   /* Initial value of TextHeight*/
            }
        });
        contextObj.getAllEmployeeDetails();
        contextObj.getEmpDisplaySettingsData();
        contextObj.spaceOpenDrawingObj.initilizeObjects(function (retCode) {
            
            contextObj.commonDwgServices = contextObj.spaceOpenDrawingObj.commonServices;
            if (contextObj.commonDwgServices.isModuleAdmin && contextObj.commonDwgServices.sessionUserRoleId != 4) {
                contextObj.getRelinkEmployeeData();
            }
            contextObj.isSpace = contextObj.spaceOpenDrawingObj.commonServices.isSpace;
            contextObj.g_blnEmployeeModuleAdmin = contextObj.spaceOpenDrawingObj.commonServices.isModuleAdmin;
            contextObj.rowDelimiter = contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter;
            contextObj.colDelimiter = contextObj.spaceOpenDrawingObj.commonServices.columnDelimiter;
            resCallback(0);
        });
    }
    getSpaceHandlefromXY(employeedata, count, spacehandlearray, rescallback) {
        var contextObj = this;
        if (employeedata.length > count) {
            var xpos = employeedata[count].XPosition;
            var ypos = employeedata[count].YPosition;
            this.objiWhiz.getHandleWithDWGPoint(xpos, ypos, contextObj.isSpace, function (retcode, spacehandle) {
                if (retcode == 0) {
                    spacehandlearray.push({ Key: employeedata[count].Id, Value: spacehandle })
                }
                else {
                    console.log('getHandleWithDWGPoint failed due to ', retcode)
                    spacehandlearray.push({ Key: employeedata[count].Id, Value: "" })
                }
                count++;
                contextObj.getSpaceHandlefromXY(employeedata, count, spacehandlearray, rescallback)
            });
        }
        else {
            rescallback(spacehandlearray)
        }

    }
    getRelinkEmployeeData = function () {
        var contextObj = this;
        contextObj.empDrawingService.getRelinkEmployeeData(contextObj.drawingId, 0, '', '').subscribe(function (resultlink) {
            console.log('resultlink', resultlink["Data"]["DataCount"])
            contextObj.relinkempdata = JSON.parse(resultlink["Data"]["FieldBinderData"]);
            contextObj.relinkempcount = resultlink["Data"]["DataCount"]
        });
    }
    isRelinkemployeeExist = function (rescallback) {
        if (this.relinkempdata) {
            if (this.relinkempdata.length > 0)
                rescallback(this.relinkempdata, this.relinkempcount)
        }
        else {
            console.log('isRelinkemployeeExist')
            this.isRelinkemployeeExist(rescallback);
        }

    }
    getSpaceHandleforRelink = function (selectedrowdata, rescallback) {
        console.log('selected row data in employee open drawing', selectedrowdata)
        this.getSpaceHandlefromXY(selectedrowdata, 0, [], function (spacehandlearraycallbak) {
            rescallback(spacehandlearraycallbak)
        })


    }
    getAllEmployeeDetails = function () {
        var contextObj = this;
        contextObj.empDrawingService.getAllEmployeeDetails(this.drawingId, this.drawingId, 1).subscribe(function (resultData) {//assigned
            //contextObj.totalEmp = JSON.parse(resultData["Data"]["DataCount"]);
            //if (contextObj.totalEmp != 0) {
            contextObj.empData = JSON.parse(resultData.FieldBinderData);
            contextObj.empCount = resultData.DataCount
            //console.log("empdata", contextObj.empData)
            //    resCallback(contextObj.empData);
            //}
            //else
            //    resCallback(1);
        });
    }
    // for getting all emp display settings data
    getEmpDisplaySettingsData = function () {
        var contextObj = this;

        this.empDrawingService.getEmployeeDisplaySettingsData(contextObj.categoryId, contextObj.addtlDataFieldCategoryId).subscribe(function (resultData) {
            contextObj.empDisplaySettingData = resultData["Data"];
        });
    }
    showDataInDrawing = function (dataChange, resCallback) {
        var contextObj = this;
        switch (dataChange) {
            case 'spaceDispChange': contextObj.spaceOpenDrawingObj.displaySettingData = null;
                contextObj.spaceOpenDrawingObj.getDisplaySettingsData(function (retCode) { });
                contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$SpaceData", function (retCode) {
                    contextObj.spaceOpenDrawingObj.showDataInDrawing(function (retCode) {
                        if (retCode == 0) {
                            resCallback(0);
                        }
                    });
                });
                break;
            case 'empDispChange': contextObj.empDisplaySettingData = null;
                contextObj.getEmpDisplaySettingsData();
                contextObj.empHandlesData = [];
                contextObj.dataInDrawingTextHandles = [];
                var DeleteLayerTextandSymbols = contextObj.g_strEmployeeSymbolLayer + contextObj.rowDelimiter + contextObj.g_strEmployeeTextLayer;
                contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists(DeleteLayerTextandSymbols, function (retCode) {
                    contextObj.displayEmployeeDataOnDrawing(function (returnCode) {
                        if (returnCode == 0)
                            resCallback(0);
                        else
                            resCallback(1);
                    });
                });
                break;
            case 'bothData': contextObj.spaceOpenDrawingObj.showDataInDrawing(function (retCode) {
                if (retCode == 0) {
                    contextObj.displayEmployeeDataOnDrawing(function (returnCode) {
                        if (returnCode == 0)
                            resCallback(0);
                        else
                            resCallback(1);
                    });

                }
            });
                break;
        }
    }
    getTooltipData = function (Handle, resCallback) {
        var contextObj = this;
        let isSymbolHandle = contextObj.empHandlesData.some(function (el) { return el.SymbolHandle === Handle });
        if (isSymbolHandle) {
            contextObj.getEmployeeTooltipData(Handle, function (tooltipDataValues) {
                resCallback(true, tooltipDataValues);
            });
        }
        else {
            contextObj.spaceOpenDrawingObj.getTooltipData(Handle, "", function (retCode, tooltipDataValues) {
                resCallback(retCode, tooltipDataValues);
            });
        }
    }
    displayEmployeeDataOnDrawing = function (resCallback) {
        var contextObj = this;

        if (!contextObj.empData || !contextObj.empDisplaySettingData) {
            setTimeout(function () {
                contextObj.displayEmployeeDataOnDrawing(resCallback);

            }, 50);
        }
        else {
            var ratio = [0];
            contextObj.objiWhiz.clientDWGAreaRatio(ratio);
            var employeeData: any;
            if (contextObj.empCount > 0) {
                contextObj.empDrawingService.getEmployeeDisplaySettingsData(contextObj.categoryId, contextObj.addtlDataFieldCategoryId).subscribe(function (resultData) {
                    contextObj.empDisplaySettingData = resultData["Data"];
                    var empDispSettingsData = contextObj.empDisplaySettingData.slice();
                    employeeData = contextObj.empData.slice();
                    var isXpositionNull = contextObj.checkIsXpositionNull(employeeData, function (retCode, xPosNullEmpData) {
                        if (retCode == 0) {
                            var getXposData = contextObj.displayNotProperlyLocatedEmployees(xPosNullEmpData);
                            for (var empItem of getXposData) {
                                var index = employeeData.findIndex(function (el) { return el.Id === empItem['Id'] })
                                if (index != -1)
                                    employeeData[index] = empItem;
                            }
                            contextObj.createEmployeeDataAndTooltipOnDrawing(employeeData, empDispSettingsData, ratio, function (retCode) {
                                resCallback(retCode);
                            });
                        } else {
                            contextObj.createEmployeeDataAndTooltipOnDrawing(employeeData, empDispSettingsData, ratio, function (retCode) {
                                resCallback(retCode);
                            });
                        }
                    });
                });
            }
            else
                resCallback(1);
        }
        //else {
        //    contextObj.getAllEmployeeDetails(function (empData) {

        //        contextObj.empDrawingService.getEmployeeDisplaySettingsData(contextObj.categoryId, contextObj.addtlDataFieldCategoryId).subscribe(function (resultData) {
        //            contextObj.empDisplaySettingData = resultData["Data"];
        //            if (contextObj.empCount > 0) {
        //                var empDispSettingsData = contextObj.empDisplaySettingData.slice();
        //                employeeData = empData.slice();
        //                var isXpositionNull = contextObj.checkIsXpositionNull(employeeData, function (retCode, xPosNullEmpData) {
        //                    if (retCode == 0) {
        //                        var getXposData = contextObj.displayNotProperlyLocatedEmployees(xPosNullEmpData);
        //                        for (var empItem of getXposData) {
        //                            var index = employeeData.findIndex(function (el) { return el.Id === empItem['Id'] })
        //                            if (index != -1)
        //                                employeeData[index] = empItem;
        //                        }
        //                        contextObj.createEmployeeDataAndTooltipOnDrawing(employeeData, empDispSettingsData, ratio, function (retCode) {
        //                            resCallback(retCode);
        //                        });
        //                    } else {
        //                        contextObj.createEmployeeDataAndTooltipOnDrawing(employeeData, empDispSettingsData, ratio, function (retCode) {
        //                            resCallback(retCode);
        //                        });
        //                    }
        //                });
        //                //contextObj.createEmployeeDataAndTooltipOnDrawing(employeeData, empDispSettingsData, ratio, function (retCode) {
        //                //    resCallback(retCode);
        //                //});
        //            }
        //            else
        //                resCallback(1);
        //        });
        //    });
        //}
    }
    checkIsXpositionNull = function (empData, resCallback) {
        var xPosNullEmpData: any[] = [];
        for (let empDataitem of empData) {
            if (empDataitem['XPosition'] == null || empDataitem['XPosition'] == 0)
                xPosNullEmpData.push(empDataitem);
        }
        if (xPosNullEmpData.length > 0) {
            resCallback(0, xPosNullEmpData);
        }

        else
            resCallback(1);
    }
    //createEmployeeDataAndTooltipOnDrawing = function (employeeData, empDispSettingsData, ratio, resCallback) {
    //    var contextObj = this;
    //    var dblSymbolInsertionX;
    //    var dblSymbolInsertionY;
    //    var dblEmpSymbolScale;
    //    var intSymbolColor;
    //    var SpHandle;
    //    var intStartIndex;
    //    var strSpHandleAndModuleIds;
    //    var formatedText = "";
    //    if (employeeData.length > contextObj.arrayCount) {
    //        var employeeDataItem = employeeData[contextObj.arrayCount];
    //        dblSymbolInsertionX = employeeDataItem.XPosition;
    //        dblSymbolInsertionY = employeeDataItem.YPosition;
    //        dblEmpSymbolScale = contextObj.g_dblEmpSymbolLineTypeScale;

    //        contextObj.g_dblScaleFactor = dblEmpSymbolScale;//'Added to resolver the scaling for not porperly employees

    //        contextObj.g_strEmpSymbolCords = contextObj.g_strEmpSymbolCords.replace(/,/g, contextObj.colDelimiter);
    //        contextObj.g_strEmpSymbolCords = contextObj.g_strEmpSymbolCords.replace(/;/g, contextObj.rowDelimiter);
    //        if (employeeDataItem.Proposed == "Yes")
    //            intSymbolColor = contextObj.g_intScenarioSymbolColor;
    //        else
    //            intSymbolColor = contextObj.g_intEmployeeSymbolColor;
    //        if (dblSymbolInsertionX && dblSymbolInsertionY) {
    //            if (contextObj.spaceOpenDrawingObj.commonServices.g_IsNetCustomer)
    //                SpHandle = employeeDataItem.CarpetHandle;
    //            else
    //                SpHandle = employeeDataItem.BomaHandle;
    //            if (SpHandle) {
    //                // contextObj.objiWhiz.pointInEntity(SpHandle, dblSymbolInsertionX, dblSymbolInsertionY, function (retCode, isInside) {

    //                contextObj.objiWhiz.insertSymbol(contextObj.g_strEmployeeSymbolLayer, intSymbolColor, dblSymbolInsertionX, dblSymbolInsertionY, contextObj.g_strEmpSymbolCords, contextObj.g_dblEmpSymbolLineWidth, contextObj.g_strEmpSymbolLineType, dblEmpSymbolScale, function (returnCode, symbolHandle, ActualPoints) {
    //                    contextObj.objiWhiz.setApplicationLayer(contextObj.g_strEmployeeSymbolLayer);
    //                    if (returnCode != 0) {
    //                        //console.log("insertSymbol faild due to ", returnCode);
    //                        //employeeData.pop();
    //                        contextObj.arrayCount++;
    //                        contextObj.createEmployeeDataAndTooltipOnDrawing(employeeData, empDispSettingsData, ratio, resCallback);
    //                    }
    //                    else {
    //                        //strSpHandleAndModuleIds = SpHandle + contextObj.spaceOpenDrawingObj.commonServices.columnDelimiter + "5";
    //                        contextObj.empHandlesData.push({ EmpId: employeeDataItem.Id, SymbolHandle: symbolHandle });
    //                        contextObj.objiWhiz.getEntityExtents(symbolHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
    //                            if (retCode != 0) {
    //                                //console.log("getEntityExtents faild due to ", retCode);
    //                                //employeeData.pop();
    //                                contextObj.arrayCount++;
    //                                contextObj.createEmployeeDataAndTooltipOnDrawing(employeeData, empDispSettingsData, ratio, resCallback);
    //                            }
    //                            else {
    //                                for (let dispSettingsItem of empDispSettingsData) {
    //                                    //console.log("dispSettingsItem.ShowinDrawing", dispSettingsItem.FieldName, dispSettingsItem.ShowinDrawing);
    //                                    if (dispSettingsItem.ShowinDrawing) {
    //                                        var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
    //                                        var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
    //                                        let textContent = employeeDataItem[dispSettingsItem.FieldName];
    //                                        if (textContent == "null" || textContent == null)
    //                                            textContent = "-";
    //                                        formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + ratio[0] * dispSettingsItem.FontSize + ";" + textContent + "\\n";
    //                                      //  formatedText += "\\fTimes New Roman|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + ratio[0] * dispSettingsItem.FontSize + ";" + textContent + "\\n";
    //                                    }
    //                                }
    //                                let formatedTextFinal: string = "{" + formatedText + "}";
    //                                contextObj.objiWhiz.createMultilineText(contextObj.g_strEmployeeTextLayer, 1, MaxX, MaxY, contextObj.g_dblEmpTextAngle, ratio[0] * 1,
    //                                    0, 1, formatedTextFinal, "Standard", contextObj.g_intEmpTextStyleId, function (retCode, entityHandle) {
    //                                        contextObj.objiWhiz.setApplicationLayer(contextObj.g_strEmployeeTextLayer);
    //                                        if (retCode != 0) {
    //                                            //console.log("createMultilineText returned with error code : ", retCode);
    //                                            //employeeData.pop();
    //                                            contextObj.arrayCount++;
    //                                            contextObj.createEmployeeDataAndTooltipOnDrawing(employeeData, empDispSettingsData, ratio, resCallback);
    //                                        }
    //                                        else {
    //                                            contextObj.dataInDrawingTextHandles.push({ Key: employeeDataItem['Id'], Value: entityHandle });
    //                                            //console.log("createMultilineText Entity handle: ", entityHandle);
    //                                            //employeeData.pop();
    //                                            contextObj.arrayCount++;
    //                                            contextObj.createEmployeeDataAndTooltipOnDrawing(employeeData, empDispSettingsData, ratio, resCallback);
    //                                        }
    //                                    });
    //                            }
    //                        });
    //                    }
    //                });
    //                //});

    //            }
    //        }
    //        else {
    //        contextObj.arrayCount++;
    //        contextObj.createEmployeeDataAndTooltipOnDrawing(employeeData, empDispSettingsData, ratio, resCallback);

    //        }
    //          // intStartIndex = contextObj.g_intEmpStaticFieldEndIndex + 1;
    //        //  intEndIndex = intStartIndex + g_objEmployeeDisplaySettingsDB.RecordCount + 1

    //    }
    //    else {
    //        contextObj.arrayCount = 0;
    //        resCallback(0);
    //    }
    //}

    createEmployeeDataAndTooltipOnDrawing = function (employeeData, empDispSettingsData, ratio, resCallback) {
        var contextObj = this;
        var itemsForCreateText = [];
        var dblEmpSymbolScale;
        var intSymbolColor;
        var employeeIds = [];

        for (let i = 0; i < employeeData.length; i++) {
            var employeeDataItem = employeeData[i];

            var dblSymbolInsertionX;
            var dblSymbolInsertionY;
            dblSymbolInsertionX = employeeDataItem.XPosition;
            dblSymbolInsertionY = employeeDataItem.YPosition;
            dblEmpSymbolScale = contextObj.g_dblScaleFactor;

            //contextObj.g_dblScaleFactor = dblEmpSymbolScale;//'Added to resolver the scaling for not porperly employees

            contextObj.g_strEmpSymbolCords = contextObj.g_strEmpSymbolCords.replace(/,/g, contextObj.colDelimiter);
            contextObj.g_strEmpSymbolCords = contextObj.g_strEmpSymbolCords.replace(/;/g, contextObj.rowDelimiter);
            if (employeeDataItem.Proposed == "Yes") {
                intSymbolColor = contextObj.g_intScenarioSymbolColor;
                dblEmpSymbolScale = contextObj.g_dblScenarioScaleFactor;
            }
            else
                intSymbolColor = contextObj.g_intEmployeeSymbolColor;

            if (dblSymbolInsertionX && dblSymbolInsertionY) {
                var SpHandle;

                if (contextObj.spaceOpenDrawingObj.commonServices.g_IsNetCustomer)
                    SpHandle = employeeDataItem.CarpetHandle;
                else
                    SpHandle = employeeDataItem.BomaHandle;
                var formatedText = "";
                if (SpHandle) {
                    employeeIds.push(employeeDataItem.Id);
                    contextObj.g_strEmployeeSymbolLayer, intSymbolColor, dblSymbolInsertionX, dblSymbolInsertionY, contextObj.g_strEmpSymbolCords, contextObj.g_dblEmpSymbolLineWidth, contextObj.g_strEmpSymbolLineType, dblEmpSymbolScale

                    for (let dispSettingsItem of empDispSettingsData) {
                        if (dispSettingsItem.ShowinDrawing) {
                            var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
                            var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
                            let textContent = employeeDataItem[dispSettingsItem.FieldName];
                            if (textContent == "null" || textContent == null)
                                textContent = "-";
                            formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
                        }
                    }

                    let formatedTextFinal: string = "{" + formatedText + "}";
                    itemsForCreateText.push([formatedTextFinal, dblSymbolInsertionX, dblSymbolInsertionY]);
                }
            }
        }
        debugger
        contextObj.objiWhiz.createCommonSymbolwithData(itemsForCreateText, contextObj.g_strEmployeeTextLayer, 1, contextObj.g_dblEmpTextAngle, ratio[0] * contextObj.g_dblTextHeight,
            0, 1, "Standard", contextObj.g_intEmpTextStyleId, contextObj.g_strEmployeeSymbolLayer, intSymbolColor,
            contextObj.g_strEmpSymbolCords, contextObj.g_dblEmpSymbolLineWidth, contextObj.g_strEmpSymbolLineType, dblEmpSymbolScale, function (retCode, symbolHandles, textHandles) {

                contextObj.objiWhiz.setTextSize(textHandles, contextObj.g_dblTextHeight, function (returnCode, resultArray) {
                    if (returnCode == 0) { }

                if (retCode == 0) {
                    contextObj.objiWhiz.setApplicationLayer(contextObj.g_strEmployeeSymbolLayer);
                    contextObj.objiWhiz.setApplicationLayer(contextObj.g_strEmployeeTextLayer); 
                    var symbolHandleArray = symbolHandles.split(contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter);
                    symbolHandleArray.pop();
                    var textHandleArray = textHandles.split(contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter);
                    textHandleArray.pop();
                    var i = 0;
                    //if (contextObj.dataInDrawingTextHandles.length > 0)
                    //    contextObj.dataInDrawingTextHandles = [];
                    for (let textHandle of textHandleArray) {
                        if (textHandle != "" && symbolHandleArray[i] != "") {
                            contextObj.empHandlesData.push({ EmpId: employeeIds[i], SymbolHandle: symbolHandleArray[i], TextHandle: textHandle });
                            contextObj.dataInDrawingTextHandles.push({ Key: employeeIds[i], Value: textHandle });
                        }
                        i++;
                    }
                }

                resCallback(0);
                });
            });

    }

    displayNotProperlyLocatedEmployees(xPosNullEmpData) {
        var contextObj = this;
        var sortedxPosNullEmpData = xPosNullEmpData.sort(function (a, b) { return a.AssignedSpaceId - b.AssignedSpaceId });
        for (var i = 0; i < sortedxPosNullEmpData.length; i++) {
            // if (empDataitem['AssignedSpaceId'] != null) {
            let spaceId = sortedxPosNullEmpData[i]['AssignedSpaceId'];
            if (spaceId != null && spaceId != undefined) {
                contextObj.commonDwgServices.calculateDwgRatio();
                let previousSpaceId: number = undefined;
                let entityHandle: string = contextObj.getSpaceHandleViaSpaceId(spaceId);
                if (i > 0)
                    previousSpaceId = sortedxPosNullEmpData[i - 1]['AssignedSpaceId'];

                if (spaceId != previousSpaceId) {
                    var currentSpaceData = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId == spaceId });
                    var textInsertionX = currentSpaceData['TextInsertionX'];
                    var textInsertionY = currentSpaceData['TextInsertionY']
                    sortedxPosNullEmpData[i]['XPosition'] = textInsertionX;
                    sortedxPosNullEmpData[i]['YPosition'] = textInsertionY;
                }
                else {
                    var previousSpaceData = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId == previousSpaceId });
                    sortedxPosNullEmpData[i]['XPosition'] = sortedxPosNullEmpData[i - 1]['XPosition'] + (3 * contextObj.commonDwgServices.g_dblDwgRatio);
                    sortedxPosNullEmpData[i]['YPosition'] = sortedxPosNullEmpData[i - 1]['YPosition'];
                }

            }

            // }
        }
        return xPosNullEmpData;
    }
    getSpaceHandleViaSpaceId(spaceId) {
        var selectedSpacehandle: string = "";

        if (this.isSpace)
            selectedSpacehandle = this.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId === spaceId })['BomaHandle'];
        else
            selectedSpacehandle = this.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId === spaceId })['CarpetHandle'];
        return selectedSpacehandle;
    }
    //getMovedEmployeeScaleAndSpacing = function (spaceId, dblX, dblY, empCount,resCallback) {
    //    var contextObj = this;
    //    var Xpos;
    //    var Ypos;



    //}
    getEmployeeTooltipData = function (symbolHandle, resCallback) {
        var contextObj = this;
        contextObj.empTooltipData = [];
        var index = contextObj.empHandlesData.findIndex(function (el) { return el.SymbolHandle === symbolHandle });
        var empId = contextObj.empHandlesData[index].EmpId;
        var dataitemIndex = contextObj.empData.findIndex(function (el) { return el.Id === empId });
        var dataItem = contextObj.empData[dataitemIndex];
        //console.log("dataItem", dataItem);
        for (let dispalySettingsData of contextObj.empDisplaySettingData) {
            // var itemsexists = Object.keys(dataItem).some(function (el) { return el = dispalySettingsData.FieldName })
            if (dispalySettingsData.ShowinTooltip) {
                contextObj.empTooltipData.push({ Key: dispalySettingsData.FieldName, Value: dataItem[dispalySettingsData.FieldName] });
            }
        }
        resCallback(contextObj.empTooltipData);
    }
    getOccupiedDistributionMapData = function (DistributionTypeNo, resCallback) {
        var contextObj = this;
        contextObj.empDrawingService.getOccupancyDistributionMapData(DistributionTypeNo, this.drawingId).subscribe(function (resultData) {
            contextObj.dataString = JSON.parse(resultData["Data"].FieldBinderData)[0].Handles;
            if (contextObj.dataString != null) {
                switch (DistributionTypeNo) {
                    case DistributionType.Occupied: contextObj.occupiedArea = contextObj.dataString.split(contextObj.colDelimiter).pop();
                        contextObj.occupiedHandleArray = contextObj.dataString.split(contextObj.rowDelimiter);
                        contextObj.occupiedHandleArray.pop();
                        break;
                    case DistributionType.UnOccupied: contextObj.unOccupiedArea = contextObj.dataString.split(contextObj.colDelimiter).pop();
                        contextObj.unOccupiedHandleArray = contextObj.dataString.split(contextObj.rowDelimiter);
                        contextObj.unOccupiedHandleArray.pop();
                        break;
                    case DistributionType.UnderOccupied: contextObj.underOccupiedArea = contextObj.dataString.split(contextObj.colDelimiter).pop();
                        contextObj.underOccupiedHandleArray = contextObj.dataString.split(contextObj.rowDelimiter);
                        contextObj.underOccupiedHandleArray.pop();
                        break;
                    case DistributionType.OverOccupied: contextObj.overOccupiedArea = +contextObj.dataString.split(contextObj.colDelimiter).pop();
                        contextObj.overOccupiedHandleArray = contextObj.dataString.split(contextObj.rowDelimiter);
                        contextObj.overOccupiedHandleArray.pop();
                        break;
                    case DistributionType.NominalOccupied: contextObj.nominalOccupiedArea = +contextObj.dataString.split(contextObj.colDelimiter).pop();
                        contextObj.nominalOccupiedHandleArray = contextObj.dataString.split(contextObj.rowDelimiter);
                        contextObj.nominalOccupiedHandleArray.pop();
                        break;
                }
                resCallback(0);
            }
            else
                resCallback(1);
        });
    }
    moveLegend() {

        var contextObj = this;
        if (contextObj.spaceOpenDrawingObj.moveLegendHandle != "") {
            contextObj.objiWhiz.setCursor(2);
            contextObj.objiWhiz.setEntityVisibility(contextObj.spaceOpenDrawingObj.moveLegendHandle, false, function (ret) {
                contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
                    if (retCode == 0) {
                        contextObj.objiWhiz.moveEntity(contextObj.spaceOpenDrawingObj.moveLegendHandle, xPos, yPos, function (retCode) {
                            contextObj.objiWhiz.setEntityVisibility(contextObj.spaceOpenDrawingObj.moveLegendHandle, true, function (ret) {
                                contextObj.objiWhiz.zoomExtents(function (ret) {

                                });
                            });
                        });
                    }
                });
            });
        }
        //var contextObj = this;
        //this.objiWhiz.deleteLayer("$LEGEND", function (retCode) {
        //    contextObj.objiWhiz.setCursor(2);
        //    switch (contextObj.moveLegedDetails[0][0]) {
        //        case "3":
        //            contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
        //                if (retCode == 0) {
        //                    contextObj.objiWhiz.createDistributionMapOccupancy(contextObj.moduleId, contextObj.moveLegedDetails[0][1], contextObj.spaceOpenDrawingObj.commonServices.g_IsNetCustomer, contextObj.spaceOpenDrawingObj.commonServices.areaUnit, contextObj.spaceOpenDrawingObj.commonServices.drawingDetails.SiteName, contextObj.spaceOpenDrawingObj.commonServices.drawingDetails.BuildingName, contextObj.spaceOpenDrawingObj.commonServices.drawingDetails.FloorName, false, xPos, yPos, function (retCode, hatchedHandles) {
        //                        contextObj.objiWhiz.setApplicationLayer("$LEGEND");
        //                    });
        //                }
        //            });
        //            break;   
        //    }
        //});        
    }
    invokeDistributionMapOccupancy(Target, resCallback) {
        //this.moveLegedDetails = [];
        //this.moveLegedDetails.push(["3", Target]);

        var contextObj = this;
        contextObj.objiWhiz.createDistributionMapOccupancy(contextObj.moduleId, Target, contextObj.spaceOpenDrawingObj.commonServices.g_IsNetCustomer, contextObj.commonDwgServices.areaUnit,
            contextObj.spaceOpenDrawingObj.commonServices.drawingDetails.SiteName, contextObj.spaceOpenDrawingObj.commonServices.drawingDetails.BuildingName, contextObj.spaceOpenDrawingObj.commonServices.drawingDetails.FloorName, true, 0, 0, function (retCode, hatchedHandles, legendHandle, legendBlockHandle) {
                contextObj.spaceOpenDrawingObj.moveLegendHandle = legendHandle;
                contextObj.spaceOpenDrawingObj.moveLegendBlockHandle = legendBlockHandle;
                contextObj.objiWhiz.setApplicationLayer("$LEGEND");
                contextObj.objiWhiz.setApplicationLayer("$Hatch");
                if (retCode == 0) {
                    var hatchHndleArray = hatchedHandles.split(contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter);
                    hatchHndleArray.pop();
                    resCallback(0, hatchHndleArray);
                }
                else {
                    contextObj.objiWhiz.zoomExtents(function (ret) {
                        resCallback(1);
                    });
                }
            });
        //var contextObj = this;
        //let orgdistributionSettingsBasedOnDrawingsData: any;
        //var dataString: string = "";
        //contextObj.empDrawingService.getColorHatchPreferences().subscribe(function (resultData) {
        //    contextObj.occupancyColorHatchObject = JSON.parse(resultData["Data"].FieldBinderData)[0];
        //    switch (Target) {
        //        case 1: contextObj.selectedOccupancyName = "Occupancy";
        //            contextObj.underOccupiedHandleArray = [];
        //            contextObj.overOccupiedHandleArray = [];
        //            contextObj.nominalOccupiedHandleArray = [];
        //            contextObj.empOccupancyLegendData = [];
        //            contextObj.nominalOccupiedArea = 0;
        //            contextObj.underOccupiedArea = "0";
        //            contextObj.overOccupiedArea = 0;
        //            contextObj.getOccupiedDistributionMapData(DistributionType.UnderOccupied, function (retCode) {
        //                if (contextObj.underOccupiedHandleArray.length > 0)
        //                    contextObj.empOccupancyLegendData.push({ HatchObj: { ColorId: contextObj.occupancyColorHatchObject.UnderOccupiedColor, HatchAngle: contextObj.occupancyColorHatchObject.UnderOccupiedHatchAngle, HatchScale: contextObj.occupancyColorHatchObject.UnderOccupiedHatchScale, HatchPatternId: contextObj.occupancyColorHatchObject.UnderOccupiedHatchPatternId, RGBColor: contextObj.occupancyColorHatchObject.UnderOccupiedColorRGB }, TextName: "Vacant Rooms", Area: contextObj.underOccupiedArea })
        //                contextObj.getOccupiedDistributionMapData(DistributionType.OverOccupied, function (retCode) {
        //                    contextObj.getOccupiedDistributionMapData(DistributionType.NominalOccupied, function (retCode) {
        //                        let occupiedHatchArrayHandles;
        //                        if (contextObj.overOccupiedHandleArray.length > 0 && contextObj.nominalOccupiedHandleArray.length > 0)
        //                            occupiedHatchArrayHandles = contextObj.nominalOccupiedHandleArray.concat(contextObj.overOccupiedHandleArray);
        //                        else if (contextObj.overOccupiedHandleArray.length > 0 && contextObj.nominalOccupiedHandleArray.length == 0)
        //                            occupiedHatchArrayHandles = contextObj.overOccupiedHandleArray;
        //                        else if (contextObj.overOccupiedHandleArray.length == 0 && contextObj.nominalOccupiedHandleArray.length > 0)
        //                            occupiedHatchArrayHandles = contextObj.nominalOccupiedHandleArray;
        //                        if (occupiedHatchArrayHandles != undefined) {
        //                            let totalArea = +contextObj.overOccupiedArea + +contextObj.nominalOccupiedArea;
        //                            contextObj.empOccupancyLegendData.push({ HatchObj: { ColorId: contextObj.occupancyColorHatchObject.OccupiedColor, HatchAngle: contextObj.occupancyColorHatchObject.OccupiedHatchAngle, HatchScale: contextObj.occupancyColorHatchObject.OccupiedHatchScale, HatchPatternId: contextObj.occupancyColorHatchObject.OccupiedHatchPatternId, RGBColor: contextObj.occupancyColorHatchObject.OccupiedColorColorRGB }, TextName: "Occupied Rooms", Area: totalArea.toFixed(2) })
        //                        }
        //                        if (contextObj.underOccupiedHandleArray.length > 0 && occupiedHatchArrayHandles != undefined) {
        //                            contextObj.hatchEmpOccupancyHandles(contextObj.underOccupiedHandleArray, contextObj.empOccupancyLegendData[0], function (rescallback) {
        //                                contextObj.hatchEmpOccupancyHandles(occupiedHatchArrayHandles, contextObj.empOccupancyLegendData[1], function (rescallback) {
        //                                    contextObj.createEmpOccupancyLegend(function (returnCode) {
        //                                        contextObj.objiWhiz.zoomExtents(function (retCode) {
        //                                            resCallback(returnCode, contextObj.hatchHandles);
        //                                        });
        //                                    });
        //                                });
        //                            });
        //                        } else if (contextObj.underOccupiedHandleArray.length > 0 && occupiedHatchArrayHandles == undefined) {
        //                            contextObj.hatchEmpOccupancyHandles(contextObj.underOccupiedHandleArray, contextObj.empOccupancyLegendData[0], function (rescallback) {
        //                                contextObj.createEmpOccupancyLegend(function (returnCode) {
        //                                    contextObj.objiWhiz.zoomExtents(function (retCode) {
        //                                        resCallback(returnCode, contextObj.hatchHandles);
        //                                    });
        //                                });
        //                            });
        //                        } else if (contextObj.underOccupiedHandleArray.length == 0 && occupiedHatchArrayHandles != undefined) {
        //                            contextObj.hatchEmpOccupancyHandles(occupiedHatchArrayHandles, contextObj.empOccupancyLegendData[0], function (rescallback) {
        //                                contextObj.createEmpOccupancyLegend(function (returnCode) {
        //                                    contextObj.objiWhiz.zoomExtents(function (retCode) {
        //                                        resCallback(returnCode, contextObj.hatchHandles);
        //                                    });
        //                                });
        //                            });
        //                        }
        //                    });
        //                });
        //            });
        //            break;
        //    }
        //});
    }
    hatchEmpOccupancyHandles = function (hatchHandleArray, empOccupancyLegendDataObj, resCallback) {
        var contextObj = this;
        var mapHandles = [];
        var rgbColors = [];
        if (hatchHandleArray.length > 0) {
            for (var item in hatchHandleArray) {
                if (hatchHandleArray[item] != "") {
                    mapHandles.push(hatchHandleArray[item]);
                    rgbColors.push(contextObj.spaceOpenDrawingObj.hexToRgb(empOccupancyLegendDataObj.HatchObj.RGBColor));
                    contextObj.hatchHandles.push(hatchHandleArray[item]);
                }
            }
            contextObj.objiWhiz.createMap(mapHandles, rgbColors, function (retCode) {
                contextObj.objiWhiz.setApplicationLayer("$Hatch");
                resCallback(0);
            });
        }
        else
            resCallback(0);
    }
    //invokeDistributionMapOccupancy(Target, resCallback) {
    //    var contextObj = this;
    //    let orgdistributionSettingsBasedOnDrawingsData: any;
    //    var dataString: string = "";
    //    contextObj.empDrawingService.getColorHatchPreferences().subscribe(function (resultData) {
    //        contextObj.occupancyColorHatchObject = JSON.parse(resultData["Data"].FieldBinderData)[0];
    //        switch (Target) {
    //            case 1: contextObj.selectedOccupancyName = "Occupancy";
    //                contextObj.underOccupiedHandleArray = [];
    //                contextObj.overOccupiedHandleArray = [];
    //                contextObj.nominalOccupiedHandleArray = [];
    //                contextObj.empOccupancyLegendData = [];
    //                contextObj.unOccupiedArea=0;
    //                contextObj.underOccupiedArea=0;
    //                contextObj.overOccupiedArea=0;
    //                contextObj.getOccupiedDistributionMapData(DistributionType.UnderOccupied, function (retCode) {
    //                    if (contextObj.underOccupiedHandleArray.length > 0)
    //                            contextObj.empOccupancyLegendData.push({ HatchObj: { ColorId: contextObj.occupancyColorHatchObject.UnderOccupiedColor, HatchAngle: contextObj.occupancyColorHatchObject.UnderOccupiedHatchAngle, HatchScale: contextObj.occupancyColorHatchObject.UnderOccupiedHatchScale, HatchPatternId: contextObj.occupancyColorHatchObject.UnderOccupiedHatchPatternId }, TextName: "Vaccant Room", Area: contextObj.underOccupiedArea })
    //                        contextObj.getOccupiedDistributionMapData(DistributionType.OverOccupied, function (retCode) {
    //                                contextObj.getOccupiedDistributionMapData(DistributionType.NominalOccupied, function (retCode) {
    //                                        let occupiedHatchArrayHandles;
    //                                        if (contextObj.overOccupiedHandleArray.length > 0 && contextObj.nominalOccupiedHandleArray.length > 0)
    //                                            occupiedHatchArrayHandles = contextObj.nominalOccupiedHandleArray.concat(contextObj.overOccupiedHandleArray);
    //                                        else if (contextObj.overOccupiedHandleArray.length > 0 && contextObj.nominalOccupiedHandleArray.length == 0)
    //                                            occupiedHatchArrayHandles = contextObj.overOccupiedHandleArray;
    //                                        else if (contextObj.overOccupiedHandleArray.length == 0 && contextObj.nominalOccupiedHandleArray.length > 0)
    //                                            occupiedHatchArrayHandles = contextObj.nominalOccupiedHandleArray;
    //                                        if (occupiedHatchArrayHandles != undefined) {
    //                                            let totalArea = +contextObj.overOccupiedArea + +contextObj.nominalOccupiedArea;
    //                                                contextObj.empOccupancyLegendData.push({ HatchObj: { ColorId: contextObj.occupancyColorHatchObject.OccupiedColor, HatchAngle: contextObj.occupancyColorHatchObject.OccupiedHatchAngle, HatchScale: contextObj.occupancyColorHatchObject.OccupiedHatchScale, HatchPatternId: contextObj.occupancyColorHatchObject.OccupiedHatchPatternId }, TextName: "Occupied Room", Area: totalArea })
    //                                        } 
    //                                        if (contextObj.underOccupiedHandleArray.length > 0 && occupiedHatchArrayHandles != undefined) {
    //                                            contextObj.hatchEmpOccupancyHandles(contextObj.underOccupiedHandleArray, contextObj.empOccupancyLegendData[0], function (rescallback) {
    //                                                contextObj.hatchEmpOccupancyHandles(occupiedHatchArrayHandles, contextObj.empOccupancyLegendData[1], function (rescallback) {
    //                                                    contextObj.createEmpOccupancyLegend(function (returnCode) {
    //                                                        resCallback(returnCode, contextObj.hatchHandles);
    //                                                    });
    //                                                });
    //                                            });
    //                                        } else if (contextObj.underOccupiedHandleArray.length > 0 && occupiedHatchArrayHandles == undefined) {
    //                                            contextObj.hatchEmpOccupancyHandles(contextObj.underOccupiedHandleArray, contextObj.empOccupancyLegendData[0], function (rescallback) {
    //                                                contextObj.createEmpOccupancyLegend(function (returnCode) {
    //                                                    resCallback(returnCode, contextObj.hatchHandles);
    //                                                });
    //                                            });
    //                                        } else if (contextObj.underOccupiedHandleArray.length == 0 && occupiedHatchArrayHandles != undefined) {
    //                                                contextObj.hatchEmpOccupancyHandles(occupiedHatchArrayHandles, contextObj.empOccupancyLegendData[0], function (rescallback) {
    //                                                    contextObj.createEmpOccupancyLegend(function (returnCode) {
    //                                                        resCallback(returnCode, contextObj.hatchHandles);
    //                                                    });
    //                                                });
    //                                        }
    //                                });
    //                        });
    //                });
    //                break;
    //        }
    //    });
    //}

    //hatchEmpOccupancyHandles = function (hatchHandleArray, empOccupancyLegendDataObj, resCallback) {
    //    var contextObj = this;
    //    if (hatchHandleArray.length > contextObj.arrayCount) {
    //        contextObj.objiWhiz.hatchEntity("$Hatch", hatchHandleArray[contextObj.arrayCount], empOccupancyLegendDataObj.HatchObj.ColorId, empOccupancyLegendDataObj.HatchObj.HatchAngle, empOccupancyLegendDataObj.HatchObj.HatchScale, empOccupancyLegendDataObj.HatchObj.HatchPatternId, false, function (retCode, hatchHandle) {
    //            contextObj.objiWhiz.setApplicationLayer("$Hatch");
    //            contextObj.hatchHandles.push(hatchHandleArray[contextObj.arrayCount]);
    //            if (retCode != 0) {
    //                //console.log("hatchEntity returned with error code : ", retCode);
    //                contextObj.arrayCount++;
    //                contextObj.hatchEmpOccupancyHandles(hatchHandleArray, empOccupancyLegendDataObj, resCallback);
    //            }
    //            else {
    //                contextObj.arrayCount++;
    //                contextObj.hatchEmpOccupancyHandles(hatchHandleArray, empOccupancyLegendDataObj, resCallback);
    //            }
    //        });

    //    }
    //    else {
    //        contextObj.arrayCount = 0;
    //        resCallback(0);
    //    }
    //}
    createEmpOccupancyLegend = function (resCallback) {
        var contextObj = this;
        let dblLegendStartXCord;
        let dblLegendStartYCord;
        let dblMaxX: number;
        let dblMaxY: number;

        //console.log("contextObj.commonDwgServices", contextObj.commonDwgServices);
        contextObj.commonDwgServices.calculateDwgRatio();
        dblMaxX = contextObj.commonDwgServices.dwgExtentsX;
        dblMaxY = contextObj.commonDwgServices.dwgExtentsY;
        //console.log("dblMaxX", dblMaxX, dblMaxY);
        dblMaxX = dblMaxX + ((contextObj.commonDwgServices.g_intLegendTextSize) + (8 * contextObj.commonDwgServices.g_dblDwgRatio));
        dblMaxY = dblMaxY - ((contextObj.commonDwgServices.g_intLegendTextSize) + (3 * contextObj.commonDwgServices.g_dblDwgRatio));

        dblLegendStartXCord = dblMaxX;
        dblLegendStartYCord = dblMaxY;
        contextObj.spaceOpenDrawingObj.createDrawingDetailsLegend(dblLegendStartXCord, dblLegendStartYCord, true, function (rtndblLegendStartYCord) {
            contextObj.createDistributionLegend(dblLegendStartXCord, rtndblLegendStartYCord, function (retCode) {
                resCallback(retCode);
            });
        });
    }
    createDistributionLegend = function (dblLegendStartXCord, dblLegendStartYCord, resCallback) {
        let contextObj = this;
        let dblX = dblLegendStartXCord;
        let dblY = dblLegendStartYCord;
        let HL1StartX = dblX - (8 * contextObj.commonDwgServices.g_dblDwgRatio);
        let HL1StartY = dblY + (4 * contextObj.commonDwgServices.g_dblDwgRatio);
        let strTextHandle: string[] = [];
        let intDistRectWidth = contextObj.commonDwgServices.g_intLegendTextSize * 2;//g_intDistRectWidth * g_dblDwgRatio+(g_intLegendTextSize/2)
        //console.log("intDistRectWidth", intDistRectWidth);
        let intDistRectHeight = contextObj.commonDwgServices.g_intLegendTextSize * 2;//g_intDistRectHeight * g_dblDwgRatio+(g_intLegendTextSize/2)
        contextObj.intDistRectHeight = intDistRectHeight;
        let TextMaxX = 0;
        let HL2StartY;
        let VL2StartX;
        //console.log("contextObj.commonDwgServices.g_strTextStyleName", contextObj.commonDwgServices.g_strTextStyleName);
        contextObj.objiWhiz.createText("$LEGEND", 7, dblX, dblY, contextObj.commonDwgServices.g_intSpaceDataTextAngle, (contextObj.commonDwgServices.g_intLegendTextSize) - (contextObj.commonDwgServices.g_intLegendTextSize * .25),
            contextObj.commonDwgServices.g_intSpaceDataTextWidth, "Hatch", contextObj.commonDwgServices.g_strTextStyleName, 8, function (retCode, textHandle) {
                if (retCode != 0)
                    console.log("createText returned with error code : ", retCode);
                else {
                    contextObj.objiWhiz.getEntityExtents(textHandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                        if (retCode != 0) {
                            console.log("getEntityExtents faild due to ", retCode);
                        }
                        else {
                            contextObj.objiWhiz.createText("$LEGEND", 7, dblX, MinY - (1 * contextObj.commonDwgServices.g_dblDwgRatio), contextObj.commonDwgServices.g_intSpaceDataTextAngle, (contextObj.commonDwgServices.g_intLegendTextSize) - (contextObj.commonDwgServices.g_intLegendTextSize * .25),
                                contextObj.commonDwgServices.g_intSpaceDataTextWidth, "Pattern", contextObj.commonDwgServices.g_strTextStyleName, 2, function (retCode, textHandle2) {
                                    contextObj.objiWhiz.setApplicationLayer("$Hatch");
                                    if (retCode != 0)
                                        console.log("createText returned with error code : ", retCode);
                                    else {
                                        console.log("Entity handle: ", textHandle2);
                                        contextObj.getDistributionByName(dblX, intDistRectHeight, dblY, TextMaxX, HL2StartY, intDistRectWidth, HL1StartX, VL2StartX, function (returnCode, rtnTextMaxX, VL1EndY, rtnHL2StartY, rtnVL2StartX, VL3StartX) {
                                            var HL1EndX = rtnTextMaxX + (2 * contextObj.commonDwgServices.g_dblDwgRatio);
                                            contextObj.spaceOpenDrawingObj.createLegendLines(HL1StartX, HL1StartY, HL1EndX, HL1StartY, function (retCode) {//HL1
                                                contextObj.spaceOpenDrawingObj.createLegendLines(HL1StartX, HL1StartY, HL1StartX, VL1EndY, function (retCode) {//VL1
                                                    contextObj.spaceOpenDrawingObj.createLegendLines(HL1StartX, rtnHL2StartY, HL1EndX, rtnHL2StartY, function (retCode) {//HL2
                                                        contextObj.spaceOpenDrawingObj.createLegendLines(HL1StartX, VL1EndY, HL1EndX, VL1EndY, function (retCode) {//HL3
                                                            contextObj.spaceOpenDrawingObj.createLegendLines(rtnVL2StartX, HL1StartY, rtnVL2StartX, VL1EndY, function (retCode) {//VL2
                                                                contextObj.spaceOpenDrawingObj.createLegendLines(VL3StartX, HL1StartY, VL3StartX, VL1EndY, function (retCode) {//VL3
                                                                    contextObj.spaceOpenDrawingObj.createLegendLines(HL1EndX, HL1StartY, HL1EndX, VL1EndY, function (retCode) {//VL4
                                                                        contextObj.getspaceStandardCapacityLegend(HL1StartX, VL1EndY, intDistRectHeight, function (retCode, rtnEndY) {
                                                                            contextObj.spaceOpenDrawingObj.createDisplayOrderLegend(contextObj.spaceOpenDrawingObj.displaySettingData, HL1StartX, rtnEndY, function (retCode) {
                                                                                resCallback(0)
                                                                            });
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
                        }

                    });
                }
            });
    }
    getDistributionByName = function (dblX, intDistRectHeight, dblY, TextMaxX, HL2StartY, intDistRectWidth, HL1StartX, VL2StartX, resCallback) {
        let contextObj = this;
        let dblStartY;
        let dblStartY1;
        let VL1EndY;
        dblX = dblX + (intDistRectHeight / 2);
        contextObj.objiWhiz.createText("$LEGEND", 7, dblX + (intDistRectHeight + (4 * contextObj.commonDwgServices.g_dblDwgRatio)), dblY - (intDistRectHeight / 3), contextObj.commonDwgServices.g_intSpaceDataTextAngle, (contextObj.commonDwgServices.g_intLegendTextSize) - (contextObj.commonDwgServices.g_intLegendTextSize * .25),
            contextObj.commonDwgServices.g_intSpaceDataTextWidth, contextObj.selectedOccupancyName, contextObj.commonDwgServices.g_strTextStyleName, contextObj.commonDwgServices.g_strSpaceDataTextLegendStyleId, function (retCode, orgLevelTextHandle) {
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
                            dblY = dblY - intDistRectHeight - (2 * contextObj.commonDwgServices.g_dblDwgRatio);
                            HL2StartY = dblY;
                            dblY = dblY - intDistRectHeight - (2 * contextObj.commonDwgServices.g_dblDwgRatio);
                            dblStartY1 = dblY;
                            contextObj.hatchPatternLegent(contextObj.empOccupancyLegendData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, function (returnCode, rtnVL2StartX, rtnTextMaxX, rtnVL1EndY) {
                                if (retCode == 0) {
                                    dblY = dblStartY;
                                    //'VL3StartX=TextMaxX +50
                                    let VL3StartX = rtnTextMaxX + (contextObj.commonDwgServices.g_intLegendTextSize) + (2 * contextObj.commonDwgServices.g_dblDwgRatio);
                                    //'dblX=TextMaxX +100
                                    dblX = rtnTextMaxX + (contextObj.commonDwgServices.g_intLegendTextSize) + (4 * contextObj.commonDwgServices.g_dblDwgRatio);
                                    contextObj.objiWhiz.createText("$LEGEND", 7, dblX, dblY - (intDistRectHeight / 3), contextObj.commonDwgServices.g_intSpaceDataTextAngle, (contextObj.commonDwgServices.g_intLegendTextSize) - (contextObj.commonDwgServices.g_intLegendTextSize * .25),
                                        contextObj.commonDwgServices.g_intSpaceDataTextWidth, "Area (" + contextObj.commonDwgServices.areaUnit + ")", contextObj.commonDwgServices.g_strTextStyleName, contextObj.commonDwgServices.g_strSpaceDataTextLegendStyleId, function (retCode, entityHandle) {
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
                                                        // dblY = dblY - intDistRectHeight - (6 * contextObj.commonDwgServices.g_dblDwgRatio);
                                                        contextObj.displayAreaValues(contextObj.empOccupancyLegendData, dblStartY1, intDistRectHeight, TextMaxX, function (retCode, TextMaxX) {
                                                            if (retCode == 0) {
                                                                resCallback(0, TextMaxX, rtnVL1EndY, HL2StartY, rtnVL2StartX, VL3StartX);
                                                            }
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
            });
    }
    hatchPatternLegent = function (legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback) {
        var contextObj = this;
        var hatchHandle = [];
        var strTextHandle = [];
        if (legentData.length > contextObj.arrayCount) {
            var legentDataItem = legentData[contextObj.arrayCount];
            console.log(" dblX - (intDistRectHight / 2), dblY, intDistRectWidth, intDistRectHight ", dblX - (intDistRectHeight / 2), dblY, intDistRectWidth, intDistRectHeight);

            console.log("legentDataItem ", legentDataItem);
            legentDataItem.HatchObj.HatchScale = 1;

            var tempCoords = (dblX - intDistRectWidth) + contextObj.colDelimiter + (dblY - intDistRectHeight / 2) + contextObj.rowDelimiter +
                (dblX) + contextObj.colDelimiter + (dblY - intDistRectHeight / 2) + contextObj.rowDelimiter +
                (dblX) + contextObj.colDelimiter + (dblY + intDistRectHeight / 2) + contextObj.rowDelimiter +
                (dblX - intDistRectWidth) + contextObj.colDelimiter + (dblY + intDistRectHeight / 2) + contextObj.rowDelimiter;
            var mapCoords = [tempCoords];
            var rgbColors = [];
            rgbColors.push(contextObj.spaceOpenDrawingObj.hexToRgb(legentDataItem.HatchObj.RGBColor));
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
                    VL2StartX = maxX[0] + (intDistRectHeight) + (2 * contextObj.commonDwgServices.g_dblDwgRatio);
                    VL1EndY = minY[0] - (intDistRectHeight) - (1 * contextObj.commonDwgServices.g_dblDwgRatio);
                    console.log("VL2StartX + (2 * contextObj.commonDwgServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3)", VL2StartX + (2 * contextObj.commonDwgServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3));
                    contextObj.objiWhiz.createText("$LEGEND", 7, VL2StartX + (2 * contextObj.commonDwgServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3), contextObj.commonDwgServices.g_intSpaceDataTextAngle, (contextObj.commonDwgServices.g_intLegendTextSize) - (contextObj.commonDwgServices.g_intLegendTextSize * .25),
                        contextObj.commonDwgServices.g_intSpaceDataTextWidth, legentDataItem.TextName, contextObj.commonDwgServices.g_strTextStyleName, contextObj.commonDwgServices.g_strSpaceDataTextLegendStyleId, function (retCode, orgLevelItemTextHandle) {
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
                                    dblY = dblY - intDistRectHeight - (2 * contextObj.commonDwgServices.g_dblDwgRatio);

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
            resCallback(0, VL2StartX, TextMaxX, VL1EndY);
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
    //        contextObj.objiWhiz.createRectangle("$LEGEND", legentDataItem.HatchObj.ColorId, dblX - (intDistRectHeight / 2), dblY, intDistRectWidth, intDistRectHeight, contextObj.commonDwgServices.g_intDistLineWidth, contextObj.commonDwgServices.g_intDistLineType, contextObj.commonDwgServices.g_intDistLineTypeScale, function (retCode, entityHandle) {
    //            if (retCode != 0) {
    //                console.log("createRectangle returned with error code : ", retCode);
    //                //legentData.pop();
    //                contextObj.arrayCount++;
    //                contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
    //            }
    //            else {
    //                console.log("legentDataItem ", legentDataItem);
    //                legentDataItem.HatchObj.HatchScale = 1;
    //                var mapHandles = [entityHandle];
    //                var rgbColors = [contextObj.spaceOpenDrawingObj.hexToRgb(legentDataItem.HatchObj.RGBColor)];
    //                contextObj.objiWhiz.createMap(mapHandles, rgbColors, function (retCode) {
    //                    //  contextObj.objiWhiz.hatchEntity("$Hatch", entityHandle, legentDataItem.HatchObj.ColorId, legentDataItem.HatchObj.HatchAngle, legentDataItem.HatchObj.HatchScale, legentDataItem.HatchObj.HatchPatternId, false, function (retCode, hatchHandle) {
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
    //                                //  dblX + (intDistRectHeight + (4 * contextObj.commonDwgServices.g_dblDwgRatio))
    //                                // HL1StartX = MinX - (intDistRectHeight) + (4 * contextObj.commonDwgServices.g_dblDwgRatio);
    //                                VL2StartX = MaxX + (intDistRectHeight) + (2 * contextObj.commonDwgServices.g_dblDwgRatio);
    //                                VL1EndY = MinY - (intDistRectHeight) - (1 * contextObj.commonDwgServices.g_dblDwgRatio);
    //                                console.log("VL2StartX + (2 * contextObj.commonDwgServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3)", VL2StartX + (2 * contextObj.commonDwgServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3));
    //                                contextObj.objiWhiz.createText("$LEGEND", 7, VL2StartX + (2 * contextObj.commonDwgServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3), contextObj.commonDwgServices.g_intSpaceDataTextAngle, (contextObj.commonDwgServices.g_intLegendTextSize) - (contextObj.commonDwgServices.g_intLegendTextSize * .25),
    //                                    contextObj.commonDwgServices.g_intSpaceDataTextWidth, legentDataItem.TextName, contextObj.commonDwgServices.g_strTextStyleName, contextObj.commonDwgServices.g_strSpaceDataTextLegendStyleId, function (retCode, orgLevelItemTextHandle) {
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
    //                                                dblY = dblY - intDistRectHeight - (2 * contextObj.commonDwgServices.g_dblDwgRatio);

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
    //            //  dblY = dblY - intDistRectHeight - (2 * contextObj.commonDwgServices.g_dblDwgRatio);
    //        });
    //    }
    //    else {
    //        contextObj.arrayCount = 0;
    //        resCallback(0, VL2StartX, TextMaxX, VL1EndY);
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
    //        contextObj.objiWhiz.createRectangle("$LEGEND", legentDataItem.HatchObj.ColorId, dblX - (intDistRectHeight / 2), dblY, intDistRectWidth, intDistRectHeight, contextObj.commonDwgServices.g_intDistLineWidth, contextObj.commonDwgServices.g_intDistLineType, contextObj.commonDwgServices.g_intDistLineTypeScale, function (retCode, entityHandle) {
    //            if (retCode != 0) {
    //                console.log("createRectangle returned with error code : ", retCode);
    //                //legentData.pop();
    //                contextObj.arrayCount++;
    //                contextObj.hatchPatternLegent(legentData, dblX, intDistRectHeight, intDistRectWidth, dblY, VL2StartX, TextMaxX, VL1EndY, resCallback);
    //            }
    //            else {
    //                console.log("legentDataItem ", legentDataItem);
    //                legentDataItem.HatchObj.HatchScale = 1;
    //                contextObj.objiWhiz.hatchEntity("$Hatch", entityHandle, legentDataItem.HatchObj.ColorId, legentDataItem.HatchObj.HatchAngle, legentDataItem.HatchObj.HatchScale, legentDataItem.HatchObj.HatchPatternId, false, function (retCode, hatchHandle) {
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
    //                                //  dblX + (intDistRectHeight + (4 * contextObj.commonDwgServices.g_dblDwgRatio))
    //                                // HL1StartX = MinX - (intDistRectHeight) + (4 * contextObj.commonDwgServices.g_dblDwgRatio);
    //                                VL2StartX = MaxX + (intDistRectHeight) + (2 * contextObj.commonDwgServices.g_dblDwgRatio);
    //                                VL1EndY = MinY - (intDistRectHeight) - (1 * contextObj.commonDwgServices.g_dblDwgRatio);
    //                                console.log("VL2StartX + (2 * contextObj.commonDwgServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3)", VL2StartX + (2 * contextObj.commonDwgServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3));
    //                                contextObj.objiWhiz.createText("$LEGEND", 7, VL2StartX + (2 * contextObj.commonDwgServices.g_dblDwgRatio), dblY - (intDistRectHeight / 3), contextObj.commonDwgServices.g_intSpaceDataTextAngle, (contextObj.commonDwgServices.g_intLegendTextSize) - (contextObj.commonDwgServices.g_intLegendTextSize * .25),
    //                                    contextObj.commonDwgServices.g_intSpaceDataTextWidth, legentDataItem.TextName, contextObj.commonDwgServices.g_strTextStyleName, contextObj.commonDwgServices.g_strSpaceDataTextLegendStyleId, function (retCode, orgLevelItemTextHandle) {
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
    //                                                dblY = dblY - intDistRectHeight - (2 * contextObj.commonDwgServices.g_dblDwgRatio);

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
    //            //  dblY = dblY - intDistRectHeight - (2 * contextObj.commonDwgServices.g_dblDwgRatio);
    //        });
    //    }
    //    else {
    //        contextObj.arrayCount = 0;
    //        resCallback(0, VL2StartX, TextMaxX, VL1EndY);
    //        console.log("hit hatch exit");
    //    }
    //}
    displayAreaValues = function (legentData, dblY, intDistRectHeight, TextMaxX, resCallback) {
        var contextObj = this;
        if (legentData.length > contextObj.arrayCount) {
            var legentDataItem = legentData[contextObj.arrayCount];

            contextObj.objiWhiz.createText("$LEGEND", 7, TextMaxX, dblY - (intDistRectHeight / 3), contextObj.commonDwgServices.g_intSpaceDataTextAngle, (contextObj.commonDwgServices.g_intLegendTextSize) - (contextObj.commonDwgServices.g_intLegendTextSize * .25),
                contextObj.commonDwgServices.g_intSpaceDataTextWidth, legentDataItem.Area, contextObj.commonDwgServices.g_strTextStyleName, 9, function (retCode, orgLevelItemTextAreaHandle) {
                    if (retCode != 0) {
                        console.log("createText returned with error code : ", retCode);
                        //legentData.pop();
                        contextObj.arrayCount++;
                        contextObj.displayAreaValues(legentData, dblY, intDistRectHeight, TextMaxX, resCallback);
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
                            dblY = dblY - intDistRectHeight - (2 * contextObj.commonDwgServices.g_dblDwgRatio);
                            contextObj.arrayCount++;
                            contextObj.displayAreaValues(legentData, dblY, intDistRectHeight, TextMaxX, resCallback);
                        });
                    }
                });
        }
        else {
            contextObj.arrayCount = 0;
            resCallback(0, TextMaxX);
        }

    }
    getspaceStandardCapacityLegend = function (xPos, yPos, intDistRectHeight, rescallback) {
        var contextObj = this;
        let formatedText: string = "";
        var contextObj = this;
        var startX = xPos;
        var startY = yPos - (6 * contextObj.commonDwgServices.g_dblDwgRatio);
        var intSize = contextObj.commonDwgServices.g_intLegendTextSize;
        var ratio = [0];
        contextObj.objiWhiz.clientDWGAreaRatio(ratio);
        contextObj.empDrawingService.getSpaceStandardCapacityLegendForDrawing(contextObj.drawingId, 0, 0).subscribe(function (resultData) {//dwgId,ruleId,proposedAssignCount
            var spStandardCapacityData = JSON.parse(resultData["Data"].FieldBinderData)[0];
            var keyData = Object.getOwnPropertyNames(spStandardCapacityData);

            contextObj.getspaceStandardCapacityData(spStandardCapacityData, keyData, function (retCode) {
                contextObj.createspaceStandardCapacityLegendText(contextObj.empSpStandardCapacityLegendData, startX, startY, intSize, intDistRectHeight, function (retCode, rtnEndY) {
                    rescallback(0, rtnEndY);
                });
            });
        });
    }
    getspaceStandardCapacityData = function (spStandardCapacityData, keyData, resCallback) {
        var contextObj = this;
        contextObj.empSpStandardCapacityLegendData = [];
        for (let index = 0; index < keyData.length; index++) {
            contextObj.empSpStandardCapacityLegendData.push({ Key: keyData[index], Value: spStandardCapacityData[keyData[index]] });
        }
        resCallback(0);
    }
    createspaceStandardCapacityLegendText = function (empSpStandardCapacityLegendData, startX, startY, intSize, intDistRectHeight, resCallback) {
        var contextObj = this;
        if (empSpStandardCapacityLegendData.length > contextObj.arrayCount) {
            var legentDataItem = empSpStandardCapacityLegendData[contextObj.arrayCount];
            var legentDataItemString: string = legentDataItem.Key + ": " + legentDataItem.Value;
            contextObj.objiWhiz.createText("$LEGEND", 1, startX, startY - (intDistRectHeight / 3), contextObj.commonDwgServices.g_intSpaceDataTextAngle, intSize,
                contextObj.commonDwgServices.g_intSpaceDataTextWidth, legentDataItemString, contextObj.commonDwgServices.g_strTextStyleName, 0, function (retCode, orgLevelItemTextAreaHandle) {
                    if (retCode != 0) {
                        console.log("createText returned with error code : ", retCode);
                    }
                    else {
                        startY = startY - intDistRectHeight - (1 * contextObj.commonDwgServices.g_dblDwgRatio);
                        contextObj.arrayCount++;
                        contextObj.createspaceStandardCapacityLegendText(empSpStandardCapacityLegendData, startX, startY, intSize, intDistRectHeight, resCallback);
                    }
                });
        }
        else {
            contextObj.arrayCount = 0;
            resCallback(0, startY);
        }
    }
    showSelectedEmployeeInDrawing = function (empIds, resCallback) {
        var contextObj = this;
        var selectedHandles = [];
        var symbolHandles = [];
        for (let empId of empIds) {
            var handle = this.getSpaceHandleViaEmpId(empId);
            if (handle != undefined && handle != null && handle != "") {
                if (selectedHandles.length > 0) {
                    var index = selectedHandles.findIndex(function (el) { return el === handle })
                    if (index == -1)
                        selectedHandles.push(handle);
                } else
                    selectedHandles.push(handle);
            }
            symbolHandles.push(contextObj.empHandlesData.find(function (el) { return el.EmpId === empId }).SymbolHandle);
        }
        if (selectedHandles.length > 0) {
            contextObj.spaceOpenDrawingObj.hatchMultipleEntity(selectedHandles, function (retCode) {
                contextObj.hatchMultipleEmployee(symbolHandles, function (returncode) {
                    if (retCode != 0)
                        console.log("hatchMultipleEntity failed due to ", retCode);
                    else {
                        contextObj.objiWhiz.zoomExtents(function (ret) {
                            contextObj.objiWhiz.blinkEntitiesByHandles(symbolHandles, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (returnCode) {
                                resCallback(retCode, selectedHandles);
                            });
                        });
                    }
                });
            });
        } else
            resCallback(1);
    }
    hatchMultipleEmployee = function (selectedHandles, resCallback) {
        let contextObj = this;
        if (selectedHandles.length > contextObj.arrayCount) {
            //var mapHandles = [];
            //var rgbColors = [];
            //for (var item in selectedHandles) {
            //    if (selectedHandles[item] != "") {
            //        mapHandles.push(selectedHandles[item]);
            //        rgbColors.push([255,255,255]);
            //    }
            //}
            //contextObj.objiWhiz.createMap(mapHandles, rgbColors, function (retCode) {
            //    if (retCode != 0)
            //        console.log("createMap failed due to ", retCode);
            //    resCallback(0);
            //});
            var symbolHandle = selectedHandles[contextObj.arrayCount];
            // contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$HatchMultipleEmployee", function (returnCode) {
            contextObj.objiWhiz.hatchEntity("$HatchMultipleEmployee", symbolHandle, 7, 1, 1, 1, false, function (retCode, entityHandle) {
                contextObj.objiWhiz.setApplicationLayer("$HatchMultipleEmployee");
                if (retCode != 0)
                    console.log("hatchEntity failed due to ", retCode);
                contextObj.arrayCount++;
                contextObj.hatchMultipleEmployee(selectedHandles, resCallback);
            });
            // });
        }
        else {
            contextObj.arrayCount = 0;
            resCallback(0);
        }

    }
    showSelectedEmployeeZoomDrawing = function (empId, resCallback) {
        var contextObj = this;
        var spaceHandle = this.getSpaceHandleViaEmpId(empId);
        var symbolHandle = contextObj.empHandlesData.find(function (el) { return el.EmpId === empId }).SymbolHandle;
        contextObj.hatchEmployee(symbolHandle, function (retCode) {
            if (retCode != 0)
                console.log("hatchEmployee failed due to ", retCode);
            else {
                if (spaceHandle != undefined && spaceHandle != null && spaceHandle != "") {
                    contextObj.spaceOpenDrawingObj.hatchSingleEntity(spaceHandle, function (retCode) {
                        contextObj.objiWhiz.zoomEntity(spaceHandle, function (retCode) {
                            if (retCode != 0)
                                console.log("zoomEntity failed due to", retCode);
                            //  contextObj.objiWhiz.blinkEntitiesByHandles(symbolHandle, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonServices.blinkSize, contextObj.commonServices.blinkDelay, function (returnCode) {
                            resCallback(retCode, spaceHandle);
                            //  });
                        });
                    });
                } else {
                    contextObj.objiWhiz.zoomEntity(symbolHandle, function (retCode) {
                        if (retCode != 0)
                            console.log("zoomEntity failed due to", retCode);
                        //  contextObj.objiWhiz.blinkEntitiesByHandles(symbolHandle, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonServices.blinkSize, contextObj.commonServices.blinkDelay, function (returnCode) {
                        resCallback(retCode, spaceHandle);
                        // });
                    });
                }

            }
        });
    }
    hatchEmployee = function (symbolHandle, resCallback) {
        var contextObj = this;
        var mapHandle = [symbolHandle];
        var rgbColor = [[255, 255, 255]];
        contextObj.deHatchEmployee(function (retCode) {
            contextObj.objiWhiz.createMap(mapHandle, rgbColor, function (retCode) {
                resCallback(retCode);
            });
        });

        //contextObj.objiWhiz.hatchEntity("$HatchSingleEntity", symbolHandle, 7, 1, 1, 1, false, function (retCode, entityHandle) {
        //    contextObj.objiWhiz.setApplicationLayer("$HatchSingleEntity");
        //    if (retCode != 0)
        //        console.log("hatchEntity failed due to ", retCode);
        //    resCallback(retCode);
        //});
    }
    hatchSelectedEmployee = function (symbolHandle, resCallback) {
        var contextObj = this;
        var mapHandle = [symbolHandle];
        var rgbColor = [[255, 255, 255]];
        //  contextObj.deHatchEmployee(function (retCode) {
        contextObj.objiWhiz.createMap(mapHandle, rgbColor, function (retCode) {
            resCallback(retCode);
        });
        //  });

        //contextObj.objiWhiz.hatchEntity("$HatchSingleEntity", symbolHandle, 7, 1, 1, 1, false, function (retCode, entityHandle) {
        //    contextObj.objiWhiz.setApplicationLayer("$HatchSingleEntity");
        //    if (retCode != 0)
        //        console.log("hatchEntity failed due to ", retCode);
        //    resCallback(retCode);
        //});
    }
    deHatchEmployee = function (resCallback) {
        var contextObj = this;
        contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$HatchSingleEntity", function (retCode) {
            contextObj.objiWhiz.removeMaps();
            resCallback(retCode);
        });
    }
    employeeEditReflectInDrawing = function (editedRowData, resCallback) {
        var contextObj = this;
        var empId = editedRowData.Id;
        if (editedRowData['StatusId'] == 1) {
            var ratio = [0];
            var formatedText: string = "";
            contextObj.objiWhiz.clientDWGAreaRatio(ratio);
            var rowInsertIndex = contextObj.empData.findIndex(function (el) { return el.Id === empId });
            contextObj.empData[rowInsertIndex] = editedRowData;
            //contextObj.objiWhiz.deleteEntity(bomaHandle, function (retCode) {
            //    if (retCode != 0)
            //        alert("deleteEntity returned with error code : " + retCode);
            //    else {
            for (let dispSettingsItem of contextObj.empDisplaySettingData) {
                if (dispSettingsItem.ShowinDrawing) {
                    var boldText = dispSettingsItem.IsBold ? "b1" : "b0";
                    var italicText = dispSettingsItem.IsItalic ? "i1" : "i0";
                    let textContent = editedRowData[dispSettingsItem.FieldName];
                    if (textContent == "null" || textContent == null)
                        textContent = "-";
                    formatedText += "\\f|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + dispSettingsItem.FontSize + ";" + textContent + "\\n";
                    //formatedText += "\\fTimes New Roman|" + boldText + "|" + italicText + "|c0|p18;\\C" + dispSettingsItem.Color + ";\\H" + ratio[0] * dispSettingsItem.FontSize + ";" + textContent + "\\n";

                }

            }
            let formatedTextFinal: string = "{" + formatedText + "}";
            var textHandle = contextObj.dataInDrawingTextHandles.find(function (el) { return el.Key === empId }).Value;
            console.log("setText: ", textHandle);
            console.log("text", formatedTextFinal);
            contextObj.objiWhiz.setText(textHandle, formatedTextFinal, function (retCode) {
                if (retCode != 0) {
                    console.log("setText returned with error code : ", retCode);
                }
                resCallback(0);
            });
        } else {
            contextObj.spaceOpenDrawingObj.deHatch(function (re) {
                contextObj.clearobjMoveRequestEmpDetails(empId, function (retCode) {
                    contextObj.deHatchEmployee(function (retCode) {
                        contextObj.empCount--;
                        resCallback(0);
                    });
                });
            });
        }

        //    }
        //});
    }
    getEmployeeAssignRequestStatus = function (employeeId, resCallback) {
        var gradeExist: boolean = false;
        var contextObj = this;
        var assignRequestStatus: number;
        var isFieldSubscribed: number;
        // to do re-link
        contextObj.empDrawingService.isFieldSubscribed(2, 874).subscribe(function (resultData) {//fieldSubscriptionCategoryId=2,reportFieldId=874
            isFieldSubscribed = JSON.parse(resultData["Data"]);
            if (contextObj.g_blnSpaceAllocationRuleEnabled && isFieldSubscribed > 0)
                gradeExist = true;
            contextObj.empDrawingService.getEmployeeAssignRequestStatus(employeeId).subscribe(function (resultData) {
                assignRequestStatus = JSON.parse(resultData["Data"].FieldBinderData)[0].Column1;
                if (assignRequestStatus > 0)
                    resCallback(1, gradeExist);
                else
                    resCallback(0, gradeExist);

            });
        });
    }
    invokeAssignEmployee = function (employeeId, employeeName, gradeExist, resCallback) {
        var contextObj = this;
        var blnEditPermission: boolean = true;
        var intCompareResult: boolean;//Check Edit permission For Facility User
        var spaceId: number;

        contextObj.objiWhiz.setCursor(2);
        contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
            if (retCode == 0) {
                contextObj.objiWhiz.pointInEntity(contextObj.commonDwgServices.grossHandle, xPos, yPos, function (returnCode, isInside) {
                    contextObj.objiWhiz.getHandleWithDWGPoint(xPos, yPos, contextObj.isSpace, function (retCode, strSpaceHandle) {
                        if (isInside) {
                            spaceId = contextObj.getSpaceIdFromSpaceHandle(strSpaceHandle);
                            if (contextObj.beforeMoveSpaceId == undefined || spaceId != contextObj.beforeMoveSpaceId) {
                                intCompareResult = contextObj.checkDataExistsforSelectedHandle(strSpaceHandle);
                                if (intCompareResult) {
                                    if (contextObj.g_blnEmployeeModuleAdmin == false) {
                                        contextObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {
                                            if (blnEditPermission) {
                                                contextObj.getSeatingCapacity(spaceId, function (reCode, seatingCapacity) {

                                                    if (reCode == 1) {
                                                        if (contextObj.g_blnSpaceAllocationRuleEnabled && gradeExist) {
                                                            contextObj.empDrawingService.checkEmployeeAssignPossible(employeeId, spaceId).subscribe(function (resultData) {
                                                                var isAssignPossible = JSON.parse(resultData["Data"].FieldBinderData)[0];
                                                                if (isAssignPossible) {
                                                                    resCallback(reCode, seatingCapacity, spaceId, xPos, yPos, strSpaceHandle);
                                                                }
                                                                else {
                                                                    contextObj.notificationServices.ClearAllToasts();
                                                                    contextObj.notificationServices.ShowToaster("Select another point inside the space where the Employee " + employeeName + "is to be located", 5);
                                                                    contextObj.invokeAssignEmployee(employeeId, employeeName, gradeExist, resCallback);
                                                                }
                                                            });
                                                        }
                                                        else {
                                                            resCallback(reCode, seatingCapacity, spaceId, xPos, yPos, strSpaceHandle);
                                                        }
                                                    }
                                                    else
                                                        resCallback(reCode, seatingCapacity, spaceId, xPos, yPos, strSpaceHandle);
                                                });
                                            }
                                            else {
                                                contextObj.notificationServices.ClearAllToasts();
                                                contextObj.notificationServices.ShowToaster("You do not have edit permission for the selected space", 5);
                                                //resCallback(1)
                                                contextObj.invokeAssignEmployee(employeeId, employeeName, gradeExist, resCallback);
                                            }
                                        });
                                    } else {
                                        contextObj.getSeatingCapacity(spaceId, function (reCode, seatingCapacity) {
                                            if (reCode == 1) {
                                                if (contextObj.g_blnSpaceAllocationRuleEnabled && gradeExist) {
                                                    contextObj.empDrawingService.checkEmployeeAssignPossible(employeeId, spaceId).subscribe(function (resultData) {
                                                        var isAssignPossible = JSON.parse(resultData["Data"].FieldBinderData)[0];
                                                        if (isAssignPossible) {
                                                            resCallback(reCode, seatingCapacity, spaceId, xPos, yPos, strSpaceHandle);
                                                        }
                                                        else {
                                                            contextObj.notificationServices.ClearAllToasts();
                                                            contextObj.notificationServices.ShowToaster("Select another point inside the space where the Employee " + employeeName + "is to be located", 5);
                                                            contextObj.invokeAssignEmployee(employeeId, employeeName, gradeExist, resCallback);
                                                        }
                                                    });
                                                }
                                                else {
                                                    resCallback(reCode, seatingCapacity, spaceId, xPos, yPos, strSpaceHandle);
                                                }
                                            }
                                            else
                                                resCallback(reCode, seatingCapacity, spaceId, xPos, yPos, strSpaceHandle);
                                        });
                                    }
                                }
                                else {
                                    contextObj.notificationServices.ClearAllToasts();
                                    //contextObj.notificationServices.ShowToaster("", 5);
                                    contextObj.notificationServices.ShowToaster("You do not have access permission for this space.Select another point inside the space where the Employee '" + employeeName + "' is to be located", 5);
                                    contextObj.invokeAssignEmployee(employeeId, employeeName, gradeExist, resCallback);
                                }
                            }
                            else {
                                resCallback(1, "", spaceId, xPos, yPos, strSpaceHandle);
                            }
                        } else {
                            contextObj.notificationServices.ClearAllToasts();
                            contextObj.notificationServices.ShowToaster("Select a point inside the space where the employee '" + employeeName + "' is to be located", 5);
                            contextObj.invokeAssignEmployee(employeeId, employeeName, gradeExist, resCallback);
                            //resCallback(3);
                            // MsgBox "Select a point inside the space where the employee '" & strEmployeeName & "' is to be located",vbInformation,"iDrawings"
                        }

                    });
                });
            }
            else if (retCode == 8) {
                resCallback(retCode);
            }
        });
    }
    getSpaceIdFromSpaceHandle(strSpaceHandle) {
        var spaceId: number;
        var index;
        if (this.isSpace)
            index = this.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.BomaHandle === strSpaceHandle });
        else
            index = this.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.CarpetHandle === strSpaceHandle });
        if (index != -1)
            spaceId = this.spaceOpenDrawingObj.spaceData[index]['SpaceId'];
        else
            spaceId = index
        return spaceId;
    }
    checkEditPermissionforTheSelectedSpace = function (spaceId, resCallback) {
        var contextObj = this;
        contextObj.empDrawingService.checkEditPrivilageExist(spaceId).subscribe(function (resultData) {
            if (resultData.ServerId > 0)
                resCallback(true);
            else
                resCallback(false);
        });
    }
    getSeatingCapacity = function (spaceId, resCallback) {
        var contextObj = this;
        var strEmployeeOccupancy;
        var arrEmployeeOccupancy;
        var seatingCapacity;
        var employeeCount;
        var intAssignSpace;
        var intSpaceAssignmentTypeId;
        contextObj.empDrawingService.getSpaceEmployeeOccupancy(spaceId).subscribe(function (resultData) {
            arrEmployeeOccupancy = JSON.parse(resultData["Data"].FieldBinderData)[0];
            seatingCapacity = arrEmployeeOccupancy['SeatingCapacity'];
            employeeCount = arrEmployeeOccupancy['EmployeeCount'];
            intSpaceAssignmentTypeId = arrEmployeeOccupancy['SeatingAssignmentTypeId'];
            if (intSpaceAssignmentTypeId != 2 && intSpaceAssignmentTypeId != 4 && intSpaceAssignmentTypeId != 5 && intSpaceAssignmentTypeId != 6) {
                if (seatingCapacity != null) {
                    if (seatingCapacity == 0) {
                        if (contextObj.g_blnAssignEmployeeInZeroCapacity) {
                            contextObj.beforeMoveSpaceId = spaceId;
                            resCallback(3);
                        } else {
                            contextObj.notificationServices.ClearAllToasts();
                            contextObj.notificationServices.ShowToaster("Assignable Seating Capacity of the selected Space is zero. Employee(s) cannot be placed in this Space. Select another space", 5);
                            resCallback(2);
                        }

                    } else if (seatingCapacity <= employeeCount) {
                        contextObj.beforeMoveSpaceId = spaceId;
                        resCallback(4, seatingCapacity);
                    } else if (seatingCapacity > employeeCount) {
                        contextObj.beforeMoveSpaceId = spaceId;
                        resCallback(1);
                    }
                } else {
                    contextObj.beforeMoveSpaceId = spaceId;
                    resCallback(1);
                }
            } else {
                if (intSpaceAssignmentTypeId == 2) {
                    contextObj.notificationServices.ClearAllToasts();
                    contextObj.notificationServices.ShowToaster("Employee(s) cannot be placed in this Space, since Space Assignment Type is UnAssignable. Select another space", 5);
                }
                else if (intSpaceAssignmentTypeId == 4) {
                    contextObj.notificationServices.ClearAllToasts();
                    contextObj.notificationServices.ShowToaster("Employee(s) cannot be placed in this Space, since Space Assignment Type is Scheduling. Select another space", 5);
                }
                else if (intSpaceAssignmentTypeId == 5) {
                    contextObj.notificationServices.ClearAllToasts();
                    contextObj.notificationServices.ShowToaster("Employee(s) cannot be placed in this Space, since Space Assignment Type is Hoteling. Select another space", 5);
                }
                else if (intSpaceAssignmentTypeId == 6) {
                    contextObj.notificationServices.ClearAllToasts();
                    contextObj.notificationServices.ShowToaster("Employee(s) cannot be placed in this Space, since Space Assignment Type is Special Use Room. Select another space", 5);
                }
                else {
                    contextObj.notificationServices.ClearAllToasts();
                    contextObj.notificationServices.ShowToaster("Employee(s) cannot be placed in this space.", 5);
                }

                resCallback(2);
            }
        });

    }
    insertSpaceAllotments = function (employeeId, spaceId, drawingId, xPosition, yPosition, resCallback) {
        var contextObj = this;
        this.empDrawingService.insertSpaceAllotmentDetails(employeeId, spaceId, drawingId, xPosition, yPosition).subscribe(function (resultData) {
            var updatedEmpData = JSON.parse(resultData["Data"].Data);
            if (contextObj.empData == undefined)
                contextObj.empData = [];
            contextObj.empData[contextObj.empData.length] = updatedEmpData[0];
            var ratio = [0];
            contextObj.objiWhiz.clientDWGAreaRatio(ratio);
            contextObj.createEmployeeDataAndTooltipOnDrawing(updatedEmpData, contextObj.empDisplaySettingData, ratio, function (retCode) {
                resCallback(0)
            });
        });
    }
    deAssignEmployeeFromDrawing = function (isDeassign, resCallback) {
        var contextObj = this;
        var selectedEmpId: number;
        var selectedSpacehandle: string = "";
        var spaceId;
        contextObj.objiWhiz.setCursor(2);
        contextObj.objiWhiz.selectSymbol(function (retCode, symbolHandle) {
            if (retCode == 0) {
                selectedEmpId = contextObj.empHandlesData.find(function (el) { return el.SymbolHandle === symbolHandle })['EmpId'];
                selectedSpacehandle = contextObj.getSpaceHandleViaEmpId(selectedEmpId);
                spaceId = contextObj.getSpaceIdFromSpaceHandle(selectedSpacehandle);
                if (contextObj.g_blnEmployeeModuleAdmin == false) {
                    contextObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {
                        if (blnEditPermission) {
                            contextObj.deAssignEmp(isDeassign, selectedEmpId, selectedSpacehandle, symbolHandle, function (reCode) {
                                resCallback(0, selectedEmpId);
                            });
                        }
                        else {
                            contextObj.notificationServices.ClearAllToasts();
                            contextObj.notificationServices.ShowToaster("You do not have edit permission for the selected space", 5);
                            resCallback(1, selectedEmpId);
                        }
                    });
                }
                else {

                    contextObj.deAssignEmp(isDeassign,selectedEmpId, selectedSpacehandle, symbolHandle, function (reCode) {
                        resCallback(0, selectedEmpId);
                    });
                }
            }
        });
    }
    deAssignEmp = function (isDeassign, selectedEmpId, selectedSpacehandle, symbolHandle, resCallback) {
        var contextObj = this;
        contextObj.hatchEmployee(symbolHandle, function (retCode) {
            if (retCode != 0)
                console.log("hatchEmployee failed due to ", retCode);
            else {
                contextObj.empDrawingService.getEmployeeSheduledToMove(selectedEmpId).subscribe(function (resultData) {
                    contextObj.notificationServices.ClearAllToasts();
                    if (isDeassign) {
                        if (JSON.parse(resultData["Data"].FieldBinderData)[0].IsEmployeeSheduledToMove) {
                            contextObj.notificationServices.ShowToaster("The Employee is already scheduled for a Move.De- assigning will delete the Employee from the scheduled Move.", 2);
                        } else if (JSON.parse(resultData["Data"].FieldBinderData)[0].IsEmployeeApprovalForMove) {
                            contextObj.notificationServices.ShowToaster("The Employee is already requested for a Move.De-assigning will cancel the move request.", 2);
                        }
                    }
                    //contextObj.empDrawingService.getEmployeeMoveRequestStatus(selectedEmpId).subscribe(function (resultData) {
                    //    if (JSON.parse(resultData["Data"].FieldBinderData)[0].IsEmployeeApprovalForMove) {
                    //        contextObj.notificationServices.ClearAllToasts();
                    //        contextObj.notificationServices.ShowToaster("The Employee is already requested for a Move.De-assigning will cancel the move request.", 2);
                    //    }
                    //    resCallback(0);
                    //});
                    resCallback(0);
                });
            }
        });
    }
    deAssignAfterConfirm = function (employeeId, resCallback) {
        var contextObj = this;
        var index;
        this.empDrawingService.deAssignEmployee(employeeId).subscribe(function (resultData) {
            if (resultData["Data"]["ServerId"] == 0) {
                contextObj.cancelEmployeeMoveRequest(0, "", employeeId, function (retCode) {
                    contextObj.clearobjMoveRequestEmpDetails(employeeId, function (retCode) {
                        contextObj.deHatchEmployee(function (retCode) {
                            resCallback(0);
                        });
                    });
                });
            }
            else {
                contextObj.notificationServices.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                resCallback(0);
            }
        });

    }
    deleteAfterconfirm = function (employeeId, resCallback) {
        var contextObj = this;
        this.empDrawingService.deleteEmployee(employeeId).subscribe(function (resultData) {
            if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {              
                contextObj.cancelEmployeeMoveRequest(0, "", employeeId, function (retCode) {
                    contextObj.clearobjMoveRequestEmpDetails(employeeId, function (retCode) {
                        contextObj.deHatchEmployee(function (retCode) {
                            resCallback(0);
                        });
                    });
                });
            }
            else {
                contextObj.notificationServices.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                resCallback(0);
            }
        });
    }
    CheckEmployeeStatus = function (empid, resCallback) {
        var contextObj = this;
        this.empDrawingService.checkEmployeeStatus(empid).subscribe(function (resultData) {
            var strEmpCheck = resultData["Data"]

            if (strEmpCheck != 0 && strEmpCheck != 3) {
                contextObj.deHatchEmployee(function (retCode) {
                    if ((strEmpCheck == 1) || (strEmpCheck == 2) || (strEmpCheck == 4) || (strEmpCheck == 5) || (strEmpCheck == 6))
                        contextObj.notificationServices.ShowToaster("The selected Employee is used in Move Projects", 2)
                    else
                        contextObj.notificationServices.ShowToaster("The selected Employee is linked to other functions, cannot be deleted", 2);
                });
            }
            else
                contextObj.empDrawingService.getSupervisorCount(empid).subscribe(function (resultData) {
                    var strSuperVisorCount = resultData["Data"]["FieldBinderData"]
                    if (strSuperVisorCount > 0)
                        resCallback(1);//to call supervisor delete slide
                    else
                        resCallback(0);
                })

        })
    }
    cancelEmployeeMoveRequest = function (moveId, moveNo, employeeId, resCallback) {
        this.empDrawingService.cancelEmployeeMoveRequest(moveId, moveNo, employeeId).subscribe(function (resultData) {
            resCallback(0);
        });
    }
    clearobjMoveRequestEmpDetails = function (employeeId, resCallback) {
        debugger
        var contextObj = this;
        var index;
        var currentEmpHandle: string = "";
        var currentEmpTextHandle: string = "";
        var currentEmpLeaderHandle: string = "";
        index = contextObj.empHandlesData.findIndex(function (el) { return el.EmpId === employeeId });
        if (index != -1) {
            currentEmpHandle = contextObj.empHandlesData[index]['SymbolHandle'];
            contextObj.empHandlesData.splice(index, 1);
        }
        index = contextObj.empData.findIndex(function (el) { return el.Id === employeeId });
        if (index != -1) {
            contextObj.empData.splice(index, 1);
        }
        index = contextObj.dataInDrawingTextHandles.findIndex(function (el) { return el.Key === employeeId });
        if (index != -1) {
            currentEmpTextHandle = contextObj.dataInDrawingTextHandles[index]['Value'];
            contextObj.dataInDrawingTextHandles.splice(index, 1);
        }
        if (currentEmpTextHandle != "") {
            contextObj.objiWhiz.deleteEntity(currentEmpTextHandle, function (retCode) {
                if (retCode == 0) {
                    if (currentEmpHandle != "") {
                        contextObj.objiWhiz.deleteEntity(currentEmpHandle, function (retCode) {
                            if (retCode == 0) {
                                contextObj.objiWhiz.releaseSymbol(currentEmpHandle, function (retCode) {
                                    if (retCode == 0) {
                                        if (currentEmpLeaderHandle != "") {
                                            contextObj.objiWhiz.deleteEntity(currentEmpLeaderHandle, function (retCode) {
                                                if (retCode == 0) {
                                                    resCallback(0);
                                                }
                                                else {
                                                    console.log("DeleteEntity  failed due to", retCode);
                                                    resCallback(0);
                                                }
                                            });
                                        }
                                        else
                                            resCallback(0);
                                    }
                                    else {
                                        console.log("ReleaseSymbol  failed due to", retCode);
                                        resCallback(0);
                                    }
                                });
                            }
                            else {
                                console.log("DeleteEntity  failed due to", retCode);
                                resCallback(0);
                            }
                        });
                    }
                }
                else {
                    console.log("DeleteEntity  failed due to", retCode);
                    resCallback(0);
                }
            });

        }
    }
    getSpaceHandleViaEmpId(empId) {
        var selectedSpacehandle: string = "";
        var index;
        if (this.isSpace) {
            index = this.empData.findIndex(function (el) { return el.Id === empId });
            if (index != -1)
                selectedSpacehandle = this.empData[index]['BomaHandle'];
        }
        else {
            index = this.empData.findIndex(function (el) { return el.Id === empId });
            if (index != -1)
                selectedSpacehandle = this.empData[index]['CarpetHandle'];
        }
        return selectedSpacehandle;
    }
    checkDataExistsforSelectedHandle(strSpaceHandle) {
        var intCompareResult: boolean = false;//Check Edit permission For Facility User
        if (this.isSpace)
            intCompareResult = this.spaceOpenDrawingObj.spaceData.some(function (el) { return el.BomaHandle === strSpaceHandle });
        else
            intCompareResult = this.spaceOpenDrawingObj.spaceData.some(function (el) { return el.CarpetHandle === strSpaceHandle });
        return intCompareResult;
    }
    moveEmployeeInDrawingOnClick(resCallback) {
        var contextObj = this;
        contextObj.moveEmployeeInDrawing(true, function (retCode, intEmployeeId, strEmployeeName, previousXCord, previousYCord, gradeExist, selectedSymbolhandle) {
            if (retCode == 0) {
                contextObj.invokeSelectedEmpDetails(intEmployeeId, strEmployeeName, gradeExist, previousXCord, previousYCord, selectedSymbolhandle, resCallback);
            } else if (retCode == 5) {
                contextObj.deHatchEmployee(function (retCode) {
                    contextObj.objiWhiz.setCursor(1);
                    //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                    contextObj.objiWhiz.stopSvgTrails();
                    contextObj.objiWhiz.regenerate();
                    resCallback(5);

                });
            }
            else
                resCallback(6);
        });
    }
    invokeSelectedEmpDetails = function(intEmployeeId, strEmployeeName, gradeExist, previousXCord, previousYCord, selectedSymbolhandle, resCallback) {
        var contextObj = this;
        contextObj.invokeAssignEmployee(intEmployeeId, strEmployeeName, gradeExist, function (returnCode, seatingCapacity, spaceId, currentXCord, currentYCord, selectedSpaceHandle) {
            // contextObj.insertSpaceAllotments = { "employeeId": employeeId, "spaceId": spaceId, "drawingId": contextObj.drawingId, "xPosition": xPos, "yPosition": yPos };
            switch (returnCode) {
                case 1: var selectedEmpCurrentData;
                    var index = contextObj.empData.findIndex(function (el) { return el.Id === intEmployeeId });
                    if (index != -1)
                        selectedEmpCurrentData = contextObj.empData[index];
                    // contextObj.moveEmployeeToSelectedSpace(intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, function (retCode) {
                    // contextObj.deHatchEmployee(function (retCode) {
                    contextObj.objiWhiz.setCursor(1);
                    resCallback(returnCode, seatingCapacity, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist, selectedEmpCurrentData);

                    // });
                    // });
                    break;
                case 2: resCallback(returnCode, seatingCapacity, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist);
                    break;
                case 3: resCallback(returnCode, seatingCapacity, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist);
                    break;
                case 4: resCallback(returnCode, seatingCapacity, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist);
                    break;
                case -1:
                    resCallback(-1);
                    break;
                case 8: contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                    contextObj.objiWhiz.stopSvgTrails();
                    contextObj.deHatchEmployee(function (retCode) {
                        contextObj.objiWhiz.regenerate();
                        resCallback(-1);
                    });
            }
        });
    }
    moveEmployeeInDrawing = function (isSingleMove, resCallback) {
        var contextObj = this;
        var selectedEmpId: number;
        var employeeName: string;
        var employeeCode: string;
        var gradeExist: boolean = false;
        var isFieldSubscribed: number;
        var selectedSpacehandle: string = "";
        var intCompareResult: boolean;//Check Edit permission For Facility User
        contextObj.objiWhiz.setCursor(2);
      
        contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
            if (retCode == 0) {
                contextObj.objiWhiz.getSymbolWithDWGPoint(xPos, yPos, true, function (rtCode, selectedSymbolhandle) {
                    if (rtCode == 0) {
                        selectedEmpId = contextObj.empHandlesData.find(function (el) { return el.SymbolHandle === selectedSymbolhandle })['EmpId'];
                        employeeName = contextObj.empData.find(function (el) { return el.Id === selectedEmpId })['Employee Name'];
                        employeeCode = contextObj.empData.find(function (el) { return el.Id === selectedEmpId })['Employee Code'];
                        contextObj.empDrawingService.getEmployeeSheduledToMove(selectedEmpId).subscribe(function (resultData) {
                            if (JSON.parse(resultData["Data"].FieldBinderData)[0].IsEmployeeSheduledToMove) {
                                contextObj.notificationServices.ShowToaster("The Employee is already scheduled for a Move", 2);
                                resCallback(5);
                            }
                            else if (JSON.parse(resultData["Data"].FieldBinderData)[0].IsEmployeeApprovalForMove) {
                                contextObj.notificationServices.ShowToaster("The Employee Move is already sent for Approval", 2);
                                resCallback(5);
                            }
                            else {
                                contextObj.hatchSelectedEmployee(selectedSymbolhandle, function (rCode) {
                                    if (rCode != 0) {
                                        resCallback(6);
                                        console.log("hatchSelectedEmployee failed due to ", rCode);
                                    } else {
                                        if (isSingleMove) {
                                            contextObj.objiWhiz.startSvgTrails(selectedSymbolhandle, xPos, yPos, function (retCode) { });
                                            //var rubx = [], ruby = [], rubz = []
                                            //rubx[0] = xPos; ruby[0] = yPos; rubz[0] = 0;
                                            //contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                                            //contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
                                        }
                                        //  contextObj.objiWhiz.startSvgTrails(selectedSymbolhandle, xPos, yPos, function (retCode) {
                                        contextObj.empDrawingService.isFieldSubscribed(2, 874).subscribe(function (resultData) {//fieldSubscriptionCategoryId=2,reportFieldId=874
                                            isFieldSubscribed = JSON.parse(resultData["Data"]);
                                            if (contextObj.g_blnSpaceAllocationRuleEnabled && isFieldSubscribed > 0)
                                                gradeExist = true;
                                            selectedSpacehandle = contextObj.getSpaceHandleViaEmpId(selectedEmpId);
                                            //contextObj.beforeMoveSpaceId = contextObj.getSpaceIdFromSpaceHandle(selectedSpacehandle);
                                            var spaceId = contextObj.getSpaceIdFromSpaceHandle(selectedSpacehandle);
                                            intCompareResult = contextObj.checkDataExistsforSelectedHandle(selectedSpacehandle);
                                            if (intCompareResult) {
                                                if (contextObj.g_blnEmployeeModuleAdmin == false) {
                                                    contextObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {
                                                        if (blnEditPermission) {
                                                            //if (contextObj.g_IsEmployeeMoveApprovalEnabled) {
                                                            //    contextObj.empDrawingService.getEmployeeMoveRequestStatus(selectedEmpId).subscribe(function (resultData) {
                                                            //        if (JSON.parse(resultData["Data"].FieldBinderData)[0] == 34)
                                                            //        {
                                                            //            contextObj.notificationServices.ShowToaster("Employee already Requested for a move", 2);
                                                            //            resCallback(5);
                                                            //        }
                                                            //        else
                                                            //            resCallback(0, selectedEmpId, employeeName, xPos, yPos, gradeExist, selectedSymbolhandle);
                                                            //    });
                                                            //}
                                                            //else {
                                                            //    contextObj.notificationServices.ShowToaster("Employee already Requested for a move", 5);
                                                            //    resCallback(5);
                                                            //}
                                                            resCallback(0, selectedEmpId, employeeName, xPos, yPos, gradeExist, selectedSymbolhandle);
                                                        }
                                                        else {
                                                            contextObj.notificationServices.ShowToaster("You do not have edit permission for the selected space", 5);
                                                            resCallback(5);
                                                        }
                                                    });
                                                }
                                                else {
                                                    resCallback(0, selectedEmpId, employeeName, xPos, yPos, gradeExist, selectedSymbolhandle);
                                                }
                                            }
                                            else {
                                                resCallback(5);
                                                contextObj.notificationServices.ShowToaster("You do not have edit permission for the selected space", 5);
                                            }
                                        });
                                        // });
                                    }

                                });
                            }


                        });
                    }
                    else
                        resCallback(6);
                });
            }
            else
                resCallback(retCode);
        });
    }
    moveEmployeeToSelectedSpace = function (intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, resCallback) {
        var contextObj = this;
        //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
        this.empDrawingService.insertSpaceAllotmentDetails(intEmployeeId, spaceId, contextObj.drawingId, currentXCord, currentYCord).subscribe(function (resultData) {
            var updatedEmpData = JSON.parse(resultData["Data"].Data);
            var midPoints = contextObj.getEmployeeXYCordinates(intEmployeeId);
            contextObj.objiWhiz.stopSvgTrails();
            contextObj.objiWhiz.moveSymbol(selectedSymbolhandle, previousXCord, previousYCord, currentXCord, currentYCord, midPoints, function (returnCode, actualPoints, rtnMidPoints) {
                if (returnCode != 0) {
                    console.log("moveSymbol faild due to ", returnCode);
                    resCallback(0);
                }
                else {
                    contextObj.objiWhiz.stopSvgTrails();
                    contextObj.objiWhiz.getEntityExtents(selectedSymbolhandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                        if (retCode != 0) {
                            console.log("getEntityExtents faild due to ", retCode);
                            resCallback(0);
                        }
                        else {
                            contextObj.moveEmployeeText(intEmployeeId, MaxX, MaxY, function (retCode) {
                                var index = contextObj.empData.findIndex(function (el) { return el.Id === intEmployeeId });
                                if (index != -1)
                                    contextObj.empData[index] = updatedEmpData[0];
                                index = contextObj.empHandlesData.findIndex(function (el) { return el.EmpId === intEmployeeId });
                                if (index != -1)
                                    contextObj.empHandlesData[index].SymbolHandle = selectedSymbolhandle;
                                contextObj.beforeMoveSpaceId = undefined;
                                resCallback(0);
                            });
                        }
                    });
                }
                //var index = contextObj.dataInDrawingTextHandles.findIndex(function (el) { return el.Key === intEmployeeId });
                //if (index != -1) {
                //    contextObj.dataInDrawingTextHandles[index]['Value']=;
                //    contextObj.dataInDrawingTextHandles.splice(index, 1);
                //}
            });
        });
    }
    getEmployeeXYCordinates(empId) {
        var xPos: number;
        var yPos: number;
        xPos = this.empData.find(function (el) { return el.Id === empId })['XPosition'];
        yPos = this.empData.find(function (el) { return el.Id === empId })['YPosition'];
        return xPos + this.colDelimiter + yPos;
        // return "(" + xPos + this.colDelimiter + yPos + ")";
    }
    moveEmployeeText = function (empId, xPos, yPos, resCallback) {
        var contextObj = this;
        var textHandle = contextObj.dataInDrawingTextHandles.find(function (el) { return el.Key === empId }).Value;
        contextObj.objiWhiz.moveEntity(textHandle, xPos, yPos, function (retcode) {
            if (retcode != 0)
                console.log("getEntityExtents faild due to ", retcode);
            resCallback(0);
        });
    }
    isAdminPrivilage = function (resCallback) {
        var blnEmpMenuVisible = false;
        var contextObj = this;
        var g_blnSpaceModuleAdmin: boolean;
        var g_blnEmployeeModuleAdmin = this.commonDwgServices.isModuleAdmin;
        var g_blnUserEditableOrgUnitExist;
        if (this.commonDwgServices.sessionUserRoleId > 3) {
            if (g_blnEmployeeModuleAdmin) {
                resCallback(true);
            }
            else {
                contextObj.empDrawingService.getIsModuleAdmin(3).subscribe(function (data) {
                    g_blnSpaceModuleAdmin = data["Data"];
                    contextObj.empDrawingService.checkUserEditableOrgUnits(contextObj.drawingId).subscribe(function (resultData) {
                        g_blnUserEditableOrgUnitExist = resultData["Data"].Message;
                        if (!g_blnEmployeeModuleAdmin) {
                            if (g_blnUserEditableOrgUnitExist == "True") {
                                blnEmpMenuVisible = true;
                            }
                            else {
                                blnEmpMenuVisible = false;
                            }
                        }
                        else if (!g_blnSpaceModuleAdmin) {
                            if (g_blnUserEditableOrgUnitExist == "True") {
                                blnEmpMenuVisible = true;
                            }
                            else {
                                blnEmpMenuVisible = false;
                            }
                        }
                        resCallback(blnEmpMenuVisible);
                    });
                });
            }
        }
        else
            resCallback(true);
    }
    getEmpIdsArray = function (selectedMultipleSpaceIds) {
        var selectedIds: string[] = [];
        for (let spaceId of selectedMultipleSpaceIds) {
            for (let empItem of this.empData) {
                if (empItem['AssignedSpaceId'] == spaceId)
                    selectedIds.push(empItem['Id'])
            }
        }
        return selectedIds;
    }
    getTotalizeData = function (selectedSpaceHandles, resCallback) {
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
            for (var i = 0; i < spaceCount; i++) {
                if (i != spaceIds.length - 1)
                    strSpaceIds += spaceIds[i] + ",";
                else
                    strSpaceIds += spaceIds[i];
            }
            contextObj.empDrawingService.getTotalizeSpaceStandardCapacityForSelected(contextObj.drawingId, strSpaceIds).subscribe(function (result) {
                var totalizeData = JSON.parse(result["Data"].FieldBinderData);
                contextObj.empTotalizeDataForLegend = totalizeData;
                var modifyTotalizeData: string = "";
                for (var item of totalizeData)
                    modifyTotalizeData += item['Label'] + " = <b>" + item['Value'] + "</b><br><br>";
                resCallback(modifyTotalizeData, spaceCount);

            });
        });
    }
    addTotalizeLegend = function (totalSpaceCount, resCallback) {
        var contextObj = this;
        var textArray: string[] = [];
        contextObj.commonDwgServices.calculateDwgRatio();
        var totalCount: string = "No. of Spaces selected =" + totalSpaceCount;
        var formatedText = "\\f|b1|l0|c0|p18;\\C7;\\H" + contextObj.commonDwgServices.g_dblDwgRatio * 3 + ";Space Details\\n\\n\\f|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonDwgServices.g_dblDwgRatio * 3 + ";" + totalCount + "\\n";
        for (var item of this.empTotalizeDataForLegend) {
            var data = item['Label'] + " = " + item['Value'];
            formatedText += "\\f|b0|l0|c0|p18;\\C1;\\H" + contextObj.commonDwgServices.g_dblDwgRatio * 3 + ";" + data + "\\n"
        }
        contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
            if (retCode == 0) {
                contextObj.spaceOpenDrawingObj.createDrawingDetailsLegend(xPos, yPos, false, function (startY) {
                    contextObj.objiWhiz.createMultilineText("$LEGEND", 1, xPos, startY, 0, contextObj.commonDwgServices.g_dblDwgRatio * 3,
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
    moveMultipleEmployeeInDrawingOnClick = function (resCallback) {
        var selectedEmpDetails: any[] = [];
        this.moveEmpDataArray = [];
        this.getMultipleEmployeeForMove(selectedEmpDetails, function (returnEmpData) {
            resCallback(returnEmpData);
        });
    }
    getMultipleEmployeeForMove = function (selectedEmpDetails, resCallback) {
        var contextObj = this;
        contextObj.moveEmployeeInDrawing(false, function (retCode, intEmployeeId, strEmployeeName, previousXCord, previousYCord, gradeExist, selectedSymbolhandle) {
            if (retCode == 0) {
                var empSelectedIndex = selectedEmpDetails.findIndex(function (el) { return el['Id'] == intEmployeeId });
                if (empSelectedIndex != -1) {
                    selectedEmpDetails.splice(empSelectedIndex, 1);
                    contextObj.objiWhiz.removeMapsByHandle(selectedSymbolhandle + contextObj.rowDelimiter);
                } else {
                    selectedEmpDetails.push({ "Id": intEmployeeId, "Name": strEmployeeName, "previousXCord": previousXCord, "previousYCord": previousYCord, "gradeExist": gradeExist, "symbolhandle": selectedSymbolhandle })
                }
                contextObj.getMultipleEmployeeForMove(selectedEmpDetails, resCallback);
            } else if (retCode == 5) {
                contextObj.getMultipleEmployeeForMove(selectedEmpDetails, resCallback);
            }
            else if (retCode == 6) {
                contextObj.getMultipleEmployeeForMove(selectedEmpDetails, resCallback);
            }
            else if (retCode == 8)
                resCallback(selectedEmpDetails);

        });
    }
    multipleMoveEmployeeToSelectedSpace = function (intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, resCallback) {
        var contextObj = this;
        contextObj.objiWhiz.stopSvgTrails();
        contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
        //   this.empDrawingService.insertSpaceAllotmentDetails(intEmployeeId, spaceId, contextObj.drawingId, currentXCord, currentYCord).subscribe(function (resultData) {
        // var updatedEmpData = JSON.parse(resultData["Data"].Data);
        var leaderpoints = currentXCord + contextObj.colDelimiter + currentYCord + contextObj.rowDelimiter + previousXCord + contextObj.colDelimiter + previousYCord + contextObj.rowDelimiter;
        contextObj.objiWhiz.createLeader(contextObj.leaderLayerName, contextObj.leaderColorCode, leaderpoints, contextObj.leaderLineTypeSize, contextObj.leaderLineTypeScale, contextObj.leaderLineType, 1, function (returnCode, EntityHandle) {
            if (returnCode != 0) {
                console.log("moveSymbol faild due to ", returnCode);
                resCallback(0);
            }
            else {
                var midPoints = contextObj.getEmployeeXYCordinates(intEmployeeId);
                contextObj.objiWhiz.moveSymbol(selectedSymbolhandle, previousXCord, previousYCord, currentXCord, currentYCord, midPoints, function (returnCode, actualPoints, rtnMidPoints) {
                    if (returnCode != 0) {
                        console.log("moveSymbol faild due to ", returnCode);
                        resCallback(0);
                    }
                    else {
                        contextObj.objiWhiz.setEntityColor(selectedSymbolhandle, contextObj.g_intScenarioSymbolColor, function (returnCode) {
                            contextObj.objiWhiz.getEntityExtents(selectedSymbolhandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                                if (retCode != 0) {
                                    console.log("getEntityExtents faild due to ", retCode);
                                }
                                else {
                                    contextObj.moveEmpDataArray.push({
                                        EmpId: intEmployeeId, TextXPos: MaxX, TextYPos: MaxY, PreviousXPos: previousXCord,
                                        PreviousYPos: previousYCord, CurrentXPos: currentXCord, CurrentYPos: currentYCord, SymbolHandle: selectedSymbolhandle
                                    })
                                    //contextObj.moveEmployeeText(intEmployeeId, MaxX, MaxY, function (retCode) {
                                    //    var index = contextObj.empData.findIndex(function (el) { return el.Id === intEmployeeId });
                                    //    if (index != -1)
                                    //        contextObj.empData[index] = updatedEmpData[0];
                                    //    index = contextObj.empHandlesData.findIndex(function (el) { return el.EmpId === intEmployeeId });
                                    //    if (index != -1)
                                    //        contextObj.empHandlesData[index].SymbolHandle = selectedSymbolhandle;
                                    //    contextObj.beforeMoveSpaceId = undefined;
                                    //    resCallback(0);
                                    //});
                                }
                                resCallback(0);
                            });
                        });
                    }
                });
            }
        });
        // });
    }
    afterMultipleEmpMove = function (empDetails, resCallback) {
        debugger
        var contextObj = this;
        this.objiWhiz.deleteLayer(this.leaderLayerName, function (retCode) {
            if (retCode != 0)
                console.log("deletelayer faild due to", retCode);
            var selectedSymbolhandles: string = "";
            for (var i = 0; i < empDetails.length; i++)
                selectedSymbolhandles += empDetails[i]['selectedSymbolhandle'] + contextObj.rowDelimiter;
            contextObj.objiWhiz.setEntityColor(selectedSymbolhandles, contextObj.g_intEmployeeSymbolColor, function (returnCode) {
                contextObj.moveMultipleEmpText(empDetails, 0, function (ret) {
                    contextObj.objiWhiz.removeMaps();
                    resCallback(0);
                });

            });
        });
    }
    moveMultipleEmpText(empDetails: any, arrayCount: number, resCallback) {
        var contextObj = this;
        var empData;
        var xPos;
        var yPos;
        if (empDetails.length > arrayCount) {
            empData = empDetails[arrayCount];
            xPos = this.moveEmpDataArray.find(function (el) { return el['EmpId'] == empData['employeeId'] }).TextXPos;
            yPos = this.moveEmpDataArray.find(function (el) { return el['EmpId'] == empData['employeeId'] }).TextYPos
            this.moveEmployeeText(empData['employeeId'], xPos, yPos, function (retCode) {
                arrayCount++;
                contextObj.moveMultipleEmpText(empDetails, arrayCount, resCallback);
            });
        }
        else
            resCallback(0);

    }
    afterMoveReverse() {
        var contextObj = this;
        contextObj.objiWhiz.deleteLayer(contextObj.leaderLayerName, function (retCode) {
            if (retCode != 0)
                console.log("deletelayer faild due to", retCode);
            contextObj.empSymbolReverseMove(contextObj.moveEmpDataArray, 0, function (res) {
                contextObj.objiWhiz.removeMaps();
            });
        });
    }
    empSymbolReverseMove(empDetails: any, count, resCallback) {
        var contextObj = this;
        if (empDetails.length > count) {
            var empItem = empDetails[count]
            var midPoints = contextObj.getEmployeeXYCordinates(empItem['EmpId']);
            contextObj.objiWhiz.moveSymbol(empItem['SymbolHandle'], empItem['CurrentXPos'], empItem['CurrentYPos'], empItem['PreviousXPos'], empItem['PreviousYPos'], midPoints, function (returnCode, actualPoints, rtnMidPoints) {
                if (returnCode != 0) {
                    console.log("moveSymbol faild due to ", returnCode);
                    count++;
                    contextObj.empSymbolReverseMove(empDetails, count, resCallback);
                }
                else {
                    contextObj.objiWhiz.setEntityColor(empItem['SymbolHandle'], contextObj.g_intEmployeeSymbolColor, function (returnCode) {
                        count++;
                        contextObj.empSymbolReverseMove(empDetails, count, resCallback);
                    });
                }
            });
        }
        else
            resCallback(0);
    }
    searchInDrawing(searchData, resCallback) {
        var searchedSymbolhandle: any[] = [];
        var selectedSpaceHandles: any[] = [];
        for (var empItem of searchData) {
            var index = this.empHandlesData.findIndex(function (el) { return el.EmpId == empItem['Id'] });
            if (index != -1)
                searchedSymbolhandle.push(this.empHandlesData[index]['SymbolHandle']);
            selectedSpaceHandles.push(this.getSpaceHandleViaEmpId(empItem['Id']))
        }
        this.objiWhiz.blinkEntitiesByHandles(searchedSymbolhandle, this.blinkColorCodeR, this.blinkColorCodeG, this.blinkColorCodeB, this.commonDwgServices.blinkSize, this.commonDwgServices.blinkDelay, function (returnCode) {
            resCallback(selectedSpaceHandles);
        });
    }
    getEmpData(empId: number) {
        var index = this.empData.findIndex(function (el) { return el.Id === empId });
        return this.empData[index];
    }
    getEmpDataSecondFloor(empData: any, empId: number) {
        debugger
        var index = empData.findIndex(function (el) { return el.Id === empId });
        return empData[index];
    }
    insertMutlipeEmployees(insertEmpDetails, arrayCount, resCallback) {
        var contextObj = this;
        if (insertEmpDetails.length > arrayCount) {
            var insertEmpDetail = insertEmpDetails[arrayCount];
            contextObj.insertSpaceAllotments(insertEmpDetail['employeeId'], insertEmpDetail['spaceId'], insertEmpDetail['drawingId'], insertEmpDetail['xPosition'], insertEmpDetail['yPosition'], function (retCode) {
                arrayCount++;
                contextObj.empCount++;
                contextObj.insertMutlipeEmployees(insertEmpDetails, arrayCount, resCallback);
            });
        } else
            resCallback();
    }
    moveMultipleEmployeeWithOutApproval(moveEmpDetails, resCallback) {
        debugger
        this.employeeMoveDataInputList = [];
        var empItem;
        var index;
        var contextObj = this;
        for (var i = 0; i < moveEmpDetails.length; i++) {
            empItem = moveEmpDetails[i];
            this.employeeMoveDataInputList.push({ DrawingId: this.drawingId, EmployeeId: empItem['employeeId'], SpaceId: empItem['spaceId'], XPosition: empItem['currentXCord'], YPosition: empItem['currentYCord'] })
        }
        this.empDrawingService.insertMultipleSpaceAllotmentDetails(this.employeeMoveDataInputList).subscribe(function (resultData) {
            var updatedEmpData = JSON.parse(resultData['Data']);
            for (var i = 0; i < updatedEmpData.length; i++) {
                empItem = updatedEmpData[i];
                index = contextObj.empData.findIndex(function (el) { return el['Id'] == empItem['Id'] });
                if (index != -1)
                    contextObj.empData[index] = empItem
            }
            resCallback(updatedEmpData);
        });

    }
    checkEmpHasResource(empDetails: any[], resCallback) {
        var index;
        this.empDrawingService.checkResourceExistForEmployees(empDetails).subscribe(function (isHasResource) {
            resCallback(isHasResource);
        });
    }
    scaleAllEmployees(scaleFactor, recCallback) {
        debugger
        scaleFactor = scaleFactor / 100;
        if (this.NewScaleFactor == 0) {
            this.NewScaleFactor = this.g_dblScaleFactor;
        }
        this.NewScaleFactor = this.NewScaleFactor * scaleFactor;


        //if (!resetOption) {
        //        this.originalScale = this.originalScale / scaleFactor;
        //}
        //else
        //    scaleFactor = this.originalScale;
        var SymbolsHandles = "";
        var contextObj = this;
        this.empHandlesData;
        for (var i = 0; i < this.empHandlesData.length; i++) {
            SymbolsHandles += this.empHandlesData[i].SymbolHandle + this.rowDelimiter;
        }                                                                                       /*Api Call*/

        contextObj.objiWhiz.scaleSymbolMultiple(SymbolsHandles, scaleFactor, function (returnCode, resultArray) {
            var moveTextMultipleArray = [];
            var textHandle;
            var index;
            if (returnCode == 0) {
                for (var i = 0; i < resultArray.length; i++) {
                    index = contextObj.empHandlesData.findIndex(function (el) { return el.SymbolHandle == resultArray[i][0] });
                    if (index != -1) {
                        textHandle = contextObj.empHandlesData[index].TextHandle;
                        moveTextMultipleArray.push([textHandle, resultArray[i][2][1]])
                    }
                }
            }
            else
                console.log("scaleSymbolMultiple failed due to", returnCode);
            contextObj.objiWhiz.moveEntityMultiple(moveTextMultipleArray, function (retCode) {
                if (retCode == 0) {

                }
                else
                    console.log("moveEntityMultiple failed due to", returnCode);
                recCallback(0);
            });
        });
    }
    ScaleEmployeeReset(resCallback) {
        var contextObj = this;
        var employeeData: any;
        employeeData = contextObj.empData.slice();
        var empDispSettingsData = contextObj.empDisplaySettingData.slice();
        var ratio = [0];
        contextObj.objiWhiz.clientDWGAreaRatio(ratio);
        var DeleteLayerTextandSymbols = this.g_strEmployeeSymbolLayer + this.rowDelimiter + this.g_strEmployeeTextLayer + this.rowDelimiter;
        this.objiWhiz.deleteLayer(DeleteLayerTextandSymbols, function (retCode) {
            if (retCode == 0) {
                contextObj.g_dblScaleFactor = 1;
                contextObj.createEmployeeDataAndTooltipOnDrawing(employeeData, empDispSettingsData, ratio, function (retCode) {
                    resCallback(retCode);
                });
            }
            else {
                console.log("Reset failed due to", retCode);
            }
        });
    }

    ScaleEmployeesTextHeight(TextHeight, recCallback) {
        debugger
        var ratio = [0];
        this.objiWhiz.clientDWGAreaRatio(ratio);
        TextHeight = TextHeight / 100;
        if (this.NewTextHeight == 0) {
            this.NewTextHeight = this.g_dblTextHeight;
        }
        this.NewTextHeight = this.NewTextHeight * TextHeight;// * ratio[0];

        var TextHandles = "";
        for (var i = 0; i < this.empHandlesData.length; i++) {
            TextHandles += this.empHandlesData[i].TextHandle + this.rowDelimiter;
        }
        var contextObj = this;
        contextObj.objiWhiz.setTextSize(TextHandles, contextObj.NewTextHeight * ratio[0], function (returnCode, resultArray) {
            if (returnCode == 0) {

            }
            else
                console.log("setTextSize failed due to", returnCode);
            recCallback(0);
        });
    }
    assignToAnotherFloor = function (empDetails, resCallback) {
        var contextObj = this;
        var empDispSettingsData = contextObj.empDisplaySettingData.slice();
        var ratio = [0];
        contextObj.objiWhiz.clientDWGAreaRatio(ratio);
        contextObj.createEmployeeDataAndTooltipOnDrawing(empDetails, empDispSettingsData, ratio, function (retCode) {
            resCallback(retCode);
        });
    }
    updateAttachmentCount(empId) {
        var index = this.empData.findIndex(function (el) { return el.Id == empId });
        if (index != -1) {
            if (this.empData[index]["Attachments"] != "None")
                this.empData[index]["Attachments"] = this.empData[index]["Attachments"] + 1;
            else
                this.empData[index]["Attachments"] = 1;
            this.employeeEditReflectInDrawing(this.empData[index], function (ret) { });
        }

    }

     moveEmployeeCheckFromContextMenu = function (empId, resCallback) {
         var contextObj = this;    
    
        contextObj.empDrawingService.getEmployeeSheduledToMove(empId).subscribe(function (resultData) {
            if (JSON.parse(resultData["Data"].FieldBinderData)[0].IsEmployeeSheduledToMove) {
                contextObj.notificationServices.ShowToaster("The Employee is already scheduled for a Move", 2);
                resCallback(5);
            }
            else if (JSON.parse(resultData["Data"].FieldBinderData)[0].IsEmployeeApprovalForMove) {
                contextObj.notificationServices.ShowToaster("The Employee Move is already sent for Approval", 2);
                resCallback(5);
            }
            else {
                resCallback(1);            
               
            }
          
        });
    }
}
export interface EmpployeeHandleData {
    EmpId: number;
    SymbolHandle: string;
    TextHandle: string;
}
export interface DataForDrawing {
    Key: string;
    Value: string;
}
export interface OccupancyLegendData {
    HatchObj: { ColorId: number, HatchAngle: number, HatchScale: number, HatchPatternId: number, RGBColor: string };
    TextName: string;
    Area: string;
}
export enum DistributionType {
    Occupied = 1,
    UnOccupied = 2,
    UnderOccupied = 3,
    OverOccupied = 4,
    NominalOccupied = 5
}
export interface EmployeeMoveDataInput {

    DrawingId: number;
    EmployeeId: number;
    XPosition: number;
    YPosition: number;
    SpaceId: number;

}
export interface MoveEmpData {
    EmpId: number;
    TextXPos: number;
    TextYPos: number;
    PreviousXPos: number;
    PreviousYPos: number;
    CurrentXPos: number;
    CurrentYPos: number;
    SymbolHandle: string;
}
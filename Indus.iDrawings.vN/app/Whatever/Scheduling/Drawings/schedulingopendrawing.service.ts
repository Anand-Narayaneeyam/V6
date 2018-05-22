import { Injectable } from '@angular/core';
import {HttpHelpers} from '../../../Whatever/utils/HttpHelpers';
import { Http } from '@angular/http';
import {CommonDrawings} from '../../common/drawings/drawings-services';
import {SpaceOpenDrawing} from '../../space/drawings/spaceopendrawing.services';
//Scheduling Service
import {SchedulingDrawingService} from '../../../models/scheduling/drawings/schedulingdrawing.service';
import {SpaceService} from '../../../Models/Space/space.service'
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
export class SchedulingOpenDrawing {
    schedulingDrawingService: SchedulingDrawingService;
    spaceService: SpaceService;
    schedulingService: SchedulingService;
    commonDwgServices: CommonDrawings;
    objiWhiz: any;
    spaceOpenDrawingObj: any;
    drawingId: number;
    moduleId: number;
    drawingCategoryId: number;
    notificationServices;
    pageTarget: number;
    http: any;
    /*Column and row delimiter*/
    rowDelimiter: string;
    colDelimiter: string;
    blnIsSpace: boolean = false;
    schedulingSpaceHandles = [];
    msgcount: number = 0;
    isSpace: boolean = true;
    seatsData: any;
    g_SeatSymbolLineWidth = 0.0;
    g_SeatSymbolLineType = 'ByLayer';
    g_SeatScaleFactor = 0.0;
    seatLayerName = "$Seats";
    seatSymbolHandles: DataForDrawing[] = [];// key:symbol handle and value spaceid
    seatSymbolCords = '-10.59582090,8.76895522;11.08298507,8.76895522;11.08298507,-8.76895522;-11.08298507,-8.76895522;-11.08298507,8.76895522;-7.42925373,8.76895522;';
    IsAvailable: boolean = false;
    SearchToDate: string;
    filter: string = '';
    Fromdate: any = [];
    Todate: any = [];
    FromTime: any = [];
    ToTime: any = [];
    Dateforcalender: string;
    TommorrowDate: string;
    FromDate: string;
    ToDate: string;
    Fromtime: any;
    Totime: any;
    timeid: number;
    fieldObject: any;
    NotshwingIngrid: any;
    Availablity: any = [];
    blinkColorCodeR: number = 255;
    blinkColorCodeG: number = 0;
    blinkColorCodeB: number = 0;
    IsProxyReservationEnabled: boolean = false;
    constructor(private iWhizObject: any, drawingId: number, moduleId: number, drawingCategoryId: number, pageTarget: number, notificationService, http: Http) {
        this.objiWhiz = iWhizObject;
        this.drawingId = drawingId;
        this.moduleId = moduleId;
        this.drawingCategoryId = drawingCategoryId;
        this.notificationServices = notificationService;
        this.pageTarget = pageTarget;
        this.http = http;
    }

    /* Initialise objects */
    initilizeObjects = function (resCallback) {
        var contextObj = this;
        this.spaceOpenDrawingObj = new SpaceOpenDrawing(this.objiWhiz, this.drawingId, this.moduleId, this.http, false);
        contextObj.schedulingDrawingService = new SchedulingDrawingService(contextObj.http);
        contextObj.spaceService = new SpaceService(contextObj.http);
        contextObj.schedulingService = new SchedulingService(contextObj.http);
        contextObj.spaceOpenDrawingObj.initilizeObjects(function (retCode) {
            contextObj.getAllSeatsDetails(); // for seat details
            contextObj.commonDwgServices = contextObj.spaceOpenDrawingObj.commonServices;
            contextObj.isSpace = contextObj.spaceOpenDrawingObj.commonServices.isSpace;
            contextObj.rowDelimiter = contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter
            contextObj.colDelimiter = contextObj.spaceOpenDrawingObj.commonServices.columnDelimiter;
            contextObj.g_blnModuleAdmin = contextObj.commonDwgServices.isModuleAdmin
            contextObj.schedulingService.GetUserRolebasedSettingsRowData(parseInt(contextObj.commonDwgServices.sessionUserRoleId)).subscribe(function (result) {
                if (result.Data.DataCount == 1) {
                    contextObj.IsProxyReservationEnabled = JSON.parse(result.Data.FieldBinderData)[0]["Is Proxy Reservation Enabled?"];
                }
            });
            resCallback(0);
        });
    }

    checkIsXpositionNull = function (seatsData, resCallback) {
        var xPosNullSeatsData: any[] = [];
        for (let seatsDataItem of seatsData) {
            if (seatsDataItem['XPosition'] == null || seatsDataItem['XPosition'] == 0)
                xPosNullSeatsData.push(seatsDataItem);
        }
        if (xPosNullSeatsData.length > 0) {
            resCallback(0, xPosNullSeatsData);
        }

        else
            resCallback(1);
    }
    showDataInDrawing = function (dataChange, resCallback) {
        //debugger;
        var contextObj = this;
        if (contextObj.drawingCategoryId == 1) { //drawingcategoryid=1 is archetectural 
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

                case 'bothData':
                    contextObj.spaceOpenDrawingObj.showDataInDrawing(function (retCode) {
                        if (retCode == 0) {
                            if (contextObj.commonDwgServices.isSeatBookingEnabled) {
                                contextObj.createSeats(function (retcode) {
                                    resCallback(0);
                                });
                            }
                            else
                                resCallback(0);
                        }
                    });
                    break;
            }
        }
    }

    //show tooltip data
    getTooltipData = function (Handle, resCallback) {
        //debugger;
        var contextObj = this;
        let isSymbolHandle = contextObj.seatSymbolHandles.some(function (el) { return el.Key === Handle });
        if (isSymbolHandle) {
            // contextObj.getSeatTooltipData(Handle, function (isExists, tooltipDataValues) {
            resCallback(false);
            //});
        }
        else {
            contextObj.spaceOpenDrawingObj.getTooltipData(Handle, "", function (retCode, tooltipDataValues) {
                resCallback(true, tooltipDataValues);
            });
        }
    }
    getAllSeatsDetails() {
        var contextObj = this;
        this.schedulingDrawingService.getSeatDetailsforDrawing(this.drawingId).subscribe(function (resultData) {
            contextObj.seatsData = JSON.parse(resultData);
            //resCallback(contextObj.spaceData);
        });
    }
    createSeats = function (resCallback) {

        var contextObj = this;
        contextObj.objiWhiz.setApplicationLayer(contextObj.seatLayerName);
        if (contextObj.seatsData == undefined || contextObj.seatsData == null) {
            setTimeout(function () {
                contextObj.createSeats(resCallback);

            }, 50);
        }
        else {
            contextObj.setSeatsPosition(contextObj.seatsData, function (res) {
                resCallback();
            });
        }
        //contextObj.objiWhiz.createSymbolwithData(itemsForCreateTextSymbol, contextObj.strObjectsSymbolLayer, 1, 0, 3,
        //    0, 1, "Standard", contextObj.g_intAssetsTextStyleId, symbolProperties, symbolTextProperties, function (retCode, symbolHandles, textHandles, symbolTextHandles) {

        //    });
    }
    setSeatsPosition = function (seatsData, resCallback) {

        var contextObj = this;
        if (seatsData.length > 0) {
            var seatsData = seatsData.slice();
            debugger
            contextObj.checkIsXpositionNull(seatsData, function (retCode, xPosNullSeatsData) {
                if (retCode == 0) {
                    var getXposData = contextObj.displayNotProperlyLocatedSeats(xPosNullSeatsData);
                    for (var seatsItem of getXposData) {
                        var index = seatsData.findIndex(function (el) { return el.Id === seatsItem['Id'] })
                        if (index != -1)
                            seatsData[index] = seatsItem;
                    }
                }
                contextObj.seatSymbolCords = contextObj.seatSymbolCords.replace(/,/g, contextObj.colDelimiter);   //coordinates 
                contextObj.seatSymbolCords = contextObj.seatSymbolCords.replace(/;/g, contextObj.rowDelimiter);
                contextObj.objiWhiz.setDisplay(false);
                contextObj.insertSymbols(seatsData, 0, function (retCode) {
                    contextObj.objiWhiz.setDisplay(true);
                    resCallback();
                });
            });
        }
        else
            resCallback();
    }
    displayNotProperlyLocatedSeats(xPosNullSeatsData) {
        var contextObj = this;
        contextObj.commonDwgServices.calculateDwgRatio();
        var sortedxPosNullSeatsData = xPosNullSeatsData.sort(function (a, b) { return a.SpaceId - b.SpaceId });
        for (var i = 0; i < sortedxPosNullSeatsData.length; i++) {
            // if (empDataitem['AssignedSpaceId'] != null) {
            let spaceId = sortedxPosNullSeatsData[i]['SpaceId'];
            if (spaceId != null && spaceId != undefined) {

                let previousSpaceId: number = undefined;
                if (i > 0)
                    previousSpaceId = sortedxPosNullSeatsData[i - 1]['SpaceId'];

                if (spaceId != previousSpaceId) {
                    var currentSpaceData = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId == spaceId });
                    if (currentSpaceData != undefined) {
                        var textInsertionX = currentSpaceData['TextInsertionX'];
                        var textInsertionY = currentSpaceData['TextInsertionY']
                        sortedxPosNullSeatsData[i]['XPosition'] = textInsertionX;
                        sortedxPosNullSeatsData[i]['YPosition'] = textInsertionY;
                    }
                }
                else {
                    var previousSpaceData = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId == previousSpaceId });
                    if (previousSpaceData != undefined) {
                        sortedxPosNullSeatsData[i]['XPosition'] = sortedxPosNullSeatsData[i - 1]['XPosition'] + (6 * contextObj.commonDwgServices.g_dblDwgRatio);
                        sortedxPosNullSeatsData[i]['YPosition'] = sortedxPosNullSeatsData[i - 1]['YPosition'];
                    }
                }

            }

            // }
        }
        return sortedxPosNullSeatsData;
    }
    insertSymbols(seatsData, count, resCallback) {
        debugger
        var contextObj = this;
        var colorId;
        var dXCoord;
        var dYCoord;
        var symbolParams = [];
        while (seatsData.length > count) {
            var seatItem = seatsData[count];
            if (seatItem['IsHotelingSeats']) {
                if (seatItem['SeatingAssignmentTypeId'] == 6)
                    colorId = 130;
                else
                    colorId = 2;
            } else
                colorId = 30;
            //if (seatItem['XPosition'] == null) {
            //    var selectedSpaceData = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId == seatItem['SpaceId'] });
            //    dXCoord = selectedSpaceData['TextInsertionX'];
            //    dYCoord = selectedSpaceData['TextInsertionY'];
            //}
            //else {
            dXCoord = seatItem['XPosition'];
            dYCoord = seatItem['YPosition'];
            //}
            symbolParams.push([contextObj.seatLayerName, colorId, dXCoord, dYCoord, contextObj.seatSymbolCords, contextObj.g_SeatSymbolLineWidth, contextObj.g_SeatSymbolLineType, contextObj.g_SeatScaleFactor]);
            count++;

            //contextObj.objiWhiz.insertSymbol(contextObj.seatLayerName, colorId, dXCoord, dYCoord, contextObj.seatSymbolCords, contextObj.g_SeatSymbolLineWidth, contextObj.g_SeatSymbolLineType, contextObj.g_SeatScaleFactor, function (returnCode, symbolHandle, ActualPoints) {
            //    if (returnCode == 0)
            //        contextObj.seatSymbolHandles.push({ Key: symbolHandle, Value: seatItem['Id'] });
            //    count++;
            //    contextObj.insertSymbols(seatsData, count, resCallback);
            //});
        }
        contextObj.objiWhiz.insertMultipleSymbol(symbolParams, function (returnCode, symbolHandles) {
            if (returnCode == 0) {
                var symbolHandles = symbolHandles.split(contextObj.rowDelimiter);
                var index;
                for (var item in symbolHandles) {
                    if (symbolHandles[item] != "") {
                        index = contextObj.seatSymbolHandles.findIndex(function (el) { return el.Value === seatsData[item]['Id'] })

                        if (index != -1) {
                            var Id = contextObj.seatSymbolHandles[index]['Value'];
                            contextObj.seatSymbolHandles.splice(index, 1);
                            contextObj.seatSymbolHandles.push({ Key: symbolHandles[item], Value: seatsData[item]['Id'] });
                        }
                        else
                            contextObj.seatSymbolHandles.push({ Key: symbolHandles[item], Value: seatsData[item]['Id'] });
                    }
                }
            }
            resCallback();
        });
    }
    getSeatTooltipData = function (symbolHandle, resCallback) {
        this.tooltipData = [];
        var isHoteling: string = "";
        var index = this.seatSymbolHandles.findIndex(function (el) { return el.Key == symbolHandle });
        if (index != -1) {
            var seatId = this.seatSymbolHandles[index]['Value'];
            index = this.seatsData.findIndex(function (el) { return el.Id == seatId });
            if (index != -1) {
                var seatItem = this.seatsData[index];
                var seatNoValue = seatItem['NoPrefix'] + seatItem['Number'];
                this.tooltipData.push({ Key: 'Seat No', Value: seatNoValue });
                if (seatItem['IsHotelingSeats'])
                    isHoteling = "Yes";
                else
                    isHoteling = "No";
                this.tooltipData.push({ Key: 'Hoteling Workspace', Value: isHoteling });
                resCallback(true, this.tooltipData);
            }
            else
                resCallback(false);
        }
        else
            resCallback(false);
    }
    blinkSeats = function (resCallback) {
        debugger
        var contextObj = this;
        var selectedHandles = [];
        var index;
        var isHoteling;
        var assignmentType;
        for (let symbolHandle of this.seatSymbolHandles) {
            index = this.seatsData.findIndex(function (el) { return el.Id == symbolHandle['Value'] });
            if (index != -1) {
                isHoteling = this.seatsData[index]['IsHotelingSeats'];
                assignmentType = this.seatsData[index]['SeatingAssignmentTypeId'];
                if (contextObj.IsProxyReservationEnabled == true) {
                    if (isHoteling)
                        selectedHandles.push(symbolHandle['Key']);
                } else {
                    if (isHoteling && assignmentType != 6)
                        selectedHandles.push(symbolHandle['Key']);
                }
            }
        }
        if (selectedHandles.length > 0) {
            contextObj.objiWhiz.blinkEntitiesByHandles(selectedHandles, contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (returnCode) {
                resCallback(0, selectedHandles);
            });
        }
        else
            resCallback(1);

    }
    getDetailsForSeatBooking = function (resCallback) {
        let contextObj = this;
        this.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
            if (retCode == 0) {
                contextObj.objiWhiz.pointInEntity(contextObj.commonDwgServices.grossHandle, xPos, yPos, function (returnCode, isInside) {
                    var X = [0], Y = [0], Z = [0];
                    X[0] = xPos; Y[0] = yPos; Z[0] = 0;
                    contextObj.objiWhiz.dwgToClient(X, Y, Z);
                    contextObj.objiWhiz.getHandleOnPoint(X[0], Y[0], "1023", function (returnCode, selectedHandle, handleType, id, isActionPoint) {
                        console.log("seat-getHandleFortool", returnCode, selectedHandle, handleType)
                        if (selectedHandle != "") {

                            if (handleType == 0) //space/net handle
                            {
                                var space;
                                if (contextObj.isSpace)
                                    space = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.BomaHandle === selectedHandle });
                                else
                                    space = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.CarpetHandle === selectedHandle });
                                if (space != undefined) {
                                    var selectedSeatIds = contextObj.getSeatIdsFromSpaceId(space['SpaceId']);
                                    if (selectedSeatIds.length == 1) {
                                        if (contextObj.checkIsHotelingSeatFromSeatId(selectedSeatIds[0])) {
                                            contextObj.objiWhiz.removeBlinkers();
                                            var selectedSymbolhandle = contextObj.getSeatHandleFromSeatId(selectedSeatIds[0]);
                                            contextObj.objiWhiz.blinkEntitiesByHandles([selectedSymbolhandle], contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (returnCode1) {
                                                contextObj.getDatasForSeatBooking(function (ret) {
                                                    contextObj.bookHotellingSeat(selectedSeatIds[0], function (retCode, fieldsForseatBooking, spaceTime) {
                                                        resCallback(retCode, fieldsForseatBooking, selectedSeatIds[0], spaceTime);
                                                    });
                                                });
                                            });
                                        }
                                        else
                                            resCallback(2);
                                    }
                                    else
                                        resCallback(2);
                                }
                                else
                                    resCallback(3);
                            }
                            if (handleType == 1) //symbolHandle
                            {
                                var spaceId = contextObj.getSpaceIdsFromHandle(selectedHandle);
                                var selectedSeatId = contextObj.getSeatIdFromHandle(selectedHandle);
                                if (contextObj.checkIsHotelingSeatFromSeatId(selectedSeatId)) {
                                    contextObj.objiWhiz.removeBlinkers();
                                    contextObj.objiWhiz.blinkEntitiesByHandles([selectedHandle], contextObj.blinkColorCodeR, contextObj.blinkColorCodeG, contextObj.blinkColorCodeB, contextObj.commonDwgServices.blinkSize, contextObj.commonDwgServices.blinkDelay, function (returnCode1) {
                                        contextObj.getDatasForSeatBooking(function (ret) {
                                            contextObj.bookHotellingSeat(selectedSeatId, function (retCode, fieldsForseatBooking, spaceTime) {
                                                resCallback(retCode, fieldsForseatBooking, selectedSeatId, spaceTime);
                                            });
                                        });
                                    });
                                }
                                else
                                    resCallback(2);
                            }
                        }
                        else
                            resCallback(3);
                    });
                });
            }
            else
                resCallback(3);
        });
    }
    getDatasForSeatBookingRightclick(spaceId: number) {
        var contextObj = this;

    }

    getFormattedDate(dt) {
        var strDate = "";
        var date;
        if (dt != undefined) {
            date = new Date(dt);
        }
        else {
            date = new Date();
        }
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        strDate = dd + " " + mon + " " + yy;
        return strDate;
    }
    getDatasForSeatBooking = function (resCallback) {
        var contextObj = this;
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        if (m > 30) {
            n = n + 1;
            contextObj.timeid = (n * 2)
        }
        else
            contextObj.timeid = (n * 2) + 1;
        if (contextObj.timeid >= 38)
            contextObj.timeid = 12;
        var t = new Date();
        t.setDate(t.getDate() + 1);
        var tommorowdate = contextObj.getFormattedDate(t);
        var todaydate = contextObj.getFormattedDate(new Date());
        this.TommorrowDate = tommorowdate;
        this.Dateforcalender = todaydate;
        if (contextObj.timeid == 12) {
            this.FromDate = tommorowdate;
            this.ToDate = tommorowdate;
        }
        else {
            this.FromDate = todaydate;
            this.ToDate = todaydate;
        }
        this.SearchToDate = todaydate;
        contextObj.schedulingService.getseatbookingListfields().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (item.ReportFieldId == 6731 || item.ReportFieldId == 793 || item.ReportFieldId == 540)
                    item.isContentHtml = "hyperlink";
                if (item.ReportFieldId == 789 || item.ReportFieldId == 790 || item.ReportFieldId == 6723) {
                    item.IsHiddenLabel = true;
                    item.Width = 100;
                    if (item.ReportFieldId == 789)
                        item.Width = 150;
                }
            });
            contextObj.fieldObject = (resultData["Data"]);
            resultData["Data"].find(function (item) {
                var fieldid = [1687, 1688, 1695, 1696, 2041];
                contextObj.NotshwingIngrid = contextObj.fieldObject.filter(function (el) {
                    return fieldid.indexOf(el["FieldId"]) > -1;
                });
            });
            resultData["Data"].find(function (item) {
                var fieldid = [1687, 1688, 1695, 1696, 2041];
                contextObj.fieldObject = contextObj.fieldObject.filter(function (el) {

                    return fieldid.indexOf(el["FieldId"]) == -1;
                });
            });
            //contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return contextObj.NotshwingIngrid.indexOf(item.FieldId) });
            contextObj.NotshwingIngrid.find(function (item) {
                switch (item.FieldId) {
                    case 1687:
                        contextObj.Fromdate.push({});
                        contextObj.Fromdate[0] = item;
                        break;
                    case 1688:
                        contextObj.Todate.push({});
                        contextObj.Todate[0] = item;
                        break;
                    case 1695:
                        contextObj.FromTime.push({});
                        contextObj.FromTime[0] = item;
                        contextObj.FromTime[0].LookupDetails.LookupValues.splice(26, 26);
                        break;
                    case 1696:
                        contextObj.ToTime.push({});
                        contextObj.ToTime[0] = item;
                        contextObj.ToTime[0].LookupDetails.LookupValues.splice(0, 1);
                        break;
                    case 2041:
                        contextObj.Availablity.push({});
                        contextObj.Availablity[0] = item;
                        break;
                }
            });
            //contextObj.Availablity = contextObj.fieldObject.splice(18, 19);
            //contextObj.ToTime = contextObj.fieldObject.splice(17,18);
            //contextObj.FromTime = contextObj.fieldObject.splice(16,17);
            //contextObj.Todate = contextObj.fieldObject.splice(15, 16);
            //contextObj.Fromdate = contextObj.fieldObject.splice(14, 15);
            if (contextObj.timeid == 12) {
                contextObj.Fromdate[0].FieldValue = contextObj.TommorrowDate;
                contextObj.Todate[0].FieldValue = contextObj.TommorrowDate;
            }
            else if (contextObj.timeid >= 38)
                contextObj.Todate[0].FieldValue = contextObj.TommorrowDate;
            contextObj.FromTime[0].FieldValue = contextObj.FromTime[0].LookupDetails.LookupValues[contextObj.timeid - 12].Id.toString();
            var totimeid;
            if (contextObj.timeid >= 38)
                totimeid = 12;
            else
                totimeid = contextObj.timeid + 1;
            contextObj.ToTime[0].FieldValue = contextObj.ToTime[0].LookupDetails.LookupValues[totimeid - 13].Id.toString();
            resCallback(0);

        });

    }
    bookHotellingSeat = function (selectedSeatId, resCallback) {
        var context = this;
        var frmTime = context.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(context.FromTime[0].FieldValue)) });
        var toTime = context.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(context.ToTime[0].FieldValue)) });
        var fromdateTime = context.FromDate + frmTime[0].Value;
        var todateTime = context.ToDate + toTime[0].Value;

        //this.schedulingService.checkConflictedSeatRequestExists(selectedSeatId, fromdateTime, todateTime).subscribe(function (resultData) {

        //    switch (resultData) {
        //        case 1:
        var siteTimeZone = "";
        context.schedulingService.getTimeZoneNameForSite(context.commonDwgServices.drawingDetails['SiteId']).subscribe(function (resultData) {
            siteTimeZone = resultData;
            var selectedSpaceId = context.getSpaceIdFromSeatId(selectedSeatId);
            context.schedulingService.getTimeforspace(selectedSpaceId).subscribe(function (resulttime) {
                var SpaceTime = "";
                SpaceTime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];
                context.schedulingService.getSeatBookFields(selectedSeatId).subscribe(function (resultData) {
                    if (resultData["Data"]) {
                        for (var i = 0; i < resultData["Data"].length; i++) {
                            var holidays = [1, 7];
                            switch (resultData["Data"][i].FieldId) {
                                case 1687://fromdate
                                    resultData["Data"][i].FieldValue = context.FromDate;
                                    break;
                                case 2306://recur   
                                    resultData.Data[i].LookupDetails.LookupValues = resultData.Data[i].LookupDetails.LookupValues.filter(function (item) {
                                        return item["Id"] < 6;
                                    });
                                    break;
                                case 1695://fromtime   
                                    resultData["Data"][i].LookupDetails.LookupValues.splice(26, 26);
                                    resultData["Data"][i].FieldValue = context.FromTime[0].FieldValue;
                                    break;
                                case 1688://todate
                                    resultData["Data"][i].FieldValue = context.ToDate;
                                    break;
                                case 1696://totime
                                    resultData["Data"][i].LookupDetails.LookupValues.splice(0, 1);
                                    resultData["Data"][i].FieldValue = 39;//context.ToTime[0].FieldValue;
                                    break;
                                case 1697://group location
                                    resultData["Data"][i].IsVisible = false;
                                    break;
                                case 1725:/*user type*/

                                    resultData["Data"][i].FieldValue = "1";
                                    if (context.commonDwgServices.sessionUserRoleId == 4) {
                                        resultData["Data"][i].IsVisible = false;
                                    }
                                    break;
                                case 1692:/*booked for hiding for facility user*/
                                    resultData["Data"][i].FieldValue = context.commonDwgServices.sessionUserId;
                                    if (context.IsProxyReservationEnabled == true) {
                                        resultData["Data"][i].IsVisible = true;
                                    }
                                    else {
                                        resultData["Data"][i].IsVisible = false;
                                    }
                                    break;
                                case 698:/*space function*/
                                    resultData["Data"][i].IsEnabled = false;
                                    break;
                                case 2050:/*sitetimezone*/
                                    resultData["Data"][i].FieldValue = siteTimeZone;
                                    resultData["Data"][i].IsVisible = false;
                                    break;
                                case 1981:/*location related space details hide*/
                                case 1982:
                                case 1983:
                                case 1987:
                                    resultData["Data"][i].IsVisible = false;
                                    break;
                                case 1984:
                                    resultData["Data"][i].IsVisible = false;
                                    resultData["Data"][i].FieldValue = resultData["Data"][i].FieldValue.toString().replace("'", "");
                                    break;
                                case 465:
                                    resultData["Data"][i].IsVisible = true;
                                    break;
                                case 1540:
                                    resultData["Data"][i].FieldValue = "1";


                                    break;
                                case 1543:
                                    resultData["Data"][i].LookupDetails.LookupValues = resultData["Data"][i].LookupDetails.LookupValues.filter(function (el)
                                    { return holidays.indexOf(el.Id) == -1; })
                                    break;
                                case 1375:
                                    /*removes sat and sun from week days*/
                                    resultData["Data"][i].LookupDetails.LookupValues = resultData["Data"][i].LookupDetails.LookupValues.filter(function (el)
                                    { return holidays.indexOf(el.Id) == -1; })
                                    resultData["Data"][i].FieldLabel = "";
                                    break;
                                case 1372:
                                case 1373:
                                case 1374:
                                    resultData["Data"][i].FieldLabel = "";
                                    break;
                                case 2040:
                                    resultData["Data"][i].IsVisible = false;
                                    break;
                                case 2296:/*booked for textsearchlookup visible  for divadmin user*/
                                    if (context.IsProxyReservationEnabled == true) {
                                        resultData["Data"][i].HasAutoLookUp = true;
                                        resultData["Data"][i].IsVisible = true;
                                    }
                                    break;


                            }

                        }
                        if (context.IsProxyReservationEnabled == true) {
                            resultData["Data"].find(function (el) {
                                if (el.FieldId == 2296) {
                                    var lookupobjFld = resultData["Data"].filter(function (el) { return el.FieldId === 1692; });
                                    el.LookupDetails = lookupobjFld[0].LookupDetails;
                                    return true;
                                } else
                                    return false;
                            });
                        }
                        resCallback(0, resultData["Data"], SpaceTime);
                    } else {
                        resCallback(4, resultData["Data"], SpaceTime);
                    }
                });
            });
        });
        //        break;
        //    case -1:
        //        context.notificationServices.ShowToaster("Reservation exists", 2)
        //        break;
        //    case -3:
        //        context.notificationServices.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2)
        //        break;
        //    case -5:
        //        context.notificationServices.ShowToaster("Reservation already exists for the selected user in the selected time slot", 2)
        //        break;
        //}
        //});

    }
    reArrangeSeats = function (spaceId, resCallback) {
        var contextObj = this;
        var oldSeatsFullData = contextObj.seatsData;
        var oldSeatsData: any[] = [];
        oldSeatsData = oldSeatsFullData.filter(function (item) {
            return (item.SpaceId == spaceId);
        });
        this.schedulingDrawingService.getSeatDetailsforDrawing(this.drawingId).subscribe(function (resultData) {
            contextObj.seatsData = JSON.parse(resultData);
            var currentSeatsData: any[] = [];
            currentSeatsData = contextObj.seatsData.filter(function (item) {
                return (item.SpaceId == spaceId);
            });
            var currentHandles: string = "";
            for (var item of contextObj.seatSymbolHandles) {
                if (oldSeatsData.some(function (el) { return el.Id === item.Value }))
                    currentHandles += item.Key + contextObj.rowDelimiter;
            }

            if (currentHandles != "") {
                contextObj.objiWhiz.deleteEntity(currentHandles, function (retCode) {
                    if (retCode == 0) {
                        contextObj.objiWhiz.releaseSymbol(currentHandles, function (retCode) {
                            if (retCode == 0) {
                                // contextObj.seatSymbolHandles = [];
                                contextObj.setSeatsPosition(currentSeatsData, function (res) {
                                    resCallback();
                                });
                            }
                        });

                    }
                });
            }
            else {
                contextObj.setSeatsPosition(currentSeatsData, function (res) {
                    resCallback();
                });
            }

        });

    }
    deleteAndReleaseSymbol = function (symbolData, count, resCallback) {
        var contextObj = this;
        var currentHandles;
        if (symbolData.length > count) {
            currentHandles = symbolData[count].Key;
            contextObj.objiWhiz.deleteEntity(currentHandles, function (retCode) {
                contextObj.objiWhiz.releaseSymbol(currentHandles, function (retCode) {
                    count++
                    contextObj.deleteAndReleaseSymbol(symbolData, count, resCallback);
                });
            });
        }
        else
            resCallback();
    }
    hatchSelectedSeat = function (symbolHandle, resCallback) {
        var contextObj = this;
        var mapHandle = [symbolHandle];
        var rgbColor = [[255, 255, 255]];
        //  contextObj.deHatchEmployee(function (retCode) {
        contextObj.objiWhiz.createMap(mapHandle, rgbColor, function (retCode) {
            resCallback(retCode);
        });
    }
    moveSeatOnClick = function (resCallback) {
        var contextObj = this;
        this.moveSeat(function (retCode, selectedSeatId, selectedSymbolhandle, previousXCord, previousYCord) {
            switch (retCode) {
                case 0: var selectedSpace = contextObj.seatsData.find(function (el) { return el.Id == selectedSeatId }).SpaceId;
                    contextObj.moveSeatToCurrentSpace(selectedSpace, function (rtCode, spaceId, currentXCord, currentYCord) {
                        if (rtCode == 0) {
                            contextObj.updateSeatXYPos(selectedSeatId, selectedSymbolhandle, previousXCord, previousYCord, currentXCord, currentYCord, function (ret) {
                                contextObj.objiWhiz.removeMaps();
                                contextObj.objiWhiz.setCursor(1);
                                contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                                contextObj.objiWhiz.regenerate();
                                resCallback(0);
                            });
                        }
                        else {
                            contextObj.objiWhiz.removeMaps();
                            contextObj.objiWhiz.setCursor(1);
                            contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                            contextObj.objiWhiz.regenerate();
                            resCallback();
                        }
                    });
                    break;
                case 1: contextObj.moveSeatOnClick(resCallback);
                    break;
                case 6:
                case 8:
                    contextObj.objiWhiz.removeMaps();
                    contextObj.objiWhiz.setCursor(1);
                    contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                    contextObj.objiWhiz.regenerate();
                    resCallback();
                    break;
            }
        });

    }
    moveSeat = function (resCallback) {
        var contextObj = this;
        var selectedSeatId: number;
        contextObj.objiWhiz.setCursor(2);
        contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
            if (retCode == 0) {
                contextObj.objiWhiz.getSymbolWithDWGPoint(xPos, yPos, true, function (rtCode, selectedSymbolhandle) {
                    if (rtCode == 0) {
                        selectedSeatId = contextObj.seatSymbolHandles.find(function (el) { return el.Key === selectedSymbolhandle }).Value;
                        contextObj.hatchSelectedSeat(selectedSymbolhandle, function (rCode) {
                            if (rCode != 0) {
                                resCallback(6);
                                console.log("hatchSelectedEmployee failed due to ", rCode);
                            } else {
                                var rubx = [], ruby = [], rubz = []
                                rubx[0] = xPos; ruby[0] = yPos; rubz[0] = 0;
                                contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                                contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
                                resCallback(0, selectedSeatId, selectedSymbolhandle, xPos, yPos);
                            }
                        });
                    }
                    else {
                        contextObj.notificationServices.ShowToaster("Select a Hoteling Workspace", 2);
                        contextObj.moveSeat(resCallback);
                    }
                });
            }
            else
                resCallback(retCode);
        });
    }
    moveSeatToCurrentSpace = function (currentSpace, resCallback) {
        var contextObj = this;
        var spaceId: number;
        contextObj.objiWhiz.setCursor(2);
        contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
            if (retCode == 0) {
                contextObj.objiWhiz.pointInEntity(contextObj.commonDwgServices.grossHandle, xPos, yPos, function (returnCode, isInside) {
                    contextObj.objiWhiz.getHandleWithDWGPoint(xPos, yPos, contextObj.isSpace, function (retnCode, strSpaceHandle) {
                        if (isInside) {
                            spaceId = contextObj.getSpaceIdFromSpaceHandle(strSpaceHandle);
                            if (currentSpace == spaceId) {
                                resCallback(0, spaceId, xPos, yPos);
                            }
                            else {
                                contextObj.notificationServices.ShowToaster("Selected Workspace cannot be moved to another Space", 3);
                                contextObj.moveSeatToCurrentSpace(currentSpace, resCallback);
                            }
                        }
                        else {
                            contextObj.notificationServices.ShowToaster("Selected Workspace cannot be moved to another Space", 3);
                            contextObj.moveSeatToCurrentSpace(currentSpace, resCallback);
                        }
                    });
                });
            }
            else
                resCallback(retCode)
        });
    }
    updateSeatXYPos = function (seatId, selectedSymbolhandle, previousXCord, previousYCord, currentXCord, currentYCord, resCallback) {
        var contextObj = this;
        this.schedulingDrawingService.updateSeatXYPosition(seatId, currentXCord, currentYCord, contextObj.drawingId).subscribe(function (resultData) {
            var updatedSeatData = JSON.parse(resultData["Data"]);
            var midPoints = contextObj.getSeatXYCordinates(seatId);
            contextObj.objiWhiz.moveSymbol(selectedSymbolhandle, previousXCord, previousYCord, currentXCord, currentYCord, midPoints, function (returnCode, actualPoints, rtnMidPoints) {
                if (returnCode != 0) {
                    console.log("moveSymbol faild due to ", returnCode);
                    resCallback(0);
                }
                else {
                    contextObj.objiWhiz.getEntityExtents(selectedSymbolhandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                        if (retCode != 0) {
                            console.log("getEntityExtents faild due to ", retCode);
                            resCallback(0);
                        }
                        else {
                            var index = contextObj.seatsData.findIndex(function (el) { return el.Id === seatId });
                            if (index != -1)
                                contextObj.seatsData[index] = updatedSeatData[0];
                            index = contextObj.seatSymbolHandles.findIndex(function (el) { return el.Value === seatId });
                            if (index != -1)
                                contextObj.seatSymbolHandles[index].Key = selectedSymbolhandle;
                            resCallback(0);
                        }
                    });
                }
            });
        });
    }
    getSeatXYCordinates(seatId) {
        var xPos: number;
        var yPos: number;
        xPos = this.seatsData.find(function (el) { return el.Id === seatId })['XPosition'];
        yPos = this.seatsData.find(function (el) { return el.Id === seatId })['YPosition'];
        return xPos + this.colDelimiter + yPos;
        // return "(" + xPos + this.colDelimiter + yPos + ")";
    }
    ReserveRoomInDrawing = function (drawingId, resCallback) {
        //debugger;
        var contextObj = this;
        /* Checking the next customer and assign blnIsSpace value according to that */
        if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
            contextObj.blnIsSpace = false;
        }
        else {
            contextObj.blnIsSpace = true;
        }

        /* Checking whether scheduling space is there or not */
        //debugger;
        /* contextObj.schedulingDrawingService.CheckDrawingSeatingAssignmentType(drawingId).subscribe(function (resultData) {
            if (resultData!= "") {
                if (resultData["Data"] == true) { /* If no scheduling space 
                    contextObj.notificationServices.ClearAllToasts();
                    contextObj.notificationServices.ShowToaster("No Scheduling Spaces exist for this Floor", 3);
                    resCallback(1);
                }
                else { if scheduling space : Hatch it*/
        /* First get all sceduled space handles from db and hatch it */
        //debugger;
        contextObj.schedulingDrawingService.GetSpaceHandlesForScheduling(drawingId).subscribe(function (returnvalue) {
            if (returnvalue != "") {

                contextObj.schedulingSpaceHandles = [];
                contextObj.schedulingSpaceHandles = JSON.parse(returnvalue["Data"]["FieldBinderData"])
                // var spacehandlestring = contextObj.schedulingSpaceHandles.Join(contextObj.rowDelimiter);
                var spacehandlestring = "";
                for (var count = 0; count < contextObj.schedulingSpaceHandles.length; count++) {
                    spacehandlestring = spacehandlestring + contextObj.schedulingSpaceHandles[count].SpaceHandle + contextObj.rowDelimiter;
                }

                // contextObj.schedulingSpaceHandles=returnvalue.replace(contextObj.colDelimiter, contextObj.rowDelimiter);
                //contextObj.hatchScheduledSpace(contextObj.schedulingSpaceHandles, function (retCode) {

                //contextObj.objiWhiz.hatchEntity(contextObj.schedulingSpaceHandles, function (retCode) {
                contextObj.objiWhiz.hatchEntity("$HatchSingleEntity", spacehandlestring, 2, 0, 15, 2, false, function (retCode, entityHandle) {
                    //("$Hatch", strSpaceHandle, strHatchedHandle, g_intSearchResultHatchColorId, g_intSearchResultHatchAngle, g_intSearchResultHatchScale, g_intSearchResultHatchPatternId, False)
                    if (retCode != 0) {
                        resCallback(1); /* issue with - hatchScheduledSpace */
                    }
                    else { /*if hatch done properly*/
                        resCallback(0);/* for showing search confirmation message */

                    }
                });

            }
            else {
                contextObj.notificationServices.ClearAllToasts();
                contextObj.notificationServices.ShowToaster("No Team Room exist for this Floor", 3);
                resCallback(1); /* issue with - GetSpaceHandlesForScheduling */
            }
        });
        //resCallback(0);
        // }
        //    }
        //    else {
        //        resCallback(1); /* issue with - CheckDrawingSeatingAssignmentType */
        //    }

        //});


    }


    hatchScheduledSpace = function (SpaceHandles, resCallback) {
        // debugger;
        var contextObj = this;
        contextObj.objiWhiz.hatchEntity("$HatchSingleEntity", SpaceHandles, 2, 0, 15, 2, false, function (retCode, entityHandle) {

            resCallback(retCode);
        });
    }

    ReserveWithoutSearch = function (drawingId, SiteName, BuildingName, FloorName, resCallback) {
        debugger;
        var contextObj = this;
        contextObj.notificationServices.ClearAllToasts();
        if (contextObj.msgcount != 1)
            contextObj.notificationServices.ShowToaster("Select a Team Room", 3);
        contextObj.msgcount = 1;
        contextObj.objiWhiz.setCursor(2);
        contextObj.objiWhiz.getDWGPoint(function (returnCode, dXCoord, dYCoord) {
            /*debugger;*/
            if (returnCode != 0) {
                resCallback(1); /*console.log('Failure: getDWGPoint------------------------' + returnCode);*/
            }
            else {
                debugger;
                contextObj.ScheduleSpacePermission(dXCoord, dYCoord, drawingId, SiteName, BuildingName, FloorName, function (spaceId) {
                    if ((spaceId != 0) && (spaceId != null) && (spaceId != undefined) && (spaceId != "")) {
                        contextObj.GetSpaceHandleFromSpaceId(spaceId, function (strSpaceOrNetHandle) {
                            if (strSpaceOrNetHandle != "") {
                                var index = contextObj.schedulingSpaceHandles.findIndex(function (el) { return el.SpaceHandle == strSpaceOrNetHandle });
                                if (index != -1) {
                                    contextObj.deHatchSchedulingArea(function (retCode) {
                                        if (retCode == 0) {
                                            contextObj.objiWhiz.hatchEntity("$HatchSingleEntity", strSpaceOrNetHandle, 2, 0, 15, 2, false, function (retCode, entityHandle) {
                                                if (retCode == 0) {
                                                    contextObj.objiWhiz.setCursor(1);
                                                    contextObj.notificationServices.ClearAllToasts();
                                                    resCallback(0);

                                                }
                                            });
                                        }
                                    });
                                }
                                else {
                                    contextObj.notificationServices.ClearAllToasts();
                                    contextObj.notificationServices.ShowToaster("Click inside the Team Room you wish to select", 3);
                                    contextObj.ReserveWithoutSearch(drawingId, SiteName, BuildingName, FloorName);
                                    //resCallback(1);/* Issue with GetSpaceHandleFromSpaceId */
                                    resCallback(0);
                                }
                            }
                        });

                    }
                    else {
                        resCallback(1);/* Issue with ScheduleSpacePermission */
                    }

                });
            }
        });

    }


    ScheduleSpacePermission = function (MaxX, MaxY, drawingId, SiteName, BuildingName, FloorName, resCallback) {
        // debugger;
        var contextObj = this;
        var dblSpaceId = 0;
        var UserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
        contextObj.g_blnModuleAdmin = contextObj.commonDwgServices.isModuleAdmin;
        if (contextObj.drawingCategoryId == 1) { //archetectual    drawing    
            contextObj.g_blnAllowMultipleSelection = true;
            //debugger;
            contextObj.CheckPermissionForSelectedPoint(MaxX, MaxY, drawingId, SiteName, BuildingName, FloorName, function (strSpaceOrNetHandle) {
                //debugger;
                contextObj.g_blnAllowMultipleSelection = false;
                if (strSpaceOrNetHandle == "-1" || strSpaceOrNetHandle == null || strSpaceOrNetHandle == undefined) {
                    contextObj.blnPermittedSpace = false;
                    resCallback(0);
                }
                else {
                    // debugger;
                    if (strSpaceOrNetHandle != "0" && strSpaceOrNetHandle != null && strSpaceOrNetHandle != undefined) {
                        contextObj.GetSpaceIdFromHandle(strSpaceOrNetHandle, function (SpaceId) {
                            //debugger;
                            if (SpaceId != null && SpaceId != undefined && SpaceId != 0)
                                dblSpaceId = SpaceId;
                            else
                                dblSpaceId = 0;
                            resCallback(dblSpaceId);
                        });

                    }
                    else {
                        //contextObj.blnPermittedSpace = true;
                        dblSpaceId = 0
                        resCallback(0);
                    }
                    //debugger;
                    contextObj.blnPermittedSpace = true;
                }
            });
        }
        else { //utility    drawing
            if (UserRoleId == 4 || UserRoleId == 7) {
                contextObj.notificationServices.ClearAllToasts();
                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space, Select another space", 3);
                contextObj.blnPermittedSpace = false;
                dblSpaceId = 0;
            }
            else if (UserRoleId == 6 || contextObj.g_blnModuleAdmin == false) {
                contextObj.notificationServices.ClearAllToasts();
                contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space, Select another space", 3);
                contextObj.blnPermittedSpace = false;
                dblSpaceId = 0;
            }
            else {
                contextObj.blnPermittedSpace = false;
                dblSpaceId = 1;
            }
            resCallback(dblSpaceId);
        }
        //debugger;

    }



    /*Permission for the selected point*/
    CheckPermissionForSelectedPoint = function (MaxX, MaxY, drawingId, SiteName, BuildingName, FloorName, rescallBack) {
        //debugger;
        var contextObj = this;
        /*var blnIsSpace: boolean;*/
        var strLayerName: string;
        var blnEditPermission: boolean = false;
        var g_intUserRoleId: number = contextObj.commonDwgServices.sessionUserRoleId;
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
                    //debugger;
                    contextObj.objiWhiz.getHandleWithDWGPoint(MaxX, MaxY, contextObj.blnIsSpace, function (IsSpace, strSpaceOrNetHandle) {

                        if ((strSpaceOrNetHandle != null) && (strSpaceOrNetHandle != "")) {

                            contextObj.strCheckPermissionForSelectedPoint = strSpaceOrNetHandle;
                            contextObj.objiWhiz.setLayerVisibility(strLayerName, blnLayerIsVisible[0], function (returnCode) {

                                if (returnCode == 0) {
                                    if (g_intUserRoleId > 3) {

                                        contextObj.checkEditPermissionforTheSelectedSpace(strSpaceOrNetHandle, function (blnEditPermission) {

                                            contextObj.notificationServices.ClearAllToasts();
                                            if (blnEditPermission == false) {
                                                contextObj.notificationServices.ClearAllToasts();
                                                contextObj.notificationServices.ShowToaster("You do not have the privilege to place the asset to the selected space. Select another space", 3);
                                                contextObj.strCheckPermissionForSelectedPoint = "0";
                                                rescallBack(contextObj.strCheckPermissionForSelectedPoint);
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
                            contextObj.notificationServices.ShowToaster("Click inside the space you wish to select", 3);
                            //contextObj.notificationServices.ShowToaster("You do not have the privilege to edit the data of the selected space", 3);
                            contextObj.ReserveWithoutSearch(drawingId, SiteName, BuildingName, FloorName);
                            //  rescallBack("0");
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

    }


    /*Edit permission for the selected user */
    //checkEditPermissionforTheSelectedSpace = function (strSpaceHandle, resCallback) {
    //    //debugger;
    //    var contextObj = this;
    //    var dataString: string = "";
    //    var orgUnitIds: any[] = [];
    //    var selectedOrgunitId: number;
    //    // var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.BomaHandle === strSpaceHandle });
    //    var index = -1;
    //    if (contextObj.blnIsSpace)
    //        index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.BomaHandle === strSpaceHandle });
    //    else
    //        index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.CarpetHandle === strSpaceHandle });

    //    if (index != -1) {
    //        selectedOrgunitId = contextObj.spaceOpenDrawingObj.spaceData[index]['OrgUnitID'];
    //    }
    //    else
    //        resCallback(false);
    //    // var selectedOrgUnitId = strSpaceHandle
    //    //debugger;
    //    if (selectedOrgunitId != null) {
    //        contextObj.assetsDrawingService.getUserEditableOrgUnits().subscribe(function (resultData) {
    //            if (resultData != "") {
    //                dataString = JSON.parse(resultData["Data"].FieldBinderData)[0].Handles;
    //                orgUnitIds = dataString.split(contextObj.rowDelimiter);
    //                orgUnitIds.pop();
    //                if (orgUnitIds.some(function (el) { return el === selectedOrgunitId }))
    //                    resCallback(true);
    //                else
    //                    resCallback(false);
    //            }


    //        });
    //    }
    //    else
    //        resCallback(false);
    //}



    /*Get space id by providing space handle*/
    GetSpaceIdFromHandle = function (strSpaceHandle, resCallback) {
        //debugger;
        var contextObj = this;
        if (contextObj.blnIsSpace == false) { /*blnIsSpace false - Carpet  else boma*/

            var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.CarpetHandle === strSpaceHandle });
            if (index != -1)
                contextObj.spaceId = contextObj.spaceOpenDrawingObj.spaceData[index]['SpaceId'];
            else
                contextObj.spaceId = 0;

        }
        else {
            var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.BomaHandle === strSpaceHandle });
            if (index != -1)
                contextObj.spaceId = contextObj.spaceOpenDrawingObj.spaceData[index]['SpaceId'];
            else
                contextObj.spaceId = 0;
        }

        if (contextObj.spaceId == null || contextObj.spaceId == undefined)
            contextObj.spaceId = 0;
        resCallback(contextObj.spaceId);
    }


    /*Get space handle by providing space Id*/
    GetSpaceHandleFromSpaceId = function (spaceId, resCallback) {
        //debugger;
        var contextObj = this;
        var spaceHandle: string = "";
        var index = contextObj.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === spaceId });
        if (index != -1) {
            if (contextObj.commonDwgServices.g_IsNetCustomer == true) {
                contextObj.blnIsSpace = false;
            }
            else {
                contextObj.blnIsSpace = true;
            }
            if (contextObj.blnIsSpace) {                                      /*blnIsSpace false - Carpet  else boma*/
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
    }


    deHatchSchedulingArea = function (resCallback) {
        var contextObj = this;
        contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$HatchSingleEntity", function (retCode) {
            contextObj.objiWhiz.removeMaps();
            resCallback(retCode);
        });
    }

    reserveRoomWithoutSearch = function (resCallback) {
        var contextObj = this;
        //  contextObj.notificationServices.ClearAllToasts();
        // if (contextObj.msgcount != 1)
        //    contextObj.notificationServices.ShowToaster("Select a Team Room", 2);
        //  contextObj.msgcount = 1;
        contextObj.objiWhiz.setCursor(2);
        contextObj.objiWhiz.getDWGPoint(function (returnCode, dXCoord, dYCoord) {
            if (returnCode == 0) {
                contextObj.objiWhiz.pointInEntity(contextObj.commonDwgServices.grossHandle, dXCoord, dYCoord, function (returnCode, isInside) {
                    if (isInside) {
                        contextObj.deHatchSchedulingArea(function (retCode) {
                            contextObj.objiWhiz.getHandleWithDWGPoint(dXCoord, dYCoord, contextObj.isSpace, function (retCode, strSpaceHandle) {
                                var spaceId = contextObj.getSpaceIdFromSpaceHandle(strSpaceHandle);
                                if (spaceId != -1) {
                                    var spaceDataItem = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId === spaceId });
                                    // if (contextObj.g_blnModuleAdmin == false) {
                                    //contextObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {
                                    //    if (blnEditPermission) {
                                    contextObj.checkSelectedSpaceAssignmentType(spaceId, spaceDataItem, strSpaceHandle, function (returnCode) {
                                        resCallback(returnCode, spaceDataItem);
                                    });
                                } else {
                                    contextObj.notificationServices.ClearAllToasts();
                                    contextObj.notificationServices.ShowToaster("You do not have edit permission for the selected space", 5);
                                    resCallback(1);
                                    //  contextObj.reserveRoomWithoutSearch(resCallback);
                                }

                                //} else {
                                //    contextObj.notificationServices.ClearAllToasts();
                                //    contextObj.notificationServices.ShowToaster("You do not have edit permission for the selected space", 5);
                                //    contextObj.reserveRoomWithoutSearch(resCallback);
                                //}
                                //});
                                //} else {
                                //    contextObj.checkSelectedSpaceAssignmentType(spaceId, spaceDataItem, strSpaceHandle, function (returnCode) {
                                //        resCallback(returnCode, spaceDataItem);
                                //    });
                                //}
                            });

                        });
                    } else {
                        contextObj.notificationServices.ShowToaster("Click inside the space you wish to select", 2);
                        contextObj.reserveRoomWithoutSearch(resCallback);
                    }
                });
            }
            else {
                contextObj.deHatchSchedulingArea(function (retCode) {
                    resCallback(1);
                });
            }
        });

    }
    hatchSeat = function (symbolHandle, resCallback) {
        var contextObj = this;
        var mapHandle = [symbolHandle];
        var rgbColor = [[255, 255, 255]];
        contextObj.objiWhiz.removeMaps();
        contextObj.objiWhiz.createMap(mapHandle, rgbColor, function (retCode) {
            resCallback(retCode);
        });

        //contextObj.objiWhiz.hatchEntity("$HatchSingleEntity", symbolHandle, 7, 1, 1, 1, false, function (retCode, entityHandle) {
        //    contextObj.objiWhiz.setApplicationLayer("$HatchSingleEntity");
        //    if (retCode != 0)
        //        console.log("hatchEntity failed due to ", retCode);
        //    resCallback(retCode);
        //});
    }
    checkSelectedSpaceAssignmentType(spaceId, spaceDataItem, strSpaceHandle, resCallback) {
        var contextObj = this;
        var roomNo = spaceDataItem['Room No.'];
        if (roomNo == "" || roomNo == null) {
            contextObj.notificationServices.ShowToaster("Selected Space has no Room Number", 5);
            resCallback(1);
        }
        else {
            contextObj.schedulingDrawingService.checkReservationSeatingAssignmentType(spaceId).subscribe(function (resultData) {
                if (resultData['Data']) {
                    contextObj.hatchScheduledSpace(strSpaceHandle, function (returnCode) {
                        resCallback(returnCode);
                    });
                }
                else {
                    contextObj.notificationServices.ClearAllToasts();
                    contextObj.notificationServices.ShowToaster("Selected Space is not assigned as Scheduling Space", 2);
                    resCallback(1);
                }
            });
        }
    }
    checkEditPermissionforTheSelectedSpace = function (spaceId, resCallback) {
        var contextObj = this;
        contextObj.schedulingDrawingService.checkEditPrivilageExist(spaceId).subscribe(function (resultData) {
            if (resultData.ServerId > 0)
                resCallback(true);
            else
                resCallback(false);
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
    getSeatHandleFromSeatId(seatId: string) {
        var index = this.seatSymbolHandles.findIndex(function (el) { return el.Value == seatId });
        var handle: string = "";
        if (index != -1)
            handle = this.seatSymbolHandles[index].Key;
        else
            handle = index.toString();
        return handle;
    }
    getSeatIdFromHandle(handle: string) {
        var index = this.seatSymbolHandles.findIndex(function (el) { return el.Key == handle });
        var seatId: number;
        if (index != -1)
            seatId = +this.seatSymbolHandles[index].Value;
        else
            seatId = index;
        return seatId;
    }
    getSpaceAssignmentType(spaceId: number) {
        var assignmentType;
        var index;
        index = this.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId === spaceId });
        if (index != -1)
            assignmentType = this.spaceOpenDrawingObj.spaceData[index]['SeatingAssignmentTypeId'];
        else
            assignmentType = index;
        return assignmentType;
    }
    checkIsHotelingSeat(symbolHandle: string) {
        var check: boolean = false;
        var index;
        index = this.seatSymbolHandles.findIndex(function (el) { return el.Key == symbolHandle });
        if (index != -1) {
            var seatId = this.seatSymbolHandles[index].Value;
            index = this.seatsData.findIndex(function (el) { return el.Id == seatId })
            if (index != -1) {
                check = this.seatsData[index]['IsHotelingSeats'];
                if (this.IsProxyReservationEnabled == false) {
                    var assignmentType = this.seatsData[index]['SeatingAssignmentTypeId'];
                    if (check == true && assignmentType == 6)
                        check = false;
                }
            }
        }
        return check;
    }
    checkIsHotelingSeatFromSeatId(seatId: number) {
        var check: boolean = false;
        var index;
        index = this.seatsData.findIndex(function (el) { return el['Id'] == seatId });
        if (index != -1) {
            check = this.seatsData[index]['IsHotelingSeats'];
            if (this.IsProxyReservationEnabled == false) {
                var assignmentType = this.seatsData[index]['SeatingAssignmentTypeId'];
                if (check == true && assignmentType == 6)
                    check = false;
            }

        }
        return check;
    }

    assignHotelingSeat = function (spaceDataItem, DrawingId, ModuleId, resCallback) {

        var contextObj = this;
        // var spaceDataItem = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId ===spaceId });
        var spaceAssignmentType = spaceDataItem['SeatingAssignmentTypeId']; //contextObj.getSpaceAssignmentType(spaceId)
        // var spaceDataItem = contextObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId === spaceId });
        var roomNo = spaceDataItem['Room No.'];
        if (roomNo == "" || roomNo == null) {
            // contextObj.notificationServices.ShowToaster("Room No. is mandatory for assigning Hoteling Seat(s)", 5);
            resCallback(-1);
        }
        else if (spaceAssignmentType != null)
            resCallback(-2);
        else {
            var roomseatCapacity = spaceDataItem['MaximumSeats'];//contextObj.seatsData.length;    
            //if (roomseatCapacity <= 0 || isNaN(roomseatCapacity) == true) {
            //    contextObj.notificationService.ShowToaster("Room Seating Capacity should be greater than zero", 2);
            //    resCallback(-2);
            //};

            contextObj.spaceService.AssignHotellingSeatToSpace(spaceDataItem['SpaceId'], undefined, DrawingId, ModuleId, true).subscribe(function (resultData) {

                resCallback(0, resultData);
            });
        }
    }
    checkAddSeatPossible = function (spaceId: number, resCallback) {
        var index;
        var spacedataItem;
        index = this.spaceOpenDrawingObj.spaceData.findindex(function (el) { el.SpaceId === spaceId });
        if (index != -1)
            spacedataItem = this.spaceOpenDrawingObj.spaceData[index];
        var assignmentTypeId = spacedataItem['SeatingAssignmentTypeId'];
        if (assignmentTypeId == null || assignmentTypeId == undefined || assignmentTypeId == undefined || assignmentTypeId == 1 || assignmentTypeId == 5)
            resCallback(0, assignmentTypeId, spacedataItem['Room No.'], spacedataItem['Seating Capacity']);
        else if (assignmentTypeId == 2)
            resCallback(1);
        else if (assignmentTypeId == 4)
            resCallback(2);

    }
    getSpaceIdsFromHandle(selectedSymHandle) {
        var seatId = this.getSeatIdFromHandle(selectedSymHandle);
        var spaceId: number = 0;
        var index = this.seatsData.findIndex(function (el) { return el['Id'] == seatId })
        if (index != -1)
            spaceId = this.seatsData[index]['SpaceId'];
        return spaceId
    }
    getSeatIdsFromSpaceId(spaceId) {
        var seatIds = [];
        for (var item of this.seatsData) {
            if (item['SpaceId'] == spaceId)
                seatIds.push(item['Id'])
        }
        return seatIds;
    }
    getSpaceIdFromSeatId(seatId) {
        var spaceId: number = 0;
        var index = this.seatsData.findIndex(function (el) { return el['Id'] == seatId })
        if (index != -1)
            spaceId = this.seatsData[index]['SpaceId'];
        return spaceId
    }
    searchInDrawing(searchData, resCallback) {
        var selectedSpaceHandles: any[] = [];
        for (var spaceItem of searchData) {
            var index = this.spaceOpenDrawingObj.spaceData.findIndex(function (el) { return el.SpaceId == spaceItem['SpaceId'] });
            if (index != -1)
                selectedSpaceHandles.push(this.spaceOpenDrawingObj.getHandleFromSpaceId(this.spaceOpenDrawingObj.spaceData[index]['SpaceId']));

        }
        this.objiWhiz.removeBlinkers();
        this.objiWhiz.blinkEntitiesByHandles(selectedSpaceHandles, this.blinkColorCodeR, this.blinkColorCodeG, this.blinkColorCodeB, this.commonDwgServices.blinkSize, this.commonDwgServices.blinkDelay, function (returnCode) {
            resCallback(selectedSpaceHandles);
        });
    }
    deleteSeatsDeassign(spaceId) {

        var contextObj = this;
        var oldSeatsFullData = contextObj.seatsData;
        var oldSeatsData: any[] = [];
        oldSeatsData = oldSeatsFullData.filter(function (item) {
            return (item.SpaceId == spaceId);
        });
        var currentHandles: string = "";
        var indexArray = [];
        for (var item of contextObj.seatSymbolHandles) {
            if (oldSeatsData.some(function (el) { return el.Id === item.Value })) {
                currentHandles += item.Key + contextObj.rowDelimiter;
                indexArray.push(contextObj.seatSymbolHandles.findIndex(function (el) { return el['Key'] == item.Key }));
            }
        }
        for (var item1 of indexArray) {
            contextObj.seatSymbolHandles.splice(+item1, 1)
        }
        if (currentHandles != "") {
            contextObj.objiWhiz.deleteEntity(currentHandles, function (retCode) {
                if (retCode == 0) {
                    contextObj.objiWhiz.releaseSymbol(currentHandles, function (retCode) {
                        if (retCode == 0) {
                        }
                    });

                }
            });
        }
    }
    isSchedulingSpaceExist() {
        var check: boolean = true;
        check = this.spaceOpenDrawingObj.spaceData.some(function (el) { return el['SeatingAssignmentTypeId'] == 4 });
        return check;
    }
    //checkSpaceIsAssignable(spaceId: number) {
    //    var check: boolean = false;
    //    var index;
    //    index = this.spaceOpenDrawingObj.spaceData.findindex(function (el) { el.SpaceId === spaceId });
    //    if (index != -1) {
    //        if (this.spaceOpenDrawingObj.spaceData[index]['SeatingAssignmentTypeId'] == 4)//4 scheduling
    //            check = true;
    //    }
    //    return check;
    //}
}
export interface DataForDrawing {
    Key: string;
    Value: string;
}
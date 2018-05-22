var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var drawingview_component_1 = require('../../../Framework/Whatever/Drawing/drawingview.component');
var drawingtooltip_component_1 = require('../../common/opendrawing/drawingtooltip.component');
var schedulingopendrawing_service_1 = require('../../scheduling/drawings/schedulingopendrawing.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var http_1 = require('@angular/http');
var General_1 = require('../../../Models/Common/General');
var reserveroom_component_1 = require('../room booking/reserveroom.component');
var reserveseatwithscheduler_component_1 = require('../Seat Booking/reserveseatwithscheduler.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var listboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var contextmenu_component_1 = require('../../../Framework/Whatever/contextmenu/contextmenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var reserveroomfromdrawing_component_1 = require('../../scheduling/drawings/reserveroomfromdrawing.component');
var bookseat_component_1 = require('../../scheduling/seat booking/bookseat.component');
var scheduling_service_1 = require('../../../models/scheduling/scheduling.service');
var ReserveRoomSchedulingOpenDrawing = (function () {
    function ReserveRoomSchedulingOpenDrawing(notificationService, http, schedulingService) {
        this.notificationService = notificationService;
        this.http = http;
        this.schedulingService = schedulingService;
        this.outDrawingobject = new core_1.EventEmitter();
        this.revisionNo = -1;
        this.drawingType = 1;
        this.drawingCategoryId = 1;
        this.moduleId = 14;
        this.isTooltipEnable = true;
        this.tooltipVisibility = false;
        this.contextMenuVisibility = false;
        this.contextMenuData = [];
        this.exportMenu = [];
        this.saveAsMenu = [];
        this.visibilityOfExportMenu = "hidden";
        this.visibilityOfSaveAsMenu = "hidden";
        this.showLayer = false;
        this.layerList = [];
        this.defaultChkbxIsChecked = true;
        this.isSpace = true;
        this.dwgDetails = "";
        this.splitviewDrawing = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.isOpenFinished = false;
        this.pageTitle = "";
        this.isRoomBookingEnabled = true;
        this.isSeatBookingEnabled = true;
        this.reserveRoomStyle = 'reserveRoomFullView';
        this.isViewIconShow = true;
        this.isViewDrawing = false;
        this.openDrawingOneTime = false;
        this.isShow = true;
        this.isFromRoom = false;
        this.blinkColorCodeR = 255;
        this.blinkColorCodeG = 0;
        this.blinkColorCodeB = 0;
        this.blinkSize = 10;
        this.blinkDelay = 500;
        this.drawingLabelShow = "Show Drawing";
        this.drawingLabelHide = "Hide Drawing";
        this.displayDrawing = function (resCallback) {
            var contextObj = this;
            contextObj.objiWhiz.zoomExtents(function (ret) {
                if (ret == 0) {
                    contextObj.objiWhiz.display(function () {
                        var loading_indicator = document.getElementById('loading-indicator');
                        loading_indicator.style.display = "none";
                        resCallback(0);
                    });
                }
                else
                    resCallback(0);
            });
        };
        // Drawing layer dialog
        this.addLayers = function (resCallback) {
            var contextObj = this;
            var layerMultiFieldValues = [];
            contextObj.objiWhiz.getAllLayers(function (returnCode, layers) {
                var allLayersArray = [];
                allLayersArray = layers.split(contextObj.rowDelimiter);
                allLayersArray.pop();
                var layerLookUpArray = [];
                contextObj.layerNameLength = allLayersArray.length;
                for (var index = 0; contextObj.layerNameLength > index; index++) {
                    var isVisible = [0];
                    var layerName = allLayersArray[index];
                    var returnCode = contextObj.objiWhiz.getLayerVisibility(layerName, isVisible);
                    if (returnCode != 0) {
                    }
                    layerLookUpArray.push({ Id: index, Value: layerName });
                    if (isVisible[0]) {
                        layerMultiFieldValues.push(index.toString());
                    }
                }
                contextObj.layerList[0] =
                    {
                        FormFieldId: null, FieldId: null,
                        ReportFieldId: 1, FieldLabel: null,
                        DataEntryControlId: 7,
                        GenericDataTypeId: 6,
                        Whitelist: { Id: 3, FormatString: null, RegularExpression: "^ [a - zA - Z0 - 9!@#$ %&()/+=\s\:.,?_ -]+$" },
                        FieldValue: null, MultiFieldValues: layerMultiFieldValues, IsValidated: true, IsMultivalued: true, LookupDetails: { LookupValues: layerLookUpArray, PopupComponent: null },
                        IsMandatory: false, IsVisible: true, IsEnabled: true, ReadOnlyMode: false, NotificationType: null, Precision: null,
                        Scale: null, Height: null, IsSigned: false, RangeFrom: null, RangeTo: null, HelpText: null,
                        IsGrouped: false, HasChild: null, ParentId: null, IsSubField: null, isContentHtml: null, Width: "295"
                    };
                contextObj.getDefaultChkBoxChecked(layerMultiFieldValues);
                resCallback(0);
            });
        };
        this.hatchSpaces = function (resCallback) {
            var contextObj = this;
            var selectedHandle = this.spaceObj.getHandleFromSpaceId(this.selectedSpaceId);
            contextObj.objiWhiz.hatchEntity("$Hatch", selectedHandle, 92, 10, 5, 5, false, function (retCode, entityHandle) {
                if (retCode != 0) {
                    console.log("hatchEntity failed due to ", retCode);
                }
                else {
                    selectedHandle = "";
                    for (var _i = 0, _a = contextObj.listData; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item['SpaceId'] != contextObj.selectedSpaceId) {
                            //if (contextObj.schedulingDrawingObj.commonDwgServices.sessionUserRoleId >= 3) {
                            //    contextObj.checkEditPermissionforTheSelectedSpace(item['SpaceId'], function (blnEditPermission) {
                            //        if (blnEditPermission)
                            //            selectedHandle += contextObj.spaceObj.getHandleFromSpaceId(item['SpaceId']) + contextObj.rowDelimiter;
                            //    });
                            //}
                            //else
                            selectedHandle += contextObj.spaceObj.getHandleFromSpaceId(item['SpaceId']) + contextObj.rowDelimiter;
                        }
                    }
                    contextObj.objiWhiz.hatchEntity("$Hatch", selectedHandle, 2, 10, 5, 5, false, function (retCode, entityHandle) {
                        resCallback(0);
                    });
                }
            });
        };
        this.blinkSpaceFirstTime = function (resCallback) {
            debugger;
            var selectedHandle;
            if (this.pageTarget == 3) {
                if (this.isFromRoom)
                    selectedHandle = [this.schedulingDrawingObj.getSeatHandleFromSeatId(this.selectedData['Seat Id'])];
                else
                    selectedHandle = [this.schedulingDrawingObj.getSeatHandleFromSeatId(this.selectedData['SeatId'])];
            }
            else if (this.pageTarget == 1) {
                selectedHandle = [this.spaceObj.getHandleFromSpaceId(this.selectedData['SpaceId'])];
            }
            this.objiWhiz.removeBlinkers();
            this.objiWhiz.blinkEntitiesByHandles(selectedHandle, this.blinkColorCodeR, this.blinkColorCodeG, this.blinkColorCodeB, this.blinkSize, this.blinkDelay, function (returnCode) {
                resCallback();
            });
        };
        var delimiter = new General_1.Delimeter();
        this.columnDelimiter = delimiter.ColumnDelimeter;
        this.rowDelimiter = delimiter.RowDelimeter;
    }
    ReserveRoomSchedulingOpenDrawing.prototype.ngOnInit = function () {
        this.dwgDetails = this.selectedData.Site + " / " + this.selectedData.Building + " / " + this.selectedData.Floor;
        this.selectedSpaceId = this.selectedData['SpaceId'];
        this.exportMenu.push({ menuId: 0, menuName: "BMP" }, { menuId: 1, menuName: "DWF" }, { menuId: 2, menuName: "DXB" }, { menuId: 3, menuName: "DXF" }, { menuId: 4, menuName: "JPEG" }, { menuId: 5, menuName: "PDF" }, { menuId: 6, menuName: "SVG" });
        this.saveAsMenu.push({ menuId: 0, menuName: "AutoCAD 2013" }, { menuId: 1, menuName: "AutoCAD 2010" }, { menuId: 2, menuName: "AutoCAD 2007" }, { menuId: 3, menuName: "AutoCAD 2004" }, { menuId: 4, menuName: "AutoCAD 2000" }, { menuId: 5, menuName: "Release 14" }, { menuId: 6, menuName: "Release 13" }, { menuId: 7, menuName: "Release 12" });
        this.contextMenuData.push({ menuId: 0, menuName: "Pan" }, { menuId: 1, menuName: "Zoom In" }, { menuId: 2, menuName: "Zoom Out" }, { menuId: 3, menuName: "Zoom Window" }, { menuId: 4, menuName: "Zoom Extents" }, /*{ menuId: 5, menuName: "Zoom Previous" },*/ { menuId: 6, menuName: "Layers" });
        if (this.isFromRoomClick)
            this.viewDrawingOnclick();
        this.checkSubscribedFeatures();
    };
    ReserveRoomSchedulingOpenDrawing.prototype.checkSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('276').subscribe(function (result) {
            debugger;
            if (result["Data"][0]["IsSubscribed"] == true) {
                contextObj.drawingLabelShow = "Show " + result["Data"][0].Value;
                contextObj.drawingLabelHide = "Hide " + result["Data"][0].Value;
            }
        });
    };
    ReserveRoomSchedulingOpenDrawing.prototype.getObject = function (event) {
        var contextObj = this;
        var handler;
        console.log("layerList2", contextObj.layerList);
        contextObj.objiWhiz = event["objiWhiz"];
        contextObj.canvasElement = event["canvas"];
        contextObj.layerNames = event['layers'];
        contextObj.schedulingDrawingObj = new schedulingopendrawing_service_1.SchedulingOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.drawingCategoryId, 1, contextObj.notificationService, contextObj.http);
        contextObj.schedulingDrawingObj.initilizeObjects(function (retCode) {
            contextObj.spaceObj = contextObj.schedulingDrawingObj.spaceOpenDrawingObj;
            contextObj.isSpace = contextObj.schedulingDrawingObj.spaceOpenDrawingObj.commonServices.isSpace;
            //contextObj.schedulingDrawingObj.spaceOpenDrawingObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
            //    contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName;
            //});
        });
        contextObj.objiWhiz.addEvent("tooltipHandler", handler = function (outputs) {
            var bomaHandle = outputs[0];
            contextObj.tooltipVisibility = false;
            console.log("contextObj.tooltipData", outputs);
            contextObj.schedulingDrawingObj.getTooltipData(bomaHandle, function (retCode, tooltiDataValues) {
                if (retCode) {
                    //console.log("contextObj.tooltipData", tooltiDataValues);
                    //contextObj.tooltipXPosition = outputs[1];
                    //contextObj.tooltipYPosition = outputs[2];
                    //contextObj.tooltipVisibility = true;
                    //contextObj.tooltipData = tooltiDataValues;
                    var event = document.createEvent("CustomEvent");
                    event.initCustomEvent('TooltipEvent', true, true, { 'xPos': outputs[1], 'yPos': outputs[2], 'tooltipValue': tooltiDataValues });
                    document.dispatchEvent(event);
                    contextObj.tooltipVisibility = true;
                }
                else
                    contextObj.tooltipVisibility = false;
            });
        });
        contextObj.objiWhiz.setTooltipPriority("1023");
        contextObj.objiWhiz.addEvent("mouseDown", function (outputs) {
            console.log("<br />currentX : " + outputs[0] + "<br />currentY : " + outputs[1] + "handle :" + outputs[2]);
            if (outputs[2] == "2") {
                contextObj.isTooltipEnable = false;
                contextObj.contextMenuVisibility = false;
                contextObj.contextMenuXPosition = outputs[0];
                contextObj.contextMenuYPosition = outputs[1];
                contextObj.contextMenuVisibility = true;
                var evnt = document.createEvent("CustomEvent");
                evnt.initCustomEvent('ContextMenuEvent', true, true, { 'xPos': outputs[0], 'yPos': outputs[1] });
                document.dispatchEvent(evnt);
            }
            else {
                contextObj.isTooltipEnable = true;
                contextObj.showLayer = false;
                contextObj.contextMenuVisibility = false;
                var evnt = document.createEvent("CustomEvent");
                evnt.initCustomEvent('ContextMenuEvent', true, true, { 'xPos': 0, 'yPos': 0 });
                document.dispatchEvent(evnt); // to hide context menu
                contextObj.objiWhiz.removeBlinkers();
            }
        });
    };
    ReserveRoomSchedulingOpenDrawing.prototype.afterDrawingOpen = function () {
        var contextObj = this;
        if (!contextObj.spaceObj || !contextObj.spaceObj.commonServices) {
            setTimeout(function () {
                contextObj.afterDrawingOpen();
            }, 50);
        }
        else {
            contextObj.schedulingDrawingObj.showDataInDrawing("bothData", function (retCode) {
                contextObj.displayDrawing(function (retcode) {
                    contextObj.blinkSpaceFirstTime(function (res) {
                        if (contextObj.pageTarget == 2 || contextObj.pageTarget == 3) {
                            contextObj.isSeatBookingEnabled = contextObj.spaceObj.commonServices.isSeatBookingEnabled;
                            contextObj.isRoomBookingEnabled = contextObj.spaceObj.commonServices.isRoomBookingEnabled;
                            contextObj.spaceObj.commonServices.getFontStyles(function (retCode) {
                                contextObj.spaceObj.commonServices.getExtentPoints(function (retCode) {
                                    contextObj.isOpenFinished = true;
                                });
                            });
                        }
                        else {
                            contextObj.hatchSpaces(function (retCode) {
                                contextObj.isOpenFinished = true;
                            });
                        }
                    });
                });
            });
        }
        contextObj.outDrawingobject.emit({ "dwgObject": contextObj.objiWhiz });
    };
    ReserveRoomSchedulingOpenDrawing.prototype.contextMenuOnClick = function (event) {
        if (event) {
            var contextObj = this;
            contextObj.isTooltipEnable = true;
            contextObj.contextMenuVisibility = false;
            var evnt = document.createEvent("CustomEvent");
            evnt.initCustomEvent('ContextMenuEvent', true, true, { 'xPos': 0, 'yPos': 0 });
            document.dispatchEvent(evnt); // to hide context menu
            //console.log("context menu", event);
            switch (event.menuId) {
                case 0:
                    contextObj.objiWhiz.pan();
                    break;
                case 1:
                    contextObj.objiWhiz.zoomIn();
                    break;
                case 2:
                    contextObj.objiWhiz.zoomOut();
                    break;
                case 3:
                    contextObj.objiWhiz.zoomWindow();
                    break;
                case 4:
                    contextObj.objiWhiz.zoomExtents(function (ret) { });
                    break;
                //case 5: contextObj.objiWhiz.zoomWindow();
                //    break;
                case 6:
                    contextObj.addLayers(function (retCode) {
                        contextObj.showLayer = true;
                    });
                    break;
            }
        }
    };
    ReserveRoomSchedulingOpenDrawing.prototype.selectAllDefaultLayers = function (event, fieldObj) {
        var contextObj = this;
        if (event.target.checked == true) {
            this.layerList[0].MultiFieldValues.splice(0, this.layerList[0].MultiFieldValues.length);
            this.IsSelectAllLayerChecked = false;
            this.defaultChkbxIsChecked = true;
            if (this.layerList[0].LookupDetails.LookupValues != null) {
                if (this.isSpace) {
                    for (var i = 0; i < 4; i++) {
                        var iDrawingsLayes = [];
                        contextObj.objiWhiz.getAlliDrawingsLayers(iDrawingsLayes);
                        if (iDrawingsLayes.find(function (el) { return el === contextObj.layerList[0].LookupDetails.LookupValues[i].Value; }))
                            this.layerList[0].MultiFieldValues.push(i.toString());
                    }
                }
                else {
                    for (var i = 0; i < 2; i++) {
                        var isExist = [0];
                        contextObj.objiWhiz.layerExists(this.layerList[0].LookupDetails.LookupValues[i].Value, isExist);
                        if (isExist[0])
                            this.layerList[0].MultiFieldValues.push(i.toString());
                    }
                }
            }
        }
        else {
            this.defaultChkbxIsChecked = false;
            this.layerList[0].MultiFieldValues.splice(0, 4);
        }
        if (this.layerNameLength == this.layerList[0].MultiFieldValues.length)
            this.IsSelectAllLayerChecked = true;
        //else
        //    this.IsSelectAllLayerChecked = false;
    };
    ReserveRoomSchedulingOpenDrawing.prototype.layersSelectAllOnClick = function (event) {
        //if (event.chkevent)
        //    this.defaultChkbxIsChecked = true;
        //else
        this.defaultChkbxIsChecked = false;
    };
    ReserveRoomSchedulingOpenDrawing.prototype.singleLayerNameOnClick = function (event) {
        var isDefaultLayer;
        var layerArr = [];
        this.getDefaultChkBoxChecked(event.fieldObject.MultiFieldValues);
    };
    ReserveRoomSchedulingOpenDrawing.prototype.getDefaultChkBoxChecked = function (array) {
        var isDefaultLayer;
        var nNumLayers = 4;
        if (this.isSpace)
            nNumLayers = 4;
        else
            nNumLayers = 2;
        if (array.length > nNumLayers) {
            this.defaultChkbxIsChecked = false;
            return;
        }
        for (var i = 0; i < nNumLayers; i++) {
            isDefaultLayer = array.some(function (el) { return el == i; });
            if (isDefaultLayer != true) {
                this.defaultChkbxIsChecked = false;
                break;
            }
            if (isDefaultLayer)
                this.defaultChkbxIsChecked = true;
        }
    };
    // Drawing layer dialog Ok click
    ReserveRoomSchedulingOpenDrawing.prototype.OkLayersVisbility = function () {
        var layerName;
        var isLayerEnable;
        var contextObj = this;
        //console.log("ok", this.layerList)
        var layerStatus = "";
        var _loop_1 = function(item) {
            isLayerEnable = contextObj.layerList[0].MultiFieldValues.some(function (el) { return +el === item.Id; });
            if (isLayerEnable)
                layerStatus += item.Value + contextObj.columnDelimiter + "true" + contextObj.rowDelimiter;
            else
                layerStatus += item.Value + contextObj.columnDelimiter + "false" + contextObj.rowDelimiter;
        };
        for (var _i = 0, _a = contextObj.layerList[0].LookupDetails.LookupValues; _i < _a.length; _i++) {
            var item = _a[_i];
            _loop_1(item);
        }
        contextObj.objiWhiz.setLayersVisibility(layerStatus, function () {
            contextObj.showLayer = false;
        });
    };
    // Drawing layer dialog Cancel click
    ReserveRoomSchedulingOpenDrawing.prototype.CancelLayersVisbility = function () {
        this.showLayer = false;
    };
    // Drawing layer dialog close click
    ReserveRoomSchedulingOpenDrawing.prototype.closeShowLayer = function () {
        this.showLayer = false;
    };
    ReserveRoomSchedulingOpenDrawing.prototype.onContextMenu = function (event, item) {
        event.preventDefault();
    };
    //onResize(event: any) {
    //    //this.changeEvent =!this.changeEvent;
    //    console.log("resizeresizeresize");
    //    var status = [];
    //    if (this.objiWhiz != undefined) {
    //        this.objiWhiz.isWaitMode(status);
    //        if (status[0])
    //            this.objiWhiz.exitWaitMode();
    //        var contextObj = this;
    //        setTimeout(function () {
    //            var width, height;
    //            var canvas = contextObj.canvasElement;
    //            height = canvas.offsetHeight;//window.innerHeight - 56;
    //            var topOffset = window.innerHeight - height;
    //            contextObj.objiWhiz.resize(width, height);
    //        }, 50);
    //    }
    //}
    ReserveRoomSchedulingOpenDrawing.prototype.exportBtnMouseOver = function () {
        this.visibilityOfExportMenu = "visible";
    };
    ReserveRoomSchedulingOpenDrawing.prototype.exportBtnMouseOut = function () {
        this.visibilityOfExportMenu = "hidden";
    };
    ReserveRoomSchedulingOpenDrawing.prototype.saveAsBtnMouseOver = function () {
        this.visibilityOfSaveAsMenu = "visible";
    };
    ReserveRoomSchedulingOpenDrawing.prototype.saveAsBtnMouseOut = function () {
        this.visibilityOfSaveAsMenu = "hidden";
    };
    ReserveRoomSchedulingOpenDrawing.prototype.exportOnClick = function (event) {
        var contextObj = this;
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        this.visibilityOfExportMenu = "hidden";
        switch (event.menuId) {
            case 0:
                contextObj.objiWhiz.exportToBMP(function (returnCode) { });
                break;
            case 1:
                contextObj.objiWhiz.exportToDWF(1, function (returnCode) { });
                break;
            case 2:
                contextObj.objiWhiz.exportToDXB(1, function (returnCode) { });
                break;
            case 3:
                contextObj.objiWhiz.exportToDXF(1, function (returnCode) { });
                break;
            case 4:
                contextObj.objiWhiz.exportToJPEG(function (returnCode) { });
                break;
            case 5:
                contextObj.objiWhiz.exportToPDF(false, "", function (returnCode) { });
                break;
            case 6:
                contextObj.objiWhiz.exportToSVG(function (returnCode) { });
                break;
            case 14:
                contextObj.objiWhiz.exportToDXF(1, function (returnCode) { });
                break;
        }
    };
    ReserveRoomSchedulingOpenDrawing.prototype.saveAsOnClick = function (event) {
        var contextObj = this;
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        this.visibilityOfSaveAsMenu = "hidden";
        contextObj.objiWhiz.saveAs(true, event.menuId.toString(), function (returnCode) { });
    };
    ReserveRoomSchedulingOpenDrawing.prototype.getSchedulingData = function (data) {
        this.listData = data;
    };
    ReserveRoomSchedulingOpenDrawing.prototype.roomNoLinkOnClick = function (data) {
        this.isFromRoom = true;
        this.selectedData = data;
        this.selectedSpaceId = data['SpaceId'];
        if (this.isOpenFinished) {
            return;
            var selectedHandle;
            if (this.pageTarget == 3) {
                selectedHandle = [this.schedulingDrawingObj.getSeatHandleFromSeatId(data['SeatId'])];
            }
            else if (this.pageTarget == 1) {
                selectedHandle = [this.spaceObj.getHandleFromSpaceId(data['SpaceId'])];
            }
            this.objiWhiz.removeBlinkers();
            this.objiWhiz.blinkEntitiesByHandles(selectedHandle, this.blinkColorCodeR, this.blinkColorCodeG, this.blinkColorCodeB, this.blinkSize, this.blinkDelay, function (returnCode) {
            });
        }
        else {
            if (this.isViewDrawing == false)
                this.viewDrawingOnclick();
        }
    };
    ReserveRoomSchedulingOpenDrawing.prototype.onSelectionChange = function (data) {
        debugger;
        if (this.isOpenFinished) {
            var selectedHandle = [this.spaceObj.getHandleFromSpaceId(data['SpaceId'])];
            this.objiWhiz.removeBlinkers();
            this.objiWhiz.blinkEntitiesByHandles(selectedHandle, this.blinkColorCodeR, this.blinkColorCodeG, this.blinkColorCodeB, this.blinkSize, this.blinkDelay, function (returnCode) {
            });
        }
        else
            this.selectedData = data;
    };
    ReserveRoomSchedulingOpenDrawing.prototype.onSelectionChangeforseat = function (data) {
        debugger;
        if (this.isOpenFinished) {
            var selectedHandle = [this.schedulingDrawingObj.getSeatHandleFromSeatId(data['Seat Id'])];
            this.objiWhiz.removeBlinkers();
            this.objiWhiz.blinkEntitiesByHandles(selectedHandle, this.blinkColorCodeR, this.blinkColorCodeG, this.blinkColorCodeB, this.blinkSize, this.blinkDelay, function (returnCode) {
            });
        }
        else {
            this.selectedData = data;
            this.isFromRoom = true;
        }
    };
    /* Reserve a Room-- Scheduling : Module Id:17 */
    ReserveRoomSchedulingOpenDrawing.prototype.reserveRoomOnClick = function () {
        var contextObj = this;
        var isSearch = false;
        contextObj.spaceObj.deHatch(function (ret) {
            contextObj.schedulingDrawingObj.ReserveRoomInDrawing(contextObj.drawingId, function (retCode) {
                if (retCode == 0)
                    contextObj.scheduleWithoutSearch();
                //if (retCode) {
                //    if (retCode == 2) /*Show search confirmation message */ {
                //        contextObj.showSearchSlide = true;
                //        isSearch = true;
                //    }
                //    else {//If no search
                //        isSearch = false;
                //    }
                //}
                //else {
                //}
            });
        });
    };
    ReserveRoomSchedulingOpenDrawing.prototype.scheduleWithoutSearch = function () {
        var contextObj = this;
        //contextObj.showSearchSlide = false;
        // contextObj.spaceObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
        contextObj.schedulingDrawingObj.reserveRoomWithoutSearch(function (retCode, spaceDataItem) {
            if (retCode == 0) {
                contextObj.objiWhiz.setCursor(1);
                contextObj.pageTitle = "Reserve a Room";
                contextObj.spaceDataForReserveRoom = spaceDataItem;
                contextObj.splitviewDrawing.secondaryArea = 79;
                contextObj.showSecondaryViewSpaceScheduleTarget = 2;
                contextObj.splitviewDrawing.showSecondaryView = true;
            }
        });
        //   });
    };
    ReserveRoomSchedulingOpenDrawing.prototype.reserveSeatOnClick = function () {
        var contextObj = this;
        contextObj.spaceObj.deHatch(function (retCode) {
            if (contextObj.schedulingDrawingObj.seatsData.length > 0) {
                contextObj.schedulingDrawingObj.blinkSeats(function (cc) {
                    if (cc == 0) {
                        contextObj.notificationService.ShowToaster("Select a Hoteling Workspace", 2);
                        contextObj.getFieldsForSeatBooking(contextObj);
                    }
                    else
                        contextObj.notificationService.ShowToaster("No Hoteling Workspaces exist", 2);
                });
            }
            else
                contextObj.notificationService.ShowToaster("No Hoteling Workspaces exist", 2);
        });
    };
    ReserveRoomSchedulingOpenDrawing.prototype.getFieldsForSeatBooking = function (contextObj) {
        contextObj.objiWhiz.setCursor(2);
        contextObj.schedulingDrawingObj.getDetailsForSeatBooking(function (rtCode, fieldsForSeatBooking, selectedSeatId) {
            switch (rtCode) {
                case 0:
                    contextObj.objiWhiz.setCursor(1);
                    contextObj.pageTitle = "Reserve a Workspace";
                    contextObj.fieldsForSeatBooking = fieldsForSeatBooking;
                    contextObj.selectedSeatId = [selectedSeatId];
                    contextObj.splitviewDrawing.secondaryArea = 30;
                    contextObj.showSecondaryViewSpaceScheduleTarget = 3;
                    contextObj.splitviewDrawing.showSecondaryView = true;
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Reservation exists", 2);
                    contextObj.objiWhiz.setCursor(1);
                    contextObj.objiWhiz.removeBlinkers();
                    break;
                case 2:
                    contextObj.notificationService.ShowToaster("Select a Hoteling Workspace", 2);
                    contextObj.getFieldsForSeatBooking(contextObj);
                    break;
                case 3:
                    contextObj.objiWhiz.setCursor(1);
                    contextObj.objiWhiz.removeBlinkers();
            }
        });
    };
    ReserveRoomSchedulingOpenDrawing.prototype.reserveSeatSubmitRet = function (event) {
        this.splitviewDrawing.showSecondaryView = false;
        this.objiWhiz.removeBlinkers();
    };
    ReserveRoomSchedulingOpenDrawing.prototype.moveSeatOnClick = function () {
        var contextObj = this;
        contextObj.spaceObj.deHatch(function (retCode) {
            contextObj.notificationService.ShowToaster("Select a Workspace", 2);
            if (contextObj.schedulingDrawingObj.seatsData.length > 0) {
                contextObj.schedulingDrawingObj.moveSeatOnClick(function (Code) {
                    if (Code == 0)
                        contextObj.notificationService.ShowToaster("Workspace moved", 3);
                });
            }
            else
                contextObj.notificationService.ShowToaster("No Workspaces exist", 2);
        });
    };
    ReserveRoomSchedulingOpenDrawing.prototype.onSplitViewClose = function () {
        var contextObj = this;
        this.schedulingDrawingObj.deHatchSchedulingArea(function (res) {
            contextObj.splitviewDrawing.showSecondaryView = false;
            contextObj.showSecondaryViewSpaceScheduleTarget = -1;
        });
    };
    ReserveRoomSchedulingOpenDrawing.prototype.viewDrawingOnclick = function () {
        this.isViewDrawing = true;
        this.openDrawingOneTime = true;
        this.isViewIconShow = false;
        this.reserveRoomStyle = 'reserveRoomHalfView';
        this.isShow = false;
        var contextObj = this;
        setTimeout(function () {
            contextObj.isShow = true;
        }, 10);
    };
    ReserveRoomSchedulingOpenDrawing.prototype.hideDrawingOnclick = function () {
        this.isViewIconShow = true;
        this.isViewDrawing = false;
        // this.isOpenFinished = false;
        this.reserveRoomStyle = 'reserveRoomFullView';
        //this.objiWhiz.close(function (returnCode) {
        //});
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ReserveRoomSchedulingOpenDrawing.prototype, "drawingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReserveRoomSchedulingOpenDrawing.prototype, "selectedData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReserveRoomSchedulingOpenDrawing.prototype, "pageTarget", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReserveRoomSchedulingOpenDrawing.prototype, "Target", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ReserveRoomSchedulingOpenDrawing.prototype, "isSpecialRoom", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ReserveRoomSchedulingOpenDrawing.prototype, "isFromRoomClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReserveRoomSchedulingOpenDrawing.prototype, "outDrawingobject", void 0);
    ReserveRoomSchedulingOpenDrawing = __decorate([
        core_1.Component({
            selector: 'reserveroomshedulingdrawing',
            templateUrl: './app/Views/Scheduling/Drawings/reserveroom.schedulingopendrawing.component.html',
            styleUrls: ['app/Views/Common/OpenDrawing/opendrawing.css'],
            directives: [drawingview_component_1.DrawingView, reserveroom_component_1.ReserveroomComponenet, drawingtooltip_component_1.DrawingTooltip, notify_component_1.Notification, slide_component_1.SlideComponent, listboxcomponent_component_1.ListBoxComponent, contextmenu_component_1.ContextMenu, split_view_component_1.SplitViewComponent, reserveseatwithscheduler_component_1.ReserveSeatwithschedulerComponenet, reserveroomfromdrawing_component_1.ReserveRoomFromDrawing, bookseat_component_1.BookSeatComponent],
            providers: [notify_service_1.NotificationService, scheduling_service_1.SchedulingService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, http_1.Http, scheduling_service_1.SchedulingService])
    ], ReserveRoomSchedulingOpenDrawing);
    return ReserveRoomSchedulingOpenDrawing;
}());
exports.ReserveRoomSchedulingOpenDrawing = ReserveRoomSchedulingOpenDrawing;
//# sourceMappingURL=reserveroom.schedulingopendrawing.component.js.map
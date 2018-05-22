import {Component, ChangeDetectorRef, EventEmitter, Output, Input, ViewEncapsulation, KeyValueDiffers, ElementRef, OnInit} from '@angular/core';
import {NgControl, DatePipe} from '@angular/common';
import {DrawingView} from '../../../Framework/Whatever/Drawing/drawingview.component';
import {DrawingTooltip} from '../../common/opendrawing/drawingtooltip.component';
//import {SpaceOpenDrawing} from '../../space/drawings/spaceopendrawing.services';
import {IField, ILookupValues} from  '../../../Framework/Models/Interface/IField'
import {SchedulingOpenDrawing} from '../../scheduling/drawings/schedulingopendrawing.service';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { Http } from '@angular/http';
import {Delimeter} from '../../../Models/Common/General';
import {ReserveroomComponenet} from '../room booking/reserveroom.component';
import {ReserveSeatwithschedulerComponenet} from '../Seat Booking/reserveseatwithscheduler.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component';
import {ContextMenu} from '../../../Framework/Whatever/contextmenu/contextmenu.component';
import {SplitViewComponent} from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import {ReserveRoomFromDrawing } from '../../scheduling/drawings/reserveroomfromdrawing.component';
import { BookSeatComponent} from '../../scheduling/seat booking/bookseat.component';
import { SchedulingService } from '../../../models/scheduling/scheduling.service';
@Component({
    selector: 'reserveroomshedulingdrawing',
    templateUrl: './app/Views/Scheduling/Drawings/reserveroom.schedulingopendrawing.component.html',
    styleUrls: ['app/Views/Common/OpenDrawing/opendrawing.css'],
    directives: [DrawingView, ReserveroomComponenet, DrawingTooltip, Notification, SlideComponent, ListBoxComponent, ContextMenu, SplitViewComponent, ReserveSeatwithschedulerComponenet, ReserveRoomFromDrawing, BookSeatComponent],
    providers: [NotificationService, SchedulingService],
    encapsulation: ViewEncapsulation.None
})
export class ReserveRoomSchedulingOpenDrawing implements OnInit {
    @Input() drawingId: number;
    @Input() selectedData: any;
    @Input() pageTarget: any;
    @Input() Target: any;
    @Input() isSpecialRoom: boolean;
    @Input() isFromRoomClick: boolean;
    @Output() outDrawingobject = new EventEmitter();
    revisionNo: number = -1;
    drawingType: number = 1;
    drawingCategoryId: number = 1;
    moduleId: number = 14;
    selectedSpaceId: number;
    isTooltipEnable: boolean = true;
    tooltipXPosition: number;
    tooltipYPosition: number;
    tooltipVisibility: boolean = false;
    tooltipData: any;
    schedulingDrawingObj: SchedulingOpenDrawing;
    canvasElement: any;
    contextMenuXPosition: number;
    contextMenuYPosition: number;
    contextMenuVisibility: boolean = false;
    contextMenuData: IContextMenu[] = [];
    objiWhiz: any; // for drawing object
    exportMenu: IContextMenu[] = [];
    saveAsMenu: IContextMenu[] = [];
    visibilityOfExportMenu: string = "hidden";
    visibilityOfSaveAsMenu: string = "hidden";
    showLayer: boolean = false;
    layerList: IField[] = [];
    IsSelectAllLayerChecked: boolean;
    defaultChkbxIsChecked: boolean = true;
    showSecondaryViewEmployeeTarget: number;
    isSpace: boolean = true;
    layerNameLength: number;
    layerNames: any;
    dwgDetails: string = "";
    spaceObj: any;
    columnDelimiter: string;
    rowDelimiter: string;
    splitviewDrawing: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    listData: any;
    isOpenFinished: boolean = false;
    showSecondaryViewSpaceScheduleTarget: number;
    pageTitle: string = "";
    spaceDataForReserveRoom: any;
    isRoomBookingEnabled: boolean = true;
    isSeatBookingEnabled: boolean = true;
    reserveRoomStyle = 'reserveRoomFullView';
    isViewIconShow: boolean = true;
    isViewDrawing: boolean = false;
    openDrawingOneTime: boolean = false;
    isShow: boolean = true;
    isFromRoom: boolean = false;
    blinkColorCodeR: number = 255;
    blinkColorCodeG: number = 0;
    blinkColorCodeB: number = 0;
    blinkSize: number = 10;
    blinkDelay: number = 500;
    drawingLabelShow: string = "Show Drawing";
    drawingLabelHide: string = "Hide Drawing";
    constructor(private notificationService: NotificationService, private http: Http, private schedulingService: SchedulingService) {
        var delimiter = new Delimeter();
        this.columnDelimiter = delimiter.ColumnDelimeter;
        this.rowDelimiter = delimiter.RowDelimeter;
    }
    ngOnInit() {
        this.dwgDetails = this.selectedData.Site + " / " + this.selectedData.Building + " / " + this.selectedData.Floor;
        this.selectedSpaceId = this.selectedData['SpaceId'];
        this.exportMenu.push({ menuId: 0, menuName: "BMP" }, { menuId: 1, menuName: "DWF" }, { menuId: 2, menuName: "DXB" }, { menuId: 3, menuName: "DXF" },
            { menuId: 4, menuName: "JPEG" }, { menuId: 5, menuName: "PDF" }, { menuId: 6, menuName: "SVG" });
        this.saveAsMenu.push({ menuId: 0, menuName: "AutoCAD 2013" }, { menuId: 1, menuName: "AutoCAD 2010" }, { menuId: 2, menuName: "AutoCAD 2007" }, { menuId: 3, menuName: "AutoCAD 2004" },
            { menuId: 4, menuName: "AutoCAD 2000" }, { menuId: 5, menuName: "Release 14" }, { menuId: 6, menuName: "Release 13" }, { menuId: 7, menuName: "Release 12" });
        this.contextMenuData.push({ menuId: 0, menuName: "Pan" }, { menuId: 1, menuName: "Zoom In" }, { menuId: 2, menuName: "Zoom Out" }, { menuId: 3, menuName: "Zoom Window" },
            { menuId: 4, menuName: "Zoom Extents" }, /*{ menuId: 5, menuName: "Zoom Previous" },*/ { menuId: 6, menuName: "Layers" });
        if (this.isFromRoomClick)
            this.viewDrawingOnclick();
        this.checkSubscribedFeatures();
    }
    checkSubscribedFeatures() {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('276').subscribe(function (result) {
            debugger
            if (result["Data"][0]["IsSubscribed"] == true) {
                contextObj.drawingLabelShow = "Show "+ result["Data"][0].Value;
                contextObj.drawingLabelHide = "Hide "+ result["Data"][0].Value;
            }
        });
    }
    getObject(event: any) {
        var contextObj = this;
        var handler: any;
        console.log("layerList2", contextObj.layerList);
        contextObj.objiWhiz = event["objiWhiz"];
        contextObj.canvasElement = <HTMLElement>event["canvas"];
        contextObj.layerNames = event['layers'];
        contextObj.schedulingDrawingObj = new SchedulingOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.drawingCategoryId, 1, contextObj.notificationService, contextObj.http);
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
                    event.initCustomEvent('TooltipEvent', true, true,
                        { 'xPos': outputs[1], 'yPos': outputs[2], 'tooltipValue': tooltiDataValues });
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
                evnt.initCustomEvent('ContextMenuEvent', true, true,
                    { 'xPos': outputs[0], 'yPos': outputs[1] });
                document.dispatchEvent(evnt);
            }
            else {
                contextObj.isTooltipEnable = true;
                contextObj.showLayer = false;
                contextObj.contextMenuVisibility = false;
                var evnt = document.createEvent("CustomEvent");
                evnt.initCustomEvent('ContextMenuEvent', true, true,
                    { 'xPos': 0, 'yPos': 0 });
                document.dispatchEvent(evnt); // to hide context menu
                contextObj.objiWhiz.removeBlinkers();
            }
        });
    }
    displayDrawing = function (resCallback) {
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
    }
    afterDrawingOpen() {
        var contextObj = this;
        if (!contextObj.spaceObj || !contextObj.spaceObj.commonServices) {
            setTimeout(function () {
                contextObj.afterDrawingOpen();

            }, 50);
        } else {
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
    }
    contextMenuOnClick(event) {
        if (event) {
            var contextObj = this;
            contextObj.isTooltipEnable = true;
            contextObj.contextMenuVisibility = false;
            var evnt = document.createEvent("CustomEvent");
            evnt.initCustomEvent('ContextMenuEvent', true, true,
                { 'xPos': 0, 'yPos': 0 });
            document.dispatchEvent(evnt); // to hide context menu
            //console.log("context menu", event);
            switch (event.menuId) {
                case 0: contextObj.objiWhiz.pan();
                    break;
                case 1: contextObj.objiWhiz.zoomIn();
                    break;
                case 2: contextObj.objiWhiz.zoomOut();
                    break;
                case 3: contextObj.objiWhiz.zoomWindow();
                    break;
                case 4: contextObj.objiWhiz.zoomExtents(function (ret) { });
                    break;
                //case 5: contextObj.objiWhiz.zoomWindow();
                //    break;
                case 6: contextObj.addLayers(function (retCode) {
                    contextObj.showLayer = true;
                });
                    break;
            }
        }
    }
    // Drawing layer dialog
    addLayers = function (resCallback) {
        var contextObj = this;
        var layerMultiFieldValues: string[] = [];
        contextObj.objiWhiz.getAllLayers(function (returnCode, layers) {
            var allLayersArray = [];
            allLayersArray = layers.split(contextObj.rowDelimiter);
            allLayersArray.pop();
            var layerLookUpArray: ILookupValues[] = [];
            contextObj.layerNameLength = allLayersArray.length;
            for (var index = 0; contextObj.layerNameLength > index; index++) {
                var isVisible = [0];
                var layerName = allLayersArray[index];
                var returnCode = contextObj.objiWhiz.getLayerVisibility(layerName, isVisible)
                if (returnCode != 0) {
                    // console.log("getLayerVisibility faild due to", returnCode);
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
    }
    selectAllDefaultLayers(event, fieldObj) {
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
                        if (iDrawingsLayes.find(function (el) { return el === contextObj.layerList[0].LookupDetails.LookupValues[i].Value }))
                            this.layerList[0].MultiFieldValues.push(i.toString());
                    }
                } else {
                    for (var i = 0; i < 2; i++) {
                        var isExist = [0];
                        contextObj.objiWhiz.layerExists(this.layerList[0].LookupDetails.LookupValues[i].Value, isExist);
                        if (isExist[0])
                            this.layerList[0].MultiFieldValues.push(i.toString());
                    }
                }
            }

        } else {
            this.defaultChkbxIsChecked = false;
            this.layerList[0].MultiFieldValues.splice(0, 4);
        }

        if (this.layerNameLength == this.layerList[0].MultiFieldValues.length)
            this.IsSelectAllLayerChecked = true;
        //else
        //    this.IsSelectAllLayerChecked = false;
    }
    layersSelectAllOnClick(event) {
        //if (event.chkevent)
        //    this.defaultChkbxIsChecked = true;
        //else
        this.defaultChkbxIsChecked = false;
    }
    singleLayerNameOnClick(event: any) {
        var isDefaultLayer: boolean;
        var layerArr = [];
        this.getDefaultChkBoxChecked(event.fieldObject.MultiFieldValues);
    }
    getDefaultChkBoxChecked(array: any) {
        var isDefaultLayer: boolean;
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
            isDefaultLayer = array.some(function (el) { return el == i });
            if (isDefaultLayer != true) {
                this.defaultChkbxIsChecked = false;
                break;
            }
            if (isDefaultLayer)
                this.defaultChkbxIsChecked = true;
        }
    }

    // Drawing layer dialog Ok click
    OkLayersVisbility() {
        let layerName;
        let isLayerEnable: boolean;
        var contextObj = this;
        //console.log("ok", this.layerList)
        var layerStatus: string = "";
        for (let item of contextObj.layerList[0].LookupDetails.LookupValues) {
            isLayerEnable = contextObj.layerList[0].MultiFieldValues.some(function (el) { return +el === item.Id });
            if (isLayerEnable)
                layerStatus += item.Value + contextObj.columnDelimiter + "true" + contextObj.rowDelimiter;
            else
                layerStatus += item.Value + contextObj.columnDelimiter + "false" + contextObj.rowDelimiter;
        }
        contextObj.objiWhiz.setLayersVisibility(layerStatus, function () {
            contextObj.showLayer = false;
        });
    }
    // Drawing layer dialog Cancel click
    CancelLayersVisbility() {
        this.showLayer = false;
    }
    // Drawing layer dialog close click
    closeShowLayer() {
        this.showLayer = false;
    }
    onContextMenu(event: any, item: any) {
        event.preventDefault();
    }
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
    exportBtnMouseOver() {
        this.visibilityOfExportMenu = "visible";
    }
    exportBtnMouseOut() {
        this.visibilityOfExportMenu = "hidden";
    }
    saveAsBtnMouseOver() {
        this.visibilityOfSaveAsMenu = "visible";
    }
    saveAsBtnMouseOut() {
        this.visibilityOfSaveAsMenu = "hidden";
    }
    exportOnClick(event: any) {
        var contextObj = this;
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        this.visibilityOfExportMenu = "hidden";
        switch (event.menuId) {
            case 0: contextObj.objiWhiz.exportToBMP(function (returnCode) { });
                break;
            case 1: contextObj.objiWhiz.exportToDWF(1, function (returnCode) { });
                break;
            case 2: contextObj.objiWhiz.exportToDXB(1, function (returnCode) { });
                break;
            case 3: contextObj.objiWhiz.exportToDXF(1, function (returnCode) { });
                break;
            case 4: contextObj.objiWhiz.exportToJPEG(function (returnCode) { });
                break;
            case 5: contextObj.objiWhiz.exportToPDF(false, "", function (returnCode) { });
                break;
            case 6: contextObj.objiWhiz.exportToSVG(function (returnCode) { });
                break;
            case 14: contextObj.objiWhiz.exportToDXF(1, function (returnCode) { });
                break;
        }
    }
    saveAsOnClick(event: any) {
        var contextObj = this;
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        this.visibilityOfSaveAsMenu = "hidden";
        contextObj.objiWhiz.saveAs(true, event.menuId.toString(), function (returnCode) { });
    }
    getSchedulingData(data: any) {
        this.listData = data;
    }
    hatchSpaces = function (resCallback) {
        var contextObj = this;
        var selectedHandle = this.spaceObj.getHandleFromSpaceId(this.selectedSpaceId);
        contextObj.objiWhiz.hatchEntity("$Hatch", selectedHandle, 92, 10, 5, 5, false, function (retCode, entityHandle) {
            if (retCode != 0) {
                console.log("hatchEntity failed due to ", retCode);
            }
            else {
                selectedHandle = "";
                for (var item of contextObj.listData) {
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
    }
    blinkSpaceFirstTime = function (resCallback) {
        debugger
        var selectedHandle;
        if (this.pageTarget == 3) {
            if (this.isFromRoom)
                selectedHandle = [this.schedulingDrawingObj.getSeatHandleFromSeatId(this.selectedData['Seat Id'])];
            else
                selectedHandle = [this.schedulingDrawingObj.getSeatHandleFromSeatId(this.selectedData['SeatId'])];

        } else if (this.pageTarget == 1) {
            selectedHandle = [this.spaceObj.getHandleFromSpaceId(this.selectedData['SpaceId'])];
        }
        this.objiWhiz.removeBlinkers();
        this.objiWhiz.blinkEntitiesByHandles(selectedHandle, this.blinkColorCodeR, this.blinkColorCodeG, this.blinkColorCodeB, this.blinkSize, this.blinkDelay, function (returnCode) {
            resCallback();
        });
    }
    roomNoLinkOnClick(data: any) {
        this.isFromRoom = true;
        this.selectedData = data;
        this.selectedSpaceId = data['SpaceId'];
        if (this.isOpenFinished) {
            return;
            var selectedHandle;
            if (this.pageTarget == 3) {
                selectedHandle = [this.schedulingDrawingObj.getSeatHandleFromSeatId(data['SeatId'])];

            } else if (this.pageTarget == 1) {
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
    }
    onSelectionChange(data: any) {
        debugger
        if (this.isOpenFinished) {
            var selectedHandle = [this.spaceObj.getHandleFromSpaceId(data['SpaceId'])];
            this.objiWhiz.removeBlinkers();
            this.objiWhiz.blinkEntitiesByHandles(selectedHandle, this.blinkColorCodeR, this.blinkColorCodeG, this.blinkColorCodeB, this.blinkSize, this.blinkDelay, function (returnCode) {
            });
        }
        else
            this.selectedData = data;

    }
    onSelectionChangeforseat(data: any) {
        debugger
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
    }

    /* Reserve a Room-- Scheduling : Module Id:17 */
    reserveRoomOnClick() {
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
    }


    scheduleWithoutSearch() {
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

    }
    reserveSeatOnClick() {
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
    }
    getFieldsForSeatBooking(contextObj) {
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
                case 2: contextObj.notificationService.ShowToaster("Select a Hoteling Workspace", 2);
                    contextObj.getFieldsForSeatBooking(contextObj);
                    break;
                case 3:
                    contextObj.objiWhiz.setCursor(1);
                    contextObj.objiWhiz.removeBlinkers();

            }

        });
    }
    reserveSeatSubmitRet(event) {
        this.splitviewDrawing.showSecondaryView = false;
        this.objiWhiz.removeBlinkers();
    }
    moveSeatOnClick() {
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
    }
    onSplitViewClose() {
        var contextObj = this;
        this.schedulingDrawingObj.deHatchSchedulingArea(function (res) {
            contextObj.splitviewDrawing.showSecondaryView = false;
            contextObj.showSecondaryViewSpaceScheduleTarget = -1;
        });
    }
    viewDrawingOnclick() {
        this.isViewDrawing = true;
        this.openDrawingOneTime = true;
        this.isViewIconShow = false;
        this.reserveRoomStyle = 'reserveRoomHalfView';
        this.isShow = false;
        var contextObj = this;
        setTimeout(function () {
            contextObj.isShow = true;
        }, 10);
    }
    hideDrawingOnclick() {
        this.isViewIconShow = true;
        this.isViewDrawing = false;
        // this.isOpenFinished = false;
        this.reserveRoomStyle = 'reserveRoomFullView';
        //this.objiWhiz.close(function (returnCode) {
        //});

    }
}
export interface IContextMenu {
    menuId: number;
    menuName: string;
}

import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener, ViewEncapsulation} from '@angular/core';
import {NgControl} from '@angular/common';
import {IField} from  '../../../Framework/Models/Interface/IField';
import {AdministrationService} from '../../../Models/Administration/administration.service';
import { FileUploadComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fileuploadcomponent.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {DrawingView} from '../../../Framework/Whatever/Drawing/drawingview.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {AddingSymbolLibrary} from './AddingSymbol';
import {Delimeter} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';


/* -------------- SCRIPTS FOR IWIZ CONTROL APIS BEGIN ----------------- */
import '../../../../Scripts/jquery-1.10.2.min.js';
import '../../../../Scripts/jquery.signalR-2.2.1.min.js';
import '../../../../Scripts/Drawing/iWhizSignalRHub.js';
import "../../../../Scripts/Drawing/iWhizWebapp.js";
import "../../../../Scripts/Drawing/iWhizApiHandler.js";
import "../../../../Scripts/Drawing/iWhizLayers.js";
import "../../../../Scripts/Drawing/iWhizViewer.js";
import "../../../../Scripts/Drawing/iWhizEntity.js";
import "../../../../Scripts/Drawing/iWhizZoom.js";
import "../../../../Scripts/Drawing/iWhizErrorStatus.js";
import "../../../../Scripts/Drawing/iWhizTools.js";
import "../../../../Scripts/zlib.min.js";
import "../../../../Scripts/Drawing/iWhizLibLoader.js";
import "../../../../Scripts/Drawing/iWhizGripManager.js";
import "../../../../Scripts/Drawing/iWhizFlowchart.js";
import "../../../../Scripts/Drawing/d3.js";
import "../../../../Scripts/Drawing/simplify.js";
/* -------------- SCRIPTS FOR IWIZ CONTROL APIS END ----------------- */

declare var iWhizAPI: any;

@Component({
    selector: 'AddSymbol',
    templateUrl: './app/Views/Administration/SymbolLibrary/AddSymbol.html',
    directives: [FileUploadComponent, SplitViewComponent, DrawingView, SubMenu, AddingSymbolLibrary, SlideComponent, Notification,PageComponent],
    providers: [NotificationService, AdministrationService, Delimeter, GeneralFunctions],
    encapsulation: ViewEncapsulation.None
})

export class AddSymbolLibrary  {
    @ViewChild('iWhizSymbolLibraryCanvas') drawingCanvas: ElementRef;
    public objiWhiz: any = new iWhizAPI(); // for drawing object
   // public delimiter: Delimeter;
    public delimiter = new Delimeter();
    moduleId: number;
    canvasIdName: string;
    drawingType: number;
    drawingCategoryId: number;
    fieldObject: IField;
    fieldDetailsAdd: IField;
    drawinglayerNameForSelectEntity: string = "";
    typeIDForSelectEntityText: number = 3;
    typeIDForSelectEntityPoly: number = 9;
    cursorIndex: number = 12;
   // enableMenu: number[];
    types: boolean = true;
    totalItems: number = 0;
    pageTitle: string;
    btnName: string;
    AddSymbolTarget: number;
    action: string;
    columnDelimiter: string;
    rowDelimiter: string;
    Coordinates = "";
    showSlide = false;
    entityHandles: string;
    EntityText: string;
    TextSize: string;
    enableMenu = [0];
    public delimiterSymbolColumn: string = this.delimiter.ColumnDelimeter;
    public delimiterSymbolRow: string = this.delimiter.RowDelimeter;
   
    message = "Do you want to associate any text with this Symbol?";
    position = "top-right";
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    menuData = [
        {
            "id": 1,
            "title": "Add Symbol",
            "image": "Add",
            "path": "Add",
            "subMenu": null
       
        }];
  

    splitViewDataGrid: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    constructor(private notificationService: NotificationService, private administrationService: AdministrationService, private generFun: GeneralFunctions) {
        
    }

    ngOnDestroy() {
        console.log("ngOnDestroy", this.objiWhiz);
        var contextObj = this;
        if (this.objiWhiz) {
            this.objiWhiz.close(function (returnCode) {
                contextObj.objiWhiz = null;
            });
        }
    }
    @HostListener('window:beforeunload', ['$event'])
    onBeforeunload(event) {
        var contextObj = this;
        this.objiWhiz.close(function (returnCode) {
            contextObj.objiWhiz = null;
        });
    }

    ngOnInit() {
        var contextObj = this;
        contextObj.enableMenu = [];
        contextObj.administrationService.getSymbolLibrary().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
        }
    }
    getDWGData = function (event) {
        debugger
        var contextObj = this;
        contextObj.enableMenu = [];
        if (event["FileName"].split(".")[1] == "dwg") {
        var loading_indicator = document.getElementById('loading-indicator');
        loading_indicator.style.display = "block";       
            contextObj.administrationService.viewDWGdata(event).subscribe(function (resultData) {
                //var length = resultData.length;
                //var index = resultData.lastIndexOf('\\') + 1;
                //var fileName = resultData.substring(index, length);
                var foldername = resultData[0];
                var drawingId = resultData[3];
                var fileName = resultData[4];


                contextObj.administrationService.getSymbolLibrary().subscribe(function (resultData) {
                    var width, height;
                    setTimeout(function () {
                        var canvas = <HTMLElement>contextObj.drawingCanvas.nativeElement;  /*objContext.drawingCanvas.nativeElement;*/
                        width = canvas.offsetWidth;
                        height = canvas.offsetHeight;
                        var topOffset = window.innerHeight - height;

                        contextObj.objiWhiz.close(function (returnCode) {
                            contextObj.objiWhiz.initWebViewer('#iWhizSymbolLibraryCanvas', width, height, topOffset, function (result) {
                                if (result == 0) {
                                    var fileAndfolder = drawingId + "§" + fileName;
                                    contextObj.objiWhiz.openDrawing(fileAndfolder, 0, 6, false, false, 0, function (returnCodeSample) {
                                        if (returnCodeSample == 0) {
                                            contextObj.objiWhiz.zoomExtents(function (returnCode1) {
                                                if (returnCode1 == 0) {
                                                    contextObj.objiWhiz.display(function () {
                                                        var loading_indicator = document.getElementById('loading-indicator');
                                                        loading_indicator.style.display = "none";
                                                        contextObj.enableMenu = [1];
                                                    });
                                                }
                                                else
                                                    console.log("zoomExtents failed due to ", returnCode);
                                            });
                                        }
                                        else
                                            console.log("openDrawing failed due to ", returnCodeSample);
                                    });
                                }
                                else
                                    console.log("initWebViewer failed due to ", result);
                            });
                        });
                    }, 100);
                });
            });
        }
        else
            contextObj.notificationService.ShowToaster("Select a drawing file (.dwg)",2)
    }
    addSymbolClick() {
        var contextObj = this;
        contextObj.administrationService.AddSymbolFields().subscribe(function (resultData) {
            contextObj.pageTitle = "Add Symbol";
            contextObj.btnName = "Save";
            contextObj.AddSymbolTarget = 1;
            contextObj.fieldDetailsAdd = resultData["Data"];
            contextObj.splitviewInput.showSecondaryView = true;
        })
    }

    addClick() {
        var contextObj = this;      //starting here
        contextObj.notificationService.ShowToaster("Select a Symbol", 2);
        contextObj.objiWhiz.setDelimiter(contextObj.delimiterSymbolRow, contextObj.delimiterSymbolColumn, function (resultxc) {
            if (resultxc == 0) { }
            contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntityPoly, contextObj.cursorIndex, function (returnCode2, entityHandles) {
                if (returnCode2 == 0) {
                    contextObj.entityHandles = entityHandles;
                    contextObj.showSlide = true;

                }
            });
        });


      //  contextObj.showSlide = true;
    }

    ok(event: Event) {
        this.showSlide = !this.showSlide;

        var contextObj = this;
        contextObj.SymbolWithText()
    }

    cancel(event: Event) {
        var contextObj = this;
        contextObj.showSlide = !contextObj.showSlide;
        contextObj.SymbolWithoutText();
    }
    SymbolWithText() {
        var contextObj = this;
        contextObj.notificationService.ShowToaster("Select the Symbol Text", 2);
        contextObj.objiWhiz.setDelimiter(contextObj.delimiterSymbolRow, contextObj.delimiterSymbolColumn, function (resultxc) {
            if (resultxc == 0) {
                contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntityText, contextObj.cursorIndex, function (returnCode2, entityHandlesText) {
                    contextObj.common();
                    //var handles = "";
                    //var temphandles = (entityHandlesText.split(contextObj.delimiterSymbolRow, 1));
                    //for (var i = 0; i < temphandles.length; i++) {

                    //    handles += temphandles[i];
                    //}
                    //debugger
                    //contextObj.objiWhiz.getPolylineCoordinates(handles, function (returnCode3, xCoordinates: any, yCoordinates) {
                    //    var xCorArray = xCoordinates.split(contextObj.delimiterSymbolRow);
                    //    var yCorArray = yCoordinates.split(contextObj.delimiterSymbolRow);
                    //    for (var i = 0; i < xCorArray.length; i++) {
                    //        if (xCorArray[i] != "" && yCorArray[i] != "") {
                    //            contextObj.Coordinates += xCorArray[i] + "," + yCorArray[i] + ";";
                    //        }
                    //    }
                    //    contextObj.Coordinates = contextObj.Coordinates.substring(0, contextObj.Coordinates.length - 1);

                    var handleArray = entityHandlesText.split(contextObj.delimiterSymbolRow);
                    var handle = handleArray[0];
                    if (returnCode2 == 0) {
                        contextObj.objiWhiz.getEntityText(handle, function (returnCode2, EntityText, IsMultiline) {
                            contextObj.EntityText = EntityText;
                            if (returnCode2 == 0) {
                                contextObj.objiWhiz.getTextSize(handle, function (res, TextSize) {
                                    contextObj.TextSize = TextSize;
                                    contextObj.addSymbolClick()
                                });
                            }
                        });
                    }
                });
            }
            //contextObj.addSymbolClick();
        });
       
    }

    SymbolWithoutText() {
        var contextObj = this;
      //  contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntityPoly, contextObj.cursorIndex, function (returnCode2, entityHandles) {
          //  if (returnCode2 == 0) {
                    contextObj.common();

                    contextObj.addSymbolClick()

                
          //  }
       // });
    }

    common() {
                var contextObj = this;
                var handles = "";
                var temphandles = (contextObj.entityHandles.split(contextObj.delimiterSymbolRow, 1));
                for (var i = 0; i < temphandles.length; i++) {

                    handles += temphandles[i];
                }
                contextObj.objiWhiz.getPolylineCoordinates(handles, function (returnCode3, xCoordinates: any, yCoordinates) {
                    var xCorArray = xCoordinates.split(contextObj.delimiterSymbolRow);
                    var yCorArray = yCoordinates.split(contextObj.delimiterSymbolRow);
                    for (var i = 0; i < xCorArray.length; i++) {
                        if (xCorArray[i] != "" && yCorArray[i] != "") {
                            contextObj.Coordinates += xCorArray[i] + "," + yCorArray[i] + ";";
                        }
                    }
                    contextObj.Coordinates = contextObj.Coordinates.substring(0, contextObj.Coordinates.length - 1);


                });
            }

    closeSecondaryView(value: any) {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        contextObj.notificationService.ShowToaster("Symbol added", 2);
       
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
}


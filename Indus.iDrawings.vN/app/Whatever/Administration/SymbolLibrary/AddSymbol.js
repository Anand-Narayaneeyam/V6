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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var fileuploadcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fileuploadcomponent.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var drawingview_component_1 = require('../../../Framework/Whatever/Drawing/drawingview.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var AddingSymbol_1 = require('./AddingSymbol');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_2 = require('../../../Models/Common/General');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
/* -------------- SCRIPTS FOR IWIZ CONTROL APIS BEGIN ----------------- */
require('../../../../Scripts/jquery-1.10.2.min.js');
require('../../../../Scripts/jquery.signalR-2.2.1.min.js');
require('../../../../Scripts/Drawing/iWhizSignalRHub.js');
require("../../../../Scripts/Drawing/iWhizWebapp.js");
require("../../../../Scripts/Drawing/iWhizApiHandler.js");
require("../../../../Scripts/Drawing/iWhizLayers.js");
require("../../../../Scripts/Drawing/iWhizViewer.js");
require("../../../../Scripts/Drawing/iWhizEntity.js");
require("../../../../Scripts/Drawing/iWhizZoom.js");
require("../../../../Scripts/Drawing/iWhizErrorStatus.js");
require("../../../../Scripts/Drawing/iWhizTools.js");
require("../../../../Scripts/zlib.min.js");
require("../../../../Scripts/Drawing/iWhizLibLoader.js");
require("../../../../Scripts/Drawing/iWhizGripManager.js");
require("../../../../Scripts/Drawing/iWhizFlowchart.js");
require("../../../../Scripts/Drawing/d3.js");
require("../../../../Scripts/Drawing/simplify.js");
var AddSymbolLibrary = (function () {
    function AddSymbolLibrary(notificationService, administrationService, generFun) {
        this.notificationService = notificationService;
        this.administrationService = administrationService;
        this.generFun = generFun;
        this.objiWhiz = new iWhizAPI(); // for drawing object
        // public delimiter: Delimeter;
        this.delimiter = new General_1.Delimeter();
        this.drawinglayerNameForSelectEntity = "";
        this.typeIDForSelectEntityText = 3;
        this.typeIDForSelectEntityPoly = 9;
        this.cursorIndex = 12;
        // enableMenu: number[];
        this.types = true;
        this.totalItems = 0;
        this.Coordinates = "";
        this.showSlide = false;
        this.enableMenu = [0];
        this.delimiterSymbolColumn = this.delimiter.ColumnDelimeter;
        this.delimiterSymbolRow = this.delimiter.RowDelimeter;
        this.message = "Do you want to associate any text with this Symbol?";
        this.position = "top-right";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.menuData = [
            {
                "id": 1,
                "title": "Add Symbol",
                "image": "Add",
                "path": "Add",
                "subMenu": null
            }];
        this.splitViewDataGrid = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.getDWGData = function (event) {
            debugger;
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
                            var canvas = contextObj.drawingCanvas.nativeElement; /*objContext.drawingCanvas.nativeElement;*/
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
                contextObj.notificationService.ShowToaster("Select a drawing file (.dwg)", 2);
        };
    }
    AddSymbolLibrary.prototype.ngOnDestroy = function () {
        console.log("ngOnDestroy", this.objiWhiz);
        var contextObj = this;
        if (this.objiWhiz) {
            this.objiWhiz.close(function (returnCode) {
                contextObj.objiWhiz = null;
            });
        }
    };
    AddSymbolLibrary.prototype.onBeforeunload = function (event) {
        var contextObj = this;
        this.objiWhiz.close(function (returnCode) {
            contextObj.objiWhiz = null;
        });
    };
    AddSymbolLibrary.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.enableMenu = [];
        contextObj.administrationService.getSymbolLibrary().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
    };
    AddSymbolLibrary.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
        }
    };
    AddSymbolLibrary.prototype.addSymbolClick = function () {
        var contextObj = this;
        contextObj.administrationService.AddSymbolFields().subscribe(function (resultData) {
            contextObj.pageTitle = "Add Symbol";
            contextObj.btnName = "Save";
            contextObj.AddSymbolTarget = 1;
            contextObj.fieldDetailsAdd = resultData["Data"];
            contextObj.splitviewInput.showSecondaryView = true;
        });
    };
    AddSymbolLibrary.prototype.addClick = function () {
        var contextObj = this; //starting here
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
    };
    AddSymbolLibrary.prototype.ok = function (event) {
        this.showSlide = !this.showSlide;
        var contextObj = this;
        contextObj.SymbolWithText();
    };
    AddSymbolLibrary.prototype.cancel = function (event) {
        var contextObj = this;
        contextObj.showSlide = !contextObj.showSlide;
        contextObj.SymbolWithoutText();
    };
    AddSymbolLibrary.prototype.SymbolWithText = function () {
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
                                    contextObj.addSymbolClick();
                                });
                            }
                        });
                    }
                });
            }
            //contextObj.addSymbolClick();
        });
    };
    AddSymbolLibrary.prototype.SymbolWithoutText = function () {
        var contextObj = this;
        //  contextObj.objiWhiz.selectEntity(contextObj.drawinglayerNameForSelectEntity, contextObj.typeIDForSelectEntityPoly, contextObj.cursorIndex, function (returnCode2, entityHandles) {
        //  if (returnCode2 == 0) {
        contextObj.common();
        contextObj.addSymbolClick();
        //  }
        // });
    };
    AddSymbolLibrary.prototype.common = function () {
        var contextObj = this;
        var handles = "";
        var temphandles = (contextObj.entityHandles.split(contextObj.delimiterSymbolRow, 1));
        for (var i = 0; i < temphandles.length; i++) {
            handles += temphandles[i];
        }
        contextObj.objiWhiz.getPolylineCoordinates(handles, function (returnCode3, xCoordinates, yCoordinates) {
            var xCorArray = xCoordinates.split(contextObj.delimiterSymbolRow);
            var yCorArray = yCoordinates.split(contextObj.delimiterSymbolRow);
            for (var i = 0; i < xCorArray.length; i++) {
                if (xCorArray[i] != "" && yCorArray[i] != "") {
                    contextObj.Coordinates += xCorArray[i] + "," + yCorArray[i] + ";";
                }
            }
            contextObj.Coordinates = contextObj.Coordinates.substring(0, contextObj.Coordinates.length - 1);
        });
    };
    AddSymbolLibrary.prototype.closeSecondaryView = function (value) {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        contextObj.notificationService.ShowToaster("Symbol added", 2);
    };
    AddSymbolLibrary.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    __decorate([
        core_1.ViewChild('iWhizSymbolLibraryCanvas'), 
        __metadata('design:type', core_1.ElementRef)
    ], AddSymbolLibrary.prototype, "drawingCanvas", void 0);
    __decorate([
        core_1.HostListener('window:beforeunload', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], AddSymbolLibrary.prototype, "onBeforeunload", null);
    AddSymbolLibrary = __decorate([
        core_1.Component({
            selector: 'AddSymbol',
            templateUrl: './app/Views/Administration/SymbolLibrary/AddSymbol.html',
            directives: [fileuploadcomponent_component_1.FileUploadComponent, split_view_component_1.SplitViewComponent, drawingview_component_1.DrawingView, submenu_component_1.SubMenu, AddingSymbol_1.AddingSymbolLibrary, slide_component_1.SlideComponent, notify_component_1.Notification, page_component_1.PageComponent],
            providers: [notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.Delimeter, General_2.GeneralFunctions],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, administration_service_1.AdministrationService, General_2.GeneralFunctions])
    ], AddSymbolLibrary);
    return AddSymbolLibrary;
}());
exports.AddSymbolLibrary = AddSymbolLibrary;
//# sourceMappingURL=AddSymbol.js.map
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
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var moduleswitch_component_1 = require('../../../whatever/common/drawingdetails/moduleswitch.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
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
require("../../../../Scripts/xmlParser.js"); //For iwhiz apis
require("../../../../Scripts/Drawing/d3.js");
require("../../../../Scripts/Drawing/simplify.js");
var markuplist_component_1 = require('../../../whatever/common/drawingdetails/markuplist.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var drawing_service_1 = require('../../models/drawings/drawing.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var DrawingView = (function () {
    function DrawingView(differs, cdRef, dwgServices, notificationService, administrationService) {
        this.differs = differs;
        this.cdRef = cdRef;
        this.dwgServices = dwgServices;
        this.notificationService = notificationService;
        this.administrationService = administrationService;
        this.outiWhizObject = new core_1.EventEmitter();
        this.afterOpen = new core_1.EventEmitter();
        this.splitviewDrawing = { showSecondaryView: false, showButton: false, secondaryArea: 25 };
        this.objiWhiz = new iWhizAPI();
        this.rowDelimiter = "§";
        this.columnDelimeter = "µ";
        this.confirmtionBoxposition = "top-right";
        this.message = "";
        this.progressBoxposition = "bottom-right";
        this.progressMessage = "";
        this.showContextmenu = false;
        this.position = "top-right";
        this.layerLookUpArray = [];
        this.siteDrawing = 999;
        this.buildingDrawing = 0;
        this.floorDrawing = 1;
        this.multiFieldValues = [];
        this.isXrefExists = false;
        this.changeLayout = function (resCallback) {
            var contextObj = this;
            var isXref = false;
            contextObj.spacelayerName = contextObj.iDrawinsLayers[0]["Space Layer Name"];
            contextObj.constructionLayerName = contextObj.iDrawinsLayers[0]["External Wall Layer Name"];
            contextObj.netLayername = contextObj.iDrawinsLayers[0]["Net Layer Name"];
            contextObj.grossLayername = contextObj.iDrawinsLayers[0]["Gross Layer Name"];
            var isFreeze = false;
            if (contextObj.moduleId == 1 || contextObj.moduleId == 2 || contextObj.drawingCategoryId != 1) {
                isFreeze = false;
            }
            else {
                isFreeze = true;
            }
            var result = contextObj.objiWhiz.openDrawing(contextObj.drawingId, contextObj.revisionNo, contextObj.openDrawingType, false, isFreeze, contextObj.archivedId, function (returnCode) {
                if (returnCode == 0 || returnCode == 75 || returnCode == 74) {
                    if (returnCode == 75 || returnCode == 74)
                        isXref = true;
                    contextObj.beforeSetiDrawingLayers(function (retCode) {
                        if (retCode == 0) {
                            contextObj.openDrawingAllCategory(isXref, function (retCode) {
                                if (retCode == 0) {
                                    resCallback(0);
                                }
                                else
                                    resCallback(retCode);
                            });
                        }
                        else
                            resCallback(retCode);
                    });
                }
                else {
                    console.log("opendrawing faild due to", returnCode);
                    resCallback(returnCode);
                }
            });
        };
        this.beforeSetiDrawingLayers = function (resCallback) {
            var contextObj = this;
            var layerArr = [];
            console.log("g_IsNetCustomerg_IsNetCustomer", this.g_IsNetCustomer);
            if (contextObj.g_IsNetCustomer) {
                layerArr.push(["0", contextObj.grossLayername]);
                layerArr.push(["3", contextObj.netLayername]);
            }
            else {
                layerArr.push(["0", contextObj.grossLayername]);
                layerArr.push(["1", contextObj.constructionLayerName]);
                layerArr.push(["2", contextObj.spacelayerName]);
                layerArr.push(["3", contextObj.netLayername]);
            }
            contextObj.objiWhiz.setiDrawingsLayers(layerArr, function (returnCode) {
                if (returnCode == 0) {
                    resCallback(0);
                }
                else {
                    console.log("setiDrawingsLayers faild due to", returnCode);
                    resCallback(returnCode);
                }
            });
        };
        this.openDrawingAllCategory = function (isXref, resCallback) {
            var contextObj = this;
            contextObj.objiWhiz.setDelimiter(contextObj.rowDelimiter, contextObj.columnDelimeter, function (returnCode) {
                if (returnCode == 0) {
                    contextObj.setDefaultLayers(function (retCode) {
                        contextObj.addAllLayers(function (retCode) {
                            if (retCode == 0) {
                                {
                                    if (contextObj.moduleId == 1 || contextObj.moduleId == 2) {
                                        contextObj.asbuiltsOpenDrawing(function (retCode) {
                                            if (retCode == 0)
                                                resCallback(0);
                                            else {
                                                console.log("asbuiltsOpenDrawing failed");
                                                resCallback(retCode);
                                            }
                                        });
                                    }
                                    else {
                                        contextObj.spaceOpenDrawing(isXref, function (retCode) {
                                            contextObj.objiWhiz.setDisplay(true);
                                            resCallback(retCode);
                                        });
                                    }
                                }
                            }
                            else {
                                console.log("addAllLayers faild due to", retCode);
                                resCallback(retCode);
                            }
                        });
                    });
                }
                else {
                    console.log("setDelimiter faild due to", returnCode);
                    resCallback(returnCode);
                }
            });
        };
        this.asbuiltsOpenDrawing = function (resCallback) {
            var contextObj = this;
            contextObj.objiWhiz.zoomExtents(function (ret) {
                if (ret == 0) {
                    contextObj.objiWhiz.display(function () {
                        var loading_indicator = document.getElementById('loading-indicator');
                        loading_indicator.style.display = "none";
                        resCallback(0);
                    });
                }
                else {
                    console.log("zoomExtents faild due to", ret);
                    resCallback(ret);
                }
            });
        };
        this.spaceOpenDrawing = function (isXref, resCallback) {
            console.log("space");
            debugger;
            var contextObj = this;
            //var isExist = [0];
            //this.objiWhiz.layerExists(contextObj.spacelayerName, isExist);
            //if (isExist[0]) {
            if (isXref && contextObj.drawingCategoryId != 1) {
                contextObj.objiWhiz.setPerformanceIndex(6, function (retcodePerformance) {
                    if (retcodePerformance != 0)
                        resCallback(retcodePerformance);
                    else
                        resCallback(0);
                });
            }
            else if (!isXref && contextObj.drawingCategoryId != 1) {
                contextObj.objiWhiz.getAllXrefs(function (returnCode, xreffiles) {
                    if (xreffiles != undefined || xreffiles != "") {
                        var layer = contextObj.spacelayerName + contextObj.rowDelimiter + contextObj.constructionLayerName + contextObj.rowDelimiter + contextObj.netLayername + contextObj.rowDelimiter + contextObj.grossLayername + contextObj.rowDelimiter;
                        contextObj.objiWhiz.importEntities(contextObj.xrefDrawing, layer, true, function (retcode) {
                            console.log('retcode from importentities', retcode);
                            if (retcode == 0) {
                                contextObj.isXrefExists = true;
                                contextObj.initiateloadsettings(function (returncode) {
                                    resCallback(returncode);
                                });
                            }
                            else if (retcode == 75 || retcode == 74 || retcode == 102 || retcode == 17) {
                                contextObj.objiWhiz.setPerformanceIndex(6, function (retcodePerformance) {
                                    if (retcodePerformance != 0)
                                        resCallback(retcodePerformance);
                                    else
                                        resCallback(0);
                                });
                            }
                            else
                                resCallback(retcode);
                        });
                    }
                    else
                        resCallback(0);
                });
            }
            else {
                contextObj.initiateloadsettings(function (returncode) {
                    resCallback(returncode);
                });
            }
            //}
            //else {
            //    contextObj.objiWhiz.initialLoadSettings(6, false, function (returnCode) {
            //        if (returnCode == 0)
            //            resCallback(0);
            //        else
            //            resCallback(1);
            //    });
            //}
        };
        this.setDefaultLayers = function (resCallback) {
            debugger;
            var contextObj = this;
            var arrayList = new Array();
            arrayList.push({
                ReportFieldId: 501,
                Value: contextObj.moduleId.toString()
            });
            contextObj.dwgServices.getDefaultDrawingLayerListData(JSON.stringify(arrayList), 0, '', '').subscribe(function (resultData) {
                contextObj.defaultlayers = JSON.parse(resultData["Data"].FieldBinderData);
                for (var i = 0; i < contextObj.defaultlayers.length; i++) {
                    contextObj.objiWhiz.setDefaultLayer(contextObj.defaultlayers[i]['Layer Name']);
                }
                resCallback(0);
            });
        };
        this.initiateloadsettings = function (resCallback) {
            this.objiWhiz.initialLoadSettings(6, !this.g_IsNetCustomer, function (returnCode) {
                if (returnCode == 0)
                    resCallback(0);
                else {
                    console.log("initialLoadSettings faild due to", returnCode);
                    resCallback(returnCode);
                }
            });
        };
        this.getNetHandles = function (resCallback) {
            var contextObj = this;
            contextObj.objiWhiz.loadNetHandles(function (returnCode) {
                if (returnCode == 0) {
                    //contextObj.objiWhiz.zoomExtents(function (ret) {
                    //if (ret == 0) {
                    //var loading_indicator = document.getElementById('loading-indicator');
                    //loading_indicator.style.display = "none";
                    //contextObj.objiWhiz.display();
                    resCallback(0);
                }
                else {
                    console.log("setLayout faild due to", returnCode);
                    resCallback(1);
                }
            });
        };
        this.addAllLayers = function (callback) {
            var contextObj = this;
            var resultLayers = contextObj.objiWhiz.getAllLayers(function (returnCode, layers) {
                if (returnCode == 0) {
                    var allLayersArray = [];
                    var isVisible = [0];
                    var isVisibleCheck = "checked";
                    allLayersArray = layers.split(contextObj.rowDelimiter);
                    allLayersArray.pop();
                    var layersstatus = "";
                    var index = 0;
                    var layerIndex;
                    var _loop_1 = function(layerName) {
                        console.log("contextObj.drawingCategoryId", contextObj.drawingCategoryId);
                        if (contextObj.moduleId == 1 || contextObj.moduleId == 2 || contextObj.drawingCategoryId != 1) {
                            layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
                            contextObj.multiFieldValues.push(index);
                            contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
                        }
                        else {
                            layerIndex = contextObj.defaultlayers.findIndex(function (el) { return el['Layer Name'] == layerName; });
                            if (layerIndex != -1) {
                                contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
                                contextObj.multiFieldValues.push(index);
                                layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
                            }
                            else {
                                contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
                                layersstatus += layerName + contextObj.columnDelimeter + "false" + contextObj.rowDelimiter;
                            }
                        }
                        index++;
                    };
                    for (var _i = 0, allLayersArray_1 = allLayersArray; _i < allLayersArray_1.length; _i++) {
                        var layerName = allLayersArray_1[_i];
                        _loop_1(layerName);
                    }
                    //$.each(allLayersArray, function (index, col) {
                    //    //OpenDrawingObject.iWhiz.setLayerVisibility(col.toString(), true, function () { });
                    //    layersstatus += col.toString() + contextObj.columnDelimiter + "true" + contextObj.rowDelimeter;
                    //});
                    if (contextObj.moduleId != 1 && contextObj.moduleId != 2) {
                        contextObj.objiWhiz.setLayersVisibility(layersstatus, function (retCode) {
                            callback(retCode);
                        });
                    }
                    else {
                        if (contextObj.drawingCategoryId != 1) {
                            contextObj.objiWhiz.setLayersVisibility(layersstatus, function (retCode) {
                                callback(retCode);
                            });
                        }
                        else
                            callback(returnCode);
                    }
                }
                else
                    callback(returnCode);
            });
        };
        this.differ = differs.find({}).create(null);
        window.onbeforeunload = function () {
            console.log("closing");
        };
    }
    DrawingView.prototype.ngOnDestroy = function () {
        console.log("ngOnDestroy", this.objiWhiz);
        var contextObj = this;
        if (this.objiWhiz) {
            this.objiWhiz.close(function (returnCode) {
                contextObj.objiWhiz = null;
            });
        }
    };
    DrawingView.prototype.onResize = function (event) {
        console.log('resize event: ', event.target.innerWidth);
        var width, height;
        var canvas = this.drawingCanvas;
        width = canvas.offsetWidth;
        height = canvas.offsetHeight; //window.innerHeight - 56;
        this.objiWhiz.resize(width, height);
    };
    DrawingView.prototype.onBeforeunload = function (event) {
        this.objiWhiz.close(function (returnCode) {
        });
    };
    DrawingView.prototype.ngOnInit = function () {
        //this.dwgServices.getMandaoryLayer().subscribe(resultData => console.log("datalayer", this.iDrawinsLayers = resultData["data"]));
        var contextObj = this;
        console.log("data12", this.iDrawinsLayers);
        if (contextObj.archivedId == undefined || contextObj.archivedId == null)
            contextObj.archivedId = 0;
        if (this.canvasIdName == undefined || this.canvasIdName == null)
            this.canvasIdName = 'iWhizCanvas';
        if (this.loadingIndicatorIdName == undefined || this.loadingIndicatorIdName == null)
            this.loadingIndicatorIdName = 'loading-indicator';
        switch (this.drawingType) {
            case this.buildingDrawing:
                this.openDrawingType = 2;
                break;
            case this.floorDrawing:
                this.openDrawingType = 1;
                break;
            case this.siteDrawing:
                this.openDrawingType = 3;
                break;
            case 5:
                this.openDrawingType = 5; // project drawing open
                break;
        }
        contextObj.dwgServices.getCustomerSettings().subscribe(function (resultData) {
            for (var i = 0; i < resultData["Data"].length; i++) {
                switch (resultData["Data"][i]["Id"]) {
                    case 31:
                        contextObj.g_IsNetCustomer = resultData["Data"][i]["FeatureLookupId"] == "1" ? false : true;
                        break;
                }
            }
        });
    };
    DrawingView.prototype.ngAfterViewInit = function () {
        this.drawingCanvas = document.getElementById(this.canvasIdName);
        this.cdRef.detectChanges();
        var contextObj = this;
        setTimeout(function () {
            var width, height;
            var canvas = contextObj.drawingCanvas;
            width = canvas.offsetWidth;
            height = canvas.offsetHeight; //window.innerHeight - 56;
            var topOffset = window.innerHeight - height;
            console.log("width,height,toooffset", width, height, topOffset);
            contextObj.dwgServices.getiDrawingsLayers().subscribe(function (resultData) {
                console.log("datadata", contextObj.iDrawinsLayers = resultData);
                contextObj.objiWhiz.initWebViewer('#' + contextObj.canvasIdName, width, height, topOffset, function (result) {
                    if (result == 0) {
                        contextObj.outiWhizObject.emit({ "objiWhiz": contextObj.objiWhiz, "canvas": contextObj.drawingCanvas });
                        contextObj.changeLayout(function (retCode) {
                            if (retCode == 0)
                                contextObj.afterOpen.emit({ "DefaultLayers": contextObj.defaultlayers, "IsXrefExists": contextObj.isXrefExists });
                            else if (retCode != 3) {
                                if (contextObj.moduleId == 14)
                                    contextObj.notificationService.ShowToaster("Drawing file not found", 5);
                                else if (contextObj.moduleId == 3 && retCode == 17)
                                    contextObj.notificationService.ShowToaster(contextObj.spacelayerName + " does not exist", 5);
                                else
                                    contextObj.notificationService.ShowToaster("Drawing file not found", 5);
                            }
                        });
                    }
                    else
                        console.log("initWebViewer failed due to ", result);
                });
            });
        }, 100);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DrawingView.prototype, "xrefDrawing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DrawingView.prototype, "canvasIdName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DrawingView.prototype, "loadingIndicatorIdName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DrawingView.prototype, "drawingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DrawingView.prototype, "archivedId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DrawingView.prototype, "revisionNo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DrawingView.prototype, "moduleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DrawingView.prototype, "drawingType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DrawingView.prototype, "drawingCategoryId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DrawingView.prototype, "outiWhizObject", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DrawingView.prototype, "afterOpen", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DrawingView.prototype, "onResize", null);
    __decorate([
        core_1.HostListener('window:beforeunload', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DrawingView.prototype, "onBeforeunload", null);
    DrawingView = __decorate([
        core_1.Component({
            selector: 'drawingview',
            templateUrl: './app/Framework/Views/Drawing/drawingview.html',
            styleUrls: ['./app/Framework/Views/Drawing/drawingview.css'],
            directives: [split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, moduleswitch_component_1.ModuleSwitchComponent, markuplist_component_1.MarkupsList, slide_component_1.SlideComponent, notify_component_1.Notification],
            providers: [drawing_service_1.DrawingService, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [core_1.KeyValueDiffers, core_1.ChangeDetectorRef, drawing_service_1.DrawingService, notify_service_1.NotificationService, administration_service_1.AdministrationService])
    ], DrawingView);
    return DrawingView;
}());
exports.DrawingView = DrawingView;
//# sourceMappingURL=drawingview.component.js.map
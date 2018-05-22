import { Component, EventEmitter, provide, Input, Inject, ViewChild, ChangeDetectorRef, Output, AfterViewInit, KeyValueDiffers, DoCheck, AfterViewChecked, HostListener, ElementRef } from '@angular/core';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import {NgModel} from '@angular/forms'
import { Http, Response } from '@angular/http';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {ModuleSwitchComponent} from '../../../whatever/common/drawingdetails/moduleswitch.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {ILookupValues} from '../../../Framework/Models//Interface/IField';
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
import "../../../../Scripts/xmlParser.js";  //For iwhiz apis
import "../../../../Scripts/Drawing/d3.js";
import "../../../../Scripts/Drawing/simplify.js";

//import "../../../../Scripts/Drawing/teigha-lib.js";
declare var iWhizAPI: any;
import {MarkupsList} from '../../../whatever/common/drawingdetails/markuplist.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {DrawingService } from '../../models/drawings/drawing.service';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { AdministrationService } from '../../../Models/Administration/administration.service'


@Component({
    selector: 'drawingview',
    templateUrl: './app/Framework/Views/Drawing/drawingview.html',
    styleUrls: ['./app/Framework/Views/Drawing/drawingview.css'],
    directives: [SplitViewComponent, SectionComponent, ModuleSwitchComponent, MarkupsList, SlideComponent, Notification],
    providers: [DrawingService, NotificationService]
})
export class DrawingView implements AfterViewInit {

    drawingCanvas: any;
    @Input() xrefDrawing: string;
    @Input() canvasIdName: string;
    @Input() loadingIndicatorIdName: string;
    @Input() drawingId: number;
    @Input() archivedId: number;
    @Input() revisionNo: number;
    @Input() moduleId: number;
    @Input() drawingType: number;
    @Input() drawingCategoryId: number;
    @Output() outiWhizObject = new EventEmitter();
    @Output() afterOpen = new EventEmitter();
    spacelayerName: string;
    constructionLayerName: string;
    netLayername: string;
    grossLayername: string;
    differ: any;
    splitviewDrawing: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 25 };
    objiWhiz: any = new iWhizAPI();
    rowDelimiter: string = "§";
    columnDelimeter: string = "µ";
    iDrawinsLayers: any;
    defaultlayers: any;
    confirmtionBoxposition = "top-right";
    confirmtionBoxwidth;
    message: string = "";
    progressBoxwidth;
    progressBoxposition = "bottom-right";
    progressMessage = "";
    showContextmenu: boolean = false;
    position: string = "top-right";

    xposition: string;
    yposition: string;
    visibility: boolean;
    openDrawingType: number;

    layerLookUpArray: ILookupValues[] = [];
    siteDrawing: number = 999;
    buildingDrawing: number = 0;
    floorDrawing: number = 1;
    multiFieldValues: string[] = [];
    g_IsNetCustomer: boolean;
    isXrefExists: boolean = false;
    ngOnDestroy() {
        console.log("ngOnDestroy", this.objiWhiz);
        var contextObj = this;
        if (this.objiWhiz) {
            this.objiWhiz.close(function (returnCode) {
                contextObj.objiWhiz = null;
            });
        }
    }

    constructor(private differs: KeyValueDiffers, private cdRef: ChangeDetectorRef, private dwgServices: DrawingService, private notificationService: NotificationService, private administrationService: AdministrationService) {
        this.differ = differs.find({}).create(null);
        window.onbeforeunload = function () {
            console.log("closing");
        };

    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        console.log('resize event: ', event.target.innerWidth);
        var width, height;
        var canvas = this.drawingCanvas;
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;//window.innerHeight - 56;
        this.objiWhiz.resize(width, height);
    }
    @HostListener('window:beforeunload', ['$event'])
    onBeforeunload(event) {
        this.objiWhiz.close(function (returnCode) {
        });
    }
    ngOnInit() {
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
            case this.floorDrawing: this.openDrawingType = 1;
                break;
            case this.siteDrawing: this.openDrawingType = 3;
                break;
            case 5: this.openDrawingType = 5; // project drawing open
                break;
        }

        contextObj.dwgServices.getCustomerSettings().subscribe
            (resultData => {
                for (let i = 0; i < resultData["Data"].length; i++) {
                    switch (resultData["Data"][i]["Id"]) {
                        case 31:
                            contextObj.g_IsNetCustomer = resultData["Data"][i]["FeatureLookupId"] == "1" ? false : true;
                            break;
                    }
                }
            });
    }
    ngAfterViewInit() {
        this.drawingCanvas = <HTMLElement>document.getElementById(this.canvasIdName);
        this.cdRef.detectChanges();
        var contextObj = this;
        setTimeout(function () {
            var width, height;
            var canvas = contextObj.drawingCanvas;
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;//window.innerHeight - 56;
            var topOffset = window.innerHeight - height;
            console.log("width,height,toooffset", width, height, topOffset);
            contextObj.dwgServices.getiDrawingsLayers().subscribe
                (resultData => {
                    console.log("datadata", contextObj.iDrawinsLayers = resultData)

                    contextObj.objiWhiz.initWebViewer('#' + contextObj.canvasIdName, width, height, topOffset, function (result) {
                        if (result == 0) {
                            contextObj.outiWhizObject.emit({ "objiWhiz": contextObj.objiWhiz, "canvas": contextObj.drawingCanvas });
                            contextObj.changeLayout(function (retCode) {
                                if (retCode == 0)
                                    contextObj.afterOpen.emit({ "DefaultLayers": contextObj.defaultlayers, "IsXrefExists": contextObj.isXrefExists });
                                else if (retCode != 3) {
                                    if (contextObj.moduleId == 14)
                                        contextObj.notificationService.ShowToaster("Drawing file not found", 5)
                                    else if (contextObj.moduleId == 3 && retCode == 17)
                                        contextObj.notificationService.ShowToaster(contextObj.spacelayerName + " does not exist", 5)
                                    else
                                        contextObj.notificationService.ShowToaster("Drawing file not found", 5)
                                }
                            });
                        }
                        else
                            console.log("initWebViewer failed due to ", result);
                    });
                });
        }, 100);
    }
    changeLayout = function (resCallback) {
        var contextObj = this;
        var isXref: boolean = false;
        contextObj.spacelayerName = contextObj.iDrawinsLayers[0]["Space Layer Name"];
        contextObj.constructionLayerName = contextObj.iDrawinsLayers[0]["External Wall Layer Name"];
        contextObj.netLayername = contextObj.iDrawinsLayers[0]["Net Layer Name"];
        contextObj.grossLayername = contextObj.iDrawinsLayers[0]["Gross Layer Name"];
        var isFreeze = false;
        if (contextObj.moduleId == 1 || contextObj.moduleId == 2 || contextObj.drawingCategoryId != 1) //drawingCategoryId to know if it is utility drawing
        {
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
    }
    beforeSetiDrawingLayers = function (resCallback) {
        var contextObj = this;
        var layerArr = [];
        console.log("g_IsNetCustomerg_IsNetCustomer", this.g_IsNetCustomer);
        if (contextObj.g_IsNetCustomer) {
            layerArr.push(["0", contextObj.grossLayername]);
            layerArr.push(["3", contextObj.netLayername]);
        } else {
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
    }
    openDrawingAllCategory = function (isXref, resCallback) {
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


                        } else {
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
    }

    asbuiltsOpenDrawing = function (resCallback) {
        var contextObj = this;
        contextObj.objiWhiz.zoomExtents(function (ret) {
            if (ret == 0) {
                contextObj.objiWhiz.display(function () {
                    var loading_indicator = document.getElementById('loading-indicator');
                    loading_indicator.style.display = "none";
                    resCallback(0);
                });

            } else {
                console.log("zoomExtents faild due to", ret);
                resCallback(ret);
            }
        });

    }
    spaceOpenDrawing = function (isXref, resCallback) {
        console.log("space");
        debugger
        var contextObj = this;
        //var isExist = [0];
        //this.objiWhiz.layerExists(contextObj.spacelayerName, isExist);
        //if (isExist[0]) {
        if (isXref && contextObj.drawingCategoryId != 1)//if utility drawing + xref file is attached in the drawing. But xref file not found or xref file unresolved
        {
            contextObj.objiWhiz.setPerformanceIndex(6, function (retcodePerformance) {
                if (retcodePerformance != 0)
                    resCallback(retcodePerformance)
                else
                    resCallback(0)
            })
            //resCallback(0)

        }
        else if (!isXref && contextObj.drawingCategoryId != 1) {//xref and utility uploaded + utility with xref
            contextObj.objiWhiz.getAllXrefs(function (returnCode, xreffiles) {
                if (xreffiles != undefined || xreffiles != "") {
                    var layer = contextObj.spacelayerName + contextObj.rowDelimiter + contextObj.constructionLayerName + contextObj.rowDelimiter + contextObj.netLayername + contextObj.rowDelimiter + contextObj.grossLayername + contextObj.rowDelimiter;
                    contextObj.objiWhiz.importEntities(contextObj.xrefDrawing, layer, true, function (retcode) {
                        console.log('retcode from importentities', retcode)
                        if (retcode == 0) {
                            contextObj.isXrefExists = true;
                            contextObj.initiateloadsettings(function (returncode) {
                                resCallback(returncode)
                            });
                        }
                        else if (retcode == 75 || retcode == 74 || retcode == 102 || retcode == 17) {
                            contextObj.objiWhiz.setPerformanceIndex(6, function (retcodePerformance) {
                                if (retcodePerformance != 0)
                                    resCallback(retcodePerformance)
                                else
                                    resCallback(0)
                            })
                        }
                        else
                            resCallback(retcode)
                    });
                }
                else
                    resCallback(0)

            });

        }
        else {
            contextObj.initiateloadsettings(function (returncode) {
                resCallback(returncode)
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
    }
    setDefaultLayers = function (resCallback) {
        debugger
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        arrayList.push({
            ReportFieldId: 501,
            Value: contextObj.moduleId.toString()
        });
        contextObj.dwgServices.getDefaultDrawingLayerListData(JSON.stringify(arrayList), 0, '', '').subscribe
            (resultData => {
                contextObj.defaultlayers = JSON.parse(resultData["Data"].FieldBinderData);
                for (var i = 0; i < contextObj.defaultlayers.length; i++) {
                    contextObj.objiWhiz.setDefaultLayer(contextObj.defaultlayers[i]['Layer Name'])
                }
                resCallback(0);
            });
    }
    initiateloadsettings = function (resCallback) {
        this.objiWhiz.initialLoadSettings(6, !this.g_IsNetCustomer, function (returnCode) {
            if (returnCode == 0)
                resCallback(0);
            else {
                console.log("initialLoadSettings faild due to", returnCode);
                resCallback(returnCode);
            }
        });
    }
    getNetHandles = function (resCallback) {
        var contextObj = this;
        contextObj.objiWhiz.loadNetHandles(function (returnCode) {
            if (returnCode == 0) {
                //contextObj.objiWhiz.zoomExtents(function (ret) {
                //if (ret == 0) {
                //var loading_indicator = document.getElementById('loading-indicator');
                //loading_indicator.style.display = "none";
                //contextObj.objiWhiz.display();
                resCallback(0);
                //} else {
                //console.log("setLayout faild due to", returnCode);
                //resCallback(1);
                //  }
                //  });
            } else {
                console.log("setLayout faild due to", returnCode);
                resCallback(1);
            }
        });
    }
    addAllLayers = function (callback) {
        var contextObj = this;
        var resultLayers = contextObj.objiWhiz.getAllLayers(function (returnCode, layers) {
            if (returnCode == 0) {
                var allLayersArray = [];
                var isVisible = [0];
                var isVisibleCheck = "checked";
                allLayersArray = layers.split(contextObj.rowDelimiter);
                allLayersArray.pop();
                var layersstatus = "";
                let index = 0;
                var layerIndex;
                for (let layerName of allLayersArray) {
                    console.log("contextObj.drawingCategoryId", contextObj.drawingCategoryId);
                    if (contextObj.moduleId == 1 || contextObj.moduleId == 2 || contextObj.drawingCategoryId != 1) {
                        layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
                        contextObj.multiFieldValues.push(index);
                        contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
                    }
                    else {
                        layerIndex = contextObj.defaultlayers.findIndex(function (el) { return el['Layer Name'] == layerName });
                        if (layerIndex != -1) {
                            contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
                            contextObj.multiFieldValues.push(index);
                            layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
                        }
                        //if (layerName == contextObj.spacelayerName) {
                        //    contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
                        //    if (!contextObj.g_IsNetCustomer) {
                        //        contextObj.multiFieldValues.push(index);
                        //        layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
                        //    }
                        //    else
                        //        layersstatus += layerName + contextObj.columnDelimeter + "false" + contextObj.rowDelimiter;
                        //}
                        //else if (layerName == contextObj.constructionLayerName) {
                        //    contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
                        //    if (!contextObj.g_IsNetCustomer) {
                        //        contextObj.multiFieldValues.push(index);
                        //        layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
                        //    }
                        //    else
                        //        layersstatus += layerName + contextObj.columnDelimeter + "false" + contextObj.rowDelimiter;

                        //}
                        //else if (layerName == contextObj.netLayername) {
                        //    contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
                        //    contextObj.multiFieldValues.push(index);
                        //    layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
                        //}
                        //else if (layerName == contextObj.grossLayername) {
                        //    contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
                        //    layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
                        //}
                        else {
                            contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
                            layersstatus += layerName + contextObj.columnDelimeter + "false" + contextObj.rowDelimiter;
                        }

                    }
                    index++;
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
    }
    //addAllLayers = function (callback) {
    //    var contextObj = this;
    //    var resultLayers = contextObj.objiWhiz.getAllLayers(function (returnCode, layers) {
    //        var allLayersArray = [];
    //        var isVisible = [0];
    //        var isVisibleCheck = "checked";
    //        allLayersArray = layers.split(contextObj.rowDelimiter);
    //        allLayersArray.pop();
    //        var layersstatus = "";
    //        let index = 0;
    //        for (let layerName of allLayersArray) {
    //            console.log("contextObj.drawingCategoryId", contextObj.drawingCategoryId);
    //            if (contextObj.moduleId == 1 || contextObj.drawingCategoryId != 1) {
    //                layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
    //                contextObj.multiFieldValues.push(index);
    //                contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
    //            }
    //            else {
    //                if (layerName == contextObj.spacelayerName) {
    //                    contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
    //                    contextObj.multiFieldValues.push(index);
    //                    layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
    //                }
    //                else if (layerName == contextObj.constructionLayerName) {
    //                    contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
    //                    contextObj.multiFieldValues.push(index);
    //                    layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
    //                }
    //                else if (layerName == contextObj.netLayername) {
    //                    contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
    //                    contextObj.multiFieldValues.push(index);
    //                    layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
    //                }
    //                else if (layerName == contextObj.grossLayername) {
    //                    contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
    //                    contextObj.multiFieldValues.push(index);
    //                    layersstatus += layerName + contextObj.columnDelimeter + "true" + contextObj.rowDelimiter;
    //                }
    //                else {
    //                    contextObj.layerLookUpArray.push({ Id: index, Value: layerName });
    //                    layersstatus += layerName + contextObj.columnDelimeter + "false" + contextObj.rowDelimiter;
    //                }

    //            }
    //            index++;
    //        }
    //        //$.each(allLayersArray, function (index, col) {
    //        //    //OpenDrawingObject.iWhiz.setLayerVisibility(col.toString(), true, function () { });
    //        //    layersstatus += col.toString() + contextObj.columnDelimiter + "true" + contextObj.rowDelimeter;
    //        //});
    //        contextObj.objiWhiz.setLayersVisibility(layersstatus, function () {
    //            callback(0);
    //        });

    //    });
    //}
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
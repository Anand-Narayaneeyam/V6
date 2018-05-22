import { Component, AfterViewInit, OnInit, ElementRef, ViewChild, transition, HostListener} from '@angular/core';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Delimeter } from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ObjectsService } from '../../../Models/Objects/objects.service';
import { IField } from '../../Models/Interface/IField';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { StringTextBoxComponent } from '../DynamicControls/DynamicFields/stringtextbox.component';


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

import "../../../../Scripts/create-symbol-script.js";
import { retry } from 'rxjs/operator/retry';
import { ObjectUnsubscribedError } from 'rxjs/util/ObjectUnsubscribedError';


declare var iWhizAPI: any;

@Component({
    selector: 'create-symbol',
    templateUrl: './app/Framework/Views/CreateSymbol/createsymbol.component.html',
    styleUrls: ['./app/Framework/Views/CreateSymbol/createsymbol.component.css'],
    directives: [SubMenu, SlideComponent, DropDownListComponent, StringTextBoxComponent],
    providers: [NotificationService, ObjectsService],
    inputs: ['objectCategoryId']
})
export class CreateSymbolComponent implements AfterViewInit, OnInit {    
    
    @ViewChild('iWhizCreateSymbolCanvas') drawingCanvas: ElementRef;
    public objiWizCreateSymbolApi : any = new iWhizAPI();
    public objectCategoryId : number = 0;
    public isMenuCard : boolean = true;
    public sheetWidth:any = 70;
    public sheetHeight:any = 30;
    public gridScale : any = 2;
    public layerSheetName: string;
    public layerGridName: string;
    public layerDrawLineName : string;
    public delimiter = new Delimeter();
    public userId: number = 0;
    public handleSheetEntity;
    public handleGridEntity: string = "";
    public handleDrawLine;
    public handlecloseSymbolLine;
    public disableInputHW : boolean = false;
    public arrLineCordiantes = [];
    public symbolLinePoints: string = "";
    public layerSymbolPolyLineName : string = "";
    public enableMenu = [];
    public lineCordsArryLength : number=0;
    public isSnapEnabled : boolean = false;
    public symbolText: string = "";
    public symbolSaveName: string = "";
    public symbolTextSize: number = 2;
    public symbolSlidePosition = "top-right";
    public showSymbolSlide = false;
    public arrReportFieldIdValues = [];
    public arrGetReportFieldIdValues = [];
    public arrGetSymbolReportFieldIdValues = [];
    public symbolSaveString: string = "";
    public delimiterSymbolAddColumn : string = ",";
    public delimiterSymbolAddRow : string = ";";
    public delimiterSymbolColumn : string = this.delimiter.ColumnDelimeter;
    public delimiterSymbolRow : string = this.delimiter.RowDelimeter;
    public symbolDropdownDataSource: IField;
    public blnLoadSavedSymbol : boolean = true;
    public selectedSymbolId : number = -1;
    public blnDisableSymbolDropdown: boolean = false;
    public blnSymbolPrinted : boolean = false;
    public strEnableMenuItems : string = "";
    public blnIsMenuSetToString : boolean = false;
    public messageSliderText :string = "";
    public messageSliderTarget : number = 0;
    public arrPreviousMenu : number[];
    public arrObjectSymbolData : IField[];

    constructor(private _notificationService: NotificationService, private _objectsService: ObjectsService){}

    menuData = [{"id" : 1, 
                "title": "Delete Symbol", 
                "image": "Delete",
                "path": "DeleteSymbol",
                "submenu": null,
                "privilegeId": null
                },
                {"id" : 2, 
                "title": "Create Sheet", 
                "image": "CreateSymbolSheet",
                "path": "CreateSymbolSheet",
                "submenu": null,
                "privilegeId": null
                },
                {"id" : 3, 
                "title": "Clear Sheet", 
                "image": "ClearSymbolSheet",
                "path": "ClearSymbolSheet",
                "submenu": null,
                "privilegeId": null
                },
                {"id" : 4, 
                "title": "Grid On", 
                "image": "SymbolGridOn",
                "path": "SymbolGridOn",
                "submenu": null,
                "privilegeId": null
                },
                {"id" : 5, 
                "title": "Grid Off", 
                "image": "SymbolGridOff",
                "path": "SymbolGridOff",
                "submenu": null,
                "privilegeId": null
                },
                {"id" : 6, 
                "title": "Close", 
                "image": "CloseSymbolLine",
                "path": "CloseSymbolLine",
                "submenu": null,
                "privilegeId": null
                },
                {"id" : 7, 
                "title": "Snap On", 
                "image": "SymbolSnapOn",
                "path": "SymbolSnapOn",
                "submenu": null,
                "privilegeId": null
                },
                {"id" : 8, 
                "title": "Snap Off", 
                "image": "SymbolSnapOff",
                "path": "SymbolSnapOff",
                "submenu": null,
                "privilegeId": null
                },
                {"id" : 9, 
                "title": "Undo", 
                "image": "UndoSymbolLine",
                "path": "UndoSymbolLine",
                "submenu": null,
                "privilegeId": null
                },
                {"id" : 10, 
                "title": "Create Text", 
                "image": "CreateSymbolText",
                "path": "CreateSymbolText",
                "submenu": null,
                "privilegeId": null
                },
                {"id" : 11, 
                "title": "Save Symbol", 
                "image": "SaveSymbolFile",
                "path": "SaveSymbolFile",
                "submenu": null,
                "privilegeId": null
                }];

   
    totalItems : number = this.menuData.length; 
    
    ngAfterViewInit() {
        //this.enableMenu = [1,2,3,4,5,6,7,8,9,10,11];
        var width, height;
        var objContext = this;
        objContext.blnLoadSavedSymbol = true;
        objContext.blnDisableSymbolDropdown = false;
        objContext.blnSymbolPrinted = false;
        setTimeout(function(){
            var canvas = <HTMLElement>objContext.drawingCanvas.nativeElement;
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            var topOffset = window.innerHeight - height;
            objContext.objiWizCreateSymbolApi.initWebViewer('#iWhizCreateSymbolCanvas', width, height, topOffset, function (result) {
                if (result == 0) {
                    objContext.objiWizCreateSymbolApi.createDrawing(0, function(resultxo){
                        if (resultxo == 0) {
                            objContext.objiWizCreateSymbolApi.setDelimiter(objContext.delimiterSymbolRow, objContext.delimiterSymbolColumn, function(resultxc){
                                //this.hideLoadingPulse();
                                document.getElementById('loading-indicator').style.display = "none";
                                objContext.enableMenu = [2];
                                for (var i = 0; i < objContext.arrObjectSymbolData.length; i++) {/* disable grid size*/
                                    if (objContext.arrObjectSymbolData[i].FieldId == 2948) {
                                        objContext.arrObjectSymbolData[i].IsEnabled = true;
                                    }
                                    else if (objContext.arrObjectSymbolData[i].FieldId == 2949) {
                                        objContext.arrObjectSymbolData[i].IsEnabled = true;
                                    }
                                    else if (objContext.arrObjectSymbolData[i].FieldId == 2950) {
                                        objContext.arrObjectSymbolData[i].FieldValue = "2";
                                        objContext.arrObjectSymbolData[i].IsEnabled = false;
                                    }
                                }                                
                            });
                            
                        }
                    });
                }
                else{
                    console.log("initWebViewer failed due to ", result);
                }
            })
        },100);
    }
    ngOnDestroy() {
        var contextObj = this;
        if (this.objiWizCreateSymbolApi) {
            this.objiWizCreateSymbolApi.close(function (returnCode) {
                contextObj.objiWizCreateSymbolApi = null;
            });
        }
    }
    @HostListener('window:beforeunload', ['$event'])
    onBeforeunload(event) {
        var contextObj = this;
        this.objiWizCreateSymbolApi.close(function (returnCode) {
            contextObj.objiWizCreateSymbolApi = null;
        });
    }
    ngOnInit(){
        var objContext = this;
        objContext.getSymbolControldata();
        objContext.getSymbolDropdownData();
    }


    onSubMenuChange(event: any){
        var objContext = this;
        switch(event.value)
        {
            case 1:
                //objContext.enableMenu = [2];
                objContext.messageSliderTarget = 2;
                objContext.messageSliderText = "Are you sure you want to delete the selected symbol?";
                objContext.showSymbolSlide = true;                
                break;
            case 2:
                objContext.sheetHeight = objContext.getCustomFieldValue(2948);
                objContext.sheetWidth = objContext.getCustomFieldValue(2949);
                if (objContext.sheetHeight && objContext.sheetWidth) {
                    objContext.arrLineCordiantes = [];
                    objContext.blnSymbolPrinted = false;
                    objContext.createSymbolSheet();
                    objContext.enableMenu = [3, 4];
                    for (var i = 0; i < objContext.arrObjectSymbolData.length; i++) {/* enable grid size*/
                        if (objContext.arrObjectSymbolData[i].FieldId == 2948) {
                            objContext.arrObjectSymbolData[i].IsEnabled = false;
                        }
                        else if (objContext.arrObjectSymbolData[i].FieldId == 2949) {
                            objContext.arrObjectSymbolData[i].IsEnabled = false;
                        }
                        else if (objContext.arrObjectSymbolData[i].FieldId == 2950) {
                            objContext.arrObjectSymbolData[i].FieldValue = "2";
                            objContext.arrObjectSymbolData[i].IsEnabled = true;
                        }
                    }
                }
                else
                {
                    if (objContext.sheetHeight) {
                        if (objContext.sheetWidth != undefined) {
                            objContext._notificationService.ShowToaster("Enter Sheet Width", 5);
                        }
                    }
                    else {
                        if (objContext.sheetHeight != undefined) {
                            objContext._notificationService.ShowToaster("Enter Sheet Height", 5);
                        }
                    }
                }     
                break;
            case 3:  
                if(objContext.arrLineCordiantes.length > 1){
                    objContext.messageSliderTarget = 1;
                    objContext.messageSliderText = "Do you want to save the newly created Symbol?";
                    objContext.showSymbolSlide = true;
                }
                else{
                    objContext.deleteSheetLayers(function () { });
                }                
                objContext.disableInputHW = false;  
                break;
            case 4:
                objContext.crateSheetGrid();
                if(objContext.menuItemExists(6)){
                    objContext.enableMenu = [6];
                }
                objContext.addMenuItem(3);
                objContext.addMenuItem(5);
                objContext.addMenuItem(7);
                break;
            case 5:
                objContext.setGridVisibility(false);
                objContext.enableMenu = [3,4,6];
                break;
            case 6:
                objContext.enableMenu = [3,10,11];
                objContext.closeSymbolLine();
                objContext.removeMenuItem(6);
                break;
            case 7:
                objContext.isSnapEnabled = true;
                objContext.arrPreviousMenu = objContext.enableMenu;                
                objContext.enableMenu = [3,5,8];
                if(objContext.previousMenuItemExists(6)){
                    objContext.addMenuItem(6);
                }
                if(objContext.previousMenuItemExists(9)){
                    objContext.addMenuItem(9);
                }  
                objContext.arrPreviousMenu = [];
                break;
            case 8:
                objContext.isSnapEnabled = false;  
                objContext.arrPreviousMenu = objContext.enableMenu;
                objContext.enableMenu = [3,5,7];   
                if(objContext.previousMenuItemExists(6)){
                    objContext.addMenuItem(6);
                } 
                if(objContext.previousMenuItemExists(9)){
                    objContext.addMenuItem(9);
                }         
                break;
            case 9:
                objContext.undoLineInSymbol();
                break;
            case 10:
                objContext.printTextOnsymbol();
                break;
            case 11:
                if (objContext.getCustomFieldValue(2941) && objContext.getCustomFieldValue(2941).trim().length == 0){
                    /*objContext._notificationService.ShowToaster("Enter Symbol Name", 5);*/
                }
                else{
                   objContext.saveObjectSymbol();
                   //objContext.enableMenu = [2];
                   //alert(objContext.objectCategoryId);
                }
                break;
            
        }
    }
 
    public createSymbolSheet(){
        var objContext = this;
        //objContext.layerSheetName = objContext.getLayerName();
        objContext.layerSheetName = "symbolSheetLayer";
        var polylinePoints = "0" + objContext.delimiterSymbolColumn + "0" + objContext.delimiterSymbolRow +
                            objContext.sheetWidth + objContext.delimiterSymbolColumn + "0" + objContext.delimiterSymbolRow +
                            objContext.sheetWidth + objContext.delimiterSymbolColumn + objContext.sheetHeight + objContext.delimiterSymbolRow +
                            "0" + objContext.delimiterSymbolColumn + objContext.sheetHeight + objContext.delimiterSymbolRow;
        objContext.objiWizCreateSymbolApi.createPolyline(objContext.layerSheetName, 10, polylinePoints,0, "", 1, true, function(resultxb, entityHandle){
            if (resultxb == 0) { 
                objContext.handleSheetEntity = entityHandle;   
                objContext.objiWizCreateSymbolApi.zoomExtents(function(resultxv){
                    if (resultxb == 0) { 
                        objContext.disableInputHW = true;  
                        objContext.objiWizCreateSymbolApi.setCursor(2);
                        objContext.arrLineCordiantes = [];
                        objContext.objiWizCreateSymbolApi.disableZoom();
                        objContext.drawLineOnClick();
                    }
                });
            }

        });
    }

    public drawLineOnClick(){
        var objContext = this;       
        //objContext.layerDrawLineName = objContext.getLayerName();
        objContext.layerDrawLineName = "lineLayer";
        objContext.gridScale = objContext.getCustomFieldValue(2950);
        var z = 0;
        var startX, startY, endX, endY;
        objContext.objiWizCreateSymbolApi.getDWGPoint(function (resultxa, x, y) {            
            if(resultxa == 0){ 
                if(objContext.isSnapEnabled){
                    var diffX = 0, diffY = 0;
                    diffX = Math.floor(x / objContext.gridScale);
                    diffX =  x - (diffX * objContext.gridScale);
                    if(diffX < (objContext.gridScale/2)){
                        x =  x  - diffX;
                    }
                    else{
                        x = x + (objContext.gridScale - diffX);
                    }

                    diffY = Math.floor(y / objContext.gridScale);
                    diffY =  y - (diffY * objContext.gridScale);
                    if(diffY < (objContext.gridScale/2)){
                        y =  y  - diffY;
                    }
                    else{
                        y = y + (objContext.gridScale - diffY);
                    }

                }
                objContext.arrLineCordiantes.push({xCord: x, yCord: y, zCord : 0, lineHandle: 0}); 
                var dx = [], dy = [], dz = [];
                dx[0] = x; dy[0] = y; dz[0] = z;
                objContext.objiWizCreateSymbolApi.dwgToClient(dx, dy, dz); 
                objContext.objiWizCreateSymbolApi.enableRubberband(dx[0], dy[0], dz[0], true);  
                objContext.lineCordsArryLength = objContext.arrLineCordiantes.length;
                if(objContext.lineCordsArryLength > 1){
                    objContext.addMenuItem(6);
                    objContext.addMenuItem(9);
                    startX = objContext.arrLineCordiantes[(objContext.lineCordsArryLength - 2)].xCord;
                    startY = objContext.arrLineCordiantes[(objContext.lineCordsArryLength - 2)].yCord;
                    endX = objContext.arrLineCordiantes[(objContext.lineCordsArryLength - 1)].xCord;
                    endY = objContext.arrLineCordiantes[(objContext.lineCordsArryLength - 1)].yCord;
                    objContext.objiWizCreateSymbolApi.createLine(objContext.layerDrawLineName, 3, startX, startY, endX, endY, function (resultxd, entityLineHandle) {
                        if(resultxd == 0){
                            objContext.handleDrawLine = entityLineHandle;
                            objContext.arrLineCordiantes[objContext.lineCordsArryLength-1].lineHandle = entityLineHandle;
                            objContext.drawLineOnClick();
                        }
                        else{
                            return;
                        }
                    });
                    
                }
                else{
                    objContext.drawLineOnClick();
                }
            }
            else if(resultxa == 8){
                objContext.lineCordsArryLength = objContext.arrLineCordiantes.length;
                if(objContext.lineCordsArryLength > 1){
                    objContext.enableMenu = [3,10,11];
                    objContext.closeSymbolLine(); 
                }
                else{
                    objContext.drawLineOnClick();
                }
            }
        });
    } 

    public printTextOnsymbol(){
        var objContext = this;  
        objContext.symbolText = objContext.getCustomFieldValue(2942);
        objContext.symbolTextSize = parseInt(objContext.getCustomFieldValue(2940));
        if (objContext.symbolTextSize) {
            for (var p = 0; p < objContext.arrObjectSymbolData.length; p++) {
                if (objContext.arrObjectSymbolData[p].FieldId == 2942 && objContext.arrObjectSymbolData[p].HasValidationError) {
                    /*objContext._notificationService.ShowToaster("Invalid character", 2);*/
                    objContext.enableMenu = [3, 10, 11];
                    return false;
                }
            }
            if (objContext.symbolText.trim().length == 0) {
                objContext._notificationService.ShowToaster("Enter Symbol Text", 5);
            }
            else {
                objContext.blnSymbolPrinted = true;
                objContext.enableMenu = [3, 11];
                objContext.objiWizCreateSymbolApi.getEntityMidpoint(objContext.handlecloseSymbolLine, function (resultxj, midX, midY) {
                    objContext.objiWizCreateSymbolApi.createMultilineText(objContext.layerSymbolPolyLineName, 3, midX, midY, 0,
                        objContext.symbolTextSize, 0, 1, objContext.symbolText, "",
                        5, function (resultxk) {
                            //alert(resultxk);
                        })
                });
            }
        }
    }

    public closeSymbolLine(){
        var ratio = [0];
        var objContext = this;  
        objContext.symbolLinePoints = "";
        objContext.layerSymbolPolyLineName = "symbolPolylineLayer";
        objContext.arrLineCordiantes.forEach(element => {
            objContext.symbolLinePoints = objContext.symbolLinePoints + element.xCord + 
                                          objContext.delimiterSymbolColumn + element.yCord +
                                          objContext.delimiterSymbolRow;
        });
        objContext.objiWizCreateSymbolApi.getCurrentClientDWGRatio(ratio);
        objContext.objiWizCreateSymbolApi.createPolyline(objContext.layerSymbolPolyLineName, 3, objContext.symbolLinePoints,0, "", 1, true, function(resultxe, entityPloyLineHandle){
            if(resultxe == 0){
                objContext.handlecloseSymbolLine = entityPloyLineHandle;
                objContext.symbolLinePoints = "";
                objContext.objiWizCreateSymbolApi.enableRubberband(0, 0, 0, false);  
                objContext.objiWizCreateSymbolApi.deleteLayer(objContext.layerDrawLineName, function (resultxf) {
                    if(resultxf == 0){
                        objContext.objiWizCreateSymbolApi.regenerate();   
                        objContext.objiWizCreateSymbolApi.exitWaitMode();                     
                    }
                });
            }
        });
    }

    public crateSheetGrid(){
        var objContext = this;
        objContext.isSnapEnabled = false; //to reset snap while creating second symbol
        //objContext.layerGridName = objContext.getLayerName();
        objContext.layerGridName = "sheetGridLayer";
        objContext.gridScale = objContext.getCustomFieldValue(2950);
        if (objContext.handleGridEntity != "" && objContext.gridScale>0) { //a workaround instead of deletelayer
            objContext.objiWizCreateSymbolApi.setEntityVisibility(objContext.handleGridEntity.split(objContext.delimiterSymbolRow)[0], false, function (ret) {
                objContext.objiWizCreateSymbolApi.hatchEntity(objContext.layerGridName, objContext.handleSheetEntity, 5, 0, parseInt(objContext.gridScale), 10, false, function (resultxn, handleGridEntity) {
                    if (resultxn == 0) {
                        objContext.handleGridEntity = handleGridEntity;
                        objContext.objiWizCreateSymbolApi.pushToBack(objContext.handleGridEntity, function (resultg) {
                            //alert(resultg);
                            objContext.setGridVisibility(true);
                        })
                    }
                });
            });           
        }
        else {
            objContext.objiWizCreateSymbolApi.hatchEntity(objContext.layerGridName, objContext.handleSheetEntity, 5, 0, parseInt(objContext.gridScale), 10, false, function (resultxn, handleGridEntity) {
                if (resultxn == 0) {
                    objContext.handleGridEntity = handleGridEntity;
                    objContext.objiWizCreateSymbolApi.pushToBack(objContext.handleGridEntity, function (resultg) {
                        //alert(resultg);
                        objContext.setGridVisibility(true);
                    })
                }
            });
        }
        
    }

    public setGridVisibility(isVisible: boolean){
        var objContext = this;
        objContext.objiWizCreateSymbolApi.setLayerVisibility(objContext.layerGridName, isVisible, function(resultg){
            if((resultg == 0) && (!isVisible)){
                if(objContext.enableMenu.lastIndexOf(6) != -1){
                    //objContext.enableMenu = [3, 4, 6];
                }
                else{
                    //objContext.enableMenu = [3, 4];
                }
                
            }
        });
    }

    public undoLineInSymbol(){
        var objContext = this; 
        var lineEntLength = objContext.arrLineCordiantes.length;
        var lineEntity = objContext.arrLineCordiantes[lineEntLength-1].lineHandle;
        objContext.objiWizCreateSymbolApi.deleteEntity(lineEntity, function(resulth){
            if(resulth == 0){
                objContext.arrLineCordiantes.pop();
                lineEntLength = objContext.arrLineCordiantes.length;
                var dx = [], dy = [], dz = [];
                dx[0] = objContext.arrLineCordiantes[lineEntLength-1].xCord; 
                dy[0] = objContext.arrLineCordiantes[lineEntLength-1].yCord; 
                dz[0] = objContext.arrLineCordiantes[lineEntLength-1].zCord;
                objContext.objiWizCreateSymbolApi.dwgToClient(dx, dy, dz); 
                objContext.objiWizCreateSymbolApi.enableRubberband(dx[0], dy[0], dz[0], true); 
            }
        });

    }

    public deleteSheetLayers(resCallback){
        var objContext = this; 
        objContext.objiWizCreateSymbolApi.exitWaitMode();
        objContext.objiWizCreateSymbolApi.enableRubberband(0,0,0,false);  
        objContext.enableMenu = [2];  
        for (var i = 0; i < objContext.arrObjectSymbolData.length; i++) {/* disable grid size*/
            if (objContext.arrObjectSymbolData[i].FieldId == 2948) {
                objContext.arrObjectSymbolData[i].IsEnabled = true;
            }
            else if (objContext.arrObjectSymbolData[i].FieldId == 2949) {
                objContext.arrObjectSymbolData[i].IsEnabled = true;
            }
            else if (objContext.arrObjectSymbolData[i].FieldId == 2950) {
                objContext.arrObjectSymbolData[i].FieldValue = "2";
                objContext.arrObjectSymbolData[i].IsEnabled = false;
            }
        }
        //if(objContext.arrLineCordiantes.length > 0){
        //    objContext.closeSymbolLine();
        //}  
        
        //if(objContext.layerSheetName && objContext.layerSheetName.trim().length > 0){
        //    objContext.objiWizCreateSymbolApi.deleteLayer(objContext.layerSheetName, function(resultxg){
        //        if(resultxg == 0){               
        //        }           
        //    });
        //}
        //if(objContext.layerGridName && objContext.layerGridName.trim().length > 0){
        //    objContext.objiWizCreateSymbolApi.deleteLayer(objContext.layerGridName, function(resultxh){
        //        if(resultxh == 0){
                
        //        }
        //    });
        //}
        //if(objContext.layerSymbolPolyLineName && objContext.layerSymbolPolyLineName.trim().length > 0){
        //    objContext.objiWizCreateSymbolApi.deleteLayer(objContext.layerSymbolPolyLineName, function(resultxi){
        //        //alert(resultxi);
        //        objContext.arrLineCordiantes = [];
        //    });
        //}
        
        var layers = "";
        if (objContext.layerSheetName && objContext.layerSheetName.trim().length > 0)
            layers = objContext.layerSheetName + objContext.delimiterSymbolRow;
        if (objContext.layerGridName && objContext.layerGridName.trim().length > 0)
            layers += objContext.layerGridName + objContext.delimiterSymbolRow;
        if (objContext.layerSymbolPolyLineName && objContext.layerSymbolPolyLineName.trim().length > 0)
            layers += objContext.layerSymbolPolyLineName + objContext.delimiterSymbolRow;

        if (layers != "") {
            objContext.objiWizCreateSymbolApi.deleteLayer(layers, function (resultxg) {
                objContext.arrLineCordiantes = [];
                resCallback();
            });
        }
        else
            resCallback();

        objContext.setCustomFieldValue(2941, "");
        objContext.setCustomFieldValue(2942, "");
    }

    public saveObjectSymbol(){
        var objContext = this;
        for(var p = 0; p < objContext.arrObjectSymbolData.length; p++){
            if(objContext.arrObjectSymbolData[p].HasValidationError){
                /*objContext._notificationService.ShowToaster("Invalid character", 2);*/
                objContext.enableMenu = [3,10,11];
                return false;
            }
        }
        var returnData = "";
        var returnServerId = "";
        objContext.symbolSaveString = "";
        objContext.symbolText = objContext.getCustomFieldValue(2942);
        objContext.symbolSaveName = objContext.getCustomFieldValue(2941);
        objContext.symbolTextSize = parseInt(objContext.getCustomFieldValue(2940));
        objContext.arrLineCordiantes.forEach(element => {
            objContext.symbolSaveString = objContext.symbolSaveString +
                                          element.xCord + objContext.delimiterSymbolAddColumn + 
                                          element.yCord + objContext.delimiterSymbolAddRow;
        });
        objContext.arrReportFieldIdValues = [];
        if(!objContext.blnSymbolPrinted){
            objContext.setCustomFieldValue(2942, "");
        }
        objContext.arrReportFieldIdValues.push({ ReportFieldId: 672, Value: objContext.objectCategoryId});
        objContext.arrReportFieldIdValues.push({ ReportFieldId: 675, Value: objContext.symbolTextSize});
        objContext.arrReportFieldIdValues.push({ ReportFieldId: 671, Value: objContext.symbolSaveName});
        objContext.arrReportFieldIdValues.push({ ReportFieldId: 674, Value: objContext.symbolText});
        objContext.arrReportFieldIdValues.push({ ReportFieldId: 2159, Value: 0});
        objContext.arrReportFieldIdValues.push({ ReportFieldId: 2160, Value: objContext.symbolSaveString});

        objContext._objectsService.addObjectSymbol(JSON.stringify(objContext.arrReportFieldIdValues))
                                    .subscribe(function(resultData){
                                        returnData = resultData["Data"].StatusId;
                                        returnServerId = resultData["Data"].ServerId;
                                        if(parseInt(returnData) == 1){
                                            objContext._notificationService.ShowToaster("Symbol added", 2);
                                            objContext.arrLineCordiantes = [];
                                            objContext.getSymbolDropdownData();
                                            objContext.deleteSheetLayers(function () { });                                            
                                            objContext.enableMenu = [2];
                                            for (var i = 0; i < objContext.arrObjectSymbolData.length; i++) {/* disable grid size*/
                                                if (objContext.arrObjectSymbolData[i].FieldId == 2948) {
                                                    objContext.arrObjectSymbolData[i].IsEnabled = true;
                                                }
                                                else if (objContext.arrObjectSymbolData[i].FieldId == 2949) {
                                                    objContext.arrObjectSymbolData[i].IsEnabled = true;
                                                }
                                                else if (objContext.arrObjectSymbolData[i].FieldId == 2950) {
                                                    objContext.arrObjectSymbolData[i].FieldValue = "2";
                                                    objContext.arrObjectSymbolData[i].IsEnabled = false;
                                                }
                                            }
                                        }
                                        else if(parseInt(returnData) == 3){
                                            if(parseInt(returnServerId) == -1){
                                                objContext._notificationService.ShowToaster("Symbol with same name already exists", 2);
                                                objContext.enableMenu = [3,10,11];
                                            }
                                        }
                                        else{
                                            objContext._notificationService.ShowToaster("Server Error", 5);
                                        }
                                    });
    }

    public getSymbolDropdownData(){
        var objContext = this;
        var arrDataReturn, rfid = 0;
        objContext.arrGetReportFieldIdValues = [];
        objContext.arrGetReportFieldIdValues.push({  FieldId: 2938,  ReportFieldId: 672, Value: objContext.objectCategoryId});
        objContext._objectsService.getObjectSymbolDropdownData(JSON.stringify(objContext.arrGetReportFieldIdValues)).subscribe(function(dataReturn){
            arrDataReturn = dataReturn["Data"];
            for(var x =0; x < arrDataReturn.length; x++){
                if(arrDataReturn[x].ReportFieldId == 670){
                    objContext.arrObjectSymbolData[x] =  arrDataReturn[x];
                    objContext.arrObjectSymbolData[x].FieldValue = "-1";
                    objContext.LoadDefaultValue();
                    objContext.Defaultfocus();
                    break;
                }
            }
            
        });
    }
    public Defaultfocus() {
        setTimeout(function () {
                var SymbolNameElement: any = document.getElementById("2941");
                if (SymbolNameElement) {
                    SymbolNameElement.focus();
                    setTimeout(function () { SymbolNameElement.blur(); }, 100);
                }
        }, 500)
    }
    public showSelectedSymbol() {
        var loading_indicator = document.getElementById('loading-indicator');
        loading_indicator.style.display = "block";
        var objContext = this,
            xcord,ycord;;
        objContext.layerSheetName = "symbolSheetLayer";
        objContext.sheetHeight = objContext.getCustomFieldValue(2948);
        objContext.sheetWidth = objContext.getCustomFieldValue(2949);
        var polylinePoints = "0" + objContext.delimiterSymbolColumn + "0" + objContext.delimiterSymbolRow +
                            objContext.sheetWidth + objContext.delimiterSymbolColumn + "0" + objContext.delimiterSymbolRow +
                            objContext.sheetWidth + objContext.delimiterSymbolColumn + objContext.sheetHeight + objContext.delimiterSymbolRow +
                            "0" + objContext.delimiterSymbolColumn + objContext.sheetHeight + objContext.delimiterSymbolRow;
            objContext.objiWizCreateSymbolApi.enableRubberband(0, 0, 0, false);  
            objContext.objiWizCreateSymbolApi.createPolyline(objContext.layerSheetName, 10, polylinePoints,0, "", 1, true, function(resultxb, entityHandle){
            if (resultxb == 0) { 
                objContext.handleSheetEntity = entityHandle;   
                objContext.objiWizCreateSymbolApi.zoomExtents(function(resultxv){
                    var ratio = [0];  
                    objContext.layerSymbolPolyLineName = "symbolPolylineLayer";
                    objContext.objiWizCreateSymbolApi.getCurrentClientDWGRatio(ratio);                   
                    xcord = objContext.sheetWidth / 2;
                    ycord = objContext.sheetHeight / 2;
                    objContext.objiWizCreateSymbolApi.setDisplay(false); // added to remove flickering
                    objContext.objiWizCreateSymbolApi.createPolyline(objContext.layerSymbolPolyLineName, 3, objContext.symbolSaveString,0, "", 1, true, function(resultxe, entityPloyLineHandle){
                        if (resultxe == 0) {
                            objContext.handlecloseSymbolLine = entityPloyLineHandle;
                            objContext.objiWizCreateSymbolApi.moveEntity(entityPloyLineHandle, xcord, ycord, function (retCode) {
                                if (retCode == 0) {
                                    objContext.objiWizCreateSymbolApi.createMultilineText(objContext.layerSymbolPolyLineName, 3, xcord, ycord, 0,
                                        objContext.symbolTextSize, 0, 1, objContext.symbolText, "",
                                        5, function (resultxk) {
                                           // var loading_indicator = document.getElementById('loading-indicator');
                                            loading_indicator.style.display = "none";
                                            objContext.objiWizCreateSymbolApi.setDisplay(true);// added to remove flickering
                                            objContext.blnDisableSymbolDropdown = false;
                                        })
                                }
                                else {
                                    console.log("Move Symbol ", retCode);
                                }
                            })
                        }
                        else
                        {
                            console.log("Symbol Polyline " + resultxe)
                        }
                    });
                    
                });
            }
            else {
                console.log("Sheet Polyline " + resultxb)
            }
        });
         
    }

    public deleteSavedSymbol(){
        var objContext = this;
        var dataReturn;
        objContext._objectsService.deleteSymbolData(objContext.selectedSymbolId)
                  .subscribe(function(returnData){
                    dataReturn = returnData["Data"];
                    if(parseInt(dataReturn.StatusId) == 1){
                        objContext.getSymbolDropdownData();
                        objContext._notificationService.ShowToaster("Symbol deleted", 2);
                        objContext.deleteSheetLayers(function () { });
                        //this.setSymbolDropdownToInit();
                        objContext.enableMenu = [2];
                        for (var i = 0; i < objContext.arrObjectSymbolData.length; i++) {/* disable grid size*/
                            if (objContext.arrObjectSymbolData[i].FieldId == 2948) {
                                objContext.arrObjectSymbolData[i].IsEnabled = true;
                            }
                            else if (objContext.arrObjectSymbolData[i].FieldId == 2949) {
                                objContext.arrObjectSymbolData[i].IsEnabled = true;
                            }
                            else if (objContext.arrObjectSymbolData[i].FieldId == 2950) {
                                objContext.arrObjectSymbolData[i].FieldValue = "2";
                                objContext.arrObjectSymbolData[i].IsEnabled = false;
                            }
                        }
                        objContext.blnSymbolPrinted = false;
                    }
                    
                  });
    }

    public removeMenuItem(element){
        var objContext = this;
        if (objContext.enableMenu.lastIndexOf(element) != -1) {
            objContext.enableMenu = objContext.enableMenu.filter(e => e !== element);
        }
    }

    public addMenuItem(element){
        var objContext = this;
        if (objContext.enableMenu.lastIndexOf(element) == -1) {
            objContext.enableMenu.push(element);
        }        
    }

    public menuItemExists(element){
        var objContext = this;
        if(objContext.enableMenu.lastIndexOf(element) != -1){
            return true;
        }
        else{
            return false;
        }
    }

    public previousMenuItemExists(element){
        var objContext = this;
        if(objContext.arrPreviousMenu.lastIndexOf(element) != -1){
            return true;
        }
        else{
            return false;
        }
    }

    public  removeItem(arraySrc, element) {
        //const elementIndex = arraySrc.indexOf(element);
        //arraySrc.splice(elementIndex, 1);
        return arraySrc.filter(e => e !== element);
    }

    public itemExists(arraySrc, element) {
        if (arraySrc.lastIndexOf(element) != -1) {
            return true;
        }
        else {
            return false;
        }
    }

    public getLayerName() {
        var objContext = this;
        this.userId = Math.floor(Math.random() * 1000)
        /////////to find date and time/////////
        var dateTime = new Date();
        var date = dateTime.getDate() + "-" + dateTime.getMonth() + "-" + dateTime.getFullYear();
    
        var hours = dateTime.getHours() > 12 ? dateTime.getHours() - 12 : dateTime.getHours().toString();
        var am_pm = dateTime.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = dateTime.getMinutes() < 10 ? "0" + dateTime.getMinutes() : dateTime.getMinutes();
        var seconds = dateTime.getSeconds() < 10 ? "0" + dateTime.getSeconds() : dateTime.getSeconds();
        var time = hours + "-" + minutes + "-" + seconds + "_" + am_pm;
        /////////to find date and time/////////  
            
        var layerName: string = "$" + objContext.userId + "_" + date + "_" + time;
        console.log("layerName", layerName);
        return layerName;
    }

    public setMenuItemsToString(){
        var objContext = this;
        if(objContext.blnIsMenuSetToString){
            objContext.strEnableMenuItems = objContext.enableMenu.toString();
            objContext.blnIsMenuSetToString = false;
        }
    }

    public getSymbolControldata(){
        var objContext = this;
            objContext.arrGetReportFieldIdValues = [];
            objContext.arrGetReportFieldIdValues.push({  FieldId: 2938,  ReportFieldId: 672, Value: objContext.objectCategoryId});
            objContext._objectsService.getObjectSymbolData(JSON.stringify(objContext.arrGetReportFieldIdValues)).subscribe(function(dataReturn){
                objContext.arrObjectSymbolData = dataReturn["Data"];
                for(var i=0; i < objContext.arrObjectSymbolData.length; i++){
                    if(objContext.arrObjectSymbolData[i].FieldId == 2948){
                        objContext.arrObjectSymbolData[i].FieldValue = "30";
                    }
                    else if(objContext.arrObjectSymbolData[i].FieldId == 2949){
                        objContext.arrObjectSymbolData[i].FieldValue = "70";
                    }
                    else if(objContext.arrObjectSymbolData[i].FieldId == 2950){
                        objContext.arrObjectSymbolData[i].FieldValue = "2";
                        objContext.arrObjectSymbolData[i].IsEnabled = false;
                    }
                    else if(objContext.arrObjectSymbolData[i].FieldId == 2940){
                        objContext.arrObjectSymbolData[i].FieldValue = "2";
                    }
                    else if(objContext.arrObjectSymbolData[i].FieldId == 2938){
                        objContext.arrObjectSymbolData[i].FieldValue = "-1";
                    }                    
                }
            });        
    }

    public getSymbolField(inputFieldId: number) :  IField {
        var objContext = this;
        var objIfield;
        objContext.arrObjectSymbolData.find(function(item){
            if(item.FieldId == inputFieldId){
                objIfield = item;
                return true;
            }
            else{
                return false;
            }
        });;
        return objIfield;
    }

    public getCustomFieldValue(fieldId){
        var objContext = this;
        var objItem = objContext.getSymbolField(fieldId);
        if (objItem.HasValidationError == true) {
            return undefined;
        }else if (objItem.FieldValue != null ) {
            return objContext.getSymbolField(fieldId).FieldValue;
        }
        else {
            return "";
        }
    }

    public setCustomFieldValue(fieldId, value){
        var objContext =this;        
        for(var i=0; i < objContext.arrObjectSymbolData.length; i++){
            if(objContext.arrObjectSymbolData[i].FieldId == fieldId){
                objContext.arrObjectSymbolData[i].FieldValue = value;                
                break;
            }
        }
    }
    

    symbolDropdownChange(event){
        var objContext = this;
        var symbolId = event["ChildFieldObject"].FieldValue;
        objContext.selectedSymbolId = symbolId;
        objContext.blnLoadSavedSymbol = true;
        if(parseInt(symbolId) != -1){                                    
            if(objContext.arrLineCordiantes.length > 1){
                objContext.blnLoadSavedSymbol = false;
                objContext.messageSliderTarget = 1;
                objContext.messageSliderText = "Do you want to save the newly created Symbol?";
                objContext.showSymbolSlide = true;
            }
            else{
                objContext.deleteSheetLayers(function () {
                    objContext.LoadSavedSymbol(symbolId);
                });
            } 
            //if(objContext.blnLoadSavedSymbol){
            //    objContext.LoadSavedSymbol(symbolId);                
            //}
        }
        else{
            objContext.enableMenu = [2];
            if (objContext.blnLoadSavedSymbol) {
                objContext.deleteSheetLayers(function () { });
                objContext.symbolTextSize = 2;
                objContext.symbolSaveString = ""; 
                objContext.symbolText = "";  
                objContext.LoadDefaultValue();                                   
            }
        }
        objContext.disableInputHW = false;
    }

    LoadDefaultValue() {
        var objContext = this;
        for (var i = 0; i < objContext.arrObjectSymbolData.length; i++) {
            if (objContext.arrObjectSymbolData[i].FieldId == 2940) {
                objContext.arrObjectSymbolData[i].FieldValue = "2";
                objContext.arrObjectSymbolData[i].IsEnabled = true;
            }
            else if (objContext.arrObjectSymbolData[i].FieldId == 2941) {
                objContext.arrObjectSymbolData[i].FieldValue = "";
                objContext.arrObjectSymbolData[i].IsEnabled = true;
            }
            else if (objContext.arrObjectSymbolData[i].FieldId == 2942) {
                objContext.arrObjectSymbolData[i].FieldValue = "";
                objContext.arrObjectSymbolData[i].IsEnabled = true;
            }
            else if (objContext.arrObjectSymbolData[i].FieldId == 2948) {
                objContext.arrObjectSymbolData[i].FieldValue = "30";
                objContext.arrObjectSymbolData[i].IsEnabled = true;
            }
            else if (objContext.arrObjectSymbolData[i].FieldId == 2949) {
                objContext.arrObjectSymbolData[i].FieldValue = "70";
                objContext.arrObjectSymbolData[i].IsEnabled = true;
            }
            else if (objContext.arrObjectSymbolData[i].FieldId == 2950) {
                objContext.arrObjectSymbolData[i].FieldValue = "2";
                objContext.arrObjectSymbolData[i].IsEnabled = false;
            }
        }                          
        objContext.Defaultfocus();
    }

    LoadSavedSymbol(symbolId) {
        var objContext = this;
        var dataReturn;
        objContext.blnDisableSymbolDropdown = true;
        objContext.arrGetSymbolReportFieldIdValues = [];
        objContext.arrGetSymbolReportFieldIdValues.push({ ReportFieldId: 2928, Value: symbolId });
        objContext.arrGetSymbolReportFieldIdValues.push({ ReportFieldId: 2930, Value: objContext.objectCategoryId });
        objContext._objectsService.getObjectSymbolDetailsData(JSON.stringify(objContext.arrGetSymbolReportFieldIdValues))
            .subscribe(function (returnData) {
                dataReturn = JSON.parse(returnData["Data"].FieldBinderData);                                           
                objContext.symbolSaveString = dataReturn[0].SymbolCoordinates;
                objContext.symbolSaveString = objContext.symbolSaveString.replace(/,/g, objContext.delimiterSymbolColumn);
                objContext.symbolSaveString = objContext.symbolSaveString.replace(/;/g, objContext.delimiterSymbolRow);
                objContext.symbolTextSize = dataReturn[0].TextHeight;
                objContext.symbolText = dataReturn[0].SymbolText;
                objContext.showSelectedSymbol();
                objContext.objiWizCreateSymbolApi.disableZoom();
                objContext.enableMenu = [1];
                for (var i = 0; i < objContext.arrObjectSymbolData.length; i++) {
                    if (objContext.arrObjectSymbolData[i].FieldId == 2940) {
                        objContext.arrObjectSymbolData[i].FieldValue = dataReturn[0].TextHeight;
                        objContext.arrObjectSymbolData[i].IsEnabled = false;
                    }
                    else if (objContext.arrObjectSymbolData[i].FieldId == 2941) {
                        objContext.arrObjectSymbolData[i].FieldValue = dataReturn[0].SymbolName;
                        objContext.arrObjectSymbolData[i].IsEnabled = false;
                    }
                    else if (objContext.arrObjectSymbolData[i].FieldId == 2942) {
                        objContext.arrObjectSymbolData[i].FieldValue = dataReturn[0].SymbolText;
                        objContext.arrObjectSymbolData[i].IsEnabled = false;
                    }
                    else if (objContext.arrObjectSymbolData[i].FieldId == 2948) {
                        objContext.arrObjectSymbolData[i].FieldValue = "30";
                        objContext.arrObjectSymbolData[i].IsEnabled = false;
                    }
                    else if (objContext.arrObjectSymbolData[i].FieldId == 2949) {
                        objContext.arrObjectSymbolData[i].FieldValue = "70";
                        objContext.arrObjectSymbolData[i].IsEnabled = false;
                    }
                    else if (objContext.arrObjectSymbolData[i].FieldId == 2950) {
                        objContext.arrObjectSymbolData[i].FieldValue = "2";
                        objContext.arrObjectSymbolData[i].IsEnabled = false;
                    }
                }
            });
    }

    closeSlideDialog(value: any, index) {
        switch(index){
            case 1:
                this.showSymbolSlide = value.value;
                this.blnLoadSavedSymbol = false;
            break;
        }
    }

    okDeleteSymbol(event: any) {
        var objContext = this;
        var symbolId;
        switch(objContext.messageSliderTarget){
            case 1:
                this.showSymbolSlide = event.value;
                this.blnLoadSavedSymbol = false;
                this.setCustomFieldValue(2938, "-1");
                this.Defaultfocus();
                break;
            case 2:
                objContext.deleteSavedSymbol();
                objContext.showSymbolSlide = false;
                break;
        }

    }

    cancelClick(value: any) {   
        var objContext = this;
        var symbolId;
        switch (objContext.messageSliderTarget) {
            case 1:
                objContext.deleteSheetLayers(function () { });
                objContext.showSymbolSlide = false;
                objContext.blnLoadSavedSymbol = true;
                symbolId = objContext.getCustomFieldValue(2938);
                if (parseInt(symbolId) != -1) {
                    objContext.LoadSavedSymbol(symbolId);
                }
                break;
            case 2:
                this.showSymbolSlide = value.value;
                this.blnLoadSavedSymbol = false;                
                break;
        }            
    }    
}
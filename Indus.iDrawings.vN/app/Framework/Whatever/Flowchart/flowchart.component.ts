import {Component, Input, EventEmitter, Output, ViewChild, AfterViewInit, ElementRef, HostListener} from '@angular/core'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
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

declare var iWhizAPI: any;

@Component({
    selector: 'flowchart',
    templateUrl: 'app/Framework/Views/Flowchart/flowchart.component.html',
    styleUrls: ['app/Framework/Views/Flowchart/flowchart.component.css'],
    directives: [SubMenu]
})
    
export class FlowchartComponent implements AfterViewInit {
    @ViewChild('iWhizFlowchartCanvas') drawingCanvas: ElementRef;
    public drawingObject: any = new iWhizAPI();
    @Input() isNotInuse: boolean;
    @Input() FileName: string;
    @Output() DrawingObjectInitialize = new EventEmitter();
    @Output() flowchartBoxCreate = new EventEmitter();
    @Output() flowchartConnectorCreate = new EventEmitter();
    @Output() flowchartActionPointDoubleClick = new EventEmitter();
    @Output() flowchartConnectorDoubleClick = new EventEmitter();
    @Output() flowchartConnectorChange = new EventEmitter();
    @Output() flowChartInvalidConnector = new EventEmitter();
    @Output() flowchartActionPointDeleteClick = new EventEmitter();
    @Output() flowchartOutcomeDeleteClick = new EventEmitter();

    menuData = [];
    public totalItems: number = 5;
    enableMenu = [];
    iscard = true;

    ngOnDestroy() {
        var contextObj = this;
        if (this.drawingObject) {
            this.drawingObject.close(function (returnCode) {
                contextObj.drawingObject = null;
            });
        }
    }
    @HostListener('window:beforeunload', ['$event'])
    onBeforeunload(event) {
        var contextObj = this;
        this.drawingObject.close(function (returnCode) {
            contextObj.drawingObject = null;
        });
    }
    ngAfterViewInit() {
        var contextObj = this;
        this.menuData = [{
            "id": 1,
            "title": "Action Point",
            "image": "ActionPoint",
            "path": "ActionPoint",
            "submenu": null,
            "privilegeId": null
            },
            {
                "id": 2,
                "title": "Outcome",
                "image": "Outcome",
                "path": "Outcome",
                "submenu": null,
                "privilegeId": null
            },
            {
                "id": 3,
                "title": "Select",
                "image": "Select",
                "path": "Select",
                "submenu": null,
                "privilegeId": null
            },
            {
                "id": 4,
                "title": "Zoom Extents",
                "image": "Show Zoomed",
                "path": "Show Zoomed",
                "submenu": null,
                "privilegeId": null
            },
            {
                "id": 5,
                "title": "Pan",
                "image": "Pan",
                "path": "Pan",
                "submenu": null,
                "privilegeId": null
            }//,
            //{
            //    "id": 6,
            //    "title": "Undo",
            //    "image": "Undo",
            //    "path": "Undo",
            //    "submenu": null,
            //    "privilegeId": null
            //},
            //{
            //    "id": 7,
            //    "title": "Redo",
            //    "image": "Redo",
            //    "path": "Redo",
            //    "submenu": null,
            //    "privilegeId": null
            //}
        ];
        debugger
        if (this.isNotInuse == undefined || this.isNotInuse == true) {
            this.enableMenu = [1, 2, 3, 4, 5];

        } else if (this.isNotInuse == false) {
            this.enableMenu = [3, 4, 5];
        }

        setTimeout(function () {
            var width, height;
            var canvas = <HTMLElement>contextObj.drawingCanvas.nativeElement;
            width = canvas.offsetWidth;//canvas.offsetWidth;
            height = canvas.offsetHeight;//canvas.offsetHeight;//window.innerHeight - 56;
            var topOffset = window.innerHeight - height;
            contextObj.drawingObject.initWebViewer('#iWhizFlowchartCanvas', width, height, topOffset, function (result) {
                if (result == 0) {
                    contextObj.changeLayout(function (retCode) {                        
                        //var loading_indicator = document.getElementById('loading-indicator');
                        //loading_indicator.style.display = "none";
                        contextObj.DrawingObjectInitialize.emit({ obj: contextObj, canvas: canvas });
                    });
                }
                else
                    console.log("initWebViewer failed due to ", result);
            });
        }, 100);
    }

    changeLayout = function (resCallback) {
        var contextObj = this;
        contextObj.drawingObject.setApplicationMode(3);
        var result = contextObj.drawingObject.createWorkFlow(contextObj.FileName, function (returnCode) {
            if (returnCode == 0) {
               // contextObj.drawingObject.display();
               // contextObj.drawingObject.zoomExtents(function (retCode) {
                    resCallback(returnCode);
               // });
            }
            else {
                console.log("createWorkFlow faild due to", returnCode);
                resCallback(returnCode);
            }
        });
        contextObj.drawingObject.addEvent("flowchartActionPointDoubleClick", function (outputs) {
            if (contextObj.isNotInuse != false)
                contextObj.flowchartActionPointDoubleClick.emit({ "Id": outputs[0] });
        });
        contextObj.drawingObject.addEvent("flowchartConnectorDoubleClick", function (outputs) {
            if (contextObj.isNotInuse != false)
                contextObj.flowchartConnectorDoubleClick.emit({ "Id": outputs[0] });
        });
        contextObj.drawingObject.addEvent("flowchartConnectorChange", function (outputs) {
            contextObj.flowchartConnectorChange.emit({ "OutcomeId": outputs[0], "FromActionId": outputs[1], "ToActionId": outputs[2] });
        });
        contextObj.drawingObject.addEvent("flowChartInvalidConnector", function (outputs) {
            if (contextObj.isNotInuse != false)
                contextObj.flowChartInvalidConnector.emit({ "Id": outputs[0] });
        });
        contextObj.drawingObject.addEvent("flowchartActionPointDeleteClick", function (outputs) {
            if (contextObj.isNotInuse != false)
                contextObj.flowchartActionPointDeleteClick.emit({ "ActionId": outputs[0] });
        });
        contextObj.drawingObject.addEvent("flowchartOutcomeDeleteClick", function (outputs) {
            if (contextObj.isNotInuse != false)
                contextObj.flowchartOutcomeDeleteClick.emit({ "OutcomeId": outputs[0] });
        });
        //contextObj.drawingObject.addEvent("flowchartUndoRedoChange", function (outputs) {
        //    if (outputs[0] == false && outputs[1] == false) {
        //        contextObj.enableMenu = [1, 2, 3, 4, 5];
        //    }
        //    else if (outputs[0] == true) {
        //        contextObj.enableMenu = [1, 2, 3, 4, 5, 6];
        //    } 
        //    else if (outputs[1] == true) {
        //        contextObj.enableMenu = [1, 2, 3, 4, 5, 7];
        //    } 
        //});
        contextObj.drawingObject.addEvent("mouseDown", function (outputs) {
            if (outputs[2] == "2") {
                if (contextObj.isNotInuse == undefined || contextObj.isNotInuse == true) {
                    contextObj.enableMenu = [1, 2, 3, 4, 5];

                } else if (contextObj.isNotInuse == false) {
                    contextObj.enableMenu = [3, 4, 5];
                }
            }
        });
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                contextObj.enableMenu = [];
                contextObj.createBox();
                break;
            case 2:
                contextObj.enableMenu = [];
                contextObj.createConnector();
                break;
            case 3:
                contextObj.enableMenu = [];
                contextObj.drawingObject.selectShape(function (retCode) { });
                break;
            case 4:
                contextObj.drawingObject.zoomExtents(function (retCode) { });
                break;
            case 5:
                contextObj.enableMenu = [];
                contextObj.drawingObject.pan();
                break;
            //case 6:
            //    contextObj.drawingObject.undo(function (retCode) { });
            //    contextObj.enableMenu = [1, 2, 3, 4, 5,6, 7];
            //    break;
            //case 7:
            //    contextObj.drawingObject.redo(function (retCode) { });
            //    contextObj.enableMenu = [1, 2, 3, 4, 5, 6,7];
            //    break;
        }
    }

    public createBox() {
        var contextObj = this;
        this.drawingObject.createProcessBox(function (retCode, BoxHandle) {
            if (retCode == 0) {
                contextObj.flowchartBoxCreate.emit({ "BoxHandle": BoxHandle });                
            }
            contextObj.enableMenu = [1, 2, 3, 4, 5];
        });
    }
    public createConnector() {
        var contextObj = this;
        this.drawingObject.createConnector(function (retCode, ConnectorHandle, FromActionId, ToActionId) {
            if (retCode == 0) {
                contextObj.flowchartConnectorCreate.emit({ "ConnectorHandle": ConnectorHandle, "FromActionId": FromActionId, "ToActionId": ToActionId });             
            }
            contextObj.enableMenu = [1, 2, 3, 4, 5];
        });
    }
}
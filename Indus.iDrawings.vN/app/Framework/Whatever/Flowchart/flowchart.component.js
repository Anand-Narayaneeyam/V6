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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
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
var FlowchartComponent = (function () {
    function FlowchartComponent() {
        this.drawingObject = new iWhizAPI();
        this.DrawingObjectInitialize = new core_1.EventEmitter();
        this.flowchartBoxCreate = new core_1.EventEmitter();
        this.flowchartConnectorCreate = new core_1.EventEmitter();
        this.flowchartActionPointDoubleClick = new core_1.EventEmitter();
        this.flowchartConnectorDoubleClick = new core_1.EventEmitter();
        this.flowchartConnectorChange = new core_1.EventEmitter();
        this.flowChartInvalidConnector = new core_1.EventEmitter();
        this.flowchartActionPointDeleteClick = new core_1.EventEmitter();
        this.flowchartOutcomeDeleteClick = new core_1.EventEmitter();
        this.menuData = [];
        this.totalItems = 5;
        this.enableMenu = [];
        this.iscard = true;
        this.changeLayout = function (resCallback) {
            var contextObj = this;
            contextObj.drawingObject.setApplicationMode(3);
            var result = contextObj.drawingObject.createWorkFlow(contextObj.FileName, function (returnCode) {
                if (returnCode == 0) {
                    // contextObj.drawingObject.display();
                    // contextObj.drawingObject.zoomExtents(function (retCode) {
                    resCallback(returnCode);
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
                    }
                    else if (contextObj.isNotInuse == false) {
                        contextObj.enableMenu = [3, 4, 5];
                    }
                }
            });
        };
    }
    FlowchartComponent.prototype.ngOnDestroy = function () {
        var contextObj = this;
        if (this.drawingObject) {
            this.drawingObject.close(function (returnCode) {
                contextObj.drawingObject = null;
            });
        }
    };
    FlowchartComponent.prototype.onBeforeunload = function (event) {
        var contextObj = this;
        this.drawingObject.close(function (returnCode) {
            contextObj.drawingObject = null;
        });
    };
    FlowchartComponent.prototype.ngAfterViewInit = function () {
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
            } //,
        ];
        debugger;
        if (this.isNotInuse == undefined || this.isNotInuse == true) {
            this.enableMenu = [1, 2, 3, 4, 5];
        }
        else if (this.isNotInuse == false) {
            this.enableMenu = [3, 4, 5];
        }
        setTimeout(function () {
            var width, height;
            var canvas = contextObj.drawingCanvas.nativeElement;
            width = canvas.offsetWidth; //canvas.offsetWidth;
            height = canvas.offsetHeight; //canvas.offsetHeight;//window.innerHeight - 56;
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
    };
    FlowchartComponent.prototype.onSubMenuChange = function (event) {
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
        }
    };
    FlowchartComponent.prototype.createBox = function () {
        var contextObj = this;
        this.drawingObject.createProcessBox(function (retCode, BoxHandle) {
            if (retCode == 0) {
                contextObj.flowchartBoxCreate.emit({ "BoxHandle": BoxHandle });
            }
            contextObj.enableMenu = [1, 2, 3, 4, 5];
        });
    };
    FlowchartComponent.prototype.createConnector = function () {
        var contextObj = this;
        this.drawingObject.createConnector(function (retCode, ConnectorHandle, FromActionId, ToActionId) {
            if (retCode == 0) {
                contextObj.flowchartConnectorCreate.emit({ "ConnectorHandle": ConnectorHandle, "FromActionId": FromActionId, "ToActionId": ToActionId });
            }
            contextObj.enableMenu = [1, 2, 3, 4, 5];
        });
    };
    __decorate([
        core_1.ViewChild('iWhizFlowchartCanvas'), 
        __metadata('design:type', core_1.ElementRef)
    ], FlowchartComponent.prototype, "drawingCanvas", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FlowchartComponent.prototype, "isNotInuse", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FlowchartComponent.prototype, "FileName", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FlowchartComponent.prototype, "DrawingObjectInitialize", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FlowchartComponent.prototype, "flowchartBoxCreate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FlowchartComponent.prototype, "flowchartConnectorCreate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FlowchartComponent.prototype, "flowchartActionPointDoubleClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FlowchartComponent.prototype, "flowchartConnectorDoubleClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FlowchartComponent.prototype, "flowchartConnectorChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FlowchartComponent.prototype, "flowChartInvalidConnector", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FlowchartComponent.prototype, "flowchartActionPointDeleteClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FlowchartComponent.prototype, "flowchartOutcomeDeleteClick", void 0);
    __decorate([
        core_1.HostListener('window:beforeunload', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], FlowchartComponent.prototype, "onBeforeunload", null);
    FlowchartComponent = __decorate([
        core_1.Component({
            selector: 'flowchart',
            templateUrl: 'app/Framework/Views/Flowchart/flowchart.component.html',
            styleUrls: ['app/Framework/Views/Flowchart/flowchart.component.css'],
            directives: [submenu_component_1.SubMenu]
        }), 
        __metadata('design:paramtypes', [])
    ], FlowchartComponent);
    return FlowchartComponent;
}());
exports.FlowchartComponent = FlowchartComponent;
//# sourceMappingURL=flowchart.component.js.map